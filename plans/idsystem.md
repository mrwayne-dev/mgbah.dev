# NIIT ID System

A web-based Student ID Card generation and verification system built for **NIIT Port Harcourt** (NIIT Education & Training Centre, Rivers State, Nigeria).

Developed by **Lymora Labs**.

---

## What It Does

- Admins fill a form to generate a physical-style student ID card (front + back)
- The system creates a downloadable PDF with the student's photo, signature, QR code, and details
- Anyone can scan the QR code or visit the verify page to confirm a card's authenticity and check expiry status

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | PHP 8+ |
| Database | MySQL (PDO) |
| PDF Generation | FPDF 1.86 |
| Image Processing | GD Library |
| QR Codes | endroid/qr-code (Composer) |
| Frontend | Vanilla JS (Fetch API) |
| CSS Framework | Bootstrap 5.0.2 (local) |
| Typography | Host Grotesk (local WOFF2) |
| Server | Apache + .htaccess |
| Config | .env (credentials outside codebase) |

---

## Key Features

**ID Card**
- Front: student photo, full name, student ID, course, semester code, batch code, duration, expiry date, holder's signature
- Back: QR code linking to the verification page, institution address, authorized signatory

**Admin Panel**
- Secure login with Argon2ID password hashing and session management
- Dashboard lists all generated IDs with search, pagination (20/page), and expiry status badges
- Create ID form with live card preview that updates as the admin types
- Download disabled for expired cards

**Verification**
- Public `/verify` page — enter a student ID to pull up the card details
- Returns student info, a validity badge (Valid / Expired), and a rich details modal
- QR code on the card back links directly to the verification result

**Security**
- CSRF tokens on all forms
- MIME-validated file uploads (JPEG/PNG only)
- Cryptographic (32-char hex) filenames for uploads
- Private uploads stored outside the webroot (`../private_uploads/`)
- Rate limiting: 5 login attempts per 5-minute window
- Security headers (CSP, X-Frame-Options, etc.)
- `.htaccess` blocks access to `sql/`, `vendor/`, `.env`
- DB errors suppressed from client output

**UX / Progressive Web App**
- Dark mode toggle (CSS variables, persisted via `localStorage`)
- PWA manifest + service worker (installable on mobile)
- Toast notifications, animated line loader
- Fully responsive layout (mobile-friendly)

---

## Project Structure

```
niit_IDsystem/
├── index.php                  # Create ID card (admin-gated)
├── verify.php                 # Public verification page
├── admin/
│   ├── login.php
│   ├── dashboard.php          # Student list + search + pagination
│   └── logout.php
├── backend/
│   ├── api/
│   │   ├── create_id.php      # Generates PDF + stores record
│   │   ├── verify_id.php      # Returns student data + expiry flag
│   │   ├── download.php       # Serves PDF with auth check
│   │   ├── serve_image.php    # Serves private upload images
│   │   └── get_student.php
│   ├── config/
│   │   ├── database.php       # PDO connection via .env
│   │   ├── auth.php           # Session auth helpers
│   │   ├── csrf.php
│   │   ├── security.php       # Security headers
│   │   ├── rate_limit.php
│   │   └── constants.php      # Path constants
│   └── cron/
│       └── cleanup_pdfs.php   # Hourly cron to remove stale PDFs
├── assets/
│   ├── css/
│   ├── js/
│   ├── fonts/                 # Host Grotesk (WOFF/WOFF2/TTF)
│   └── img/
├── manifest.json              # PWA manifest
└── sw.js                      # Service worker
```

---

## Database

**`students` table** — stores one record per generated ID card:

| Column | Type | Notes |
|---|---|---|
| id | INT PK | Auto-increment |
| first_name | VARCHAR | |
| last_name | VARCHAR | |
| other_names | VARCHAR | Optional |
| student_id | VARCHAR | Unique |
| course | VARCHAR | |
| semester_code | VARCHAR | |
| batch_code | VARCHAR | |
| duration | VARCHAR | |
| expiry_date | DATE | Used for expiry check on verify |
| photo_path | VARCHAR | 32-char hex filename |
| signature_path | VARCHAR | Optional |
| pdf_path | VARCHAR | |
| created_at | TIMESTAMP | |
| updated_at | TIMESTAMP | |

**`admins` table** — admin credentials (Argon2ID hashed passwords).

---

## Setup Notes

1. Copy `.env.example` to `.env` and set your MySQL credentials
2. Run `php migrate.php` to create the `admins` table and add `updated_at` column, then delete `migrate.php`
3. Create `../private_uploads/` directory (outside webroot) with write permissions
4. Update the QR code base URL in `backend/api/download.php` to match your domain
5. Set up hourly cron: `0 * * * * php /path/to/backend/cron/cleanup_pdfs.php`
6. Default admin login: `admin` / `niit@admin2025` — **change this immediately after first login**

---

*NIIT Education & Training Centre — 1, Kaduna Street, D/Line, Port Harcourt, Rivers State. Tel/Fax: 234-084-230997*
