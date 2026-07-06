import { getItem } from '../../content/registry';

function TraceGlyph({ glyph, mode }: { glyph: string; mode: 'solid' | 'dashed' | 'empty' }) {
  return (
    <svg viewBox="0 0 90 90" className={`trace-cell ${mode === 'empty' ? 'trace-box' : ''}`} aria-hidden="true">
      {mode !== 'empty' && (
        <text
          x="45"
          y="60"
          textAnchor="middle"
          fontSize="48"
          fontFamily="'Noto Naskh Arabic', serif"
          direction="rtl"
          fill={mode === 'solid' ? '#000' : 'none'}
          stroke={mode === 'dashed' ? '#999' : 'none'}
          strokeWidth={1.1}
          strokeDasharray={mode === 'dashed' ? '4 3' : undefined}
        >
          {glyph}
        </text>
      )}
    </svg>
  );
}

/** Kesikli harflerin üzerinden yazma sayfası */
export function TracingSheet({ title, itemIds }: { title: string; itemIds: string[] }) {
  return (
    <>
      <h2 className="ws-title">{title}</h2>
      {itemIds.map((id) => {
        const item = getItem(id);
        const glyph = item.glyph ?? item.ar;
        return (
          <div key={id} className="trace-row">
            <TraceGlyph glyph={glyph} mode="solid" />
            {[0, 1, 2, 3].map((i) => (
              <TraceGlyph key={i} glyph={glyph} mode="dashed" />
            ))}
            <TraceGlyph glyph={glyph} mode="empty" />
            <TraceGlyph glyph={glyph} mode="empty" />
          </div>
        );
      })}
    </>
  );
}
