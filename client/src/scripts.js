document.addEventListener("DOMContentLoaded", () => {
    const logo = document.querySelector(".brand-logo");
    const navLinks = document.querySelectorAll(".nav-links a");

    logo.addEventListener("mouseenter", () => {
        logo.classList.add("shake");
    });

    logo.addEventListener("mouseleave", () => {
        logo.classList.remove("shake");
    });

    navLinks.forEach(link => {
        link.addEventListener("mouseenter", () => {
            link.style.transform = "scale(1.2)";
        });

        link.addEventListener("mouseleave", () => {
            link.style.transform = "scale(1)";
        });
    });
});