import { PAL, STROKE, fills, type ArtProps } from '../style';

export default function Star({ variant }: ArtProps) {
  const f = fills(variant);
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      {/* rounded 5-point star */}
      <polygon
        points="50,22 58.2,40.7 78.5,42.7 63.3,56.3 67.6,76.3 50,66 32.4,76.3 36.7,56.3 21.5,42.7 41.8,40.7"
        fill={f(PAL.sun)}
        {...STROKE}
      />
      {/* dot eyes + tiny smile */}
      <circle cx="44" cy="49" r="2" fill={PAL.ink} />
      <circle cx="56" cy="49" r="2" fill={PAL.ink} />
      <path d="M45 55 q5 4 10 0" fill="none" {...STROKE} />
    </svg>
  );
}
