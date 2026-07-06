import { useEffect } from 'react';
import { getItem } from '../content/registry';
import { Illustration } from '../illustrations/Illustration';
import { SpeakerButtons } from '../components/SpeakerButtons';
import { speak } from '../audio/AudioService';

export function LetterIntroPage({ itemId }: { itemId: string }) {
  const item = getItem(itemId);
  const word = item.exampleWord;

  // Sayfa açılınca harfin adını Arapça söyle (dokunma sonrası gezinme olduğu için çalışır)
  useEffect(() => {
    const t = window.setTimeout(() => void speak(item, 'ar'), 350);
    return () => window.clearTimeout(t);
  }, [item]);

  return (
    <div className="lesson-card split pop-in" key={itemId}>
      <div>
        <div className="glyph-hero">{item.glyph}</div>
        <div className="lesson-word-tr">{item.tr}</div>
        <SpeakerButtons item={item} size="lg" />
      </div>
      {word && item.illustration && (
        <div>
          <span className="lesson-art">
            <Illustration id={item.illustration} label={word.tr} />
          </span>
          <div className="glyph-hero" style={{ fontSize: 'var(--fs-xl)' }}>
            {word.ar}
          </div>
          <div className="lesson-word-tr">{word.tr}</div>
          {word.translit && <div className="lesson-translit">({word.translit})</div>}
          <SpeakerButtons item={word} />
        </div>
      )}
    </div>
  );
}
