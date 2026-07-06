import { useEffect } from 'react';
import { getItem } from '../content/registry';
import { Illustration } from '../illustrations/Illustration';
import { SpeakerButtons } from '../components/SpeakerButtons';
import { ArabicText } from '../components/ArabicText';
import { speak } from '../audio/AudioService';

/** Şekil / rakam / kalıp / hareke tek öğe tanıtım sayfası */
export function ItemIntroPage({ itemId }: { itemId: string }) {
  const item = getItem(itemId);

  useEffect(() => {
    const t = window.setTimeout(() => void speak(item, 'ar'), 350);
    return () => window.clearTimeout(t);
  }, [item]);

  return (
    <div className="lesson-card split pop-in" key={itemId}>
      <div>
        {item.illustration ? (
          <span className="lesson-art">
            <Illustration id={item.illustration} label={item.tr} />
          </span>
        ) : (
          <div className="glyph-hero">{item.glyph ?? <ArabicText>{item.ar}</ArabicText>}</div>
        )}
        {item.kind === 'number' && item.value !== undefined && (
          <div className="lesson-translit">Bildiğimiz rakam: {item.value}</div>
        )}
      </div>
      <div>
        {(item.illustration || item.kind === 'phrase') && (
          <ArabicText size="var(--fs-xl)">{item.ar}</ArabicText>
        )}
        <div className="lesson-word-tr">{item.tr}</div>
        {item.translit && <div className="lesson-translit">({item.translit})</div>}
        <SpeakerButtons item={item} size="lg" />
      </div>
    </div>
  );
}
