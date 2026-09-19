/* =========================================================
   UE CPE WEBSITE
   COMPLETE MERGED SCRIPT
========================================================= */

const chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";


/* =========================================================
   1. LOADER
========================================================= */

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
    : 1 -
      Math.pow(
        -2 * value + 2,
        3
      ) / 2;

}


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

  cssPerson.classList.remove(
    "is-leaving"
  );

  pageLoader.classList.remove(
    "is-finished"
  );

  pageLoader.classList.add(
    "is-pushing"
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

      return;

    }


    loaderImage.style.clipPath =
      "inset(0 0 0 0)";

    loaderImage.style.webkitClipPath =
      "inset(0 0 0 0)";


    if (pushLoadingNumber) {

      pushLoadingNumber.textContent =
        "100";

    }


    pageLoader.classList.remove(
      "is-pushing"
    );


    pushDivider.classList.add(
      "is-finished"
    );


    cssPerson.classList.add(
      "is-leaving"
    );


    setTimeout(
      finishLoader,
      600
    );

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
   START LOADER / RETURN FROM ABOUT
========================================================= */

function initializePage() {

  /*
    If we came back from About CpE,
    skip loader + intro and go directly
    to Explore CpE.
  */

  if (
    window.location.hash ===
    "#featured"
  ) {

    if (pageLoader) {

      pageLoader.classList.add(
        "is-finished"
      );

    }


    const enterCheckbox =
      document.getElementById(
        "enter-site"
      );


    if (enterCheckbox) {

      enterCheckbox.checked =
        true;

    }


    document.body.classList.add(
      "page-loaded"
    );


    const featured =
      document.getElementById(
        "featured"
      );


    if (featured) {

      setTimeout(
        () => {

          featured.scrollIntoView({
            behavior: "auto",
            block: "start"
          });

        },
        50
      );

    }


    return;

  }


  startLoader();

}


if (
  document.readyState ===
  "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    initializePage
  );

} else {

  initializePage();

}


/* =========================================================
   2. SCRAMBLE / HACKER TEXT
========================================================= */

const heroScrambleElements =
  document.querySelectorAll(
    "[data-scramble]"
  );


