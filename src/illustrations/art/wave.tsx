import { PAL, STROKE, fills, type ArtProps } from '../style';

export default function Wave({ variant }: ArtProps) {
  const f = fills(variant);
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      <path d="M0 58 q25 -16 50 0 t50 0 v42 h-100 z" fill={f(PAL.sea)} {...STROKE} />
      <path d="M0 72 q17 -13 34 0 t34 0 t34 0 v28 h-102 z" fill={f(PAL.sky)} {...STROKE} />
      <path d="M0 86 q25 -12 50 0 t50 0 v14 h-100 z" fill={f(PAL.sea)} {...STROKE} />
      <circle cx="20" cy="50" r="3" fill={f(PAL.white)} {...STROKE} />
      <circle cx="80" cy="63" r="2.5" fill={f(PAL.white)} {...STROKE} />
    </svg>
  );
}
