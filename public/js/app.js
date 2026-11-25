/* Sauat — офлайн-тренажёр функциональной грамотности (чтение) для 7–9 классов.
   Без фреймворков и сборки: работает на слабых телефонах и без интернета.
   Данные ученика хранятся только на устройстве (localStorage). */
(function () {
  'use strict';

  // ---------- UI strings ----------
  const T = {
    kk: {
      tagline: 'Оқып қана қоймай, түсінуге үйрет',
      offlineReady: 'Интернетсіз жұмыс істейді',
      online: 'Онлайн · ИИ-коуч қосулы',
      onlineNoAi: 'Онлайн',
      offline: 'Офлайн режим',
      welcomeTitle: 'Сәлем! Бұл — Sauat',
      welcomeText: 'Мәтінді оқып, ішінен керек ақпаратты табуға, қорытынды жасауға және өз пікіріңді дәлелдеуге үйренесің. PISA тапсырмаларындағыдай.',
      yourName: 'Атың', grade: 'Сыныбың', langLabel: 'Тіл', start: 'Бастау',
      skills: 'Менің дағдыларым', level: 'деңгей',
      skill_locate: 'Ақпаратты табу', skill_interpret: 'Түсіну және қорытынды', skill_evaluate: 'Бағалау және ойлану',
      next: 'Келесі мәтін саған', allTexts: 'Барлық мәтіндер', min: 'мин', questions: 'сұрақ',
      startReading: 'Оқуды бастау', done: 'орындалды',
      shareProgress: 'Нәтижені мұғалімге жіберу (QR)', teacher: 'Мұғалім режимі', how: 'Қалай жұмыс істейді?',
      q: 'Сұрақ', hintBtn: 'Кеңес', check: 'Тексеру', nextQ: 'Келесі сұрақ', finish: 'Аяқтау',
      correct: 'Дұрыс!', wrong: 'Әзірге дұрыс емес.', tryAgain: 'Тағы байқап көр.',
      hint1: 'Кеңес', hint2: 'Мына абзацқа қара', hint3: 'Дәлел осы жерде — сары түспен белгіленді', reveal: 'Дұрыс жауап',
      pickSentence: '👆 Мәтіннен сөйлемді басып белгіле',
      yourAnswer: 'Жауабыңды жаз…',
      aiChecking: 'ИИ-коуч тексеріп жатыр…',
      aiFeedback: 'ИИ-коучтың пікірі', offlineCheck: 'Офлайн тексеру', modelAnswer: 'Үлгі жауап',
      openGood: 'Жақсы жауап: негізгі ойлардың бәрі бар.', openPart: 'Жартылай: бір негізгі ой жетпейді.', openWeak: 'Жауапта мәтіннен дерек жоқ.',
      resultTitle: 'Мәтін аяқталды!', points: 'ұпай', backHome: 'Басты бет', again: 'Қайта өту',
      readAloud: '🔊 Оқып бер', stop: '⏹ Тоқтат',
      shareTitle: 'Нәтижені мұғалімге көрсет',
      shareText: 'Интернет керек емес: мұғалім осы QR-кодты өз телефонымен сканерлейді.',
      teacherTitle: 'Мұғалім: сынып нәтижесі',
      teacherText: 'Оқушылардың QR-кодтарын сканерлеңіз — интернетсіз. Деректер тек осы телефонда сақталады.',
      scan: '📷 QR сканерлеу', pasteCode: 'немесе кодты қойыңыз', add: 'Қосу', classEmpty: 'Әзірге оқушы жоқ.',
      student: 'Оқушы', avg: 'Сынып орташасы', weakest: 'Ең әлсіз дағды', recommend: 'Ұсыныс',
      recText: (s, p) => `Сыныптың ${p}%-ы «${s}» дағдысында 2-деңгейден төмен. Келесі сабақта осы түрдегі тапсырмаларға 10 минут бөліңіз.`,
      genTitle: 'ИИ: өз мәтініңізден тапсырма жасау',
      genText: 'Оқулықтан кез келген мәтінді қойыңыз — ИИ PISA форматында 4 сұрақ, кеңестер мен дәлелдерді жасайды. Пакет телефонға сақталады да, кейін интернетсіз ашылады.',
      genPlaceholder: 'Мәтінді осында қойыңыз (5–15 сөйлем)…', generate: 'Тапсырма жасау', generating: 'ИИ жасап жатыр…',
      genNeedsNet: 'Бұл функцияға интернет керек. Дайын пакеттер интернетсіз де жұмыс істейді.',
      genSaved: 'Пакет сақталды және тізімге қосылды.', genError: 'ИИ жауап бере алмады. Кейінірек қайталаңыз.',
      exportPacks: 'Пакеттерді файлға сақтау', importPacks: 'Пакет файлын ашу', teacherPack: 'Мұғалім қосқан',
      cameraNo: 'Бұл браузерде камерамен сканерлеу жоқ — кодты қолмен қойыңыз.', badCode: 'Код танылмады.', added: 'Оқушы қосылды',
      reset: 'Профильді өшіру', confirmReset: 'Барлық прогресс өшеді. Жалғастыру керек пе?',
      howTitle: 'Sauat қалай жұмыс істейді',
      offlineSaved: 'Барлық мәтін телефонға сақталды — интернет өшсе де жұмыс істейді.',
      classCode: 'Сынып коды (міндетті емес)', joinBtn: 'Сыныпқа қосылу', joined: 'Сыныпқа қосылдың', joinFail: 'Код табылмады немесе интернет жоқ',
      tasks: 'Мұғалімнің тапсырмалары', due: 'мерзімі', doneTask: 'орындалды', pending: (n) => `${n} жауап жіберілуді күтуде`, synced: 'Мұғаліммен синхрондалды',
      xp: 'ұпай', streak: 'күн қатарынан', joinTitle: 'Сыныпқа қосылу', joinText: 'Мұғалім берген 6 таңбалы кодты енгіз — тапсырмалар мен нәтижелер синхрондалады.'
    },
    ru: {
      tagline: 'Учит не просто читать, а понимать',
      offlineReady: 'Работает без интернета',
      online: 'Онлайн · ИИ-коуч включён',
      onlineNoAi: 'Онлайн',
      offline: 'Офлайн-режим',
      welcomeTitle: 'Привет! Это Sauat',
      welcomeText: 'Ты научишься находить в тексте нужную информацию, делать выводы и доказывать своё мнение. Как в заданиях PISA.',
      yourName: 'Имя', grade: 'Класс', langLabel: 'Язык', start: 'Начать',
      skills: 'Мои навыки', level: 'уровень',
      skill_locate: 'Найти информацию', skill_interpret: 'Понять и сделать вывод', skill_evaluate: 'Оценить и обдумать',
      next: 'Следующий текст для тебя', allTexts: 'Все тексты', min: 'мин', questions: 'вопроса',
      startReading: 'Начать чтение', done: 'пройдено',
      shareProgress: 'Отправить результат учителю (QR)', teacher: 'Режим учителя', how: 'Как это работает?',
      q: 'Вопрос', hintBtn: 'Подсказка', check: 'Проверить', nextQ: 'Следующий вопрос', finish: 'Завершить',
      correct: 'Верно!', wrong: 'Пока неверно.', tryAgain: 'Попробуй ещё раз.',
      hint1: 'Подсказка', hint2: 'Посмотри в этот абзац', hint3: 'Доказательство здесь — выделено жёлтым', reveal: 'Правильный ответ',
      pickSentence: '👆 Нажми на предложение в тексте',
      yourAnswer: 'Напиши свой ответ…',
      aiChecking: 'ИИ-коуч проверяет…',
      aiFeedback: 'Отзыв ИИ-коуча', offlineCheck: 'Офлайн-проверка', modelAnswer: 'Пример ответа',
      openGood: 'Хороший ответ: все главные мысли есть.', openPart: 'Частично: не хватает одной главной мысли.', openWeak: 'В ответе нет опоры на текст.',
      resultTitle: 'Текст пройден!', points: 'баллов', backHome: 'На главную', again: 'Пройти снова',
      readAloud: '🔊 Прочитать вслух', stop: '⏹ Стоп',
      shareTitle: 'Покажи результат учителю',
      shareText: 'Интернет не нужен: учитель сканирует этот QR-код своим телефоном.',
      teacherTitle: 'Учитель: результаты класса',
      teacherText: 'Сканируйте QR-коды учеников — без интернета. Данные хранятся только на этом телефоне.',
      scan: '📷 Сканировать QR', pasteCode: 'или вставьте код', add: 'Добавить', classEmpty: 'Пока нет учеников.',
      student: 'Ученик', avg: 'Среднее по классу', weakest: 'Самый слабый навык', recommend: 'Рекомендация',
      recText: (s, p) => `${p}% класса ниже 2-го уровня по навыку «${s}». На следующем уроке уделите 10 минут таким заданиям.`,
      genTitle: 'ИИ: задания из вашего текста',
      genText: 'Вставьте любой текст из учебника — ИИ составит 4 вопроса в формате PISA с подсказками и доказательствами. Пакет сохранится на телефоне и потом откроется без интернета.',
      genPlaceholder: 'Вставьте текст сюда (5–15 предложений)…', generate: 'Создать задания', generating: 'ИИ составляет…',
      genNeedsNet: 'Для этой функции нужен интернет. Готовые пакеты работают и без него.',
      genSaved: 'Пакет сохранён и добавлен в список.', genError: 'ИИ не ответил. Попробуйте позже.',
      exportPacks: 'Сохранить пакеты в файл', importPacks: 'Открыть файл пакета', teacherPack: 'Добавил учитель',
      cameraNo: 'В этом браузере нет сканирования камерой — вставьте код вручную.', badCode: 'Код не распознан.', added: 'Ученик добавлен',
      reset: 'Удалить профиль', confirmReset: 'Весь прогресс будет удалён. Продолжить?',
      howTitle: 'Как работает Sauat',
      offlineSaved: 'Все тексты сохранены на телефоне — работает даже без интернета.',
      classCode: 'Код класса (необязательно)', joinBtn: 'Присоединиться к классу', joined: 'Ты в классе', joinFail: 'Код не найден или нет интернета',
      tasks: 'Задания учителя', due: 'срок', doneTask: 'выполнено', pending: (n) => `${n} ответов ждут отправки`, synced: 'Синхронизировано с учителем',
      xp: 'XP', streak: 'дней подряд', joinTitle: 'Присоединиться к классу', joinText: 'Введи 6-значный код от учителя — задания и результаты будут синхронизироваться.'
    }
  };

  const SKILLS = ['locate', 'interpret', 'evaluate'];
  const LS = {
    get(k, d) { try { const v = localStorage.getItem('sauat_' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('sauat_' + k, JSON.stringify(v)); } catch (e) { /* storage full or blocked */ } }
  };

  const state = {
    profile: LS.get('profile', null),
    theta: LS.get('theta', { locate: 1.5, interpret: 1.5, evaluate: 1.5 }),
    done: LS.get('done', {}),
    history: LS.get('history', []),
    klass: LS.get('class', []),
    custom: LS.get('custom', []),
    outbox: LS.get('outbox', []),
    cls: LS.get('cls', null),
    aiAvailable: false,
    swReady: false
  };
  const lang = () => (state.profile && state.profile.lang) || LS.get('lang', 'kk');
  const t = (k) => T[lang()][k];
  const L = (obj) => (obj && (obj[lang()] || obj.kk || obj.ru)) || '';
  const allTexts = () => {
    const extra = ((state.cls && state.cls.packs) || []).filter((p) => !state.custom.some((c) => c.id === p.id));
    return window.SAUAT_TEXTS.concat(state.custom, extra);
  };
  const $app = document.getElementById('app');

  function esc(s) { return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
  function toast(msg) {
    const d = document.createElement('div'); d.className = 'toast'; d.textContent = msg; document.body.appendChild(d);
    setTimeout(() => d.remove(), 2600);
  }
  function save() {
    LS.set('profile', state.profile); LS.set('theta', state.theta); LS.set('done', state.done);
    LS.set('history', state.history.slice(-400)); LS.set('class', state.klass); LS.set('custom', state.custom); LS.set('outbox', state.outbox.slice(-2000)); LS.set('cls', state.cls);
  }

  // ---------- class sync (offline queue) ----------
  let syncing = false;
  async function api(path, body) {
    const ctrl = new AbortController(); const to = setTimeout(() => ctrl.abort(), 15000);
    try {
      const r = await fetch('/api/' + path, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body), signal: ctrl.signal });
      const j = await r.json(); if (!r.ok) throw new Error(j.error || 'http'); return j;
    } finally { clearTimeout(to); }
  }
  async function joinClass(code, name) {
    const j = await api('join', { code, name });
    state.cls = { studentId: j.studentId, class: j.class, assignments: j.assignments, packs: j.packs };
    if (state.profile && j.class.lang && !state.profile.langSet) state.profile.lang = j.class.lang;
    save(); sync(); return j;
  }
  async function sync() {
    if (syncing || !state.cls || !navigator.onLine) return;
    syncing = true;
    try {
      const batch = state.outbox.slice(0, 200);
      const j = await api('sync', { studentId: state.cls.studentId, attempts: batch });
      const sent = new Set(batch.map((a) => a.id));
      state.outbox = state.outbox.filter((a) => !sent.has(a.id));
      Object.assign(state.cls, { class: j.class, assignments: j.assignments, packs: j.packs, at: Date.now() });
      save();
      if (state.outbox.length) setTimeout(sync, 500);
      else if (/^#?\/?(home)?$/.test(location.hash)) route();
    } catch (e) { /* офлайн или сервер недоступен — попробуем позже */ }
    syncing = false;
  }
  window.addEventListener('online', sync);
  setInterval(sync, 60000);
  function xp() { return Math.round(state.history.reduce((t, h) => t + h.score * 10, 0)); }
  function streak() {
    const days = new Set(state.history.map((h) => Math.floor((h.ts - new Date().getTimezoneOffset() * 60000) / 86400000)));
    let n = 0; for (let d = Math.floor((Date.now() - new Date().getTimezoneOffset() * 60000) / 86400000); days.has(d); d--) n++;
    return n;
  }

  // ---------- adaptive model (Elo / 1PL IRT-like) ----------
  // theta ≈ уровень PISA по навыку (1–6). P(верно) = логистика от (theta − сложность).
  function pCorrect(theta, level) { return 1 / (1 + Math.exp(-1.3 * (theta - level))); }
  function updateTheta(skill, level, score) {
    const th = state.theta[skill];
    const k = 0.55;
    state.theta[skill] = Math.max(1, Math.min(6, th + k * (score - pCorrect(th, level))));
  }
  function levelOf(th) { return Math.max(1, Math.min(6, Math.floor(th))); }
  function textDifficulty(tx) { return tx.questions.reduce((a, q) => a + q.level, 0) / tx.questions.length; }
  function recommend() {
    const weakest = SKILLS.slice().sort((a, b) => state.theta[a] - state.theta[b])[0];
    const target = state.theta[weakest] + 0.3;
    const pool = allTexts().filter((x) => !state.done[x.id]);
    const list = pool.length ? pool : allTexts();
    return list.slice().sort((a, b) => {
      const da = Math.abs(textDifficulty(a) - target) - 0.3 * a.questions.filter((q) => q.skill === weakest).length;
      const db = Math.abs(textDifficulty(b) - target) - 0.3 * b.questions.filter((q) => q.skill === weakest).length;
      return da - db;
    })[0];
  }

  // ---------- connectivity / AI ----------
  async function probeAI() {
    if (!navigator.onLine) { state.aiAvailable = false; return; }
    try {
      const ctrl = new AbortController(); const to = setTimeout(() => ctrl.abort(), 4000);
      const r = await fetch('/api/health', { cache: 'no-store', signal: ctrl.signal }); clearTimeout(to);
      const j = await r.json(); state.aiAvailable = !!j.ai;
    } catch (e) { state.aiAvailable = false; }
  }
  function netChip() {
    if (!navigator.onLine) return `<span class="chip off"><span class="dot"></span>${t('offline')}</span>`;
    return `<span class="chip on"><span class="dot"></span>${state.aiAvailable ? t('online') : t('onlineNoAi')}</span>`;
  }
  const calm = () => !/read|teacher/.test(location.hash); // не сбрасывать вопрос или ввод учителя
  window.addEventListener('online', () => probeAI().then(() => { if (calm()) route(); }));
  window.addEventListener('offline', () => { state.aiAvailable = false; if (calm()) route(); });

  // ---------- shell ----------
  const logo = `<svg viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="9" fill="#18275e"/><path d="M7 10.5c3-1.4 6-1.4 9 0v12c-3-1.4-6-1.4-9 0z" fill="#dfe6f3"/><path d="M25 10.5c-3-1.4-6-1.4-9 0v12c3-1.4 6-1.4 9 0z" fill="#fff"/><rect x="18" y="14" width="5" height="3" rx="1" fill="#ffe14d"/></svg>`;
  function top(backHref) {
    return `<div class="top">
      ${backHref ? `<button class="back" data-go="${backHref}">← </button>` : ''}
      <a class="logo" href="#/home">${logo}Sauat</a>
      <span class="spacer"></span>
      ${netChip()}
      <button class="lang" data-act="lang">${lang() === 'kk' ? 'RU' : 'ҚАЗ'}</button>
    </div>`;
  }
  function bindCommon() {
    $app.querySelectorAll('[data-go]').forEach((b) => b.addEventListener('click', () => { location.hash = b.dataset.go; }));
    const lb = $app.querySelector('[data-act=lang]');
    if (lb) lb.addEventListener('click', () => {
      const nl = lang() === 'kk' ? 'ru' : 'kk';
      if (state.profile) state.profile.lang = nl; LS.set('lang', nl); save();
      document.documentElement.lang = nl; route();
    });
  }

  // ---------- screens ----------
  function viewWelcome() {
    let sel = { lang: lang(), grade: 8 };
    const draw = () => {
      $app.innerHTML = `${top()}
      <div class="card hero"><h1>${t('welcomeTitle')}</h1><p>${t('welcomeText')}</p>
        <p class="muted small">✓ ${t('offlineReady')}</p></div>
      <div class="card">
        <label>${t('langLabel')}</label>
        <div class="seg" id="lng"><button data-v="kk" class="${sel.lang === 'kk' ? 'sel' : ''}">Қазақша</button><button data-v="ru" class="${sel.lang === 'ru' ? 'sel' : ''}">Русский</button></div>
        <label for="nm">${t('yourName')}</label><input id="nm" type="text" maxlength="30" autocomplete="given-name">
        <label for="cc">${t('classCode')}</label><input id="cc" type="text" maxlength="6" autocomplete="off" style="text-transform:uppercase;letter-spacing:3px" value="${esc(new URLSearchParams(location.search).get('join') || '')}">
        <label>${t('grade')}</label>
        <div class="seg" id="gr">${[7, 8, 9].map((g) => `<button data-v="${g}" class="${sel.grade === g ? 'sel' : ''}">${g}</button>`).join('')}</div>
        <p style="margin-top:16px"><button class="btn block" id="go">${t('start')} →</button></p>
      </div>`;
      bindCommon();
      $app.querySelectorAll('#lng button').forEach((b) => b.onclick = () => { sel.lang = b.dataset.v; LS.set('lang', sel.lang); const n = $app.querySelector('#nm').value; draw(); $app.querySelector('#nm').value = n; });
      $app.querySelectorAll('#gr button').forEach((b) => b.onclick = () => { sel.grade = +b.dataset.v; $app.querySelectorAll('#gr button').forEach((x) => x.classList.toggle('sel', x === b)); });
      $app.querySelector('#go').onclick = async () => {
        const name = $app.querySelector('#nm').value.trim() || (sel.lang === 'kk' ? 'Оқушы' : 'Ученик');
        const code = $app.querySelector('#cc').value.trim().toUpperCase();
        state.profile = { name, grade: sel.grade, lang: sel.lang, langSet: true, id: Math.random().toString(36).slice(2, 8) };
        save();
        if (code) { try { await joinClass(code, name); toast(t('joined')); } catch (e) { toast(t('joinFail')); } }
        location.hash = '#/home'; route();
      };
    };
    draw();
  }

  function skillBars() {
    return SKILLS.map((s) => {
      const th = state.theta[s];
      return `<div class="skill"><div class="name"><span class="k-${s}">${t('skill_' + s)}</span><span>${levelOf(th)} ${t('level')}</span></div>
        <div class="bar"><i class="b-${s}" style="width:${Math.round((th - 1) / 5 * 100)}%"></i></div></div>`;
    }).join('');
  }

  function taskCard() {
    const list = ((state.cls && state.cls.assignments) || []).map((a) => ({ a, tx: allTexts().find((x) => x.id === a.textId) })).filter((x) => x.tx);
    if (!list.length) return '';
    return `<div class="card"><h3>📌 ${t('tasks')}</h3><div class="tlist">${list.map(({ a, tx }) => {
      const done = state.done[tx.id] && (!a.created || state.done[tx.id].ts >= a.created);
      return `<a href="#/read/${tx.id}"><span class="tico">${done ? '✓' : '!'}</span><span><b>${esc(L(tx.title))}</b><br><span class="meta">${a.due ? t('due') + ': ' + a.due : ''}</span></span>${done ? `<span class="done-badge">${t('doneTask')}</span>` : ''}</a>`;
    }).join('')}</div></div>`;
  }

  function viewHome() {
    const rec = recommend();
    const recSkills = [...new Set(rec.questions.map((q) => q.skill))];
    $app.innerHTML = `${top()}
      <h1>${lang() === 'kk' ? 'Сәлем' : 'Привет'}, ${esc(state.profile.name)}!</h1>
      <p class="muted">${state.cls ? '🏫 ' + esc(state.cls.class.name) + (state.cls.class.school ? ' · ' + esc(state.cls.class.school) : '') : t('tagline')}</p>
      <div class="stats3"><div><b>${xp()}</b><span>${t('xp')}</span></div><div><b>🔥 ${streak()}</b><span>${t('streak')}</span></div><div><b>${Object.keys(state.done).length}</b><span>${t('done')}</span></div></div>
      ${state.outbox.length ? `<p class="small muted">⏳ ${t('pending')(state.outbox.length)}</p>` : state.cls && state.cls.at ? `<p class="small muted">✓ ${t('synced')}</p>` : ''}
      ${taskCard()}
      <div class="card hero">
        <div class="small muted">${t('next')}</div>
        <h2 style="margin:4px 0">${esc(L(rec.title))}</h2>
        <div class="small muted">${esc(L(rec.tag))} · ${rec.minutes || 4} ${t('min')} · ${rec.questions.length} ${t('questions')}</div>
        <p class="row" style="gap:6px;flex-wrap:wrap;margin:10px 0">${recSkills.map((s) => `<span class="pill ${s}">${t('skill_' + s)}</span>`).join('')}</p>
        <button class="btn light block" data-go="#/read/${rec.id}">${t('startReading')} →</button>
      </div>
      <div class="card"><h3>${t('skills')}</h3>${skillBars()}
        <p class="small muted" style="margin-top:8px">PISA: 2-деңгей — базалық / 2-й уровень — базовый</p></div>
      <h2>${t('allTexts')}</h2>
      <div class="card tlist">${allTexts().map((x, i) => `
        <a href="#/read/${x.id}"><span class="tico">${x.custom ? '✎' : i + 1}</span>
          <span><b>${esc(L(x.title))}</b><br><span class="meta">${x.custom ? t('teacherPack') + ' · ' : ''}${esc(L(x.tag))} · ${x.questions.length} ${t('questions')}</span></span>
          ${state.done[x.id] ? `<span class="done-badge">✓ ${state.done[x.id].score}/${state.done[x.id].max}</span>` : ''}
        </a>`).join('')}</div>
      ${state.cls ? '' : `<div class="card"><h3>${t('joinTitle')}</h3><p class="small muted">${t('joinText')}</p><div class="row"><input type="text" id="jc" maxlength="6" placeholder="ABC234" style="text-transform:uppercase;letter-spacing:3px"><button class="btn" id="jb">${t('joinBtn')}</button></div></div>`}
      <div class="grid2">
        <button class="btn alt" data-go="#/share">${t('shareProgress')}</button>
        <button class="btn alt" data-go="#/teacher">${t('teacher')}</button>
      </div>
      <p style="text-align:center;margin-top:14px"><a href="#/how" class="small">${t('how')}</a> · <a href="#" class="small muted" id="rst">${t('reset')}</a></p>
      ${state.swReady ? `<p class="small muted" style="text-align:center">✓ ${t('offlineSaved')}</p>` : ''}`;
    bindCommon();
    const jb = $app.querySelector('#jb');
    if (jb) jb.onclick = async () => { try { await joinClass($app.querySelector('#jc').value.trim().toUpperCase(), state.profile.name); toast(t('joined')); route(); } catch (e) { toast(t('joinFail')); } };
    $app.querySelector('#rst').onclick = (e) => { e.preventDefault(); if (confirm(t('confirmReset'))) { ['profile', 'theta', 'done', 'history'].forEach((k) => localStorage.removeItem('sauat_' + k)); location.hash = '#/'; location.reload(); } };
  }

  // ---------- reading & questions ----------
  function renderText(tx) {
    const paras = L(tx.paras);
    const isNotice = tx.format === 'notice';
    let html = `<div class="text ${isNotice ? 'notice' : ''}" id="txt"><h2>${esc(L(tx.title))}</h2><p class="small muted" style="margin:0 0 12px;font-family:system-ui">${esc(L(tx.tag))}</p>`;
    paras.forEach((p, i) => {
      if (tx.authors && L(tx.authors)[i]) html += `<div class="author">${esc(L(tx.authors)[i])}</div>`;
      html += `<p class="para" data-p="${i}"><span class="pn">${i + 1}</span>${p.map(([id, s]) => `<span class="s" data-s="${id}">${esc(s)}</span>`).join(' ')}</p>`;
    });
    return html + '</div>';
  }
  function paraOf(tx, sid) { return L(tx.paras).findIndex((p) => p.some(([id]) => id === sid)); }

  function offlineGrade(q, answer) {
    // ученик может ответить на любом из двух языков: группа i засчитывается по казахским или русским стемам
    const r = q.rubric || {}; const base = L(r) || [];
    const groups = base.map((g, i) => g.concat((r.kk && r.kk[i]) || [], (r.ru && r.ru[i]) || []));
    const words = answer.toLowerCase().replace(/[«»"“”.,!?;:()]/g, ' ').split(/\s+/).filter(Boolean);
    const low = ' ' + words.join(' ') + ' ';
    // стем из 2 букв — только точное слово («да», «иә»); длиннее — начало слова («пастбищ» → «пастбища»)
    const match = (stem) => stem.includes(' ') ? low.includes(' ' + stem)
      : words.some((w) => stem.length <= 2 ? w === stem : w.startsWith(stem));
    let hit = 0;
    groups.forEach((g) => { if (g.some(match)) hit++; });
    const enough = words.length >= 5;
    if (hit >= q.minGroups && enough) return 2;
    if (hit >= 1) return 1;
    return 0;
  }

  async function aiGrade(tx, q, answer) {
    const text = L(tx.paras).map((p) => p.map((x) => x[1]).join(' ')).join('\n');
    const ctrl = new AbortController(); const to = setTimeout(() => ctrl.abort(), 20000);
    try {
      const r = await fetch('/api/coach', {
        method: 'POST', headers: { 'content-type': 'application/json' }, signal: ctrl.signal,
        body: JSON.stringify({ lang: lang(), grade: state.profile.grade, text, question: L(q.prompt), model: L(q.model), criteria: L(q.explain), answer })
      });
      clearTimeout(to);
      if (!r.ok) return null;
      const j = await r.json();
      if (typeof j.score !== 'number' || !j.feedback) return null;
      return { score: Math.max(0, Math.min(2, Math.round(j.score))), feedback: String(j.feedback) };
    } catch (e) { clearTimeout(to); return null; }
  }

  function viewRead(id) {
    const tx = allTexts().find((x) => x.id === id);
    if (!tx) { location.hash = '#/home'; return; }
    const run = { qi: 0, results: [], tries: 0, hints: 0, solved: false };
    let speaking = false;

    $app.innerHTML = `${top('#/home')}
      <div class="row" style="justify-content:flex-end;margin:-4px 0 8px" id="tts"></div>
      ${renderText(tx)}
      <div class="qpanel" id="qp"></div>`;
    bindCommon();
    const $txt = $app.querySelector('#txt'); const $qp = $app.querySelector('#qp');

    // read aloud (offline speech synthesis, if a voice exists on the device)
    const ttsBox = $app.querySelector('#tts');
    const voiceFor = () => (window.speechSynthesis ? speechSynthesis.getVoices().find((v) => v.lang && v.lang.toLowerCase().startsWith(lang() === 'kk' ? 'kk' : 'ru')) : null);
    const drawTts = () => {
      if (!voiceFor()) { ttsBox.innerHTML = ''; return; }
      ttsBox.innerHTML = `<button class="btn ghost" style="min-height:36px;padding:6px 12px" id="tb">${speaking ? t('stop') : t('readAloud')}</button>`;
      ttsBox.querySelector('#tb').onclick = () => {
        if (speaking) { speechSynthesis.cancel(); speaking = false; drawTts(); return; }
        const u = new SpeechSynthesisUtterance(L(tx.paras).map((p) => p.map((x) => x[1]).join(' ')).join('. '));
        u.voice = voiceFor(); u.rate = 0.9; u.onend = () => { speaking = false; drawTts(); };
        speechSynthesis.speak(u); speaking = true; drawTts();
      };
    };
    if (window.speechSynthesis) { drawTts(); speechSynthesis.onvoiceschanged = drawTts; }

    function clearMarks() {
      $txt.querySelectorAll('.s').forEach((s) => s.classList.remove('ev', 'wrongpick'));
      $txt.querySelectorAll('.para').forEach((p) => p.classList.remove('hl'));
      $txt.classList.remove('pick');
    }
    function showEvidence(q) {
      q.evidence.forEach((id) => { const el = $txt.querySelector(`[data-s="${id}"]`); if (el) el.classList.add('ev'); });
      const first = $txt.querySelector(`[data-s="${q.evidence[0]}"]`);
      if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    function dots() {
      return `<span class="dots">${tx.questions.map((_, i) => {
        const r = run.results[i];
        return `<i class="${i === run.qi ? 'cur' : r == null ? '' : r >= 0.99 ? 'ok' : 'mid'}"></i>`;
      }).join('')}</span>`;
    }

    // hint ladder: 1) strategy hint 2) paragraph highlight 3) evidence highlight 4) reveal
    function hintHtml(q) {
      const parts = [];
      if (run.hints >= 1) parts.push(`<div class="fb hint"><b>💡 ${t('hint1')}</b>${esc(L(q.hint))}</div>`);
      if (run.hints >= 2 && q.evidence) {
        const pi = paraOf(tx, q.evidence[0]);
        const el = $txt.querySelector(`[data-p="${pi}"]`); if (el) { el.classList.add('hl'); }
        parts.push(`<div class="fb hint"><b>📍 ${t('hint2')}: ${pi + 1}</b></div>`);
      }
      if (run.hints >= 3 && q.evidence) { showEvidence(q); parts.push(`<div class="fb hint"><b>🔎 ${t('hint3')}</b></div>`); }
      return parts.join('');
    }
    function scoreFromHints() { return run.hints === 0 ? 1 : run.hints === 1 ? 0.75 : run.hints === 2 ? 0.5 : 0.25; }

    function finishQuestion(q, score, answer) {
      run.results[run.qi] = score; run.solved = true;
      updateTheta(q.skill, q.level, score);
      const ts = Date.now();
      state.history.push({ q: q.id, tx: tx.id, skill: q.skill, level: q.level, score, hints: run.hints, ts });
      state.outbox.push({ id: `${state.profile.id}-${ts}-${Math.random().toString(36).slice(2, 6)}`, tx: tx.id, q: q.id, skill: q.skill, level: q.level, score, hints: run.hints, answer: answer || null, ts });
      save(); sync();
    }
    function nextBtn() {
      const last = run.qi === tx.questions.length - 1;
      return `<div class="qactions"><button class="btn" id="nx">${last ? t('finish') : t('nextQ')} →</button></div>`;
    }
    function bindNext() {
      const b = $qp.querySelector('#nx'); if (!b) return;
      b.onclick = () => {
        if (run.qi === tx.questions.length - 1) return finishText();
        run.qi++; run.tries = 0; run.hints = 0; run.solved = false; drawQ();
        $qp.scrollTop = 0;
      };
    }

    function drawQ() {
      clearMarks();
      const q = tx.questions[run.qi];
      const head = `<div class="qhead"><span class="pill ${q.skill}">${t('skill_' + q.skill)}</span><span class="small muted">${t('q')} ${run.qi + 1}/${tx.questions.length}</span>${dots()}</div>
        <div class="qtext">${esc(L(q.prompt))}</div>`;
      if (q.kind === 'choice') drawChoice(q, head);
      else if (q.kind === 'evidence') drawEvidence(q, head);
      else drawOpen(q, head);
    }

    function drawChoice(q, head, picked) {
      const opts = L(q.options);
      $qp.innerHTML = head + `<div class="opts">${opts.map((o, i) => {
        let cls = '';
        if (run.solved && i === q.answer) cls = 'ok';
        else if (picked && picked.includes(i)) cls = 'bad';
        return `<button class="opt ${cls}" data-i="${i}" ${run.solved || (picked && picked.includes(i)) ? 'disabled' : ''}>${esc(o)}</button>`;
      }).join('')}</div>` + (run.solved ? '' : hintHtml(q)) + feedbackAfter(q) +
        (run.solved ? nextBtn() : `<div class="qactions"><button class="btn ghost" id="hb">💡 ${t('hintBtn')}</button></div>`);
      picked = picked || [];
      $qp.querySelectorAll('.opt').forEach((b) => b.onclick = () => {
        const i = +b.dataset.i;
        if (i === q.answer) { finishQuestion(q, scoreFromHints()); run.lastOk = true; drawChoice(q, head, picked); showEvidence(q); }
        else {
          picked.push(i); run.tries++; run.hints = Math.min(4, run.hints + 1);
          if (run.hints >= 4) { finishQuestion(q, 0); run.lastOk = false; drawChoice(q, head, picked); showEvidence(q); return; }
          drawChoice(q, head, picked);
          $qp.insertAdjacentHTML('afterbegin', '');
          const fb = document.createElement('div'); fb.className = 'fb bad'; fb.innerHTML = `<b>${t('wrong')}</b>${t('tryAgain')}`;
          $qp.querySelector('.opts').after(fb);
        }
      });
      bindHintBtn(q, () => drawChoice(q, head, picked));
      bindNext();
    }
    function feedbackAfter(q) {
      if (!run.solved) return '';
      return run.lastOk
        ? `<div class="fb ok"><b>✓ ${t('correct')}</b>${esc(L(q.explain))}</div>`
        : `<div class="fb bad"><b>${t('reveal')}</b>${esc(L(q.explain))}</div>`;
    }
    function bindHintBtn(q, redraw) {
      const hb = $qp.querySelector('#hb'); if (!hb) return;
      hb.onclick = () => { run.hints = Math.min(3, run.hints + 1); redraw(); };
    }

    function drawEvidence(q, head) {
      $qp.innerHTML = head + (run.solved ? '' : `<div class="pickhint">${t('pickSentence')}</div>` + hintHtml(q)) + feedbackAfter(q) +
        (run.solved ? nextBtn() : `<div class="qactions"><button class="btn ghost" id="hb">💡 ${t('hintBtn')}</button></div>`);
      if (!run.solved) {
        $txt.classList.add('pick');
        $txt.querySelectorAll('.s').forEach((s) => s.onclick = () => {
          if (run.solved) return;
          const sid = s.dataset.s;
          if (q.evidence.includes(sid)) {
            finishQuestion(q, scoreFromHints()); run.lastOk = true;
            $txt.classList.remove('pick'); $txt.querySelectorAll('.s').forEach((x) => { x.onclick = null; x.classList.remove('wrongpick'); });
            drawEvidence(q, head); showEvidence(q);
          } else {
            s.classList.add('wrongpick'); run.hints = Math.min(4, run.hints + 1);
            if (run.hints >= 4) {
              finishQuestion(q, 0); run.lastOk = false; $txt.classList.remove('pick');
              $txt.querySelectorAll('.s').forEach((x) => { x.onclick = null; });
              drawEvidence(q, head); showEvidence(q); return;
            }
            drawEvidence(q, head);
            const fb = document.createElement('div'); fb.className = 'fb bad'; fb.innerHTML = `<b>${t('wrong')}</b>${t('tryAgain')}`;
            $qp.querySelector('.pickhint').after(fb);
          }
        });
      }
      bindHintBtn(q, () => drawEvidence(q, head));
      bindNext();
    }

    function drawOpen(q, head) {
      $qp.innerHTML = head + `<textarea id="ans" placeholder="${esc(t('yourAnswer'))}"></textarea>` + hintHtml(q) +
        `<div class="qactions"><button class="btn ghost" id="hb">💡 ${t('hintBtn')}</button><button class="btn" id="ck">${t('check')}</button></div><div id="res"></div>`;
      const $ans = $qp.querySelector('#ans');
      if (run.draft) $ans.value = run.draft;
      $ans.oninput = () => { run.draft = $ans.value; };
      $qp.querySelector('#hb').onclick = () => { run.hints = Math.min(3, run.hints + 1); drawOpen(q, head); };
      $qp.querySelector('#ck').onclick = async () => {
        const answer = $ans.value.trim();
        if (answer.length < 3) { $ans.focus(); return; }
        const ck = $qp.querySelector('#ck'); ck.disabled = true;
        let res = null;
        if (state.aiAvailable && navigator.onLine) {
          ck.innerHTML = `<span class="spin"></span> ${t('aiChecking')}`;
          res = await aiGrade(tx, q, answer);
        }
        let fbHtml;
        const score = res ? res.score : offlineGrade(q, answer);
        if (res) fbHtml = `<div class="fb ai"><b>🤖 ${t('aiFeedback')} · ${score}/2</b>${esc(res.feedback)}</div>`;
        else fbHtml = `<div class="fb ${score === 2 ? 'ok' : score === 1 ? 'hint' : 'bad'}"><b>${t('offlineCheck')} · ${score}/2</b>${score === 2 ? t('openGood') : score === 1 ? t('openPart') : t('openWeak')}<br>${esc(L(q.explain))}</div>`;
        const final = Math.max(0, score / 2 - run.hints * 0.1);
        finishQuestion(q, final, answer);
        run.draft = '';
        $ans.disabled = true;
        $qp.querySelector('.qactions').remove();
        $qp.querySelector('#res').innerHTML = fbHtml + `<div class="fb ok"><b>${t('modelAnswer')}</b>${esc(L(q.model))}</div>` + nextBtn();
        showEvidence(q); bindNext();
      };
    }

    function finishText() {
      if (window.speechSynthesis) speechSynthesis.cancel();
      const max = tx.questions.length;
      const score = Math.round(run.results.reduce((a, b) => a + (b || 0), 0) * 10) / 10;
      state.done[tx.id] = { score, max, ts: Date.now() }; save();
      const bySkill = {};
      tx.questions.forEach((q, i) => { (bySkill[q.skill] = bySkill[q.skill] || []).push(run.results[i] || 0); });
      $app.innerHTML = `${top('#/home')}
        <div class="card hero" style="text-align:center"><div class="small muted">${esc(L(tx.title))}</div>
          <h1>${t('resultTitle')}</h1><div class="big">${score}<span style="font-size:22px">/${max}</span></div><div class="muted">${t('points')}</div></div>
        <div class="card"><h3>${t('skills')}</h3>${skillBars()}
          ${Object.keys(bySkill).map((s) => `<p class="small"><span class="pill ${s}">${t('skill_' + s)}</span> ${bySkill[s].map((v) => v >= 0.99 ? '✓' : v > 0 ? '½' : '✗').join(' ')}</p>`).join('')}
        </div>
        <div class="grid2"><button class="btn" data-go="#/home">${t('backHome')}</button><button class="btn alt" data-go="#/share">${t('shareProgress')}</button></div>`;
      bindCommon();
    }

    drawQ();
  }

  // ---------- share progress via QR (offline) ----------
  function b64e(s) { return btoa(unescape(encodeURIComponent(s))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
  function b64d(s) { s = s.replace(/-/g, '+').replace(/_/g, '/'); while (s.length % 4) s += '='; return decodeURIComponent(escape(atob(s))); }
  function progressCode() {
    const p = state.profile;
    const th = SKILLS.map((s) => state.theta[s].toFixed(1)).join(',');
    const done = Object.keys(state.done).length;
    const answered = state.history.length;
    return 'SA1.' + b64e([p.id, p.name, p.grade, th, done, answered, Math.floor(Date.now() / 60000)].join('|'));
  }
  function parseCode(code) {
    try {
      code = code.trim();
      if (!code.startsWith('SA1.')) return null;
      const [id, name, grade, th, done, answered, min] = b64d(code.slice(4)).split('|');
      const [l, i, e] = th.split(',').map(Number);
      if ([l, i, e].some((x) => !(x >= 1 && x <= 6))) return null;
      return { id, name, grade: +grade, theta: { locate: l, interpret: i, evaluate: e }, done: +done, answered: +answered, ts: +min * 60000 };
    } catch (err) { return null; }
  }
  function qrSvg(text) {
    if (typeof qrcode !== 'function') return '<p class="small muted">QR —</p>';
    const q = qrcode(0, 'M'); q.addData(text); q.make();
    return q.createSvgTag({ cellSize: 6, margin: 2, scalable: true });
  }
  function viewShare() {
    const code = progressCode();
    $app.innerHTML = `${top('#/home')}<h1>${t('shareTitle')}</h1><p class="muted">${t('shareText')}</p>
      <div class="card"><div class="qr">${qrSvg(code)}</div>
      <p style="text-align:center"><b>${esc(state.profile.name)}</b> · ${state.profile.grade} ${lang() === 'kk' ? 'сынып' : 'класс'}</p>
      ${skillBars()}
      <p class="small muted" style="margin-top:10px">${t('pasteCode')}:</p><div class="code">${code}</div></div>`;
    bindCommon();
  }

  // ---------- teacher ----------
  function lvClass(th) { return th < 2 ? 'low' : th < 3 ? 'mid' : 'high'; }
  function addStudent(code) {
    const s = parseCode(code);
    if (!s) { toast(t('badCode')); return false; }
    const i = state.klass.findIndex((x) => x.id === s.id);
    if (i >= 0) state.klass[i] = s; else state.klass.push(s);
    save(); toast(t('added') + ': ' + s.name); return true;
  }
  function viewTeacher() {
    const k = state.klass;
    let stats = '';
    if (k.length) {
      const avg = {}; SKILLS.forEach((s) => { avg[s] = k.reduce((a, x) => a + x.theta[s], 0) / k.length; });
      const weak = SKILLS.slice().sort((a, b) => avg[a] - avg[b])[0];
      const pctLow = Math.round(k.filter((x) => x.theta[weak] < 2).length / k.length * 100);
      stats = `<div class="card"><h3>${t('avg')} (${k.length})</h3>
        ${SKILLS.map((s) => `<div class="skill"><div class="name"><span class="k-${s}">${t('skill_' + s)}</span><span>${avg[s].toFixed(1)}</span></div><div class="bar"><i class="b-${s}" style="width:${Math.round((avg[s] - 1) / 5 * 100)}%"></i></div></div>`).join('')}
        <div class="fb hint" style="margin-top:12px"><b>${t('recommend')}</b>${t('recText')(t('skill_' + weak), pctLow)}</div></div>
        <div class="card" style="overflow-x:auto"><table><tr><th>${t('student')}</th><th>${lang() === 'kk' ? 'Сын.' : 'Кл.'}</th>${SKILLS.map((s) => `<th class="k-${s}">${t('skill_' + s).split(' ')[0]}</th>`).join('')}<th>✓</th></tr>
        ${k.map((x) => `<tr><td>${esc(x.name)}</td><td>${x.grade}</td>${SKILLS.map((s) => `<td class="lv ${lvClass(x.theta[s])}">${x.theta[s].toFixed(1)}</td>`).join('')}<td>${x.done}</td></tr>`).join('')}</table></div>`;
    }
    const online = navigator.onLine;
    $app.innerHTML = `${top('#/home')}<h1>${t('teacherTitle')}</h1><p class="muted">${t('teacherText')}</p>
      <div class="card">
        <button class="btn block" id="scan">${t('scan')}</button>
        <div id="cam"></div>
        <label for="pc">${t('pasteCode')}</label>
        <div class="row"><input type="text" id="pc" placeholder="SA1.…"><button class="btn alt" id="addc">${t('add')}</button></div>
      </div>
      ${k.length ? stats : `<p class="muted">${t('classEmpty')}</p>`}
      <h2>🤖 ${t('genTitle')}</h2>
      <div class="card">
        <p class="small">${t('genText')}</p>
        ${online ? '' : `<div class="fb hint">${t('genNeedsNet')}</div>`}
        <textarea id="gtext" placeholder="${esc(t('genPlaceholder'))}" ${online ? '' : 'disabled'}></textarea>
        <div class="seg" id="glang" style="margin-top:8px"><button data-v="kk" class="${lang() === 'kk' ? 'sel' : ''}">Қазақша</button><button data-v="ru" class="${lang() === 'ru' ? 'sel' : ''}">Русский</button></div>
        <p><button class="btn block" id="gen" ${online ? '' : 'disabled'}>${t('generate')}</button></p>
        <div id="gres"></div>
      </div>
      <div class="grid2"><button class="btn ghost" id="exp">⬇ ${t('exportPacks')}</button><label class="btn ghost" style="margin:0">⬆ ${t('importPacks')}<input type="file" id="imp" accept="application/json,.json" hidden></label></div>`;
    bindCommon();
    $app.querySelector('#addc').onclick = () => { if (addStudent($app.querySelector('#pc').value)) viewTeacher(); };
    $app.querySelector('#scan').onclick = startScan;
    let glang = lang();
    $app.querySelectorAll('#glang button').forEach((b) => b.onclick = () => { glang = b.dataset.v; $app.querySelectorAll('#glang button').forEach((x) => x.classList.toggle('sel', x === b)); });
    $app.querySelector('#gen').onclick = () => generatePack($app.querySelector('#gtext').value, glang);
    $app.querySelector('#exp').onclick = () => {
      const blob = new Blob([JSON.stringify({ sauat: 1, packs: state.custom }, null, 1)], { type: 'application/json' });
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'sauat-packs.json'; a.click();
    };
    $app.querySelector('#imp').onchange = async (e) => {
      const f = e.target.files[0]; if (!f) return;
      try {
        const j = JSON.parse(await f.text());
        (j.packs || []).forEach((p) => { if (validPack(p) && !state.custom.some((x) => x.id === p.id)) state.custom.push(p); });
        save(); toast(t('genSaved')); viewTeacher();
      } catch (err) { toast(t('badCode')); }
    };
  }

  async function startScan() {
    const box = $app.querySelector('#cam');
    if (!('BarcodeDetector' in window) || !navigator.mediaDevices) { box.innerHTML = `<div class="fb hint">${t('cameraNo')}</div>`; return; }
    try {
      const det = new BarcodeDetector({ formats: ['qr_code'] });
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      box.innerHTML = '<video playsinline muted></video>';
      const v = box.querySelector('video'); v.srcObject = stream; await v.play();
      let alive = true;
      const stop = () => { alive = false; stream.getTracks().forEach((tr) => tr.stop()); };
      window.addEventListener('hashchange', stop, { once: true });
      const tick = async () => {
        if (!alive) return;
        try {
          const codes = await det.detect(v);
          const c = codes.find((x) => x.rawValue && x.rawValue.startsWith('SA1.'));
          if (c) { stop(); if (addStudent(c.rawValue)) viewTeacher(); return; }
        } catch (err) { /* frame not ready */ }
        setTimeout(tick, 300);
      };
      tick();
    } catch (err) { box.innerHTML = `<div class="fb hint">${t('cameraNo')}</div>`; }
  }

  function validPack(p) {
    try {
      if (!p || !p.id || !p.paras || !p.questions || !p.questions.length) return false;
      const ids = new Set(); Object.values(p.paras).forEach((ps) => ps.forEach((pp) => pp.forEach(([id]) => ids.add(id))));
      return p.questions.every((q) => SKILLS.includes(q.skill) && ['choice', 'evidence', 'open'].includes(q.kind) &&
        (q.evidence || []).every((e) => ids.has(e)) && (q.kind !== 'choice' || (L(q.options) || []).length >= 2));
    } catch (e) { return false; }
  }

  async function generatePack(text, glang) {
    const out = $app.querySelector('#gres'); const btn = $app.querySelector('#gen');
    text = (text || '').trim();
    if (text.length < 150) { out.innerHTML = `<div class="fb hint">${t('genPlaceholder')}</div>`; return; }
    btn.disabled = true; btn.innerHTML = `<span class="spin"></span> ${t('generating')}`;
    try {
      const ctrl = new AbortController(); const to = setTimeout(() => ctrl.abort(), 60000);
      const r = await fetch('/api/generate', { method: 'POST', headers: { 'content-type': 'application/json' }, signal: ctrl.signal, body: JSON.stringify({ text, lang: glang, grade: state.profile.grade }) });
      clearTimeout(to);
      const j = await r.json();
      if (!r.ok || !j.pack || !validPack(j.pack)) throw new Error('bad');
      j.pack.custom = true;
      state.custom.push(j.pack); save();
      out.innerHTML = `<div class="fb ok"><b>✓ ${t('genSaved')}</b>${esc(L(j.pack.title))} · ${j.pack.questions.length} ${t('questions')}</div>
        <p><button class="btn alt block" data-go="#/read/${j.pack.id}">${t('startReading')} →</button></p>`;
      bindCommon();
    } catch (e) {
      out.innerHTML = `<div class="fb bad">${t('genError')}</div>`;
    }
    btn.disabled = false; btn.textContent = t('generate');
  }

  // ---------- how it works (for jury & teachers) ----------
  function viewHow() {
    const kk = lang() === 'kk';
    $app.innerHTML = `${top('#/home')}<h1>${t('howTitle')}</h1>
      <div class="card"><ol class="steps">
        ${(kk ? [
          '<b>PISA форматындағы мәтіндер.</b> Хабарландыру, кесте, ғылыми мәтін, екі пікір — оқушы өмірде кездестіретін мәтін түрлері.',
          '<b>Үш дағды бөлек бағаланады:</b> ақпаратты табу, түсіну және қорытынды жасау, бағалау. Әр сұрақтың өз деңгейі бар.',
          '<b>Жауапты айтпайды — жол көрсетеді.</b> Қате болса: алдымен стратегия, сосын абзац, сосын дәлел-сөйлем жарықталады.',
          '<b>Дәлелмен жұмыс.</b> Оқушы мәтіннен сөйлемді басып, жауабын дәлелдейді — PISA-да ең әлсіз дағды осы.',
          '<b>Бейімделу.</b> Әр жауаптан кейін деңгей қайта есептеледі (IRT/Elo), келесі мәтін ең әлсіз дағдыға таңдалады.',
          '<b>Интернетсіз.</b> PWA: бір рет ашылғаннан кейін бәрі телефонда. Мұғалім нәтижені QR арқылы интернетсіз жинайды.',
          '<b>ИИ қайда?</b> Интернет болғанда ИИ-коуч ашық жауапты тексеріп, кеңес береді, ал мұғалім кез келген мәтіннен тапсырма жасайды. Интернет жоқ кезде — рубрика бойынша офлайн тексеру.'
        ] : [
          '<b>Тексты в формате PISA.</b> Объявление, расписание, научно-популярный текст, два мнения — тексты, с которыми ученик встречается в жизни.',
          '<b>Три навыка оцениваются отдельно:</b> найти информацию, понять и сделать вывод, оценить. У каждого вопроса свой уровень сложности.',
          '<b>Не даёт ответ — ведёт к нему.</b> При ошибке: сначала стратегия, потом подсвечивается абзац, потом предложение-доказательство.',
          '<b>Работа с доказательством.</b> Ученик нажимает предложение в тексте и доказывает ответ — именно этот навык самый слабый в PISA.',
          '<b>Адаптивность.</b> После каждого ответа уровень пересчитывается (IRT/Elo), следующий текст подбирается под самый слабый навык.',
          '<b>Без интернета.</b> PWA: после первого открытия всё хранится на телефоне. Учитель собирает результаты по QR без интернета.',
          '<b>Где ИИ?</b> Когда есть интернет, ИИ-коуч проверяет открытые ответы и даёт обратную связь, а учитель создаёт задания из любого текста. Без интернета — офлайн-проверка по рубрике.'
        ]).map((x) => `<li>${x}</li>`).join('')}
      </ol></div>
      <p class="small muted">${kk ? 'Деректер тек құрылғыда сақталады. ИИ-ге тек мәтін, сұрақ пен жауап жіберіледі, оқушының аты жіберілмейді.' : 'Данные хранятся только на устройстве. В ИИ отправляются только текст, вопрос и ответ — без имени ученика.'}</p>`;
    bindCommon();
  }

  // ---------- router ----------
  function route() {
    document.documentElement.lang = lang();
    const h = location.hash.replace(/^#\/?/, '');
    if (!state.profile) return viewWelcome();
    const [p, arg] = h.split('/');
    if (p === 'read' && arg) return viewRead(decodeURIComponent(arg));
    if (p === 'share') return viewShare();
    if (p === 'teacher') return viewTeacher();
    if (p === 'how') return viewHow();
    return viewHome();
  }
  window.addEventListener('hashchange', () => { if (window.speechSynthesis) speechSynthesis.cancel(); route(); window.scrollTo(0, 0); });

  // ---------- service worker (offline) ----------
  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    navigator.serviceWorker.register('sw.js').then((reg) => {
      const markReady = () => { if (!state.swReady) { state.swReady = true; if (/home|^#?\/?$/.test(location.hash) && state.profile) route(); } };
      if (reg.active) markReady();
      navigator.serviceWorker.ready.then(markReady);
    }).catch(() => {});
  }

  route();
  sync();
  probeAI().then(() => { if (calm()) route(); });
})();
