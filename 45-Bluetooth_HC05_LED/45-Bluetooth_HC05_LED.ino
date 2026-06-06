/*
  Ders 45: Bluetooth Modülü (HC-05) ile LED Yakma
  Açıklama: SoftwareSerial üzerinden HC-05 ile haberleşir. Gelen 'a'/'1' verisiyle LED'i yakar, 'b'/'0' ile söndürür.
  Yazar: sultanamed
*/

#include <SoftwareSerial.h>

// RX = Pin 10 (Bluetooth TX), TX = Pin 11 (Bluetooth RX)
SoftwareSerial bluetooth(10, 11);

const int ledPin = 13; // Kontrol edilecek LED pini

void setup() {
  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, LOW); // LED başlangıçta kapalı
  
  bluetooth.begin(9600); // HC-05 varsayılan haberleşme hızı
}

void loop() {
  if (bluetooth.available()) {
    char veri = bluetooth.read(); // Bluetooth'tan gelen karakteri oku
    
    if (veri == 'a' || veri == '1') {
      digitalWrite(ledPin, HIGH); // LED'i yak
    } 
    else if (veri == 'b' || veri == '0') {
      digitalWrite(ledPin, LOW); // LED'i söndür
    }
  }
}
