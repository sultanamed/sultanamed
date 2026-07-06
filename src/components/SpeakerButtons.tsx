import { useState } from 'react';
import type { Lang, Speakable } from '../content/types';
import { speak } from '../audio/AudioService';
import { IconSpeaker } from './icons';

interface Props {
  item: Speakable;
  size?: 'md' | 'lg';
}

/** Her içeriğin yanındaki TR / AR dinleme butonları */
export function SpeakerButtons({ item, size = 'md' }: Props) {
  const [speaking, setSpeaking] = useState<Lang | null>(null);

  const onSpeak = (lang: Lang) => {
    setSpeaking(lang);
    void speak(item, lang).finally(() => setSpeaking(null));
  };

  const cls = `speaker-btn ${size === 'lg' ? 'speaker-btn-lg' : ''}`;
  return (
    <div className="speaker-row">
      <button
        type="button"
        className={`${cls} speaker-tr ${speaking === 'tr' ? 'speaking' : ''}`}
        onClick={() => onSpeak('tr')}
        aria-label={`Türkçesini dinle: ${item.tr}`}
      >
        <IconSpeaker size={size === 'lg' ? 28 : 22} />
        <span>TR</span>
      </button>
      <button
        type="button"
        className={`${cls} speaker-ar ${speaking === 'ar' ? 'speaking' : ''}`}
        onClick={() => onSpeak('ar')}
        aria-label="Arapçasını dinle"
      >
        <IconSpeaker size={size === 'lg' ? 28 : 22} />
        <span>AR</span>
      </button>
    </div>
  );
}
