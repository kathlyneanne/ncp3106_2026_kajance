/* =========================================================

   EXPLORE CPE -> SPECIALIZATION TRANSITION

   SAME BEHAVIOR AS STUDENT PROJECTS

   ========================================================= */

window.addEventListener("DOMContentLoaded", () => {

  const params = new URLSearchParams(window.location.search);

  const cameFromExplore = params.get("from") === "explore";

  const loader = document.querySelector("#explore-specialization-loader");

 

  if (loader) {

    if (cameFromExplore) {

      loader.classList.add("from-explore");

 

      requestAnimationFrame(() => {

        requestAnimationFrame(() => {

          loader.classList.add("page-transition-out");

        });

      });

 

      setTimeout(() => {

        const cleanURL = window.location.pathname + window.location.hash;

        window.history.replaceState({}, "", cleanURL);

      }, 900);

 

      setTimeout(() => {

        loader.style.display = "none";

      }, 1000);

    } else {

      loader.classList.add("no-explore-transition");

    }

  }

});

 

/* =========================================================

   UE / CpE

   SPECIALIZATION JAVASCRIPT

========================================================= */

 

 

/* =========================================================

   PIXEL CURSOR + SQUARE TRAIL

   REFERENCE STYLE: LARGE LEAD SQUARE + FADING BLOCKS

========================================================= */

 

const supportsCustomCursor =

  window.matchMedia("(hover: hover)").matches ||

  window.matchMedia("(any-pointer: fine)").matches;

 

 

if (supportsCustomCursor) {

 

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

 

 

  /* Remove any old trail blocks before creating the new trail. */

  document

    .querySelectorAll(

      ".cursor-pixel"

    )

    .forEach(

      pixel => pixel.remove()

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

 

    pixel.style.setProperty(

      "--trail-index",

      i

    );

 

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

 

 

  /* =========================================================

     DETECT LIGHT / DARK BACKGROUND

  ========================================================= */

 

  function detectDarkBackground(

    x,

    y

  ) {

 

    const elementUnderCursor =

      document.elementFromPoint(

        x,

        y

      );

 

 

    if (!elementUnderCursor) {

      return false;

    }

 

 

    /*

       LIGHT SECTIONS

       Cursor must be BLACK.

    */

 

    const lightSection =

      elementUnderCursor.closest(

        ".spec-hero, .field-explorer, .spec-final"

      );

 

 

    if (lightSection) {

      return false;

    }

 

 

    /*

       DARK SECTIONS

       Cursor must be WHITE.

    */

 

    const darkSection =

      elementUnderCursor.closest(

        ".program-highlights, .signal-map, .menu-overlay, .cursor-dark-zone"

      );

 

 

    if (darkSection) {

      return true;

    }

 

 

    /*

       FALLBACK:

       Automatically inspect background color.

    */

 

    let current =

      elementUnderCursor;

 

 

    while (

      current &&

      current !== document.documentElement

    ) {

 

      const background =

        window.getComputedStyle(

          current

        ).backgroundColor;

 

 

      if (

        background &&

        background !== "transparent" &&

        background !== "rgba(0, 0, 0, 0)"

      ) {

 

        const match =

          background.match(

            /rgba?\(([^)]+)\)/

          );

 

 

        if (match) {

 

          const values =

            match[1]

              .split(",")

              .map(

                value =>

                  parseFloat(

                    value.trim()

                  )

              );

 

 

          const r =

            values[0] || 0;

 

          const g =

            values[1] || 0;

 

          const b =

            values[2] || 0;

 

 

          const a =

            values.length > 3

              ? values[3]

              : 1;

 

 

          if (a > 0.05) {

 

            const luminance =

              (0.299 * r) +

              (0.587 * g) +

              (0.114 * b);

 

 

            return luminance < 145;

 

          }

 

        }

 

      }

 

 

      current =

        current.parentElement;

 

    }

 

 

    return false;

 

  }

 

 

  /* =========================================================

     CURSOR MOVEMENT

  ========================================================= */

 

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

 

 

      pixelCursor.classList.add(

        "cursor-ready"

      );

 

 

      const isDark =

        detectDarkBackground(

          mouseX,

          mouseY

        );

 

 

      pixelCursor.classList.toggle(

        "cursor-on-dark",

        isDark

      );

 

 

      trail.forEach(

        pixel => {

 

          pixel.element.classList.add(

            "cursor-ready"

          );

 

 

          pixel.element.classList.toggle(

            "cursor-on-dark",

            isDark

          );

 

        }

      );

 

    }

  );

 

 

  /* =========================================================

     CURSOR TRAIL

  ========================================================= */

 

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

          0.30 -

          (index * 0.018);

 

 

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

   MENU

========================================================= */

 

const menuButton =

  document.getElementById(

    "menuButton"

  );

 

 

const menuOverlay =

  document.getElementById(

    "menuOverlay"

  );

 

 

