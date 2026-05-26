# Angular Refactor Implementation Plan

Date: 2026-05-21
Depends on: docs/legacy-site-analysis-refactoring.md

## Objective

Implement a modern Angular-based replacement for the legacy Drupal site using already-extracted JSON content, with a delivery strategy that starts locally and then moves to cost-conscious hosting with:

- a managed data server
- pre-built administrative forms/workflows for non-technical content editing

## Key Constraints and Decisions

- Front end framework is fixed: Angular.
- Source content has already been extracted from Drupal and formatted as JSON.
- Delivery order is fixed:
  1. local implementation first
  2. hosted deployment second
- Hosting target should minimize operating cost while improving maintainability.
- Admin UX should rely on pre-rolled forms where possible instead of custom-built Angular admin screens.

## Proposed Target Architecture

Recommended stack:

1. Front end
- Angular application for public site.
- Angular routing mirrors legacy IA (Home, History, Stories, Links, Foundation).
- Route redirects for legacy node paths.

2. Data and admin layer
- Directus + PostgreSQL as the data API + admin portal.
- Reasoning:
  - Directus provides database-driven content APIs out of the box.
  - Directus provides ready-made administrative forms and role-based permissions.
  - PostgreSQL keeps content structured and portable.

3. Hosting
- Public Angular app: low-cost static/edge host (for example Cloudflare Pages or Netlify).
- Data/admin service: hosted Directus + managed PostgreSQL (for example Railway/Render/Fly.io + Neon/Supabase Postgres).

## Implementation Phases

## Phase 0 - Discovery and Mapping

Goals:

- validate JSON extract quality and completeness
- map extracted fields to target content model

Tasks:

1. Build a JSON inventory:
- identify all JSON files
- classify by content type (page, profile, memorial, resource, artifact, people-finder entry)
- record record counts per type

2. Define canonical content model:
- base fields: id, slug, title, summary, body, source_url, source_type, status, created_at, updated_at
- media fields: image_url, image_caption, attachment_url, embed_url
- people fields: name variants, relationship, school, graduation_year, location, contact visibility flags

3. Define URL map:
- legacy URL -> new route
- include node paths and nested subsection routes

Deliverables:

- content-model.md
- legacy-to-new-routes.csv
- json-inventory.csv

## Phase 1 - Local Angular Foundation

Goals:

- establish Angular app shell and information architecture
- render JSON content locally without hosted dependencies

Tasks:

1. Build route skeleton:
- top-level routes for Home, History, Stories, Links, Foundation
- subsection routes for Profiles, Memorials, Scrapbook, News, Add Story, People-Finder

2. Implement data access abstraction:
- Angular data services that read from local JSON during this phase
- isolate data layer so backend source can be swapped later without major UI rewrites

3. Build shared layout components:
- header/nav
- breadcrumb
- search/filter bar
- footer

4. Build first-pass page templates:
- static content template (history/about/foundation)
- listing template (profiles/memorials/links)
- detail template (individual record)
- filterable table/list template (people-finder)

Acceptance criteria:

- core routes are navigable locally
- representative data from each major content type renders in Angular
- no hard dependency on Drupal runtime

## Phase 2 - Local Data Server + Admin (Pre-Hosted)

Goals:

- stand up the future data/admin stack locally
- ingest JSON into database collections/tables

Tasks:

1. Run local services via Docker Compose:
- PostgreSQL
- Directus

2. Create collections matching content model.

3. Import JSON data into Directus collections.

4. Configure Directus admin:
- field labels/help text
- validation rules
- role permissions (public read, editor write, admin full)

5. Switch Angular data services:
- from local file adapters to API adapters calling Directus

Acceptance criteria:

- editors can create/edit entries using Directus forms
- Angular app reads from local Directus API
- People-Finder filtering works against API-backed data

## Phase 3 - Content QA and Migration Hardening

Goals:

- ensure content fidelity and safe cutover readiness

Tasks:

1. QA checks:
- missing titles/slugs
- broken media links
- malformed dates/years
- duplicate records

2. UX and accessibility checks:
- heading hierarchy
- keyboard navigation
- table/list readability for long-form records

3. Redirect plan:
- implement and verify legacy route redirects
- especially /node/* and known popular legacy URLs

Acceptance criteria:

- agreed critical pages pass parity review against legacy site
- redirect map validated for priority URLs

## Phase 4 - Hosting and Go-Live

Goals:

- deploy low-cost production services
- preserve data-editing capability through admin forms

Tasks:

1. Deploy Angular app to static/edge host.

2. Deploy Directus + Postgres to chosen managed providers.

3. Configure environment variables and CORS.

4. Set backups and minimum monitoring:
- DB backup schedule
- uptime check for API and app

5. Configure DNS and TLS.

6. Launch with phased verification:
- smoke tests
- content spot checks
- redirect checks

Acceptance criteria:

- production site serves Angular app correctly
- content edits in admin portal appear on public site
- backups and basic monitoring are active

## Recommended Hosting Candidates

Primary recommendation (balanced cost + admin readiness):

1. Angular app on Cloudflare Pages
2. Directus on Railway or Render
3. Postgres on Neon (or Supabase Postgres)

Alternative path (single-vendor simplicity):

1. Angular app and backend on Render
2. Managed Postgres on Render
3. Directus on Render

Selection criteria:

- monthly cost at current traffic
- ease of backups
- editor/admin usability
- deployment complexity

## Work Breakdown for the Next Sprint

1. Confirm JSON schema and route inventory
2. Implement Angular route skeleton + shared layout
3. Implement local JSON adapter and render 3 representative sections
4. Stand up local Directus/Postgres with Docker
5. Import one content type end-to-end and validate admin form editing

## Risks and Mitigations

1. Risk: inconsistent extracted JSON quality
- Mitigation: build import validation and reject/error reports before bulk load

2. Risk: legacy content has embedded HTML assumptions
- Mitigation: sanitize and normalize rich text at import, define rendering rules

3. Risk: long lists impact performance
- Mitigation: add pagination, server-side filtering, and index key fields

4. Risk: route breakage after migration
- Mitigation: maintain explicit redirect map and test high-traffic legacy URLs

## Definition of Done (Program-Level)

- Angular site replaces public Drupal pages for agreed scope
- JSON-derived content is stored in managed Postgres and served through API
- Editors can manage content through pre-built administrative forms (Directus)
- Priority legacy URLs redirect correctly
- Hosting cost and operational burden are lower than current baseline
