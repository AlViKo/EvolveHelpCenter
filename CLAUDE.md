# Evolve Help Center — Project Context for Claude Code

## CRITICAL RULES
- Do NOT modify or delete any existing files without being explicitly asked
- Do NOT refactor, reorganize, or "improve" code unless specifically requested
- Do NOT install new packages or change dependencies unless asked
- Always read docs/prd.md, docs/information-architecture.md, and docs/content-model.md before making any changes
- When asked to fix something, fix ONLY that thing — do not touch anything else

## Project Overview
This is a branded help center for the Evolve learning platform, modeled after Intercom's pattern (reference: support.sana.ai). Built with Django + DRF backend, React + TypeScript frontend, deployed on Railway.

## Stack
- Backend: Python/Django + Django REST Framework
- Frontend: React + TypeScript + Vite
- Content: Markdown files with YAML frontmatter in content/
- Database: SQLite (seeded from content files via seed_content command)
- Hosting: Railway (auto-deploys from GitHub on push)

## Content Pipeline
content/ folder → seed_content management command → database → API → frontend
Never edit the database directly. Always edit the Markdown files and re-seed.

## Key Commands
- Seed content: python3 manage.py seed_content --content-dir ./content
- Run backend: python3 manage.py runserver
- Run frontend: cd frontend && npm run dev
- Deploy: git push (Railway auto-deploys)

## Do NOT touch these unless explicitly asked
- docs/ folder (architecture documentation)
- content/ folder structure (only add/edit individual articles when asked)
- Database migrations
- Railway deployment configuration
- package.json dependencies
- requirements.txt dependencies
