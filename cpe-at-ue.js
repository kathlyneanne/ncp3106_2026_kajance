/* =========================================================

   UE / CpE

   CPE AT UE JAVASCRIPT

========================================================= */

 

/* =========================================================

   EXPLORE CPE -> CPE AT UE TRANSITION

   SAME BEHAVIOR AS STUDENT PROJECTS

   ========================================================= */

window.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);

    const cameFromExplore = params.get("from") === "explore";

    const loader = document.querySelector("#page-loader");

 

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

   PIXEL CURSOR + TRAIL

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

 

 

    /* -----------------------------------------

       PIXEL TRAIL

    ----------------------------------------- */

 

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

 

 

    /* -----------------------------------------

       MOUSE POSITION

    ----------------------------------------- */

 

    let mouseX =

        window.innerWidth / 2;

 

    let mouseY =

        window.innerHeight / 2;

 

 

    /* -----------------------------------------

       BACKGROUND DETECTION

    ----------------------------------------- */

 

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

 

 

        const darkSection =

            elementUnderCursor.closest(

                ".cursor-dark-zone, #page-loader, .menu-overlay"

            );

 

 

        if (darkSection) {

            return true;

        }

 

 

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

 

 

    /* -----------------------------------------

       MOUSE MOVE

    ----------------------------------------- */

 

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

 

 

            const isDark =

                detectDarkBackground(

                    mouseX,

                    mouseY

                );

 

 

            /*

               White cursor on black.

               Black cursor on white.

            */

 

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

 

 

    /* -----------------------------------------

       HOVER EFFECT

    ----------------------------------------- */

 

    document

        .querySelectorAll(

            `

            a,

            button,

            label,

            .menu-button,

            .close-menu,

            .bootstrap-card,

            .facility-card,

            .project-card,

            .opportunity-box

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

 

 

    /* -----------------------------------------

       PIXEL TRAIL ANIMATION

    ----------------------------------------- */

 

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

 

 

/* =========================================================

   OPEN MENU

========================================================= */

 

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

 

 

/* =========================================================

   CLOSE MENU

========================================================= */

 

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

 

 

/* =========================================================

   MENU BUTTON

========================================================= */

 

if (menuButton) {

 

    menuButton.addEventListener(

        "click",

        openMenu

    );

 

}

 

 

/* =========================================================

   CLOSE BUTTON

========================================================= */

 

if (closeMenu) {

 

    closeMenu.addEventListener(

        "click",

        closeMenuFunction

    );

 

}

 

 

/* =========================================================

   ESC KEY

========================================================= */

 

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

 

 

/* =========================================================

   MENU ITEMS

========================================================= */

 

const menuItems =

    document.querySelectorAll(

        ".menu-item"

    );

 

 

menuItems.forEach(

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

   SCROLL REVEAL

========================================================= */

 

const revealElements =

    document.querySelectorAll(

        ".reveal"

    );

 

 

if (

    "IntersectionObserver"

    in window

) {

 

    const revealObserver =

        new IntersectionObserver(

            entries => {

 

                entries.forEach(

                    entry => {

 

                        if (

                            entry.isIntersecting

                        ) {

 

                            entry.target.classList.add(

                                "visible"

                            );

 

 

                            revealObserver.unobserve(

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

 

 

    revealElements.forEach(

        element => {

 

            revealObserver.observe(

                element

            );

 

        }

    )

 

;

 

}

 

 

/* =========================================================

   HERO PARALLAX

========================================================= */

 

const hero =

    document.querySelector(

        ".hero-section"

    );

 

 

const heroC =

    document.querySelector(

        ".hero-letter.c"

    );

 

 

const heroP =

    document.querySelector(

        ".hero-letter.p"

    );

 

 

const heroE =

    document.querySelector(

        ".hero-letter.e"

    );

 

 

window.addEventListener(

    "scroll",

    () => {

 

        const scroll =

            window.scrollY;

 

 

        if (!hero) {

            return;

        }

 

 

        if (

            scroll <

            window.innerHeight

        ) {

 

            if (heroC) {

 

                heroC.style.transform =

                    `translateY(${scroll * 0.10}px)`;

 

            }

 

 

            if (heroP) {

 

                heroP.style.transform =

                    `translateY(${scroll * 0.18}px)`;

 

            }

 

 

            if (heroE) {

 

                heroE.style.transform =

                    `translateY(${scroll * 0.25}px)`;

 

            }

 

        }

 

    }

);

 

 

/* =========================================================

   IMAGE ENGINEERING EFFECT

   ========================================================= */

 

const imageCards =

    document.querySelectorAll(

        ".image-slot, .facility-image, .project-image"

    );

 

 

imageCards.forEach(card => {

 

    const image =

        card.querySelector("img");

 

 

    if (!image) {

        return;

    }

 

 

    /* ---------------------------------------------------------

       MOUSE MOVEMENT

       --------------------------------------------------------- */

 

    card.addEventListener(

        "mousemove",

        event => {

 

            const rect =

                card.getBoundingClientRect();

 

 

            const x =

                event.clientX -

                rect.left;

 

 

            const y =

                event.clientY -

                rect.top;

 

 

            const centerX =

                rect.width / 2;

 

 

            const centerY =

                rect.height / 2;

 

 

            const moveX =

                (x - centerX) * 0.018;

 

 

            const moveY =

                (y - centerY) * 0.018;

 

 

            image.style.transform =

                `scale(1.09) translate(${moveX}px, ${moveY}px)`;

 

 

            /* -------------------------------------------------

               CUSTOM PROPERTY FOR FUTURE EFFECTS

               ------------------------------------------------- */

 

            card.style.setProperty(

                "--mouse-x",

                `${x}px`

            );

 

 

            card.style.setProperty(

                "--mouse-y",

                `${y}px`

            );

 

        }

    );

 

 

    /* ---------------------------------------------------------

       MOUSE ENTER

       --------------------------------------------------------- */

 

    card.addEventListener(

        "mouseenter",

        () => {

 

            card.classList.add(

                "image-active"

            );

 

        }

    );

 

 

    /* ---------------------------------------------------------

       MOUSE LEAVE

       --------------------------------------------------------- */

 

    card.addEventListener(

        "mouseleave",

        () => {

 

            image.style.transform =

                "scale(1.02) translate(0, 0)";

 

 

            card.classList.remove(

                "image-active"

            );

 

        }

    );

 

});

/* =========================================================

   BOOTSTRAP CARD STAGGER

========================================================= */

 

const cards =

    document.querySelectorAll(

        ".bootstrap-card"

    );

 

 

cards.forEach(

    (card, index) => {

 

        card.style.transitionDelay =

            `${index * 70}ms`;

 

    }

);

 

 

/* =========================================================

   OPPORTUNITY BOX STAGGER

========================================================= */

 

const opportunities =

    document.querySelectorAll(

        ".opportunity-box"

    );

 

 

opportunities.forEach(

    (box, index) => {

 

        box.style.transitionDelay =

            `${index * 100}ms`;

 

    }

);

 

 

/* =========================================================

   SCROLL DIRECTION

========================================================= */

 

let lastScroll =

    window.scrollY;

 

 

let scrollDirection =

    "down";

 

 

window.addEventListener(

    "scroll",

    () => {

 

        const currentScroll =

            window.scrollY;

 

 

        if (

            currentScroll >

            lastScroll

        ) {

 

            scrollDirection =

                "down";

 

        } else {

 

            scrollDirection =

                "up";

 

        }

 

 

        document.body.dataset.scrollDirection =

            scrollDirection;

 

 

        lastScroll =

            currentScroll;

 

    }

);

 

 

/* =========================================================

   SECTION NUMBER ANIMATION

========================================================= */

 

const sectionNumbers =

    document.querySelectorAll(

        ".section-number"

    );

 

 

if (

    "IntersectionObserver"

    in window

) {

 

    const numberObserver =

        new IntersectionObserver(

            entries => {

 

                entries.forEach(

                    entry => {

 

                        if (

                            entry.isIntersecting

                        ) {

 

                            entry.target.animate(

                                [

                                    {

                                        opacity: 0,

                                        transform:

                                            "translateX(-20px)"

                                    },

                                    {

                                        opacity: 1,

                                        transform:

                                            "translateX(0)"

                                    }

                                ],

                                {

                                    duration: 700,

                                    easing:

                                        "cubic-bezier(.77,0,.18,1)",

                                    fill:

                                        "forwards"

                                }

                            );

 

 

                            numberObserver.unobserve(

                                entry.target

                            );

 

                        }

 

                    }

                );

 

            },

            {

                threshold: 0.5

            }

        );

 

 

    sectionNumbers.forEach(

        number => {

 

            numberObserver.observe(

                number

            );

 

        }

    );

 

}

 

 

/* =========================================================

   SMOOTH INTERNAL LINKS

========================================================= */

 

document

    .querySelectorAll(

        'a[href^="#"]'

    )

    .forEach(

        link => {

 

            link.addEventListener(

                "click",

                event => {

 

                    const targetID =

                        link.getAttribute(

                            "href"

                        );

 

 

                    if (

                        targetID === "#" ||

                        !targetID

                    ) {

 

                        return;

 

 

                    }

 

 

                    const target =

                        document.querySelector(

                            targetID

                        );

 

 

                    if (!target) {

                        return;

                    }

 

 

                    event.preventDefault();

 

 

                    target.scrollIntoView({

                        behavior: "smooth",

                        block: "start"

                    });

 

 

                    closeMenuFunction();

 

                }

            );

 

        }

    );

 

 

/* =========================================================

   SMALL GRID MOVEMENT

========================================================= */

 

const heroGrid =

    document.querySelector(

        ".hero-grid"

    );

 

 

window.addEventListener(

    "mousemove",

    event => {

 

        if (!heroGrid) {

            return;

        }

 

 

        const x =

            (

                event.clientX /

                window.innerWidth -

                0.5

            ) * 10;

 

 

        const y =

            (

                event.clientY /

                window.innerHeight -

                0.5

            ) * 10;

 

 

        heroGrid.style.transform =

            `translate(${x}px, ${y}px)`;

 

    }

);

 

 

/* =========================================================

   FINISH

========================================================= */

 

console.log(

    "UE / CpE — CPE AT UE loaded successfully."

);