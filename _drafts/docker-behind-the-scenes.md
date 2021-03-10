---
layout: post
title:  "Docker - Behind the Scenes"
categories: docker containers java opensource
author: matthias_leitner
comments: true
---

# Docker - Behind the Scenes

_Note: “Docker: Behind the Scenes” is the first part of a mini-series that covers fundamental concepts and core components of Docker and takes a brief look at further technologies in the container space._

****

Since its first release in 2011, Docker continuously conquered the world of containers. Today, Docker is a well-known term for most developers, and many companies utilize Docker containers in their software development cycles. Due to its popularity, the web is full of articles and how-to's about Docker. So, why do we need another blog post?

Many resources on the web cover the basic components of Docker (daemon, registry, etc.) or dive into the Docker Engine (Docker CLI, REST API, Docker Daemon) itself. However, many conversations I had with colleagues or clients in the past about container deployments and resource utilization in environments started with statements like “We can’t run more than five containers. Virtualization is not cheap.” or “Let’s deploy five additional containers. We should be fine because Docker is a lightweight virtualization technology.”. Sometimes, both statements occurred in the same conversation, and a discussion about “lightweight virtualization” started. Although everyone was familiar with Docker and was able to work with it on a day-to-day basis, the fundamental concepts behind Docker containers were not that widely known. Hence, this article addresses the concepts behind (Docker) containers and tries to make the term “lightweight” a little less abstract.

Containers package application code, libraries, runtimes, etc., into a single shippable unit, and for processes running inside a container, it appears as they have their own dedicated environment. (Well, that’s not fully true, but more on that later.) Basically, Docker employs several features of the Linux kernel to achieve lightweight virtualization and utilizes the following [key concepts](https://docs.docker.com/get-started/overview/):
* Namespaces
* Control groups (cgroups)
* Union file systems (UnionFS)
* Container format

## Namespaces
Linux namespaces were introduced to the Linux kernel in [version 2.4.19](https://lwn.net/Articles/531114/) in 2002. However, it was not until [Linux 3.8](https://lwn.net/Articles/532593/) that the implementation was mostly completed. [Namespaces](https://man7.org/linux/man-pages/man7/namespaces.7.html) provide isolation capabilities to containers. They wrap global resources into an abstraction that isolates a process from the rest of the system. Docker uses namespaces such as:

* pid: Process IDs inside containers are independent of the host, i.e., you will find a process with ID 1 both on the host and inside a container.
* net: The network namespace isolates network-related resources like network interfaces, IPv4 and IPv6 protocol stacks, IP routing tables, etc.
* ipc: IPC stands for interprocess communication and the ipc namespace manages access to IPC resources.
* mnt: The mount namespace limits the list of mount points seen by the processes inside of containers.
* uts: Running the “hostname” command inside a container will lead to a different result than on the host OS. The uts namespace is responsible for this and isolates system identifiers.
* user: Due to the user namespace, containers have their own set of user and group IDs.

To get a better understanding of namespaces, let’s look at a brief example. Assume we have a Linux machine as a host computer and have already started a Docker container. Thanks to Linux's everything-is-a-file feature design[^1], we can then inspect the container's namespaces from the host. First, as the container itself is a process on the host, we need the process ID of the container. We get the container pid with

````bash
{% raw %}docker inspect -f '{{.State.Pid}}' <container_id>{% endraw %}
```

The namespaces of the container are located in "/proc/\<container_pid\>/ns". To inspect, for example, the network interfaces in the container from the host, we can simply create a symlink to the network namespace of the container by executing

````bash
sudo ln -sf /proc/<container_pid>/ns/net "/var/run/netns/myContainerNetNs"
```

on the host. We can then use the ip command on the host to execute commands inside the container's network namespace. For example,
```bash
sudo ip netns exec myContainerNetNs ip a
```

lists the network interfaces from the container.

## Control groups
While namespaces are responsible for resource isolation, they do not restrict or limit access to system resources like CPU, memory, etc. That’s what control groups (cgroups) are for. [cgroups](https://www.kernel.org/doc/html/latest/admin-guide/cgroup-v2.html) have the capabilities to limit system resources for a set of processes, prioritize CPU usage and I/O throughput, monitor resources, and control the set of processes, i.e., by starting and stopping them at once. cgroups allow for dynamic reconfiguration at runtime and can be re-established at boot time, making them persistent across reboots.

So, by simply configuring the proper resources for a Docker container, our “dockerized” application will be a good citizen, utilizes only resources that were assigned to the container and is completely unaware about the host, right? Unfortunately, that is not always the case. A good example is running “older” Java applications inside a Docker container using the default JVM parameters. Some Java 8 versions are unaware that they run inside containers and, for example, allocate their default heap size based on the memory of the host. When the utilized heap memory of the JVM exceeds the memory limit of the Docker container, it will run into an Out-of-Memory state and the container gets killed. The reason is that especially older applications were not designed with cgroups in mind, as cgroups were added to the Linux kernel in [version 2.6.24](https://kernelnewbies.org/Linux_2_6_24). Java fixed that issue in [8u191](https://www.oracle.com/java/technologies/javase/8u191-relnotes.html) and backported these changes to [8u131](https://blogs.oracle.com/java-platform-group/java-se-support-for-docker-cpu-and-memory-limits). Besides older Java versions, tools like top and free have issues in dealing with containers properly as well. They check the memory using /proc/meminfo, which contains memory information about the host, even inside a Docker container. You can check that by simply connecting inside a Docker container and running cat /proc/meminfo. It will print the memory information of your host machine rather than the container.

## Union file systems
The union file system (UnionFS) enables storage efficiency for Docker images and containers. UnionFS transparently overlays a set of files and directories, known as branches, and forms a single, coherent file system out of multiple branches. Additionally, Docker uses UnionFS with a copy-on-write strategy. When changes get applied to a Docker image, it creates a new layer on top that does not affect layers below. This enables Docker to propagate changes efficiently, as only layer updates need to be distributed.

Besides images, Docker containers benefit as well. The copy-on-write approach and UnionFS avoid duplications when running containers. Without UnionFS, Docker would need to copy the whole image when creating a new container instance of an image.

UnionFS is a powerful tool for managing file systems, and a detailed description would go beyond the scope of this article. However, if you are interested in more details, I can recommend the "[Kernel Korner – Unionfs](https://www.linuxjournal.com/article/7714)" article in the Linux Journal as well as the official Docker documentation about [storage drivers](https://docs.docker.com/storage/storagedriver/).

## Container format
Docker wraps namespaces, cgroups, and UnionFS together into a so-called container format. In its early days, Docker used the Linux container format (LXC) per default. In order to improve the stability of Docker and make it more independent of LXC, libcontainer was introduced in version 0.9. It has since become the [default format](https://www.docker.com/blog/docker-0-9-introducing-execution-drivers-and-libcontainer/) for Docker. libcontainer comes with a library written in go and provides an abstraction layer that standardizes packaging, delivering, and running containers. It is now part of the Open Container Initiative (OCI), but more information on that will follow in the subsequent articles.

&nbsp;

To sum it up, Docker containers utilize namespaces to virtually isolate applications and code running inside of a container, limit system resources with cgroups, store container images efficiently using the UnionFS, and package everything into a proper container format based on libcontainer (per default).

&nbsp;

[^1]: Linux uses a virtual file system in /proc to provide information about processes. Each process running on the system corresponds to one subdirectory in /proc.
