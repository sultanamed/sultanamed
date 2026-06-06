/*
  Ders 39: Röle ile Ev Elektriğinde Lamba Çalıştırma
  Açıklama: Aktif Düşük (Active Low) röle modülü ile bir lambayı 2 saniye aralıklarla yakıp söndürür.
  Yazar: sultanamed
*/

const int rolePin = 7; // Rölenin IN pininin bağlı olduğu Arduino pini

void setup() {
  pinMode(rolePin, OUTPUT); // Röle pini çıkış olarak ayarlanıyor
}

void loop() {
  // Aktif Düşük (Active Low) röle mantığı:
  
  digitalWrite(rolePin, LOW);  // Röle kontaklarını çekerek lambayı yakar
  delay(2000);                 // 2 saniye bekler
  
  digitalWrite(rolePin, HIGH); // Röle kontaklarını bırakarak lambayı söndürür
  delay(2000);                 // 2 saniye bekler
}
