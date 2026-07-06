import { PAL, STROKE, fills, type ArtProps } from '../style';

export default function Apple({ variant }: ArtProps) {
  const f = fills(variant);
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      {/* coral apple */}
      <circle cx="50" cy="58" r="28" fill={f(PAL.coral)} {...STROKE} />
      {/* stem */}
      <path d="M50 30 q2 -12 12 -14" fill="none" {...STROKE} />
      {/* leaf */}
      <ellipse cx="64" cy="21" rx="9" ry="5" fill={f(PAL.leaf)} {...STROKE} transform="rotate(-20 64 21)" />
    </svg>
  );
}
