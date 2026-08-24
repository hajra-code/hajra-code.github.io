// ================================
// Hajra Bashir - Portfolio JavaScript
// ================================

document.addEventListener("DOMContentLoaded", function () {

    // Welcome message
    console.log("Welcome to Hajra Bashir's Portfolio! 👋");

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (targetId === "#") {
                return;
            }

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


    // Add active effect to navigation links while scrolling
    const sections = document.querySelectorAll("section");
    const navigationLinks = document.querySelectorAll(".nav-links a");

    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });

        navigationLinks.forEach(function (link) {

            link.classList.remove("active");

            if (
                link.getAttribute("href") === "#" + currentSection
            ) {
                link.classList.add("active");
            }

        });

    }

    window.addEventListener("scroll", updateActiveNavigation);

    updateActiveNavigation();


    // Reveal sections when scrolling
    const revealElements = document.querySelectorAll(
        "section, .project, .item, .cert-item, .skill-tag, .pill-item"
    );

    const revealObserver = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach(function (element) {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });


    // Scroll-to-top button
    const scrollTopButton = document.createElement("button");

    scrollTopButton.innerHTML = "↑";

    scrollTopButton.className = "scroll-top";

    scrollTopButton.setAttribute(
        "aria-label",
        "Scroll to top"
    );

    document.body.appendChild(scrollTopButton);


    window.addEventListener("scroll", function () {

        if (window.scrollY > 400) {

            scrollTopButton.classList.add("visible");

        } else {

            scrollTopButton.classList.remove("visible");

        }

    });


    scrollTopButton.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    // Typing effect for the hero subtitle
    const heroSubtitle = document.querySelector("header p");

    if (heroSubtitle) {

        const originalText = heroSubtitle.textContent.trim();

        const words = [
            "Computer Science Undergraduate",
            "Web Development Enthusiast",
            "AI Learner",
            "Cybersecurity Enthusiast"
        ];

        let wordIndex = 0;
        let characterIndex = 0;
        let deleting = false;

        function typeEffect() {

            const currentWord = words[wordIndex];

            if (!deleting) {

                heroSubtitle.textContent =
                    currentWord.substring(
                        0,
                        characterIndex + 1
                    );

                characterIndex++;

                if (characterIndex === currentWord.length) {

                    deleting = true;

                    setTimeout(typeEffect, 1800);

                    return;
                }

            } else {

                heroSubtitle.textContent =
                    currentWord.substring(
                        0,
                        characterIndex - 1
                    );

                characterIndex--;

                if (characterIndex === 0) {

                    deleting = false;

                    wordIndex =
                        (wordIndex + 1) % words.length;

                }

            }

            setTimeout(
                typeEffect,
                deleting ? 60 : 100
            );

        }

        heroSubtitle.textContent = "";

        typeEffect();

    }


    // Add hover interaction to project cards
    const projectCards =
        document.querySelectorAll(".project");

    projectCards.forEach(function (card) {

        card.addEventListener("mouseenter", function () {

            this.style.transform = "translateY(-4px)";

        });

        card.addEventListener("mouseleave", function () {

            this.style.transform = "translateY(0)";

        });

    });


    // Add hover interaction to skill tags
    const skillTags =
        document.querySelectorAll(".skill-tag");

    skillTags.forEach(function (tag) {

        tag.addEventListener("mouseenter", function () {

            this.style.transform = "translateY(-2px)";

        });

        tag.addEventListener("mouseleave", function () {

            this.style.transform = "translateY(0)";

        });

    });


    // Current year in footer
    const footerText =
        document.querySelector("footer p");

    if (footerText) {

        const currentYear = new Date().getFullYear();

        footerText.innerHTML =
            `&copy; ${currentYear} Hajra Bashir. All rights reserved.`;

    }

});