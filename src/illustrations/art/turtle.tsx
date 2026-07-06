import { PAL, STROKE, fills, type ArtProps } from '../style';

export default function Turtle({ variant }: ArtProps) {
  const f = fills(variant);
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      <ellipse cx="30" cy="76" rx="8" ry="6" fill={f(PAL.sand)} {...STROKE} />
      <ellipse cx="58" cy="78" rx="8" ry="6" fill={f(PAL.sand)} {...STROKE} />
      <circle cx="78" cy="60" r="10" fill={f(PAL.sand)} {...STROKE} />
      <path d="M12 72 a32 30 0 0 1 64 0 z" fill={f(PAL.leaf)} {...STROKE} />
      <circle cx="30" cy="60" r="4" fill={f(PAL.sun)} {...STROKE} />
      <circle cx="44" cy="49" r="4.5" fill={f(PAL.sun)} {...STROKE} />
      <circle cx="58" cy="60" r="4" fill={f(PAL.sun)} {...STROKE} />
      <circle cx="80" cy="57" r="2" fill={PAL.ink} />
      <path d="M78 63 q3 2.5 6 0" fill="none" {...STROKE} />
    </svg>
  );
}
