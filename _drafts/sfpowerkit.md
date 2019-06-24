---
layout: post
title:  "SFPowerkit - Opensourcing our first Salesforce DX Plugin"
categories: devops sfdx salesforce
author: azlam_abdulsalam
comments: true

---

# SFPowerkit – A Salesforce DX Plugin for automating common tasks in Salesforce Deployment

*...How about using a CLI to create a sandbox and refresh it every sprint?*

---

Salesforce DX is revolutionizing the way development and deployment  is done.  It has uplifted the platform from a changeset 
(deploying a set of changes onto an existing deployed code/configuration) model to a source based model. This is  powered by
a lot of  new features/tools which Salesforce has bought into the platform during the last couple of years.

One of the most important element in DX, is Salesforce DX CLI.  Salesforce DX CLI provides a large collection of commands and
utilities to aid the development.  Salesforce DX CLI is  highly extensible, thanks to its underpinnings on heroku's oclif. 
This makes it easy to create plugins that can be applied across different aspects of the Salesforce ALM. You can read about it
more in this [blogpost](https://andyinthecloud.com/2019/02/10/salesforce-dx-integration-strategies/)

<p align="center">
 <a href="https://andyinthecloud.com/2019/02/10/salesforce-dx-integration-strategies/">
  <img 
   src="/img/posts/sfpowerkit/dxintegrations.png"
   alt="DX Integration Strategies" />
  </a>
</p>


We at Salesforce Business group in ANZ, have been adopting Salesforce DX for a number of projects, some greenfield and other transforming
utilizing scratch orgs, unlocked packaging and the whole of Salesforce DX goodies.

SFPowerkit was born as need to collaborate and standardize the plugins which our Salesforce DevOps teams have found useful across these programs.

SFPowerkit includes a set of extensions to the Salesforce DX CLI  and features the following


-  Sandbox Management
     *   Create/Refresh Sandbox
     *   Info about a sandbox
-  Connected App Management
      *  Create a Connected App 
      *  Retrieve  the key for a connected app
-  Org Health Checks
      *  Apex Test Coverage 
      *  Org Health Check
-  DX  Unlocked Package Related helper function
      *  Install Dependencies of a sfdx project (Modification on awesome script by [Fabien](https://github.com/FabienTaillon)
      *  Validate the metadata of package whether it only contains 2GP pacakgeable components
-  Miscellaneous Helpers
      *  Trigger Deactivation/Activation
      *  Duplicate Rules Activation / Deactivation
      *  Matchig Rules Activation / Deactivation
      *  Scatch Org Count Info
      *  Apex Test suite to apex tests convertor

These commands can be utilized in your CI/CD pipelines to orchestrate your deployments and environment management.  We are actively working on this as we gather automation requirements across projects and will keep these commands updated and new one's added as times go by.


## What's next

Star it, share it, use it, fork it and don't forget to submit your pull requests.

We're excited to release our first milestone to the open source community.
Let us know what you think! Find us on
[Github](https://github.com/Accenture/sfpowerkit).



> **About Azlam Abdulsalam**
>
> Azlam is a Tech Architect with a particular interest on delivering iterative software.
> He is passionate on developer enablement utitilzing plugins, frameworks and use of automation. 
> These days, he is focused on improving the speed and quality of Salesforce Development and is very much excited on Salesforce DX