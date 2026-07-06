import { getItem } from '../content/registry';
import { Illustration } from '../illustrations/Illustration';
import { speak, sfx } from '../audio/AudioService';

interface Line {
  speaker: 'parrot' | 'turtle';
  itemId: string;
}

/** Maskotların konuşma balonlu diyaloğu — balona dokun, dinle */
export function DialoguePage({ title, lines }: { title: string; lines: Line[] }) {
  const playAll = async () => {
    for (const line of lines) {
      await speak(getItem(line.itemId), 'ar');
    }
  };

  return (
    <div className="lesson-card pop-in">
      <h2 style={{ margin: 0 }}>{title}</h2>
      <p style={{ margin: 0, opacity: 0.7, fontWeight: 700 }}>Balonlara dokun, dinle!</p>
      <div className="dialogue-stage">
        {lines.map((line, i) => {
          const item = getItem(line.itemId);
          return (
            <div key={i} className={`dialogue-line ${line.speaker}`}>
              <span className="dialogue-avatar">
                <Illustration id={line.speaker} label={line.speaker === 'parrot' ? 'Cevval' : 'Selim'} />
              </span>
              <button
                type="button"
                className="speech-bubble"
                onClick={() => {
                  sfx('tap');
                  void speak(item, 'ar');
                }}
              >
                <span className="bubble-ar">{item.ar}</span>
                <span className="bubble-tr">{item.tr}</span>
              </button>
            </div>
          );
        })}
      </div>
      <button type="button" className="big-btn" onClick={() => void playAll()}>
        Hepsini Dinle
      </button>
    </div>
  );
}
