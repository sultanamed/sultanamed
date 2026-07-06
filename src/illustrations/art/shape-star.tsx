import { PAL, STROKE, fills, type ArtProps } from '../style';

export default function ShapeStar({ variant }: ArtProps) {
  const f = fills(variant);
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      <polygon
        points="50,20 58.2,40.7 80.4,42.1 63.3,56.3 68.8,77.9 50,66 31.2,77.9 36.7,56.3 19.6,42.1 41.8,40.7"
        fill={f(PAL.grape)}
        {...STROKE}
      />
    </svg>
  );
}
