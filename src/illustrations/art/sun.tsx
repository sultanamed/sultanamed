import { PAL, STROKE, fills, type ArtProps } from '../style';

export default function Sun({ variant }: ArtProps) {
  const f = fills(variant);
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      {/* 8 rounded rays */}
      <path d="M50 18 v-9" fill="none" {...STROKE} />
      <path d="M72.6 27.4 l6.4 -6.4" fill="none" {...STROKE} />
      <path d="M82 50 h9" fill="none" {...STROKE} />
      <path d="M72.6 72.6 l6.4 6.4" fill="none" {...STROKE} />
      <path d="M50 82 v9" fill="none" {...STROKE} />
      <path d="M27.4 72.6 l-6.4 6.4" fill="none" {...STROKE} />
      <path d="M18 50 h-9" fill="none" {...STROKE} />
      <path d="M27.4 27.4 l-6.4 -6.4" fill="none" {...STROKE} />
      {/* sunny circle */}
      <circle cx="50" cy="50" r="24" fill={f(PAL.sun)} {...STROKE} />
    </svg>
  );
}
