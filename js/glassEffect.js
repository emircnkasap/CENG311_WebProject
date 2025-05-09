// Sayfada herhangi bir yere tıklandığında çalışacak olay dinleyicisi
document.addEventListener('click', function (e) {
    // Yeni bir <img> elementi oluştur (cam kırığı görseli)
    const img = document.createElement('img');

    // Görselin kaynağı (şeffaf arka planlı cam çatlağı PNG)
    img.src = '../src/glassEffect.png';

    // Görseli tam tıklanan konuma yerleştirmek için mutlak konumlandırma
    img.style.position = 'absolute';
    img.style.left = (e.pageX - 75) + 'px';  // X konumu (75px sola kaydırarak ortala)
    img.style.top = (e.pageY - 75) + 'px';   // Y konumu (75px yukarı kaydırarak ortala)
    img.style.width = '150px';              // Görselin boyutu
    img.style.pointerEvents = 'none';       // Kullanıcının görsele tıklamasını engelle
    img.style.zIndex = 9999;                // En üstte gözüksün
    img.style.opacity = 0;                  // Başlangıçta görünmez
    img.style.transition = 'opacity 0.2s ease-in'; // Geçiş efekti

    // Görseli sayfaya (body) ekle
    document.body.appendChild(img);

    // Bir sonraki animasyon karesinde opaklığı 1 yap → görünür hale getir
    requestAnimationFrame(() => {
        img.style.opacity = 1;
    });

    // 0.7 saniye sonra tekrar görünmez yap
    setTimeout(() => {
        img.style.opacity = 0;

        // 0.2 saniye sonra tamamen DOM'dan sil
        setTimeout(() => img.remove(), 200);
    }, 700);
});
