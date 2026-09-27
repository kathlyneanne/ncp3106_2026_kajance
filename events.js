document.addEventListener(
    "DOMContentLoaded",
    () => {


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

                document.body.classList.add(
                    "page-ready"
                );

            });

        });



        /* =====================================================
           2. REVEAL ANIMATION
        ===================================================== */

        const revealObserver =
            new IntersectionObserver(

                (
                    entries,
                    observer
                ) => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target
                                    .classList
                                    .add(
                                        "visible"
                                    );


                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },

                {
                    threshold: .08,

                    rootMargin:
                        "0px 0px 50px 0px"
                }

            );


        function observeRevealElements(
            container = document
        ) {

            const elements =
                container.querySelectorAll(
                    ".reveal:not(.visible)"
                );


            elements.forEach(
                element => {

                    revealObserver.observe(
                        element
                    );

                }
            );

        }


        observeRevealElements();



        /* =====================================================
           3. PHOTO REVEAL
        ===================================================== */

        const photoObserver =
            new IntersectionObserver(

                (
                    entries,
                    observer
                ) => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target
                                    .classList
                                    .add(
                                        "photo-animate"
                                    );


                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },

                {
                    threshold: .05,

                    rootMargin:
                        "0px 0px 80px 0px"
                }

            );


        function observePhotos(
            container = document
        ) {

            const photos =
                container.querySelectorAll(
                    ".photo-reveal:not(.photo-animate)"
                );


            photos.forEach(
                photo => {

                    photoObserver.observe(
                        photo
                    );

                }
            );

        }


        observePhotos();



        /* =====================================================
           4. SIDE PROGRESS
        ===================================================== */

        const progressLinks =
            document.querySelectorAll(
                ".progress-link"
            );


        function setProgress(
            number
        ) {

            progressLinks.forEach(
                item => {

                    item.classList.remove(
                        "active"
                    );


                    if (
                        item.dataset.progress ===
                        number
                    ) {

                        item.classList.add(
                            "active"
                        );

                    }

                }
            );

        }



        const sectionObserver =
            new IntersectionObserver(

                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                const number =
                                    entry.target
                                        .dataset
                                        .section;


                                if (number) {

                                    setProgress(
                                        number
                                    );

                                }

                            }

                        }
                    );

                },

                {
                    threshold: .25
                }

            );


        function observeSections() {

            const sections =
                document.querySelectorAll(
                    ".event-section:not(.chapter-locked)"
                );


            sections.forEach(
                section => {

                    if (
                        section.dataset.observed !==
                        "true"
                    ) {

                        sectionObserver.observe(
                            section
                        );


                        section.dataset.observed =
                            "true";

                    }

                }
            );

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

        const chapterButtons =
            document.querySelectorAll(
                ".chapter-next"
            );


        chapterButtons.forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {


                        const targetID =
                            button.dataset.unlock;


                        const target =
                            document.getElementById(
                                targetID
                            );


                        if (!target) {
                            return;
                        }


                        /* UNLOCK */

                        target.classList.remove(
                            "chapter-locked"
                        );


                        target.classList.add(
                            "chapter-opening"
                        );


                        /* OBSERVE NEW CONTENT */

                        observeRevealElements(
                            target
                        );


                        observePhotos(
                            target
                        );


                        observeSections();


                        /* SIDE PROGRESS */

                        const number =
                            target.dataset.section;


                        if (number) {

                            setProgress(
                                number
                            );

                        }


                        /* SCROLL TO NEXT CHAPTER */

                        requestAnimationFrame(
                            () => {

                                requestAnimationFrame(
                                    () => {

                                        target.scrollIntoView(
                                            {
                                                behavior:
                                                    "smooth",

                                                block:
                                                    "start"
                                            }
                                        );

                                    }
                                );

                            }
                        );


                        setTimeout(
                            () => {

                                target.classList.remove(
                                    "chapter-opening"
                                );

                            },

                            1000
                        );

                    }
                );

            }
        );



        /* =====================================================
           6. HERO TEXT SCROLL MOVEMENT
        ===================================================== */

        const titleOne =
            document.querySelector(
                ".title-one"
            );


        const titleTwo =
            document.querySelector(
                ".title-two"
            );


        let ticking =
            false;


        function moveHeroText() {

            const scroll =
                window.scrollY;


            if (
                scroll <
                window.innerHeight
            ) {

                if (titleOne) {

                    titleOne.style.marginLeft =
                        `${scroll * .02}px`;

                }


                if (titleTwo) {

                    titleTwo.style.marginLeft =
                        `${scroll * -.015}px`;

                }

            }


            ticking =
                false;

        }


        window.addEventListener(
            "scroll",

            () => {

                if (!ticking) {

                    requestAnimationFrame(
                        moveHeroText
                    );


                    ticking =
                        true;

                }

            },

            {
                passive: true
            }
        );



        /* =====================================================
           7. PAGE TRANSITION

           SAME BEHAVIOR AS YOUR OTHER PAGE:
           BLACK SCREEN RISES FROM BOTTOM
           + LARGE CENTER TEXT.
        ===================================================== */

        const transitionOverlay =
            document.createElement(
                "div"
            );


        transitionOverlay.className =
            "page-transition-overlay";


        transitionOverlay.innerHTML = `

            <div class="page-transition-text">
                EXPLORE CpE
            </div>

        `;


        document.body.appendChild(
            transitionOverlay
        );


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
                transitionOverlay
                    .querySelector(
                        ".page-transition-text"
                    );


            if (transitionText) {

                transitionText.textContent =
                    message;

            }


            transitionOverlay
                .classList
                .remove(
                    "is-active"
                );


            /*
                Force browser reflow so the animation
                can restart every time.
            */

            void transitionOverlay.offsetWidth;


            transitionOverlay
                .classList
                .add(
                    "is-active"
                );


            /*
                Same slower timing used by your
                existing page transition.
            */

            setTimeout(
                () => {

                    window.location.href =
                        destination;

                },

                1350
            );

        }



        /* =====================================================
           8. BACK TO EXPLORE CpE

           THIS NOW SHOWS:

                 EXPLORE CpE

           ON THE BLACK SCREEN BEFORE GOING HOME.
        ===================================================== */

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



        /* =====================================================
           9. RESET TRANSITION
           IF USER USES BROWSER BACK
        ===================================================== */

        window.addEventListener(
            "pageshow",
            () => {

                transitionRunning =
                    false;


                transitionOverlay
                    .classList
                    .remove(
                        "is-active"
                    );

            }
        );



        /* =====================================================
           10. MENU LINKS

           Checkbox handles menu open/close.
           This simply closes it when navigating.
        ===================================================== */

        const menuToggle =
            document.getElementById(
                "menu-toggle"
            );


        const menuLinks =
            document.querySelectorAll(
                ".fullscreen-menu-link"
            );


        menuLinks.forEach(
            link => {

                link.addEventListener(
                    "click",
                    () => {

                        if (menuToggle) {

                            menuToggle.checked =
                                false;

                        }

                    }
                );

            }
        );



        /* =====================================================
           11. ESCAPE CLOSES MENU
        ===================================================== */

        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key ===
                    "Escape"
                ) {

                    if (menuToggle) {

                        menuToggle.checked =
                            false;

                    }

                }

            }
        );


    }
);