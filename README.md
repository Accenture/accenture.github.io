Accenture Lightweight blog
==========================
This repository holds the content for the Accenture Lightweight Architecture Blog at Github: https://accenture.github.io/blog.

The site is a handful of static HTML files, compiled with [Jekyll](http://jekyllrb.com)

Getting started
===============
1. Clone this repository
2. Install Ruby and Jekyll
3. Write some Markdown-formatted content in the ```blog/_drafts``` folder
4. Run ```jekyll serve --drafts``` to have a live preview of the content

Running Jekyll
==============
Jekyll can be run locally so that we can easily preview how our content is going to look like before it is published.

First, install Ruby if not present yet.

Second, install the Jekyll gem:

```
gem install jekyll
```

For OS X and Linux users, you'll probably need to run the previous command with `sudo`.

To start Jekyll and see your blog, se the following command:

```
jekyll serve  
```

The site will be available at [localhost:4000/blog/](http://localhost:4000/blog/).

Writing content
===============
Add your content to the `_drafts` folder for as long as it's not ready to be published. 

When ready, move it to the `_posts` folder and name it as follows: `YYYY-MM-DD-post-slug.markdown`. Rebuild the site to see the content.

Post metadata
=============
Each must post contain some YAML metadata at the very top:

```
---
layout: post
title:  "Some title"
date:   2015-11-26 08:45:44 +0200
categories: accenture opensource oss lightweight-architecture
---
```

Formatting
==========
Jekyll uses Markdown as the markup and formatting language, via the `kramdown` Ruby library. Please find a quick reference guide [here](http://kramdown.gettalong.org/quickref.html).

You’ll find this post in your `_posts` directory. Go ahead and edit it and re-build the site to see your changes. 

Code formatting support is provided by the Pygments library, which [supports over 100 languages](http://pygments.org/languages/).

More information
================
Check out the [Jekyll docs](http://jekyllrb.com/docs/home) for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll’s GitHub repo](https://github.com/jekyll/jekyll). If you have questions, you can ask them on [Jekyll Talk](https://talk.jekyllrb.com/).