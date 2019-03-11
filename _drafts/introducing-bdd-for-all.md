---
layout: post
title:  "Introducing BDD for All"
date:   2019-03-10 08:45:44 +0600
categories: bdd microservices testautomation
author: mike_parcewski
---

> Skip the B.S. and go right to the [repo](https://github.com/Accenture/bdd-for-all)

![BDD For All](https://github.com/Accenture/bdd-for-all/raw/develop/docs/samples/bdd-white-logo.png)

For the first half of my career in technology, requirements and testing were usually after thoughts.  Relying mostly on 
super coders, product expertise and luck we'd get through most releases and new product launches and sometimes even 
looked good doing it.

*Then came consulting*

This approach worked pretty well until it was no longer just *us* and we were expected to do the same with others 
requirements and products.  All of sudden, we were working with people whose minds we couldn't read and whose 
slang we didn't immediately understand.

> At first, we mired through it and were relatively successful, but that became more painful as we started to scale and the cracks in the facade became large and noticeable. 

### The Ghost in the Machine
Now remember, this is years ago (way too many for me to even admit) and process acronyms were at a suprising shortage, 
but there was a method to our madness.

*We always drove our early conversations with stakeholders around behavior.* 

This was the basis for our teams assumptions and if we were good up front collecting these, we could always meet 
(or beat) expectations, if not, we usually failed.

> The problem was, these would inevitably be translated using different grammar for tech, test, and other specs and this is where things started to fall apart.

### Enter Behavioral-Driven Development (BDD)
I remember reading about BDD back in the day, and like everything else (microservices, cloud, etc...) I was like we do 
that, just without the fancy name.  In the case of BDD, something that combines leading practices from test-driven 
development (TDD) and domain-driven design (DDD), I was actually wrong.

`The trick to BDD, I would come to find years later, wasn't the discussions, but the grammar.`

#### The aha Moment
I was taking this class about dealing with people from some wicked smart people from Harvard (bet you can hear the 
Boston accent).  In it, we discussed the [ladder of inference](https://www.extension.harvard.edu/professional-development/blog/solving-problem-problem-solving-meetings) 
and it's impact on our work relationships.

But as always, I was focused on our current project and as we were performing the breakouts and listening to the 
instructor, it dawned on me, that maybe the problem we were having in these latest client breakout sessions was that they 
were all working from their own rung of the ladder (or perception). 

A few days later, back from the class and in another client working session, I asked everyone to draw (in boxes) what a 
particular problem page looked like to them.  

> Not suprisingly, out of 7 folks, there were 4 completely different renderings of the page components.

#### Shared Grammar
That was when it all came together for me.  For the next few days we focused on ways to describe things, what we called 
back then our "literal language".  This was how we would come to describe behaviors, events, and more.  

`I'd like to say, things were great after that, but even with this shared grammar we still had to write code, tests, and 
more.  There was still room for interpetation, especially when scaling to the larger team.`

### Technology Catches Up
Over the years, we started to incorporate Cucumber and other tools as we got better.  Regardless of the type of work 
we were usually able to agree on a shared grammar and focus in on automation.

Now, fast forward to 2019 and years of API "transformation" at different organizations. We've blueprinted everything, 
DDD, microservices, adapters, platform and more, but I always felt like we were missing something when it came to BDD 
at organizations.

So we stepped back and realized we were re-creating the mythical wheel when it came to API's.  Yes it was important to 
have a shared grammar, but did we need to recreate each time?  Was defining a new "speak" for API's which were pretty 
much the same org to org the right thing to do?

`No!`

We had cucumber, we had tools like rest assured we usually put it together with.  So why not standardize this.

> Welcome [BDD For All](https://github.com/Accenture/bdd-for-all)

BDD For All is a JAVA (more languages to come soon) library that provides a simple grammar to support API development 
and testing.  It's also a test harness, using Cucumber, so you're team can practice TDD, automate their deployments 
and feel comfortable delivering API's day to day.

Some more features...

* Simplifies and streamlines your Test Driven Development (TDD) flows.
* Simple [integration with build tools](https://github.com/Accenture/bdd-for-all/tree/develop/docs/RUNNING.md#running) (Maven, Gradle, & SBT) as well as your DevOps pipelines (Jenkins, Bamboo, CircleCI, etc...).
* Test against any API's [regardless of language or platform](https://github.com/Accenture/bdd-for-all/tree/develop/docs/RUNNING.md#running-stand-alone).
* Standard, well tested [step definitions](https://github.com/Accenture/bdd-for-all/tree/develop/docs/GRAMMAR.md) that are easy to read/write for the entire business.
* Create complex flows with [request chaining](https://github.com/Accenture/bdd-for-all/tree/develop/docs/CHAINING.md) (e.g. search for and then edit record).
* Data generation, supporting over 40 locales out of the box
* Run within [your project](https://github.com/Accenture/bdd-for-all/tree/develop/docs/RUNNING.md#running) or as a [command line](https://github.com/Accenture/bdd-for-all/tree/develop/docs/RUNNING.md#running-stand-alone) program
* Option to log all requests as [cURLs](docs/OTHERFEATURES.md#curl-logging) to import into your favorite tools (postman, soapUI and more)
* Supports complex [Groovy GPath](https://github.com/Accenture/bdd-for-all/tree/develop/docs/GPATH.md) expressions for those cases that require additional complexity
* Easy to use with any test framework ([JUnit](https://github.com/Accenture/bdd-for-all/tree/develop/docs/RUNNING.md#running), TestNG, etc...) and works as a standalone library.
* Tests count towards your [code coverage](https://github.com/Accenture/bdd-for-all/tree/develop/docs/OTHERFEATURES.md#jacoco-code-coverage), reducing the need for unit tests.
* Simple [intuitive reporting](https://github.com/Accenture/bdd-for-all/tree/develop/docs/REPORTING.md) out of the box.
* [Expressions](https://github.com/Accenture/bdd-for-all/tree/develop/docs/OTHERFEATURES.md#running-select-tests-aka-tagging) that allow you easily choose what tests to run (e.g. smoke, regression, etc...).

Check out the [user guide](https://github.com/Accenture/bdd-for-all/tree/develop/docs) to learn how to use and learn about BDD For All's other exciting features.