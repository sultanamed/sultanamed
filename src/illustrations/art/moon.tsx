import { PAL, STROKE, fills, type ArtProps } from '../style';

export default function Moon({ variant }: ArtProps) {
  const f = fills(variant);
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      {/* full moon */}
      <circle cx="46" cy="52" r="28" fill={f(PAL.sun)} {...STROKE} />
      {/* soft craters */}
      <circle cx="38" cy="44" r="6" fill={f(PAL.sand)} {...STROKE} />
      <circle cx="55" cy="58" r="4.5" fill={f(PAL.sand)} {...STROKE} />
      <circle cx="42" cy="64" r="3" fill={f(PAL.sand)} {...STROKE} />
      {/* two small stars */}
      <path
        d="M83 24 l2.4 5 l5 2.4 l-5 2.4 l-2.4 5 l-2.4 -5 l-5 -2.4 l5 -2.4 Z"
        fill={f(PAL.sun)}
        {...STROKE}
      />
      <path
        d="M81 66 l1.8 3.8 l3.8 1.8 l-3.8 1.8 l-1.8 3.8 l-1.8 -3.8 l-3.8 -1.8 l3.8 -1.8 Z"
        fill={f(PAL.sun)}
        {...STROKE}
      />
    </svg>
  );
}
