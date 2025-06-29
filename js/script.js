document.addEventListener("DOMContentLoaded", () => {
  // 🌸 1. Smooth Scroll for Nav Links
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 60,
          behavior: "smooth",
        });
      }
    });
  });

  // 🖤 2. Highlight Active Section in Navbar on Scroll
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll("nav ul li a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 70) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // ✨ 3. Fade In Sections on Scroll
  const fadeSections = document.querySelectorAll("section:not(#hero)");
  console.log(fadeSections)
  const fadeInObserver = new IntersectionObserver(
    (entries, observer) => {
         console.log("we have entries",entries)
      entries.forEach(entry => {
        console.log("we have hit an entry",entry)
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  fadeSections.forEach(section => {
    fadeInObserver.observe(section);
  });
});
