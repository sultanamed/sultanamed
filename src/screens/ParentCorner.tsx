import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ISLANDS, getUnit } from '../content/registry';
import { useProgress } from '../state/ProgressProvider';
import { PageShell } from '../components/PageShell';
import { IconPrint } from '../components/icons';
import { hasVoice } from '../audio/AudioService';

/** 3 saniye basılı tutma kapısı: çocukların yanlışlıkla girmesini engeller */
function HoldGate({ onOpen }: { onOpen: () => void }) {
  const [holding, setHolding] = useState(false);
  const timer = useRef<number | null>(null);

  const start = () => {
    setHolding(true);
    timer.current = window.setTimeout(onOpen, 3000);
  };
  const cancel = () => {
    setHolding(false);
    if (timer.current) window.clearTimeout(timer.current);
  };

  return (
    <div className="hold-gate">
      <h2>Ebeveyn Köşesi</h2>
      <p>Bu bölüm anne-babalar içindir.
        <br />
        Girmek için butona <strong>3 saniye</strong> basılı tutun.</p>
      <button
        type="button"
        className={`big-btn grape ${holding ? 'wiggle' : ''}`}
        onPointerDown={start}
        onPointerUp={cancel}
        onPointerLeave={cancel}
      >
        Basılı Tut
      </button>
    </div>
  );
}

export function ParentCorner() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { state, resetAll } = useProgress();
  const arVoiceMissing = !hasVoice('ar');
  const completedCount = Object.keys(state.completedUnits).length;

  return (
    <PageShell title="Ebeveyn Köşesi" backTo="/">
      {!open ? (
        <HoldGate onOpen={() => setOpen(true)} />
      ) : (
        <>
          {arVoiceMissing && (
            <div className="parent-section">
              <div className="parent-note">
                Bu cihazda Arapça seslendirme sesi bulunamadı. Cihaz ayarlarından bir Arapça
                metin okuma sesi yükleyebilirsiniz; o zamana kadar okunuşlar yazıyla gösterilir.
              </div>
            </div>
          )}

          <div className="parent-section">
            <h2>Çalışma Kağıtları (PDF)</h2>
            <p>
              Her ünitenin yazdırılabilir çalışma kağıtları vardır. Yazdırma ekranında
              &quot;PDF olarak kaydet&quot; seçeneğiyle indirebilirsiniz.
            </p>
            {ISLANDS.map((island) => (
              <div key={island.id}>
                <h3 style={{ color: island.color }}>{island.title}</h3>
                {island.unitIds.map((unitId) => {
                  const unit = getUnit(unitId);
                  if (!unit || unit.worksheets.length === 0) return null;
                  return (
                    <button
                      key={unitId}
                      type="button"
                      className="worksheet-link"
                      onClick={() => navigate(`/calisma/${unitId}`)}
                    >
                      <span>{unit.title}</span>
                      <IconPrint size={24} />
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="parent-section">
            <h2>İlerleme</h2>
            <p>Tamamlanan ünite: {completedCount}</p>
            <button
              type="button"
              className="big-btn coral"
              onClick={() => {
                if (window.confirm('Tüm ilerleme silinsin mi? Bu işlem geri alınamaz.')) resetAll();
              }}
            >
              İlerlemeyi Sıfırla
            </button>
          </div>

          <div className="parent-section">
            <h2>Hakkında</h2>
            <p>
              <strong>Arapça Adası</strong>, 4-8 yaş çocukların Arapça alfabeyi, şekilleri,
              rakamları ve günlük kalıpları oyunlarla öğrenmesi için hazırlanmış ücretsiz bir
              etkinlik uygulamasıdır. İçerik hem Türkçe hem Arapça dinlenebilir.
            </p>
          </div>
        </>
      )}
    </PageShell>
  );
}
