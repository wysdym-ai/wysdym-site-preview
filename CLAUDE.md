# wysdym-site-preview — working context

Static HTML mockups for the new wysdym.ai, served by **GitHub Pages** at
`https://wysdym-ai.github.io/wysdym-site-preview/`. Pages builds automatically on
every push to `main` (legacy builder, `.nojekyll` present). If a deploy seems stuck
\>10 min, re-trigger: `gh api -X POST repos/wysdym-ai/wysdym-site-preview/pages/builds`.
The builder occasionally reports `errored` spuriously — one retry has always fixed it.

## The FINAL mockup set (Direction E · "Lined Paper") — edit these

| Page | File |
|---|---|
| Home | `wysdym-home-lined-v2.html` |
| Platform (canonical = v3) | `wysdym-platform-lined-v3.html` |
| What we stand for | `wysdym-stand-for-lined.html` |
| Apply for access | `wysdym-design-partner-lined.html` |
| Blog | `wysdym-blog-lined.html` |
| Blog post mockup | `wysdym-blog-post-lined.html` |
| Contact | `wysdym-contact-lined.html` |
| Privacy | `wysdym-privacy-lined.html` |
| Press & media kit | `wysdym-press-lined.html` |
| 404 | `wysdym-404-lined.html` (also copied to root `404.html` so Pages serves it) |
| Team review hub | `wysdym-lined-review.html` |

**Archived / reference only — do not evolve:** `wysdym-platform-lined-v2.html` (lost the
v2-vs-v3 vote), `wysdym-scrollfold-concept.html` (v1, end-swap version),
`wysdym-home-lined.html` / `wysdym-platform-lined.html` (E v1), everything `-paper.html`
(yellow-pad direction), `-origami/-kraft/-desk` (rejected directions), `wysdym-v3-origami.html`
+ `wysdym-platform.html` + `wysdym-stand-for.html` + `index.html` (the current dark site,
kept for comparison), `paper-index.html` (all-directions gallery).

## Design system (Direction E)

- Background: white lined paper — `repeating-linear-gradient(180deg, transparent 0 31px, rgba(126,162,204,.42) 31px 32px)`
  + red margin line fixed at `left:96px` + three punched binder holes fixed on the left edge.
- Palette: `--magenta:#BA6296 --magenta-deep:#8d4874 --ink:#1f2233 --pencil/--grey --paper:#fdfcf8 --red-pen:#d2553f --gold:#c9992e`.
- Type: Inter (body/headings), **Caveat** (handwritten accents, nav links, labels),
  Instrument Serif italic (emphasis, magenta). Handwritten eyebrows ~24-26px.
- Logo lockup (all headers): `origami-crane-wysdym.png` at 60px + `wysdym-wordmark-magenta.svg` at 34px height.
- Nav: handwritten links; active section gets the magenta highlighter swipe (`a.current::after`);
  home has a scroll-spy that toggles `.current` on "The problem" while its section is in view.
- Apply button (nav): **magenta paper scrap, white Caveat text, silver paperclip** (pseudo-elements).
- Real product screenshots live in `assets/` (01–05 GIFs animate; 06 Copilot=Operator, 07 Plays are PNG).
  Captions must NOT say "live". Photo-corner mounts + click-to-enlarge lightbox whose close button is a **push-pin**.

## Signature interactions (all vanilla JS, in-file)

- **Home · scroll-fold** (`#scrolly`/`#asmSvg`): sticky 640vh scrub; five folds each land one facet
  of the crane logo (wings/body/head/tail), pinning component cards; ends with Operator assembled. No end-swap.
- **Home · fold-the-lesson** (`#foldStage`): tap-to-fold lesson deck — six colored sheets, each pairs
  an origami rule with a harness rule; counter `#foldCount`.
- **Home · envelope** (`#envelope`): opens to fan out real screenshots; paper lightbox.
- **Platform v3 · accordion** (`#flow`): Read→Run→Write→Learn as one connected strip,
  accordion-unfolds on a 6.2s loop, pen-drawn arrows across the fold seams.
- **Stand-for · acronym game**: write-your-own + submit (easter egg on the real answer:
  "When Your Stack Doesn't, You Multiply" — never confirm it in copy).

## Copy & brand rules (non-negotiable)

- wysdym is **the harness / "the platform every GTM agent runs on"** — never "an AI agent platform",
  never "chatbot", never "Conversation Agent" (retired product ≠ Operator).
- "knowledge-powered" not "AI-powered"; "AI-native" not "AI-enabled". Lowercase "wysdym" in prose.
- Pre-revenue: **no fabricated metrics/testimonials**. Gartner 40%-by-2027 stat is linked to the
  Gartner press release. Apply page = selective onboarding / demand-ahead-of-us framing;
  the "10 design partners" concept is dead.
