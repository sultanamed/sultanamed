import type { IllustrationId } from '../illustrations';

export type Lang = 'ar' | 'tr';

/** Seslendirilebilir her şey: Arapça metin + Türkçe karşılık.
 *  audioAr/audioTr dolu ise TTS yerine o dosya çalınır (ileride gerçek kayıtlar). */
export interface Speakable {
  ar: string;
  tr: string;
  translit?: string;
  audioAr?: string;
  audioTr?: string;
}

export type ItemKind = 'letter' | 'haraka' | 'shape' | 'number' | 'phrase';

export interface LetterForms {
  isolated: string;
  initial: string;
  medial: string;
  final: string;
}

/** Öğretilebilir tek birim: harf, hareke, şekil, rakam veya kalıp */
export interface ContentItem extends Speakable {
  id: string;
  kind: ItemKind;
  /** Harfin/rakamın kendisi: "ا", "٣" */
  glyph?: string;
  letterForms?: LetterForms;
  /** Harfler için resimli örnek kelime */
  exampleWord?: Speakable;
  illustration?: IllustrationId;
  /** Rakamlar için sayı değeri */
  value?: number;
}

export type PageSpec =
  | { type: 'letter-intro'; itemId: string }
  | { type: 'letter-forms'; itemIds: string[] }
  | { type: 'item-intro'; itemId: string }
  | { type: 'gallery'; title: string; itemIds: string[] }
  | { type: 'counting'; itemId: string; countOf: IllustrationId }
  | { type: 'dialogue'; title: string; lines: { speaker: 'parrot' | 'turtle'; itemId: string }[] };

export type MatchFace =
  | { show: 'glyph'; itemId: string }
  | { show: 'illustration'; itemId: string }
  | { show: 'arWord'; itemId: string }
  | { show: 'trWord'; itemId: string }
  | { show: 'countGroup'; itemId: string; illustration: IllustrationId; count: number };

export type GameSpec =
  | { engine: 'memory-match'; pairs: { a: MatchFace; b: MatchFace }[] }
  | { engine: 'balloon-pop'; rounds: { targetItemId: string; poolItemIds: string[] }[] }
  | { engine: 'drag-match'; pairs: { drag: MatchFace; target: MatchFace }[] }
  | { engine: 'jigsaw'; illustration: IllustrationId; pieces: 4 | 6 | 9; revealItemId: string }
  | { engine: 'maze-collect'; collectItemIds: string[]; decoyItemIds: string[] }
  | { engine: 'listen-find'; rounds: { promptItemId: string; choiceItemIds: string[] }[] };

export type WorksheetSpec =
  | { type: 'tracing'; title: string; itemIds: string[] }
  | { type: 'coloring'; title: string; figures: { illustration: IllustrationId; itemId?: string }[] }
  | { type: 'matching'; title: string; pairs: { left: MatchFace; right: MatchFace }[] }
  | { type: 'counting'; title: string; rows: { itemId: string; illustration: IllustrationId; count: number }[] };

export type IslandId = 'alfabe' | 'sekiller' | 'rakamlar' | 'kaliplar';

export interface Unit {
  id: string;
  islandId: IslandId;
  title: string;
  /** Ada ekranındaki kısa alt yazı */
  subtitle?: string;
  itemIds: string[];
  pages: PageSpec[];
  game: GameSpec;
  worksheets: WorksheetSpec[];
}

export interface Island {
  id: IslandId;
  title: string;
  /** Haritadaki kısa tanıtım cümlesi */
  tagline: string;
  color: string;
  illustration: IllustrationId;
  unitIds: string[];
}
