import { ART, type IllustrationId } from './index';
import type { ArtProps } from './style';

interface Props extends ArtProps {
  id: IllustrationId;
  /** CSS boyutu; verilmezse kapsayıcıyı doldurur */
  size?: number | string;
  label?: string;
}

export function Illustration({ id, variant, size, label }: Props) {
  const Art = ART[id];
  return (
    <span
      role={label ? 'img' : undefined}
      aria-label={label}
      style={{ display: 'inline-block', width: size ?? '100%', height: size ?? '100%', lineHeight: 0 }}
    >
      <Art variant={variant} />
    </span>
  );
}
