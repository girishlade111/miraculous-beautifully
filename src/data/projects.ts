export type WorkFilterCategory =
  | 'All Projects'
  | 'AI Developer Tools'
  | 'Client-Side Privacy'
  | 'Web Architecture';

export interface ArchitecturalHighlight {
  title: string;
  description: string;
}

export interface ProjectGalleryItem {
  src: string;
  caption: string;
  aspect: string;
}

export interface Project {
  slug: string;
  index: string;
  title: string;
  category: string;
  filterGroup: Exclude<WorkFilterCategory, 'All Projects'>;
  year: string;
  role: string;
  tagline: string;
  summary: string;
  liveUrl: string;
  metrics: { value: string; label: string }[];
  overview: string[];
  challenge: string;
  outcome: string;
  architecturalHighlights: ArchitecturalHighlight[];
  stack: string[];
  image: string;
  gallery: ProjectGalleryItem[];
}

export interface Touchpoint {
  id: string;
  number: string;
  title: string;
  summary: string;
  details: string[];
}

export interface TimelineMilestone {
  year: string;
  phase: string;
  title: string;
  description: string;
  highlights: string[];
}

export interface StudioValue {
  number: string;
  title: string;
  description: string;
}

export interface StackCategory {
  area: string;
  description: string;
  technologies: string[];
}

export interface ProcessStage {
  number: string;
  title: string;
  duration: string;
  summary: string;
  deliverables: string[];
  outcome: string;
}

export const STUDIO_MEDIA = {
  heroSculpture: '/src/assets/images/hero_bronze_ribbon_1795498072392.jpg',
  studioDesk: '/src/assets/images/studio_workspace_desk_1795498064443.jpg',
};

export const WORK_FILTER_CATEGORIES: WorkFilterCategory[] = [
  'All Projects',
  'AI Developer Tools',
  'Client-Side Privacy',
  'Web Architecture',
];

