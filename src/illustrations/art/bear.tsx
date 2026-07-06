import { PAL, STROKE, fills, type ArtProps } from '../style';

export default function Bear({ variant }: ArtProps) {
  const f = fills(variant);
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      {/* round ears */}
      <circle cx="34" cy="22" r="8" fill={f(PAL.sand)} {...STROKE} />
      <circle cx="66" cy="22" r="8" fill={f(PAL.sand)} {...STROKE} />
      {/* round belly */}
      <circle cx="50" cy="68" r="22" fill={f(PAL.sand)} {...STROKE} />
      <ellipse cx="50" cy="72" rx="12" ry="10" fill={f(PAL.coral)} {...STROKE} />
      {/* round head */}
      <circle cx="50" cy="36" r="20" fill={f(PAL.sand)} {...STROKE} />
      {/* dot eyes + tiny smile */}
      <circle cx="43" cy="34" r="2" fill={PAL.ink} />
      <circle cx="57" cy="34" r="2" fill={PAL.ink} />
      <path d="M46 43 q4 3 8 0" fill="none" {...STROKE} />
    </svg>
  );
}
