import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { processStages } from '../data/projects';
import { luxuryEase, pageTransitionVariants } from '../lib/animations';

export function ProcessPage() {
  return (
    <motion.div
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-28 md:pt-36 pb-24 px-6 md:px-10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="max-w-3xl mb-16 md:mb-20">
          <span className="eyebrow block mb-4">Four-Stage Precision Delivery Framework</span>
          <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl leading-[1.03] text-[var(--text-primary)] mb-6">
            From first idea to final detail.
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[var(--text-muted)] leading-relaxed">
            Good work starts with a good conversation. Here is how we turn your goals into a clear
            direction, a considered design, and a confident launch.
          </p>
        </header>

        {/* 4 Stages */}
        <div className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
          {processStages.map((stage, idx) => (
            <motion.section
              key={stage.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: idx * 0.05, ease: luxuryEase }}
              className="py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
            >
              <div className="lg:col-span-4 space-y-2">
                <div className="flex items-center gap-3 text-xs font-mono-tabular text-[var(--text-muted)]">
                  <span className="text-[var(--accent)]">{stage.number}</span>
                  <span aria-hidden="true">·</span>
                  <span>{stage.duration}</span>
                </div>
                <h2 className="font-editorial text-4xl sm:text-5xl text-[var(--text-primary)]">
                  {stage.title}
                </h2>
              </div>

              <div className="lg:col-span-8 space-y-8">
                <p className="text-base sm:text-lg text-[var(--text-primary)] leading-relaxed max-w-2xl">
                  {stage.summary}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t border-[var(--border-subtle)]">
                  <div className="space-y-3">
                    <span className="eyebrow block">Key Deliverables</span>
                    <ul className="space-y-2.5 text-sm text-[var(--text-muted)]">
                      {stage.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span
                            aria-hidden="true"
                            className="mt-2 w-1.5 h-px bg-[var(--accent)] shrink-0"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <span className="eyebrow block">Stage Outcome</span>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                      {stage.outcome}
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>
          ))}
        </div>

        {/* Bottom CTA */}
        <section className="mt-20 p-8 sm:p-12 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <span className="eyebrow block">Ready to begin</span>
            <h2 className="font-editorial text-3xl sm:text-5xl text-[var(--text-primary)]">
              Bring clarity to your next software release.
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
              Share your timeline and architecture goals to receive a tailored technical roadmap
              within 4–12 hours.
            </p>
          </div>
          <Link
            to="/contact"
            className="h-12 px-7 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--accent-foreground)] text-sm font-medium inline-flex items-center justify-center gap-2 whitespace-nowrap self-start lg:self-center transition-colors"
          >
            <span>Start Discovery Call</span>
            <ArrowRight size={16} strokeWidth={1.5} />
          </Link>
        </section>
      </div>
    </motion.div>
  );
}
