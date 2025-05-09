let allGames = [];
fetch("../json/allGames.json")
  .then(res => res.json())
  .then(data => {
    allGames = data;
    (function ($) {
      $.fn.previewCard = function (options) {
        var settings = $.extend({ delay: 500 }, options);

        return this.each(function () {
          var $elem = $(this);  // .game-btn veya .game-card
          var isBtn = $elem.hasClass('game-btn');
          var $target = isBtn ? $elem.closest('.game-section') : $elem;
          var timeout, $preview;

          // preview’ı ekleyeceğimiz container’ı relative yap
          $target.css('position', 'relative');

          // gösterme fonksiyonu
          function show() {
            var data = allGames.find(g => g.id === $elem.data('game'));
            if (!data) return;

            // varsa eskisini sil
            $target.find('.preview-card').remove();

            // HTML’i oluştur
            var html;
            if (isBtn) {
              html = `
                <div class="preview-card">
                  <div class="preview-images">
                    <img src="${data.img1}" alt="${data.title}">
                    <img src="${data.img2}" alt="${data.title}">
                  </div>
                  <div class="preview-content">
                    <h3>${data.title}</h3>
                    <p>${data.desc}</p>
                  </div>
                </div>`;
            } else {
              html = `
                <div class="preview-card list-preview-card">
                  <img class="preview-img-left"  src="${data.img1}" alt="${data.title}">
                  <div class="preview-content">
                    <h3>${data.title}</h3>
                    <p>${data.desc}</p>
                  </div>
                  <img class="preview-img-right" src="${data.img2}" alt="${data.title}">
                </div>`;
            }

            // preview elementini oluştur, ekle ve animasyonu başlat
            $preview = $(html).css({
              position: 'absolute',
              top: 0, left: 0,
              width: '100%', height: '100%',
              opacity: 0,
              transform: 'scale(0.9)',
              'z-index': 999
            });
            $target.append($preview);
            setTimeout(() => {
              $preview.css({ opacity: 1, transform: 'scale(1)' });
            }, 10);
          }

          // gizleme fonksiyonu
          function hide() {
            clearTimeout(timeout);
            if (!$preview) return;
            $preview.css({ opacity: 0, transform: 'scale(0.9)' });
            setTimeout(() => {
              $preview.remove();
              $preview = null;
            }, 300);
          }

          // hover delay ile göster
          $elem.on('mouseenter', function () {
            clearTimeout(timeout);
            timeout = setTimeout(show, settings.delay);
          });

          // butondan/karttan çıkınca: e.relatedTarget kartın preview’ı mı?
          $elem.on('mouseleave', function (e) {
            if ($preview && $(e.relatedTarget).closest('.preview-card').length) return;
            hide();
          });

          // preview’ın kendisinden çıkınca mutlaka gizle
          $target.on('mouseleave', '.preview-card', hide);

          // section’dan (buton içindeki tüm alan) çıkınca gizle (sadece buton case’i için)
          if (isBtn) {
            $target.on('mouseleave', hide);
          }
        });
      };
    })(jQuery);
  });