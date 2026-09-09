const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";


/* =========================================================
   0. CODED PUSHING PERSON LOADER
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


  cssPerson.classList.remove(
    "is-leaving"
  );


  pageLoader.classList.remove(
    "is-finished"
  );

  pageLoader.classList.add(
    "is-pushing"
  );


  function animatePush(currentTime) {

    if (!startTime) {
      startTime = currentTime;
    }


    const elapsed =
      currentTime - startTime;


    const rawProgress =
      Math.min(
        elapsed / loadingDuration,
        1
      );


    const progress =
      easeInOutCubic(rawProgress);


    const percentage =
      progress * 100;


    /* MOVE PERSON + LINE */

    pushStage.style.setProperty(
      "--push-position",
      percentage + "%"
    );


    /* REVEAL PICTURE */

    const hiddenRight =
      100 - percentage;


    loaderImage.style.clipPath =
      `inset(0 ${hiddenRight}% 0 0)`;

    loaderImage.style.webkitClipPath =
      `inset(0 ${hiddenRight}% 0 0)`;


    /* NUMBER */

    if (pushLoadingNumber) {

      pushLoadingNumber.textContent =
        String(
          Math.round(
            rawProgress * 100
          )
        ).padStart(
          2,
          "0"
        );

    }


    if (rawProgress < 1) {

      requestAnimationFrame(
        animatePush
      );

      return;

    }


    /* FINISH */

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


    setTimeout(() => {

      pageLoader.classList.add(
        "is-finished"
      );

    }, 750);

  }


  requestAnimationFrame(
    animatePush
  );

}


/* =========================================================
   LOAD HOMEPAGE
========================================================= */

window.addEventListener(
  "load",
  () => {

    /*
      RETURNING FROM ABOUT CPE
    */

    if (
      window.location.hash === "#featured"
    ) {

      if (pageLoader) {

        pageLoader.classList.add(
          "is-finished"
        );

      }


      const homeEnterSite =
        document.getElementById(
          "enter-site"
        );


      if (homeEnterSite) {

        homeEnterSite.checked =
          true;

      }


      const featuredSection =
        document.getElementById(
          "featured"
        );


      if (featuredSection) {

        setTimeout(() => {

          featuredSection.scrollIntoView({
            behavior: "auto",
            block: "start"
          });

        }, 50);

      }


      return;

    }


    startLoader();

  }
);


/* =========================================================
   SCRAMBLE TEXT
========================================================= */

