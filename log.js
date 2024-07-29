document.addEventListener("DOMContentLoaded", function() {
    const toggleLink = document.getElementById("toggle-link");
    const authTitle = document.getElementById("auth-title");
    const authButton = document.getElementById("auth-button");
    const emailContainer = document.getElementById("email-container");
    const confirmPasswordContainer = document.getElementById("confirm-password-container");
    const authToggle = document.getElementById("auth-toggle");

    function toggleForm() {
        const isLogin = authTitle.textContent.includes("Zaloguj się");
        if (isLogin) {
            authTitle.textContent = "Załóż konto";
            authButton.textContent = "Załóż konto";
            authToggle.innerHTML = 'Masz już konto? <a href="#" id="toggle-link">Zaloguj się!</a>';
            emailContainer.style.display = "block";
            confirmPasswordContainer.style.display = "block";
        } else {
            authTitle.textContent = "Zaloguj się";
            authButton.textContent = "Zaloguj się";
            authToggle.innerHTML = 'Nie masz jeszcze konta? <a href="#" id="toggle-link">Załóż teraz!</a>';
            emailContainer.style.display = "none";
            confirmPasswordContainer.style.display = "none";
        }
        attachToggleEvent();
    }

    function attachToggleEvent() {
        document.querySelector("#auth-toggle a").addEventListener("click", function(e) {
            e.preventDefault();
            toggleForm();
        });
    }

    attachToggleEvent();

    document.getElementById("auth-form").addEventListener("submit", function(e) {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (authTitle.textContent.includes("Zaloguj się")) {
            // Authentication logic for login
            if (username === "admin" && password === "password") { // Example admin credentials
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('username', username);
                document.getElementById("auth-message").style.display = "block";
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 2000);
            } else {
                alert('Invalid credentials. Please try again.');
            }
        } else {
            // Registration logic here
            alert('Account registered successfully. Please log in.');
            toggleForm();
        }
    });

    async function onSubmit(token) {
        document.getElementById("auth-form").submit();
    }

    grecaptcha.ready(function() {
        document.getElementById('auth-button').addEventListener('click', async function(e) {
            e.preventDefault();
            const token = await grecaptcha.execute('6LfhoBoqAAAAABwtfKSkXsdfkamrwQepiuJvY80j', { action: 'submit' });
            onSubmit(token);
        });
    });
});
