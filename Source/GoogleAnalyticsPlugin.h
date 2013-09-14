//
//  GoogleAnalyticsPlugin.h
//  GA3Example
//
//  Created by Nathan Jones on 9/13/13.
//  MIT Licensed
//

#import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>
#import <Cordova/CDVPluginResult.h>

@interface GoogleAnalyticsPlugin : CDVPlugin

#pragma mark - General Setup

- (void)startTracking:(CDVInvokedUrlCommand*)command;

- (void)startSession:(CDVInvokedUrlCommand*)command;

- (void)endSession:(CDVInvokedUrlCommand*)command;

- (void)anonymizeTracking:(CDVInvokedUrlCommand*)command;

- (void)setDispatchInterval:(CDVInvokedUrlCommand*)command;

- (void)dispatchTrackedQueue:(CDVInvokedUrlCommand*)command;

#pragma mark - Tracking

- (void)setParameter:(CDVInvokedUrlCommand*)command;

- (void)sendEvent:(CDVInvokedUrlCommand*)command;

- (void)sendException:(CDVInvokedUrlCommand*)command;

- (void)sendSocial:(CDVInvokedUrlCommand*)command;

- (void)sendTiming:(CDVInvokedUrlCommand*)command;

- (void)sendTransaction:(CDVInvokedUrlCommand*)command;

- (void)sendView:(CDVInvokedUrlCommand*)command;

#pragma mark - Additional Metrics

- (void)setCustomDimension:(CDVInvokedUrlCommand*)command;

- (void)setCustomMetric:(CDVInvokedUrlCommand*)command;

@end

