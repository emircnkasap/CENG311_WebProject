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

// User ratings storage and management
const userRatings = {
    // Get all ratings for a specific game
    getGameRatings: function(gameId) {
        const ratings = JSON.parse(localStorage.getItem('userRatings') || '{}');
        return ratings[gameId] || null;
    },

    // Save a user's rating for a game
    saveRating: function(gameId, rating) {
        // Validate rating
        if (!this.validateRating(rating)) {
            return false;
        }

        const ratings = JSON.parse(localStorage.getItem('userRatings') || '{}');
        ratings[gameId] = rating;
        localStorage.setItem('userRatings', JSON.stringify(ratings));
        return true;
    },

    // Validate rating
    validateRating: function(rating) {
        // Check if rating is a number
        if (typeof rating !== 'number') {
            alert('Invalid rating value');
            return false;
        }

        // Check if rating is between 1 and 5
        if (rating < 1 || rating > 5) {
            alert('Rating must be between 1 and 5');
            return false;
        }

        return true;
    },

    // Remove a rating
    removeRating: function(gameId) {
        const ratings = JSON.parse(localStorage.getItem('userRatings') || '{}');
        if (ratings[gameId]) {
            delete ratings[gameId];
            localStorage.setItem('userRatings', JSON.stringify(ratings));
            return true;
        }
        return false;
    },

    // Calculate average rating for a game
    calculateAverageRating: function(gameId) {
        const ratings = JSON.parse(localStorage.getItem('userRatings') || '{}');
        const gameRatings = Object.entries(ratings)
            .filter(([id, rating]) => id === gameId && rating !== null)
            .map(([_, rating]) => rating);
        
        if (gameRatings.length === 0) {
            return {
                average: 0,
                count: 0
            };
        }

        const sum = gameRatings.reduce((a, b) => a + b, 0);
        return {
            average: (sum / gameRatings.length).toFixed(1),
            count: gameRatings.length
        };
    }
};
