/*
  Ders 44: Ses ile Lamba Kontrolü (Röleli)
  Açıklama: Ses sensöründen gelen el çırpma sesi ile röleyi toggle (aç/kapat) modunda kontrol eder.
  Yazar: sultanamed
*/

const int sesPin = 6;  // Ses sensörü çıkış pini
const int rolePin = 7; // Röle tetikleme pini (Aktif Düşük)

int lambaAcik = false;
int sonSesDurum = LOW;

void setup() {
  pinMode(sesPin, INPUT);
  pinMode(rolePin, OUTPUT);
  digitalWrite(rolePin, HIGH); // Başlangıçta söndür (Aktif Düşük için HIGH kapalıdır)
}

void loop() {
  int okuma = digitalRead(sesPin);
  
  if (okuma == HIGH && sonSesDurum == LOW) {
    lambaAcik = !lambaAcik;
    if (lambaAcik) {
      digitalWrite(rolePin, LOW);  // Lambayı yak
    } else {
      digitalWrite(rolePin, HIGH); // Lambayı söndür
    }
    delay(300); // Kararlılık gecikmesi (ark sönümleme)
  }
  sonSesDurum = okuma;
}
