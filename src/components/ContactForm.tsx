import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';
import { BUDGET_OPTIONS, SERVICE_OPTIONS } from '../data/projects';
import {
  createInquiryRecord,
  isInquiryValid,
  validateInquiry,
  type InquiryFormInput,
  type InquiryValidationErrors,
  type SubmittedInquiry,
} from '../lib/portfolioLogic';
import { luxuryEase } from '../lib/animations';

const STORAGE_KEY = 'lade-submitted-inquiries';

interface ContactFormProps {
  initialServices?: string[];
  initialBudget?: string;
}

function loadSavedInquiries(): SubmittedInquiry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function ContactForm({ initialServices, initialBudget }: ContactFormProps) {
  const [form, setForm] = useState<InquiryFormInput>({
    name: '',
    email: '',
    company: '',
    services:
      initialServices && initialServices.length > 0 ? initialServices : ['AI Application'],
    budget: initialBudget || BUDGET_OPTIONS[1],
    timeline: '',
    message: '',
  });
  const [errors, setErrors] = useState<InquiryValidationErrors>({});
  const [latestSubmission, setLatestSubmission] = useState<SubmittedInquiry | null>(null);
  const [history, setHistory] = useState<SubmittedInquiry[]>(loadSavedInquiries);

  useEffect(() => {
    if (initialServices && initialServices.length > 0) {
      setForm((prev) => ({ ...prev, services: initialServices }));
    }
  }, [initialServices]);

  useEffect(() => {
    if (initialBudget) {
      setForm((prev) => ({ ...prev, budget: initialBudget }));
    }
  }, [initialBudget]);

  const toggleService = (service: string) => {
    setForm((prev) => {
      const exists = prev.services.includes(service);
      const nextServices = exists
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service];
      return { ...prev, services: nextServices };
    });
    setErrors((prev) => ({ ...prev, services: undefined }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateInquiry(form);
    if (!isInquiryValid(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    const record = createInquiryRecord(form);
    const updatedHistory = [record, ...history].slice(0, 5);
    setHistory(updatedHistory);
    setLatestSubmission(record);
    setErrors({});

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
    } catch {
      // Ignore storage failures
    }

    setForm({
      name: '',
      email: '',
      company: '',
      services: ['AI Application'],
      budget: BUDGET_OPTIONS[1],
      timeline: '',
      message: '',
    });
  };

  const handleResetReceipt = () => {
    setLatestSubmission(null);
  };

  return (
    <div className="space-y-10">
      <AnimatePresence mode="wait">
        {latestSubmission ? (
          <motion.div
            key="receipt"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: luxuryEase }}
            role="status"
            aria-live="polite"
            className="p-8 md:p-10 rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-surface)] space-y-6"
          >
            <div className="flex items-start gap-4">
              <CheckCircle2
                size={24}
                strokeWidth={1.5}
                className="text-[var(--accent)] mt-1 shrink-0"
              />
              <div>
                <span className="eyebrow block mb-1">Inquiry Logged · {latestSubmission.id}</span>
                <h3 className="font-editorial text-3xl md:text-4xl text-[var(--text-primary)]">
                  Brief received, {latestSubmission.name}.
                </h3>
                <p className="text-sm text-[var(--text-muted)] mt-2 leading-relaxed">
                  Thank you for sharing your scope. Girish reviews every inquiry personally from
                  Mumbai and responds within 4–12 hours at{' '}
                  <span className="text-[var(--text-primary)]">{latestSubmission.email}</span>.
                </p>
              </div>
            </div>

            <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-y border-[var(--border-subtle)] text-sm">
              <div>
                <dt className="eyebrow mb-1">Focus Areas</dt>
                <dd className="text-[var(--text-primary)]">
                  {latestSubmission.services.join(' · ')}
                </dd>
              </div>
              <div>
                <dt className="eyebrow mb-1">Estimated Range</dt>
                <dd className="text-[var(--text-primary)] font-mono-tabular">
                  {latestSubmission.budget}
                </dd>
              </div>
              <div>
                <dt className="eyebrow mb-1">Target Window</dt>
                <dd className="text-[var(--text-primary)]">{latestSubmission.timeline}</dd>
              </div>
            </dl>

            <button
              type="button"
              onClick={handleResetReceipt}
              className="h-12 px-6 rounded-full border border-[var(--border-strong)] text-sm font-medium text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <RotateCcw size={15} strokeWidth={1.5} />
              <span>Send another brief</span>
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: luxuryEase }}
            onSubmit={handleSubmit}
            noValidate
            className="space-y-8"
          >
            <fieldset className="space-y-3">
              <legend className="eyebrow block">01. Collaboration Focus</legend>
              <div className="flex flex-wrap gap-2.5 pt-1">
                {SERVICE_OPTIONS.map((service) => {
                  const selected = form.services.includes(service);
                  return (
                    <button
                      key={service}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => toggleService(service)}
                      className={`min-h-[44px] px-4 py-2 rounded-lg border text-sm font-medium whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                        selected
                          ? 'bg-[var(--accent)] text-[var(--accent-foreground)] border-[var(--accent)]'
                          : 'bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--border-subtle)] hover:border-[var(--border-strong)]'
                      }`}
                    >
                      {service}
                    </button>
                  );
                })}
              </div>
              {errors.services && (
                <p role="alert" className="text-xs text-red-600 dark:text-red-400">
                  {errors.services}
                </p>
              )}
            </fieldset>

            <fieldset className="space-y-3">
              <legend className="eyebrow block">02. Indicative Investment</legend>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                {BUDGET_OPTIONS.map((option) => {
                  const selected = form.budget === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setForm((prev) => ({ ...prev, budget: option }))}
                      className={`min-h-[44px] px-3 py-2 rounded-lg border text-xs font-mono-tabular whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                        selected
                          ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] border-[var(--text-primary)]'
                          : 'bg-[var(--bg-surface)] text-[var(--text-muted)] border-[var(--border-subtle)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="inquiry-name"
                  className="block text-xs font-mono-tabular text-[var(--text-muted)] mb-2"
                >
                  Full Name *
                </label>
                <input
                  id="inquiry-name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => {
                    setForm((prev) => ({ ...prev, name: e.target.value }));
                    setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  placeholder="Rohan Kulkarni"
                  className="w-full h-12 px-4 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-faint)] focus:border-[var(--accent)] transition-colors"
                />
                {errors.name && (
                  <p role="alert" className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="inquiry-email"
                  className="block text-xs font-mono-tabular text-[var(--text-muted)] mb-2"
                >
                  Work Email *
                </label>
                <input
                  id="inquiry-email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => {
                    setForm((prev) => ({ ...prev, email: e.target.value }));
                    setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  placeholder="rohan@company.com"
                  className="w-full h-12 px-4 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-faint)] focus:border-[var(--accent)] transition-colors"
                />
                {errors.email && (
                  <p role="alert" className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="inquiry-company"
                  className="block text-xs font-mono-tabular text-[var(--text-muted)] mb-2"
                >
                  Organization / Studio
                </label>
                <input
                  id="inquiry-company"
                  name="company"
                  type="text"
                  value={form.company}
                  onChange={(e) => setForm((prev) => ({ ...prev, company: e.target.value }))}
                  placeholder="Optional"
                  className="w-full h-12 px-4 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-faint)] focus:border-[var(--accent)] transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="inquiry-timeline"
                  className="block text-xs font-mono-tabular text-[var(--text-muted)] mb-2"
                >
                  Target Launch Window
                </label>
                <input
                  id="inquiry-timeline"
                  name="timeline"
                  type="text"
                  value={form.timeline}
                  onChange={(e) => setForm((prev) => ({ ...prev, timeline: e.target.value }))}
                  placeholder="e.g. 6 weeks, Q1 2027"
                  className="w-full h-12 px-4 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-faint)] focus:border-[var(--accent)] transition-colors"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="inquiry-message"
                className="block text-xs font-mono-tabular text-[var(--text-muted)] mb-2"
              >
                Project Context & Goals *
              </label>
              <textarea
                id="inquiry-message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => {
                  setForm((prev) => ({ ...prev, message: e.target.value }));
                  setErrors((prev) => ({ ...prev, message: undefined }));
                }}
                placeholder="Describe what you are building, key technical challenges, and what success looks like."
                className="w-full p-4 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-faint)] focus:border-[var(--accent)] transition-colors resize-y"
              />
              {errors.message && (
                <p role="alert" className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                  {errors.message}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <p className="text-xs text-[var(--text-muted)]">
                Direct reply from Girish Lade within 4–12 hours.
              </p>
              <button
                type="submit"
                className="h-12 px-7 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--accent-foreground)] text-sm font-medium inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 transition-colors duration-200 cursor-pointer"
              >
                <span>Submit Project Brief</span>
                <ArrowRight size={16} strokeWidth={1.5} />
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {history.length > 0 && (
        <div className="pt-8 border-t border-[var(--border-subtle)]">
          <span className="eyebrow block mb-4">
            Saved Inquiries ({history.length})
          </span>
          <ul className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
            {history.map((item) => (
              <li
                key={item.id}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm"
              >
                <div>
                  <span className="font-medium text-[var(--text-primary)]">{item.name}</span>
                  <span className="text-[var(--text-muted)]">
                    {' '}
                    · {item.services.join(', ')}
                  </span>
                </div>
                <div className="font-mono-tabular text-xs text-[var(--text-muted)]">
                  {item.budget} · {item.id}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
