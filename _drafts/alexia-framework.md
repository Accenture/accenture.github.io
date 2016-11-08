---
layout: post
title:  "Alexia Framework"
categories: accenture opensource lightweight-architecture alexa
author: michael_gloger
comments: true
---

<br />

![Alexia](/img/posts/alexia-framework/alexia-logo.png "Alexia")

Alexia is Framework for creating Amazon Echo (Alexa) skills in Node.js. It is developed by Accenture Open Web Platform Core Team located in Bratislava.

Check out our [Github Repository](https://github.com/Accenture/alexia)

## Terminology

Creating new skills for Amazon Echo using Alexia requires you to understand some basic terms. 
If you are completely new to Alexa development we recommend you to also read [Alexa Skills Kit Glossary](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/alexa-skills-kit-glossary)

Some basic terms with description:

- **Skill** - Alexa app
- **Intent** - Invoked if one of intent `utterances` is recognized
- **Utterance** - Voice input example
- **Slot** - Variable part of utterance
- **Session Attributes** - data persisted through the session
- **Cards** - visual output displayed in [Alexa app](http://alexa.amazon.com/)

## Motivation

To write any application for Amazon Echo you need to be able to handle Amazon requests and respond with appropriate JSON response. Manual processing of these requests can be pretty complex and prone to errors.

Thats where Alexia comes in to the game. Alexia helps you to create everything you need for your Alexa skills and does the heavy lifting for you. Forget about boilerplate code and time spent writing complicated test cases.

## Benefits of using Alexia Framework

- Write less code
- Deploy Alexa Skills faster
- Write unit tests more easily (and cover everything without crying)
- Create mocked Amazon requests for testing 
- Save speech assets automatically to directory
- Define actions and allow only certain intent transitions

## Getting Started

In this sections I will take you through the steps of how to create HelloWorld application for Alexa.

We will be deploying our application to Heroku. So make sure to install the [Heroku Toolbelt](https://devcenter.heroku.com/articles/heroku-command-line#download-and-install) and register free account before starting.

### 1. Initialize project

Create new directory for your project and initialize it as Node.js package with git.

{% highlight bash %}
mkdir alexia-hello-world
cd alexia-hello-world
npm init -y
git init
{% endhighlight  %}


### 2. Install Dependencies

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

Note that we are not directly using `hapi`. It is optional dependency required by: `app.createServer()`. You are free to create your own server as long as all requests are handled using `app.handle`. See [Handling Amazon Requests Manually](https://github.com/Accenture/alexia#handling-amazon-requests-manually)

### 4. Add npm start script

Open `package.json` file created by `npm init` and add `start` script to `scripts`

{% highlight json %}
...
"scripts": {
    "start": "node index"
}
...
{% endhighlight %}

### 5. Test your application locally

One shall not deploy his application without testing it locally! So lets start it real quick:

{% highlight bash %}
npm start
{% endhighlight %}

Your application is now listening on `POST localhost:8888` To change the port set  environment variable `PORT`.

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

You should see response similar to this:

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

If everything worked as expected you have an Amazon Echo Skill ready to be deployed.

### 6. Add .gitignore

Let's create `.gitignore` file first and add there `node_modules` and `speechAssets` directories. This step is optional

{% highlight bash %}
node_modules
speechAssets
{% endhighlight %}

### 7. Commit your changes

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

To redeploy to heroku just commit your changes and push to heroku master again.

You can view Heroku logs by entering: `heroku logs --tail`

### 9. Test the public endpoint of your application

Repeat [Step 5. Test your application locally](9.-test-your-application-locally) with the updated Heroku URL.

### 10. Create or update your Alexa Skill

Sign-in to the [Amazon Developer Services](https://developer.amazon.com/) and navigate to the Alexa Skills Kit.

1. Select `Add a New Alexa Skill`
2. Skill Information:
    - Skill Type: Custom Interaction Model
    - Name: Choose a name for your Alexa app
    - Invocation Name: Choose a invocation name for your Alexa app
3. Interaction Model:
    - Paste contents of generated speech assets from `speechAssets/intentSchema.json` and `utterances.txt` to the respective text areas
    - (optional) Add each customSlot type with all slot samples using `Add Slot Type` button
4. Configuration:
    - Choose HTTPS endpoint and geographical region
    - Paste your Heroku URL
5. SSL Certificate - skip for now
    - for production skills make sure to configure it properly
6. Test
    - Enter `"Hello"` to the `Service Simulator`
    - An `HelloIntent` request should be generated and sent to your endpoint
    - Your application should provide a valid response visible in `Service Response`

Congratulations, you just created an Amazon Echo skill from scratch using Alexia Framework and deployed it to Heroku.

Your application is ready to be tested on Amazon Echo Devices registered to your Amazon Developer Account.

## Summary

We saw how easy it is to use Alexia for writing new Amazon Echo Skills from scratch. We covered only basic features to get you up and running with Alexa Skill Development.

To see more examples and detailed documentation check out our [Alexia Github Repository](https://github.com/Accenture/alexia)