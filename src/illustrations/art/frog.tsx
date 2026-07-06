import { PAL, STROKE, fills, type ArtProps } from '../style';

export default function Frog({ variant }: ArtProps) {
  const f = fills(variant);
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      {/* bulging eyes on top */}
      <circle cx="36" cy="34" r="10" fill={f(PAL.leaf)} {...STROKE} />
      <circle cx="64" cy="34" r="10" fill={f(PAL.leaf)} {...STROKE} />
      {/* round body */}
      <ellipse cx="50" cy="60" rx="27" ry="21" fill={f(PAL.leaf)} {...STROKE} />
      {/* front feet */}
      <ellipse cx="36" cy="80" rx="8" ry="4.5" fill={f(PAL.leaf)} {...STROKE} />
      <ellipse cx="64" cy="80" rx="8" ry="4.5" fill={f(PAL.leaf)} {...STROKE} />
      {/* eye whites + ink dots */}
      <circle cx="36" cy="34" r="5.5" fill={f(PAL.white)} {...STROKE} />
      <circle cx="64" cy="34" r="5.5" fill={f(PAL.white)} {...STROKE} />
      <circle cx="36" cy="34" r="2" fill={PAL.ink} />
      <circle cx="64" cy="34" r="2" fill={PAL.ink} />
      {/* smile */}
      <path d="M40 58 q10 8 20 0" fill="none" {...STROKE} />
    </svg>
  );
}
