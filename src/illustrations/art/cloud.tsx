import { PAL, STROKE, fills, type ArtProps } from '../style';

export default function Cloud({ variant }: ArtProps) {
  const f = fills(variant);
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      <circle cx="26" cy="46" r="11" fill={f(PAL.sea)} {...STROKE} />
      <circle cx="76" cy="48" r="10" fill={f(PAL.sea)} {...STROKE} />
      <path
        d="M32 68
           a10 10 0 0 1 -1 -19.9
           a14 14 0 0 1 26 -7.5
           a13 13 0 0 1 22.5 8.6
           a9.5 9.5 0 0 1 -4.5 18.8
           Z"
        fill={f(PAL.white)}
        {...STROKE}
      />
      <circle cx="44" cy="58" r="3" fill={f(PAL.sea)} {...STROKE} />
      <circle cx="58" cy="60" r="3" fill={f(PAL.sea)} {...STROKE} />
    </svg>
  );
}
