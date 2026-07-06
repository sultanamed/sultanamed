import type { IllustrationId } from '../../illustrations';
import type { ContentItem, GameSpec, Unit } from '../types';

const letter = (
  id: string,
  tr: string,
  ar: string,
  forms: [string, string, string, string],
  word: { ar: string; tr: string; translit: string },
  illustration: IllustrationId,
): ContentItem => ({
  id: `letter-${id}`,
  kind: 'letter',
  ar,
  tr,
  glyph: forms[0],
  letterForms: { isolated: forms[0], initial: forms[1], medial: forms[2], final: forms[3] },
  exampleWord: word,
  illustration,
});

export const alfabeItems: ContentItem[] = [
  letter('elif', 'Elif', 'أَلِف', ['ا', 'ا', 'ـا', 'ـا'], { ar: 'أَسَد', tr: 'Aslan', translit: 'esed' }, 'lion'),
  letter('be', 'Be', 'بَاء', ['ب', 'بـ', 'ـبـ', 'ـب'], { ar: 'بَطَّة', tr: 'Ördek', translit: 'batta' }, 'duck'),
  letter('te', 'Te', 'تَاء', ['ت', 'تـ', 'ـتـ', 'ـت'], { ar: 'تُفَّاحَة', tr: 'Elma', translit: 'tuffâha' }, 'apple'),
  letter('se', 'Se', 'ثَاء', ['ث', 'ثـ', 'ـثـ', 'ـث'], { ar: 'ثَعْلَب', tr: 'Tilki', translit: "sa'leb" }, 'fox'),
  letter('cim', 'Cim', 'جِيم', ['ج', 'جـ', 'ـجـ', 'ـج'], { ar: 'جَمَل', tr: 'Deve', translit: 'cemel' }, 'camel'),
  letter('hha', 'Ha', 'حَاء', ['ح', 'حـ', 'ـحـ', 'ـح'], { ar: 'حِصَان', tr: 'At', translit: 'hisân' }, 'horse'),
  letter('hi', 'Hı', 'خَاء', ['خ', 'خـ', 'ـخـ', 'ـخ'], { ar: 'خَرُوف', tr: 'Kuzu', translit: 'harûf' }, 'lamb'),
  letter('dal', 'Dal', 'دَال', ['د', 'د', 'ـد', 'ـد'], { ar: 'دُبّ', tr: 'Ayı', translit: 'dubb' }, 'bear'),
  letter('zel', 'Zel', 'ذَال', ['ذ', 'ذ', 'ـذ', 'ـذ'], { ar: 'ذُرَة', tr: 'Mısır', translit: 'zura' }, 'corn'),
  letter('ra', 'Ra', 'رَاء', ['ر', 'ر', 'ـر', 'ـر'], { ar: 'رُمَّان', tr: 'Nar', translit: 'rummân' }, 'pomegranate'),
  letter('ze', 'Ze', 'زَاي', ['ز', 'ز', 'ـز', 'ـز'], { ar: 'زَرَافَة', tr: 'Zürafa', translit: 'zerâfe' }, 'giraffe'),
  letter('sin', 'Sin', 'سِين', ['س', 'سـ', 'ـسـ', 'ـس'], { ar: 'سَمَكَة', tr: 'Balık', translit: 'semeke' }, 'fish'),
  letter('shin', 'Şın', 'شِين', ['ش', 'شـ', 'ـشـ', 'ـش'], { ar: 'شَمْس', tr: 'Güneş', translit: 'şems' }, 'sun'),
  letter('sad', 'Sad', 'صَاد', ['ص', 'صـ', 'ـصـ', 'ـص'], { ar: 'صَدَفَة', tr: 'Deniz kabuğu', translit: 'sadefe' }, 'seashell'),
  letter('dad', 'Dad', 'ضَاد', ['ض', 'ضـ', 'ـضـ', 'ـض'], { ar: 'ضِفْدَع', tr: 'Kurbağa', translit: "dıfda'" }, 'frog'),
  letter('ti', 'Tı', 'طَاء', ['ط', 'طـ', 'ـطـ', 'ـط'], { ar: 'طَائِرَة', tr: 'Uçak', translit: 'tâira' }, 'airplane'),
  letter('zi', 'Zı', 'ظَاء', ['ظ', 'ظـ', 'ـظـ', 'ـظ'], { ar: 'ظَرْف', tr: 'Zarf', translit: 'zarf' }, 'envelope'),
  letter('ayn', 'Ayn', 'عَيْن', ['ع', 'عـ', 'ـعـ', 'ـع'], { ar: 'عِنَب', tr: 'Üzüm', translit: 'ineb' }, 'grapes'),
  letter('gayn', 'Gayn', 'غَيْن', ['غ', 'غـ', 'ـغـ', 'ـغ'], { ar: 'غَيْمَة', tr: 'Bulut', translit: 'ğayme' }, 'cloud'),
  letter('fe', 'Fe', 'فَاء', ['ف', 'فـ', 'ـفـ', 'ـف'], { ar: 'فِيل', tr: 'Fil', translit: 'fîl' }, 'elephant'),
  letter('kaf', 'Kaf', 'قَاف', ['ق', 'قـ', 'ـقـ', 'ـق'], { ar: 'قَمَر', tr: 'Ay', translit: 'kamer' }, 'moon'),
  letter('kef', 'Kef', 'كَاف', ['ك', 'كـ', 'ـكـ', 'ـك'], { ar: 'كِتَاب', tr: 'Kitap', translit: 'kitâb' }, 'book'),
  letter('lam', 'Lam', 'لَام', ['ل', 'لـ', 'ـلـ', 'ـل'], { ar: 'لَيْمُون', tr: 'Limon', translit: 'leymûn' }, 'lemon'),
  letter('mim', 'Mim', 'مِيم', ['م', 'مـ', 'ـمـ', 'ـم'], { ar: 'مَوْز', tr: 'Muz', translit: 'mevz' }, 'banana'),
  letter('nun', 'Nun', 'نُون', ['ن', 'نـ', 'ـنـ', 'ـن'], { ar: 'نَجْمَة', tr: 'Yıldız', translit: 'necme' }, 'star'),
  letter('he', 'He', 'هَاء', ['ه', 'هـ', 'ـهـ', 'ـه'], { ar: 'هِلَال', tr: 'Hilal', translit: 'hilâl' }, 'crescent'),
  letter('vav', 'Vav', 'وَاو', ['و', 'و', 'ـو', 'ـو'], { ar: 'وَرْدَة', tr: 'Gül', translit: 'verde' }, 'rose'),
  letter('ye', 'Ye', 'يَاء', ['ي', 'يـ', 'ـيـ', 'ـي'], { ar: 'يَد', tr: 'El', translit: 'yed' }, 'hand'),

  // Harekeler
  { id: 'haraka-ustun', kind: 'haraka', ar: 'فَتْحَة', tr: 'Üstün', translit: 'fetha', glyph: 'ـَ' },
  { id: 'haraka-esre', kind: 'haraka', ar: 'كَسْرَة', tr: 'Esre', translit: 'kesra', glyph: 'ـِ' },
  { id: 'haraka-otre', kind: 'haraka', ar: 'ضَمَّة', tr: 'Ötre', translit: 'damme', glyph: 'ـُ' },

  // Hareke + harf birleşimleri (dinleme oyunu ve galeri için)
  { id: 'combo-be-ustun', kind: 'haraka', ar: 'بَ', tr: 'be', glyph: 'بَ' },
  { id: 'combo-be-esre', kind: 'haraka', ar: 'بِ', tr: 'bi', glyph: 'بِ' },
  { id: 'combo-be-otre', kind: 'haraka', ar: 'بُ', tr: 'bu', glyph: 'بُ' },
  { id: 'combo-te-ustun', kind: 'haraka', ar: 'تَ', tr: 'te', glyph: 'تَ' },
  { id: 'combo-te-esre', kind: 'haraka', ar: 'تِ', tr: 'ti', glyph: 'تِ' },
  { id: 'combo-te-otre', kind: 'haraka', ar: 'تُ', tr: 'tu', glyph: 'تُ' },
  { id: 'combo-nun-ustun', kind: 'haraka', ar: 'نَ', tr: 'ne', glyph: 'نَ' },
  { id: 'combo-nun-esre', kind: 'haraka', ar: 'نِ', tr: 'ni', glyph: 'نِ' },
  { id: 'combo-nun-otre', kind: 'haraka', ar: 'نُ', tr: 'nu', glyph: 'نُ' },
];

