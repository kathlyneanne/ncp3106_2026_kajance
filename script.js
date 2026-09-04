const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
/* =====================================
   1. SCRAMBLED LETTER EFFECT
===================================== */

function scrambleText(element, speed = 90) {

  const finalText =
    element.dataset.text || element.textContent.trim();

  let progress = 0;

  clearInterval(element.scrambleTimer);


  element.scrambleTimer = setInterval(() => {

    element.textContent = finalText
      .split("")
      .map((char, index) => {

        /* Keep spaces and symbols */
        if (
          char === " " ||
          char === "/" ||
          char === "." ||
          char === "+"
        ) {
          return char;
        }


        /* Show real letter */
        if (index < progress) {
          return finalText[index];
        }


        /* Show random letter */
        return chars[
          Math.floor(Math.random() * chars.length)
        ];

      })
      .join("");


    /* Smaller number = slower scramble */
progress += Number(element.dataset.progress) || 0.55;


    if (progress >= finalText.length) {

      clearInterval(element.scrambleTimer);

      element.textContent = finalText;

    }

  }, speed);

}

/* =====================================
   2. SCRAMBLE AFTER OPENING WEBSITE
===================================== */

const enterSite =
  document.getElementById("enter-site");


function startPageScramble() {

  document
    .querySelectorAll("[data-scramble]")
    .forEach((element, index) => {

      setTimeout(() => {

        scrambleText(element, 85);

      }, index * 260);

    });

}


if (enterSite) {

  enterSite.addEventListener("change", () => {

    if (enterSite.checked) {

      /* Wait until black transition finishes */

      setTimeout(() => {

        startPageScramble();

      }, 1250);

    }

  });

}

else {

  /* For other pages without intro screen */

  setTimeout(() => {

    startPageScramble();

  }, 400);

}



/* =====================================
   3. SCRAMBLE WHEN HOVERING WORDS
===================================== */

document
  .querySelectorAll(".scramble-hover")
  .forEach(element => {

    element.dataset.text =
      element.textContent.trim();


    element.addEventListener(
      "mouseenter",
      () => {

        scrambleText(element, 70);

      }
    );

  });



/* =====================================
   4. PIXEL CURSOR TRAIL
===================================== */

/* Only show custom cursor when using mouse */

if (window.matchMedia("(pointer: fine)").matches) {


  /* MAIN PIXEL */

  const pixelCursor =
    document.createElement("div");

  pixelCursor.className =
    "pixel-cursor";

  document.body.appendChild(
    pixelCursor
  );



  /* TRAIL PIXELS */

  const trail = [];

  const trailCount = 8;


  for (let i = 0; i < trailCount; i++) {

    const pixel =
      document.createElement("div");

    pixel.className =
      "cursor-pixel";

    document.body.appendChild(
      pixel
    );


    trail.push({

      element: pixel,

      x: window.innerWidth / 2,

      y: window.innerHeight / 2

    });

  }



  /* MOUSE POSITION */

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
        0.24 - (index * 0.012);


      pixel.x +=
        (targetX - pixel.x)
        * followSpeed;


      pixel.y +=
        (targetY - pixel.y)
        * followSpeed;


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


/* START THE PIXEL TRAIL */
animateTrail();


}
