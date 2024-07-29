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

    // Admin credentials
    const adminUsername = 'admin';
    const adminPassword = 'garageit#'; // Change this to a secure password

    // Handle login form submission
    document.getElementById("login-form").addEventListener("submit", function(e) {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username === adminUsername && password === adminPassword) {
            document.getElementById("auth-message").style.display = "block";
            document.getElementById("new-post-section").style.display = "block";
            document.getElementById("login").style.display = "none";
        } else {
            alert('Invalid credentials. Please try again.');
        }
    });

    // Handle new post form submission
    document.getElementById("new-post-form").addEventListener("submit", function(e) {
        e.preventDefault();
        const postTitle = document.getElementById("post-title").value;
        const postContent = document.getElementById("post-content").value;

        const newPost = document.createElement("div");
        newPost.classList.add("post");
        newPost.innerHTML = `
            <h2>${postTitle}</h2>
            <p>${postContent}</p>
            <a href="#" class="cta secondary">Read More</a>
        `;
        
        document.getElementById("blog-posts").appendChild(newPost);

        // Clear the form fields
        document.getElementById("post-title").value = '';
        document.getElementById("post-content").value = '';

        alert('Post added successfully!');
    });
});
