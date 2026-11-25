// Единая serverless-функция Sauat: класс, ученики, синхронизация, задания, аналитика и ИИ.
const crypto = require('crypto');
const { q } = require('../lib/db');
const { classStats, SKILLS } = require('../lib/stats');
const { chatJson, readBody, token, clip } = require('../lib/ai');
const coach = require('../lib/coach');
const generate = require('../lib/generate');
const TEXTS = require('../public/js/content.js');
const qPrompt = (id, lang) => { for (const x of TEXTS) { const f = x.questions.find((y) => y.id === id); if (f) return `«${f.prompt[lang] || f.prompt.kk}»`; } return id; };

const ALPH = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const rid = (n, a = ALPH) => Array.from(crypto.randomBytes(n), (b) => a[b % a.length]).join('');

function send(res, status, body) { res.statusCode = status; res.setHeader('content-type', 'application/json; charset=utf-8'); res.setHeader('cache-control', 'no-store'); res.end(JSON.stringify(body)); }
function fail(status, msg) { const e = new Error(msg); e.status = status; throw e; }

async function teacherClass(code, key) {
  const rows = await q('select * from classes where code = $1', [String(code || '').toUpperCase()]);
  if (!rows.length) fail(404, 'class-not-found');
  if (rows[0].teacher_key !== key) fail(403, 'wrong-key');
  return rows[0];
}
async function classContent(code) {
  const [assignments, packs] = await Promise.all([
    q('select id, text_id, due, created_at from assignments where class_code = $1 order by created_at desc', [code]),
    q('select id, data from packs where class_code = $1 order by created_at desc', [code])
  ]);
  return { assignments: assignments.map((a) => ({ id: a.id, textId: a.text_id, created: new Date(a.created_at).getTime(), due: a.due ? String(a.due instanceof Date ? a.due.toISOString() : a.due).slice(0, 10) : null })), packs: packs.map((p) => p.data) };
}
const pub = (c) => ({ code: c.code, name: c.name, grade: c.grade, lang: c.lang, school: c.school, demo: c.demo });

