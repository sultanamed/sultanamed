import { PAL, STROKE, fills, type ArtProps } from '../style';

export default function IslandRakamlar({ variant }: ArtProps) {
  const f = fills(variant);
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      <ellipse cx="50" cy="82" rx="42" ry="10" fill={f(PAL.sea)} {...STROKE} />
      <path d="M18 84 q32 -34 64 0 z" fill={f(PAL.sand)} {...STROKE} />
      <rect x="42" y="30" width="16" height="38" rx="4" fill={f(PAL.white)} {...STROKE} />
      <rect x="42" y="38" width="16" height="7" rx="1.5" fill={f(PAL.teal)} {...STROKE} />
      <rect x="42" y="52" width="16" height="7" rx="1.5" fill={f(PAL.teal)} {...STROKE} />
      <rect x="44.5" y="21" width="11" height="9" rx="2.5" fill={f(PAL.sun)} {...STROKE} />
      <path d="M42 21 q8 -10 16 0 z" fill={f(PAL.coral)} {...STROKE} />
    </svg>
  );
}