const closeMenu =

  document.getElementById(

    "closeMenu"

  );

 

 

function openMenu() {

 

  if (!menuOverlay) {

    return;

  }

 

 

  menuOverlay.classList.add(

    "active"

  );

 

 

  menuOverlay.classList.add(

    "cursor-dark-zone"

  );

 

 

  document.body.classList.add(

    "menu-open"

  );

 

}

 

 

function closeMenuFunction() {

 

  if (!menuOverlay) {

    return;

  }

 

 

  menuOverlay.classList.remove(

    "active"

  );

 

 

  menuOverlay.classList.remove(

    "cursor-dark-zone"

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

 

 

if (closeMenu) {

 

  closeMenu.addEventListener(

    "click",

    closeMenuFunction

  );

 

}

 

 

document.addEventListener(

  "keydown",

  event => {

 

    if (

      event.key === "Escape"

    ) {

 

      closeMenuFunction();

 

    }

 

  }

);

 

 

document

  .querySelectorAll(

    ".menu-item"

  )

  .forEach(

    item => {

 

      item.addEventListener(

        "click",

        () => {

 

          const href =

            item.getAttribute(

              "href"

            );

 

 

          if (

            href === "#" ||

            href === null

          ) {

 

            closeMenuFunction();

 

          }

 

        }

      );

 

    }

  );

 

 

/* =========================================================

   SPECIALIZATION SCRAMBLE

   REPLAYS WHEN SCROLLING DOWN OR BACK UP

========================================================= */

 

const chars =

  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

 

 

function scramble(

  element

) {

 

  const finalText =

    element.dataset.text ||

    element.textContent.trim();

 

 

  /*

     Always save the original text.

  */

 

  element.dataset.originalText =

    finalText;

 

 

  let progress = 0;

 

 

  clearInterval(

    element._timer

  );

 

 

  element._timer =

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

 

                /*

                   Keep spaces, slash and period.

                */

 

                if (

                  character === " " ||

                  character === "/" ||

                  character === "."

                ) {

 

                  return character;

 

                }

 

 

                /*

                   Reveal correct characters gradually.

                */

 

                if (

                  index < progress

                ) {

 

                  return character;

 

                }

 

 

               

 

 /*

                   Random scramble character.

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

 

 

        /*

           SLOW SCRAMBLE SPEED

 

           Smaller number = longer animation.

        */

 

        progress += .25;

 

 

        if (

          progress >=

          finalText.length

        ) {

 

          clearInterval(

            element._timer

          );

 

 

          element.textContent =

            finalText;

 

        }

 

      },

 

      55

    );

 

}

 

 

/* =========================================================

   SCRAMBLE OBSERVER

========================================================= */

 

const scrambleElements =

  document.querySelectorAll(

    "[data-spec-scramble]"

  );

 

 

const specializationObserver =

  new IntersectionObserver(

    entries => {

 

      entries.forEach(

        entry => {

 

          /*

             ENTERING SCREEN

          */

 

          if (

            entry.isIntersecting

          ) {

 

            if (

              entry.target.dataset.scrambleActive !== "1"

            ) {

 

              entry.target.dataset.scrambleActive =

                "1";

 

 

              scramble(

                entry.target

              );

 

            }

 

          }

 

 

          /*

             LEAVING SCREEN

 

             Reset the element so the scramble can

             happen again when scrolling back.

          */

 

          else {

 

            entry.target.dataset.scrambleActive =

              "0";

 

 

            clearInterval(

              entry.target._timer

            );

 

 

            const originalText =

              entry.target.dataset.text ||

              entry.target.dataset.originalText;

 

 

            if (originalText) {

 

              entry.target.textContent =

                originalText;

 

            }

 

          }

 

        }

      );

 

    },

 

    {

      threshold: .35

    }

  );

 

 

scrambleElements.forEach(

  element => {

 

    specializationObserver.observe(

      element

    );

 

  }

);

 

/* =========================================================

   SCROLL REVEAL

   REPLAYS EVERY TIME THE ELEMENT ENTERS THE SCREEN

========================================================= */

 

const revealObserver =

  new IntersectionObserver(

    entries => {

 

      entries.forEach(

        entry => {

 

          /*

             ENTER SCREEN

             Play animation.

          */

 

          if (entry.isIntersecting) {

 

            entry.target.classList.add(

              "is-visible"

            );

 

          }

 

          /*

             LEAVE SCREEN

             Reset animation.

          */

 

          else {

 

            entry.target.classList.remove(

              "is-visible"

            );

 

          }

 

        }

      );

 

    },

    {

      threshold: .12

    }

  );

 

document

  .querySelectorAll(

    ".reveal, .reveal-card"

  )

  .forEach(

    element => {

 

      revealObserver.observe(

        element

      );

 

    }

  );

 

 

console.log(

  "UE / CpE — Specialization loaded successfully."

);