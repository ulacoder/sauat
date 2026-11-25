// ИИ-генератор пакетов: учитель вставляет текст из учебника, ИИ делает 4 задания в формате PISA.
// Сервер сам режет текст на предложения и проверяет, что доказательства ссылаются на реальные предложения.
const { chatJson, readBody, clip } = require('./ai');

function splitSentences(text) {
  const paras = text.replace(/\r/g, '').split(/\n\s*\n|\n(?=\s*[-–—•]?\s*[A-ZА-ЯЁӘІҢҒҮҰҚӨҺ0-9])/).map((p) => p.trim()).filter(Boolean);
  return paras.map((p) => (p.replace(/\s+/g, ' ').match(/[^.!?…]+[.!?…]+["»”)]*|[^.!?…]+$/g) || [p]).map((s) => s.trim()).filter((s) => s.length > 1));
}

const SYSTEM = `You write PISA-style reading-literacy tasks for grades 7–9 in Kazakhstan.
You get a text already split into numbered sentences [S1], [S2], ...
Write exactly 4 questions in the requested language:
1) skill "locate", kind "choice", level 1 — find an explicitly stated fact;
2) skill "interpret", kind "evidence", level 2 — the student must tap the sentence(s) that prove/explain something;
3) skill "interpret", kind "choice", level 3 — inference that connects 2+ sentences; distractors must be plausible but contradicted by or absent from the text;
4) skill "evaluate", kind "open", level 4 — the student gives an opinion or judges the author's choice, supported by the text.
Rules: answers must be fully supported by the text; 4 options for choice questions; "evidence" lists sentence numbers like ["S3"].
"hint" teaches a reading strategy without giving the answer. "explain" says why the answer is right, citing the text.
For the open question add "rubric": 2 groups of 3–6 short word stems (lowercase, beginnings of words) that a good answer would contain, "minGroups": 2, and "model": a model answer (2 sentences).
Also give a short "title" for the text.
Return JSON only:
{"title":"...","questions":[{"skill":"locate","kind":"choice","level":1,"prompt":"...","options":["..","..","..",".."],"answer":0,"evidence":["S1"],"hint":"...","explain":"..."}, ...]}`;

async function makePack(req, { text, lang, grade }) {
  lang = lang === 'ru' ? 'ru' : 'kk';
  text = clip(text, 6000).trim();
  const paras = splitSentences(text);
  let n = 0;
  const numbered = paras.map((p) => p.map((s) => { n++; return [`S${n}`, s]; }));
  if (n < 4 || n > 60) { const e = new Error('need 4–60 sentences'); e.status = 400; throw e; }
  const listing = numbered.map((p, i) => `Paragraph ${i + 1}:\n` + p.map(([id, s]) => `[${id}] ${s}`).join('\n')).join('\n\n');
  const out = await chatJson(req, SYSTEM,
    `Language: ${lang === 'kk' ? 'Kazakh (қазақ тілі)' : 'Russian'}. Grade: ${Number(grade) || 8}.\n\n${listing}`,
    { maxTokens: 2500, temperature: 0.4, timeoutMs: 50000 });
    const ids = new Set(numbered.flat().map(([id]) => id));
    const id = 'g' + Date.now().toString(36);
    const fix = (e) => (Array.isArray(e) ? e : []).map((x) => String(x).toUpperCase().replace(/^\[|\]$/g, '')).map((x) => (x.startsWith('S') ? x : 'S' + x)).filter((x) => ids.has(x));
    const W = (v) => ({ [lang]: v });
    const qs = (out.questions || []).slice(0, 4).map((q, i) => {
      const kind = ['choice', 'evidence', 'open'].includes(q.kind) ? q.kind : 'choice';
      const evidence = fix(q.evidence);
      const base = {
        id: `${id}q${i + 1}`,
        skill: ['locate', 'interpret', 'evaluate'].includes(q.skill) ? q.skill : 'interpret',
        level: Math.max(1, Math.min(5, Number(q.level) || i + 1)),
        kind, prompt: W(clip(q.prompt, 400)), evidence: evidence.length ? evidence : [numbered[0][0][0]],
        hint: W(clip(q.hint, 300)), explain: W(clip(q.explain, 500))
      };
      if (kind === 'choice') {
        const opts = (q.options || []).slice(0, 4).map((o) => clip(o, 200));
        base.options = W(opts); base.answer = Math.max(0, Math.min(opts.length - 1, Number(q.answer) || 0));
      }
      if (kind === 'open') {
        base.rubric = W((q.rubric || []).slice(0, 3).map((g) => (Array.isArray(g) ? g : []).slice(0, 8).map((s) => clip(s, 30).toLowerCase())));
        base.minGroups = Math.max(1, Math.min(base.rubric[lang].length || 1, Number(q.minGroups) || 2));
        base.model = W(clip(q.model, 500));
      }
      return base;
    }).filter((q) => q.kind !== 'choice' || (q.options[lang].length >= 2));
    if (qs.length < 3) throw new Error('too few questions');
    const pack = {
      id, custom: true, format: 'article', level: 2.5, minutes: Math.max(2, Math.round(n / 3)),
      title: W(clip(out.title || (lang === 'kk' ? 'Мұғалімнің мәтіні' : 'Текст учителя'), 120)),
      tag: W(lang === 'kk' ? 'ИИ жасаған тапсырмалар' : 'Задания от ИИ'),
      paras: W(numbered), questions: qs
    };
    return pack;
}

module.exports = async (req, res) => {
  res.setHeader('cache-control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  const b = await readBody(req);
  if (String(b.text || '').trim().length < 150) return res.status(400).json({ error: 'text too short' });
  try {
    const pack = await makePack(req, b);
    return res.status(200).json({ pack });
  } catch (e) {
    console.error('generate error', e.message);
    return res.status(e.status || 502).json({ error: e.status ? e.message : 'ai-unavailable' });
  }
};
module.exports.makePack = makePack;
