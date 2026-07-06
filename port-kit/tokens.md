# wysdym paper site · design tokens

Create these as **Color styles** and **Text styles** in the Framer project
(Assets panel → Styles) before laying out pages. Names below are the names to
use in Framer so components and canvas agree.

## Color styles

| Framer style name | Value | Used for |
|---|---|---|
| `paper` | `#FDFCF8` | page background |
| `paper-2` | `#F5F3EA` | cards, pads, buttons (ghost) |
| `ink` | `#1F2233` | headings, body emphasis, button borders/shadows |
| `pencil` | `#3A3F55` | body copy, secondary text |
| `magenta` | `#BA6296` | brand accents, highlighter swipes (at 35% opacity) |
| `magenta-deep` | `#8D4874` | primary buttons, links, serif accents |
| `red-pen` | `#D2553F` | handwritten eyebrows, annotations |
| `gold` | `#C9992E` | Operator/star accents |
| `green` | `#5A8F63` | "live" flags, success states |
| `rule-blue` | `rgba(126,162,204,0.42)` | the ruled lines (via PaperBackground) |
| `margin-red` | `rgba(224,90,90,0.5)` | the margin line (via PaperBackground) |

## Fonts (all in Framer's built-in Google Fonts picker)

- **Inter** — body + headings (400 / 700 / 800)
- **Caveat** — all handwriting (600 / 700)
- **Instrument Serif** *(italic)* — serif accents in headlines

## Text styles

| Framer style name | Font | Size / line height | Notes |
|---|---|---|---|
| `H1` | Inter 800 | clamp 38–72px / 1.03 | letter-spacing −0.03em |
| `H1 accent` | Instrument Serif italic | inherits H1 size | color `magenta-deep` |
| `H2` | Inter 800 | clamp 28–44px / 1.1 | letter-spacing −0.02em |
| `Lead` | Inter 400 | 18px / 1.6 | color `pencil`, max-width 600 |
| `Body` | Inter 400 | 15–17px / 1.6–1.75 | color `pencil` |
| `Eyebrow` | Caveat 600 | 24px | color `red-pen`, rotate −2° |
| `Hand note` | Caveat 600 | 20–22px | color `pencil` |
| `Nav link` | Caveat 600 | 21px | color `pencil`, hover `magenta-deep` |
| `Card title` | Inter 800 | 16.5–21px / 1.25 | |
| `Small print` | Inter 400 | 12.5–13px | color `pencil` |

## Signature treatments (recreate as components/styles)

- **Highlighter swipe** (current nav item, headline emphasis): a `magenta`
  rectangle at 35% opacity, skewX −10°, border-radius 40%, behind the text.
- **Underline-hand** (headline emphasis): same as highlighter but 11px tall,
  bottom-aligned.
- **Paper card**: white→`paper-2` vertical gradient, 1.5px `rgba(58,63,85,.35)`
  border, 2–3px radius, drop shadow `0 12px 28px -12px rgba(31,34,51,.3)`,
  rotate −1° to 1° per instance.
- **Sticky note (gold)**: `#FFFAF0→#F7EDD2` gradient, `gold` border.
- **Tape strip**: `rgba(255,244,200,.65)` rectangle, rotate ±4°, 1px dashed
  side borders, small shadow.
- **Hard-shadow button (primary)**: `magenta-deep` fill, white Inter 700 text,
  2px `ink` border, shadow `4px 5px 0 ink`, hover translate(−2,−2) + bigger shadow.
- **Paper-scrap Apply button (nav)**: magenta→magenta-deep gradient, white
  Caveat 700, rotate −2°, silver paperclip (two rounded-border pseudo shapes).

## Breakpoints (Framer defaults are fine)

- Desktop 1200 · Tablet 810 · Phone 390
- The mockups' single breakpoint at 900px maps cleanly onto Framer's Tablet.
- Max content width: 1040px (pages), 1100px (scroll-fold stage).

## Layout constants

- Ruled-line pitch: **32px** (PaperBackground `lineGap`) — section spacing
  looks best in multiples of 32.
- Margin line at **96px** from the left; content starts right of it on desktop.
- Section vertical padding: 76–80px.
