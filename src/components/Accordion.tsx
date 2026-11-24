import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Minus, Plus } from 'lucide-react';
import { touchpoints } from '../data/projects';
import { luxuryEase } from '../lib/animations';

export function Accordion() {
  const [activeId, setActiveId] = useState<string | null>(touchpoints[0].id);

  return (
    <div className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
      {touchpoints.map((tp) => {
        const isOpen = activeId === tp.id;
        const panelId = `touchpoint-panel-${tp.id}`;
        const buttonId = `touchpoint-trigger-${tp.id}`;

        return (
          <div key={tp.id} className="py-6 md:py-8">
            <button
              id={buttonId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setActiveId(isOpen ? null : tp.id)}
              className="w-full min-h-[48px] flex items-center justify-between gap-6 text-left group cursor-pointer"
            >
              <div className="flex items-baseline gap-5 md:gap-10">
                <span className="font-mono-tabular text-xs text-[var(--accent)] tracking-widest shrink-0">
                  {tp.number}
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl md:text-4xl text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-200">
                  {tp.title}
                </h3>
              </div>

              <span
                aria-hidden="true"
                className="w-11 h-11 rounded-full border border-[var(--border-strong)] flex items-center justify-center text-[var(--text-muted)] group-hover:text-[var(--text-primary)] group-hover:border-[var(--accent)] transition-colors duration-200 shrink-0"
              >
                {isOpen ? <Minus size={16} strokeWidth={1.5} /> : <Plus size={16} strokeWidth={1.5} />}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: luxuryEase }}
                  className="overflow-hidden"
                >
                  <div className="pt-5 pl-10 md:pl-[4.25rem] max-w-3xl space-y-5">
                    <p className="text-[var(--text-muted)] text-base leading-relaxed">
                      {tp.summary}
                    </p>
                    <ul className="space-y-2.5 pt-1">
                      {tp.details.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm text-[var(--text-primary)]"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 w-1.5 h-px bg-[var(--accent)] shrink-0"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
