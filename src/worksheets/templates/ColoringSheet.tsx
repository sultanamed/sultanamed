import { getItem } from '../../content/registry';
import type { IllustrationId } from '../../illustrations';
import { Illustration } from '../../illustrations/Illustration';

interface Figure {
  illustration: IllustrationId;
  itemId?: string;
}

/** Boyama sayfası: kontur modundaki illüstrasyonlar + kelime */
export function ColoringSheet({ title, figures }: { title: string; figures: Figure[] }) {
  return (
    <>
      <h2 className="ws-title">{title}</h2>
      {figures.map((fig, i) => {
        const item = fig.itemId ? getItem(fig.itemId) : undefined;
        const word = item?.exampleWord ?? item;
        return (
          <div key={i} className="color-figure">
            <div className="cf-art">
              <Illustration id={fig.illustration} variant="outline" />
            </div>
            {word && (
              <>
                <div className="color-word-ar">{word.ar}</div>
                <div className="color-word-tr">
                  {word.tr}
                  {word.translit ? ` (${word.translit})` : ''}
                </div>
              </>
            )}
          </div>
        );
      })}
    </>
  );
}
