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
    public static function onTemplateHeaderBegin(
        Collector $Collection,
        QUI\Template $Template
    ) {
        $Collection->append('<script data-no-cache="1">window.dataLayer = window.dataLayer || [];</script>');

        if ($Template->getAttribute('Project')) {
            // insert header tags

            /* @var $Project QUI\Projects\Project */
            $DataLayer = new DataLayer();
            $Project = $Template->getAttribute('Project');

            $Collection->append(
                $DataLayer->getHeaderBegin($Project)
            );
        }
    }

    public static function onTemplateHeaderEnd(
        Collector $Collection,
        QUI\Template $Template
    ) {
        if ($Template->getAttribute('Project')) {
            // insert header tags

            /* @var $Project QUI\Projects\Project */
            $DataLayer = new DataLayer();
            $Project = $Template->getAttribute('Project');

            $Collection->append(
                $DataLayer->getHeaderEnd($Project)
            );
        }
    }

    public static function onTemplateBodyBegin(
        Collector $Collection,
        QUI\Template $Template
    ) {
        if ($Template->getAttribute('Project')) {
            // insert header tags

            /* @var $Project QUI\Projects\Project */
            $Project = $Template->getAttribute('Project');
            $DataLayer = new DataLayer();

            $Collection->append(
                $DataLayer->getBodyBegin($Project)
            );
        }
    }

    public static function onTemplateBodyEnd(
        Collector $Collection,
        QUI\Template $Template
    ) {
        $Collection->append(
            '<script src="' . URL_OPT_DIR . 'quiqqer/data-layer/bin/dataLayerEvents.js"></script>' .
            '<script src="' . URL_OPT_DIR . 'quiqqer/data-layer/bin/trackingEcommerce.js"></script>' .
            '<script src="' . URL_OPT_DIR . 'quiqqer/data-layer/bin/trackingFrontendUsers.js"></script>'
        );

        if ($Template->getAttribute('Project')) {
            // insert header tags

            /* @var $Project QUI\Projects\Project */
            $DataLayer = new DataLayer();
            $Project = $Template->getAttribute('Project');

            $Collection->append(
                $DataLayer->getBodyEnd($Project)
            );
        }
    }

}
