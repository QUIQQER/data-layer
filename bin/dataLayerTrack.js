window.whenQuiLoaded().then(function() {
    'use strict';

    window.qTrack('event', 'page_view', {
        'page_location': window.location.toString(),
        'page_title': document.title,
        'visitor_type': QUIQQER_USER.id ? 'user' : 'visitor',
        'site_type': QUIQQER_SITE.type.replace('quiqqer/', ''), // <- mor wollte das
        'site_id': QUIQQER_SITE.id
    });
});
