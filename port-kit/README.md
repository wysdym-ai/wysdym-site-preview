# wysdym → Framer port kit

Everything needed to rebuild the lined-paper mockups
(https://wysdym-ai.github.io/wysdym-site-preview/) in the Framer project
**"wysdym.ai paper"**. Source of truth for look/behavior = the HTML mockups.

## What's in the kit

| File | What it is |
|---|---|
| `tokens.md` | Color styles, text styles, signature treatments, breakpoints — create these in Framer first |
| `components/PaperBackground.tsx` | The lined-paper world (rules, margin line, binder holes) as one background layer |
| `components/ScrollFoldCrane.tsx` | The "One sheet. Five folds." scroll experience, 1:1 port |
| `preview.html` | Open in a browser — renders the actual .tsx files so you can sanity-check a component before pasting it into Framer |

Live preview of this kit: https://wysdym-ai.github.io/wysdym-site-preview/port-kit/preview.html

## How to install a component in Framer

1. In the project, open **Assets → Code → Create code file**.
2. Name it exactly like the file (e.g. `ScrollFoldCrane`), replace the
   boilerplate with the full contents of the `.tsx`.
3. Save — the component appears in Assets; drag it onto the canvas.
4. `PaperBackground`: place on the page, position **Absolute**, pin all four
   sides, send to back. One per page.
5. `ScrollFoldCrane`: drop into the Home page flow (below "One sheet. Five
   folds." intro), width **Fill**, height **Auto**. Set the CTA link to the
   Platform page in the properties panel. Cards/copy are editable as props.
6. On the canvas it shows the resting state; the animation runs in
   **Preview** and on the published site.

## Build order (agreed plan)

1. Styles from `tokens.md` (colors + text styles + the fonts: Inter, Caveat,
   Instrument Serif — all in Framer's font picker).
2. `PaperBackground` on a master/template page.
3. Nav + folding footer (footer component coming in the kit).
4. Static pages: Home (problem section, FAQ), Platform, Stand-for, Apply,
   Contact, Privacy, Press. Copy lives in the mockup HTML — treat it as final.
5. Interactive components as they land in `components/`:
   ScrollFoldCrane ✓ · FoldTheLesson · AcronymGame · ReadRunWriteLearn
   accordion · FoldingFooter · PushpinLightbox · the ORIGAMI-EXTRA modules
   (dog-ear nav, fold-to-send, senbazuru, pen underlines).
6. Blog via Framer CMS (keep existing `wysdym.ai/blog/...` slugs).
7. SEO pass at cutover: site-wide harness meta description (replaces the stale
   Conversation-Agent copy), FAQPage JSON-LD on Home, OG images, 404 page
   (Framer's built-in 404 slug ← port of `wysdym-404-lined.html`), remove
   noindex, then point wysdym.ai at this project. Keep "NEW wysdym" archived
   as rollback.

## Conventions

- Component CSS is self-contained (injected `<style>`, `wsf-`/`wpb-` class
  prefixes, local CSS variables) — components don't depend on Framer styles,
  so they render identically anywhere.
- Every component respects `prefers-reduced-motion`.
- Brand rules apply to all copy props: lowercase "wysdym", harness
  positioning, no fabricated metrics.
