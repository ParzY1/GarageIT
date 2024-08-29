document.addEventListener("DOMContentLoaded", function() {
    const authForm = document.getElementById("auth-form");

    if (authForm) {
        authForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirm-password").value;

            // Logika rejestracji
            if (password !== confirmPassword) {
                alert('Hasła się nie zgadzają.');
            } else {
                // Symulacja udanej rejestracji
                alert('Konto zarejestrowane pomyślnie. Możesz się teraz zalogować.');
                window.location.href = "log.html";
            }
        });
    } else {
        console.error("Formularz rejestracji nie został znaleziony.");
    }
});
