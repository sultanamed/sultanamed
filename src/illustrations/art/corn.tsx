import { PAL, STROKE, fills, type ArtProps } from '../style';

export default function Corn({ variant }: ArtProps) {
  const f = fills(variant);
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      {/* sunny cob */}
      <ellipse cx="50" cy="42" rx="14" ry="28" fill={f(PAL.sun)} {...STROKE} />
      {/* kernel dots */}
      <circle cx="44" cy="26" r="1.6" fill={PAL.ink} />
      <circle cx="56" cy="26" r="1.6" fill={PAL.ink} />
      <circle cx="42" cy="38" r="1.6" fill={PAL.ink} />
      <circle cx="50" cy="38" r="1.6" fill={PAL.ink} />
      <circle cx="58" cy="38" r="1.6" fill={PAL.ink} />
      <circle cx="44" cy="50" r="1.6" fill={PAL.ink} />
      <circle cx="56" cy="50" r="1.6" fill={PAL.ink} />
      <circle cx="50" cy="60" r="1.6" fill={PAL.ink} />
      {/* husk leaves */}
      <path d="M40 84 Q26 78 30 56 Q42 62 46 74 Z" fill={f(PAL.leaf)} {...STROKE} />
      <path d="M60 84 Q74 78 70 56 Q58 62 54 74 Z" fill={f(PAL.leaf)} {...STROKE} />
    </svg>
  );
}
