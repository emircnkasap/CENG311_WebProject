(function ($) {
    // jQuery eklentisi olarak simpleSlider fonksiyonu tanımlanıyor
    $.fn.simpleSlider = function (options) {
        var settings = $.extend({
            scrollStep: 200, // Her tıklamada kaç px kayacak
            duration: 300    // Kayma animasyonu süresi (ms)
        }, options);

        // Her seçilen eleman için çalıştır
        return this.each(function () {
            var $section = $(this); // Bu slider alanı (örnek: .game-section)
            var $slider = $section.find('.game-list'); // Kaydırılabilir liste (div)
            var $prev = $section.find('.prev-btn');    // Geri (sol) butonu
            var $next = $section.find('.next-btn');    // İleri (sağ) butonu

            // İleri butonuna tıklanırsa → sağa kaydır
            $next.on('click', function () {
                $slider.animate(
                    { scrollLeft: $slider.scrollLeft() + settings.scrollStep },
                    settings.duration
                );
            });

            // Geri butonuna tıklanırsa → sola kaydır
            $prev.on('click', function () {
                $slider.animate(
                    { scrollLeft: $slider.scrollLeft() - settings.scrollStep },
                    settings.duration
                );
            });
        });
    };

})(jQuery);
