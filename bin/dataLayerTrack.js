window.whenQuiLoaded().then(function() {
    'use strict';

    if (typeof window.qTrack !== 'function') {
        return;
    }

    window.qTrack('event', 'page_view', {
        'page_location': window.location.toString(),
        'page_title': document.title,
        'visitor_type': QUIQQER_USER.id ? 'user' : 'visitor',
        'site_type': QUIQQER_SITE.type.replace('quiqqer/', ''), // <- mor wollte das
        'site_id': QUIQQER_SITE.id
    });

    require(['qui/QUI'], function(QUI) {
        QUI.addEvent('onQuiqqerUserAuthLoginSuccess', function(Instance, authenticator) {
            const data = {};

            if (typeof authenticator !== 'undefined' && authenticator !== '') {
                data.method = authenticator;
            }

            window.qTrack('event', 'login', data);
        });

        QUI.addEvent('onQuiqqerFrontendUsersRegisterSuccess', function() {
            window.qTrack('event', 'sign_up');
        });
    });
});
