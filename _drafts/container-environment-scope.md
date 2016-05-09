---
layout: post
title:  "Managing containerized microservices environments"
categories: accenture opensource oss lightweight-architecture docker kubernetes
---
# Managing containerized microservices environments
## on app catalogues
Installation of software has never been easier than today. With the central dockerhub, quay.io, gcr registries and kitematic or box it's easy to run software locally, in a sandboxed environment. For larger deployments, there are app catalogues available which provide the ability to run clusterized installations of distributed apps (rabbitmq, elasticsearch, redis, etc): kubernetes/helm, elastickube, kpm, openshift, to name a few.

It's easy to discover and run apps since the burden of dependency management is on the developer side, who provides the final artefacts (the container images and service description). It doesn't matter anymore which linux distribution is running underneath, be it CentOS, RedHat, CoreOS or something else

## on environments
Prior to containers artefacts were managed on an infrastructure level, e.g. an AWS AMI as the result of the build process. This has the downside of only being executable on the respective cloud provider, increased infrastructure costs and also longer provisioning times. With containers it's now possible to swap out whatever the (executable) build artefacts were, with a container image.

While containers provide isolated environments of resources, cluster application managers like kubernetes (which sits on top of docker/rkt) abstract from the underlying container technology to make it easy to deliver and manage microservices at scale. One particular  feature which enables that are namespaces. A namespace in kubernetes is an isolated environment, e.g. all containers running in a namespace can only interact with eachother and don't know anything about other environments (made possible via network policies). There is a default namespace, which is used when deploying an application without arguments, but it's easy to create new namespaces (`kubectl create ns $NAME`). This allows for using a single kubernetes cluster for the continuous delivery pipeline with different testing stages, but having isolated environments nevertheless.

## on tooling
The state of tooling has greatly improved since the early days of docker. Kubernetes, Rancher, Deis and OpenShift help to manage the huge amount of containers, overlay networks like calico, flannel and weave dns provide the migration path to cloud-native applications and auto-provisioning of storage allows for flexible scheduling of containers. There are dashboards for managing containers (e.g. elastico, kube-dashboard, ..) and cluster deployments tools like helm, kpm and spread. With pipelines like spinnaker or gocd it's possible to manage deployments to kubernetes, bringing CD pipelines to the container world.

![Weave Scope](/images/2016/05/container-environment-scope-1.png)

A good example on how tooling improved is weave scope. It collects container and network information at a low level and allows for graphical access, specifically:
* visualize microservice architecture
* direct access to logs
* shell inside the container
* watch cpu, memory consumption

![Weave Scope](/images/2016/05/container-environment-scope-2.png)

With the rise of environments it can be hard to keep the overview. Scope gives a boost in developer productivity, since it makes debugging easier and environments more approachable.

## looking forward

For environments it will be necessary to autoscale the infrastructure layer. On large scale deployments this could be leveraged through performance information from cluster-level apis like heapster.

The ecosystem is really thriving and there are lots of things to look forward. The standardization of container formats and protocols (appc, oci, ..) to make runtimes pluggable. Rkt e2e tests for kubernetes are already close to 100%, which is great for removing another pid0 process in the stack. This could even open the doors to deploy other formats to the cluster, for example jar archives.
