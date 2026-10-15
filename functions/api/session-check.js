export const onRequestGet = async ({ request, env }) => {
  try {
    // Parse cookies
    const cookies = Object.fromEntries(
      (request.headers.get('Cookie') || '')
        .split(';')
        .map(c => c.trim().split('=').map(decodeURIComponent))
        .filter(([k]) => k)
    );
    
    const sid = cookies.sid;
    if (!sid) {
      return new Response(JSON.stringify({ valid: false, reason: 'no_session' }), { 
        status: 401, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    const key = `sess:${sid}`;
    const sess = await env.SESSIONS.get(key, { type: 'json' });
    
    if (!sess) {
      return new Response(JSON.stringify({ valid: false, reason: 'session_not_found' }), { 
        status: 401, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    // Check if token has expired
    if (sess.expiresAt && Date.now() > sess.expiresAt) {
      // Token expired - delete session
      await env.SESSIONS.delete(key);
      return new Response(JSON.stringify({ valid: false, reason: 'expired' }), { 
        status: 401, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    // Session is valid
    return new Response(JSON.stringify({ valid: true }), { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' } 
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'server_error' }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }
};
