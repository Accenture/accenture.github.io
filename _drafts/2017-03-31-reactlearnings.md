---
layout: post
title:  "React-Native–-Leading Practices and Learnings"
categories: mobility
author: 
    - badrinath_bahadur
    - v_poolothvalappil
    - anuradha_k_pradhan
date: '2017-03-31 00:00'
comments: true
---

# Mobility—The need for a cross-platform app development framework
For the past few years, enterprises have taken a “ready, fire, aim” approach to deploying “mobile-first” or “mobile-only” strategies for amplified productivity, superior communication and better efficiency.

However, as enterprises dig into mobility solutions, challenges can arise, including security, real-time access to data, device diversity and volatility. Multiple device operating systems available in the market, coupled with frequent upgrades for the systems, make it tough to choose the right framework for application development.

When building an app in a native framework, it is often best to use third-party software development kits (SDKs) or libraries, which is the recommended way to develop applications. Most of the time, these libraries are available only in their native version...although a few are written in JavaScript. But it gets increasingly difficult and costly to develop and sustain the applications using the native SDKs for every device operating system/platform. As a result, enterprises are starting to adopt a cross-platform hybrid applications strategy. 

At Accenture, we are committed to open source contribution. React-Native is an exciting framework that enables web developers to create robust mobile applications using their existing JavaScript knowledge. It offers faster mobile development and more efficient code sharing across iOS, Android and the web, without sacrificing the end user’s experience or application quality. The tradeoff is that it’s new, and still a work-in-progress framework. If your team can handle the uncertainty that comes with working with a new technology, and wants to develop mobile applications for more than just one platform, take a look at React-Native.

## What is React-Native?
React-Native is the next generation of React--a JavaScript code library developed by Facebook and Instagram, which was released on GitHub in 2013. It helps in building a real mobile app that is indistinguishable from an app built using Objective-C or Java. React-Native makes use of the same fundamental user interface (UI) building blocks as regular iOS and Android apps.

React-Native applications consist of both JavaScript and native code (either Java or Objective-C). The JavaScript runs in a virtual machine on the mobile device and communicates with the native code through a JSON message passing interface.

At present, this framework supports the following device platforms:
- Android
- iOS

Facebook also made React-Native into an open source option, with the idea that compatibility with other platforms like Windows or tvOS could be worked on by the development community.

## How does it work?
Unlike other cross-platform SDKs such as Cordova or Ionic that basically run JavaScript-powered apps in a web browser, React-Native compiles to native code for the respective operating system, Android or iOS. This means there is no performance compromise and the apps built with React-Native run just as smoothly as apps built using the actual native tools like Xcode.

![Architecture](/img/posts/reactlearnings/arch.png)

React-Native works by embedding the JavaScript files in the app and running them locally. However, a company could also store these files remotely on a server, enabling React-Native to fetch the latest version when the app has connectivity. This would make it faster to update the application, without having to go through the app store’s review process. Some third-party services offer similar solutions. Using them for smaller applications that do not have a lot of data to display (e.g., a festival app) might not require a backend.

## Benefits of React-Native: 
1. Offers third-party plugin compatibility, less memory usage and a smoother experience

    Third-party plugins mean there is little dependence on a web view for certain functions. For example, if aws-api-gateway-client functionality is added to the app, React-Native links the plugin with a native module, so linking to the server, while using less memory and loading faster. If the app supports older operating systems (and older devices), this can help keep the app running smoothly.
2. Native app development is much more efficient

    React-Native brings the speed and agility of web app development to the hybrid space--with native results. Under React-Native’s hood is Facebook’s popular ReactJS UI library for web applications. React-Native brings all of ReactJS’s better app performance, DOM abstraction and simplified programming methods to hybrid mobile development.
3. Apply React-Native UI components to an existing app’s code without any rewriting

    Code reusability is much easier in React-Native. For example, if there is an existing hybrid app built in Cordova, the Cordova code can be reused easily with plugins.
4. React-Native can deal with both ecosystems

    Developing native apps for Android and iOS can be tedious because they are two entirely different ecosystems. Android apps require knowledge of Java and Android SDK. It is important to understand the latest features of the two major ecosystems to effectively use React-Native.
