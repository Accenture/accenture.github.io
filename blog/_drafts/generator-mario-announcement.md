---
layout: post
title:  "Introducing Generator Mario!"
author: 
  - martin_lofaj
  - mario_macai
categories: html5
comments: true
---
# Introduction

**Mario** is a Marionette **Yeoman** generator for non-trivial Web applications.

It was developed in Accenture Open Web Platform Core Team located in Bratislava, Slovakia and can be found in [GitHub repository](https://github.com/Accenture/generator-mario).

## Motivation

Our motivation were existed Marionette generators, because most of them if not all are outdated. Every generator uses different code organization and naming convention, we chose organization by features and underscore naming convention. Although there is basic setup for supporting various naming conventions.

Another minus of existed generators is lack of tools versatility. We support multiple choices for testing frameworks (Jasmine, Mocha + Chai + Sinon), build tools (Grunt, Gulp, experimental Webpack + Grunt), ECMAScript languages(5, 2015) and more.

### Benefits

Benefits of using Mario generator are:
1. Initial project scaffold in few commands
2. Marionette type sub-generators(model, collection, views, ...)
3. No need to initially setup developer tools
4. Removed basic modules scaffolding phase => more time for actual code
5. New controller holding logic instead of views
6. Flexibility for developers to choose from ECMAScript versions(5, 2015) and set of their favorite tools

## Capabilities

First functionality is to scaffold project skeleton. Skeleton includes opinionated code organization structure where all files are divided into folders based on user requirements implemented as features and preconfigured development environment with automated testing, code quality checking, asset minification and bundling.

Second functionality are sub-generators to generate Marionette building blocks: model, collection, router, all type of views and our new introduced controller object. Besides this you are able to generate CRUD component which is basically list of items supported with create, read, update and delete operations. Last thing we prepared is Widget component that creates so called feature containing: model, collection, composite view, item view, controller and router.  

Every piece of code can be generated either in ECMAScript 5 or ECMAScript 2015 language. All sub-generators produce basic modules that should definitely speed up your development.

# Get Started

Here is simple showcase how to start and scaffold skeleton.

> Be sure you have installed NodeJS & npm on your machine!

## Environment Setup

{% highlight bash %}
# install yeoman scaffolding tool
$ npm install -g yo

# install bower
$ npm install -g bower

# install grunt cmd line tool
$ npm install -g grunt-cli
{% endhighlight %}

## Mario Generator

{% highlight bash %}
# Install Mario generator to Yeoman
$ npm install -g generator-mario

# Invoke mario generator
yo mario
{% endhighlight %}

Last command will start scaffolding the project and ask you several questions. After that it will take few minutes to install all dependencies and your application is ready.

To run application simply type
`grunt serve` or `gulp serve` depending on your initial setup

Next steps could be to use sub-generators via command:  
`yo mario:subgenerator_name directory_name`.  

For more informartion visit [GitHub repository](https://github.com/Accenture/generator-mario).

# Roadmap & Future Releases

## Make the generator modular

- separate modules into several repositories
- modules would encapsulate technologies (i.e. code generator, css preprocessor generator, test framework generator, task runner generator, etc. modules)
- motivation for this is to be able to swap technologies based on requirements

## Upgrade to NodeJS 4 LTS

- update code to nodeJS v4 (use some of the ES2015 syntax supported by node4 to reduce boilerplate)
- update dependencies (for generator itself but also for the generated code)

## Prepare for NPM3 and NodeJS 5+

- prepare dependencies for generator itself as well the generated code for npm3 style of dependency organization
