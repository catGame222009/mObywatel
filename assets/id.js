// Pobierz parametry z URL
var params = new URLSearchParams(window.location.search);

// Funkcja przejścia do strony głównej (home.html) lub generatora jeśli brak danych
function toHome() {
    // Jeśli brak danych (np. pierwsze uruchomienie PWA na iPhonie) → idź do generatora
    const hasData = !!localStorage.getItem('mobywatel_card_data');
    if (hasData) {
        location.href = 'home.html' + (params.toString() ? '?' + params.toString() : '');
    } else {
        location.href = 'index.html';
    }
}

// Powitanie w zależności od godziny
var welcome = "Dzień dobry!";
var date = new Date();
if (date.getHours() >= 18 || date.getHours() < 5) {
    welcome = "Dobry wieczór!";
}
var welcomeEl = document.querySelector(".welcome");
if (welcomeEl) welcomeEl.innerHTML = welcome;

// Obsługa logowania hasłem (dowolne hasło lub puste kliknięcie)
var loginBtn = document.querySelector(".login");
if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        toHome();
    });
}

var input = document.querySelector(".password_input");
if (input) {
    input.addEventListener("keypress", (event) => {
        if (event.key === 'Enter') {
            toHome();
        }
    });
}

// Logika maskowania hasła
var eye = document.querySelector(".eye");
if (eye && input) {
    eye.addEventListener('click', () => {
        if (input.type === 'password') {
            input.type = 'text';
            eye.classList.add("eye_close");
        } else {
            input.type = 'password';
            eye.classList.remove("eye_close");
        }
    });
}

// Logika Face ID
let faceIdTimeout = null;

function startFaceID() {
    const modal = document.getElementById('faceIdModal');
    const pulse = document.getElementById('faceIdPulse');
    const icon = document.getElementById('faceIdIcon');
    const check = document.getElementById('faceIdCheck');
    const subtitle = document.getElementById('faceIdSubtitle');

    if (!modal) {
        toHome();
        return;
    }

    modal.classList.add('active');
    pulse.style.display = 'block';
    icon.style.display = 'block';
    check.style.display = 'none';
    subtitle.textContent = "Skanowanie twarzy...";

    if (faceIdTimeout) clearTimeout(faceIdTimeout);

    // Symulacja skanowania Face ID trwająca ~1 sekundę
    faceIdTimeout = setTimeout(() => {
        pulse.style.display = 'none';
        icon.style.display = 'none';
        check.style.display = 'block';
        subtitle.textContent = "Zweryfikowano pomyślnie";

        if (navigator.vibrate) {
            try { navigator.vibrate([40, 60, 40]); } catch(e) {}
        }

        setTimeout(() => {
            toHome();
        }, 500);
    }, 1100);
}

function cancelFaceID() {
    const modal = document.getElementById('faceIdModal');
    if (modal) modal.classList.remove('active');
    if (faceIdTimeout) clearTimeout(faceIdTimeout);
}

// Automatyczne uruchomienie Face ID na urządzeniach Apple / mobile
window.addEventListener('DOMContentLoaded', () => {
    const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;

    // Uruchom Face ID automatycznie na telefonie
    if (isIos || isStandalone || window.innerWidth <= 600) {
        setTimeout(() => {
            startFaceID();
        }, 400);
    }
});
