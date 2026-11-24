import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Menu } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { MenuOverlay } from './MenuOverlay';

const NAV_ITEMS = [
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Process', href: '/process' },
  { label: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-[var(--bg-primary)]/90 backdrop-blur-md border-b border-[var(--border-subtle)] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between gap-8">
          <Link
            to="/"
            className="font-editorial text-2xl tracking-tight text-[var(--text-primary)] hover:opacity-80 transition-opacity whitespace-nowrap shrink-0"
          >
            Girish Lade
          </Link>

          <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-200 ${
                    isActive
                      ? 'text-[var(--text-primary)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-underline"
                      className="absolute left-0 right-0 bottom-0 h-px bg-[var(--accent)]"
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <ThemeToggle />
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setIsOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isOpen}
              className="h-11 px-4 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--accent-foreground)] inline-flex items-center justify-center gap-2 text-xs font-medium tracking-wide whitespace-nowrap shrink-0 transition-colors duration-200 cursor-pointer"
            >
              <Menu size={16} strokeWidth={1.75} />
              <span>Menu</span>
            </motion.button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && <MenuOverlay onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