export const projects: Project[] = [
  {
    slug: 'code-enhance-ai',
    index: '01',
    title: 'CodeEnhance AI',
    category: 'AI Developer Platform',
    filterGroup: 'AI Developer Tools',
    year: '2025–2026',
    role: 'Founder, AI Systems & Frontend Architecture',
    tagline:
      'In-browser intelligent code compilation, syntax reasoning, and instant enhancement.',
    summary:
      'A web-based code viewer, real-time compiler, and contextual AI code enhancer helping developers eliminate syntax flaws and optimize runtime efficiency instantly.',
    liveUrl: 'https://code.ladestack.in/',
    metrics: [
      { value: '73%', label: 'Code synthesized via contextual AI passes' },
      { value: '61%', label: 'Measured reduction in syntax and DOM defects' },
      { value: '0ms', label: 'Roundtrip latency for client compilation' },
    ],
    overview: [
      'CodeEnhance AI was engineered to bridge the gap between heavy desktop IDEs and instant browser execution.',
      'By pairing lightweight client-side execution sandboxes with multi-LLM context processors, developers can inspect, format, diff, and refine HTML, CSS, and JavaScript in real time without leaving the browser.',
    ],
    challenge:
      'Modern web learners and shipping engineers frequently bounce between isolated sandboxes, external linters, and disconnected chat windows just to diagnose layout bugs or modernize brittle code.',
    outcome:
      'A cohesive split-pane editorial coding environment that compiles instantaneously in an isolated browser iframe while surfacing surgical, side-by-side semantic improvements.',
    architecturalHighlights: [
      {
        title: 'Client-Side Real-Time Execution',
        description:
          'Zero-dependency sandbox compiling HTML, CSS, and modern JavaScript directly in the browser without server roundtrip lag.',
      },
      {
        title: 'Intelligent Semantic Optimizer',
        description:
          'Automated refactoring pipeline adding missing accessibility attributes, modern syntax constructs, and safer DOM manipulations.',
      },
      {
        title: 'Cross-Device Responsive Inspector',
        description:
          'Fluid viewport testing across mobile, tablet, and widescreen breakpoints with deterministic state preservation.',
      },
    ],
    stack: ['React', 'TypeScript', 'Sandboxed Iframe AST', 'Multi-LLM Streaming', 'Tailwind CSS'],
    image: '/src/assets/images/code_enhance_mockup_1795498070957.jpg',
    gallery: [
      {
        src: '/src/assets/images/code_enhance_mockup_1795498070957.jpg',
        caption: 'Primary split-view syntax diff and contextual AI refinement canvas',
        aspect: '4:3',
      },
      {
        src: '/src/assets/images/lade_suite_mockup_1795498113342.jpg',
        caption: 'Synchronized multi-breakpoint preview and unified Lade Stack workspace',
        aspect: '4:3',
      },
    ],
  },
  {
    slug: 'ls-pdf-toolkit',
    index: '02',
    title: 'LS PDF Toolkit',
    category: 'Zero-Knowledge WebAssembly Suite',
    filterGroup: 'Client-Side Privacy',
    year: '2025–2026',
    role: 'Lead Architect & WebAssembly Engineering',
    tagline:
      '17 client-side PDF utilities running 100% locally with absolute cryptographic privacy.',
    summary:
      'An enterprise-grade document manipulation suite running entirely in the browser using WebAssembly. Merge, split, compress, protect, and convert PDFs with zero file uploads to any cloud server.',
    liveUrl: 'https://pdf.ladestack.in/',
    metrics: [
      { value: '100%', label: 'Local in-browser execution with zero uploads' },
      { value: '17', label: 'Built-in document processing utilities' },
      { value: '0 KB', label: 'Cloud storage or remote server footprint' },
    ],
    overview: [
      'Traditional online PDF services routinely require uploading contracts, financial filings, and identity records onto remote servers with opaque retention policies.',
      'LS PDF Toolkit eliminates that exposure by executing every parsing, rasterization, compression, and cryptographic routine directly inside browser memory via WebAssembly and background workers.',
    ],
    challenge:
      'Browser main threads choke quickly when parsing multi-hundred-page PDF trees, creating janky interfaces or outright memory crashes on mid-range laptops.',
    outcome:
      'A calm, print-inspired document workspace backed by streamed Web Workers that processes complex archival documents locally while keeping frame rates locked.',
    architecturalHighlights: [
      {
        title: 'Zero-Upload Architecture',
        description:
          'Guarantees strict confidentiality and enterprise compliance because documents never leave the local machine.',
      },
      {
        title: 'Multi-Core Web Worker Engine',
        description:
          'Offloads intensive AES encryption, font subsetting, and page rendering to isolated background worker threads.',
      },
      {
        title: 'Memory-Efficient Streaming',
        description:
          'Processes large multi-page document streams incrementally without blocking or freezing UI controls.',
      },
    ],
    stack: ['TypeScript', 'WebAssembly', 'Web Workers', 'PDF Binary Streams', 'Canvas API'],
    image: '/src/assets/images/ls_pdf_toolkit_mockup_1795498084162.jpg',
    gallery: [
      {
        src: '/src/assets/images/ls_pdf_toolkit_mockup_1795498084162.jpg',
        caption: 'Swiss editorial documentation system and tactile archival workflow',
        aspect: '4:3',
      },
      {
        src: '/src/assets/images/studio_workspace_desk_1795498064443.jpg',
        caption: 'Typographic grid studies informing document layout and export controls',
        aspect: '4:3',
      },
    ],
  },
  {
    slug: 'ls-image-engine',
    index: '03',
    title: 'LS Image Engine',
    category: 'High-Performance Media Compression',
    filterGroup: 'Client-Side Privacy',
    year: '2025',
    role: 'Systems Engineer & Creative Direction',
    tagline:
      'Client-side image optimization cutting asset payloads up to 90% without quality loss.',
    summary:
      'A high-throughput browser image compressor and format transcoder supporting 9+ contemporary media formats with zero server latency.',
    liveUrl: 'https://img.ladestack.in/',
    metrics: [
      { value: 'Up to 90%', label: 'Average payload reduction on web exports' },
      { value: '9+', label: 'Contemporary raster and vector formats supported' },
      { value: 'Batch', label: 'Parallel local queue export with instant diff' },
    ],
    overview: [
      'Engineered for designers, photographers, and frontend teams needing rapid batch optimization without sending unreleased brand assets to third-party APIs.',
      'Harnesses modern OffscreenCanvas, WebGL color pipelines, and WASM encoders for perceptual quantization and crisp dimension downscaling.',
    ],
    challenge:
      'Most browser compressors degrade typography edges, wash out subtle bronze shadows, or stall when given a folder of 50+ studio photographs.',
    outcome:
      'A precision darkroom workstation in the browser with real-time luminance inspection, side-by-side quality scrubbing, and parallel batch ZIP exports.',
    architecturalHighlights: [
      {
        title: 'Multi-Format Transcoding',
        description:
          'Seamless bi-directional conversion across WebP, AVIF, PNG, JPEG, and SVG with custom chroma subsampling.',
      },
      {
        title: 'Perceptual Metric Preserving',
        description:
          'Evaluates structural similarity (SSIM) heuristics to protect fine typography and architectural edge fidelity.',
      },
      {
        title: 'Drag & Drop Multi-Thread Queue',
        description:
          'Asynchronous processing pipeline compressing dozens of high-resolution frames concurrently.',
      },
    ],
    stack: ['OffscreenCanvas', 'WebGL Shaders', 'AVIF / WebP WASM', 'TypeScript', 'Streams API'],
    image: '/src/assets/images/ls_image_engine_mockup_1795498069889.jpg',
    gallery: [
      {
        src: '/src/assets/images/ls_image_engine_mockup_1795498069889.jpg',
        caption: 'Dual-monitor histogram calibration and monochrome tone-curve preview',
        aspect: '4:3',
      },
      {
        src: '/src/assets/images/hero_bronze_ribbon_1795498072392.jpg',
        caption: 'High-dynamic-range dark surface gradient compression stress test',
        aspect: '16:9',
      },
    ],
  },
  {
    slug: 'swift-resume',
    index: '04',
    title: 'Swift Resume',
    category: 'Career Intelligence & ATS Compiler',
    filterGroup: 'AI Developer Tools',
    year: '2025',
    role: 'Product Design & Full-Stack Engineering',
    tagline:
      'Algorithmic ATS resume builder with live typographical preview and real-time scoring.',
    summary:
      'An intelligent resume creation engine designed around strict Applicant Tracking System parser standards, pairing Swiss grid typesetting with live keyword auditing.',
    liveUrl: 'https://resume.ladestack.in/',
    metrics: [
      { value: 'Live ATS', label: 'Instant parser compliance and structure audit' },
      { value: 'Vector PDF', label: 'Deterministic print-grade typesetting engine' },
      { value: '100% Free', label: 'Zero paywalls or watermarked exports' },
    ],
    overview: [
      'Talented engineers and designers are routinely filtered out by automated recruiting parsers because decorative resume templates break linear text extraction.',
      'Swift Resume marries Swiss typographic poise with a deterministic parser simulator that inspects section hierarchy, keyword density, and semantic flow as you write.',
    ],
    challenge:
      'Balancing visual elegance that impresses hiring principals with strict single-column machine readability required by legacy ATS ingestion pipelines.',
    outcome:
      'A distraction-free split-canvas manuscript editor producing crystal-clear vector PDFs with local browser encryption and zero subscription traps.',
    architecturalHighlights: [
      {
        title: 'Deterministic Typography Grid',
        description:
          'Generates clean vector PDF exports with exact text layer ordering readable by both human reviewers and parsing bots.',
      },
      {
        title: 'Keyword & Density Heuristics',
        description:
          'Real-time auditing engine flagging missing domain terminology, weak impact verbs, and structural ambiguities.',
      },
      {
        title: 'Local State Encryption',
        description:
          'Personal career history stays encrypted inside local browser storage with zero third-party ad tracking.',
      },
    ],
    stack: ['React', 'TypeScript', 'Vector PDF Renderer', 'NLP Heuristics', 'Local Persistence'],
    image: '/src/assets/images/swift_resume_mockup_1795498069111.jpg',
    gallery: [
      {
        src: '/src/assets/images/swift_resume_mockup_1795498069111.jpg',
        caption: 'Swiss grid monograph typesetting with balanced hierarchy and margin math',
        aspect: '4:3',
      },
      {
        src: '/src/assets/images/ls_pdf_toolkit_mockup_1795498084162.jpg',
        caption: 'Print-ready archival export specifications and paper ratio calibration',
        aspect: '4:3',
      },
    ],
  },
  {
    slug: 'bharat-land',
    index: '05',
    title: 'Bharat Land Converter',
    category: 'Algorithmic Geo-Measurement Engine',
    filterGroup: 'Web Architecture',
    year: '2024–2025',
    role: 'Research, Geospatial Math & PWA Engineering',
    tagline:
      'State-wise land measurement unit conversion engine for Indian property records.',
    summary:
      'A specialized mathematical converter translating regional Indian land units (Guntha, Bigha, Biswa, Cent, Ground, Acre, Hectare) with state-specific legal precision.',
    liveUrl: 'https://land.ladestack.in/',
    metrics: [
      { value: '28 States', label: 'Regional revenue constants calibrated' },
      { value: '12+ Units', label: 'Simultaneous matrix projection per query' },
      { value: 'Offline PWA', label: 'Full accuracy with zero field connectivity' },
    ],
    overview: [
      'Property measurements across India differ dramatically by jurisdiction: a Bigha in Punjab carries a completely different square-foot definition than a Bigha in Rajasthan, Uttar Pradesh, or West Bengal.',
      'Bharat Land Converter resolves regional ambiguity through a curated, state-indexed geospatial conversion matrix accessible instantaneously on desktop and mobile.',
    ],
    challenge:
      'Generic unit calculators apply one flat constant nationwide, leading to costly errors for surveyors, legal clerks, and families verifying ancestral land deeds.',
    outcome:
      'An offline-first progressive web utility trusted for fast, authoritative multi-unit verification across rural and urban districts alike.',
    architecturalHighlights: [
      {
        title: 'State-Specific Calibration',
        description:
          'Dedicated mathematical conversion constants mapped directly to individual Indian state revenue standards.',
      },
      {
        title: 'Instant Multi-Unit Matrix',
        description:
          'Single-input calculation projecting simultaneously across Guntha, Bigha, Biswa, Cent, Ground, Square Meter, Acre, and Hectare.',
      },
      {
        title: 'Offline Progressive PWA',
        description:
          'Service-worker cached computational engine delivering instant results in low-signal field environments.',
      },
    ],
    stack: ['TypeScript', 'PWA / Service Workers', 'Precision Decimal Math', 'React', 'Tailwind CSS'],
    image: '/src/assets/images/bharat_land_mockup_1795498073544.jpg',
    gallery: [
      {
        src: '/src/assets/images/bharat_land_mockup_1795498073544.jpg',
        caption: 'Topographic coordinate grid inspiration and regional calibration system',
        aspect: '4:3',
      },
      {
        src: '/src/assets/images/studio_workspace_desk_1795498064443.jpg',
        caption: 'Field research notes and state revenue table verification studies',
        aspect: '4:3',
      },
    ],
  },
  {
    slug: 'lade-suite',
    index: '06',
    title: 'Lade Suite Enterprise',
    category: 'Unified Developer Ecosystem',
    filterGroup: 'Web Architecture',
    year: '2026',
    role: 'Founder & Principal Systems Architect',
    tagline:
      'One unified developer platform combining API testing, scaffolding, and AI documentation.',
    summary:
      'The master umbrella ecosystem uniting intelligent API test generation, AI-powered documentation synthesizers, and full-stack workflow automation.',
    liveUrl: 'https://ladestack.in/',
    metrics: [
      { value: '8,000+', label: 'Active developers using Lade Stack tools' },
      { value: '100+', label: 'Countries reached organically worldwide' },
      { value: '$0', label: 'Core platform gatekeeping or enterprise tax' },
    ],
    overview: [
      'Lade Suite eliminates fragmented SaaS subscription fatigue by consolidating essential developer workflows into a single, cohesive, open-access engineering platform.',
      'Built from Mumbai for independent builders globally, it delivers production-caliber tooling traditionally locked behind steep enterprise contracts.',
    ],
    challenge:
      'Unifying six specialized utilities under one consistent design language, shared authentication architecture, and predictable sub-second performance budget.',
    outcome:
      'A modular micro-platform ecosystem sharing unified design tokens, keyboard navigation grammar, and zero-friction deployment pipelines.',
    architecturalHighlights: [
      {
        title: 'Autonomous API Mocking',
        description:
          'Intelligent schema deduction synthesizing instant mock endpoints, contract checks, and reproducible load suites.',
      },
      {
        title: 'Documentation AI Synthesizer',
        description:
          'Extracts architectural context from repository boundaries to produce clear, maintainable developer references.',
      },
      {
        title: 'Unified SSO & Workspace',
        description:
          'Cohesive workspace navigation linking every Lade Stack developer application under one shared design system.',
      },
    ],
    stack: ['Next.js / React', 'TypeScript', 'Edge Middleware', 'Design Tokens', 'AI Orchestration'],
    image: '/src/assets/images/lade_suite_mockup_1795498113342.jpg',
    gallery: [
      {
        src: '/src/assets/images/lade_suite_mockup_1795498113342.jpg',
        caption: 'Unified dark obsidian interface system across desktop, tablet, and mobile',
        aspect: '4:3',
      },
      {
        src: '/src/assets/images/code_enhance_mockup_1795498070957.jpg',
        caption: 'Deep integration between Lade Suite workspace and CodeEnhance AI',
        aspect: '4:3',
      },
    ],
  },
];