function scrambleText(
  element,
  speed = 60
) {

  if (!element) {

    return;

  }


  const finalText =
    element.dataset.text ||
    element.textContent.trim();


  element.dataset.text =
    finalText;


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
              (
                character,
                index
              ) => {

                if (
                  character === " " ||
                  character === "/" ||
                  character === "." ||
                  character === "+" ||
                  character === "-" ||
                  character === "×" ||
                  character === "•"
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


        iteration += 0.28;


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
   HERO HACKER ANIMATION
========================================================= */

let heroScrambleStarted =
  false;


function startHeroScramble() {

  if (
    heroScrambleStarted
  ) {

    return;

  }


  heroScrambleStarted =
    true;


  heroScrambleElements.forEach(
    (
      element,
      index
    ) => {

      const originalText =
        element.dataset.text ||
        element.textContent.trim();


      element.dataset.text =
        originalText;


      setTimeout(
        () => {

          scrambleText(
            element,
            85
          );

        },
        index * 650
      );

    }
  );

}


/* =========================================================
   START HACKER ANIMATION AFTER BLACK INTRO
========================================================= */

const enterSiteCheckbox =
  document.getElementById(
    "enter-site"
  );


if (enterSiteCheckbox) {

  enterSiteCheckbox.addEventListener(
    "change",
    () => {

      if (
        enterSiteCheckbox.checked
      ) {

        /*
          Black box zoom happens first.
          Then hacker text begins.
        */

        setTimeout(
          () => {

            startHeroScramble();

          },
          1250
        );

      }

    }
  );


  /*
    If homepage was already opened,
    for example when returning with #featured.
  */

  if (
    enterSiteCheckbox.checked &&
    window.location.hash !==
      "#featured"
  ) {

    setTimeout(
      startHeroScramble,
      1250
    );

  }

} else {

  /*
    Pages without the intro,
    such as About CpE.
  */

  setTimeout(
    startHeroScramble,
    450
  );

}


/* =========================================================
   SCRAMBLE ON HOVER
========================================================= */

document
  .querySelectorAll(
    ".scramble-hover"
  )
  .forEach(
    element => {

      element.dataset.text =
        element.textContent.trim();


      element.addEventListener(
        "mouseenter",
        () => {

          scrambleText(
            element,
            45
          );

        }
      );

    }
  );


/* =========================================================
   3. MARQUEE
========================================================= */

const marqueeTrack =
  document.querySelector(
    ".marquee-track"
  );


if (marqueeTrack) {

  let marqueePosition = 0;


  function animateMarquee() {

    marqueePosition -=
      0.25;


    if (
      Math.abs(
        marqueePosition
      ) >=
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
   4. SMOOTH SCROLL
========================================================= */

document.documentElement.style.scrollBehavior =
  "smooth";


/* =========================================================
   5. PIXEL CURSOR + TRAIL
========================================================= */

if (
  window.matchMedia(
    "(pointer: fine)"
  ).matches
) {

  let pixelCursor =
    document.querySelector(
      ".pixel-cursor"
    );


  if (!pixelCursor) {

    pixelCursor =
      document.createElement(
        "div"
      );


    pixelCursor.className =
      "pixel-cursor";


    document.body.appendChild(
      pixelCursor
    );

  }


  const trail = [];

  const trailCount = 8;


  for (
    let i = 0;
    i < trailCount;
    i++
  ) {

    const pixel =
      document.createElement(
        "div"
      );


    pixel.className =
      "cursor-pixel";


    document.body.appendChild(
      pixel
    );


    trail.push({

      element:
        pixel,

      x:
        window.innerWidth / 2,

      y:
        window.innerHeight / 2

    });

  }


  let mouseX =
    window.innerWidth / 2;

  let mouseY =
    window.innerHeight / 2;


  window.addEventListener(
    "mousemove",
    event => {

      mouseX =
        event.clientX;

      mouseY =
        event.clientY;


      pixelCursor.style.left =
        mouseX + "px";

      pixelCursor.style.top =
        mouseY + "px";


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
        Boolean(
          darkSection
        );


      pixelCursor.classList.toggle(
        "cursor-on-dark",
        isDark
      );


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


  document
    .querySelectorAll(
      `
        a,
        button,
        label,
        .menu-open-btn,
        .menu-close-btn,
        .featured-card
      `
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


  function animateCursorTrail() {

    let targetX =
      mouseX;

    let targetY =
      mouseY;


    trail.forEach(
      (
        pixel,
        index
      ) => {

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


  animateCursorTrail();

}


/* =========================================================
   6. FULLSCREEN CHECKBOX MENU
========================================================= */

const menuToggle =
  document.getElementById(
    "menu-toggle"
  );


const fullscreenMenu =
  document.querySelector(
    ".fullscreen-menu"
  );


if (
  menuToggle &&
  fullscreenMenu
) {

  /*
    ESC closes menu
  */

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key ===
          "Escape" &&
        menuToggle.checked
      ) {

        menuToggle.checked =
          false;

      }

    }
  );


  /*
    Close menu when link selected.
  */

  const fullscreenLinks =
    fullscreenMenu.querySelectorAll(
      "a"
    );


  fullscreenLinks.forEach(
    link => {

      link.addEventListener(
        "click",
        () => {

          menuToggle.checked =
            false;

        }
      );

    }
  );

}


/* =========================================================
   7. FEATURED CARD HOVER
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
   8. HOMEPAGE CPE SCROLL ANIMATION
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
   PREPARE WORDS
========================================================= */

scrollRevealTexts.forEach(
  text => {

    /*
      Don't create duplicate spans
      if script is somehow initialized again.
    */

    if (
      text.dataset.wordsReady ===
      "true"
    ) {

      return;

    }


    text.dataset.wordsReady =
      "true";


    const words =
      text.textContent
        .trim()
        .split(/\s+/);


    text.innerHTML =
      words
        .map(
          word => {

            return `
              <span class="scroll-word">
                ${word}
              </span>
            `;

          }
        )
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
   SECTION PROGRESS
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


  const progress =
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
    progress,
    0,
    1
  );

}


/* =========================================================
   WORD REVEAL
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
    (
      word,
      index
    ) => {

      word.classList.toggle(
        "is-active",
        index <
          activeWords
      );

    }
  );

}


/* =========================================================
   UPDATE HOMEPAGE SCROLL
========================================================= */

function updateCpeScrollAnimation() {


  /* =====================================================
     01 / COMPUTER ENGINEERING
  ===================================================== */

  if (cpeMainSection) {

    const mainProgress =
      getSectionProgress(
        cpeMainSection
      );


    /*
      Black background opening
    */

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


    const mainBlock =
      cpeMainSection.querySelector(
        ".cpe-scroll-block"
      );


    if (mainBlock) {

      /*
        Title
      */

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


      /*
        Description
      */

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

      /*
        UE title
      */

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


      /*
        UE description
      */

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


      ueCpeSection.classList.toggle(
        "reading-complete",
        ueTextProgress >= 1
      );

    }

  }

}


window.addEventListener(
  "scroll",
  updateCpeScrollAnimation,
  {
    passive: true
  }
);


window.addEventListener(
  "resize",
  updateCpeScrollAnimation
);


updateCpeScrollAnimation();


/* =========================================================
   9. GENERAL SCROLL REVEALS
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
        window.innerHeight *
        0.85;


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


/* =========================================================
   10. PROGRAM HIGHLIGHTS
   SPECIALIZATION HACKER SCRAMBLE
========================================================= */

const programHighlights =
  document.getElementById(
    "program-highlights"
  );


const specializationElements =
  document.querySelectorAll(
    "[data-specialization-scramble]"
  );


let specializationInside =
  false;


/* =========================================================
   MAKE RANDOM
========================================================= */

function makeSpecializationScrambled(
  element
) {

  if (!element) {

    return;

  }


  const finalText =
    element.dataset.text ||
    element.textContent.trim();


  element.dataset.text =
    finalText;


  clearInterval(
    element.specializationTimer
  );


  element.textContent =
    finalText
      .split("")
      .map(
        character => {

          if (
            character === " " ||
            character === "/" ||
            character === "." ||
            character === "+" ||
            character === "-"
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

}


/* =========================================================
   RANDOM -> REAL TEXT
========================================================= */

function startSpecializationScramble() {

  specializationElements.forEach(
    (
      element,
      index
    ) => {

      const finalText =
        element.dataset.text ||
        element.textContent.trim();


      element.dataset.text =
        finalText;


      clearInterval(
        element.specializationTimer
      );


      let iteration = 0;


      setTimeout(
        () => {

          element.specializationTimer =
            setInterval(
              () => {

                element.textContent =
                  finalText
                    .split("")
                    .map(
                      (
                        character,
                        charIndex
                      ) => {

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
                          charIndex <
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
                    element.specializationTimer
                  );


                  element.textContent =
                    finalText;

                }

              },
              70
            );

        },
        index * 180
      );

    }
  );

}


/* =========================================================
   RESET SPECIALIZATION
========================================================= */

function resetSpecializationScramble() {

  specializationElements.forEach(
    element => {

      makeSpecializationScrambled(
        element
      );

    }
  );

}


/* =========================================================
   CHECK SPECIALIZATION SECTION
========================================================= */

function updateSpecializationScramble() {

  if (
    !programHighlights ||
    !specializationElements.length
  ) {

    return;

  }


  const rect =
    programHighlights.getBoundingClientRect();


  const enterPoint =
    window.innerHeight *
    0.78;


  const isInside =
    rect.top <=
      enterPoint &&
    rect.bottom > 0;


  if (
    isInside &&
    !specializationInside
  ) {

    specializationInside =
      true;


    resetSpecializationScramble();


    setTimeout(
      () => {

        if (
          specializationInside
        ) {

          startSpecializationScramble();

        }

      },
      80
    );

  }


  if (
    !isInside &&
    specializationInside
  ) {

    specializationInside =
      false;


    resetSpecializationScramble();

  }

}


window.addEventListener(
  "scroll",
  updateSpecializationScramble,
  {
    passive: true
  }
);


window.addEventListener(
  "resize",
  updateSpecializationScramble
);


updateSpecializationScramble();


/* =========================================================
   11. HOME <-> ABOUT PAGE TRANSITION
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
   START PAGE TRANSITION
========================================================= */

let transitionRunning =
  false;


function startPageTransition(
  destination,
  message
) {

  if (
    transitionRunning ||
    !destination
  ) {

    return;

  }


  transitionRunning =
    true;


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


  /*
    SLOWER transition.

    This was 700ms before.
    Now the user has enough time to
    actually see the Discover/About animation.
  */

  setTimeout(
    () => {

      window.location.href =
        destination;

    },
    1350
  );

}


/* =========================================================
   ABOUT CPE CARD
========================================================= */

document
  .querySelectorAll(
    '.page-transition-link:not([href="cpe-at-ue.html"])'
  )
  .forEach(
    link => {

      link.addEventListener(
        "click",
        event => {

          event.preventDefault();

          event.stopPropagation();


          const destination =
            link.getAttribute(
              "href"
            );


          startPageTransition(
            destination,
            "DISCOVER ABOUT CpE"
          );

        }
      );

    }
  );


/* =========================================================
   ABOUT CPE BACK BUTTON
========================================================= */

document
  .querySelectorAll(
    ".page-transition-back"
  )
  .forEach(
    link => {

      link.addEventListener(
        "click",
        event => {

          event.preventDefault();

          event.stopPropagation();


          const destination =
            link.getAttribute(
              "href"
            );


          startPageTransition(
            destination,
            "EXPLORE CpE"
          );

        }
      );

    }
  );


/* =========================================================
   RESET TRANSITION WHEN BROWSER GOES BACK
========================================================= */

window.addEventListener(
  "pageshow",
  () => {

    transitionRunning =
      false;


    transitionOverlay.classList.remove(
      "is-active"
    );

  }
);


/* =========================================================
   12. ABOUT CPE
   NORMAL SCROLL REVEALS
========================================================= */

const aboutRevealElements =
  document.querySelectorAll(
    ".about-reveal, .area-reveal"
  );


if (
  aboutRevealElements.length >
  0
) {

  const aboutRevealObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(
          entry => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "is-visible"
              );


              aboutRevealObserver.unobserve(
                entry.target
              );

            }

          }
        );

      },
      {
        threshold: 0.14,
        rootMargin:
          "0px 0px -6% 0px"
      }
    );


  aboutRevealElements.forEach(
    (
      element,
      index
    ) => {

      element.style.transitionDelay =
        (
          (
            index %
            5
          ) *
          0.07
        ) +
        "s";


      aboutRevealObserver.observe(
        element
      );

    }
  );

}


/* =========================================================
   13. ABOUT CPE
   PIXELATED IMAGE REVEAL
========================================================= */

const pixelRevealImages =
  document.querySelectorAll(
    ".pixel-reveal"
  );


pixelRevealImages.forEach(
  pixelImage => {

    const pixelCover =
      pixelImage.querySelector(
        ".pixel-cover"
      );


    if (!pixelCover) {

      return;

    }


    /*
      Prevent duplicate pixel generation.
    */

    if (
      pixelCover.dataset.pixelBuilt ===
      "true"
    ) {

      return;

    }


    pixelCover.dataset.pixelBuilt =
      "true";


    const pixelColor =
      pixelImage.dataset.pixelColor ||
      "#0b0b0b";


    const columns = 12;

    const rows = 8;

    const totalPixels =
      columns * rows;


    for (
      let index = 0;
      index < totalPixels;
      index++
    ) {

      const pixel =
        document.createElement(
          "span"
        );


      pixel.className =
        "pixel-block";


      pixel.style.setProperty(
        "--pixel-color",
        pixelColor
      );


      const column =
        index %
        columns;


      const row =
        Math.floor(
          index /
          columns
        );


      /*
        Creates the pixel-wave effect.
      */

      const delay =
        (
          column *
          0.035
        ) +
        (
          row *
          0.015
        ) +
        (
          Math.random() *
          0.22
        );


      pixel.style.transitionDelay =
        delay + "s";


      const rotation =
        (
          Math.random() *
          40
        ) -
        20;


      pixel.style.setProperty(
        "--pixel-rotation",
        rotation + "deg"
      );


      pixelCover.appendChild(
        pixel
      );

    }

  }
);


/* =========================================================
   ACTIVATE PIXEL REVEAL WHEN SCROLLING
========================================================= */

if (
  pixelRevealImages.length >
  0
) {

  const pixelRevealObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(
          entry => {

            if (
              !entry.isIntersecting
            ) {

              return;

            }


            const image =
              entry.target;


            image.classList.add(
              "pixel-active"
            );


            setTimeout(
              () => {

                image.classList.add(
                  "pixel-finished"
                );

              },
              950
            );


            pixelRevealObserver.unobserve(
              image
            );

          }
        );

      },
      {
        threshold: 0.22,
        rootMargin:
          "0px 0px -4% 0px"
      }
    );


  pixelRevealImages.forEach(
    image => {

      pixelRevealObserver.observe(
        image
      );

    }
  );

}


/* =========================================================
   14. ABOUT CPE IMAGE HOVER
========================================================= */

const aboutPixelImages =
  document.querySelectorAll(
    ".about-cpe-body .pixel-image"
  );


aboutPixelImages.forEach(
  imageBox => {

    imageBox.addEventListener(
      "mousemove",
      event => {

        const image =
          imageBox.querySelector(
            "img"
          );


        if (!image) {

          return;

        }


        const rect =
          imageBox.getBoundingClientRect();


        const moveX =
          (
            (
              event.clientX -
              rect.left
            ) -
            (
              rect.width /
              2
            )
          )
          /
          (
            rect.width /
            2
          );


        const moveY =
          (
            (
              event.clientY -
              rect.top
            ) -
            (
              rect.height /
              2
            )
          )
          /
          (
            rect.height /
            2
          );


        image.style.transform =
          `
            scale(1.025)
            translate(
              ${moveX * -4}px,
              ${moveY * -4}px
            )
          `;

      }
    );


    imageBox.addEventListener(
      "mouseleave",
      () => {

        const image =
          imageBox.querySelector(
            "img"
          );


        if (image) {

          image.style.transform =
            "scale(1)";

        }

      }
    );

  }
);


/* =========================================================
   15. ABOUT HERO PARALLAX
========================================================= */

const aboutHero =
  document.querySelector(
    ".about-new-hero"
  );


const aboutHeroTitle =
  document.querySelector(
    ".about-new-title"
  );


if (
  aboutHero &&
  aboutHeroTitle
) {

  function updateAboutHeroParallax() {

    const heroRect =
      aboutHero.getBoundingClientRect();


    if (
      heroRect.bottom <= 0
    ) {

      return;

    }


    const scrolled =
      Math.max(
        0,
        -heroRect.top
      );


    aboutHeroTitle.style.transform =
      `
        translateY(
          ${scrolled * 0.13}px
        )
      `;

  }


  window.addEventListener(
    "scroll",
    updateAboutHeroParallax,
    {
      passive: true
    }
  );


  updateAboutHeroParallax();

}


/* =========================================================
   16. ABOUT APPLICATION MARQUEE
========================================================= */

const applicationTrack =
  document.querySelector(
    ".application-track"
  );


if (applicationTrack) {

  let applicationPosition =
    0;


  function animateApplicationMarquee() {

    applicationPosition -=
      0.35;


    if (
      Math.abs(
        applicationPosition
      ) >=
      applicationTrack.scrollWidth /
        2
    ) {

      applicationPosition =
        0;

    }


    applicationTrack.style.transform =
      `
        translateX(
          ${applicationPosition}px
        )
      `;


    requestAnimationFrame(
      animateApplicationMarquee
    );

  }


  animateApplicationMarquee();

}


/* =========================================================
   17. IMAGE FALLBACK
========================================================= */

const aboutImages =
  document.querySelectorAll(
    ".about-cpe-body img"
  );


aboutImages.forEach(
  image => {

    image.addEventListener(
      "error",
      () => {

        if (
          image.dataset.fallbackUsed ===
          "true"
        ) {

          return;

        }


        image.dataset.fallbackUsed =
          "true";


        image.src =
          "assets/featured-about.jpg";

      }
    );

  }
);


/* =========================================================
   18. FEATURED SECTION REVEAL
========================================================= */

const featuredSection =
  document.getElementById(
    "featured"
  );


if (featuredSection) {

  const featuredRevealItems =
    featuredSection.querySelectorAll(
      `
        [data-featured-reveal],
        [data-featured-card]
      `
    );


  if (
    featuredRevealItems.length >
    0
  ) {

    const featuredObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(
            entry => {

              if (
                entry.isIntersecting
              ) {

                entry.target.classList.add(
                  "is-visible"
                );


                featuredObserver.unobserve(
                  entry.target
                );

              }

            }
          );

        },
        {
          threshold: 0.12
        }
      );


    featuredRevealItems.forEach(
      (
        item,
        index
      ) => {

        item.style.transitionDelay =
          (
            index *
            0.08
          ) +
          "s";


        featuredObserver.observe(
          item
        );

      }
    );

  }

}


/* =========================================================
   19. KEEP MENU STATE CLEAN
========================================================= */

window.addEventListener(
  "pageshow",
  () => {

    if (menuToggle) {

      menuToggle.checked =
        false;

    }

  }
);

/* =========================================================
   CPE CAREERS TRANSITION
========================================================= */

const careersCard = document.querySelector(
  ".career-transition-link"
);

if (careersCard) {

  careersCard.addEventListener(
    "click",
    function (event) {

      event.preventDefault();
      event.stopImmediatePropagation();

      startPageTransition(
        "careers.html",
        "CpE CAREERS"
      );

    },
    true
  );

}

/* =========================================================
   CPE CAREERS — WOW ANIMATION SYSTEM
   PASTE AT VERY BOTTOM OF SCRIPT.JS
========================================================= */

if (
  document.body.classList.contains(
    "careers-body"
  )
) {

  /* =======================================================
     HERO TITLE CINEMATIC ENTRANCE
  ======================================================= */

  const wowHeroLines =
    document.querySelectorAll(
      ".career-hero-line"
    );


  wowHeroLines.forEach(
    (line, index) => {

      setTimeout(
        () => {

          line.classList.add(
            "career-wow-in"
          );

        },

        250 + index * 190
      );

    }
  );


  /* =======================================================
     HERO PARALLAX
  ======================================================= */

  const wowCareerHero =
    document.querySelector(
      ".careers-hero"
    );

  const wowCareerTitle =
    document.querySelector(
      ".careers-title"
    );

  const wowCareerGrid =
    document.querySelector(
      ".careers-grid-lines"
    );


  function updateCareerWowHero() {

    if (!wowCareerHero) {
      return;
    }


    const rect =
      wowCareerHero
        .getBoundingClientRect();


    const scrollAmount =
      Math.max(
        0,
        -rect.top
      );


    if (wowCareerTitle) {

      wowCareerTitle.style.transform =
        `
        translate3d(
          0,
          ${scrollAmount * 0.16}px,
          0
        )
        scale(
          ${Math.max(
            .88,
            1 -
            scrollAmount * .00015
          )}
        )
        `;

    }


    if (wowCareerGrid) {

      wowCareerGrid.style.transform =
        `
        translate3d(
          0,
          ${scrollAmount * 0.08}px,
          0
        )
        `;

      wowCareerGrid.style.opacity =
        Math.max(
          .15,
          1 -
          scrollAmount / 800
        );

    }

  }


  /* =======================================================
     GENERAL REVEAL ELEMENTS
  ======================================================= */

  const wowRevealElements =
    document.querySelectorAll(
      `
      .career-intro-big,
      .career-intro-small,
      .career-directory-head,
      .career-spectrum-title,
      .career-orbit,
      .career-final-caption
      `
    );


  wowRevealElements.forEach(
    element => {

      element.classList.add(
        "wow-reveal"
      );

    }
  );


  const wowRevealObserver =
    new IntersectionObserver(

      entries => {

        entries.forEach(
          entry => {

            if (
              !entry.isIntersecting
            ) {

              return;

            }


            entry.target.classList.add(
              "wow-visible"
            );


            wowRevealObserver.unobserve(
              entry.target
            );

          }
        );

      },

      {

        threshold:
          0.16,

        rootMargin:
          "0px 0px -10% 0px"

      }

    );


  wowRevealElements.forEach(
    element => {

      wowRevealObserver.observe(
        element
      );

    }
  );


  /* =======================================================
     CAREER ROW REVEALS
  ======================================================= */

  const wowCareerRows =
    document.querySelectorAll(
      ".career-row"
    );


  wowCareerRows.forEach(
    row => {

      row.classList.add(
        "wow-career-row"
      );

    }
  );


  const wowCareerRowObserver =
    new IntersectionObserver(

      entries => {

        entries.forEach(
          entry => {

            if (
              !entry.isIntersecting
            ) {

              return;

            }


            const row =
              entry.target;


            const allRows =
              Array.from(
                wowCareerRows
              );


            const rowIndex =
              allRows.indexOf(
                row
              );


            setTimeout(
              () => {

                row.classList.add(
                  "wow-visible"
                );

              },

              (
                rowIndex %
                3
              ) * 100

            );


            wowCareerRowObserver
              .unobserve(
                row
              );

          }
        );

      },

      {

        threshold:
          0.12,

        rootMargin:
          "0px 0px -5% 0px"

      }

    );


  wowCareerRows.forEach(
    row => {

      wowCareerRowObserver.observe(
        row
      );

    }
  );


  /* =======================================================
     CAREER ROW MAGNETIC MOVEMENT
  ======================================================= */

  wowCareerRows.forEach(
    row => {

      row.addEventListener(
        "mousemove",
        event => {

          const rect =
            row.getBoundingClientRect();


          const mouseX =
            event.clientX -
            rect.left;


          const mouseY =
            event.clientY -
            rect.top;


          const centerX =
            rect.width / 2;


          const centerY =
            rect.height / 2;


          const moveX =
            (
              mouseX -
              centerX
            ) / centerX;


          const moveY =
            (
              mouseY -
              centerY
            ) / centerY;


          const title =
            row.querySelector(
              "h3"
            );


          const number =
            row.querySelector(
              ".career-num"
            );


          const tag =
            row.querySelector(
              ".career-tag"
            );


          if (title) {

            title.style.transform =
              `
              translate(
                ${moveX * 12}px,
                ${moveY * 4}px
              )
              `;

          }


          if (number) {

            number.style.transform =
              `
              translate(
                ${moveX * -8}px,
                ${moveY * -4}px
              )
              `;

          }


          if (tag) {

            tag.style.transform =
              `
              translate(
                ${moveX * 7}px,
                ${moveY * 3}px
              )
              `;

          }

        }
      );


      row.addEventListener(
        "mouseleave",
        () => {

          const movingItems =
            row.querySelectorAll(
              `
              h3,
              .career-num,
              .career-tag
              `
            );


          movingItems.forEach(
            item => {

              item.style.transform =
                "";

            }
          );

        }
      );

    }
  );


  /* =======================================================
     DARK SECTION SWEEP
  ======================================================= */

  const wowDarkSection =
    document.querySelector(
      ".career-spectrum"
    );


  if (wowDarkSection) {

    const darkObserver =
      new IntersectionObserver(

        entries => {

          entries.forEach(
            entry => {

              if (
                !entry.isIntersecting
              ) {

                return;

              }


              entry.target.classList.add(
                "wow-dark-in"
              );


              darkObserver.unobserve(
                entry.target
              );

            }
          );

        },

        {

          threshold:
            0.18

        }

      );


    darkObserver.observe(
      wowDarkSection
    );

  }


/* =======================================================
   CAREER ORBIT — KEEP ORIGINAL DESIGN
======================================================= */

const wowOrbit =
  document.querySelector(
    ".career-orbit"
  );


function updateWowOrbit() {

  // Intentionally empty.
  // Keeps the original orbit design and positioning.

}


  /* =======================================================
     FINAL TITLE CINEMATIC REVEAL
  ======================================================= */

  const wowFinalSection =
    document.querySelector(
      ".career-final"
    );


  const wowFinalLines =
    document.querySelectorAll(
      ".career-final-text span"
    );


  if (
    wowFinalSection &&
    wowFinalLines.length
  ) {

    const finalWowObserver =
      new IntersectionObserver(

        entries => {

          entries.forEach(
            entry => {

              if (
                !entry.isIntersecting
              ) {

                return;

              }


              wowFinalLines.forEach(
                (
                  line,
                  index
                ) => {

                  setTimeout(
                    () => {

                      line.classList.add(
                        "wow-final-in"
                      );

                    },

                    index * 260

                  );

                }
              );


              finalWowObserver.unobserve(
                entry.target
              );

            }
          );

        },

        {

          threshold:
            0.28

        }

      );


    finalWowObserver.observe(
      wowFinalSection
    );

  }


  /* =======================================================
     SCROLL PROGRESS + PARALLAX
  ======================================================= */

  let careerWowTicking =
    false;


  function updateCareerWowScroll() {

    const scrollTop =
      window.scrollY ||
      document.documentElement
        .scrollTop;


    const scrollHeight =
      document.documentElement
        .scrollHeight -
      window.innerHeight;


    const progress =
      scrollHeight > 0
        ? (
            scrollTop /
            scrollHeight
          ) * 100
        : 0;


    document.body.style.setProperty(
      "--career-scroll-progress",
      progress + "%"
    );


    updateCareerWowHero();

    updateWowOrbit();


    careerWowTicking =
      false;

  }


  window.addEventListener(
    "scroll",
    () => {

      if (
        careerWowTicking
      ) {

        return;

      }


      careerWowTicking =
        true;


      requestAnimationFrame(
        updateCareerWowScroll
      );

    },

    {
      passive:
        true
    }

  );


  updateCareerWowScroll();

}

/* =========================================================
   FACULTY PAGE TRANSITION
========================================================= */

const facultyTransitionLink =
  document.querySelector(
    ".faculty-transition-link"
  );


if (facultyTransitionLink) {

  facultyTransitionLink.addEventListener(
    "click",
    function (event) {

      event.preventDefault();

      event.stopImmediatePropagation();


      startPageTransition(
        "faculty.html",
        "MEET THE FACULTY"
      );

    },

    true
  );

}

/* =========================================================
   FACULTY — CINEMATIC ENTRANCE
========================================================= */

if (
  document.body.classList.contains("faculty-body")
) {

  const facultyEntry =
    document.getElementById("facultyEntry");


  if (facultyEntry) {

    document.body.style.overflow = "hidden";


    setTimeout(() => {

      facultyEntry.classList.add(
        "faculty-entry-exit"
      );

    }, 2100);


    setTimeout(() => {

      facultyEntry.classList.add(
        "faculty-entry-gone"
      );

      document.body.style.overflow = "";

    }, 3100);

  }

}

/* =========================================================
   FACULTY PAGE TRANSITION
   Same transition style as Careers
========================================================= */

const facultyPageTransitionButton =
  document.querySelector(
    'a.faculty-transition-link[href="faculty.html"]'
  );

if (facultyPageTransitionButton) {

  facultyPageTransitionButton.addEventListener(
    "click",
    function (event) {

      event.preventDefault();
      event.stopImmediatePropagation();

      startPageTransition(
        "faculty.html",
        "MEET THE FACULTY"
      );

    },
    true
  );

}

/* =========================================================
   FACULTY HERO — ARRIVAL ANIMATION
========================================================= */

if (
  document.body.classList.contains("faculty-body")
) {

  /* Put hero into starting animation state immediately */
  document.body.classList.add(
    "faculty-arriving"
  );


  window.addEventListener(
    "load",
    function () {

      /*
        Small delay allows the browser to actually
        render the hidden starting state first.
      */

      requestAnimationFrame(() => {

        requestAnimationFrame(() => {

          document.body.classList.remove(
            "faculty-arriving"
          );

          document.body.classList.add(
            "faculty-arrived"
          );

        });

      });

    }
  );

}



/* =========================================================
   FACULTY — DOSSIER / SCANNER CONTROLLER
   New animation style; does not move card columns.
========================================================= */
(function () {
  const body = document.body;
  if (!body || !body.classList.contains("faculty-body")) return;

  /* Remove any inline transforms left by older Faculty experiments. */
  document.querySelectorAll(".faculty-grid-item").forEach(item => {
    item.style.removeProperty("transform");
  });

  /* Top loading / scroll progress line */
  const track = document.createElement("div");
  track.className = "faculty-load-track";
  track.innerHTML = '<span class="faculty-load-bar"></span>';
  body.appendChild(track);

  const loadBar = track.querySelector(".faculty-load-bar");

  /* Start as a quick page-load animation, then become scroll progress. */
  requestAnimationFrame(() => {
    loadBar.style.transition =
      "transform 1s cubic-bezier(.16,1,.3,1)";
    loadBar.style.transform = "scaleX(.72)";
  });

  window.addEventListener("load", () => {
    loadBar.style.transform = "scaleX(1)";
    setTimeout(() => {
      loadBar.style.transition = "none";
      updateFacultyProgress();
    }, 700);
  });

  function updateFacultyProgress() {
    const max =
      Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const value =
      Math.max(0, Math.min(1, scrollY / max));
    loadBar.style.transform = `scaleX(${value})`;
  }

  window.addEventListener("scroll", updateFacultyProgress, { passive: true });
  window.addEventListener("resize", updateFacultyProgress, { passive: true });

  /* Faculty cards — dossier reveal without changing Bootstrap layout */
  const cards = [...document.querySelectorAll(".faculty-card")];

  cards.forEach(card => {
    if (!card.querySelector(".faculty-dossier-scan")) {
      const scan = document.createElement("span");
      scan.className = "faculty-dossier-scan";
      card.appendChild(scan);
    }
  });

  const cardObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const card = entry.target;
      const index = cards.indexOf(card);

      setTimeout(() => {
        card.classList.add("faculty-dossier-in");
      }, (index % 3) * 140);

      cardObserver.unobserve(card);
    });
  }, {
    threshold: .14,
    rootMargin: "0px 0px -7% 0px"
  });

  cards.forEach(card => cardObserver.observe(card));

  /* Directory heading line */
  const directoryHeading =
    document.querySelector(".faculty-directory-heading");

  if (directoryHeading) {
    const headingObserver = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        directoryHeading.classList.add("faculty-directory-live");
        headingObserver.disconnect();
      }
    }, { threshold: .28 });

    headingObserver.observe(directoryHeading);
  }

  /* Closing section: scanner sweep + staggered title lock-in */
  const closing = document.querySelector(".faculty-closing");

  if (closing) {
    const lines =
      [...closing.querySelectorAll(".faculty-closing-text span")];

    const closingObserver = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;

      closing.classList.add("faculty-closing-live");

      lines.forEach((line, index) => {
        setTimeout(() => {
          line.classList.add("faculty-lock-in");
        }, 220 + index * 190);
      });

      closingObserver.disconnect();
    }, {
      threshold: .28
    });

    closingObserver.observe(closing);
  }
})();