const ill = (id: string): IllustrationId => {
  const item = alfabeItems.find((i) => i.id === id);
  if (!item?.illustration) throw new Error(`İllüstrasyonsuz öğe: ${id}`);
  return item.illustration;
};

const memoryGame = (ids: string[]): GameSpec => ({
  engine: 'memory-match',
  pairs: ids.map((id) => ({ a: { show: 'glyph', itemId: id }, b: { show: 'illustration', itemId: id } })),
});

const balloonGame = (ids: string[]): GameSpec => ({
  engine: 'balloon-pop',
  rounds: ids.map((id) => ({ targetItemId: id, poolItemIds: ids })),
});

const dragGame = (ids: string[]): GameSpec => ({
  engine: 'drag-match',
  pairs: ids.map((id) => ({ drag: { show: 'glyph', itemId: id }, target: { show: 'illustration', itemId: id } })),
});

/** Standart harf ünitesi: 4 tanıtım + biçimler + galeri + oyun + 3 çalışma kağıdı */
const letterUnit = (n: number, title: string, ids: string[], game: GameSpec): Unit => ({
  id: `alfabe-${n}`,
  islandId: 'alfabe',
  title,
  subtitle: `${n}. Durak`,
  itemIds: ids,
  pages: [
    ...ids.map((itemId) => ({ type: 'letter-intro' as const, itemId })),
    { type: 'letter-forms', itemIds: ids },
    { type: 'gallery', title: 'Tekrar Edelim!', itemIds: ids },
  ],
  game,
  worksheets: [
    { type: 'tracing', title: 'Harfleri Çizelim', itemIds: ids },
    {
      type: 'coloring',
      title: 'Boyayalım',
      figures: ids.slice(0, 2).map((id) => ({ illustration: ill(id), itemId: id })),
    },
    {
      type: 'matching',
      title: 'Eşleştirelim',
      pairs: ids.map((id) => ({
        left: { show: 'glyph' as const, itemId: id },
        right: { show: 'illustration' as const, itemId: id },
      })),
    },
  ],
});

