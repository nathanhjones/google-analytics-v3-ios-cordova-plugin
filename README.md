#Cordova Plugin for Version 3 of the Google Analytics iOS SDK
***
by Nathan Jones (@nathanhjones)

###Note: Version 3 of the iOS SDK is still in BETA
##Adding the plugin to your project
This plugin is built for [Version 3](https://developers.google.com/analytics/devguides/collection/ios/resources) of the Google Analytics iOS SDK (a version is included with the example app). To further confuse the matter, this plugin was built and tested on Cordova version 3.0.9.

1. Ensure you are running [Cordova 3.0.0 (zip)](https://www.apache.org/dyn/closer.cgi/cordova/cordova-3.0.0-src.zip)
2. Download the Google [iOS SDK (zip)](http://dl.google.com/googleanalyticsservices/GoogleAnalyticsServicesiOS_3.0.zip) and add the following files to your Xcode project:
	* GoogleAnalytics > Library > `GAI.h`
	* GoogleAnalytics > Library > `GAIDictionaryBuilder.h`
	* GoogleAnalytics > Library > `GAIFields.h`
	* GoogleAnalytics > Library > `GAILogger.h`
	* GoogleAnalytics > Library > `GAITrackedViewController.h`
	* GoogleAnalytics > Library > `GAITracker.h`
	* `libGoogleAnalyticsServices.a`
3. Add the following to your app's list of libraries linked with the binary:
    * `libGoogleAnalyticsServices.a`
    * `CoreData.framework`
    * `SystemConfiguration.framework`
    * `libz.dylib` - you can avoid linking this by adding the `-lz` flag to your targets Other Linker Flags
4. Add `GoogleAnalyticsPlugin.h` and `GoogleAnalyticsPlugin.m` from the Plugins `Source` directory to your project
5. Add the Plugin to your project `config.xml` file:

		<feature name="GoogleAnalyticsPlugin">
			<param name="ios-package" value="GoogleAnalyticsPlugin" />
			<param name="onload" value="true" />
		</feature>
6. Add `GoogleAnalyticsPlugin.js` from the Plugins `Source` directory to the `www/js` directory (presumably in a plugin or libraries subdirectory) and add the necessary references to your various views

##Using the Plugin
Before starting, you should review the [developer guide](https://developers.google.com/analytics/devguides/collection/ios/v3/) for Version 3. If you are migrating from Version 1 or Version 2 of the SDK, please read the [migration guide](https://developers.google.com/analytics/devguides/collection/ios/v3/migration). Your app's version number (as pulled from your apps main bundle) will be automatically sent for each function where it makes sense.

### General Setup
####Start Tracking
Before anything can be tracked you must start the tracker. This is accomplished by calling the `startTracking` function and passing the analytics id you received from Google Analytics.

		window.plugins.googleAnalytics.startTracking('UA-XXXYYYZZ-1');
####New Session
This function allows you to start a new session within Google Analytics. The next tracked item will be the **first** in the new session. Additional information can be found [here](https://developers.google.com/analytics/devguides/collection/ios/v3/sessions).

		window.plugins.googleAnalytics.startSession();
####End Session
This function allows you to end the current session. The next tracked item will be the **last** in the current session. Additional information can be found [here](https://developers.google.com/analytics/devguides/collection/ios/v3/sessions).

		window.plugins.googleAnalytics.endSession();
####Anonymize Data
This function allows you to anonymize the IP address information sent by the SDK. This is **required** in some countries. Unfortunately, the convenience method for this was removed in Version 3 of the SDK and no definitive documentation can be found. For additional information you can view the legacy [dev guide](https://developers.google.com/analytics/devguides/collection/ios/devguide#anonymizeIp).
 
		window.plugins.googleAnalytics.anonymizeTracking();
####Changing the Dispatch Interval
The default dispatch interval in the iOS SDK is 2 minutes. You can set it to any value greater-than 1 for automated, periodic dispatching. You can set it to a value less than 1 to disable periodic dispatching. This means that no data will be dispatched until you manually dispatch it yourself (see the next function).

Additional information can be found [here](https://developers.google.com/analytics/devguides/collection/ios/v3/dispatch).

		window.plugins.googleAnalytics.setDispatchInterval(30); // Every 30 seconds
####Manually Dispatching the Queue
This function allows you to manually dispatch any pending data to Google Analytics. This method **must** be called in situations where you have disabled periodic dispatch if you wish to transmit data to Google Analytics. Care should be taken when using this function as calling it too frequently could inadvertantly drain battery life.

Additional information can be found [here](https://developers.google.com/analytics/devguides/collection/ios/v3/dispatch).

		window.plugins.googleAnalytics.dispatchTrackedQueue();
###Tracking
####Events
Events allow you to measure how your users are interacting with the different components of your app. How you organize your events is completely up to you but below is an example of the tap of a button. Additional information can be found [here](https://developers.google.com/analytics/devguides/collection/ios/v3/events).
		
		var category = 'uiAction',
        	action = 'buttonTapped',
        	label = 'sendEventButton',
        	value = 0;
        	
		window.plugins.googleAnalytics.sendEvent(category, action, label, value);
####Exceptions
While probably not as likely to happen within your app this function allows you to measure exceptions. This could be repurposed for your app to track issues where a library doesn't load, exceptions in try statement, or maybe even monitoring remote API errors. Additional information can be found [here](https://developers.google.com/analytics/devguides/collection/ios/v3/exceptions).

		var fatalException = true,
        	description = 'This is embarassing';
        	
        window.plugins.googleAnalytics.sendException(fatal, description);
####Social
This function allows you to track various social interactions within your app. Perhaps you want to track the number of times someone tweets about a URL from your news reader app or how many times they like it on facebook. The example below shamelessly tracks the number of times within the sample app that you tweet a link to this repo.

Additional information can be found [here](https://developers.google.com/analytics/devguides/collection/ios/v3/social).

		var network = 'twitter',
        	action = 'tweet',
        	target = 'https://github.com/nathanhjones/google-analytics-v2-ios-cordova-plugin';
        	
        window.plugins.googleAnalytics.sendSocial(network, action, target);
####Timing
User specific timings allow you to measure the time it takes to complete certain actions in your app. For example, you might want to measure how long it takes to load a particular third-party library or perhaps you want to measure how long it takes the user to complete a series of tasks. The example below measures how long it took for an remote API call to finish and tags the endpoint being fetched and that the device was on WiFi.

Additional information can be found [here](https://developers.google.com/analytics/devguides/collection/ios/v3/usertimings).

		var category = 'api',
        	time = 2.0,
        	name = '/user/123',
        	label = 'WiFi';
        	
        window.plugins.googleAnalytics.sendTiming(category, time, name, label);
####Transactions
Tracking transactions allow you to track sales and in-app purchases. The plugin expects the transaction structure defined below. You have several options of abstracting this from your UI with helper methods but has been left as an implementation detail for your specific project. Additional information can be found [here](https://developers.google.com/analytics/devguides/collection/ios/v3/ecommerce).

**Note: currency symbols and commas should not be included in any currency field**

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
		
		window.plugins.googleAnalytics.sendTransaction(transaction);
####Views
This function allows you to track which views within your app each users is visiting and for how long. Additional information can be found [here](https://developers.google.com/analytics/devguides/collection/ios/v3/screens).

		var viewName = 'analytics-view';
		window.plugins.googleAnalytics.sendView(viewName);
###Additional Metrics
####Custom Dimensions
Custom dimensions allow you to associate additional metadata with hits. For example, you could track whether or not your app was being used offline. You could also track whether or not a user was a 'premium' user or whether they had were logged in while performing certain tasks. This function should be called with your dimension prior to the view, event, social and transaction tracking call you would like it associated with.

Custom dimensions are configured within the Admin panel of the Google Analytics property you are tracking against.

Plese read the [dimension and metric](https://developers.google.com/analytics/devguides/collection/ios/v3/customdimsmets) page for additional information.

		var index = 1,
			name = 'offline';
			
		window.plugins.googleAnalytics.setCustomDimension(index, name);
####Custom Metrics
Custom metrics allow you to create and increment your own metrics. This function should be called with your metric value prior to the view, event, social and transaction tracking call you would like it associated with.

Custom metrics are configured within the Admin panel of the Google Analytics property you are tracking against.

Plese read the [dimension and metric](https://developers.google.com/analytics/devguides/collection/ios/v3/customdimsmets) page for additional information.
	
		var index = 1,
			value = 5;
			
		window.plugins.googleAnalytics.setCustomMetric(index, value);
##Example App
The example app demonstrates how to use the bulk of the Plugin API. It was built using Backbone.js and two files - `analyticsView.js` and `common.js` - provide the bulk of the examples.

###analyticsView.js
This is the only view in the appl and handles the various UI interaction. There is a tap handler for each button in the UI that provides an example of how to prepare data for the Plugin. As mentioned above, the `sendTransactionTapped` function is important because the transaction variable must be created with that exact structure. You could obviously do this several different ways in your own app but the underlying structure ultimately passed to the plugin must match this.

###common.js
This file adds helper functions to for interacting with the Plugin. These methods are wrapped in a check to ensure the plugin has been created. While there is not a helper function for all of the API, it's close and provides an example of how you could do it in your project.

##Contributing
Contributions are much appreciated. Please send a pull request and I'll review it as quickly as I can.

If you come across any glaring issues please use [GitHub](https://github.com/nathanhjones/google-analytics-v3-ios-cordova-plugin/issues). Provide as much detail as possible including the version of Cordova and iOS that you are using.

##License
The MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.