import { PAL, STROKE, fills, type ArtProps } from '../style';

export default function Parrot({ variant }: ArtProps) {
  const f = fills(variant);
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      <ellipse cx="29" cy="71" rx="10" ry="4.5" fill={f(PAL.coral)} {...STROKE} transform="rotate(35 29 71)" />
      <ellipse cx="33" cy="77" rx="10" ry="4.5" fill={f(PAL.sun)} {...STROKE} transform="rotate(18 33 77)" />
      <circle cx="52" cy="50" r="26" fill={f(PAL.teal)} {...STROKE} />
      <ellipse cx="52" cy="62" rx="13" ry="13" fill={f(PAL.sun)} {...STROKE} />
      <ellipse cx="68" cy="52" rx="8" ry="14" fill={f(PAL.coral)} {...STROKE} transform="rotate(-12 68 52)" />
      <ellipse cx="47" cy="22" rx="4" ry="7" fill={f(PAL.coral)} {...STROKE} transform="rotate(-22 47 22)" />
      <path d="M52 45 q-8 1 -7 8 q7 5 14 0 q1 -7 -7 -8 z" fill={f(PAL.sun)} {...STROKE} />
      <circle cx="44" cy="41" r="2.5" fill={PAL.ink} />
      <circle cx="60" cy="41" r="2.5" fill={PAL.ink} />
    </svg>
  );
}
