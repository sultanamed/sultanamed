import { PAL, STROKE, fills, type ArtProps } from '../style';

export default function Airplane({ variant }: ArtProps) {
  const f = fills(variant);
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      {/* upper wing */}
      <path d="M46 48 L30 28 Q34 26 40 30 L58 46 Z" fill={f(PAL.sea)} {...STROKE} />
      {/* tail fin */}
      <path d="M72 48 L82 32 Q86 34 84 42 L80 52 Z" fill={f(PAL.sea)} {...STROKE} />
      {/* sky-blue rounded body */}
      <ellipse cx="50" cy="55" rx="32" ry="12" fill={f(PAL.sky)} {...STROKE} />
      {/* lower wing */}
      <path d="M44 62 L32 80 Q38 82 44 76 L54 64 Z" fill={f(PAL.sea)} {...STROKE} />
      {/* round windows */}
      <circle cx="34" cy="53" r="3.5" fill={f(PAL.white)} {...STROKE} />
      <circle cx="48" cy="53" r="3.5" fill={f(PAL.white)} {...STROKE} />
      <circle cx="62" cy="53" r="3.5" fill={f(PAL.white)} {...STROKE} />
    </svg>
  );
}
