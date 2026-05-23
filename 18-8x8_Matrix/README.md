# Ders 18: MAX7219 Entegresi ile 8x8 LED Matris 🤖🔆

Akan reklam tabelalarını, dijital saatleri veya eski Atari oyun ekranlarını hiç incelediniz mi? Bu ekranlar, yüzlerce LED'in bir araya gelmesiyle oluşur. Robotist’in 8x8 LED Matris uygulaması, çocukların sadece 3 kontrol pini kullanarak 64 adet LED'i bağımsız olarak nasıl kontrol edebileceklerini (multiplexing tekniğini) öğrenmelerini ve kendi dijital animasyonlarını / kayan yazı panellerini tasarlamalarını sağlar.

Bu dersle birlikte bu klasörde bulunan **ROBOTIST 8x8 LED Matris Pro Stüdyo** (`index.html`) web uygulamasını kullanarak tarayıcınız üzerinden kendi çizimlerinizi yapabilir, animasyon kareleri oluşturabilir, akan yazılar yazabilir ve kütüphanesiz Arduino kodunu tek tıkla kopyalayabilirsiniz!

<div align="center">
  <br>
  <a href="https://htmlpreview.github.io/?https://github.com/sultanamed/Arduino-mblock/blob/main/18-8x8_Matrix/index.html" target="_blank">
    <img src="https://img.shields.io/badge/🎨_ROBOTIST-Matris_Pro_Stüdyosu'nu_Aç_🚀-6c5ce7?style=for-the-badge" alt="ROBOTIST Matris Pro Stüdyosu'nu Aç" height="50">
  </a>
  <p><i>(Kendi çizimlerinizi yapıp kod üretmek için yukarıdaki butona tıklayarak tarayıcıda açabilir veya bu klasördeki <code>index.html</code> dosyasını çift tıklayarak yerel olarak çalıştırabilirsiniz!)</i></p>
  <br>
</div>

---

## 🎛️ MAX7219 Entegresi ve LED Matris Nedir?

*   **LED Matris:** 8 satır ve 8 sütundan oluşan, toplamda **64 adet LED** barındıran bir görüntüleme modülüdür. Normalde 64 LED'i tek tek kontrol etmek için 16 pin gerekirken, MAX7219 entegresi sayesinde bu sayı **3 pini** düşer.
*   **MAX7219 Sürücü:** Mikrodenetleyiciden gelen komutları alır ve LED matris üzerindeki satır/sütun tarama (multiplexing) işlemlerini çok hızlı bir şekilde kendisi halleder. Böylece Arduino'nun işlemcisini yormaz.
*   **Dizi Bağlantısı (Daisy Chain):** Birden fazla MAX7219 modülü uca eklenerek (DOUT pini sonraki modülün DIN pinine bağlanarak) daha geniş ekranlar oluşturulabilir.

### Pin Tanımları:
*   **VCC:** +5V güç girişi
*   **GND:** Toprak (Sıfır Volt) bağlantısı
*   **DIN (Data In):** Arduino'dan gelen veri hattı
*   **CS / LOAD (Chip Select):** Verinin entegreye yazılması için tetikleme hattı
*   **CLK (Clock):** Veri aktarım hızını belirleyen saat sinyali hattı

---

## ⚙️ Gerekli Elemanlar

1.  **Arduino Uno** (Zekamız)
2.  **Breadboard** (Bağlantı tahtamız)
3.  **1x MAX7219 8x8 LED Matris Modülü** (Ekranımız)
4.  **Jumper Kablolar** (Bağlantı yollarımız)

---

## 🔌 Devre Şeması

MAX7219 modülü SPI protokolüne benzer bir haberleşme kullandığından bağlantı şeması oldukça basittir:

