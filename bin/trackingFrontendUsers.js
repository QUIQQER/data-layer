window.whenQuiLoaded().then(function() {
    'use strict';

    require([
        'qui/QUI',
        'Ajax'
    ], function(QUI, QUIAjax) {

        /**
         * tracks the start of a deletion process from an user
         */
        function trackUserDeleteStart()
        {
            window.dataLayer.push({
                'event': 'profileDeleteStart'
            });
        }

        /**
         * tracks the success of a deletion from an user
         */
        function trackUserDelete()
        {
            window.dataLayer.push({
                'event': 'profileDeleteSuccess'
            });
        }


        // registration tracking
        QUI.addEvent('onQuiqqerFrontendUsersRegisterStart', function() {
            window.dataLayer.push({
                'event': 'registerStart'
            });
        });

        QUI.addEvent('onQuiqqerFrontendUsersRegisterSuccess', function() {
            window.dataLayer.push({
                'event': 'registerSuccess'
            });
        });


        // deletion tracking
        if (QUI.getAttribute('QUIQQER_FRONTEND_USERS_ACCOUNT_DELETE_START')) {
            trackUserDeleteStart();
        }

        QUI.addEvent('quiqqerFrontendUsersAccountDeleteStart', function() {
            trackUserDeleteStart();
        });

        if (QUI.getAttribute('QUIQQER_VERIFIER_SUCCESS')) {
            const verifier = QUI.getAttribute('QUIQQER_VERIFIER_SUCCESS');

            if (verifier === 'QUIFrontendUsersUserDeleteConfirmVerification') {
                trackUserDelete();
            }
        }

        QUI.addEvent('quiqqerVerifierSuccess', function(verifier) {
            if (verifier === 'QUIFrontendUsersUserDeleteConfirmVerification') {
                trackUserDelete();
            }
        });
    });
});