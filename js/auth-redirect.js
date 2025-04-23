$(document).ready(function () {
    const user = localStorage.getItem("loggedInUser");

    if (user) {
        // Redirect to home if already logged in
        alert(`You're already logged in as ${user}. Redirecting to homepage...`);
        window.location.href = "index.html";
    }
});
