<?php

namespace QUI\DataLayer;

use QUI;
use QUI\Smarty\Collector;

use function file_get_contents;

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
    ): void {
        $dataLayerJs = file_get_contents(OPT_DIR . 'quiqqer/data-layer/bin/dataLayer.js');

        $Collection->append(
            '<script data-no-cache="1">' . $dataLayerJs . '</script>'
        );
    }

    public static function onTemplateEnd(
        Collector $Collection,
        QUI\Template $Template
    ): void {
        $Collection->append(
            '<script src="' . URL_OPT_DIR . 'quiqqer/data-layer/bin/dataLayerTrack.js"></script>'
        );
    }
}
