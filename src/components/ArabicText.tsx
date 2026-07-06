import type { CSSProperties, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  size?: string;
  bold?: boolean;
  style?: CSSProperties;
}

/** Arapça metin: RTL, Naskh fontu, harekeli okunaklı büyük yazım */
export function ArabicText({ children, size = 'var(--fs-xl)', bold = true, style }: Props) {
  return (
    <span
      lang="ar"
      dir="rtl"
      style={{
        fontFamily: 'var(--font-ar)',
        fontSize: size,
        fontWeight: bold ? 700 : 400,
        lineHeight: 1.9,
        display: 'inline-block',
        ...style,
      }}
    >
      {children}
    </span>
  );
}
