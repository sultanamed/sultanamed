import { PAL, STROKE, fills, type ArtProps } from '../style';

export default function ShapeTriangle({ variant }: ArtProps) {
  const f = fills(variant);
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      {/* triangle with rounded corners */}
      <path
        d="M46 22
           q4 -6 8 0
           l26 46
           q3 6 -4 6
           h-52
           q-7 0 -4 -6
           Z"
        fill={f(PAL.sun)}
        {...STROKE}
      />
    </svg>
  );
}