export const touchpoints: Touchpoint[] = [
  {
    id: 'ai',
    number: '01',
    title: 'AI Systems & Agentic Architecture',
    summary:
      'Context-aware code synthesis, autonomous test generation, and multi-model orchestration pipelines built for deterministic reliability.',
    details: [
      'Custom retrieval pipelines with low-latency vector indexing',
      'Multi-agent task decomposition and automated evaluation gates',
      'Hybrid in-browser and edge inference minimizing cloud egress',
    ],
  },
  {
    id: 'web',
    number: '02',
    title: 'In-Browser Computing & WebAssembly',
    summary:
      'High-performance client-side tooling eliminating server processing bottlenecks and cloud data liability.',
    details: [
      'WebAssembly pipelines for heavy PDF, image, and binary document processing',
      'Web Workers and multi-threaded browser concurrency for responsive UI',
      'Zero-upload cryptographic storage keeping sensitive files on device',
    ],
  },
  {
    id: 'ui',
    number: '03',
    title: 'Editorial Design & Motion Direction',
    summary:
      'Distilling dense engineering workflows into calm, high-contrast, publication-grade digital interfaces.',
    details: [
      'Disciplined Swiss typographic hierarchy and dual-theme design tokens',
      'Framer Motion choreography tuned with custom cubic-bezier physics',
      'Accessible dark and light color architecture meeting WCAG contrast standards',
    ],
  },
  {
    id: 'eng',
    number: '04',
    title: 'Production Engineering & Cloud Scale',
    summary:
      'Architecting resilient, stress-tested full-stack applications engineered for sustained 99.9% uptime.',
    details: [
      'Modern React and TypeScript architectures with strict type safety',
      'Security-first engineering practices and end-to-end data hygiene',
      'Automated verification pipelines and zero-downtime deployment workflows',
    ],
  },
];

