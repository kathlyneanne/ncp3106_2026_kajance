const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";


/* =====================================
   0. PAGE LOADING EFFECT
   IMAGE + BLACK COMPUTER + IMAGE/BAR GLITCH
===================================== */

const pageLoader =
  document.getElementById("page-loader");

const loaderImage =
  document.getElementById("loader-image");

const loaderBarFill =
  document.getElementById("loader-bar-fill");

const loaderComputer =
  document.getElementById("loader-chip");


function startLoader() {

  if (
    !pageLoader ||
    !loaderImage ||
    !loaderBarFill ||
    !loaderComputer
  ) {
    return;
  }


  let progress = 0;


  /* =====================================
     LOADING SPEED

     8000 = 8 seconds
     Change this if you want the loading
     animation faster or slower.
  ===================================== */

  const loadingDuration = 8000;

  let startTime = null;


  function animateLoading(currentTime) {

    if (!startTime) {
      startTime = currentTime;
    }


    const elapsed =
      currentTime - startTime;


    progress =
      Math.min(
        elapsed / loadingDuration,
        1
      );


    const percent =
      progress * 100;



    /* =====================================
       LOADING BAR
    ===================================== */

    loaderBarFill.style.width =
      percent + "%";



    /* =====================================
       MOVING BLACK COMPUTER
       COMPUTER DOES NOT GLITCH
    ===================================== */

    loaderComputer.style.left =
      percent + "%";



    /* =====================================
       PICTURE REVEAL
       LEFT -> RIGHT
    ===================================== */

    const hiddenRight =
      100 - percent;


    loaderImage.style.clipPath =
      `inset(0 ${hiddenRight}% 0 0)`;


    loaderImage.style.webkitClipPath =
      `inset(0 ${hiddenRight}% 0 0)`;



    /* =====================================
       CONTINUE LOADING
    ===================================== */

    if (progress < 1) {

      requestAnimationFrame(
        animateLoading
      );

    } else {


      /* =====================================
         FORCE LOADING TO 100%
      ===================================== */

      loaderBarFill.style.width =
        "100%";


      loaderComputer.style.left =
        "100%";


      loaderImage.style.clipPath =
        "inset(0 0 0 0)";


      loaderImage.style.webkitClipPath =
        "inset(0 0 0 0)";



      /* =====================================
         GLITCH AFTER LOADING

         ONLY:
         - Loading picture
         - Loading bar

         NOT:
         - Whole screen
         - Computer
      ===================================== */

      setTimeout(() => {


        /*
          This class activates the CSS glitch.

          The CSS only targets:
          .loader-image
          .loader-bar-fill
        */

        pageLoader.classList.add(
          "glitch-out"
        );


        /*
          Wait for the glitch animation
          to finish.
        */

        setTimeout(() => {


          /* Hide loading screen */

          pageLoader.classList.add(
            "is-finished"
          );


          /*
            Remove glitch class after
            loader disappears.
          */

          setTimeout(() => {

            pageLoader.classList.remove(
              "glitch-out"
            );

          }, 100);


        }, 950);


      }, 250);

    }

  }


  requestAnimationFrame(
    animateLoading
  );

}



/* =====================================
   START LOADER
===================================== */

window.addEventListener(
  "load",
  startLoader
);



/* =====================================
   1. SCRAMBLED LETTER EFFECT
===================================== */

function scrambleText(element, speed = 90) {

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
          .map((char, index) => {


            /* KEEP SYMBOLS NORMAL */

            if (
              char === " " ||
              char === "/" ||
              char === "." ||
              char === "+"
            ) {

              return char;

            }


            /* SHOW CORRECT LETTER */

            if (index < progress) {

              return finalText[index];

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


      progress +=
        Number(
          element.dataset.progress
        ) || 0.55;


      /* FINISH */

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



/* =====================================
   2. SCRAMBLE AFTER OPENING WEBSITE
===================================== */

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


      if (enterSite.checked) {

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



/* =====================================
   3. SCRAMBLE WHEN HOVERING
===================================== */

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



/* =====================================
   4. PIXEL CURSOR
===================================== */

if (
  window
    .matchMedia(
      "(pointer: fine)"
    )
    .matches
) {


  /* MAIN CURSOR */

  const pixelCursor =
    document.createElement(
      "div"
    );


  pixelCursor.className =
    "pixel-cursor";


  document.body.appendChild(
    pixelCursor
  );



  /* =====================================
     CURSOR TRAIL
  ===================================== */

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



  /* =====================================
     MOUSE POSITION
  ===================================== */

  let mouseX =
    window.innerWidth / 2;


  let mouseY =
    window.innerHeight / 2;


  /* =====================================
     MOUSE POSITION + CURSOR COLOR SENSOR
  ===================================== */

  window.addEventListener(
    "mousemove",
    event => {

      mouseX =
        event.clientX;

      mouseY =
        event.clientY;


      /* MOVE MAIN CURSOR */

      pixelCursor.style.left =
        mouseX + "px";

      pixelCursor.style.top =
        mouseY + "px";


      /* =====================================
         CHECK IF CURSOR IS ON BLACK SECTION
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


      /* =====================================
         MAIN CURSOR
         BLACK -> WHITE
      ===================================== */

      pixelCursor.classList.toggle(
        "cursor-on-dark",
        isDark
      );


      /* =====================================
         PIXEL TRAIL
         BLACK -> WHITE
      ===================================== */

      trail.forEach(pixel => {

        pixel.element.classList.toggle(
          "cursor-on-dark",
          isDark
        );

      });

    }
  );


  /* =====================================
     CURSOR TRAIL ANIMATION
  ===================================== */

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



/* =====================================
   5. CPE SCROLL ANIMATION
===================================== */

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



/* =====================================
   6. SPLIT DESCRIPTION INTO WORDS
===================================== */

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



/* =====================================
   7. CLAMP
===================================== */

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



/* =====================================
   8. UPDATE CPE SCROLL ANIMATION
===================================== */

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



  /* =====================================
     WHOLE SECTION PROGRESS
  ===================================== */

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



  /* =====================================
     BLACK BACKGROUND
  ===================================== */

  const backgroundProgress =
    clamp(

      sectionProgress /
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


  cpeSection.style.setProperty(
    "--bg-open",
    bgInset + "%"
  );



  const firstBlock =
    scrollBlocks[0];


  const secondBlock =
    scrollBlocks[1];



  /* =====================================
     COMPUTER ENGINEERING
  ===================================== */

  if (firstBlock) {


    /* TITLE */

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



    /* DESCRIPTION */

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



  /* =====================================
     UE COMPUTER ENGINEERING
  ===================================== */

  if (secondBlock) {


    /* TITLE */

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



    /* DESCRIPTION */

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



/* =====================================
   9. SCROLL LISTENER
===================================== */

window.addEventListener(
  "scroll",
  updateCpeScrollAnimation,
  {
    passive: true
  }
);



/* =====================================
   10. RESIZE
===================================== */

window.addEventListener(
  "resize",
  updateCpeScrollAnimation
);



/* =====================================
   11. RUN ON PAGE LOAD
===================================== */

updateCpeScrollAnimation();