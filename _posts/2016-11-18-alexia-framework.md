---
layout: post
title:  "Introducing Alexia for Amazon Echo Skill Development"
categories: accenture opensource lightweight-architecture alexa
author: michael_gloger
comments: true
date: '2016-11-18 00:00'
---

<br />

![Alexia]({{site.baseurl}}/img/posts/alexia-framework/alexia-logo.png "Alexia")

Alexia is a framework for creating Amazon Echo (Alexa) skills in Node.js. It was developed by the Accenture Open Web Platform core team located in Bratislava.

Check out our [Github Repository](https://github.com/Accenture/alexia).

## Terminology

Creating new skills for Amazon Echo using Alexia requires you to understand some basic terms. 
If you are completely new to Alexa development, we recommend reading [Alexa Skills Kit Glossary](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/alexa-skills-kit-glossary).

Here are some basic terms with a description:

- **Skill** - Alexa app
- **Intent** - Invoked if one of the intent `utterances` is recognized
- **Utterance** - Voice input example
- **Slot** - Variable part of utterance
- **Session Attributes** - Data persisting through the session
- **Cards** - Visual output displayed in [Alexa app](http://alexa.amazon.com/)

## Motivation

To write any application for Amazon Echo, you need to be able to handle Amazon requests and reply with an appropriate JSON response. Manual processing of these requests can be fairly complex and prone to errors.

This is where Alexia comes into the game. The framework helps create everything you need for your Alexa skills and does the heavy lifting for you. Forget about boilerplate code and time spent writing complicated test cases.

## Benefits of Using Alexia Framework

- Write less code
- Deploy Alexa skills faster
- Write unit tests more easily (and cover everything without crying)
- Create mocked Amazon requests for testing 
- Save speech assets automatically to directory
- Define actions and allow only certain intent transitions

## Getting Started

This section walks through the steps of how to create a HelloWorld application for Alexa.

We will be deploying our application to Heroku so make sure to install the [Heroku Toolbelt](https://devcenter.heroku.com/articles/heroku-command-line#download-and-install) and register for a free account before starting.

### 1. Initialize project

Create new directory for your project and initialize it as Node.js package with git.

{% highlight bash %}
mkdir alexia-hello-world
cd alexia-hello-world
npm init -y
git init
{% endhighlight  %}


### 2. Install dependencies

{% highlight bash %}
npm install alexia hapi --save
{% endhighlight  %}

### 3. Create index.js file

Create `index.js` file in your project root and modify it to look like this:

{% highlight javascript %}
// Import alexia and create new app
const alexia = require('alexia');
const app = alexia.createApp();

/*
 * Register HelloIntent with one utterance: `Hello`
 * and static responseText: `Hello from Alexia app`
 */
app.intent('HelloIntent', 'Hello', () => {
    return 'Hello from Alexia app';
});

// Create http server and start it
app.createServer().start(() => {
    // Once started, save speechAssets into directory
    app.saveSpeechAssets();
    console.log('Server started');
});
{% endhighlight %}

Note that we are not directly using `hapi`. It is an optional dependency required by: `app.createServer()`. You are free to create your own server as long as all requests are handled using `app.handle`. See [Handling Amazon Requests Manually](https://github.com/Accenture/alexia#handling-amazon-requests-manually).

### 4. Add npm start script

Open `package.json` file created by `npm init` and add `start` script to `scripts`

{% highlight json %}
...
"scripts": {
    "start": "node index"
}
...
{% endhighlight %}

### 5. Test application locally

Do not deploy your application without testing it locally! To start:

{% highlight bash %}
npm start
{% endhighlight %}

Your application is now listening on `POST localhost:8888` To change the port, set environment variable `PORT`.

Let's open Postman (or any other REST client) and send this example request to our application.

{% highlight json %}
{
  "session": {
    "sessionId": "SessionId.foo.bar",
    "application": {
      "applicationId": "amzn1.ask.skill.foo.bar"
    },
    "attributes": {},
    "user": {
      "userId": "amzn1.ask.account.foo.bar.yo"
    },
    "new": true
  },
  "request": {
    "type": "IntentRequest",
    "requestId": "EdwRequestId.foo.bar",
    "locale": "en-US",
    "timestamp": "2016-10-19T07:32:20Z",
    "intent": {
      "name": "HelloIntent",
      "slots": {}
    }
  },
  "version": "1.0"
}
{% endhighlight %}

You should see a response similar to this:

{% highlight end %}
{
  "version": "0.0.1",
  "sessionAttributes": {
    "previousIntent": "HelloIntent"
  },
  "response": {
    "outputSpeech": {
      "type": "PlainText",
      "text": "Hello from Alexia app"
    },
    "shouldEndSession": true
  }
}
{% endhighlight %}

If everything worked as expected, you have an Amazon Echo skill ready to be deployed.

### 6. Add .gitignore

Let's create the `.gitignore` file first and add the `node_modules` and `speechAssets` directories. This step is optional.

{% highlight bash %}
node_modules
speechAssets
{% endhighlight %}

### 7. Commit changes

{% highlight bash %}
git add -A
git commit -m "Initial commit"
{% endhighlight %}

### 8. Deploy to Heroku

Run following commands and copy the generated URL:

{% highlight bash %}
heroku create
git push heroku master
{% endhighlight %}

The URL should look similar to this: `https://something-awesome-12345.herokuapp.com`

To redeploy to Heroku just commit your changes and push to Heroku master again.

You can view Heroku logs by entering: `heroku logs --tail`

### 9. Test the public endpoint of application

Repeat [Step 5. Test your application locally](9.-test-your-application-locally) with the updated Heroku URL.

### 10. Create or update your Alexa skill

Sign-in to [Amazon Developer Services](https://developer.amazon.com/) and navigate to the Alexa Skills Kit.

1. Select `Add a New Alexa Skill`
2. Skill Information:
    - Skill Type: Custom Interaction Model
    - Name: Choose a name for your Alexa app
    - Invocation Name: Choose an invocation name for your Alexa app
3. Interaction Model:
    - Paste contents of generated speech assets from `speechAssets/intentSchema.json` and `utterances.txt` to the respective text areas
    - (optional) Add each custom slot type with all slot samples using `Add Slot Type` button
4. Configuration:
    - Choose HTTPS endpoint and geographical region
    - Paste your Heroku URL
5. SSL Certificate - skip for now
    - For production skills make sure to configure it properly
6. Test
    - Enter `"Hello"` to the `Service Simulator`
    - A `HelloIntent` request should be generated and sent to your endpoint
    - Your application should provide a valid response visible in `Service Response`

Congratulations! You just created an Amazon Echo skill from scratch using the Alexia Framework and deployed it to Heroku.

Your application is ready to be tested on Amazon Echo Devices registered to your Amazon Developer Account.

## Summary

This post summarizes how easy it is to use Alexia for writing new Amazon Echo Skills from scratch. We covered basic features to get you up and running with Alexa skill development.

To see more examples and detailed documentation, check out our [Alexia Github Repository](https://github.com/Accenture/alexia)
