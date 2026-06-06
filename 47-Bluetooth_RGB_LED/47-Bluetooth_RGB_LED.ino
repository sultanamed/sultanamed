/*
  Ders 47: Bluetooth ile RGB LED Kontrolü
  Açıklama: SoftwareSerial üzerinden HC-05 ile haberleşir. Gelen "R,G,B\n" veya "R255G128B0" formatındaki
            renk verilerini parse ederek A0, A1, A2 pinlerine bağlı ortak katot RGB LED'i kontrol eder.
  Yazar: sultanamed
*/

#include <SoftwareSerial.h>

// SoftwareSerial pin tanımlamaları: RX = Pin 6 (Bluetooth TX), TX = Pin 7 (Bluetooth RX)
SoftwareSerial bluetooth(6, 7);

// RGB LED Anot (+) pin tanımlamaları (Ortak Katot LED)
const int redPin = A0;   // Kırmızı led pini
const int greenPin = A1; // Yeşil led pini
const int bluePin = A2;  // Mavi led pini

String gelenVeri = "";

void setup() {
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);
  
  // LED'leri başlangıçta söndür
  analogWrite(redPin, 0);
  analogWrite(greenPin, 0);
  analogWrite(bluePin, 0);
  
  bluetooth.begin(9600); // Bluetooth haberleşmesini başlat
  Serial.begin(9600);    // Seri monitör takibi için
}

void loop() {
  while (bluetooth.available() > 0) {
    char karakter = bluetooth.read();
    
    // Satır sonu karakteri gelene kadar veriyi biriktir
    if (karakter == '\n' || karakter == '\r') {
      if (gelenVeri.length() > 0) {
        gelenVeri.trim();
        Serial.print("Gelen Veri: ");
        Serial.println(gelenVeri);
        
        // RGB renk verisini çözümle ve uygula
        cozumleVeUygula(gelenVeri);
        gelenVeri = ""; // Veri hafızasını sıfırla
      }
    } else {
      gelenVeri += karakter;
    }
  }
}

// Gelen metni çözümleyen fonksiyon
void cozumleVeUygula(String veri) {
  // Giri Studio veya standart renk paletlerinin gönderdiği "R,G,B" formatını çözümler
  // Örn: "255,128,0"
  int ilkVirgul = veri.indexOf(',');
  int ikinciVirgul = veri.indexOf(',', ilkVirgul + 1);
  
  if (ilkVirgul != -1 && ikinciVirgul != -1) {
    int r = veri.substring(0, ilkVirgul).toInt();
    int g = veri.substring(ilkVirgul + 1, ikinciVirgul).toInt();
    int b = veri.substring(ikinciVirgul + 1).toInt();
    
    // Değerleri sınırla (0-255)
    r = constrain(r, 0, 255);
    g = constrain(g, 0, 255);
    b = constrain(b, 0, 255);
    
    // Ortak katot RGB LED için analogWrite (0: Kapalı, 255: Tam Parlak)
    analogWrite(redPin, r);
    analogWrite(greenPin, g);
    analogWrite(bluePin, b);
  } 
  // Alternatif format: "R255G128B0" veya "r255g128b0"
  else if (veri.startsWith("R") || veri.startsWith("r")) {
    int rIndex = veri.indexOf('R') != -1 ? veri.indexOf('R') : veri.indexOf('r');
    int gIndex = veri.indexOf('G') != -1 ? veri.indexOf('G') : veri.indexOf('g');
    int bIndex = veri.indexOf('B') != -1 ? veri.indexOf('B') : veri.indexOf('b');
    
    if (rIndex != -1 && gIndex != -1 && bIndex != -1) {
      int r = veri.substring(rIndex + 1, gIndex).toInt();
      int g = veri.substring(gIndex + 1, bIndex).toInt();
      int b = veri.substring(bIndex + 1).toInt();
      
      analogWrite(redPin, r);
      analogWrite(greenPin, g);
      analogWrite(bluePin, b);
    }
  }
}
