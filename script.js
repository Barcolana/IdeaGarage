document.addEventListener("DOMContentLoaded", () => {
    // **Gestione pulsanti di navigazione**
    const loginBtn = document.getElementById("loginBtn");
    const registerBtn = document.getElementById("registerBtn");

    if (loginBtn) {
        loginBtn.addEventListener("click", () => window.location.href = "login.html");
    }

    if (registerBtn) {
        registerBtn.addEventListener("click", () => window.location.href = "register.html");
    }

    // **Gestione registrazione**
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            if (!name || !email || !password) {
                alert("Tutti i campi sono obbligatori!");
                return;
            }

            const encryptedPassword = btoa(password);

            localStorage.setItem("userName", name);
            localStorage.setItem("userEmail", email);
            localStorage.setItem("userPassword", encryptedPassword);

            alert("Registrazione completata! Ora puoi accedere.");
            window.location.href = "login.html";
        });
    }

    // **Gestione login**
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            const storedEmail = localStorage.getItem("userEmail");
            const storedPassword = localStorage.getItem("userPassword");

            if (!storedEmail || !storedPassword) {
                alert("Nessun utente registrato con questa email. Registrati prima!");
                return;
            }

            const decryptedPassword = storedPassword ? atob(storedPassword) : "";

            if (email === storedEmail && password === decryptedPassword) {
                alert(`Accesso riuscito! Bentornato, ${localStorage.getItem("userName")}!`);
                window.location.href = "dashboard.html";
            } else {
                alert("Credenziali errate! Riprova.");
            }
        });
    }

    // **Gestione del saluto nella dashboard**
    const dashboardTitle = document.getElementById("dashboardTitle");
    const welcomeMessage = document.getElementById("welcomeMessage");

    if (dashboardTitle && welcomeMessage) {
        const userName = localStorage.getItem("userName") || "Utente";
        const hours = new Date().getHours();
        let greeting = hours < 12 ? "Buongiorno" : hours < 18 ? "Buon pomeriggio" : "Buona serata";

        dashboardTitle.textContent = `${greeting}, ${userName}!`;
        welcomeMessage.textContent = `Felice di vederti qui, ${userName}. Esplora la tua Dashboard e gestisci le tue idee al meglio!`;
    }

    // **Gestione avatar**
    const userAvatar = document.getElementById("userAvatar");
    const avatarInput = document.getElementById("avatarInput");
    const uploadAvatar = document.getElementById("uploadAvatar");

    if (userAvatar && avatarInput && uploadAvatar) {
        const savedAvatar = localStorage.getItem("userAvatar");
        userAvatar.src = savedAvatar || "default-avatar.jpg";

        uploadAvatar.addEventListener("click", () => {
            const file = avatarInput.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const newAvatar = e.target.result;
                    localStorage.setItem("userAvatar", newAvatar);
                    userAvatar.src = newAvatar;
                };
                reader.readAsDataURL(file);
            }
        });
    }
});



