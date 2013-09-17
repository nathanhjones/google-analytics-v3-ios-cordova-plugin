//
//  GoogleAnalyticsPlugin.m
//  GA3Example
//
//  Created by Nathan Jones on 9/13/13.
//
//

#import "GoogleAnalyticsPlugin.h"
#import "GAI.h"
#import "GAIFields.h"
#import "GAIDictionaryBuilder.h"

@implementation GoogleAnalyticsPlugin

#pragma mark - General Setup

- (void)startTracking:(CDVInvokedUrlCommand*)command {
    NSString *accountId = [command.arguments objectAtIndex:0];
    [[GAI sharedInstance] trackerWithTrackingId:accountId];
}

- (void)startSession:(CDVInvokedUrlCommand*)command {
    [[GAI sharedInstance].defaultTracker set:kGAISessionControl
                                       value:@"start"];
}

- (void)endSession:(CDVInvokedUrlCommand*)command {
    [[GAI sharedInstance].defaultTracker set:kGAISessionControl
                                       value:@"end"];
}

- (void)anonymizeTracking:(CDVInvokedUrlCommand *)command {
    [[GAI sharedInstance].defaultTracker set:kGAIAnonymizeIp
                                       value:[@YES stringValue]];
}

- (void)setDispatchInterval:(CDVInvokedUrlCommand*)command {
    NSTimeInterval dispatchInterval = [[command.arguments objectAtIndex:0] doubleValue];
    [GAI sharedInstance].dispatchInterval = dispatchInterval;
}

- (void)dispatchTrackedQueue:(CDVInvokedUrlCommand*)command {
    [[GAI sharedInstance] dispatch];
}

#pragma mark - Tracking

- (void)setParameter:(CDVInvokedUrlCommand*)command {
    NSDictionary *options = [command.arguments objectAtIndex:0];
	NSString *key = [options valueForKey:@"key"];
    NSString *value = [options valueForKey:@"value"];
    
    [[GAI sharedInstance].defaultTracker set:key
                                       value:value];
}

- (void)sendEvent:(CDVInvokedUrlCommand *)command {
    NSDictionary *options = [command.arguments objectAtIndex:0];
	NSString *view = (![[options valueForKey:@"view"] isEqual:[NSNull null]]) ? [options valueForKey:@"view"] : nil;
    NSString *category = [options valueForKey:@"category"];
	NSString *action = [options valueForKey:@"action"];
	NSString *label = (![[options valueForKey:@"label"] isEqual:[NSNull null]]) ? [options valueForKey:@"label"] : nil;
	NSNumber *value = (![[options valueForKey:@"value"] isEqual:[NSNull null]]) ? @([[options valueForKey:@"value"] intValue]) : nil;
    
    [GoogleAnalyticsPlugin setVersionParameter];
    
    // associate this event with a specific view if passed
    if (view) {
        [[GAI sharedInstance].defaultTracker set:kGAIScreenName
                                           value:view];
    }
    
    [[GAI sharedInstance].defaultTracker send:[[GAIDictionaryBuilder createEventWithCategory:category
                                                                                     action:action
                                                                                      label:label
                                                                                      value:value] build]];
    
    // clear any view property set
    [[GAI sharedInstance].defaultTracker set:kGAIScreenName
                                       value:nil];
}

- (void)sendException:(CDVInvokedUrlCommand *)command {
    NSDictionary *options = [command.arguments objectAtIndex:0];
    BOOL fatalException = [[options valueForKey:@"fatal"] boolValue];
    NSString *description = [options valueForKey:@"description"];
    
    [GoogleAnalyticsPlugin setVersionParameter];
    
    [[GAI sharedInstance].defaultTracker send:[[GAIDictionaryBuilder createExceptionWithDescription:description
                                                                                          withFatal:@(fatalException)] build] ];
}

- (void)sendSocial:(CDVInvokedUrlCommand *)command {
    NSDictionary *options = [command.arguments objectAtIndex:0];
	NSString *network = [options valueForKey:@"network"];
	NSString *action = [options valueForKey:@"action"];
    NSString *target = [options valueForKey:@"target"];
    
    [GoogleAnalyticsPlugin setVersionParameter];
    
    [[GAI sharedInstance].defaultTracker send:[[GAIDictionaryBuilder createSocialWithNetwork:network
                                                                                      action:action
                                                                                      target:target] build]];
}

