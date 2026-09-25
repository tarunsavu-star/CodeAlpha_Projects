/* =========================================================
   TARUN KUMAR SAVU - PORTFOLIO JAVASCRIPT
   CodeAlpha Frontend Development Internship
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            menuToggle.classList.toggle("active");
        });

        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuToggle.classList.remove("active");
            });
        });
    }


    /* =====================================================
       DARK / LIGHT THEME
       ===================================================== */

    const themeToggle = document.querySelector("#themeToggle");
    const savedTheme = localStorage.getItem("portfolioTheme");

    if (savedTheme === "light") {
        document.body.classList.add("light");

        if (themeToggle) {
            themeToggle.innerHTML = "☀️";
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("light");

            const isLight = document.body.classList.contains("light");

            localStorage.setItem(
                "portfolioTheme",
                isLight ? "light" : "dark"
            );

            themeToggle.innerHTML = isLight ? "☀️" : "🌙";
        });
    }


    /* =====================================================
       TYPING ANIMATION
       ===================================================== */

    const typingText = document.querySelector("#typingText");

    const typingWords = [
        "Python Developer",
        "Web Developer",
        "AI/ML Enthusiast",
        "Full Stack Learner",
        "Software Developer"
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
                wordIndex++;

                if (wordIndex >= typingWords.length) {
                    wordIndex = 0;
                }
            }
        }

        setTimeout(typeEffect, deleting ? 60 : 100);
    }

    typeEffect();


    /* =====================================================
       SCROLL REVEAL ANIMATION
       ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".section, .project-card, .timeline-item, .skill-card, .education-card, .cert-card"
        );

    const revealObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    revealObserver.unobserve(entry.target);
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


    /* =====================================================
       ANIMATED COUNTERS
       ===================================================== */

    const counters = document.querySelectorAll(".counter");

    function animateCounter(counter) {

        const target = parseInt(
            counter.getAttribute("data-target")
        );

        if (isNaN(target)) return;

        let current = 0;

        const increment = Math.max(
            1,
            Math.ceil(target / 60)
        );

        const timer = setInterval(() => {

            current += increment;

            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            counter.textContent = current;

        }, 25);
    }

    const counterObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.5
        }
    );

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });


    /* =====================================================
       SKILL PROGRESS BARS
       ===================================================== */

    const skillBars = document.querySelectorAll(".skill-progress");

    const skillObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const percentage =
                        entry.target.getAttribute("data-width");

                    if (percentage) {
                        entry.target.style.width =
                            percentage + "%";
                    }

                    skillObserver.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.4
        }
    );

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });


    /* =====================================================
       PROJECT FILTER
       ===================================================== */

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const projectCards =
        document.querySelectorAll(".project-card");

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            const filter =
                button.getAttribute("data-filter");

            projectCards.forEach(card => {

                const category =
                    card.getAttribute("data-category");

                if (
                    filter === "all" ||
                    category === filter
                ) {

                    card.style.display = "block";

                    setTimeout(() => {
                        card.classList.add("show-card");
                    }, 50);

                } else {

                    card.classList.remove("show-card");
                    card.style.display = "none";

                }

            });

        });

    });


    /* =====================================================
       PROJECT DATA
       ===================================================== */

    const projectData = {

        chatbot: {
            title: "AI Career Guidance Chatbot",
            category: "AI / ML",
            description:
                "An AI-powered career guidance application designed to help students explore suitable career paths using machine learning and natural language processing.",
            technologies:
                "Python, Flask, Machine Learning, NLP, HTML, CSS, JavaScript",
            features: [
                "Career recommendation",
                "Natural language interaction",
                "Flask backend",
                "Machine learning integration",
                "Responsive interface"
            ]
        },

        placement: {
            title: "Student Placement Prediction System",
            category: "Machine Learning",
            description:
                "A machine learning application that predicts student placement outcomes using academic and related student information.",
            technologies:
                "Python, Pandas, NumPy, Scikit-learn, Random Forest, Tkinter",
            features: [
                "Placement prediction",
                "Random Forest model",
                "Data preprocessing",
                "Tkinter GUI",
                "Student data analysis"
            ]
        },

        train: {
            title: "Train Ticket Reservation",
            category: "Web Development",
            description:
                "A responsive train ticket reservation website created using frontend technologies with a clean and user-friendly interface.",
            technologies:
                "HTML5, CSS3, JavaScript",
            features: [
                "Responsive design",
                "Train search interface",
                "Ticket reservation UI",
                "Interactive components",
                "Mobile-friendly layout"
            ]
        },

        weather: {
            title: "Advanced Weather App",
            category: "Web Development",
            description:
                "A modern weather application interface designed to display weather information with an attractive responsive design.",
            technologies:
                "HTML, CSS, JavaScript",
            features: [
                "Weather interface",
                "Responsive layout",
                "Modern UI",
                "Interactive elements",
                "Weather information display"
            ]
        },

        password: {
            title: "Advanced Password Generator",
            category: "Python",
            description:
                "A Python-based password generator that creates customizable secure passwords through an easy-to-use graphical interface.",
            technologies:
                "Python, Tkinter",
            features: [
                "Random password generation",
                "Custom password length",
                "Character selection",
                "GUI interface",
                "Copy functionality"
            ]
        },

        bmi: {
            title: "BMI Calculator",
            category: "Python",
            description:
                "A Python Tkinter BMI calculator with additional functionality for storing and viewing BMI information.",
            technologies:
                "Python, Tkinter, SQLite, CSV",
            features: [
                "BMI calculation",
                "Tkinter GUI",
                "SQLite storage",
                "CSV export",
                "BMI trend visualization"
            ]
        }

    };


    /* =====================================================
       PROJECT MODAL
       ===================================================== */

    const modal =
        document.querySelector("#projectModal");

    const modalTitle =
        document.querySelector("#modalTitle");

    const modalCategory =
        document.querySelector("#modalCategory");

    const modalDescription =
        document.querySelector("#modalDescription");

    const modalTech =
        document.querySelector("#modalTech");

    const modalFeatures =
        document.querySelector("#modalFeatures");

    const modalClose =
        document.querySelector(".modal-close");

    const projectButtons =
        document.querySelectorAll(".project-details");


    function openProjectModal(projectKey) {

        const project =
            projectData[projectKey];

        if (!project || !modal) return;

        if (modalTitle)
            modalTitle.textContent = project.title;

        if (modalCategory)
            modalCategory.textContent = project.category;

        if (modalDescription)
            modalDescription.textContent =
                project.description;

        if (modalTech)
            modalTech.textContent =
                project.technologies;

        if (modalFeatures) {

            modalFeatures.innerHTML = "";

            project.features.forEach(feature => {

                const li =
                    document.createElement("li");

                li.textContent = feature;

                modalFeatures.appendChild(li);

            });

        }

        modal.classList.add("active");

        document.body.style.overflow = "hidden";
    }


    projectButtons.forEach(button => {

        button.addEventListener("click", () => {

            const projectKey =
                button.getAttribute("data-project");

            openProjectModal(projectKey);

        });

    });


    function closeProjectModal() {

        if (!modal) return;

        modal.classList.remove("active");

        document.body.style.overflow = "";
    }


    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeProjectModal
        );

    }


    if (modal) {

        modal.addEventListener("click", event => {

            if (event.target === modal) {
                closeProjectModal();
            }

        });

    }


    /* =====================================================
       ESC KEY - CLOSE MODAL
       ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeProjectModal();
        }

    });


    /* =====================================================
       AI PORTFOLIO ASSISTANT
       ===================================================== */

    const aiPanel =
        document.querySelector("#aiAssistant");

    const aiMessages =
        document.querySelector("#aiMessages");

    const aiInput =
        document.querySelector("#aiInput");

    const aiSend =
        document.querySelector("#aiSend");

    const aiOpenButtons =
        document.querySelectorAll(".open-ai");


    function addAIMessage(message, type = "bot") {

        if (!aiMessages) return;

        const messageDiv =
            document.createElement("div");

        messageDiv.className =
            `ai-message ${type}`;

        messageDiv.textContent = message;

        aiMessages.appendChild(messageDiv);

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

            return "Hello! 👋 I'm Tarun's Portfolio Assistant. Ask me about his skills, projects, internships, education, or resume.";

        }


        if (
            text.includes("skill") ||
            text.includes("technolog")
        ) {

            return "Tarun's key skills include Python, Java, C, HTML, CSS, JavaScript, Flask, SQL, MySQL, MongoDB, Machine Learning, NLP, Pandas, NumPy, Scikit-learn, Power BI and MERN Full Stack Development.";

        }


        if (
            text.includes("project") ||
            text.includes("projects")
        ) {

            return "Tarun has worked on an AI Career Guidance Chatbot, Student Placement Prediction System, Train Ticket Reservation Website, Advanced Weather App, Advanced Password Generator and BMI Calculator.";

        }


        if (
            text.includes("internship") ||
            text.includes("experience")
        ) {

            return "Tarun has internship experience with Vidrutha Solutions, Oasis Infobyte and ADHOC NETWORK, covering software development, Python development and MERN full-stack development.";

        }


        if (
            text.includes("vidrutha")
        ) {

            return "At Vidrutha Solutions, Tarun worked as a Software Development Intern from December 2025 to April 2026, working with Python, Flask, Machine Learning, NLP and web technologies.";

        }


        if (
            text.includes("oasis")
        ) {

            return "At Oasis Infobyte, Tarun worked as a Python Programming Intern from August 5 to September 15, 2026, working on projects such as a BMI Calculator, Random Password Generator and Weather App.";

        }


        if (
            text.includes("education") ||
            text.includes("degree") ||
            text.includes("college")
        ) {

            return "Tarun is pursuing a Bachelor of Computer Applications (BCA) at Sri Aditya Degree College, Srikakulam. His portfolio lists an overall CGPA of 7.81/10.";

        }


        if (
            text.includes("python")
        ) {

            return "Python is one of Tarun's primary technical skills. He has used Python for machine learning, Flask applications, automation and GUI projects.";

        }


        if (
            text.includes("ai") ||
            text.includes("machine learning") ||
            text.includes("ml")
        ) {

            return "Tarun has experience with AI/ML concepts including Machine Learning, NLP, Pandas, NumPy and Scikit-learn. His AI Career Guidance Chatbot is one of his highlighted projects.";

        }


        if (
            text.includes("resume") ||
            text.includes("cv")
        ) {

            return "You can download Tarun's resume from the Resume section of this portfolio.";

        }


        if (
            text.includes("contact") ||
            text.includes("email") ||
            text.includes("reach")
        ) {

            return "You can contact Tarun through the Contact section, LinkedIn, GitHub or email.";

        }


        if (
            text.includes("github")
        ) {

            return "Tarun's GitHub profile contains his development projects and source code.";

        }


        if (
            text.includes("linkedin")
        ) {

            return "You can connect with Tarun on LinkedIn through the social links provided in the portfolio.";

        }


        if (
            text.includes("future") ||
            text.includes("career")
        ) {

            return "Tarun is focused on developing his skills in software development, Python, AI/ML and full-stack web development.";

        }


        return "I can help you explore Tarun's skills, projects, internships, education, resume and contact information. Try asking something like: 'What are his skills?'";


    }


    function sendAIMessage() {

        if (!aiInput) return;

        const question =
            aiInput.value.trim();

        if (!question) return;

        addAIMessage(question, "user");

        aiInput.value = "";

        setTimeout(() => {

            const response =
                getAIResponse(question);

            addAIMessage(response, "bot");

        }, 500);

    }


    if (aiSend) {

        aiSend.addEventListener(
            "click",
            sendAIMessage
        );

    }


    if (aiInput) {

        aiInput.addEventListener(
            "keydown",
            event => {

                if (event.key === "Enter") {
                    sendAIMessage();
                }

            }
        );

    }


    aiOpenButtons.forEach(button => {

        button.addEventListener("click", () => {

            if (!aiPanel) return;

            aiPanel.classList.add("active");

            aiInput?.focus();

        });

    });


    const aiClose =
        document.querySelector(".ai-close");

    if (aiClose) {

        aiClose.addEventListener("click", () => {

            aiPanel?.classList.remove("active");

        });

    }


    /* =====================================================
       CONTACT FORM
       ===================================================== */

    const contactForm =
        document.querySelector("#contactForm");

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const name =
                    document.querySelector("#name")?.value.trim();

                const email =
                    document.querySelector("#email")?.value.trim();

                const subject =
                    document.querySelector("#subject")?.value.trim();

                const message =
                    document.querySelector("#message")?.value.trim();


                if (!name || !email || !message) {

                    showToast(
                        "Please fill in all required fields.",
                        "error"
                    );

                    return;
                }


                const mailSubject =
                    encodeURIComponent(
                        subject ||
                        `Portfolio Contact from ${name}`
                    );

                const mailBody =
                    encodeURIComponent(
                        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
                    );


                const mailto =
                    `mailto:tarunsavu@gmail.com?subject=${mailSubject}&body=${mailBody}`;


                window.location.href = mailto;


                showToast(
                    "Opening your email application...",
                    "success"
                );

            }
        );

    }


    /* =====================================================
       TOAST NOTIFICATION
       ===================================================== */

    const toast =
        document.querySelector("#toast");


    function showToast(message, type = "success") {

        if (!toast) return;

        toast.textContent = message;

        toast.className =
            `toast ${type} show`;

        setTimeout(() => {

            toast.classList.remove("show");

        }, 3000);

    }


    /* =====================================================
       BACK TO TOP
       ===================================================== */

    const backToTop =
        document.querySelector("#backToTop");


    window.addEventListener("scroll", () => {

        if (!backToTop) return;

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    });


    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       ACTIVE NAVIGATION
       ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navigationLinks =
        document.querySelectorAll(".nav-links a");


    window.addEventListener("scroll", () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 180;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
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
                href === `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    });


    /* =====================================================
       SMOOTH INTERNAL LINKS
       ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                targetId === "#" ||
                targetId.length < 2
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       PROFILE IMAGE FALLBACK
       ===================================================== */

    const profileImage =
        document.querySelector(".profile-image");

    if (profileImage) {

        profileImage.addEventListener(
            "error",
            () => {

                profileImage.style.display =
                    "none";

                const parent =
                    profileImage.parentElement;

                if (parent) {

                    parent.classList.add(
                        "profile-placeholder"
                    );

                }

            }
        );

    }


    /* =====================================================
       CARD 3D TILT EFFECT
       ===================================================== */

    const tiltCards =
        document.querySelectorAll(
            ".project-card, .skill-card"
        );


    if (window.innerWidth > 900) {

        tiltCards.forEach(card => {

            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        event.clientX - rect.left;

                    const y =
                        event.clientY - rect.top;

                    const centerX =
                        rect.width / 2;

                    const centerY =
                        rect.height / 2;

                    const rotateX =
                        ((y - centerY) / centerY) * -4;

                    const rotateY =
                        ((x - centerX) / centerX) * 4;


                    card.style.transform =
                        `perspective(900px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-8px)`;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform = "";

                }
            );

        });

    }


    /* =====================================================
       KEYBOARD SHORTCUT FOR AI
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "/" &&
                document.activeElement.tagName !== "INPUT" &&
                document.activeElement.tagName !== "TEXTAREA"
            ) {

                event.preventDefault();

                if (aiPanel) {

                    aiPanel.classList.add("active");

                    aiInput?.focus();

                }

            }

        }
    );


    /* =====================================================
       RANDOM BACKGROUND PARTICLES
       ===================================================== */

    const particleContainer =
        document.querySelector("#particles");


    if (particleContainer) {

        for (let i = 0; i < 35; i++) {

            const particle =
                document.createElement("span");

            particle.className =
                "particle";

            particle.style.left =
                Math.random() * 100 + "%";

            particle.style.top =
                Math.random() * 100 + "%";

            particle.style.animationDelay =
                Math.random() * 6 + "s";

            particle.style.animationDuration =
                4 + Math.random() * 6 + "s";

            particleContainer.appendChild(
                particle
            );

        }

    }


    /* =====================================================
       CONSOLE INFORMATION
       ===================================================== */

    console.log(
        "%c Tarun Kumar Savu - Portfolio ",
        "font-size:20px;font-weight:bold;"
    );

    console.log(
        "Portfolio loaded successfully."
    );

});
