import { getItem } from '../../content/registry';
import type { IllustrationId } from '../../illustrations';
import { Illustration } from '../../illustrations/Illustration';

interface Row {
  itemId: string;
  illustration: IllustrationId;
  count: number;
}

/** Say ve doğru rakamı yuvarlak içine al */
export function CountingSheet({ title, rows }: { title: string; rows: Row[] }) {
  return (
    <>
      <h2 className="ws-title">{title}</h2>
      <p style={{ textAlign: 'center', margin: '0 0 4mm', fontSize: '11pt' }}>
        Nesneleri say, doğru rakamı yuvarlak içine al.
      </p>
      {rows.map((row) => {
        const item = getItem(row.itemId);
        const value = item.value ?? row.count;
        // Doğru cevap + iki komşu seçenek
        const options = [value - 1, value, value + 1].filter((v) => v >= 1 && v <= 10);
        return (
          <div key={row.itemId} className="count-row">
            <div className="count-items">
              {Array.from({ length: row.count }, (_, i) => (
                <span key={i} className="ci">
                  <Illustration id={row.illustration} variant="outline" />
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '4mm', flex: 'none' }}>
              {options.map((v) => {
                const opt = getItem(`num-${v}`);
                return (
                  <span key={v} className="count-numeral" style={{ border: '0.6pt dotted #999', borderRadius: '50%' }}>
                    {opt.glyph}
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}
