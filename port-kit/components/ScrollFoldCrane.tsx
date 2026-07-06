// wysdym port kit · ScrollFoldCrane
// The "One sheet. Five folds." scroll experience from wysdym-home-lined-v2.html,
// ported 1:1 as a Framer code component.
//
// A sheet with the crane's crease pattern sits on the page; as the visitor
// scrolls, five folds rise out of the paper and land as facets of the crane.
// Component cards pin in around it; the CTA fades in after the Operator card.
//
// Usage in Framer: add as a code component, drop into the Home page flow,
// set width Fill and height Auto. The internal scroll length is `heightVh`.
// `ctaOffset` drops the Explore button below the card bottoms (default 110px,
// matching the HTML mockup). Tip: pull the NEXT page section up with a
// negative top margin (~ -(100vh - 720px)) so it follows the button closely.
// On the Framer canvas it renders the starting state (sheet + crease pattern);
// the fold plays in Preview / on the published site.

import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

const DEFAULT_CARDS = [
    { tag: "fold 01 · knowledge", title: "wysdymGraph", body: "A typed knowledge graph of your business — 39 GTM domains, self-learning." },
    { tag: "fold 02 · capabilities", title: "wysdymSkills", body: "An open skill library any agent invokes over MCP — your playbook, executable." },
    { tag: "fold 03 · integrations", title: "wysdymConnect", body: "Salesforce, HubSpot, Gong, Slack, Drive, Notion — wired once, not per agent." },
    { tag: "fold 04 · governance", title: "wysdymGateway", body: "One governed door: per-agent permissions, human-in-the-loop, receipts." },
    { tag: "fold 05 · telemetry", title: "wysdymObserve", body: "Outcome attribution to deal stages. Findings flag drift with the fix attached." },
    { tag: "★ five folds later — the crane", title: "Operator", body: "Every fold you just made is part of the crane. That's the platform: assembled, it flies." },
]

const LABELS = [
    "wysdym starts with a blank sheet of paper",
    "fold 01 · knowledge",
    "fold 02 · capabilities",
    "fold 03 · integrations",
    "fold 04 · governance",
    "fold 05 · telemetry",
    "Operator — assembled, it flies",
]