/* =========================================================
   FACULTY HERO — EDITORIAL TYPOGRAPHY ENTRANCE
   Safe enhancement: if JS fails, title is still visible.
========================================================= */
(function () {
  const body = document.body;
  if (!body || !body.classList.contains("faculty-body")) return;

  body.classList.add("faculty-type-prep");

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      body.classList.add("faculty-type-show");
    });
  });

  /* After the entrance, remove the prep state so the title
     stays in its normal final layout. */
  setTimeout(() => {
    body.classList.remove("faculty-type-prep");
  }, 2200);
})();




/* =========================================================
   FACULTY CLOSING — BLACK TAKEOVER + RED EDGE
   Scroll-linked. Does not change hero, cards, menu, cursor, or page entrance.
========================================================= */
(function () {
  const closing = document.querySelector(".faculty-body .faculty-closing");
  if (!closing) return;

  let ticking = false;

  function clamp01(value) {
    return Math.max(0, Math.min(1, value));
  }

  function updateFacultyClosingTakeover() {
    const rect = closing.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;

    /* Starts when the section approaches the bottom of the viewport,
       finishes shortly after it enters. */
    const progress = clamp01((vh - rect.top) / (vh * 0.72));

    /* 50% -> 0% makes the black panel open from center to full width. */
    const inset = 50 * (1 - progress);

    /* Let the title appear after the black panel has visibly opened. */
    const contentProgress = clamp01((progress - 0.32) / 0.46);

    closing.style.setProperty(
      "--faculty-close-inset",
      inset.toFixed(3) + "%"
    );

    closing.style.setProperty(
      "--faculty-close-content",
      contentProgress.toFixed(3)
    );

    ticking = false;
  }

  function requestFacultyClosingTakeover() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateFacultyClosingTakeover);
  }

  window.addEventListener("scroll", requestFacultyClosingTakeover, { passive: true });
  window.addEventListener("resize", requestFacultyClosingTakeover, { passive: true });

  updateFacultyClosingTakeover();
})();

