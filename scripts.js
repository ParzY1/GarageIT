document.addEventListener("DOMContentLoaded", function() {
    // Smooth scroll for navigation links
    document.querySelectorAll('nav a, .hero-buttons a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Fade-in animation for sections
    const faders = document.querySelectorAll('.features, .technology, .requirements, .benefits, .testimonials, .faq, .about, .contact');

    const appearOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Login form submission
    document.getElementById("login-form").addEventListener("submit", function(e) {
        e.preventDefault();
        // Here should be your authentication logic
        document.getElementById("login-message").style.display = "block";
        document.getElementById("contact").style.display = "block";
        document.getElementById("login").style.display = "none";
        document.getElementById("logout-link").style.display = "inline";
        document.getElementById("logout-link-footer").style.display = "inline";
        document.getElementById("contact-link").style.display = "inline";
        document.getElementById("contact-link-footer").style.display = "inline";
        document.querySelector("nav ul li a[href='#login']").style.display = "none";
    });

    // Logout functionality
    document.getElementById("logout").addEventListener("click", function(e) {
        e.preventDefault();
        document.getElementById("contact").style.display = "none";
        document.getElementById("login").style.display = "block";
        document.getElementById("logout-link").style.display = "none";
        document.getElementById("logout-link-footer").style.display = "none";
        document.getElementById("contact-link").style.display = "none";
        document.getElementById("contact-link-footer").style.display = "none";
        document.querySelector("nav ul li a[href='#login']").style.display = "inline";
    });

    document.getElementById("logout-footer").addEventListener("click", function(e) {
        e.preventDefault();
        document.getElementById("contact").style.display = "none";
        document.getElementById("login").style.display = "block";
        document.getElementById("logout-link").style.display = "none";
        document.getElementById("logout-link-footer").style.display = "none";
        document.getElementById("contact-link").style.display = "none";
        document.getElementById("contact-link-footer").style.display = "none";
        document.querySelector("nav ul li a[href='#login']").style.display = "inline";
    });
});
