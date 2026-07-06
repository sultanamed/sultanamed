import { PAL, STROKE, fills, type ArtProps } from '../style';

export default function ShapeSquare({ variant }: ArtProps) {
  const f = fills(variant);
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      <rect x="20" y="20" width="60" height="60" rx="8" fill={f(PAL.teal)} {...STROKE} />
    </svg>
  );
}
