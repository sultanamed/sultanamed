import { getItem } from '../content/registry';
import { Illustration } from '../illustrations/Illustration';
import { speak, sfx } from '../audio/AudioService';

/** Dokun-dinle tekrar galerisi */
export function GalleryPage({ title, itemIds }: { title: string; itemIds: string[] }) {
  return (
    <div className="lesson-card pop-in">
      <h2 style={{ margin: '0 0 4px' }}>{title}</h2>
      <p style={{ margin: 0, opacity: 0.7, fontWeight: 700 }}>Karta dokun, Arapçasını dinle!</p>
      <div className="gallery-grid">
        {itemIds.map((id) => {
          const item = getItem(id);
          return (
            <button
              key={id}
              type="button"
              className="gallery-tile"
              onClick={() => {
                sfx('tap');
                void speak(item, 'ar');
              }}
            >
              {item.illustration ? (
                <span className="g-art">
                  <Illustration id={item.illustration} label={item.tr} />
                </span>
              ) : (
                <span className="g-glyph">{item.glyph ?? item.ar}</span>
              )}
              {item.kind !== 'haraka' && item.glyph && item.illustration && (
                <span className="g-glyph" style={{ fontSize: '1.6rem' }}>
                  {item.glyph}
                </span>
              )}
              <span className="g-label">{item.tr}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
