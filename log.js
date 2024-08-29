document.addEventListener("DOMContentLoaded", function() {
    const authForm = document.getElementById("auth-form");

    if (authForm) {
        authForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            // Logika logowania
            if (username === "admin" && password === "password") { // Przykładowe dane logowania
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('username', username);
                document.getElementById("auth-message").style.display = "block";
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 2000);
            } else {
                alert('Nieprawidłowe dane. Spróbuj ponownie.');
            }
        });
    } else {
        console.error("Formularz logowania nie został znaleziony.");
    }
});
