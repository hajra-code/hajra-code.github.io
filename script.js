/* ==========================================
   Hajra Bashir — Professional Portfolio
   Main JavaScript
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       THEME TOGGLE
       ========================================== */

    const themeToggle = document.querySelector(".theme-toggle");
    const themeIcon = themeToggle?.querySelector("i");

    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
    }

    function updateThemeIcon() {
        if (!themeIcon) return;

        const currentTheme =
            document.documentElement.getAttribute("data-theme");

        if (currentTheme === "light") {
            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");
        } else {
            themeIcon.classList.remove("fa-sun");
            themeIcon.classList.add("fa-moon");
        }
    }

    updateThemeIcon();

    themeToggle?.addEventListener("click", () => {

        const currentTheme =
            document.documentElement.getAttribute("data-theme");

        const newTheme =
            currentTheme === "light" ? "dark" : "light";

        document.documentElement.setAttribute(
            "data-theme",
            newTheme
        );

        localStorage.setItem(
            "portfolio-theme",
            newTheme
        );

        updateThemeIcon();
    });


    /* ==========================================
       MOBILE NAVIGATION
       ========================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    menuToggle?.addEventListener("click", () => {

        navLinks?.classList.toggle("open");

        const icon = menuToggle.querySelector("i");

        if (!icon) return;

        if (navLinks?.classList.contains("open")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });


    /* Close mobile menu after clicking a link */

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks?.classList.remove("open");

            const icon = menuToggle?.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });

    });


    /* ==========================================
       TYPING EFFECT
       ========================================== */

    const typingElement =
        document.querySelector(".typing-text");

    if (typingElement) {

        const words = [
            "Computer Science Undergraduate",
            "Web Developer",
            "AI Enthusiast",
            "Cybersecurity Enthusiast",
            "WordPress Developer",
            "Tech Learner"
        ];

        let wordIndex = 0;
        let characterIndex = 0;

        let deleting = false;

        function typeEffect() {

            const currentWord =
                words[wordIndex];

            if (!deleting) {

                typingElement.textContent =
                    currentWord.substring(
                        0,
                        characterIndex + 1
                    );

                characterIndex++;

                if (
                    characterIndex ===
                    currentWord.length
                ) {

                    deleting = true;

                    setTimeout(
                        typeEffect,
                        1800
                    );

                    return;
                }

            } else {

                typingElement.textContent =
                    currentWord.substring(
                        0,
                        characterIndex - 1
                    );

                characterIndex--;

                if (characterIndex === 0) {

                    deleting = false;

                    wordIndex =
                        (wordIndex + 1) %
                        words.length;

                }

            }

            setTimeout(
                typeEffect,
                deleting ? 45 : 85
            );
        }

        typeEffect();
    }


    /* ==========================================
       ACTIVE NAVIGATION
       ========================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navigationLinks =
        document.querySelectorAll(".nav-links a");

    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            if (
                window.scrollY >=
                sectionTop
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });

        navigationLinks.forEach(link => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );

    updateActiveNavigation();


    /* ==========================================
       NAVBAR SCROLL EFFECT
       ========================================== */

    const navbar =
        document.querySelector(".navbar");

    function updateNavbar() {

        if (!navbar) return;

        if (window.scrollY > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }

    window.addEventListener(
        "scroll",
        updateNavbar
    );

    updateNavbar();


    /* ==========================================
       BACK TO TOP BUTTON
       ========================================== */

    const backToTop =
        document.querySelector(".back-to-top");

    function updateBackToTop() {

        if (!backToTop) return;

        if (window.scrollY > 500) {

            backToTop.classList.add("visible");

        } else {

            backToTop.classList.remove("visible");

        }

    }

    window.addEventListener(
        "scroll",
        updateBackToTop
    );

    backToTop?.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    /* ==========================================
       SCROLL REVEAL ANIMATION
       ========================================== */

    const revealElements =
        document.querySelectorAll(
            ".section, .project-card, .skill-preview-card, .achievement-card, .timeline-item"
        );

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "revealed"
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

        element.classList.add("reveal");

        revealObserver.observe(element);

    });


    /* ==========================================
       PROJECT CARD HOVER
       ========================================== */

    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );

    projectCards.forEach(card => {

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

                const rotateX =
                    (y - centerY) /
                    35;

                const rotateY =
                    (centerX - x) /
                    35;

                card.style.transform =
                    `perspective(700px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-7px)`;

            }
        );

        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });


    /* ==========================================
       SMOOTH INTERNAL LINKS
       ========================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );

                    if (
                        targetId === "#" ||
                        !targetId
                    ) return;

                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (!target) return;

                    event.preventDefault();

                    const navbarHeight =
                        navbar
                            ? navbar.offsetHeight
                            : 0;

                    const targetPosition =
                        target.offsetTop -
                        navbarHeight;

                    window.scrollTo({

                        top:
                            targetPosition,

                        behavior:
                            "smooth"

                    });

                }
            );

        });


    /* ==========================================
       CURRENT YEAR
       ========================================== */

    const yearElements =
        document.querySelectorAll(
            ".current-year"
        );

    yearElements.forEach(element => {

        element.textContent =
            new Date().getFullYear();

    });


    /* ==========================================
       LINKEDIN BADGE
       ========================================== */

    /*
       LinkedIn's badge script is loaded externally
       in index.html.

       This section simply keeps the badge container
       responsive on smaller screens.
    */

    const linkedinContainer =
        document.querySelector(
            ".linkedin-container"
        );

    if (linkedinContainer) {

        window.addEventListener(
            "resize",
            () => {

                linkedinContainer.style.overflowX =
                    "auto";

            }
        );

    }


    /* ==========================================
       FLOATING CARDS
       ========================================== */

    const floatingCards =
        document.querySelectorAll(
            ".floating-card"
        );

    floatingCards.forEach(
        (card, index) => {

            card.style.animationDelay =
                `${index * 0.7}s`;

        }
    );


    /* ==========================================
       KEYBOARD ACCESSIBILITY
       ========================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                navLinks?.classList.contains("open")
            ) {

                navLinks.classList.remove(
                    "open"
                );

                const icon =
                    menuToggle?.querySelector(
                        "i"
                    );

                if (icon) {

                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );

                }

            }

        }
    );


    /* ==========================================
       PAGE LOADED
       ========================================== */

    document.body.classList.add(
        "page-loaded"
    );

});


/* ==========================================
   ADDITIONAL REVEAL STYLES
   ========================================== */

const revealStyle =
document.createElement("style");

revealStyle.textContent = `

    .reveal {
        opacity: 0;
        transform: translateY(30px);
        transition:
            opacity 0.7s ease,
            transform 0.7s ease;
    }

    .reveal.revealed {
        opacity: 1;
        transform: translateY(0);
    }

    .navbar.scrolled {
        box-shadow:
            0 10px 30px rgba(0, 0, 0, 0.15);
    }

    [data-theme="light"]
    .navbar.scrolled {
        box-shadow:
            0 10px 30px rgba(30, 45, 70, 0.08);
    }

    @media (prefers-reduced-motion: reduce) {

        *,
        *::before,
        *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
        }

    }

`;

document.head.appendChild(
    revealStyle
);