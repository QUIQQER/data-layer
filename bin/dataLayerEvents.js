window.whenQuiLoaded().then(function() {
    // first track
    window.dataLayer.push({
        'event': 'Pageview',
        'pagePath': window.location.toString(),
        'pageTitle': window.title,
        'visitorType': QUIQQER_USER.id ? 'user' : 'visitor',
        'siteType': QUIQQER_SITE.type,
        'siteId': QUIQQER_SITE.id
    });
});
