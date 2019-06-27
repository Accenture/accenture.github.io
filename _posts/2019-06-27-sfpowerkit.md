---
layout: post
title:  "SFPowerkit - Opensourcing our first Salesforce DX Plugin"
categories: devops sfdx salesforce
author: azlam_abdulsalam
comments: true

---

# SFPowerkit – A Salesforce DX Plugin for automating common tasks in Salesforce Deployment

*...How about using a command line interface (CLI) to create a sandbox and refresh it every sprint?*

---

Salesforce DX (Developer Experience) is revolutionizing the way development and deployment  is done.  It has uplifted the platform from a changeset
model (deploying a set of changes onto an existing deployed code/configuration)  to a source-based model. This is  powered by
a lot of  new features/tools that  Salesforce has bought into the platform during the last couple of years.

One of the most important element in DX, is Salesforce DX CLI, which provides a large collection of commands and
utilities to aid the development.  Salesforce DX CLI is  highly extensible, thanks to its underpinnings on heroku's oclif. 

This makes it easy to create plugins that can be applied across different aspects of the Salesforce Application Lifecycle Management(ALM). You can read about it
more in this [blogpost](https://andyinthecloud.com/2019/02/10/salesforce-dx-integration-strategies/)

<p align="center">
 <a href="https://andyinthecloud.com/2019/02/10/salesforce-dx-integration-strategies/">
  <img 
   src="/img/posts/sfpowerkit/dxintegrations.png"
   alt="DX Integration Strategies" />
  </a>
</p>


As part of the Accenture Salesforce Business Group in Australia/New Zealand, we have been adopting Salesforce DX for several projects, some of which are
greenfield and other multi year org's being transformed into a source driven model utilizing scratch orgs, unlocked packaging and the whole of Salesforce DX goodies.

SFPowerkit was born out of the need  to collaborate and standardize the plugins, which our Salesforce DevOps teams have found useful across these programs.

SFPowerkit includes a set of extensions to the Salesforce DX CLI  and features the following:


-  Sandbox Management
     *   Create/Refresh Sandbox
     *   Information about a sandbox
-  Connected App Management
      *  Create a connected App 
      *  Retrieve  the key for a connected app
-  Org Health Checks
      *  Apex test Coverage 
      *  Org Health Check
-  DX  Unlocked Package Related helper function
      *  Install dependencies of a sfdx project (Modification on awesome script by [Fabien](https://github.com/FabienTaillon)
      *  Validate the metadata of package whether it contains only second-generation packageable (2GP) pacakgeable components
-  Miscellaneous Helpers
      *  Trigger activation/ deactivation
      *  Duplicate rules activation / deactivation
      *  Matchig rules activation / deactivation
      *  Scatch Org count information
      *  Apex test suite to apex tests convertor

These commands can be utilized in your CI/CD pipelines to orchestrate your deployments and for  environment management.  We are actively working on this as we gather automation requirements across projects and will keep these commands updated and add new ones as we develop them.


## What's next?

Star it, share it, use it, fork it and don't forget to submit your pull requests.

We're excited to release our first milestone to the open source community.
Let us know what you think! Find us on
[Github](https://github.com/Accenture/sfpowerkit).



> **About Azlam Abdulsalam**
>
> Azlam is a Tech Arch with a particular interest on delivering iterative software.
> He is passionate about developer enablement utilizing plugins, frameworks and automation. 
> These days, he is focused on improving the speed and quality of Salesforce Development and is very much excited on Salesforce DX