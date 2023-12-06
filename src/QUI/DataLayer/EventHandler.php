<?php

namespace QUI\DataLayer;

use QUI;
use Quiqqer\Engine\Collector;

/**
 * Class EventHandler
 *
 * The EventHandler class contains static event handler methods for various events.
 */
class EventHandler
{
    public static function onTemplateBegin(
        Collector $Collection,
        QUI\Template $Template
    ) {
        $Collection->append('<script data-no-cache="1">window.dataLayer = window.dataLayer || [];</script>');
    }

    public static function onTemplateEnd(
        Collector $Collection,
        QUI\Template $Template
    ) {
        $Collection->append(
            '<script src="' . URL_OPT_DIR . 'quiqqer/data-layer/bin/dataLayerEvents.js"></script>' .
            '<script src="' . URL_OPT_DIR . 'quiqqer/data-layer/bin/trackingEcommerce.js"></script>' .
            '<script src="' . URL_OPT_DIR . 'quiqqer/data-layer/bin/trackingFrontendUsers.js"></script>'
        );
    }
}
