import { projects, type Project, type WorkFilterCategory } from '../data/projects';

export interface InquiryFormInput {
  name: string;
  email: string;
  company: string;
  services: string[];
  budget: string;
  timeline: string;
  message: string;
}

export interface InquiryValidationErrors {
  name?: string;
  email?: string;
  services?: string;
  message?: string;
}

export interface SubmittedInquiry extends InquiryFormInput {
  id: string;
  submittedAt: string;
}

export function filterProjectsByCategory(
  list: Project[],
  category: WorkFilterCategory
): Project[] {
  if (category === 'All Projects') {
    return list;
  }
  return list.filter((project) => project.filterGroup === category);
}

export function getProjectBySlug(slug: string | undefined): Project | undefined {
  if (!slug) {
    return undefined;
  }
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string): Project {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) {
    return projects[0];
  }
  return projects[(index + 1) % projects.length];
}

export function getPrevProject(slug: string): Project {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) {
    return projects[projects.length - 1];
  }
  return projects[(index - 1 + projects.length) % projects.length];
}

export function validateInquiry(input: InquiryFormInput): InquiryValidationErrors {
  const errors: InquiryValidationErrors = {};
  const trimmedName = input.name.trim();
  const trimmedEmail = input.email.trim();
  const trimmedMessage = input.message.trim();

  if (trimmedName.length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).';
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!trimmedEmail) {
    errors.email = 'Please provide a contact email address.';
  } else if (!emailPattern.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!input.services || input.services.length === 0) {
    errors.services = 'Select at least one area of collaboration.';
  }

  if (trimmedMessage.length < 15) {
    errors.message = 'Share a brief overview of your project (at least 15 characters).';
  }

  return errors;
}

export function isInquiryValid(errors: InquiryValidationErrors): boolean {
  return Object.keys(errors).length === 0;
}

export function createInquiryRecord(
  input: InquiryFormInput,
  now: Date = new Date()
): SubmittedInquiry {
  return {
    name: input.name.trim(),
    email: input.email.trim(),
    company: input.company.trim(),
    services: [...input.services],
    budget: input.budget,
    timeline: input.timeline.trim() || 'Flexible',
    message: input.message.trim(),
    id: `INQ-${now.getTime().toString(36).toUpperCase()}`,
    submittedAt: now.toISOString(),
  };
}

export function formatMumbaiTime(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date);
}

export type AreaUnit = 'sqft' | 'sqm';

const SQFT_TO_SQM = 0.092903;

export function formatArchitecturalArea(squareFeet: number, unit: AreaUnit = 'sqft'): string {
  const safeValue = Number.isFinite(squareFeet) && squareFeet > 0 ? squareFeet : 0;
  if (unit === 'sqm') {
    const sqMeters = Math.round(safeValue * SQFT_TO_SQM);
    return `${sqMeters.toLocaleString('en-US')} m²`;
  }
  return `${Math.round(safeValue).toLocaleString('en-US')} sq ft`;
}

export interface IndexedMasonryItem<T> {
  item: T;
  originalIndex: number;
}

export function distributeMasonryColumns<T>(
  items: T[],
  columnCount: number
): IndexedMasonryItem<T>[][] {
  const cols = Math.max(1, Math.floor(columnCount));
  const buckets: IndexedMasonryItem<T>[][] = Array.from({ length: cols }, () => []);
  items.forEach((item, originalIndex) => {
    buckets[originalIndex % cols].push({ item, originalIndex });
  });
  return buckets;
}