/* =========================================================
   SCPES PAGE — THE NETWORK
   Unique construction animation + scroll activation.
========================================================= */
(function () {
  const body = document.body;
  if (!body) return;

  /* Homepage/card transition to SCPES. Capture phase keeps the
     generic About transition from taking over this card. */
  const scpesTransitionLinks = document.querySelectorAll(
    'a.scpes-transition-link[href="scpes.html"]'
  );

  scpesTransitionLinks.forEach(link => {
    link.addEventListener(
      "click",
      event => {
        event.preventDefault();
        event.stopImmediatePropagation();
        if (typeof startPageTransition === "function") {
          startPageTransition("scpes.html", "MEET THE FACULTY");
        } else {
          window.location.href = "scpes.html";
        }
      },
      true
    );
  });

  if (!body.classList.contains("scpes-body")) return;

  /* Network hero constructs itself — no reused title wipe. */
  requestAnimationFrame(() => {
    requestAnimationFrame(() => body.classList.add("scpes-ready"));
  });

  /* Reveal content safely: sections are visible if IO is unsupported. */
  const revealSections = document.querySelectorAll(".scpes-reveal-section");
  const finale = document.querySelector(".scpes-finale");

  if (!("IntersectionObserver" in window)) {
    revealSections.forEach(section => section.classList.add("is-visible"));
    if (finale) finale.classList.add("is-visible");
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  revealSections.forEach(section => observer.observe(section));
  if (finale) observer.observe(finale);

  /* Small depth response in the network only. */
  const network = document.querySelector(".scpes-network");
  let ticking = false;

  function updateScpesDepth() {
    ticking = false;
    if (!network) return;
    const hero = document.querySelector(".scpes-hero");
    if (!hero) return;
    const rect = hero.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height)));
    network.style.transform = `translate3d(0, ${progress * 38}px, 0) scale(${1 + progress * 0.025})`;
    network.style.opacity = String(Math.max(0.28, 0.95 - progress * 0.45));
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateScpesDepth);
      }
    },
    { passive: true }
  );

  updateScpesDepth();
})();