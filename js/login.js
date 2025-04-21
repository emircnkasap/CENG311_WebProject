$(document).ready(function() {
    // Initialize or load localStorageDB
    var db = new localStorageDB("gameAppDB", localStorage);
    if (db.isNew()) {
        // If DB is brand new, ensure users table exists
        db.createTable("users", ["username", "email", "password"]);
        db.commit();
    }

    // Handle login form submission
    $("#loginForm").on("submit", function(e) {
        e.preventDefault();

        var identifier = $("#loginIdentifier").val().trim();
        var password = $("#loginPassword").val();

        if (!identifier || !password) {
            alert("Please enter both username/email and password.");
            return;
        }

        // Query for matching user by username or email and password
        var matched = db.queryAll("users", function(row) {
            return (row.username === identifier || row.email === identifier) && row.password === password;
        });

        if (matched.length === 1) {
            // Optionally store session info
            localStorage.setItem("loggedInUser", matched[0].username);

            alert("Login successful! Redirecting to home page...");
            window.location.href = "index.html";
        } else {
            alert("Invalid username/email or password.");
        }
    });
});
