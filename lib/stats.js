// Аналитика класса из сырых попыток. Та же модель, что на телефоне ученика (Elo / 1PL IRT):
// уровень навыка θ ≈ уровень PISA (1–6), P(верно) = логистика от (θ − сложность вопроса).
const SKILLS = ['locate', 'interpret', 'evaluate'];
const p = (th, lv) => 1 / (1 + Math.exp(-1.3 * (th - lv)));

function replay(attempts) {
  const th = { locate: 1.5, interpret: 1.5, evaluate: 1.5 };
  for (const a of attempts) {
    if (!th[a.skill]) continue;
    th[a.skill] = Math.max(1, Math.min(6, th[a.skill] + 0.55 * (a.score - p(th[a.skill], a.level))));
  }
  return th;
}

const DAY = 86400000;

function classStats(students, attempts, now = Date.now()) {
  const byStudent = new Map(students.map((s) => [s.id, []]));
  for (const a of attempts) if (byStudent.has(a.student_id)) byStudent.get(a.student_id).push(a);

  const roster = students.map((s) => {
    const list = byStudent.get(s.id).sort((x, y) => x.ts - y.ts);
    const theta = replay(list);
    const last = list.length ? Number(list[list.length - 1].ts) : null;
    const week = list.filter((a) => a.ts > now - 7 * DAY);
    const days = new Set(list.map((a) => Math.floor(Number(a.ts) / DAY)));
    let streak = 0; for (let d = Math.floor(now / DAY); days.has(d); d--) streak++;
    const weakest = SKILLS.slice().sort((a, b) => theta[a] - theta[b])[0];
    const texts = new Set(list.map((a) => a.text_id));
    return {
      id: s.id, name: s.name, theta, weakest, attempts: list.length, texts: texts.size,
      accuracy: list.length ? list.reduce((t, a) => t + a.score, 0) / list.length : null,
      weekAttempts: week.length, lastActive: last, streak,
      hintsRate: list.length ? list.filter((a) => a.hints > 0).length / list.length : 0
    };
  });

  const active = roster.filter((r) => r.attempts > 0);
  const avg = {};
  SKILLS.forEach((k) => { avg[k] = active.length ? active.reduce((t, r) => t + r.theta[k], 0) / active.length : 1.5; });
  const below2 = {};
  SKILLS.forEach((k) => { below2[k] = active.length ? active.filter((r) => r.theta[k] < 2).length / active.length : 0; });

  // динамика: средний θ класса по неделям (пересчёт на конец каждой недели)
  const weeks = [];
  for (let w = 4; w >= 0; w--) {
    const end = now - w * 7 * DAY;
    const pts = {};
    SKILLS.forEach((k) => (pts[k] = []));
    for (const s of students) {
      const list = byStudent.get(s.id).filter((a) => a.ts <= end);
      if (!list.length) continue;
      const th = replay(list);
      SKILLS.forEach((k) => pts[k].push(th[k]));
    }
    const row = { end };
    SKILLS.forEach((k) => (row[k] = pts[k].length ? pts[k].reduce((a, b) => a + b, 0) / pts[k].length : null));
    weeks.push(row);
  }

  // статистика по вопросам: где класс ошибается чаще всего
  const qmap = new Map();
  for (const a of attempts) {
    const k = a.question_id;
    if (!qmap.has(k)) qmap.set(k, { id: k, text: a.text_id, skill: a.skill, level: a.level, n: 0, sum: 0, hints: 0 });
    const r = qmap.get(k); r.n++; r.sum += a.score; r.hints += a.hints > 0 ? 1 : 0;
  }
  const questions = [...qmap.values()].map((r) => ({ ...r, rate: r.sum / r.n, hintRate: r.hints / r.n })).sort((a, b) => a.rate - b.rate);

  const inactive = roster.filter((r) => !r.lastActive || r.lastActive < now - 7 * DAY);
  const weakSkill = SKILLS.slice().sort((a, b) => avg[a] - avg[b])[0];
  return {
    roster, avg, below2, weeks, questions, weakSkill,
    kpi: {
      students: students.length, activeWeek: roster.filter((r) => r.weekAttempts > 0).length,
      attempts: attempts.length, inactive: inactive.length,
      accuracy: attempts.length ? attempts.reduce((t, a) => t + a.score, 0) / attempts.length : 0
    }
  };
}

module.exports = { classStats, replay, SKILLS };
