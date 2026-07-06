import { PAL, STROKE, fills, type ArtProps } from '../style';

export default function Balloon({ variant }: ArtProps) {
  const f = fills(variant);
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      <ellipse cx="50" cy="36" rx="21" ry="25" fill={f(PAL.coral)} {...STROKE} />
      <ellipse cx="42" cy="27" rx="5" ry="8" fill={f(PAL.white)} {...STROKE} transform="rotate(18 42 27)" />
      <circle cx="45" cy="40" r="2.5" fill={f(PAL.white)} {...STROKE} />
      <path d="M50 61 l-5 7 h10 z" fill={f(PAL.coral)} {...STROKE} />
      <path d="M50 68 q-7 10 0 18 q6 7 -3 12" fill="none" {...STROKE} />
    </svg>
  );
}