*   **VCC** ➡️ Arduino **5V** Pini
*   **GND** ➡️ Arduino **GND** Pini
*   **DIN (Data In)** ➡️ Arduino **D12** Pini
*   **CS (Load)** ➡️ Arduino **D10** Pini
*   **CLK (Clock)** ➡️ Arduino **D11** Pini

```
        +----------------------------------------+
        |        MAX7219 8x8 LED Matris Modülü    |
        |                                        |
        |  VCC   GND   DIN    CS     CLK         |
        +---+-----+-----+-----+-----+------------+
            |     |     |     |     |
            |     |     |     |     +-------> D11 (CLK)
            |     |     |     +-------------> D10 (CS)
            |     |     +-------------------> D12 (DIN)
            +-----+-------------------------> GND
                  +-------------------------> 5V
```

---

## 💻 Arduino C/C++ Kodları (Kütüphanesiz Saf Kod)

Aşağıdaki kod, herhangi bir dış kütüphaneye (`LedControl` vb.) ihtiyaç duymadan, MAX7219'un dahili kaydedicilerine doğrudan SPI sinyali göndererek çalışır. Bu sayede çocuklar donanımın ve çiplerin arka plandaki çalışma mantığını tam olarak kavrar.

```cpp
/*
  Ders 18: MAX7219 Entegresi ile 8x8 LED Matris
  Kütüphanesiz Saf C++ Kodu (Pulsing Heart & Smile)
*/

const int DIN_PIN = 12; // Veri hattı
const int CS_PIN = 10;  // Yükleme (Latch) hattı
const int CLK_PIN = 11; // Saat hattı

// MAX7219 Dahili Kaydedici (Register) Adresleri
const byte REG_DECODEMODE  = 0x09;
const byte REG_INTENSITY   = 0x0A;
const byte REG_SCANLIMIT   = 0x0B;
const byte REG_SHUTDOWN    = 0x0C;
const byte REG_DISPLAYTEST = 0x0F;

// 1) Kalp Şablonu (1 = LED Açık, 0 = LED Kapalı)
const byte HIZ_KALP[8] = {
  0x00, // 00000000 (Boş Satır)
  0x66, // 01100110
  0xFF, // 11111111
  0xFF, // 11111111
  0xFF, // 11111111
  0x7E, // 01111110
  0x3C, // 00111100
  0x18  // 00011000
};

// 2) Gülen Yüz Şablonu
const byte GULEN_YUZ[8] = {
  0x3C, // 00111100
  0x42, // 01000010
  0x95, // 10010101 (Gözler)
  0xA1, // 10100001
  0xA1, // 10100001 (Ağız kenarları)
  0x95, // 10010101 (Ağız altı)
  0x42, // 01000010
  0x3C  // 00111100
};

// Entegreye 16-bit veri gönderen yazılımsal SPI fonksiyonu
void sendByte(byte reg, byte data) {
  digitalWrite(CS_PIN, LOW); // Veri yazımını başlat
  shiftOut(DIN_PIN, CLK_PIN, MSBFIRST, reg);  // Önce kaydedici adresini gönder
  shiftOut(DIN_PIN, CLK_PIN, MSBFIRST, data); // Sonra veriyi gönder
  digitalWrite(CS_PIN, HIGH); // CS'i yükselterek veriyi kilitle ve ekrana ver
}

void initMAX7219() {
  sendByte(REG_DECODEMODE, 0x00);  // Decode mod kapalı (Direkt matris kontrolü)
  sendByte(REG_INTENSITY, 0x03);   // Parlaklık derecesi (0-15 arası, 3 uygundur)
  sendByte(REG_SCANLIMIT, 0x07);   // Tarama limiti: 8 satırın tümü aktif
  sendByte(REG_SHUTDOWN, 0x01);    // Uyku modundan çık (Normal çalışma)
  sendByte(REG_DISPLAYTEST, 0x00); // Test modunu kapat
}

void showPattern(const byte pattern[8]) {
  for (int row = 0; row < 8; row++) {
    sendByte(row + 1, pattern[row]); // Satır adresleri 1-8 arasındadır
  }
}

void setup() {
  pinMode(DIN_PIN, OUTPUT);
  pinMode(CS_PIN, OUTPUT);
  pinMode(CLK_PIN, OUTPUT);
  
  digitalWrite(CS_PIN, HIGH);
  initMAX7219();
  
  // Ekranı temizle
  for (int r = 0; r < 8; r++) {
    sendByte(r + 1, 0x00);
  }
}

void loop() {
  // Kalbi göster ve 1 saniye bekle
  showPattern(HIZ_KALP);
  delay(1000);
  
  // Gülen yüzü göster ve 1 saniye bekle
  showPattern(GULEN_YUZ);
  delay(1000);
}
```

