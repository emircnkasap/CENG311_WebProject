$(document).ready(function() {
    // Initialize or load LocalStorageDB
    var db = new LocalStorageDB("gameAppDB", localStorage);
    if (db.isNew()) {
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

        // Find a matching user (by username OR email) with the same password
        var matched = db.queryAll("users", function(row) {
            return (row.username === identifier || row.email === identifier) && row.password === password;
        });

        if (matched.length === 1) {
            // Store session info
            localStorage.setItem("loggedInUser", matched[0].username);

            alert("Login successful! Redirecting to home page...");
            window.location.href = "index.html";
        } else {
            alert("Invalid username/email or password.");
        }
    });
});
