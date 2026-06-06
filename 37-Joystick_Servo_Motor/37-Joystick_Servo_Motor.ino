/*
  Ders 37: Joystick ile Servo Motor Kontrolü
  Açıklama: 2 Eksenli XY Joystick modülü ile iki adet servo motoru kontrol eder.
            Joystick butonuna basıldığında motorları sıfırlar (0 derece).
  Yazar: sultanamed
*/

#include <Servo.h>

Servo servoX; // 1. Servo motor (Yatay eksen)
Servo servoY; // 2. Servo motor (Dikey eksen)

const int pinX = A1;      // Joystick X ekseni (VRx) pini
const int pinY = A0;      // Joystick Y ekseni (VRy) pini
const int pinSW = 10;     // Joystick buton (SW) pini
const int servoPinX = 9;  // 1. Servo motor pini
const int servoPinY = 11; // 2. Servo motor pini

void setup() {
  servoX.attach(servoPinX); // 1. Servo motoru bağlıyoruz
  servoY.attach(servoPinY); // 2. Servo motoru bağlıyoruz
  pinMode(pinSW, INPUT_PULLUP); // Joystick butonunu Pull-Up giriş olarak tanımlıyoruz
}

void loop() {
  int butonDurum = digitalRead(pinSW); // Buton durumunu okuyoruz (0: basılı, 1: basılı değil)
  
  if (butonDurum == LOW) {
    // Butona basıldığında her iki servo motoru da 0 dereceye getiriyoruz
    servoX.write(0);
    servoY.write(0);
  } else {
    // Butona basılmadığında servo motorlar joystick yönüne göre hareket eder
    int xDeger = analogRead(pinX); // X ekseni okuma (0-1023)
    int yDeger = analogRead(pinY); // Y ekseni okuma (0-1023)
    
    int aciX = map(xDeger, 0, 1023, 0, 180); // X eksenini 0-180 açısına map ediyoruz
    int aciY = map(yDeger, 0, 1023, 0, 180); // Y eksenini 0-180 açısına map ediyoruz
    
    servoX.write(aciX);
    servoY.write(aciY);
  }
  delay(15); // Kararlı çalışma için kısa bir gecikme
}
