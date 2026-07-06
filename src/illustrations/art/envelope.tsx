import { PAL, STROKE, fills, type ArtProps } from '../style';

export default function Envelope({ variant }: ArtProps) {
  const f = fills(variant);
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      {/* cream rounded envelope */}
      <rect x="16" y="28" width="68" height="46" rx="7" fill={f(PAL.cream)} {...STROKE} />
      {/* flap lines */}
      <path d="M18 32 L50 56 L82 32" fill="none" {...STROKE} />
      {/* little heart seal */}
      <path
        d="M50 66 C45 61 43 56 46.5 54 C48.5 53 50 55 50 57 C50 55 51.5 53 53.5 54 C57 56 55 61 50 66 Z"
        fill={f(PAL.coral)}
        {...STROKE}
      />
    </svg>
  );
}
