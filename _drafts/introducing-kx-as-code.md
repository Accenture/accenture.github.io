---
layout: post
title:  "Introducing KX.AS.CODE"
categories: kubernetes devops opensource
author: patrick_delamere

comments: true
---

#  Introducing KX.AS.CODE

Over the last couple of years we have been working on a solution to provide our DevOps engineers with a `playpit` for `learning`, `experimenting` and `innovating`. 

What started initially as a couple of static packer scripts, has since become a `powerful dynamic framework` for rolling out entire `environment landscapes`.

Most recently KX.AS.CODE was implemented at a major enterprise with the following goals (see [use case example](https://accenture.github.io/kx.as.code/Overview/Use-Case-Example/)):

- Dynamic `on-demand provisioning/destruction of test environments` in the public cloud
- End-to-end developer workstation to `enhance local quality assurance capabilities`

I like to describe KX.AS.CODE as follows.

>KX.AS.CODE is a dynamic fully configurable and customizable `local cloud like` `Kubernetes environment` with a number of functionalities you would expect to see when managing a `Kubernetes cluster` in the `cloud`, including an `ingress controller`, `local and network storage services`, `load-balancer`, `domain services`, `identity management`, `secrets management`, `remote desktop services`, a `certificate authority`... and the best bit, you can launch it very quickly from our Jenkins based configurator and launcher. See the [Quick Start Guide](https://accenture.github.io/kx.as.code/Quick-Start-Guide/)!
>
>Once the base services are up, KX.AS.CODE has a built in `App Store` for quickly installing additional solutions on top of the base outlined above, such as `Gitlab`, `Grafana`, `InfluxDB`, `SonarQube`, `NeuVector`, `IntelliJ IDEA`, `MSSQLServer`... and many many more!
>
>As a bonus, you also get a `desktop` for easily accessing and managing deployed applications. The desktop makes things easier, but if you prefer, you can also deploy KX.AS.CODE without it.

For a more detailed description and a full guide to KX.AS.CODE, visit our [documentation site](https://accenture.github.io/kx.as.code/).

## Screenshots

Here some impressions of KX.AS.CODE.

### Jenkins based launcher for building and launching KX.AS.CODE

Configure your KX.AS.CODE instance using the Jenkins based launcher. On this screen you can select between K3s and K8s amongst others.

![](/img/posts/introducing-kx-as-code/kx-as-code_configurator_select-profile.png)

### Hardware resource allocation for virtual machine(s)

Here you determine how much physical resource you want to allocate to the kx-main and the optional kx-worker node(s). The experience bar gives you a very rough indication as to the experience you may expect given the allocation.

![](/img/posts/introducing-kx-as-code/kx-as-code_configurator_resource-configuration.png)

### Optionally select application groups to install

You can also configure application groups that will be installed on first launch of KX.AS.CODE. More groups and individual applications can be added later.

![](/img/posts/introducing-kx-as-code/kx-as-code_configurator_template-selector.png)

### Review configuration and launch KX.AS.CODE

Once done configuring KX.AS.CODE in the launcher, you can review the settings and launch the KX.AS.CODE environment.

![](/img/posts/introducing-kx-as-code/kx-as-code_configurator_review-launch.png)

### KX.AS.CODE login screen

Depending on whether the defaults were changed or not, you can either log in with your own user, or the default `kx.hero`.

![](/img/posts/introducing-kx-as-code/kx.as.code_login_screen.png)

### KX.AS.CODE Desktop

This is the home of KX.AS.CODE from where you can launch the deployed applications, read manuals, test API calls, administer the VM, and so on.

![](/img/posts/introducing-kx-as-code/kx.as.code_desktop.png)

### KX.AS.CODE installed applications, as selected in the KX.AS.CODE Launcher

The applications folder show the icons of the applications that have been installed so far and are available to launch. Use `GoPoass` to get the password for accessing the application.

![](/img/posts/introducing-kx-as-code/kx.as.code_applications.png)

### Gitlab Installed to KX.AS.CODE

Here an example Gitlab application that was installed via the KX.AS.CODE automated install scripts.

![](/img/posts/introducing-kx-as-code/kx.as.code_gitlab.png)

### Administration Tools

The tools for administering some elements of KX.AS.CODE. More details will be published on the administration page (wip).

![](/img/posts/introducing-kx-as-code/kx.as.code_admin_tools.png)

### Application API Manuals

Since we are in the world of DevOps here, API documentation is important for automating any workflows. API documentation is automatically linked for all applications installed via KX.AS.CODE.

![](/img/posts/introducing-kx-as-code/kx.as.code_api_docs.png)

### Harbor Swagger API

If an application has a Swagger endpoint, this is also accessible via the API docs folder.

![](/img/posts/introducing-kx-as-code/kx.as.code_harbor_swagger.png)

### Postman API documentation

If an application has a Postman endpoint or public link, this is also accessible via the API docs folder.

![](/img/posts/introducing-kx-as-code/kx.as.code_mattermost_postman.png)

### Application Manuals

Administration and user manuals are useful if you are new to an application and want to read up on how it works.

![](/img/posts/introducing-kx-as-code/kx.as.code_application_user_manuals.png)

### Source code in VSCode

Since the original concept of KX.AS.CODE was all about sharing knowledge as code (it has since become so much more), a pre-configured VSCode is installed that includes all the KX.AS.CODE source code.

![](/img/posts/introducing-kx-as-code/kx.as.code_vscode.png)

### Credential Management with GoPass

All administration passwords for accessing all admin tools and applications are stored here. The passwords for the users are also available here.

![](/img/posts/introducing-kx-as-code/kx.as.code_gopass.png)

### Kubernetes Management with OpenLens

OpenLens, known as the Kubernetes IDE, displays information about the running workloads in Kubernetes and their status. It is useful for debugging if there is an issue with any of the workloads.

![](/img/posts/introducing-kx-as-code/kx.as.code_openlens.png)

### KX.AS.CODE Management with the KX.AS.CODE Portal (ALPHA)

The KX.AS.CODE portal makes adding and removing applications easier, and provides status on current installed items.

![](/img/posts/introducing-kx-as-code/kx.as.code_portal.png)

### KX.AS.CODE Portal - App Store

Applications and be removed and added from the KX.AS.CODE Portal's app store screen.

![](/img/posts/introducing-kx-as-code/kx.as.code_portal_applications.png)

### KX.AS.CODE Portal - Application Details

The application details screen shows more information about the application. It is also possible to execute tasks from this screen.
In the future, this screen will also allow the user to enter values for input arguments.

![](/img/posts/introducing-kx-as-code/kx.as.code_portal_application_details.png)

![](/img/posts/introducing-kx-as-code/executeTasksAemDispatcher.png)

### KX.AS.CODE Portal - Application Groups

Applications can be installed in integrated groups. This is still in development, so the install button currently does not execute the group installation.
See the [manual installations](Deployment/Manual-Provisioning/#installation-groups) page, on how to install the groups manually without the portal.

![](/img/posts/introducing-kx-as-code/kx.as.code_portal_application_groups.png)