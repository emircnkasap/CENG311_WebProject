// navbar.js

// allGames verisini dataLoader.js üzerinden yükle
loadAllGames().then(() => {
    $(document).ready(function () {
        // Kullanıcı adı varsa navbar'ı güncelle
        const username = localStorage.getItem("loggedInUser");
        if (username) {
            $(".right-section").html(`
        <a href="aboutUs.html" class="navbarBtn">About Us</a>
        <a href="contact.html" class="navbarBtn">Contact</a>
        <span class="welcome-msg">Hello, <strong>${username}</strong>!</span>
        <button class="navbarBtn" id="logoutBtn">Logout</button>
      `);
            $("#welcomeMessage").text(`Hello, ${username}!`);

            $("#logoutBtn").on("click", function () {
                localStorage.removeItem("loggedInUser");
                alert("You have been logged out.");
                location.reload();
            });
        }

        // Arama butonuna tıklanınca
        $(document).on("click", ".search-container button", function () {
            const query = $(this).siblings("input").val().trim().toLowerCase();
            if (!query) return;

            const found = allGames.find(
                g => g.title && g.title.toLowerCase() === query
            );
            if (found) {
                window.location.href = `gamePage.html?game=${found.id}`;
            } else {
                alert("No game found with that name.");
            }
        });

        // Enter ile arama
        $(document).on("keydown", ".search-container input", function (e) {
            if (e.key === "Enter") {
                $(".search-container button").click();
            }
        });

        // Autocomplete kutusunu oluştur
        $(document).on("input", ".search-container input", function () {
            $(".autocomplete-dropdown").remove();
            const input = $(this);
            const query = input.val().trim().toLowerCase();
            if (!query) return;

            const matches = allGames.filter(g =>
                g.title && g.title.toLowerCase().includes(query)
            );
            if (matches.length === 0) return;

            const dropdown = $('<div class="autocomplete-dropdown"></div>');
            matches.slice(0, 7).forEach(game => {
                const item = $(`<div class="autocomplete-item">${game.title}</div>`);
                item.on("mousedown", function () {
                    window.location.href = `gamePage.html?game=${game.id}`;
                });
                dropdown.append(item);
            });

            const offset = input.offset();
            dropdown.css({
                position: "absolute",
                top: input.outerHeight() + input.position().top + 5,
                left: input.position().left,
                width: input.outerWidth(),
                zIndex: 2000
            });

            $(".search-container").append(dropdown);
        });

        // Ok tuşları ile navigasyon
        $(document).on("keydown", ".search-container input", function (e) {
            const dropdown = $(".autocomplete-dropdown");
            if (!dropdown.length) return;

            let items = dropdown.find(".autocomplete-item");
            let idx = items.index(dropdown.find(".selected"));

            if (e.key === "ArrowDown") {
                e.preventDefault();
                idx = (idx + 1) % items.length;
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                idx = (idx - 1 + items.length) % items.length;
            }

            items.removeClass("selected");
            items.eq(idx).addClass("selected");
        });

        // Odak dışı olunca autocomplete kutusunu kaldır
        $(document).on("blur", ".search-container input", function () {
            setTimeout(() => $(".autocomplete-dropdown").remove(), 150);
        });
    });
});
