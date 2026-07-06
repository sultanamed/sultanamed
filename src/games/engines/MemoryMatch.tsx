import { useMemo, useState } from 'react';
import type { GameSpec, MatchFace } from '../../content/types';
import { getItem } from '../../content/registry';
import { speak, sfx } from '../../audio/AudioService';
import { MatchFaceView } from '../shared/MatchFaceView';

type Spec = Extract<GameSpec, { engine: 'memory-match' }>;

interface Card {
  key: number;
  pairIndex: number;
  face: MatchFace;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function MemoryMatch({ spec, onWin }: { spec: Spec; onWin: () => void }) {
  const cards = useMemo<Card[]>(
    () =>
      shuffle(
        spec.pairs.flatMap((pair, pairIndex) => [
          { key: pairIndex * 2, pairIndex, face: pair.a },
          { key: pairIndex * 2 + 1, pairIndex, face: pair.b },
        ]),
      ),
    [spec],
  );

  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [busy, setBusy] = useState(false);

  const tapCard = (card: Card) => {
    if (busy || flipped.includes(card.key) || matched.has(card.pairIndex)) return;
    sfx('flip');
    const next = [...flipped, card.key];
    setFlipped(next);
    if (next.length < 2) return;

    const [a, b] = next.map((k) => cards.find((c) => c.key === k)!);
    if (a.pairIndex === b.pairIndex) {
      const newMatched = new Set(matched).add(a.pairIndex);
      setMatched(newMatched);
      setFlipped([]);
      sfx('correct');
      void speak(getItem(a.face.itemId), 'ar');
      if (newMatched.size === spec.pairs.length) window.setTimeout(onWin, 1000);
    } else {
      setBusy(true);
      window.setTimeout(() => {
        sfx('wiggle');
        setFlipped([]);
        setBusy(false);
      }, 900);
    }
  };

  const cols = cards.length <= 8 ? 4 : 4;

  return (
    <>
      <div className="game-prompt">Eşleri Bul!</div>
      <div className="memory-grid" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {cards.map((card) => {
          const isOpen = flipped.includes(card.key) || matched.has(card.pairIndex);
          return (
            <button
              key={card.key}
              type="button"
              className={`memory-card ${isOpen ? 'flipped' : ''} ${matched.has(card.pairIndex) ? 'matched' : ''}`}
              onClick={() => tapCard(card)}
              aria-label={isOpen ? getItem(card.face.itemId).tr : 'Kapalı kart'}
            >
              <span className="memory-card-inner">
                <span className="memory-face memory-back" aria-hidden="true">
                  <span style={{ width: '55%', maxWidth: 64 }}>
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 3l2.7 5.6 6 .8-4.4 4.2 1.1 6-5.4-2.9-5.4 2.9 1.1-6L3.3 9.4l6-.8L12 3z" />
                    </svg>
                  </span>
                </span>
                <span className="memory-face memory-front">
                  <MatchFaceView face={card.face} />
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
}
