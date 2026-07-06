import type { ContentItem, Unit } from '../types';

export const sekillerItems: ContentItem[] = [
  { id: 'shape-daire', kind: 'shape', ar: 'دَائِرَة', tr: 'Daire', translit: 'dâira', illustration: 'shape-circle' },
  { id: 'shape-kare', kind: 'shape', ar: 'مُرَبَّع', tr: 'Kare', translit: 'murabba', illustration: 'shape-square' },
  { id: 'shape-ucgen', kind: 'shape', ar: 'مُثَلَّث', tr: 'Üçgen', translit: 'musellas', illustration: 'shape-triangle' },
  { id: 'shape-dikdortgen', kind: 'shape', ar: 'مُسْتَطِيل', tr: 'Dikdörtgen', translit: 'mustatîl', illustration: 'shape-rectangle' },
  { id: 'shape-yildiz', kind: 'shape', ar: 'نَجْمَة', tr: 'Yıldız', translit: 'necme', illustration: 'shape-star' },
  { id: 'shape-hilal', kind: 'shape', ar: 'هِلَال', tr: 'Hilal', translit: 'hilâl', illustration: 'shape-crescent' },
  { id: 'shape-kalp', kind: 'shape', ar: 'قَلْب', tr: 'Kalp', translit: 'kalb', illustration: 'shape-heart' },
  { id: 'shape-oval', kind: 'shape', ar: 'بَيْضَوِيّ', tr: 'Oval', translit: 'baydavî', illustration: 'shape-oval' },
];

const S1 = ['shape-daire', 'shape-kare', 'shape-ucgen', 'shape-dikdortgen'];
const S2 = ['shape-yildiz', 'shape-hilal', 'shape-kalp', 'shape-oval'];

export const sekillerUnits: Unit[] = [
  {
    id: 'sekiller-1',
    islandId: 'sekiller',
    title: 'Temel Şekiller',
    subtitle: '1. Durak',
    itemIds: S1,
    pages: [
      ...S1.map((itemId) => ({ type: 'item-intro' as const, itemId })),
      { type: 'gallery', title: 'Tekrar Edelim!', itemIds: S1 },
    ],
    game: {
      engine: 'drag-match',
      pairs: S1.map((id) => ({
        drag: { show: 'illustration' as const, itemId: id },
        target: { show: 'trWord' as const, itemId: id },
      })),
    },
    worksheets: [
      {
        type: 'coloring',
        title: 'Şekilleri Boyayalım',
        figures: [
          { illustration: 'shape-circle', itemId: 'shape-daire' },
          { illustration: 'shape-square', itemId: 'shape-kare' },
        ],
      },
      {
        type: 'matching',
        title: 'Şekilleri Eşleştirelim',
        pairs: S1.map((id) => ({
          left: { show: 'illustration' as const, itemId: id },
          right: { show: 'trWord' as const, itemId: id },
        })),
      },
    ],
  },
  {
    id: 'sekiller-2',
    islandId: 'sekiller',
    title: 'Eğlenceli Şekiller',
    subtitle: '2. Durak',
    itemIds: S2,
    pages: [
      ...S2.map((itemId) => ({ type: 'item-intro' as const, itemId })),
      // Dünyadaki şekiller: güneş=daire, kitap=dikdörtgen, ay=hilal, yıldız
      { type: 'gallery', title: 'Dünyadaki Şekiller', itemIds: ['letter-shin', 'letter-kef', 'letter-he', 'letter-nun'] },
      { type: 'gallery', title: 'Tekrar Edelim!', itemIds: S2 },
    ],
    game: { engine: 'jigsaw', illustration: 'star', pieces: 6, revealItemId: 'shape-yildiz' },
    worksheets: [
      {
        type: 'coloring',
        title: 'Şekilleri Boyayalım',
        figures: [
          { illustration: 'shape-star', itemId: 'shape-yildiz' },
          { illustration: 'shape-heart', itemId: 'shape-kalp' },
        ],
      },
      {
        type: 'matching',
        title: 'Şekilleri Eşleştirelim',
        pairs: S2.map((id) => ({
          left: { show: 'illustration' as const, itemId: id },
          right: { show: 'trWord' as const, itemId: id },
        })),
      },
    ],
  },
];
