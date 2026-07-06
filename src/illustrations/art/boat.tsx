import { PAL, STROKE, fills, type ArtProps } from '../style';

export default function Boat({ variant }: ArtProps) {
  const f = fills(variant);
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      <rect x="48" y="14" width="4" height="48" rx="2" fill={f(PAL.sand)} {...STROKE} />
      <path d="M54 18 q20 10 18 36 h-18 z" fill={f(PAL.cream)} {...STROKE} />
      <path d="M48 14 l-13 4 l13 4 z" fill={f(PAL.coral)} {...STROKE} />
      <path d="M20 62 h60 q-2 16 -16 16 h-28 q-14 0 -16 -16 z" fill={f(PAL.coral)} {...STROKE} />
      <path d="M2 80 q12 -9 24 0 t24 0 t24 0 t24 0 v14 h-96 z" fill={f(PAL.sea)} {...STROKE} />
    </svg>
  );
}
