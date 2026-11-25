// Демо-класс для жюри: 8 «Ә» сельской школы, 22 ученика, 4 недели реальной (сгенерированной) активности.
// Генерация детерминированная: одинаковые данные при каждом запуске.
const TEXTS = require('../public/js/content.js');

const NAMES = ['Айгерім', 'Нұрлан', 'Дана', 'Ерасыл', 'Әсел', 'Тимур', 'Аружан', 'Бекзат', 'Мадина', 'Жандос', 'Аяулым',
  'Ерлан', 'Томирис', 'Нұрсұлтан', 'Жансая', 'Әлихан', 'Інжу', 'Санжар', 'Гүлназ', 'Арман', 'Камила', 'Дәулет'];

function rng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }

const DEMO = { code: 'DEMO24', key: 'demo', name: '8 «Ә» сынып', school: 'Жаңатұрмыс ЖББМ (демо)', grade: 8, lang: 'kk' };

async function ensureDemo(run) {
  const have = await run('select code from classes where code = $1', [DEMO.code]);
  if (have.length) return;
  await run('insert into classes(code, name, grade, lang, school, teacher_key, demo) values ($1,$2,$3,$4,$5,$6,true) on conflict do nothing',
    [DEMO.code, DEMO.name, DEMO.grade, DEMO.lang, DEMO.school, DEMO.key]);
  const r = rng(2026);
  const qs = TEXTS.flatMap((t) => t.questions.map((q) => ({ ...q, text: t.id, model: q.model && q.model.kk })));
  const now = Date.now(); const DAY = 86400000;
  const rows = [];
  const students = NAMES.map((name, i) => {
    // профиль: поиск обычно сильнее, оценка — слабее всего (как в PISA)
    const base = 1.2 + r() * 1.6;
    return {
      id: `demo-s${i + 1}`, name, growth: 0.3 + r() * 0.9,
      skill: { locate: base + 0.4, interpret: base + 0.3, evaluate: base - 0.6 + r() * 0.3 },
      activeDays: i % 7 === 6 ? 4 : 14 + Math.floor(r() * 10), // несколько учеников давно не заходили
      inactiveLast: i % 7 === 6
    };
  });
  for (const s of students) {
    await run('insert into students(id, class_code, name, created_at, last_seen) values ($1,$2,$3,$4,$5) on conflict do nothing',
      [s.id, DEMO.code, s.name, new Date(now - 28 * DAY), new Date(now - (s.inactiveLast ? 10 : 1) * DAY)]);
    let n = 0;
    for (let d = 27; d >= (s.inactiveLast ? 10 : 0); d--) {
      if (r() > s.activeDays / 28) continue;
      const t = (27 - d) / 27; // 0 → 1 за 4 недели
      const count = 2 + Math.floor(r() * 4);
      for (let k = 0; k < count; k++) {
        const q = qs[Math.floor(r() * qs.length)];
        const ability = s.skill[q.skill] + s.growth * t;
        const pc = 1 / (1 + Math.exp(-1.3 * (ability - q.level)));
        let score; let hints = 0;
        const x = r();
        if (x < pc * 0.7) score = 1;
        else if (x < pc) { hints = 1 + Math.floor(r() * 2); score = hints === 1 ? 0.75 : 0.5; }
        else { hints = 3; score = r() < 0.5 ? 0.25 : 0; }
        if (q.kind === 'open') score = x < pc * 0.55 ? 1 : x < pc * 0.9 ? 0.5 : 0;
        const answer = q.kind === 'open' ? (score >= 1 ? q.model : score > 0 ? 'Мәтінде жазылған, сондықтан келісемін.' : 'Білмеймін') : null;
        const ts = now - d * DAY - Math.floor(r() * 8 * 3600000);
        rows.push([`demo-a${s.id}-${n++}`, s.id, DEMO.code, q.text, q.id, q.skill, q.level, score, hints, answer, ts]);
      }
    }
  }
  for (let i = 0; i < rows.length; i += 200) {
    const chunk = rows.slice(i, i + 200);
    const vals = chunk.map((_, j) => `(${Array.from({ length: 11 }, (_, c) => `$${j * 11 + c + 1}`).join(',')})`).join(',');
    await run(`insert into attempts(id, student_id, class_code, text_id, question_id, skill, level, score, hints, answer, ts) values ${vals} on conflict do nothing`, chunk.flat());
  }
  await run(`insert into assignments(id, class_code, text_id, due, created_at) values ('demo-as1',$1,'aral',$2,$4), ('demo-as2',$1,'phones',$3,$5) on conflict do nothing`,
    [DEMO.code, new Date(now + 2 * DAY).toISOString().slice(0, 10), new Date(now + 6 * DAY).toISOString().slice(0, 10), new Date(now - 4 * DAY), new Date(now - 1.5 * DAY)]);
}

module.exports = { ensureDemo, DEMO };
