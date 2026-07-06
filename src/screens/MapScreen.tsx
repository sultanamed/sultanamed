import { useNavigate } from 'react-router-dom';
import { ISLANDS } from '../content/registry';
import { Illustration } from '../illustrations/Illustration';
import { useProgress } from '../state/ProgressProvider';
import { IconStar } from '../components/icons';
import { sfx } from '../audio/AudioService';

export function MapScreen() {
  const navigate = useNavigate();
  const { unitStars } = useProgress();

  return (
    <div className="map-screen">
      <header className="map-header">
        <h1>Arapça Adası</h1>
        <p>Bir ada seç, maceraya başla!</p>
      </header>
      <div className="map-islands">
        {ISLANDS.map((island) => {
          const done = island.unitIds.filter((id) => unitStars(id) > 0).length;
          return (
            <button
              key={island.id}
              type="button"
              className="island-card"
              onClick={() => {
                sfx('tap');
                navigate(`/ada/${island.id}`);
              }}
            >
              <span className="island-art">
                <Illustration id={island.illustration} label={island.title} />
              </span>
              <span className="island-name" style={{ color: island.color }}>
                {island.title}
              </span>
              <span className="island-tagline">{island.tagline}</span>
              <span className="island-progress" aria-label={`${done} / ${island.unitIds.length} ünite tamamlandı`}>
                {island.unitIds.map((id) => (
                  <IconStar key={id} size={16} filled={unitStars(id) > 0} />
                ))}
              </span>
            </button>
          );
        })}
      </div>
      <span className="map-boat" aria-hidden="true">
        <Illustration id="boat" />
      </span>
      <button
        type="button"
        className="round-btn map-parent-btn"
        onClick={() => navigate('/ebeveyn')}
        aria-label="Ebeveyn köşesi"
      >
        <Illustration id="compass" size={40} />
      </button>
    </div>
  );
}
