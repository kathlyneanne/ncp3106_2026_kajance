const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";


const pageLoader =
  document.getElementById("page-loader");

const pushStage =
  document.getElementById("push-stage");

const loaderImage =
  document.getElementById("loader-image");

const pushDivider =
  document.getElementById("push-divider");

const cssPerson =
  document.getElementById("css-person");

const pushLoadingNumber =
  document.getElementById("push-loading-number");


function easeInOutCubic(value) {
  return value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;
}


/* =========================================================
   START LOADER
========================================================= */

function startLoader() {

  if (
    !pageLoader ||
    !pushStage ||
    !loaderImage ||
    !pushDivider ||
    !cssPerson
  ) {
    return;
  }


  const loadingDuration = 5000;
  let startTime = null;


  pushStage.style.setProperty(
    "--push-position",
    "0%"
  );


  loaderImage.style.clipPath =
    "inset(0 100% 0 0)";

  loaderImage.style.webkitClipPath =
    "inset(0 100% 0 0)";


  loaderImage.style.filter =
    "none";

  loaderImage.style.mixBlendMode =
    "normal";


  pushDivider.classList.remove(
    "is-finished"
  );


  function animateLoader(timestamp) {

    if (!startTime) {
      startTime = timestamp;
    }


    const elapsed =
      timestamp - startTime;


    const rawProgress =
      Math.min(
        elapsed / loadingDuration,
        1
      );


    const progress =
      easeInOutCubic(
        rawProgress
      );


    const position =
      progress * 100;


    pushStage.style.setProperty(
      "--push-position",
      position + "%"
    );


    loaderImage.style.clipPath =
      `inset(0 ${100 - position}% 0 0)`;

    loaderImage.style.webkitClipPath =
      `inset(0 ${100 - position}% 0 0)`;


    if (pushLoadingNumber) {

      pushLoadingNumber.textContent =
        String(
          Math.floor(
            rawProgress * 100
          )
        ).padStart(
          2,
          "0"
        );

    }


    if (rawProgress < 1) {

      requestAnimationFrame(
        animateLoader
      );

    } else {

      pushDivider.classList.add(
        "is-finished"
      );


      setTimeout(
        finishLoader,
        350
      );

    }

  }


  function finishLoader() {

    pageLoader.classList.add(
      "is-finished"
    );


    document.body.classList.add(
      "page-loaded"
    );

  }


  requestAnimationFrame(
    animateLoader
  );

}





/* =========================================================
   RUN LOADER
========================================================= */

if (
  document.readyState ===
  "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    startLoader
  );

} else {

  startLoader();

}


/* =========================================================
   1. HERO SCRAMBLE
========================================================= */

const heroScrambleElements =
  document.querySelectorAll(
    "[data-scramble]"
  );


function scrambleText(
  element,
  speed = 80
) {

  if (!element) {
    return;
  }


  const finalText =
    element.dataset.text ||
    element.textContent.trim();


  clearInterval(
    element.scrambleTimer
  );


  let iteration = 0;


  element.scrambleTimer =
    setInterval(
      () => {

        element.textContent =
          finalText
            .split("")
            .map(
              (character, index) => {

                if (
                  character === " " ||
                  character === "/" ||
                  character === "." ||
                  character === "+" ||
                  character === "-"
                ) {
                  return character;
                }


                if (
                  index <
                  iteration
                ) {
                  return character;
                }


                return chars[
                  Math.floor(
                    Math.random() *
                    chars.length
                  )
                ];

              }
            )
            .join("");


        iteration += 1;


        if (
          iteration >=
          finalText.length
        ) {

          clearInterval(
            element.scrambleTimer
          );

          element.textContent =
            finalText;

        }

      },
      speed
    );

}


/* =========================================================
   HERO SCRAMBLE ON PAGE LOAD
========================================================= */