---

## 🧩 mBlock Blok Kodları

mBlock 5 üzerinde 8x8 LED Matris modülünü kontrol etmek için uzantılar menüsünden **MAX7219** uzantısını eklememiz gerekir.

*   **Adım 1:** "Ekle" butonuna basarak MAX7219 panel uzantısını yükleyin.
*   **Adım 2:** Pin tanımlamalarını yapın (DIN: 12, CS: 10, CLK: 11).
*   **Adım 3:** Panel üzerinde istediğiniz resmi çizip veya kayacak metni belirleyip ekrana gönderin.

*   **Blok Yapısı:**
    1. `MAX7219 LED Matrix panel başlatma` bloğunu kullanarak pinleri tanımlayın: DIN ➡️ 12, CS ➡️ 10, CLK ➡️ 11.
    2. Sürekli tekrarla döngüsü içerisine `LED Matrix panelinde resim göster` veya `yazı kaydır` bloklarını ekleyin.
    3. `robotist.fun` stüdyosundan aldığınız hex verilerini kullanarak panelde kendi özel karakterlerinizi de mBlock üzerinde gösterebilirsiniz.

---

## 🎨 ROBOTIST 8x8 LED Matris Pro Stüdyo Kullanımı

Bu dersin klasöründe bulunan `index.html` dosyası, kendi özelleştirilmiş matris projelerinizi tasarlamanız için hazırlanmış bir web arayüzüdür:

1.  **Açılış:** Tarayıcınızda (Chrome, Edge, Firefox vb.) `index.html` dosyasına çift tıklayarak uygulamayı açın.
2.  **Özellikler:**
    *   **Canlı Akan Yazı Modu:** İngilizce karakterlerle metin girin, "Akan Yazıyı Aktif Et" seçeneğini seçin. Matris simülatörü metninizi canlı olarak kaydırır ve Arduino kodunu üretir.
    *   **Çizim Modu:** 8x8 grid üzerine tıklayarak kendi deseninizi çizin. "Kare Ekle" diyerek çok kareli animasyonlar oluşturabilirsiniz. "Oynat" butonu ile animasyonu test edin.
    *   **Hazır Şablonlar:** Alt tarafta yer alan emojiler, semboller ve rakamlar gibi **50+ hazır şablonu** tek tıkla ekrana yükleyebilirsiniz.
    *   **Pin Özelleştirme:** DIN, CS ve CLK pin seçeneklerini değiştirerek devre kurulumunuza uygun kodları anında güncelleyebilirsiniz.
3.  **Kopyalama:** "Kodu Kopyala" butonuna basarak oluşturulan saf C++ kodunu kopyalayabilir ve doğrudan Arduino IDE'ye yapıştırıp yükleyebilirsiniz!

---

## 🌐 Tinkercad Simülasyonu

Projeyi bilgisayarınızda kurmadan çevrimiçi simüle etmek isterseniz:
👉 **[Tinkercad Devresini İncele](https://www.tinkercad.com/)**

---

**Hazırlayan:** [sultanamed](https://github.com/sultanamed) 💻  
www.robotist.fun  
Hayal gücünü kodla, geleceği robotla!
