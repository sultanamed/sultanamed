/*
  Ders 01: Blink (Göz Kırpan LED)
  Açıklama: Arduino'nun üzerindeki veya harici bir LED'i 1 saniye aralıklarla yakıp söndürür.
  Yazar: sultanamed
*/

// LED'in bağlı olduğu pin numarasını tanımlıyoruz.
// Arduino üzerindeki dahili LED genellikle 13 numaralı pine bağlıdır.
const int ledPin = 13;

void setup() {
  // ledPin (13) pinini çıkış (OUTPUT) olarak ayarlıyoruz.
  // Bu sayede bu pinden elektrik akımı gönderebiliriz.
  pinMode(ledPin, OUTPUT);
}

void loop() {
  // LED'i yak (HIGH = 5V ver)
  digitalWrite(ledPin, HIGH);
  
  // 1000 milisaniye (1 saniye) bekle
  delay(1000);
  
  // LED'i söndür (LOW = 0V ver)
  digitalWrite(ledPin, LOW);
  
  // 1000 milisaniye (1 saniye) bekle
  delay(1000);
}