heroScrambleElements.forEach(
  (element, index) => {

    const delay =
      Number(
        element.dataset.progress ||
        0
      ) * 1000;


    setTimeout(
      () => {

        scrambleText(
          element,
          80
        );

      },
      delay
    );

  }
);


/* =========================================================
   2. MARQUEE
========================================================= */

const marqueeTrack =
  document.querySelector(
    ".marquee-track"
  );


if (marqueeTrack) {

  let marqueePosition = 0;


  function animateMarquee() {

    marqueePosition -= 0.25;


    if (
      Math.abs(marqueePosition) >=
      marqueeTrack.scrollWidth / 2
    ) {

      marqueePosition = 0;

    }


    marqueeTrack.style.transform =
      `translateX(${marqueePosition}px)`;


    requestAnimationFrame(
      animateMarquee
    );

  }


  animateMarquee();

}


/* =========================================================
   3. SMOOTH SCROLL
========================================================= */

document.documentElement.style.scrollBehavior =
  "smooth";


/* =========================================================
   4. PIXEL CURSOR
   RESTORED CURSOR + TRAIL
========================================================= */

if (
  window.matchMedia("(pointer: fine)").matches
) {

  /* =========================================
     CREATE MAIN CURSOR
  ========================================= */

  let pixelCursor =
    document.querySelector(".pixel-cursor");


  if (!pixelCursor) {

    pixelCursor =
      document.createElement("div");

    pixelCursor.className =
      "pixel-cursor";

    document.body.appendChild(
      pixelCursor
    );

  }


  /* =========================================
     CREATE CURSOR TRAIL
  ========================================= */

  const trail = [];

  const trailCount = 8;


  for (
    let i = 0;
    i < trailCount;
    i++
  ) {

    const pixel =
      document.createElement("div");


    pixel.className =
      "cursor-pixel";


    document.body.appendChild(
      pixel
    );


    trail.push({

      element: pixel,

      x:
        window.innerWidth / 2,

      y:
        window.innerHeight / 2

    });

  }


  /* =========================================
     MOUSE POSITION
  ========================================= */

  let mouseX =
    window.innerWidth / 2;

  let mouseY =
    window.innerHeight / 2;


  /* =========================================
     MOUSE MOVE
  ========================================= */

  window.addEventListener(
    "mousemove",
    event => {

      mouseX =
        event.clientX;

      mouseY =
        event.clientY;


      /* MAIN CURSOR */

      pixelCursor.style.left =
        mouseX + "px";

      pixelCursor.style.top =
        mouseY + "px";


      /* =====================================
         DETECT BLACK CPE AREA
      ===================================== */

      const elementUnderCursor =
        document.elementFromPoint(
          mouseX,
          mouseY
        );


      const darkSection =
        elementUnderCursor?.closest(
          ".cursor-dark-zone"
        );


      const isDark =
        Boolean(darkSection);


      /* MAIN CURSOR COLOR */

      pixelCursor.classList.toggle(
        "cursor-on-dark",
        isDark
      );


      /* TRAIL COLOR */

      trail.forEach(
        pixel => {

          pixel.element.classList.toggle(
            "cursor-on-dark",
            isDark
          );

        }
      );

    }
  );


  /* =========================================
     CURSOR HOVER EFFECT
  ========================================= */

  document
    .querySelectorAll(
      "a, button, .menu-button"
    )
    .forEach(
      element => {

        element.addEventListener(
          "mouseenter",
          () => {

            pixelCursor.classList.add(
              "is-hovering"
            );

          }
        );


        element.addEventListener(
          "mouseleave",
          () => {

            pixelCursor.classList.remove(
              "is-hovering"
            );

          }
        );

      }
    );


  /* =========================================
     CURSOR TRAIL ANIMATION
  ========================================= */

  function animateCursorTrail() {

    let targetX =
      mouseX;

    let targetY =
      mouseY;


    trail.forEach(
      (pixel, index) => {

        const followSpeed =
          0.24 -
          (
            index *
            0.012
          );


        pixel.x +=
          (
            targetX -
            pixel.x
          ) *
          followSpeed;


        pixel.y +=
          (
            targetY -
            pixel.y
          ) *
          followSpeed;


        pixel.element.style.left =
          pixel.x + "px";


        pixel.element.style.top =
          pixel.y + "px";


        targetX =
          pixel.x;

        targetY =
          pixel.y;

      }
    );


    requestAnimationFrame(
      animateCursorTrail
    );

  }


  /* =========================================
     START TRAIL
  ========================================= */

  animateCursorTrail();

}

