var params = new URLSearchParams(window.location.search);

function setText(id, value, fallback) {
    var element = document.getElementById(id);
    if (element) {
        element.textContent = value || fallback;
    }
}

setText('id_series_value', params.get('id_series'), 'ZZC 108201');
setText('id_expiry_date_value', params.get('id_expiry_date'), '13.04.2032');
setText('id_issue_date_value', params.get('id_issue_date'), '14.07.2022');

var options = { year: 'numeric', month: 'numeric', day: '2-digit' };
var updateText = document.querySelector('.bottom_update_value');
var update = document.querySelector('.update');

if (localStorage.getItem('update') == null) {
    localStorage.setItem('update', '21.05.2025');
}

if (updateText) {
    updateText.textContent = localStorage.getItem('update');
}

if (update) {
    update.addEventListener('click', function () {
        var newDate = new Date().toLocaleDateString('pl-PL', options);
        localStorage.setItem('update', newDate);
        if (updateText) {
            updateText.textContent = newDate;
        }
        scroll(0, 0);
    });
}
