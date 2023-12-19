(function() {
    'use strict';

    window.dataLayer = window.dataLayer || [];

    const originalPush = window.dataLayer.push;
    window.dataLayer.push = function() {
        const pushArgs = Array.from(arguments);

        if (typeof require !== 'undefined') {
            require(['qui/QUI'], function(QUI) {
                QUI.fireEvent('dataLayerPush', [pushArgs[0]]);
            });
        }

        return originalPush.apply(this, arguments);
    };

    window.qTrack = function() {
        window.dataLayer.push(arguments);
    };

    window.qTrack('js', new Date());
})();
