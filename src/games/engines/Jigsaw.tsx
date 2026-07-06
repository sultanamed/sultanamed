import { useEffect, useRef, useState, type PointerEvent } from 'react';
import type { GameSpec } from '../../content/types';
import { getItem } from '../../content/registry';
import { speak, sfx } from '../../audio/AudioService';
import { Illustration } from '../../illustrations/Illustration';

type Spec = Extract<GameSpec, { engine: 'jigsaw' }>;

interface PieceState {
  index: number;
  x: number;
  y: number;
  locked: boolean;
}

export function Jigsaw({ spec, onWin }: { spec: Spec; onWin: () => void }) {
  const cols = spec.pieces === 4 ? 2 : 3;
  const rows = spec.pieces === 4 ? 2 : spec.pieces === 6 ? 2 : 3;
  const total = cols * rows;
  const reveal = getItem(spec.revealItemId);

  const containerRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const [pieces, setPieces] = useState<PieceState[] | null>(null);
  const [drag, setDrag] = useState<{ index: number; ox: number; oy: number } | null>(null);
  const [boardSize, setBoardSize] = useState(0);

  // Yerleşim: tahta ölçülür, parçalar alttaki tepsiye rastgele dağıtılır
  useEffect(() => {
    const container = containerRef.current;
    const board = boardRef.current;
    if (!container || !board) return;
    const measure = () => {
      const b = board.getBoundingClientRect();
      const c = container.getBoundingClientRect();
      setBoardSize(b.width);
      const trayTop = b.bottom - c.top + 12;
      setPieces((prev) => {
        if (prev) return prev; // sadece ilk ölçümde dağıt
        return Array.from({ length: total }, (_, index) => ({
          index,
          x: Math.random() * Math.max(c.width - b.width / cols, 40),
          y: trayTop + Math.random() * 40,
          locked: false,
        }));
      });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [total, cols]);

  const cell = boardSize / cols;
  const cellH = boardSize / rows;

  const homePos = (index: number) => {
    const container = containerRef.current!;
    const board = boardRef.current!;
    const b = board.getBoundingClientRect();
    const c = container.getBoundingClientRect();
    const col = index % cols;
    const row = Math.floor(index / cols);
    return { x: b.left - c.left + col * cell, y: b.top - c.top + row * cellH };
  };

  const onDown = (e: PointerEvent<HTMLDivElement>, index: number) => {
    const piece = pieces?.find((p) => p.index === index);
    if (!piece || piece.locked) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setDrag({ index, ox: e.clientX - piece.x, oy: e.clientY - piece.y });
  };

  const onMove = (e: PointerEvent<HTMLDivElement>, index: number) => {
    if (!drag || drag.index !== index) return;
    setPieces(
      (prev) =>
        prev?.map((p) => (p.index === index ? { ...p, x: e.clientX - drag.ox, y: e.clientY - drag.oy } : p)) ?? null,
    );
  };

  const onUp = (index: number) => {
    if (!drag || drag.index !== index) return;
    setDrag(null);
    setPieces((prev) => {
      if (!prev) return prev;
      const piece = prev.find((p) => p.index === index)!;
      const home = homePos(index);
      const near = Math.abs(piece.x - home.x) < 28 && Math.abs(piece.y - home.y) < 28;
      if (!near) return prev;
      sfx('correct');
      const next = prev.map((p) => (p.index === index ? { ...p, x: home.x, y: home.y, locked: true } : p));
      if (next.every((p) => p.locked)) {
        window.setTimeout(() => {
          void speak(reveal.exampleWord ?? reveal, 'ar');
          onWin();
        }, 800);
      }
      return next;
    });
  };

  return (
    <>
      <div className="game-prompt">Yap-Bozu Tamamla!</div>
      <div ref={containerRef} style={{ position: 'relative', width: '100%', flex: 1, minHeight: 480 }}>
        <div className="jigsaw-board" ref={boardRef} style={{ margin: '0 auto' }}>
          {/* Soluk rehber görüntü */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.2 }}>
            <Illustration id={spec.illustration} />
          </div>
        </div>
        {pieces?.map((p) => (
          <div
            key={p.index}
            className={`jigsaw-piece ${p.locked ? 'locked' : ''}`}
            style={{
              left: p.x,
              top: p.y,
              width: cell,
              height: cellH,
              overflow: 'hidden',
              borderRadius: p.locked ? 0 : 8,
              boxShadow: p.locked ? 'none' : 'var(--shadow)',
              background: 'var(--white)',
              zIndex: drag?.index === p.index ? 20 : p.locked ? 1 : 10,
            }}
            onPointerDown={(e) => onDown(e, p.index)}
            onPointerMove={(e) => onMove(e, p.index)}
            onPointerUp={() => onUp(p.index)}
            onPointerCancel={() => setDrag(null)}
          >
            <div
              style={{
                width: boardSize,
                height: boardSize,
                transform: `translate(${-(p.index % cols) * cell}px, ${-Math.floor(p.index / cols) * cellH}px)`,
              }}
            >
              <Illustration id={spec.illustration} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