const routes = {
  'GET health': async (req) => ({ ok: true, ai: Boolean(token(req)), db: process.env.DATABASE_URL ? 'neon' : 'pglite' }),

  // учитель создаёт класс: получает код для учеников и секретный ключ для кабинета
  'POST class': async (req, b) => {
    const name = clip(b.name, 60).trim(); if (!name) fail(400, 'name');
    const code = rid(6); const key = rid(18, 'abcdefghijkmnpqrstuvwxyz23456789');
    await q('insert into classes(code, name, grade, lang, school, teacher_key) values ($1,$2,$3,$4,$5,$6)',
      [code, name, Math.max(5, Math.min(11, Number(b.grade) || 8)), b.lang === 'ru' ? 'ru' : 'kk', clip(b.school, 80) || null, key]);
    return { code, key };
  },

  // кабинет: класс + аналитика
  'GET dashboard': async (req, b, u) => {
    const c = await teacherClass(u.searchParams.get('code'), u.searchParams.get('key'));
    const [students, attempts, content] = await Promise.all([
      q('select id, name, created_at from students where class_code = $1 order by name', [c.code]),
      q('select student_id, text_id, question_id, skill, level, score, hints, ts from attempts where class_code = $1 order by ts', [c.code]),
      classContent(c.code)
    ]);
    const norm = attempts.map((a) => ({ ...a, ts: Number(a.ts), level: Number(a.level), score: Number(a.score) }));
    const stats = classStats(students, norm);
    // выполнение заданий: кто из учеников ответил хотя бы на один вопрос текста после выдачи
    const asg = content.assignments.map((a) => {
      const done = new Set(norm.filter((x) => x.text_id === a.textId && x.ts >= a.created).map((x) => x.student_id));
      return { ...a, done: done.size };
    });
    return { class: pub(c), stats, assignments: asg, packs: content.packs };
  },

  'GET student': async (req, b, u) => {
    const c = await teacherClass(u.searchParams.get('code'), u.searchParams.get('key'));
    const sid = u.searchParams.get('id');
    const st = await q('select id, name from students where id = $1 and class_code = $2', [sid, c.code]);
    if (!st.length) fail(404, 'student');
    const list = await q('select text_id, question_id, skill, level, score, hints, answer, ts from attempts where student_id = $1 order by ts desc limit 300', [sid]);
    return { student: st[0], attempts: list.map((a) => ({ ...a, ts: Number(a.ts), score: Number(a.score), level: Number(a.level) })) };
  },

  'POST assign': async (req, b) => {
    const c = await teacherClass(b.code, b.key);
    const id = 'as-' + rid(8);
    await q('insert into assignments(id, class_code, text_id, due) values ($1,$2,$3,$4)', [id, c.code, clip(b.textId, 80), b.due || null]);
    return { id };
  },
  'POST unassign': async (req, b) => {
    const c = await teacherClass(b.code, b.key);
    await q('delete from assignments where id = $1 and class_code = $2', [b.id, c.code]);
    return { ok: true };
  },
  'POST pack': async (req, b) => {
    const c = await teacherClass(b.code, b.key);
    const pack = b.pack; if (!pack || !pack.id || !Array.isArray(pack.questions)) fail(400, 'pack');
    pack.custom = true;
    await q('insert into packs(id, class_code, data) values ($1,$2,$3) on conflict (id) do update set data = excluded.data', [pack.id, c.code, JSON.stringify(pack)]);
    return { id: pack.id };
  },

  // ученик входит по коду класса
  'POST join': async (req, b) => {
    const code = String(b.code || '').toUpperCase().trim();
    const rows = await q('select * from classes where code = $1', [code]);
    if (!rows.length) fail(404, 'class-not-found');
    const name = clip(b.name, 40).trim() || 'Оқушы';
    const id = 's-' + rid(10);
    await q('insert into students(id, class_code, name) values ($1,$2,$3)', [id, code, name]);
    return { studentId: id, class: pub(rows[0]), ...(await classContent(code)) };
  },

  // офлайн-очередь ответов ученика; идемпотентно (id попытки создаёт телефон)
  'POST sync': async (req, b) => {
    const st = await q('select id, class_code from students where id = $1', [b.studentId]);
    if (!st.length) fail(404, 'student');
    const code = st[0].class_code;
    const list = (Array.isArray(b.attempts) ? b.attempts : []).slice(0, 500).filter((a) => a && a.id && SKILLS.includes(a.skill));
    for (let i = 0; i < list.length; i += 100) {
      const chunk = list.slice(i, i + 100);
      const vals = chunk.map((_, j) => `(${Array.from({ length: 11 }, (_, k) => `$${j * 11 + k + 1}`).join(',')})`).join(',');
      await q(`insert into attempts(id, student_id, class_code, text_id, question_id, skill, level, score, hints, answer, ts) values ${vals} on conflict (id) do nothing`,
        chunk.flatMap((a) => [clip(a.id, 60), st[0].id, code, clip(a.tx, 80), clip(a.q, 80), a.skill, Number(a.level) || 1,
          Math.max(0, Math.min(1, Number(a.score) || 0)), Math.max(0, Math.min(4, Number(a.hints) || 0)), a.answer ? clip(a.answer, 1500) : null, Number(a.ts) || Date.now()]));
    }
    await q('update students set last_seen = now() where id = $1', [st[0].id]);
    const c = (await q('select * from classes where code = $1', [code]))[0];
    return { synced: list.length, class: pub(c), ...(await classContent(code)) };
  },

  // ИИ-сводка для учителя: 3 рекомендации по данным класса (с запасным вариантом без ИИ)
  'POST insights': async (req, b) => {
    const c = await teacherClass(b.code, b.key);
    const students = await q('select id, name from students where class_code = $1', [c.code]);
    const attempts = (await q('select student_id, text_id, question_id, skill, level, score, hints, ts from attempts where class_code = $1', [c.code]))
      .map((a) => ({ ...a, ts: Number(a.ts), level: Number(a.level), score: Number(a.score) }));
    const s = classStats(students, attempts);
    const lang = b.lang === 'ru' ? 'ru' : 'kk';
    const brief = {
      class: c.name, grade: c.grade, kpi: s.kpi, avgLevel: s.avg, shareBelowLevel2: s.below2,
      weekly: s.weeks.map((w) => ({ locate: w.locate, interpret: w.interpret, evaluate: w.evaluate })),
      hardestQuestions: s.questions.slice(0, 4).map((x) => ({ id: x.id, skill: x.skill, correctRate: x.rate, hintRate: x.hintRate })),
      needHelp: s.roster.filter((r) => r.attempts).sort((a, b2) => (a.theta.locate + a.theta.interpret + a.theta.evaluate) - (b2.theta.locate + b2.theta.interpret + b2.theta.evaluate)).slice(0, 4).map((r) => ({ name: r.name, weakest: r.weakest })),
      inactive: s.roster.filter((r) => !r.lastActive || r.lastActive < Date.now() - 7 * 86400000).map((r) => r.name)
    };
    const sys = lang === 'kk'
      ? 'Сен — мектептегі функционалдық сауаттылық бойынша әдіскерсің. Сынып деректері бойынша мұғалімге келесі аптаға 3 нақты ұсыныс бер (қысқа, іс-әрекетке бағытталған, оқушы аттарымен). Дағдылар: locate=ақпаратты табу, interpret=түсіну, evaluate=бағалау. Тек JSON: {"headline":"бір сөйлем","tips":[{"title":"...","text":"..."}]}'
      : 'Ты методист по функциональной грамотности. По данным класса дай учителю 3 конкретные рекомендации на следующую неделю (коротко, по делу, с именами учеников). Навыки: locate=поиск информации, interpret=понимание и вывод, evaluate=оценка. Только JSON: {"headline":"одно предложение","tips":[{"title":"...","text":"..."}]}';
    try {
      const out = await chatJson(req, sys, JSON.stringify(brief), { maxTokens: 700, temperature: 0.3, timeoutMs: 20000 });
      if (!Array.isArray(out.tips) || !out.tips.length) throw new Error('shape');
      return { ai: true, headline: clip(out.headline, 300), tips: out.tips.slice(0, 3).map((t) => ({ title: clip(t.title, 120), text: clip(t.text, 500) })) };
    } catch (e) {
      return { ai: false, ...fallbackTips(s, lang) };
    }
  },

  // ИИ-студия: новый текст по теме + задания к нему
  'POST compose': async (req, b) => {
    const lang = b.lang === 'ru' ? 'ru' : 'kk';
    const topic = clip(b.topic, 200).trim(); if (!topic) fail(400, 'topic');
    const fmt = { notice: 'a practical notice/announcement or timetable (non-continuous text)', article: 'an informational article', opinions: 'two short opinion texts by two students who disagree' }[b.format] || 'an informational article';
    const out = await chatJson(req,
      'You write reading texts for PISA-style reading literacy practice for grades 7–9 in Kazakhstan. Facts must be accurate and age-appropriate; prefer Kazakhstan context. Return JSON only: {"text":"..."} where paragraphs are separated by a blank line.',
      `Language: ${lang === 'kk' ? 'Kazakh' : 'Russian'}. Topic: ${topic}. Format: ${fmt}. Difficulty: PISA level ${Math.max(1, Math.min(5, Number(b.level) || 2))}. Length: 8–12 sentences in 3–4 paragraphs.`,
      { maxTokens: 1200, temperature: 0.6, timeoutMs: 25000 });
    const text = String(out.text || '').trim(); if (text.length < 150) fail(502, 'ai-unavailable');
    const pack = await generate.makePack(req, { text, lang, grade: b.grade });
    pack.format = b.format === 'notice' ? 'notice' : 'article';
    return { pack };
  }
};

