// Postgres: Neon на Vercel, встроенная PGlite (в памяти) для локального запуска без настройки.
let _q = null;
let _ready = null;

async function driver() {
  if (_q) return _q;
  if (process.env.DATABASE_URL) {
    const { neon } = require('@neondatabase/serverless');
    const sql = neon(process.env.DATABASE_URL);
    _q = async (text, params = []) => sql.query(text, params);
  } else {
    const { PGlite } = require('@electric-sql/pglite');
    const db = new PGlite();
    _q = async (text, params = []) => (await db.query(text, params)).rows;
  }
  return _q;
}

const SCHEMA = [
  `create table if not exists classes (
     code text primary key, name text not null, grade int not null default 8, lang text not null default 'kk',
     school text, teacher_key text not null, demo boolean not null default false, created_at timestamptz not null default now())`,
  `create table if not exists students (
     id text primary key, class_code text not null references classes(code) on delete cascade,
     name text not null, created_at timestamptz not null default now(), last_seen timestamptz not null default now())`,
  `create table if not exists attempts (
     id text primary key, student_id text not null references students(id) on delete cascade, class_code text not null,
     text_id text not null, question_id text not null, skill text not null, level real not null,
     score real not null, hints int not null default 0, answer text, ts bigint not null)`,
  `create index if not exists attempts_class_idx on attempts(class_code, ts)`,
  `create table if not exists packs (
     id text primary key, class_code text references classes(code) on delete cascade, data jsonb not null,
     created_at timestamptz not null default now())`,
  `create table if not exists assignments (
     id text primary key, class_code text not null references classes(code) on delete cascade,
     text_id text not null, due date, created_at timestamptz not null default now())`
];

async function q(text, params) {
  const run = await driver();
  if (!_ready) {
    _ready = (async () => {
      for (const s of SCHEMA) await run(s);
      await require('./seed').ensureDemo(run);
    })().catch((e) => { _ready = null; throw e; });
  }
  await _ready;
  return run(text, params);
}

module.exports = { q };
