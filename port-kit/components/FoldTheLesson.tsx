// wysdym port kit · FoldTheLesson
// The "Go on — fold the sheet" lesson deck: six sheets, six origami shapes —
// elephant, pinwheel, boat, house, star, crane — one per harness pillar.
// Tap the paper: the flat sheet folds into the shape and the lesson appears
// (an origami line + the matching harness line). Tap again for a fresh sheet.
//
// Usage in Framer: drop into the page flow, width Auto, height Auto.
// Headings/eyebrow live outside the component; this is the stage + counter
// + lesson tip, exactly as on the HTML mockup.

import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

const SHAPES: any[] = [
    { name: "an elephant", hue: 322, sat: 46,
      o: "An elephant — it never forgets a fold.",
      h: "wysdymGraph: memory that never forgets. Every agent draws from the same brain.",
      facets: [[[[88,74],[202,66],[212,148],[88,148]],56],
               [[[168,148],[194,148],[194,198],[168,198]],64],
               [[[98,148],[124,148],[124,198],[98,198]],64],
               [[[36,74],[96,56],[100,132],[54,128]],48],
               [[[38,76],[58,100],[46,178],[30,172]],60],
               [[[86,64],[128,58],[104,126]],38]] },
    { name: "a pinwheel", hue: 255, sat: 34,
      o: "A pinwheel — same paper, now it does work.",
      h: "wysdymSkills: fold a skill once, and every agent can run it.",
      facets: [[[[130,120],[130,30],[194,88]],58],[[[130,120],[220,120],[162,184]],46],
               [[[130,120],[130,210],[66,152]],58],[[[130,120],[40,120],[98,56]],46]] },
    { name: "a boat", hue: 40, sat: 58,
      o: "A boat — built to carry things across.",
      h: "wysdymConnect: your stack wired once, so everything travels together.",
      facets: [[[[40,150],[220,150],[180,192]],44],[[[40,150],[180,192],[80,192]],50],
               [[[128,42],[128,146],[60,146]],64],[[[136,62],[136,146],[196,146]],54]] },
    { name: "a house", hue: 205, sat: 42,
      o: "A house — one door, and everything inside is safe.",
      h: "wysdymGateway: every agent enters through one governed door.",
      facets: [[[[50,112],[130,42],[210,112]],46],[[[58,112],[130,112],[130,190],[58,190]],66],
               [[[130,112],[202,112],[202,190],[130,190]],56],[[[112,190],[112,142],[148,142],[148,190]],34]] },
    { name: "a star", hue: 12, sat: 52,
      o: "A star — something you can navigate by.",
      h: "wysdymObserve: outcomes become the north star. See what every agent was worth.",
      facets: [[[[109,96],[130,40],[151,96]],66],[[[151,96],[211,99],[164,136]],50],
               [[[164,136],[180,194],[130,161]],60],[[[130,161],[80,194],[96,136]],50],
               [[[96,136],[49,99],[109,96]],60],[[[109,96],[151,96],[164,136],[130,161],[96,136]],42]] },
    { name: "the crane", hue: 322, sat: 42,
      o: "And the crane — assembled, it flies.",
      h: "Operator: a working agent on day one, built from all five folds.",
      facets: [[[[96,34],[128,147],[104,167]],54],[[[98,32],[154,127],[131,146]],60],
               [[[168,61],[155,123],[138,94]],50],[[[171,59],[190,71],[168,73]],62],
               [[[100,154],[101,169],[10,161]],56]] },
]

const CSS = `
.wfl-root{--magenta-deep:#8d4874;--pencil:#3a3f55;font-family:'Inter',sans-serif;display:inline-block;max-width:100%;}
.wfl-root *{box-sizing:border-box;margin:0;padding:0;}
.wfl-count{font-family:'Caveat',cursive;font-size:19px;font-weight:600;color:var(--pencil);}
.wfl-stage{width:min(340px,78vw);margin-top:20px;cursor:pointer;outline:none;}
.wfl-stage svg{width:100%;height:auto;display:block;overflow:visible;filter:drop-shadow(5px 10px 12px rgba(94,44,75,.24));}
.wfl-stage .wfl-facet{stroke:rgba(94,44,75,.35);stroke-width:.8;stroke-linejoin:round;}
.wfl-tip{font-family:'Caveat',cursive;font-size:24px;font-weight:600;color:var(--magenta-deep);min-height:34px;margin-top:14px;max-width:520px;transition:opacity .2s;}
.wfl-tip .wfl-o{display:block;font-family:'Instrument Serif',serif;font-style:italic;font-size:19px;font-weight:400;color:var(--pencil);}
.wfl-tip .wfl-h{display:block;font-family:'Caveat',cursive;font-size:24px;color:var(--magenta-deep);margin-top:2px;}
`

function useFonts() {
    React.useEffect(() => {
        if (document.getElementById("wfl-fonts")) return
        const l = document.createElement("link")
        l.id = "wfl-fonts"
        l.rel = "stylesheet"
        l.href =
            "https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&family=Caveat:wght@600;700&family=Instrument+Serif:ital@0;1&display=swap"
        document.head.appendChild(l)
    }, [])
}

/**
 * @framerSupportedLayoutWidth auto
 * @framerSupportedLayoutHeight auto
 */
