import { PAL, STROKE, fills, type ArtProps } from '../style';

export default function Rose({ variant }: ArtProps) {
  const f = fills(variant);
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      {/* stem */}
      <path d="M50 52 q-2 16 0 30" fill="none" {...STROKE} />
      {/* two leaves */}
      <ellipse
        cx="39"
        cy="66"
        rx="9"
        ry="4.5"
        fill={f(PAL.leaf)}
        {...STROKE}
        transform="rotate(-30 39 66)"
      />
      <ellipse
        cx="61"
        cy="74"
        rx="9"
        ry="4.5"
        fill={f(PAL.leaf)}
        {...STROKE}
        transform="rotate(30 61 74)"
      />
      {/* petal circles, spiral-ish */}
      <circle cx="50" cy="34" r="20" fill={f(PAL.blush)} {...STROKE} />
      <circle cx="42" cy="38" r="11" fill={f(PAL.coral)} {...STROKE} />
      <circle cx="56" cy="30" r="9" fill={f(PAL.coral)} {...STROKE} />
      <circle cx="50" cy="35" r="5" fill={f(PAL.blush)} {...STROKE} />
    </svg>
  );
}
