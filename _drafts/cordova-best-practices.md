---
layout: post
title:  "Apache Cordova – Best practices and Learnings"
categories: mobility
author: badrinath_bahadur
comments: true
---

# Mobility – They way to go !!

Mobility solutions have been in the forefront of digital transformation journey for the enterprises. Enterprises have been looking specifically at “Mobile-first” or “Mobile-only” strategy for superior customer engagement and experience management. Being the primary channel of customer interaction, mobile applications play a very integral role in this overall strategy.  

However as enterprises delve further for a sustainable mobile strategy, one of the biggest challenge they face in the mobile applications space is the device diversity and volatility. There are 3 or 4 major device operating systems covering over 90% devices market share available today and each OS has multiple versions with regular upgrades being pushed. In such a volatile scenario, one of the biggest challenge for the enterprises is to choose an appropriate application development and porting strategy.

Most of the device OS providers support a set of native SDKs which is the recommended way of developing applications to get the best user experience. However, in B2C multi-platform application scenarios, cost and time-to-market is a primary consideration. Keeping this in consideration, it is not always possible to develop/support application using native SDKs for each device OS/platform. Hence, wherever feasible, enterprises are beginning to adopt cross-platform Hybrid applications strategy, wherein the application UI is built using web technologies and deployed on devices using off-the shelf containers built over native device SDKs.  Apache Cordova is one such hybrid application container.

In this blog, I intend to briefly explain the Apache Cordova framework and focus more on the best practices and learnings that would be of help to other developers. This blog intentionally excludes some of the best practices already listed in Apache Cordova [website].
Accenture is committed to active open source contribution and has been actively contributing to the Apache Cordova community by taking up defect fixes (For example CB-9753, CB-8765, CB-10822)

## What is Apache Cordova?

Apache Cordova, also popularly known as PhoneGap is a free and open-source cross-platform mobile application framework. The framework allows developers build the applications using standard web technologies such as HTML5, CSS and Javascript and at the same time provides Javascript based APIs which developers can invoke to access device specific APIs such as File system , contacts, media, camera etc. 

The framework was originally created by Nitobi. Adobe Systems purchased Nitobi in 2011, rebranded it as PhoneGap, and later released an open source version of the software called Apache Cordova. Phonegap also has an enterprise version from Adobe with added features such as app management and integration capabilities.

Developers can make use of the Cordova framework in the following cases:

* Build a mobile application once and deploy on multiple device platforms avoiding the nuances of the individual device SDKs
* Use existing web/mobile web application to be packaged and deployed to the application stores
* A mobile developer interested in mixing native application components with a WebView (special browser window) that can access device-level APIs, or if you want to develop a plugin interface between native and WebView components.

The framework has almost become a de-facto standard for building cross-platform mobile applications. Many COTS mobility platforms and middleware solutions also make use of Cordova as the underlying framework and have built abstractions and additional features using the core Cordova libraries.
The framework supports following device platforms:

1.	Android
2.	iOS
3.	Windows (8.0, 8.1, 10, Phone 8.1)
4.	WP8 (Windows Phone 8)
5.	Amazon-fireos	
6.	Blackberry10	
7.	Firefox OS
8.	Ubuntu

## How does it work?
Apache Cordova uses the webviews mechanism supported by most of the current device platforms. Cordova core libraries provide a native webview shell wherein the web applications can be loaded. Within the native Cordova application, the application’s user interface consists of a single screen that contains a single web view that consumes the available screen space on the device. When the application launches, it loads the web application’s start-up HTML5 page into the web view, then passes control to the web view to allow the user to interact with the web application. As the user interacts with the application’s content (the web application), links or JavaScript code within the application can load other content from within the resource files packaged with the application or can reach out to the network and pull content down from a web or application server. Most of the UI and user interaction is handled by the HTML5/CSS page (typically called the Single Page applications) supported by Javascript for business logic. The Javascript can also invoke Cordova JS APIs for any native APIs that are exposed by the Cordova core libraries and plugins.   

