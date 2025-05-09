$(document).ready(function () {  //AIzaSyDx4jyEwS-1jxBQ4yEl6zkcloPzaVLFJNk
    const YOUTUBE_API_KEY = 'AIzaSyDx4jyEwS-1jxBQ4yEl6zkcloPzaVLFJNk'; // Buraya kendi YouTube API anahtarını yaz
    const gameId = new URLSearchParams(window.location.search).get('game'); // URL'den game id'yi al

    if (!gameId) return; // gameId yoksa işlemi durdur

    // Game başlığını JSON dosyasından al
    function getGameTitle() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: '../json/allGames.json', // oyun verileri
                method: 'GET',
                success: function (data) {
                    const game = data.find(g => g.id === gameId);
                    if (game && game.title) {
                        resolve(game.title); // başlık bulunduysa devam et
                    } else {
                        reject('Game not found'); // oyun bulunamazsa hata ver
                    }
                },
                error: function (xhr, status, error) {
                    reject(error); // JSON çağrısı başarısızsa hata dön
                }
            });
        });
    }

    // YouTube'dan oyun trailer'ını çek
    function fetchGameVideo(gameTitle) {
        // "Loading..." mesajı göster
        $('#game-video').show().html('<div class="loading">Loading trailer...</div>');

        $.ajax({
            url: 'https://www.googleapis.com/youtube/v3/search',
            method: 'GET',
            data: {
                key: YOUTUBE_API_KEY,
                q: `${gameTitle} official trailer`, // arama sorgusu
                part: 'snippet',
                maxResults: 1,
                type: 'video',
                videoEmbeddable: true
            },
            success: function (response) {
                if (response.items && response.items.length > 0) {
                    const videoId = response.items[0].id.videoId;
                    displayVideo(videoId); // videoyu göster
                } else {
                    $('#game-video').hide(); // video bulunamazsa gizle
                }
            },
            error: function (xhr, status, error) {
                console.error('Failed to fetch video:', error);
                $('#game-video').hide(); // hata durumunda gizle
            }
        });
    }

    // YouTube embed iframe'ini DOM'a yerleştir
    function displayVideo(videoId) {
        const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`;
        $('#game-video').html(`
            <h3>Game Trailer</h3>
            <div class="video-container">
                <iframe id="game-trailer" 
                    src="${embedUrl}"
                    width="560" 
                    height="315" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>
        `);
    }

    // Süreci başlat
    getGameTitle()
        .then(gameTitle => {
            fetchGameVideo(gameTitle);
        })
        .catch(error => {
            console.error('Error:', error);
            $('#game-video').hide(); // bir hata olursa video bölümünü gizle
        });
});
