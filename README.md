# Arapça Adası 🏝️

4-8 yaş çocuklar için **Arapça öğrenme etkinlik uygulaması**. Çocuk, haritadaki dört
adayı keşfederek öğrenir; her durağın sonunda eğlenceli bir oyun, her ünitenin
yazdırılabilir (PDF) çalışma kağıtları vardır.

## Adalar ve Müfredat

| Ada | İçerik |
|---|---|
| **Alfabe Adası** (8 durak) | 28 harf (isim + örnek kelime + resim), harf biçimleri (başta/ortada/sonda), harekeler (üstün-esre-ötre) |
| **Şekiller Adası** (2 durak) | Daire, kare, üçgen, dikdörtgen, yıldız, hilal, kalp, oval |
| **Rakamlar Adası** (3 durak) | ١-١٠ rakamları, dokunarak sayma etkinlikleri |
| **Kalıplar Adası** (4 durak) | Selamlaşma, tanışma, nezaket sözleri, güzel sözler (bismillâh, elhamdülillâh...) + maskotlu diyaloglar |

## Özellikler

- 📱 **Tablet/telefon öncelikli** responsive tasarım, büyük dokunma hedefleri
- 🔊 Her içerik **hem Türkçe hem Arapça dinlenebilir** (cihazın seslendirmesi;
  `public/audio/` altına mp3 koyup içerikte `audioAr`/`audioTr` alanını doldurarak
  gerçek kayıtlarla değiştirilebilir)
- 🎮 **6 oyun motoru**: hafıza eşleştirme, balon patlatma, sürükle-eşleştir,
  yap-boz, labirent (harf toplama), dinle-bul
- 🖨️ **Çalışma kağıtları**: harf çizme, boyama, eşleştirme, sayma — A4, yazdır
  ya da "PDF olarak kaydet" (Ebeveyn Köşesi → Çalışma Kağıtları)
- ⭐ İlerleme ve yıldızlar cihazda saklanır; başarısızlık durumu yok, sadece teşvik
- 🎨 Emoji değil; tek paletli, sade, İslami usullere uygun **özgün SVG çizimler**
  (insan figürü yok; maskotlar: papağan Cevval & kaplumbağa Selim)
- 📴 **PWA**: çevrimdışı çalışır, tablete uygulama gibi kurulabilir

## Geliştirme

```bash
npm install
npm run dev        # geliştirme sunucusu
npm run build      # tip denetimi + üretim derlemesi (dist/)
npm run preview    # derlenmiş hâli yerelde dene
```

Statik bir sitedir; `dist/` klasörü Netlify, Vercel, GitHub Pages gibi herhangi
bir statik barındırmaya yüklenebilir (hash router sayesinde ek yapılandırma gerekmez).

## Proje Yapısı

```
src/
├─ content/        # Müfredat: tipler + ada başına veri dosyaları + registry
├─ illustrations/  # SVG çizim kütüphanesi (STYLE.md stil sözleşmesi)
├─ audio/          # TTS + ses dosyası servisi, Web Audio efektleri
├─ state/          # İlerleme (localStorage)
├─ screens/        # Harita, Ada, Ünite oynatıcı, Ebeveyn Köşesi
├─ pages/          # Ders sayfası türleri
├─ games/          # 6 oyun motoru + kazanma akışı
└─ worksheets/     # A4 çalışma kağıdı şablonları + yazdırma görünümü
```

## Yeni içerik ekleme

1. `src/content/islands/*.ts` içine öğe (`ContentItem`) ve ünite (`Unit`) ekleyin.
2. Gerekiyorsa `src/illustrations/art/` altına stil sözleşmesine uygun yeni çizim
   ekleyip `src/illustrations/index.ts` kaydına işleyin.
3. `npm run build` — registry, kırık id'leri geliştirme modunda otomatik yakalar.
