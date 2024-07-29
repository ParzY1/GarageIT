document.addEventListener("DOMContentLoaded", function() {
    const authTitle = document.getElementById('auth-title');
    const authButton = document.getElementById('auth-button');
    const authToggle = document.getElementById('auth-toggle');
    const emailContainer = document.getElementById('email-container');
    const confirmPasswordContainer = document.getElementById('confirm-password-container');
    const authMessage = document.getElementById('auth-message');

    let isLogin = true;

    authToggle.addEventListener('click', function(e) {
        e.preventDefault();
        isLogin = !isLogin;
        if (isLogin) {
            authTitle.textContent = 'Zaloguj się';
            authButton.textContent = 'Zaloguj się';
            authButton.setAttribute('data-action', 'login');
            authToggle.innerHTML = 'Nie masz jeszcze konta? <a href="#" id="toggle-link">Załóż teraz!</a>';
            emailContainer.style.display = 'none';
            confirmPasswordContainer.style.display = 'none';
        } else {
            authTitle.textContent = 'Zarejestruj się';
            authButton.textContent = 'Zarejestruj się';
            authButton.setAttribute('data-action', 'register');
            authToggle.innerHTML = 'Masz już konto? <a href="#" id="toggle-link">Zaloguj się!</a>';
            emailContainer.style.display = 'block';
            confirmPasswordContainer.style.display = 'block';
        }
    });

    document.getElementById('auth-form').addEventListener('submit', function(e) {
        e.preventDefault();
        grecaptcha.ready(function() {
            grecaptcha.execute('6LfhoBoqAAAAABwtfKSkXsdfkamrwQepiuJvY80j', {action: 'submit'}).then(function(token) {
                if (isLogin) {
                    // Logika logowania
                    authMessage.textContent = 'Zalogowano pomyślnie!';
                } else {
                    // Logika rejestracji
                    authMessage.textContent = 'Zarejestrowano pomyślnie!';
                }
                authMessage.style.display = 'block';
            });
        });
    });
});
