// generateGames.js

// Tüm oyunları yükle, ardından slider'lara oyunları yerleştir
loadAllGames().then(() => {
    // Sayfadaki her .game-section için işlem yap
    document.querySelectorAll('.game-section').forEach(section => {
        const category = section.dataset.category;
        const list = section.querySelector('.game-list');
        const viewAllBtn = section.querySelector('.view-all-btn');

        // Kategoriye uygun oyunları filtrele
        const filteredGames = window.allGames.filter(game => game.category === category);

        // Oyunları DOM’a bas
        const renderGames = (games) => {
            list.innerHTML = ''; // Önce temizle
            games.forEach(game => {
                const btn = document.createElement('button');
                btn.classList.add('game-btn');
                btn.dataset.game = game.id;
                btn.innerHTML = `<img src="${game.img1}" alt="${game.title}">`;
                btn.onclick = () => window.location.href = `gamePage.html?game=${game.id}`;
                list.appendChild(btn);
            });
        };

        renderGames(filteredGames);

        // View All butonu yönlendirme
        viewAllBtn.addEventListener('click', () => {
            window.location.href = `gameList.html?category=${category}`;
        });
    });
});
