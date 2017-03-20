---
layout: post
title:  "React-Native–-Leading Practices and Learnings"
categories: mobility
author: 
    - badrinath_bahadur
    - v_poolothvalappil
    - anuradha_k_pradhan

comments: true
---

# Mobility—Using a cross-platform React-Native app
The main objective of mobility solution in an organization is to provide solutions and develop platforms for mobile technology to be used by its clients for its various promotions, extends productivity of organization by increasing array of mobile apps, devices, allied services.

For the past few years enterprises have taken a “ready, fire, aim” approach to deploy “mobile-first” or “mobile-only” strategies for amplified productivity, superior communication and better efficiency.

However, as enterprises dig into mobility solutions, some challenges they face are security, real-time access to data, device diversity and volatility. Multiple device operating systems available in market coupled with frequent upgrades for them make it tough to choose the right framework for application development.

When building an app in native framework, we may end up needing to use third-party SDKs or libraries which is the recommended way for development of applications. Most of the time, these are only available in their native version. It is only in a few cases that these libraries are written in JavaScript. It gets more difficult and costly to develop and sustain the applications using the native SDKs for every device OS/platform. As a result, cross-platform hybrid applications strategy is now being adopted by enterprises. 

At Accenture, we are committed to open source contribution. React Native is an exciting framework that enables web developers to create robust mobile applications using their existing JavaScript knowledge. It offers faster mobile development, and more efficient code sharing across iOS, Android, and the Web, without sacrificing the end user’s experience or application quality. The tradeoff is that it’s new, and still a work in progress framework. If your team can handle the uncertainty that comes with working with a new technology, and wants to develop mobile applications for more than just one platform, you should be looking at React Native.
## What is React-native?
React Native is the next generation of React - a JavaScript code library developed by Facebook and Instagram, which was released on GitHub in 2013. It helps in building a real mobile app that's indistinguishable from an app built using Objective-C or Java. React Native makes use of the same fundamental UI building blocks as regular iOS and Android apps.

React Native applications consist of both JavaScript and native code (either Java or Objective C). The JavaScript runs in a virtual machine on the mobile device and communicates with the native code through a JSON message passing interface.

At present this framework supports the following device platforms:
- Android
- iOS

Facebook also made React Native open-source, with the idea that compatibility with other platforms like Windows or tvOS could be worked on by the development community.

## How does it work?
Unlike other cross-platform SDK's like Cordova, Ionic, etc. which basically run JavaScript powered apps in a web browser, React Native compiles to native code for the respective OS, Android or iOS. That means there is no performance compromise and the apps built with React Native run just as smoothly as apps built using the actual native tools like Xcode.

![Architecture](/img/posts/reactlearnings/arch.png)

React Native works by embedding the JavaScript files in the app, and running them locally. But also, one could have these files remotely on a server fetching their latest version when the app has connectivity. This would allow updating an application very rapidly, without having to go through the app store’s review process. There are also third party services that offer such solutions, and using them potentially could mean that for smaller applications that don’t have a lot of data to display (e.g. festival apps), a backend isn’t needed anymore
## Benefits of React-native: 
1. It offers third-party plugin compatibility, less memory usage, and a smoother experience
Third-party plugins mean there won’t be much dependence on a Web View for certain functions. For example, if aws-api-gateway-client functionality is added to the app, React Native links the plugin with a native module, so linking to the server, while using less memory and loading faster. If the app supports older operating systems (and older devices), this can help keeping the app running smoothly.
2. Native app development is much more efficient
React Native is all about bringing the speed and agility of web app development to the hybrid space-with native results. Under React Native’s hood is Facebook’s popular ReactJS UI library for web applications. React Native brings all of ReactJS’s better app performance, DOM abstraction, and simplified programming methods to hybrid mobile development.
3. Apply React-Native ui components to an existing app’s code—without any rewriting at all
Code reusability is much easier in React-native. For example, if there is an existing hybrid app built in Cordova, that Cordova code can be reused easily with plugins.
4. React Native Can Deal with Both Ecosystems
As the matter of fact, developing native apps for Android and the iOS platform is a tedious task, we all know that, these both are two entirely different ecosystems. Android apps demand to have knowledge of Java and Android SDK. One should stay updated with the latest features of two major ecosystems to get it in sync with React-Native.
5. React Native is UI-Focused
React Native has a highly responsive Interface, just like AngularJS and MeteroJS, it is more focused on UI. React Native apps sport a highly responsive interface. And the JavaScript interactions between the Native environment and React Native reduces load times and give a smoother feel of the app.
6. Native SDKs update
When the iOS or Android SDKs are updated, it takes some time for React Native to integrate these newly introduced APIs into their core library. 