export default function FoldTheLesson(props: any) {
    const { showCounter = true } = props
    const rootRef = React.useRef<HTMLDivElement>(null)
    useFonts()

    React.useEffect(() => {
        const root = rootRef.current
        if (!root) return
        const reduce = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
        let lesson = 0
        const C = [130, 120], H = 92
        const flatPoint = (pt: number[]) => {
            const dx = pt[0] - C[0], dy = pt[1] - C[1]
            if (Math.hypot(dx, dy) < 26) return [C[0], C[1]]
            const s = H / Math.max(Math.abs(dx), Math.abs(dy))
            return [C[0] + dx * s, C[1] + dy * s]
        }
        const svg = root.querySelector("svg") as SVGSVGElement
        const NS = "http://www.w3.org/2000/svg"
        const sheet = document.createElementNS(NS, "polygon")
        sheet.setAttribute(
            "points",
            `${C[0] - H},${C[1] - H} ${C[0] + H},${C[1] - H} ${C[0] + H},${C[1] + H} ${C[0] - H},${C[1] + H}`
        )
        sheet.setAttribute("stroke", "rgba(94,44,75,.3)")
        sheet.setAttribute("stroke-width", "1.2")
        svg.appendChild(sheet)
        let polys: any[] = []
        function buildShape(i: number) {
            polys.forEach((pp) => pp.el.remove())
            polys = SHAPES[i].facets.map((f: any) => {
                const el = document.createElementNS(NS, "polygon")
                el.setAttribute("class", "wfl-facet")
                svg.appendChild(el)
                return { el, flat: f[0].map(flatPoint), fold: f[0], L: f[1] }
            })
        }
        const lerp = (a: number, b: number, tt: number) => a + (b - a) * tt
        function render(tt: number) {
            const S = SHAPES[lesson]
            const e = tt < 0.5 ? 2 * tt * tt : 1 - Math.pow(-2 * tt + 2, 2) / 2
            sheet.setAttribute("fill", `hsl(${S.hue} 16% 90%)`)
            sheet.setAttribute("opacity", Math.max(0, 1 - tt * 2.4).toFixed(2))
            polys.forEach((pp) => {
                pp.el.setAttribute(
                    "points",
                    pp.flat
                        .map(
                            (fp: number[], i: number) =>
                                lerp(fp[0], pp.fold[i][0], e).toFixed(1) +
                                "," +
                                lerp(fp[1], pp.fold[i][1], e).toFixed(1)
                        )
                        .join(" ")
                )
                pp.el.setAttribute(
                    "fill",
                    `hsl(${S.hue} ${lerp(18, S.sat, tt).toFixed(0)}% ${lerp(88, pp.L, tt).toFixed(0)}%)`
                )
                pp.el.setAttribute(
                    "opacity",
                    Math.min(1, Math.max(0, (tt - 0.05) * 1.7)).toFixed(2)
                )
            })
        }
        let folded = false, busy = false, cur = 0
        const tipEl = root.querySelector(".wfl-tip") as HTMLElement
        const countEl = root.querySelector(".wfl-count") as HTMLElement
        function setCount() {
            if (countEl)
                countEl.textContent =
                    "sheet " + (lesson + 1) + " of " + SHAPES.length + " — " + SHAPES[lesson].name
        }
        function animateTo(target: number, done?: () => void) {
            busy = true
            if (reduce) {
                cur = target
                render(cur)
                busy = false
                done && done()
                return
            }
            ;(function step() {
                cur += target > cur ? 0.022 : -0.03
                if ((target > 0 && cur >= target) || (target === 0 && cur <= 0)) {
                    cur = target
                    render(cur)
                    busy = false
                    done && done()
                    return
                }
                render(cur)
                requestAnimationFrame(step)
            })()
        }
        function toggle() {
            if (busy) return
            if (!folded) {
                tipEl.style.opacity = "0"
                animateTo(1, () => {
                    folded = true
                    const S = SHAPES[lesson]
                    tipEl.innerHTML =
                        '<span class="wfl-o">origami: ' + S.o +
                        '</span><span class="wfl-h">' + S.h + "</span>"
                    tipEl.style.opacity = "1"
                })
            } else {
                tipEl.style.opacity = "0"
                animateTo(0, () => {
                    folded = false
                    lesson = (lesson + 1) % SHAPES.length
                    buildShape(lesson)
                    setCount()
                    render(0)
                    tipEl.innerHTML =
                        "a fresh sheet — fold " + SHAPES[lesson].name + " ↑"
                    tipEl.style.opacity = "1"
                })
            }
        }
        const stage = root.querySelector(".wfl-stage") as HTMLElement
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                toggle()
            }
        }
        stage.addEventListener("click", toggle)
        stage.addEventListener("keydown", onKey)
        buildShape(0)
        setCount()
        render(0)
        return () => {
            stage.removeEventListener("click", toggle)
            stage.removeEventListener("keydown", onKey)
            svg.innerHTML = ""
        }
    }, [])

    return (
        <div ref={rootRef} className="wfl-root">
            <style>{CSS}</style>
            {showCounter && <div className="wfl-count">sheet 1 of 6</div>}
            <div
                className="wfl-stage"
                role="button"
                tabIndex={0}
                aria-label="Fold the sheet"
            >
                <svg viewBox="0 0 260 230" xmlns="http://www.w3.org/2000/svg" />
            </div>
            <div className="wfl-tip">tap the sheet ↑ — fold an elephant</div>
        </div>
    )
}

addPropertyControls(FoldTheLesson, {
    showCounter: {
        type: ControlType.Boolean,
        title: "Show counter",
        defaultValue: true,
    },
})
