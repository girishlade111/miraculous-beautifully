import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { pageTransitionVariants } from '../lib/animations';

export function NotFoundPage() {
  return (
    <motion.section
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-[75vh] pt-32 pb-24 px-6 md:px-10 flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="max-w-2xl space-y-6">
          <p className="eyebrow">404 · Index Entry Missing</p>
          <h1 className="font-editorial text-5xl sm:text-7xl leading-[1.02] text-[var(--text-primary)]">
            This plate could not be located.
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
            The route you requested is either archived or no longer exists. Return to the main
            editorial index or explore the six flagship platforms.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-5">
            <Link
              to="/"
              className="h-12 px-7 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--accent-foreground)] text-sm font-medium inline-flex items-center gap-2 whitespace-nowrap transition-colors"
            >
              <ArrowLeft size={16} strokeWidth={1.5} />
              <span>Return Home</span>
            </Link>
            <Link
              to="/work"
              className="h-12 px-5 rounded-full border border-[var(--border-strong)] hover:border-[var(--accent)] text-sm font-medium text-[var(--text-primary)] hover:text-[var(--accent)] inline-flex items-center gap-2 whitespace-nowrap transition-colors"
            >
              <span>Browse Selected Work</span>
              <ArrowRight size={15} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
