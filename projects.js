/* =========================================================

   UE CpE — STUDENT PROJECTS

   projects.js

   ========================================================= */

 

(() => {

  const page = document.querySelector(".projects-page");

  if (!page) return;

 

  /* =========================================================

     EXPLORE CPE -> STUDENT PROJECTS TRANSITION

     Continues the black screen created on the homepage,

     then slides it upward to reveal Student Projects.

     ========================================================= */

  const projectsParams = new URLSearchParams(window.location.search);

  const cameFromExplore = projectsParams.get("from") === "explore";

  const projectsLoader = document.querySelector("#explore-projects-loader");

 

  if (projectsLoader) {

    if (cameFromExplore) {

      projectsLoader.classList.add("from-explore");

 

      requestAnimationFrame(() => {

        requestAnimationFrame(() => {

          projectsLoader.classList.add("page-transition-out");

        });

      });

 

      setTimeout(() => {

        const cleanURL = window.location.pathname + window.location.hash;

        window.history.replaceState({}, "", cleanURL);

      }, 900);

 

      setTimeout(() => {

        projectsLoader.style.display = "none";

      }, 1000);

    } else {

      projectsLoader.classList.add("no-explore-transition");

    }

  }

 

  /* =========================================================

     PROJECTS PAGE ELEMENTS

     ========================================================= */

  const hero = page.querySelector(".projects-hero");

  const revealItems = page.querySelectorAll(".project-reveal");

  const processSection = page.querySelector(".projects-process");

  const cards = page.querySelectorAll(".project-category");

  const orbit = page.querySelector(".projects-hero-orbit");

  const scanline = page.querySelector(".projects-scanline");

 

  /* HERO ENTRANCE */

  requestAnimationFrame(() => {

    setTimeout(() => { hero?.classList.add("is-ready"); }, cameFromExplore ? 650 : 120);

  });

 

  /* SCROLL REVEAL */

  const updateReveal = () => {

    revealItems.forEach((item) => {

      const rect = item.getBoundingClientRect();

      const visible = rect.top < window.innerHeight * 0.86 && rect.bottom > 40;

      item.classList.toggle("is-visible", visible);

    });

 

    if (processSection) {

      const rect = processSection.getBoundingClientRect();

      processSection.classList.toggle("is-visible", rect.top < window.innerHeight * 0.72 && rect.bottom > 0);

    }

 

    if (hero && orbit) {

      const rect = hero.getBoundingClientRect();

      if (rect.bottom > 0 && rect.top < window.innerHeight) {

        const progress = Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height)));

        orbit.style.translate = `0 ${progress * 45}px`;

      }

    }

 

    if (hero && scanline) {

      const rect = hero.getBoundingClientRect();

      if (rect.bottom > 0) scanline.style.translate = `0 ${Math.max(0, -rect.top * 0.12)}px`;

    }

  };

 

  /* PROJECT CARD INTERACTIVE TILT */

  cards.forEach((card) => {

    card.addEventListener("mousemove", (event) => {

      const rect = card.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width - 0.5;

      const y = (event.clientY - rect.top) / rect.height - 0.5;

      card.style.transform = `perspective(900px) rotateX(${y * -2.1}deg) rotateY(${x * 2.1}deg) translateY(-2px)`;

    });

    card.addEventListener("mouseleave", () => { card.style.transform = ""; });

  });

 

  /* MOUSE-FOLLOWING GLOW */

  const index = page.querySelector(".projects-index");

  if (index) {

    const glow = document.createElement("div");

    glow.setAttribute("aria-hidden", "true");

    glow.style.cssText = `position:fixed;width:180px;height:180px;border-radius:50%;pointer-events:none;z-index:0;opacity:0;background:radial-gradient(circle,rgba(215,38,30,.10),rgba(215,38,30,0) 68%);transform:translate(-50%,-50%);transition:opacity .25s ease;`;

    document.body.appendChild(glow);

    index.addEventListener("mousemove", (event) => {

      glow.style.left = `${event.clientX}px`;

      glow.style.top = `${event.clientY}px`;

      glow.style.opacity = "1";

    });

    index.addEventListener("mouseleave", () => { glow.style.opacity = "0"; });

  }

 

  /* EVENTS */

  window.addEventListener("scroll", updateReveal, { passive: true });

  window.addEventListener("resize", updateReveal);

  updateReveal();

})();