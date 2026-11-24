import { useState } from 'react';
import { motion } from 'motion/react';
import {
  projects,
  WORK_FILTER_CATEGORIES,
  type WorkFilterCategory,
} from '../data/projects';
import { filterProjectsByCategory } from '../lib/portfolioLogic';
import { ProjectCard } from '../components/ProjectCard';
import { pageTransitionVariants } from '../lib/animations';

export function WorkPage() {
  const [activeCategory, setActiveCategory] = useState<WorkFilterCategory>('All Projects');
  const filteredProjects = filterProjectsByCategory(projects, activeCategory);

  return (
    <motion.div
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-28 md:pt-36 pb-24 px-6 md:px-10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-12 md:mb-16">
          <span className="eyebrow block mb-4">Selected Works &amp; Platform Archive</span>
          <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl leading-[1.04] text-[var(--text-primary)] mb-6">
            Different disciplines. One point of view.
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
            Six production platforms across contextual AI development, zero-upload WebAssembly
            privacy suites, and precision web engineering — built independently under Lade Stack.
          </p>
        </div>

        {/* Interactive Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter projects by discipline"
          className="flex flex-wrap items-center justify-between gap-6 pb-8 mb-14 border-b border-[var(--border-subtle)]"
        >
          <div className="flex flex-wrap items-center gap-2">
            {WORK_FILTER_CATEGORIES.map((category) => {
              const isSelected = activeCategory === category;
              const count = filterProjectsByCategory(projects, category).length;

              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveCategory(category)}
                  className={`min-h-[44px] px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors duration-200 cursor-pointer inline-flex items-center gap-2 ${
                    isSelected
                      ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
                      : 'bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]'
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`font-mono-tabular text-xs ${
                      isSelected ? 'opacity-75' : 'text-[var(--text-faint)]'
                    }`}
                  >
                    {count.toString().padStart(2, '0')}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="text-xs font-mono-tabular text-[var(--text-muted)]">
            Showing {filteredProjects.length} of {projects.length} platforms
          </p>
        </div>

        {/* Filtered Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-14 gap-y-16 md:gap-y-14"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              staggerOffset={index % 2 === 1}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
