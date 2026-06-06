/*
  Ders 47: Kızılötesi (IR) Kumanda ile Kapı Kontrolü
  Açıklama: IR Alıcı (VS1838B / KY-022) modülü kullanarak kızılötesi kumandadan gelen
            sinyalleri okur. Belirlenen buton kodlarına göre kapıyı açıp kapatır.
            - Buton 1 (KAPAT): Kırmızı LED yanar, Yeşil LED söner, Servo 20 dereceye (Kilitli) döner.
            - Buton 2 (AÇ): Yeşil LED yanar, Kırmızı LED söner, Servo 80 dereceye (Açık) döner.
  Yazar: sultanamed
*/

#include <Servo.h>
#include <IRremote.h>

// Pin Tanımlamaları
const int irAliciPin = 2; // IR Alıcı Sinyal (OUT) pini
const int kirmiziLed = 7; // Kapı Kilitli LED pini (Kırmızı)
const int yesilLed   = 8; // Kapı Açık LED pini (Yeşil)
const int servoPin   = 9; // SG90 Servo Motor Sinyal pini

Servo kapiServosu;

// KUMANDA BUTON KODLARI (HEX)
// NOT: Kendi kumandanızın buton kodlarını öğrenmek için README.md'deki "Kumanda Kodlarını Tespit Etme" sketch'ini kullanın.
// Aşağıdaki değerler yaygın kullanılan Elegoo/Car MP3 IR kumandalarının "1" ve "2" butonlarına aittir.
const unsigned long BUTON_1_HEX = 0xFFA25D; // Kapıyı Kapat (Buton 1)
const unsigned long BUTON_2_HEX = 0xFF629D; // Kapıyı Aç (Buton 2)

void setup() {
  Serial.begin(9600);
  
  // LED pinlerini çıkış olarak ayarla
  pinMode(kirmiziLed, OUTPUT);
  pinMode(yesilLed, OUTPUT);
  
  // Servo motoru ilgili pine bağla ve başlangıç pozisyonuna getir
  kapiServosu.attach(servoPin);
  
  // Başlangıçta Kapı Kapalı (Kilitli) Olsun
  kapiServosu.write(20); 
  digitalWrite(kirmiziLed, HIGH); // Kırmızı LED Açık (Kilitli)
  digitalWrite(yesilLed, LOW);    // Yeşil LED Kapalı
  
  // IR Alıcıyı Başlat (Yeni IRremote v3.x+ kütüphane standardına uygun olarak)
  IrReceiver.begin(irAliciPin, ENABLE_LED_FEEDBACK);
  Serial.println("IR Alici Baslatildi. Sinyal bekleniyor...");
}

void loop() {
  // Kızılötesi alıcıdan veri geldi mi?
  if (IrReceiver.decode()) {
    // Gelen verinin HEX değerini oku
    unsigned long okunanKod = IrReceiver.decodedIRData.decodedRawData;
    
    // Gelen sıfır dışındaki geçerli verileri seri porttan yazdır (tuş tespiti için kolaylık sağlar)
    if (okunanKod != 0) {
      Serial.print("Algilanan Buton Kodu (HEX): 0x");
      Serial.println(okunanKod, HEX);
    }
    
    // Alınan koda göre işlem yap
    if (okunanKod == BUTON_1_HEX) {
      Serial.println("Komut Alindi: KAPI KAPATILIYOR...");
      
      digitalWrite(kirmiziLed, HIGH); // Kırmızı LED yansın
      digitalWrite(yesilLed, LOW);    // Yeşil LED sönsün
      kapiServosu.write(20);          // Servo 20 dereceye dönsün (Kapı kilitli)
      delay(500);                     // Kararlılık için küçük bir gecikme
    } 
    else if (okunanKod == BUTON_2_HEX) {
      Serial.println("Komut Alindi: KAPI ACILIYOR...");
      
      digitalWrite(kirmiziLed, LOW);  // Kırmızı LED sönsün
      digitalWrite(yesilLed, HIGH);   // Yeşil LED yansın
      kapiServosu.write(80);          // Servo 80 dereceye dönsün (Kapı açık)
      delay(500);                     // Kararlılık için küçük bir gecikme
    }
    
    // Alıcının yeni veri okumaya devam etmesini sağla
    IrReceiver.resume(); 
  }
}
