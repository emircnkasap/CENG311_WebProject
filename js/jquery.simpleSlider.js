(function ($) {
    $.fn.simpleSlider = function (options) {
        var settings = $.extend({
            scrollStep: 200,
            duration: 300
        }, options);

        return this.each(function () {
            var $section = $(this);
            var $slider = $section.find('.game-list');
            var $prev = $section.find('.prev-btn');
            var $next = $section.find('.next-btn');

            $next.on('click', function () {
                $slider.animate(
                    { scrollLeft: $slider.scrollLeft() + settings.scrollStep },
                    settings.duration
                );
            });
            $prev.on('click', function () {
                $slider.animate(
                    { scrollLeft: $slider.scrollLeft() - settings.scrollStep },
                    settings.duration
                );
            });
        });
    };
})(jQuery);
