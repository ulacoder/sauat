// Общий вызов Vercel AI Gateway (OpenAI-совместимый endpoint).
// Ключ не хранится в коде: на Vercel функция получает OIDC-токен проекта автоматически,
// либо можно задать переменную окружения AI_GATEWAY_API_KEY.
const ENDPOINT = 'https://ai-gateway.vercel.sh/v1/chat/completions';
const MODELS = (process.env.SAUAT_MODELS || 'google/gemini-2.5-flash,google/gemini-3-flash').split(',');

function token(req) {
  return process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN ||
    (req && req.headers && req.headers['x-vercel-oidc-token']) || '';
}

function parseJson(text) {
  if (!text) return null;
  const s = text.replace(/^```(?:json)?/i, '').replace(/```\s*$/, '').trim();
  try { return JSON.parse(s); } catch (e) { /* fall through */ }
  const a = s.indexOf('{'); const b = s.lastIndexOf('}');
  if (a >= 0 && b > a) { try { return JSON.parse(s.slice(a, b + 1)); } catch (e) { return null; } }
  return null;
}

async function chatJson(req, system, user, { maxTokens = 1200, temperature = 0.3, timeoutMs = 45000 } = {}) {
  const key = token(req);
  if (!key) throw new Error('no-ai-credentials');
  let lastErr;
  for (const model of MODELS) {
    const ctrl = new AbortController();
    const to = setTimeout(() => ctrl.abort(), timeoutMs);
    try {
      const r = await fetch(ENDPOINT, {
        method: 'POST',
        signal: ctrl.signal,
        headers: { 'content-type': 'application/json', authorization: `Bearer ${key}` },
        body: JSON.stringify({
          model, temperature, max_tokens: maxTokens,
          response_format: { type: 'json_object' },
          messages: [{ role: 'system', content: system }, { role: 'user', content: user }]
        })
      });
      clearTimeout(to);
      if (!r.ok) { lastErr = new Error(`gateway ${r.status}: ${(await r.text()).slice(0, 300)}`); continue; }
      const j = await r.json();
      const out = parseJson(j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content);
      if (out) return out;
      lastErr = new Error('bad-json');
    } catch (e) { clearTimeout(to); lastErr = e; }
  }
  throw lastErr || new Error('ai-failed');
}

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') { try { return JSON.parse(req.body); } catch (e) { return {}; } }
  const chunks = []; for await (const c of req) chunks.push(c);
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch (e) { return {}; }
}

const clip = (s, n) => String(s || '').slice(0, n);

module.exports = { chatJson, readBody, token, clip };
