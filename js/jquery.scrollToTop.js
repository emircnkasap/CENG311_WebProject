(function ($) {

    // scrollToTop adında özel bir jQuery fonksiyonu tanımlanıyor
    $.fn.scrollToTop = function (options) {

        // Varsayılan ayarlar ve opsiyonel gelen ayarları birleştir
        var settings = $.extend({
            threshold: 50,         // Sayfa ne kadar aşağı kayarsa buton görünür (px)
            speed: 800,            // Sayfanın en üste çıkma hızı (ms)
            pulseScale: 0.8,       // Tıklamada ilk küçülme oranı
            expandScale: 1.3,      // Sonra genişleme oranı
            pulseTime: 100,        // Küçülmeden genişlemeye geçiş süresi (ms)
            expandTime: 150        // Genişleme süresi (ms)
        }, options);

        // Buton başlangıçta gizlenir
        var $btn = this.hide();

        // Sayfa scroll olunca buton göster/gizle kontrolü yapılır
        $(window).on('scroll', function () {
            if ($(this).scrollTop() > settings.threshold) {
                $btn.fadeIn();    // Eşik geçildiyse göster
            } else {
                $btn.fadeOut();   // Yukarıdaysa gizle
            }
        });

        // Butona tıklandığında animasyonla sayfanın en üstüne git
        $btn.on('click', function () {

            // Önce buton küçülür (pulse efekti)
            $btn.css({ transform: 'scale(' + settings.pulseScale + ')' });

            setTimeout(function () {
                // Ardından genişleme efekti uygulanır
                $btn.css({ transform: 'scale(' + settings.expandScale + ')' });

                setTimeout(function () {
                    // En sonunda normal boyuta döner ve sayfa yukarı kayar
                    $btn.css({ transform: 'scale(1)' });

                    // jQuery animate ile sayfa en üste kaydırılır
                    $('html, body').animate({ scrollTop: 0 }, settings.speed);

                }, settings.expandTime);
            }, settings.pulseTime);
        });

        // jQuery zincirleme kullanılabilsin diye this döndürülür
        return this;
    };

})(jQuery);
