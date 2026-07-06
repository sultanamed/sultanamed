import { PAL, STROKE, fills, type ArtProps } from '../style';

export default function Lamb({ variant }: ArtProps) {
  const f = fills(variant);
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      {/* legs */}
      <path d="M38 72 v14" fill="none" {...STROKE} />
      <path d="M62 72 v14" fill="none" {...STROKE} />
      {/* cloud-like wool */}
      <circle cx="34" cy="52" r="13" fill={f(PAL.cream)} {...STROKE} />
      <circle cx="66" cy="52" r="13" fill={f(PAL.cream)} {...STROKE} />
      <circle cx="42" cy="38" r="13" fill={f(PAL.cream)} {...STROKE} />
      <circle cx="58" cy="38" r="13" fill={f(PAL.cream)} {...STROKE} />
      <circle cx="50" cy="54" r="15" fill={f(PAL.cream)} {...STROKE} />
      {/* sand face */}
      <ellipse cx="50" cy="52" rx="11" ry="10" fill={f(PAL.sand)} {...STROKE} />
      {/* dot eyes + tiny smile */}
      <circle cx="46" cy="50" r="2" fill={PAL.ink} />
      <circle cx="54" cy="50" r="2" fill={PAL.ink} />
      <path d="M47 57 q3 2.5 6 0" fill="none" {...STROKE} />
    </svg>
  );
}
