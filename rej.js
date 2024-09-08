document.addEventListener("DOMContentLoaded", function() {
    const authForm = document.getElementById("auth-form");
    const authMessage = document.getElementById("auth-message");
    const resendVerification = document.getElementById("resend-verification");
    const resendButton = document.getElementById("resend-button");

    if (authForm) {
        authForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirm-password").value;

            // Sprawdzenie hasła
            if (password !== confirmPassword) {
                alert('Hasła się nie zgadzają.');
            } else {
                // Symulacja udanej rejestracji
                authForm.style.display = 'none';
                authMessage.style.display = 'block';
                resendVerification.style.display = 'block';
            }
        });
    }

    if (resendButton) {
        resendButton.addEventListener("click", function() {
            alert('Link weryfikacyjny został wysłany ponownie.');
        });
    }
});