const A1 = ['letter-elif', 'letter-be', 'letter-te', 'letter-se'];
const A2 = ['letter-cim', 'letter-hha', 'letter-hi', 'letter-dal'];
const A3 = ['letter-zel', 'letter-ra', 'letter-ze', 'letter-sin'];
const A4 = ['letter-shin', 'letter-sad', 'letter-dad', 'letter-ti'];
const A5 = ['letter-zi', 'letter-ayn', 'letter-gayn', 'letter-fe'];
const A6 = ['letter-kaf', 'letter-kef', 'letter-lam', 'letter-mim'];
const A7 = ['letter-nun', 'letter-he', 'letter-vav', 'letter-ye'];

const COMBOS = [
  'combo-be-ustun', 'combo-be-esre', 'combo-be-otre',
  'combo-te-ustun', 'combo-te-esre', 'combo-te-otre',
  'combo-nun-ustun', 'combo-nun-esre', 'combo-nun-otre',
];

export const alfabeUnits: Unit[] = [
  letterUnit(1, 'Elif • Be • Te • Se', A1, memoryGame(A1)),
  letterUnit(2, 'Cim • Ha • Hı • Dal', A2, balloonGame(A2)),
  letterUnit(3, 'Zel • Ra • Ze • Sin', A3, dragGame(A3)),
  letterUnit(4, 'Şın • Sad • Dad • Tı', A4, {
    engine: 'jigsaw',
    illustration: 'sun',
    pieces: 6,
    revealItemId: 'letter-shin',
  }),
  letterUnit(5, 'Zı • Ayn • Gayn • Fe', A5, {
    engine: 'maze-collect',
    collectItemIds: A5,
    decoyItemIds: ['letter-elif', 'letter-dal'],
  }),
  letterUnit(6, 'Kaf • Kef • Lam • Mim', A6, memoryGame(A6)),
  letterUnit(7, 'Nun • He • Vav • Ye', A7, balloonGame(A7)),
  {
    id: 'alfabe-8',
    islandId: 'alfabe',
    title: 'Harekeler: Üstün • Esre • Ötre',
    subtitle: '8. Durak',
    itemIds: ['haraka-ustun', 'haraka-esre', 'haraka-otre', ...COMBOS],
    pages: [
      { type: 'item-intro', itemId: 'haraka-ustun' },
      { type: 'item-intro', itemId: 'haraka-esre' },
      { type: 'item-intro', itemId: 'haraka-otre' },
      { type: 'gallery', title: 'Okuyalım!', itemIds: COMBOS },
    ],
    game: {
      engine: 'listen-find',
      rounds: [
        { promptItemId: 'combo-be-ustun', choiceItemIds: ['combo-be-ustun', 'combo-be-esre', 'combo-be-otre'] },
        { promptItemId: 'combo-te-esre', choiceItemIds: ['combo-te-ustun', 'combo-te-esre', 'combo-te-otre'] },
        { promptItemId: 'combo-nun-otre', choiceItemIds: ['combo-nun-ustun', 'combo-nun-esre', 'combo-nun-otre'] },
        { promptItemId: 'combo-be-otre', choiceItemIds: ['combo-be-ustun', 'combo-be-esre', 'combo-be-otre'] },
        { promptItemId: 'combo-nun-ustun', choiceItemIds: ['combo-nun-ustun', 'combo-nun-esre', 'combo-nun-otre'] },
      ],
    },
    worksheets: [
      { type: 'tracing', title: 'Hecelerimizi Çizelim', itemIds: COMBOS.slice(0, 6) },
      {
        type: 'matching',
        title: 'Sesleri Eşleştirelim',
        pairs: [
          { left: { show: 'glyph', itemId: 'combo-be-ustun' }, right: { show: 'trWord', itemId: 'combo-be-ustun' } },
          { left: { show: 'glyph', itemId: 'combo-be-esre' }, right: { show: 'trWord', itemId: 'combo-be-esre' } },
          { left: { show: 'glyph', itemId: 'combo-te-otre' }, right: { show: 'trWord', itemId: 'combo-te-otre' } },
          { left: { show: 'glyph', itemId: 'combo-nun-ustun' }, right: { show: 'trWord', itemId: 'combo-nun-ustun' } },
        ],
      },
    ],
  },
];
