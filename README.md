
# 🎮 Oyun İnceleme ve Puanlama Web Uygulaması – Proje Tanıtım Metni

## 📌 Proje Adı
**GameHub: Oyun Değerlendirme ve Listeleme Platformu**

## 🎯 Amaç ve Genel Tanım
Bu proje, kullanıcıların oyunları listeleyip puanlayabildiği, geliştiricilere geri bildirim sağlayabildiği dinamik bir web platformudur. Kullanıcılar siteye kayıt olabilir, oyunlara yıldız bazlı puan verebilir ve oyunları kategori bazlı görüntüleyebilir. Ayrıca kullanıcı deneyimini artırmak için sayfa yenilenmeden veri işlemleri sağlanmıştır.

## 🌐 Sayfalar ve Fonksiyonlar

### index.html – Ana Sayfa
- Ana sayfa. En çok indirilen, öne çıkan ve yakında çıkacak oyunları kategorik şekilde slider yapısında listeler.
- Her kategori altında "View All" butonuyla detay sayfasına geçiş yapılır.
- Tüm veriler JavaScript ile yüklenir ve önizleme kartları (previewCard) ile görselleştirilir.

### login.html ve register.html – Giriş ve Kayıt Sayfaları
- Kullanıcı giriş ve kayıt işlemlerini sağlar.
- jQuery ile desteklenen özel bir auth-widget kullanılarak form yapıları tek merkezden kontrol edilir.
- auth-redirect.js ve auth-widget.js dosyalarıyla kayıt sonrası yönlendirme yapılır.

### aboutUs.html – Hakkımızda Sayfası
- Projenin geliştiricilerini tanıtan basit bir "Hakkımızda" sayfasıdır.
- Görsellerle desteklenmiş takım tanıtımı içerir.

### contact.html – İletişim Sayfası
- Kullanıcıların iletişim formu doldurarak mesaj gönderebildiği sayfadır.
- jQuery UI ile sekmeler (tabs) ve sık sorulan sorular (accordion) bileşenleri entegre edilmiştir.
- Form doğrulama için jQuery Validate eklentisi kullanılmıştır.

### gameList.html – Oyun Listesi Sayfası
- Belirli bir kategoriye ait tüm oyunların listelendiği sayfadır.
- allGames.json dosyasından veri çekilir ve filtrelenmiş şekilde DOM'a basılır.
- Kartlar tıklandığında gamePage.html sayfasına yönlendirme yapılır.

### gamePage.html – Oyun Detay Sayfası
- Seçilen oyunun detaylarının, geliştirici bilgilerinin ve kullanıcı oylamasının gösterildiği sayfadır.
- Dinamik olarak URL parametresine göre allGames.json'dan veri çekilerek doldurulur.
- Kullanıcı puanlama sistemi yıldız ikonlarıyla interaktif hale getirilmiştir.

## 🛠️ Kullanılan Teknolojiler
- HTML5 – Sayfa yapısı
- CSS3 – Tasarım ve stillendirme
- JavaScript – Dinamik içerik ve olay yönetimi
- jQuery / jQuery UI – DOM manipülasyonu ve arayüz öğeleri
- AJAX – Sayfa yenilenmeden veri alımı
- LocalStorage – Tarayıcı tarafında veri saklama
- JSON – Veri kaynağı formatı ("allGames.json")

## 🚧 Mevcut Durum ve Geliştirme Notları
- Proje hâlen geliştirilmektedir.
- Tüm veriler tarayıcıda saklanır, kullanıcı oturumları geçici ve frontend odaklıdır.
- Kullanıcı deneyimini artırmak amacıyla scroll-to-top, önizleme efektleri, responsive tasarım gibi görsel detaylara da yer verilmiştir.

---

# 🎮 Game Review and Rating Web Application – Project Overview

## 📌 Project Title
**GameHub: Game Evaluation and Listing Platform**

## 🎯 Objective and Summary
This project is a dynamic web platform where users can list and rate games while providing feedback to developers. Users can register, assign star-based ratings to games, and browse games by category. To enhance user experience, all data operations are performed without refreshing the page.

## 🌐 Pages and Features

### index.html – Home Page
- Lists the most downloaded, featured, and upcoming games in slider sections.
- Includes "View All" buttons to navigate to detailed category pages.
- All content is dynamically loaded via JavaScript and displayed using preview cards.

### login.html and register.html – Authentication Pages
- Provides login and registration functionality.
- Uses a centralized `auth-widget` component powered by jQuery.
- Redirection after successful authentication is handled via `auth-redirect.js` and `auth-widget.js`.

### aboutUs.html – About Us Page
- Introduces the development team behind the project.
- Includes visual team member profiles.

### contact.html – Contact Page
- Allows users to submit a contact form message.
- Features jQuery UI tabs and accordion for FAQs.
- Form validation is implemented with jQuery Validate plugin.

### gameList.html – Game List Page
- Displays all games under a selected category.
- Fetches data from `allGames.json` and renders filtered results.
- Clicking a card redirects to the game's detail page.

### gamePage.html – Game Detail Page
- Shows selected game’s details, developer info, and user rating section.
- Data is dynamically retrieved based on URL parameters from `allGames.json`.
- Interactive star rating system is integrated.

## 🛠️ Technologies Used
- HTML5 – Page structure
- CSS3 – Styling and layout
- JavaScript – Dynamic logic and event handling
- jQuery / jQuery UI – DOM operations and interface components
- AJAX – Seamless data exchange without page reload
- LocalStorage – Client-side data storage
- JSON – Data source format (`allGames.json`)

## 🚧 Current Status and Development Notes
- The project is under active development.
- All data is currently stored in the browser; user sessions are temporary and front-end only.
- UI improvements such as scroll-to-top, preview effects, and responsive layout have been included to enhance usability.