export const studioTimeline: TimelineMilestone[] = [
  {
    year: '2020',
    phase: 'Foundations',
    title: 'Independent Engineering & Interface Craft',
    description:
      'Began building precision web interfaces and interactive experiments in Mumbai, focusing on clean semantic HTML, CSS architecture, and raw JavaScript performance.',
    highlights: ['Core Web Fundamentals', 'Creative Coding Experiments', 'First Production Client Builds'],
  },
  {
    year: '2022',
    phase: 'Full-Stack Depth',
    title: 'Distributed Systems & Design Token Architecture',
    description:
      'Expanded into end-to-end TypeScript ecosystems, API engineering, and scalable component libraries designed to survive real-world product iteration.',
    highlights: ['React & TypeScript Systems', 'API & Database Architecture', 'Editorial UI Patterns'],
  },
  {
    year: '2024',
    phase: 'Lade Stack Genesis',
    title: 'Founding Lade Stack & Regional Utility Research',
    description:
      'Established Lade Stack with a clear conviction: essential developer and civic utilities should be fast, private, and free of predatory paywalls. Launched Bharat Land Converter.',
    highlights: ['Lade Stack Platform Launch', 'Bharat Land Converter (28 States)', 'Offline-First PWA Standards'],
  },
  {
    year: '2025',
    phase: 'Client-Side & AI Breakthrough',
    title: 'WebAssembly Privacy Suites & Contextual AI Tools',
    description:
      'Shipped LS PDF Toolkit, LS Image Engine, Swift Resume, and the first generations of CodeEnhance AI — bringing desktop-class computation directly into the browser.',
    highlights: ['17 Zero-Upload PDF Tools', '90% Local Image Compression', 'Real-Time ATS & Code AI'],
  },
  {
    year: '2026',
    phase: 'Unified Ecosystem',
    title: 'Lade Suite Enterprise & Global Developer Community',
    description:
      'Unified the ecosystem under Lade Suite, serving 8,000+ developers across 100+ countries while advising select founders on AI systems and luxury product engineering.',
    highlights: ['8,000+ Developers Worldwide', '100+ Countries Reached', 'Select Architectural Advisory'],
  },
];