Diagram below pictorially depicts the working mechanism.

![Alt text](/img/posts/cordova-best-practices/cordovaarch.jpg)

## Benefits to mobile application developer

1.	Build app once and deploy it to multiple platforms with minimal effort: Cordova based applications are developed using web technologies. This allows the code to be compatible with all supported device browser runtimes. Developers still have to do platform specific porting/adjustments to address device specific issues, but the efforts are comparatively less than building application from scratch using device specific native SDKs.    
2.	Fix bugs and add new features in a single codebase instead of "N" codebases: As the code is common across the device platforms, defect fix cycles are faster. However, developers need to ensure that unit testing is thoroughly carried out across supported devices to ensure code stability across all the platforms.
3.	Single Javascript APIs providing cross platform access to native device APIs: Cordova javascript APIs hides device specific intricacies from the developer. Developers have a single API definition to study and implement, and at the same time any device specific adaptation is taken by the native cordova device libraries and plugins. This also ensures that if there are any issues due to a new device OS launch, it can be appropriately addressed by the Cordova libraries with minimal impact to the application code. 
4.	Provides flexibility to choose UI framework: This is one of the primary reasons for strong adoption of the framework by the developer community. Cordova framework doesn’t enforce usage of any specific web technology. As long as the web framework is compatible with the device browser runtime, it can be used with Cordova. Such an approach allows a very large pool of existing web developers with disparate skills start building mobile applications.
5.	UI frameworks such as Ionic enable almost native UI experience: One of the drawbacks of using typical web technologies for Cordova based application is the lack of native application experience that end consumers are used to. This sometimes leads to lower application adoption and usability index. However, recently there have been Javascript UI frameworks introduced to the developers that use advanced hardware acceleration techniques on top of the existing web technologies to provide native like application experience.

Let us now look at some of the key best practices and learnings on Apache Cordova framework: 

* ####	Always remember there is going to be device specific quirks 
   
    Cordova attempts to standardize the APIs and the behavior as much as possible, however due to         device specific limitations/implementation there could be device specific quirks for the APIs. As a    developers it is very important to read the Cordova API specifications and watch for any documented    device specific quirks. Developers need to handle these and provide an alternate approach wherever     required.

    Let us look at an example - App has a requirement to provide any user interactions once user moves the application from background to foreground. In such a case, user can make use of the “resume” event fired by the cordova events API. The resume event fires when the native platform pulls out the application from background. Developers can implement any user interaction code in the “resume” event. However, there is an iOS specific quirk for this and developers need to be aware and handle it as per the documentation – *“When called from a resume event handler, interactive functions such as alert() need to be wrapped in a setTimeout() call with a timeouts value of zero, or else the __app hangs__.”*

* ####	Use “InAppBrowser” plugin to launch external web URLs for better user experience
    There are several cases in which application needs to load external/untrusted web URLs within the application. One option to achieve this is open up the URL in a separate native browser instance. This approach takes the user outside the control of the parent application and user has to carry out specific steps to come back to the parent application. Such an approach impact the application usability. In such cases, as a best practice, developers could use the “InAppBrowser” plugin.  The InAppBrowser window behaves like a standard web browser, and can't access Cordova APIs. For this reason, the InAppBrowser is recommended if you need to load third-party (untrusted) content, instead of loading that into the main Cordova webview. The InAppBrowser provides default GUI controls for the user (such as back, forward, done). User has the ability to tap “Done” button and control is handed over to the parent Cordova application. The plugin also provides various API options for developers to configure the browser window behavior (E.g. "clearcache" - To have the browser's cookie cache cleared before the new window is opened. "hardwareback": To use the hardware back button to navigate backwards through the InAppBrowser's history).

