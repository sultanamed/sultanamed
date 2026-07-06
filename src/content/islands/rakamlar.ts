import type { ContentItem, Unit } from '../types';

const num = (n: number, glyph: string, ar: string, translit: string, tr: string): ContentItem => ({
  id: `num-${n}`,
  kind: 'number',
  ar,
  tr,
  translit,
  glyph,
  value: n,
});

export const rakamlarItems: ContentItem[] = [
  num(1, '١', 'وَاحِد', 'vâhid', 'Bir'),
  num(2, '٢', 'اِثْنَان', 'isnân', 'İki'),
  num(3, '٣', 'ثَلَاثَة', 'selâse', 'Üç'),
  num(4, '٤', 'أَرْبَعَة', 'erbaa', 'Dört'),
  num(5, '٥', 'خَمْسَة', 'hamse', 'Beş'),
  num(6, '٦', 'سِتَّة', 'sitte', 'Altı'),
  num(7, '٧', 'سَبْعَة', "seb'a", 'Yedi'),
  num(8, '٨', 'ثَمَانِيَة', 'semâniye', 'Sekiz'),
  num(9, '٩', 'تِسْعَة', "tis'a", 'Dokuz'),
  num(10, '١٠', 'عَشَرَة', 'aşera', 'On'),
];

const R1 = ['num-1', 'num-2', 'num-3', 'num-4', 'num-5'];
const R2 = ['num-6', 'num-7', 'num-8', 'num-9', 'num-10'];
const ALL = [...R1, ...R2];

export const rakamlarUnits: Unit[] = [
  {
    id: 'rakamlar-1',
    islandId: 'rakamlar',
    title: "1'den 5'e",
    subtitle: '1. Durak',
    itemIds: R1,
    pages: [
      { type: 'counting', itemId: 'num-1', countOf: 'fish' },
      { type: 'counting', itemId: 'num-2', countOf: 'apple' },
      { type: 'counting', itemId: 'num-3', countOf: 'star' },
      { type: 'counting', itemId: 'num-4', countOf: 'seashell' },
      { type: 'counting', itemId: 'num-5', countOf: 'balloon' },
      { type: 'gallery', title: 'Tekrar Edelim!', itemIds: R1 },
    ],
    game: {
      engine: 'balloon-pop',
      rounds: R1.map((id) => ({ targetItemId: id, poolItemIds: R1 })),
    },
    worksheets: [
      { type: 'tracing', title: 'Rakamları Çizelim', itemIds: R1 },
      {
        type: 'counting',
        title: 'Sayalım ve Yuvarlak İçine Alalım',
        rows: [
          { itemId: 'num-2', illustration: 'fish', count: 2 },
          { itemId: 'num-3', illustration: 'apple', count: 3 },
          { itemId: 'num-5', illustration: 'star', count: 5 },
        ],
      },
    ],
  },
  {
    id: 'rakamlar-2',
    islandId: 'rakamlar',
    title: "6'dan 10'a",
    subtitle: '2. Durak',
    itemIds: R2,
    pages: [
      { type: 'counting', itemId: 'num-6', countOf: 'fish' },
      { type: 'counting', itemId: 'num-7', countOf: 'apple' },
      { type: 'counting', itemId: 'num-8', countOf: 'star' },
      { type: 'counting', itemId: 'num-9', countOf: 'balloon' },
      { type: 'counting', itemId: 'num-10', countOf: 'seashell' },
      { type: 'gallery', title: 'Tekrar Edelim!', itemIds: R2 },
    ],
    game: {
      engine: 'memory-match',
      pairs: [
        { a: { show: 'glyph', itemId: 'num-6' }, b: { show: 'countGroup', itemId: 'num-6', illustration: 'fish', count: 6 } },
        { a: { show: 'glyph', itemId: 'num-7' }, b: { show: 'countGroup', itemId: 'num-7', illustration: 'apple', count: 7 } },
        { a: { show: 'glyph', itemId: 'num-8' }, b: { show: 'countGroup', itemId: 'num-8', illustration: 'star', count: 8 } },
        { a: { show: 'glyph', itemId: 'num-9' }, b: { show: 'countGroup', itemId: 'num-9', illustration: 'balloon', count: 9 } },
      ],
    },
    worksheets: [
      { type: 'tracing', title: 'Rakamları Çizelim', itemIds: R2 },
      {
        type: 'counting',
        title: 'Sayalım ve Yuvarlak İçine Alalım',
        rows: [
          { itemId: 'num-6', illustration: 'seashell', count: 6 },
          { itemId: 'num-8', illustration: 'fish', count: 8 },
          { itemId: 'num-10', illustration: 'star', count: 10 },
        ],
      },
    ],
  },
  {
    id: 'rakamlar-3',
    islandId: 'rakamlar',
    title: 'Sayalım!',
    subtitle: '3. Durak',
    itemIds: ALL,
    pages: [
      { type: 'gallery', title: "1'den 10'a Sayalım", itemIds: ALL },
      { type: 'counting', itemId: 'num-7', countOf: 'balloon' },
      { type: 'counting', itemId: 'num-9', countOf: 'star' },
    ],
    game: {
      engine: 'drag-match',
      pairs: [
        { drag: { show: 'glyph', itemId: 'num-2' }, target: { show: 'countGroup', itemId: 'num-2', illustration: 'apple', count: 2 } },
        { drag: { show: 'glyph', itemId: 'num-4' }, target: { show: 'countGroup', itemId: 'num-4', illustration: 'fish', count: 4 } },
        { drag: { show: 'glyph', itemId: 'num-5' }, target: { show: 'countGroup', itemId: 'num-5', illustration: 'star', count: 5 } },
        { drag: { show: 'glyph', itemId: 'num-3' }, target: { show: 'countGroup', itemId: 'num-3', illustration: 'seashell', count: 3 } },
      ],
    },
    worksheets: [
      {
        type: 'counting',
        title: 'Say ve Rakamla Eşleştir',
        rows: [
          { itemId: 'num-4', illustration: 'balloon', count: 4 },
          { itemId: 'num-7', illustration: 'seashell', count: 7 },
          { itemId: 'num-9', illustration: 'apple', count: 9 },
        ],
      },
      {
        type: 'matching',
        title: 'Rakamları Eşleştirelim',
        pairs: [
          { left: { show: 'glyph', itemId: 'num-1' }, right: { show: 'trWord', itemId: 'num-1' } },
          { left: { show: 'glyph', itemId: 'num-3' }, right: { show: 'trWord', itemId: 'num-3' } },
          { left: { show: 'glyph', itemId: 'num-6' }, right: { show: 'trWord', itemId: 'num-6' } },
          { left: { show: 'glyph', itemId: 'num-10' }, right: { show: 'trWord', itemId: 'num-10' } },
        ],
      },
    ],
  },
];
