import { useEffect, useMemo, useState } from 'react';
import type { GameSpec } from '../../content/types';
import { getItem } from '../../content/registry';
import { speak, sfx } from '../../audio/AudioService';
import { Illustration } from '../../illustrations/Illustration';
import { IconReplay } from '../../components/icons';

type Spec = Extract<GameSpec, { engine: 'balloon-pop' }>;

interface BalloonState {
  id: number;
  itemId: string;
  x: number; // yüzde
  duration: number;
  /** Negatif gecikme: balon uçuşun ortasından başlar, gökyüzü hiç boş kalmaz */
  delay: number;
  popped: boolean;
}

let balloonSeq = 0;

function makeBalloon(itemId: string, midFlight = false): BalloonState {
  const duration = 7 + Math.random() * 5;
  return {
    id: balloonSeq++,
    itemId,
    x: 4 + Math.random() * 72,
    duration,
    delay: midFlight ? -Math.random() * duration * 0.7 : 0,
    popped: false,
  };
}

export function BalloonPop({ spec, onWin }: { spec: Spec; onWin: () => void }) {
  const [roundIndex, setRoundIndex] = useState(0);
  const round = spec.rounds[roundIndex];
  const target = getItem(round.targetItemId);

  // Her turda hedef garanti + havuzdan dolgu balonlar
  const initialBalloons = useMemo(() => {
    const pool = [...round.poolItemIds];
    const list = [makeBalloon(round.targetItemId, true)];
    while (list.length < Math.min(5, pool.length + 1)) {
      list.push(makeBalloon(pool[Math.floor(Math.random() * pool.length)], true));
    }
    return list;
  }, [round]);

  const [balloons, setBalloons] = useState(initialBalloons);
  useEffect(() => setBalloons(initialBalloons), [initialBalloons]);

  useEffect(() => {
    const t = window.setTimeout(() => void speak(target, 'ar'), 500);
    return () => window.clearTimeout(t);
  }, [target]);

  const recycle = (id: number) => {
    setBalloons((prev) => {
      const hasTarget = prev.some((b) => b.id !== id && !b.popped && b.itemId === round.targetItemId);
      const source = hasTarget
        ? round.poolItemIds[Math.floor(Math.random() * round.poolItemIds.length)]
        : round.targetItemId;
      return prev.map((b) => (b.id === id ? makeBalloon(source) : b));
    });
  };

  const tapBalloon = (balloon: BalloonState) => {
    if (balloon.popped) return;
    if (balloon.itemId === round.targetItemId) {
      sfx('pop');
      setBalloons((prev) => prev.map((b) => (b.id === balloon.id ? { ...b, popped: true } : b)));
      window.setTimeout(() => {
        if (roundIndex + 1 >= spec.rounds.length) onWin();
        else setRoundIndex(roundIndex + 1);
      }, 700);
    } else {
      sfx('wiggle');
      void speak(target, 'ar');
    }
  };

  return (
    <>
      <div className="game-prompt">
        <span>
          <strong>{target.tr}</strong> harfini bul ve patlat! ({roundIndex + 1}/{spec.rounds.length})
        </span>
        <button
          type="button"
          className="round-btn"
          style={{ width: 44, height: 44 }}
          onClick={() => void speak(target, 'ar')}
          aria-label="Tekrar dinle"
        >
          <IconReplay size={22} />
        </button>
      </div>
      <div className="balloon-sky">
        {balloons.map((b) => (
          <button
            key={b.id}
            type="button"
            className="balloon"
            style={{
              left: `${b.x}%`,
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
              visibility: b.popped ? 'hidden' : 'visible',
            }}
            onAnimationEnd={() => recycle(b.id)}
            onClick={() => tapBalloon(b)}
            aria-label={`Balon: ${getItem(b.itemId).tr}`}
          >
            <Illustration id="balloon" />
            <span className="b-glyph">{getItem(b.itemId).glyph}</span>
          </button>
        ))}
      </div>
    </>
  );
}