export const studioValues: StudioValue[] = [
  {
    number: '01',
    title: 'AI-First Innovation',
    description:
      'AI is treated as structural leverage rather than surface novelty — embedded where it measurably reduces cognitive friction, debugging cycles, and repetitive toil.',
  },
  {
    number: '02',
    title: 'Developer Empowerment',
    description:
      'Independent builders deserve the same craft, speed, and architectural caliber as well-funded teams. Every Lade Stack product is built to remove friction without gatekeeping.',
  },
  {
    number: '03',
    title: 'Production Quality',
    description:
      'Typography, motion curves, keyboard accessibility, edge-case handling, and memory discipline are treated as inseparable parts of a single engineering standard.',
  },
  {
    number: '04',
    title: 'Open Transparency',
    description:
      'Zero hidden data harvesting, zero deceptive upload dark patterns, and clear technical documentation explaining how every tool behaves under the hood.',
  },
];

export const stackMatrix: StackCategory[] = [
  {
    area: 'Interface & Motion',
    description: 'High-contrast editorial frontends with compositor-grade fluidity.',
    technologies: ['React 19', 'Next.js App Router', 'TypeScript 5', 'Tailwind CSS', 'Framer Motion', 'Lenis'],
  },
  {
    area: 'AI & Reasoning Systems',
    description: 'Contextual generation, evaluation loops, and structured output pipelines.',
    technologies: ['Multi-LLM Orchestration', 'RAG Pipelines', 'AST Code Analysis', 'Streaming Interfaces', 'Prompt Evaluation'],
  },
  {
    area: 'Client-Side Computing',
    description: 'Zero-upload browser runtimes that keep sensitive assets local.',
    technologies: ['WebAssembly (WASM)', 'Web Workers', 'OffscreenCanvas', 'WebGL Shaders', 'Service Workers / PWA'],
  },
  {
    area: 'Cloud & Delivery',
    description: 'Resilient full-stack architecture engineered for 99.9% availability.',
    technologies: ['Node.js', 'Edge Middleware', 'PostgreSQL / Redis', 'Automated Test Suites', 'CI/CD Release Gates'],
  },
];

