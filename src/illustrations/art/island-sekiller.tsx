import { PAL, STROKE, fills, type ArtProps } from '../style';

export default function IslandSekiller({ variant }: ArtProps) {
  const f = fills(variant);
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      <ellipse cx="50" cy="82" rx="42" ry="10" fill={f(PAL.sea)} {...STROKE} />
      <path d="M18 84 q32 -34 64 0 z" fill={f(PAL.sand)} {...STROKE} />
      <rect x="24" y="30" width="15" height="15" rx="3" fill={f(PAL.teal)} {...STROKE} transform="rotate(-8 31.5 37.5)" />
      <circle cx="55" cy="34" r="8.5" fill={f(PAL.coral)} {...STROKE} />
      <path d="M77 24 l9 17 h-18 z" fill={f(PAL.sun)} {...STROKE} />
    </svg>
  );
}
