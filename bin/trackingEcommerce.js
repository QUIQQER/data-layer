window.whenQuiLoaded().then(function() {
    'use strict';

    require([
        'qui/QUI',
        'Ajax'
    ], function(QUI, QUIAjax) {

        //region helper functions

        /**
         * Sends a request to track the contents of a basket.
         *
         * @param {Basket} Basket - The basket object containing the products to track.
         * @return {Promise} A promise that resolves when the tracking request is completed.
         */
        function getBasketData(Basket)
        {
            if (!parseInt(QUIQQER_USER.id)) {
                return new Promise(function(resolve) {
                    let products = [];
                    let basketProducts = Basket.getProducts();

                    for (let i = 0, len = basketProducts.length; i < len; i++) {
                        products.push(basketProducts[i].getAttributes());
                    }

                    QUIAjax.get('package_quiqqer_data-layer_ajax_ecommerce_getTrackData', resolve, {
                        'package': 'quiqqer/data-layer',
                        basketId: Basket.getId(),
                        products: JSON.encode(products)
                    });
                });
            }

            return new Promise(function(resolve) {
                QUIAjax.get('package_quiqqer_data-layer_ajax_ecommerce_getTrackData', resolve, {
                    'package': 'quiqqer/data-layer',
                    basketId: Basket.getId()
                });
            });
        }

        /**
         * Tracks a product view in Matomo.
         *
         * @param {boolean|integer} productId - The ID of the product being viewed.
         *
         * @return {void}
         */
        function trackProductView(productId)
        {
            QUIAjax.get('package_quiqqer_data-layer_ajax_ecommerce_getProductData', function(product) {
                const productNo = product.productNo,
                    title = product.title,
                    category = product.category,
                    price = product.price;

                window.dataLayer.push({
                    'event': 'productView',
                    'productUrl': product.url,
                    'productNo': productNo,
                    'title': title,
                    'category': category,
                    'price': price
                });
            }, {
                'package': 'quiqqer/data-layer',
                productId: productId
            });
        }

        /**
         * Tracks a category view
         *
         * @param siteId
         */
        function trackCategoryView(siteId)
        {
            QUIAjax.get('package_quiqqer_data-layer_ajax_ecommerce_getCategoryData', function(category) {
                window.dataLayer.push({
                    'event': 'categoryView',
                    'category': category
                });
            }, {
                'package': 'quiqqer/data-layer',
                siteId: siteId
            });
        }

        function trackOrder(OrderProcess)
        {
            const stepData = OrderProcess.getCurrentStepData();
            let url = '/' + stepData.step;

            if (QUIQQER_SITE.url !== '' && QUIQQER_SITE.url !== '/') {
                url = QUIQQER_SITE.url + url;
            }

            OrderProcess.getOrder().then(function(orderHash) {
                QUIAjax.get(
                    'package_quiqqer_data-layer_ajax_ecommerce_getTrackDataForOrderProcess',
                    function(orderData) {
                        window.dataLayer.push({
                            'event': 'orderProcess',
                            'pagePath': url,
                            'step': stepData.step,
                            'currencyCode': orderData.currencyData.code,
                            'products': orderData.products,
                            'subSum': orderData.subSum,
                            'sum': orderData.sum
                        });
                    },
                    {
                        'package': 'quiqqer/data-layer',
                        orderHash: orderHash
                    }
                );
            });
        }

        /**
         * Return current product id
         *
         * @return {boolean|integer}
         */
        function getProductId()
        {
            if (typeof window.QUIQQER_PRODUCT_ID === 'undefined') {
                return false;
            }

            return window.QUIQQER_PRODUCT_ID;
        }

        //endregion

        //region events

        // basket tracking
        require(['package/quiqqer/order/bin/frontend/Basket'], function(Basket) {
            Basket.addEvent('onAdd', function(Instance, Product) {
                getBasketData(Basket).then(function(data) {
                    window.dataLayer.push({
                        'event': 'basketAdd',
                        'currencyCode': data.currencyData.code,
                        'products': data.products,
                        'product': Product.getAttributes(),
                        'sum': data.sum
                    });
                });
            });

            Basket.addEvent('onRemove', function() {
                getBasketData(Basket).then(function(data) {
                    window.dataLayer.push({
                        'event': 'basketRemove',
                        'currencyCode': data.currencyData.code,
                        'products': data.products,
                        'sum': data.sum
                    });
                });
            });

            Basket.addEvent('onClear', function() {
                window.dataLayer.push({
                    'event': 'basketClear'
                });
            });
        });

        // category / product tracking
        if (window.QUIQQER_SITE.type === 'quiqqer/products:types/category' && !getProductId()) {
            trackCategoryView(window.QUIQQER_SITE.id);
        }

        if (window.QUIQQER_SITE.type === 'quiqqer/products:types/category' && getProductId()) {
            trackProductView(getProductId());
        }

        QUI.addEvent('onQuiqqerProductsOpenProduct', function(Parent, productId) {
            trackProductView(productId);
        });

        QUI.addEvent('onQuiqqerProductsCloseProduct', function() {
            trackCategoryView(window.QUIQQER_SITE.id);
        });

        QUI.addEvent('onQuiqqerOrderProcessOpenStep', function(OrderProcess) {
            trackOrder(OrderProcess);
        });

        QUI.addEvent('onQuiqqerOrderProcessLoad', function(OrderProcess) {
            trackOrder(OrderProcess);
        });

        QUI.addEvent('onQuiqqerOrderProductAdd', function(OrderProcess) {
            trackOrder(OrderProcess);
        });

        // finish
        QUI.addEvent('onQuiqqerOrderProcessFinish', function(orderHash) {
            QUIAjax.get('package_quiqqer_data-layer_ajax_ecommerce_getTrackDataForOrderProcess', function(orderData) {
                window.dataLayer.push({
                    'event': 'orderProcessFinish',
                    'currencyCode': orderData.currencyData.code,
                    'products': orderData.products,
                    'subSum': orderData.subSum,
                    'sum': orderData.sum
                });
            }, {
                'package': 'quiqqer/data-layer',
                orderHash: orderHash
            });
        });

        if (QUI.getAttribute('QUIQQER_ORDER_CHECKOUT_FINISH')) {
            QUIAjax.get('package_quiqqer_data-layer_ajax_ecommerce_getTrackDataForOrderProcess', function(orderData) {
                window.dataLayer.push({
                    'event': 'orderProcessFinish',
                    'currencyCode': orderData.currencyData.code,
                    'products': orderData.products,
                    'subSum': orderData.subSum,
                    'sum': orderData.sum
                });
            }, {
                'package': 'quiqqer/data-layer',
                orderHash: QUI.getAttribute('QUIQQER_ORDER_CHECKOUT_FINISH')
            });
        }
    });

});
