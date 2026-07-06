import { PAL, STROKE, fills, type ArtProps } from '../style';

export default function Fox({ variant }: ArtProps) {
  const f = fills(variant);
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      {/* pointed-but-rounded ears */}
      <path d="M28 40 Q22 20 28 14 Q38 18 42 30 Z" fill={f(PAL.coral)} {...STROKE} />
      <path d="M72 40 Q78 20 72 14 Q62 18 58 30 Z" fill={f(PAL.coral)} {...STROKE} />
      {/* coral head */}
      <path
        d="M50 26 Q72 28 78 46 Q76 64 50 74 Q24 64 22 46 Q28 28 50 26 Z"
        fill={f(PAL.coral)}
        {...STROKE}
      />
      {/* white cheeks */}
      <ellipse cx="37" cy="58" rx="10" ry="9" fill={f(PAL.white)} {...STROKE} />
      <ellipse cx="63" cy="58" rx="10" ry="9" fill={f(PAL.white)} {...STROKE} />
      {/* dot eyes + tiny smile */}
      <circle cx="40" cy="46" r="2" fill={PAL.ink} />
      <circle cx="60" cy="46" r="2" fill={PAL.ink} />
      <path d="M46 62 q4 3 8 0" fill="none" {...STROKE} />
    </svg>
  );
}
