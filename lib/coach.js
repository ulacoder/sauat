// ИИ-коуч: проверяет открытый ответ ученика и даёт короткую обратную связь,
// не выдавая готовый ответ. Имя ученика сюда не передаётся.
const { chatJson, readBody, clip } = require('./ai');

const SYSTEM = {
  kk: `Сен — 7–9 сынып оқушыларына арналған оқу коучысың (PISA функционалдық сауаттылығы).
Оқушының жауабын мәтін мен сұраққа сүйеніп бағала: 0 — мәтінмен байланысы жоқ, 1 — жартылай, 2 — толық және мәтіннен дәлел бар.
Пікір: қазақ тілінде, 2–3 қысқа сөйлем, жылы әрі нақты. Алдымен не жақсы екенін айт, сосын бір нақты қадам ұсын (мәтіннің қай жерін қайта оқу керек).
Дайын жауапты жазба. Тек JSON қайтар: {"score":0|1|2,"feedback":"..."}`,
  ru: `Ты — коуч по чтению для учеников 7–9 классов (функциональная грамотность PISA).
Оцени ответ ученика по тексту и вопросу: 0 — не связан с текстом, 1 — частично, 2 — полно и с опорой на текст.
Отзыв: на русском, 2–3 коротких предложения, тепло и конкретно. Сначала что получилось, потом один конкретный шаг (какое место текста перечитать).
Не пиши готовый ответ. Верни только JSON: {"score":0|1|2,"feedback":"..."}`
};

module.exports = async (req, res) => {
  res.setHeader('cache-control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  const b = await readBody(req);
  const lang = b.lang === 'ru' ? 'ru' : 'kk';
  const answer = clip(b.answer, 1500).trim();
  if (!answer) return res.status(400).json({ error: 'empty answer' });
  const user = [
    `ТЕКСТ:\n${clip(b.text, 4000)}`,
    `ВОПРОС: ${clip(b.question, 600)}`,
    `КРИТЕРИИ ДЛЯ УЧИТЕЛЯ: ${clip(b.criteria, 600)}`,
    `ПРИМЕР СИЛЬНОГО ОТВЕТА (ученику не показывать дословно): ${clip(b.model, 600)}`,
    `КЛАСС: ${Number(b.grade) || 8}`,
    `ОТВЕТ УЧЕНИКА: ${answer}`
  ].join('\n\n');
  try {
    const out = await chatJson(req, SYSTEM[lang], user, { maxTokens: 400, temperature: 0.2, timeoutMs: 18000 });
    const score = Math.max(0, Math.min(2, Math.round(Number(out.score))));
    if (Number.isNaN(score) || !out.feedback) throw new Error('bad-shape');
    return res.status(200).json({ score, feedback: clip(out.feedback, 600) });
  } catch (e) {
    console.error('coach error', e.message);
    return res.status(502).json({ error: 'ai-unavailable' });
  }
};
