$(function () {
    // 1) Slider (index.html’de .game-section varsa ve plugin tanımlıysa)
    if ($.fn.simpleSlider && $('.game-section').length) {
        $('.game-section').simpleSlider({ scrollStep: 200, duration: 300 });
    }

    // 2) Scroll-to-top (gameList.html’de .scroll-top-btn varsa ve plugin tanımlıysa)
    if ($.fn.scrollToTop && $('.scroll-top-btn').length) {
        $('.scroll-top-btn').scrollToTop({ threshold: 50, speed: 800 });
    }

    // 3) Preview-card (index.html’de .game-section veya gameList.html’de .game-list varsa)
    $(function () {
        $('.game-btn, .game-card').previewCard({ delay: 500 });
    });
    // 4) Auth widget (login/register sayfalarında #auth-widget varsa)
    if ($.fn.userAuth && $('#auth-widget').length) {
        $('#auth-widget').userAuth({ mode: $('#auth-widget').data('mode') });
    }
});
