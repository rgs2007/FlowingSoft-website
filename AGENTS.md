# Codex Project Instructions

## Project Context

This repository is the static GitHub Pages website for Flowing Soft.

Flowing Soft should be presented first as a practical AI services company. The
product lab exists as evidence of the service method: Flowing Soft uses its AI,
workflow, and product-development knowledge to create small product experiments,
launch pages, and early-interest tests.

Public site:
https://www.flowingsoft.com/

Local preview:
Serve the repository root with a static server, for example:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Then open:
http://127.0.0.1:4173/

The site is no-build. Do not add a package manager, bundler, or framework unless
the user explicitly asks for that larger architecture change.

## Site Structure

- `index.html` is the company homepage.
- `assets/product-lab-items.js` is the data source for the Product Lab carousel.
- `assets/minimal-flow-feature-graphic.png` is the current Minimal Flow product
  artwork used by the homepage and launch page.
- `products/the-minimalist-flow-watchface/index.html` is the dedicated launch
  page for The Minimal Flow.
- `products/the-minimalist-flow-watchface/privacy/index.html` is the privacy
  page for The Minimal Flow.
- `thanks.html` is the shared thank-you page used after interest form
  submissions.
- `CNAME` configures the custom GitHub Pages domain.
- `.github/workflows/pages.yml` owns GitHub Pages deployment.

## Positioning Rules

- Lead with services, not products.
- Services should focus on helping small businesses, individuals, and families
  use AI in real work and real life.
- Keep the AI-services copy practical and non-technical. Emphasize workflow fit,
  trust, verification, tool overload, generic output, and knowing where to start.
- Products should be framed as Product Lab experiments or proof points from the
  service practice, not as the main company identity.
- The Minimal Flow is not publicly available yet. Keep copy clear that it is in
  private testing / launch preparation.
- Avoid promising availability, downloads, app-store status, or features that do
  not exist yet.

## Product Lab Architecture

The homepage Product Lab carousel is data-driven. Add or edit product tiles in
`assets/product-lab-items.js`, not by duplicating carousel markup in
`index.html`.

Each product item should include:

- `name`: Product name shown on the tile.
- `status`: Short lifecycle label, such as `Private testing soon`.
- `category`: Product type or audience.
- `image`: Path to the product image from the homepage.
- `imageAlt`: Useful alt text for the product image.
- `description`: Short explanation of the product and why it proves the service.
- `launchUrl`: Dedicated product launch page URL.
- `interestUrl`: Anchor URL for the product interest form.
- `proofPoints`: Three short objects with `title` and `text`.

When adding a new product idea:

1. Create a product folder under `products/<product-slug>/`.
2. Add a dedicated launch page at `products/<product-slug>/index.html`.
3. Add or reuse a product image under `assets/`.
4. Add a new item in `assets/product-lab-items.js`.
5. Ensure the launch page interest form uses a product-specific email subject.
6. Verify the homepage carousel, product launch page, and thank-you page locally.

## Launch Page Rules

Each product launch page should be a focused page for one product or POV.

- Use the same Flowing Soft visual language: warm paper surfaces, bold black
  typography, sage/plum/clay accents, restrained cards, and clear calls to
  action.
- Explain the product as a result of the Flowing Soft service playbook.
- Make status clear: concept, private testing, waitlist, or launched.
- Include a direct early-interest form.
- Keep the first screen focused on the product, not generic company marketing.
- Link back to the homepage services and Product Lab sections.

Interest forms currently use FormSubmit:

```html
<form action="https://formsubmit.co/flowingsoft@flowingsoft.com" method="POST">
```

For classification, every product form must include the product name in both:

```html
<input type="hidden" name="_subject" value="[Product Name] Tester and launch list signup">
<input type="hidden" name="product_name" value="Product Name">
```

Use `thanks.html` as the default redirect:

```html
<input type="hidden" name="_next" value="https://www.flowingsoft.com/thanks.html">
```

FormSubmit may require the first submission to be confirmed from
`flowingsoft@flowingsoft.com`. Do not remove the note about first-submission
confirmation unless the form backend changes.

## Engineering Standards

- Follow clean code best practices: readable names, small functions, clear
  control flow, and minimal hidden state.
- Keep changes focused. Avoid broad rewrites unless the user explicitly asks for
  a larger redesign.
- Prefer browser-native HTML, CSS, and JavaScript for this project.
- Use simple data-driven structures when they reduce repeated markup, as with
  `assets/product-lab-items.js`.
- Use SOLID principles where they apply naturally, especially single
  responsibility and clear ownership. Do not force abstractions into a small
  static site when plain code is clearer.
- Keep behavior testable by separating data, rendering helpers, and DOM updates
  whenever practical.
- Avoid duplicated constants. If a value controls behavior in multiple places,
  give it a meaningful name or move it into a clear data object.
- Preserve accessibility for interactive controls with labels, semantic
  elements, keyboard-friendly behavior, alt text, and sufficient contrast.
- All implemented code should aim to run in current and recent major browsers.
  Prefer stable, broadly supported web platform features.
- Prefer small, focused files when the site grows so future AI-assisted work can
  inspect one relevant slice instead of the whole project.

## Design Direction

- The homepage should feel like a capable service company, not a generic SaaS
  landing page.
- Avoid oversized marketing filler. Make the page useful immediately: services,
  real struggles, approach, and product proof.
- Do not use decorative orbs, bokeh, generic gradients, or stock-like imagery.
- Use real product images or generated product-specific assets when the page is
  about a specific product.
- Keep cards restrained with 8px radius or less.
- Avoid nested cards.
- Keep typography bold and readable, with no negative letter spacing and no
  viewport-width-only font scaling.
- On mobile, verify text does not overflow its container and buttons remain
  usable.
- Keep the Minimal Flow visual language: warm paper, black type, sage, plum,
  clay, calm surfaces, and focused work language.

## JavaScript Rules

- Keep homepage carousel data in `assets/product-lab-items.js`.
- Keep carousel DOM rendering in `index.html` unless the script grows large
  enough to justify a separate focused file.
- Sanitize any data inserted into generated markup with the existing escaping
  helper or an equivalent safe pattern.
- Carousel controls must remain keyboard-accessible buttons with descriptive
  `aria-label` values.
- Do not leave temporary debug logs in final code.
- Never log emails, tokens, or private submission data.

## Testing

Before committing visible site changes:

- Run a local static server from the repository root.
- Verify `http://127.0.0.1:4173/` returns status 200.
- Verify `http://127.0.0.1:4173/assets/product-lab-items.js` returns status 200
  when product carousel data changes.
- Verify each changed product launch page returns status 200.
- Verify `thanks.html` returns status 200 when form redirects are touched.
- For product forms, verify the served HTML contains the product-specific
  `_subject` and `product_name` hidden fields.
- For visual homepage changes, check desktop and mobile layouts with browser
  screenshots when practical.

No automated test runner exists yet. If JavaScript behavior grows beyond simple
carousel wiring, add lightweight browser-based tests before adding a build
pipeline.

## Comments

- Add comments sparingly, where they explain structure, integration decisions,
  browser quirks, or future product-lab maintenance.
- Do not add comments that merely repeat the code.
- When changing code near an existing comment, update the comment so it stays
  true.

## Maintenance Rules

- Update this `AGENTS.md` file when important positioning, architecture, form,
  deployment, or design decisions change.
- If a future change adds a build tool, package manager, test runner, CMS, or
  form backend, document the commands and ownership here.
- If a future change adds generated files or deployment artifacts, document what
  should and should not be edited by hand.
- Keep local server logs ignored. Do not commit `.server.*.log`.
