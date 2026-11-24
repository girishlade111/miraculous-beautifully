import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import {
  BUDGET_OPTIONS,
  projects,
  SERVICE_OPTIONS,
  STUDIO_MEDIA,
} from '../data/projects';
import { ProjectCard } from '../components/ProjectCard';
import { Accordion } from '../components/Accordion';
import { EditorialImage } from '../components/EditorialImage';
import {
  fadeInUp,
  luxuryEase,
  pageTransitionVariants,
  staggerContainer,
} from '../lib/animations';

const PROOF_METRICS = [
  { value: '8,000+', label: 'Developers using Lade Stack tools' },
  { value: '100+', label: 'Countries reached organically' },
  { value: '6', label: 'Flagship web & AI platforms shipped' },
  { value: '100%', label: 'Zero-upload client-side privacy suites' },
];

export function HomePage() {
  const navigate = useNavigate();
  const [selectedServices, setSelectedServices] = useState<string[]>(['AI Application']);
  const [selectedBudget, setSelectedBudget] = useState<string>(BUDGET_OPTIONS[1]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 24, mass: 0.4 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 24, mass: 0.4 });

  const handleSculptureMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width - 0.5;
    const relY = (event.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(relX * -18);
    mouseY.set(relY * -12);
  };

  const handleSculptureLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const togglePlannerService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.length > 1
          ? prev.filter((item) => item !== service)
          : prev
        : [...prev, service]
    );
  };

  const handlePlannerContinue = () => {
    navigate('/contact', {
      state: {
        services: selectedServices,
        budget: selectedBudget,
      },
    });
  };

  return (
    <motion.div
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Hero Section */}
      <section className="pt-24 md:pt-28 pb-16 md:pb-22 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
          >
            <motion.p variants={fadeInUp} className="eyebrow mb-4">
              Independent AI Systems &amp; Full-Stack Architecture
            </motion.p>

            <motion.h1
              variants={fadeInUp}
              className="font-editorial text-5xl sm:text-7xl lg:text-[5.25rem] leading-[1.01] text-[var(--text-primary)] mb-5"
            >
              Ideas with presence. Software with depth.
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed max-w-2xl mb-7"
            >
              I transform ambitious concepts into high-performance AI tools and digital
              experiences with an uncompromising standard of craft and zero gatekeeping.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-6">
              <Link
                to="/work"
                className="h-12 px-7 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--accent-foreground)] text-sm font-medium inline-flex items-center gap-2.5 whitespace-nowrap transition-colors duration-200"
              >
                <span>Explore Selected Work</span>
                <ArrowRight size={16} strokeWidth={1.5} />
              </Link>
              <Link
                to="/about"
                className="h-12 px-2 text-sm font-medium text-[var(--text-primary)] hover:text-[var(--accent)] inline-flex items-center gap-1.5 border-b border-[var(--border-strong)] hover:border-[var(--accent)] whitespace-nowrap transition-colors duration-200"
              >
                <span>Read Studio Philosophy</span>
                <ArrowUpRight size={15} strokeWidth={1.5} />
              </Link>
            </motion.div>
          </motion.div>

          {/* Hero Sculpture Visual with Subtle Mouse Parallax */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: luxuryEase }}
            onMouseMove={handleSculptureMove}
            onMouseLeave={handleSculptureLeave}
            className="mt-10 md:mt-12 rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-[#0A0B0C]"
          >
            <div className="aspect-[16/9] max-h-[540px] w-full overflow-hidden">
              <motion.div
                style={{ x: smoothX, y: smoothY, scale: 1.06 }}
                className="w-full h-full"
              >
                <EditorialImage
                  src={STUDIO_MEDIA.heroSculpture}
                  alt="Fluid matte brushed bronze and dark obsidian carbon fiber sculptural ribbon"
                  fallbackTitle="Girish Lade · Lade Stack"
                  loading="eager"
                  className="w-full h-full bg-[#0A0B0C]"
                />
              </motion.div>
            </div>
            <div className="px-6 py-4 bg-[var(--bg-surface)] border-t border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono-tabular text-[var(--text-muted)]">
              <span>Girish Lade · Founder &amp; Lead Architect, Lade Stack</span>
              <span>Mumbai, India · Engineered for global builders</span>
            </div>
          </motion.div>

          {/* Proof Metrics Strip */}
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-8 py-8 border-y border-[var(--border-subtle)]">
            {PROOF_METRICS.map((metric) => (
              <div key={metric.label} className="space-y-1.5">
                <p className="font-editorial text-3xl sm:text-4xl text-[var(--text-primary)] font-mono-tabular">
                  {metric.value}
                </p>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-snug">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flagship Projects Section */}
      <section className="py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 md:mb-18">
            <div>
              <span className="eyebrow block mb-3">Selected Platforms · 2024–2026</span>
              <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[var(--text-primary)]">
                Distinctive ideas. Tangible outcomes.
              </h2>
            </div>
            <Link
              to="/work"
              className="self-start md:self-end text-sm font-medium text-[var(--text-primary)] hover:text-[var(--accent)] inline-flex items-center gap-2 pb-1 border-b border-[var(--border-strong)] hover:border-[var(--accent)] whitespace-nowrap transition-colors"
            >
              <span>View Full Archive</span>
              <ArrowRight size={15} strokeWidth={1.5} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-14 gap-y-16 md:gap-y-12">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                staggerOffset={index % 2 === 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Studio Teaser Split Section */}
      <section className="py-20 md:py-28 px-6 md:px-10 bg-[var(--bg-surface)] border-y border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          <div className="lg:col-span-6">
            <div className="w-full aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[340px] rounded-2xl overflow-hidden border border-[var(--border-subtle)]">
              <EditorialImage
                src={STUDIO_MEDIA.studioDesk}
                alt="Minimalist dark oak architectural studio desk with Swiss typography monograph and brass paperweight"
                fallbackTitle="Lade Stack Studio"
                className="w-full h-full"
              />
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between py-2 lg:py-4 space-y-8">
            <div className="space-y-6">
              <span className="eyebrow block">Studio Point of View</span>
              <blockquote className="font-editorial text-3xl sm:text-4xl md:text-5xl leading-[1.12] text-[var(--text-primary)]">
                &ldquo;I shape intelligent systems around one clear idea: make complex power feel
                effortless and human.&rdquo;
              </blockquote>
              <p className="text-base text-[var(--text-muted)] leading-relaxed max-w-xl">
                Through Lade Stack, every product is architected from first principles — combining
                client-side WebAssembly privacy, contextual AI synthesis, and disciplined editorial
                typography so builders worldwide can move faster without subscription friction.
              </p>
            </div>

            <div className="pt-6 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs font-mono-tabular text-[var(--text-muted)]">
                Girish Lade · Mumbai, India · Est. 2020
              </div>
              <Link
                to="/about"
                className="text-sm font-medium text-[var(--text-primary)] hover:text-[var(--accent)] inline-flex items-center gap-2 whitespace-nowrap transition-colors"
              >
                <span>Explore About &amp; Timeline</span>
                <ArrowRight size={15} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Touchpoints Accordion Section */}
      <section className="py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12 md:mb-16">
            <span className="eyebrow block mb-3">Capabilities &amp; Craft</span>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[var(--text-primary)]">
              A clear vision, across every touchpoint.
            </h2>
          </div>
          <Accordion />
        </div>
      </section>

      {/* Interactive Project Inquiry Intake Planner */}
      <section className="py-20 md:py-28 px-6 md:px-10 border-t border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-5">
            <span className="eyebrow block">Project Planner</span>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[var(--text-primary)]">
              What could we create together?
            </h2>
            <p className="text-base text-[var(--text-muted)] leading-relaxed">
              Configure an initial direction below to pre-populate your project brief, or reach
              out directly for architectural advisory and product engineering engagements.
            </p>
          </div>

          <div className="lg:col-span-7 p-7 sm:p-10 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] space-y-8">
            <div className="space-y-3">
              <span className="eyebrow block">Select Focus Areas</span>
              <div className="flex flex-wrap gap-2.5">
                {SERVICE_OPTIONS.map((service) => {
                  const active = selectedServices.includes(service);
                  return (
                    <button
                      key={service}
                      type="button"
                      aria-pressed={active}
                      onClick={() => togglePlannerService(service)}
                      className={`min-h-[44px] px-4 py-2 rounded-lg border text-sm font-medium whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                        active
                          ? 'bg-[var(--accent)] text-[var(--accent-foreground)] border-[var(--accent)]'
                          : 'bg-[var(--bg-primary)] text-[var(--text-primary)] border-[var(--border-subtle)] hover:border-[var(--border-strong)]'
                      }`}
                    >
                      {service}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <span className="eyebrow block">Indicative Budget Range</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {BUDGET_OPTIONS.map((budget) => {
                  const active = selectedBudget === budget;
                  return (
                    <button
                      key={budget}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setSelectedBudget(budget)}
                      className={`min-h-[44px] px-3 py-2 rounded-lg border text-xs font-mono-tabular whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                        active
                          ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] border-[var(--text-primary)]'
                          : 'bg-[var(--bg-primary)] text-[var(--text-muted)] border-[var(--border-subtle)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]'
                      }`}
                    >
                      {budget}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <button
                type="button"
                onClick={handlePlannerContinue}
                className="h-12 px-7 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--accent-foreground)] text-sm font-medium inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors duration-200 cursor-pointer"
              >
                <span>Continue to Project Brief</span>
                <ArrowRight size={16} strokeWidth={1.5} />
              </button>
              <a
                href="mailto:admin@ladestack.in"
                className="text-xs font-mono-tabular text-[var(--text-muted)] hover:text-[var(--text-primary)] inline-flex items-center gap-1.5 min-h-[44px] transition-colors"
              >
                <span>Or email admin@ladestack.in</span>
                <ArrowUpRight size={13} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
