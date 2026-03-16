# Evolve Help Center — PRD

**Version:** 3.0 (final)
**Date:** March 15, 2026
**Target launch:** Tuesday, March 17, 2026
**Stack:** Python/Django + React
**Visual reference:** https://support.sana.ai/en/ (white-labeled Intercom)
**Brand source:** Evolve Brand Identity Guidelines, January 2025

---

## 1. Product Overview

A branded, public-facing help center for the Evolve learning platform. Users land on a clean home page, browse collections of help articles, search, and read content — all in Evolve brand.

Global (EN) and RU are separate identical deployments — same codebase, separate content folders, separate hosting. There is no locale switcher and no shared database. This document describes the single-environment product. It applies equally to both.

---

## 2. Roles and Visibility

### 2.1 Reader roles

| Role | Who | What they see |
|---|---|---|
| **user** | Learners, employees, students, candidates | Articles with `visibility: user` or `visibility: all` |
| **admin** | Platform administrators who manage and teach | Articles with `visibility: admin`, `visibility: user`, or `visibility: all` (everything) |

A future **evolve_admin** role (internal Evolve staff with editorial privileges) is anticipated but not modeled for Tuesday.

### 2.2 Tuesday simplification

No authentication. The help center is publicly accessible. The home page shows two sections ("For Administrators" and "For Learners") and anyone can click into either.

However, the data model and API **must already support visibility filtering** so that when auth is added post-Tuesday, the backend can filter articles by role without schema changes.

Concretely this means:
- Every article has a `visibility` field (`user`, `admin`, or `all`).
- Every collection has an `audience` field (`user` or `admin`).
- The API accepts an optional `?role=user` query parameter. When present, it returns only articles and collections visible to that role. When absent (Tuesday default), it returns everything.

---

## 3. Content Management

### Tuesday: Markdown files in Git

Content lives as Markdown files with YAML frontmatter in a `content/` directory inside the repository. Publishing flow:

1. Author writes or edits a `.md` file.
2. Pushes to the repo.
3. On deploy, a Django management command (`seed_content`) reads all files and syncs them to the database.
4. The frontend reads from the database via API.

Publishing requires a deploy. For Tuesday that's fine — it's fast, version-controlled, and the team is technical enough to handle it.

### Post-Tuesday: options for non-technical contributors

The team is a mix of technical and non-technical people. After the demo, we'll need a friendlier editing path. Options to evaluate:

| Option | Effort | Trade-off |
|---|---|---|
| **Custom admin UI** — simple CRUD within the Django app | Medium (1–2 days) | Built to spec, we own maintenance |
| **GitHub web editor** — edit `.md` files on github.com with preview | Zero | Requires GitHub accounts; limited formatting help |
| **Headless CMS (Strapi, Directus)** — separate tool with visual editor | High (3–5 days) | Best UX for writers, adds infrastructure |

Decision deferred past Tuesday. The Markdown + Git model is compatible with all three — the content structure doesn't change, only the editing interface.

---

## 4. Visual Direction

