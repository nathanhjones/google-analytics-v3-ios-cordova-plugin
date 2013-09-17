define([ "jquery", "backbone", "templates", "common"], function ($, Backbone) {

    "use strict";

    var AnalyticsView = Backbone.View.extend({
    	el: '#content',

        events: {
            "touchend .start-tracking": "startTrackingTapped",
            "touchend .start-session": "startNewSessionTapped",
            "touchend .end-session": "endCurrentSessionTapped",
            "touchend .anonymize": "anonymizeTrackingTapped",
            "touchend .set-dispatch-interval": "setDispatchIntervalTapped",
            "touchend .dispatch-queue": "dispatchQueueTapped",
            "touchend .send-event": "sendEventTapped",
            "touchend .send-exception": "sendExceptionTapped",
            "touchend .send-social": "sendSocialTapped",
            "touchend .send-timing": "sendTimingTapped",
            "touchend .send-transaction": "sendTransactionTapped",
            "touchend .send-view": "sendViewTapped",
            "touchend .set-dimension": "setDimensionTapped",
            "touchend .set-metric": "setMetricTapped"
        },

        render: function () {
        	$(this.el).html(templates["analytics-view"].render());
            return this;
        },

        /*
         * UI Response
         */

        startTrackingTapped: function (e) {
        	e.preventDefault();
        	startAnalyticTracking();
        },

        startNewSessionTapped: function (e) {
        	e.preventDefault();
        	startNewAnalyticSession();
        },

        endCurrentSessionTapped: function (e) {
        	e.preventDefault();
        	endCurrentAnalyticSession();
        },

        anonymizeTrackingTapped: function (e) {
        	e.preventDefault();
        	anonymizeAnalyticTracking();
        },

        setDispatchIntervalTapped: function (e) {
        	e.preventDefault();
        	setAnalyticDispatchInterval(30.0);
        },

        dispatchQueueTapped: function (e) {
        	e.preventDefault();
        	dispatchAnalyticQueue();
        },

        sendEventTapped: function	(e) {
        	e.preventDefault();
        	var view = 'analytics-view',
        		category = 'uiAction',
        		action = 'buttonTapped',
        		label = 'sendEventButtonWithView',
        		value = 0;

        	// here is an example of the success / failure callbacks
        	sendAnalyticEvent(view, category, action, label, value);
        },

        sendExceptionTapped: function (e) {
        	e.preventDefault();
        	var fatalException = true,
        		description = 'This is embarassing';

        	sendAnalyticException (fatalException, description)
        },

        sendSocialTapped: function (e) {
        	e.preventDefault();
        	var network = 'twitter',
        		action = 'tweet',
        		target = 'https://github.com/nathanhjones/google-analytics-v2-ios-cordova-plugin';

        	sendAnalyticSocial(network, action, target);
        },

        sendTimingTapped: function (e) {
        	e.preventDefault();
        	var category = 'api',
        		milliseconds = 3000,
        		name = '/user/987',
        		label = 'WiFi';

        	sendAnalyticTiming(category, milliseconds, name, label);
        },

        sendTransactionTapped: function (e) {
        	e.preventDefault();
        	var transaction = {
        		transactionId: '12345',
        		affiliation: 'Hybrid Store',
        		revenue: 13.629,
        		tax: 0.649,
        		shipping: 0,
        		currency: 'USD',
        		items: [
        			{
        				productName: 'Hybrid Product One',
        				productSKU: '1234',
        				productCategory: 'smartphone',
        				price: 10.99,
        				quantity: 1,
        				currency: 'USD'
        			},
        			{
        				productName: 'Hybrid Product Two',
        				productSKU: '4321',
        				productCategory: 'featurephone',
        				price: 1.99,
        				quantity: 1,
        				currency: 'USD'
        			}
        		]
			};

        	sendAnalyticTransaction (transaction);

        },

        sendViewTapped: function (e) {
        	e.preventDefault();
        	var viewName = 'analytics-view';

        	sendAnalyticView(viewName);
        },

        setDimensionTapped: function (e) {
        	e.preventDefault();
        	var index = 1,
        		name = 'offline';

        	setAnalyticDimension(index, name);
        },

        setMetricTapped: function (e) {
        	e.preventDefault();
        	var index = 1,
        		value = 5;

        	setAnalyticMetric(index, value);
        }
    });

    return AnalyticsView;

});
