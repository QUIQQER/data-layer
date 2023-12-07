/**
 * @module package/quiqqer/data-layer/bin/backend/settings/DataLayerEntry
 * @author www.pcsg.de (Henning Leutz)
 */
define('package/quiqqer/data-layer/bin/backend/settings/DataLayerEntry', [

    'qui/QUI',
    'qui/controls/Control',
    'qui/controls/loader/Loader',
    'Ajax',

    'css!package/quiqqer/data-layer/bin/backend/settings/DataLayerEntry.css'

], function(QUI, QUIControl, QUILoader, QUIAjax) {
    'use strict';

    return new Class({

        Extends: QUIControl,
        Type: 'package/quiqqer/data-layer/bin/settingsDataLayerEntry',

        Binds: [
            '$onImport'
        ],

        initialize: function(options) {
            this.parent(options);

            this.Loader = new QUILoader();
            this.$loaded = false;
            this.$Project = null;

            this.addEvents({
                onImport: this.$onImport
            });
        },

        setProject: function(Project) {
            this.$Project = Project;
            this.$load();
        },

        $onImport: function() {
            this.$Textarea = this.getElm();

            this.setAttribute('dataLayerType', this.$Textarea.get('data-qui-options-type'));
            this.setAttribute('dataLayerKey', this.$Textarea.get('data-qui-options-key'));

            this.$Elm = new Element('div', {
                'class': 'field-container-field quiqqer-dataLayer-entry'
            }).wraps(this.$Textarea);

            this.Loader.inject(this.$Elm);
            this.Loader.show();
            this.$load();
        },

        $load: function() {
            if (this.$loaded) {
                return;
            }

            if (!this.$Project) {
                return;
            }

            this.$loaded = true;

            QUIAjax.get('package_quiqqer_data-layer_ajax_backend_getDataLayerEntry', (value) => {
                this.$Textarea.value = value;
                this.Loader.hide();
            }, {
                'package': 'quiqqer/data-layer',
                projectName: this.$Project.getName(),
                dataLayerType: this.getAttribute('dataLayerType'),
                dataLayerKey: this.getAttribute('dataLayerKey')
            });
        }
    });
});
