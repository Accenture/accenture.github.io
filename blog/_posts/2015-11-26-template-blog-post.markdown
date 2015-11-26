---
layout: post
title:  "Sample Accenture Lightweight blog post"
date:   2015-11-26 08:45:44 +0200
categories: accenture opensource oss lightweight-architecture
---
Running Jekyll
==============
First, install Ruby if not present yet.

Second, install the Jekyll gem:

{% highlight bash %}
gem install jekyll
{% endhighlight %}

For OS X and Linux users, you'll probably need to run the previous command with `sudo`.

To start Jekyll and see your blog, se the following command:

{% highlight bash %}
jekyll serve  
{% endhighlight %}

The site will be available at [localhost:4000/blog/](http://localhost:4000/blog/).

Writing content
===============
Add your content to the `_drafts` folder for as long as it's not ready to be published. 

When ready, move it to the `_posts` folder and name it as follows: `YYYY-MM-DD-post-slug.markdown`. Rebuild the site to see the content.

Post metadata
=============
Each must post contain some YAML metadata at the very top:

~~~
---
layout: post
title:  "Some title"
date:   2015-11-26 08:45:44 +0200
categories: accenture opensource oss lightweight-architecture
---
~~~

Formatting
==========
Jekyll uses Markdown as the markup and formatting language, via the `kramdown` Ruby library. Please find a quick reference guide [here](http://kramdown.gettalong.org/quickref.html).

You’ll find this post in your `_posts` directory. Go ahead and edit it and re-build the site to see your changes. 

Jekyll also offers powerful support for code snippets:

{% highlight ruby %}
def print_hi(name)
  puts "Hi, #{name}"
end
print_hi('Tom')
#=> prints 'Hi, Tom' to STDOUT.
{% endhighlight %}

Code formatting support is provided by the Pygments library, which [supports over 100 languages](http://pygments.org/languages/).

More information
================
Check out the [Jekyll docs][jekyll-docs] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll’s GitHub repo][jekyll-gh]. If you have questions, you can ask them on [Jekyll Talk][jekyll-talk].

[jekyll-docs]: http://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/
[jekyll-local]: http://locahost:4000/blog/