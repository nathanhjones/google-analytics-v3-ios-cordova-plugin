(function () {
	"use strict";

	require.config({

		paths: {
			"underscore":				"libraries/underscore-min",
			"backbone":					"libraries/backbone-min",
			"phonegap":					"libraries/cordova",
			"hogan":					"libraries/hogan.min",
			"template":					"libraries/template",
			"templates":				"templates/templates",
			"bootstrap":				"libraries/bootstrap",
			"analytics":				"libraries/GoogleAnalyticsPlugin",
			"common":					"common"
		},

		shim: {

			"backbone": {
				"deps": [ "underscore", "jquery" ],
				"exports": "Backbone"
			},

			"templates": {
				"deps": [ "template" ]
			},

			"analytics": {
				"deps": [ "phonegap" ]
			}
		}

	});

	require([
		"jquery",
		"backbone",
		"router",
		"phonegap",
		"analytics",
		"common"
	], function ($, Backbone, Router) {
		var router = new Router();

		// globally handle adding / removing our active state for buttons
		// because we use the touchend event to initiate an action
		$(document).on("click mousedown touchstart", "button", function (){
			$(this).addClass("active")
		});

		$(document).on("mouseup mouseleave touchend", "button", function (){
			$(this).removeClass("active");
		});

		app.initialize();


	});
}());