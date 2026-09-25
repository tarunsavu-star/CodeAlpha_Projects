// Portfolio JavaScript

document.addEventListener("DOMContentLoaded", function () {

    // Set current year in footer
    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });

    });

    // Simple button animation
    document.querySelectorAll(".btn").forEach(function (button) {

        button.addEventListener("click", function () {
            this.style.transform = "scale(0.95)";

            setTimeout(() => {
                this.style.transform = "scale(1)";
            }, 150);
        });

    });

});
