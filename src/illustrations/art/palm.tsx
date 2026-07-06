import { PAL, STROKE, fills, type ArtProps } from '../style';

export default function Palm({ variant }: ArtProps) {
  const f = fills(variant);
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      <path d="M44 90 q-3 -24 8 -44 l9 4 q-9 20 -7 40 z" fill={f(PAL.sand)} {...STROKE} />
      <ellipse cx="43" cy="43" rx="13" ry="5.5" fill={f(PAL.leaf)} {...STROKE} transform="rotate(-30 43 43)" />
      <ellipse cx="69" cy="43" rx="13" ry="5.5" fill={f(PAL.leaf)} {...STROKE} transform="rotate(30 69 43)" />
      <ellipse cx="49" cy="34" rx="11" ry="5" fill={f(PAL.leaf)} {...STROKE} transform="rotate(-60 49 34)" />
      <ellipse cx="63" cy="34" rx="11" ry="5" fill={f(PAL.leaf)} {...STROKE} transform="rotate(60 63 34)" />
      <circle cx="52" cy="47" r="3.5" fill={f(PAL.sand)} {...STROKE} />
      <circle cx="60" cy="48" r="3.5" fill={f(PAL.sand)} {...STROKE} />
    </svg>
  );
}
