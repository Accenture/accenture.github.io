---
layout: post
title:  "Azure UserIDs for Grails Applications"
categories: azure oauth grails security
author: martin_hobson
comments: true
---
# Azure User Authentication for Grails Applications

If you have ever built a web application, you have had to deal with user IDs and passwords. If you are doing this for a side
job, or reinventing Java Pet Store, then you almost certainly used a local database of usernames and password hashes.
(I do hope you are not storing the raw passwords!) This is great for prototyping, but is not going to pass muster when
it is time to deploy in a corporate environment.

## Azure Active Directory

Microsoft provides a user authentication and authorization service via its Azure cloud services--
["Azure Active Directory"](https://azure.microsoft.com/en-us/documentation/articles/active-directory-whatis/).
This is being adopted by a large number of organizations and can serve as a master repository of user IDs. This tool
can take the place of your organization's internal Active Directory services.

Back in the days when Accenture hosted its web applications in-house (within our corporate perimeter) and ran a Windows Active
Directory infrastructure, validating users against Active Directory was a simple matter of doing an LDAP lookup on the
Active Directory server. There were Spring Security modules available to do this, and the whole process was relatively
painless.

Now that both our web application and user authentication services are off-premises (AWS and Azure, respectively), we
have to adjust our process to take this into account. Since Azure Active Directory does not expose an LDAP lookup to us, we have to explore other options to integrate.

Interestingly, Azure Active Directory does offer OAuth2 and OpenID interfaces for user authentication. OAuth2 seems to be gaining momentum as a standard in the open source world so I chose that option.

## What is OAuth?

From the outside, it may seem that the OAuth standard is supposed to perform user authentication against a third-party
authentication service, but that is not exactly what the standard covers. Instead, it covers a way to use
third-party credentials to access third-party web services without exposing the credentials to your web applications
and services.

Once you have access to these third-party web services (with your OAuth-issued ticket), then you have to use these
services to learn more about the user that you authenticated with. Note: You need to be able to determine the username and
perhaps some user profile information via these services as this data is not visible during the OAuth authentication
process.

The OAuth process is covered by a standard, while the way you learn more about the user is not. The latter is
provider-specific and will be quite different for the different OAuth providers.

A good discussion of the overall OAuth2 flow is provided by 
[Microsoft](https://azure.microsoft.com/en-us/documentation/articles/active-directory-protocols-oauth-code/). 

## How does this work with Spring Security?

In the world of Java web applications, Spring Security is a standard component. My application was built using
the Grails framework, which is a Java/Groovy/Spring-based web application starter kit. It makes building web
applications a snap and encapsulates the complex back-end technology. It also integrates well with
the Spring Security components; these are provided as Grails Plugins and can be dropped into almost any Grails
project to perform user authentication.

There are also OAuth2 plugins that support Spring Security, and I focused on a 
[plugin](http://grails.org/plugin/spring-security-oauth) that had a variety of existing OAuth2 provider implementations.
My thinking was that I could reverse-engineer one of the existing provider implementations and create a new one
that was Azure-specific. The provider implementations handle the provider-specific parts of the user authentication.
They exercise the provider's services to determine further information about the user.

## The Azure Active Directory OAuth provider

After running the Google-based provider in captivity with a debugger attached, I began to understand how the provider
worked, and I was able to identify the parts that would have to be modified to work with the Azure Active Directory service. There
were two key components: the "claims" presented at the beginning of the provider flow, where you tell the provider
which of their services you will be wanting to use later; and then the actual username and profile data collection
at the tail end of the OAuth2 authentication process.

Azure Active Directory provides user information via a REST service at 
["graph.windows.net"](https://azure.microsoft.com/en-us/documentation/articles/active-directory-graph-api-quickstart/).
I needed to build the client-side components to exercise the API and collect user information. With the Microsoft
documentation, and a few quick side trips to Stackoverflow.com, this turned into a straightforward matter. Soon I was
 the proud owner of an Azure Active Directory user authentication service!

Using this new capability, I was able to validate users against an Azure Active Directory instance. Using off-the-shelf
tools that interact with the Azure Active Directory, my business owners now have direct control over access to the web application. Since the users also were using their existing Azure IDs for sign-in, this eliminated the need for any application-specific user ID maintenance tasks. While I was previously dealing with frequent requests for new users and password resets, now I hear nothing. Processes that already exist to manage and reset users are taking over for me.

## Just show me the code!

The code that provides this capability is in the 
[Accenture github repository](https://github.com/Accenture/grails-spring-security-oauth-azure).
