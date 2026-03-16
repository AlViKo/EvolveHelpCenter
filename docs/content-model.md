# Evolve Help Center — Content Model

**Version:** 3.0 (final)
**Date:** March 15, 2026
**Related:** [prd.md](prd.md) · [information-architecture.md](information-architecture.md)

---

## 1. Design Principles

- **File-first.** Content lives as Markdown files with YAML frontmatter in a `content/` directory. The database is populated from these files via a Django management command on deploy.
- **Flat metadata.** No nested YAML. Every field is a scalar or a flat list.
- **Visibility-aware from day one.** Every article carries a `visibility` field that the API can filter on. Tuesday ships without auth, but the schema is ready for it.
- **No locale awareness.** Each deployment (EN, RU) has its own `content/` folder. The data model has no concept of language. Same code, different content.

---

## 2. Entities

Two entities: **Collection** and **Article**.

A Collection groups related articles around a platform feature or topic. An Article is a single help document inside exactly one Collection.

---

## 3. Collection Metadata

Each collection folder contains a `_collection.yaml` file:

```yaml
# content/authentication/_collection.yaml

title: "Authentication"
slug: "authentication"
description: "Configure login methods, single sign-on, and user role management for your organization."
icon: "shield-check"
audience: "admin"
sort_order: 1
```

### Field reference

| Field | Type | Required | Description |
|---|---|---|---|
| `title` | string | yes | Display name on cards and headers |
| `slug` | string | yes | URL segment. Must match the folder name. Lowercase, hyphens only |
| `description` | string | yes | 1–2 sentences for collection cards. Max 200 characters |
| `icon` | string | yes | Lucide icon name for the collection card |
| `audience` | enum | yes | `admin` or `user`. Determines which home page section the collection appears in |
| `sort_order` | integer | yes | Display order within its audience lane. Lower = first |

---

## 4. Article Frontmatter

Each article is a `.md` file with YAML frontmatter:

```yaml
---
title: "Setting Up SSO for Your Organization"
slug: "setting-up-sso"
collection: "authentication"
content_type: "guide"
visibility: "admin"
description: "Connect your identity provider to Evolve so team members can log in with existing company credentials."
author: "Evolve Team"
owner: "elina@evolveplatform.ai"
status: "published"
sort_order: 1
tags:
  - sso
  - authentication
  - saml
created_at: "2026-03-14"
updated_at: "2026-03-14"
last_reviewed_at: "2026-03-14"
---

Article body in Markdown starts here.
```

### Field reference

| Field | Type | Required | Description |
|---|---|---|---|
| `title` | string | yes | Display title. Max 80 characters |
| `slug` | string | yes | URL segment. Must match the filename (without `.md`). Unique within its collection |
| `collection` | string | yes | Slug of the parent collection. Must match the folder name |
| `content_type` | enum | yes | `guide`, `faq`, or `overview`. Used for badge display, not navigation |
| `visibility` | enum | yes | `user`, `admin`, or `all`. Controls which reader roles can see this article. See §6 |
| `description` | string | yes | 1–2 sentence summary for search results and lists. Max 200 characters |
| `author` | string | yes | Display name shown on the article page. Use "Evolve Team" when no individual author |
| `owner` | string | yes | Email of the person responsible for keeping this article accurate. Not displayed on the frontend — used internally for content maintenance |
| `status` | enum | yes | `draft` or `published`. Only `published` articles render on the frontend |
| `sort_order` | integer | no | Order within the collection. Default: 100. Lower = first |
| `tags` | list | no | Flat list of lowercase keywords for search boosting |
| `created_at` | date | yes | ISO 8601 date (`YYYY-MM-DD`). Set once on creation |
| `updated_at` | date | yes | ISO 8601 date. Updated on every content edit |
| `last_reviewed_at` | date | yes | ISO 8601 date. Updated when someone confirms the article is still accurate — even if no content changed. Used to track content freshness |

### Difference between `updated_at` and `last_reviewed_at`

