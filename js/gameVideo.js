$(document).ready(function () {
    const YOUTUBE_API_KEY = 'AIzaSyDx4jyEwS-1jxBQ4yEl6zkcloPzaVLFJNk'; // Replace with your YouTube API key
    const gameId = new URLSearchParams(window.location.search).get('game');

    if (!gameId) return;

    // First, get the game title from allGames.json
    function getGameTitle() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: '../json/allGames.json',
                method: 'GET',
                success: function (data) {
                    const game = data.find(g => g.id === gameId);
                    if (game && game.title) {
                        resolve(game.title);
                    } else {
                        reject('Game not found');
                    }
                },
                error: function (xhr, status, error) {
                    reject(error);
                }
            });
        });
    }

    function fetchGameVideo(gameTitle) {
        // Show loading state
        $('#game-video').show().html('<div class="loading">Loading trailer...</div>');

        $.ajax({
            url: 'https://www.googleapis.com/youtube/v3/search',
            method: 'GET',
            data: {
                key: YOUTUBE_API_KEY,
                q: `${gameTitle} official trailer`,
                part: 'snippet',
                maxResults: 1,
                type: 'video',
                videoEmbeddable: true
            },
            success: function (response) {
                if (response.items && response.items.length > 0) {
                    const videoId = response.items[0].id.videoId;
                    displayVideo(videoId);
                } else {
                    $('#game-video').hide();
                }
            },
            error: function (xhr, status, error) {
                console.error('Failed to fetch video:', error);
                $('#game-video').hide();
            }
        });
    }

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

    // Start the process
    getGameTitle()
        .then(gameTitle => {
            fetchGameVideo(gameTitle);
        })
        .catch(error => {
            console.error('Error:', error);
            $('#game-video').hide();
        });
}); 