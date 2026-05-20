/*
  Ders 03: Flaşör (Blink) Buzzer ve LED Uygulaması
  Açıklama: Bir LED ve bir Buzzer'ı 1 saniye aralıklarla
            aynı anda açıp kapatarak sesli ve ışıklı uyarı devresi oluşturur.
  
  Pin Tanımlamaları:
    - LED: Pin 7
    - Aktif Buzzer: Pin 8
  
  Yazar: sultanamed
*/

// Pin tanımlamaları
const int ledPin = 7;
const int buzzerPin = 8;

void setup() {
  // Pinleri çıkış (OUTPUT) olarak tanımlıyoruz
  pinMode(ledPin, OUTPUT);
  pinMode(buzzerPin, OUTPUT);
}

void loop() {
  // LED'i yak ve Buzzer'dan ses çıkar (5V ver)
  digitalWrite(ledPin, HIGH);
  digitalWrite(buzzerPin, HIGH);
  delay(1000); // 1 saniye bekle
  
  // LED'i söndür ve Buzzer'ı sustur (0V ver)
  digitalWrite(ledPin, LOW);
  digitalWrite(buzzerPin, LOW);
  delay(1000); // 1 saniye bekle
}
