# Legacy Site Analysis & Refactoring Considerations

Date: 2026-05-21
Source site scanned: https://uscadetnurse.org/

## Purpose

This document captures what exists on the legacy website today, with emphasis on content and information structure, to support a later implementation plan.

The current site is a legacy Drupal site. The refactor goals are to modernize the stack, make content easier to edit, and reduce hosting cost. A project decision has already been made to use Angular for the rebuilt site.

## High-Level Site Summary

- Mission/theme: preserve and share the history and legacy of the U.S. Cadet Nurse Corps.
- Primary value: archival/history content plus community-contributed stories, memorials, and contact discovery.
- Tone: historical, commemorative, community-driven, advocacy-supportive.
- Core home-page message: historical context, anniversary call-to-action, and participation prompts.

## Preliminary Information Architecture (Observed)

Primary navigation appears to be grouped into major sections with nested items:

1. Home
2. Foundation
3. About this website
4. Cadet Nurse Corps History
5. Cadet Nurse Stories
6. Links

Observed nested/sub-section structure:

- Cadet Nurse Corps History
  - Cadet Nurse Corps Legislation
  - Cadet Nurse Pledge
  - The Uniform
  - The Arts in the Cadet Nurse Corps
  - Cadet Nurse Legacy
- Cadet Nurse Stories
  - Profiles
  - Memorials (We Remember)
  - Scrapbook
  - News Stories
  - Add a Story
  - Find a Cadet Nurse (People-Finder)
- Links
  - Store
  - Participate

Secondary/global elements seen across pages:

- Search form
- Breadcrumb trail
- "Connect" social icon block (Twitter/Facebook/Flickr/Pinterest/Vimeo/YouTube/RSS)
- "Share this Page" block
- Large multi-column footer table with repeated links (About/Contact/Site Index/Accessibility/Login, etc.)

## Content Types and Patterns

The site contains a mix of static informational pages, long-form archival pages, and crowd-contributed records.

### 1) Static/Institutional Pages

- About this website: describes the three broad content areas and participation model.
- Foundation page: nonprofit context, mission, priorities, directors, donation details, official documents.

### 2) Historical/Reference Content

- History and legislation-oriented resources.
- Some history resources route to external or embedded systems (for example, a history link redirecting to Box embed content).

### 3) Community-Contributed Story Content

- Profiles: very large, long-running list of person records, often with portraits and rich narrative text.
- Memorials (We Remember): similar list model focused on deceased Cadet Nurses and tributes.
- Add a Story: contribution entry point.

### 4) Directory/Lookup Content

- People-Finder: tabular/filterable directory with fields like relationship, graduation year, nursing school, and contact email.
- This section appears to function as a practical self-service contact and lookup tool.

### 5) Media/Artifacts

- Digital Scrapbook: scanned artifacts, linked documents, and external media integrations (notably Flickr embeds).

### 6) Curated External Resources

- Links section: paginated collection of related organizations, archives, and scholarship resources.

## Preliminary Page Layout Characteristics

Common page composition appears to follow this pattern:

1. Global header/brand area
2. Main navigation with nested items
3. Utility links and search
4. Breadcrumb and page title
5. Main content (often long-form list/table content)
6. Sidebar-like utility blocks (Connect, Share)
7. Repetitive large footer link matrix

Notable structural characteristics:

- Many pages are very long and content-dense.
- Important content is frequently represented as large HTML tables/lists.
- Repeated utility and footer modules create visual and structural redundancy.
- Content and presentation are tightly interwoven in some places.

## Legacy Platform and Technical Signals (Observed)

- Site explicitly identifies as "Powered by Drupal."
- URL patterns include legacy-style paths such as `/node/1`, `/node/4`, etc.
- Multiple integrations to third-party systems/services (social widgets, Flickr, Box embed, donation form, etc.).
- During scan, some third-party resources failed to resolve and at least one page script error appeared, indicating aging dependencies/integration fragility.

## Why Refactor (Documented Context)

The refactor rationale aligns with observed site characteristics:

- Legacy CMS and structure create long-term maintenance friction.
- Content management likely requires technical familiarity and legacy workflow knowledge.
- Hosting/infrastructure can be modernized for lower operational cost.
- A modern front end can improve consistency, usability, and maintainability while preserving archival value.

## Angular Refactor Considerations (Pre-Planning)

Given the decision to use Angular, the following concerns should feed the upcoming implementation plan:

1. Content model first
- Define reusable content types (page, story profile, memorial entry, resource link, artifact item, people-finder record).
- Separate structure and metadata from presentation.

2. IA preservation with UX modernization
- Preserve existing top-level section semantics so long-time users can reorient quickly.
- Reduce duplication in utility/footer content.

3. Migration strategy
- Inventory legacy URLs and set redirect policy (especially `/node/*` routes).
- Plan extraction/cleanup for long-form table-heavy pages.
- Determine handling for external embeds and third-party dependencies.

4. Editing workflow simplification
- Prioritize non-technical editing paths for new contributions and updates.
- Formalize moderation/review flow for community-submitted content.

5. Search and discoverability
- Preserve or improve filtering and lookup behavior from People-Finder.
- Ensure content remains indexable and searchable.

6. Performance and hosting cost
- Favor static-friendly delivery patterns where possible.
- Minimize runtime dependencies and brittle third-party scripts.

7. Accessibility and maintainability
- Rebuild semantic structure for long lists/tables where appropriate.
- Standardize templates for consistent heading hierarchy, metadata, and navigation.

## Suggested Inputs for the Next Document (Implementation Plan)

When we create the implementation plan, these are the key next inputs to define:

- Full page/content inventory with migration priority tiers.
- Canonical route map (legacy URL -> new Angular route).
- Target content schema for each content type.
- Data migration approach (manual, scripted, staged hybrid).
- Governance model for editorial roles and update workflow.
- Cutover strategy, including redirects and validation checklist.
