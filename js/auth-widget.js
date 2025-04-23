(function ($) {
  $.widget("custom.userAuth", {
    options: {
      mode: "login", // or "register"
    },

    _create: function () {
      const isRegister = this.options.mode === "register";

      const html = `
        <div class="form-container">
          <h2>${isRegister ? "Register" : "Login"}</h2>
          <form id="authForm">
            ${isRegister ? '<input type="text" id="username" placeholder="Username" required>' : ""}
            <input type="text" id="identifier" placeholder="${isRegister ? "Email" : "Username or Email"}" required>
            <input type="password" id="password" placeholder="Password" required>
            ${isRegister ? '<input type="password" id="confirmPassword" placeholder="Confirm Password" required>' : ""}
            <button type="submit" class="submit-btn">${isRegister ? "Register" : "Login"}</button>
          </form>
        </div>
      `;

      this.element.html(html);
      this._bindFormEvents(isRegister);
    },

    _bindFormEvents: function (isRegister) {
      $("#authForm").on("submit", function (e) {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem("users")) || [];

        if (isRegister) {
          const username = $("#username").val().trim();
          const email = $("#identifier").val().trim();
          const password = $("#password").val();
          const confirmPassword = $("#confirmPassword").val();

          if (!username || !email || !password || !confirmPassword) return alert("Fill all fields.");
          if (password !== confirmPassword) return alert("Passwords do not match!");
          if (users.some(u => u.username === username)) return alert("Username already exists.");
          if (users.some(u => u.email === email)) return alert("Email already exists.");

          users.push({ username, email, password });
          localStorage.setItem("users", JSON.stringify(users));
          alert("Registration successful!");
          location.href = "login.html";
        } else {
          const identifier = $("#identifier").val().trim();
          const password = $("#password").val();
          const user = users.find(u => (u.username === identifier || u.email === identifier) && u.password === password);
          if (user) {
            localStorage.setItem("loggedInUser", user.username);
            alert("Login successful!");
            location.href = "index.html";
          } else {
            alert("Invalid login.");
          }
        }
      });
    }
  });
})(jQuery);
