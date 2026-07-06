import type { Lang, Speakable } from '../content/types';
import { playSfx, type SfxName } from './sfx';

/**
 * Ses servisi: önce kayıtlı ses dosyası (audioAr/audioTr), yoksa cihazın TTS'i.
 * İleride gerçek kayıt eklemek = public/audio altına mp3 koyup içerikte alanı doldurmak.
 */

let voices: SpeechSynthesisVoice[] = [];
let currentAudio: HTMLAudioElement | null = null;

if (typeof speechSynthesis !== 'undefined') {
  const load = () => {
    voices = speechSynthesis.getVoices();
  };
  load();
  speechSynthesis.addEventListener('voiceschanged', load);
}

function pickVoice(lang: Lang): SpeechSynthesisVoice | undefined {
  const prefix = lang === 'ar' ? 'ar' : 'tr';
  const preferred = lang === 'ar' ? 'ar-SA' : 'tr-TR';
  return (
    voices.find((v) => v.lang === preferred) ??
    voices.find((v) => v.lang.toLowerCase().startsWith(prefix))
  );
}

export function hasVoice(lang: Lang): boolean {
  return typeof speechSynthesis !== 'undefined' && pickVoice(lang) !== undefined;
}

export function stopSpeaking() {
  if (typeof speechSynthesis !== 'undefined') speechSynthesis.cancel();
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
}

export function speak(item: Speakable, lang: Lang): Promise<void> {
  stopSpeaking();

  const fileUrl = lang === 'ar' ? item.audioAr : item.audioTr;
  if (fileUrl) {
    return new Promise((resolve) => {
      const audio = new Audio(fileUrl);
      currentAudio = audio;
      audio.onended = () => resolve();
      audio.onerror = () => resolve();
      void audio.play().catch(() => resolve());
    });
  }

  if (typeof speechSynthesis === 'undefined') return Promise.resolve();

  return new Promise((resolve) => {
    const utterance = new SpeechSynthesisUtterance(lang === 'ar' ? item.ar : item.tr);
    const voice = pickVoice(lang);
    if (voice) utterance.voice = voice;
    utterance.lang = lang === 'ar' ? 'ar-SA' : 'tr-TR';
    utterance.rate = 0.85; // çocuklar için yavaş
    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();
    speechSynthesis.speak(utterance);
  });
}

export function sfx(name: SfxName) {
  playSfx(name);
}
