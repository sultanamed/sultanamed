/*
  Ders 40: Röle ve Buton ile Lamba Yakma Söndürme
  Açıklama: Butona her basıldığında aktif düşük röleyi toggle (aç/kapat) modunda kontrol eder.
  Yazar: sultanamed
*/

const int butonPin = 6; // Butonun bağlı olduğu pin (Pull-down dirençli)
const int rolePin = 7;  // Rölenin bağlı olduğu pin (Aktif Düşük)

int roleDurum = HIGH;      // Röle başlangıçta kapalı (HIGH)
int sonButonDurum = LOW;  // Butonun bir önceki durumu
unsigned long sonDebounceSure = 0;
unsigned long debounceGecikme = 50;

void setup() {
  pinMode(butonPin, INPUT);
  pinMode(rolePin, OUTPUT);
  digitalWrite(rolePin, roleDurum); // Başlangıçta lambayı söndür
}

void loop() {
  int okuma = digitalRead(butonPin);
  
  if (okuma != sonButonDurum) {
    sonDebounceSure = millis();
  }
  
  if ((millis() - sonDebounceSure) > debounceGecikme) {
    if (okuma == HIGH && sonButonDurum == LOW) {
      if (roleDurum == HIGH) {
        roleDurum = LOW; // Lambayı yak
      } else {
        roleDurum = HIGH; // Lambayı söndür
      }
      digitalWrite(rolePin, roleDurum);
      delay(200); // Gecikme
    }
  }
  
  sonButonDurum = okuma;
}
