document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;
    const themeButton = document.getElementById("themeButton");
    const menuButton = document.getElementById("menuButton");
    const navMenu = document.getElementById("navMenu");
    const typingText = document.getElementById("typingText");
    const projectModal = document.getElementById("projectModal");
    const modalClose = document.getElementById("modalClose");
    const modalIcon = document.getElementById("modalIcon");
    const modalCategory = document.getElementById("modalCategory");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");
    const modalTags = document.getElementById("modalTags");
    const aiButton = document.getElementById("aiButton");
    const aiPanel = document.getElementById("aiPanel");
    const closeAi = document.getElementById("closeAi");
    const aiMessages = document.getElementById("aiMessages");
    const aiInput = document.getElementById("aiInput");
    const sendAi = document.getElementById("sendAi");
    const contactForm = document.getElementById("contactForm");
    const toast = document.getElementById("toast");
    const backTop = document.getElementById("backTop");

    if (menuButton && navMenu) {
        menuButton.addEventListener("click", () => {
            navMenu.classList.toggle("open");
            menuButton.classList.toggle("open");
        });
    }

    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            navMenu?.classList.remove("open");
            menuButton?.classList.remove("open");
        });
    });

    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "light") {
        body.classList.add("light");
    }

    function updateThemeIcon() {
        if (!themeButton) return;

        themeButton.textContent =
            body.classList.contains("light") ? "☀️" : "🌙";
    }

    updateThemeIcon();

    themeButton?.addEventListener("click", () => {
        body.classList.toggle("light");

        localStorage.setItem(
            "portfolio-theme",
            body.classList.contains("light") ? "light" : "dark"
        );

        updateThemeIcon();
    });

    const typingWords = [
        "Software Developer",
        "Python Developer",
        "AI/ML Enthusiast",
        "Full Stack Developer",
        "Frontend Developer"
    ];

    let wordIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    function typeEffect() {
        if (!typingText) return;

        const currentWord = typingWords[wordIndex];

        if (!deleting) {
            typingText.textContent =
                currentWord.substring(0, characterIndex + 1);

            characterIndex++;

            if (characterIndex === currentWord.length) {
                deleting = true;

                setTimeout(typeEffect, 1500);
                return;
            }
        } else {
            typingText.textContent =
                currentWord.substring(0, characterIndex - 1);

            characterIndex--;

            if (characterIndex === 0) {
                deleting = false;

                wordIndex =
                    (wordIndex + 1) % typingWords.length;
            }
        }

        setTimeout(
            typeEffect,
            deleting ? 55 : 90
        );
    }

    typeEffect();

    const revealElements =
        document.querySelectorAll(".reveal");

    const revealObserver =
        new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }
                });
            },
            { threshold: 0.12 }
        );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    const counters =
        document.querySelectorAll(".counter");

    function animateCounter(counter) {
        const target =
            parseFloat(
                counter.dataset.target ||
                counter.textContent ||
                "0"
            );

        const suffix =
            counter.dataset.suffix || "";

        let current = 0;

        const increment =
            target / 60;

        function update() {
            current += increment;

            if (current >= target) {
                counter.textContent =
                    target + suffix;

                return;
            }

            const value =
                Number.isInteger(target)
                    ? Math.floor(current)
                    : current.toFixed(2);

            counter.textContent =
                value + suffix;

            requestAnimationFrame(update);
        }

        update();
    }

    const counterObserver =
        new IntersectionObserver(
            entries => {
                entries.forEach(entry => {

                    if (
                        entry.isIntersecting &&
                        !entry.target.dataset.animated
                    ) {
                        entry.target.dataset.animated =
                            "true";

                        animateCounter(
                            entry.target
                        );
                    }

                });
            },
            { threshold: 0.7 }
        );

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    const skillBars =
        document.querySelectorAll(".bar i");

    const skillObserver =
        new IntersectionObserver(
            entries => {
                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        const bar =
                            entry.target;

                        const width =
                            bar.dataset.width ||
                            bar.getAttribute(
                                "data-width"
                            );

                        if (width) {
                            bar.style.width =
                                width + "%";
                        }
                    }

                });
            },
            { threshold: 0.5 }
        );

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });

    const projects = {

        career: {
            icon: "🤖",
            category: "AI / ML",
            title: "AI Career Guidance Chatbot",

            description:
                "An AI-powered career guidance chatbot developed using Python, Flask, Machine Learning and Natural Language Processing. The application helps users explore career paths and receive guidance based on their interests and skills.",

            tags: [
                "Python",
                "Flask",
                "Machine Learning",
                "NLP",
                "HTML",
                "CSS",
                "JavaScript"
            ]
        },

        placement: {
            icon: "🎓",
            category: "AI / ML",
            title: "Student Placement Prediction System",

            description:
                "A machine learning application that predicts student placement outcomes using student-related academic and performance information. Built with Python, Pandas and Scikit-learn using a Random Forest model.",

            tags: [
                "Python",
                "Pandas",
                "Scikit-learn",
                "Random Forest",
                "Machine Learning",
                "Tkinter"
            ]
        },

        train: {
            icon: "🚆",
            category: "Web Development",
            title: "Train Ticket Reservation Website",

            description:
                "A responsive train ticket reservation website created using HTML5, CSS and JavaScript. The project focuses on a clean user interface and responsive frontend experience.",

            tags: [
                "HTML5",
                "CSS3",
                "JavaScript",
                "Responsive Design"
            ]
        },

        weather: {
            icon: "🌤️",
            category: "Python",
            title: "Advanced Weather App",

            description:
                "A weather application designed to display weather information through a simple and responsive interface with a focus on usability and frontend presentation.",

            tags: [
                "Python",
                "Weather API",
                "HTML",
                "CSS",
                "JavaScript"
            ]
        },

        password: {
            icon: "🔐",
            category: "Python",
            title: "Advanced Password Generator",

            description:
                "A Python-based password generator application with a graphical interface for creating strong and customizable passwords.",

            tags: [
                "Python",
                "Tkinter",
                "Security",
                "GUI"
            ]
        },

        bmi: {
            icon: "⚕️",
            category: "Python",
            title: "BMI Calculator",

            description:
                "A Python Tkinter BMI calculator that calculates BMI from height and weight and provides a simple graphical interface. The project also includes SQLite and CSV-related functionality.",

            tags: [
                "Python",
                "Tkinter",
                "SQLite",
                "CSV",
                "Data Visualization"
            ]
        }
    };

    const filterButtons =
        document.querySelectorAll(".filter");

    const projectCards =
        document.querySelectorAll(".project-card");

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(item => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            const filter =
                button.dataset.filter ||
                button.getAttribute(
                    "data-filter"
                ) ||
                "all";

            projectCards.forEach(card => {

                const category =
                    (
                        card.dataset.category ||
                        ""
                    ).toLowerCase();

                if (
                    filter === "all" ||
                    category ===
                    filter.toLowerCase()
                ) {

                    card.style.display = "";

                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "";
                    }, 20);

                } else {

                    card.style.opacity = "0";
                    card.style.transform =
                        "scale(.94)";

                    setTimeout(() => {
                        card.style.display =
                            "none";
                    }, 250);
                }

            });

        });

    });

    function openProject(projectId) {

        if (!projectModal) return;

        const project =
            projects[projectId];

        if (!project) return;

        if (modalIcon) {
            modalIcon.textContent =
                project.icon;
        }

        if (modalCategory) {
            modalCategory.textContent =
                project.category;
        }

        if (modalTitle) {
            modalTitle.textContent =
                project.title;
        }

        if (modalDescription) {
            modalDescription.textContent =
                project.description;
        }

        if (modalTags) {

            modalTags.innerHTML = "";

            project.tags.forEach(tag => {

                const span =
                    document.createElement(
                        "span"
                    );

                span.textContent = tag;

                modalTags.appendChild(
                    span
                );

            });
        }

        projectModal.classList.add("open");

        document.body.style.overflow =
            "hidden";
    }

    function closeProject() {

        if (!projectModal) return;

        projectModal.classList.remove(
            "open"
        );

        document.body.style.overflow =
            "";
    }

    document
        .querySelectorAll(".details-button")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const projectId =
                        button.dataset.project ||
                        button.getAttribute(
                            "data-project"
                        );

                    openProject(projectId);
                }
            );

        });

    modalClose?.addEventListener(
        "click",
        closeProject
    );

    projectModal?.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                projectModal
            ) {
                closeProject();
            }

        }
    );

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeProject();

                aiPanel?.classList.remove(
                    "open"
                );
            }

        }
    );

    function addAIMessage(
        message,
        type = "bot"
    ) {

        if (!aiMessages) return;

        const messageElement =
            document.createElement(
                "div"
            );

        messageElement.className =
            "ai-message " + type;

        messageElement.textContent =
            message;

        aiMessages.appendChild(
            messageElement
        );

        aiMessages.scrollTop =
            aiMessages.scrollHeight;
    }

    function getAIResponse(question) {

        const text =
            question.toLowerCase().trim();

        if (
            text.includes("hello") ||
            text.includes("hi") ||
            text.includes("hey")
        ) {

            return "Hello! 👋 I'm Tarun's Portfolio Assistant. Ask me about his skills, projects, internships, education or resume.";
        }

        if (
            text.includes("skill") ||
            text.includes("technology") ||
            text.includes("technologies")
        ) {

            return "Tarun's key skills include Python, Java, C, HTML, CSS, JavaScript, Flask, SQL, MySQL, MongoDB, Machine Learning, NLP, Pandas, NumPy, Scikit-learn and MERN Full Stack Development.";
        }

        if (text.includes("project")) {

            return "Tarun's projects include an AI Career Guidance Chatbot, Student Placement Prediction System, Train Ticket Reservation Website, Advanced Weather App, Advanced Password Generator and BMI Calculator.";
        }

        if (
            text.includes("internship") ||
            text.includes("experience")
        ) {

            return "Tarun has internship experience with Vidrutha Solutions, Oasis Infobyte and ADHOC NETWORK.";
        }

        if (text.includes("vidrutha")) {

            return "At Vidrutha Solutions, Tarun worked on software development projects using Python, Flask, Machine Learning, NLP and web technologies.";
        }

        if (text.includes("oasis")) {

            return "At Oasis Infobyte, Tarun worked on Python projects including a BMI Calculator, Random Password Generator and Weather App.";
        }

        if (
            text.includes("education") ||
            text.includes("degree") ||
            text.includes("college")
        ) {

            return "Tarun completed his Bachelor of Computer Applications at Sri Aditya Degree College, Srikakulam.";
        }

        if (text.includes("python")) {

            return "Python is one of Tarun's primary technical skills. He has used Python for Machine Learning, Flask, Tkinter and application development.";
        }

        if (
            text.includes("ai") ||
            text.includes("machine learning") ||
            text.includes("ml") ||
            text.includes("nlp")
        ) {

            return "Tarun has experience with Machine Learning, NLP, Pandas, NumPy and Scikit-learn. His AI Career Guidance Chatbot is one of his highlighted projects.";
        }
       /* =========================
   PART 2 — PORTFOLIO SCRIPT
   ========================= */

document.addEventListener("DOMContentLoaded", () => {

    // -------------------------
    // Mobile Navigation
    // -------------------------
    const menuButton =
        document.querySelector(".menu-toggle") ||
        document.querySelector(".nav-toggle") ||
        document.querySelector(".hamburger");

    const navMenu =
        document.querySelector(".nav-menu") ||
        document.querySelector("nav ul") ||
        document.querySelector(".nav-links");

    if (menuButton && navMenu) {
        menuButton.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            menuButton.classList.toggle("active");
        });

        navMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
                menuButton.classList.remove("active");
            });
        });
    }

    // -------------------------
    // Smooth Scrolling
    // -------------------------
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", function (event) {
            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

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

    // -------------------------
    // Theme Toggle
    // -------------------------
    const themeToggle =
        document.querySelector("#themeToggle") ||
        document.querySelector(".theme-toggle") ||
        document.querySelector("[data-theme-toggle]");

    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {

            document.body.classList.toggle("light-theme");

            const isLight =
                document.body.classList.contains("light-theme");

            localStorage.setItem(
                "portfolio-theme",
                isLight ? "light" : "dark"
            );
        });
    }

    // -------------------------
    // Scroll To Top
    // -------------------------
    const topButton =
        document.querySelector("#scrollTop") ||
        document.querySelector(".scroll-top");

    if (topButton) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 400) {
                topButton.classList.add("show");
            } else {
                topButton.classList.remove("show");
            }
        });

        topButton.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // -------------------------
    // Active Navigation
    // -------------------------
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(
        'nav a[href^="#"], .nav-links a[href^="#"]'
    );

    function updateActiveLink() {

        let currentSection = "";

        sections.forEach(section => {
            const sectionTop =
                section.getBoundingClientRect().top;

            if (sectionTop <= 150) {
                currentSection = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink();

    // -------------------------
    // Reveal Animations
    // -------------------------
    const revealElements = document.querySelectorAll(
        ".reveal, .fade-in, .project-card, .skill-card, .timeline-item"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observerInstance.unobserve(
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
            observer.observe(element);
        });
    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });
    }

    // -------------------------
    // Skill Progress Animation
    // -------------------------
    const skillBars =
        document.querySelectorAll(".skill-progress");

    if ("IntersectionObserver" in window) {

        const skillObserver = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        const bar = entry.target;
                        const width =
                            bar.getAttribute("data-width") ||
                            bar.dataset.width;

                        if (width) {
                            bar.style.width = width;
                        }

                        skillObserver.unobserve(bar);
                    }
                });

            },
            {
                threshold: 0.5
            }
        );

        skillBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    }

    // -------------------------
    // Contact Form
    // -------------------------
    const contactForm =
        document.querySelector("#contactForm") ||
        document.querySelector(".contact-form");

    if (contactForm) {

        contactForm.addEventListener("submit", event => {

            event.preventDefault();

            const name =
                contactForm.querySelector(
                    'input[name="name"]'
                )?.value.trim();

            const email =
                contactForm.querySelector(
                    'input[name="email"]'
                )?.value.trim();

            const message =
                contactForm.querySelector(
                    'textarea[name="message"]'
                )?.value.trim();

            if (!name || !email || !message) {

                showNotification(
                    "Please fill in all fields.",
                    "error"
                );

                return;
            }

            showNotification(
                "Thank you! Your message has been received.",
                "success"
            );

            contactForm.reset();
        });
    }

    // -------------------------
    // Notification
    // -------------------------
    function showNotification(message, type = "success") {

        const existing =
            document.querySelector(".portfolio-notification");

        if (existing) {
            existing.remove();
        }

        const notification =
            document.createElement("div");

        notification.className =
            `portfolio-notification ${type}`;

        notification.textContent = message;

        document.body.appendChild(notification);

        requestAnimationFrame(() => {
            notification.classList.add("show");
        });

        setTimeout(() => {

            notification.classList.remove("show");

            setTimeout(() => {
                notification.remove();
            }, 300);

        }, 3500);
    }

    // -------------------------
    // Copy Email
    // -------------------------
    document.querySelectorAll(
        "[data-copy-email], .copy-email"
    ).forEach(button => {

        button.addEventListener("click", async () => {

            const email =
                button.dataset.email ||
                button.getAttribute("data-copy-email");

            if (!email) return;

            try {

                await navigator.clipboard.writeText(email);

                showNotification(
                    "Email copied successfully!",
                    "success"
                );

            } catch (error) {

                showNotification(
                    "Unable to copy email.",
                    "error"
                );
            }
        });
    });

    // -------------------------
    // Project Buttons
    // -------------------------
    document.querySelectorAll(
        ".project-card a, .project-btn"
    ).forEach(button => {

        button.addEventListener("click", () => {
            button.classList.add("clicked");

            setTimeout(() => {
                button.classList.remove("clicked");
            }, 300);
        });
    });

    // -------------------------
    // Current Year
    // -------------------------
    document.querySelectorAll(
        "[data-current-year], #currentYear"
    ).forEach(element => {
        element.textContent =
            new Date().getFullYear();
    });

    // -------------------------
    // Typing Effect
    // -------------------------
    const typingElement =
        document.querySelector(".typing-text") ||
        document.querySelector("#typingText");

    if (typingElement) {

        const words = [
            "Python Developer",
            "Web Developer",
            "AI/ML Enthusiast",
            "BCA Graduate"
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
                        1500
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
                deleting ? 60 : 100
            );
        }

        typeEffect();
    }

    // -------------------------
    // AI Panel
    // -------------------------
    const aiButton =
        document.querySelector("#aiButton") ||
        document.querySelector(".ai-button") ||
        document.querySelector(".ai-floating-button");

    const aiPanel =
        document.querySelector("#aiPanel") ||
        document.querySelector(".ai-panel");

    const aiClose =
        document.querySelector("#aiClose") ||
        document.querySelector(".ai-close");

    const aiInput =
        document.querySelector("#aiInput") ||
        document.querySelector(".ai-input");

    const aiForm =
        document.querySelector("#aiForm") ||
        document.querySelector(".ai-form");

    const aiMessages =
        document.querySelector("#aiMessages") ||
        document.querySelector(".ai-messages");

    if (aiButton && aiPanel) {

        aiButton.addEventListener("click", event => {

            event.preventDefault();

            aiPanel.classList.toggle("active");

            if (
                aiPanel.classList.contains("active") &&
                aiInput
            ) {
                setTimeout(() => {
                    aiInput.focus();
                }, 200);
            }
        });
    }

    if (aiClose && aiPanel) {

        aiClose.addEventListener("click", () => {
            aiPanel.classList.remove("active");
        });
    }

    // -------------------------
    // Portfolio AI Responses
    // -------------------------
    function getAIResponse(question) {

        const text =
            question.toLowerCase().trim();

        if (
            text.includes("hello") ||
            text.includes("hi") ||
            text.includes("hey")
        ) {
            return "Hello! 👋 I'm Tarun's portfolio assistant. Ask me about his skills, education, projects, internships, or experience.";
        }

        if (
            text.includes("who") &&
            text.includes("tarun")
        ) {
            return "Tarun Kumar Savu is a BCA graduate with interests in Python, Web Development, AI/ML and software development.";
        }

        if (
            text.includes("skill") ||
            text.includes("technology")
        ) {
            return "Tarun's skills include Python, Java, C, HTML, CSS, JavaScript, Flask, SQL, MySQL, PostgreSQL, MongoDB, Pandas, NumPy, Scikit-learn, AI/ML and web development.";
        }

        if (
            text.includes("python")
        ) {
            return "Python is one of Tarun's primary technical skills. He has used Python for automation, GUI applications, machine learning and AI-based projects.";
        }

        if (
            text.includes("education") ||
            text.includes("degree") ||
            text.includes("college")
        ) {
            return "Tarun completed his Bachelor of Computer Applications (BCA) from Sri Aditya Degree College, Srikakulam.";
        }

        if (
            text.includes("internship") ||
            text.includes("experience")
        ) {
            return "Tarun has internship experience including Software Development work at Vidrutha Solutions and Python Programming work through Oasis Infobyte.";
        }

        if (
            text.includes("oasis") ||
            text.includes("infobyte")
        ) {
            return "At Oasis Infobyte, Tarun worked on Python programming tasks including a BMI Calculator and Random Password Generator.";
        }

        if (
            text.includes("vidrutha")
        ) {
            return "At Vidrutha Solutions, Tarun worked on software development and AI-based projects involving Flask, Machine Learning and NLP.";
        }

        if (
            text.includes("project")
        ) {
            return "Tarun has worked on projects such as an AI Career Guidance Chatbot, Student Placement Prediction System, BMI Calculator, Random Password Generator and responsive web applications.";
        }

        if (
            text.includes("contact") ||
            text.includes("email")
        ) {
            return "Please use the Contact section of the portfolio to reach Tarun.";
        }

        if (
            text.includes("github")
        ) {
            return "You can find Tarun's projects and source code through the GitHub link provided in the portfolio.";
        }

        if (
            text.includes("linkedin")
        ) {
            return "You can connect with Tarun through the LinkedIn link available in the portfolio.";
        }

        if (
            text.includes("ai") ||
            text.includes("machine learning") ||
            text.includes("ml") ||
            text.includes("nlp")
        ) {
            return "Tarun has experience with AI/ML concepts and projects involving Machine Learning, NLP, Flask, Pandas, NumPy and Scikit-learn.";
        }

        if (
            text.includes("resume") ||
            text.includes("cv")
        ) {
            return "You can view Tarun's professional information, skills, projects and experience through this portfolio.";
        }

        return "I can help you learn about Tarun's education, skills, internships, projects, Python experience, AI/ML experience, GitHub and contact information.";
    }

    // -------------------------
    // Add AI Message
    // -------------------------
    function addAIMessage(message, sender) {

        if (!aiMessages) return;

        const messageElement =
            document.createElement("div");

        messageElement.className =
            `ai-message ${sender}`;

        messageElement.textContent =
            message;

        aiMessages.appendChild(
            messageElement
        );

        aiMessages.scrollTop =
            aiMessages.scrollHeight;
    }

    // -------------------------
    // AI Form Submit
    // -------------------------
    if (aiForm) {

        aiForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const question =
                    aiInput?.value.trim();

                if (!question) return;

                addAIMessage(
                    question,
                    "user"
                );

                if (aiInput) {
                    aiInput.value = "";
                }

                setTimeout(() => {

                    const response =
                        getAIResponse(question);

                    addAIMessage(
                        response,
                        "assistant"
                    );

                }, 400);
            }
        );
    }

    // -------------------------
    // Enter Key For AI
    // -------------------------
    if (aiInput) {

        aiInput.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" &&
                    !event.shiftKey
                ) {

                    event.preventDefault();

                    if (aiForm) {
                        aiForm.dispatchEvent(
                            new Event("submit", {
                                bubbles: true,
                                cancelable: true
                            })
                        );
                    }
                }
            }
        );
    }

    // -------------------------
    // Close AI With Escape
    // -------------------------
    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                aiPanel
            ) {
                aiPanel.classList.remove(
                    "active"
                );
            }
        }
    );

    // -------------------------
    // Page Loaded
    // -------------------------
    console.log(
        "Tarun Kumar Savu Portfolio loaded successfully."
    );

});
