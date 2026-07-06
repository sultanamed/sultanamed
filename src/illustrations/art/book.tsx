import { PAL, STROKE, fills, type ArtProps } from '../style';

export default function Book({ variant }: ArtProps) {
  const f = fills(variant);
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      {/* teal cover underneath */}
      <path
        d="M14 32 q36 -10 36 6 q0 -16 36 -6 v40 q-36 -10 -36 6 q0 -16 -36 -6 Z"
        fill={f(PAL.teal)}
        {...STROKE}
      />
      {/* cream pages */}
      <path d="M20 34 q30 -8 30 6 v34 q0 -12 -30 -6 Z" fill={f(PAL.cream)} {...STROKE} />
      <path d="M80 34 q-30 -8 -30 6 v34 q0 -12 30 -6 Z" fill={f(PAL.cream)} {...STROKE} />
      {/* simple line rows as text */}
      <path d="M27 42 q9 -1.5 16 0" fill="none" {...STROKE} />
      <path d="M27 50 q9 -1.5 16 0" fill="none" {...STROKE} />
      <path d="M27 58 q9 -1.5 16 0" fill="none" {...STROKE} />
      <path d="M57 42 q9 1.5 16 0" fill="none" {...STROKE} />
      <path d="M57 50 q9 1.5 16 0" fill="none" {...STROKE} />
      <path d="M57 58 q9 1.5 16 0" fill="none" {...STROKE} />
    </svg>
  );
}
