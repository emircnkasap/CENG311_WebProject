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

    // Searchbar functionality
    $(document).on('click', '.search-container button', function () {
        const dropdown = $('.autocomplete-dropdown');
        if (dropdown.length) {
            const firstItem = dropdown.find('.autocomplete-item').first();
            if (firstItem.length) {
                firstItem.trigger('mousedown');
                return;
            }
        }
        const query = $(this).siblings('input').val().trim().toLowerCase();
        if (!query) return;
        if (typeof allGames !== 'undefined') {
            const found = allGames.find(g => g.title && g.title.toLowerCase() === query);
            if (found) {
                window.location.href = `gamePage.html?game=${found.id}`;
            } else {
                alert('No game found with that name.');
            }
        }
    });
    // Allow Enter key to trigger search
    $(document).on('keydown', '.search-container input', function (e) {
        if (e.key === 'Enter') {
            const dropdown = $('.autocomplete-dropdown');
            if (dropdown.length) {
                const selectedItem = dropdown.find('.selected');
                if (selectedItem.length) {
                    selectedItem.trigger('mousedown');
                } else {
                    $(this).siblings('button').click();
                }
            } else {
                $(this).siblings('button').click();
            }
        }
    });

    // Autocomplete functionality
    const createAutocomplete = () => {
        // Remove any existing dropdown
        $('.autocomplete-dropdown').remove();
        const input = $('.search-container input');
        const query = input.val().trim().toLowerCase();
        if (!query || typeof allGames === 'undefined') return;
        const matches = allGames.filter(g => g.title && g.title.toLowerCase().includes(query));
        if (matches.length === 0) return;
        const dropdown = $('<div class="autocomplete-dropdown"></div>');
        matches.slice(0, 7).forEach(game => {
            const item = $(`<div class="autocomplete-item">${game.title}</div>`);
            item.on('mousedown', function(e) {
                e.preventDefault();
                window.location.href = `gamePage.html?game=${game.id}`;
                dropdown.remove();
            });
            dropdown.append(item);
        });
        // Position dropdown
        const offset = input.offset();
        dropdown.css({
            position: 'absolute',
            top: input.outerHeight() + input.position().top + 5,
            left: input.position().left,
            width: input.outerWidth(),
            zIndex: 2000
        });
        $('.search-container').append(dropdown);
    };
    $(document).on('input', '.search-container input', function () {
        createAutocomplete();
    });
    // Hide dropdown on blur (with delay for click)
    $(document).on('blur', '.search-container input', function () {
        setTimeout(() => $('.autocomplete-dropdown').remove(), 150);
    });

    $(document).ready(function () {
        const username = localStorage.getItem("loggedInUser");
        if (username) {
            $("#welcomeMessage").text(`Hello, ${username}!`);
        }
    });
    // Keyboard navigation
    $(document).on('keydown', '.search-container input', function (e) {
        const dropdown = $('.autocomplete-dropdown');
        if (!dropdown.length) return;
        let items = dropdown.find('.autocomplete-item');
        let idx = items.index(dropdown.find('.selected'));
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (idx < items.length - 1) idx++;
            else idx = 0;
            items.removeClass('selected');
            items.eq(idx).addClass('selected');
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (idx > 0) idx--;
            else idx = items.length - 1;
            items.removeClass('selected');
            items.eq(idx).addClass('selected');
        } else if (e.key === 'Enter') {
            if (idx >= 0) {
                items.eq(idx).trigger('mousedown');
            } else {
                $('.search-container button').click();
            }
        }
    });
});
