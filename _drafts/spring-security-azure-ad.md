---
layout: post
title:  "Azure UserIDs for Grails Applications"
categories: azure oauth grails security
author: martin_hobson
comments: true
---
# Azure User Authentication for Grails Applications

If you've ever built a web application, you've had to deal with user IDs and passwords. If you're doing this for a side
job, or reinventing Java Pet Store, then you almost certainly used a local database of usernames and password hashes
(I do hope you're not storing the raw passwords!). This is great for prototyping, but isn't going to pass muster when
it's time to deploy in a corporate environment.

## Azure Active Directory

Accenture Federal Services (and Accenture global) is a big user of Office365, and in order to make this work at scale
for your entire user population, you must migrate your Microsoft Active Directory to Azure Active Directory. This
means that now Azure is the authoritative provider for your user IDs and passwords, and validation takes place 
"in the cloud."

Back in the days when we hosted our web applications in-house (within our corporate perimeter) and ran a Windows Active
Directory infrastructure, validating users against Active Directory was a simple matter of doing an LDAP lookup on the
Active Directory server. There were Spring Security modules available to do this, and the whole process was relatively
painless.

Now that both our web application and user authentication services are off-premises (AWS and Azure, respectively), we
have to adjust our process to take this into account. Sadly, Azure AD does not expose an LDAP lookup to us (can you
imagine what a juicy attack target something like that would be?), so we'll have to explore other options to integrate.

Interestingly, Azure AD does offer OAuth2 and OpenID interfaces for user authentication. OpenID is on the way out and
probably shouldn't be our first choice, while OAuth2 seems to be gaining momentum as a standard in the open source
world.

## So What Is OAuth, Anyway?

From the outside, it may seem that the OAuth standard is supposed to perform user authentication against a third party
authentication service - but that is not exactly what the standard covers. Instead, the standard covers a way to use
third party credentials to access third party web services without exposing the credentials to your web applications
and services.

Once you have access to these third-party web services (with your OAuth-issued ticket), you then have to use these
services to learn more about the user that you authenticated with - you need to be able to determine the username and
perhaps some user profile information via these services as this data is not visible during the OAuth authentication
process.

The OAuth process is covered by a standard, while the way you learn more about the user is not - this is
provider-specific and will be quite different for the different OAuth providers.

A good discussion of the overall OAuth2 flow is actually provided by 
[Microsoft](https://azure.microsoft.com/en-us/documentation/articles/active-directory-protocols-oauth-code/). 

## So how does this work with Spring Security?

In the world of Java web applications, Spring Security is a standard component. My application was built using
the Grails framework, which is a Java/Groovy/Spring-based web application starter kit. It makes building web
applications a snap and encapsulates (obfuscates?) the complex back-end technology. It also integrates well with
the Spring Security components - these are provided as Grails Plugins and can be dropped into most any Grails
project to perform user authentication.

There are also OAuth2 plugins that support Spring Security - and I focused on a 
[plugin](http://grails.org/plugin/spring-security-oauth) that had a variety of existing OAuth2 provider implementations.
My thinking was that I could reverse-engineer one of the existing provider implementations and create a new one
that was Azure-specific. The provider implementations handle the provider-specific parts of the user authentication.
They exercise the provider's services to determine further information about the user.

## The Azure AD OAuth Provider

After running the Google-based provider in captivity with a debugger attached, I began to understand how the provider
worked, and was able to identify the parts that would have to be modified to work with the Azure AD service. There
were two key components: The "claims" presented at the beginning of the provider flow, where you tell the provider
which of their services you will be wanting to use later, and then the actual username and profile data collection
at the tail end of the OAuth2 authentication process.

Azure AD provides user information via a REST service at 
["graph.windows.net"](https://azure.microsoft.com/en-us/documentation/articles/active-directory-graph-api-quickstart/).
I needed to build the client-side components to exercise the API and collect user information. With the Microsoft
documentation, and a few quick side trips to Stackoverflow.com, this turned into a straightforward matter, and I was
soon the proud owner of an Azure AD user authentication service!

## Corporate Nirvana

I then worked with our AFS IT team to get my web application added as an authorized client for our Azure AD service.
They were happy to help me get set up, and we first validated the approach against a test Azure AD instance that they
maintained. We then scheduled implementation on the production Azure AD service, and I worked with my user community
to educate them on the new sign-in process.

With the aid of tools provided by the AFS IT team, the business owners now had direct control over access to the web
application. Since the users also were using their AFS Enterprise IDs for sign-in, this eliminated the need for any
application-specific user ID maintenance tasks. While I was previously dealing with frequent requests for new users and
password resets, now I hear nothing - and the existing Enterprise passsword tools are serving us well.

