import { motion } from 'motion/react';
import { Maximize2 } from 'lucide-react';
import type { GalleryAspect, ProjectGalleryItem } from '../data/projects';
import { distributeMasonryColumns } from '../lib/portfolioLogic';
import { EditorialImage } from './EditorialImage';
import { luxuryEase } from '../lib/animations';

interface MasonryGalleryProps {
  plates: ProjectGalleryItem[];
  projectTitle: string;
  onSelectPlate: (index: number) => void;
}

const ASPECT_CLASS_MAP: Record<GalleryAspect, string> = {
  '4:3': 'aspect-[4/3]',
  '4:5': 'aspect-[4/5]',
  '16:10': 'aspect-[16/10]',
  '3:4': 'aspect-[3/4]',
};

export function MasonryGallery({
  plates,
  projectTitle,
  onSelectPlate,
}: MasonryGalleryProps) {
  const columns = distributeMasonryColumns(plates, 2);

  return (
    <div
      data-testid="masonry-gallery"
      className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-start"
    >
      {columns.map((columnItems, colIndex) => (
        <div
          key={`masonry-col-${colIndex}`}
          className={`flex flex-col gap-8 lg:gap-10 ${colIndex === 1 ? 'md:mt-14' : ''}`}
        >
          {columnItems.map(({ item: plate, originalIndex }, itemIdx) => {
            const aspectClass = ASPECT_CLASS_MAP[plate.aspect] || 'aspect-[4/3]';
            const plateNumber = (originalIndex + 1).toString().padStart(2, '0');

            return (
              <motion.figure
                key={`${plate.src}-${originalIndex}`}
                initial={{ opacity: 0, y: 36, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.16 }}
                transition={{
                  duration: 0.75,
                  delay: colIndex * 0.08 + itemIdx * 0.06,
                  ease: luxuryEase,
                }}
                className="space-y-3"
              >
                <button
                  type="button"
                  onClick={() => onSelectPlate(originalIndex)}
                  aria-label={`Open plate ${plateNumber}: ${plate.caption}`}
                  className={`group relative block w-full ${aspectClass} rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-card)] cursor-pointer text-left`}
                >
                  <EditorialImage
                    src={plate.src}
                    alt={plate.caption}
                    fallbackTitle={projectTitle}
                    className="w-full h-full"
                    imgClassName="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                  <span className="absolute right-3.5 bottom-3.5 h-9 px-3.5 rounded-full bg-[#0C0D0E]/80 text-[#F4F4F6] text-xs font-mono-tabular inline-flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                    <Maximize2 size={12} strokeWidth={1.5} />
                    <span>Inspect</span>
                  </span>
                </button>

                <figcaption className="flex items-baseline gap-2.5 text-xs font-mono-tabular text-[var(--text-muted)] leading-relaxed">
                  <span className="text-[var(--accent)] shrink-0">Plate {plateNumber}</span>
                  <span aria-hidden="true">·</span>
                  <span>{plate.caption}</span>
                </figcaption>
              </motion.figure>
            );
          })}
        </div>
      ))}
    </div>
  );
}
