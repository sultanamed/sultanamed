import { PAL, STROKE, fills, type ArtProps } from '../style';

export default function Seashell({ variant }: ArtProps) {
  const f = fills(variant);
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      {/* blush fan shell */}
      <path d="M50 80 L28 42 Q50 18 72 42 Z" fill={f(PAL.blush)} {...STROKE} />
      {/* ridge lines */}
      <path d="M50 78 L38 38" fill="none" {...STROKE} />
      <path d="M50 78 L50 30" fill="none" {...STROKE} />
      <path d="M50 78 L62 38" fill="none" {...STROKE} />
      {/* little base */}
      <ellipse cx="50" cy="83" rx="7" ry="4" fill={f(PAL.blush)} {...STROKE} />
    </svg>
  );
}
