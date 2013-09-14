function GoogleAnalyticsPlugin () {}

/*
 *	Setup
 */

GoogleAnalyticsPlugin.prototype.startTracking = function (accountId) {
	cordova.exec(null, null, "GoogleAnalyticsPlugin", "startTracking", [accountId]);
}

GoogleAnalyticsPlugin.prototype.startSession = function () {
	cordova.exec(null, null, "GoogleAnalyticsPlugin", "startSession", []);
}

GoogleAnalyticsPlugin.prototype.endSession = function () {
	cordova.exec(null, null, "GoogleAnalyticsPlugin", "endSession", []);
}

GoogleAnalyticsPlugin.prototype.anonymizeTracking = function (anonymize) {
	cordova.exec(null, null, "GoogleAnalyticsPlugin", "anonymizeTracking", []);
}

GoogleAnalyticsPlugin.prototype.setDispatchInterval = function (dispatchInterval) {
	cordova.exec(null, null, "GoogleAnalyticsPlugin", "setDispatchInterval", [dispatchInterval]);
}

GoogleAnalyticsPlugin.prototype.dispatchTrackedQueue = function () {
	cordova.exec(null, null, "GoogleAnalyticsPlugin", "dispatchTrackedQueue", []);
}

/*
 *	Tracking
 */

GoogleAnalyticsPlugin.prototype.sendEvent = function (category, action, label, value) {
	var options = {
		category: category,
		action: action,
		label: label,
		value: value
	};
	cordova.exec(null, null, "GoogleAnalyticsPlugin", "sendEvent", [options]);
}

GoogleAnalyticsPlugin.prototype.sendException = function (fatal, description) {
	var options = {
		fatal: fatal,
		description: description
	};
	cordova.exec(null, null, "GoogleAnalyticsPlugin", "sendException", [options]);
}

GoogleAnalyticsPlugin.prototype.sendSocial = function (network, action, target) {
	var options = {
		network: network,
		action: action,
		target: target
	};
	cordova.exec(null, null, "GoogleAnalyticsPlugin", "sendSocial", [options]);
}

GoogleAnalyticsPlugin.prototype.sendTiming = function (category, time, name, label) {
	var options = {
		category: category,
		time: time,
		name: name,
		label: label
	};
	cordova.exec(null, null, "GoogleAnalyticsPlugin", "sendTiming", [options]);
}

GoogleAnalyticsPlugin.prototype.sendTransaction = function (transaction) {
	cordova.exec(null, null, "GoogleAnalyticsPlugin", "sendTransaction", [transaction]);
}

GoogleAnalyticsPlugin.prototype.sendView = function (viewName) {
	cordova.exec(null, null, "GoogleAnalyticsPlugin", "sendView", [viewName]);
}

/*
 *	Additional Metrics
 */

GoogleAnalyticsPlugin.prototype.setCustomDimension = function (index, dimension) {
	var options = {
		index: index,
		dimension: dimension
	};
	cordova.exec(null, null, "GoogleAnalyticsPlugin", "setCustomDimension", [options]);
}

GoogleAnalyticsPlugin.prototype.setCustomMetric = function (index, metric) {
	var options = {
		index: index,
		metric: metric
	};
	cordova.exec(null, null, "GoogleAnalyticsPlugin", "setCustomMetric", [options]);
}

/*
 *	Plugin Installation
 */

GoogleAnalyticsPlugin.install = function() {
    if(!window.plugins) {
        window.plugins = {};
    }
    window.plugins.googleAnalytics = new GoogleAnalyticsPlugin();
};

cordova.addConstructor(GoogleAnalyticsPlugin.install);