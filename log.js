document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("login-form").addEventListener("submit", function(e) {
        e.preventDefault();
        // Tutaj powinna być logika uwierzytelniania
        document.getElementById("login-message").style.display = "block";
        document.getElementById("contact").style.display = "block";
        document.getElementById("login").style.display = "none";
        document.getElementById("logout-link").style.display = "inline";
        document.getElementById("logout-link-footer").style.display = "inline";
        document.getElementById("contact-link").style.display = "inline";
        document.getElementById("contact-link-footer").style.display = "inline";
        document.querySelector("nav ul li a[href='#login']").style.display = "none";
    });

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
