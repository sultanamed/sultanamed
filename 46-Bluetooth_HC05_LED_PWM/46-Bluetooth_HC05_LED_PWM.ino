/*
  Ders 46: Bluetooth ile LED Parlaklığı Ayarlama (PWM)
  Açıklama: Donanımsal Seri Port (Pins 0 & 1) üzerinden HC-05'ten 0-255 arası parlaklık verisini okuyarak LED'e yazar.
  Yazar: sultanamed
*/

const int ledPin = 9; // PWM destekli LED pini

void setup() {
  Serial.begin(9600); // Bluetooth modülü ile haberleşmeyi başlat (Pins 0 & 1)
  pinMode(ledPin, OUTPUT);
  analogWrite(ledPin, 0); // Başlangıçta LED sönük
}

void loop() {
  if (Serial.available() > 0) {
    int parlaklik = Serial.read(); // Bluetooth uygulamasından gelen değeri oku (0-255)
    
    // Gelen değerin geçerli aralıkta olduğunu kontrol et
    if (parlaklik >= 0 && parlaklik <= 255) {
      analogWrite(ledPin, parlaklik); // LED parlaklığını ayarla
    }
  }
}
