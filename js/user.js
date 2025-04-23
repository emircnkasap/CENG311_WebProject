$(document).ready(function() {
    // Initialize or load LocalStorageDB
    var db = new LocalStorageDB("gameAppDB", localStorage);
    if (db.isNew()) {
        db.createTable("users", ["username", "email", "password"]);
        db.commit();
    }

    // Handle registration form submission
    $("#registerForm").on("submit", function(e) {
        e.preventDefault();

        var username = $("#username").val().trim();
        var email = $("#email").val().trim();
        var password = $("#password").val();
        var confirmPassword = $("#confirmPassword").val();

        // Basic validation
        if (!username || !email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Check for existing username
        var existingUser = db.queryAll("users", { username: username });
        if (existingUser.length > 0) {
            alert("Username is already taken.");
            return;
        }

        // Check for existing email
        var existingEmail = db.queryAll("users", { email: email });
        if (existingEmail.length > 0) {
            alert("An account with this email already exists.");
            return;
        }

        // Insert new user
        db.insert("users", {
            username: username,
            email: email,
            password: password  // Note: for production, hash your passwords!
        });
        db.commit();

        alert("Registration successful! Redirecting to login page...");
        window.location.href = "login.html";
    });
});
