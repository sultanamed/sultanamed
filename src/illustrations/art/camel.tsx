import { PAL, STROKE, fills, type ArtProps } from '../style';

export default function Camel({ variant }: ArtProps) {
  const f = fills(variant);
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      {/* legs */}
      <path d="M36 72 v14" fill="none" {...STROKE} />
      <path d="M48 74 v12" fill="none" {...STROKE} />
      <path d="M60 74 v12" fill="none" {...STROKE} />
      {/* tiny tail */}
      <path d="M26 58 q-8 4 -7 12" fill="none" {...STROKE} />
      {/* one hump */}
      <path d="M36 52 Q50 30 64 52 Z" fill={f(PAL.sand)} {...STROKE} />
      {/* sand body */}
      <ellipse cx="50" cy="62" rx="25" ry="14" fill={f(PAL.sand)} {...STROKE} />
      {/* neck */}
      <rect x="70" y="34" width="10" height="30" rx="5" fill={f(PAL.sand)} {...STROKE} />
      {/* head */}
      <ellipse cx="78" cy="30" rx="10" ry="7" fill={f(PAL.sand)} {...STROKE} />
      {/* dot eye + tiny smile */}
      <circle cx="79" cy="28" r="2" fill={PAL.ink} />
      <path d="M82 33 q3 2 6 0" fill="none" {...STROKE} />
    </svg>
  );
}