function scrambleText(
  element,
  speed = 90
) {

  const finalText =
    element.dataset.text ||
    element.textContent.trim();


  let progress = 0;


  clearInterval(
    element.scrambleTimer
  );


  element.scrambleTimer =
    setInterval(() => {

      element.textContent =
        finalText
          .split("")
          .map(
            (char, index) => {

              if (
                char === " " ||
                char === "/" ||
                char === "." ||
                char === "+" ||
                char === "×" ||
                char === "•"
              ) {

                return char;

              }


              if (
                index < progress
              ) {

                return finalText[index];

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


      progress +=
        Number(
          element.dataset.progress
        ) || 0.55;


      if (
        progress >=
        finalText.length
      ) {

        clearInterval(
          element.scrambleTimer
        );


        element.textContent =
          finalText;

      }

    }, speed);

}


/* =========================================================
   BLACK BOX INTRO
========================================================= */

const enterSite =
  document.getElementById(
    "enter-site"
  );


function startPageScramble() {

  document
    .querySelectorAll(
      "[data-scramble]"
    )
    .forEach(
      (element, index) => {

        setTimeout(() => {

          scrambleText(
            element,
            85
          );

        }, index * 260);

      }
    );

}


if (enterSite) {

  enterSite.addEventListener(
    "change",
    () => {

      if (
        enterSite.checked
      ) {

        setTimeout(() => {

          startPageScramble();

        }, 1250);

      }

    }
  );

} else {

  setTimeout(() => {

    startPageScramble();

  }, 400);

}


/* =========================================================
   HOVER SCRAMBLE
========================================================= */

document
  .querySelectorAll(
    ".scramble-hover"
  )
  .forEach(element => {

    element.dataset.text =
      element.textContent.trim();


    element.addEventListener(
      "mouseenter",
      () => {

        scrambleText(
          element,
          70
        );

      }
    );

  });


/* =========================================================
   PIXEL CURSOR
========================================================= */

if (
  window
    .matchMedia(
      "(pointer: fine)"
    )
    .matches
) {

  const pixelCursor =
    document.createElement(
      "div"
    );


  pixelCursor.className =
    "pixel-cursor";


  document.body.appendChild(
    pixelCursor
  );


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

      element: pixel,

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


      trail.forEach(pixel => {

        pixel.element.classList.toggle(
          "cursor-on-dark",
          isDark
        );

      });

    }
  );


  function animateTrail() {

    let targetX =
      mouseX;


    let targetY =
      mouseY;


    trail.forEach(
      (pixel, index) => {

        const followSpeed =
          0.24 -
          (index * 0.012);


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
      animateTrail
    );

  }


  animateTrail();

}


/* =========================================================
   HOMEPAGE CPE SCROLL ANIMATION
========================================================= */

const cpeSection =
  document.querySelector(
    ".cpe-scroll-section"
  );


const scrollBlocks =
  document.querySelectorAll(
    ".cpe-scroll-block"
  );


const scrollRevealTexts =
  document.querySelectorAll(
    "[data-scroll-reveal]"
  );


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


function updateCpeScrollAnimation() {

  if (!cpeSection) {
    return;
  }


  const sectionRect =
    cpeSection
      .getBoundingClientRect();


  const sectionHeight =
    cpeSection.offsetHeight;


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


  sectionProgress =
    clamp(
      sectionProgress,
      0,
      1
    );


  const backgroundProgress =
    clamp(
      sectionProgress / 0.20,
      0,
      1
    );


  const bgInset =
    50 -
    (
      backgroundProgress *
      50
    );


  cpeSection.style.setProperty(
    "--bg-open",
    bgInset + "%"
  );


  const firstBlock =
    scrollBlocks[0];


  const secondBlock =
    scrollBlocks[1];


  if (firstBlock) {

    const firstTitleProgress =
      clamp(
        (
          sectionProgress -
          0.20
        )
        /
        0.15,
        0,
        1
      );


    firstBlock.style.setProperty(
      "--title-drop-progress",
      firstTitleProgress
    );


    const firstText =
      firstBlock.querySelector(
        "[data-scroll-reveal]"
      );


    if (firstText) {

      const firstTextProgress =
        clamp(
          (
            sectionProgress -
            0.35
          )
          /
          0.25,
          0,
          1
        );


      const words =
        firstText.querySelectorAll(
          ".scroll-word"
        );


      const activeWords =
        Math.floor(
          firstTextProgress *
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

  }


  if (secondBlock) {

    const secondTitleProgress =
      clamp(
        (
          sectionProgress -
          0.60
        )
        /
        0.15,
        0,
        1
      );


    secondBlock.style.setProperty(
      "--title-drop-progress",
      secondTitleProgress
    );


    const secondText =
      secondBlock.querySelector(
        "[data-scroll-reveal]"
      );


    if (secondText) {

      const secondTextProgress =
        clamp(
          (
            sectionProgress -
            0.72
          )
          /
          0.16,
          0,
          1
        );


      const words =
        secondText.querySelectorAll(
          ".scroll-word"
        );


      const activeWords =
        Math.floor(
          secondTextProgress *
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


  setTimeout(() => {

    window.location.href =
      destination;

  }, 1050);

}


document
  .querySelectorAll(
    ".page-transition-link"
  )
  .forEach(link => {

    link.addEventListener(
      "click",
      event => {

        event.preventDefault();


        const destination =
          link.getAttribute(
            "href"
          );


        startPageTransition(
          destination,
          "ABOUT CpE"
        );

      }
    );

  });


document
  .querySelectorAll(
    ".page-transition-back"
  )
  .forEach(link => {

    link.addEventListener(
      "click",
      event => {

        event.preventDefault();


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

  });


window.addEventListener(
  "pageshow",
  () => {

    transitionOverlay.classList.remove(
      "is-active"
    );

  }
);


/* =========================================================
   ABOUT CPE SCROLL REVEALS
========================================================= */

const aboutRevealElements =
  document.querySelectorAll(
    ".about-reveal, .area-reveal"
  );


if (
  aboutRevealElements.length > 0
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
        threshold: 0.14
      }
    );


  aboutRevealElements.forEach(
    (element, index) => {

      element.style.transitionDelay =
        (
          (index % 5) *
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
        index % columns;


      const row =
        Math.floor(
          index / columns
        );


      const delay =
        (
          column * 0.035
        ) +
        (
          row * 0.015
        ) +
        (
          Math.random() * 0.22
        );


      pixel.style.transitionDelay =
        delay + "s";


      pixel.style.setProperty(
        "--pixel-rotation",
        (
          (
            Math.random() *
            40
          ) -
          20
        ) +
        "deg"
      );


      pixelCover.appendChild(
        pixel
      );

    }

  }
);


/* =========================================================
   ACTIVATE PIXEL REVEAL ON SCROLL
========================================================= */

if (
  pixelRevealImages.length > 0
) {

  const pixelRevealObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(
          entry => {

            if (
              entry.isIntersecting
            ) {

              const image =
                entry.target;


              image.classList.add(
                "pixel-active"
              );


              setTimeout(() => {

                image.classList.add(
                  "pixel-finished"
                );

              }, 950);


              pixelRevealObserver.unobserve(
                image
              );

            }

          }
        );

      },
      {
        threshold: 0.22
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
   ABOUT IMAGE HOVER MOVEMENT
========================================================= */

const aboutPixelImages =
  document.querySelectorAll(
    ".pixel-image"
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
            rect.width / 2
          )
          /
          (
            rect.width / 2
          );


        const moveY =
          (
            (
              event.clientY -
              rect.top
            ) -
            rect.height / 2
          )
          /
          (
            rect.height / 2
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
   ABOUT HERO PARALLAX
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

  window.addEventListener(
    "scroll",
    () => {

      const heroRect =
        aboutHero
          .getBoundingClientRect();


      if (
        heroRect.bottom > 0
      ) {

        const scrolled =
          Math.max(
            0,
            -heroRect.top
          );


        aboutHeroTitle.style.transform =
          `translateY(${scrolled * 0.13}px)`;

      }

    },
    {
      passive: true
    }
  );

}