5. React-Native is UI-focused

    React-Native has a highly responsive interface, similar to AngularJS and MeteroJS. The JavaScript interactions between the native environment and React-Native reduce load times and gives a smoother feel to the app.
6. Native SDKs update

    When the iOS or Android SDKs are updated, it takes some time for React-Native to integrate these newly introduced application programming interfaces (APIs) into the core library. 

## Risks and drawbacks
Determining whether React-Native is a good choice for a project depends on the context. The usual limitations and hurdles that might be faced when working with any emerging technology apply because the framework is new. A few things to note: 1) some features on iOS and Android are not yet supported by React-Native; 2) since React-Native introduces another layer to any project, it can make debugging more difficult, especially at the intersection of React-Native and the host platform. 

## Best practices 
Best practices are still evolving. At this point, here are some things to know:

1. No inline styling

    Do not use inline styling. Import JavaScript files with styles defined and reuse in multiple files.
2. Min platform specific code

    Do not use separate JS files or blocks to the extent possible for different platforms that need to be supported because it will be more difficult to maintain the code. Accenture can register an application in the app entry point JS file (app.js) instead of registering twice in index.ios.js and index.android.js. That file (app.js) can also be used for importing all other views (.js files) of the application.
3. Look for third-party plugins

    Make use of third-party plugins for React components that are open source. It is going to improve time to market. 
4. Operating system services

    Accenture has third-party plugins available for availing operating system services like camera, calendar, file access, etc. Just be cautious about operating system quirks advised by the author/vendor while consuming them.
5. Style variations 

    With React-Native, a special language or syntax is not needed for defining styles. Developers just style an application using JavaScript. All the core components accept a prop named style. The style names and values usually match how CSS works on the web, except names are written using camel casing. For example, backgroundColor rather than background-color. Minor variations may occur, such as the use of flex box.