const CSS = `
.wsf-root{--magenta:#BA6296;--magenta-deep:#8d4874;--ink:#1f2233;--pencil:#3a3f55;--paper:#fdfcf8;--paper-2:#f5f3ea;
  --red-pen:#d2553f;--gold:#c9992e;--gold-bg:#f7edd2;--green:#5a8f63;
  font-family:'Inter',sans-serif;color:var(--ink);width:100%;}
.wsf-root *{box-sizing:border-box;margin:0;padding:0;}
.wsf-scrolly{position:relative;z-index:1;}
.wsf-stage{position:sticky;top:0;height:100vh;height:100svh;display:flex;align-items:flex-start;overflow:hidden;}
.wsf-flex{width:100%;max-width:1100px;margin:0 auto;padding:84px 28px 0;
  display:grid;grid-template-columns:minmax(230px,260px) 1fr minmax(230px,260px);gap:20px;align-items:center;}
.wsf-sideL,.wsf-sideR{display:flex;flex-direction:column;gap:18px;}
.wsf-center{display:flex;flex-direction:column;align-items:center;min-width:0;}
.wsf-label{font-family:'Caveat',cursive;font-size:27px;color:var(--red-pen);transform:rotate(-2deg);min-height:38px;transition:opacity .25s;text-align:center;font-weight:600;}
.wsf-svg{width:min(400px,100%);height:auto;display:block;overflow:visible;}
.wsf-flag{margin-top:4px;display:inline-flex;align-items:center;gap:7px;font-family:'Caveat',cursive;font-size:22px;color:var(--green);
  opacity:0;transform:translateY(6px);transition:opacity .4s,transform .4s;font-weight:600;}
.wsf-flag .wsf-dot{width:9px;height:9px;border-radius:50%;background:var(--green);box-shadow:0 0 0 0 rgba(90,143,99,.6);animation:wsfpl 2s infinite;}
.wsf-flag.on{opacity:1;transform:none;}
@keyframes wsfpl{0%{box-shadow:0 0 0 0 rgba(90,143,99,.5);}70%{box-shadow:0 0 0 8px rgba(90,143,99,0);}100%{box-shadow:0 0 0 0 rgba(90,143,99,0);}}
.wsf-hint{margin-top:8px;font-family:'Caveat',cursive;font-size:20px;color:var(--pencil);white-space:nowrap;transition:opacity .3s;}
.wsf-cta{margin-top:0;opacity:0;transform:translateY(10px);pointer-events:none;
  transition:opacity .45s .15s,transform .5s .15s cubic-bezier(.2,.8,.3,1);}
.wsf-cta.on{opacity:1;transform:none;pointer-events:auto;}
.wsf-cta a{font-size:15px;font-weight:700;border:2px solid var(--ink);border-radius:2px;padding:12px 22px;cursor:pointer;
  text-decoration:none;box-shadow:4px 5px 0 var(--ink);transition:transform .12s,box-shadow .12s;display:inline-block;
  background:var(--magenta-deep);color:#fff;font-family:'Inter',sans-serif;}
.wsf-cta a:hover{transform:translate(-2px,-2px);box-shadow:6px 7px 0 var(--ink);}
.wsf-pc{position:relative;background:var(--paper-2);border:1.5px solid rgba(58,63,85,.45);border-radius:2px;
  padding:13px 16px 12px;box-shadow:3px 4px 0 rgba(58,63,85,.16);
  opacity:0;transform:rotate(var(--r,0deg)) translateY(20px) scale(.96);
  transition:opacity .5s ease,transform .6s cubic-bezier(.2,.8,.2,1),border-color .3s,box-shadow .3s;}
.wsf-pc.on{opacity:1;transform:rotate(var(--r,0deg));}
.wsf-pc.active{border-color:var(--magenta-deep);box-shadow:4px 6px 0 rgba(141,72,116,.28);}
.wsf-pc::after{content:'';position:absolute;top:0;right:0;border-width:0 15px 15px 0;border-style:solid;
  border-color:transparent var(--paper) transparent transparent;filter:drop-shadow(-1px 1px 1px rgba(0,0,0,.12));}
.wsf-pc .wsf-tag{font-family:'Caveat',cursive;font-size:17px;color:var(--red-pen);line-height:1.2;font-weight:600;}
.wsf-pc h3{font-size:16.5px;font-weight:800;letter-spacing:-.01em;margin:2px 0 4px;font-family:'Inter',sans-serif;}
.wsf-pc p{font-size:12.5px;color:var(--pencil);line-height:1.45;}
.wsf-pc.gold{background:linear-gradient(180deg,#fffaf0,var(--gold-bg));border-color:var(--gold);}
.wsf-pc.gold.active{border-color:#a87f1d;box-shadow:4px 6px 0 rgba(169,127,29,.3);}
.wsf-pc.gold .wsf-tag{color:var(--gold);} .wsf-pc.gold h3{color:#8a6a12;}
@media(min-width:901px){
  .wsf-sideL .wsf-pc::before,.wsf-sideR .wsf-pc::before{content:'';position:absolute;top:50%;width:24px;
    border-top:2px dashed rgba(141,72,116,0);transition:border-color .5s .2s;}
  .wsf-sideL .wsf-pc::before{right:-26px;transform:rotate(4deg);}
  .wsf-sideR .wsf-pc::before{left:-26px;transform:rotate(-4deg);}
  .wsf-sideL .wsf-pc.on::before,.wsf-sideR .wsf-pc.on::before{border-top-color:rgba(141,72,116,.5);}
}
@media(max-width:900px){
  .wsf-flex{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:70px 18px 0;align-content:center;}
  .wsf-center{grid-column:1/-1;order:0;}
  .wsf-sideL,.wsf-sideR{display:contents;}
  .wsf-pc{order:var(--o,10);--r:0deg;padding:10px 12px 9px;}
  .wsf-pc .wsf-tag{font-size:14.5px;}
  .wsf-pc h3{font-size:14px;margin:1px 0 2px;}
  .wsf-pc p{font-size:10.5px;line-height:1.4;}
  .wsf-svg{width:min(230px,56vw);}
  .wsf-label{font-size:22px;min-height:30px;}
  .wsf-hint{display:none;}
  .wsf-flag{font-size:18px;margin-top:0;}
}
@media(prefers-reduced-motion:reduce){
  .wsf-scrolly{height:auto !important;}
  .wsf-stage{position:static;height:auto;display:block;}
  .wsf-pc{opacity:1;transform:rotate(var(--r,0deg));}
}
`

