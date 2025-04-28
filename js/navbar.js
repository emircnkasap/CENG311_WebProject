$(document).ready(function () {
    const username = localStorage.getItem("loggedInUser");

    if (username) {
        // Replace login/register with logout
        $(".right-section").html(`
            <a href="aboutUs.html"  class="navbarBtn">About Us</a>
            <a href="contact.html"  class="navbarBtn">Contact</a>
            <span class="welcome-msg">Hello, <strong>${username}</strong>!</span>
            <button class="navbarBtn" id="logoutBtn">Logout</button>
          `);
        $("#logoutBtn").on("click", function () {
            localStorage.removeItem("loggedInUser");
            alert("You have been logged out.");
            location.reload();
        });
    }
});
