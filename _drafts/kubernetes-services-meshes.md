---
layout: post
title:  "An intro to Kubernetes Service Meshes (Working Title)"
categories: kubernetes
author: jan_willies
comments: true
---
# An intro to Kubernetes Service Meshes (Working Title)
A service mesh controls traffic between services. It can do lots of things, among them are transport security, policy- and rule evaluation, authentication and authorization, tracing, canary rollouts, traffic duplication, fault injection, circuit breaking and other things. All agnostic to whatever software is running, no need to modify applications. Most service-meshes work via a sidecar-container which sits next to the application and works as a transparent proxy.

What kubernetes is to managing application deployements, service meshes are to managing traffic and identities. Another more or less accurate analogy would be Message Broker Systems (like RabbitMQ), but for HTTP instead of AMQP.

Below are some options if you want to build upon a service mesh *today*:

## istio
Earlier in 2017 istio was announced, which came out of a collaboration by Google, IBM and Lyft. There was a whole day reserved for istio before KubeCon17, which I unfortunately missed. Nevertheless there were lots of talks about istio at the conference, mostly about what istio can do and about attracting developers.

Istio is an opensource project with a very open approach. Here's the roadmap for H1/18: https://docs.google.com/spreadsheets/d/1mUIrX82Z8mRuhNWyl5D_sd_Evg3KzeNotzRorPzQMko/edit?ts=5a03f88d#gid=351491887

Operating a service mesh is not for the faint of heart, so there will be products with enterprise offerings on top. F5 Networks is working on a product on top of istio, as is Banyan. Pretty sure others as well and we will hear some announcements in 2018. This is an area we should watch closely.

Read more about it at https://istio.io/docs/concepts/what-is-istio/overview.html

## linkerd
Linkerd was the first opensource service mesh, introduced beginning of last year. It targeted not only kubernetes, but a wide range of other platforms (ECS, Docker, Mesos, etc). It is build by the same company which introduced conduit (buoyant).

It remains to be seen what happens with linkerd, now that conduit was announced. My guess is the marketshare will shrink, new customers will go with conduit, since the future is a Kubernetes-one anyway.

Read more at: https://linkerd.io/overview/what-is-linkerd/

## conduit
At KubeCon17 a new service mesh was announced by Buoyant: conduit. The company behind it was founded by ex-twitter employees who build finagle (internal service mesh at Twitter). So they build on years of experience and it’ll be interesting to see how conduit evolves. I haven’t had  time for a closer look yet but I see that there’s a lot of movement behind istio- so conduit might have some work to do in terms of user adoption and market visibility.

Read more about at https://buoyant.io/2017/12/05/introducing-conduit/

## Tigera CNX
Tigera is most known for project calico (at least to me), which is a CNI-plugin for Kubernetes which implements NetworkPolicies. They worked with Google, Amazon and Microsoft to secure networks in their public cloud offerings around Kubernetes (GKE, EKS, AKS). The fact that all major cloud provider work with the very same vendor to implement Kubernetes network connectivity and NetworkPolicies should say something!

CNX is their new product and brings service mesh features to all kind of platforms/hosts. They claim to span a flat network over VMs, bare metal hosts and cloud native platforms like Kubernetes. It will be definately interesting to see how they compete with istio and conduit. A flat network model is very appealing.

Read more at https://tigera.io/wp-content/uploads/2017/12/Tigera-CNX-data-sheet-20171205.pdf

## Cilium
Cilium is also an implementation of NetworkPolicies in Kubernetes, although a very interesting one: It works in-kernel via eBPF (that’s an in-kernel virtualmachine, you can compile little programs inside the kernel) and thus has a high throughput rate compared to userspace implementations.

Initially they focussed on L3/L4 networking but now moving in L7 space as well. Support for gRPC, kafka and HTTP was recently announced. There is also a push for NetworkPolicies to operate on higher levels than just L3/4: https://github.com/kubernetes/kubernetes/issues/58624

While it’s a very cool approach (BPF), working with the kernel has some downsites as well. They need to wait for features to be merged upstream, for example in-kernel TLS (kTLS) was just merged in 4.13.

Read more at https://www.cilium.io/blog/istio