/* =========================================================
   5. NAVIGATION MENU
========================================================= */

const menuButton =
  document.querySelector(
    ".menu-button"
  );

const menuOverlay =
  document.querySelector(
    ".menu-overlay"
  );

const menuClose =
  document.querySelector(
    ".menu-close"
  );


function openMenu() {

  if (!menuOverlay) {
    return;
  }


  menuOverlay.classList.add(
    "is-open"
  );


  document.body.classList.add(
    "menu-open"
  );

}


function closeMenu() {

  if (!menuOverlay) {
    return;
  }


  menuOverlay.classList.remove(
    "is-open"
  );


  document.body.classList.remove(
    "menu-open"
  );

}


if (menuButton) {

  menuButton.addEventListener(
    "click",
    openMenu
  );

}


if (menuClose) {

  menuClose.addEventListener(
    "click",
    closeMenu
  );

}


/* =========================================================
   6. MENU ESCAPE KEY
========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
    ) {

      closeMenu();

    }

  }
);


/* =========================================================
   7. FEATURED PAGE HOVER
========================================================= */

const featuredCards =
  document.querySelectorAll(
    ".featured-card"
  );


featuredCards.forEach(
  card => {

    card.addEventListener(
      "mouseenter",
      () => {

        card.classList.add(
          "is-hovered"
        );

      }
    );


    card.addEventListener(
      "mouseleave",
      () => {

        card.classList.remove(
          "is-hovered"
        );

      }
    );

  }
);


/* =========================================================
   8. PAGE TRANSITIONS
========================================================= */

const pageLinks =
  document.querySelectorAll(
    "[data-page-transition]"
  );


pageLinks.forEach(
  link => {

    link.addEventListener(
      "click",
      event => {

        const destination =
          link.getAttribute("href");


        if (
          !destination ||
          destination.startsWith("#") ||
          destination.startsWith("http")
        ) {
          return;
        }


        event.preventDefault();


        document.body.classList.add(
          "page-transitioning"
        );


        setTimeout(
          () => {

            window.location.href =
              destination;

          },
          600
        );

      }
    );

  }
);


/* =========================================================
   9. HOMEPAGE CPE SCROLL ANIMATION
========================================================= */

const cpeMainSection =
  document.querySelector(
    ".cpe-scroll-section-main"
  );


const ueCpeSection =
  document.querySelector(
    ".cpe-scroll-section-ue"
  );


const scrollRevealTexts =
  document.querySelectorAll(
    "[data-scroll-reveal]"
  );


/* =========================================================
   PREPARE DESCRIPTION WORDS
========================================================= */

scrollRevealTexts.forEach(
  text => {

    const words =
      text.textContent
        .trim()
        .split(/\s+/);


    text.innerHTML =
      words
        .map(word => {

          return `
            <span class="scroll-word">
              ${word}
            </span>
          `;

        })
        .join(" ");

  }
);


/* =========================================================
   CLAMP
========================================================= */

function clamp(
  value,
  min = 0,
  max = 1
) {

  return Math.max(
    min,
    Math.min(
      max,
      value
    )
  );

}


/* =========================================================
   GET SECTION PROGRESS
========================================================= */

