import { PAL, STROKE, fills, type ArtProps } from '../style';

export default function Elephant({ variant }: ArtProps) {
  const f = fills(variant);
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      {/* legs */}
      <rect x="34" y="66" width="11" height="16" rx="5" fill={f(PAL.sky)} {...STROKE} />
      <rect x="56" y="66" width="11" height="16" rx="5" fill={f(PAL.sky)} {...STROKE} />
      {/* round body/head */}
      <circle cx="50" cy="48" r="26" fill={f(PAL.sky)} {...STROKE} />
      {/* big ear */}
      <circle cx="36" cy="42" r="13" fill={f(PAL.sea)} {...STROKE} />
      {/* curled trunk */}
      <path
        d="M70 46 q10 4 8 14 q-2 10 -12 8 q-7 -1.5 -6 -8"
        fill="none"
        {...STROKE}
      />
      {/* dot eye + tiny smile */}
      <circle cx="58" cy="42" r="2" fill={PAL.ink} />
      <path d="M56 52 q4 3 8 0" fill="none" {...STROKE} />
    </svg>
  );
}
