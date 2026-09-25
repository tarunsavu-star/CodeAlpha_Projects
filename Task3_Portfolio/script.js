// Mobile navigation
function toggleMenu() {
    const menu = document.querySelector(".nav-links");
    menu.classList.toggle("active");
}


// Close mobile menu after clicking a link
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        document.querySelector(".nav-links").classList.remove("active");
    });
});


// Current year
document.getElementById("year").textContent = new Date().getFullYear();
