export const onRequestPost = async ({ request, env }) => {
  try {
    const { token } = await request.json().catch(() => ({}));
    if (!token) {
      return new Response(JSON.stringify({ error: 'token_required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    // Prosta weryfikacja po stronie serwera: token jako klucz w KV
    const tok = await env.TOKENS.get(token, { type: 'json' });
    if (!tok || tok.active === false) {
      return new Response(JSON.stringify({ error: 'invalid_token' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }
    if (tok.used === true) {
      return new Response(JSON.stringify({ error: 'token_used' }), { status: 409, headers: { 'Content-Type': 'application/json' } });
    }

    // Oznacz jako użyty (single-use). Uwaga: bez gwarancji atomowości przy dużej konkurencji.
    tok.used = true;
    await env.TOKENS.put(token, JSON.stringify(tok));

    // Utwórz sesję bez TTL (permanentna, odświeżana ciasteczkiem)
    const sid = crypto.randomUUID();
    const session = { token, createdAt: Date.now(), lastSeen: Date.now() };
    await env.SESSIONS.put(`sess:${sid}`, JSON.stringify(session));

    const headers = new Headers({ 'Content-Type': 'application/json' });
    // ~5 lat (w sekundach)
    headers.append('Set-Cookie', `sid=${encodeURIComponent(sid)}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=157680000`);

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'server_error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
