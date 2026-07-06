import { PAL, STROKE, fills, type ArtProps } from '../style';

export default function Duck({ variant }: ArtProps) {
  const f = fills(variant);
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      {/* sea-blue water */}
      <ellipse cx="50" cy="78" rx="36" ry="7" fill={f(PAL.sea)} {...STROKE} />
      {/* sunny body */}
      <ellipse cx="46" cy="60" rx="24" ry="16" fill={f(PAL.sun)} {...STROKE} />
      {/* head */}
      <circle cx="66" cy="38" r="12" fill={f(PAL.sun)} {...STROKE} />
      {/* coral beak */}
      <ellipse cx="81" cy="40" rx="6" ry="3.5" fill={f(PAL.coral)} {...STROKE} />
      {/* wing */}
      <ellipse cx="42" cy="58" rx="10" ry="7" fill={f(PAL.sun)} {...STROKE} transform="rotate(-15 42 58)" />
      {/* dot eye */}
      <circle cx="68" cy="35" r="2" fill={PAL.ink} />
    </svg>
  );
}
