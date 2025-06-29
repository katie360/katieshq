---
layout: default
title: Blog
permalink: /blog/
---

<div style="padding-top: 120px; min-height: 80vh;">
<section id="blog-list">
    <h2>My Blog</h2>
    <div class="blog-posts">
        {% for post in site.posts %}
        <article class="blog-post">
  <img class="blog-thumb" src="{{ post.image | default: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' }}" alt="Blog thumbnail">
  <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
  <p class="post-meta">{{ post.date | date: "%B %d, %Y" }}</p>
  <p>{{ post.excerpt | strip_html | truncatewords: 50 }}</p>
  <a href="{{ post.url | relative_url }}" class="read-more">Read More</a>
</article>
        {% endfor %}
    </div>
</section>
</div>
