# PDF Oluşturucu

Fotoğraflarınızdan ve PDF dosyalarınızdan tek bir PDF oluşturan, tamamen bilgisayarınızda çalışan basit bir web uygulaması.

## Özellikler

- **Yükleme:** JPG, PNG, WEBP, GIF, BMP ve PDF dosyalarını sürükleyip bırakın veya seçin. PDF'lerin her sayfası ayrı bir sayfa olarak eklenir.
- **Sıralama:** Sayfa kartlarını sürükleyerek veya ok düğmeleriyle sıralayın.
- **Büyük ön izleme:** Seçtiğiniz sayfa, son haliyle (maskeli ve kırpılmış) büyük olarak gösterilir.
- **Maskeleme:** Gizlemek istediğiniz alanların üzerine siyah, beyaz veya gri dikdörtgen çizin. Maskeler sayfa görüntüsüne kalıcı olarak işlenir; alttaki içerik PDF'ten geri getirilemez.
- **Çerçeve:** Önemli yerlerin etrafına dikdörtgen, yuvarlak köşeli dikdörtgen veya elips çizin. Çizgi kalınlığı (ince / orta / kalın / çok kalın) ve rengi seçilebilir. `Shift` basılı tutulursa kare / daire çizilir.
- **Kırpma:** Sayfanın yalnızca istediğiniz bölümünü tutun.
- **Dosya adı:** `yüksek`, `düşük` veya kendi yazdığınız bir ad. Aynı adda dosya varsa üzerine yazmadan önce sorulur.
- **Kayıt:** Yerel sunucuyla çalışırken PDF uygulamanın klasörüne kaydedilir. GitHub Pages üzerinden kullanırken Chrome/Edge'de bir kez seçtiğiniz klasöre, diğer tarayıcılarda İndirilenler klasörüne kaydedilir.
- **Sıfırla:** İşlem bitince tek tıkla başa dönün.

Dosyalarınız hiçbir yere yüklenmez; tüm işlemler tarayıcınızda ve yerel sunucuda yapılır. Uygulama internet bağlantısı olmadan da çalışır.

## İki kullanım şekli

### 1) Doğrudan tarayıcıdan (GitHub Pages) — kurulum yok

1. GitHub'da depo sayfasında **Settings → Pages** bölümüne gidin.
2. **Source:** `Deploy from a branch`, **Branch:** `main` / `(root)` seçip kaydedin.
3. Birkaç dakika sonra uygulama `https://<kullanıcı-adı>.github.io/<depo-adı>/` adresinde açılır.

Kayıt yeri:
- **Chrome / Edge:** Alt çubuktaki **Klasör seç** ile bir klasör seçin; PDF'ler hep oraya kaydedilir. Seçim hatırlanır (tarayıcı ara sıra izin isteyebilir).
- **Firefox / Safari:** PDF, İndirilenler klasörüne iner.

> Ücretsiz GitHub hesabında Pages için deponun **herkese açık (public)** olması gerekir. Bu sadece uygulamanın kodunu herkese açar; yüklediğiniz dosyalar hiçbir zaman sunucuya gönderilmez, tamamen tarayıcınızda işlenir.

### 2) Bilgisayarda yerel sunucuyla

PDF'ler doğrudan uygulamanın klasörüne kaydedilir.

Gereken tek şey [Node.js](https://nodejs.org/) (16 veya üstü). Ek paket kurulumu gerekmez.

```bash
git clone <depo-adresi>
cd <klasör>
npm start        # veya: node sunucu.js
```

Tarayıcınızda otomatik olarak `http://127.0.0.1:8765` açılır. Durdurmak için terminalde `Ctrl+C`.

Farklı bir port için: `PORT=9000 npm start`

> `index.html` dosyasını sunucu olmadan doğrudan açarsanız PDF yine oluşturulur, ancak tarayıcının **İndirilenler** klasörüne kaydedilir.

## Kullanım

1. Dosyaları yükleyin.
2. Sayfaları sıralayın; bir sayfaya tıklayıp **Maskele**, **Çerçeve** veya **Kırp** ile düzenleyin.
3. Alt çubuktan dosya adını seçin ve **PDF Oluştur**'a basın.
4. **Yeni PDF oluştur** ile baştan başlayın.

### Düzenleyici kısayolları

| Kısayol | İşlev |
|---|---|
| Sürükle | Maske / çerçeve çiz, kırpma alanı seç |
| `Shift` + sürükle | Kare / daire |
| Sağ tık | Maskeyi veya çerçeveyi sil |
| `Ctrl+Z` | Son çizimi geri al |
| `1` / `2` / `3` | Maske / Çerçeve / Kırp aracı |
| `←` `→` | Önceki / sonraki sayfa |
| `Esc` / `Enter` | Düzenleyiciyi kapat |

## Notlar

- Çıktı PDF'teki sayfalar görüntü olarak oluşturulur (maskelerin kalıcı olması için). Bu nedenle çıktıdaki metin seçilemez veya aranamaz.
- Sunucu yalnızca `127.0.0.1` üzerinden erişilebilir ve yalnızca `.pdf` dosyalarını uygulama klasörüne yazar.

## Kullanılan kütüphaneler

`lib/` klasöründe yerel kopyaları bulunur:

- [PDF.js](https://github.com/mozilla/pdf.js) 3.11.174 — Apache-2.0
- [jsPDF](https://github.com/parallax/jsPDF) 2.5.1 — MIT
- [SortableJS](https://github.com/SortableJS/Sortable) 1.15.0 — MIT
  
