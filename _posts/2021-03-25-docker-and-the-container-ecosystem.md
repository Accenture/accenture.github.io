---
layout: post
title:  "Docker and the container ecosystem"
categories: docker containers opensource
author: matthias_leitner
comments: true
date: '2021-03-25 00:00'
---

# The container ecosystem 

_Note: “Docker and the container ecosystem” is the third and last part of a mini-series that covers fundamental concepts and core components of Docker and takes a brief look at further technologies in the container space._

****

The previous articles looked at the concepts behind containers and how Docker enables container virtualization based on the Docker Engine, containerd, and runc. While Docker significantly contributed to the rise of containers over the last decade (and even became a kind of a synonym for it), the container ecosystem is much larger, and a variety of interesting projects emerged in recent years. Hence, this article looks at Docker alternatives and shows how these technologies relate to the content covered in the previous articles.

The following list of projects is not exhaustive and is an opinionated selection. However, these projects already have a certain maturity level and are either backed by larger companies or have well-functioning communities. Additionally, they cover different levels of abstractions, i.e., the list includes Docker competitors (Container Engines) and lower-level alternatives that follow different trade-offs compared to containerd and runc.

## Podman
[Podman](https://podman.io/) is a container engine developed by RedHat and offers similar functionalities as Docker. It follows OCI standards and allows for managing and creating pods in addition to containers. On its [official website](https://docs.podman.io/en/latest/), Podman claims that you can simply alias the Docker command with Podman (alias docker=podman), and you can start using Podman without making further changes. Besides their similarities, there are important differences between both container engines. At its core, the Docker Engine runs a daemon process that listens to user requests, manages containers, creates images, and so on. In contrast, Podman is daemonless and uses runc directly to create and run containers following a fork/exec model. Hence, Podman avoids a single point of failure as it does not have to maintain a long-running daemon process. This daemonless architecture has additional implications for the system’s security. Podman enables users to run rootless containers, allows for UID separation using Linux namespaces, and integrates well with the audit feature from the Linux kernel, as it forks container processes from the Podman process rather than a daemon.

For anyone interested in learning more about Podman, there is a great talk from Dan Walsh, who leads the container engineering team at RedHat, available on [YouTube](https://www.youtube.com/watch?v=N0hSn5EwW8w). Additionally, he has also written an [article](https://opensource.com/article/18/10/podman-more-secure-way-run-containers) explaining how the fork/exec model impacts security in Podman.

## CRI-O
[CRI-O](https://cri-o.io/) emerged from Kubernetes and has similar capabilities as containerd. While Docker had been the default solution for running containers in Kubernetes, the community wanted to use Kubernetes on alternative container runtimes. Therefore, the Kubernetes team created the container runtime interface (CRI) that allows interoperability between Kubernetes and any container runtime that implements the CRI interface. CRI-O was the first container runtime that implemented the CRI interface. Additionally, CRI-O follows OCI standards and relies on runc to create and run containers.

For the last few years, CRI-O was not directly competing with containerd, although both projects are similar to some degree. Due to its multiple stakeholders, containerd did not implement the CRI interface. However, someone could use cri-containerd to utilize containerd in Kubernetes. cri-containerd can be seen as an abstraction layer that implements the CRI interface and translates calls between Kubernetes and containerd. However, since early October 2020, [cri-containerd](https://github.com/containerd/cri) had been integrated into containerd as a native plugin, allowing Kubernetes users to utilize containerd directly.

## Sysbox
[Sysbox](https://github.com/nestybox/sysbox) is an open-source container runtime originally developed by [Nestybox](https://www.nestybox.com/) and is a fork from runc. It enables containers to run software like systemd, Docker, and Kubernetes, without neglecting proper isolation. For example, running Docker inside a Docker container requires a privileged, and therefore unsecured, container. Sysbox addresses this problem by utilizing additional OS-level virtualization techniques that allows containers started through Sysbox to act as virtual servers.

## Firecracker
AWS originally developed [Firecracker](https://firecracker-microvm.github.io/) to power their serverless computing infrastructure (AWS Lambda and Fargate). They were looking for alternatives to traditional containers that are better suited for multi-tenant environments, i.e., has a higher level of isolation without losing lightweight and performance characteristics.

Hence, they developed Firecracker, a container-based solution that works with OCI compliant containers and introduces a novel Virtual Machine Monitor (VMM). It extends containerd (firecracker-containerd) and runc (firecracker-runc), and can be managed using an extended containerd API. firecracker-containerd uses a different snapshotter and includes a new control plugin as well as a runtime proxy that enables the communication between firecracker-containerd and running containers. Inside of a micro-VM runs an agent that communicates via the runtime proxy with firecracker-containerd. When a new container gets started, the control plugin mounts the container image's snapshot as a block device into the micro-VM and notifies the agent. The agent then forwards the command to runc, which is already deployed inside the VM, to run the container.

Firecracker is a powerful technology and comes with many nuances. For anyone interested in learning more about Firecracker, I highly recommend the Deep Dive talk from DockerCon 2019 on [YouTube](https://www.youtube.com/watch?v=0wEiizErKZw).

## Kata container
[Kata container](https://katacontainers.io/) is another open-source project that focuses on container isolation and sandboxing. It is managed by the OpenStack Foundation (OSF), fully OCI compliant, and implements the CRI interface. Hence, kata containers can be used on Kubernetes as well as with Docker.

On a high-level view, it has a very similar architecture compared to Firecracker. It utilizes lightweight VMs, runs agents inside the VMs, and establishes communication between the runtime and the containers via the agents and a proxy process. While Firecracker uses a novel VMM, the Firecracker VMM, kata container utilizes the qemu hypervisor per default. While qemu is a feature-rich hypervisor compared to Firecracker VMM, it also requires more resources to run. However, kata container and Firecracker announced a collaboration last year, and starting with kata container 1.5, users can now choose between qemu and the [Firecracker VMM](https://aws.amazon.com/blogs/opensource/kata-containers-1-5-firecracker-support/).

## Nabla
The [Nabla container project](https://nabla-containers.github.io/) started at IBM and focuses on creating isolated containers. Nabla limits the number of syscalls to the host for applications running inside of containers. That reduces the attack surface and achieves sandboxed environments. While Docker containers, for example, deal with more than 300 syscalls, Nabla reduces it to a maximum of 7.

Behind the scenes, Nabla utilizes unikernel techniques to link syscalls from containerized applications to OS libraries that run inside of every container. More specifically, Nabla uses [Solo5](https://github.com/Solo5/solo5), an execution environment for applications that were built for unikernels.

Additionally, Nabla runs containers using runnc (run-nabla-c), a container runtime based on runc that fully complies with OCI standards. Hence, Docker can be used to run Nabla containers with only a few adjustments. Nevertheless, this project is still in its early stage and misses essential features. The following list provides an overview of current limitations and future improvements: [https://github.com/nabla-containers/runnc#limitations](https://github.com/nabla-containers/runnc#limitations)

## gVisor
The [gVisor project](https://github.com/google/gvisor) enables sandboxed containers, implements the CRI interface, and provides a fully compliant OCI runtime, called runsc. Hence, it allows running sandboxed containers in Docker and with Kubernetes. gVisor is Google’s approach to run containers with VM-like isolation and without neglecting performance.

In gVisor, every container runs its own Linux kernel in the user-space as an unprivileged process. The guest kernel inside the container intercepts and processes syscalls. Furthermore, the guest kernel itself is restricted, and only a limited set of syscalls from the guest to the host kernel is allowed. In order to build a system that achieves this set of capabilities, Google re-implemented substantial parts of the Linux Kernel in Go and optimized it for running container workloads. Nevertheless, this comes at some cost. According to Google, syscalls are slightly more expensive, and as of now, the API of the Linux Kernel is not fully implemented. However, more than 200 out of 350 syscalls are already [supported](https://gvisor.dev/blog/2019/11/18/gvisor-security-basics-part-1/).

Looking at the projects covered in this article, many of them try to improve container security. Podman, containerd-cri, and Sysbox operate containers similar to Docker and mostly rely on security features from the Linux Kernel, e.g., secure computing mode (seccomp) or application armor (AppArmor), for making containers more secure. In contrast, Firecracker and Kata-containers follow a different approach by introducing a lightweight VMM to improve isolation and enable VM-like sandboxing capabilities without neglecting performance. Last but not least, Nabla and gVisor follow a completely different path to make containers more secure. Both of them run a lightweight kernel in each container that significantly reduces the number of syscalls to the host and decreases the attack surface.

&nbsp;

I hope this article shows that the container ecosystem provides many interesting projects and that containers are more than “just” Docker. If you think that an important or interesting project is missing, please leave a comment and let me know!
