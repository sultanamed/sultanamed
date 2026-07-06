import { useEffect, useMemo, useState } from 'react';
import type { GameSpec } from '../../content/types';
import { getItem } from '../../content/registry';
import { speak, sfx } from '../../audio/AudioService';
import { Illustration } from '../../illustrations/Illustration';
import { IconReplay, IconSpeaker } from '../../components/icons';

type Spec = Extract<GameSpec, { engine: 'listen-find' }>;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function ListenFind({ spec, onWin }: { spec: Spec; onWin: () => void }) {
  const [roundIndex, setRoundIndex] = useState(0);
  const [wrongId, setWrongId] = useState<string | null>(null);
  const round = spec.rounds[roundIndex];
  const prompt = getItem(round.promptItemId);

  const choices = useMemo(() => shuffle(round.choiceItemIds), [round]);

  useEffect(() => {
    const t = window.setTimeout(() => void speak(prompt, 'ar'), 500);
    return () => window.clearTimeout(t);
  }, [prompt]);

  const pick = (itemId: string) => {
    if (itemId === round.promptItemId) {
      sfx('correct');
      window.setTimeout(() => {
        if (roundIndex + 1 >= spec.rounds.length) onWin();
        else setRoundIndex(roundIndex + 1);
      }, 700);
    } else {
      sfx('wiggle');
      setWrongId(itemId);
      window.setTimeout(() => setWrongId(null), 450);
      void speak(prompt, 'ar');
    }
  };

  return (
    <>
      <div className="game-prompt">
        <IconSpeaker size={24} />
        <span>
          Dinle, doğrusunu bul! ({roundIndex + 1}/{spec.rounds.length})
        </span>
        <button
          type="button"
          className="round-btn"
          style={{ width: 44, height: 44 }}
          onClick={() => void speak(prompt, 'ar')}
          aria-label="Tekrar dinle"
        >
          <IconReplay size={22} />
        </button>
      </div>
      <div className="listen-choices">
        {choices.map((itemId) => {
          const item = getItem(itemId);
          return (
            <button
              key={itemId}
              type="button"
              className={`listen-card ${wrongId === itemId ? 'wiggle' : ''}`}
              onClick={() => pick(itemId)}
            >
              {item.illustration ? (
                <span style={{ width: 80 }}>
                  <Illustration id={item.illustration} label={item.tr} />
                </span>
              ) : item.kind === 'phrase' ? (
                <span style={{ fontWeight: 700, fontSize: 'var(--fs-md)' }}>{item.tr}</span>
              ) : (
                <span className="g-glyph">{item.glyph}</span>
              )}
            </button>
          );
        })}
      </div>
    </>
  );
}
