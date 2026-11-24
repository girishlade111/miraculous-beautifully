import { motion } from 'motion/react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { luxuryEase } from '../lib/animations';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="relative w-11 h-11 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-200 flex items-center justify-center shrink-0 cursor-pointer"
    >
      <motion.span
        key={theme}
        initial={{ rotate: -180, opacity: 0, scale: 0.75 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: luxuryEase }}
        className="flex items-center justify-center"
      >
        {isDark ? <Sun size={17} strokeWidth={1.5} /> : <Moon size={17} strokeWidth={1.5} />}
      </motion.span>
    </button>
  );
}
