/**
 * projects.js — Central project data
 * Single source of truth used by projects.js, home.js, casestudy.js, and designstudy.js.
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
    role:      'Solo, Full Stack + Product',
    overview:  'Lymora Learn is an AI-powered exam prep platform built for Nigerian university students. It processes 10+ years of past exam papers per course, identifies topic frequency distributions and recurring patterns, then uses Claude AI to generate targeted study paths and predict high-yield areas. Over 100 RSU students actively use it to prepare for WAEC and university examinations.',
    problem:   'Nigerian students spend hundreds of hours studying content that rarely appears in exams while neglecting topics that come up repeatedly. No tool existed that used historical exam data to guide study focus intelligently.',
    features: [
      { title: 'Pattern Analysis',    desc: 'Ingests and processes past exam papers to extract topic frequency distributions and identify high-probability question areas across all submitted years.' },
      { title: 'AI Study Paths',      desc: 'Uses Claude AI to generate personalised study plans based on identified patterns, weighted by topic recency and the student\'s declared weak areas.' },
      { title: 'Predicted Topics',    desc: 'Surfaces the most likely topics to appear in upcoming exams, ranked by a prediction score combining frequency, trend direction, and recency.' },
      { title: 'Subscription Tiers',  desc: 'Free preview, standard, and premium plans with server-enforced access gates. Subscription state managed via Paystack webhooks.' },
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
        solution: 'Integrated Paystack directly over their REST API. Built custom webhook handlers for payment confirmation, subscription activation, and renewal tracking, with idempotent event processing to handle duplicate webhook deliveries.',
      },
    ],
    stack: {
      backend:  ['PHP', 'Laravel'],
      database: ['MySQL'],
      frontend: ['JavaScript', 'HTML', 'CSS'],
      tools:    ['Claude AI', 'Paystack', 'PHPMailer'],
    },
    caseStudyReady: false,
    howToUse: {
      install: null,
      steps: [
        { step: '01', title: 'Visit the platform', code: null, desc: 'Go to lymora.tech to access Lymora Learn. No download or installation required. The platform runs entirely in the browser.' },
        { step: '02', title: 'Create an account', code: null, desc: 'Sign up with your university email. Your course selections determine which exam data sets and AI analysis you have access to under your chosen plan.' },
        { step: '03', title: 'Select your course', code: null, desc: 'Choose from available subjects. The platform loads the full exam history and frequency analysis for your selected course immediately.' },
        { step: '04', title: 'Review your study path', code: null, desc: 'Claude AI generates a personalised study path based on identified patterns and your declared weak areas. High-yield topics are ranked and surfaced first.' },
        { step: '05', title: 'Prepare with focus', code: null, desc: 'Work through the predicted high-yield topics in ranked order. Track your progress and revisit the analysis as your exam date approaches.' },
      ],
    },
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
    role:      'Solo, Full Stack + Product',
    overview:  'Lymora Student Housing is a verified accommodation marketplace for university students in Port Harcourt, currently under active development. It connects students seeking housing near RSU with vetted landlords and agents, handling the full transaction on one platform: listing inspection, escrow payment, and move-in confirmation.',
    problem:   'Student accommodation in Nigerian university towns is rife with fraud. Agents collect fees for listings that don\'t exist or misrepresent conditions, and students have no reliable way to verify a property before paying.',
    features: [
      { title: 'Verified Listings',  desc: 'All accommodation listings go through a physical inspection process with agent-submitted photo evidence and GPS verification before going live on the platform.' },
      { title: 'Escrow Payments',    desc: 'Rent payments are collected and held in escrow, released to the landlord only after the student confirms successful move-in via a time-limited confirmation window.' },
      { title: 'Agent Fee Caps',     desc: 'Platform-enforced limits on agent commissions, displayed to the student before payment. Agents exceeding the cap are flagged and suspended.' },
      { title: 'Search & Filter',    desc: 'Location-based search with filters for price range, room type, amenities, and walking distance to campus gates.' },
      { title: 'End-to-End Booking', desc: 'Full flow from enquiry through inspection scheduling to escrow payment and move-in confirmation, tracked per booking with status notifications.' },
    ],
    challenges: [
      {
        problem:  'Implementing escrow without a native escrow product from Nigerian payment processors.',
        solution: 'Built a custom escrow layer on top of Paystack. Funds collected into a designated merchant account, held in an internal ledger, and released via a dual-confirmation trigger that requires both parties to confirm before a payout is initiated.',
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
    howToUse: {
      install: null,
      steps: [
        { step: '01', title: 'Visit the platform', code: null, desc: 'Navigate to the Lymora Student Housing platform. Students and landlords both access it through the same entry point. Account type is selected at signup.' },
        { step: '02', title: 'Create an account', code: null, desc: 'Register as a student or landlord/agent. Students need a valid university email; agents go through a brief verification process before listings are enabled for their account.' },
        { step: '03', title: 'Browse verified listings', code: null, desc: 'Search by location, price range, room type, and walking distance to campus. Every visible listing has passed a physical inspection. Unverified properties are never shown to students.' },
        { step: '04', title: 'Book an inspection', code: null, desc: 'Request an in-person inspection for any listing that interests you. The agent is notified and confirms a time slot. All scheduling is handled through the platform.' },
        { step: '05', title: 'Pay via escrow', code: null, desc: 'Once satisfied, pay rent through the platform escrow. Funds are held until you confirm successful move-in. The landlord receives payment only after your confirmation.' },
      ],
    },
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
    role:      'Solo, Full Stack',
    overview:  'A browser-based simulated trading platform supporting both forex and stock markets. Users manage a virtual portfolio from a starting balance, open and close positions with configurable lot sizes, and track real-time P&L on a live charting interface. Built as a client project for a fintech startup exploring educational trading tools.',
    problem:   'Beginner traders need a risk-free environment to practice reading charts, sizing positions, and managing a portfolio before risking real capital. Existing platforms oversimplify, require broker registration, or don\'t reflect real market mechanics.',
    features: [
      { title: 'Real-Time Charts',  desc: 'Live price charts powered by a WebSocket data feed with multiple timeframe support: 1m, 5m, 15m, 1h, 4h, 1d.' },
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
    howToUse: {
      install: null,
      steps: [
        { step: '01', title: 'Visit the platform', code: null, desc: 'Open the Mock Investment Platform in your browser. No downloads or broker registration required. All trading is simulated.' },
        { step: '02', title: 'Create an account', code: null, desc: 'Sign up to receive a virtual starting balance. All activity is simulated. No real money is involved at any point.' },
        { step: '03', title: 'Select a market', code: null, desc: 'Choose from forex pairs or stock tickers. Live price data updates in real time. Charts are available in 1m, 5m, 15m, 1h, 4h, and 1d timeframes.' },
        { step: '04', title: 'Open a position', code: null, desc: 'Enter a lot size to see the margin requirement and pip value calculated automatically. Submit the order to open the position. It appears in your portfolio immediately.' },
        { step: '05', title: 'Track and close', code: null, desc: 'Monitor open positions and live P&L from the portfolio dashboard. Close any position at the current price to lock in the result and update your virtual balance.' },
      ],
    },
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
    role:      'Solo, Full Stack',
    overview:  'A logistics management platform for a small delivery company, covering the full shipment lifecycle from waybill generation at pickup to final delivery confirmation. Dispatchers manage operations from a dashboard, drivers update status from a mobile-optimised interface, and customers track their shipment in real time via a unique public link.',
    problem:   'The client was managing deliveries entirely via WhatsApp messages and manual spreadsheets. Lost updates, missed deliveries, and no visibility for customers on where their shipment actually was.',
    features: [
      { title: 'Waybill Generation',     desc: 'Auto-generated waybill numbers with QR codes for each shipment, rendered server-side and formatted for A5 print output.' },
      { title: 'Transit Stage Updates',  desc: 'Dispatchers move shipments through defined stages (picked up, in transit, at hub, out for delivery, delivered) with timestamps and driver notes.' },
      { title: 'Driver Assignment',      desc: 'Shipments assigned to registered drivers with a mobile-optimised status update interface requiring no desktop access.' },
      { title: 'Customer SMS Alerts',    desc: 'Automated SMS sent to the recipient at key stage changes: dispatch, arrival at destination hub, and out for delivery.' },
      { title: 'Public Tracking Link',   desc: 'Unique unauthenticated URL per waybill for customer self-service tracking. No login required.' },
    ],
    challenges: [
      {
        problem:  'Integrating SMS notifications without a local Nigerian SMS gateway SDK for PHP.',
        solution: 'Integrated Termii\'s API directly over HTTP. Built a wrapper class handling delivery receipts, retry logic for failed sends, and per-endpoint rate limiting to stay within the free-tier constraints.',
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
    howToUse: {
      install: null,
      steps: [
        { step: '01', title: 'Log in as a dispatcher', code: null, desc: 'Dispatchers access the operations dashboard with their staff credentials. All shipment management and driver assignment is done from this interface.' },
        { step: '02', title: 'Create a shipment', code: null, desc: 'Enter pickup and delivery details to generate a waybill. The system assigns a unique waybill number and produces a QR-coded A5 print sheet for the driver.' },
        { step: '03', title: 'Assign a driver', code: null, desc: 'Assign the shipment to a registered driver. The driver receives a notification and updates transit stages from a mobile-optimised interface as the delivery progresses.' },
        { step: '04', title: 'Track via public link', code: null, desc: 'Share the unique public tracking URL with the recipient. They can follow the shipment through each transit stage without logging in. No app download required.' },
      ],
    },
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
    role:      'Solo, Backend',
    overview:  'A standalone REST API providing payment escrow functionality for marketplaces and peer-to-peer platforms. Buyers pay into an escrow account, funds are held until delivery is confirmed, and the seller receives an automatic payout. Disputes trigger a hold state and a manual review flag. Designed to be dropped into any Laravel marketplace with minimal integration work.',
    problem:   'Marketplaces in West Africa struggle to build payment trust between strangers. Without escrow, sellers demand upfront payment while buyers fear non-delivery. Both sides lose.',
    features: [
      { title: 'Escrow Initiation',    desc: 'Buyer-initiated escrow creation specifying seller ID, amount, and transaction description. Funds collected via Paystack at initiation.' },
      { title: 'Conditional Release',  desc: 'Buyer-triggered release endpoint that transfers funds to the seller after delivery confirmation, with a configurable review window.' },
      { title: 'Dispute Flagging',     desc: 'Either party can raise a dispute via API, which immediately freezes the escrow and creates a flagged review record for manual resolution.' },
      { title: 'Auto-Timeout Release', desc: 'Configurable timeout after which un-disputed escrows auto-release to the seller, preventing indefinite fund holds.' },
      { title: 'Transaction Ledger',   desc: 'Immutable log of every state change per escrow (created, funded, released, disputed, resolved) with actor and timestamp.' },
    ],
    challenges: [
      {
        problem:  'Handling Paystack webhook delivery failures without double-processing fund collection events.',
        solution: 'Implemented idempotent webhook processing with a received-events table keyed on the Paystack event ID. Duplicate replays are detected on insert and skipped entirely before any business logic runs.',
      },
      {
        problem:  'Preventing race conditions when concurrent release and dispute requests arrive for the same escrow.',
        solution: 'Used MySQL row-level locking (SELECT ... FOR UPDATE) on the escrow record at the start of every state transition, ensuring only one request can mutate the escrow at a time. The second request receives a 409 Conflict response.',
      },
    ],
    stack: {
      backend:  ['PHP', 'Laravel'],
      database: ['MySQL'],
      frontend: [],
      tools:    ['Paystack'],
    },
    caseStudyReady: false,
    howToUse: {
      install: null,
      steps: [
        { step: '01', title: 'Authenticate requests', code: null, desc: 'All API requests require an Authorization: Bearer {token} header. Tokens are issued per integration via the key management endpoint. Include the token on every call.' },
        { step: '02', title: 'Create an escrow', code: 'POST /api/escrow\n{\n  "seller_id": "usr_456",\n  "amount": 50000,\n  "description": "Laptop purchase"\n}', desc: 'The buyer initiates an escrow with the seller ID, amount, and a transaction description. The API returns an escrow_id and a Paystack payment link to collect the buyer\'s funds.' },
        { step: '03', title: 'Confirm payment', code: null, desc: 'Paystack notifies the API via webhook on successful payment. The escrow state transitions to "funded" automatically and both parties receive an email confirmation.' },
        { step: '04', title: 'Release or dispute', code: 'POST /api/escrow/{id}/release\nPOST /api/escrow/{id}/dispute', desc: 'After delivery, the buyer calls the release endpoint to trigger the seller payout. Either party can raise a dispute to freeze the escrow and flag it for manual review.' },
        { step: '05', title: 'Query escrow state', code: 'GET /api/escrow/{id}', desc: 'Retrieve any escrow record at any time to get its current state, full ledger history, all actors, and timestamps from creation through resolution.' },
      ],
    },
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
    role:      'Solo, Backend',
    overview:  'A REST API that accepts uploaded exam paper PDFs or structured question JSON and returns a detailed analysis: topic frequency rankings, question type distribution, year-on-year trend data, and a weighted prediction score for each topic. Built initially as Lymora Learn\'s standalone analysis engine before being integrated directly into the platform.',
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
        solution: 'Built a multi-pass parser using pdfparser that strips headers, page numbers, and footnotes, then splits on question-numbering patterns (numerical, alphabetical, and Roman numeral) with fallback heuristics for malformed documents.',
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
    howToUse: {
      install: null,
      steps: [
        { step: '01', title: 'Authenticate', code: null, desc: 'All requests require an API key in the Authorization header. Keys are issued per integration. Include the key on every call to the analysis endpoints.' },
        { step: '02', title: 'Upload past papers', code: 'POST /api/papers\nContent-Type: multipart/form-data\n\nsubject=Biology&year=2022&file=<pdf>', desc: 'Upload exam papers as PDF files or submit structured question JSON. Include the subject name and year for each paper. These build the frequency timeline used in analysis.' },
        { step: '03', title: 'Trigger analysis', code: 'POST /api/analyze\n{ "subject": "Biology" }', desc: 'Once papers are uploaded, trigger the analysis job for a subject. The API processes all submitted papers and returns a job_id for polling.' },
        { step: '04', title: 'Retrieve results', code: 'GET /api/analyze/{job_id}/results', desc: 'Poll the results endpoint until status is "complete". The response contains a ranked topic frequency map, trend classifications (rising/stable/declining), and a weighted high-yield prediction score per topic.' },
        { step: '05', title: 'Apply prediction data', code: null, desc: 'Consume the ranked scores in your frontend or study tool. Topics with the highest prediction scores have appeared most frequently and are trending upward. Prioritise these in study plans.' },
      ],
    },
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
    shortDesc: 'Live webhook inspector. Temporary endpoints, real-time payload capture.',
    category:  'web-apps',
    year:      '2024',
    status:    'In Development',
    role:      'Solo, Full Stack',
    overview:  'A developer tool for inspecting and debugging webhooks. It generates a unique temporary endpoint URL per session, listens for incoming POST requests, and streams the full payload (headers, body, and response metadata) to a live-updating browser interface. Payloads persist for 24 hours before automatic deletion.',
    problem:   'Developing against webhook-driven APIs requires a publicly accessible endpoint for the external service to POST to. Most developers reach for ngrok or throwaway PHP files, but both are fragile, short-lived, and give poor visibility into what\'s actually being sent.',
    features: [
      { title: 'Endpoint Generation', desc: 'Creates a unique temporary URL per session with a human-readable identifier. No signup, no configuration required.' },
      { title: 'Real-Time Capture',   desc: 'Incoming requests appear instantly in the browser via Server-Sent Events. No page refresh required, no polling delay.' },
      { title: 'Payload Inspector',   desc: 'Displays HTTP method, all request headers, raw body, parsed JSON body (if applicable), timestamp, and the response code returned to the caller.' },
      { title: 'Response Control',    desc: 'Users configure what status code and body the endpoint returns to the caller, useful for testing retry and failure-handling logic.' },
      { title: '24-Hour Retention',   desc: 'Captured payloads stored for 24 hours then auto-deleted by a scheduled pruning command.' },
    ],
    challenges: [
      {
        problem:  'Delivering real-time payload updates to the browser without WebSockets on a shared Apache host.',
        solution: 'Used Server-Sent Events over a long-polling PHP endpoint. Lightweight, no additional infrastructure, and fully compatible with the Apache + mod_rewrite hosting environment.',
      },
      {
        problem:  'Preventing abuse from automated high-volume senders hitting a public endpoint.',
        solution: 'Applied per-endpoint request caps (200 requests/hour) enforced at the route level before payload processing. Callers exceeding the cap receive a 429 response with a Retry-After header.',
      },
    ],
    stack: {
      backend:  ['PHP', 'Laravel'],
      database: ['MySQL'],
      frontend: ['JavaScript', 'CSS'],
      tools:    ['Server-Sent Events'],
    },
    caseStudyReady: false,
    howToUse: {
      install: null,
      steps: [
        { step: '01', title: 'Open the tool', code: null, desc: 'Navigate to the Webhook Tester in your browser. A unique temporary endpoint URL is generated automatically on page load. No account or signup required.' },
        { step: '02', title: 'Copy your endpoint URL', code: null, desc: 'Copy the generated URL from the inspector header and configure it as the webhook destination in your external service or payment provider dashboard.' },
        { step: '03', title: 'Send a test payload', code: 'curl -X POST https://hook.mgbah.dev/h/abc123 \\\n  -H "Content-Type: application/json" \\\n  -d \'{"event":"payment.success","amount":5000}\'', desc: 'Trigger a delivery to your endpoint from your service or manually via curl. The payload appears in the inspector in real time with full header and body display.' },
        { step: '04', title: 'Configure the response', code: null, desc: 'Set the HTTP status code and body your endpoint returns to the caller. Use this to test retry logic, failure-path handling, and how your integration responds to non-200 replies.' },
        { step: '05', title: 'Review captured payloads', code: null, desc: 'All requests are stored for 24 hours. Review the full delivery history for your endpoint: timestamps, HTTP methods, headers, and parsed JSON for every captured request.' },
      ],
    },
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
    role:      'Solo, Full Stack',
    overview:  'A developer tool that takes a raw SQL query as input and returns a plain-English explanation: each clause described, join conditions translated, WHERE filters explained in natural language, and common performance issues flagged like missing indexes, SELECT *, or implicit full-table scans. No database connection required.',
    problem:   'Junior developers and non-technical stakeholders regularly encounter SQL queries they cannot read. No lightweight tool existed that explained SQL plainly without requiring a live database, query execution, or an account.',
    features: [
      { title: 'Clause Breakdown',    desc: 'Identifies and explains each SQL clause in order: SELECT columns, FROM source, JOIN conditions, WHERE filters, GROUP BY, ORDER BY, LIMIT.' },
      { title: 'Join Explanation',    desc: 'Describes the type and purpose of each join in plain English, identifying the relationship implied by the ON condition and aliased table names.' },
      { title: 'Performance Flags',   desc: 'Highlights potentially slow patterns: full-table scans, missing WHERE on UPDATE/DELETE, SELECT *, and LIMIT without an index hint.' },
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
        solution: 'Used templated sentence structures per clause type with conditional phrasing triggered by detected SQL patterns. Produces consistently readable output without requiring an LLM call per request.',
      },
    ],
    stack: {
      backend:  ['PHP'],
      database: [],
      frontend: ['JavaScript', 'CSS'],
      tools:    [],
    },
    caseStudyReady: false,
    howToUse: {
      install: null,
      steps: [
        { step: '01', title: 'Open the tool', code: null, desc: 'Navigate to the SQL Query Explainer in your browser. No account, database connection, or setup required. Works entirely with query text.' },
        { step: '02', title: 'Paste your SQL', code: 'SELECT u.name, COUNT(o.id) AS order_count\nFROM users u\nLEFT JOIN orders o ON o.user_id = u.id\nGROUP BY u.id\nORDER BY order_count DESC\nLIMIT 10;', desc: 'Paste any SQL query into the input field. Standard SQL and MySQL-specific syntax are both supported, including backtick quoting and MySQL function names.' },
        { step: '03', title: 'Read the explanation', code: null, desc: 'The tool breaks down each clause in plain English: what columns are selected, how tables are joined, what the filters mean, and how results are grouped and ordered.' },
        { step: '04', title: 'Review performance flags', code: null, desc: 'Check the performance section for highlighted issues: full-table scans, SELECT *, missing WHERE on UPDATE/DELETE, or patterns that would benefit from an index.' },
      ],
    },
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
    role:      'Solo, Full Stack',
    overview:  'A web tool for generating institution ID cards, built originally for NIIT Port Harcourt\'s student enrollment process. Users input member details manually or upload a CSV file for batch generation, select from pre-built card templates, upload a photo, preview the card live in-browser, and export to PDF for print.',
    problem:   'NIIT was manually assembling ID cards in Photoshop for every new student intake, a time-consuming process requiring design software access and producing inconsistent results depending on who did the work.',
    features: [
      { title: 'Manual & Bulk Input', desc: 'Single-entry form for individual cards and CSV upload for batch generation with configurable column mapping to template fields.' },
      { title: 'Template System',     desc: 'Multiple pre-defined card templates with institution branding, configurable field positions, font sizes, and colour schemes per template.' },
      { title: 'Photo Upload',        desc: 'Per-student photo upload with automatic server-side crop and resize to the exact card dimensions, normalised to a consistent aspect ratio.' },
      { title: 'Canvas Preview',      desc: 'Live HTML Canvas preview renders the card in real time as fields are filled, before any export is triggered.' },
      { title: 'PDF Export',          desc: 'Server-side PDF generation via dompdf matching the canvas preview dimensions exactly, with individual download or full-batch ZIP.' },
    ],
    challenges: [
      {
        problem:  'Matching HTML Canvas preview output to server-side PDF generation with pixel precision.',
        solution: 'Used identical layout measurements in both the Canvas render and the PHP/dompdf template. Pixel values converted to millimetre equivalents for PDF, and font sizes calibrated against both outputs until they matched across browsers and print sizes.',
      },
      {
        problem:  'Processing bulk photo uploads for 50+ students without hitting PHP\'s request timeout.',
        solution: 'Split CSV processing into paginated chunks handled synchronously, with progress reported via SSE to the browser. Completed PDFs stored temporarily server-side for a batch ZIP download at the end of the run.',
      },
    ],
    stack: {
      backend:  ['PHP'],
      database: [],
      frontend: ['JavaScript', 'HTML Canvas', 'CSS'],
      tools:    ['dompdf'],
    },
    caseStudyReady: true,
    howToUse: {
      install: null,
      steps: [
        { step: '01', title: 'Open the tool', code: null, desc: 'Navigate to the ID Card Generator in your browser. No account required for single-card generation.' },
        { step: '02', title: 'Choose input method', code: null, desc: 'Select single-entry mode to fill one card manually, or upload a CSV for batch generation. For CSV upload, map your column headers to the template fields using the column mapper.' },
        { step: '03', title: 'Select a template', code: null, desc: 'Choose from available card templates, each with pre-positioned fields for name, ID number, department, and photo, styled with institution branding.' },
        { step: '04', title: 'Upload a photo and preview', code: null, desc: 'Upload the student or member photo. The Canvas preview updates in real time as fields are filled. Confirm the card looks correct before exporting.' },
        { step: '05', title: 'Export to PDF', code: null, desc: 'Click Export to generate a print-ready PDF. For batch runs, a ZIP containing all individual PDFs is prepared for download at the end of processing.' },
      ],
    },
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
    role:      'Solo, Full Stack',
    overview:  'A full institutional website for NIIT Port Harcourt, the technology training institute where Michael studied and later taught. The site covers all offered courses, provides an enrollment enquiry flow, and includes a news and announcements section managed via a simple staff-facing CMS. Built without WordPress or any CMS framework.',
    problem:   'NIIT Port Harcourt had no web presence beyond a Facebook page. Prospective students had no way to find course information, fees, or contact details online. All enquiries happened in person.',
    features: [
      { title: 'Course Listings',         desc: 'All courses displayed with descriptions, duration, fees, and schedule, filterable by category with a dedicated page per course.' },
      { title: 'Enrollment Enquiry Flow', desc: 'Multi-step form capturing prospective student details, preferred course, and contact information, with server-side email notification to staff.' },
      { title: 'Staff CMS',               desc: 'Password-protected admin panel with WYSIWYG editing via Quill.js for publishing news, announcements, and course updates without touching code.' },
      { title: 'Contact Integration',     desc: 'Google Maps embed, phone numbers, and a contact form with PHPMailer-backed email handling.' },
      { title: 'Mobile Responsive',       desc: 'Fully responsive layout built for mobile, where the majority of local traffic originates, with optimised touch targets and navigation.' },
    ],
    challenges: [
      {
        problem:  'Building a usable CMS for non-technical staff without using WordPress or a framework.',
        solution: 'Built a simple password-protected admin panel with Quill.js for WYSIWYG text editing, file uploads, and a posts table in MySQL. Staff can publish announcements without touching code or the filesystem.',
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
    howToUse: {
      install: null,
      steps: [
        { step: '01', title: 'Visit the site', code: null, desc: 'Go to niit.mgbah.dev to access the NIIT Port Harcourt website. The site is publicly accessible with no login required to browse courses or submit an enquiry.' },
        { step: '02', title: 'Browse courses', code: null, desc: 'Navigate to the Courses section to view all available programmes. Each course page includes duration, schedule, fees, and a full syllabus overview.' },
        { step: '03', title: 'Submit an enrollment enquiry', code: null, desc: 'Click Enroll on any course page to open the multi-step enquiry form. Fill in your contact details and preferred start date. Staff receive an immediate email notification.' },
        { step: '04', title: 'Read news and announcements', code: null, desc: 'The News section is updated by NIIT staff via the admin CMS. Check here for intake announcements, schedule changes, and institution updates.' },
      ],
    },
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
    shortDesc: 'PHP backend powering mgbah.dev: contact, rate limiting, email delivery.',
    category:  'web-apps',
    year:      '2024',
    status:    'Live',
    role:      'Solo, Backend',
    overview:  'The PHP backend that powers mgbah.dev, handling the contact form, the footer quick-message form, and the WhatsApp chat widget integration. The backend covers input sanitisation, IP-based rate limiting, SMTP email delivery via PHPMailer, and a Green API integration for forwarding chat messages to WhatsApp. Designed to run on shared Apache hosting without a database or cache dependency.',
    problem:   'A static portfolio site needs dynamic form handling and real-time communication endpoints without a full framework, database, or hosting upgrade.',
    features: [
      { title: 'Contact Form Processing',  desc: 'Receives JSON POST requests, validates and sanitises all inputs, sends a notification email to Michael and an auto-reply to the sender.' },
      { title: 'File-Based Rate Limiting', desc: 'IP rate limiter using JSON files in /tmp, limited to 5 requests per 300 seconds, enforced on all endpoints without a Redis or database dependency.' },
      { title: 'WhatsApp Integration',     desc: 'Forwards website chat messages to Michael\'s WhatsApp via Green API with structured message formatting and sender attribution.' },
      { title: 'HTML Auto-Reply',          desc: 'Styled HTML email template sent on every form submission, confirming receipt and setting response time expectations.' },
      { title: 'Security Headers',         desc: 'Full security header suite on all API responses: CSP, X-Frame-Options, X-Content-Type-Options, and Referrer-Policy.' },
    ],
    challenges: [
      {
        problem:  'Implementing rate limiting without Redis or a database on shared Apache hosting.',
        solution: 'Used file-based rate tracking. Each IP address is hashed to a JSON file in /tmp storing request timestamps, pruned on each request to maintain a sliding window without growing unboundedly.',
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
    howToUse: {
      install: null,
      steps: [
        { step: '01', title: 'Send a contact message', code: 'POST /api/contact.php\nContent-Type: application/json\n\n{\n  "name": "Jane Doe",\n  "email": "jane@example.com",\n  "message": "Hello"\n}', desc: 'POST a JSON body to the contact endpoint. All three fields are required. The API sanitises inputs, sends Michael a notification email, and sends the sender an HTML auto-reply.' },
        { step: '02', title: 'Send a chat message', code: 'POST /api/chat.php\nContent-Type: application/json\n\n{ "name": "Jane", "message": "Hi there" }', desc: 'POST to the chat endpoint to forward a message to Michael\'s WhatsApp via Green API. The message arrives formatted with sender name and website attribution.' },
        { step: '03', title: 'Handle the response', code: '{ "success": true, "message": "Message sent." }', desc: 'Both endpoints return a JSON response with a success boolean and a message string. On failure, a descriptive error and the appropriate HTTP status code are returned.' },
        { step: '04', title: 'Respect rate limits', code: null, desc: 'Both endpoints enforce a limit of 5 requests per 300-second window per IP address. Requests over the limit receive a 429 response. The window resets automatically after 5 minutes.' },
      ],
    },
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
    role:      'Solo, Package Author',
    overview:  'A Composer package for Laravel applications that automatically records every Eloquent model create, update, and delete event. Each log entry captures the authenticated user, their IP address, the model class, the record ID, the event type, and a before/after attribute diff. The full audit history is queryable via a fluent Eloquent-compatible API.',
    problem:   'Applications handling sensitive data need to answer "who changed this record, when, and what exactly did they change?" Building audit logging correctly from scratch on every project is repetitive and easy to get wrong.',
    features: [
      { title: 'Auto Model Observation', desc: 'A single trait added to any Eloquent model begins logging all create, update, and delete mutations immediately, with no event registration or service provider changes required.' },
      { title: 'Before/After Diffs',     desc: 'Each log entry stores old and new attribute values as JSON, making it straightforward to display changelogs or selectively roll back specific field changes.' },
      { title: 'User Attribution',       desc: 'Automatically captures the authenticated user ID and IP address at mutation time, with a configurable actor resolver for non-HTTP contexts.' },
      { title: 'Queryable History',      desc: 'Fluent query API for retrieving audit logs per model instance, per user, per event type, or within a time range. Returns Eloquent collections.' },
      { title: 'Attribute Exclusions',   desc: 'Per-model exclusion list for fields that should never be logged: passwords, API tokens, and any other sensitive attributes.' },
    ],
    challenges: [
      {
        problem:  'Capturing the authenticated user in queue workers and console commands where Auth::user() returns null.',
        solution: 'Added a configurable actor resolver that defaults to Auth::user() in HTTP context and falls back to a statically set actor for non-HTTP contexts. Set it once in a job\'s handle() method before dispatching Eloquent operations.',
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
    howToUse: {
      install: 'composer require mrwayne/laravel-audit-trail',
      steps: [
        { step: '01', title: 'Install the package', code: 'composer require mrwayne/laravel-audit-trail\nphp artisan migrate', desc: 'Install via Composer. Laravel\'s package auto-discovery registers the service provider automatically. Run migrate to create the audit_logs table.' },
        { step: '02', title: 'Add the trait', code: "use MrWayne\\AuditTrail\\Auditable;\n\nclass User extends Model\n{\n    use Auditable;\n}", desc: 'Add the Auditable trait to any Eloquent model you want to log. All create, update, and delete events on that model are recorded automatically from that point forward.' },
        { step: '03', title: 'Exclude sensitive fields', code: "protected \$auditExclude = ['password', 'remember_token', 'api_key'];", desc: 'Define an $auditExclude array on any model to prevent specific attributes from ever being written to the audit log: passwords, tokens, and any sensitive fields.' },
        { step: '04', title: 'Query the audit history', code: "\$user->audits()->latest()->get();\nAuditLog::forModel(\$user)->byUser(\$actorId)->get();", desc: 'Retrieve audit logs per model instance, per user, per event type, or within a date range using the fluent query API. All results return as Eloquent collections.' },
        { step: '05', title: 'Schedule pruning', code: "// In App\\Console\\Kernel.php\n\$schedule->command('audit:prune --days=90')->daily();", desc: 'Schedule the pruning command to keep the audit table from growing indefinitely. Configure the retention threshold. Logs older than the specified days are deleted on each run.' },
      ],
    },
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
    role:      'Solo, Package Author',
    overview:  'A Composer package that enforces a consistent JSON response envelope across all Laravel API endpoints. Every response, whether a success, error, validation failure, or paginated list, is wrapped in a standardised structure with a predictable shape that frontend clients and mobile apps can rely on unconditionally.',
    problem:   'Laravel projects developed across multiple developers or over time accumulate inconsistent API response shapes. Frontend teams waste cycles writing defensive code to handle every variation instead of building features.',
    features: [
      { title: 'Success Helpers',       desc: 'success(), created(), and noContent() methods that wrap data in a consistent envelope with appropriate HTTP status codes and optional metadata.' },
      { title: 'Error Helpers',         desc: 'error(), notFound(), unauthorized(), forbidden(), and serverError() helpers with standardised error shape including machine-readable error codes.' },
      { title: 'Validation Formatting', desc: 'Automatically converts Laravel\'s ValidationException into the standard error envelope with per-field error details in a consistent structure.' },
      { title: 'Paginated Responses',   desc: 'paginated() helper wrapping Laravel\'s Paginator output with explicit metadata: current page, per page, total records, and last page.' },
      { title: 'Exception Handler',     desc: 'Drop-in exception handler that converts all unhandled exceptions into the standard error format, preventing framework internals leaking to API consumers.' },
    ],
    challenges: [
      {
        problem:  'Supporting both plain array and Eloquent API resource responses in the same success() helper without type-checking everywhere.',
        solution: 'Used duck typing. If the passed data object responds to toArray(), it\'s called automatically; otherwise the value is returned as-is, keeping the helper\'s call signature simple for both cases.',
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
    howToUse: {
      install: 'composer require mrwayne/php-response-formatter',
      steps: [
        { step: '01', title: 'Install the package', code: 'composer require mrwayne/php-response-formatter', desc: 'Install via Composer. The service provider registers automatically with no manual setup required.' },
        { step: '02', title: 'Use in your controllers', code: "use MrWayne\\ResponseFormatter\\Response;\n\nreturn Response::success(\$data);\nreturn Response::created(\$resource);\nreturn Response::error('Not found', 404);", desc: 'Call static helpers on the Response class from any controller. Each method returns a JsonResponse with the standard envelope structure and the correct HTTP status code.' },
        { step: '03', title: 'Handle validation errors', code: "// In App\\Exceptions\\Handler.php\nuse MrWayne\\ResponseFormatter\\Exceptions\\Handler as FormatterHandler;\n\nclass Handler extends FormatterHandler {}", desc: 'Extend the package\'s exception handler to automatically format Laravel\'s ValidationException responses into the standard envelope with per-field error details.' },
        { step: '04', title: 'Return paginated data', code: "\$users = User::paginate(15);\nreturn Response::paginated(\$users);", desc: 'Wrap any Laravel Paginator with Response::paginated(). The response includes data, current page, per-page count, total records, and last page, all in the standard envelope.' },
      ],
    },
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
    role:      'Solo, Backend + Package Author',
    overview:  'A Laravel package and management API for API key authentication in multi-client backend systems. Client applications authenticate with an issued key; the system enforces configurable per-client rate limits, tracks usage by endpoint and time window, and provides a management interface for key issuance, rotation, and revocation.',
    problem:   'Building per-client API key authentication and rate limiting correctly is non-trivial. Most developers reach for a third-party API gateway. For self-hosted Laravel APIs, no drop-in package covered keys, per-client limits, and usage analytics together.',
    features: [
      { title: 'Key Generation',        desc: 'Cryptographically secure API key generation with optional expiry dates, configurable permission scopes, and human-readable key names.' },
      { title: 'Per-Client Rate Limits', desc: 'Configurable request limits per key per time window, enforced at middleware layer before any business logic executes.' },
      { title: 'Usage Analytics',        desc: 'Tracks request counts per key, per endpoint, and per time window, all retrievable via the management API for reporting or billing.' },
      { title: 'Key Revocation',         desc: 'Immediate revocation endpoint that invalidates a key. All subsequent requests with that key receive a 401 response within milliseconds.' },
      { title: 'Middleware Drop-In',     desc: 'A single middleware added to any route group enables key authentication and rate limiting with no additional configuration per route.' },
    ],
    challenges: [
      {
        problem:  'Enforcing rate limits accurately at high concurrency without a Redis or cache backend.',
        solution: 'Implemented atomic MySQL-based counters using INSERT ... ON DUPLICATE KEY UPDATE for increment operations. This avoids race conditions on concurrent requests without requiring Redis or any cache infrastructure.',
      },
      {
        problem:  'Supporting both global and per-route rate limits without requiring complex nested configuration.',
        solution: 'Used a two-layer limit check: global key limit enforced first, route-specific limit second if configured. Both stored as a simple JSON array on the key record, readable and editable via the API.',
      },
    ],
    stack: {
      backend:  ['PHP', 'Laravel'],
      database: ['MySQL'],
      frontend: [],
      tools:    ['Composer'],
    },
    caseStudyReady: false,
    howToUse: {
      install: 'composer require mrwayne/api-key-manager',
      steps: [
        { step: '01', title: 'Install and migrate', code: 'composer require mrwayne/api-key-manager\nphp artisan migrate', desc: 'Install via Composer. Run migrate to create the api_keys and api_key_usage tables. The service provider and middleware register automatically.' },
        { step: '02', title: 'Protect your routes', code: "Route::middleware('api.key')->group(function () {\n    Route::get('/data', [DataController::class, 'index']);\n});", desc: 'Add the api.key middleware to any route group. Requests must include a valid key in the Authorization or X-API-Key header. Invalid or missing keys return a 401 immediately.' },
        { step: '03', title: 'Issue a key', code: "POST /api/keys\n{\n  \"name\": \"Partner App\",\n  \"rate_limit\": 1000,\n  \"window_seconds\": 3600\n}", desc: 'Use the management API to issue a new key with a name, rate limit (requests per window), and window duration. The generated key string is returned once and must be stored securely.' },
        { step: '04', title: 'Monitor usage', code: 'GET /api/keys/{id}/usage', desc: 'Query the usage endpoint for any key to retrieve request counts by endpoint and time window. Use this data for client billing, capacity planning, or abuse detection.' },
        { step: '05', title: 'Revoke a key', code: 'DELETE /api/keys/{id}', desc: 'Immediately revoke any key via the management API. All subsequent requests using that key return a 401 response within milliseconds of revocation.' },
      ],
    },
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
    shortDesc: 'CLI tool scaffolding opinionated Laravel structure with service layers in one command.',
    category:  'open-source',
    year:      '2024',
    status:    'In Development',
    role:      'Solo, Package Author',
    overview:  'A Composer package that adds an Artisan command to scaffold an opinionated Laravel project structure in a single command. Instead of manually creating service classes, repositories, modules, and base controllers for every new project, the scaffolder generates the full directory structure, base classes, and configuration in under ten seconds.',
    problem:   'Starting a new Laravel project from the default structure requires significant boilerplate setup before any feature work can begin. Creating service layers, defining module boundaries, and writing base classes takes hours per project.',
    features: [
      { title: 'One-Command Setup',    desc: 'php artisan scaffold:init creates the entire opinionated structure: Services/, Repositories/, Contracts/, base classes, and bindings, in one run.' },
      { title: 'Service Layer',        desc: 'Generates abstract BaseService and BaseRepository with common methods pre-implemented: pagination, error handling, and consistent return types.' },
      { title: 'Module Scaffold',      desc: 'Optional --module=Name flag generates a self-contained module directory with its own controller, service, repository, routes file, and migrations folder.' },
      { title: 'Base Controllers',     desc: 'ApiController pre-wired with the PHP Response Formatter for consistent response handling and DRY error handling across all controllers.' },
      { title: 'Publishable Config',   desc: 'Config file publishable via vendor:publish. Teams customise naming conventions and directory structure without forking the package.' },
    ],
    challenges: [
      {
        problem:  'Generating valid PHP class files from stubs without a dedicated code generation library.',
        solution: 'Implemented a stub-based generator using tagged placeholder strings replaced at generation time. This is the same approach Laravel\'s built-in make commands use internally, keeping the implementation simple and the output predictable.',
      },
      {
        problem:  'Making generated module namespaces work with PSR-4 autoloading without manual composer.json edits.',
        solution: 'The scaffolder automatically updates the application\'s composer.json autoload section for new module namespaces, then runs composer dump-autoload programmatically via Symfony Process. Fully automated from a single command.',
      },
    ],
    stack: {
      backend:  ['PHP', 'Laravel'],
      database: [],
      frontend: [],
      tools:    ['Composer', 'Artisan CLI'],
    },
    caseStudyReady: false,
    howToUse: {
      install: 'composer require mrwayne/laravel-cli-scaffolder --dev',
      steps: [
        { step: '01', title: 'Install the package', code: 'composer require mrwayne/laravel-cli-scaffolder --dev', desc: 'Install as a dev dependency via Composer on a fresh Laravel project. Artisan commands register automatically via package auto-discovery.' },
        { step: '02', title: 'Scaffold the base structure', code: 'php artisan scaffold:init', desc: 'Run scaffold:init to generate Services/, Repositories/, Contracts/, base classes, and service provider bindings in one pass. The entire opinionated structure is created in seconds.' },
        { step: '03', title: 'Scaffold a module', code: 'php artisan scaffold:module Payments', desc: 'Generate a self-contained module with its own controller, service, repository, routes file, and migrations folder. The namespace is automatically added to composer.json and autoload is refreshed.' },
        { step: '04', title: 'Publish and customise config', code: 'php artisan vendor:publish --tag=scaffolder-config', desc: 'Publish the config file to customise naming conventions and directory structure for your team\'s standards, without forking the package or modifying vendor files.' },
      ],
    },
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
    name:      'create-php-starter',
    shortDesc: 'Complexity-aware PHP + JS scaffolding CLI. Generates a clean SPA-ready structure with optional auth, admin, PHPMailer, and Phosphor Icons.',
    category:  'open-source',
    year:      '2025',
    status:    'Live',
    role:      'Solo, Package Author',
    caseStudyReady: true,
    overview:  'create-php-starter is a Node.js CLI tool published on npm that scaffolds complete, production-structured PHP web application projects through an interactive terminal prompt flow. Version 1.1.2 introduces complexity-aware scaffolding. The developer picks a complexity tier (Simple, Medium, or Complex) and the tool generates a matching directory structure, routing bootstrap, environment config, and optional extras. It eliminates the blank-project problem entirely: run one command, answer a few questions, and start building.',
    problem:   'Every PHP project starts the same way: 30 minutes of creating folders, wiring up an entry point, setting up .htaccess, writing a .env loader, and copying in boilerplate nobody wants to write again. The setup is never the interesting part, but skipping it always causes problems later.',
    features: [
      {
        title: 'Complexity-aware scaffolding',
        desc:  'Three tiers: Simple, Medium, and Complex. Each generates a different project structure scaled to the scope of the work. A landing page and a full SPA should not share the same starting point.',
      },
      {
        title: 'Interactive prompt flow',
        desc:  'Powered by Inquirer.js. The CLI asks for project name, complexity tier, and optional features before writing a single file. No flags to memorise, no docs to read first.',
      },
      {
        title: 'Optional auth scaffold',
        desc:  'Choose to include a pre-wired authentication layer: session handling, login/logout routes, and a middleware stub, already integrated into the generated structure.',
      },
      {
        title: 'Optional admin panel structure',
        desc:  'Generates a separated admin directory with its own routing context, layout, and access control stub, cleanly separated from the public-facing application.',
      },
      {
        title: 'PHPMailer integration',
        desc:  'Optionally bootstraps PHPMailer into the project with a pre-configured mailer helper and .env keys for SMTP. Ready to send email on day one.',
      },
      {
        title: 'Phosphor Icons pre-wired',
        desc:  'Optionally includes the Phosphor Icons CDN link and a usage example in the generated HTML entry point, for zero setup for icons in new projects.',
      },
    ],
    challenges: [
      {
        problem:  'Generating different file trees for three complexity tiers without the codebase becoming a maintenance nightmare of nested conditionals.',
        solution: 'Each tier is driven by a declarative config object that describes its directory tree and file list. The generator walks the config. The logic stays clean regardless of how many tiers or options are added.',
      },
      {
        problem:  'Making the interactive prompt flow feel natural across Windows Command Prompt, PowerShell, macOS Terminal, and Linux shells.',
        solution: 'Used Inquirer.js for all prompts and ora for spinner feedback, both of which handle terminal compatibility. Tested the full flow on all three platforms before publishing.',
      },
      {
        problem:  'Keeping the package lightweight while supporting shelljs, chalk, inquirer, and ora as dependencies.',
        solution: 'All four are well-maintained, minimal-footprint packages. chalk v4 was chosen specifically to maintain CommonJS compatibility with the current Node.js target (>=16).',
      },
    ],
    howToUse: {
      install: 'npm create php-starter@latest',
      steps: [
        { step: '01', title: 'Run the command', code: 'npm create php-starter@latest', desc: 'Runs the CLI directly from npm without a global install. No setup needed beforehand.' },
        { step: '02', title: 'Name your project', code: null, desc: 'The CLI prompts for a project name. This becomes the root folder name and is embedded into generated config files.' },
        { step: '03', title: 'Choose complexity', code: null, desc: 'Pick Simple, Medium, or Complex. Each generates a different directory structure matched to the scope of the project.' },
        { step: '04', title: 'Select optional features', code: null, desc: 'Choose which extras to include: authentication scaffold, admin panel structure, PHPMailer integration, Phosphor Icons.' },
        { step: '05', title: 'Start building', code: 'cd your-project && php -S localhost:8000 -t public', desc: 'The scaffold is complete. Your project structure is ready and the dev server starts immediately.' },
      ],
    },
    stack: {
      backend:  ['Node.js', 'PHP (generated output)'],
      database: [],
      frontend: [],
      tools:    ['npm', 'Inquirer.js', 'chalk', 'ora', 'shelljs'],
    },
    tags:   ['Node.js', 'CLI', 'npm', 'PHP'],
    images: [
      '/assets/images/projects/webstarter-cli/01.png',
      '/assets/images/projects/webstarter-cli/02.png',
      '/assets/images/projects/webstarter-cli/03.png',
    ],
    links: {
      github: 'https://github.com/mrwayne-dev/create-web-starter',
      live:   'https://www.npmjs.com/package/create-php-starter',
      docs:   null,
    },
  },
];

// ── Design Work ────────────────────────────────────────────────────────────────

export const DESIGNS_DATA = [
  {
    slug:     'lymora-brand',
    name:     'Lymora Brand Identity',
    shortDesc: 'Logo, colour system, and typography for Lymora\'s suite of student products.',
    tools:    ['Figma', 'Illustrator'],
    year:     '2023',
    client:   'Lymora (self)',
    category: 'branding',
    brief:    'Lymora needed a brand identity that felt credible to university students: professional enough to be trusted with their academic preparation, but approachable enough not to feel like another corporate edtech product. The identity had to scale across a web app, marketing pages, and a housing platform under the same brand.',
    process: [
      { phase: 'Discovery',   desc: 'Defined brand values (clarity, trust, ambition) and researched competitor identities in the edtech space. Identified a gap for clean, minimal student-facing branding in the Nigerian market.' },
      { phase: 'Concept',     desc: 'Explored three visual directions: wordmark-only, symbol + wordmark, and geometric monogram. The symbol + wordmark route won for flexibility across small and large applications.' },
      { phase: 'Refinement',  desc: 'Iterated on the logotype letterforms in Illustrator, tuning spacing and weight. Developed the full colour system (primary, secondary, and surface tokens) in Figma.' },
      { phase: 'Delivery',    desc: 'Packaged the final identity as a Figma component library with all variants, a colour styles reference, and exported assets in SVG, PNG, and PDF formats.' },
    ],
    outcome:  'The Lymora brand identity has been applied across lymora.tech, the Student Housing platform, and all marketing assets since 2023. The token-based colour system made it straightforward to maintain consistency across product surfaces without a redesign.',
    images:  [
      '/assets/images/designs/lymora-brand/01.png',
      '/assets/images/designs/lymora-brand/02.png',
      '/assets/images/designs/lymora-brand/03.png',
    ],
    caseStudyReady: true,
    href:    null,
  },

  {
    slug:     'lymora-learn-ui',
    name:     'Lymora Learn: UI Design',
    shortDesc: 'End-to-end UI for the exam prep app: onboarding, question flow, and results.',
    tools:    ['Figma'],
    year:     '2023',
    client:   'Lymora (self)',
    category: 'ui-ux',
    brief:    'Design the complete UI for Lymora Learn, a web app used by Nigerian university students to prepare for exams using AI-driven pattern analysis. The product needed a clear onboarding flow, a readable question pattern interface, and a results view that communicated predicted high-yield topics without overwhelming the user.',
    process: [
      { phase: 'User Flows',      desc: 'Mapped the core journeys: sign up, course selection, study path view, and topic drill-down. Identified friction points in the original prototype and simplified onboarding to three steps.' },
      { phase: 'Wireframes',      desc: 'Low-fidelity wireframes in Figma for all key screens. Validated the navigation hierarchy and information density with two student testers before moving to visual design.' },
      { phase: 'Visual Design',   desc: 'Applied the Lymora brand system. Designed the data-heavy pattern analysis views using typographic hierarchy to communicate rankings clearly without relying on complex charts.' },
      { phase: 'Build Handoff',   desc: 'Prepared a developer-ready Figma file with auto-layout components, spacing annotations, and a documented colour and type system for implementation.' },
    ],
    outcome:  'The designed UI was implemented directly as the production Lymora Learn interface. The onboarding flow achieved high completion rates with students reporting they understood the product value within their first session. The pattern results view required no redesign post-launch.',
    images:  [
      '/assets/images/designs/lymora-learn-ui/01.png',
      '/assets/images/designs/lymora-learn-ui/02.png',
      '/assets/images/designs/lymora-learn-ui/03.png',
    ],
    caseStudyReady: true,
    href:    null,
  },

  {
    slug:     'mgbah-portfolio-ui',
    name:     'mgbah.dev: Portfolio Design',
    shortDesc: 'Full design system and page layouts for this portfolio before it was built.',
    tools:    ['Figma'],
    year:     '2024',
    client:   'Personal',
    category: 'ui-ux',
    brief:    'Design a portfolio site that positions Michael as a serious backend developer and founder, not a freelancer. The design needed to feel intentional and editorial, communicating depth and craft without heavy visual effects. Every page had to be designed before the first line of code was written.',
    process: [
      { phase: 'Direction',       desc: 'Explored dark editorial, minimal typographic, and standard developer-portfolio reference directions. Committed to a dark-background typographic approach that contrasted with typical dev portfolios.' },
      { phase: 'Design System',   desc: 'Built a full token-based design system in Figma: colour palette, type scale, spacing scale, component library, and animation notes. This system became the direct source for CSS custom properties in the build.' },
      { phase: 'Page Layouts',    desc: 'Designed all six page layouts (Home, About, Projects, Services, Lymora, Contact) plus the case study template. Each layout was reviewed against the stated positioning before moving to build.' },
      { phase: 'Build Handoff',   desc: 'The Figma file served as the direct specification for the vanilla JS/CSS build. Spacing values, colour tokens, and component structures were lifted directly from the design into code.' },
    ],
    outcome:  'The portfolio was built precisely to the design specification without layout changes post-launch. The dark editorial aesthetic differentiates the site from standard developer portfolios. The token-based design system continues to guide all new sections added to the site.',
    images:  [
      '/assets/images/designs/mgbah-portfolio-ui/01.png',
      '/assets/images/designs/mgbah-portfolio-ui/02.png',
      '/assets/images/designs/mgbah-portfolio-ui/03.png',
    ],
    caseStudyReady: true,
    href:    null,
  },

  {
    slug:     'creedlance-videos',
    name:     'Creedlance: Video Production',
    shortDesc: 'Tutorial, how-to, and marketing video editing for Creedlance\'s content library.',
    tools:    ['Premiere Pro', 'After Effects'],
    year:     '2024',
    client:   'Creedlance',
    category: 'motion',
    brief:    'Produce and edit a series of tutorial, how-to, and marketing videos for Creedlance, a platform for creative freelancers. Videos needed consistent pacing, professional motion graphics for lower thirds and callouts, and a clean delivery format suitable for YouTube and social media distribution.',
    process: [
      { phase: 'Brief & Structure',   desc: 'Reviewed raw footage and script drafts with the Creedlance team. Defined a consistent edit structure (hook at 0 to 15s, core content, summary, CTA) applied across all video types.' },
      { phase: 'Edit',                desc: 'Cut and assembled footage in Premiere Pro. Paced edits to maintain viewer retention, removing dead air and redundant takes without losing the presenter\'s natural delivery style.' },
      { phase: 'Motion Graphics',     desc: 'Designed lower thirds, section titles, and callout animations in After Effects. Kept the motion style clean and minimal, complementing rather than competing with the content.' },
      { phase: 'Export & Delivery',   desc: 'Exported masters in H.264 for YouTube and compressed social cuts at 1080p and 1080×1080 for platform-specific distribution.' },
    ],
    outcome:  'Delivered a library of edited videos for Creedlance\'s content pipeline. The consistent edit template reduced turnaround time on subsequent videos and gave the channel a cohesive visual identity across all published content.',
    images:  [
      '/assets/images/designs/creedlance-videos/01.png',
      '/assets/images/designs/creedlance-videos/02.png',
      '/assets/images/designs/creedlance-videos/03.png',
    ],
    caseStudyReady: false,
    href:    null,
  },

  {
    slug:     'niit-print',
    name:     'NIIT Port Harcourt: Print Materials',
    shortDesc: 'Course brochures, certificates, and institutional print assets.',
    tools:    ['Photoshop', 'Illustrator'],
    year:     '2023',
    client:   'NIIT Port Harcourt',
    category: 'print',
    brief:    'Design a set of print materials for NIIT Port Harcourt, including course brochures for prospective students, graduation certificates for course completions, and general institutional assets for events and office use. Materials needed to align with NIIT branding while being print-production ready.',
    process: [
      { phase: 'Asset Audit',     desc: 'Reviewed existing NIIT brand assets: logo files, colour references, and any prior print materials. Identified gaps and inconsistencies to address across the new material set.' },
      { phase: 'Brochure Design', desc: 'Designed A4 and half-fold brochure layouts in Illustrator for each course category. Structured for easy staff updates. Course details sit in clearly editable text blocks.' },
      { phase: 'Certificate',     desc: 'Designed graduation certificate templates in Photoshop with NIIT Port Harcourt branding, signature placement, and variable fields for student name and course title.' },
      { phase: 'Print Prep',      desc: 'Prepared all files for print production: CMYK colour conversion, bleed and crop marks, embedded fonts, and high-resolution export at 300dpi.' },
    ],
    outcome:  'All print materials were delivered to production and used for the 2023 intake cycle. The certificate template has been used for subsequent graduation cohorts without modification. The brochure layout was adopted as the standard format for NIIT Port Harcourt course marketing.',
    images:  [
      '/assets/images/designs/niit-print/01.png',
      '/assets/images/designs/niit-print/02.png',
      '/assets/images/designs/niit-print/03.png',
    ],
    caseStudyReady: false,
    href:    null,
  },
];
