import { useState } from 'react';
import { getItem } from '../content/registry';
import type { IllustrationId } from '../illustrations';
import { Illustration } from '../illustrations/Illustration';
import { SpeakerButtons } from '../components/SpeakerButtons';
import { speak, sfx } from '../audio/AudioService';

/** Rakam sayfası: rakamı gör + nesnelere dokunarak say */
export function CountingPage({ itemId, countOf }: { itemId: string; countOf: IllustrationId }) {
  const item = getItem(itemId);
  const total = item.value ?? 1;
  const [counted, setCounted] = useState(0);

  const tapObject = (index: number) => {
    if (index !== counted) return; // sırayla say
    const next = counted + 1;
    setCounted(next);
    sfx('tap');
    void speak(getItem(`num-${next}`), 'ar');
    if (next === total) window.setTimeout(() => sfx('correct'), 600);
  };

  return (
    <div className="lesson-card pop-in" key={itemId}>
      <div className="glyph-hero" style={{ lineHeight: 1.2 }}>{item.glyph}</div>
      <div className="lesson-word-tr">
        {item.tr} <span className="lesson-translit">({item.translit})</span>
      </div>
      <div className="lesson-translit">Bildiğimiz rakam: {item.value}</div>
      <p style={{ margin: 0, fontWeight: 700, opacity: 0.7 }}>
        {counted < total ? 'Sırayla dokunarak sayalım!' : 'Aferin! Hepsini saydın!'}
      </p>
      <div className="count-objects">
        {Array.from({ length: total }, (_, i) => (
          <button
            key={i}
            type="button"
            className={`count-obj ${i < counted ? 'counted' : ''}`}
            onClick={() => tapObject(i)}
            aria-label={`${i + 1}. nesne`}
          >
            <Illustration id={countOf} />
          </button>
        ))}
      </div>
      <SpeakerButtons item={item} />
    </div>
  );
}
