# Getting started

1. Clone this repository
2. [Install Ruby and Jekyll](#installing-jekyll)
3. [Write some Markdown-formatted content and save it as ```<file>.md``` in the ```blog/_drafts``` folder](#writing-content)
4. [Run ```jekyll serve --drafts``` to have a live preview of the content](#testing-content)

Also have a look at the following for more information:

- [Formatting content](#formatting-content)
- [Working with drafts](#working-with-drafts)
- [Are you a new contributor? Add yourself a bio, picture and links to your social sites!](#adding-new-contributors)
- [Using New categories? Add a slug!](#adding-new-categories)

## Installing Jekyll

Jekyll can be run locally so that we can easily preview how our content is going to look like before it is published.

First, install Ruby if not available in your system.

Second, install the Ruby gems needed by Jekyll

```
gem install jekyll jekyll-paginate
```

For OS X and Linux users, you'll probably need to run the previous command with `sudo`. For Windows users, make sure that ```gem``` is in your PATH before running it.

## Writing content

Add your content to the `_drafts` folder for as long as it's not ready to be published. Save it as ```<file>.md```, do not specify any date while in draft state.

When ready, move it to the `_posts` folder and name it as follows: `YYYY-MM-DD-post-slug.markdown`. Rebuild the site to see the content.

Each must post contain some YAML metadata at the very top:

```
---
layout: post
title:  "Some title"
date:   2015-11-26 08:45:44 +0200
categories: accenture opensource oss lightweight-architecture
---
```

## Testing content

To start Jekyll and see your blog, se the following command:

```
jekyll serve
```

Use the following to serve the blog with draft posts:

```
jekyll serve --drafts
```

The site will be available at [localhost:4000/blog/](http://localhost:4000/blog/). Jekyll will regenerate the entire site every time a file is changed, so no need to restart the process after each content change - simply reload the page.

# Formatting Content

## Content formatting

Jekyll uses Markdown as the formatting language via the `kramdown` Ruby library. Please find a quick reference guide [here](http://kramdown.gettalong.org/quickref.html).

## Code formatting

In order to have code formatted, use the ```{% highlight %}``` macro:

```
{% highlight bash %}
echo "Hello, world!"
{% endhighlight %}
```

Code formatting support is provided by the Pygments library, which [supports over 100 languages](http://pygments.org/languages/). Please refer to the documentation for the list of language keys that can be provided to the hightlight macro.

## Content Assets

Blog content that uses images to enhance its message is supported and encouraged. In order to add images to a blog post, create a folder under ``ìmg/posts/```, preferably using a pattern such as ```<post-slug>``` so that it is straightforward to relate image assets to a specific blog post later on.

There are no restrictions to the type and size of image files, but please be conscious about browser support (JPG and PNG are preferred) as well as download size for mobile connections. Assets should be resized and compressed manually at the time of creation of the content, as Jekyll does not support dynamic manipulation of images.

Assets can be referenced from Markdown post content as follows:

```
![Alt text](/img/posts/<post-slug>/image.jpg)
```

No need to restart Jekyll when adding new images, as it will automatically detect the new file and copy it accordingly to the right folder.

# Working with drafts

TODO

# Adding new contributors

Each contributor can have his/her own picture, which will be displayed right next to each article authored by the given contributor. Additionally, each contributor can have an own page with a short bio and links to social media profiles.

In order to add a new author:

1. edit file ```_data/authors.yml``` and add a block like the following at the end:

```yaml
- slug: elizabeth_reed
  name: Elizabeth Reed
  bio: >
    This is a multi-
    line
    bio
  gravatar: 
  photo: /img/author/elizabeth-reed.jpg
  twitter: http://twitter.com/megarameno
  facebook: http://facebook.com/megarameno
  linkedin: http://linkedin.com/megarameno
```

Make sure to select a suitable slug, preferably ```<name>-<surname>```, and fill in social media links accordingly. 

2. Add the user's picture to in JPEG or PNG format to folder ```img/authors```. Preferably, name it just like the user's slug

3. Ensure that the ```author``` field in the metadata at the top of the post file refers to the author by his/her slug!

Save your changes, let Jekyll recreate the site and verify the results at [http://127.0.0.1:4000/contributors].

# Adding new categories

New categories must be defined so that they're visible in the Categories page.

In order to define a new category, add the following block to file ```_data/categories.yml```:

```
  - slug: lightweightarchitectures
    name: Lightweight Architectures
```