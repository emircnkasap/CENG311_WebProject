$(document).ready(function () {
    // Load existing users or initialize empty array
    const users = JSON.parse(localStorage.getItem("users")) || [];

    $("#registerForm").on("submit", function (e) {
        e.preventDefault();

        const username = $("#username").val().trim();
        const email = $("#email").val().trim();
        const password = $("#password").val();
        const confirmPassword = $("#confirmPassword").val();

        if (!username || !email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Check for existing user
        const userExists = users.some(user => user.username === username);
        const emailExists = users.some(user => user.email === email);

        if (userExists) {
            alert("Username is already taken.");
            return;
        }

        if (emailExists) {
            alert("An account with this email already exists.");
            return;
        }

        // Save new user
        users.push({ username, email, password }); // ⚠️ Use hashing in production
        localStorage.setItem("users", JSON.stringify(users));

        alert("Registration successful! Redirecting to login page...");
        window.location.href = "login.html";
    });
});