`updated_at` changes when the article text changes. `last_reviewed_at` changes when someone verifies the content is still correct — this may happen without any edit. A review without changes still resets the freshness clock. This lets the team identify stale articles that haven't been reviewed recently, even if they were never modified.

---

## 5. File Structure

```
content/
├── authentication/
│   ├── _collection.yaml
│   ├── setting-up-sso.md
│   └── managing-user-roles-and-permissions.md
├── platform-work/
│   ├── _collection.yaml
│   └── navigating-the-admin-dashboard.md
├── company-account-setup/
│   ├── _collection.yaml
│   └── configuring-your-company-profile.md
├── course-creation/
│   ├── _collection.yaml
│   ├── creating-your-first-course.md
│   └── faq-course-builder-common-questions.md
├── getting-started/
│   ├── _collection.yaml
│   └── your-first-day-on-evolve.md
└── learning-and-progress/
    ├── _collection.yaml
    └── tracking-your-course-progress.md
```

**Rules:**
- Each folder under `content/` is a collection. Folder name = collection slug.
- Each `.md` file in a collection folder is an article. Filename (minus `.md`) = article slug.
- `_collection.yaml` is the only non-Markdown file per folder.
- No nesting beyond one level. Audience is a metadata field, not a folder.
- All slugs: lowercase, hyphens only, no special characters.

---

## 6. Visibility Model

### How it works

Every article has a `visibility` field. Every collection has an `audience` field. Together they control what each reader role sees.

| Article `visibility` | Visible to `user` | Visible to `admin` |
|---|---|---|
| `user` | Yes | Yes |
| `admin` | No | Yes |
| `all` | Yes | Yes |

Collections are filtered by `audience` the same way: `user` collections are visible to everyone, `admin` collections are visible only to admins (or everyone when no role filter is applied).

### Consistency rule

An article's `visibility` must be compatible with its parent collection's `audience`:

| Collection `audience` | Allowed article `visibility` values |
|---|---|
| `admin` | `admin` or `all` |
| `user` | `user` or `all` |

An article with `visibility: admin` in a `user` collection is a validation error. The seed command enforces this.

### API behavior

The API accepts an optional `?role=` query parameter:

- `?role=user` → return only `user` audience collections and articles with `visibility` in (`user`, `all`).
- `?role=admin` or no parameter → return everything.

For Tuesday, this parameter is passed manually (no auth). Post-Tuesday, it's derived from the logged-in user's role.

### Future: `evolve_admin` role

When added, `evolve_admin` will see everything `admin` sees plus have access to editorial tools (content management UI). No new `visibility` value needed — it's an access-control role, not a content-visibility role.

---

## 7. Django Model Mapping

The `seed_content` command reads the file tree and upserts these models:

```
Collection
├── id                  (auto)
├── title               (from _collection.yaml)
├── slug                (from folder name)  → unique
├── description         (from _collection.yaml)
├── icon                (from _collection.yaml)
├── audience            (from _collection.yaml: "admin" | "user")
└── sort_order          (from _collection.yaml)

Article
├── id                  (auto)
├── collection          (FK → Collection)
├── title               (from frontmatter)
├── slug                (from frontmatter)
├── content_type        (from frontmatter: "guide" | "faq" | "overview")
├── visibility          (from frontmatter: "user" | "admin" | "all")
├── description         (from frontmatter)
├── body_markdown       (everything below the YAML frontmatter block)
├── author              (from frontmatter)
├── owner               (from frontmatter — email, not displayed)
├── status              (from frontmatter: "draft" | "published")
├── sort_order          (from frontmatter, default 100)
├── tags                (JSON field)
├── created_at          (from frontmatter)
├── updated_at          (from frontmatter)
└── last_reviewed_at    (from frontmatter)
```

### Unique constraints

| Constraint | Fields | Purpose |
|---|---|---|
| Unique collection | `slug` | No two collections with the same slug |
| Unique article per collection | `slug` + `collection` | No two articles with the same slug in one collection |

---

## 8. Seed Command Contract

