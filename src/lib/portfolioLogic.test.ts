import test from 'node:test';
import assert from 'node:assert/strict';
import { projects } from '../data/projects';
import {
  createInquiryRecord,
  filterProjectsByCategory,
  formatMumbaiTime,
  getNextProject,
  getPrevProject,
  getProjectBySlug,
  isInquiryValid,
  validateInquiry,
} from './portfolioLogic';

test('filterProjectsByCategory returns all 6 projects for All Projects', () => {
  const all = filterProjectsByCategory(projects, 'All Projects');
  assert.equal(all.length, 6);
});

test('filterProjectsByCategory filters accurately across every category tab', () => {
  const aiTools = filterProjectsByCategory(projects, 'AI Developer Tools');
  assert.deepEqual(
    aiTools.map((p) => p.slug),
    ['code-enhance-ai', 'swift-resume']
  );

  const privacy = filterProjectsByCategory(projects, 'Client-Side Privacy');
  assert.deepEqual(
    privacy.map((p) => p.slug),
    ['ls-pdf-toolkit', 'ls-image-engine']
  );

  const webArch = filterProjectsByCategory(projects, 'Web Architecture');
  assert.deepEqual(
    webArch.map((p) => p.slug),
    ['bharat-land', 'lade-suite']
  );
});

test('getProjectBySlug and circular next/prev navigation work for all slugs', () => {
  const first = getProjectBySlug('code-enhance-ai');
  assert.equal(first?.title, 'CodeEnhance AI');
  assert.equal(getProjectBySlug('unknown-slug'), undefined);

  assert.equal(getNextProject('code-enhance-ai').slug, 'ls-pdf-toolkit');
  assert.equal(getNextProject('lade-suite').slug, 'code-enhance-ai');
  assert.equal(getPrevProject('code-enhance-ai').slug, 'lade-suite');
});

test('validateInquiry rejects empty or malformed fields without silent fallbacks', () => {
  const emptyErrors = validateInquiry({
    name: ' ',
    email: 'invalid-email',
    company: '',
    services: [],
    budget: '$5k – $15k',
    timeline: '',
    message: 'Too short',
  });

  assert.equal(isInquiryValid(emptyErrors), false);
  assert.ok(emptyErrors.name);
  assert.ok(emptyErrors.email);
  assert.ok(emptyErrors.services);
  assert.ok(emptyErrors.message);
});

test('validateInquiry passes valid submissions and creates structured inquiry record', () => {
  const input = {
    name: 'Aarav Mehta',
    email: 'aarav@studio.example',
    company: 'Studio Example',
    services: ['AI Application', 'Design System & Frontend'],
    budget: '$15k – $35k',
    timeline: 'Q2 2026',
    message: 'Looking to architect an editorial AI workflow platform for our engineering team.',
  };

  const errors = validateInquiry(input);
  assert.equal(isInquiryValid(errors), true);

  const fixedDate = new Date('2026-11-23T12:30:45.000Z');
  const record = createInquiryRecord(input, fixedDate);
  assert.equal(record.name, 'Aarav Mehta');
  assert.equal(record.services.length, 2);
  assert.ok(record.id.startsWith('INQ-'));
  assert.equal(record.submittedAt, '2026-11-23T12:30:45.000Z');
});

test('formatMumbaiTime renders deterministic 24-hour Asia/Kolkata time', () => {
  const utcDate = new Date('2026-11-23T10:00:05.000Z');
  // UTC + 05:30 = 15:30:05 IST
  assert.equal(formatMumbaiTime(utcDate), '15:30:05');
});
