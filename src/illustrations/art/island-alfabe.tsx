import { PAL, STROKE, fills, type ArtProps } from '../style';

export default function IslandAlfabe({ variant }: ArtProps) {
  const f = fills(variant);
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      <ellipse cx="50" cy="82" rx="42" ry="10" fill={f(PAL.sea)} {...STROKE} />
      <path d="M18 84 q32 -34 64 0 z" fill={f(PAL.sand)} {...STROKE} />
      <path d="M35 79 q-2 -13 3 -25 l6 2 q-4 12 -2 23 z" fill={f(PAL.sand)} {...STROKE} />
      <ellipse cx="31" cy="50" rx="9" ry="4" fill={f(PAL.leaf)} {...STROKE} transform="rotate(-30 31 50)" />
      <ellipse cx="49" cy="49" rx="9" ry="4" fill={f(PAL.leaf)} {...STROKE} transform="rotate(28 49 49)" />
      <ellipse cx="40" cy="44" rx="8" ry="4" fill={f(PAL.leaf)} {...STROKE} transform="rotate(-5 40 44)" />
      <path d="M64 78 V44" fill="none" {...STROKE} />
      <path d="M64 44 l17 5 l-17 5 z" fill={f(PAL.coral)} {...STROKE} />
    </svg>
  );
}
