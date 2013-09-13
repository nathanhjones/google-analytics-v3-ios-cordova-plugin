define(["jquery",
        "backbone",
        "views/analyticsView"
        ], function ($, Backbone, AnalyticsView) {

    "use strict";

    var Router = Backbone.Router.extend({

		routes: {
            "": "home"
        },

        initialize: function () {
            Backbone.history.start();
        },

        home: function () {
            var analyticsView = new AnalyticsView();
            analyticsView.render();
        }
    });

    return Router;
});