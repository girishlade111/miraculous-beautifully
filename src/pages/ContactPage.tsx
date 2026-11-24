import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { ContactForm } from '../components/ContactForm';
import { formatMumbaiTime } from '../lib/portfolioLogic';
import { pageTransitionVariants } from '../lib/animations';

interface ContactLocationState {
  services?: string[];
  budget?: string;
}

export function ContactPage() {
  const location = useLocation();
  const state = (location.state as ContactLocationState | null) || null;
  const [copied, setCopied] = useState(false);
  const [mumbaiTime, setMumbaiTime] = useState<string>(() => formatMumbaiTime(new Date()));

  useEffect(() => {
    const timer = window.setInterval(() => setMumbaiTime(formatMumbaiTime(new Date())), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('admin@ladestack.in');
    } catch {
      // Ignore clipboard failures
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <motion.div
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-28 md:pt-36 pb-24 px-6 md:px-10"
    >
      <div className="max-w-7xl mx-auto">
        <header className="max-w-3xl mb-14 md:mb-18 space-y-5">
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono-tabular text-[var(--text-muted)]">
            <span className="text-[var(--accent)]">Open to thoughtful collaborations</span>
            <span aria-hidden="true">·</span>
            <span>4–12 hour response SLA</span>
          </div>
          <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl leading-[1.03] text-[var(--text-primary)]">
            Tell me what you have in mind.
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
            Whether you are architecting an AI developer product, a zero-upload client-side
            application, or an editorial design system, share the essentials below.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <ContactForm
              initialServices={state?.services}
              initialBudget={state?.budget}
            />
          </div>

          <aside className="lg:col-span-5 space-y-8 p-7 sm:p-9 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
            <div className="space-y-3 pb-7 border-b border-[var(--border-subtle)]">
              <span className="eyebrow block">Direct Studio Channel</span>
              <a
                href="mailto:admin@ladestack.in"
                className="font-editorial text-3xl sm:text-4xl text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors block break-all sm:break-normal"
              >
                admin@ladestack.in
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="min-h-[44px] inline-flex items-center gap-2 text-xs font-mono-tabular text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check size={14} strokeWidth={1.5} />
                    <span>Copied to clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} strokeWidth={1.5} />
                    <span>Copy direct email</span>
                  </>
                )}
              </button>
            </div>

            <dl className="space-y-6 text-sm pb-7 border-b border-[var(--border-subtle)]">
              <div>
                <dt className="eyebrow mb-1">Studio Location</dt>
                <dd className="text-[var(--text-primary)]">
                  Mumbai, India · Local Time {mumbaiTime} IST
                </dd>
              </div>
              <div>
                <dt className="eyebrow mb-1">Response Expectation</dt>
                <dd className="text-[var(--text-primary)]">
                  Personal reply within 4–12 business hours
                </dd>
              </div>
              <div>
                <dt className="eyebrow mb-1">Engagement Models</dt>
                <dd className="text-[var(--text-muted)] leading-relaxed">
                  Fixed-scope product architecture · Design system engineering · Principal advisory
                </dd>
              </div>
            </dl>

            <div className="space-y-3">
              <span className="eyebrow block">Public Channels</span>
              <ul className="space-y-2.5 text-sm font-mono-tabular text-[var(--text-muted)]">
                <li>
                  <a
                    href="https://ladestack.in/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[var(--text-primary)] inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span>ladestack.in</span>
                    <ArrowUpRight size={13} strokeWidth={1.5} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/girishlade111"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[var(--text-primary)] inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span>GitHub · @girishlade111</span>
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
                    <span>LinkedIn · Girish Lade</span>
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
                    <span>Instagram · @girish_lade_</span>
                    <ArrowUpRight size={13} strokeWidth={1.5} />
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </motion.div>
  );
}
