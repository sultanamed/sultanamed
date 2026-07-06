import { PAL, STROKE, fills, type ArtProps } from '../style';

export default function Giraffe({ variant }: ArtProps) {
  const f = fills(variant);
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      {/* tiny horns */}
      <path d="M44 20 v-7" fill="none" {...STROKE} />
      <path d="M56 20 v-7" fill="none" {...STROKE} />
      <circle cx="44" cy="10" r="3" fill={f(PAL.sun)} {...STROKE} />
      <circle cx="56" cy="10" r="3" fill={f(PAL.sun)} {...STROKE} />
      {/* long sunny neck */}
      <rect x="42" y="26" width="14" height="62" rx="7" fill={f(PAL.sun)} {...STROKE} />
      {/* sand patches */}
      <circle cx="49" cy="46" r="4" fill={f(PAL.sand)} {...STROKE} />
      <circle cx="49" cy="62" r="4" fill={f(PAL.sand)} {...STROKE} />
      <circle cx="49" cy="78" r="4" fill={f(PAL.sand)} {...STROKE} />
      {/* ear */}
      <ellipse cx="66" cy="24" rx="6" ry="4" fill={f(PAL.sun)} {...STROKE} transform="rotate(20 66 24)" />
      {/* head */}
      <ellipse cx="52" cy="26" rx="14" ry="10" fill={f(PAL.sun)} {...STROKE} />
      {/* dot eyes + tiny smile */}
      <circle cx="47" cy="24" r="2" fill={PAL.ink} />
      <circle cx="57" cy="24" r="2" fill={PAL.ink} />
      <path d="M49 31 q3 2.5 6 0" fill="none" {...STROKE} />
    </svg>
  );
}
