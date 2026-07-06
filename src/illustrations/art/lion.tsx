import { PAL, STROKE, fills, type ArtProps } from '../style';

export default function Lion({ variant }: ArtProps) {
  const f = fills(variant);
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      {/* small ears peeking over the mane */}
      <circle cx="26" cy="24" r="7" fill={f(PAL.sand)} {...STROKE} />
      <circle cx="74" cy="24" r="7" fill={f(PAL.sand)} {...STROKE} />
      {/* round sunny mane */}
      <circle cx="50" cy="52" r="34" fill={f(PAL.sun)} {...STROKE} />
      {/* round face */}
      <circle cx="50" cy="52" r="22" fill={f(PAL.sand)} {...STROKE} />
      {/* dot eyes + tiny smile */}
      <circle cx="42" cy="48" r="2" fill={PAL.ink} />
      <circle cx="58" cy="48" r="2" fill={PAL.ink} />
      <path d="M45 58 q5 4 10 0" fill="none" {...STROKE} />
    </svg>
  );
}
