document.addEventListener("DOMContentLoaded", function() {
    // Smooth scroll for navigation links
    document.querySelectorAll('nav a, .hero-buttons a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
                history.pushState(null, null, targetId); // Update the URL in the address bar
            } else {
                window.location.href = targetId; // Handle external links
            }
        });
    });

    // Fade-in animation for sections
    const faders = document.querySelectorAll('.features, .technology, .plans, .benefits, .contact, .auth');

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
    document.getElementById("auth-form").addEventListener("submit", function(e) {
        e.preventDefault();
        // Here should be your authentication logic
        document.getElementById("auth-message").style.display = "block";
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

    // Toggle between login and registration forms
    document.getElementById("toggle-link").addEventListener("click", function(e) {
        e.preventDefault();
        const isLogin = document.getElementById("auth-title").textContent.includes("Zaloguj się");
        document.getElementById("auth-title").textContent = isLogin ? "Załóż konto" : "Zaloguj się";
        document.getElementById("auth-button").textContent = isLogin ? "Załóż konto" : "Zaloguj się";
        document.getElementById("auth-toggle").innerHTML = isLogin ? 'Masz już konto? <a href="#" id="toggle-link">Zaloguj się!</a>' : 'Nie masz jeszcze konta? <a href="#" id="toggle-link">Załóż teraz!</a>';
        document.getElementById("email-container").style.display = isLogin ? "block" : "none";
        document.getElementById("confirm-password-container").style.display = isLogin ? "block" : "none";
    });
});