- All mockup pages carry `<meta name="robots" content="noindex, nofollow">` — keep it.

## Workflow

Edit file → commit to `main` → push → Pages deploys (~1–3 min) → verify with curl for a marker
string on the live URL. Keep commits small and messages descriptive; Rob shares live URLs with
his team, so never push a page in a visibly broken state.

**Source-of-truth note:** this repo is canonical. There is a mirror copy on Rob's Mac at
`~/Library/CloudStorage/GoogleDrive-rob@wysdym.ai/My Drive/wysdym/~ClaudeOS - Rob/Projects/GTM/Website/origami-site/`
— if you're a cloud session, just work in the repo; the desktop session will sync the Drive
mirror from the repo later.

## Open items (agreed with Rob, not yet done)

1. Real mobile pass (scroll-fold, accordion, envelope are desktop-tuned).
2. Convert screenshot GIFs to MP4/WebM loops (~2.4MB → ~300KB); re-capture Plays + Operator as loops.
3. Mark archived pages as such on the review hub; replace the v2-vs-v3 face-off with "the final set".
4. Proper footer: Privacy, Terms, LinkedIn, contact, Resources links (paper-styled).
5. Decide if "The problem" becomes its own URL (currently a home anchor).
6. Framer build spec: FAQPage JSON-LD on home, component structured data, paper-styled OG images.
7. Accessibility: darken handwritten nav a touch (AA), reduced-motion fallbacks for accordion +
   lesson deck, focus states on interactive toys.
8. **REMINDER for Rob — live-site SEO bug:** every wysdym.ai page's meta description still
   carries the retired Conversation-Agent copy ("automate early discovery conversations through
   text or voice…"). Fix in Framer site settings + per-page/CMS overrides, republish, verify.
9. Framer port kit: tileable background SVGs, paper-prop assets, React code components
   (order: tokens → static pages → accordion/envelope → scroll-fold → lesson deck/acronym game).

## Origami extras (each removable independently)

Six opt-in flourishes shipped 2026-07-06, every one wrapped in marker comments —
`<!-- ORIGAMI-EXTRA:<name> BEGIN/END -->` in HTML and `/* ORIGAMI-EXTRA:<name> BEGIN/END */`
in CSS/JS. To remove one: `grep -n "ORIGAMI-EXTRA:<name>" *.html` and delete every
marked block. Names & where they live:

| name | what | pages |
|---|---|---|
| `fold-to-send` | contact postcard folds into a paper plane on send (removal note: restore the one-liner `sendBtn -> sendOk.classList.add('show')` recorded in the JS marker) | contact |
| `page-404` | torn-out-page 404 (`wysdym-404-lined.html`, also root `404.html`; linked as 'The torn-out page' in every footer meta row) | own file + footers |
| `dogear-nav` | REMOVED 2026-07-06 per Rob (didn't make the cut) | — |
| `senbazuru` | thousand-crane counter easter egg (date-seeded, `77 + 1/day` from 2026-06-24 → #89 on 2026-07-06, caps at 999) | stand-for |
| `pen-underlines` | REMOVED 2026-07-06 per Rob (didn't make the cut) | — |
| `footer-auto-unfold` | folding footer opens itself on scroll-into-view (click still toggles) | all 10 pages |

## Removable feature modules (ORIGAMI-EXTRA)

Every "extra" origami feature is wrapped in paired markers so it can be deleted
cleanly — CSS blocks use `/* ORIGAMI-EXTRA:<name> BEGIN|END */`, markup/JS use
`<!-- ORIGAMI-EXTRA:<name> BEGIN|END -->`. To remove a feature, delete every
marked block with that name across the pages (grep the name), nothing else
references them.

| Module | Where | What it does |
|---|---|---|
| `pen-underlines` | all pages | hand-drawn underline wipes in on nav/footer link hover |
| `dogear-nav` | home, platform, stand-for, blog, apply | fixed folded corner bottom-right; hover lifts + tooltip; click turns to the next page in the cycle |
| `footer-auto-unfold` | all pages | footer unfolds on scroll-into-view (manual toggle still works) |
| `fold-to-send` | contact | postcard folds up and flies off as a paper plane on send |
| `senbazuru` | stand-for (end) | "crane #N of 1,000" flock counter — N is a playful fiction (287 + 3/day from 2026-06-24), NOT a real metric; swap for a real number before anyone cites it |
| `page-404` | wysdym-404-lined.html + root 404.html | "this page got torn out" page for the live-site launch |