// per-card rotation + mobile order (cards 1,3,5 left · 2,4,6 right)
const CARD_STYLE: any[] = [
    { "--r": "-1.2deg", "--o": 1 },
    { "--r": "1.1deg", "--o": 2 },
    { "--r": ".9deg", "--o": 3 },
    { "--r": "-1deg", "--o": 4 },
    { "--r": "-.8deg", "--o": 5 },
    { "--r": "1.2deg", "--o": 6 },
]

function useFonts() {
    React.useEffect(() => {
        if (document.getElementById("wsf-fonts")) return
        const l = document.createElement("link")
        l.id = "wsf-fonts"
        l.rel = "stylesheet"
        l.href =
            "https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&family=Caveat:wght@600;700&display=swap"
        document.head.appendChild(l)
    }, [])
}

/**
 * @framerSupportedLayoutWidth fullwidth
 * @framerSupportedLayoutHeight auto
 */
export default function ScrollFoldCrane(props: any) {
    const {
        heightVh = 640,
        ctaOffset = 110,
        ctaText = "Explore the full platform →",
        ctaLink = "/platform",
        hintText = "keep scrolling — every fold lands a piece of the crane",
        flagText = "Operator · assembled from five folds",
        cards = DEFAULT_CARDS,
    } = props
    const rootRef = React.useRef<HTMLDivElement>(null)
    useFonts()

    const six = [...cards]
    while (six.length < 6) six.push(DEFAULT_CARDS[six.length])

    React.useEffect(() => {
        const root = rootRef.current
        if (!root) return
        const reduce = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
        const NS = "http://www.w3.org/2000/svg"
        const svg = root.querySelector(".wsf-svg") as SVGSVGElement
        const clamp = (v: number, a: number, b: number) =>
            Math.min(b, Math.max(a, v))
        const lerp = (a: number, b: number, t: number) => a + (b - a) * t
        const easeInOut = (t: number) =>
            t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2

        /* ONE-PAPER ENGINE — identical to the HTML mockup.
           The sheet carries the crane's crease pattern; each fold's flat start
           lies INSIDE the sheet (crease chosen so the mirror stays on-paper),
           so folds visibly rise out of the paper and land as crane facets. */
        const FACETS: any[] = [
            { pts: [[96, 34], [128, 147], [104, 167]], L: 54, crease: [[96, 34], [128, 147]] },
            { pts: [[98, 32], [154, 127], [131, 146]], L: 60, crease: [[98, 32], [154, 127]] },
            { pts: [[168, 61], [155, 123], [138, 94]], L: 50, crease: [[168, 61], [155, 123]] },
            { pts: [[171, 59], [190, 71], [168, 73]], L: 62, crease: [[171, 59], [190, 71]] },
            { pts: [[100, 154], [101, 169], [10, 161]], L: 56, crease: [[100, 154], [101, 169]] },
        ]
        FACETS.forEach((f) => {
            const p1 = f.crease[0], p2 = f.crease[1]
            let ux = p2[0] - p1[0], uy = p2[1] - p1[1]
            const n = Math.hypot(ux, uy)
            ux /= n; uy /= n
            f.dec = f.pts.map((pt: number[]) => {
                const tt = (pt[0] - p1[0]) * ux + (pt[1] - p1[1]) * uy
                const qx = p1[0] + tt * ux, qy = p1[1] + tt * uy
                return { q: [qx, qy], r: [pt[0] - qx, pt[1] - qy] }
            })
        })
        const SEGS = 7

        const world = document.createElementNS(NS, "g")
        svg.appendChild(world)
        const W = (tag: string) => {
            const e = document.createElementNS(NS, tag)
            world.appendChild(e)
            return e
        }
        const pointsAttr = (pts: number[][]) =>
            pts.map((p) => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ")
        const paperFill = (depth: number, shade?: number) => {
            const L = 91 - depth * 2.2 - (shade || 0), S = 18 + depth * 4
            return `hsl(322 ${S.toFixed(0)}% ${clamp(L, 42, 96).toFixed(0)}%)`
        }

        const sqShadow = W("polygon")
        const sq = W("polygon")
        const SQ = [[8, 22], [204, 22], [204, 182], [8, 182]]
        sq.setAttribute("points", pointsAttr(SQ))
        sq.setAttribute("stroke", "rgba(94,44,75,.4)")
        sq.setAttribute("stroke-width", "1")
        sqShadow.setAttribute("points", pointsAttr(SQ.map((p) => [p[0] + 4, p[1] + 7])))
        sqShadow.setAttribute("fill", "rgba(94,44,75,.12)")
        const creases = FACETS.map((f) => {
            const ln = W("line")
            ln.setAttribute("x1", f.crease[0][0]); ln.setAttribute("y1", f.crease[0][1])
            ln.setAttribute("x2", f.crease[1][0]); ln.setAttribute("y2", f.crease[1][1])
            ln.setAttribute("stroke", "rgba(94,44,75,.55)"); ln.setAttribute("stroke-width", "1.1")
            ln.setAttribute("stroke-dasharray", "4 5")
            return ln
        })
        const ghosts = FACETS.map((f) => {
            const g = W("polygon")
            g.setAttribute("points", pointsAttr(f.pts))
            g.setAttribute("fill", "rgba(94,44,75,.04)")
            g.setAttribute("stroke", "rgba(94,44,75,.45)")
            g.setAttribute("stroke-width", "1"); g.setAttribute("stroke-dasharray", "4 5")
            g.setAttribute("opacity", "0")
            return g
        })
        const landedG = W("g")
        const landed = FACETS.map((f) => {
            const pg = document.createElementNS(NS, "polygon")
            pg.setAttribute("points", pointsAttr(f.pts))
            pg.setAttribute("fill", `hsl(322 39% ${f.L}%)`)
            pg.setAttribute("stroke", "rgba(94,44,75,.35)"); pg.setAttribute("stroke-width", ".7")
            pg.setAttribute("opacity", "0")
            landedG.appendChild(pg)
            return pg
        })
        const flapShadow = W("polygon")
        const flap = W("polygon")
        flap.setAttribute("stroke", "rgba(94,44,75,.55)")
        flap.setAttribute("stroke-width", "1")
        flap.setAttribute("stroke-linejoin", "round")

        function camera(depth: number, bob?: number) {
            const z = clamp(depth / 5, 0, 1)
            const s = 1 + 0.22 * easeInOut(z)
            world.setAttribute(
                "transform",
                `translate(${(130 - 105 * s + 28).toFixed(1)} ${(115 - 102 * s + 4 + (bob || 0)).toFixed(1)}) scale(${s.toFixed(3)})`
            )
        }

        function render(seg: number) {
            seg = clamp(seg, 0, SEGS)
            const beat = clamp(Math.floor(seg), 0, 6)
            const local = seg - beat
            const k = beat
            const tf = k === 0 ? 0 : easeInOut(clamp((local - 0.12) / 0.72, 0, 1))
            const depthDone = k === 0 ? 0 : k - 1 + tf

            if (beat >= 6) {
                const t6 = clamp(local, 0, 1)
                camera(5, -4 * Math.sin(t6 * Math.PI * 1.2))
                sq.setAttribute("opacity", "0"); sqShadow.setAttribute("opacity", "0")
                creases.forEach((c) => c.setAttribute("opacity", "0"))
                ghosts.forEach((g) => g.setAttribute("opacity", "0"))
                flap.setAttribute("opacity", "0"); flapShadow.setAttribute("opacity", "0")
                landed.forEach((pg) => pg.setAttribute("opacity", "1"))
                landedG.setAttribute(
                    "filter",
                    `drop-shadow(${4 + 3 * t6}px ${8 + 5 * t6}px ${9 + 5 * t6}px rgba(94,44,75,.28))`
                )
                return
            }
            landedG.setAttribute("filter", "drop-shadow(3px 6px 7px rgba(94,44,75,.2))")
            camera(depthDone, 0)

            /* the sheet stays on the table, fading a fifth per fold */
            const sqOp = k === 0 ? 1 : clamp(1 - depthDone * 0.21, 0, 1)
            sq.setAttribute("fill", paperFill(0))
            sq.setAttribute("opacity", sqOp.toFixed(2))
            sqShadow.setAttribute("opacity", (sqOp * 0.9).toFixed(2))
            creases.forEach((c, i) => {
                const op = (i + 1 >= k ? 0.65 : 0) * sqOp
                c.setAttribute("opacity", op.toFixed(2))
            })
            /* dashed crane pattern printed on the sheet — each target
               visible until its piece lands */
            ghosts.forEach((g, i) => {
                const idx = i + 1
                g.setAttribute("opacity", idx >= k ? "0.55" : "0")
            })
            landed.forEach((pg, i) => {
                pg.setAttribute("opacity", i + 1 < k || (i + 1 === k && tf >= 1) ? "1" : "0")
            })

            if (k >= 1 && tf < 1) {
                const f = FACETS[k - 1]
                const intro = clamp(local / 0.1, 0, 1)
                const theta = Math.PI * (1 - tf)
                const cosT = Math.cos(theta), sinT = Math.sin(theta)
                const pts = f.dec.map((d: any) => [
                    d.q[0] + cosT * d.r[0],
                    d.q[1] + cosT * d.r[1],
                ])
                flap.setAttribute("points", pointsAttr(pts))
                flap.setAttribute(
                    "fill",
                    cosT < 0
                        ? paperFill(depthDone, sinT * 8)
                        : `hsl(322 ${lerp(24, 39, cosT).toFixed(0)}% ${lerp(80, f.L, cosT).toFixed(0)}%)`
                )
                flap.setAttribute("opacity", (k === 1 ? Math.max(intro, sqOp) : intro).toFixed(2))
                const sh = pts.map((p: number[]) => [p[0] + 6 * sinT, p[1] + 10 * sinT])
                flapShadow.setAttribute("points", pointsAttr(sh))
                flapShadow.setAttribute("fill", `rgba(31,34,51,${(0.16 * sinT).toFixed(3)})`)
                flapShadow.setAttribute("opacity", intro.toFixed(2))
            } else {
                flap.setAttribute("opacity", "0")
                flapShadow.setAttribute("opacity", "0")
            }
        }

        const cardEls = Array.from(root.querySelectorAll(".wsf-pc")) as HTMLElement[]
        const byIdx = (n: number) =>
            cardEls.find((c) => c.dataset.i === String(n)) as HTMLElement
        const orderedCards = [1, 2, 3, 4, 5, 6].map(byIdx)
        const label = root.querySelector(".wsf-label") as HTMLElement
        const liveFlag = root.querySelector(".wsf-flag") as HTMLElement
        const stageHint = root.querySelector(".wsf-hint") as HTMLElement
        const cta = root.querySelector(".wsf-cta") as HTMLElement
        let activeIdx = -1
        function setBeat(idx: number) {
            if (idx === activeIdx) return
            activeIdx = idx
            label.textContent = LABELS[idx]
            liveFlag.classList.toggle("on", idx === SEGS - 1)
            stageHint.style.opacity = idx === SEGS - 1 ? "0" : "1"
            orderedCards.forEach((c, i) => c.classList.toggle("active", i + 1 === idx))
        }
        function setCards(seg: number) {
            orderedCards.forEach((c, i) => {
                const k = i + 1
                const revealAt = k <= 5 ? k + 0.72 : 6.3
                c.classList.toggle("on", seg >= revealAt)
            })
            cta.classList.toggle("on", seg >= 6.52)
        }
        if (reduce) {
            render(SEGS)
            setBeat(SEGS - 1)
            orderedCards.forEach((c) => c.classList.add("on"))
            cta.classList.add("on")
            return () => { svg.innerHTML = "" }
        }
        const scrolly = root.querySelector(".wsf-scrolly") as HTMLElement
        let ticking = false
        function onScroll() {
            if (ticking) return
            ticking = true
            requestAnimationFrame(() => {
                ticking = false
                const r = scrolly.getBoundingClientRect()
                const total = scrolly.offsetHeight - window.innerHeight
                const p = clamp(-r.top / Math.max(1, total), 0, 1)
                const seg = p * SEGS
                render(seg)
                setCards(seg)
                setBeat(clamp(Math.floor(seg + 0.25), 0, SEGS - 1))
            })
        }
        window.addEventListener("scroll", onScroll, { passive: true })
        window.addEventListener("resize", onScroll)
        render(0); setBeat(0); setCards(0)
        onScroll()
        return () => {
            window.removeEventListener("scroll", onScroll)
            window.removeEventListener("resize", onScroll)
            svg.innerHTML = ""
        }
    }, [])

    const card = (i: number) => (
        <div
            className={"wsf-pc" + (i === 5 ? " gold" : "")}
            data-i={i + 1}
            key={i}
            style={CARD_STYLE[i] as any}
        >
            <div className="wsf-tag">{six[i].tag}</div>
            <h3>{six[i].title}</h3>
            <p>{six[i].body}</p>
        </div>
    )

    return (
        <div ref={rootRef} className="wsf-root">
            <style>{CSS}</style>
            <section className="wsf-scrolly" style={{ height: `${heightVh}vh` }}>
                <div className="wsf-stage">
                    <div className="wsf-flex">
                        <div className="wsf-sideL">{[0, 2, 4].map(card)}</div>
                        <div className="wsf-center">
                            <div className="wsf-label">{LABELS[0]}</div>
                            <svg
                                className="wsf-svg"
                                viewBox="0 0 260 230"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-label="A sheet of paper whose five folds assemble the wysdym crane"
                            />
                            <div className="wsf-flag">
                                <span className="wsf-dot" />
                                {flagText}
                            </div>
                            <div
                                className="wsf-cta"
                                style={{ marginTop: ctaOffset }}
                            >
                                <a href={ctaLink}>{ctaText}</a>
                            </div>
                            <div className="wsf-hint">{hintText}</div>
                        </div>
                        <div className="wsf-sideR">{[1, 3, 5].map(card)}</div>
                    </div>
                </div>
            </section>
        </div>
    )
}

addPropertyControls(ScrollFoldCrane, {
    heightVh: {
        type: ControlType.Number,
        title: "Scroll length",
        defaultValue: 640,
        min: 300,
        max: 1000,
        step: 20,
        unit: "vh",
    },
    ctaOffset: {
        type: ControlType.Number,
        title: "CTA drop",
        defaultValue: 110,
        min: 0,
        max: 240,
        step: 2,
        unit: "px",
    },
    ctaText: {
        type: ControlType.String,
        title: "CTA text",
        defaultValue: "Explore the full platform →",
    },
    ctaLink: {
        type: ControlType.Link,
        title: "CTA link",
    },
    hintText: {
        type: ControlType.String,
        title: "Hint",
        defaultValue: "keep scrolling — every fold lands a piece of the crane",
    },
    flagText: {
        type: ControlType.String,
        title: "Flag",
        defaultValue: "Operator · assembled from five folds",
    },
    cards: {
        type: ControlType.Array,
        title: "Cards",
        maxCount: 6,
        control: {
            type: ControlType.Object,
            controls: {
                tag: { type: ControlType.String, defaultValue: "fold 0X · …" },
                title: { type: ControlType.String, defaultValue: "wysdym…" },
                body: {
                    type: ControlType.String,
                    displayTextArea: true,
                    defaultValue: "",
                },
            },
        },
        defaultValue: DEFAULT_CARDS,
    },
})
