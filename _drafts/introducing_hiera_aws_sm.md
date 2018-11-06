---
layout: post
title: "Introducing a Hiera 5 backend for AWS Secrets Manager"
author: david_hayes
categories: opensource devops puppet
comments: true
---
Hiera AWS SM - Hiera5 Backend for AWS Secrets Manager 
=====================================================

---

[Hiera AWS SM](https://github.com/accenture/hiera-aws-sm), is a Hiera 5 backend for Puppet, allowing Puppet to retrieve 
secrets from Amazon Web Service's SecretsManager.

Wait, what's Puppet?
--------------------

[Puppet](https://puppet.com/products/how-puppet-works) is an opensource configuration management tool. It lets you define
the resources you want to exist in your environment, as well as their
required state. For example, lets say you want to ensure a particular file
exists on all nodes in your environment. You could achieve that using
a snippet of Puppet code like this:

```
file { '/opt/myfile':
    ensure  => 'present',
    content => 'Hello World!',
}
```

Puppet would create your file containing the string 'Hello World!' if it
didn't already exist. If someone removed the file, or changed it's
contents, Puppet would automatically change it back to the desired state
the next time it ran. Additionally, through it's reporting, Puppet gives
you the ability to audit the actions that were taken to reach the desired
state, allowing you to tell that your resource was changed in some way. 

Puppet is a key tool for automation and Infrastructure as Code, with
[thousands of opensource modules](https://forge.puppet.com/) for a variety of services, platforms and
applications.

What's Hiera then?
------------------

[Hiera](https://puppet.com/docs/puppet/6.0/hiera_intro.html) is a key/value lookup tool for Puppet. It allows you to separate
your site specific data from the Puppet code that implements it, by
storing it in a hierarchical YAML structure. 

This lets you write nice generic Puppet code, that can be shared between
multiple environments or projects, without each environment needing to
know the data for each other. 

In our little example above, we could use Puppet's [lookup](https://puppet.com/docs/puppet/5.4/man/lookup.html) 
function to pull our file content from Hiera, rather than storing it directly in our puppet code:

```
-- common.yaml
myfile_content: "Hello World!"

-- manifest.pp
file { '/opt/myfile':
    ensure  => 'present',
    content => lookup('myfile_content'),
}
```

Hiera sounds great! What's the problem?
---------------------------------------

Lets say, that rather than writing the string 'Hello World!' into our
file, what we want to write is a password, or other sensitive data.

In the first example, where our code and data existed in the same place, 
sharing our Puppet code, also meant sharing our secret data! Not great. 

The second example, using Hiera, is a little better. Now our Puppet code
contains no secret data, and instead that secret data resides in a Hiera
YAML file. 

Typically, hiera data is stored in a separate private repository, whereas
your generic Puppet code might be opensource. However, imagine we want to
let another team member manage some part of the Hiera repository that
relates to their work. We give them access to the repository, and now they
can see our secret data in plaintext!

One solution is to store our Hiera data in an encrypted form, using
a solution like [hiera-eyaml](https://github.com/voxpupuli/hiera-eyaml),
but an even better solution is to have Puppet dynamically and securely
retrieve the secret information _when_ it needs it, rather than storing it
in YAML at all.

What about Secrets Manager? What does that do?
----------------------------------
It manages secrets!

Amazon Web Services [Secrets Manager](https://aws.amazon.com/secrets-manager/) is a 
secure secrets storage service offered by Amazon. It lets you safely store and 
audit secret data in a central location with fine grained access control. 

All your secrets stay encrypted while at rest and in transit, and it integrates
with AWS' logging and management services so you can audit the use,
creation and deletion of secrets.

How does this module work?
--------------------------

This module allows you to link AWS SecretsManager with your Hiera backend, 
allowing your Puppet server to dynamically lookup and retrieve secrets.

Using this module, you no longer store your secret information in Hiera,
or in your Puppet code, but rather, just a _reference_ to your secret
data. 

![Puppet Workflow](/img/posts/introducing-hiera-aws-sm/workflow.svg)

The Puppet master, whilst compiling the catalog for the node, sees the
reference to our secret data. As it can't find the data for that reference
anywhere in the Hiera hierarchy, it makes a request to AWS' Secrets
Manager to see if the secret exists there. 

If it exists, _and_ our Puppet master has the correct permissions in AWS
to access our secret data, Secrets Manager returns the secret to the
Puppet master, encrypted in transit via SSL. Our master node finishes
compiling the catalog, and sends it, again encrypted via SSL, to our agent
node, in order to be deployed.

What are the benefits?
----------------------

1. Our Puppet code and Hiera no longer needs to contain secret data in
   plaintext, or encrypted data that's more cumbersome to manage.
2. We can happily share our Puppet code, or allow access to our Hiera
   data, without giving access to our secret data.
3. The security team now has a centralised location to audit and manage 
   any secrets required by our Puppet deployment.

My project isn't running in AWS, can I still use this module?
-------------------------------------------------------------

Yes! This module works anywhere you could make a request to the AWS
Secrets Manager API, meaning you could use it to manage secrets in an
on-prem or hybrid cloud environment also - provided those secrets were
stored in Secrets Manager.

How do I use it? 
----------------

Check out the README in our [Github repo](https://github.com/accenture/hiera-aws-sm), or on the modules page on
[PuppetForge](https://forge.puppet.com/accenture/hiera_aws_sm)!



