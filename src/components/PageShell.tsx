import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconArrowLeft, IconHome } from './icons';

interface Props {
  title?: ReactNode;
  backTo?: string;
  /** Üst barın sağına eklenecek öğe (ör. ilerleme noktaları) */
  topRight?: ReactNode;
  children: ReactNode;
  bg?: string;
}

export function PageShell({ title, backTo, topRight, children, bg }: Props) {
  const navigate = useNavigate();
  return (
    <div className="page-shell" style={bg ? { background: bg } : undefined}>
      <header className="page-topbar">
        {backTo !== undefined ? (
          <button type="button" className="round-btn" onClick={() => navigate(backTo)} aria-label="Geri">
            <IconArrowLeft size={28} />
          </button>
        ) : (
          <button type="button" className="round-btn" onClick={() => navigate('/')} aria-label="Haritaya dön">
            <IconHome size={26} />
          </button>
        )}
        {title ? <h1 className="page-title">{title}</h1> : <span />}
        <div className="topbar-right">{topRight ?? <span className="round-btn-ghost" />}</div>
      </header>
      <main className="page-content">{children}</main>
    </div>
  );
}
