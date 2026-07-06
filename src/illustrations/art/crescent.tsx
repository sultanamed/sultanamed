import { PAL, STROKE, fills, type ArtProps } from '../style';

export default function Crescent({ variant }: ArtProps) {
  const f = fills(variant);
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      {/* crescent moon */}
      <path
        d="M64 24 A31 31 0 1 0 64 80 A42 42 0 0 1 64 24 Z"
        fill={f(PAL.sun)}
        {...STROKE}
      />
      {/* small star in the hollow */}
      <path
        d="M70 44 l2.6 5.4 l5.4 2.6 l-5.4 2.6 l-2.6 5.4 l-2.6 -5.4 l-5.4 -2.6 l5.4 -2.6 Z"
        fill={f(PAL.sun)}
        {...STROKE}
      />
    </svg>
  );
}
