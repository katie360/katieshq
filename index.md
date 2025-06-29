---
layout: default
title: Home
---

<section id="hero">
  <div class="hero-content">
    <h1>Kate Ratemo</h1>
    <p>Software Engineer | Delivering Inclusive, Scalable Solutions | Advocate for Women in Tech</p>
    <div class="hero-buttons">
      <a href="{{ '/blog/' | relative_url }}" class="btn">View My Blog</a>
      <a href="/assets/KateRatemo_CV.pdf" class="btn" download>Download CV</a>
      <a href="#contact" class="btn">Contact Me</a>
    </div>
  </div>
</section>

<section id="about">
  <div class="about-content">
    <img src="{{ '/images/headshot.jpg' | relative_url }}" alt="Kate Ratemo" class="headshot">
    <div class="about-text">
      <h2>About Me</h2>
      <p>Hey! I’m Kate — a curious software engineer, technical problem solver, and digital creative. I love building meaningful tools and sharing what I learn along the way. 💡</p>
    </div>
  </div>
</section>

<section id="projects">
  <h2>Projects</h2>
  <div class="project-cards">
  <div class="card">
    <img class="card-img" src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80" alt="API Testing Toolkit">
    <h3>API Testing Toolkit</h3>
    <p>A toolkit for automating end-to-end API testing in C#.</p>
  </div>
  <div class="card">
    <img class="card-img" src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80" alt="Hashing Visualizer">
    <h3>Hashing Visualizer</h3>
    <p>A demo web app that shows how hashing algorithms work — from password salting to SHA-256 chaining.</p>
  </div>
</div>
</section>

<section id="blog">
  <h2>Latest from the Blog</h2>
  <div class="blog-posts">
    {% if site.posts.size > 0 %}
      {% assign sorted_posts = site.posts | sort: 'date' | reverse %}
      {% for post in sorted_posts limit:3 %}
  <article class="blog-post">
    <img class="blog-thumb" src="{{ post.image | default: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' }}" alt="Blog thumbnail">
    <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
    <p class="post-meta">{{ post.date | date: "%B %d, %Y" }}</p>
    <p>{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
    <a href="{{ post.url | relative_url }}" class="read-more">Read More</a>
  </article>
      {% endfor %}
    {% else %}
      <p>No blog posts found yet. Check back soon!</p>
    {% endif %}
  </div>
  <a href="{{ '/blog/' | relative_url }}" class="btn">View All Blog Posts</a>
</section>

<section id="contact">
  <h2>Contact</h2>
  <p>Let’s talk! You can reach me at <a href="mailto:kate@example.com">kate@example.com</a>, or find me on:</p>
  <ul class="social-links">
    <li><a href="https://linkedin.com/in/kateratemo" target="_blank">LinkedIn</a></li>
    <li><a href="https://github.com/kateratemo" target="_blank">GitHub</a></li>
  </ul>
</section>