* ####	Do a thorough evaluation of Offline storage options
    HTML5 standards supports multiple offline data storage option such as local storage, session storage and WebSQL/IndexDB. Local storage and session storage are suitable for small and transient data storage options. However, storage options that require more advanced SQL interactions tend to use the WebSQL specification. WebSQL is a method for storing data client-side and allows Sqlite database queries for access and manipulation. Developers that need WebSQL, have 2 options of implementing this – either use the browser WebSQL capability or use one of the Cordova’s 3rd party SQLite plugins. Developers need to appropriately decide the storage API that they want to use keeping in mind the number of device platforms to be supported. For e.g. if Windows Phone 8.x needs to be supported, WebSQL is not compatible with IE 8-11 browsers and in such cases, developers will have to selectively choose either IndexDB or HTML5 local storage option in Windows.

* ####	Lookout for existing plugins in the marketplace
    Cordova being an open source project, there is a large pool of community contributing to the plugins marketplace. As of date there are about 954 Cordova plugins available in the npm registry. Most of the plugins have a safe MIT/Apache 2.0 usage licensing terms which allow developers use within their application (Please check with enterprise legal team for client specific engagements and contractual clauses).

* ####	Be cautious of the default options in any plugin API
    Developers should always look at the default configurations of any cordova APIs and analyze the need to change it to application specific settings to avoid hassles during testing or deployment. 
    For e.g. when using the FileSystem and FileTransfer APIs to download any content from server, the default option that developers use is the PERSISTENT storage. In case of iOS device, this storage location defaults to the “Documents” directory. As per iOS standards, any content that is stored in application’s “Documents” directory is marked for iCloud backup. If the content being downloaded from server is of large file size and is not user generated content (i.e. application can regenerate the content) then these files need not get stored in the cloud. Such applications might also fail the iOS Data storage guidelines and could face rejection for app store deployment.

* ####	Choose an appropriate UI framework taking into account all the device platforms and OS versions to be supported
    There are multiple HTML5/Javascript frameworks available in the market having different types of licensing models. It is very critical that developers consider pros and cons of each framework before shortlisting a framework. Following are some of the  key items that should be considered:
    * Choose a framework that enforces structure to your code: Javascript codes sometimes tend to get dirty if appropriate attention is not given. As a best practice, choose a framework that has well defined application structure and enforces MVC/MV* patterns. Few examples are AngularJS, Sencha etc.
    * Avoid frameworks that have desktop as their primary focus. Such frameworks tend to give a website experience for your application and should be avoided. Many mobile first frameworks (like Ionic, Sencha etc.) are available that focus on optimized UI experience for small-screen devices. 
    * Avoid frameworks using JS based animation: Choose frameworks that use CSS3 animations supported by hardware accelerations. However, be careful that such frameworks tend add overheads for low end devices that do not have hardware accelerations (e.g. Android 2.x, Blackberry 6/7 etc.)
    * Use Vanilla HTML5/CSS3 and basis Javascript where there is a very wide range of traditional (E.g. Android 2.x, Blackberry 6/7) and high end devices to be supported using one code set.
    * Since SPA based frameworks is the recommendation from Cordova, It is recommended to use a framework having a small memory footprint.

* ####	Few trivial but useful learnings
    * When a new Plug-in is added to the existing Project, the index.html and index.js are overwritten with default code line. So take back-up of needed code before adding a plug-in to a project midway.
    * Always write a separate test application for each (or group) of plug-in. Then invoke the fundamental API and get familiar with the class diagram of that Plug-in, before analyzing any particular issue.
    * File and File Transfer Plugin: Always include both the plug-in, when working with file. As they are both inter linked
    * Camera Plug-in works only on a physical device. But ensure the app does not crash when loading in a simulator. Handle the error and display appropriate message. This will be useful when an app is loaded into a older iPod, which does not have camera.

### References
* Apache Cordova [website][basewebsite]

### Content contribution/credits
* Thillaiganesh C
* Dharmendra Sharma G

[website]: <https://cordova.apache.org/docs/en/6.x/guide/next/index.html>
[basewebsite]: <https://cordova.apache.org/>