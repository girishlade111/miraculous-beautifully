import { useState } from 'react';
import { motion } from 'motion/react';
import type { ArchitecturalStats } from '../data/projects';
import { formatArchitecturalArea, type AreaUnit } from '../lib/portfolioLogic';
import { luxuryEase } from '../lib/animations';

interface ProjectStatsProps {
  stats: ArchitecturalStats;
}

export function ProjectStats({ stats }: ProjectStatsProps) {
  const [unit, setUnit] = useState<AreaUnit>('sqft');

  const items = [
    {
      index: '01',
      label: 'Square Footage',
      value: formatArchitecturalArea(stats.squareFootage, unit),
      sublabel: unit === 'sqft' ? 'Imperial architectural footprint' : 'Metric architectural footprint',
    },
    {
      index: '02',
      label: 'Project Year',
      value: stats.year,
      sublabel: 'Design & engineering cycle',
    },
    {
      index: '03',
      label: 'Location',
      value: stats.location,
      sublabel: 'Primary studio & deployment site',
    },
    {
      index: '04',
      label: 'Program',
      value: stats.program,
      sublabel: 'Typology & architectural brief',
    },
  ];

  return (
    <motion.section
      aria-label="Architectural specifications"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, ease: luxuryEase }}
      className="py-10 border-t border-[var(--border-subtle)]"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="eyebrow block">Architectural Specifications</span>
        </div>

        <div
          role="group"
          aria-label="Area measurement unit"
          className="inline-flex items-center p-1 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] self-start sm:self-auto"
        >
          <button
            type="button"
            aria-pressed={unit === 'sqft'}
            onClick={() => setUnit('sqft')}
            className={`min-h-[36px] px-3 rounded-md text-xs font-mono-tabular whitespace-nowrap transition-colors duration-200 cursor-pointer ${
              unit === 'sqft'
                ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            sq ft
          </button>
          <button
            type="button"
            aria-pressed={unit === 'sqm'}
            onClick={() => setUnit('sqm')}
            className={`min-h-[36px] px-3 rounded-md text-xs font-mono-tabular whitespace-nowrap transition-colors duration-200 cursor-pointer ${
              unit === 'sqm'
                ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            m²
          </button>
        </div>
      </div>

      <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
        {items.map((item, idx) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: idx * 0.06, ease: luxuryEase }}
            className="pt-5 border-t border-[var(--border-subtle)] space-y-2"
          >
            <dt className="flex items-center gap-2 text-xs font-mono-tabular text-[var(--text-muted)]">
              <span className="text-[var(--accent)]">{item.index}</span>
              <span aria-hidden="true">·</span>
              <span>{item.label}</span>
            </dt>
            <dd className="font-editorial text-2xl sm:text-3xl text-[var(--text-primary)] font-mono-tabular leading-tight">
              {item.value}
            </dd>
            <p className="text-xs text-[var(--text-muted)]">{item.sublabel}</p>
          </motion.div>
        ))}
      </dl>
    </motion.section>
  );
}
