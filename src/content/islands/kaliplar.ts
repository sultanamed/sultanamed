import type { ContentItem, Unit } from '../types';

const phrase = (id: string, ar: string, translit: string, tr: string): ContentItem => ({
  id: `phrase-${id}`,
  kind: 'phrase',
  ar,
  tr,
  translit,
});

export const kaliplarItems: ContentItem[] = [
  // K1 — Selamlaşma
  phrase('selam', 'السَّلَامُ عَلَيْكُمْ', 'es-selâmu aleyküm', 'Selam (Allah’ın selamı üzerine olsun)'),
  phrase('vealeykum', 'وَعَلَيْكُمُ السَّلَامُ', 've aleykümü’s-selâm', 'Sana da selam olsun'),
  phrase('gunaydin', 'صَبَاحُ الْخَيْرِ', 'sabâhu’l-hayr', 'Günaydın'),
  phrase('hoscakal', 'مَعَ السَّلَامَةِ', 'mea’s-selâme', 'Hoşça kal'),
  // K2 — Tanışma
  phrase('adin-ne', 'مَا اسْمُكَ؟', 'me’smuke?', 'Adın ne?'),
  phrase('benim-adim', 'اِسْمِي أَحْمَد', 'ismî Ahmed', 'Benim adım Ahmed'),
  phrase('nasilsin', 'كَيْفَ حَالُكَ؟', 'keyfe hâluke?', 'Nasılsın?'),
  phrase('iyiyim', 'أَنَا بِخَيْرٍ', 'ene bi-hayr', 'İyiyim'),
  // K3 — Nezaket
  phrase('tesekkur', 'شُكْرًا', 'şükran', 'Teşekkür ederim'),
  phrase('ricaederim', 'عَفْوًا', 'afven', 'Rica ederim'),
  phrase('lutfen', 'مِنْ فَضْلِكَ', 'min fadlike', 'Lütfen'),
  phrase('ozur', 'آسِف', 'âsif', 'Özür dilerim'),
  phrase('evet', 'نَعَمْ', 'na’am', 'Evet'),
  phrase('hayir', 'لَا', 'lâ', 'Hayır'),
  // K4 — Güzel Sözler
  phrase('bismillah', 'بِسْمِ اللهِ', 'bismillâh', 'Allah’ın adıyla'),
  phrase('elhamdulillah', 'اَلْحَمْدُ لِلَّهِ', 'elhamdülillâh', 'Allah’a hamd olsun'),
  phrase('masallah', 'مَا شَاءَ اللهُ', 'mâşâallah', 'Allah dilemiş (ne güzel!)'),
  phrase('insallah', 'إِنْ شَاءَ اللهُ', 'inşâallah', 'Allah dilerse'),
];

const K1 = ['phrase-selam', 'phrase-vealeykum', 'phrase-gunaydin', 'phrase-hoscakal'];
const K2 = ['phrase-adin-ne', 'phrase-benim-adim', 'phrase-nasilsin', 'phrase-iyiyim'];
const K3 = ['phrase-tesekkur', 'phrase-ricaederim', 'phrase-lutfen', 'phrase-ozur', 'phrase-evet', 'phrase-hayir'];
const K4 = ['phrase-bismillah', 'phrase-elhamdulillah', 'phrase-masallah', 'phrase-insallah'];

const matchingArTr = (ids: string[]) =>
  ids.map((id) => ({
    left: { show: 'arWord' as const, itemId: id },
    right: { show: 'trWord' as const, itemId: id },
  }));

