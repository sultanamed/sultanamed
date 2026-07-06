import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { getUnit, previousUnitId } from '../content/registry';

const STORAGE_KEY = 'arapca-adasi:v1';

export type Stars = 1 | 2 | 3;

interface ProgressState {
  version: 1;
  completedUnits: Record<string, { stars: Stars; completedAt: string }>;
  /** unitId → ulaşılan en ileri adım */
  visitedPages: Record<string, number>;
  settings: { soundOn: boolean };
}

const emptyState: ProgressState = {
  version: 1,
  completedUnits: {},
  visitedPages: {},
  settings: { soundOn: true },
};

function loadState(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState;
    const parsed = JSON.parse(raw) as ProgressState;
    if (parsed.version !== 1) return emptyState;
    return { ...emptyState, ...parsed, settings: { ...emptyState.settings, ...parsed.settings } };
  } catch {
    return emptyState;
  }
}

interface ProgressApi {
  state: ProgressState;
  isUnitUnlocked: (unitId: string) => boolean;
  unitStars: (unitId: string) => Stars | 0;
  completeUnit: (unitId: string, stars: Stars) => void;
  reachStep: (unitId: string, step: number) => void;
  furthestStep: (unitId: string) => number;
  toggleSound: () => void;
  resetAll: () => void;
}

const ProgressContext = createContext<ProgressApi | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(loadState);

  const update = useCallback((updater: (prev: ProgressState) => ProgressState) => {
    setState((prev) => {
      const next = updater(prev);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* depolama kapalıysa sessizce devam et */
      }
      return next;
    });
  }, []);

  const api = useMemo<ProgressApi>(
    () => ({
      state,
      // Nazik kilit: her adanın ilk ünitesi açık; sonrakiler bir önceki bitince açılır.
      isUnitUnlocked: (unitId) => {
        const unit = getUnit(unitId);
        if (!unit) return false;
        const prev = previousUnitId(unit);
        return !prev || Boolean(state.completedUnits[prev]);
      },
      unitStars: (unitId) => state.completedUnits[unitId]?.stars ?? 0,
      completeUnit: (unitId, stars) =>
        update((prev) => {
          const existing = prev.completedUnits[unitId];
          const best = existing && existing.stars > stars ? existing.stars : stars;
          return {
            ...prev,
            completedUnits: {
              ...prev.completedUnits,
              [unitId]: { stars: best, completedAt: new Date().toISOString() },
            },
          };
        }),
      reachStep: (unitId, step) =>
        update((prev) =>
          (prev.visitedPages[unitId] ?? 0) >= step
            ? prev
            : { ...prev, visitedPages: { ...prev.visitedPages, [unitId]: step } },
        ),
      furthestStep: (unitId) => state.visitedPages[unitId] ?? 0,
      toggleSound: () =>
        update((prev) => ({ ...prev, settings: { ...prev.settings, soundOn: !prev.settings.soundOn } })),
      resetAll: () => update(() => emptyState),
    }),
    [state, update],
  );

  return <ProgressContext.Provider value={api}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressApi {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress, ProgressProvider içinde kullanılmalı');
  return ctx;
}
