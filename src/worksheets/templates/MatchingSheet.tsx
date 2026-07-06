import { useMemo } from 'react';
import { getItem } from '../../content/registry';
import type { MatchFace } from '../../content/types';
import { Illustration } from '../../illustrations/Illustration';

function PrintFace({ face }: { face: MatchFace }) {
  const item = getItem(face.itemId);
  switch (face.show) {
    case 'glyph':
      return <span className="match-glyph">{item.glyph ?? item.ar}</span>;
    case 'arWord':
      return <span className="match-glyph" style={{ fontSize: '16pt' }}>{item.ar}</span>;
    case 'trWord':
      return <span style={{ fontWeight: 700, fontSize: '12pt' }}>{item.tr}</span>;
    case 'illustration':
      return item.illustration ? (
        <span className="match-art">
          <Illustration id={item.illustration} variant="outline" />
        </span>
      ) : (
        <span className="match-glyph">{item.ar}</span>
      );
    case 'countGroup':
      return (
        <span style={{ display: 'flex', flexWrap: 'wrap', gap: '1mm', justifyContent: 'center' }}>
          {Array.from({ length: face.count }, (_, i) => (
            <span key={i} style={{ width: '8mm', height: '8mm' }}>
              <Illustration id={face.illustration} variant="outline" />
            </span>
          ))}
        </span>
      );
  }
}

function shuffled<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Kalemle çizgi çekerek eşleştirme sayfası */
export function MatchingSheet({
  title,
  pairs,
}: {
  title: string;
  pairs: { left: MatchFace; right: MatchFace }[];
}) {
  const rightOrder = useMemo(() => shuffled(pairs.map((_, i) => i)), [pairs]);
  return (
    <>
      <h2 className="ws-title">{title}</h2>
      <div className="match-table">
        <div className="match-col left">
          {pairs.map((pair, i) => (
            <div key={i} className="match-cell">
              <PrintFace face={pair.left} />
              <span className="dot" />
            </div>
          ))}
        </div>
        <div className="match-col right">
          {rightOrder.map((i) => (
            <div key={i} className="match-cell">
              <span className="dot" />
              <PrintFace face={pairs[i].right} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
