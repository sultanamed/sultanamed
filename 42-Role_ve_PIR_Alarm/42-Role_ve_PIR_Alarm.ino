/*
  Ders 42: Röle ve PIR Sensörlü Harekete Duyarlı Lamba
  Açıklama: PIR hareket sensörü hareket algıladığında aktif düşük röle vasıtasıyla lambayı yakar.
  Yazar: sultanamed
*/

const int pirPin = 6;  // PIR Sensörünün DATA pini
const int rolePin = 7; // Rölenin IN pini (Aktif Düşük)

void setup() {
  pinMode(pirPin, INPUT);
  pinMode(rolePin, OUTPUT);
  digitalWrite(rolePin, HIGH); // Başlangıçta lambayı söndür
}

void loop() {
  int hareket = digitalRead(pirPin); // Hareketi oku (1: hareket var, 0: hareket yok)
  
  if (hareket == HIGH) {
    // Hareket algılandıysa röleyi çek ve lambayı yak (LOW)
    digitalWrite(rolePin, LOW);
  } else {
    // Hareket yoksa röleyi bırak ve lambayı söndür (HIGH)
    digitalWrite(rolePin, HIGH);
  }
  delay(100); // Küçük bir gecikme
}