export const processStages: ProcessStage[] = [
  {
    number: '01',
    title: 'Discover',
    duration: 'Week 01',
    summary:
      'Every durable system begins by stripping away assumptions. We deconstruct business goals, audit technical constraints, and pinpoint where AI or client-side architecture creates genuine leverage.',
    deliverables: [
      'Requirement deconstruction & product scope brief',
      'AI feasibility and privacy architecture audit',
      'Technical risk map & milestone schedule',
    ],
    outcome: 'A shared architectural thesis with zero ambiguity before a single line of production code is written.',
  },
  {
    number: '02',
    title: 'Define',
    duration: 'Week 02',
    summary:
      'We translate strategic direction into concrete structure: system topology, editorial design tokens, typographic scale, dual-theme contrast matrices, and interactive wireframes.',
    deliverables: [
      'System architecture & data contract specification',
      'Bespoke design token library & typography scale',
      'Interactive prototype validating core user flows',
    ],
    outcome: 'A tactile visual and technical blueprint aligning design intent with engineering performance budgets.',
  },
  {
    number: '03',
    title: 'Develop',
    duration: 'Weeks 03–05',
    summary:
      'Disciplined, modular execution across frontend, motion choreography, and backend or WebAssembly engines — verified continuously with deterministic unit tests and browser audits.',
    deliverables: [
      'Strict TypeScript component & state architecture',
      'Framer Motion choreography & responsive layouts',
      'Automated unit tests and edge-case verification',
    ],
    outcome: 'A fast, accessible, resilient build that feels effortless on every viewport from 320px to 4K.',
  },
  {
    number: '04',
    title: 'Deliver',
    duration: 'Week 06',
    summary:
      'Launch is treated as an engineering discipline, not an afterthought. We harden performance, run final accessibility and contrast checks, document the codebase, and hand over cleanly.',
    deliverables: [
      'Production deployment configured for 99.9% uptime SLA',
      'Comprehensive architectural & design-system documentation',
      'Post-launch stabilization & clean team handover',
    ],
    outcome: 'A calm, confident release ready for real users from day one.',
  },
];

export const SERVICE_OPTIONS = [
  'AI Application',
  'Design System & Frontend',
  'Full-Stack Architecture',
  'Consulting',
] as const;

export const BUDGET_OPTIONS = [
  'Under $5k',
  '$5k – $15k',
  '$15k – $35k',
  '$35k+ / Retainer',
] as const;
