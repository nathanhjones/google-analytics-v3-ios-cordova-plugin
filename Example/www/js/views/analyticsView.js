define([ "jquery", "backbone", "templates", "common"], function ($, Backbone) {

    "use strict";

    var AnalyticsView = Backbone.View.extend({
    	el: '#content',

        events: {
            "touchend .start-tracking": "startTrackingTapped",
            "touchend .restart-session": "restartSessionTapped",
            "touchend .anonymize": "anonymizeTrackingTapped",
            "touchend .send-event": "sendEventTapped",
            "touchend .send-exception": "sendExceptionTapped",
            "touchend .send-social": "sendSocialTapped",
            "touchend .send-timing": "sendTimingTapped",
            "touchend .send-transaction": "sendTransactionTapped",
            "touchend .send-view": "sendViewTapped"
        },

        initialize: function () {
        	this.eventSuccessCallback = _.bind(this.eventSuccessCallback, this);
        	this.eventFailureCallback = _.bind(this.eventFailureCallback, this);
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
        	console.log('start tracking');
        	startAnalyticTracking();
        },

        restartSessionTapped: function (e) {
        	e.preventDefault();
        	console.log('restart session');
        	restartAnalyticTracking();
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
        	sendAnalyticEvent(this.eventSuccessCallback, this.eventFailureCallback, category, action, label, value);
        },

        sendExceptionTapped: function (e) {
        	e.preventDefault();
        	var fatalException = true,
        		description = 'This is embarassing';

        	sendAnalyticException (null, null, fatalException, description)
        },

        sendSocialTapped: function (e) {
        	e.preventDefault();
        	var network = 'twitter',
        		action = 'tweet',
        		target = 'https://github.com/nathanhjones/google-analytics-v2-ios-cordova-plugin';

        	sendAnalyticSocial(null, null, network, action, target);
        },

        sendTimingTapped: function (e) {
        	e.preventDefault();
        	var category = 'api',
        		time = 2.0,
        		name = 'fetchRandomResource',
        		label = 'WiFi';

        	sendAnalyticTiming(null, null, category, time, name, label);
        },

        sendTransactionTapped: function (e) {
        	e.preventDefault();
        	var transactionId = '12345',
        		affiliate = 'Hybrid Store',
        		items = [
        			{
        				productCode: '567',
        				productName: 'Hybrid Product One',
        				productCategory: 'smartphone',
        				price: 10990000,
        				quantity: 1
        			},
        			{
        				productCode: '432',
        				productName: 'Hybrid Product Two',
        				productCategory: 'featurephone',
        				price: 1990000,
        				quantity: 1
        			}
        		];

        	sendAnalyticTransaction (null, null, transactionId, affiliate, items);

        },

        sendViewTapped: function (e) {
        	e.preventDefault();
        	var viewTitle = 'analytics-view';

        	sendAnalyticView(null, null, viewTitle);
        },

        /*
         *	Callbacks
         */

        eventSuccessCallback: function () {
        	console.log('Event sent successfully.');
        },

        eventFailureCallback: function (error) {
        	console.log('Unable to send event.');
        }
    });

    return AnalyticsView;

});
