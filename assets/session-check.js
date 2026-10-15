// Automatyczne sprawdzanie wygaśnięcia sesji
(function() {
  // Sprawdź co 10 sekund czy sesja jest nadal ważna
  setInterval(async () => {
    try {
      const res = await fetch('/api/session-check', {
        method: 'GET',
        credentials: 'include'
      });
      
      if (res.status === 401 || res.status === 403) {
        // Sesja wygasła - przekieruj do index
        window.location.href = '/index.html';
      }
    } catch (e) {
      console.error('Session check failed:', e);
    }
  }, 10000); // Co 10 sekund
})();
