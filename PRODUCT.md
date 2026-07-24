# Product

## Register

brand

## Users

Homeowners, businesses (comercial/industrial), and rural property owners in Uberlândia/MG and Catalão/GO (+ ~25 nearby cities) evaluating solar installation. Arrive via paid traffic, social (Instagram), prospecting, and Google search. Job to be done: quickly gauge realistic savings for their own monthly bill and decide whether to contact Romasol via WhatsApp.

## Product Purpose

Landing page replacing a generic WordPress site, translating Romasol's real engineering authority (est. 2015, 1000+ completed projects, WEG partnership, "Melhores 2026" award) into a premium conversion experience. Primary conversion path: bill input → solar calculator estimate → WhatsApp lead with pre-filled context (profile/city/bill/estimate).

## Brand Personality

Confiante, técnica, solar. Premium dark base (deep navy/royal blue) with solar-yellow accent — engineering credibility over generic "green eco" solar cliché. Data-backed, not hype-driven: real project numbers (panels/kWp/annual savings) stand in for stock trust badges.

## Anti-references

- The current WordPress site (generic template, no authority signal).
- Generic AI-slop marketing pages: gradient text, glassmorphism-as-default, hero-metric template (big number + label + gradient accent), identical repeated card grids, "green eco leaf" solar clichés, invented/placeholder data.
- Never render dev placeholders (`[CONFIRMAR]`, empty canonical, incomplete contact fields) in the shipped UI — pending confirmations live only in the project plan doc.

## Design Principles

- Only verified facts and published numbers (project cases, savings %, dates) — never invent city/name/specs to fill a gap.
- One WhatsApp destination everywhere, contextualized per profile/city/bill.
- Motion and layout should read as engineering precision, not decorative flash — reveals, scroll-driven sections, animated counters, but nothing that fights `prefers-reduced-motion`.
- Hierarchy through real content density (project cases, technical diagrams) instead of icon-grid filler.

## Accessibility & Inclusion

WCAG AA target. Semantic HTML, visible focus states, sufficient contrast on dark navy base, keyboard operability for the calculator and FAQ accordions, labels/errors associated with form fields, descriptive alt text on project photos, full `prefers-reduced-motion` support (GSAP pins/scrub disabled, no essential info conveyed by motion alone).
