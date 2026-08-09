# Human Health Explorers

Marketing site for Human Health Explorers — a free, student-run health science
program for Naperville-area elementary and middle schoolers.

**Slogan:** Curious minds. Healthier lives.

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:5173. `npm run build` produces `dist/`, `npm run lint`
runs oxlint.

## Structure

React + Vite + react-router-dom, plain CSS (no framework). Routes:

| Route | Page |
|---|---|
| `/` | Home |
| `/camps/spring-2026` · `/camps/summer-2026` · `/camps/fall-2026` | Camp pages (one component, driven by data) |
| `/workshops` | Workshops |
| `/faq` | FAQ |
| `/about` | About Us |
| `/partners` | Partners (`/sponsors` redirects here) |
| `/get-involved` | Get Involved |

**All copy and program data lives in [`src/data/content.js`](src/data/content.js).**
Edit that file to update text, stats, sessions, team members, sponsors, or FAQs —
you should almost never need to touch a component to change wording.

Photos are indexed in [`src/data/photos.js`](src/data/photos.js) and served from
`public/photos/`.

## Brand tokens

Defined as CSS variables at the top of [`src/index.css`](src/index.css). Sampled
from HHE's own flyers:

| Token | Value |
|---|---|
| Navy (primary) | `#1A2B4A` |
| Navy deep | `#101C33` |
| Cyan (accent) | `#26D0FF` |
| Teal (secondary) | `#0F7A8C` |
| Blue | `#004AAD` |
| Body ink | `#16233D` |
| Muted text | `#5B6B82` |

Fonts: Space Grotesk (display) + Inter (body), loaded from Google Fonts in
`index.html`.

The logo mark (`src/assets/hhe-badge.png`) was extracted from the flyer artwork
and masked to a transparent circle so it sits cleanly on navy. The "HUMAN HEALTH
EXPLORERS" wordmark is rendered as live text rather than an image, so it stays
crisp and readable on dark backgrounds at any size.

## Photos

37 candid photos from Summer 2026 (Sessions 1–5), pulled from Drive, filtered to
exclude whiteboard and slide documentation shots, EXIF-rotated upright, and
resized to 1600px / q80. Four Spring 2026 photos live in `public/photos/spring/`
— they predate the Drive session folders, so they only appear on the Spring camp
page.

**Session 2 has only one photo.** Nearly every Session 2 file in Drive is 13–16 MB,
above the 10 MB limit of the Drive connector used to fetch them. Pulling more
Session 2 candids needs a manual download from the Drive web UI.

## Photo privacy

**The Ray Chinese School workshop photos have every camper's face blurred. The
instructors' faces are not.** That is deliberate, not a processing artefact.
Those campers are ages 5–12 at a partner organisation, and the blurring was an
explicit requirement.

If you replace or add photos to that workshop, they must get the same treatment
before they go live. The tooling used is in the session scratchpad, but the
method is what matters:

1. Detect faces (OpenCV's YuNet DNN model works well; the Haar cascades that
   used to ship with OpenCV are gone as of v5).
2. Render a numbered overlay of every detection and **decide by eye** which are
   campers and which are instructors. No detector can make that call.
3. Blur by pixelating the region down and then smoothing it, through a feathered
   ellipse padded well beyond the detector's box. Pixelating first is what makes
   it unrecoverable; a plain blur can be partly undone.
4. **Check the finished image yourself.** A face turned away from the camera is
   never detected, so the detector's count is a starting point, not a guarantee.

No other photos on the site are blurred. Camp photos are HHE's own program at
public venues.

## School logo marquee

Two-row sliding marquee of school **logos only** — no visible school-name text.
The name rides along as image `alt` text, and the full 35-school list is exposed
to screen readers in a visually-hidden `<ul>`, so nothing is lost for
accessibility.

All 35 schools have their real logo on file, each pulled from that school's own
official site — `ipsd.org` subdomains for Indian Prairie D204, `naperville203.org`
for D203, and the school's own domain for Avery Coonley, St. Joan of Arc, and
Kindi Academy.

