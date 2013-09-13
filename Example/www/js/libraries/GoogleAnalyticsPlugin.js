function GoogleAnalyticsPlugin () {}

/*
 *	Setup
 */

GoogleAnalyticsPlugin.prototype.startTracking = function (accountId) {
	cordova.exec(null, null, "GoogleAnalyticsPlugin", "startTracking", [accountId]);
}

GoogleAnalyticsPlugin.prototype.stopTracking = function () {
	cordova.exec(null, null, "GoogleAnalyticsPlugin", "stopTracking");
}

GoogleAnalyticsPlugin.prototype.restartTracking = function () {
	cordova.exec(null, null, "GoogleAnalyticsPlugin", "restartTracking", [true]);
}

GoogleAnalyticsPlugin.prototype.anonymizeTracking = function (anonymize) {
	cordova.exec(null, null, "GoogleAnalyticsPlugin", "anonymizeTracking", [anonymize]);
}

/*
 *	Tracking
 */

GoogleAnalyticsPlugin.prototype.sendView = function (success, failure, viewName) {
	cordova.exec(success, failure, "GoogleAnalyticsPlugin", "sendView", [viewName]);
}

GoogleAnalyticsPlugin.prototype.sendEvent = function (success, failure, category, action, label, value) {
	var options = {
		category: category,
		action: action,
		label: label,
		value: value
	};
	cordova.exec(success, failure, "GoogleAnalyticsPlugin", "sendEvent", [options]);
}

GoogleAnalyticsPlugin.prototype.sendSocial = function (success, failure, network, action, target) {
	var options = {
		network: network,
		action: action,
		target: target
	};
	cordova.exec(success, failure, "GoogleAnalyticsPlugin", "sendSocial", [options]);
}

GoogleAnalyticsPlugin.prototype.sendTransaction = function (success, failure, transactionId, affiliate, items) {
	console.log('sending transaction');
	var options = {
		transactionId: transactionId,
		affiliate: affiliate,
		items: items	// array of transcation items - productCode, productName, productCategory, price, quantity
	};
	console.log('Options: ' + options);
	cordova.exec(success, failure, "GoogleAnalyticsPlugin", "sendTransaction", [options]);
}

GoogleAnalyticsPlugin.prototype.sendException = function (success, failure, fatal, description) {
	var options = {
		fatal: fatal,
		description: description
	};
	cordova.exec(success, failure, "GoogleAnalyticsPlugin", "sendException", [options]);
}

GoogleAnalyticsPlugin.prototype.sendTiming = function (success, failure, category, time, name, label) {
	var options = {
		category: category,
		time: time,
		name: name,
		label: label
	};
	cordova.exec(success, failure, "GoogleAnalyticsPlugin", "sendTiming", [options]);
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
 *	Plugin Code
 */

GoogleAnalyticsPlugin.install = function() {
    if(!window.plugins) {
        window.plugins = {};
    }
    window.plugins.googleAnalytics = new GoogleAnalyticsPlugin();
};

cordova.addConstructor(GoogleAnalyticsPlugin.install);