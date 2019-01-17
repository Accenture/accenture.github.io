---
layout: post
title: "RIG 2.0: CloudEvents!"
categories: lightweightarchitecture microservices elixir rig
comments: true
author:
  - kevin_bader
---

# RIG 2.0: CloudEvents!

We are proud to release the next major milestone of the [Reactive Interaction Gateway](https://github.com/Accenture/reactive-interaction-gateway)! [Version 2.0](https://github.com/Accenture/reactive-interaction-gateway/releases/tag/2.0.0) comes with lots of new features, changes and improvements. Many thanks to our contributors!

![The Reactive Interaction Gateway.](/img/posts/rig-2_0/logo-with-text.png)

Here are some of the most prominent features (see below for some details and the [Changelog](https://github.com/Accenture/reactive-interaction-gateway/blob/master/CHANGELOG.md) for the full list):

- CloudEvents everywhere
- HTTP/2
- HTTPS (SSL termination)
- Amazon Kinesis
- SSL encryption for Kafka broker connections
- Much improved documentation
  - [Dedicated website](https://accenture.github.io/reactive-interaction-gateway)
  - [OpenAPI documentation](https://github.com/Accenture/reactive-interaction-gateway#api-documentation) for RIG's (internal) API

## CloudEvents

We fully embrace the upcoming [CloudEvents CNCF open standard](https://cloudevents.io/). Coming from the serverless domain, CloudEvents greatly helps with interoperability among applications and vendor services. And the best thing about it: unlike other standards it is _really simple_ by design. For example, an event that describes a created Github pull request looks similar to this:

```json
{
  "specversion": "0.2",
  "type": "com.github.pull.create",
  "source": "/desktop-app",
  "id": "A234-1234-1234",
  "time": "2018-04-05T17:31:00Z",
  "data": {
    "assignee": {
      "login": "octocat"
    },
    "head": {
      "repo": {
        "full_name": "octocat/Hello-World"
      }
    },
    "base": {
      "repo": {
        "full_name": "octocat/Hello-World"
      }
    }
  }
}
```

For RIG this means that it will get even easier to interface with CloudEvents enabled services. Adopting the standard also deprecates the previous [message format](https://github.com/Accenture/reactive-interaction-gateway/blob/1.1.0/doc/configuration.md#consuming-events) [configuration](https://github.com/Accenture/reactive-interaction-gateway/blob/1.1.0/config/config.exs#L77). Going forward, all events that flow towards RIG, or are produced by RIG, must be CloudEvents.

> Migration: Migrate all events to the CloudEvents spec. In most cases, you get away with simply putting your existing event in a CloudEvent's `data` property. After all, **CloudEvents is designed to be simple**.

## Event Subscriptions

As any good piece of foundational infrastructure RIG never imposed the use of special libraries (or formats, or protocols) on your application but a pattern – so when starting fresh it would _just fit_. However, through ongoing integrations we found the need to support a greater variety of event dispatching use cases to simplify integrating RIG into an existing landscape.

In the previous RIG 1.x series we have implemented the idea that backend services target a user directly — effectively making a message out of an event:

![Events as messages.](/img/posts/rig-2_0/events_1.x_512x464.gif)

Note how both Alice and Bob receive updates for flights they are not interested in. Also, while this is simple conceptually, it requires all services of interest to frontends to follow this pattern. Trying to do something in a different way required services to couple themselves to RIG: e.g., in order to send messages to all users, services would have to fetch/handle the list of online users. Just telling the world that something happened without targeting a specific user was effectively not supported.

Today, RIG 2.0 addresses this by allowing clients (i.e. users' frontends) to simply _subscribe_ to events they are interested in:

![Events as events.](/img/posts/rig-2_0/events_2.0_512x464.gif)

This shifts the responsibility of selecting the right messages from the backend team to the frontend team and relieves backend services from keeping track of online users in many cases.

Of course RIG 2.0 continues to fully support the foundational behaviour, now further enhanced and more flexible than ever, by using so-called subscription constraints (where messages include the user ID and the subscription relates to that ID). For more details on the mechanics see the related [Github issue](https://github.com/Accenture/reactive-interaction-gateway/issues/90).

Organizing around events rather than messages also enables us to integrate with other event-based brokers. For example, in cooperation with Serverless Inc. we have successfully built a proof-of-concept setup for exchanging events both ways with the the Serverless Event Gateway.

> Migration: Revisit the kind of messages and events that currently flow through RIG. Create (JWT based) automatic subscriptions where you want to keep the current behaviour, e.g., for messages that target a specific user. Change messages to events where services communicate _changes_ and let your frontend code set up the right subscriptions.

## Preview Features and Outlook

Our next goal is to improve RIG's reverse-proxy capabilities. We are looking forward to simplify the configuration and add exciting new features. To get some early feedback we include some of them as a "preview" in RIG 2.0: using the "target" and "response-from" directives, an API definition can be set up to produce HTTP requests to a Kafka/Kinesis partition instead of forwarding them to HTTP backends. If a client is interested in an asynchronous response, RIG can additionally be set up to wait for such a response on yet another Kafka/Kinesis partition. There have been some discussions internally around if and how to support this – feedback welcome!

Other features planned:

- Prometheus monitoring
- Jaeger/OpenTracing
- Get rid of some tech debt and [apply our learnings](https://github.com/Accenture/reactive-interaction-gateway/issues/102) around how to properly structure Mix Umbrella projects. This will allow us to easily integrate with new message broker products and protocols in the future.

For the current roadmap you can always check out our [Github milestones](https://github.com/Accenture/reactive-interaction-gateway/milestones?direction=asc&sort=title&state=open). We are looking forward to [your feedback](https://github.com/Accenture/reactive-interaction-gateway/issues).

Feel free to [star us on Github](https://github.com/Accenture/reactive-interaction-gateway)!