A school only appears in the marquee if it has a verified logo. Any school with
`logo: null` is filtered out rather than shown as a text stand-in.

To add a school's logo, drop the image in `src/assets/schools/` and point that
school's `logo:` field in `src/data/content.js` at it via `resolveLogo`. No other
change needed.

Two things to leave alone:

- **Fischer Middle School and Gordon Gregory Middle School are two separate real
  IPSD 204 schools** and must not be merged. Fischer's logo is the red/gold
  falcon; Gregory's is the minuteman with a musket (Gregory's mascot is the
  Patriots — yes, the same mascot as Jefferson Junior High, which has its own
  distinct logo).
- **Heritage Grove is a middle school, not an elementary.** The raw sign-up data
  said "Heritage Grove Elementary," but Plainfield D202 has only Heritage Grove
  Middle School (grades 6–8). The name is corrected in `content.js` so it matches
  the logo artwork, which reads "HERITAGE GROVE MIDDLE SCHOOL."

## Partners vs. donors vs. hosts

The Partners page draws a deliberate line, and it's easy to blur by accident:

- **Partners** (`partners` in `content.js`) are standing *organizational*
  relationships. Only two: The Alive Center and Hack Club.
- **Donors** (`donors` in `content.js`) are businesses that gave prizes. They
  appear as a static logo grid with no captions, under the heading "Sponsors."
- **Hosts** are neither, and do not belong on this page:
  - **Nichols Library** was paid roughly $600 for space. That is a vendor
    relationship. Do not list them as a partner anywhere on the site.
  - **Ray Chinese School** is a workshop host, the same tier as Madison Junior
    High and any future host school. They belong on the Workshops page only.

## How the numbers are scoped

Two different metrics live on this site and they are supposed to differ:

- **All-time, all-program** (`impactStats` in `content.js`) — 280+ students, 17
  sessions. Used on the homepage and About page only.
- **Season- or program-scoped** — e.g. Summer Camp's own page says 100+ students
  and 6 sessions, because that is what that camp did.

Do not "fix" the Summer page to say 280+. The all-time figure breaks down as:

| Program | Students | Sessions |
|---|---|---|
| Spring 2026 — The Alive Center | 35 | 4 |
| Summer 2026 — Nichols Library | 100 | 6 |
| Madison Junior High workshop | 50 | 2 (of 5 class periods) |
| Ray Chinese School | 95 | 5 |
| **Total** | **280** | **17** |

The Ray Chinese 95 is confirmed by Abhi as **unique students**, not a sum of
per-session attendance.

## Still needed from Abhi

These are the open items from the build brief.

1. **Fall 2026 interest form.** `org.fallInterestForm` in `src/data/content.js`
   is `null`, so every Fall CTA currently falls back to the Summer form
   (`https://forms.gle/e7idfGMdKgrFG57h9`). Create the fall form and set that
   field.
2. **Headshots** for everyone in both team tiers. The site currently renders
   gradient initials avatars, which look intentional, so this is an upgrade
   rather than a blocker.
3. **Prize sponsors.** The Sponsors page credits "$1,000+ in donated prizes" but
   can't name the businesses. Send the list and each gets its own card.
4. **Ray Chinese photos.** The workshop currently has no photo collage. Once
   photos exist, pick three and add them to that entry's `photos` array in
   `content.js` — the collage layout is already built and switches on
   automatically.
5. **Kingsley Elementary workshop** (contact: Tony Pak) is intentionally *not*
   published — the Workshops page lists only confirmed engagements. Say the word
   once it's locked in.

## Deliberate omissions

- **No press/news section.** bizbuzz has one; HHE has no coverage yet, and an
  empty or invented press section reads worse than no section. Add it back when
  real coverage exists.
- **No Fall 2026 session-by-session curriculum.** The page says curriculum is in
  design rather than publishing topics that aren't locked.
- **No office hours.** Dropped from the bizbuzz "Office Hours & FAQs" page since
  HHE doesn't run them; the page is FAQ only.
