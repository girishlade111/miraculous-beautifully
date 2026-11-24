import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Maximize2, X } from 'lucide-react';
import { getNextProject, getProjectBySlug } from '../lib/portfolioLogic';
import { EditorialImage } from '../components/EditorialImage';
import { luxuryEase, pageTransitionVariants } from '../lib/animations';
import { NotFoundPage } from './NotFoundPage';

export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; caption: string } | null>(
    null
  );

  useEffect(() => {
    if (!lightboxImage) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxImage(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxImage]);

  if (!project) {
    return <NotFoundPage />;
  }

  const nextProject = getNextProject(project.slug);

  return (
    <motion.article
      key={project.slug}
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-28 md:pt-36 pb-24 px-6 md:px-10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Back Link */}
        <div className="mb-10">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-xs font-mono-tabular text-[var(--text-muted)] hover:text-[var(--accent)] min-h-[44px] transition-colors"
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            <span>Back to Selected Work</span>
          </Link>
        </div>

        {/* Case Study Header */}
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-[var(--border-subtle)]">
          <div className="lg:col-span-8 space-y-5">
            <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono-tabular text-[var(--text-muted)]">
              <span className="text-[var(--accent)]">{project.index}</span>
              <span aria-hidden="true">·</span>
              <span>{project.category}</span>
              <span aria-hidden="true">·</span>
              <span>{project.year}</span>
            </div>

            <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl leading-[1.02] text-[var(--text-primary)]">
              {project.title}
            </h1>

            <p className="text-lg sm:text-xl text-[var(--text-muted)] leading-relaxed max-w-2xl">
              {project.summary}
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-between gap-6 lg:items-end">
            <div className="lg:text-right space-y-1">
              <span className="eyebrow block">Role &amp; Scope</span>
              <p className="text-sm text-[var(--text-primary)]">{project.role}</p>
            </div>

            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="h-12 px-7 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--accent-foreground)] text-sm font-medium inline-flex items-center gap-2 whitespace-nowrap self-start lg:self-end transition-colors duration-200"
            >
              <span>Launch Live Platform</span>
              <ArrowUpRight size={16} strokeWidth={1.5} />
            </a>
          </div>
        </header>

        {/* Primary Hero Visual */}
        <div className="my-12 md:my-16">
          <button
            type="button"
            onClick={() =>
              setLightboxImage({
                src: project.image,
                caption: `${project.title} — ${project.tagline}`,
              })
            }
            aria-label={`Inspect ${project.title} primary plate in fullscreen`}
            className="group relative block w-full aspect-[16/10] max-h-[680px] rounded-2xl overflow-hidden border border-[var(--border-subtle)] cursor-pointer text-left"
          >
            <EditorialImage
              src={project.image}
              alt={`${project.title} editorial showcase`}
              fallbackTitle={project.title}
              loading="eager"
              className="w-full h-full"
              imgClassName="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
            />
            <span className="absolute right-4 bottom-4 h-10 px-4 rounded-full bg-[#0C0D0E]/80 text-[#F4F4F6] text-xs font-mono-tabular inline-flex items-center gap-2 backdrop-blur-sm">
              <Maximize2 size={13} strokeWidth={1.5} />
              <span>Inspect Plate</span>
            </span>
          </button>
        </div>

        {/* Key Metrics Strip */}
        <section
          aria-label="Measured outcomes"
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-10 border-y border-[var(--border-subtle)] mb-16 md:mb-20"
        >
          {project.metrics.map((metric) => (
            <div key={metric.label} className="space-y-1.5">
              <p className="font-editorial text-4xl md:text-5xl text-[var(--accent)] font-mono-tabular">
                {metric.value}
              </p>
              <p className="text-sm text-[var(--text-muted)]">{metric.label}</p>
            </div>
          ))}
        </section>

        {/* Challenge & Narrative */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-20">
          <div className="lg:col-span-4">
            <span className="eyebrow block mb-3">01. Context &amp; Narrative</span>
            <h2 className="font-editorial text-3xl md:text-4xl text-[var(--text-primary)]">
              Why it was built.
            </h2>
          </div>

          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4 text-base sm:text-lg text-[var(--text-primary)] leading-relaxed">
              {project.overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-[var(--border-subtle)]">
              <div className="space-y-2.5">
                <span className="eyebrow block">The Friction</span>
                <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
                  {project.challenge}
                </p>
              </div>
              <div className="space-y-2.5">
                <span className="eyebrow block">The Resolution</span>
                <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
                  {project.outcome}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Architectural Highlights */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 py-16 border-t border-[var(--border-subtle)]">
          <div className="lg:col-span-4 space-y-6">
            <div>
              <span className="eyebrow block mb-3">02. System Architecture</span>
              <h2 className="font-editorial text-3xl md:text-4xl text-[var(--text-primary)]">
                Engineering pillars.
              </h2>
            </div>

            <div className="pt-4 border-t border-[var(--border-subtle)]">
              <span className="eyebrow block mb-2.5">Core Stack</span>
              <p className="text-xs font-mono-tabular text-[var(--text-muted)] leading-relaxed">
                {project.stack.join(' · ')}
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
            {project.architecturalHighlights.map((item, idx) => (
              <div key={item.title} className="py-7 grid grid-cols-1 sm:grid-cols-12 gap-4">
                <span className="sm:col-span-2 font-mono-tabular text-xs text-[var(--accent)]">
                  0{idx + 1}
                </span>
                <div className="sm:col-span-10 space-y-2">
                  <h3 className="font-editorial text-2xl sm:text-3xl text-[var(--text-primary)]">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Editorial Visual Plates */}
        <section className="py-16 border-t border-[var(--border-subtle)]">
          <div className="mb-10">
            <span className="eyebrow block mb-3">03. Visual Plates</span>
            <h2 className="font-editorial text-3xl md:text-4xl text-[var(--text-primary)]">
              Interface &amp; environment studies.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.gallery.map((plate, index) => (
              <figure key={`${plate.src}-${index}`} className="space-y-3">
                <button
                  type="button"
                  onClick={() => setLightboxImage({ src: plate.src, caption: plate.caption })}
                  aria-label={`Open plate: ${plate.caption}`}
                  className="group block w-full aspect-[4/3] rounded-xl overflow-hidden border border-[var(--border-subtle)] cursor-pointer"
                >
                  <EditorialImage
                    src={plate.src}
                    alt={plate.caption}
                    fallbackTitle={project.title}
                    className="w-full h-full"
                    imgClassName="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  />
                </button>
                <figcaption className="text-xs font-mono-tabular text-[var(--text-muted)]">
                  Plate 0{index + 1} · {plate.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Next Project Navigation Footer */}
        <section className="mt-12 pt-16 border-t border-[var(--border-strong)]">
          <span className="eyebrow block mb-4">Next Case Study</span>
          <Link
            to={`/work/${nextProject.slug}`}
            className="group flex flex-col md:flex-row md:items-end justify-between gap-6 py-4"
          >
            <div className="space-y-2">
              <div className="text-xs font-mono-tabular text-[var(--text-muted)]">
                {nextProject.index} · {nextProject.category} · {nextProject.year}
              </div>
              <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-200">
                {nextProject.title}
              </h2>
            </div>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] whitespace-nowrap transition-colors">
              <span>Read Next Study</span>
              <ArrowRight
                size={18}
                strokeWidth={1.5}
                className="transition-transform duration-200 group-hover:translate-x-1.5"
              />
            </span>
          </Link>
        </section>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Expanded visual plate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: luxuryEase }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 bg-[#08090A]/92 backdrop-blur-md p-6 md:p-12 flex flex-col items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl w-full flex flex-col gap-4"
            >
              <div className="flex items-center justify-between text-[#F4F4F6]">
                <span className="text-xs font-mono-tabular text-[#A1A3AD]">
                  {lightboxImage.caption}
                </span>
                <button
                  type="button"
                  onClick={() => setLightboxImage(null)}
                  aria-label="Close fullscreen preview"
                  className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-[#F4F4F6] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors cursor-pointer"
                >
                  <X size={18} strokeWidth={1.5} />
                </button>
              </div>
              <div className="rounded-xl overflow-hidden border border-white/15 bg-[#0C0D0E] max-h-[78vh]">
                <img
                  src={lightboxImage.src}
                  alt={lightboxImage.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full max-h-[78vh] object-contain"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
