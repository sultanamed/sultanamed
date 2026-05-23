// ROBOTIST 8x8 LED Matris Uygulaması (MAX7219 Entegresi)
// Bu kod herhangi bir kütüphane kullanmadan (kütüphanesiz) doğrudan çalışır.
// robotist.fun

// Pin Bağlantıları
const int DIN_PIN = 12; // Data Girişi
const int CS_PIN = 10;  // Load (Chip Select)
const int CLK_PIN = 11; // Clock (Saat Sinyali)

// MAX7219 Dahili Kaydedici (Register) Adresleri
const byte REG_DIGIT0      = 0x01;
const byte REG_DIGIT1      = 0x02;
const byte REG_DIGIT2      = 0x03;
const byte REG_DIGIT3      = 0x04;
const byte REG_DIGIT4      = 0x05;
const byte REG_DIGIT5      = 0x06;
const byte REG_DIGIT6      = 0x07;
const byte REG_DIGIT7      = 0x08;
const byte REG_DECODEMODE  = 0x09;
const byte REG_INTENSITY   = 0x0A;
const byte REG_SCANLIMIT   = 0x0B;
const byte REG_SHUTDOWN    = 0x0C;
const byte REG_DISPLAYTEST = 0x0F;

// Görüntülenecek Şablonlar (Ortak Katot Matris için Hex Değerleri)
// 1 = LED Açık, 0 = LED Kapalı

// Kalp Şablonu
const byte HIZ_KALP[8] = {
  0x00, // 00000000 (Boş)
  0x66, // 01100110
  0xFF, // 11111111
  0xFF, // 11111111
  0xFF, // 11111111
  0x7E, // 01111110
  0x3C, // 00111100
  0x18  // 00011000
};

// Gülen Yüz Şablonu
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

// MAX7219 entegresine 16-bitlik (8-bit Adres + 8-bit Veri) komut gönderen fonksiyon
void sendByte(byte reg, byte data) {
  digitalWrite(CS_PIN, LOW); // Veri gönderimini başlat
  shiftOut(DIN_PIN, CLK_PIN, MSBFIRST, reg);  // Adres baytını gönder
  shiftOut(DIN_PIN, CLK_PIN, MSBFIRST, data); // Veri baytını gönder
  digitalWrite(CS_PIN, HIGH); // Veriyi kilitle (latch) ve göster
}

// MAX7219 Entegresinin Başlangıç Ayarları
void initMAX7219() {
  sendByte(REG_DECODEMODE, 0x00);  // Kod çözme modunu kapat (Direct LED control)
  sendByte(REG_INTENSITY, 0x03);   // Parlaklık derecesi (0-15 arası, 3 orta seviyedir)
  sendByte(REG_SCANLIMIT, 0x07);   // Tarama limiti: 8 satırın tümünü aktif et
  sendByte(REG_SHUTDOWN, 0x01);    // Uyku modundan çık (Normal çalışma)
  sendByte(REG_DISPLAYTEST, 0x00); // Ekran test modunu kapat
}

// Bir şablonu (8 satırlık dizi) ekranda gösteren fonksiyon
void showPattern(const byte pattern[8]) {
  for (int row = 0; row < 8; row++) {
    sendByte(row + 1, pattern[row]); // Satır kayıtçıları 1'den başlar (REG_DIGIT0 = 0x01)
  }
}

void setup() {
  // Pinlerin çıkış olarak ayarlanması
  pinMode(DIN_PIN, OUTPUT);
  pinMode(CS_PIN, OUTPUT);
  pinMode(CLK_PIN, OUTPUT);
  
  // Chip Select (CS) pini başlangıçta HIGH olmalıdır
  digitalWrite(CS_PIN, HIGH);
  
  // Entegre ayarlarını başlat
  initMAX7219();
  
  // Ekranı temizle
  for (int r = 0; r < 8; r++) {
    sendByte(r + 1, 0x00);
  }
}

void loop() {
  // 1. Kalp Şablonunu göster ve 1 saniye bekle
  showPattern(HIZ_KALP);
  delay(1000);
  
  // 2. Gülen Yüz Şablonunu göster ve 1 saniye bekle
  showPattern(GULEN_YUZ);
  delay(1000);
}
