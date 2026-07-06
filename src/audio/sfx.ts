/** Web Audio osilatörleriyle üretilen minik ses efektleri — dosya yok, çevrimdışı çalışır. */
export type SfxName = 'tap' | 'correct' | 'wiggle' | 'win' | 'pop' | 'flip';

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof AudioContext === 'undefined') return null;
  if (!ctx) ctx = new AudioContext();
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

function tone(freq: number, start: number, duration: number, type: OscillatorType = 'sine', gainValue = 0.12) {
  const ac = getCtx();
  if (!ac) return;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(gainValue, ac.currentTime + start);
  gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + start + duration);
  osc.connect(gain).connect(ac.destination);
  osc.start(ac.currentTime + start);
  osc.stop(ac.currentTime + start + duration + 0.02);
}

export function playSfx(name: SfxName) {
  switch (name) {
    case 'tap':
      tone(520, 0, 0.08, 'triangle');
      break;
    case 'flip':
      tone(380, 0, 0.06, 'triangle');
      tone(560, 0.05, 0.08, 'triangle');
      break;
    case 'correct':
      tone(523, 0, 0.12);
      tone(659, 0.1, 0.12);
      tone(784, 0.2, 0.2);
      break;
    case 'wiggle':
      tone(220, 0, 0.15, 'sawtooth', 0.05);
      break;
    case 'pop':
      tone(880, 0, 0.05, 'square', 0.08);
      tone(440, 0.03, 0.08, 'triangle');
      break;
    case 'win':
      [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.12, 0.25));
      tone(1319, 0.5, 0.4);
      break;
  }
}
