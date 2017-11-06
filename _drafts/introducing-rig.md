---
layout: post
title: "Introducing RIG - the Reactive Interaction Gateway"
categories: lightweightarchitecture microservices elixir rig
comments: true
author:
  - kevin_bader
---
# RIG - the Reactive Interaction Gateway

*...makes it easy to send messages from your backend services to your frontends.*

---

RIG is a scalable, open source gateway to your microservices. It solves the problem of
connection state (which users are online currently, with which devices), which allows your
microservices to be stateless. Pushing arbitrary messages to all connected frontends of a
specific user becomes as easy as publishing a message to a Kafka topic.

Additionally, RIG comes with a basic API gateway implementation. This way, RIG can be used to
communicate both ways between your microservices and your frontends.

![RIG Overview](/img/posts/introducing-rig/overview.svg)

Other features:

- Massively scalable, thanks to
  - only using in-memory databases, along with eventually-consistent cluster synchronization
  - Erlang/OTP, the platform RIG is built on
- Towards frontends, support Server-Sent Events (SSE), WebSocket and HTTP long-polling
  connections
- Supports privileged users that are able to subscribe to messages of other users
- Supports JWT signature verification for APIs that need authentication
  - with blacklisting for immediate invalidation of tokens

Interested? Read on!

## Why we built it

Similar to how other microservice/serverless systems are built, we had lots of
stateless services and an API gateway in front of it. An API gateway typically acts as
a reverse proxy, forwarding requests from frontend to backend services. The backend
services typically send back a reply, which is then forwarded back to the client.

Quite often, you'd like your UI to display events as they occur (think "two customer's
are looking at this" on your favorite hotel-booking site). The simplest way to
implement this is by having the frontend poll a backend service for updates, but this
doesn't scale well - a lot of extra traffic and a single service that is coupled to
all services that emit interesting events.

The first problem is easy: to reduce traffic and get rid of potentially large
notification delays, you could also have your reverse proxy forward a websocket
connection, or something similar, to that backend service.

The approach so far works okay as long as you have a monolithic application, but fails
in a microservice environment: it's a single component coupled to most services in
your system as it asks them for updates - any change in any other service will affect
it. We can solve this problem by decoupling the services using some kind of messaging
service, like Kafka; now the backend-for-frontends service simply listens to the Kafka
stream, where all other services publish their events to.

This is exactly what RIG does: it subscribes to Kafka topics, while holding
connections to all active frontends, forwarding events to the users they're addressed
to, all in a scalable way. And on top of that, it also handles authorization, so your
services don't have to care about that either.

## How we built it

Our design goals:

- Handling of huge numbers of active frontend connections simultaneously
- Easily and massively horizontally scalable
- Minimal impact on frontend code using open and established standards to choose from
  (SSE, WebSockets)
- Achieving a decent degree of fault-tolerance: as RIG is envisioned as a central
  component in your infrastructure, it's important that it virtually never goes down.
- Easy to use, simple to deploy (so far no external dependencies)

We wanted to use a modern language that would be easy to reason about and fun to work
with, with a very strong networking support and powerful concurrency primitives.

Our first prototype was written in Node.js. The app worked, but scaled very poorly in
both directions. When we've decided to go for a rewrite, we first thought about using
Go, which seems to be the obvious choice for anything network related nowadays. Still,
the promises of Erlang/OTP were too cool to ignore, so instead we went for Elixir, the
upcoming, functional and dynamic language on top of BEAM, the battle-tested Erlang VM.

Our curiousity has paid off - we've implemented the features we aimed for, thorougly
tested and
[highly scalable](http://phoenixframework.org/blog/the-road-to-2-million-websocket-connections),
with highly maintainable, easy-to-reason-about functional code, in less than 600 SLOC.
It takes a bit getting used to the concepts, but then Elixir indeed is fun to use.

### State synchronization

There are three main sources of state in a RIG cluster:

- whose device is connected to which node,
- which JWT is blacklisted, and
- which API endpoint should be forwarded to which backend.

All RIG instances need this information, yet consistency is not the important factor,
so we went for a [PA/EL](https://en.wikipedia.org/wiki/PACELC_theorem) design, that is,
eventual consistency in all cases.

To distribute the state information among the cluster, we've relied on the [Presence
Framework](https://dockyard.com/blog/2016/03/25/what-makes-phoenix-presence-special-sneak-peek), which is a module of Phoenix. [Presence](https://hexdocs.pm/phoenix/Phoenix.Presence.html) itself is built on top of [PubSub](https://hexdocs.pm/phoenix_pubsub/Phoenix.PubSub.html),
another great Phoenix module, which is used to disseminate messages throughout the
cluster, in a broadcast-like fashion. Presence uses PubSub to send
[CRDT](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type)s around,
which contain the who-is-where session state. The connection state mapped to the
actual connection (Erlang) processes; the VM then notifies Presence as soon as one of
those processes dies, which Presence in turn broadcasts to the other nodes.

The blacklist is implemented using Presence as well, but each nodes tracks its own
blacklist and manages its own timeouts. The reason for this is that in the case of
connection state information, we want the state to go down with the respective node,
but in case of the blacklist, we need to retain the information in any case. Because
the blacklist is known to anyone, the blacklist API can be invoked on any node. Even
though the blacklist is stored in-memory only, it won't vanish as long as there is at
least one node online.

Again, the API endpoint configuration uses the same mechanism, along with a chunk of
logic to deal with configuration updates properly.

## What's next

There a lots of ideas for the future, and we'll continue to work on the project in the open.
We're excited to release our first milestone to the open source community.
Let us know what you think! Find us on
[Github](https://github.com/Accenture/reactive-interaction-gateway).

> **About Kevin Bader**
>
> Kevin Bader is a software engineer and technical architect at Accenture. He likes
> open source, microservice architecture and Elixir, so he loves this project :)
