import { PAL, STROKE, fills, type ArtProps } from '../style';

export default function Pomegranate({ variant }: ArtProps) {
  const f = fills(variant);
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
      {/* little crown */}
      <path d="M40 36 L40 22 L47 29 L50 20 L53 29 L60 22 L60 36 Z" fill={f(PAL.coral)} {...STROKE} />
      {/* coral round fruit */}
      <circle cx="50" cy="58" r="26" fill={f(PAL.coral)} {...STROKE} />
      {/* seed dots */}
      <circle cx="42" cy="52" r="2" fill={PAL.ink} />
      <circle cx="58" cy="52" r="2" fill={PAL.ink} />
      <circle cx="50" cy="62" r="2" fill={PAL.ink} />
      <circle cx="42" cy="68" r="2" fill={PAL.ink} />
      <circle cx="58" cy="68" r="2" fill={PAL.ink} />
    </svg>
  );
}
