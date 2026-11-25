/* Sauat · кабинет учителя. Аналитика класса по трём навыкам PISA, задания, библиотека, ИИ-студия, отчёт. */
(function () {
  'use strict';
  const T = {
    ru: {
      title: 'Кабинет учителя', demo: 'Открыть демо-класс', demoSub: '22 ученика, 4 недели реальной активности',
      heroEy: 'Sauat для учителя', heroH: 'Видно, какой навык чтения проседает у каждого ученика', heroP: 'Ученики занимаются даже без интернета, а вы видите уровень по трём навыкам PISA, трудные вопросы и получаете советы ИИ на следующий урок.',
      newClass: 'Создать класс', className: 'Название класса', grade: 'Класс', lang: 'Язык заданий', school: 'Школа', create: 'Создать',
      haveKey: 'Уже есть класс?', code: 'Код класса', key: 'Ключ учителя', open: 'Открыть',
      overview: 'Обзор', students: 'Ученики', tasks: 'Задания', library: 'Библиотека', studio: 'ИИ-студия', invite: 'Пригласить', report: 'Отчёт',
      kStudents: 'учеников', kActive: 'активны за неделю', kAttempts: 'ответов всего', kAcc: 'средний результат',
      skills: { locate: 'Найти информацию', interpret: 'Понять и сделать вывод', evaluate: 'Оценить и обдумать' },
      level: 'уровень', below2: 'ниже базового 2-го уровня', trend: 'Динамика класса', weeksAgo: (n) => n ? `${n} нед. назад` : 'сейчас',
      aiTitle: 'ИИ-сводка недели', aiBtn: 'Получить рекомендации', aiNo: 'Без ИИ: правило по данным класса', aiYes: 'Сгенерировано ИИ по данным класса',
      hard: 'Где класс ошибается чаще всего', correct: 'верно', hints: 'с подсказкой', alerts: 'Требует внимания',
      inactive: (n, names) => `${n} не заходили 7+ дней: ${names}`, weakAlert: (p, s) => `${p}% класса ниже 2-го уровня по навыку «${s}»`,
      name: 'Ученик', weakest: 'Слабый навык', last: 'Был', streak: 'Серия', answers: 'Ответов', never: 'никогда', today: 'сегодня', daysAgo: (n) => `${n} дн. назад`,
      recent: 'Последние ответы', openAns: 'Открытый ответ', close: 'Закрыть',
      assign: 'Выдать классу', due: 'Срок', done: 'выполнили', remove: 'Убрать', noTasks: 'Заданий пока нет. Выдайте текст из библиотеки.',
      preview: 'Предпросмотр', builtIn: 'Встроенный', aiPack: 'Создано ИИ', questions: 'вопроса',
      fromTopic: 'Новый текст по теме', fromText: 'Из текста учебника', topic: 'Тема', topicPh: 'Например: Байқоңыр, өзен суының ластануы, мектеп асханасы', format: 'Формат',
      fNotice: 'Объявление / расписание', fArticle: 'Информационный текст', fOpinions: 'Два мнения', diff: 'Сложность (уровень PISA)', pasteText: 'Текст (5–15 предложений)',
      generate: 'Сгенерировать', generating: 'ИИ пишет задания…', save: 'Сохранить и выдать классу', saved: 'Сохранено в библиотеку класса и выдано',
      aiFail: 'ИИ сейчас недоступен. Попробуйте ещё раз.', answer: 'Ответ', evidence: 'Доказательство в тексте',
      inviteH: 'Пригласите учеников', inviteP: 'Ученики открывают sauat-ссылку, вводят код и своё имя. Регистрация не нужна.', link: 'Ссылка для учеников', print: 'Печать', copy: 'Копировать',
      keyWarn: 'Сохраните ключ учителя — по нему вы откроете кабинет с другого устройства:', csv: 'Скачать CSV', reportH: 'Отчёт по классу',
      demoBadge: 'ДЕМО', logout: 'Сменить класс', studentApp: 'Приложение ученика', copied: 'Скопировано', created: 'Класс создан',
      noData: 'Пока нет ответов. Пригласите учеников по коду.', of: 'из', levelShort: 'ур.'
    },
    kk: {
      title: 'Мұғалім кабинеті', demo: 'Демо-сыныпты ашу', demoSub: '22 оқушы, 4 апталық белсенділік',
      heroEy: 'Sauat мұғалімге', heroH: 'Әр оқушының қай оқу дағдысы әлсіз екені көрінеді', heroP: 'Оқушылар интернетсіз де жаттығады, ал сіз PISA-ның үш дағдысы бойынша деңгейді, қиын сұрақтарды көріп, келесі сабаққа ИИ кеңесін аласыз.',
      newClass: 'Сынып құру', className: 'Сынып атауы', grade: 'Сынып', lang: 'Тапсырма тілі', school: 'Мектеп', create: 'Құру',
      haveKey: 'Сыныбыңыз бар ма?', code: 'Сынып коды', key: 'Мұғалім кілті', open: 'Ашу',
      overview: 'Шолу', students: 'Оқушылар', tasks: 'Тапсырмалар', library: 'Кітапхана', studio: 'ИИ-студия', invite: 'Шақыру', report: 'Есеп',
      kStudents: 'оқушы', kActive: 'апта бойы белсенді', kAttempts: 'барлық жауап', kAcc: 'орташа нәтиже',
      skills: { locate: 'Ақпаратты табу', interpret: 'Түсіну және қорытынды', evaluate: 'Бағалау және ойлану' },
      level: 'деңгей', below2: 'базалық 2-деңгейден төмен', trend: 'Сынып динамикасы', weeksAgo: (n) => n ? `${n} апта бұрын` : 'қазір',
      aiTitle: 'Аптаның ИИ-шолуы', aiBtn: 'Ұсыныс алу', aiNo: 'ИИ-сіз: сынып деректері бойынша ереже', aiYes: 'ИИ сынып деректері бойынша жасады',
      hard: 'Сынып жиі қателесетін сұрақтар', correct: 'дұрыс', hints: 'кеңеспен', alerts: 'Назар аударыңыз',
      inactive: (n, names) => `${n} оқушы 7+ күн кірмеген: ${names}`, weakAlert: (p, s) => `Сыныптың ${p}%-ы «${s}» дағдысында 2-деңгейден төмен`,
      name: 'Оқушы', weakest: 'Әлсіз дағды', last: 'Соңғы кіру', streak: 'Қатар', answers: 'Жауап', never: 'ешқашан', today: 'бүгін', daysAgo: (n) => `${n} күн бұрын`,
      recent: 'Соңғы жауаптар', openAns: 'Ашық жауап', close: 'Жабу',
      assign: 'Сыныпқа беру', due: 'Мерзімі', done: 'орындады', remove: 'Алып тастау', noTasks: 'Тапсырма әлі жоқ. Кітапханадан мәтін беріңіз.',
      preview: 'Қарау', builtIn: 'Кіріктірілген', aiPack: 'ИИ жасаған', questions: 'сұрақ',
      fromTopic: 'Тақырып бойынша жаңа мәтін', fromText: 'Оқулық мәтінінен', topic: 'Тақырып', topicPh: 'Мысалы: Байқоңыр, өзен суының ластануы, мектеп асханасы', format: 'Формат',
      fNotice: 'Хабарландыру / кесте', fArticle: 'Ақпараттық мәтін', fOpinions: 'Екі пікір', diff: 'Күрделілігі (PISA деңгейі)', pasteText: 'Мәтін (5–15 сөйлем)',
      generate: 'Жасау', generating: 'ИИ тапсырма жазып жатыр…', save: 'Сақтау және сыныпқа беру', saved: 'Сынып кітапханасына сақталды және берілді',
      aiFail: 'ИИ қазір қолжетімсіз. Қайталап көріңіз.', answer: 'Жауап', evidence: 'Мәтіндегі дәлел',
      inviteH: 'Оқушыларды шақырыңыз', inviteP: 'Оқушылар сілтемені ашып, кодты және атын енгізеді. Тіркелу қажет емес.', link: 'Оқушыларға сілтеме', print: 'Басып шығару', copy: 'Көшіру',
      keyWarn: 'Мұғалім кілтін сақтаңыз — басқа құрылғыдан кабинетті осы кілтпен ашасыз:', csv: 'CSV жүктеу', reportH: 'Сынып бойынша есеп',
      demoBadge: 'ДЕМО', logout: 'Сыныпты ауыстыру', studentApp: 'Оқушы қосымшасы', copied: 'Көшірілді', created: 'Сынып құрылды',
      noData: 'Әзірге жауап жоқ. Оқушыларды код арқылы шақырыңыз.', of: '/', levelShort: 'д.'
    }
  };
  const SK = ['locate', 'interpret', 'evaluate'];
  const LS = { get: (k, d) => { try { return JSON.parse(localStorage.getItem('sauatT_' + k)) ?? d; } catch (e) { return d; } }, set: (k, v) => { try { localStorage.setItem('sauatT_' + k, JSON.stringify(v)); } catch (e) {} } };
  const S = { lang: LS.get('lang', 'ru'), classes: LS.get('classes', []), cur: LS.get('cur', null), tab: 'overview', data: null, insights: null, studio: null };
  const t = (k) => T[S.lang][k];
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const L = (o) => (o && (o[S.lang] || o.kk || o.ru)) || '';
  const $ = (s) => document.querySelector(s);
  const root = $('#root');
  const logo = '<svg viewBox="0 0 32 32"><rect width="32" height="32" rx="9" fill="#14705f"/><path d="M7 10.5c3-1.4 6-1.4 9 0v12c-3-1.4-6-1.4-9 0z" fill="#e9f3f0"/><path d="M25 10.5c-3-1.4-6-1.4-9 0v12c3-1.4 6-1.4 9 0z" fill="#fff"/><circle cx="22.5" cy="8" r="3" fill="#e2a03f"/></svg>';
  const toast = (m) => { const d = document.createElement('div'); d.className = 'toast'; d.textContent = m; document.body.appendChild(d); setTimeout(() => d.remove(), 2600); };
  const lvCls = (v) => 'lv lv' + Math.max(1, Math.min(4, Math.floor(v)));
  const lv = (v) => `<span class="${lvCls(v)}">${v.toFixed(1)}</span>`;
  const ago = (ts) => { if (!ts) return t('never'); const d = Math.floor((Date.now() - ts) / 86400000); return d <= 0 ? t('today') : t('daysAgo')(d); };
  const texts = () => (globalThis.SAUAT_TEXTS || []).concat((S.data && S.data.packs) || []);
  const textById = (id) => texts().find((x) => x.id === id);
  const qById = (id) => { for (const x of texts()) { const q = x.questions.find((y) => y.id === id); if (q) return { tx: x, q }; } return null; };

  async function api(method, path, body) {
    const r = await fetch('/api/' + path, { method, headers: body ? { 'content-type': 'application/json' } : {}, body: body ? JSON.stringify(body) : undefined });
    const j = await r.json().catch(() => ({})); if (!r.ok) throw new Error(j.error || 'http'); return j;
  }
  const cur = () => S.classes.find((c) => c.code === S.cur);

  // ---------- вход ----------
  function viewLogin() {
    root.innerHTML = `<div class="center"><div class="login">
      <div class="card hero"><a class="brand" href="/" style="padding:0">${logo}Sauat</a>
        <p class="small" style="letter-spacing:2px;text-transform:uppercase;color:#e2a03f;margin-top:18px">${t('heroEy')}</p>
        <h1>${t('heroH')}</h1><p>${t('heroP')}</p>
        <p style="margin-top:22px"><button class="btn big" id="demo" style="background:#e2a03f;color:#1d2422">▶ ${t('demo')}</button></p>
        <p class="small">${t('demoSub')}</p>
        <p class="small" style="margin-top:18px"><a href="#" id="lg" style="color:#fff">${S.lang === 'ru' ? 'Қазақша' : 'Русский'}</a> · <a href="/app/" style="color:#fff">${t('studentApp')} →</a></p></div>
      <div class="grid">
        <div class="card"><h3>${t('newClass')}</h3>
          <label>${t('className')}</label><input type="text" id="cn" placeholder="7 «А»">
          <div class="grid" style="grid-template-columns:1fr 1fr;gap:10px"><div><label>${t('grade')}</label><select id="cg">${[7, 8, 9].map((g) => `<option ${g === 8 ? 'selected' : ''}>${g}</option>`).join('')}</select></div>
          <div><label>${t('lang')}</label><select id="cl"><option value="kk">Қазақша</option><option value="ru">Русский</option></select></div></div>
          <label>${t('school')}</label><input type="text" id="cs" placeholder="№ 12 ЖББМ">
          <p><button class="btn" id="mk">${t('create')}</button></p></div>
        <div class="card"><h3>${t('haveKey')}</h3>
          <div class="grid" style="grid-template-columns:1fr 1fr;gap:10px"><div><label>${t('code')}</label><input type="text" id="oc" placeholder="ABC234"></div><div><label>${t('key')}</label><input type="text" id="ok"></div></div>
          <p><button class="btn ghost" id="op">${t('open')}</button></p></div>
      </div></div></div>`;
    $('#lg').onclick = (e) => { e.preventDefault(); S.lang = S.lang === 'ru' ? 'kk' : 'ru'; LS.set('lang', S.lang); render(); };
    $('#demo').onclick = () => addClass({ code: 'DEMO24', key: 'demo' });
    $('#op').onclick = () => addClass({ code: $('#oc').value.trim().toUpperCase(), key: $('#ok').value.trim() });
    $('#mk').onclick = async () => {
      const name = $('#cn').value.trim(); if (!name) return $('#cn').focus();
      try {
        const r = await api('POST', 'class', { name, grade: $('#cg').value, lang: $('#cl').value, school: $('#cs').value });
        toast(t('created')); S.tab = 'invite'; addClass({ code: r.code, key: r.key, fresh: true });
      } catch (e) { toast(e.message); }
    };
  }
  async function addClass(c) {
    root.innerHTML = '<div class="center"><span class="spin" style="width:32px;height:32px;color:#0f5b4f"></span></div>';
    try {
      S.cur = c.code; await load(c);
      const list = S.classes.filter((x) => x.code !== c.code); list.unshift({ code: c.code, key: c.key, name: S.data.class.name, fresh: c.fresh });
      S.classes = list; LS.set('classes', list); LS.set('cur', c.code); render();
    } catch (e) { S.cur = null; toast(e.message === 'wrong-key' ? '🔒 key' : e.message); }
  }
  async function load(c = cur()) {
    S.data = await api('GET', `dashboard?code=${encodeURIComponent(c.code)}&key=${encodeURIComponent(c.key)}`);
  }

  // ---------- оболочка ----------
  const NAV = [['overview', '📊'], ['students', '👥'], ['tasks', '📌'], ['library', '📚'], ['studio', '✨'], ['invite', '🔗'], ['report', '🖨']];
  function shell(inner) {
    const d = S.data;
    root.innerHTML = `<div class="layout"><aside class="side">
      <a class="brand" href="/">${logo}Sauat</a>
      <select id="sw">${S.classes.map((c) => `<option value="${esc(c.code)}" ${c.code === S.cur ? 'selected' : ''}>${esc(c.name)} · ${esc(c.code)}</option>`).join('')}<option value="+">+ ${t('newClass')}</option></select>
      <nav class="nav">${NAV.map(([k, i]) => `<button data-tab="${k}" class="${S.tab === k ? 'on' : ''}">${i} ${t(k)}</button>`).join('')}</nav>
      <div class="foot"><button id="lg">${S.lang === 'ru' ? 'Қазақша' : 'Русский'}</button><a href="/app/" style="color:#cfe0db">${t('studentApp')} →</a>
      <span>${d.class.demo ? `<b style="color:#e2a03f">${t('demoBadge')}</b> · ` : ''}${esc(d.class.school || '')}</span></div></aside>
      <main class="main">${inner}</main></div>`;
    root.querySelectorAll('[data-tab]').forEach((b) => (b.onclick = () => { S.tab = b.dataset.tab; render(); window.scrollTo(0, 0); }));
    $('#sw').onchange = (e) => { if (e.target.value === '+') { S.cur = null; LS.set('cur', null); return render(); } S.insights = null; addClass(S.classes.find((c) => c.code === e.target.value)); };
    $('#lg').onclick = () => { S.lang = S.lang === 'ru' ? 'kk' : 'ru'; LS.set('lang', S.lang); render(); };
  }
  const head = (title, right = '') => `<div class="head"><div><h1>${title}</h1><div class="sub">${esc(S.data.class.name)} · ${esc(S.data.class.code)} · ${S.data.stats.kpi.students} ${t('kStudents')}</div></div><span class="sp"></span>${right}</div>`;

  // ---------- графики ----------
  function lineChart(weeks) {
    const W = 560, H = 210, P = 34; const n = weeks.length;
    const x = (i) => P + (i * (W - P * 2)) / (n - 1); const y = (v) => H - P - ((v - 1) / 3) * (H - P * 2);
    const col = { locate: '#2f6db5', interpret: '#8a4fb8', evaluate: '#c46a1c' };
    let g = '';
    for (let v = 1; v <= 4; v++) g += `<line x1="${P}" x2="${W - P}" y1="${y(v)}" y2="${y(v)}" stroke="#ece9e2"/><text x="6" y="${y(v) + 4}" font-size="11" fill="#8a948f">${v}</text>`;
    g += `<line x1="${P}" x2="${W - P}" y1="${y(2)}" y2="${y(2)}" stroke="#e2a03f" stroke-dasharray="4 4"/><text x="${W - P - 4}" y="${y(2) - 6}" font-size="11" fill="#b77a1c" text-anchor="end">PISA 2</text>`;
    for (const k of SK) {
      const pts = weeks.map((w, i) => (w[k] == null ? null : [x(i), y(w[k])])).filter(Boolean);
      if (!pts.length) continue;
      g += `<polyline fill="none" stroke="${col[k]}" stroke-width="3" stroke-linejoin="round" points="${pts.map((p) => p.join(',')).join(' ')}"/>`;
      g += pts.map((p) => `<circle cx="${p[0]}" cy="${p[1]}" r="4" fill="${col[k]}"/>`).join('');
    }
    g += weeks.map((w, i) => `<text x="${x(i)}" y="${H - 8}" font-size="11" fill="#8a948f" text-anchor="middle">${t('weeksAgo')(n - 1 - i)}</text>`).join('');
    return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="${t('trend')}">${g}</svg>`;
  }
  const legend = () => `<div class="legend">${SK.map((k) => `<span><i style="background:var(--${k})"></i>${t('skills')[k]}</span>`).join('')}</div>`;

  // ---------- обзор ----------
  function viewOverview() {
    const s = S.data.stats, k = s.kpi;
    if (!k.attempts) return shell(head(t('overview')) + `<div class="card empty">${t('noData')}<p><button class="btn" data-go="invite">${t('invite')}</button></p></div>`), bindGo();
    const inactive = s.roster.filter((r) => !r.lastActive || r.lastActive < Date.now() - 7 * 86400000);
    const weakPct = Math.round(s.below2[s.weakSkill] * 100);
    const hard = s.questions.slice(0, 5).map((x) => ({ ...x, m: qById(x.id) }));
    const ins = S.insights;
    shell(head(t('overview')) + `
      <div class="grid g4">
        <div class="card kpi"><div class="v">${k.students}</div><div class="l">${t('kStudents')}</div></div>
        <div class="card kpi"><div class="v">${k.activeWeek}</div><div class="l">${t('kActive')}</div><div class="bar" style="margin-top:8px"><i style="width:${Math.round(k.activeWeek / Math.max(1, k.students) * 100)}%"></i></div></div>
        <div class="card kpi"><div class="v">${k.attempts}</div><div class="l">${t('kAttempts')}</div></div>
        <div class="card kpi"><div class="v">${Math.round(k.accuracy * 100)}%</div><div class="l">${t('kAcc')}</div></div>
      </div>
      <div class="grid g3" style="margin-top:14px">${SK.map((sk) => `<div class="card skillcard" style="border-top-color:var(--${sk})">
        <div class="muted small">${t('skills')[sk]}</div><div class="v">${s.avg[sk].toFixed(1)} <span class="small muted">${t('level')}</span></div>
        <div class="small"><b style="color:${s.below2[sk] > 0.5 ? 'var(--bad)' : 'var(--ink)'}">${Math.round(s.below2[sk] * 100)}%</b> ${t('below2')}</div></div>`).join('')}</div>
      <div class="grid g2" style="margin-top:14px">
        <div class="card"><h3>${t('trend')}</h3>${lineChart(s.weeks)}${legend()}</div>
        <div class="card ai"><h3>✨ ${t('aiTitle')}</h3>
          ${ins ? `<p style="font-weight:700;margin:4px 0 6px">${esc(ins.headline)}</p>${ins.tips.map((x) => `<div class="tip"><b>${esc(x.title)}</b>${esc(x.text)}</div>`).join('')}<p class="small muted" style="margin-top:10px">${ins.ai ? t('aiYes') : t('aiNo')}</p>`
            : `<p class="muted">${S.lang === 'ru' ? 'ИИ проанализирует ответы класса и предложит, что делать на следующей неделе.' : 'ИИ сынып жауаптарын талдап, келесі аптаға не істеу керегін ұсынады.'}</p><p><button class="btn" id="aib">${t('aiBtn')}</button></p>`}
        </div>
      </div>
      <div class="grid g2" style="margin-top:14px">
        <div class="card"><h3>${t('hard')}</h3>${hard.map((x) => `<div style="margin-bottom:12px">
          <div style="display:flex;gap:8px;align-items:center"><span class="pill p-${x.skill}">${t('skills')[x.skill]}</span><span class="small muted">${x.m ? esc(L(x.m.tx.title)) : x.id}</span></div>
          <div style="margin:4px 0">${x.m ? esc(L(x.m.q.prompt)) : ''}</div>
          <div class="bar"><i style="width:${Math.round(x.rate * 100)}%;background:${x.rate < 0.4 ? 'var(--bad)' : 'var(--accent)'}"></i></div>
          <div class="small muted">${Math.round(x.rate * 100)}% ${t('correct')} · ${Math.round(x.hintRate * 100)}% ${t('hints')} · n=${x.n}</div></div>`).join('')}</div>
        <div class="card"><h3>${t('alerts')}</h3>
          <div class="alert bad">⚠️ ${t('weakAlert')(weakPct, t('skills')[s.weakSkill])}</div>
          ${inactive.length ? `<div class="alert">💤 ${t('inactive')(inactive.length, inactive.map((r) => esc(r.name)).join(', '))}</div>` : ''}
          ${S.data.assignments.map((a) => { const tx = textById(a.textId); return tx ? `<div class="alert" style="background:#eef5f3">📌 ${esc(L(tx.title))}: ${a.done} ${t('of')} ${k.students} ${t('done')}${a.due ? ' · ' + t('due') + ' ' + a.due : ''}</div>` : ''; }).join('')}
        </div>
      </div>`);
    const b = $('#aib'); if (b) b.onclick = async () => {
      b.disabled = true; b.innerHTML = '<span class="spin"></span>';
      try { S.insights = await api('POST', 'insights', { ...cur(), lang: S.lang }); } catch (e) { toast(t('aiFail')); }
      render();
    };
  }

  // ---------- ученики ----------
  function viewStudents() {
    const r = S.data.stats.roster.slice().sort((a, b) => (a.theta.locate + a.theta.interpret + a.theta.evaluate) - (b.theta.locate + b.theta.interpret + b.theta.evaluate));
    shell(head(t('students')) + `<div class="card" style="overflow:auto"><table><tr><th>${t('name')}</th>${SK.map((k) => `<th style="color:var(--${k})">${t('skills')[k]}</th>`).join('')}<th>${t('weakest')}</th><th>${t('answers')}</th><th>${t('streak')}</th><th>${t('last')}</th></tr>
      ${r.map((x) => `<tr class="click" data-id="${esc(x.id)}"><td><b>${esc(x.name)}</b></td>${SK.map((k) => `<td>${x.attempts ? lv(x.theta[k]) : '—'}</td>`).join('')}
      <td>${x.attempts ? `<span class="pill p-${x.weakest}">${t('skills')[x.weakest]}</span>` : ''}</td><td>${x.attempts}</td><td>${x.streak ? '🔥 ' + x.streak : '—'}</td><td class="small ${x.lastActive && x.lastActive > Date.now() - 7 * 86400000 ? '' : 'muted'}">${ago(x.lastActive)}</td></tr>`).join('')}</table>
      <p class="small muted">PISA: 1 — ${S.lang === 'ru' ? 'ниже базового' : 'базалықтан төмен'}, 2 — ${S.lang === 'ru' ? 'базовый' : 'базалық'}, 3–4 — ${S.lang === 'ru' ? 'выше базового' : 'базалықтан жоғары'}</p></div>`);
    root.querySelectorAll('tr[data-id]').forEach((tr) => (tr.onclick = () => openStudent(tr.dataset.id)));
  }
  async function openStudent(id) {
    const r = S.data.stats.roster.find((x) => x.id === id);
    const d = document.createElement('div'); d.className = 'drawer'; d.innerHTML = `<div class="panel"><div class="empty"><span class="spin"></span></div></div>`;
    d.onclick = (e) => { if (e.target === d) d.remove(); }; document.body.appendChild(d);
    let det; try { det = await api('GET', `student?code=${S.cur}&key=${encodeURIComponent(cur().key)}&id=${encodeURIComponent(id)}`); } catch (e) { d.remove(); return toast(e.message); }
    d.querySelector('.panel').innerHTML = `<div class="head"><div><h1>${esc(r.name)}</h1><div class="sub">${r.attempts} ${t('answers').toLowerCase()} · ${ago(r.lastActive)}</div></div><span class="sp"></span><button class="btn ghost" id="cl">${t('close')}</button></div>
      <div class="grid g3">${SK.map((k) => `<div class="card skillcard" style="border-top-color:var(--${k});padding:12px"><div class="small muted">${t('skills')[k]}</div><div style="font-size:26px;font-weight:800">${r.theta[k].toFixed(1)}</div></div>`).join('')}</div>
      <h3 style="margin:18px 0 8px">${t('recent')}</h3>
      ${det.attempts.slice(0, 40).map((a) => { const m = qById(a.question_id); return `<div class="qitem"><div style="display:flex;gap:8px;align-items:center;justify-content:space-between"><span class="pill p-${a.skill}">${t('skills')[a.skill]}</span><span class="${lvCls(1 + a.score * 3)}">${Math.round(a.score * 100)}%</span></div>
        <div style="margin-top:6px">${m ? esc(L(m.q.prompt)) : esc(a.question_id)}</div><div class="small muted">${m ? esc(L(m.tx.title)) + ' · ' : ''}${new Date(a.ts).toLocaleDateString()}${a.hints ? ' · 💡×' + a.hints : ''}</div>
        ${a.answer ? `<div class="ans"><b>${t('openAns')}:</b> ${esc(a.answer)}</div>` : ''}</div>`; }).join('')}`;
    d.querySelector('#cl').onclick = () => d.remove();
  }

  // ---------- задания ----------
  function viewTasks() {
    const k = S.data.stats.kpi.students;
    shell(head(t('tasks'), `<button class="btn" data-go="library">+ ${t('assign')}</button>`) + (S.data.assignments.length ? `<div class="grid">${S.data.assignments.map((a) => {
      const tx = textById(a.textId); if (!tx) return '';
      return `<div class="card" style="display:flex;gap:16px;align-items:center;flex-wrap:wrap"><div style="flex:1;min-width:220px"><h3 style="margin:0">${esc(L(tx.title))}</h3><div class="small muted">${esc(L(tx.tag))}${a.due ? ' · ' + t('due') + ': ' + a.due : ''}</div></div>
        <div style="width:260px"><div class="bar"><i style="width:${Math.round(a.done / Math.max(1, k) * 100)}%"></i></div><div class="small muted">${a.done} ${t('of')} ${k} ${t('done')}</div></div>
        <button class="btn ghost" data-rm="${esc(a.id)}">${t('remove')}</button></div>`;
    }).join('')}</div>` : `<div class="card empty">${t('noTasks')}</div>`));
    bindGo();
    root.querySelectorAll('[data-rm]').forEach((b) => (b.onclick = async () => { await api('POST', 'unassign', { ...cur(), id: b.dataset.rm }); await load(); render(); }));
  }

  // ---------- библиотека ----------
  function skillsOf(tx) { return [...new Set(tx.questions.map((q) => q.skill))]; }
  function viewLibrary() {
    shell(head(t('library'), `<button class="btn alt" data-go="studio">✨ ${t('studio')}</button>`) + `<div class="lib">${texts().map((tx) => `<div class="card">
      <div class="small muted">${tx.custom ? '✨ ' + t('aiPack') : t('builtIn')} · ${esc(L(tx.tag))}</div><h3 style="margin:0">${esc(L(tx.title))}</h3>
      <div>${skillsOf(tx).map((k) => `<span class="pill p-${k}" style="margin:0 4px 4px 0">${t('skills')[k]}</span>`).join('')}</div>
      <div class="small muted">${tx.questions.length} ${t('questions')} · ${t('level')} ${Math.min(...tx.questions.map((q) => q.level))}–${Math.max(...tx.questions.map((q) => q.level))}</div>
      <div class="acts"><button class="btn ghost" data-pv="${esc(tx.id)}">${t('preview')}</button><button class="btn" data-as="${esc(tx.id)}">${t('assign')}</button></div></div>`).join('')}</div>`);
    bindGo();
    root.querySelectorAll('[data-pv]').forEach((b) => (b.onclick = () => preview(textById(b.dataset.pv))));
    root.querySelectorAll('[data-as]').forEach((b) => (b.onclick = () => assignDialog(b.dataset.as)));
  }
  function packHtml(tx) {
    const ps = L(tx.paras) || [];
    return `<div class="preview"><div class="card" style="background:#fffdf8">${ps.map((p, i) => `<p><b class="muted small">${i + 1}</b> ${p.map(([id, s]) => esc(s)).join(' ')}</p>`).join('')}</div>
      ${tx.questions.map((q, i) => { const sents = Object.fromEntries(ps.flat()); return `<div class="qitem"><span class="pill p-${q.skill}">${t('skills')[q.skill]}</span> <span class="small muted">${t('level')} ${q.level} · ${q.kind}</span>
        <div style="margin:6px 0;font-weight:700">${i + 1}. ${esc(L(q.prompt))}</div>
        ${q.kind === 'choice' ? `<ol type="A" style="margin:4px 0 4px 18px">${L(q.options).map((o, j) => `<li ${j === q.answer ? 'style="font-weight:700;color:var(--ok)"' : ''}>${esc(o)}${j === q.answer ? ' ✓' : ''}</li>`).join('')}</ol>` : ''}
        ${q.kind === 'open' ? `<div class="ans"><b>${t('answer')}:</b> ${esc(L(q.model))}</div>` : ''}
        <div class="small muted" style="margin-top:6px">${t('evidence')}: «${esc((q.evidence || []).map((e) => sents[e]).filter(Boolean).join(' '))}»</div></div>`; }).join('')}</div>`;
  }
  function preview(tx) {
    const d = document.createElement('div'); d.className = 'drawer';
    d.innerHTML = `<div class="panel"><div class="head"><div><h1>${esc(L(tx.title))}</h1><div class="sub">${esc(L(tx.tag))}</div></div><span class="sp"></span><button class="btn" id="as">${t('assign')}</button><button class="btn ghost" id="cl">${t('close')}</button></div>${packHtml(tx)}</div>`;
    d.onclick = (e) => { if (e.target === d) d.remove(); }; document.body.appendChild(d);
    d.querySelector('#cl').onclick = () => d.remove();
    d.querySelector('#as').onclick = () => { d.remove(); assignDialog(tx.id); };
  }
  function assignDialog(id) {
    const tx = textById(id);
    const d = document.createElement('div'); d.className = 'drawer';
    const due = new Date(Date.now() + 5 * 86400000).toISOString().slice(0, 10);
    d.innerHTML = `<div class="panel" style="max-width:440px"><h1>${t('assign')}</h1><p><b>${esc(L(tx.title))}</b></p><label>${t('due')}</label><input type="date" id="du" value="${due}"><p style="margin-top:16px"><button class="btn" id="ok">${t('assign')}</button> <button class="btn ghost" id="cl">${t('close')}</button></p></div>`;
    d.onclick = (e) => { if (e.target === d) d.remove(); }; document.body.appendChild(d);
    d.querySelector('#cl').onclick = () => d.remove();
    d.querySelector('#ok').onclick = async () => { await api('POST', 'assign', { ...cur(), textId: id, due: d.querySelector('#du').value }); d.remove(); await load(); S.tab = 'tasks'; render(); };
  }

  // ---------- ИИ-студия ----------
  function viewStudio() {
    const st = S.studio || (S.studio = { mode: 'topic', lang: S.data.class.lang, format: 'article', level: 2, topic: '', text: '', pack: null, busy: false });
    shell(head('✨ ' + t('studio')) + `<div class="grid g2">
      <div class="card"><div class="tabs"><button data-m="topic" class="${st.mode === 'topic' ? 'on' : ''}">${t('fromTopic')}</button><button data-m="text" class="${st.mode === 'text' ? 'on' : ''}">${t('fromText')}</button></div>
        ${st.mode === 'topic' ? `<label>${t('topic')}</label><input type="text" id="tp" value="${esc(st.topic)}" placeholder="${esc(t('topicPh'))}">
          <div class="grid" style="grid-template-columns:1fr 1fr;gap:10px"><div><label>${t('format')}</label><select id="fm"><option value="article">${t('fArticle')}</option><option value="notice">${t('fNotice')}</option><option value="opinions">${t('fOpinions')}</option></select></div>
          <div><label>${t('diff')}</label><select id="lv">${[1, 2, 3, 4].map((v) => `<option ${v === st.level ? 'selected' : ''}>${v}</option>`).join('')}</select></div></div>`
          : `<label>${t('pasteText')}</label><textarea id="tx">${esc(st.text)}</textarea>`}
        <label>${t('lang')}</label><select id="lg2"><option value="kk" ${st.lang === 'kk' ? 'selected' : ''}>Қазақша</option><option value="ru" ${st.lang === 'ru' ? 'selected' : ''}>Русский</option></select>
        <p style="margin-top:14px"><button class="btn" id="gen" ${st.busy ? 'disabled' : ''}>${st.busy ? `<span class="spin"></span> ${t('generating')}` : '✨ ' + t('generate')}</button></p>
        <p class="small muted">${S.lang === 'ru' ? 'ИИ (Gemini через Vercel AI Gateway) пишет текст и 4 вопроса PISA: найти, понять, «нажми доказательство», оценить. Сервер проверяет, что каждое доказательство — реальное предложение текста.' : 'ИИ мәтін мен PISA-ның 4 сұрағын жазады: табу, түсіну, «дәлелді бас», бағалау. Сервер әр дәлелдің мәтіндегі нақты сөйлем екенін тексереді.'}</p></div>
      <div>${st.pack ? `<div class="card" style="margin-bottom:12px;display:flex;gap:10px;align-items:center"><b style="flex:1">${esc(L(st.pack.title))}</b><button class="btn" id="sv">${t('save')}</button></div>${packHtml(st.pack)}` : `<div class="card empty">✨</div>`}</div></div>`);
    if ($('#fm')) $('#fm').value = st.format;
    root.querySelectorAll('[data-m]').forEach((b) => (b.onclick = () => { keep(); st.mode = b.dataset.m; render(); }));
    function keep() { if ($('#tp')) st.topic = $('#tp').value; if ($('#tx')) st.text = $('#tx').value; if ($('#fm')) st.format = $('#fm').value; if ($('#lv')) st.level = +$('#lv').value; st.lang = $('#lg2').value; }
    $('#gen').onclick = async () => {
      keep(); st.busy = true; render();
      try {
        const r = st.mode === 'topic' ? await api('POST', 'compose', { topic: st.topic, format: st.format, level: st.level, lang: st.lang, grade: S.data.class.grade })
          : await api('POST', 'generate', { text: st.text, lang: st.lang, grade: S.data.class.grade });
        st.pack = r.pack;
      } catch (e) { toast(t('aiFail')); }
      st.busy = false; render();
    };
    const sv = $('#sv'); if (sv) sv.onclick = async () => {
      sv.disabled = true;
      await api('POST', 'pack', { ...cur(), pack: st.pack });
      await api('POST', 'assign', { ...cur(), textId: st.pack.id, due: new Date(Date.now() + 5 * 86400000).toISOString().slice(0, 10) });
      toast(t('saved')); st.pack = null; await load(); S.tab = 'tasks'; render();
    };
  }

  // ---------- приглашение ----------
  function viewInvite() {
    const c = cur(); const link = `${location.origin}/app/?join=${S.data.class.code}`;
    let qr = ''; if (typeof qrcode === 'function') { const q = qrcode(0, 'M'); q.addData(link); q.make(); qr = q.createSvgTag({ cellSize: 6, margin: 2, scalable: true }); }
    shell(head(t('invite'), `<button class="btn ghost" onclick="print()">🖨 ${t('print')}</button>`) + `<div class="grid g2">
      <div class="card"><h3>${t('inviteH')}</h3><p class="muted">${t('inviteP')}</p><div class="code">${esc(S.data.class.code)}</div>
        <label>${t('link')}</label><div style="display:flex;gap:8px"><input type="text" value="${esc(link)}" readonly id="lnk"><button class="btn alt" id="cp">${t('copy')}</button></div>
        ${S.data.class.demo ? '' : `<div class="alert" style="margin-top:16px">🔑 ${t('keyWarn')} <b style="font-family:monospace">${esc(c.key)}</b></div>`}</div>
      <div class="card qrbox" style="text-align:center">${qr}<p class="small muted">${esc(S.data.class.name)} · Sauat</p></div></div>`);
    $('#cp').onclick = () => { navigator.clipboard && navigator.clipboard.writeText(link); toast(t('copied')); };
  }

  // ---------- отчёт ----------
  function viewReport() {
    const s = S.data.stats;
    shell(head(t('reportH'), `<button class="btn ghost" id="csv">⬇ ${t('csv')}</button><button class="btn" onclick="print()">🖨 ${t('print')}</button>`) + `
      <div class="card"><div class="grid g3">${SK.map((k) => `<div><div class="small muted">${t('skills')[k]}</div><div style="font-size:28px;font-weight:800">${s.avg[k].toFixed(1)}</div><div class="small">${Math.round(s.below2[k] * 100)}% ${t('below2')}</div></div>`).join('')}</div></div>
      <div class="card" style="margin-top:14px"><h3>${t('trend')}</h3>${lineChart(s.weeks)}${legend()}</div>
      <div class="card" style="margin-top:14px"><table><tr><th>${t('name')}</th>${SK.map((k) => `<th>${t('skills')[k]}</th>`).join('')}<th>${t('weakest')}</th><th>${t('answers')}</th></tr>
      ${s.roster.map((x) => `<tr><td>${esc(x.name)}</td>${SK.map((k) => `<td>${x.attempts ? lv(x.theta[k]) : '—'}</td>`).join('')}<td>${x.attempts ? t('skills')[x.weakest] : ''}</td><td>${x.attempts}</td></tr>`).join('')}</table></div>`);
    $('#csv').onclick = () => {
      const rows = [['name', ...SK, 'weakest', 'attempts', 'last_active']].concat(s.roster.map((x) => [x.name, ...SK.map((k) => x.theta[k].toFixed(2)), x.weakest, x.attempts, x.lastActive ? new Date(x.lastActive).toISOString() : '']));
      const blob = new Blob(['﻿' + rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n')], { type: 'text/csv' });
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `sauat-${S.data.class.code}.csv`; a.click();
    };
  }

  function bindGo() { root.querySelectorAll('[data-go]').forEach((b) => (b.onclick = () => { S.tab = b.dataset.go; render(); })); }
  function render() {
    document.documentElement.lang = S.lang;
    if (!S.cur || !S.data) return viewLogin();
    ({ overview: viewOverview, students: viewStudents, tasks: viewTasks, library: viewLibrary, studio: viewStudio, invite: viewInvite, report: viewReport }[S.tab] || viewOverview)();
  }

  (async () => {
    const qs = new URLSearchParams(location.search);
    if (qs.get('demo') !== null) return addClass({ code: 'DEMO24', key: 'demo' });
    if (S.cur && cur()) { try { await load(); } catch (e) { S.cur = null; } }
    render();
  })();
})();
