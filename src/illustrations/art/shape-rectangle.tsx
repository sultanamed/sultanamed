import { PAL, STROKE, fills, type ArtProps } from '../style';

export default function ShapeRectangle({ variant }: ArtProps) {
  const f = fills(variant);
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      <rect x="14" y="30" width="72" height="40" rx="8" fill={f(PAL.leaf)} {...STROKE} />
    </svg>
  );
}
