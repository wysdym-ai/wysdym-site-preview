// wysdym port kit · ReadRunWriteLearn
// The Read → Run → Write → Learn paper accordion from the platform page:
// one connected strip that unfolds panel by panel (rotateY paper fold) with
// hand-drawn arrows across the seams, then replays on a loop.
//
// Usage in Framer: drop into the platform hero, width Auto (it sizes itself),
// height Auto. Words and loop timing editable in the properties panel.

import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

const CSS = `
.wrr-root{--magenta-deep:#8d4874;--ink:#1f2233;font-family:'Inter',sans-serif;display:inline-block;}
.wrr-root *{box-sizing:border-box;margin:0;padding:0;}
.wrr-acc{height:62px;perspective:1100px;}
.wrr-pnl{position:relative;width:140px;height:62px;display:flex;align-items:center;justify-content:center;gap:6px;
  font-family:'Caveat',cursive;font-size:30px;font-weight:700;color:var(--magenta-deep);
  background:linear-gradient(180deg,#fff,#f6f2e7);border:2px solid var(--ink);
  transform-style:preserve-3d;box-shadow:2px 4px 8px rgba(31,34,51,.15);}
.wrr-pnl .wrr-pnl{position:absolute;left:100%;top:-2px;margin-left:-2px;transform-origin:left center;transform:rotateY(-178deg);}
.wrr-l2,.wrr-l4{background:linear-gradient(180deg,#faf6ec,#eee8d8);}
.wrr-acc.play .wrr-l2{animation:wrrUnfold .9s ease forwards;animation-delay:.15s;}
.wrr-acc.play .wrr-l3{animation:wrrUnfold .9s ease forwards;animation-delay:.8s;}
.wrr-acc.play .wrr-l4{animation:wrrUnfold .9s ease forwards;animation-delay:1.45s;}
@keyframes wrrUnfold{0%{transform:rotateY(-178deg);filter:brightness(.55);}70%{filter:brightness(1.03);}100%{transform:rotateY(0);filter:brightness(1);}}
.wrr-arrow{width:26px;height:16px;flex:none;color:var(--magenta-deep);opacity:.85;transform:rotate(var(--ar,0deg));}
@media(max-width:640px){.wrr-pnl{width:92px;height:50px;font-size:22px;}}
@media(prefers-reduced-motion:reduce){
  .wrr-pnl .wrr-pnl{transform:rotateY(0) !important;animation:none !important;filter:none !important;}
}
`

const Arrow = ({ ar }: { ar: string }) => (
    <svg
        className="wrr-arrow"
        style={{ "--ar": ar } as any}
        viewBox="0 0 40 24"
        aria-hidden="true"
    >
        <path
            d="M2 13 C10 8.5, 21 8.5, 29 12.5 M23.5 6 L30.5 12.5 L22.5 17.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.7"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)

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
 * @framerSupportedLayoutWidth auto
 * @framerSupportedLayoutHeight auto
 */
export default function ReadRunWriteLearn(props: any) {
    const {
        words = ["Read", "Run", "Write", "Learn"],
        loopSeconds = 6.2,
        autoPlay = true,
    } = props
    const accRef = React.useRef<HTMLDivElement>(null)
    useFonts()

    React.useEffect(() => {
        const acc = accRef.current
        if (!acc || !autoPlay) return
        const reduce = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
        if (reduce) return
        const play = () => {
            acc.classList.remove("play")
            void acc.offsetWidth
            acc.classList.add("play")
        }
        const t = setTimeout(play, 350)
        const iv = setInterval(play, loopSeconds * 1000)
        return () => {
            clearTimeout(t)
            clearInterval(iv)
        }
    }, [autoPlay, loopSeconds])

    const w = [...words]
    while (w.length < 4) w.push(["Read", "Run", "Write", "Learn"][w.length])

    return (
        <div className="wrr-root">
            <style>{CSS}</style>
            <div
                className="wrr-acc"
                ref={accRef}
                aria-label={w.join(", ") + " — one sheet unfolding"}
            >
                <div className="wrr-pnl wrr-l1">
                    <span>{w[0]}</span>
                    <div className="wrr-pnl wrr-l2">
                        <Arrow ar="-3deg" />
                        <span>{w[1]}</span>
                        <div className="wrr-pnl wrr-l3">
                            <Arrow ar="2deg" />
                            <span>{w[2]}</span>
                            <div className="wrr-pnl wrr-l4">
                                <Arrow ar="-2deg" />
                                <span>{w[3]}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

addPropertyControls(ReadRunWriteLearn, {
    words: {
        type: ControlType.Array,
        title: "Words",
        maxCount: 4,
        control: { type: ControlType.String },
        defaultValue: ["Read", "Run", "Write", "Learn"],
    },
    loopSeconds: {
        type: ControlType.Number,
        title: "Loop every",
        defaultValue: 6.2,
        min: 3,
        max: 20,
        step: 0.2,
        unit: "s",
    },
    autoPlay: {
        type: ControlType.Boolean,
        title: "Auto-play",
        defaultValue: true,
    },
})
