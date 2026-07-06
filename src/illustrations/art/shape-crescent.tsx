import { PAL, STROKE, fills, type ArtProps } from '../style';

export default function ShapeCrescent({ variant }: ArtProps) {
  const f = fills(variant);
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      <path
        d="M66 20 A33 33 0 1 0 66 80 A44 44 0 0 1 66 20 Z"
        fill={f(PAL.sky)}
        {...STROKE}
      />
    </svg>
  );
}
