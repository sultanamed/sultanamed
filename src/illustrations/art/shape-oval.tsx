import { PAL, STROKE, fills, type ArtProps } from '../style';

export default function ShapeOval({ variant }: ArtProps) {
  const f = fills(variant);
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      <ellipse cx="50" cy="50" rx="34" ry="24" fill={f(PAL.sand)} {...STROKE} />
    </svg>
  );
}
