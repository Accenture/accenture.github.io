---
layout: post
title:  "Apache Cordova–-Leading Practices and Learnings"
categories: mobility
author: 
    - badrinath_bahadur
    - chandrasekaran_thillaiganesh
    - dharmendra_g_sharma
date: '2016-05-31 00:00'
comments: true
---

# Mobility--Using a cross-platform hybrid applications strategy 

Mobility solutions are at the forefront of the digital transformation journey for enterprises. Many have been looking specifically at “mobile-first” or “mobile-only” strategies for superior customer engagement and experience management. 

However, as enterprises delve into mobility solutions, one of the biggest challenges they face is device diversity and volatility. There are four major device operating systems (OS) covering more than 90 percent of devices available today and each OS has multiple versions with regular upgrades being pushed. In such a scenario, it is difficult to choose an appropriate application development and porting strategy.

Most of the device OS providers support a set of native software development kits (SDKs), which is the recommended way of developing applications to get the best user experience. However, in business-to-consumer, multi-platform application scenarios, cost and time-to-market are primary considerations. It is not always possible to develop and support an application using native SDKs for each device OS/platform. As a result, enterprises are beginning to adopt a cross-platform hybrid applications strategy, using web technologies to build the application user interface and off-the-shelf containers built on native device SDKs to deploy on devices.  Apache Cordova is one such hybrid application container.

At Accenture, we are committed to open source contribution. Apache Cordova is one of our focus areas within Accenture Digital. In the past few quarters, we have been actively involved in the overall development of the Cordova framework by participating in both code as well as documentation fixes. (For example, see [CB-9753], [CB-8765], [CB-10822],[CB-10637]). 

This blog highlights the Apache Cordova framework and focuses on leading practices and learnings that would be of help to other developers. This blog intentionally excludes some of the best practices already listed in Apache Cordova [website].

## What is Apache Cordova?

Apache Cordova, also popularly known as PhoneGap, is a free and open source cross-platform mobile application framework. The framework allows developers to build applications using standard web technologies such as HTML5, CSS and JavaScript. At the same time, it provides JavaScript based APIs that developers can invoke to access device specific APIs such as file system, contacts, media, camera, etc. 

Developers can make use of the Cordova framework in the following cases:

* Build a mobile application once and deploy on multiple device platforms to avoid the nuances of individual device SDKs.
* Use existing web/mobile web application to be packaged and deployed to the application stores.
* Mix native application components with a WebView (special browser window) that can access device-level APIs, or develop a plugin interface between native and WebView components.

The framework has become a de-facto standard for building cross-platform mobile applications. Many COTS mobility platforms and middleware solutions also make use of Cordova as the underlying framework and have built abstractions and additional features using the core Cordova libraries.

The framework supports the following device platforms:

1.	Android
2.	iOS
3.	Windows (8.0, 8.1, 10, Phone 8.1)
4.	WP8 (Windows Phone 8)
5.	Amazon Fire OS	
6.	Blackberry10	
7.	Firefox OS
8.	Ubuntu

## How does it work?
Apache Cordova is based on the webview mechanism supported by most of the popular device platforms. Cordova provides a native shell with a webview in which the developer provided web screens are loaded. Most of the Cordova applications are based on the user interface that are single page web applications and the dynamic aspects of the application is handled by appropriate Javascript frameworks along with CSS based styles/themes. Once the application launches, based on the configuration details provided to Cordova, it loads the start-up HTML5 page in the webview and then further interactions are handled within a single webview. 

As user interacts with the application UI, additional content can be loaded from the local device or pulled from the network. In addition to the ability to load a web application, Cordova also exposes multiple device specific events for the application developer that can be implemented to enhance the user experience (such as Application moving to background/foreground). The application developers can also invoke Cordova JavaScript APIs for any native APIs that are exposed by the Cordova core libraries and plug-ins. This enables developers use most of the features that are available to a purely native SDK based application. In case where a specific device feature is not available as a Cordova plugin, the framework also allows developers implement their custom plugins. Cordova has a central [repository] for developers to look for all the available plugins (including the community developed plugins).   

