<?php

use QUI\DataLayer\DataLayer;

QUI::$Ajax->registerFunction(
    'package_quiqqer_data-layer_ajax_backend_getDataLayerEntry',
    function ($projectName, $dataLayerType, $dataLayerKey) {
        $DataLayer = new DataLayer();
        $Project = QUI::getProject($projectName);

        return $DataLayer->getDataLayerValue($Project, $dataLayerType, $dataLayerKey);
    },
    ['projectName', 'dataLayerType', 'dataLayerKey'],
    'Permission::checkAdminUser'
);
