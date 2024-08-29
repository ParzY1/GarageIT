document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("auth-form").addEventListener("submit", function(e) {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        // Logika rejestracji
        if (password !== confirmPassword) {
            alert('Hasła się nie zgadzają.');
        } else {
            // Dodaj logikę rejestracji, np. zapisanie użytkownika
            alert('Konto zarejestrowane pomyślnie. Możesz się teraz zalogować.');
            window.location.href = "log.html";
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
