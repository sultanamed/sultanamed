import { useMemo, useRef, useState, type PointerEvent } from 'react';
import type { GameSpec } from '../../content/types';
import { getItem } from '../../content/registry';
import { speak, sfx } from '../../audio/AudioService';
import { MatchFaceView } from '../shared/MatchFaceView';

type Spec = Extract<GameSpec, { engine: 'drag-match' }>;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function DragMatch({ spec, onWin }: { spec: Spec; onWin: () => void }) {
  const tokens = useMemo(() => shuffle(spec.pairs.map((_, i) => i)), [spec]);
  const slots = useMemo(() => shuffle(spec.pairs.map((_, i) => i)), [spec]);

  const [placed, setPlaced] = useState<Set<number>>(new Set());
  const [drag, setDrag] = useState<{ index: number; dx: number; dy: number } | null>(null);
  const [overSlot, setOverSlot] = useState<number | null>(null);
  const [wrong, setWrong] = useState<number | null>(null);
  const startPoint = useRef({ x: 0, y: 0 });

  const slotAt = (x: number, y: number): number | null => {
    for (const el of document.querySelectorAll<HTMLElement>('[data-slot-index]')) {
      const r = el.getBoundingClientRect();
      // 20px tolerans — küçük parmaklar için cömert bırakma alanı
      if (x > r.left - 20 && x < r.right + 20 && y > r.top - 20 && y < r.bottom + 20) {
        return Number(el.dataset.slotIndex);
      }
    }
    return null;
  };

  const onDown = (e: PointerEvent<HTMLButtonElement>, index: number) => {
    if (placed.has(index)) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    startPoint.current = { x: e.clientX, y: e.clientY };
    setDrag({ index, dx: 0, dy: 0 });
  };

  const onMove = (e: PointerEvent<HTMLButtonElement>, index: number) => {
    if (!drag || drag.index !== index) return;
    setDrag({ index, dx: e.clientX - startPoint.current.x, dy: e.clientY - startPoint.current.y });
    setOverSlot(slotAt(e.clientX, e.clientY));
  };

  const onUp = (e: PointerEvent<HTMLButtonElement>, index: number) => {
    if (!drag || drag.index !== index) return;
    const hit = slotAt(e.clientX, e.clientY);
    setDrag(null);
    setOverSlot(null);
    if (hit === index) {
      const next = new Set(placed).add(index);
      setPlaced(next);
      sfx('correct');
      void speak(getItem(spec.pairs[index].drag.itemId), 'ar');
      if (next.size === spec.pairs.length) window.setTimeout(onWin, 900);
    } else if (hit !== null) {
      sfx('wiggle');
      setWrong(index);
      window.setTimeout(() => setWrong(null), 450);
    }
  };

  return (
    <>
      <div className="game-prompt">Sürükle ve Eşleştir!</div>
      <div className="drag-board">
        <div className="drag-col">
          {tokens.map((index) => (
            <button
              key={index}
              type="button"
              className={`drag-token ${drag?.index === index ? 'dragging' : ''} ${placed.has(index) ? 'placed' : ''} ${wrong === index ? 'wiggle' : ''}`}
              style={
                drag?.index === index
                  ? { transform: `translate(${drag.dx}px, ${drag.dy}px)` }
                  : undefined
              }
              onPointerDown={(e) => onDown(e, index)}
              onPointerMove={(e) => onMove(e, index)}
              onPointerUp={(e) => onUp(e, index)}
              onPointerCancel={() => {
                setDrag(null);
                setOverSlot(null);
              }}
              aria-label={getItem(spec.pairs[index].drag.itemId).tr}
              disabled={placed.has(index)}
            >
              <MatchFaceView face={spec.pairs[index].drag} />
            </button>
          ))}
        </div>
        <div className="drag-col">
          {slots.map((index) => (
            <div
              key={index}
              data-slot-index={index}
              className={`drop-slot ${overSlot === index ? 'over' : ''} ${placed.has(index) ? 'filled' : ''}`}
            >
              <MatchFaceView face={spec.pairs[index].target} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
