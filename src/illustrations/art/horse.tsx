import { PAL, STROKE, fills, type ArtProps } from '../style';

export default function Horse({ variant }: ArtProps) {
  const f = fills(variant);
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      {/* legs */}
      <path d="M32 70 v16" fill="none" {...STROKE} />
      <path d="M44 73 v13" fill="none" {...STROKE} />
      <path d="M56 73 v13" fill="none" {...STROKE} />
      <path d="M66 70 v16" fill="none" {...STROKE} />
      {/* coral tail */}
      <path d="M26 56 q-10 4 -9 16" fill="none" {...STROKE} />
      {/* sand body */}
      <ellipse cx="48" cy="60" rx="25" ry="14" fill={f(PAL.sand)} {...STROKE} />
      {/* neck */}
      <path d="M62 58 Q66 40 72 30 L82 38 Q77 48 78 58 Z" fill={f(PAL.sand)} {...STROKE} />
      {/* head */}
      <ellipse cx="78" cy="32" rx="11" ry="8" fill={f(PAL.sand)} {...STROKE} transform="rotate(15 78 32)" />
      {/* coral mane bumps */}
      <circle cx="68" cy="26" r="4.5" fill={f(PAL.coral)} {...STROKE} />
      <circle cx="64" cy="35" r="4.5" fill={f(PAL.coral)} {...STROKE} />
      <circle cx="61" cy="44" r="4.5" fill={f(PAL.coral)} {...STROKE} />
      {/* dot eye + tiny smile */}
      <circle cx="80" cy="30" r="2" fill={PAL.ink} />
      <path d="M83 36 q3 2 6 -1" fill="none" {...STROKE} />
    </svg>
  );
}
