function startAnalyticTracking () {
	"use strict";

	if (window.plugins.googleAnalytics) {
		//window.plugins.googleAnalytics.startTracking('UA-XXXYYYZZ-1');
		window.plugins.googleAnalytics.startTracking('UA-43988926-1');
	}
}

function restartAnalyticTracking () {
	"use strict";

	if (window.plugins.googleAnalytics) {
		window.plugins.googleAnalytics.restartTracking();
	}
}

function anonymizeAnalyticTracking (anonymize) {
	"use strict";

	if (window.plugins.googleAnalytics) {
		window.plugins.googleAnalytics.anonymizeTracking(anonymize);
	}
}

function setAnalyticDimension (index, name) {
	"use strict";

	if (window.plugins.googleAnalytics) {
		window.plugins.googleAnalytics.setCustomDimension(index, name);
	}
}

function sendAnalyticView (success, failure, viewName) {
	"use strict";

	if (window.plugins.googleAnalytics) {
		window.plugins.googleAnalytics.sendView(success, failure, viewName);
	}
}

function sendAnalyticEvent (success, failure, category, action, label, value) {
	"use strict";

	if (window.plugins.googleAnalytics) {
		window.plugins.googleAnalytics.sendEvent(success, failure, category, action, label, value);
	}
}

function sendAnalyticSocial (success, failure, network, action, target) {
	"use strict";

	if (window.plugins.googleAnalytics) {
		window.plugins.googleAnalytics.sendSocial(success, failure, network, action, target);
	}
}

function sendAnalyticTransaction (success, failure, transactionId, affiliate, items) {
	"use strict";

	if (window.plugins.googleAnalytics) {
		window.plugins.googleAnalytics.sendTransaction(success, failure, transactionId, affiliate, items);
	}
}

function sendAnalyticException (success, failure, fatal, description) {
	"use strict";

	if (window.plugins.googleAnalytics) {
		window.plugins.googleAnalytics.sendException(success, failure, fatal, description);
	}
}

function sendAnalyticTiming (success, failure, category, time, name, label) {
	"use strict";

	if (window.plugins.googleAnalytics) {
		window.plugins.googleAnalytics.sendTiming(success, failure, category, time, name, label);
	}
}