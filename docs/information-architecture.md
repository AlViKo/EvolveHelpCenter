# Evolve Help Center — Information Architecture

**Version:** 3.0 (final)
**Date:** March 15, 2026
**Related:** [prd.md](prd.md) · [content-model.md](content-model.md)

---

## 1. Organizing Principle

**Collection-first, not content-type-first.** Users think "I need help with Course Creation," not "I need a how-to guide." Content types (guide, FAQ, overview) are metadata for badges, but navigation is always by collection — a grouping of articles around a platform feature or topic.

This mirrors the Intercom collection model used by the Sana reference site.

---

## 2. Site Map

```
Home
├── [For Administrators]
│   ├── Collection: Authentication
│   │   ├── Setting Up SSO for Your Organization
│   │   └── Managing User Roles and Permissions
│   ├── Collection: Platform Work
│   │   └── Navigating the Admin Dashboard
│   ├── Collection: Company Account Setup
│   │   └── Configuring Your Company Profile
│   └── Collection: Course Creation
│       ├── Creating Your First Course
│       └── FAQ — Course Builder Common Questions
│
├── [For Learners]
│   ├── Collection: Getting Started
│   │   └── Your First Day on Evolve
│   └── Collection: Learning & Progress
│       └── Tracking Your Course Progress
│
└── Search results page
```

Depth is flat: **Home → Collection → Article.** Two clicks from home to any article. No deeper nesting for the MVP.

---

## 3. Page Types

### 3.1 Home Page

| Zone | Content |
|---|---|
| Top bar | Evolve logo (left), search bar (right or center) |
| Hero area | Centered heading ("Evolve Help Center") + prominent search bar |
| Admin section | Heading "For Administrators" + collection cards grid |
| User section | Heading "For Learners" + collection cards grid |
| Footer | Logo, copyright, contact link |

Each **collection card** shows: icon, title, description, article count.

### 3.2 Collection Page

| Zone | Content |
|---|---|
| Breadcrumb | `All Collections > {Collection Title}` |
| Header | Icon, title, description, article count |
| Article list | Flat list of clickable article titles (clean text links, not cards) |
| Empty state | "Articles coming soon. Check back later." |

### 3.3 Article Page

| Zone | Content |
|---|---|
| Breadcrumb | `All Collections > {Collection Title} > {Article Title}` |
| Header | Title, author name, "Updated on {date}" |
| Body | Rendered Markdown: headings, paragraphs, bold, code, lists, tables, links |
| Footer widget | "Did this answer your question?" with thumbs up / thumbs down |

### 3.4 Search Results Page

| Zone | Content |
|---|---|
| Header | "Results for '{query}'" + result count |
| Results | List of matching articles: title, description snippet, collection name, audience badge ("Admin" / "Learner") |
| Empty state | "No results found for '{query}'. Try different keywords." |

---

## 4. Audience Lanes and Visibility

### 4.1 Audience lanes on the home page

The home page splits collections into two visual sections based on each collection's `audience` field.

| Lane | Label | Who it's for | Collections (Tuesday) |
|---|---|---|---|
| Admin | "For Administrators" | Platform admins, team leads, HR | Authentication, Platform Work, Company Account Setup, Course Creation |
| User | "For Learners" | Learners, employees, students | Getting Started, Learning & Progress |

### 4.2 Article visibility

Each article carries a `visibility` field that controls which reader roles can see it:

| `visibility` value | Visible to `user` role | Visible to `admin` role |
|---|---|---|
| `user` | Yes | Yes |
| `admin` | No | Yes |
| `all` | Yes | Yes |

The rule is simple: admins see everything, users see only what's marked for them.

### 4.3 Tuesday behavior

No authentication. The API defaults to showing everything (admin view). It accepts an optional `?role=user` parameter to simulate filtered access — useful for QA and for the post-Tuesday auth integration.

### 4.4 Consistency rule

An article's `visibility` should be compatible with its collection's `audience`. An article with `visibility: admin` should not live in a `user` collection. The seed command validates this.

---

## 5. URL Structure

```
/                                         → Home page
/collections/{collection-slug}/           → Collection page
/collections/{collection-slug}/{article-slug}/  → Article page
/search/?q={query}                        → Search results
```

All URLs use trailing slashes and lowercase hyphenated slugs.

Audience (`admin`/`user`) is **not** in the URL. It's a metadata attribute on the collection. The home page uses it to sort collections into visual sections, but URLs are flat under `/collections/`. This keeps links clean, shareable, and consistent across both EN and RU deployments.

---

## 6. Breadcrumbs

Every page below home shows breadcrumbs:

```
All Collections  >  {Collection Title}  >  {Article Title}
```

"All Collections" links to home. Collection title links to the collection page. Article title is the current page (not linked). Derived from the URL path.

---

## 7. Search

Available on every page via the persistent search bar.

| Property | Behavior |
|---|---|
| Scope | All published articles, both audience lanes |
| Input minimum | 2 characters |
| Fields searched | Title, description, body text |
| Result display | Title, description snippet, collection name, audience badge |
| Ranking | None for MVP — ordered by collection sort order, then article sort order |
| Visibility | Respects `?role=` parameter if present. Default: show all. |
| Empty state | "No results found" + suggestion to browse from home |

---

## 8. EN / RU Mirroring

Global (EN) and RU are separate identical deployments — same codebase, different content, different hosting. The information architecture is identical across both. There is no locale awareness in the product.

**Structural mirroring rules:**

Both environments must follow the same conventions so the codebase works identically:

- Same folder structure: one folder per collection, `_collection.yaml` + `.md` files inside.
- Same slug format: lowercase, hyphens, English-transliterated slugs even for RU content (e.g., `sozdanie-pervogo-kursa` not Cyrillic in URLs).
- Same metadata schema: identical YAML fields, same required/optional rules.
- Same `audience` and `visibility` values: `admin`, `user`, `all`.
- Same `content_type` values: `guide`, `faq`, `overview`.

The implementation package includes a `content-ru/` folder that mirrors the EN folder structure with valid `_collection.yaml` files and 1–2 Russian placeholder articles. This serves as the starter template for the RU team.

---

## 9. Future Growth (not for Tuesday)

- **Authentication and visibility enforcement** — login gates readers to their role. The API already supports `?role=` filtering; post-Tuesday, this parameter is derived from the session instead of the query string.
- **`evolve_admin` role** — editorial/management role with access to a content admin UI. Modeled as a third role value when needed.
- **New audience lane** (e.g., "For Developers") — add a third section on home. No restructuring needed.
- **Sub-collections** — if articles per collection grow large, add `parent_collection`. URL gains one segment.
- **Content management UI** — for non-technical contributors. See PRD §3 for options.
