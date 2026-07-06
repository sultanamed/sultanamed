import { PAL, STROKE, fills, type ArtProps } from '../style';

export default function ShapeCircle({ variant }: ArtProps) {
  const f = fills(variant);
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      <circle cx="50" cy="50" r="32" fill={f(PAL.coral)} {...STROKE} />
    </svg>
  );
}
