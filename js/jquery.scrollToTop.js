(function ($) {
    $.fn.scrollToTop = function (options) {
        var settings = $.extend({
            threshold: 50,
            speed: 800,
            pulseScale: 0.8,
            expandScale: 1.3,
            pulseTime: 100,
            expandTime: 150
        }, options);

        var $btn = this.hide();

        $(window).on('scroll', function () {
            if ($(this).scrollTop() > settings.threshold) {
                $btn.fadeIn();
            } else {
                $btn.fadeOut();
            }
        });

        $btn.on('click', function () {
            $btn.css({ transform: 'scale(' + settings.pulseScale + ')' });
            setTimeout(function () {
                $btn.css({ transform: 'scale(' + settings.expandScale + ')' });
                setTimeout(function () {
                    $btn.css({ transform: 'scale(1)' });
                    $('html, body').animate({ scrollTop: 0 }, settings.speed);
                }, settings.expandTime);
            }, settings.pulseTime);
        });

        return this;
    };
})(jQuery);

