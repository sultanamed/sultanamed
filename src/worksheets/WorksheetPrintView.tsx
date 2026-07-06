import { useNavigate, useParams } from 'react-router-dom';
import { getUnit } from '../content/registry';
import type { WorksheetSpec } from '../content/types';
import { IconArrowLeft, IconPrint } from '../components/icons';
import { TracingSheet } from './templates/TracingSheet';
import { ColoringSheet } from './templates/ColoringSheet';
import { MatchingSheet } from './templates/MatchingSheet';
import { CountingSheet } from './templates/CountingSheet';

function renderSheet(ws: WorksheetSpec) {
  switch (ws.type) {
    case 'tracing':
      return <TracingSheet title={ws.title} itemIds={ws.itemIds} />;
    case 'coloring':
      return <ColoringSheet title={ws.title} figures={ws.figures} />;
    case 'matching':
      return <MatchingSheet title={ws.title} pairs={ws.pairs} />;
    case 'counting':
      return <CountingSheet title={ws.title} rows={ws.rows} />;
  }
}

/** A4 yazdırma görünümü — tarayıcının "PDF olarak kaydet" özelliğiyle indirilebilir */
export function WorksheetPrintView() {
  const { unitId, sheetIndex } = useParams();
  const navigate = useNavigate();
  const unit = unitId ? getUnit(unitId) : undefined;
  const index = Number(sheetIndex ?? 0);
  const ws = unit?.worksheets[index];

  if (!unit || !ws) {
    navigate('/');
    return null;
  }

  return (
    <div className="print-preview">
      <div className="no-print" style={{ display: 'flex', gap: 12 }}>
        <button
          type="button"
          className="round-btn"
          onClick={() => navigate(`/calisma/${unit.id}`)}
          aria-label="Geri"
        >
          <IconArrowLeft size={26} />
        </button>
        <button type="button" className="big-btn" onClick={() => window.print()}>
          <IconPrint size={26} />
          Yazdır / PDF Kaydet
        </button>
      </div>
      <div className="sheet">
        <div className="sheet-header">
          <div>
            <div className="sh-title">{unit.title}</div>
            <div className="sh-app">Arapça Adası • Çalışma Kağıdı</div>
          </div>
          <div className="sh-name">Adım: ______________</div>
        </div>
        {renderSheet(ws)}
        <div className="sheet-footer">Arapça Adası — arapca-adasi</div>
      </div>
    </div>
  );
}
