import { PAL, STROKE, fills, type ArtProps } from '../style';

export default function Grapes({ variant }: ArtProps) {
  const f = fills(variant);
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      {/* stem */}
      <path d="M50 36 q2 -12 10 -14" fill="none" {...STROKE} />
      {/* leaf */}
      <ellipse cx="64" cy="20" rx="9" ry="5" fill={f(PAL.leaf)} {...STROKE} transform="rotate(-20 64 20)" />
      {/* grape cluster */}
      <circle cx="50" cy="42" r="8" fill={f(PAL.grape)} {...STROKE} />
      <circle cx="38" cy="52" r="8" fill={f(PAL.grape)} {...STROKE} />
      <circle cx="62" cy="52" r="8" fill={f(PAL.grape)} {...STROKE} />
      <circle cx="50" cy="56" r="8" fill={f(PAL.grape)} {...STROKE} />
      <circle cx="42" cy="66" r="8" fill={f(PAL.grape)} {...STROKE} />
      <circle cx="58" cy="66" r="8" fill={f(PAL.grape)} {...STROKE} />
      <circle cx="50" cy="76" r="8" fill={f(PAL.grape)} {...STROKE} />
    </svg>
  );
}
