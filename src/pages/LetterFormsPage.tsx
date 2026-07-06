import { getItem } from '../content/registry';
import { SpeakerButtons } from '../components/SpeakerButtons';

const HEADERS = ['Sonda', 'Ortada', 'Başta', 'Yalnız'];

/** Harflerin başta/ortada/sonda biçimleri — bir bakışta tablo */
export function LetterFormsPage({ itemIds }: { itemIds: string[] }) {
  return (
    <div className="lesson-card pop-in">
      <h2 style={{ margin: '0 0 4px' }}>Harfin Halleri</h2>
      <div className="forms-table" role="table">
        {HEADERS.map((h) => (
          <div key={h} className="forms-head">
            {h}
          </div>
        ))}
        {itemIds.map((id) => {
          const item = getItem(id);
          const f = item.letterForms;
          if (!f) return null;
          return [f.final, f.medial, f.initial, f.isolated].map((form, col) => (
            <div key={`${id}-${col}`} className="forms-cell">
              {form}
            </div>
          ));
        })}
      </div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
        {itemIds.map((id) => {
          const item = getItem(id);
          return (
            <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="memory-glyph">{item.glyph}</span>
              <SpeakerButtons item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
