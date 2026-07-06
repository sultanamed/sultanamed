import { PAL, STROKE, fills, type ArtProps } from '../style';

export default function Banana({ variant }: ArtProps) {
  const f = fills(variant);
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      {/* curved crescent banana */}
      <path
        d="M25 33
           q-3 27 17 39
           q20 12 39 3
           q4 -2 1 -6
           q-16 4 -32 -8
           q-16 -12 -16 -27
           q-1 -5 -9 -1
           Z"
        fill={f(PAL.sun)}
        {...STROKE}
      />
      {/* inner curve line */}
      <path d="M33 42 q4 17 21 25" fill="none" {...STROKE} />
      {/* small ink tips */}
      <circle cx="27" cy="32" r="2.5" fill={PAL.ink} {...STROKE} strokeWidth={1.5} />
      <circle cx="79" cy="72" r="2.5" fill={PAL.ink} {...STROKE} strokeWidth={1.5} />
    </svg>
  );
}
