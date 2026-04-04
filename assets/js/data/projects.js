/**
 * projects.js — Central project data
 * Single source of truth used by projects.js, home.js, and casestudy.js.
 */

export const PROJECTS_DATA = [
  // ── Platforms ──────────────────────────────────────────────────────────────

  {
    slug:      'lymora-learn',
    name:      'Lymora Learn',
    shortDesc: 'AI exam prep platform analysing 10+ years of past questions. 100+ active users.',
    category:  'platforms',
    year:      '2023',
    status:    'Live',
    role:      'Solo — Full Stack + Product',
    overview:  'Lymora Learn is an AI-powered exam prep platform built for Nigerian university students. It processes 10+ years of past exam papers per course, identifies topic frequency distributions and recurring patterns, then uses Claude AI to generate targeted study paths and predict high-yield areas. Over 100 RSU students actively use it to prepare for WAEC and university examinations.',
    problem:   'Nigerian students spend hundreds of hours studying content that rarely appears in exams while neglecting topics that come up repeatedly. No tool existed that used historical exam data to guide study focus intelligently.',
    features: [
      { title: 'Pattern Analysis',    desc: 'Ingests and processes past exam papers to extract topic frequency distributions and identify high-probability question areas across all submitted years.' },
      { title: 'AI Study Paths',      desc: 'Uses Claude AI to generate personalised study plans based on identified patterns, weighted by topic recency and the student\'s declared weak areas.' },
      { title: 'Predicted Topics',    desc: 'Surfaces the most likely topics to appear in upcoming exams, ranked by a prediction score combining frequency, trend direction, and recency.' },
      { title: 'Subscription Tiers',  desc: 'Free preview, standard, and premium plans with server-enforced access gates — subscription state managed via Paystack webhooks.' },
      { title: 'Course Coverage',     desc: 'Supports multiple university courses with fully isolated data sets per subject, preventing cross-contamination between course histories.' },
    ],
    challenges: [
      {
        problem:  'Processing unstructured PDF exam papers into queryable, topic-mapped data.',
        solution: 'Built a PHP pipeline that extracts text from PDFs, normalises inconsistent formatting, then maps questions to course topics using keyword matching and AI classification, with an unclassified bucket for low-confidence results reviewed manually.',
      },
      {
        problem:  'Keeping Claude AI responses accurate and on-topic for exam content without hallucinating.',
        solution: 'Implemented a structured prompt system with strict course-context injection per request, output schema validation, and a fallback path for low-confidence responses that returns a partial answer rather than failing silently.',
      },
      {
        problem:  'Building a subscription system without a dedicated payment SDK on shared hosting.',
        solution: 'Integrated Paystack directly over their REST API — custom webhook handlers for payment confirmation, subscription activation, and renewal tracking, with idempotent event processing to handle duplicate webhook deliveries.',
      },
    ],
    stack: {
      backend:  ['PHP', 'Laravel'],
      database: ['MySQL'],
      frontend: ['JavaScript', 'HTML', 'CSS'],
      tools:    ['Claude AI', 'Paystack', 'PHPMailer'],
    },
    caseStudyReady: false,
    tags:   ['PHP', 'JavaScript', 'MySQL', 'Claude AI'],
    images: [
      '/assets/images/projects/lymora-learn/01.png',
      '/assets/images/projects/lymora-learn/02.png',
      '/assets/images/projects/lymora-learn/03.png',
    ],
    links: {
      github: null,
      live:   'https://lymora.tech',
      docs:   null,
    },
  },

  {
    slug:      'lymora-housing',
    name:      'Lymora Student Housing',
    shortDesc: 'Verified student accommodation marketplace with escrow payments.',
    category:  'platforms',
    year:      '2024',
    status:    'In Development',
    role:      'Solo — Full Stack + Product',
    overview:  'Lymora Student Housing is a verified accommodation marketplace for university students in Port Harcourt, currently under active development. It connects students seeking housing near RSU with vetted landlords and agents, handling the full transaction — listing inspection, escrow payment, and move-in confirmation — on one platform.',
    problem:   'Student accommodation in Nigerian university towns is rife with fraud — agents collect fees for listings that don\'t exist or misrepresent conditions, and students have no reliable way to verify a property before paying.',
    features: [
      { title: 'Verified Listings',  desc: 'All accommodation listings go through a physical inspection process with agent-submitted photo evidence and GPS verification before going live on the platform.' },
      { title: 'Escrow Payments',    desc: 'Rent payments are collected and held in escrow, released to the landlord only after the student confirms successful move-in via a time-limited confirmation window.' },
      { title: 'Agent Fee Caps',     desc: 'Platform-enforced limits on agent commissions, displayed to the student before payment — agents exceeding the cap are flagged and suspended.' },
      { title: 'Search & Filter',    desc: 'Location-based search with filters for price range, room type, amenities, and walking distance to campus gates.' },
      { title: 'End-to-End Booking', desc: 'Full flow from enquiry through inspection scheduling to escrow payment and move-in confirmation, tracked per booking with status notifications.' },
    ],
    challenges: [
      {
        problem:  'Implementing escrow without a native escrow product from Nigerian payment processors.',
        solution: 'Built a custom escrow layer on top of Paystack — funds collected into a designated merchant account, held in an internal ledger, and released via a dual-confirmation trigger that requires both parties to confirm before a payout is initiated.',
      },
      {
        problem:  'Preventing fraudulent listings from reaching the platform before an in-person inspection.',
        solution: 'Designed a two-stage inspection workflow: agents submit photo evidence and a GPS-tagged verification report, then an internal reviewer approves or rejects the listing before it becomes visible to students.',
      },
    ],
    stack: {
      backend:  ['PHP', 'Laravel'],
      database: ['MySQL'],
      frontend: ['JavaScript', 'CSS'],
      tools:    ['Paystack', 'Google Maps API'],
    },
    caseStudyReady: false,
    tags:   ['PHP', 'MySQL', 'JavaScript'],
    images: [
      '/assets/images/projects/lymora-housing/01.png',
      '/assets/images/projects/lymora-housing/02.png',
      '/assets/images/projects/lymora-housing/03.png',
    ],
    links: {
      github: null,
      live:   null,
      docs:   null,
    },
  },

  {
    slug:      'mock-investment-platform',
    name:      'Mock Investment Platform',
    shortDesc: 'Simulated forex and stock trading with real-time charting and live P&L tracking.',
    category:  'platforms',
    year:      '2024',
    status:    'In Development',
    role:      'Solo — Full Stack',
    overview:  'A browser-based simulated trading platform supporting both forex and stock markets. Users manage a virtual portfolio from a starting balance, open and close positions with configurable lot sizes, and track real-time P&L on a live charting interface. Built as a client project for a fintech startup exploring educational trading tools.',
    problem:   'Beginner traders need a risk-free environment to practice reading charts, sizing positions, and managing a portfolio before risking real capital. Existing platforms oversimplify, require broker registration, or don\'t reflect real market mechanics.',
    features: [
      { title: 'Real-Time Charts',  desc: 'Live price charts powered by a WebSocket data feed with multiple timeframe support — 1m, 5m, 15m, 1h, 4h, 1d.' },
      { title: 'Virtual Portfolio', desc: 'Starting virtual balance with open/close position controls, margin tracking, unrealised P&L, and a full portfolio summary dashboard.' },
      { title: 'Live P&L',         desc: 'Profit and loss updated on every price tick, calculated server-side using BCMath to avoid floating-point drift across position durations.' },
      { title: 'Position Sizing',  desc: 'Lot size input with automatic margin requirement and pip value calculation before order submission.' },
      { title: 'Trade History',    desc: 'Complete log of opened and closed positions with entry price, exit price, duration, and net P&L per trade.' },
    ],
    challenges: [
      {
        problem:  'Delivering real-time price data without a paid market data subscription.',
        solution: 'Used a public WebSocket API for mock price data that mirrors real market structure, with a server-side normalisation layer to smooth irregular ticks and ensure OHLC consistency across timeframe aggregations.',
      },
      {
        problem:  'Keeping P&L calculations accurate across floating-point arithmetic in PHP and JavaScript.',
        solution: 'Enforced decimal precision at the API layer using PHP\'s BCMath extension for all P&L and margin calculations, returning pre-computed values to the frontend rather than delegating arithmetic to JavaScript.',
      },
    ],
    stack: {
      backend:  ['PHP', 'Laravel'],
      database: ['MySQL'],
      frontend: ['JavaScript', 'Chart.js'],
      tools:    ['WebSockets'],
    },
    caseStudyReady: false,
    tags:   ['PHP', 'Laravel', 'JavaScript', 'WebSockets'],
    images: [
      '/assets/images/projects/mock-investment-platform/01.png',
      '/assets/images/projects/mock-investment-platform/02.png',
      '/assets/images/projects/mock-investment-platform/03.png',
    ],
    links: {
      github: 'https://github.com/mrwayne-dev',
      live:   null,
      docs:   null,
    },
  },

  {
    slug:      'logistics-tracking',
    name:      'Logistics Tracking Platform',
    shortDesc: 'End-to-end shipment tracking with waybill generation and SMS notifications.',
    category:  'platforms',
    year:      '2024',
    status:    'In Development',
    role:      'Solo — Full Stack',
    overview:  'A logistics management platform for a small delivery company, covering the full shipment lifecycle from waybill generation at pickup to final delivery confirmation. Dispatchers manage operations from a dashboard, drivers update status from a mobile-optimised interface, and customers track their shipment in real time via a unique public link.',
    problem:   'The client was managing deliveries entirely via WhatsApp messages and manual spreadsheets — lost updates, missed deliveries, and no visibility for customers on where their shipment actually was.',
    features: [
      { title: 'Waybill Generation',     desc: 'Auto-generated waybill numbers with QR codes for each shipment, rendered server-side and formatted for A5 print output.' },
      { title: 'Transit Stage Updates',  desc: 'Dispatchers move shipments through defined stages — picked up, in transit, at hub, out for delivery, delivered — with timestamps and driver notes.' },
      { title: 'Driver Assignment',      desc: 'Shipments assigned to registered drivers with a mobile-optimised status update interface requiring no desktop access.' },
      { title: 'Customer SMS Alerts',    desc: 'Automated SMS sent to the recipient at key stage changes — dispatch, arrival at destination hub, and out for delivery.' },
      { title: 'Public Tracking Link',   desc: 'Unique unauthenticated URL per waybill for customer self-service tracking — no login required.' },
    ],
    challenges: [
      {
        problem:  'Integrating SMS notifications without a local Nigerian SMS gateway SDK for PHP.',
        solution: 'Integrated Termii\'s API directly over HTTP — built a wrapper class handling delivery receipts, retry logic for failed sends, and per-endpoint rate limiting to stay within the free-tier constraints.',
      },
      {
        problem:  'Generating printable waybills with dynamic QR codes entirely server-side.',
        solution: 'Used endroid/qr-code via Composer to generate QR images server-side, embedded in a server-rendered HTML template precisely styled for A5 print dimensions with print-specific CSS.',
      },
    ],
    stack: {
      backend:  ['PHP', 'Laravel'],
      database: ['MySQL'],
      frontend: ['JavaScript', 'CSS'],
      tools:    ['Termii SMS API', 'endroid/qr-code'],
    },
    caseStudyReady: false,
    tags:   ['PHP', 'Laravel', 'MySQL', 'JavaScript'],
    images: [
      '/assets/images/projects/logistics-tracking/01.png',
      '/assets/images/projects/logistics-tracking/02.png',
      '/assets/images/projects/logistics-tracking/03.png',
    ],
    links: {
      github: 'https://github.com/mrwayne-dev',
      live:   null,
      docs:   null,
    },
  },

  // ── Web Apps ───────────────────────────────────────────────────────────────

  {
    slug:      'escrow-payment-api',
    name:      'Escrow Payment API',
    shortDesc: 'Payment escrow service with conditional release, dispute flagging, and Paystack.',
    category:  'web-apps',
    year:      '2024',
    status:    'In Development',
    role:      'Solo — Backend',
    overview:  'A standalone REST API providing payment escrow functionality for marketplaces and peer-to-peer platforms. Buyers pay into an escrow account, funds are held until delivery is confirmed, and the seller receives an automatic payout. Disputes trigger a hold state and a manual review flag. Designed to be dropped into any Laravel marketplace with minimal integration work.',
    problem:   'Marketplaces in West Africa struggle to build payment trust between strangers. Without escrow, sellers demand upfront payment while buyers fear non-delivery — both sides lose.',
    features: [
      { title: 'Escrow Initiation',    desc: 'Buyer-initiated escrow creation specifying seller ID, amount, and transaction description — funds collected via Paystack at initiation.' },
      { title: 'Conditional Release',  desc: 'Buyer-triggered release endpoint that transfers funds to the seller after delivery confirmation, with a configurable review window.' },
      { title: 'Dispute Flagging',     desc: 'Either party can raise a dispute via API, which immediately freezes the escrow and creates a flagged review record for manual resolution.' },
      { title: 'Auto-Timeout Release', desc: 'Configurable timeout after which un-disputed escrows auto-release to the seller, preventing indefinite fund holds.' },
      { title: 'Transaction Ledger',   desc: 'Immutable log of every state change per escrow — created, funded, released, disputed, resolved — with actor and timestamp.' },
    ],
    challenges: [
      {
        problem:  'Handling Paystack webhook delivery failures without double-processing fund collection events.',
        solution: 'Implemented idempotent webhook processing with a received-events table keyed on the Paystack event ID — duplicate replays are detected on insert and skipped entirely before any business logic runs.',
      },
      {
        problem:  'Preventing race conditions when concurrent release and dispute requests arrive for the same escrow.',
        solution: 'Used MySQL row-level locking (SELECT ... FOR UPDATE) on the escrow record at the start of every state transition, ensuring only one request can mutate the escrow at a time — the second request receives a 409 Conflict response.',
      },
    ],
    stack: {
      backend:  ['PHP', 'Laravel'],
      database: ['MySQL'],
      frontend: [],
      tools:    ['Paystack'],
    },
    caseStudyReady: false,
    tags:   ['PHP', 'Laravel', 'MySQL', 'Paystack'],
    images: [
      '/assets/images/projects/escrow-payment-api/01.png',
      '/assets/images/projects/escrow-payment-api/02.png',
      '/assets/images/projects/escrow-payment-api/03.png',
    ],
    links: {
      github: 'https://github.com/mrwayne-dev',
      live:   null,
      docs:   null,
    },
  },

  {
    slug:      'exam-pattern-analyzer',
    name:      'Exam Pattern Analyzer API',
    shortDesc: 'REST API that surfaces topic frequency, question patterns, and predicted high-yield areas.',
    category:  'web-apps',
    year:      '2023',
    status:    'In Development',
    role:      'Solo — Backend',
    overview:  'A REST API that accepts uploaded exam paper PDFs or structured question JSON and returns a detailed analysis — topic frequency rankings, question type distribution, year-on-year trend data, and a weighted prediction score for each topic. Built initially as Lymora Learn\'s standalone analysis engine before being integrated directly into the platform.',
    problem:   'Manually reading five years of past papers to identify which topics are most likely to appear is a 40-hour task a student simply won\'t do. No automated tool existed for this in the Nigerian edtech space.',
    features: [
      { title: 'Paper Ingestion',      desc: 'Accepts PDF uploads or structured JSON question arrays per subject and year, with normalisation to a consistent internal schema before analysis.' },
      { title: 'Topic Frequency Map',  desc: 'Returns a ranked list of topics by appearance count across all submitted papers, broken down by year for trend visibility.' },
      { title: 'Question Type Split',  desc: 'Classifies questions as multiple choice, theory, or practical and reports the ratio per topic area.' },
      { title: 'Trend Analysis',       desc: 'Compares topic frequency across submission years to categorise each topic as rising, stable, or declining.' },
      { title: 'Prediction Score',     desc: 'Assigns each topic a weighted score combining frequency, recency, and trend direction into a single high-yield probability ranking.' },
    ],
    challenges: [
      {
        problem:  'Extracting clean question text from inconsistently formatted exam PDFs.',
        solution: 'Built a multi-pass parser using pdfparser that strips headers, page numbers, and footnotes, then splits on question-numbering patterns — numerical, alphabetical, and Roman numeral — with fallback heuristics for malformed documents.',
      },
      {
        problem:  'Classifying questions by topic without a pre-built taxonomy for Nigerian university syllabuses.',
        solution: 'Used keyword matching against a manually maintained topic dictionary per subject, with an unclassified bucket for low-confidence matches that gets reviewed and folded back into the dictionary over time.',
      },
    ],
    stack: {
      backend:  ['PHP', 'Laravel'],
      database: ['MySQL'],
      frontend: [],
      tools:    ['pdfparser'],
    },
    caseStudyReady: false,
    tags:   ['PHP', 'Laravel', 'MySQL', 'REST'],
    images: [
      '/assets/images/projects/exam-pattern-analyzer/01.png',
      '/assets/images/projects/exam-pattern-analyzer/02.png',
      '/assets/images/projects/exam-pattern-analyzer/03.png',
    ],
    links: {
      github: 'https://github.com/mrwayne-dev',
      live:   null,
      docs:   null,
    },
  },

  {
    slug:      'webhook-tester',
    name:      'Webhook Tester',
    shortDesc: 'Live webhook inspector — temporary endpoints, real-time payload capture.',
    category:  'web-apps',
    year:      '2024',
    status:    'In Development',
    role:      'Solo — Full Stack',
    overview:  'A developer tool for inspecting and debugging webhooks. It generates a unique temporary endpoint URL per session, listens for incoming POST requests, and streams the full payload — headers, body, and response metadata — to a live-updating browser interface. Payloads persist for 24 hours before automatic deletion.',
    problem:   'Developing against webhook-driven APIs requires a publicly accessible endpoint for the external service to POST to. Most developers reach for ngrok or throwaway PHP files — both are fragile, short-lived, and give poor visibility into what\'s actually being sent.',
    features: [
      { title: 'Endpoint Generation', desc: 'Creates a unique temporary URL per session with a human-readable identifier — no signup, no configuration required.' },
      { title: 'Real-Time Capture',   desc: 'Incoming requests appear instantly in the browser via Server-Sent Events — no page refresh required, no polling delay.' },
      { title: 'Payload Inspector',   desc: 'Displays HTTP method, all request headers, raw body, parsed JSON body (if applicable), timestamp, and the response code returned to the caller.' },
      { title: 'Response Control',    desc: 'Users configure what status code and body the endpoint returns to the caller — useful for testing retry and failure-handling logic.' },
      { title: '24-Hour Retention',   desc: 'Captured payloads stored for 24 hours then auto-deleted by a scheduled pruning command.' },
    ],
    challenges: [
      {
        problem:  'Delivering real-time payload updates to the browser without WebSockets on a shared Apache host.',
        solution: 'Used Server-Sent Events over a long-polling PHP endpoint — lightweight, no additional infrastructure, and fully compatible with the Apache + mod_rewrite hosting environment.',
      },
      {
        problem:  'Preventing abuse from automated high-volume senders hitting a public endpoint.',
        solution: 'Applied per-endpoint request caps (200 requests/hour) enforced at the route level before payload processing — callers exceeding the cap receive a 429 response with a Retry-After header.',
      },
    ],
    stack: {
      backend:  ['PHP', 'Laravel'],
      database: ['MySQL'],
      frontend: ['JavaScript', 'CSS'],
      tools:    ['Server-Sent Events'],
    },
    caseStudyReady: false,
    tags:   ['PHP', 'Laravel', 'JavaScript', 'REST'],
    images: [
      '/assets/images/projects/webhook-tester/01.png',
      '/assets/images/projects/webhook-tester/02.png',
      '/assets/images/projects/webhook-tester/03.png',
    ],
    links: {
      github: 'https://github.com/mrwayne-dev',
      live:   null,
      docs:   null,
    },
  },

  {
    slug:      'sql-query-explainer',
    name:      'SQL Query Explainer',
    shortDesc: 'Developer tool that translates raw SQL into plain-English with performance notes.',
    category:  'web-apps',
    year:      '2024',
    status:    'In Development',
    role:      'Solo — Full Stack',
    overview:  'A developer tool that takes a raw SQL query as input and returns a plain-English explanation — describing each clause, translating join conditions, explaining WHERE filters in natural language, and flagging common performance issues like missing indexes, SELECT *, or implicit full-table scans. No database connection required.',
    problem:   'Junior developers and non-technical stakeholders regularly encounter SQL queries they cannot read. No lightweight tool existed that explained SQL plainly without requiring a live database, query execution, or an account.',
    features: [
      { title: 'Clause Breakdown',    desc: 'Identifies and explains each SQL clause in order — SELECT columns, FROM source, JOIN conditions, WHERE filters, GROUP BY, ORDER BY, LIMIT.' },
      { title: 'Join Explanation',    desc: 'Describes the type and purpose of each join in plain English, identifying the relationship implied by the ON condition and aliased table names.' },
      { title: 'Performance Flags',   desc: 'Highlights potentially slow patterns — full-table scans, missing WHERE on UPDATE/DELETE, SELECT *, and LIMIT without an index hint.' },
      { title: 'Dual Output Format',  desc: 'Returns both a structured JSON breakdown per clause and a human-readable paragraph explanation for copy-pasting into documentation.' },
      { title: 'MySQL Dialect Support', desc: 'Handles standard SQL with full support for MySQL-specific syntax including backtick quoting, LIMIT/OFFSET, and MySQL function names.' },
    ],
    challenges: [
      {
        problem:  'Parsing complex nested SQL without a full grammar parser library.',
        solution: 'Built a regex-and-tokeniser pipeline that handles the most common SQL patterns accurately; for edge cases with deeply nested subqueries, the tool returns a partial explanation with an explicit note rather than producing a wrong answer silently.',
      },
      {
        problem:  'Generating natural-sounding plain-English output programmatically without an AI dependency.',
        solution: 'Used templated sentence structures per clause type with conditional phrasing triggered by detected SQL patterns — produces consistently readable output that doesn\'t require an LLM call per request.',
      },
    ],
    stack: {
      backend:  ['PHP'],
      database: [],
      frontend: ['JavaScript', 'CSS'],
      tools:    [],
    },
    caseStudyReady: false,
    tags:   ['PHP', 'MySQL', 'JavaScript', 'REST'],
    images: [
      '/assets/images/projects/sql-query-explainer/01.png',
      '/assets/images/projects/sql-query-explainer/02.png',
      '/assets/images/projects/sql-query-explainer/03.png',
    ],
    links: {
      github: 'https://github.com/mrwayne-dev',
      live:   null,
      docs:   null,
    },
  },

  {
    slug:      'id-card-generator',
    name:      'ID Card Generator',
    shortDesc: 'Printable ID card generator with bulk CSV upload and PDF export.',
    category:  'web-apps',
    year:      '2024',
    status:    'Live',
    role:      'Solo — Full Stack',
    overview:  'A web tool for generating institution ID cards — built originally for NIIT Port Harcourt\'s student enrollment process. Users input member details manually or upload a CSV file for batch generation, select from pre-built card templates, upload a photo, preview the card live in-browser, and export to PDF for print.',
    problem:   'NIIT was manually assembling ID cards in Photoshop for every new student intake — a time-consuming process requiring design software access and producing inconsistent results depending on who did the work.',
    features: [
      { title: 'Manual & Bulk Input', desc: 'Single-entry form for individual cards and CSV upload for batch generation with configurable column mapping to template fields.' },
      { title: 'Template System',     desc: 'Multiple pre-defined card templates with institution branding — configurable field positions, font sizes, and colour schemes per template.' },
      { title: 'Photo Upload',        desc: 'Per-student photo upload with automatic server-side crop and resize to the exact card dimensions, normalised to a consistent aspect ratio.' },
      { title: 'Canvas Preview',      desc: 'Live HTML Canvas preview renders the card in real time as fields are filled, before any export is triggered.' },
      { title: 'PDF Export',          desc: 'Server-side PDF generation via dompdf matching the canvas preview dimensions exactly — individual download or full-batch ZIP.' },
    ],
    challenges: [
      {
        problem:  'Matching HTML Canvas preview output to server-side PDF generation with pixel precision.',
        solution: 'Used identical layout measurements in both the Canvas render and the PHP/dompdf template — pixel values converted to millimetre equivalents for PDF, and font sizes calibrated against both outputs until they matched across browsers and print sizes.',
      },
      {
        problem:  'Processing bulk photo uploads for 50+ students without hitting PHP\'s request timeout.',
        solution: 'Split CSV processing into paginated chunks handled synchronously, with progress reported via SSE to the browser — completed PDFs stored temporarily server-side for a batch ZIP download at the end of the run.',
      },
    ],
    stack: {
      backend:  ['PHP'],
      database: [],
      frontend: ['JavaScript', 'HTML Canvas', 'CSS'],
      tools:    ['dompdf'],
    },
    caseStudyReady: true,
    tags:   ['PHP', 'JavaScript', 'HTML Canvas', 'PDF'],
    images: [
      '/assets/images/projects/id-card-generator/01.png',
      '/assets/images/projects/id-card-generator/02.png',
      '/assets/images/projects/id-card-generator/03.png',
    ],
    links: {
      github: 'https://github.com/mrwayne-dev',
      live:   null,
      docs:   null,
    },
  },

  {
    slug:      'niit-website',
    name:      'NIIT Port Harcourt Website',
    shortDesc: 'Institutional website with course listings and enrollment enquiry flow.',
    category:  'web-apps',
    year:      '2023',
    status:    'Live',
    role:      'Solo — Full Stack',
    overview:  'A full institutional website for NIIT Port Harcourt — the technology training institute where Michael studied and later taught. The site covers all offered courses, provides an enrollment enquiry flow, and includes a news and announcements section managed via a simple staff-facing CMS. Built without WordPress or any CMS framework.',
    problem:   'NIIT Port Harcourt had no web presence beyond a Facebook page. Prospective students had no way to find course information, fees, or contact details online — all enquiries happened in person.',
    features: [
      { title: 'Course Listings',         desc: 'All courses displayed with descriptions, duration, fees, and schedule — filterable by category with a dedicated page per course.' },
      { title: 'Enrollment Enquiry Flow', desc: 'Multi-step form capturing prospective student details, preferred course, and contact information, with server-side email notification to staff.' },
      { title: 'Staff CMS',               desc: 'Password-protected admin panel with WYSIWYG editing via Quill.js for publishing news, announcements, and course updates without touching code.' },
      { title: 'Contact Integration',     desc: 'Google Maps embed, phone numbers, and a contact form with PHPMailer-backed email handling.' },
      { title: 'Mobile Responsive',       desc: 'Fully responsive layout built for mobile — where the majority of local traffic originates — with optimised touch targets and navigation.' },
    ],
    challenges: [
      {
        problem:  'Building a usable CMS for non-technical staff without using WordPress or a framework.',
        solution: 'Built a simple password-protected admin panel with Quill.js for WYSIWYG text editing, file uploads, and a posts table in MySQL — staff can publish announcements without touching code or the filesystem.',
      },
      {
        problem:  'Optimising image-heavy course pages for slow connections common in the target area.',
        solution: 'Implemented lazy loading across all images, converted uploads to WebP format on the server side at upload time, and set long-lived browser caching headers for all static assets.',
      },
    ],
    stack: {
      backend:  ['PHP'],
      database: ['MySQL'],
      frontend: ['JavaScript', 'HTML', 'CSS'],
      tools:    ['PHPMailer', 'Quill.js'],
    },
    caseStudyReady: true,
    tags:   ['PHP', 'JavaScript', 'CSS', 'HTML'],
    images: [
      '/assets/images/projects/niit-website/01.png',
      '/assets/images/projects/niit-website/02.png',
      '/assets/images/projects/niit-website/03.png',
    ],
    links: {
      github: null,
      live:   'https://niit.mgbah.dev',
      docs:   null,
    },
  },

  {
    slug:      'portfolio-api',
    name:      'Portfolio API',
    shortDesc: 'PHP backend powering mgbah.dev — contact, rate limiting, email delivery.',
    category:  'web-apps',
    year:      '2024',
    status:    'Live',
    role:      'Solo — Backend',
    overview:  'The PHP backend that powers mgbah.dev — handling the contact form, the footer quick-message form, and the WhatsApp chat widget integration. The backend covers input sanitisation, IP-based rate limiting, SMTP email delivery via PHPMailer, and a Green API integration for forwarding chat messages to WhatsApp. Designed to run on shared Apache hosting without a database or cache dependency.',
    problem:   'A static portfolio site needs dynamic form handling and real-time communication endpoints without a full framework, database, or hosting upgrade.',
    features: [
      { title: 'Contact Form Processing', desc: 'Receives JSON POST requests, validates and sanitises all inputs, sends a notification email to Michael and an auto-reply to the sender.' },
      { title: 'File-Based Rate Limiting', desc: 'IP rate limiter using JSON files in /tmp — 5 requests per 300 seconds — enforced on all endpoints without a Redis or database dependency.' },
      { title: 'WhatsApp Integration',    desc: 'Forwards website chat messages to Michael\'s WhatsApp via Green API with structured message formatting and sender attribution.' },
      { title: 'HTML Auto-Reply',         desc: 'Styled HTML email template sent on every form submission, confirming receipt and setting response time expectations.' },
      { title: 'Security Headers',        desc: 'Full security header suite on all API responses — CSP, X-Frame-Options, X-Content-Type-Options, and Referrer-Policy.' },
    ],
    challenges: [
      {
        problem:  'Implementing rate limiting without Redis or a database on shared Apache hosting.',
        solution: 'Used file-based rate tracking — each IP address hashed to a JSON file in /tmp storing request timestamps, pruned on each request to maintain a sliding window without growing unboundedly.',
      },
      {
        problem:  'Routing a JS SPA and PHP API endpoints from the same origin without conflicts.',
        solution: 'Used Apache .htaccess rewrite rules to route all non-file, non-API requests to index.php for the SPA, while explicitly permitting direct PHP execution only for the two whitelisted API file paths.',
      },
    ],
    stack: {
      backend:  ['PHP'],
      database: [],
      frontend: [],
      tools:    ['PHPMailer', 'Green API', 'Apache'],
    },
    caseStudyReady: false,
    tags:   ['PHP', 'MySQL', 'PHPMailer', 'REST'],
    images: [
      '/assets/images/projects/portfolio-api/01.png',
      '/assets/images/projects/portfolio-api/02.png',
      '/assets/images/projects/portfolio-api/03.png',
    ],
    links: {
      github: 'https://github.com/mrwayne-dev/mgbah.dev',
      live:   null,
      docs:   null,
    },
  },

  // ── Open Source ────────────────────────────────────────────────────────────

  {
    slug:      'laravel-audit-trail',
    name:      'Laravel Audit Trail',
    shortDesc: 'Composer package logging every Eloquent model mutation with full query history.',
    category:  'open-source',
    year:      '2024',
    status:    'In Development',
    role:      'Solo — Package Author',
    overview:  'A Composer package for Laravel applications that automatically records every Eloquent model create, update, and delete event. Each log entry captures the authenticated user, their IP address, the model class, the record ID, the event type, and a before/after attribute diff. The full audit history is queryable via a fluent Eloquent-compatible API.',
    problem:   'Applications handling sensitive data need to answer "who changed this record, when, and what exactly did they change?" — but building audit logging correctly from scratch on every project is repetitive and easy to get wrong.',
    features: [
      { title: 'Auto Model Observation', desc: 'A single trait added to any Eloquent model begins logging all create, update, and delete mutations immediately — no event registration or service provider changes required.' },
      { title: 'Before/After Diffs',     desc: 'Each log entry stores old and new attribute values as JSON, making it straightforward to display changelogs or selectively roll back specific field changes.' },
      { title: 'User Attribution',       desc: 'Automatically captures the authenticated user ID and IP address at mutation time, with a configurable actor resolver for non-HTTP contexts.' },
      { title: 'Queryable History',      desc: 'Fluent query API for retrieving audit logs per model instance, per user, per event type, or within a time range — returns Eloquent collections.' },
      { title: 'Attribute Exclusions',   desc: 'Per-model exclusion list for fields that should never be logged — passwords, API tokens, and any other sensitive attributes.' },
    ],
    challenges: [
      {
        problem:  'Capturing the authenticated user in queue workers and console commands where Auth::user() returns null.',
        solution: 'Added a configurable actor resolver that defaults to Auth::user() in HTTP context and falls back to a statically set actor for non-HTTP contexts — set once in a job\'s handle() method before dispatching Eloquent operations.',
      },
      {
        problem:  'Preventing the audit table from growing unboundedly on high-write applications.',
        solution: 'Shipped a configurable pruning Artisan command that deletes logs older than a configurable threshold, designed to run as a scheduled task via Laravel\'s task scheduler.',
      },
    ],
    stack: {
      backend:  ['PHP', 'Laravel'],
      database: ['MySQL'],
      frontend: [],
      tools:    ['Composer'],
    },
    caseStudyReady: false,
    tags:   ['PHP', 'Laravel', 'Composer', 'MySQL'],
    images: [
      '/assets/images/projects/laravel-audit-trail/01.png',
      '/assets/images/projects/laravel-audit-trail/02.png',
      '/assets/images/projects/laravel-audit-trail/03.png',
    ],
    links: {
      github: 'https://github.com/mrwayne-dev',
      live:   null,
      docs:   null,
    },
  },

  {
    slug:      'php-response-formatter',
    name:      'PHP Response Formatter',
    shortDesc: 'Composer package for standardised JSON API responses across Laravel apps.',
    category:  'open-source',
    year:      '2024',
    status:    'In Development',
    role:      'Solo — Package Author',
    overview:  'A Composer package that enforces a consistent JSON response envelope across all Laravel API endpoints. Every response — success, error, validation failure, or paginated list — is wrapped in a standardised structure with a predictable shape that frontend clients and mobile apps can rely on unconditionally.',
    problem:   'Laravel projects developed across multiple developers or over time accumulate inconsistent API response shapes. Frontend teams waste cycles writing defensive code to handle every variation instead of building features.',
    features: [
      { title: 'Success Helpers',       desc: 'success(), created(), and noContent() methods that wrap data in a consistent envelope with appropriate HTTP status codes and optional metadata.' },
      { title: 'Error Helpers',         desc: 'error(), notFound(), unauthorized(), forbidden(), and serverError() helpers with standardised error shape including machine-readable error codes.' },
      { title: 'Validation Formatting', desc: 'Automatically converts Laravel\'s ValidationException into the standard error envelope with per-field error details in a consistent structure.' },
      { title: 'Paginated Responses',   desc: 'paginated() helper wrapping Laravel\'s Paginator output with explicit metadata — current page, per page, total records, and last page.' },
      { title: 'Exception Handler',     desc: 'Drop-in exception handler that converts all unhandled exceptions into the standard error format, preventing framework internals leaking to API consumers.' },
    ],
    challenges: [
      {
        problem:  'Supporting both plain array and Eloquent API resource responses in the same success() helper without type-checking everywhere.',
        solution: 'Used duck typing — if the passed data object responds to toArray(), it\'s called automatically; otherwise the value is returned as-is — keeping the helper\'s call signature simple for both cases.',
      },
      {
        problem:  'Maintaining compatibility across Laravel 9, 10, and 11 without version-specific code branches.',
        solution: 'Tested against all three versions in CI using interface checks rather than class name comparisons for framework internals that changed between major versions.',
      },
    ],
    stack: {
      backend:  ['PHP', 'Laravel'],
      database: [],
      frontend: [],
      tools:    ['Composer'],
    },
    caseStudyReady: false,
    tags:   ['PHP', 'Composer', 'Laravel', 'REST'],
    images: [
      '/assets/images/projects/php-response-formatter/01.png',
      '/assets/images/projects/php-response-formatter/02.png',
      '/assets/images/projects/php-response-formatter/03.png',
    ],
    links: {
      github: 'https://github.com/mrwayne-dev',
      live:   null,
      docs:   null,
    },
  },

  {
    slug:      'api-key-manager',
    name:      'Rate-Limited API Key Manager',
    shortDesc: 'API key system with per-client rate limiting, usage analytics, and revocation.',
    category:  'open-source',
    year:      '2024',
    status:    'In Development',
    role:      'Solo — Backend + Package Author',
    overview:  'A Laravel package and management API for API key authentication in multi-client backend systems. Client applications authenticate with an issued key; the system enforces configurable per-client rate limits, tracks usage by endpoint and time window, and provides a management interface for key issuance, rotation, and revocation.',
    problem:   'Building per-client API key authentication and rate limiting correctly is non-trivial — most developers reach for a third-party API gateway. For self-hosted Laravel APIs, no drop-in package covered keys, per-client limits, and usage analytics together.',
    features: [
      { title: 'Key Generation',        desc: 'Cryptographically secure API key generation with optional expiry dates, configurable permission scopes, and human-readable key names.' },
      { title: 'Per-Client Rate Limits', desc: 'Configurable request limits per key per time window, enforced at middleware layer before any business logic executes.' },
      { title: 'Usage Analytics',        desc: 'Tracks request counts per key, per endpoint, and per time window — all retrievable via the management API for reporting or billing.' },
      { title: 'Key Revocation',         desc: 'Immediate revocation endpoint that invalidates a key — all subsequent requests with that key receive a 401 response within milliseconds.' },
      { title: 'Middleware Drop-In',     desc: 'A single middleware added to any route group enables key authentication and rate limiting with no additional configuration per route.' },
    ],
    challenges: [
      {
        problem:  'Enforcing rate limits accurately at high concurrency without a Redis or cache backend.',
        solution: 'Implemented atomic MySQL-based counters using INSERT ... ON DUPLICATE KEY UPDATE for increment operations — avoids race conditions on concurrent requests without requiring Redis or any cache infrastructure.',
      },
      {
        problem:  'Supporting both global and per-route rate limits without requiring complex nested configuration.',
        solution: 'Used a two-layer limit check — global key limit enforced first, route-specific limit second if configured — both stored as a simple JSON array on the key record, readable and editable via the API.',
      },
    ],
    stack: {
      backend:  ['PHP', 'Laravel'],
      database: ['MySQL'],
      frontend: [],
      tools:    ['Composer'],
    },
    caseStudyReady: false,
    tags:   ['PHP', 'Laravel', 'MySQL', 'REST'],
    images: [
      '/assets/images/projects/api-key-manager/01.png',
      '/assets/images/projects/api-key-manager/02.png',
      '/assets/images/projects/api-key-manager/03.png',
    ],
    links: {
      github: 'https://github.com/mrwayne-dev',
      live:   null,
      docs:   null,
    },
  },

  {
    slug:      'laravel-cli-scaffolder',
    name:      'Laravel CLI Scaffolder',
    shortDesc: 'CLI tool scaffolding opinionated Laravel structure — service layers in one command.',
    category:  'open-source',
    year:      '2024',
    status:    'In Development',
    role:      'Solo — Package Author',
    overview:  'A Composer package that adds an Artisan command to scaffold an opinionated Laravel project structure in a single command. Instead of manually creating service classes, repositories, modules, and base controllers for every new project, the scaffolder generates the full directory structure, base classes, and configuration in under ten seconds.',
    problem:   'Starting a new Laravel project from the default structure requires significant boilerplate setup before any feature work can begin — creating service layers, defining module boundaries, and writing base classes takes hours per project.',
    features: [
      { title: 'One-Command Setup',    desc: 'php artisan scaffold:init creates the entire opinionated structure — Services/, Repositories/, Contracts/, base classes, and bindings — in one run.' },
      { title: 'Service Layer',        desc: 'Generates abstract BaseService and BaseRepository with common methods pre-implemented — pagination, error handling, and consistent return types.' },
      { title: 'Module Scaffold',      desc: 'Optional --module=Name flag generates a self-contained module directory with its own controller, service, repository, routes file, and migrations folder.' },
      { title: 'Base Controllers',     desc: 'ApiController pre-wired with the PHP Response Formatter for consistent response handling and DRY error handling across all controllers.' },
      { title: 'Publishable Config',   desc: 'Config file publishable via vendor:publish — teams customise naming conventions and directory structure without forking the package.' },
    ],
    challenges: [
      {
        problem:  'Generating valid PHP class files from stubs without a dedicated code generation library.',
        solution: 'Implemented a stub-based generator using tagged placeholder strings replaced at generation time — the same approach Laravel\'s built-in make commands use internally, keeping the implementation simple and the output predictable.',
      },
      {
        problem:  'Making generated module namespaces work with PSR-4 autoloading without manual composer.json edits.',
        solution: 'The scaffolder automatically updates the application\'s composer.json autoload section for new module namespaces, then runs composer dump-autoload programmatically via Symfony Process — fully automated from a single command.',
      },
    ],
    stack: {
      backend:  ['PHP', 'Laravel'],
      database: [],
      frontend: [],
      tools:    ['Composer', 'Artisan CLI'],
    },
    caseStudyReady: false,
    tags:   ['PHP', 'Laravel', 'CLI', 'Composer'],
    images: [
      '/assets/images/projects/laravel-cli-scaffolder/01.png',
      '/assets/images/projects/laravel-cli-scaffolder/02.png',
      '/assets/images/projects/laravel-cli-scaffolder/03.png',
    ],
    links: {
      github: 'https://github.com/mrwayne-dev',
      live:   null,
      docs:   null,
    },
  },

  {
    slug:      'webstarter-cli',
    name:      'WebStarter CLI',
    shortDesc: 'Node.js CLI tool (v2.0.0) that scaffolds complete PHP web application projects interactively.',
    category:  'open-source',
    year:      '2025',
    status:    'Live',
    role:      'Solo — Package Author',
    overview:  'WebStarter CLI is an interactive Node.js command-line tool that scaffolds production-ready PHP web application projects in seconds. Version 2.0.0 introduces a fully interactive prompt flow — the developer answers a short set of questions about their project and receives a complete, structured PHP application with routing, environment config, directory conventions, and optional starter templates already in place. It removes the blank-file problem entirely.',
    problem:   'Starting a PHP project from scratch wastes the first hour on boilerplate — folder structure, config files, .htaccess, environment setup. Every project starts the same way and the setup is never interesting work.',
    features: [
      { title: 'Interactive prompt flow',       desc: 'Step-by-step CLI questions configure the project name, structure, template choice, and environment settings before a single file is written.' },
      { title: 'Complete project scaffold',     desc: 'Generates a full directory tree including routing bootstrap, public entry point, config layer, and organised src directories.' },
      { title: 'Environment config generation', desc: 'Writes a .env file and corresponding config loader pre-populated with the values given during setup.' },
      { title: 'Optional starter templates',    desc: 'Choose between a bare scaffold, a REST API template, or a full-stack PHP/HTML template — each pre-wired to the generated structure.' },
      { title: 'npm distribution',              desc: 'Installed globally via npm. Works on any machine with Node.js — no PHP dependency required to run the scaffolder itself.' },
    ],
    challenges: [
      {
        problem:  'Making the prompt flow feel native to the terminal without pulling in heavy dependencies.',
        solution: 'Used Node.js readline directly for the interactive prompts, keeping the package lean with zero non-essential dependencies.',
      },
      {
        problem:  'Generating a directory tree that works across Windows, macOS, and Linux without path separator bugs.',
        solution: 'Used path.join() throughout and tested the scaffold output on all three platforms before publishing v2.0.0.',
      },
    ],
    stack: {
      backend:  ['Node.js'],
      database: [],
      frontend: [],
      tools:    ['npm', 'readline', 'fs'],
    },
    caseStudyReady: true,
    tags:   ['Node.js', 'CLI', 'npm', 'PHP'],
    images: [
      '/assets/images/projects/webstarter-cli/01.png',
      '/assets/images/projects/webstarter-cli/02.png',
      '/assets/images/projects/webstarter-cli/03.png',
    ],
    links: {
      github: 'https://github.com/mrwayne-dev/webstarter-cli',
      live:   'https://www.npmjs.com/package/webstarter-cli',
      docs:   null,
    },
  },
];
