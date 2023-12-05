<?php

namespace QUI\DataLayer;

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
}
