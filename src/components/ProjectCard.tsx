import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import type { Project } from '../data/projects';
import { EditorialImage } from './EditorialImage';
import { luxuryEase } from '../lib/animations';

interface ProjectCardProps {
  project: Project;
  staggerOffset?: boolean;
}

export function ProjectCard({ project, staggerOffset = false }: ProjectCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: luxuryEase }}
      className={staggerOffset ? 'md:mt-14' : ''}
    >
      <Link
        to={`/work/${project.slug}`}
        className="group block focus-visible:outline-none"
      >
        <div className="aspect-[4/3] w-full rounded-xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-card)] mb-5">
          <EditorialImage
            src={project.image}
            alt={`${project.title} — ${project.category}`}
            fallbackTitle={project.title}
            className="w-full h-full"
            imgClassName="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
        </div>

        <div className="flex items-center gap-2.5 text-xs font-mono-tabular text-[var(--text-muted)] mb-2.5">
          <span className="text-[var(--accent)]">{project.index}</span>
          <span aria-hidden="true">·</span>
          <span>{project.category}</span>
          <span aria-hidden="true">·</span>
          <span>{project.year}</span>
        </div>

        <div className="flex items-baseline justify-between gap-4 mb-2">
          <h3 className="font-editorial text-3xl md:text-4xl text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-200">
            {project.title}
          </h3>
          <span className="inline-flex items-center gap-1.5 text-xs font-mono-tabular text-[var(--text-muted)] group-hover:text-[var(--accent)] whitespace-nowrap shrink-0 transition-colors duration-200">
            <span>View Project</span>
            <ArrowRight
              size={14}
              strokeWidth={1.5}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </span>
        </div>

        <p className="text-sm md:text-[15px] text-[var(--text-muted)] leading-relaxed max-w-xl">
          {project.tagline}
        </p>
      </Link>
    </motion.article>
  );
}
