/*
  Ders 38: Joystick ile Sıralı LED Yakma
  Açıklama: Joystick yönlerine göre 4 yön LED'ini yakar, butona basıldığında ise hepsini yakar.
  Yazar: sultanamed
*/

const int pinX = A1;      // Joystick X ekseni (Yatay)
const int pinY = A0;      // Joystick Y ekseni (Dikey)
const int pinSW = 3;      // Joystick buton pini (SW)

const int led1 = 4;       // Sağa yön LED'i
const int led2 = 5;       // Sola yön LED'i
const int led3 = 6;       // Yukarı yön LED'i
const int led4 = 7;       // Aşağı yön LED'i

void setup() {
  pinMode(pinSW, INPUT_PULLUP); // Joystick butonu giriş (Dahili Pull-Up)
  pinMode(led1, OUTPUT);
  pinMode(led2, OUTPUT);
  pinMode(led3, OUTPUT);
  pinMode(led4, OUTPUT);
}

void loop() {
  int butonDurum = digitalRead(pinSW); // Buton durumu (0: basılı, 1: basılı değil)
  
  if (butonDurum == LOW) {
    // Butona basıldığında tüm LED'ler yanar
    digitalWrite(led1, HIGH);
    digitalWrite(led2, HIGH);
    digitalWrite(led3, HIGH);
    digitalWrite(led4, HIGH);
  } else {
    // Buton basılı değilse joystick yönüne göre ilgili LED yanar, diğerleri söner
    int xDeger = analogRead(pinX);
    int yDeger = analogRead(pinY);
    
    // Tüm LED'leri başlangıçta söndürelim
    digitalWrite(led1, LOW);
    digitalWrite(led2, LOW);
    digitalWrite(led3, LOW);
    digitalWrite(led4, LOW);
    
    // Yön sınır kontrolleri (Eşik değeri: 800 ve 200)
    if (xDeger > 800) {
      digitalWrite(led1, HIGH); // Sağa hareket
    } else if (xDeger < 200) {
      digitalWrite(led2, HIGH); // Sola hareket
    } else if (yDeger > 800) {
      digitalWrite(led3, HIGH); // Yukarı hareket
    } else if (yDeger < 200) {
      digitalWrite(led4, HIGH); // Aşağı hareket
    }
  }
  delay(50); // Kararlı okuma için kısa bir gecikme
}
