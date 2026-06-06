/*
  Ders 41: Röle ve LDR ile Akşam Yanan Sokak Lambası
  Açıklama: LDR sensöründen okunan ışık şiddeti 600'ün altına düştüğünde lambayı açar.
  Yazar: sultanamed
*/

const int ldrPin = A0;   // LDR'nin bağlı olduğu analog pin
const int rolePin = 7;   // Rölenin bağlı olduğu dijital pin (Aktif Düşük)
const int esikDegeri = 600; // Işık eşik değeri (Ortama göre ayarlanabilir)

void setup() {
  pinMode(rolePin, OUTPUT);
  digitalWrite(rolePin, HIGH); // Başlangıçta lambayı söndür
}

void loop() {
  int isikSeviyesi = analogRead(ldrPin); // LDR analog değerini oku (0-1023)
  
  if (isikSeviyesi < esikDegeri) {
    // Hava karardıysa röle kontaklarını çek ve lambayı yak (LOW)
    digitalWrite(rolePin, LOW);
  } else {
    // Hava aydınlıksa röle kontaklarını bırak ve lambayı söndür (HIGH)
    digitalWrite(rolePin, HIGH);
  }
  delay(500); // Yarım saniye bekleyip tekrar kontrol et
}
