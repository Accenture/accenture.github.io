---
layout: post
title:  "Smart(er) Docker images for Java Microservices"
author: dominik_wagenknecht
categories: accenture opensource oss lightweight-architecture docker
date: '2016-09-28 00:00'
---

# Smart(er) Docker images for Java Microservices

In this post I’ll show the first steps we generally use to package up Java base Microservices
(based on Dropwizard in this case) into a Docker container.

It’s nothing really new but with popular frameworks like [Dropwizard](http://www.dropwizard.io/) 
and [Spring Boot](https://projects.spring.io/spring-boot/) the very comfortable _fat JAR_ 
deployment style is now the de-facto standard for Microservices built in Java.

This is typically achieved by simply copying all classes of a project into 
one JAR + add meta-information about _where to start_. More advanced applications 
include re-location and stripping of classes, pioneered by the 
[Maven Shade Plugin](https://maven.apache.org/plugins/maven-shade-plugin/) 
now used throughout the ecosystem and in all build tools.

## Let’s go Docker!

Packaging this up in a docker image is **very** straightforward. Just add the JAR file, 
some base config, entry-point and you’re done! Let’s be smart and start out with a 
really bare-bones [OpenJDK based JRE base container](https://hub.docker.com/_/openjdk/):

```Dockerfile
FROM openjdk:8u92-jre-alpine

COPY ["app.jar", "config.yml", "/home/"]
ENTRYPOINT ["java", "-jar", "/home/app.jar"]
EXPOSE 8080 8081
```

This is _ok_ but has a serious drawback:

- Your big (we see common sizes ranging up to 80 MByte) _fat JAR_ is one layer in the Docker image
- Hence every small re-build in your CI (you commit early and often, right?) leads to a big 
  new layer that needs to be up- and re-downloaded
- This not only slows the build (shading all those JARs takes time) but 
  also makes the entire _just run the container_ kind of lame

But it turns out that most of the time only the code itself changes 
(= a few kByte JAR after build) and dependencies stay stable.

## Smarter Java based Docker images

So we go for this layering

1. Base layer(s) (fully cached till JRE / Alpine changes)
2. One layer with dependencies (mostly cached unless dependencies change)
3. Then comes the tiny layer with the freshly built-code (new every time)

The tricky part here is that the dependency layer will always be re-built in the CI chain
(no magic tricks) and we need to ensure that the hash value stays the same. After much experimentation 
and cross-platform (OS X behaved differently than Linux) we came up with the following strategy:

### Get dependencies dumped into a directory

This is straightforward in Maven, just call the 
[dependency plugin](http://maven.apache.org/plugins/maven-dependency-plugin/) 
(no POM modification needed). Preventing snapshot updates ensures the same dependencies 
are used as downloaded by the preceding build within the CI chain

```
mvn --no-snapshot-updates clean dependency:copy-dependencies
```

The result is a (big) set of files in `target/dependency`. When just adding those files into 
Docker we saw new hash values (and hence new image layers), probably triggered through 
metadata and/or sorting of files while copying. 

### Including dependencies as stable image layer

The final approach we came up with (and works robustly on OS X and Linux) is to TAR the 
files together with defined sorting and reset metadata and then add to the Docker image. 
So starting with the sorted TAR, moving it into main dir, re-setting it’s meta and 
doing an MD5 (so we can compare between builds):

```shell
(cd target && find dependency -print0 | sort -z | tar -cf dependency.tar --mtime='1970-01-01' --no-recursion --null -T - )
mv target/dependency.tar .
touch -t 200001010000 "dependency.tar"
md5sum dependency.tar
```

Then we modify the Dockerfile as follows. The 
[ADD](https://docs.docker.com/engine/reference/builder/#/add) 
command will unpack the files — these land in a `dependency` directory. 
Please not that we now have the dependencies in a separate directory 
and need to launch Java with the _classic_ classpath syntax, 
hence we need to add the main class:

```Dockerfile
FROM openjdk:8u92-jre-alpine
ADD dependency.tar /
COPY ["app.jar", "config.yml", "/home/"]
ENTRYPOINT ["java", "-cp", "/home/app.jar:/dependency/*:.", "com.my.awesome.AppStartsHere"]
EXPOSE 8080 8081
```

et voilà! 

## Final remarks

You now have a really slim and more importantly fast-updating Docker container because the 
dependency layers will already be cached in most situations. These dependencies could be 
further grouped, e.g. we could build an external and internal dependencies layer to take 
this idea even further. For us this was already sufficient :-)

To make the Docker Container really nice please don’t forget to add the usual _boilerplate_: 

- Labels referring to the Git commit that was built & version of Java package
- Docker [CMD](https://docs.docker.com/engine/reference/builder/#/cmd) default arguments to 
  get people running quickly and/or a good small starter script (the one from 
  [PostgreSQL can serve as inspiration](https://github.com/docker-library/postgres/blob/master/docker-entrypoint.sh))
- Base things like [dumb-init](https://github.com/Yelp/dumb-init) to combat possible 
  Zombie processes (which we have not yet seen with the OpenJDK) and especially 
  [su-exec](https://github.com/ncopa/su-exec) to switch to a non-root user (ideally the name of 
  your app for easy identification in `ps`)