## Risks and Drawbacks
Since React Native has its own drawbacks, whether React Native is a good choice or not for a project depends on the context. Some features on iOS and Android still are not supported by React Native. The best practices are getting evolved. 

Because React Native introduces another layer to any project, it can also make debugging difficult, especially at the intersection of React and the host platform. 

The usual limitations and hurdles that might be faced when working with any new technology apply because the framework is new. 
## Best practices 
1. No inline styling

    Do not use inline styling. Import JavaScript files with styles defined and rese in multiple files
2. Min platform specific code

    Do not use separate JS files or blocks to the extent possible for different platforms you would like to support. It is going to cost you in maintaining the code. We can register your application in your app entry point JS file(app.js) instead of registering twice in index.ios.js and index.android.js. That file(app.js) can as well be used for importing all other views (.js files) of the application.
3. Look for third party plug-ins

    Make use of third party plugins for React components open source. It is going to improve time to market. 
4. OS services

    We have third party plugins available in the market place for availing operating system services like camera, Calendar, file access etc. Just be cautious in OS quirks advised by the author/vendor while consuming them.
5. Style variations 

    With React Native, you don't use a special language or syntax for defining styles. You just style your application using JavaScript. All the core components accept a prop named style. The style names and values usually match how CSS works on the web, except names are written using camel casing. Eg: backgroundColor rather than background-color. You may see minor variations like use of flex box.