The diagram below depicts the working mechanism.

![Alt text](/img/posts/cordova-best-practices/cordovaarch.jpg)

## Benefits to mobile application developers

1.	Build app once and deploy it to multiple platforms with minimal effort: Cordova-based applications are developed using web technologies. This allows the code to be compatible with all supported device browser runtimes. Developers still have to do platform specific porting/adjustments to address device specific issues, but the efforts are comparatively less than building an application from scratch using device-specific native SDKs.    
2.	Fix bugs and add new features in a single codebase instead of "N" codebases: As the code is common across the device platforms, defect fix cycles are faster. However, developers need to ensure that unit testing is thoroughly carried out across supported devices to ensure code stability across all the platforms.
3.	Single JavaScript APIs providing cross-platform access to native device APIs: Cordova JavaScript APIs hide device-specific intricacies from the developer. Developers have a single API definition to study and implement, and at the same time any device-specific adaptation is taken by the native Cordova device libraries and plug-ins. This also ensures that if there are any issues due to a new device OS launch, it can be appropriately addressed by the Cordova libraries with minimal impact to the application code. 
4.	Provides flexibility to choose UI framework: This is one of the primary reasons for strong adoption of the framework by the developer community. The Cordova framework does not enforce usage of any specific web technology. As long as the web framework is compatible with the device browser runtime, it can be used with Cordova. Such an approach allows a very large pool of existing web developers with disparate skills to start building mobile applications.
5.	UI frameworks such as Ionic enable almost native UI experience: One of the drawbacks of using typical web technologies for a Cordova-based application is the lack of native application experience that end consumers are used to. This sometimes leads to a lower application adoption and usability index. However, recently there have been JavaScript UI frameworks introduced to the developers that use advanced hardware acceleration techniques on top of the existing web technologies to provide a native-like application experience.

Leading practices and learnings on Apache Cordova framework: 

* ####	Look for device-specific quirks 
   
    Cordova attempts to standardize the APIs and the behavior as much as possible; however, due to device-specific limitations/implementation, there could be device-specific issues for the APIs. It is important to read the Cordova API specifications and watch for any documented device-specific quirks. Developers need to handle these and provide an alternate approach wherever required.

    For example, take the case of an app having a requirement to provide any user interactions once a user moves the application from background to foreground. In this instance, the user can make use of the “resume” event fired by the Cordova events API. The resume event fires when the native platform pulls out the application from the background. Developers can implement any user interaction code in the “resume” event. However, there is an iOS-specific quirk for this and developers need to be aware and handle it as per the documentation – *“When called from a resume event handler, interactive functions such as alert() need to be wrapped in a setTimeout() call with a timeouts value of zero, or else the __app hangs__.”*

* ####	Use “InAppBrowser” plug-in to launch external web URLs for better user experience

    There are several cases in which an application needs to load external/untrusted web URLs within the application. One option to achieve this is to open up the URL in a separate native browser instance. This approach takes the user outside the control of the parent application and requires the user to carry out specific steps to come back to the parent application. Such an approach impacts the application usability. 
    
    In such cases, developers could use the “InAppBrowser” plug-in. The InAppBrowser window behaves like a standard web browser in that it cannot access Cordova APIs. For this reason, the InAppBrowser is recommended in order to load third-party (untrusted) content, instead of loading that into the main Cordova WebView. The InAppBrowser provides default GUI controls for the user (such as back, forward, done). The user has the ability to tap the “Done” button and control is handed over to the parent Cordova application. The plug-in also provides various API options for developers to configure the browser window behavior (e.g., "clearcache" to have the browser's cookie cache cleared before the new window is opened; "hardwareback" to use the hardware back button to navigate backwards through the InAppBrowser's history).

