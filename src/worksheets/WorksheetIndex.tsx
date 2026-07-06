import { useNavigate, useParams } from 'react-router-dom';
import { getUnit } from '../content/registry';
import { PageShell } from '../components/PageShell';
import { IconPrint } from '../components/icons';

/** Ünitenin çalışma kağıtları listesi */
export function WorksheetIndex() {
  const { unitId } = useParams();
  const navigate = useNavigate();
  const unit = unitId ? getUnit(unitId) : undefined;

  if (!unit) {
    navigate('/');
    return null;
  }

  return (
    <PageShell title="Çalışma Kağıtları" backTo="/ebeveyn">
      <div className="parent-section">
        <h2>{unit.title}</h2>
        <p>
          Kağıdı aç, ardından <strong>Yazdır</strong> düğmesiyle yazdır ya da
          &quot;PDF olarak kaydet&quot; seçeneğiyle indir.
        </p>
        {unit.worksheets.map((ws, i) => (
          <button
            key={i}
            type="button"
            className="worksheet-link"
            onClick={() => navigate(`/calisma/${unit.id}/${i}`)}
          >
            <span>
              {i + 1}. {ws.title}
            </span>
            <IconPrint size={24} />
          </button>
        ))}
      </div>
    </PageShell>
  );
}