6. Be conscious about platform-specific UI changes

    The font will be standard but will vary by different platforms. For example, the standard font on Android is Roboto Medium.

    {% highlight javascript %}
    Platform.select({
        ios: {
            fontFamily: 'Helvetica Neue',
        },
        android: {
            fontFamily: 'Roboto Medium',
    }
    {% endhighlight %}
    
7. Responsive UI

    It is exceedingly difficult to set absolute styling for everything. Options help greatly with the layout. Third-party plugins like [react-native-resposive]( https://www.npmjs.com/package/react-native-responsive) will also help. 

8. Imports with exports

    For every imported library, make sure there are also exports for components in those library JS files.
9. Scalable vector graphics support

    There is no direct support for scalable vector graphics (SVG). Please use third-party plugins like [react-native-svg](https://github.com/react-native-community/react-native-svg), which provides a SVG interface for both iOS and Android.
10. Console.log statements

    When running a bundled app, these statements can cause a bottleneck in the JavaScript thread. Use plugins like [babel plugin](https://babeljs.io/docs/plugins/transform-remove-console/) to remove all console.* calls. 
11. Development mode

    JavaScript thread performance suffers greatly when running in dev mode. To improve the performance, Accenture can disable the dev= true option for performance testing.
12. Slow page transition

    When a route is pushed to the navigator, JavaScript needs to render all the components that are necessary for the new scene. It also needs to do the page transition in the same JS thread. So, scheduling the animation using the InteractionManager is a good option to use. While making the transition, lesser content is loaded and remaining content is rendered, once the transition is complete. This provides a smoother user experience.

## Learnings on React-Native framework
In React-Native, unlike other cross-platform application development frameworks, the error messages or exceptions are noticed as clueless in terms of identification of the root case or where it failed. Stack traces are often helpless in such situations. We are working to solve some of the most common errors experienced during React-Native application development:
1. Element type is invalid:

![Learning 1](/img/posts/reactlearnings/learning_pic1.png)

**Solution**: Every imported item should be exported from the library
A library was exported by default. But if it is not getting imported by default, the above error is throw. In such a case, .default needs to be added to the
imported component.

 Eg:

{% highlight javascript %}
const Drawer = require('react-native-drawer').default;
{% endhighlight %}

2. Expected a component class, got [object Object]

    <img src="/img/posts/reactlearnings/learning_pic2.png" width="200">

    **Solution**: Class name/Component names should start with a capital letter.
3. Expected corresponding JSX closing tag

    <img src="/img/posts/reactlearnings/learning_pic3.png" width="200">

    **Solution**: This error occurs when a component element tag is opened but not closed.
    Eg: A &lt;View&gt; needs to be closed in the specified file as &lt;/View&gt;
4. Could not connect to the development server 

    **Solution**: Restart the packager.
5. React-packager has encountered an internal error

    <img src="/img/posts/reactlearnings/learning_pic5.png" width="200">

    **Solution**: Error in running the packager. The terminal error will suggest the problem and solution in most of the cases.
6.  Failed to execute importScripts on WorkerGlobalScope

    <img src="/img/posts/reactlearnings/learning_pic6.png" width="200">

    **Solution**: This could either be because the debug browser window needs a reopen or there is some syntax error in the program. So, try undoing the changes to run successfully.
7. The source for assign must be an object

    <img src="/img/posts/reactlearnings/learning_pic7.png" width="200">

    **Solution**: In Stylesheet, StyleSheet.create does not return a plain JavaScript object, so usage of … operator cannot be applied. While deriving two different style objects from one basic style where only one property is added, the ‘flatten’ method can be used.
    
    Eg:

        const amountStyles = StyleSheet.flatten([styles.amountSection, {borderColor: amountBorderColor}]);
8. Application has not been registered

    <img src="/img/posts/reactlearnings/learning_pic8.png" width="200">

    **Solution**: The application is not registered in JS page.
9. Unknown named module

    <img src="/img/posts/reactlearnings/learning_pic9.png" width="200">

    **Solution**: The package server started by React-Native start seems to have cache of the node modules. Stopping and restarting the server solves the issue.

    Packager should always be restarted when new modules are installed.
10. Task 'installDebug' not found in root project 
    While building for Android, error below is displayed on screen:
    Task 'installDebug' not found in root project '<myprojectname>’

    **Solution**: This must be due to customized gradle settings configured for release of Android build.
    As a work around, keep a separate copy of project for debug build and release build at different paths with default gradle settings.
11. Dissimilar UI in iOS and Android
    
    If a developer uses common JS code for Android as base platform, but views shows differences with Visual design while running on iOS, two solutions will help.

    **Solution**: Platform-specific changes can be implemented by these two approaches: 
    1. If style changes are minimal, insert platform check inside JS files. 
    
        Eg:
        
            ...Platform.select({
                    ios: {
                    fontFamily: 'Helvetica Neue',
                    },
                    android: {
                     fontFamily: 'Roboto Medium',
                  }
            
    2. If changes cater to multiple blocks of the same JS file, keep two separate files for iOS and Android (jsfilename.ios.js, jsfilename.android.js).
12. Could not get BatchedBridge

    <img src="/img/posts/reactlearnings/learning_pic12.png" width="200">

    **Solution**: This is a debug version of app running in mobile. Follow the steps at [React-Native github](https://facebook.github.io/react-native/docs/signed-apk-android.html) to prepare release version of APK.
13. Disabling the warnings from the simulator while debugging
    
    This warning appears in application launch screen.

    <img src="/img/posts/reactlearnings/learning_pic13.png" width="200">

    **Solution**: In render function of the launch page (for example, Login Page), console.disableYellowBox = true;  needs to be mentioned, directing the warnings to console.
14. My TouchableX view is not very responsive

    **Solution**: Sometimes, an action in the same frame that is adjusting the opacity or highlight of a component that is responding to a touch, the effect will not be visible until after the onPress function has returned. If onPress does a setState that results in a lot of work and a few frames dropped, this may occur. To solve this, wrap any action inside of the onPress handler in requestAnimationFrame:
    
        handleOnPress() 
        { 
            // Always use TimerMixin with requestAnimationFrame, setTimeout and //  
             setInterval this.requestAnimationFrame(() => 
            {    
            this.doExpensiveAction();
              }); 
        }
    

## References
1. [https://facebook.github.io/react-native/](https://facebook.github.io/react-native/)
2. [https://css-tricks.com/snippets/css/a-guide-to-flexbox/](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

