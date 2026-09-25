"use strict";

/* =========================================
   CODEALPHA - TASK 1
   ADVANCED IMAGE GALLERY
========================================= */


/* =========================================
   SELECT ELEMENTS
========================================= */

const galleryCards = [
    ...document.querySelectorAll(".gallery-card")
];

const filterButtons = [
    ...document.querySelectorAll(".filter-btn")
];

const lightbox = document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxTitle =
    document.getElementById("lightboxTitle");

const lightboxDescription =
    document.getElementById("lightboxDescription");

const lightboxCategory =
    document.getElementById("lightboxCategory");

const counter =
    document.getElementById("counter");

const closeButton =
    document.getElementById("closeBtn");

const previousButton =
    document.getElementById("prevBtn");

const nextButton =
    document.getElementById("nextBtn");


/* =========================================
   GALLERY STATE
========================================= */

let visibleCards = [...galleryCards];

let currentIndex = 0;


/* =========================================
   FILTER GALLERY
========================================= */

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedFilter =
            button.dataset.filter;


        /* Update active button */

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");


        /* Filter cards */

        galleryCards.forEach(card => {

            const category =
                card.dataset.category;

            const shouldShow =
                selectedFilter === "all" ||
                category === selectedFilter;


            if (shouldShow) {

                card.classList.remove("hide");

            } else {

                card.classList.add("hide");

            }

        });


        /* Update visible cards */

        visibleCards =
            galleryCards.filter(card => {

                return (
                    selectedFilter === "all" ||
                    card.dataset.category === selectedFilter
                );

            });

    });

});


/* =========================================
   OPEN LIGHTBOX
========================================= */

function openLightbox(index) {

    if (visibleCards.length === 0) {
        return;
    }

    currentIndex = index;

    updateLightbox();

    lightbox.classList.add("active");

    document.body.classList.add(
        "lightbox-open"
    );

}


/* =========================================
   UPDATE LIGHTBOX CONTENT
========================================= */

function updateLightbox() {

    const card =
        visibleCards[currentIndex];

    if (!card) {
        return;
    }


    const image =
        card.dataset.image;

    const title =
        card.dataset.title;

    const description =
        card.dataset.description;

    const category =
        card.dataset.category;


    /* Small transition */

    lightboxImage.style.opacity = "0";

    lightboxImage.style.transform =
        "scale(.96)";


    setTimeout(() => {

        lightboxImage.src = image;

        lightboxImage.alt = title;

        lightboxTitle.textContent =
            title;

        lightboxDescription.textContent =
            description;

        lightboxCategory.textContent =
            category.toUpperCase();

        counter.textContent =
            `${currentIndex + 1} / ${visibleCards.length}`;


        lightboxImage.style.opacity = "1";

        lightboxImage.style.transform =
            "scale(1)";

    }, 120);

}


/* =========================================
   CLOSE LIGHTBOX
========================================= */

function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.classList.remove(
        "lightbox-open"
    );

}


/* =========================================
   NEXT IMAGE
========================================= */

function showNextImage() {

    if (visibleCards.length === 0) {
        return;
    }

    currentIndex =
        (currentIndex + 1)
        % visibleCards.length;

    updateLightbox();

}


/* =========================================
   PREVIOUS IMAGE
========================================= */

function showPreviousImage() {

    if (visibleCards.length === 0) {
        return;
    }

    currentIndex =
        (
            currentIndex -
            1 +
            visibleCards.length
        ) % visibleCards.length;

    updateLightbox();

}


/* =========================================
   GALLERY CARD CLICK
========================================= */

galleryCards.forEach(card => {

    card.addEventListener("click", event => {

        /*
            Open lightbox when the image
            or view button is clicked.
        */

        const clickedImage =
            event.target.closest("img");

        const clickedButton =
            event.target.closest(".view-btn");


        if (!clickedImage && !clickedButton) {
            return;
        }


        const index =
            visibleCards.indexOf(card);


        if (index !== -1) {

            openLightbox(index);

        }

    });

});


/* =========================================
   BUTTON EVENTS
========================================= */

closeButton.addEventListener(
    "click",
    closeLightbox
);

nextButton.addEventListener(
    "click",
    showNextImage
);

previousButton.addEventListener(
    "click",
    showPreviousImage
);


/* =========================================
   CLOSE WHEN CLICKING BACKDROP
========================================= */

lightbox.addEventListener(
    "click",
    event => {

        if (event.target === lightbox) {

            closeLightbox();

        }

    }
);


/* =========================================
   KEYBOARD CONTROLS
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (!lightbox.classList.contains("active")) {
            return;
        }


        switch (event.key) {

            case "Escape":

                closeLightbox();

                break;


            case "ArrowRight":

                showNextImage();

                break;


            case "ArrowLeft":

                showPreviousImage();

                break;

        }

    }
);


/* =========================================
   TOUCH / SWIPE SUPPORT
========================================= */

let touchStartX = 0;

let touchEndX = 0;


lightbox.addEventListener(
    "touchstart",
    event => {

        touchStartX =
            event.changedTouches[0].screenX;

    },
    { passive: true }
);


lightbox.addEventListener(
    "touchend",
    event => {

        touchEndX =
            event.changedTouches[0].screenX;

        handleSwipe();

    },
    { passive: true }
);


function handleSwipe() {

    const swipeDistance =
        touchStartX - touchEndX;


    /*
        Ignore very small movements.
    */

    if (Math.abs(swipeDistance) < 50) {
        return;
    }


    if (swipeDistance > 0) {

        showNextImage();

    } else {

        showPreviousImage();

    }

}


/* =========================================
   IMAGE PRELOADING
========================================= */

function preloadImages() {

    galleryCards.forEach(card => {

        const image =
            new Image();

        image.src =
            card.dataset.image;

    });

}

preloadImages();


/* =========================================
   SCROLL REVEAL ANIMATION
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================
   IMAGE LOADING EFFECT
========================================= */

galleryCards.forEach(card => {

    const image =
        card.querySelector("img");


    if (!image) {
        return;
    }


    image.addEventListener(
        "load",
        () => {

            image.classList.add("loaded");

        }
    );

});


/* =========================================
   PRELOAD NEXT IMAGE
========================================= */

function preloadNextImage() {

    if (visibleCards.length === 0) {
        return;
    }


    const nextIndex =
        (currentIndex + 1)
        % visibleCards.length;


    const nextCard =
        visibleCards[nextIndex];


    if (!nextCard) {
        return;
    }


    const image =
        new Image();

    image.src =
        nextCard.dataset.image;

}


/* =========================================
   PRELOAD PREVIOUS IMAGE
========================================= */

function preloadPreviousImage() {

    if (visibleCards.length === 0) {
        return;
    }


    const previousIndex =
        (
            currentIndex -
            1 +
            visibleCards.length
        ) % visibleCards.length;


    const previousCard =
        visibleCards[previousIndex];


    if (!previousCard) {
        return;
    }


    const image =
        new Image();

    image.src =
        previousCard.dataset.image;

}


/* =========================================
   ENHANCED NAVIGATION
========================================= */

nextButton.addEventListener(
    "mouseenter",
    preloadNextImage
);

previousButton.addEventListener(
    "mouseenter",
    preloadPreviousImage
);


/* =========================================
   INITIALIZATION
========================================= */

visibleCards =
    [...galleryCards];


console.log(
    "NovaGallery initialized successfully."
);

console.log(
    `Total images: ${galleryCards.length}`
);
