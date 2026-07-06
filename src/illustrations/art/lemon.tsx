import { PAL, STROKE, fills, type ArtProps } from '../style';

export default function Lemon({ variant }: ArtProps) {
  const f = fills(variant);
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      {/* oval body with pointed-rounded ends */}
      <path
        d="M20 55
           q-4 -4 0 -8
           q6 -14 30 -14
           q24 0 30 14
           q4 4 0 8
           q-6 14 -30 14
           q-24 0 -30 -14
           Z"
        fill={f(PAL.sun)}
        {...STROKE}
      />
      {/* highlight */}
      <path d="M32 46 q8 -6 18 -6" fill="none" {...STROKE} />
      {/* leaf */}
      <ellipse
        cx="68"
        cy="30"
        rx="10"
        ry="5"
        fill={f(PAL.leaf)}
        {...STROKE}
        transform="rotate(-25 68 30)"
      />
    </svg>
  );
}