export const kaliplarUnits: Unit[] = [
  {
    id: 'kaliplar-1',
    islandId: 'kaliplar',
    title: 'Selamlaşma',
    subtitle: '1. Durak',
    itemIds: K1,
    pages: [
      ...K1.map((itemId) => ({ type: 'item-intro' as const, itemId })),
      {
        type: 'dialogue',
        title: 'Cevval ile Selim Selamlaşıyor',
        lines: [
          { speaker: 'parrot', itemId: 'phrase-selam' },
          { speaker: 'turtle', itemId: 'phrase-vealeykum' },
          { speaker: 'parrot', itemId: 'phrase-gunaydin' },
          { speaker: 'turtle', itemId: 'phrase-hoscakal' },
        ],
      },
    ],
    game: {
      engine: 'listen-find',
      rounds: [
        { promptItemId: 'phrase-selam', choiceItemIds: K1.slice(0, 3) },
        { promptItemId: 'phrase-gunaydin', choiceItemIds: ['phrase-gunaydin', 'phrase-hoscakal', 'phrase-selam'] },
        { promptItemId: 'phrase-hoscakal', choiceItemIds: ['phrase-vealeykum', 'phrase-hoscakal', 'phrase-gunaydin'] },
      ],
    },
    worksheets: [{ type: 'matching', title: 'Kalıpları Eşleştirelim', pairs: matchingArTr(K1) }],
  },
  {
    id: 'kaliplar-2',
    islandId: 'kaliplar',
    title: 'Tanışma',
    subtitle: '2. Durak',
    itemIds: K2,
    pages: [
      ...K2.map((itemId) => ({ type: 'item-intro' as const, itemId })),
      {
        type: 'dialogue',
        title: 'Cevval ile Selim Tanışıyor',
        lines: [
          { speaker: 'parrot', itemId: 'phrase-adin-ne' },
          { speaker: 'turtle', itemId: 'phrase-benim-adim' },
          { speaker: 'turtle', itemId: 'phrase-nasilsin' },
          { speaker: 'parrot', itemId: 'phrase-iyiyim' },
        ],
      },
    ],
    game: { engine: 'memory-match', pairs: K2.map((id) => ({ a: { show: 'arWord' as const, itemId: id }, b: { show: 'trWord' as const, itemId: id } })) },
    worksheets: [{ type: 'matching', title: 'Kalıpları Eşleştirelim', pairs: matchingArTr(K2) }],
  },
  {
    id: 'kaliplar-3',
    islandId: 'kaliplar',
    title: 'Nezaket Sözleri',
    subtitle: '3. Durak',
    itemIds: K3,
    pages: [
      ...K3.map((itemId) => ({ type: 'item-intro' as const, itemId })),
      { type: 'gallery', title: 'Tekrar Edelim!', itemIds: K3 },
    ],
    game: {
      engine: 'listen-find',
      rounds: [
        { promptItemId: 'phrase-tesekkur', choiceItemIds: ['phrase-tesekkur', 'phrase-lutfen', 'phrase-evet'] },
        { promptItemId: 'phrase-evet', choiceItemIds: ['phrase-evet', 'phrase-hayir', 'phrase-ozur'] },
        { promptItemId: 'phrase-lutfen', choiceItemIds: ['phrase-ricaederim', 'phrase-lutfen', 'phrase-tesekkur'] },
        { promptItemId: 'phrase-hayir', choiceItemIds: ['phrase-evet', 'phrase-hayir', 'phrase-lutfen'] },
      ],
    },
    worksheets: [{ type: 'matching', title: 'Kalıpları Eşleştirelim', pairs: matchingArTr(K3.slice(0, 4)) }],
  },
  {
    id: 'kaliplar-4',
    islandId: 'kaliplar',
    title: 'Güzel Sözler',
    subtitle: '4. Durak',
    itemIds: K4,
    pages: [
      ...K4.map((itemId) => ({ type: 'item-intro' as const, itemId })),
      { type: 'gallery', title: 'Tekrar Edelim!', itemIds: K4 },
    ],
    game: { engine: 'jigsaw', illustration: 'treasure', pieces: 9, revealItemId: 'phrase-elhamdulillah' },
    worksheets: [{ type: 'matching', title: 'Güzel Sözleri Eşleştirelim', pairs: matchingArTr(K4) }],
  },
];
