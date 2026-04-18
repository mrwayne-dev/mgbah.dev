/**
 * projects.js — Central project data
 * Single source of truth used by projects.js, home.js, casestudy.js, and designstudy.js.
 */

export const PROJECTS_DATA = [
  // ── Platforms ──────────────────────────────────────────────────────────────

  {
    slug:      'lymora-learn',
    name:      'Lymora Learn',
    shortDesc: 'AI exam prep platform analysing 10+ years of past questions. 200+ active users.',
    category:  'platforms',
    year:      '2026',
    status:    'Live',
    role:      'Solo, Full Stack + Product',
    overview:  'Lymora Learn is an AI-powered exam prep platform built for Nigerian university students. It processes 10+ years of past exam papers per course, identifies topic frequency distributions and recurring patterns, then uses Claude AI to generate targeted study paths and predict high-yield areas. Over 200 RSU students actively use it to prepare for WAEC and university examinations.',
    problem:   'Nigerian students spend hundreds of hours studying content that rarely appears in exams while neglecting topics that come up repeatedly. No tool existed that used historical exam data to guide study focus intelligently.',
    features: [
      { title: 'Pattern Analysis',    desc: 'Ingests and processes past exam papers to extract topic frequency distributions and identify high-probability question areas across all submitted years.' },
      { title: 'AI Study Paths',      desc: 'Uses Claude AI to generate personalised study plans based on identified patterns, weighted by topic recency and the student\'s declared weak areas.' },
      { title: 'Predicted Topics',    desc: 'Surfaces the most likely topics to appear in upcoming exams, ranked by a prediction score combining frequency, trend direction, and recency.' },
      { title: 'Subscription Tiers',  desc: 'Free preview, standard, and premium plans with server-enforced access gates. Subscription state managed via Paystack webhooks.' },
      { title: 'Course Coverage',     desc: 'Supports multiple university courses with fully isolated data sets per subject, preventing cross-contamination between course histories.' },
      { title: 'Progress Tracking',   desc: 'Students mark topics complete and resume from where they left off. Completion percentage shown per course so study focus is always clear.' },
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
    thumbnail: '/assets/images/projects/escrowlogo.webp',
    category:  'platforms',
    year:      '2026',
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
      { title: 'Review System',      desc: 'Post-move-in tenants leave verified ratings and written reviews for landlords and agents, surfaced on active listings to help future students decide.' },
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
    year:      '2026',
    status:    'In Development',
    role:      'Solo, Full Stack',
    overview:  'A browser-based simulated trading platform supporting both forex and stock markets. Users manage a virtual portfolio from a starting balance, open and close positions with configurable lot sizes, and track real-time P&L on a live charting interface. Built as a personal project exploring educational trading tools.',
    problem:   'Beginner traders need a risk-free environment to practice reading charts, sizing positions, and managing a portfolio before risking real capital. Existing platforms oversimplify, require broker registration, or don\'t reflect real market mechanics.',
    features: [
      { title: 'Real-Time Charts',  desc: 'Live price charts powered by a WebSocket data feed with multiple timeframe support: 1m, 5m, 15m, 1h, 4h, 1d.' },
      { title: 'Virtual Portfolio', desc: 'Starting virtual balance with open/close position controls, margin tracking, unrealised P&L, and a full portfolio summary dashboard.' },
      { title: 'Live P&L',         desc: 'Profit and loss updated on every price tick, calculated server-side using BCMath to avoid floating-point drift across position durations.' },
      { title: 'Position Sizing',  desc: 'Lot size input with automatic margin requirement and pip value calculation before order submission.' },
      { title: 'Trade History',    desc: 'Complete log of opened and closed positions with entry price, exit price, duration, and net P&L per trade.' },
      { title: 'Leaderboard',      desc: 'Ranked virtual portfolio leaderboard updated in real time showing top traders by percentage return, resetting per weekly cycle.' },
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
    year:      '2026',
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
      { title: 'Analytics Dashboard',    desc: 'Dispatcher-facing view of delivery rates, average transit time per route, driver performance metrics, and weekly shipment volume.' },
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
    year:      '2026',
    status:    'In Development',
    role:      'Solo, Backend',
    overview:  'A standalone REST API providing payment escrow functionality for marketplaces and peer-to-peer platforms. Buyers pay into an escrow account, funds are held until delivery is confirmed, and the seller receives an automatic payout. Disputes trigger a hold state and a manual review flag. Designed to be dropped into any Laravel marketplace with minimal integration work.',
    problem:   'Marketplaces in West Africa struggle to build payment trust between strangers. Without escrow, sellers demand upfront payment while buyers fear non-delivery. Both sides lose.',
    features: [
      { title: 'Escrow Initiation',    desc: 'Buyer-initiated escrow creation specifying seller ID, amount, and transaction description. Funds collected via Paystack at initiation.' },
      { title: 'Conditional Release',  desc: 'Buyer-triggered release endpoint that transfers funds to the seller after delivery confirmation, with a configurable review window.' },
      { title: 'Dispute Flagging',     desc: 'Either party can raise a dispute via API, which immediately freezes the escrow and creates a flagged review record for manual resolution.' },
      { title: 'Auto-Timeout Release', desc: 'Configurable timeout after which un-disputed escrows auto-release to the seller, preventing indefinite fund holds.' },
      { title: 'Transaction Ledger',    desc: 'Immutable log of every state change per escrow (created, funded, released, disputed, resolved) with actor and timestamp.' },
      { title: 'Webhook Notifications', desc: 'Configurable outbound webhooks that POST escrow state changes to the integrating platform in real time, enabling event-driven flows without polling.' },
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
    slug:      'webhook-tester',
    name:      'Webhook Tester',
    shortDesc: 'Live webhook inspector. Temporary endpoints, real-time payload capture.',
    category:  'web-apps',
    year:      '2026',
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
      { title: 'Replay Requests',     desc: 'Re-send any captured payload back to the original sender or a new URL directly from the inspector, for testing retry handling without re-triggering the source service.' },
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
    year:      '2026',
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
      { title: 'Shareable Links',       desc: 'Each explanation is assigned a unique URL so developers can share a specific query breakdown directly with teammates or paste it into a PR comment.' },
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
    name:      'NIIT ID System',
    shortDesc: 'Web-based student ID card generation and verification system built for NIIT Port Harcourt.',
    category:  'web-apps',
    year:      '2025',
    status:    'Live',
    role:      'Solo, Full Stack',
    overview:  'A web-based system for generating and verifying student ID cards, built by Lymora Labs for NIIT Port Harcourt. Admins fill a form to generate a physical-style ID card (front and back), the system produces a downloadable PDF with the student\'s photo, signature, QR code, and all details. Anyone can scan the QR code or visit the public verify page to confirm a card\'s authenticity and check its expiry status.',
    problem:   'NIIT was producing student ID cards manually, a slow and inconsistent process that offered no way to verify a card\'s authenticity. Expired cards looked identical to valid ones and there was no central record of issued IDs.',
    features: [
      { title: 'ID Card Generation',   desc: 'Front card includes student photo, full name, student ID, course, semester code, batch, duration, expiry date, and holder\'s signature. Back carries a QR code linking to verification, institution address, and authorised signatory.' },
      { title: 'Admin Dashboard',      desc: 'Secure admin login with Argon2ID password hashing. Dashboard lists all generated IDs with search, pagination at 20 per page, and expiry status badges. Download disabled for expired cards.' },
      { title: 'Live Card Preview',    desc: 'Real-time card preview updates as the admin types each field, giving a full visual confirmation of the card before any PDF is generated or downloaded.' },
      { title: 'QR Verification',      desc: 'Public verify page — enter a student ID to get the full card details, a validity badge (Valid or Expired), and a rich details modal. QR code on the card back links directly to the verification result.' },
      { title: 'Secure File Handling', desc: 'MIME-validated photo uploads (JPEG/PNG only), 32-char hex filenames, private uploads stored outside the webroot. CSRF tokens on all forms, rate limiting on login, and security headers throughout.' },
      { title: 'PWA & Dark Mode',      desc: 'Installable as a Progressive Web App on mobile via a manifest and service worker. Dark mode toggle persisted to localStorage, with toast notifications and an animated line loader.' },
    ],
    challenges: [
      {
        problem:  'Embedding a QR code into a server-generated PDF without a full-stack rendering pipeline.',
        solution: 'Used endroid/qr-code to generate QR images server-side as PNG data URIs, then embedded them directly into the FPDF layout using the Image() method with precise coordinate positioning to align with the card back design.',
      },
      {
        problem:  'Producing a PDF that matched the visual design of the card preview shown on screen.',
        solution: 'Built the FPDF layout from the same measurements used in the browser preview: exact millimetre equivalents for all pixel values, font sizes calibrated against both outputs, and image placement validated against print output until they matched.',
      },
    ],
    stack: {
      backend:  ['PHP 8+'],
      database: ['MySQL'],
      frontend: ['JavaScript', 'CSS', 'Bootstrap 5'],
      tools:    ['FPDF', 'endroid/qr-code'],
    },
    caseStudyReady: true,
    howToUse: {
      install: null,
      steps: [
        { step: '01', title: 'Log in to the admin panel', code: null, desc: 'Navigate to the admin login page and sign in with your credentials. Access to the ID creation form and student dashboard is gated to authenticated admins.' },
        { step: '02', title: 'Fill the student form', code: null, desc: 'Enter the student\'s full name, ID number, course, semester code, batch, duration, and expiry date. Upload a photo and optional signature. The card preview updates live as you type.' },
        { step: '03', title: 'Download the PDF', code: null, desc: 'Once the preview looks correct, click Download to generate and save the print-ready PDF. Expired cards have the download action disabled.' },
        { step: '04', title: 'Verify a card', code: null, desc: 'Visit the public verify page and enter a student ID. The system returns the full card details, a validity badge showing Valid or Expired, and the QR code on any printed card links here automatically.' },
        { step: '05', title: 'Manage the student list', code: null, desc: 'The admin dashboard lists all issued IDs with search and pagination. Expiry status badges surface expired cards at a glance. All records are searchable by name, ID, or course.' },
      ],
    },
    tags:   ['PHP', 'MySQL', 'FPDF', 'QR Code'],
    images: [
      '/assets/images/projects/case-study/idcard.webp',
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
    year:      '2025',
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
      { title: 'Events & Gallery',        desc: 'Staff-managed gallery of institution events and photos, published from the admin CMS alongside news and announcements.' },
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
      '/assets/images/projects/case-study/niit_website.webp',
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
    slug:      'web2stack',
    name:      'web2stack',
    shortDesc: 'CLI tool that transpiles any website URL into clean, framework-native source code.',
    category:  'platforms',
    year:      '2026',
    status:    'In Development',
    role:      'Solo, Full Stack + Product',
    overview:  'web2stack is a CLI tool that takes any website URL and produces clean, editable source code in a chosen framework — React, Vue, Next.js, HTML, or Laravel Blade. It operates at the DOM level (not screenshot-based), extracting computed styles, interactions, and animations into an intermediate representation (IR) schema before converting to idiomatic, framework-native components. It\'s the only tool on the market that combines DOM-level extraction with multi-framework output and animation preservation in a single command.',
    problem:   'Converting a website to a framework codebase takes 20-80 hours of manual work per project. Developers inspect elements, copy structure and styles piece by piece, and rebuild manually. Existing tools either lock you to React-only output, drop all animations, or rely on screenshot-based approaches that lose computed DOM state entirely.',
    features: [
      { title: 'Multi-Framework Output',  desc: 'Converts any URL to React, Vue, Next.js, HTML, or Laravel Blade. Target framework is passed as a flag. No competitor offers this flexibility — every existing tool outputs React only.' },
      { title: 'DOM-Level Extraction',    desc: 'Crawls the live DOM and computed CSS — not a screenshot. Captures element hierarchy, computed styles, and interaction handlers with full fidelity that screenshot-based tools cannot match.' },
      { title: 'Animation Preservation',  desc: 'Detects and preserves GSAP sequences, Framer Motion springs, CSS keyframes, and Lottie integrations. Every existing competitor drops animations entirely during conversion.' },
      { title: 'IR Schema',               desc: 'Extracted DOM data is normalised into a framework-agnostic intermediate representation before any code is written. Each framework adapter reads from the same IR, keeping output consistent.' },
      { title: 'Multi-Agent Pipeline',    desc: 'Orchestrates specialised AI agents for crawling, DOM analysis, conversion, and output validation. The compound system is the core defensible asset — no single feature can be easily replicated in isolation.' },
      { title: 'CLI-First Interface',     desc: 'Single-command conversion: web2stack convert <url> --framework react. No browser required. Built for developer workflows, CI pipelines, and agency batch processing across 20+ client sites.' },
    ],
    challenges: [
      {
        problem:  'Generating clean, idiomatic framework code from crawled DOM without the output degrading to spaghetti on complex sites.',
        solution: 'Designed an intermediate representation (IR) schema that normalises extracted DOM data before any framework-specific code is written. The IR is framework-agnostic; each framework adapter reads from the same IR, keeping conversion logic isolated and output quality consistent across all target frameworks.',
      },
      {
        problem:  'Preserving animations (GSAP, Framer Motion, Lottie) when every existing tool silently drops them.',
        solution: 'Built a dedicated animation detection layer that fingerprints animation libraries by script patterns and attribute signatures, then maps animation definitions into framework-compatible equivalents in the generated output rather than stripping them.',
      },
      {
        problem:  'Making a token-intensive multi-agent AI pipeline commercially viable at $39-199/month pricing.',
        solution: 'Switched to Claude Opus 4.6 at $5/$25 per MTok — 67% cheaper than Opus 4.1 — and designed the agent pipeline to batch DOM extraction, reducing total API calls per conversion. Context passing between agents is minimised to avoid redundant token spend.',
      },
    ],
    stack: {
      backend:  ['Node.js'],
      database: [],
      frontend: [],
      tools:    ['Claude AI', 'CLI'],
    },
    caseStudyReady: false,
    howToUse: {
      install: 'npm install -g web2stack',
      steps: [
        { step: '01', title: 'Install the CLI', code: 'npm install -g web2stack', desc: 'Install web2stack globally via npm. One-time setup. No browser extension, account dashboard, or API key configuration required to get started.' },
        { step: '02', title: 'Run a conversion', code: 'web2stack convert https://stripe.com --framework react', desc: 'Point web2stack at any URL and specify your target framework. The CLI crawls the live site, extracts DOM structure and computed styles, and generates framework-native components.' },
        { step: '03', title: 'Review the output', code: null, desc: 'Generated files are written to a local output directory. Components are named after their DOM role, styles are scoped, and animation definitions are preserved in framework-compatible form.' },
        { step: '04', title: 'Use in your project', code: null, desc: 'Drop the generated components into your existing project. They\'re clean, editable source code — not a black box or a dependency. Modify freely. The conversion gives you a working starting point, not a lock-in.' },
      ],
    },
    tags:   ['Node.js', 'CLI', 'AI', 'Multi-Framework'],
    images: [
      '/assets/images/projects/web2stack/01.png',
      '/assets/images/projects/web2stack/02.png',
      '/assets/images/projects/web2stack/03.png',
    ],
    links: {
      github: null,
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
    year:      '2026',
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
      { title: 'Soft Delete Logging',    desc: 'Tracks soft-delete and restore events as distinct log entries, so the full lifecycle of a record is visible even when it was never hard-deleted.' },
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
    year:      '2026',
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
      { title: 'Meta & Headers',        desc: 'Optional metadata field on any response for request IDs, API version, or debug context, and helper methods for appending custom response headers.' },
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
    year:      '2026',
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
      { title: 'Key Rotation',           desc: 'One-command key rotation that issues a new key and marks the old one for expiry after a configurable grace period, so clients can migrate without downtime.' },
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
    slug:      'webstarter-cli',
    name:      'create-php-starter',
    shortDesc: 'Unified PHP + Laravel scaffolding CLI. One command, two modes, production-ready structure in seconds.',
    category:  'open-source',
    year:      '2026',
    status:    'Live',
    role:      'Solo, Package Author',
    caseStudyReady: true,
    overview:  'create-php-starter is a Node.js CLI published on npm that scaffolds production-ready PHP projects in seconds. Version 2.0.0 expands the tool from a single-mode Custom PHP scaffolder into a unified PHP and Laravel scaffolding platform. The first prompt chooses a mode: Custom PHP (Vanilla, MVC, or API stacks) or Laravel (API, Web, Full, or Minimal stacks). From there, auth, database driver, frontend, Docker, CI, and testing are all configured interactively before a single file is written. Run one command, answer a few questions, and start building.',
    problem:   'Starting a PHP or Laravel project means the same 30 to 60 minutes of folder creation, entry-point wiring, .htaccess setup, .env configuration, and boilerplate no one wants to write again. For Laravel, that also means choosing and installing Sanctum or Passport, picking a DB driver, and wiring a frontend if you need one. The setup is never the interesting part, but skipping it always creates problems later.',
    features: [
      {
        title: 'Two-mode entry',
        desc:  'First prompt gates the entire scaffold: Custom PHP (Vanilla, MVC, or API) or Laravel (API, Web, Full, or Minimal). Every subsequent question and generated file branches from this choice.',
      },
      {
        title: 'Custom PHP scaffolding',
        desc:  'Vanilla mode supports three complexity tiers (Simple, Medium, Complex) each generating a different directory structure. Optional features across all stacks: auth scaffold, admin panel, PHPMailer, Phosphor Icons, contact form with rate limiting.',
      },
      {
        title: 'Laravel scaffolding',
        desc:  'Installs Laravel via Composer, then configures auth (Sanctum, Passport, or none), database driver (MySQL, PostgreSQL, MongoDB, SQLite), and optional frontend (React via Vite, Inertia, or none). TypeScript flag supported for React and Inertia.',
      },
      {
        title: 'Laravel architecture stubs',
        desc:  'Every Laravel scaffold writes a consistent base layer: ApiResponse trait, BaseService, BaseRepository, BaseController, BaseRequest, and an Exception handler that formats all errors as JSON. Keeps output quality consistent regardless of stack.',
      },
      {
        title: 'Extra features for both modes',
        desc:  'Optional --docker (generates Compose file, Dockerfile, nginx config), --ci (GitHub Actions workflow), and --testing (Pest for Laravel, PHPUnit for Custom PHP). Dry-run flag previews everything without writing files. Partial scaffolds are cleaned up automatically on failure.',
      },
      {
        title: 'Named presets',
        desc:  'Save a full configuration to ~/.webstarterrc.json once, then reuse it with --preset=name on any machine. Zero prompts, zero flags — pulls mode, stack, auth, DB, Docker, CI, and testing from the saved config.',
      },
    ],
    challenges: [
      {
        problem:  'Supporting two completely different scaffold trees (Custom PHP and Laravel) without the CLI codebase becoming a tangle of nested conditionals.',
        solution: 'Each mode is driven by a declarative config object describing its directory tree, file list, and dependency list. The generator walks the config. Adding a new mode or stack means writing a new config object, not touching the existing logic.',
      },
      {
        problem:  'Making the interactive prompt flow work across Windows Command Prompt, PowerShell, macOS Terminal, and Linux without terminal compatibility issues.',
        solution: 'Used Inquirer.js for all prompts and ora for spinner feedback, both of which handle terminal compatibility differences. Tested the full two-mode flow on all three platforms before publishing.',
      },
      {
        problem:  'Generating a complete Laravel project that includes architecture stubs without those stubs conflicting with what Composer already writes.',
        solution: 'The stub-writing step runs after composer create-project completes and the .env is written. Stubs are placed in app/ subdirectories not touched by the Laravel installer, so there are no conflicts or overwrites.',
      },
    ],
    howToUse: {
      install: 'npm create php-starter@latest',
      steps: [
        { step: '01', title: 'Run the command', code: 'npm create php-starter@latest', desc: 'Runs the CLI directly from npm without a global install. No setup required beforehand.' },
        { step: '02', title: 'Choose your mode', code: null, desc: 'The first prompt asks whether you are scaffolding a Custom PHP project or a Laravel project. Every subsequent question branches from this choice.' },
        { step: '03', title: 'Configure your stack', code: null, desc: 'Answer the remaining prompts: stack type, auth method, database driver, frontend option, and which extra features to include. Any flag passed at launch skips its corresponding prompt.' },
        { step: '04', title: 'Let the CLI build', code: null, desc: 'The scaffold generates your directory structure, writes all config files, runs Composer installs, and sets up git. A structured end-of-run summary prints every decision made.' },
        { step: '05', title: 'Start building', code: 'cd your-project && php artisan serve', desc: 'Your project is ready. For Custom PHP, start with php -S localhost:8000. For Laravel, php artisan serve. All generated files are plain, editable source code.' },
      ],
    },
    stack: {
      backend:  ['Node.js', 'PHP (generated output)', 'Laravel (generated output)'],
      database: [],
      frontend: [],
      tools:    ['npm', 'Inquirer.js', 'chalk', 'ora', 'shelljs'],
    },
    tags:   ['Node.js', 'CLI', 'npm', 'PHP'],
    images: [
      '/assets/images/projects/case-study/npm.webp',
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
    slug:      'creedlance-videos',
    name:      'Creedlance Video Production',
    shortDesc: 'Brand video content — editing, motion graphics, and social cuts for a creative freelance platform.',
    thumbnail: '/assets/images/projects/designs/creedlancemain.webp',
    linkLabel: 'View Materials',
    tools:    ['CapCut'],
    year:     '2025',
    client:   'Creedlance',
    category: 'motion',
    brief:    'Creedlance needed a consistent video content identity across platform tutorials, founder-led explainers, and social media promos. Raw footage was strong but unstructured — the brief was to cut it into branded, retention-optimised content with motion graphics that felt native to the product\'s visual language.',
    process: [
      { phase: 'Structure',        desc: 'Defined a repeatable edit structure across video types: 0–15s hook, core content block, and a branded CTA end card. Applied consistently so each video felt part of a content series rather than a one-off.' },
      { phase: 'Edit',             desc: 'Cut and assembled footage in CapCut. Trimmed dead air and redundant takes while preserving the natural presenter delivery. Pacing decisions were based on script density, not a fixed rhythm.' },
      { phase: 'Motion Graphics',  desc: 'Built lower thirds, section titles, and callout animations using CapCut\'s motion tools. Style kept minimal — kinetic type and subtle slides rather than heavy transitions — so the motion supported content without competing with it.' },
      { phase: 'Delivery',         desc: 'Exported masters for YouTube and compressed platform cuts at the required dimensions for social. Each final file reviewed against the original brief before handoff.' },
    ],
    outcome:  'Delivered a library of edited video assets for Creedlance\'s content pipeline. The consistent structure and motion system gave the channel a clear visual identity and reduced turnaround time on each subsequent video.',
    images:  [
      '/assets/images/projects/case-study/creedlancemain.webp',
    ],
    caseStudyReady: true,
    href:    'https://drive.google.com/drive/folders/1dlS5v6M6g13JwfG6DVTihfS9y2ipICwE?usp=sharing',
  },

  {
    slug:      'cybercyn-brand',
    name:      'CyberCyn Brand Design',
    shortDesc: 'Brand identity for a web development and tech agency.',
    thumbnail: '/assets/images/projects/designs/cybercyn.svg',
    tools:    ['Figma', 'Illustrator'],
    year:     '2025',
    client:   'CyberCyn',
    category: 'branding',
    brief:    'CyberCyn, a web development and tech agency, needed a brand identity that communicated technical capability and modern execution. The identity had to position the agency as a serious, forward-thinking outfit — credible enough to win enterprise clients, sharp enough to appeal to startups. It had to scale across a website, proposals, and social presence.',
    process: [
      { phase: 'Direction',    desc: 'Researched the agency branding space and identified a gap for identities that feel genuinely tech-native rather than generic creative-studio. Three visual directions explored: typographic mark, abstract symbol, and a geometric monogram.' },
      { phase: 'Identity',     desc: 'Developed the primary mark and wordmark in Illustrator. Focused on form clarity and precision — the identity needed to read as confident and technical at small digital sizes and large print applications alike.' },
      { phase: 'System',       desc: 'Built out the full colour system, type pairing, and usage rules in Figma. Defined primary, secondary, and surface palette with both dark and light application contexts suited to an agency that builds across industries.' },
      { phase: 'Delivery',     desc: 'Packaged all assets in SVG, PNG, and PDF with a one-page brand reference. Variants included: primary, reversed, monochrome, and icon-only for favicon and app use.' },
    ],
    outcome:  'The CyberCyn brand identity gave the agency a cohesive and credible visual presence. The mark\'s technical precision and clean system translated directly into the agency\'s website and client-facing materials.',
    images:  [
      '/assets/images/projects/case-study/cybercyn2.webp',
      '/assets/images/projects/case-study/cybercyn/mainflyerdark.webp',
      '/assets/images/projects/case-study/cybercyn/secondflyer.webp',
    ],
    caseStudyReady: true,
    href:    'https://drive.google.com/drive/folders/1dlS5v6M6g13JwfG6DVTihfS9y2ipICwE?usp=sharing',
  },

  {
    slug:      'soccer-flyers',
    name:      'Soccer Team Flyer Designs',
    shortDesc: 'Match-day and promotional flyer series for a local soccer team.',
    thumbnail: '/assets/images/projects/designs/cscfc.svg',
    tools:    ['Photoshop', 'Illustrator'],
    year:     '2025',
    client:   'Confidential',
    category: 'print',
    brief:    'Design a series of match-day announcements, player spotlight, and league promotional flyers for a soccer team. Each flyer needed to feel energetic and on-brand, work at both digital and print dimensions, and turn around quickly within a consistent visual template.',
    process: [
      { phase: 'Template Design',  desc: 'Created a master flyer template in Photoshop with clearly separated layers for player images, match details, and background graphics. Designed for fast production: non-designers on the team could update key details without touching the visual system.' },
      { phase: 'Match-Day Series', desc: 'Produced the match announcement flyer series using the template system. Each flyer features the opponent badge, kick-off time, and venue, adapted to home and away visual treatments.' },
      { phase: 'Spotlight Flyers', desc: 'Designed individual player spotlight flyers with cut-out photography, stats overlays, and player name treatment. Built as a reusable Photoshop action for fast batch production.' },
      { phase: 'Export',           desc: 'Delivered each design across the required formats and sizes per platform, with print-ready PDFs at the specified dimensions and colour profiles matched across all digital and print outputs.' },
    ],
    outcome:  'The flyer series gave the team a consistent visual presence across social media for the full season. The template system meant subsequent match-day flyers were produced in under 15 minutes per design.',
    images:  [
      '/assets/images/projects/case-study/cscfc.webp',
      '/assets/images/projects/case-study/cscfc/finals.webp',
      '/assets/images/projects/case-study/cscfc/lastone.webp',
    ],
    caseStudyReady: true,
    href:    'https://drive.google.com/drive/folders/1dlS5v6M6g13JwfG6DVTihfS9y2ipICwE?usp=sharing',
  },

  {
    slug:      'zirostack-videos',
    name:      'Zirostack Video Production',
    shortDesc: 'Marketing videos and branded content produced for Zirostack during the company\'s early launch phase.',
    thumbnail: '/assets/images/projects/zirostack.webp',
    tools:    ['CapCut'],
    year:     '2025',
    client:   'Zirostack',
    category: 'motion',
    brief:    'Zirostack needed launch-phase video content to introduce the brand and build early awareness. The brief covered a range of formats: product explainers, brand trailers, and short-form social cuts. All content had to establish a credible visual identity from the ground up, with no existing brand video reference to draw from.',
    process: [
      { phase: 'Brief & Planning', desc: 'Worked with the Zirostack team to define the content mix and messaging priorities for launch. Established a repeatable edit structure across formats so each piece felt part of a coherent campaign rather than a collection of one-offs.' },
      { phase: 'Edit',             desc: 'Cut and assembled footage in CapCut. Pacing decisions were driven by the format: tighter cuts for social, more breathing room for the longer explainer pieces. Dead air and redundant takes trimmed throughout.' },
      { phase: 'Motion Graphics',  desc: 'Built branded motion graphics using CapCut\'s motion tools: logo reveals, lower thirds, and callout animations. Kept the style clean and kinetic to match the product\'s early identity direction.' },
      { phase: 'Delivery',         desc: 'Exported platform-specific cuts at the required dimensions: masters for YouTube and compressed 1:1 and 9:16 variants for social. Each file reviewed against the original brief before handoff.' },
    ],
    outcome:  'Delivered a suite of launch-phase video assets that gave Zirostack a visual presence to build its early audience. The motion system and edit structure established a reusable template for subsequent content.',
    images:  [
      '/assets/images/projects/case-study/zirostack.webp',
    ],
    caseStudyReady: true,
    href:    'https://drive.google.com/drive/folders/1dlS5v6M6g13JwfG6DVTihfS9y2ipICwE?usp=sharing',
  },

  {
    slug:     'springfield-ui',
    name:     'Springfield Flyers',
    shortDesc: 'Promotional and informational flyer series for a mental health centre.',
    showOnProjects: false,
    tools:    ['Photoshop', 'Illustrator'],
    year:     '2025',
    client:   'Springfield',
    category: 'print',
    brief:    'Design a series of warm, approachable promotional and informational flyers for Springfield, a mental health centre. Each piece had to feel calm and trustworthy rather than clinical — the kind of visual that would make someone in a vulnerable moment feel welcomed rather than processed. The designs needed to work both digitally and in print.',
    process: [
      { phase: 'Direction',          desc: 'Defined the visual territory: soft, warm, and human rather than medical or corporate. Reviewed colour psychology for healthcare contexts and established a palette that communicated care without feeling sterile.' },
      { phase: 'Layout & Hierarchy', desc: 'Built initial layouts in Illustrator focused on calm information hierarchy and generous whitespace. Lead with reassurance, not information overload. Key contact details and calls to action kept prominent and legible.' },
      { phase: 'Visual Design',      desc: 'Brought layouts to final in Photoshop. Integrated client photography with intentional cropping and tone adjustments to maintain a consistent warm, grounded feel across the series.' },
      { phase: 'Export & Delivery',  desc: 'Delivered each flyer at both digital and print-ready sizes, with colour profiles matched across outputs and print bleed applied to all physical format variants.' },
    ],
    outcome:  'The Springfield flyer series gave the centre a consistent, human visual presence across their printed and digital outreach materials. The warm tone and clear hierarchy made the content approachable for people seeking mental health support.',
    images:  [
      null,
      '/assets/images/projects/case-study/springfield/flyer1.webp',
      '/assets/images/projects/case-study/springfield/flyer2.webp',
    ],
    caseStudyReady: true,
    href:    'https://drive.google.com/drive/folders/1dlS5v6M6g13JwfG6DVTihfS9y2ipICwE?usp=sharing',
  },

  {
    slug:      'fitness-brand',
    name:      'Fitness Brand Identity',
    shortDesc: 'Logo, colour system, and visual identity for a fitness and training brand.',
    thumbnail: '/assets/images/projects/designs/fitnessbrand.webp',
    tools:    ['Figma', 'Illustrator'],
    year:     '2025',
    client:   'Confidential',
    category: 'branding',
    brief:    'Build a brand identity for a fitness and personal training brand targeting young professionals. The identity needed to feel strong and motivating without relying on the oversaturated aggressive aesthetic common in fitness branding. Clean, modern, and built to scale across apparel, digital, and in-gym applications.',
    process: [
      { phase: 'Positioning',   desc: 'Defined the brand territory: performance-focused but not intimidating, aspirational but grounded. Referenced fashion and lifestyle brands as much as fitness brands to avoid the category clichés.' },
      { phase: 'Mark Design',   desc: 'Developed the primary mark in Illustrator through multiple rounds. Explored geometric, typographic, and symbol-based approaches. The final mark pairs a clean wordmark with a minimal geometric symbol built for apparel and icon use.' },
      { phase: 'Colour & Type', desc: 'Built a colour system anchored by a strong primary with a neutral palette for surfaces and type. Typography pairing uses a confident display face for headlines and a clean sans-serif for body copy.' },
      { phase: 'Applications',  desc: 'Extended the identity to mockups: gym apparel, water bottles, digital ad templates, and social profile assets. Packaged and delivered with full brand guidelines.' },
    ],
    outcome:  'The brand identity gave the client a clear, scalable visual presence that stood apart from typical fitness branding. The apparel applications were the most-used deliverable — the mark held well across embroidery, screen print, and sublimation.',
    images:  [
      '/assets/images/projects/case-study/fitnesscasestudy.webp',
      '/assets/images/projects/case-study/fitnessbrand/mockup2.webp',
      '/assets/images/projects/case-study/fitnessbrand/mockup4.webp',
    ],
    caseStudyReady: true,
    href:    'https://drive.google.com/drive/folders/1dlS5v6M6g13JwfG6DVTihfS9y2ipICwE?usp=sharing',
  },

  {
    slug:      'vibehouse-brand',
    name:      'Vibehouse Brand Identity',
    shortDesc: 'Brand identity for a crypto trading platform with an energy-forward visual language.',
    thumbnail: '/assets/images/projects/designs/vibehousemain.webp',
    tools:    ['Figma', 'Illustrator'],
    year:     '2025',
    client:   'Vibehouse',
    category: 'branding',
    brief:    'Vibehouse is a crypto trading platform positioning itself around energy, culture, and community — not just charts and numbers. The brief was to build a brand identity that felt alive and culturally connected while still communicating the credibility required for a financial product. The identity needed to work across a web app, marketing, and social content.',
    process: [
      { phase: 'Brand Strategy', desc: 'Defined the core brand tension: financial credibility meets cultural energy. Researched the visual language of both fintech brands and cultural/music platforms to find a position between them that felt genuinely differentiated.' },
      { phase: 'Identity Design', desc: 'Designed the primary wordmark and visual mark in Illustrator. Explored gradient and motion-influenced treatments to inject energy, then pulled back to a mark that reads cleanly in static contexts while hinting at movement.' },
      { phase: 'Visual System',   desc: 'Built an expressive colour system anchored by a vibrant primary palette with structured neutrals for UI surfaces. Typography uses a bold display face with high tracking for the brand voice alongside a functional sans-serif for product copy.' },
      { phase: 'Delivery',        desc: 'Packaged the full identity in Figma with component variants, colour tokens, motion usage notes, and a brand guidelines document covering do\'s, don\'ts, and application examples.' },
    ],
    outcome:  'The Vibehouse identity landed the brief — it reads as a financial product without looking like one. The colour system and typography gave the brand room to be expressive across marketing while remaining controlled inside the product UI.',
    images:  [
      '/assets/images/projects/case-study/vibehousecase-study.webp',
      '/assets/images/projects/case-study/vibehouse/Billboard mockup.png',
      '/assets/images/projects/case-study/vibehouse/vhlogo-12.webp',
    ],
    caseStudyReady: true,
    href:    'https://drive.google.com/drive/folders/1dlS5v6M6g13JwfG6DVTihfS9y2ipICwE?usp=sharing',
  },
];
