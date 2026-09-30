document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================

       EXPLORE CPE -> EVENTS & ACTIVITIES DESTINATION TRANSITION

    ===================================================== */

    const exploreParams = new URLSearchParams(window.location.search);

    const cameFromExplore = exploreParams.get("from") === "explore";

    const pageLoader = document.querySelector("#page-loader");

    if (pageLoader) {

        if (cameFromExplore) {

            pageLoader.classList.add("from-explore");

            requestAnimationFrame(() => {

                requestAnimationFrame(() => {

                    pageLoader.classList.add("page-transition-out");

                });

            });

            window.setTimeout(() => {

                window.history.replaceState(

                    {},

                    "",

                    window.location.pathname + window.location.hash

                );

            }, 1800);

            pageLoader.addEventListener("animationend", () => {

                pageLoader.style.display = "none";

            }, { once: true });

        } else {

            pageLoader.classList.add("no-explore-transition");

        }

    }

/* ====================================================

           PIXEL CURSOR + TRAIL

           MATCHES THE CPE AT UE CURSOR

        ===================================================== */

    if (window.matchMedia("(pointer: fine)").matches) {

      let pixelCursor = document.querySelector(".pixel-cursor");

      if (!pixelCursor) {

        pixelCursor = document.createElement("div");

        pixelCursor.className = "pixel-cursor";

        pixelCursor.setAttribute(

          "aria-hidden",

          "true",

        );

        document.body.appendChild(pixelCursor);

      }

      const trail = [];

      const trailCount = 8;

      for (let i = 0; i < trailCount; i++) {

        const pixel = document.createElement("div");

        pixel.className = "cursor-pixel";

        pixel.setAttribute(

          "aria-hidden",

          "true",

        );

        document.body.appendChild(pixel);

        trail.push({

          element: pixel,

          x: window.innerWidth / 2,

          y: window.innerHeight / 2,

        });

      }

      let mouseX = window.innerWidth / 2;

      let mouseY = window.innerHeight / 2;

      function detectDarkBackground(

        x,

        y,

      ) {

        const elementUnderCursor = document.elementFromPoint(

          x,

          y,

        );

        if (!elementUnderCursor) {

          return false;

        }

        const darkSection = elementUnderCursor.closest(

          ".cursor-dark-zone, .fullscreen-menu, .event-section.dark",

        );

        if (darkSection) {

          return true;

        }

        let current = elementUnderCursor;

        while (current && current !== document.documentElement) {

          const background = window.getComputedStyle(current).backgroundColor;

          if (

            background &&

            background !== "transparent" &&

            background !== "rgba(0, 0, 0, 0)"

          ) {

            const match = background.match(/rgba?(([^)]+))/);

            if (match) {

              const values = match[1]

                .split(",")

                .map((value) => parseFloat(value.trim()));

              const r = values[0] || 0;

              const g = values[1] || 0;

              const b = values[2] || 0;

              const a = values.length > 3 ? values[3] : 1;

              if (a > 0.05) {

                const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

                return luminance < 145;

              }

            }

          }

          current = current.parentElement;

        }

        return false;

      }

      window.addEventListener(

        "mousemove",

        (event) => {

          mouseX = event.clientX;

          mouseY = event.clientY;

          pixelCursor.style.left = mouseX + "px";

          pixelCursor.style.top = mouseY + "px";

          const isDark = detectDarkBackground(

            mouseX,

            mouseY,

          );

          pixelCursor.classList.toggle(

            "cursor-on-dark",

            isDark,

          );

          trail.forEach((pixel) => {

            pixel.element.classList.toggle(

              "cursor-on-dark",

              isDark,

            );

          });

        },

      );

      document

        .querySelectorAll(

          `

                        a,

                        button,

                        label,

                        .menu-open-btn,

                        .menu-close-btn,

                        .next-section,

                        .back-explore

                    `,

        )

        .forEach((element) => {

          element.addEventListener(

            "mouseenter",

            () => {

              pixelCursor.classList.add("is-hovering");

            },

          );

          element.addEventListener(

            "mouseleave",

            () => {

              pixelCursor.classList.remove("is-hovering");

            },

          );

        });

      function animateCursorTrail() {

        let targetX = mouseX;

        let targetY = mouseY;

        trail.forEach(

          (

            pixel,

            index,

          ) => {

            const followSpeed = 0.24 - index * 0.012;

            pixel.x += (targetX - pixel.x) * followSpeed;

            pixel.y += (targetY - pixel.y) * followSpeed;

            pixel.element.style.left = pixel.x + "px";

            pixel.element.style.top = pixel.y + "px";

            targetX = pixel.x;

            targetY = pixel.y;

          },

        );

        requestAnimationFrame(animateCursorTrail);

      }

      animateCursorTrail();

    }

    /* =====================================================

           1. HERO ENTRANCE

           NO SECOND "EVENTS & ACTIVITIES" BLACK INTRO HERE.

           The black transition into Events should come from

           the page/card that sends the user to events.html.

           Once events.html loads, MORE THAN A CLASSROOM

           performs its own entrance.

        ===================================================== */

    requestAnimationFrame(() => {

      requestAnimationFrame(() => {

        document.body.classList.add("page-ready");

      });

    });

    /* =====================================================

           2. REVEAL ANIMATION

        ===================================================== */

    const revealObserver = new IntersectionObserver(

      (

        entries,

        observer,

      ) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

          }

        });

      },

      {

        threshold: 0.08,

        rootMargin: "0px 0px 50px 0px",

      },

    );

    function observeRevealElements(container = document) {

      const elements = container.querySelectorAll(".reveal:not(.visible)");

      elements.forEach((element) => {

        revealObserver.observe(element);

      });

    }

    observeRevealElements();

    /* =====================================================

           3. PHOTO REVEAL

        ===================================================== */

    const photoObserver = new IntersectionObserver(

      (

        entries,

        observer,

      ) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("photo-animate");

            observer.unobserve(entry.target);

          }

        });

      },

      {

        threshold: 0.05,

        rootMargin: "0px 0px 80px 0px",

      },

    );

    function observePhotos(container = document) {

      const photos = container.querySelectorAll(

        ".photo-reveal:not(.photo-animate)",

      );

      photos.forEach((photo) => {

        photoObserver.observe(photo);

      });

    }

    observePhotos();

    /* =====================================================

           4. SIDE PROGRESS

        ===================================================== */

    const progressLinks = document.querySelectorAll(".progress-link");

    function setProgress(number) {

      progressLinks.forEach((item) => {

        item.classList.remove("active");

        if (item.dataset.progress === number) {

          item.classList.add("active");

        }

      });

    }

    const sectionObserver = new IntersectionObserver(

      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            const number = entry.target.dataset.section;

            if (number) {

              setProgress(number);

            }

          }

        });

      },

      {

        threshold: 0.25,

      },

    );

    function observeSections() {

      const sections = document.querySelectorAll(

        ".event-section:not(.chapter-locked)",

      );

      sections.forEach((section) => {

        if (section.dataset.observed !== "true") {

          sectionObserver.observe(section);

          section.dataset.observed = "true";

        }

      });

    }

    observeSections();

    /* =====================================================

           5. CHAPTER SYSTEM

           WORKSHOP

              ↓ click

           SEMINARS

              ↓ click

           COMPETITIONS

              ↓ click

           RESEARCH

              ↓ click

           STUDENT EVENTS

              ↓ click

           TECHNICAL TRAINING

        ===================================================== */

    const chapterButtons = document.querySelectorAll(".chapter-next");

    chapterButtons.forEach((button) => {

      button.addEventListener(

        "click",

        () => {

          const targetID = button.dataset.unlock;

          const target = document.getElementById(targetID);

          if (!target) {

            return;

          }

          /* UNLOCK */

          target.classList.remove("chapter-locked");

          target.classList.add("chapter-opening");

          /* OBSERVE NEW CONTENT */

          observeRevealElements(target);

          observePhotos(target);

          observeSections();

          /* SIDE PROGRESS */

          const number = target.dataset.section;

          if (number) {

            setProgress(number);

          }

          /* SCROLL TO NEXT CHAPTER */

          requestAnimationFrame(() => {

            requestAnimationFrame(() => {

              target.scrollIntoView({

                behavior: "smooth",

                block: "start",

              });

            });

          });

          setTimeout(

            () => {

              target.classList.remove("chapter-opening");

            },

            1000,

          );

        },

      );

    });

    /* =====================================================

           6. HERO TEXT SCROLL MOVEMENT

        ===================================================== */

    const titleOne = document.querySelector(".title-one");

    const titleTwo = document.querySelector(".title-two");

    let ticking = false;

    function moveHeroText() {

      const scroll = window.scrollY;

      if (scroll < window.innerHeight) {

        if (titleOne) {

          titleOne.style.marginLeft = `${scroll * 0.02}px`;

        }

        if (titleTwo) {

          titleTwo.style.marginLeft = `${scroll * -0.015}px`;

        }

      }

      ticking = false;

    }

    window.addEventListener(

      "scroll",

      () => {

        if (!ticking) {

          requestAnimationFrame(moveHeroText);

          ticking = true;

        }

      },

      {

        passive: true,

      },

    );

    /* =====================================================

           7. PAGE TRANSITION

           SAME BEHAVIOR AS YOUR OTHER PAGE:

           BLACK SCREEN RISES FROM BOTTOM

           + LARGE CENTER TEXT.

        ===================================================== */

    const transitionOverlay = document.createElement("div");

    transitionOverlay.className = "page-transition-overlay";

    transitionOverlay.innerHTML = `

            <div class="page-transition-text">

                EXPLORE CpE

            </div>

        `;

    document.body.appendChild(transitionOverlay);

    let transitionRunning = false;

    function startPageTransition(

      destination,

      message,

    ) {

      if (transitionRunning || !destination) {

        return;

      }

      transitionRunning = true;

      const transitionText = transitionOverlay.querySelector(

        ".page-transition-text",

      );

      if (transitionText) {

        transitionText.textContent = message;

      }

      transitionOverlay.classList.remove("is-active");

      /*

                Force browser reflow so the animation

                can restart every time.

            */

      void transitionOverlay.offsetWidth;

      transitionOverlay.classList.add("is-active");

      /*

                Same slower timing used by your

                existing page transition.

            */

      setTimeout(

        () => {

          window.location.href = destination;

        },

        1350,

      );

    }

    /* =====================================================

           8. BACK TO EXPLORE CpE

           THIS NOW SHOWS:

                 EXPLORE CpE

           ON THE BLACK SCREEN BEFORE GOING HOME.

        ===================================================== */

    document

      .querySelectorAll(".page-transition-back")

      .forEach((link) => {

        link.addEventListener(

          "click",

          (event) => {

            event.preventDefault();

            event.stopPropagation();

            const destination = link.getAttribute("href");

            startPageTransition(

              destination,

              "EXPLORE CpE",

            );

          },

        );

      });

    /* =====================================================

           9. RESET TRANSITION

           IF USER USES BROWSER BACK

        ===================================================== */

    window.addEventListener(

      "pageshow",

      () => {

        transitionRunning = false;

        transitionOverlay.classList.remove("is-active");

      },

    );

    /* =====================================================

           10. MENU

           OPEN/CLOSE THE EXISTING FULLSCREEN MENU

        ===================================================== */

    const menuButton = document.getElementById("menuButton");

    const menuOverlay = document.getElementById("fullscreenMenu");

    const closeMenu = document.getElementById("menuClose");

    function openMenu() {

      if (!menuOverlay) {

        return;

      }

      menuOverlay.classList.add("menu-open");

      menuOverlay.classList.add("cursor-dark-zone");

      document.body.classList.add("menu-open");

      if (menuButton) {

        menuButton.setAttribute("aria-expanded", "true");

      }

    }

    function closeMenuFunction() {

      if (!menuOverlay) {

        return;

      }

      menuOverlay.classList.remove("menu-open");

      menuOverlay.classList.remove("cursor-dark-zone");

      document.body.classList.remove("menu-open");

      if (menuButton) {

        menuButton.setAttribute("aria-expanded", "false");

      }

    }

    if (menuButton) {

      menuButton.addEventListener("click", openMenu);

    }

    if (closeMenu) {

      closeMenu.addEventListener("click", closeMenuFunction);

    }

    /* =====================================================

           11. MENU LINKS

           CLOSE THE MENU WHEN A PAGE IS SELECTED

        ===================================================== */

    const menuLinks = document.querySelectorAll(".fullscreen-menu-link");

    menuLinks.forEach((link) => {

      link.addEventListener("click", () => {

        closeMenuFunction();

      });

    });

    /* =====================================================

           12. ESCAPE CLOSES MENU

        ===================================================== */

    document.addEventListener("keydown", (event) => {

      if (event.key === "Escape") {

        closeMenuFunction();

      }

    });

});