function getSectionProgress(
  section
) {

  if (!section) {
    return 0;
  }


  const sectionRect =
    section.getBoundingClientRect();


  const sectionHeight =
    section.offsetHeight;


  const viewportHeight =
    window.innerHeight;


  let sectionProgress =
    (
      viewportHeight -
      sectionRect.top
    )
    /
    (
      sectionHeight +
      viewportHeight
    );


  return clamp(
    sectionProgress,
    0,
    1
  );

}


/* =========================================================
   REVEAL WORDS
========================================================= */

function revealWords(
  text,
  progress
) {

  if (!text) {
    return;
  }


  const words =
    text.querySelectorAll(
      ".scroll-word"
    );


  const activeWords =
    progress >= 1
      ? words.length
      : Math.ceil(
          progress *
          words.length
        );


  words.forEach(
    (word, index) => {

      word.classList.toggle(
        "is-active",
        index < activeWords
      );

    }
  );

}


/* =========================================================
   10. UPDATE CPE SCROLL ANIMATIONS
========================================================= */

function updateCpeScrollAnimation() {


  /* =====================================================
     01 / COMPUTER ENGINEERING
     
     THIS SECTION NOW USES ITS OWN
     INDEPENDENT SCROLL PROGRESS.
  ===================================================== */

  if (cpeMainSection) {

    const mainProgress =
      getSectionProgress(
        cpeMainSection
      );


    /* =================================================
       BLACK BACKGROUND OPENING
    ================================================= */

    const backgroundProgress =
      clamp(
        mainProgress /
        0.20,
        0,
        1
      );


    const bgInset =
      50 -
      (
        backgroundProgress *
        50
      );


    cpeMainSection.style.setProperty(
      "--bg-open",
      bgInset + "%"
    );


    /* =================================================
       COMPUTER ENGINEERING BLOCK
    ================================================= */

    const mainBlock =
      cpeMainSection.querySelector(
        ".cpe-scroll-block"
      );


    if (mainBlock) {


      /* ===============================================
         TITLE REVEAL
         
         SAME ORIGINAL TIMING
         20% -> 35%
      =============================================== */

      const titleProgress =
        clamp(
          (
            mainProgress -
            0.20
          )
          /
          0.15,
          0,
          1
        );


      mainBlock.style.setProperty(
        "--title-drop-progress",
        titleProgress
      );


      /* ===============================================
         DESCRIPTION REVEAL
         
         SAME ORIGINAL TIMING
         35% -> 60%
      =============================================== */

      const mainText =
        mainBlock.querySelector(
          "[data-scroll-reveal]"
        );


      const mainTextProgress =
        clamp(
          (
            mainProgress -
            0.35
          )
          /
          0.25,
          0,
          1
        );


      revealWords(
        mainText,
        mainTextProgress
      );

    }

  }


  /* =====================================================
     02 / UE COMPUTER ENGINEERING

     IMPORTANT:
     THIS IS A SEPARATE STICKY SECTION.

     IT MUST NOT USE THE SCROLL PROGRESS
     FROM 01 / COMPUTER ENGINEERING.

     IT CALCULATES ITS OWN PROGRESS.
  ===================================================== */

  if (ueCpeSection) {

    const ueProgress =
      getSectionProgress(
        ueCpeSection
      );


    const ueBlock =
      ueCpeSection.querySelector(
        ".cpe-scroll-block-ue"
      );


    if (ueBlock) {


      /* ===============================================
         UE TITLE REVEAL

         SAME VISUAL ANIMATION AS
         01 / COMPUTER ENGINEERING

         18% -> 38%
      =============================================== */

      const ueTitleProgress =
        clamp(
          (
            ueProgress -
            0.18
          )
          /
          0.20,
          0,
          1
        );


      ueBlock.style.setProperty(
        "--title-drop-progress",
        ueTitleProgress
      );


      /* ===============================================
         UE DESCRIPTION REVEAL

         SAME WORD-BY-WORD ANIMATION AS
         01 / COMPUTER ENGINEERING

         38% -> 88%
      =============================================== */

      const ueText =
        ueBlock.querySelector(
          "[data-scroll-reveal]"
        );


      const ueTextProgress =
        clamp(
          (
            ueProgress -
            0.38
          )
          /
          0.50,
          0,
          1
        );


      revealWords(
        ueText,
        ueTextProgress
      );


      /* ===============================================
         UE READING COMPLETE
      =============================================== */

      ueCpeSection.classList.toggle(
        "reading-complete",
        ueTextProgress >= 1
      );

    }

  }

}


