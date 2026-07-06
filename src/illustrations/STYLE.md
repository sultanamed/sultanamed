# İllüstrasyon Stil Sözleşmesi

Tüm çizimler `src/illustrations/art/*.tsx` altında, çizim başına bir dosya.

## Kurallar

1. **Bileşen imzası**: `export default function Name({ variant }: ArtProps)` —
   `ArtProps`, `PAL`, `fills`, `STROKE` her zaman `../style` modülünden alınır.
2. **SVG kökü**: `<svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">` —
   sabit width/height YOK; boyutu kullanan belirler.
3. **Dolgular**: `const f = fills(variant);` ile — her `fill={f(PAL.renk)}`.
   Böylece `variant="outline"` boyama kağıdı otomatik üretilir.
4. **Kontur**: her görünür şekil `{...STROKE}` alır (ink rengi, 3px, yuvarlak birleşim).
5. **Geometri**: yalnızca yuvarlak, dost formlar — daire, elips, yuvarlatılmış
   dikdörtgen (`rx`), yumuşak blob path'leri. Sivri/karmaşık detay yok.
6. **Yüzler**: hayvanlarda yalnızca nokta göz (`<circle r="2" fill={PAL.ink}>`)
   ve minik gülümseme (`<path d="M... q..." fill="none">`). Başka yüz detayı yok.
   İnsan figürü ÇİZİLMEZ.
7. **Palet dışı renk yok**. Ton gerekiyorsa aynı paletten ikinci renk kullan.
8. **5–14 şekil** ile yetin; sadelik esas. Çocuğun tanıması yeterli.
9. Her dosya tek default export; başka export yok.

## Örnek

```tsx
import { PAL, STROKE, fills, type ArtProps } from '../style';

export default function Apple({ variant }: ArtProps) {
  const f = fills(variant);
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      <circle cx="50" cy="58" r="30" fill={f(PAL.coral)} {...STROKE} />
      <path d="M50 30 q2 -12 12 -14" fill="none" {...STROKE} />
      <ellipse cx="64" cy="22" rx="9" ry="5" fill={f(PAL.leaf)} {...STROKE} transform="rotate(-20 64 22)" />
    </svg>
  );
}
```
