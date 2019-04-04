---
layout: post
title:  "Introducing the Waterfall Config Library for Java"
categories: java
author: sergiofgonzalez
---

# Hello, Waterfall Config!
![It's not really a waterfall](/img/posts/waterfall-config-announcement/the-sea-3018128_640.jpg)

We're proud to introduce [*Waterfall Config*](https://github.com/Accenture/waterfall-config), a simple configuration library for the JVM, heavily based on [Typesafehub Config](https://github.com/lightbend/config), with some additional features.

Waterfall Config was developed to solve one of the most common requirements in applications: handling configuration properties. Applications based on well-established frameworks such as [Spring](https://spring.io/) will have that capability out of the box, but even small programs should have the opportunity to avoid doing things, such as:

```java
// Note to self: change and rebuild when deploying to Heroku
String dbUrl = "jdbc:postgresql://localhost:5432/SportsStore"; 
```

This is especially important nowadays, when you will want your applications and services *deployable* to Cloud PaaS, and therefore should follow [The Twelve-Factor App](https://12factor.net/) Manifest.

Many frameworks will give you that, but if for some reason you should rely on *vanilla* Java, you might end up writing a lot of custom code or relying on old-school property files packaged with your application, which is not very flexible and error-prone.

## Waterfall Config to the rescue!
With Waterfall Config, you can add configuration properties and capabilities to your application in a very simple, lightweight and non-intrusive way.

Just add a dependency to *waterfall-config* in your project's POM,

```xml
<dependency>
  <groupId>com.accenture</groupId>
  <artifactId>waterfall-config</artifactId>
  <version>1.1.0</version>
</dependency>
```

Create a `common.conf` file under `src/main/resources/config` in your project. Then add the properties that you need:

```bash
# src/main/resources/config/common.conf

message.en: "Hello, to Jason Isaacs!"
message.es: "!Hola a Jason Isaacs!"
```

And you are ready start using externalized properties in your application:

```java
import static com.accenture.wconf.WaterfallConfig.*;

...
System.out.println(wconf().get("message.en")); // Tinkety Tonk Old Fruit
```

## Additional capabilities
If you are wondering whether Waterfall Config can do more than just pulling a message from a file, the answer is yes (otherwise the library would not be that useful, right?).

This is a summary of the library capabilities, so please make sure to go through the documentation on [Github](https://github.com/Accenture/waterfall-config) to learn the *ins and outs* of Waterfall Config:

+ Supports a **hierarchy of configuration property sources**: files packaged in the jar, Java system properties, environment variables, external files...
+ **Merge and overwrite operations** between sources: you can keep the basic config properties on a file and then extend them with environment variables. Access to values will be provided consistently by the same API `wconf().get()` independently of the source on which the property is defined.
+ Configuration property **encryption**: you can activate encryption for sensitive properties and use a Java key store to store the symmetric key.
+ Support for **profiles** &mdash: you can group a block of configuration properties under one name and enable them with a simple switch, so that only the properties on that block are considered.

```javascript
wconf_active_profile: test // this is the switch

dev {
  foo=in dev
  message=to be used in dev environment
}

test {
  foo=in test
  message=to be used in test environment  
}

production {
  foo=in prod
  message=to be used in prod environment
}
```

## Waterfall Config uses HOCON for configuration properties file syntax
Waterfall Config uses a not very well-known language called [HOCON](https://github.com/typesafehub/config#user-content-using-hocon-the-json-superset), that is a very flexible JSON superset.

It supports defining regular Java properties such as:

```javascript
foo.bar=foobar
```

It also allows you to use JSON:

```javascript
"ciphers": {
  "algorithm": "AES/CBC/PKCS5Padding"
}
```

Or JSON with comments (Yay!):

```javascript
"ciphers": {
  // use AES for encryption
  "algorithm": "AES/CBC/PKCS5Padding"
}
```

Or you can go all the way and use all the expressive features of HOCON:

```javascript
modes {                                   // no semi-colon or enclosing in double-quotes
  available: [encrypt, decrypt, geniv]    // arrays supported
  active: geniv
}

geniv {
  algorithm: "AES/CBC/PKCS5Padding"       // can optionally use doble-quotes
}
```

## But is this really only for small scale, vanilla-Java app?

I'm glad you asked ??

Actually, no. Although Waterfall Config was designed with that purpose in mind, the library has been used since then for applications of all sizes.

In particular, Waterfall Config has been really useful for big data and analytics applications running on [Apache Spark](https://spark.apache.org/docs/latest/index.html). Those types of applications typically run on a distributed infrastructure on which a master component coordinates and assigns tasks to many workers. 
In such scenarios, having a centralized, consistent and repeatable configuration properties system becomes really challenging &mdash; you don't want to end up having the master component seeing a different URL for your database than your workers, and you don't want to hardcode those values in your application's code either.

## What's next for Waterfall Config?
We're thinking about different ways to make the library better, such as:
+ Supporting cloud-based remote file systems
+ Remove JCEKS key stores in favor of PKCS12
+ Enabling support for Java 11.

If you want to contribute, feel free to fork and submit a pull request to the project at [https://github.com/Accenture/waterfall-config](https://github.com/Accenture/waterfall-config) where it will be kindly and carefully considered.