/* =========================================================
   11. SCROLL LISTENER
========================================================= */

window.addEventListener(
  "scroll",
  updateCpeScrollAnimation,
  {
    passive: true
  }
);


/* =========================================================
   12. RESIZE
========================================================= */

window.addEventListener(
  "resize",
  updateCpeScrollAnimation
);


/* =========================================================
   INITIAL UPDATE
========================================================= */

updateCpeScrollAnimation();


/* =========================================================
   HOME <-> ABOUT PAGE TRANSITION
========================================================= */

const transitionOverlay =
  document.createElement(
    "div"
  );


transitionOverlay.className =
  "page-transition-overlay";


transitionOverlay.innerHTML = `

  <div class="page-transition-text">
    ABOUT CpE
  </div>

`;


document.body.appendChild(
  transitionOverlay
);


/* =========================================================
   PAGE TRANSITION FUNCTION
========================================================= */

function startPageTransition(
  destination,
  message
) {

  const transitionText =
    transitionOverlay.querySelector(
      ".page-transition-text"
    );


  if (transitionText) {

    transitionText.textContent =
      message;

  }


  transitionOverlay.classList.remove(
    "is-active"
  );


  void transitionOverlay.offsetWidth;


  transitionOverlay.classList.add(
    "is-active"
  );


  setTimeout(
    () => {

      window.location.href =
        destination;

    },
    700
  );

}


/* =========================================================
   PAGE LINKS
========================================================= */

document
  .querySelectorAll(
    "a[href]"
  )
  .forEach(
    link => {

      const href =
        link.getAttribute("href");


      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }


      link.addEventListener(
        "click",
        event => {

          event.preventDefault();


          const text =
            link.textContent
              .trim()
              .toUpperCase();


          startPageTransition(
            href,
            text || "UE CpE"
          );

        }
      );

    }
  );


/* =========================================================
   13. SCROLL REVEAL FOR GENERAL ELEMENTS
========================================================= */

const generalRevealElements =
  document.querySelectorAll(
    "[data-reveal]"
  );


function updateGeneralReveal() {

  generalRevealElements.forEach(
    element => {

      const rect =
        element.getBoundingClientRect();


      const trigger =
        window.innerHeight * 0.85;


      if (
        rect.top <
        trigger
      ) {

        element.classList.add(
          "is-visible"
        );

      }

    }
  );

}


window.addEventListener(
  "scroll",
  updateGeneralReveal,
  {
    passive: true
  }
);


updateGeneralReveal();


/* =====================================================
   PROGRAM HIGHLIGHTS — SPECIALIZATION SCRAMBLE
===================================================== */

const programHighlights =
  document.getElementById(
    "program-highlights"
  );


/* ONLY SPECIALIZATION TEXT */

const specializationElements =
  document.querySelectorAll(
    "[data-specialization-scramble]"
  );


/*
  false = outside Program Highlights
  true  = inside Program Highlights
*/

let specializationInside =
  false;


/* =====================================================
   TURN SPECIALIZATION INTO RANDOM LETTERS
===================================================== */

