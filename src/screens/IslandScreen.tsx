import { useNavigate, useParams } from 'react-router-dom';
import { getIsland, getUnit } from '../content/registry';
import { useProgress } from '../state/ProgressProvider';
import { PageShell } from '../components/PageShell';
import { IconLock, IconStar } from '../components/icons';
import { Illustration } from '../illustrations/Illustration';
import { sfx } from '../audio/AudioService';

export function IslandScreen() {
  const { islandId } = useParams();
  const navigate = useNavigate();
  const { isUnitUnlocked, unitStars } = useProgress();

  const island = islandId ? getIsland(islandId) : undefined;
  if (!island) {
    navigate('/');
    return null;
  }

  return (
    <PageShell title={island.title} backTo="/">
      <div style={{ width: 120, marginBottom: 4 }}>
        <Illustration id={island.illustration} />
      </div>
      <div className="unit-path">
        {island.unitIds.map((unitId, i) => {
          const unit = getUnit(unitId);
          if (!unit) return null;
          const unlocked = isUnitUnlocked(unitId);
          const stars = unitStars(unitId);
          return (
            <button
              key={unitId}
              type="button"
              className="unit-node"
              disabled={!unlocked}
              onClick={() => {
                sfx('tap');
                navigate(`/ada/${island.id}/unite/${unitId}`);
              }}
            >
              <span className="unit-node-badge" style={{ background: island.color }}>
                {unlocked ? i + 1 : <IconLock size={26} />}
              </span>
              <span className="unit-node-info">
                <span className="unit-node-title">{unit.title}</span>
                <br />
                <span className="unit-node-sub">{unlocked ? unit.subtitle : 'Önce önceki durağı bitir'}</span>
              </span>
              <span className="unit-node-stars" aria-label={stars ? `${stars} yıldız` : 'Henüz oynanmadı'}>
                {[1, 2, 3].map((s) => (
                  <span key={s} className={s <= stars ? '' : 'empty'}>
                    <IconStar size={22} filled={s <= stars} />
                  </span>
                ))}
              </span>
            </button>
          );
        })}
      </div>
    </PageShell>
  );
}
