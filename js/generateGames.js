document.querySelectorAll('.game-section').forEach(section => {
    const category = section.dataset.category;
    const list = section.querySelector('.game-list');
    const viewAllBtn = section.querySelector('.view-all-btn');

    const filteredGames = allGames.filter(game => game.category === category);

    // İlk 5 oyun
    const initialGames = filteredGames.slice(0, 5);

    const renderGames = (games) => {
        list.innerHTML = ''; // Temizle
        games.forEach(game => {
            const btn = document.createElement('button');
            btn.classList.add('game-btn');
            btn.dataset.game = game.id;
            btn.innerHTML = `<img src="${game.img1}" alt="${game.title}">`;
            btn.onclick = () => window.location.href = `gamePage.html?game=${game.id}`;
            list.appendChild(btn);
        });
    };

    renderGames(initialGames);

    // "View All" butonuna basılınca tüm oyunları göster
    viewAllBtn.addEventListener('click', () => {
        window.location.href = `gameList.html?category=${category}`;
    });
});