function makeSpecializationScrambled(
  element
) {

  if (!element) {
    return;
  }


  const finalText =
    element.dataset.text ||
    element.textContent.trim();


  clearInterval(
    element.specializationTimer
  );


  element.textContent =
    finalText
      .split("")
      .map(character => {

        /* KEEP SPACES AND SYMBOLS */

        if (
          character === " " ||
          character === "/" ||
          character === "." ||
          character === "+" ||
          character === "-"
        ) {

          return character;

        }


        /* RANDOM LETTER */

        return chars[
          Math.floor(
            Math.random() *
            chars.length
          )
        ];

      })
      .join("");

}


/* =====================================================
   RANDOM LETTERS → REAL SPECIALIZATION
===================================================== */

function startSpecializationScramble() {

  specializationElements.forEach(
    (element, index) => {

      const finalText =
        element.dataset.text ||
        element.textContent.trim();


      clearInterval(
        element.specializationTimer
      );


      let iteration = 0;


      /*
        Each specialization starts
        slightly after the previous one.
      */

      setTimeout(() => {

        element.specializationTimer =
          setInterval(() => {

            element.textContent =
              finalText
                .split("")
                .map(
                  (character, charIndex) => {

                    /* KEEP SYMBOLS */

                    if (
                      character === " " ||
                      character === "/" ||
                      character === "." ||
                      character === "+" ||
                      character === "-"
                    ) {

                      return character;

                    }


                    /*
                      REVEAL CORRECT CHARACTER
                    */

                    if (
                      charIndex <
                      iteration
                    ) {

                      return character;

                    }


                    /*
                      RANDOM CHARACTER
                    */

                    return chars[
                      Math.floor(
                        Math.random() *
                        chars.length
                      )
                    ];

                  }
                )
                .join("");


            iteration += 1;


            /*
              FINISHED
            */

            if (
              iteration >=
              finalText.length
            ) {

              clearInterval(
                element.specializationTimer
              );


              element.textContent =
                finalText;

            }

          }, 70);

      }, index * 180);

    }
  );

}


/* =====================================================
   RESET SPECIALIZATION TO SCRAMBLED LETTERS
===================================================== */

function resetSpecializationScramble() {

  specializationElements.forEach(
    element => {

      makeSpecializationScrambled(
        element
      );

    }
  );

}


/* =====================================================
   CHECK IF PROGRAM HIGHLIGHTS IS ON SCREEN
===================================================== */

function updateSpecializationScramble() {

  if (
    !programHighlights ||
    !specializationElements.length
  ) {

    return;

  }


  const rect =
    programHighlights.getBoundingClientRect();


  /*
    SCRAMBLE STARTS WHEN THE
    PROGRAM HIGHLIGHTS SECTION
    REACHES THIS POINT.
  */

  const enterPoint =
    window.innerHeight *
    0.78;


  const isInside =
    rect.top <= enterPoint &&
    rect.bottom > 0;


  /* ===================================================
     ENTER PROGRAM HIGHLIGHTS
  =================================================== */

  if (
    isInside &&
    !specializationInside
  ) {

    specializationInside =
      true;


    /*
      FIRST SHOW RANDOM LETTERS
    */

    resetSpecializationScramble();


    /*
      THEN TURN THEM INTO
      THEIR REAL WORDS
    */

    setTimeout(() => {

      if (
        specializationInside
      ) {

        startSpecializationScramble();

      }

    }, 80);

  }


  /* ===================================================
     LEAVE PROGRAM HIGHLIGHTS
  =================================================== */

  if (
    !isInside &&
    specializationInside
  ) {

    specializationInside =
      false;


    /*
      SCRAMBLE AGAIN WHEN
      USER LEAVES THE SECTION
    */

    resetSpecializationScramble();

  }

}


/* =====================================================
   RUN WHEN SCROLLING
===================================================== */

window.addEventListener(
  "scroll",
  updateSpecializationScramble,
  {
    passive: true
  }
);


/* =====================================================
   RUN WHEN RESIZING
===================================================== */

window.addEventListener(
  "resize",
  updateSpecializationScramble
);


/* =====================================================
   INITIAL CHECK
===================================================== */

updateSpecializationScramble();