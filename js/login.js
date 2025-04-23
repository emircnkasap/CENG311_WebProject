$(document).ready(function () {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    $("#loginForm").on("submit", function (e) {
        e.preventDefault();

        const identifier = $("#loginIdentifier").val().trim();
        const password = $("#loginPassword").val();

        if (!identifier || !password) {
            alert("Please enter both username/email and password.");
            return;
        }

        const user = users.find(user =>
            (user.username === identifier || user.email === identifier) &&
            user.password === password
        );

        if (user) {
            localStorage.setItem("loggedInUser", user.username);
            alert("Login successful! Redirecting to home page...");
            window.location.href = "index.html";
        } else {
            alert("Invalid username/email or password.");
        }
    });
});
