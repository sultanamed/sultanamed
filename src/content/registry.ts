import type { ContentItem, Island, Unit } from './types';
import { alfabeItems, alfabeUnits } from './islands/alfabe';
import { sekillerItems, sekillerUnits } from './islands/sekiller';
import { rakamlarItems, rakamlarUnits } from './islands/rakamlar';
import { kaliplarItems, kaliplarUnits } from './islands/kaliplar';

export const ITEMS: ContentItem[] = [...alfabeItems, ...sekillerItems, ...rakamlarItems, ...kaliplarItems];
export const UNITS: Unit[] = [...alfabeUnits, ...sekillerUnits, ...rakamlarUnits, ...kaliplarUnits];

export const ISLANDS: Island[] = [
  {
    id: 'alfabe',
    title: 'Alfabe Adası',
    tagline: 'Harfleri keşfet!',
    color: 'var(--coral)',
    illustration: 'island-alfabe',
    unitIds: alfabeUnits.map((u) => u.id),
  },
  {
    id: 'sekiller',
    title: 'Şekiller Adası',
    tagline: 'Şekilleri tanı!',
    color: 'var(--teal)',
    illustration: 'island-sekiller',
    unitIds: sekillerUnits.map((u) => u.id),
  },
  {
    id: 'rakamlar',
    title: 'Rakamlar Adası',
    tagline: 'Birlikte sayalım!',
    color: 'var(--sun)',
    illustration: 'island-rakamlar',
    unitIds: rakamlarUnits.map((u) => u.id),
  },
  {
    id: 'kaliplar',
    title: 'Kalıplar Adası',
    tagline: 'Konuşmaya başla!',
    color: 'var(--grape)',
    illustration: 'island-kaliplar',
    unitIds: kaliplarUnits.map((u) => u.id),
  },
];

const itemMap = new Map(ITEMS.map((i) => [i.id, i]));
const unitMap = new Map(UNITS.map((u) => [u.id, u]));
const islandMap = new Map<string, Island>(ISLANDS.map((i) => [i.id, i]));

export function getItem(id: string): ContentItem {
  const item = itemMap.get(id);
  if (!item) throw new Error(`Bilinmeyen içerik öğesi: ${id}`);
  return item;
}

export function getUnit(id: string): Unit | undefined {
  return unitMap.get(id);
}

export function getIsland(id: string): Island | undefined {
  return islandMap.get(id);
}

/** Aynı adadaki bir önceki ünite (kilit kuralı için) */
export function previousUnitId(unit: Unit): string | undefined {
  const island = islandMap.get(unit.islandId);
  if (!island) return undefined;
  const idx = island.unitIds.indexOf(unit.id);
  return idx > 0 ? island.unitIds[idx - 1] : undefined;
}

/* Geliştirme sırasında kırık id'leri erken yakala */
if (import.meta.env.DEV) {
  if (itemMap.size !== ITEMS.length) throw new Error('İçerikte yinelenen öğe id’si var');
  const faces: string[] = [];
  for (const unit of UNITS) {
    unit.itemIds.forEach((id) => getItem(id));
    for (const page of unit.pages) {
      if ('itemId' in page) getItem(page.itemId);
      if ('itemIds' in page) page.itemIds.forEach((id) => getItem(id));
      if (page.type === 'dialogue') page.lines.forEach((l) => getItem(l.itemId));
    }
    const g = unit.game;
    if (g.engine === 'memory-match') g.pairs.forEach((p) => faces.push(p.a.itemId, p.b.itemId));
    if (g.engine === 'balloon-pop') g.rounds.forEach((r) => faces.push(r.targetItemId, ...r.poolItemIds));
    if (g.engine === 'drag-match') g.pairs.forEach((p) => faces.push(p.drag.itemId, p.target.itemId));
    if (g.engine === 'jigsaw') faces.push(g.revealItemId);
    if (g.engine === 'maze-collect') faces.push(...g.collectItemIds, ...g.decoyItemIds);
    if (g.engine === 'listen-find') g.rounds.forEach((r) => faces.push(r.promptItemId, ...r.choiceItemIds));
    for (const ws of unit.worksheets) {
      if (ws.type === 'tracing') ws.itemIds.forEach((id) => getItem(id));
      if (ws.type === 'coloring') ws.figures.forEach((fig) => fig.itemId && getItem(fig.itemId));
      if (ws.type === 'matching') ws.pairs.forEach((p) => faces.push(p.left.itemId, p.right.itemId));
      if (ws.type === 'counting') ws.rows.forEach((r) => getItem(r.itemId));
    }
  }
  faces.forEach((id) => getItem(id));
}