function fallbackTips(s, lang) {
  const names = { kk: { locate: 'ақпаратты табу', interpret: 'түсіну және қорытынды', evaluate: 'бағалау' }, ru: { locate: 'поиск информации', interpret: 'понимание и вывод', evaluate: 'оценка' } }[lang];
  const w = s.weakSkill; const pct = Math.round(s.below2[w] * 100);
  const weak = s.roster.filter((r) => r.attempts && r.weakest === w).slice(0, 3).map((r) => r.name).join(', ');
  const q0 = s.questions[0];
  return lang === 'kk' ? {
    headline: `Сыныптың ${pct}%-ы «${names[w]}» дағдысында 2-деңгейден төмен.`,
    tips: [
      { title: `«${names[w]}» дағдысына 10 минут`, text: `Келесі сабақты осы дағдыға арналған бір мәтіннен бастаңыз. Алдымен көмектесетін оқушылар: ${weak || '—'}.` },
      { title: 'Дәлелмен жұмыс', text: 'Әр жауаптан кейін «мәтіннің қай сөйлемі дәлелдейді?» деп сұраңыз — Sauat-тағы «дәлелді бас» тапсырмаларын қолданыңыз.' },
      { title: 'Ең қиын сұрақты бірге талдаңыз', text: q0 ? `${qPrompt(q0.id, 'kk')} — тек ${Math.round(q0.rate * 100)}% дұрыс жауап берді.` : 'Деректер жеткіліксіз.' }
    ]
  } : {
    headline: `${pct}% класса ниже 2-го уровня по навыку «${names[w]}».`,
    tips: [
      { title: `10 минут на «${names[w]}»`, text: `Начните следующий урок с одного текста на этот навык. В первую очередь помогите: ${weak || '—'}.` },
      { title: 'Работа с доказательством', text: 'После каждого ответа спрашивайте «какое предложение это доказывает?» — используйте в Sauat задания «нажми доказательство».' },
      { title: 'Разберите самый трудный вопрос', text: q0 ? `${qPrompt(q0.id, 'ru')} — верно ответили только ${Math.round(q0.rate * 100)}%.` : 'Мало данных.' }
    ]
  };
}

module.exports = async (req, res) => {
  const u = new URL(req.url, 'http://x');
  const path = (u.pathname.replace(/^\/api\/?/, '').replace(/^index\/?/, '') || u.searchParams.get('path') || '').split('/')[0];
  try {
    if (path === 'coach') return await coach(req, res);
    if (path === 'generate') return await generate(req, res);
    const fn = routes[`${req.method} ${path}`];
    if (!fn) return send(res, 404, { error: 'not-found' });
    const b = req.method === 'POST' ? await readBody(req) : {};
    return send(res, 200, await fn(req, b, u));
  } catch (e) {
    if (!e.status) console.error(path, e);
    return send(res, e.status || 500, { error: e.status ? e.message : 'server-error' });
  }
};
