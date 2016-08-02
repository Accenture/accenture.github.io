# The DevOps Platform

The [DevOps Platform (aka ADOP)](http://accenture.github.io/adop-docker-compose/) is an integration of Open Source tools that is designed to provide the capability to perform Continuous Delivery (CD).  Out of the box the platform contains tools to store, version, build, test and release application and infrastructure code via CD pipelines.  The platform also supports two forms of extensibility:
- Platform Extensions - to add more tools
- Cartridges - to load into the platform example code and automation jobs for a particular application.

For evaluation purposes the whole platform can be run on one machine using this [quickstart script](http://accenture.github.io/adop-docker-compose/docs/quickstart/), or you can jump straight to running a instance in a multi-availabilty zone Docker Swarm using this [Cloud Formation script](https://github.com/Accenture/adop-docker-compose/tree/master/provision/aws/swarm).

Within 30 minutes anyone using ADOP can:
1. Stand up all of the tools
1. Load-in an application and the associated pipelines, automated tests and environment creation automation
1. Create environments
1. Make code changes to the application
1. Watch those changes get deployed to the environments via a CD pipeline.

>This allows you to perform Continuous Delivery-first development (as opposed to first writing code and then wondering about environments and release automation later).

For example you might chose to:
1. Stand up ADOP in AWS
1. Load the [Spring Petclinic Java cartridge](https://github.com/accenture/adop-cartridge-java)
1. Create a Test and Production environment
1. Clone the Petclinic code from your ADOP instance, update the UI in the Petclinic application and push it back to ADOP
1. Watch the CD pipeline compile your code, run the unit tests, perform static code analysis, perform a deployment, run functional, security, and performance tests and deploy the code to half of Production (as it waits for you to confirm whether to deploy to the other half).

Not bad for 30 minutes!

## Why did we create this?
Back in 2012 some of us were starting to find ourselves repeatedly installing tools like Jenkins, Gerrit, etc. for different projects we worked on.  We were also starting to get into Chef and decided it would be neat if we could use it to stand up the tools.  We had some success doing this, but installations were often fraught with problems due to the cookbooks failing to download dependencies.  This method also required initial effort to provision the Chef Server, the servers, and to bootstrap them to Chef (so that the servers could converge and install the tools).  End to end things took several hours.

Mid-2014 we ported to Cloud Formation and Docker and the ease and predictability with which this allowed us to stand-up the tools was game changing.  We spotted an opportunity to use ADOP as a lab environment on our training courses where every student would get their own instance.  For a while more and more usecases came along and we responded tactically by bolting new things onto the platform.  Eventually we built the extensibility framework in the form of cartridges and platform extensions.
These days we find ADOP extremely valuable for:
- Bringing the concepts of Continuous Delivery and infrastructure code to life (almost instantly and almost anywhere)
- Allowing people to learn how to use and extend the tools
- Starting real development knowing you want CD from day 1
- Sharing automation such as the ability to create particular environments, the ability to create great CD pipelines, and the ability to build great automated deployments and testing.

## What's in the box?
By default (at the time of writing) ADOP comes with:
- Gerrit (to manage Git repositories and peer review lifecycles if required)
- Jenkins (as the orchestrator of all automation within the platform (including loading Platform Extensions and Cartridges)
*  Various things Jenkins is able to run such as:

    *  Maven, Ant, NODEJS (for automated build etc.)
    *  Docker (for building or running containers e.g. to perform tasks or form environments)
    *  Cucumber (for BDD)
    *  Gatling (for performance testing)
    *  OWASP ZAP (for security testing)
    *  SonarQube (for static code analysis)
    *  Nexus (for storing binary artefacts)
    *  Selenium Grid (for browser testing)
    *  Logstash (the ELK stack) (for log aggregation from the both platform and from environments you create using the platform)
    *  Sensu (for monitoring the platform and environments you create using the platform)
    *  NGINX (as a reverse proxy)
    *  OpenLDAP and a browser (for a local user directory for authentication)
    *  PWM (for password resets)

## Adding things to the box
Platform extensions we have so far include:
* A Chef Server
* A generic create AWS instance from an AMI runner

Cartridges we have so far include:

* Java Spring Petclinic (cliched we know)
* A Chef cookbook pipeline
* A Docker image pipeline

## Getting Started
Naturally we have tried to make getting started as simple as possible.  The instructions for quickstart are [here](http://accenture.github.io/adop-docker-compose/docs/quickstart/).  Once you are familiar with the tools and have loaded the extensions and cartridges you need the next step is either to consider whether you need a more resilient instance for example by using our Docker Swarm version Cloud Formation script [here](https://github.com/Accenture/adop-docker-compose/tree/master/provision/aws/swarm).  Then you are free to start using ADOP to power your delivery, or even to start building new platform extensions or cartridges.

## Roadmap
As we continue to find increased interest and user of the platform, we are driving improvements ourselves in the following ways:
* Adding more cartridges with the intention that more and more technologies and sample applications can be bootstrapped on the tool (for CD-first development)
* Adding more platform extensions for example a Puppet Server or Ansible Tower
* Extending the cartridge and platform extension loaders to make writing them easier and more efficient.  Note we are committed to doing this in a backwards compatible manner and do not expect to render existing cartridge and platform extensions unloadable.
* Prove more hosting providers.  Storage and compute resources permitting, theoretically ADOP will run out of the box anywhere Docker is installed, be that a single machine, a Docker Swarm, or a container PaaS that supports docker-compose.  However so far we have only used it on single instances in AWS, Azure, GCP and on prem, and in a Docker Swarm on AWS and Azure.
*  Improving the operability of the platform.  Whilst many people will choose to first experience ADOP by installing it on a single machine, we also have been enhancing the AWS Cloud Formation script to provide a more resilient architecture.

Hopefully see you in our [Gitter room](https://gitter.im/Accenture/ADOP)!

