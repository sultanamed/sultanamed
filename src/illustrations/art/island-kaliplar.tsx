import { PAL, STROKE, fills, type ArtProps } from '../style';

export default function IslandKaliplar({ variant }: ArtProps) {
  const f = fills(variant);
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      <ellipse cx="50" cy="82" rx="42" ry="10" fill={f(PAL.sea)} {...STROKE} />
      <path d="M18 84 q32 -34 64 0 z" fill={f(PAL.sand)} {...STROKE} />
      <path d="M53 38 l-6 10 l13 -4 z" fill={f(PAL.cream)} {...STROKE} />
      <ellipse cx="62" cy="29" rx="17" ry="12" fill={f(PAL.cream)} {...STROKE} />
      <path d="M33 47 l4 8 l4 -9 z" fill={f(PAL.cream)} {...STROKE} />
      <ellipse cx="31" cy="41" rx="11" ry="8" fill={f(PAL.cream)} {...STROKE} />
    </svg>
  );
}
