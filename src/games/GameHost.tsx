import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Unit } from '../content/types';
import { useProgress } from '../state/ProgressProvider';
import { sfx } from '../audio/AudioService';
import { IconStar } from '../components/icons';
import { Illustration } from '../illustrations/Illustration';
import { MemoryMatch } from './engines/MemoryMatch';
import { BalloonPop } from './engines/BalloonPop';
import { DragMatch } from './engines/DragMatch';
import { Jigsaw } from './engines/Jigsaw';
import { MazeCollect } from './engines/MazeCollect';
import { ListenFind } from './engines/ListenFind';

const CONFETTI_COLORS = ['#FF7B6B', '#2EC4B6', '#FFC53D', '#7BC950', '#9B72CF', '#66B3E8'];

function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.6,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      })),
    [],
  );
  return (
    <>
      {pieces.map((p, i) => (
        <span
          key={i}
          className="confetti-piece"
          style={{ left: `${p.left}vw`, background: p.color, animationDelay: `${p.delay}s` }}
        />
      ))}
    </>
  );
}

export function GameHost({ unit, onExit }: { unit: Unit; onExit: () => void }) {
  const [won, setWon] = useState(false);
  const { completeUnit } = useProgress();
  const navigate = useNavigate();

  const handleWin = useCallback(() => {
    setWon(true);
    sfx('win');
    completeUnit(unit.id, 3);
  }, [completeUnit, unit.id]);

  const game = unit.game;

  return (
    <div className="game-frame">
      {game.engine === 'memory-match' && <MemoryMatch spec={game} onWin={handleWin} />}
      {game.engine === 'balloon-pop' && <BalloonPop spec={game} onWin={handleWin} />}
      {game.engine === 'drag-match' && <DragMatch spec={game} onWin={handleWin} />}
      {game.engine === 'jigsaw' && <Jigsaw spec={game} onWin={handleWin} />}
      {game.engine === 'maze-collect' && <MazeCollect spec={game} onWin={handleWin} />}
      {game.engine === 'listen-find' && <ListenFind spec={game} onWin={handleWin} />}

      {won && (
        <>
          <Confetti />
          <div className="win-overlay">
            <div className="win-card pop-in">
              <span style={{ width: 110 }}>
                <Illustration id="treasure" />
              </span>
              <h2 className="win-title">Aferin Sana!</h2>
              <div className="win-stars">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="pop-in" style={{ animationDelay: `${0.3 + i * 0.25}s` }}>
                    <IconStar size={52} />
                  </span>
                ))}
              </div>
              <p style={{ margin: 0, fontWeight: 700 }}>Bu durağı tamamladın!</p>
              <button type="button" className="big-btn" onClick={onExit}>
                Adaya Dön
              </button>
              <button
                type="button"
                className="big-btn grape"
                onClick={() => navigate('/')}
              >
                Haritaya Git
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
