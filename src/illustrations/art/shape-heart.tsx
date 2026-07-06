import { PAL, STROKE, fills, type ArtProps } from '../style';

export default function ShapeHeart({ variant }: ArtProps) {
  const f = fills(variant);
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      <path
        d="M50 80
           C38 68 20 56 20 40
           C20 28 30 22 38 24
           C44 25.5 48 30 50 34
           C52 30 56 25.5 62 24
           C70 22 80 28 80 40
           C80 56 62 68 50 80
           Z"
        fill={f(PAL.blush)}
        {...STROKE}
      />
    </svg>
  );
}
