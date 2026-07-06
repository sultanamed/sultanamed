import { getItem } from '../../content/registry';
import type { MatchFace } from '../../content/types';
import { Illustration } from '../../illustrations/Illustration';

/** Oyunlarda kart/jeton yüzü: harf, resim, Arapça veya Türkçe kelime, nesne grubu */
export function MatchFaceView({ face }: { face: MatchFace }) {
  const item = getItem(face.itemId);
  switch (face.show) {
    case 'glyph':
      return <span className="memory-glyph">{item.glyph ?? item.ar}</span>;
    case 'illustration':
      return item.illustration ? (
        <span style={{ width: '72%', maxWidth: 96, aspectRatio: '1' }}>
          <Illustration id={item.illustration} label={item.tr} />
        </span>
      ) : (
        <span className="memory-glyph">{item.ar}</span>
      );
    case 'arWord':
      return (
        <span className="memory-glyph" style={{ fontSize: 'clamp(1rem, 4vw, 1.5rem)' }}>
          {item.ar}
        </span>
      );
    case 'trWord':
      return <span style={{ fontWeight: 700, fontSize: 'var(--fs-md)' }}>{item.tr}</span>;
    case 'countGroup':
      return (
        <span
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 4,
          }}
        >
          {Array.from({ length: face.count }, (_, i) => (
            <span key={i} style={{ width: 'clamp(14px, 18%, 26px)', aspectRatio: '1' }}>
              <Illustration id={face.illustration} />
            </span>
          ))}
        </span>
      );
  }
}