* ####	Do a thorough evaluation of offline storage options

    HTML5 standards support multiple offline data storage options such as local storage, session storage and WebSQL/IndexDB. Local storage and session storage are suitable for small and transient data storage options. However, storage options that require more advanced SQL interactions tend to use the WebSQL specification. WebSQL is a method for storing data client-side and allows Sqlite database queries for access and manipulation. Developers that need WebSQL have two options for implementing this: either use the browser WebSQL capability or use one of the Cordova’s third-party SQLite plug-ins. Developers need to appropriately decide the storage API that they want to use, keeping in mind the number of device platforms to be supported. For example, if Windows Phone 8.x needs to be supported, WebSQL is not compatible with IE 8-11 browsers and, in such cases, developers will have to selectively choose either the IndexDB or HTML5 local storage option in Windows.

* ####	Watch for existing plug-ins in the marketplace

    Since Cordova is an open source project, there is a large pool of community members contributing to the plug-ins marketplace. As of this blog posting, there were 954 Cordova plug-ins available in the npm registry. Most of the plug-ins have a safe MIT/Apache 2.0 usage licensing terms, which allow developers to use within their applications. (It is recommended to check with enterprise legal team for client-specific engagements and contractual clauses.)

* ####	Be cautious of the default options in any plug-in API

    Developers should always look at the default configurations of any Cordova APIs and analyze the need to change it to application-specific settings to avoid hassles during testing or deployment. For example, when using the FileSystem and FileTransfer APIs to download any content from the server, the default option that developers use is the PERSISTENT storage. In case of an iOS device, this storage location defaults to the “Documents” directory. As per iOS standards, any content that is stored in the application’s “Documents” directory is marked for iCloud backup. If the content being downloaded from server is a large file size and is not user-generated content (i.e., application can regenerate the content), then these files do not need to be stored in the cloud. Such applications might also fail the iOS Data storage guidelines and could face rejection for app store deployment.

* ####	Choose an appropriate UI framework, taking into account all the device platforms and OS versions to be supported

    There are multiple HTML5/JavaScript frameworks available in the market that have different types of licensing models. It is very critical that developers consider the pros and cons of each framework before shortlisting a framework. Following are some of the  key items that should be considered:
    
    * Choose a framework that enforces structure to code: JavaScript codes sometimes tend to get messy if appropriate attention is not given. As a leading practice, choose a framework that has well defined application structure and enforces MVC/MV* patterns. A few examples are AngularJS and Sencha.
    * Avoid frameworks that have desktop as their primary focus. Such frameworks tend to give a website experience for the application and should be avoided. Many mobile-first frameworks (like Ionic or Sencha) are available that focus on optimized UI experience for small-screen devices. 
    * Avoid frameworks using JavaScript-based animation: Choose frameworks that use CSS3 animations supported by hardware accelerations. However, be careful since such frameworks tend to add overheads for low-end devices that do not have hardware accelerations (e.g. Android 2.x, Blackberry 6/7)
    * Use Vanilla HTML5/CSS3 and basis JavaScript where there is a very wide range of traditional (e.g., Android 2.x, Blackberry 6/7) and high-end devices to be supported using one code set.
    * Since SPA-based frameworks are the recommendation from Cordova, it is recommended to use a framework having a small memory footprint.

* ####	Additional useful learnings
    * When a new plug-in is added to the existing project, the index.html and index.js are overwritten with default code line. Be sure to back-up needed code before adding a plug-in to a project midway.
    * Always write a separate test application for each (or group of) plug-in(s). Then invoke the fundamental API and get familiar with the class diagram of that plug-in, before analyzing any particular issue.
    * File and File Transfer plug-in: Always include both plug-ins, when working with file, as they are both interlinked.
    * The camera plug-in works only on a physical device. But ensure the app does not crash when loading in a simulator. Handle the error and display appropriate message. This will be useful when an app is loaded into an older iPod, which does not have camera.

### References
* Apache Cordova [website][basewebsite]

[website]: <https://cordova.apache.org/docs/en/6.x/guide/next/index.html>
[basewebsite]: <https://cordova.apache.org/>
[CB-9753]:https://github.com/apache/cordova-plugin-file/pull/164
[CB-8765]:https://issues.apache.org/jira/browse/CB-8765
[CB-10822]:https://github.com/apache/cordova-plugin-media/pull/87
[CB-10637]:https://github.com/Accenture/cordova-docs/pull/1
[repository]:https://cordova.apache.org/plugins/