let previewTimeout;

// ----------------- game-btn için -----------------
$(document).on('mouseenter', '.game-btn', function () {
    const gameId = $(this).data('game');
    const data = allGames.find(g => g.id === gameId);
    if (!data) return;

    const section = $(this).closest('.game-section');
    clearTimeout(previewTimeout);

    previewTimeout = setTimeout(() => {
        section.find('.preview-card').remove();
        section.find('.game-list, .view-all-btn').css('visibility', 'hidden');

        const previewHTML = `
            <div class="preview-card">
                <div class="preview-images">
                    <img src="${data.img1}" alt="img1">
                    <img src="${data.img2}" alt="img2">
                </div>
                <div class="preview-content">
                    <h3>${data.title}</h3>
                    <p>${data.desc}</p>
                </div>
            </div>
        `;

        section.css('position', 'relative');
        section.append(previewHTML);

        setTimeout(() => {
            section.find('.preview-card').css({ opacity: 1, transform: "scale(1)" });
        }, 10);
    }, 500);
});

$(document).on('mouseleave', '.game-btn', function () {
    clearTimeout(previewTimeout);
});

$(document).on('mouseleave', '.preview-card', function () {
    const section = $(this).closest('.game-section');
    $(this).css({ opacity: 0, transform: "scale(0.9)" });

    setTimeout(() => {
        $(this).remove();
        section.find('.game-list, .view-all-btn').css('visibility', 'visible');
    }, 300);
});


// ----------------- .game-card için (gameList.html) -----------------
$(document).on('mouseenter', '.game-card', function () {
    const gameId = $(this).data('game');
    const data = allGames.find(g => g.id === gameId);
    if (!data) return;

    const card = $(this);
    clearTimeout(previewTimeout);

    previewTimeout = setTimeout(() => {
        // Eski önizlemeyi kaldır ve içeriği gizle
        card.find('.preview-card').remove();
        card.children().css('visibility', 'hidden');

        // Yeni: list-preview-card modifier sınıfıyla sol–orta–sağ düzeni
        const previewHTML = `
           <div class="preview-card list-preview-card">
               <img class="preview-img-left"  src="${data.img1}" alt="${data.title} image 1">
               <div class="preview-content">
                   <h3>${data.title}</h3>
                   <p>${data.desc}</p>
               </div>
               <img class="preview-img-right" src="${data.img2}" alt="${data.title} image 2">
           </div>
       `;

        // Önizleme kartını ekle
        card.append(previewHTML);
        setTimeout(() => {
            card.find('.preview-card').css({ opacity: 1, transform: "scale(1)" });
        }, 10);
    }, 500);
});

$(document).on('mouseleave', '.game-card', function () {
    clearTimeout(previewTimeout);
    const card = $(this);
    // Önizlemeyi anında kaldır
    card.find('.preview-card').remove();
    // Orijinal içeriği hemen görünür yap
    card.children().css('visibility', 'visible');
});