The Sana support site (https://support.sana.ai/en/) is the UX reference. It runs on white-labeled Intercom. We replicate the same interaction patterns with Evolve brand applied.

### What we copy from Sana/Intercom's pattern

**Home page:**
- Top bar: logo (left).
- Centered title + search bar with placeholder text.
- Below search: collection cards in a responsive grid (2–3 columns desktop, 1 on mobile).
- Each collection card: icon, title, description, article count.

**Collection page:**
- Breadcrumb: `All Collections > Collection Name`.
- Collection header: icon, title, description, article count.
- Below header: flat list of article links (title only — clean clickable list, not cards).

**Article page:**
- Breadcrumb: `All Collections > Collection > Article Title`.
- Article header: title, author, "Updated on {date}".
- Body: rendered Markdown with headings, lists, tables, code blocks.
- Bottom: "Did this answer your question?" feedback widget (thumbs up / thumbs down).

**Global patterns:**
- White background everywhere, minimal color.
- Brand color used sparingly: links, icons, accents — not large surfaces.
- Generous whitespace. Clean, calm, professional.
- Simple footer with logo and links.

### What we change (Evolve brand)

- All Intercom defaults replaced with Evolve brand tokens (see §5).
- Home page gets two labeled sections: "For Administrators" and "For Learners" instead of a single flat grid.
- Evolve logo replaces the Sana logo.

---

## 5. Brand Constraints (from brandbook)

| Token | Value |
|---|---|
| **Vivid Blue** (primary) | `#3366FF` |
| **Sky Blue** | `#39C4FF` |
| **Lavender Purple** | `#8A61FF` |
| **Pure White** | `#FFFFFF` |
| **Silver Gray** | `#E5E5E5` |
| **Total Black** | `#000000` |
| **Typeface** | Open Sans, Bold (700) + Regular (400) only |
| **Corner radii** | 8px, 16px, 24px, 32px |

Usage:
- White background is the default. Vivid Blue for links, icons, and small accents.
- Open Sans is the only font.
- Corner radii: 16px for cards, 8px for buttons and badges.

---

## 6. Must-Have for Tuesday

### 6.1 Home page
- Evolve logo in top bar.
- Centered title ("Evolve Help Center") + search bar.
- Two sections: "For Administrators" and "For Learners".
- Each collection rendered as a card: icon, title, description, article count.

### 6.2 Collection page
- Breadcrumbs.
- Collection header with title, description, article count.
- Flat list of published article links within the collection.

### 6.3 Article page
- Breadcrumbs.
- Article title, author, last updated date.
- Rendered Markdown body (headings, paragraphs, bold, inline code, code blocks, lists, tables, links).
- "Did this answer your question?" feedback widget at the bottom (can be non-functional for demo, must be visually present).

### 6.4 Search
- Search bar in the top area of every page.
- Results page: matching articles with title, description snippet, collection name.
- Backend: simple `icontains` across title, description, and body. No Elasticsearch.
- Minimum 2 characters to trigger search.

### 6.5 Content pipeline
- Markdown files with YAML frontmatter in `content/`.
- `seed_content` management command parses files and upserts Collection + Article records.
- Supports `--dry-run` for validation without database writes.
- Re-running the command updates existing records (upsert by slug).

### 6.6 Visibility filtering in the API
- API accepts optional `?role=user` or `?role=admin` parameter.
- When `role=user`: return only collections with `audience: user` and articles with `visibility: user` or `visibility: all`.
- When `role=admin` or absent: return everything.
- No auth enforcement — the parameter is trusted for now.

### 6.7 Demo seed content
- The implementation package must include a populated `content/` folder with at least 6 realistic English articles across at least 4 collections.
- A mirrored `content-ru/` folder with the same folder structure, valid `_collection.yaml` files, and 1–2 Russian placeholder articles. This serves as the template for the RU deployment.

---

## 7. Non-Goals (explicitly out of scope for Tuesday)

- User authentication / login / SSO.
- Any admin UI for content editing (content is managed via Git).
- Locale switching or multi-language support in the UI.
- Article versioning or draft/publish workflow UI.
- Analytics or tracking.
- Comments or contact forms (feedback widget is visual-only).
- PDF export or print styling.
- Image uploads for articles.
- SEO optimization (meta tags, sitemap, structured data).
- Automated tests.
- CI/CD pipeline (deploy manually).
- The `evolve_admin` role.

---

## 8. Multi-Environment Strategy

Global (EN) and RU are **separate, identical deployments** — same codebase, separate databases, separate `content/` directories, separate hosting.

Both environments must follow the same folder structure, slug conventions, and metadata schema so that the codebase works identically for either. The implementation package includes a `content-ru/` folder that mirrors the EN structure as proof and template.

There is no locale field in the data model. No translation linking between environments. No `/ru/` URL prefix. No locale switcher.

---

## 9. Tuesday Acceptance Criteria

1. A first-time visitor opens the URL, sees the home page, clicks into a collection, reads an article, uses search to find another article — no guidance needed.
2. Every page uses Evolve brand palette, Open Sans typeface, and displays the Evolve logo.
3. Visual layout follows the Intercom/Sana pattern: white background, centered content, card-based collection grid, clean article typography.
4. Running `seed_content` with the demo `content/` folder produces a fully populated help center.
5. API returns filtered results when `?role=user` is passed (only user-visible content).
6. Landing page loads in under 3 seconds.

---

## 10. Key Risks

| Risk | Mitigation |
|---|---|
| Branding polish takes too long | Define CSS variables (brand tokens) first. Apply globally, not page-by-page. |
| No real article content ready | Pre-write 6+ seed articles as Markdown files. Load via management command on first deploy. |
| React ↔ Django integration friction | Use DRF with `/api/v1/` prefix. Vite proxy to Django in dev. |
| Visibility model adds complexity | Keep it simple: one `visibility` field on Article, one `audience` field on Collection, one query parameter on the API. No middleware, no permission classes. |
| "One more feature" before Tuesday | This PRD is the scope contract. Anything not listed is a post-Tuesday ticket. |
