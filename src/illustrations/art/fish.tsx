import { PAL, STROKE, fills, type ArtProps } from '../style';

export default function Fish({ variant }: ArtProps) {
  const f = fills(variant);
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      {/* tail fin */}
      <path d="M62 55 L80 40 Q76 55 80 70 Z" fill={f(PAL.teal)} {...STROKE} />
      {/* teal body */}
      <ellipse cx="44" cy="55" rx="24" ry="15" fill={f(PAL.teal)} {...STROKE} />
      {/* side fin */}
      <ellipse cx="48" cy="58" rx="7" ry="4.5" fill={f(PAL.sea)} {...STROKE} transform="rotate(-25 48 58)" />
      {/* bubbles */}
      <circle cx="76" cy="24" r="4" fill={f(PAL.sea)} {...STROKE} />
      <circle cx="86" cy="16" r="3" fill={f(PAL.sea)} {...STROKE} />
      <circle cx="84" cy="30" r="2.5" fill={f(PAL.sea)} {...STROKE} />
      {/* dot eye + tiny smile */}
      <circle cx="32" cy="51" r="2" fill={PAL.ink} />
      <path d="M26 58 q3 2.5 6 1" fill="none" {...STROKE} />
    </svg>
  );
}
