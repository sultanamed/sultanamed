import { useMemo, useRef, useState, type PointerEvent } from 'react';
import type { GameSpec } from '../../content/types';
import { getItem } from '../../content/registry';
import { speak, sfx } from '../../audio/AudioService';
import { Illustration } from '../../illustrations/Illustration';

type Spec = Extract<GameSpec, { engine: 'maze-collect' }>;

// 7x7 labirent: 0 = yol, 1 = duvar. Başlangıç (0,0), sandık (6,6). Tüm yollar bağlantılı.
const GRID = [
  [0, 0, 0, 1, 0, 0, 0],
  [1, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 0, 1, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [1, 1, 0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0],
] as const;

const SIZE = 7;
// Yol üzerindeki harf konumları (satır, sütun)
const COLLECT_CELLS: Array<[number, number]> = [
  [2, 1],
  [0, 5],
  [4, 5],
  [6, 2],
];
const DECOY_CELLS: Array<[number, number]> = [
  [0, 2],
  [6, 4],
];

export function MazeCollect({ spec, onWin }: { spec: Spec; onWin: () => void }) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<[number, number]>([0, 0]);
  const [collected, setCollected] = useState<Set<string>>(new Set());
  const [dragging, setDragging] = useState(false);
  const [chestWiggle, setChestWiggle] = useState(false);

  const letterAt = useMemo(() => {
    const map = new Map<string, { itemId: string; decoy: boolean }>();
    spec.collectItemIds.forEach((itemId, i) => {
      const cell = COLLECT_CELLS[i % COLLECT_CELLS.length];
      map.set(`${cell[0]}-${cell[1]}`, { itemId, decoy: false });
    });
    spec.decoyItemIds.forEach((itemId, i) => {
      const cell = DECOY_CELLS[i % DECOY_CELLS.length];
      map.set(`${cell[0]}-${cell[1]}`, { itemId, decoy: true });
    });
    return map;
  }, [spec]);

  const allCollected = collected.size >= spec.collectItemIds.length;

  const tryMoveTo = (row: number, col: number) => {
    if (row < 0 || col < 0 || row >= SIZE || col >= SIZE) return;
    if (GRID[row][col] === 1) return;
    const [r, c] = pos;
    if (Math.abs(row - r) + Math.abs(col - c) !== 1) return; // sadece komşu kareye
    setPos([row, col]);

    const key = `${row}-${col}`;
    const letter = letterAt.get(key);
    if (letter && !letter.decoy && !collected.has(key)) {
      const next = new Set(collected).add(key);
      setCollected(next);
      sfx('correct');
      void speak(getItem(letter.itemId), 'ar');
    }

    if (row === SIZE - 1 && col === SIZE - 1) {
      if (allCollected) {
        window.setTimeout(onWin, 500);
      } else {
        sfx('wiggle');
        setChestWiggle(true);
        window.setTimeout(() => setChestWiggle(false), 500);
      }
    }
  };

  const cellFromEvent = (e: PointerEvent): [number, number] | null => {
    const grid = gridRef.current;
    if (!grid) return null;
    const r = grid.getBoundingClientRect();
    const col = Math.floor(((e.clientX - r.left) / r.width) * SIZE);
    const row = Math.floor(((e.clientY - r.top) / r.height) * SIZE);
    if (row < 0 || col < 0 || row >= SIZE || col >= SIZE) return null;
    return [row, col];
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const cell = cellFromEvent(e);
    if (cell) tryMoveTo(cell[0], cell[1]);
  };

  const remaining = spec.collectItemIds.length - collected.size;

  return (
    <>
      <div className="game-prompt">
        {allCollected
          ? 'Şimdi sandığa git!'
          : `Harfleri topla! Kalan: ${remaining}`}
      </div>
      <div
        className="maze-grid"
        ref={gridRef}
        style={{ gridTemplateColumns: `repeat(${SIZE}, 1fr)` }}
        onPointerMove={onPointerMove}
        onPointerUp={() => setDragging(false)}
        onPointerLeave={() => setDragging(false)}
      >
        {GRID.flatMap((rowArr, row) =>
          rowArr.map((cellType, col) => {
            const key = `${row}-${col}`;
            const letter = letterAt.get(key);
            const isPlayer = pos[0] === row && pos[1] === col;
            const isChest = row === SIZE - 1 && col === SIZE - 1;
            return (
              <div
                key={key}
                className={`maze-cell ${cellType === 1 ? 'wall' : 'path'}`}
                onPointerDown={() => {
                  if (isPlayer) setDragging(true);
                  else tryMoveTo(row, col);
                }}
              >
                {isChest && !isPlayer && (
                  <span className={chestWiggle ? 'wiggle' : ''} style={{ width: '85%' }}>
                    <Illustration id="treasure" />
                  </span>
                )}
                {letter && !isPlayer && !isChest && (
                  <span className={`m-glyph ${collected.has(key) ? 'collected' : ''}`}>
                    {getItem(letter.itemId).glyph}
                  </span>
                )}
                {isPlayer && (
                  <span style={{ width: '92%', touchAction: 'none' }}>
                    <Illustration id="turtle" label="Selim" />
                  </span>
                )}
              </div>
            );
          }),
        )}
      </div>
      <p style={{ fontWeight: 700, opacity: 0.7, margin: 0 }}>
        Selim&apos;i sürükle ya da yanındaki kareye dokun.
      </p>
    </>
  );
}
