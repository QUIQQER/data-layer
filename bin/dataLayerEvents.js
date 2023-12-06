window.whenQuiLoaded().then(function() {
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
