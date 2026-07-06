import { PAL, STROKE, fills, type ArtProps } from '../style';

export default function Hand({ variant }: ArtProps) {
  const f = fills(variant);
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      {/* thumb */}
      <rect
        x="20"
        y="48"
        width="22"
        height="12"
        rx="6"
        fill={f(PAL.sand)}
        {...STROKE}
        transform="rotate(-35 31 54)"
      />
      {/* four fingers */}
      <rect x="36" y="16" width="11" height="34" rx="5.5" fill={f(PAL.sand)} {...STROKE} />
      <rect x="49" y="12" width="11" height="38" rx="5.5" fill={f(PAL.sand)} {...STROKE} />
      <rect x="62" y="16" width="11" height="34" rx="5.5" fill={f(PAL.sand)} {...STROKE} />
      <rect x="74" y="24" width="10" height="28" rx="5" fill={f(PAL.sand)} {...STROKE} />
      {/* palm */}
      <path
        d="M36 44 h46 q4 0 3 6 l-3 20 q-2 14 -20 14 h-8 q-16 0 -18 -16 Z"
        fill={f(PAL.sand)}
        {...STROKE}
      />
    </svg>
  );
}
