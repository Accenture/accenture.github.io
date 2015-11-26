---
layout: page
title: Contributors
permalink: /contributors/
---
This is the contributors page.

<ul>
{% for member in site.data.members %}
  <li>
  	{{ member.name }}
  	<img src="../images/members/{{ member.picture }}" alt="Avatar" height="120" width="120" />
    <a href="https://github.com/{{ member.github }}">Github</a>
    <a href="https://twitter.com/{{ member.twitter }}">Twitter</a>    
    <p>
    	{{ member.bio }}
    </p>
  </li>
{% endfor %}
</ul>