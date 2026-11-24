import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight, Check, Copy, X } from 'lucide-react';
import { luxuryEase, menuOverlayVariants } from '../lib/animations';

const OVERLAY_LINKS = [
  { label: 'Work', href: '/work', number: '01', note: 'Six flagship platforms & case studies' },
  { label: 'About', href: '/about', number: '02', note: 'Philosophy, 2020–2026 timeline & stack' },
  { label: 'Process', href: '/process', number: '03', note: 'Four-stage precision delivery framework' },
  { label: 'Contact', href: '/contact', number: '04', note: 'Start a scoped project conversation' },
];

export function MenuOverlay({ onClose }: { onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('admin@ladestack.in');
    } catch {
      // Fallback ignored in restricted contexts
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation menu"
      variants={menuOverlayVariants}
      initial="closed"
      animate="open"
      exit="closed"
      className="fixed inset-0 z-50 bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col justify-between p-6 sm:p-10 md:p-14 overflow-y-auto"
    >
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
        <Link
          to="/"
          onClick={onClose}
          className="font-editorial text-2xl tracking-tight text-[var(--text-primary)] whitespace-nowrap"
        >
          Girish Lade
        </Link>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation menu"
          className="w-12 h-12 rounded-full border border-[var(--border-strong)] flex items-center justify-center text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-200 cursor-pointer"
        >
          <X size={20} strokeWidth={1.5} />
        </button>
      </div>

      <nav aria-label="Fullscreen navigation" className="max-w-7xl w-full mx-auto my-auto py-10">
        <ul className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
          {OVERLAY_LINKS.map((link, idx) => {
            const isActive =
              link.href === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(link.href);

            return (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + idx * 0.06, ease: luxuryEase, duration: 0.6 }}
              >
                <Link
                  to={link.href}
                  onClick={onClose}
                  className="group py-5 md:py-7 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 transition-transform duration-200 hover:translate-x-2"
                >
                  <div className="flex items-baseline gap-6 md:gap-10">
                    <span className="font-mono-tabular text-xs text-[var(--accent)] tracking-widest">
                      {link.number}
                    </span>
                    <span
                      className={`font-editorial text-4xl sm:text-6xl md:text-7xl transition-colors duration-200 ${
                        isActive
                          ? 'text-[var(--accent)]'
                          : 'text-[var(--text-primary)] group-hover:text-[var(--accent)]'
                      }`}
                    >
                      {link.label}
                    </span>
                  </div>
                  <span className="text-sm text-[var(--text-muted)] pl-11 sm:pl-0">
                    {link.note}
                  </span>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </nav>

      <div className="max-w-7xl w-full mx-auto pt-8 border-t border-[var(--border-subtle)] flex flex-col md:flex-row md:items-center justify-between gap-6 text-sm">
        <div>
          <span className="eyebrow block mb-1.5">Direct Inquiries</span>
          <button
            type="button"
            onClick={copyEmail}
            aria-label="Copy admin@ladestack.in to clipboard"
            className="font-mono-tabular text-sm text-[var(--text-primary)] hover:text-[var(--accent)] inline-flex items-center gap-2.5 min-h-[44px] transition-colors cursor-pointer"
          >
            <span>admin@ladestack.in</span>
            {copied ? (
              <span className="inline-flex items-center gap-1 text-xs text-[var(--accent)]">
                <Check size={14} strokeWidth={1.5} /> Copied
              </span>
            ) : (
              <Copy size={14} strokeWidth={1.5} />
            )}
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-[var(--text-muted)] font-mono-tabular text-xs">
          <a
            href="https://github.com/girishlade111"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[var(--text-primary)] inline-flex items-center gap-1 min-h-[44px] transition-colors"
          >
            <span>GitHub</span>
            <ArrowUpRight size={13} strokeWidth={1.5} />
          </a>
          <a
            href="https://linkedin.com/in/girish-lade-075bba201/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[var(--text-primary)] inline-flex items-center gap-1 min-h-[44px] transition-colors"
          >
            <span>LinkedIn</span>
            <ArrowUpRight size={13} strokeWidth={1.5} />
          </a>
          <a
            href="https://instagram.com/girish_lade_"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[var(--text-primary)] inline-flex items-center gap-1 min-h-[44px] transition-colors"
          >
            <span>Instagram</span>
            <ArrowUpRight size={13} strokeWidth={1.5} />
          </a>
          <a
            href="https://ladestack.in/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[var(--text-primary)] inline-flex items-center gap-1 min-h-[44px] transition-colors"
          >
            <span>Lade Stack</span>
            <ArrowUpRight size={13} strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