```
python manage.py seed_content --content-dir ./content
```

**Behavior:**
1. Walks `content/{collection-slug}/` directories.
2. Parses each `_collection.yaml` → upserts a `Collection` record (matched on `slug`).
3. Parses each `.md` file → splits YAML frontmatter from body → upserts an `Article` record (matched on `slug` + `collection`).
4. Validates all fields and cross-checks frontmatter against folder structure.
5. Fails loudly on any validation error — lists all errors, does not partially commit.
6. Supports `--dry-run` flag (validate without writing to DB).

**Validation rules:**
- All required fields present and non-empty.
- `slug` in article frontmatter matches the filename.
- `collection` in article frontmatter matches parent folder name.
- `slug` is unique per collection.
- `status` is `draft` or `published`.
- `content_type` is `guide`, `faq`, or `overview`.
- `visibility` is `user`, `admin`, or `all`.
- `audience` in `_collection.yaml` is `admin` or `user`.
- Visibility/audience consistency: no `visibility: admin` articles in `user` collections, no `visibility: user` articles in `admin` collections. `visibility: all` is allowed in either.
- `owner` is a non-empty string (email format validation is optional for MVP).
- `last_reviewed_at` is a valid ISO date.

---

## 9. Content Types

Content types determine article structure and badge display. They do **not** affect navigation.

| Type | Badge label | Typical structure |
|---|---|---|
| `guide` | Guide | Prerequisites → Steps → Expected Result → Troubleshooting |
| `faq` | FAQ | Questions as headings → Short answers → Details |
| `overview` | Overview | What is it → Why it matters → What you can do → Next steps |

---

## 10. Publishing Workflow

### Tuesday (and near-term)

```
Author writes .md file  →  Git push  →  Deploy  →  seed_content runs  →  Live
```

`status: draft` articles are in the repo but hidden from the frontend. Changing to `published` and deploying makes them live.

### Content freshness

When reviewing an article, update `last_reviewed_at` even if no text changes. This lets the team query for stale articles (e.g., "not reviewed in 90+ days") as the help center grows.

---

## 11. EN / RU Mirroring Conventions

Global (EN) and RU are separate deploys with separate `content/` folders. There is no locale linking in the data model. But both must follow identical structural conventions so the codebase works for either:

| Convention | Rule |
|---|---|
| Folder structure | One folder per collection, `_collection.yaml` + `.md` files inside. Identical layout. |
| Slug format | Lowercase, hyphens only. For RU content, use transliterated slugs (`sozdanie-pervogo-kursa`, not Cyrillic). |
| Metadata schema | Identical YAML fields. Same required/optional rules. Same enum values. |
| `audience` values | `admin` or `user` — same in both environments. |
| `visibility` values | `user`, `admin`, or `all` — same in both environments. |
| `content_type` values | `guide`, `faq`, or `overview` — same in both environments. |
| `owner` format | Email address — same format in both environments. |

The implementation package includes a `content-ru/` directory that mirrors the EN folder structure with valid `_collection.yaml` files and 1–2 Russian placeholder articles. This serves as the starter template for the RU team.

---

## 12. Seed Content Requirements

The implementation package must ship with:

### EN (`content/`)

At least 6 realistic articles across at least 4 collections:

| Collection | Audience | Min. articles |
|---|---|---|
| Authentication | admin | 1–2 |
| Platform Work | admin | 1 |
| Company Account Setup | admin | 1 |
| Course Creation | admin | 1–2 |
| Getting Started | user | 1 |
| Learning & Progress | user | 1 |

Articles should be plausible help center material for a learning platform — not lorem ipsum. Titles, descriptions, and body structure should reflect real product scenarios.

### RU (`content-ru/`)

- All 6 collection folders with valid `_collection.yaml` files (Russian titles, transliterated slugs).
- 1–2 Russian placeholder articles (at least one admin, one user).
- All other collection folders exist but contain only `_collection.yaml` (no articles). Empty collections must render gracefully with the "Articles coming soon" empty state.
