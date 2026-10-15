var params = new URLSearchParams(window.location.search);
var ROUTES = {
    home: 'home.html',
    services: 'services.html',
    search: 'search.html',
    qr: 'qr.html',
    more: 'more.html',
    moreid: 'moreid.html',
    id: 'id.html',
    shortcuts: 'shortcuts.html',
    pesel: 'pesel.html',
    scanqr: 'scanqr.html',
    showqr: 'showqr.html',
    gen: 'gen.html',
    card: 'card.html',
    selectdocs: 'selectdocs.html',
    lockdoc: 'lockdoc.html',
    safenet: 'safenet.html',
    checkid: 'checkid.html',
    checkpesel: 'checkpesel.html',
    defensetraining: 'defensetraining.html',
    safetyguide: 'safetyguide.html',
    prescriptions: 'prescriptions.html',
    regdata: 'regdata.html',
    passportdata: 'passportdata.html',
    biometrics: 'biometrics.html',
    appearance: 'appearance.html',
    notifications: 'notifications.html',
    language: 'language.html',
    certificates: 'certificates.html',
    history: 'history.html',
    about: 'about.html',
    support: 'support.html',
    rateapp: 'rateapp.html',
    assistant: 'assistant.html',
    voteidea: 'voteidea.html'
};

function applyTheme() {
    var saved = localStorage.getItem('mobywatel_theme') || 'system';
    var isDark = true;
    if (saved === 'light') {
        isDark = false;
    } else if (saved === 'dark') {
        isDark = true;
    } else {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            isDark = false;
        } else {
            isDark = true;
        }
    }

    if (isDark) {
        document.documentElement.classList.remove('theme-light');
        document.documentElement.classList.add('theme-dark');
        document.documentElement.setAttribute('data-theme', 'dark');
        var meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', '#101419');
    } else {
        document.documentElement.classList.remove('theme-dark');
        document.documentElement.classList.add('theme-light');
        document.documentElement.setAttribute('data-theme', 'light');
        var meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', '#f3f4f6');
    }
}
applyTheme();

if (window.matchMedia) {
    try {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() {
            if ((localStorage.getItem('mobywatel_theme') || 'system') === 'system') {
                applyTheme();
            }
        });
    } catch(e) {}
}

function sendTo(key) {
    if (!key || key === 'null' || key === 'undefined') return;
    var qs = params.toString();
    var file = ROUTES[String(key)] || (String(key).endsWith('.html') ? String(key) : String(key) + '.html');
    var href = file + (qs ? `?${qs}` : '');
    location.href = href;
}

function renderStandardBottomBar() {
    var nav = document.querySelector('nav.bottom_bar');
    if (!nav) return;

    var cur = location.pathname.split('/').pop() || 'home.html';
    var mapping = {
        'home.html': 'home',
        'card.html': 'home',
        'selectdocs.html': 'home',
        'moreid.html': 'home',
        'shortcuts.html': 'home',
        'services.html': 'services',
        'lockdoc.html': 'services',
        'safenet.html': 'services',
        'checkid.html': 'services',
        'pesel.html': 'services',
        'checkpesel.html': 'services',
        'defensetraining.html': 'services',
        'safetyguide.html': 'services',
        'prescriptions.html': 'services',
        'qr.html': 'qr',
        'showqr.html': 'qr',
        'scanqr.html': 'qr',
        'search.html': 'search',
        'more.html': 'more',
        'regdata.html': 'more',
        'passportdata.html': 'more',
        'biometrics.html': 'more',
        'appearance.html': 'more',
        'notifications.html': 'more',
        'language.html': 'more',
        'certificates.html': 'more',
        'history.html': 'more',
        'about.html': 'more',
        'support.html': 'more',
        'rateapp.html': 'more',
        'assistant.html': 'more',
        'voteidea.html': 'more'
    };
    var activeKey = mapping[cur] || 'home';

    var tabs = [
        {
            key: 'home',
            label: 'Dokumenty',
            activeSvg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16a2 2 0 0 1 2 2v2H2V6a2 2 0 0 1 2-2zm-2 6h20v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8zm12 3a1 1 0 0 0 0 2h3a1 1 0 0 0 0-2h-3z"/></svg>',
            inactiveSvg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="3"></rect><line x1="3" y1="9" x2="21" y2="9"></line><circle cx="16" cy="14" r="1.2" fill="currentColor"></circle></svg>'
        },
        {
            key: 'services',
            label: 'Usługi',
            activeSvg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"/></svg>',
            inactiveSvg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"/></svg>'
        },
        {
            key: 'qr',
            label: 'Kod QR',
            activeSvg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8V6a2 2 0 0 1 2-2h2 M16 4h2a2 2 0 0 1 2 2v2 M4 16v2a2 2 0 0 0 2 2h2 M16 20h2a2 2 0 0 0 2-2v-2"/><path d="M8 9.5c1.5-.8 2.5-.8 4 0s2.5.8 4 0"/><path d="M8 12.5c1.5-.8 2.5-.8 4 0s2.5.8 4 0"/><path d="M8 15.5c1.5-.8 2.5-.8 4 0s2.5.8 4 0"/></svg>',
            inactiveSvg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8V6a2 2 0 0 1 2-2h2 M16 4h2a2 2 0 0 1 2 2v2 M4 16v2a2 2 0 0 0 2 2h2 M16 20h2a2 2 0 0 0 2-2v-2"/><path d="M8 9.5c1.5-.8 2.5-.8 4 0s2.5.8 4 0"/><path d="M8 12.5c1.5-.8 2.5-.8 4 0s2.5.8 4 0"/><path d="M8 15.5c1.5-.8 2.5-.8 4 0s2.5.8 4 0"/></svg>'
        },
        {
            key: 'search',
            label: 'Szukaj',
            activeSvg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16" y2="16"/><line x1="11" y1="8.5" x2="11" y2="13.5"/><line x1="8.5" y1="11" x2="13.5" y2="11"/></svg>',
            inactiveSvg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16" y2="16"/><line x1="11" y1="8.5" x2="11" y2="13.5"/><line x1="8.5" y1="11" x2="13.5" y2="11"/></svg>'
        },
        {
            key: 'more',
            label: 'Więcej',
            activeSvg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.2"><circle cx="7.5" cy="7.5" r="3.2"/><circle cx="16.5" cy="7.5" r="3.2"/><circle cx="7.5" cy="16.5" r="3.2"/><circle cx="16.5" cy="16.5" r="3.2"/></svg>',
            inactiveSvg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="7.5" cy="7.5" r="3.2"/><circle cx="16.5" cy="7.5" r="3.2"/><circle cx="7.5" cy="16.5" r="3.2"/><circle cx="16.5" cy="16.5" r="3.2"/></svg>'
        }
    ];

    var html = '<div class="bottom_bar_grid">';
    tabs.forEach(function(tab) {
        var isActive = (tab.key === activeKey);
        var svgIcon = isActive ? (tab.activeSvg || tab.inactiveSvg) : tab.inactiveSvg;
        html += '<div class="bottom_element_grid' + (isActive ? ' active' : '') + '" onclick="sendTo(\'' + tab.key + '\')">' +
            '<div class="bottom_icon_pill">' + svgIcon + '</div>' +
            '<p class="bottom_element_text' + (isActive ? ' open' : '') + '">' + tab.label + '</p>' +
        '</div>';
    });
    html += '</div>';

    nav.innerHTML = html;
}

window.addEventListener('DOMContentLoaded', function() {
    applyTheme();
    renderStandardBottomBar();
});

