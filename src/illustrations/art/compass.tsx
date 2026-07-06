import { PAL, STROKE, fills, type ArtProps } from '../style';

export default function Compass({ variant }: ArtProps) {
  const f = fills(variant);
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      <circle cx="50" cy="50" r="31" fill={f(PAL.teal)} {...STROKE} />
      <circle cx="50" cy="50" r="23" fill={f(PAL.cream)} {...STROKE} />
      <path d="M50 29 l7 19 l-7 6 l-7 -6 z" fill={f(PAL.coral)} {...STROKE} />
      <path d="M50 71 l7 -19 l-7 -6 l-7 6 z" fill={f(PAL.ink)} {...STROKE} />
      <circle cx="50" cy="50" r="4" fill={f(PAL.sun)} {...STROKE} />
      <circle cx="32" cy="50" r="2" fill={f(PAL.teal)} {...STROKE} />
      <circle cx="68" cy="50" r="2" fill={f(PAL.teal)} {...STROKE} />
    </svg>
  );
}
