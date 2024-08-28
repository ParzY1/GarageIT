document.addEventListener("DOMContentLoaded", function() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const username = sessionStorage.getItem('username');
    const loginLink = document.getElementById('login-link');
    const userMenu = document.getElementById('user-menu');
    const userLink = document.getElementById('user-link');
    const userDropdown = document.getElementById('user-dropdown');

    // Sprawdzenie, czy użytkownik jest zalogowany
    if (isLoggedIn === 'true' && username) {
        loginLink.style.display = 'none'; // Ukryj link do logowania
        userMenu.style.display = 'block'; // Pokaż menu użytkownika
        userLink.textContent = username;  // Ustaw nazwę użytkownika
    } else {
        loginLink.style.display = 'block';
        userMenu.style.display = 'none';
    }

    // Obsługa kliknięcia na link "Profil"
    userLink.addEventListener('click', function(event) {
        event.preventDefault(); // Zapobiegaj domyślnej akcji linku
        userDropdown.classList.toggle('show'); // Przełącz widoczność dropdowna
    });

    // Obsługa wylogowania
    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(event) {
            event.preventDefault();
            sessionStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('username');
            loginLink.style.display = 'block';
            userMenu.style.display = 'none';
            window.location.href = 'log.html'; // Przekierowanie na stronę logowania
        });
    }

    // Ukrycie menu rozwijanego po kliknięciu poza nim
    document.addEventListener('click', function(event) {
        if (!userMenu.contains(event.target) && !userDropdown.contains(event.target)) {
            userDropdown.classList.remove('show');
        }
    });

    // Obsługa formularza edytowania profilu
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Zapobiegaj domyślnej akcji formularza
            
            const newUsername = document.getElementById('username').value;
            const newPassword = document.getElementById('password').value;

            // Tutaj możesz dodać kod do wysyłania danych na serwer
            console.log('Nazwa użytkownika:', newUsername);
            console.log('Hasło:', newPassword);

            // Możesz tutaj dodać kod do aktualizacji danych w sessionStorage lub lokalnym magazynie
            sessionStorage.setItem('username', newUsername);
            alert('Zmiany zostały zapisane.');

            // Opcjonalnie możesz przeładować stronę lub przekierować użytkownika
            // window.location.reload();
        });
    }
});
