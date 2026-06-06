/*
  Ders 43: LCD Ekranlı ve Toprak Nem Sensörlü Akıllı Sulama
  Açıklama: Toprak nem sensöründen gelen değere göre I2C LCD ekrana durum yazar ve 5V su motorunu sürer.
  Yazar: sultanamed
*/

#include <Wire.h>
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27, 16, 2); // 16x2 LCD Ekran nesnesi (I2C adresi 0x27)

const int nemPin = A0;   // Toprak nem sensörü analog pini
const int rolePin = 7;   // Su pompası rölesi (Aktif Düşük)
const int esikDegeri = 600; // Toprak kuruluğu eşik değeri (500-700 arası ayarlanabilir)

void setup() {
  pinMode(rolePin, OUTPUT);
  digitalWrite(rolePin, HIGH); // Başlangıçta pompayı kapat
  
  lcd.init();
  lcd.backlight();
  
  lcd.setCursor(0, 0);
  lcd.print("Robotist Akilli");
  lcd.setCursor(0, 1);
  lcd.print("Sulama Sistemi");
  delay(2000);
  lcd.clear();
}

void loop() {
  int nemDegeri = analogRead(nemPin); // Sensör değerini oku (0-1023)
  
  lcd.clear();
  if (nemDegeri > esikDegeri) {
    // Toprak kuru (Değer yüksekse nem azdır)
    digitalWrite(rolePin, LOW); // Pompayı çalıştır (Röleyi tetikle)
    
    lcd.setCursor(0, 0);
    lcd.print("Toprak Kuru");
    lcd.setCursor(0, 1);
    lcd.print("Lutfen Sulayiniz");
  } else {
    // Toprak nemli
    digitalWrite(rolePin, HIGH); // Pompayı durdur
    
    lcd.setCursor(0, 0);
    lcd.print("Toprak Nemi:");
    lcd.print(1023 - nemDegeri); // Nemi anlaşılır bir ölçekte yazdır
    lcd.setCursor(0, 1);
    lcd.print("Durum: Normal");
  }
  delay(1000); // 1 saniye bekleyip tekrar ölç
}