6. Be conscious about platform specific UI changes

    Font can be one which comes standard but different for platforms. For eg: Standard font on Android is Roboto Medium

    
         ...Platform.select({
                ios: {
                fontFamily: 'Helvetica Neue',
                },
                android: {
                 fontFamily: 'Roboto Medium',
              }
    
7. Responsive UI

    It is just plain impossible to set absolute styling for everything. Options helps greatly with the layout. Third party plugins like [react-native-resposive]( https://www.npmjs.com/package/react-native-responsive) would also help. 

8. Imports with exports

    Make sure for every imported library you have exports also for components in those lib JS files.
9. SVG support

    There is no direct support. Please use third party plug-ins like [react-native-svg](https://github.com/react-native-community/react-native-svg) which provides SVG interface both iOS and Android.
10. Console.log statements

    When running a bundled app, these statements can cause a bottleneck in the JavaScript thread. Use plug-ins like [babel plugin](https://babeljs.io/docs/plugins/transform-remove-console/) to remove all console.* calls. 
11. Development mode 

    JavaScript thread performance suffers greatly when running in dev mode. So, to improve the performance we can disable the dev= true option for performance testing.
12. Slow page transition

    When a route is pushed to the navigator, JavaScript needs to render all the components which are necessary for the new scene, and it also needs to do the page transition in the same JS thread. So, scheduling the animation using the InteractionManager is a good option to use. While making the transition, lesser content is loaded and remaining contents are rendered, once the transition is complete. This provides a smoother user experience.

## Learnings on React Native framework
In React-Native, unlike other cross platform application development frameworks, the error messages or exceptions are noticed as clueless in terms of identification of the root case or where it failed. Stack traces are often helpless in such situations. We are trying to help arrive at the solution to few most common such errors during React Native application development:
1. Element type is invalid

    <img src="/img/posts/reactlearnings/learning_pic1.png" width="200">

    **Solution**: Every imported item should be exported from the library
    Some library was exported by default. But if it is not getting imported by default, the above error is throw. In such case, .default needs to be added to the imported component.

    Eg:

        const Drawer = require('react-native-drawer').default;

2. Expected a component class, got [object Object]

    <img src="/img/posts/reactlearnings/learning_pic2.png" width="200">

    **Solution**: Class name/Component names should start with capital letter.
3. Expected corresponding JSX closing tag

    <img src="/img/posts/reactlearnings/learning_pic3.png" width="200">

    **Solution**: This error occurs when a component element tag is opened but not closed.
    Eg: A <View> needs to be closed in the specified file as </View>
4. Could not connect to the development server 

    **Solution**: Restart the packager.
5. React-packager has encountered an internal error

    <img src="/img/posts/reactlearnings/learning_pic5.png" width="200">

    **Solution**: Error in running the packager. In the terminal error will suggest the problem and solution in most of the cases.
6.  Failed to execute importScripts on WorkerGlobalScope

    <img src="/img/posts/reactlearnings/learning_pic6.png" width="200">

    **Solution**: This could either be because debug browser window needs a reopen or there is some syntax error in the program. So, try undoing the changes to run successfully.
7. The source for assign must be an object

    <img src="/img/posts/reactlearnings/learning_pic7.png" width="200">

    **Solution**: In Stylesheet, StyleSheet.create does not return a plain JavaScript object, so usage of … operator cannot be applied. So while deriving two different style objects from one basic style where only one property is added ‘ flatten ’ method can be used.
    
    Eg:

        const amountStyles = StyleSheet.flatten([styles.amountSection, {borderColor: amountBorderColor}]);
8. Application has not been registered

    <img src="/img/posts/reactlearnings/learning_pic8.png" width="200">

    **Solution**: The application is not registered in JS page.
9. Unknown named module

    <img src="/img/posts/reactlearnings/learning_pic9.png" width="200">

    **Solution**: The package server started by React-native start seems to have cache of the node modules. Stopping and restarting the server solves the issue.

    Packager should always be restarted when new modules are installed.
10. Task 'installDebug' not found in root project 
    While building for android error below is displayed on screen:
    Task 'installDebug' not found in root project '<myprojectname>’

    **Solution**: This must be due to customized gradle settings you have configured for release Android build.
    As a work around, keep a separate copy of project for debug build and release build at different paths with default gradle settings.
11. Dissimilar UI in iOS and Android
    
    If you developed common JS code for Android as base platform, but views shows differences with Visual design while running on iOS, two solutions will help.

    **Solution**: Platform specific changes can be implemented by the below two approaches: 
    1. If style changes are minimal, you can insert platform check inside JS files. 
    
        Eg:
        
            ...Platform.select({
                    ios: {
                    fontFamily: 'Helvetica Neue',
                    },
                    android: {
                     fontFamily: 'Roboto Medium',
                  }
            
    2. If changes caters to multiple blocks of the same JS file, keep two separate files for iOS and Android(jsfilename.ios.js, jsfilename.android.js) .
12. Could not get BatchedBridge

    <img src="/img/posts/reactlearnings/learning_pic12.png" width="200">

    **Solution**: This is a debug version of app running in mobile. Follow  the steps at [React-Native github](https://facebook.github.io/react-native/docs/signed-apk-android.html) to prepare release version of APK.
13. Disabling the warnings from the simulator while debugging
    
    This warning appears in application launch screen.

    <img src="/img/posts/reactlearnings/learning_pic13.png" width="200">

    **Solution**: In render function of the launch page (For example Login Page) 
    , console.disableYellowBox = true;  needs to be mentioned, directing the warnings to console.
14. My TouchableX view isn't very responsive

    **Solution**: Sometimes, if we do an action in the same frame that we are adjusting the opacity or highlight of a component that is responding to a touch, we won't see that effect until after the onPress function has returned. If onPress does a setState that results in a lot of work and a few frames dropped, this may occur. A solution to this is to wrap any action inside of your  onPress handler in requestAnimationFrame:
    
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

