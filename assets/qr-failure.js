(function () {
    var qrFailureTimer = null;
    var qrFailureOptions = {};

    function getOverlayParts() {
        return {
            overlay: document.querySelector('.qr_demo_error'),
            content: document.querySelector('.qr_demo_error_content')
        };
    }

    function openOverlay() {
        var parts = getOverlayParts();
        if (!parts.overlay || !parts.content) {
            return null;
        }

        parts.overlay.classList.add('open');
        parts.overlay.setAttribute('aria-hidden', 'false');
        document.body.classList.add('qr_failure_active');
        return parts;
    }

    window.closeQrFailure = function () {
        var parts = getOverlayParts();
        clearTimeout(qrFailureTimer);
        if (parts.overlay) {
            parts.overlay.classList.remove('open');
            parts.overlay.setAttribute('aria-hidden', 'true');
        }
        document.body.classList.remove('qr_failure_active');
    };

    window.qrFailureClose = function () {
        if (qrFailureOptions.closeToQr && typeof sendTo === 'function') {
            sendTo('qr');
            return;
        }

        window.closeQrFailure();
    };

    window.showQrFailure = function () {
        var parts = openOverlay();
        if (!parts) {
            return;
        }

        parts.content.innerHTML = [
            '<button class="qr_error_close" type="button" aria-label="Zamknij" onclick="qrFailureClose()"></button>',
            '<div class="qr_error_icon" aria-hidden="true"></div>',
            '<p class="qr_error_title">Wystąpił błąd</p>',
            '<p class="qr_error_description">Nie możemy wyświetlić Twoich danych.<br>Spróbuj ponownie później.</p>',
            '<div class="qr_error_buttons">',
            '<button class="qr_error_button primary" type="button" onclick="restartQrFailure()">Spróbuj ponownie</button>',
            '<button class="qr_error_button secondary" type="button" onclick="qrFailureClose()">Zamknij</button>',
            '</div>'
        ].join('');
    };

    window.restartQrFailure = function () {
        window.startQrFailure(qrFailureOptions);
    };

    window.startQrFailure = function (options) {
        var parts = openOverlay();
        if (!parts) {
            return;
        }

        qrFailureOptions = options || {};
        clearTimeout(qrFailureTimer);
        parts.content.innerHTML = '<div class="qr_spinner" aria-hidden="true"></div>';
        qrFailureTimer = setTimeout(window.showQrFailure, 2000);
    };
})();
