import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { formatMumbaiTime } from '../lib/portfolioLogic';

export function Footer() {
  const [time, setTime] = useState<string>(() => formatMumbaiTime(new Date()));
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const update = () => setTime(formatMumbaiTime(new Date()));
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('admin@ladestack.in');
    } catch {
      // Ignore clipboard failures in headless environments
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] pt-20 pb-12 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 pb-12 border-b border-[var(--border-subtle)] flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <span className="eyebrow block mb-4">Start a conversation</span>
            <a
              href="mailto:admin@ladestack.in"
              className="font-editorial text-3xl sm:text-6xl md:text-7xl text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors duration-200 inline-block break-words"
            >
              admin@ladestack.in
            </a>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="self-start lg:self-end h-11 px-5 rounded-full border border-[var(--border-strong)] text-xs font-mono-tabular text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] inline-flex items-center gap-2 whitespace-nowrap shrink-0 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check size={14} strokeWidth={1.5} />
                <span>Address copied</span>
              </>
            ) : (
              <>
                <Copy size={14} strokeWidth={1.5} />
                <span>Copy email address</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-10 border-b border-[var(--border-subtle)]">
          <div>
            <span className="eyebrow block mb-4">Navigation</span>
            <ul className="space-y-3 text-sm text-[var(--text-muted)]">
              <li>
                <Link to="/work" className="hover:text-[var(--text-primary)] transition-colors">
                  Selected Work
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[var(--text-primary)] transition-colors">
                  About & Philosophy
                </Link>
              </li>
              <li>
                <Link to="/process" className="hover:text-[var(--text-primary)] transition-colors">
                  Process
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[var(--text-primary)] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <span className="eyebrow block mb-4">Flagship Platforms</span>
            <ul className="space-y-3 text-sm text-[var(--text-muted)]">
              <li>
                <Link
                  to="/work/code-enhance-ai"
                  className="hover:text-[var(--text-primary)] transition-colors"
                >
                  CodeEnhance AI
                </Link>
              </li>
              <li>
                <Link
                  to="/work/ls-pdf-toolkit"
                  className="hover:text-[var(--text-primary)] transition-colors"
                >
                  LS PDF Toolkit
                </Link>
              </li>
              <li>
                <Link
                  to="/work/ls-image-engine"
                  className="hover:text-[var(--text-primary)] transition-colors"
                >
                  LS Image Engine
                </Link>
              </li>
              <li>
                <Link
                  to="/work/swift-resume"
                  className="hover:text-[var(--text-primary)] transition-colors"
                >
                  Swift Resume
                </Link>
              </li>
              <li>
                <Link
                  to="/work/bharat-land"
                  className="hover:text-[var(--text-primary)] transition-colors"
                >
                  Bharat Land Converter
                </Link>
              </li>
              <li>
                <Link
                  to="/work/lade-suite"
                  className="hover:text-[var(--text-primary)] transition-colors"
                >
                  Lade Suite Enterprise
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <span className="eyebrow block mb-4">Connect</span>
            <ul className="space-y-3 text-sm text-[var(--text-muted)] font-mono-tabular">
              <li>
                <a
                  href="https://github.com/girishlade111"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[var(--text-primary)] inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>GitHub</span>
                  <ArrowUpRight size={13} strokeWidth={1.5} />
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/girish-lade-075bba201/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[var(--text-primary)] inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight size={13} strokeWidth={1.5} />
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/girish_lade_"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[var(--text-primary)] inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Instagram</span>
                  <ArrowUpRight size={13} strokeWidth={1.5} />
                </a>
              </li>
              <li>
                <a
                  href="https://codepen.io/Girish-Lade-the-looper"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[var(--text-primary)] inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>CodePen</span>
                  <ArrowUpRight size={13} strokeWidth={1.5} />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <span className="eyebrow block mb-4">Availability</span>
            <p className="text-sm font-medium text-[var(--text-primary)] mb-2">
              Open for Select Architectural Consulting
            </p>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">
              Based in Mumbai, collaborating with founders and engineering teams worldwide.
            </p>
            <Link
              to="/contact"
              className="text-xs font-mono-tabular text-[var(--accent)] hover:text-[var(--accent-hover)] inline-flex items-center gap-1.5 transition-colors"
            >
              <span>Schedule a scope review</span>
              <ArrowUpRight size={13} strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono-tabular text-[var(--text-faint)] gap-4">
          <p>© 2026 Girish Lade · Lade Stack. All rights reserved.</p>
          <p>Mumbai, IN · {time} IST</p>
        </div>
      </div>
    </footer>
  );
}
