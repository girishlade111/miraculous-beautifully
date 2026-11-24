import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import {
  stackMatrix,
  STUDIO_MEDIA,
  studioTimeline,
  studioValues,
} from '../data/projects';
import { EditorialImage } from '../components/EditorialImage';
import { luxuryEase, pageTransitionVariants } from '../lib/animations';

export function AboutPage() {
  const [selectedYear, setSelectedYear] = useState<string>('2026');

  return (
    <motion.div
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-28 md:pt-36 pb-24 px-6 md:px-10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Hero Split */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch pb-20 border-b border-[var(--border-subtle)]">
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <span className="eyebrow block">About · Girish Lade</span>
              <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl leading-[1.03] text-[var(--text-primary)]">
                An independent point of view.
              </h1>
              <div className="space-y-4 text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
                <p>
                  I am Girish Lade — Founder and Lead Architect of Lade Stack, an independent
                  engineering studio based in Mumbai. Since 2020, my work has centered on a
                  straightforward conviction: software with serious technical depth should feel
                  calm, immediate, and accessible to every developer.
                </p>
                <p>
                  Across six flagship platforms — from contextual AI code compilation to
                  zero-upload WebAssembly privacy suites — Lade Stack now serves over 8,000
                  builders across more than 100 countries without predatory subscription locks.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-[var(--border-subtle)] flex flex-wrap gap-8 text-xs font-mono-tabular text-[var(--text-muted)]">
              <div>
                <span className="block text-[var(--text-primary)] text-sm mb-0.5">Mumbai, IN</span>
                <span>Studio Base</span>
              </div>
              <div>
                <span className="block text-[var(--text-primary)] text-sm mb-0.5">2020 – 2026</span>
                <span>Independent Practice</span>
              </div>
              <div>
                <span className="block text-[var(--text-primary)] text-sm mb-0.5">Lade Stack</span>
                <span>Founder &amp; Architect</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-[4/3] lg:aspect-auto lg:h-full min-h-[340px] rounded-2xl overflow-hidden border border-[var(--border-subtle)]">
              <EditorialImage
                src={STUDIO_MEDIA.studioDesk}
                alt="Girish Lade studio workspace with architectural typography monograph and brass objects"
                fallbackTitle="Girish Lade Studio"
                loading="eager"
                className="w-full h-full"
              />
            </div>
          </div>
        </section>

        {/* Interactive 2020–2026 Timeline */}
        <section className="py-20 md:py-28 border-b border-[var(--border-subtle)]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="eyebrow block mb-3">Chronology · 2020–2026</span>
              <h2 className="font-editorial text-4xl sm:text-5xl text-[var(--text-primary)]">
                From solo craft to a global developer ecosystem.
              </h2>
            </div>

            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Select milestone year">
              {studioTimeline.map((item) => {
                const isSelected = selectedYear === item.year;
                return (
                  <button
                    key={item.year}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedYear(item.year)}
                    className={`min-h-[44px] px-4 rounded-lg text-xs font-mono-tabular transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[var(--accent)] text-[var(--accent-foreground)]'
                        : 'bg-[var(--bg-surface)] text-[var(--text-muted)] border border-[var(--border-subtle)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {item.year}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
            {studioTimeline.map((milestone) => {
              const isHighlighted = selectedYear === milestone.year;

              return (
                <motion.div
                  key={milestone.year}
                  layout
                  transition={{ duration: 0.4, ease: luxuryEase }}
                  onClick={() => setSelectedYear(milestone.year)}
                  className={`py-8 px-4 sm:px-6 transition-colors duration-200 ${
                    isHighlighted ? 'bg-[var(--bg-surface)]' : 'bg-transparent'
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    <div className="md:col-span-3 flex items-baseline gap-4">
                      <span
                        className={`font-editorial text-4xl sm:text-5xl font-mono-tabular ${
                          isHighlighted ? 'text-[var(--accent)]' : 'text-[var(--text-primary)]'
                        }`}
                      >
                        {milestone.year}
                      </span>
                      <span className="eyebrow">{milestone.phase}</span>
                    </div>

                    <div className="md:col-span-9 space-y-3">
                      <h3 className="font-editorial text-2xl sm:text-3xl text-[var(--text-primary)]">
                        {milestone.title}
                      </h3>
                      <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed max-w-3xl">
                        {milestone.description}
                      </p>
                      <p className="pt-1 text-xs font-mono-tabular text-[var(--text-primary)]">
                        {milestone.highlights.join(' · ')}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Four Core Principles */}
        <section className="py-20 md:py-28 border-b border-[var(--border-subtle)]">
          <div className="max-w-3xl mb-14">
            <span className="eyebrow block mb-3">Core Principles</span>
            <h2 className="font-editorial text-4xl sm:text-5xl text-[var(--text-primary)]">
              Standards that govern every release.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {studioValues.map((value) => (
              <div
                key={value.number}
                className="p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] space-y-4"
              >
                <span className="font-mono-tabular text-xs text-[var(--accent)]">
                  {value.number}
                </span>
                <h3 className="font-editorial text-3xl text-[var(--text-primary)]">
                  {value.title}
                </h3>
                <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Stack Matrix */}
        <section className="py-20 md:py-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <span className="eyebrow block mb-3">Technical Matrix</span>
              <h2 className="font-editorial text-4xl sm:text-5xl text-[var(--text-primary)]">
                Chosen for durability, speed, and zero bloat.
              </h2>
            </div>
            <Link
              to="/process"
              className="self-start md:self-end text-sm font-medium text-[var(--text-primary)] hover:text-[var(--accent)] inline-flex items-center gap-2 pb-1 border-b border-[var(--border-strong)] hover:border-[var(--accent)] whitespace-nowrap transition-colors"
            >
              <span>See Delivery Process</span>
              <ArrowRight size={15} strokeWidth={1.5} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-[var(--border-subtle)] pt-10">
            {stackMatrix.map((category) => (
              <div key={category.area} className="space-y-4">
                <h3 className="font-editorial text-2xl text-[var(--text-primary)]">
                  {category.area}
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {category.description}
                </p>
                <ul className="space-y-2 pt-2 border-t border-[var(--border-subtle)] text-xs font-mono-tabular text-[var(--text-primary)]">
                  {category.technologies.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
}
