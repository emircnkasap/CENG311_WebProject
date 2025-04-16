const gameData = {
    game1: {
        title: "RDR2",
        img1: "../src/emircan.png",
        img2: "../src/onur.png",
        desc: "Overrated"
    },
    game2: {
        title: "Minecraft",
        img1: "../src/emircan.png",
        img2: "../src/onur.png",
        desc: "Bağımlılık Yapar"
    },
    game3: {
        title: "GTA V",
        img1: "../src/emircan.png",
        img2: "../src/onur.png",
        desc: "GTA 6 çıkacak"
    },
    game4: {
        title: "Terraria",
        img1: "../src/emircan.png",
        img2: "../src/onur.png",
        desc: "Terraria Oynarız"
    },
    game5: {
        title: "Path of Exile",
        img1: "../src/emircan.png",
        img2: "../src/onur.png",
        desc: "Path of Exile, Emircan çok sever"
    },
};

let previewTimeout; // global timeout referansı

$('.game-btn').on('mouseenter', function () {
    const gameId = $(this).data('game');
    const data = gameData[gameId];
    if (!data) return;

    const section = $(this).closest('.game-section');

    // Her ihtimale karşı eski timeout temizlenir
    clearTimeout(previewTimeout);

    previewTimeout = setTimeout(() => {
        // Kart zaten varsa sil
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

        const card = section.find('.preview-card');
        setTimeout(() => {
            card.css({ opacity: 1, transform: "scale(1)" });
        }, 10);
    }, 500); // <<< BURASI: 2 saniye sonra çalıştır
});

// Kullanıcı butondan çıkarsa zamanlayıcı iptal
$('.game-btn').on('mouseleave', function () {
    clearTimeout(previewTimeout);
});

// Kart üzerinden çıkarsa kapat
$(document).on('mouseleave', '.preview-card', function () {
    const section = $(this).closest('.game-section');
    $(this).css({ opacity: 0, transform: "scale(0.9)" });

    setTimeout(() => {
        $(this).remove();
        section.find('.game-list, .view-all-btn').css('visibility', 'visible');
    }, 300);
});
