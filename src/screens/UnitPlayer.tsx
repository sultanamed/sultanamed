import { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { getIsland, getUnit } from '../content/registry';
import { useProgress } from '../state/ProgressProvider';
import { PageShell } from '../components/PageShell';
import { IconArrowLeft, IconArrowRight } from '../components/icons';
import { sfx, stopSpeaking } from '../audio/AudioService';
import { LetterIntroPage } from '../pages/LetterIntroPage';
import { LetterFormsPage } from '../pages/LetterFormsPage';
import { ItemIntroPage } from '../pages/ItemIntroPage';
import { GalleryPage } from '../pages/GalleryPage';
import { CountingPage } from '../pages/CountingPage';
import { DialoguePage } from '../pages/DialoguePage';
import { GameHost } from '../games/GameHost';
import type { PageSpec } from '../content/types';

function renderPage(page: PageSpec) {
  switch (page.type) {
    case 'letter-intro':
      return <LetterIntroPage itemId={page.itemId} />;
    case 'letter-forms':
      return <LetterFormsPage itemIds={page.itemIds} />;
    case 'item-intro':
      return <ItemIntroPage itemId={page.itemId} />;
    case 'gallery':
      return <GalleryPage title={page.title} itemIds={page.itemIds} />;
    case 'counting':
      return <CountingPage itemId={page.itemId} countOf={page.countOf} />;
    case 'dialogue':
      return <DialoguePage title={page.title} lines={page.lines} />;
  }
}

export function UnitPlayer() {
  const { islandId, unitId } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { reachStep } = useProgress();

  const unit = unitId ? getUnit(unitId) : undefined;
  const island = islandId ? getIsland(islandId) : undefined;

  const totalSteps = (unit?.pages.length ?? 0) + 1; // + oyun
  const rawStep = Number(searchParams.get('step') ?? 0);
  const step = Number.isFinite(rawStep) ? Math.min(Math.max(rawStep, 0), totalSteps - 1) : 0;
  const isGame = unit ? step === unit.pages.length : false;

  useEffect(() => {
    if (unitId) reachStep(unitId, step);
    stopSpeaking();
  }, [unitId, step, reachStep]);

  if (!unit || !island) {
    return null;
  }

  const goTo = (next: number) => {
    sfx('tap');
    setSearchParams({ step: String(next) }, { replace: false });
  };

  return (
    <PageShell
      title={unit.title}
      backTo={`/ada/${island.id}`}
      topRight={
        <span className="progress-dots" aria-label={`${step + 1} / ${totalSteps}`}>
          {Array.from({ length: totalSteps }, (_, i) => (
            <span
              key={i}
              className={`dot ${i === totalSteps - 1 ? 'game' : ''} ${i < step ? 'done' : ''} ${i === step ? 'now' : ''}`}
            />
          ))}
        </span>
      }
    >
      {isGame ? (
        <GameHost
          unit={unit}
          onExit={() => navigate(`/ada/${island.id}`)}
        />
      ) : (
        <>
          {renderPage(unit.pages[step])}
          <div className="unit-nav">
            <button
              type="button"
              className="round-btn"
              onClick={() => (step === 0 ? navigate(`/ada/${island.id}`) : goTo(step - 1))}
              aria-label="Önceki"
            >
              <IconArrowLeft size={28} />
            </button>
            <button type="button" className="big-btn coral" onClick={() => goTo(step + 1)}>
              {step + 1 === unit.pages.length ? 'Oyuna Geç!' : 'Devam'}
              <IconArrowRight size={26} />
            </button>
          </div>
        </>
      )}
    </PageShell>
  );
}
