---
layout: default
title: Home
---

<section class="hero">
  <div class="container">
    <div class="intro">
      <div class="intro-text">
        <h1 class="fade-in">Hello <span class="accent">.</span></h1>

        <h2 class="fade-in delay-1">
          <span class="accent">&mdash; </span> I'm <strong style="color: var(--dark);">Kate Ratemo</strong>
        </h2>

        <p class="fade-in pitch">
          A curious mind building solutions through <span class="highlight">code</span>,
          <span class="highlight">community</span>, and <span class="highlight">creativity</span>.
        </p>

        <div class="fade-in delay-3">
          <a href="/blog/" class="btn btn-action">
            <i class="fas fa-book-open"></i> View My Blog
          </a>
        </div>
      </div>

      <div class="circle-container">
        <img src="/assets/images/cuate2.svg" alt="Kate's Headshot" class="circle-image profile" />
      </div>
    </div>
  </div>
</section>

<section class="services">
  <div class="container">
    <div class="row">
      <div class="service-card">
        <i class="fas fa-code service-icon"></i>
        <strong class="service-title">Custom Software Development</strong>
        <p>Tailored solutions that solve real problems and drive business success.</p>
      </div>

      <div class="service-card">
        <i class="fas fa-plug service-icon"></i>
        <strong class="service-title">API Integrations & Automation</strong>
        <p>Seamlessly connecting systems to streamline workflows and boost efficiency.</p>
      </div>

      <div class="service-card">
        <i class="fas fa-pencil-ruler service-icon"></i>
        <strong class="service-title">UX/UI Design Consulting</strong>
        <p>Designing intuitive, engaging interfaces that enhance user experience and brand loyalty.</p>
      </div>

      <div class="service-card">
        <i class="fas fa-users service-icon"></i>
        <strong class="service-title">Community & Mentorship</strong>
        <p>Building diverse, inclusive tech communities by empowering young girls.</p>
      </div>
    </div>
  </div>
</section>

<section class="blog-intro">
  <h1 class="fade-in">Top Blog Posts <span class="accent">.</span></h1>
  <p>
    Discover my latest blogs and tutorials on web development, design, and more
    <span class="accent">&mdash;&mdash;</span>
  </p>

  <div class="wrapper">
    {% assign top_posts = site.posts | sort: 'date' | reverse | slice: 0, 3 %}
    {% for post in top_posts %}
      <div class="card">
        <div class="card-banner">
          <p class="category-tag popular">{{ post.categories[0] | capitalize }}</p>
          <img class="banner-img"
               src="{{ post.image.path | default: '/assets/images/default.jpg' | relative_url }}"
               alt="{{ post.image.alt | default: 'Blog thumbnail' }}">
        </div>

        <div class="card-body">
          <p class="blog-hashtag">
            {% assign limited_tags = post.tags | slice: 0, 3 %}
            {% for tag in limited_tags %}
              <a href="{{ '/tags/' | append: tag | relative_url }}" class="post-category sm">{{ tag }}</a>
            {% endfor %}
          </p>

          <h2 class="blog-title">
            <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
          </h2>

          <p class="blog-description">
            {{ post.excerpt | strip_html | truncatewords: 20 }}
          </p>

          <a href="{{ post.url | relative_url }}" class="read-more">Read More</a>
        </div>
      </div>
    {% endfor %}
  </div>

  <div class="fade-in delay-3" style="display: flex; justify-content: center; margin-top: 60px;">
    <a href="/blog/" class="btn btn-action">View All Posts <i class="fas fa-arrow-right"></i></a>
  </div>
</section>

<button class="dark-mode-toggle" id="dark-mode-toggle">
  <i class="fas fa-moon"></i>
</button>
