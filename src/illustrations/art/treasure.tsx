import { PAL, STROKE, fills, type ArtProps } from '../style';

export default function Treasure({ variant }: ArtProps) {
  const f = fills(variant);
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      <circle cx="38" cy="48" r="4.5" fill={f(PAL.sun)} {...STROKE} />
      <circle cx="50" cy="46" r="4.5" fill={f(PAL.sun)} {...STROKE} />
      <circle cx="62" cy="48" r="4.5" fill={f(PAL.sun)} {...STROKE} />
      <rect x="26" y="50" width="48" height="32" rx="7" fill={f(PAL.sand)} {...STROKE} />
      <rect x="45" y="50" width="10" height="32" rx="4" fill={f(PAL.coral)} {...STROKE} />
      <rect x="24" y="34" width="52" height="16" rx="8" fill={f(PAL.teal)} {...STROKE} transform="rotate(-14 26 50)" />
      <circle cx="50" cy="61" r="4" fill={f(PAL.sun)} {...STROKE} />
    </svg>
  );
}
