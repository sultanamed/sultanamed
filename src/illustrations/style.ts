/**
 * Ortak illüstrasyon stili — TÜM çizimler bu paleti ve yardımcıları kullanır.
 * Sözleşme için STYLE.md dosyasına bakın.
 */
export const PAL = {
  coral: '#FF7B6B',
  teal: '#2EC4B6',
  sand: '#F6D188',
  leaf: '#7BC950',
  sky: '#66B3E8',
  sun: '#FFC53D',
  grape: '#9B72CF',
  cream: '#FFF6E9',
  ink: '#3A3335',
  blush: '#FFA8B8',
  sea: '#A8DCF0',
  white: '#FFFFFF',
} as const;

export interface ArtProps {
  /** 'outline' boyama kağıtları için: dolgular beyaz olur, kontur kalır */
  variant?: 'color' | 'outline';
}

/** Dolgu seçici: `const f = fills(variant); <circle fill={f(PAL.sun)} />` */
export const fills =
  (variant: ArtProps['variant']) =>
  (color: string): string =>
    variant === 'outline' ? PAL.white : color;

/** Tüm çizimlerde ortak kontur özellikleri */
export const STROKE = {
  stroke: PAL.ink,
  strokeWidth: 3,
  strokeLinejoin: 'round',
  strokeLinecap: 'round',
} as const;
