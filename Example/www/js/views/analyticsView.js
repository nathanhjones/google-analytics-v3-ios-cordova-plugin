define([ "jquery", "backbone", "templates", "common"], function ($, Backbone) {

    "use strict";

    var AnalyticsView = Backbone.View.extend({
    	el: '#content',

        events: {
            "touchend .start-tracking": "startTrackingTapped",
            "touchend .start-session": "startNewSessionTapped",
            "touchend .end-session": "endCurrentSessionTapped",
            "touchend .anonymize": "anonymizeTrackingTapped",
            "touchend .send-event": "sendEventTapped",
            "touchend .send-exception": "sendExceptionTapped",
            "touchend .send-social": "sendSocialTapped",
            "touchend .send-timing": "sendTimingTapped",
            "touchend .send-transaction": "sendTransactionTapped",
            "touchend .send-view": "sendViewTapped"
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
        	console.log('anonymize tracking');
        	anonymizeAnalyticTracking(true);
        },

        sendEventTapped: function	(e) {
        	e.preventDefault();
        	var category = 'uiAction',
        		action = 'buttonTapped',
        		label = 'sendEventButton',
        		value = 0;

        	// here is an example of the success / failure callbacks
        	sendAnalyticEvent(category, action, label, value);
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
        		time = 2.0,
        		name = 'fetchRandomResource',
        		label = 'WiFi';

        	sendAnalyticTiming(category, time, name, label);
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
        	var viewTitle = 'analytics-view';

        	sendAnalyticView(viewTitle);
        }
    });

    return AnalyticsView;

});
