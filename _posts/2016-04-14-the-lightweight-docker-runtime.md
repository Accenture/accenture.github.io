---
layout: post
title:  "The Lightweight Docker Runtime (TLDR)"
categories: docker
author: oscar_renalias
comments: true
date: '2016-04-14 00:00'
---
# Docker, Docker, Docker

Some of us have been using Docker in one way or another for a while now and we're very excited about how it can dramatically improve the way we design, build and run modern application architectures.  However, there's some confusion about what is really needed to run Docker at scale, although Docker is doing a great work addressing that with products such as [Docker Datacenter](https://www.docker.com/products/docker-datacenter). Building and running multiple instances of an nginx container in a single node is quite impressive for a demo but when is the last time most of us designed and built an application that consisted of a single container? Probably not very often.

After the initial excitement, we soon realized that there was no structured way to describe how a container platform should work and what capabilities it should provide. Being the architect types that we are, we set out to create a high-level container platform reference architecture that contained (no pun intended) a list of capabilities that we thought are necessary to run containers at scale. Architects love frameworks and diagrams with boxes so without further ado, this the result:

![Container Reference Architecture](/img/posts/the-lightweight-docker-runtime/refarch.jpg)

This post is not about going deep into our model's capabilities, but they should be quite self-explanatory for readers who have worked with containers before.

# The Lightweight Docker Runtime

But what is a reference model if nothing but guidance for an implementation?

The reference architecture is quite expansive and goes into detail about the intended purpose and functionality provided by these capabilities. As no one likes to sit through countless architecture diagrams, we used the reference architecture to build an implementation of the basic capabilities for demonstration purposes, and released it as open source. We call it [The Lightweight Docker Runtime](https://github.com/accenture/tldr) (TLDR -- pronounced as _"the leader"_) and it is based on some of the great container work and thought leadership that [Ilkka Anttonen](http://sirile.github.io/), one of our colleagues, has been doing over the last few months;. See some of his articles [here](http://sirile.github.io/2015/12/14/automatic-scaling-with-docker-19-and-overlay-network-locally-and-in-aws.html) and [here](http://sirile.github.io/2015/08/05/part-2-scaling-in-amazon-aws-vpc-with-docker-docker-machine-consul-registrator-haproxy-elk-and-prometheus.html).

TLDR itself is a collection of provisioning scripts, ready-made containers and Compose files that, in about 5-10 minutes depending on the target infrastructure and connection speed, automatically provisions a Docker Swarm cluster with support for deployment of applications with container networking, service discovery, application deployment orchestration, logging and monitoring on VirtualBox (Linux, Windows and OS X) as well as Amazon AWS.

Bear in mind that TLDR is not, and does not intend to be, production-grade; its sole purpose is to show one of the many possible implementations of a Docker container platform using a set open source components as well as patterns that the team has carefully selected based on our experience so far, and we have taken some liberties while building it that we would never ever attempt if we were building this for production usage.

# Features

Currently, TLDR provides the following capabilities:

- [Docker Machine](https://docs.docker.com/machine/) for Docker engine node provisioning; currently only AWS and VirtualBox are supported 
- 3-node [Docker Swarm](https://docs.docker.com/swarm/), using node labels
- Dynamic service discovery and registration using [Consul](https://www.consul.io/) and [Registrator](https://github.com/gliderlabs/registrator)
- Deployment of applications via [Docker Compose](https://docs.docker.com/compose/)
- Transparent application container load balancing using an [application load balancer](https://github.com/Accenture/tldr-alb), which provides seamless scaling of application containers within the [Docker Swarm](https://docs.docker.com/swarm/) cluster
- Log aggregation via Docker logging, [ElasticSearch](https://www.elastic.co/products/elasticsearch), [Kibana](https://www.elastic.co/products/kibana) and [Logstash](https://www.elastic.co/products/logstash) 
- Monitoring and metrics via [Prometheus](https://github.com/prometheus) and [cAdvisor](https://github.com/google/cadvisor)
- Dashboards with [PromDash](https://github.com/prometheus/promdash)

# Getting started with TLDR

Please see the [Pre-requisites](https://github.com/Accenture/tldr#pre-requisites) section in the documentation for more information on the software packages and cloud provider credentials needed in order to run TLDR.

When ready, check the [VirtualBox](https://github.com/Accenture/tldr#setting-up-locally) section for locally building a cluster, or [running on AWS](https://github.com/Accenture/tldr#setting-up-in-aws) for deploying the cluster on AWS (note: only eu-central-1 is currently supported!)

Assuming all components and credentials are in place, the provisioning process of a working cluster is fully automated and it should take up to 10 minutes. Once the process is complete, head to the [3-tier ToDo demo application folder](https://github.com/Accenture/tldr/tree/master/apps/todo) to deploy your first Compose-based application with full service discovery and elastically scalable front-end and back-end nodes.

# Roadmap

The main item in the roadmap for us is to keep up with Docker. Currently, the implementation provided in TLDR is not necessarily the _Docker way_, as Docker isn't currently addressing all capabilities that are part of our reference architecture -- yet; however, Docker is constantly providing new features and capabilities in each new release and we will update TLDR accordingly.

The full list of items in the roadmap is available from the [project's Github repo](https://github.com/Accenture/tldr/issues). 

# Reporting issues and Contributing

Even though we've done extensive testing on VirtualBox on Windows and OS X machines, as well as on AWS with Docker 1.10, it is likely that issues remain. As TLDR is open source and released under the Apache 2.0 license, so everyone is welcome to use it and contribute with issues and pull requests!

# Next steps

This is all for now. In future articles we'll go into implementation details of some of the most interesting capabilities such as service registration and discovery!