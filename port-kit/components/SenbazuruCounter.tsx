// wysdym port kit · SenbazuruCounter
// The thousand-crane easter egg from the end of "What we stand for":
// "crane #N of 1,000" with a filling flock row, the wish line, and the
// come-back-tomorrow note. N is a playful design fiction — startCount +
// perDay cranes per day from startDate — NOT a real metric; swap the props
// to something real before anyone cites it.
//
// Usage in Framer: drop into the page flow, width Fill (max 760), height Auto.

import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

const CSS = `
.wsz-root{--magenta:#BA6296;--magenta-deep:#8d4874;--ink:#1f2233;--pencil:#3a3f55;font-family:'Inter',sans-serif;width:100%;}
.wsz-root *{box-sizing:border-box;margin:0;padding:0;}
.wsz-card{max-width:760px;background:linear-gradient(180deg,#fff,#f8eef5);border:2px solid var(--ink);border-radius:4px;
  padding:28px 32px;box-shadow:5px 7px 0 rgba(58,63,85,.2);transform:rotate(-.5deg);}
.wsz-count{font-family:'Caveat',cursive;font-size:clamp(34px,5vw,52px);font-weight:700;color:var(--magenta-deep);line-height:1.1;}
.wsz-count small{font-size:.55em;color:var(--pencil);font-weight:600;}
.wsz-row{display:flex;gap:8px;margin:16px 0 6px;flex-wrap:wrap;}
.wsz-row svg{width:30px;height:25px;}
.wsz-row svg path{fill:none;stroke:var(--magenta);stroke-width:2.4;stroke-linejoin:round;}
.wsz-row svg.done path{fill:var(--magenta);stroke:var(--magenta-deep);}
.wsz-wish{font-family:'Instrument Serif',serif;font-style:italic;font-size:19px;color:var(--magenta-deep);margin-top:12px;}
.wsz-note{font-size:13.5px;color:var(--pencil);margin-top:8px;}
`

const CRANE = "M3 33 L15 26 L19 5 L24 19 L35 6 L42 10 L33 19 L36 26 L28 32 L12 32 Z"

function useFonts() {
    React.useEffect(() => {
        if (document.getElementById("wsz-fonts")) return
        const l = document.createElement("link")
        l.id = "wsz-fonts"
        l.rel = "stylesheet"
        l.href =
            "https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Caveat:wght@600;700&family=Instrument+Serif:ital@0;1&display=swap"
        document.head.appendChild(l)
    }, [])
}

/**
 * @framerSupportedLayoutWidth fullwidth
 * @framerSupportedLayoutHeight auto
 */
export default function SenbazuruCounter(props: any) {
    const {
        startCount = 287,
        startDate = "2026-06-24",
        perDay = 3,
        total = 1000,
        wish = "Our wish: every GTM agent runs on the harness.",
        note = "The flock grows a little every day. Come back and check on it.",
    } = props
    const [n, setN] = React.useState(startCount)
    useFonts()

    React.useEffect(() => {
        const start = new Date(startDate + "T00:00:00")
        const days = Math.max(0, Math.floor((Date.now() - start.getTime()) / 864e5))
        setN(Math.min(total - 1, startCount + days * perDay))
    }, [startCount, startDate, perDay, total])

    const filled = Math.round((n / total) * 10)

    return (
        <div className="wsz-root">
            <style>{CSS}</style>
            <div className="wsz-card">
                <div className="wsz-count">
                    crane #{n} <small>of {total.toLocaleString()}</small>
                </div>
                <div className="wsz-row" aria-hidden="true">
                    {Array.from({ length: 10 }, (_, i) => (
                        <svg
                            key={i}
                            viewBox="0 0 48 40"
                            className={i < filled ? "done" : ""}
                        >
                            <path d={CRANE} />
                        </svg>
                    ))}
                </div>
                <div className="wsz-wish">{wish}</div>
                <div className="wsz-note">{note}</div>
            </div>
        </div>
    )
}

addPropertyControls(SenbazuruCounter, {
    startCount: {
        type: ControlType.Number,
        title: "Start count",
        defaultValue: 287,
        min: 0,
        max: 999,
        step: 1,
    },
    startDate: {
        type: ControlType.String,
        title: "Start date",
        defaultValue: "2026-06-24",
    },
    perDay: {
        type: ControlType.Number,
        title: "Per day",
        defaultValue: 3,
        min: 0,
        max: 20,
        step: 1,
    },
    wish: {
        type: ControlType.String,
        title: "The wish",
        defaultValue: "Our wish: every GTM agent runs on the harness.",
    },
    note: {
        type: ControlType.String,
        title: "Note",
        defaultValue: "The flock grows a little every day. Come back and check on it.",
    },
})