- (void)sendTiming:(CDVInvokedUrlCommand *)command {
    NSDictionary *options = [command.arguments objectAtIndex:0];
	NSString *category = [options valueForKey:@"category"];
	NSNumber *milliseconds = @([[options valueForKey:@"time"] intValue]);
    NSString *name = [options valueForKey:@"name"];
    NSString *label = [options valueForKey:@"label"];
    
    [GoogleAnalyticsPlugin setVersionParameter];
    
    [[GAI sharedInstance].defaultTracker send:[[GAIDictionaryBuilder createTimingWithCategory:category
                                                                                     interval:milliseconds
                                                                                         name:name
                                                                                        label:label] build]];
}

- (void)sendTransaction:(CDVInvokedUrlCommand *)command {
    NSDictionary *options = [command.arguments objectAtIndex:0];
    NSString *transactionId = [options valueForKey:@"transactionId"];
    NSString *affiliation = [options valueForKey:@"affiliation"];
    NSNumber *revenue = @([[options valueForKey:@"revenue"] floatValue]);
    NSNumber *tax = @([[options valueForKey:@"tax"] floatValue]);
    NSNumber *shipping = @([[options valueForKey:@"shipping"] floatValue]);
    NSString *currency = [options valueForKey:@"currency"];
    
    id tracker = [GAI sharedInstance].defaultTracker;
    
    [GoogleAnalyticsPlugin setVersionParameter];
    
    // create the transaction
    [tracker send:[[GAIDictionaryBuilder createTransactionWithId:transactionId
                                                     affiliation:affiliation
                                                         revenue:revenue
                                                             tax:tax
                                                        shipping:shipping
                                                    currencyCode:currency] build]];
    
    // add the items
    for (NSDictionary *item in [options objectForKey:@"items"]) {
        NSString *name = [item valueForKey:@"productName"];
        NSString *sku = [item valueForKey:@"productSKU"];
        NSString *category = [item valueForKey:@"productCategory"];
        NSNumber *price = @([[item valueForKey:@"price"] floatValue]);
        NSNumber *quantity = @([[item valueForKey:@"quantity"] intValue]);
        NSString *itemCurrency = [item valueForKey:@"currency"];
        
        [tracker send:[[GAIDictionaryBuilder createItemWithTransactionId:transactionId
                                                                    name:name
                                                                     sku:sku
                                                                category:category
                                                                   price:price
                                                                quantity:quantity
                                                            currencyCode:itemCurrency] build]];
    }
}

- (void)sendView:(CDVInvokedUrlCommand*)command {
    NSString *viewName = [command.arguments objectAtIndex:0];
    
    [GoogleAnalyticsPlugin setVersionParameter];
    
    [[GAI sharedInstance].defaultTracker send:[[[GAIDictionaryBuilder createAppView] set:viewName
                                                                                  forKey:kGAIScreenName] build]];
}

#pragma mark - Additional Metrics

- (void)setCustomDimension:(CDVInvokedUrlCommand *)command {
    NSDictionary *options = [command.arguments objectAtIndex:0];
    NSInteger dimensionIndex = [[options valueForKey:@"index"] intValue];
    NSString *dimension = [options valueForKey:@"dimension"];

    [[GAI sharedInstance].defaultTracker set:[GAIFields customDimensionForIndex:dimensionIndex]
                                       value:dimension];
}

- (void)setCustomMetric:(CDVInvokedUrlCommand *)command {
    NSDictionary *options = [command.arguments objectAtIndex:0];
    NSInteger metricIndex = [[options valueForKey:@"index"] intValue];
    NSString *metric = (![[options valueForKey:@"metric"] isEqual:[NSNull null]]) ? [[options valueForKey:@"metric"] stringValue] : nil;
    
    [[GAI sharedInstance].defaultTracker set:[GAIFields customMetricForIndex:metricIndex]
                                       value:metric];
}

/*
 *  Helper method to set the app's version number parameter for the next call to send:
 */
+ (void)setVersionParameter {
    id tracker = [GAI sharedInstance].defaultTracker;
    NSString *currentVersion = [[NSBundle mainBundle] objectForInfoDictionaryKey: @"CFBundleShortVersionString"];
    [tracker set:kGAIAppVersion
           value:currentVersion];
}

@end
