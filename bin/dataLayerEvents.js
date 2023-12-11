window.whenQuiLoaded().then(function() {
    'use strict';

    window.dataLayer = window.dataLayer || [];

    const originalPush = window.dataLayer.push;
    window.dataLayer.push = function() {
        const pushArgs = arguments;

        require(['qui/QUI'], function(QUI) {
            QUI.fireEvent('dataLayerPush', [pushArgs[0]]);
        });

        return originalPush.apply(this, arguments);
    };


    // first track
    window.dataLayer.push({
        'event': 'pageview',
        'pagePath': window.location.toString(),
        'pageTitle': window.title,
        'visitorType': QUIQQER_USER.id ? 'user' : 'visitor',
        'siteType': QUIQQER_SITE.type.replace('quiqqer/', ''), // <- mor wollte das
        'siteId': QUIQQER_SITE.id
    });
});
