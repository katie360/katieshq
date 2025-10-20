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
         A curious mind building solutions through creativity, code, and community ,driven by growth, insight, and impact.
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
        <i class="fas fa-laptop-code service-icon"></i>
        <strong class="service-title">Software & Web Development</strong>
        <p>I design and build reliable, high-performing software and web applications that balance functionality with user experience. My work spans front-end and back-end development, API design, and system integration, with a focus on clean architecture, scalability, and maintainability.</p>
      </div>

      <div class="service-card">
        <i class="fas fa-brain service-icon"></i>
        <strong class="service-title">R&D & System Architecture</strong>
        <p>I lead and contribute to R&D initiatives that explore new technologies, optimize existing systems, and shape sustainable digital solutions. From designing system structures to evaluating emerging tools, I focus on translating complex problems into clear, efficient technical strategies.</p>
      </div>

      <div class="service-card">
        <i class="fas fa-seedling service-icon"></i>
        <strong class="service-title">Tech Leadership & Mentorship</strong>
        <p>I drive projects with clarity, structure, and purpose. Through effective coordination, clear communication, and collaborative problem-solving, I help teams align technology with vision and deliver impactful results.</p>
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

  <div class="blog-posts">
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
        <a href="{{ post.url | relative_url }}" class="category-link">Read More</a>
          <!-- <a href="{{ post.url | relative_url }}" class="read-more">Read More</a> -->
        </div>
      </div>
    {% endfor %}
  </div>

  <div class="fade-in delay-3" style="display: flex; justify-content: center; margin-top: 60px;">
    <a href="/blog/" class="btn btn-action">View All Posts <i class="fas fa-arrow-right"></i></a>
  </div>
</section>




<section class="project-intro">
  <h1>Featured Projects <span class="accent">.</span></h1>
  <p><span class="accent">&mdash;&mdash;</span> A look at some of the tools, platforms, and systems I’m building to improve how we work, learn, and connect.</p>

  <div class="projects-grid">

  <div class="project-card fade-in">
  <img src="/assets/images/tasks.jpg" alt="KaziFlow – Work & Task Management App" class="project-image">
  <div class="project-content">
    <h2 class="project-title">KaziFlow - Work & Task Management App</h2>
    <p class="project-desc">
      A Notion-inspired web app built to streamline task tracking, planning, and collaboration. Developed in <strong>ASP.NET</strong> with <strong>C#</strong> and <strong>Angular</strong>, KaziFlow helps organizers and operations leads visualize workflows and manage responsibilities more efficiently.
    </p>
    <div  class="blog-hashtag">
    
     <p class="post-category"> ASP.NET </p>
    <p class="post-category"> C#</p>
    <p class="post-category"> Angular</p>  <p class="post-category"> PWA</p> 
    </div>
    <div class="project-links">
      <a href="https://github.com/yourusername/kaziflow" class="btn btn-outline disabled-link" target="_blank">View on GitHub &#8594;</a>
     
    </div>
  </div>
</div>


    <!-- Project 2 -->
    <div class="project-card fade-in delay-1">
      <img src="/assets/images/Twirls.png" alt="TechTwirls Platform" class="project-image">
      <div class="project-content">
        <h2 class="project-title">TechTwirls Platform</h2>
        <p class="project-desc">
         Built as the digital home for TechTwirls, this platform connects our community through project showcases, learning resources, and updates on our programs ,all designed to support high school girls exploring tech and innovation.
        </p>
           <div  class="blog-hashtag">
    
     <p class="post-category"> Community </p>
    <p class="post-category"> STEMEducation</p>
     <p class="post-category"> Impact</p> 
    </div>
       
        <div class="project-links">
          <a href="https://techtwirls.co.ke" class="btn btn-outline" target="_blank">Visit Site &#8594;</a>
         
        </div>
      </div>
    </div>
<!-- Project 3 -->
<div class="project-card fade-in delay-2">
  <img src="/assets/images/dataviz.jpg" alt="FinSight - Fintech Analytics Dashboard" class="project-image">
  <div class="project-content">
    <h2 class="project-title">FinSight - Fintech Analytics Dashboard</h2>
    <p class="project-desc">
      A self-initiated project showcasing my frontend design skills and understanding of fintech systems through rich data visualizations, clean UX, and intuitive reporting interfaces.
    </p>
           <div  class="blog-hashtag">
     <p class="post-category"> DataViz</p>
    <p class="post-category"> Frontend</p>
     <p class="post-category"> Fintech</p> 
      <p class="post-category"> UXDesign</p> 
    </div>
    <div class="project-links">
      <a href="https://github.com/yourusername/finsight" class="btn btn-outline disabled-link" target="_blank">View on GitHub &#8594;</a>
    </div>
  </div>
</div>

  </div>

  
</section>


<button class="dark-mode-toggle" id="dark-mode-toggle">
  <i class="fas fa-moon"></i>
</button>
