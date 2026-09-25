document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       GALLERY DATA
    ===================================================== */

    const galleryData = [
        {
            image: "images/nature1.jpg",
            category: "Nature",
            title: "Mountain Lake",
            description:
                "A peaceful mountain lake surrounded by forests and beautiful landscapes. Green vegetation contributes to oxygen production through photosynthesis and helps absorb carbon dioxide.",
            theme: "Mountain • Lake • Forest",
            highlights:
                "Fresh surroundings, greenery and peaceful scenery"
        },

        {
            image: "images/nature2.jpg",
            category: "Nature",
            title: "Alpine Valley",
            description:
                "A beautiful alpine valley featuring green mountains and a clear flowing stream. Natural ecosystems support biodiversity and provide opportunities for hiking and photography.",
            theme: "Mountains • Valley • Stream",
            highlights:
                "Biodiversity, fresh surroundings and scenic views"
        },

        {
            image: "images/travel1.jpg",
            category: "Travel",
            title: "Tropical Escape",
            description:
                "A tropical destination surrounded by clear blue water, palm trees and beautiful coastal scenery. A beautiful place for relaxation and exploration.",
            theme: "Island • Beach • Ocean",
            highlights:
                "Water activities, relaxation and coastal scenery"
        },

        {
            image: "images/travel2.jpg",
            category: "Travel",
            title: "Mountain Adventure",
            description:
                "A dramatic mountain viewpoint overlooking a beautiful valley. Mountain destinations are popular for trekking, hiking, photography and adventure experiences.",
            theme: "Adventure • Hiking • Mountains",
            highlights:
                "Trekking, photography and panoramic views"
        },

        {
            image: "images/city1.jpg",
            category: "City",
            title: "Modern Skyline",
            description:
                "A vibrant modern skyline illuminated at dusk. Architecture, waterfront views and city lights create an impressive urban atmosphere.",
            theme: "Skyline • Architecture • Waterfront",
            highlights:
                "Modern buildings, city lights and urban views"
        },

        {
            image: "images/city2.jpg",
            category: "City",
            title: "Urban Downtown",
            description:
                "A modern downtown environment featuring skyscrapers and contemporary architecture. Cities bring together technology, business, culture and modern lifestyles.",
            theme: "Downtown • Buildings • Urban Life",
            highlights:
                "Architecture, business, technology and culture"
        }
    ];


    /* =====================================================
       SELECT HTML ELEMENTS
    ===================================================== */

    const cards =
        document.querySelectorAll(".gallery-card");

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const lightbox =
        document.getElementById("lightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const lightboxTitle =
        document.getElementById("lightboxTitle");

    const lightboxCategory =
        document.getElementById("lightboxCategory");

    const lightboxDescription =
        document.getElementById("lightboxDescription");

    const lightboxTheme =
        document.getElementById("lightboxTheme");

    const lightboxHighlights =
        document.getElementById("lightboxHighlights");

    const currentNumber =
        document.getElementById("currentNumber");

    const totalNumber =
        document.getElementById("totalNumber");

    const closeBtn =
        document.getElementById("closeBtn");

    const prevBtn =
        document.getElementById("prevBtn");

    const nextBtn =
        document.getElementById("nextBtn");

    const favoriteBtn =
        document.getElementById("favoriteBtn");

    const toast =
        document.getElementById("toast");


    /* =====================================================
       VARIABLES
    ===================================================== */

    let currentIndex = 0;

    let touchStartX = 0;

    let touchEndX = 0;

    let toastTimer;


    totalNumber.textContent =
        galleryData.length;


    /* =====================================================
       OPEN IMAGE / LIGHTBOX
    ===================================================== */

    function openImage(index) {

        currentIndex = index;

        const data =
            galleryData[currentIndex];


        lightboxImage.src =
            data.image;

        lightboxImage.alt =
            data.title;


        lightboxCategory.textContent =
            data.category;

        lightboxTitle.textContent =
            data.title;

        lightboxDescription.textContent =
            data.description;

        lightboxTheme.textContent =
            data.theme;

        lightboxHighlights.textContent =
            data.highlights;


        currentNumber.textContent =
            currentIndex + 1;


        lightbox.classList.add("active");


        document.body.style.overflow =
            "hidden";


        if (favoriteBtn) {

            favoriteBtn.classList.remove(
                "liked"
            );

            favoriteBtn.textContent =
                "♡";

        }

    }


    /* =====================================================
       CLOSE LIGHTBOX
    ===================================================== */

    function closeImage() {

        lightbox.classList.remove(
            "active"
        );

        document.body.style.overflow =
            "";

    }


    /* =====================================================
       NEXT IMAGE
    ===================================================== */

    function nextImage() {

        currentIndex++;

        if (
            currentIndex >=
            galleryData.length
        ) {
            currentIndex = 0;
        }


        openImage(currentIndex);

    }


    /* =====================================================
       PREVIOUS IMAGE
    ===================================================== */

    function previousImage() {

        currentIndex--;

        if (currentIndex < 0) {

            currentIndex =
                galleryData.length - 1;

        }


        openImage(currentIndex);

    }


    /* =====================================================
       CARD CLICK
       Clicking anywhere on the card opens image
    ===================================================== */

    cards.forEach((card, index) => {

        card.style.cursor =
            "pointer";


        card.addEventListener(
            "click",
            () => {

                openImage(index);

            }
        );

    });


    /* =====================================================
       VIEW STORY BUTTON
    ===================================================== */

    cards.forEach((card, index) => {

        const viewText =
            card.querySelector(
                ".view-text"
            );

        const viewIcon =
            card.querySelector(
                ".view-icon"
            );

        const readMore =
            card.querySelector(
                ".read-more"
            );


        if (viewText) {

            viewText.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    openImage(index);

                }
            );

        }


        if (viewIcon) {

            viewIcon.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    openImage(index);

                }
            );

        }


        if (readMore) {

            readMore.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    openImage(index);

                }
            );

        }

    });


    /* =====================================================
       CATEGORY FILTER
    ===================================================== */

    filterButtons.forEach(button => {

        button.addEventListener(
            "click",
            event => {

                event.stopPropagation();


                const filter =
                    button.dataset.filter;


                filterButtons.forEach(
                    btn => {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                cards.forEach(
                    (card, index) => {

                        const category =
                            card.dataset.category;


                        if (
                            filter === "all" ||
                            category === filter
                        ) {

                            card.classList.remove(
                                "hide"
                            );


                            card.style.animation =
                                "none";


                            void card.offsetWidth;


                            card.style.animation =
                                "cardAppear 0.55s ease both";

                        } else {

                            card.classList.add(
                                "hide"
                            );

                        }

                    }
                );

            }
        );

    });


    /* =====================================================
       CLOSE BUTTON
    ===================================================== */

    if (closeBtn) {

        closeBtn.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                closeImage();

            }
        );

    }


    /* =====================================================
       NEXT BUTTON
    ===================================================== */

    if (nextBtn) {

        nextBtn.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                nextImage();

            }
        );

    }


    /* =====================================================
       PREVIOUS BUTTON
    ===================================================== */

    if (prevBtn) {

        prevBtn.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                previousImage();

            }
        );

    }


    /* =====================================================
       BACKGROUND CLICK
    ===================================================== */

    const backdrop =
        document.querySelector(
            ".lightbox-backdrop"
        );


    if (backdrop) {

        backdrop.addEventListener(
            "click",
            closeImage
        );

    }


    /* =====================================================
       KEYBOARD CONTROLS
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                !lightbox.classList.contains(
                    "active"
                )
            ) {
                return;
            }


            if (
                event.key === "Escape"
            ) {

                closeImage();

            }


            if (
                event.key === "ArrowRight"
            ) {

                nextImage();

            }


            if (
                event.key === "ArrowLeft"
            ) {

                previousImage();

            }

        }
    );


    /* =====================================================
       MOBILE SWIPE
    ===================================================== */

    if (lightboxImage) {

        lightboxImage.addEventListener(
            "touchstart",
            event => {

                touchStartX =
                    event.changedTouches[0]
                        .screenX;

            },
            {
                passive: true
            }
        );


        lightboxImage.addEventListener(
            "touchend",
            event => {

                touchEndX =
                    event.changedTouches[0]
                        .screenX;


                const difference =
                    touchStartX -
                    touchEndX;


                if (
                    Math.abs(difference) <
                    50
                ) {
                    return;
                }


                if (
                    difference > 0
                ) {

                    nextImage();

                } else {

                    previousImage();

                }

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       FAVORITE BUTTON
    ===================================================== */

    if (favoriteBtn) {

        favoriteBtn.addEventListener(
            "click",
            event => {

                event.stopPropagation();


                const liked =
                    favoriteBtn.classList.toggle(
                        "liked"
                    );


                if (liked) {

                    favoriteBtn.textContent =
                        "♥";


                    showToast(
                        "❤️ Added to favorites"
                    );

                } else {

                    favoriteBtn.textContent =
                        "♡";


                    showToast(
                        "Removed from favorites"
                    );

                }

            }
        );

    }


    /* =====================================================
       TOAST MESSAGE
    ===================================================== */

    function showToast(message) {

        if (!toast) {
            return;
        }


        toast.textContent =
            message;


        toast.classList.add(
            "show"
        );


        clearTimeout(
            toastTimer
        );


        toastTimer =
            setTimeout(
                () => {

                    toast.classList.remove(
                        "show"
                    );

                },
                2000
            );

    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    if (
        "IntersectionObserver" in window
    ) {

        const observer =
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


                                observer.unobserve(
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


        cards.forEach(card => {

            observer.observe(card);

        });

    } else {

        cards.forEach(card => {

            card.classList.add(
                "visible"
            );

        });

    }


    /* =====================================================
       IMAGE LOAD EFFECT
    ===================================================== */

    cards.forEach(card => {

        const image =
            card.querySelector("img");


        if (!image) {
            return;
        }


        if (image.complete) {

            image.classList.add(
                "loaded"
            );

        } else {

            image.addEventListener(
                "load",
                () => {

                    image.classList.add(
                        "loaded"
                    );

                }
            );

        }

    });


    /* =====================================================
       3D MOUSE EFFECT
    ===================================================== */

    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                if (
                    window.innerWidth <
                    800
                ) {
                    return;
                }


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


                const rotateX =
                    ((y - centerY) /
                        centerY) *
                    -3;


                const rotateY =
                    ((x - centerX) /
                        centerX) *
                    3;


                card.style.transform =
                    `translateY(-12px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });


    /* =====================================================
       SMOOTH NAVIGATION
    ===================================================== */

    document
        .querySelectorAll(
            '.navbar a[href^="#"], .explore-btn'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (target) {

                        event.preventDefault();


                        target.scrollIntoView({
                            behavior:
                                "smooth"
                        });

                    }

                }
            );

        });


    /* =====================================================
       CONSOLE
    ===================================================== */

    console.log(
        "✨ Discover Beautiful Moments loaded successfully!"
    );

    console.log(
        "📸 Total images:",
        galleryData.length
    );

});
