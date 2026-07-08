// wysdym port kit · TornEdge
// The ripped-out-page top for the 404: the strip of paper left behind in the
// notebook after a page is torn out. Layered for realism — a cream under-ply,
// the white top ply with an irregular tear (big bites + fine teeth), a bright
// fiber line along the exposed core, loose hanging fibers, and a soft shadow
// under the torn lip. Deterministic (no randomness), renders the same
// everywhere.
//
// Usage in Framer: full width at the very TOP of the 404 page content,
// height ~64, above the "This page got torn out" hero, below the SiteNav.

import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

// Deterministic pseudo-noise from index — same tear every render.
const n1 = (i: number) => {
    const x = Math.sin(i * 12.9898) * 43758.5453
    return x - Math.floor(x)
}
// Low-frequency drift + high-frequency teeth = organic tear line.
const tearY = (x: number, H: number) => {
    const drift =
        Math.sin(x * 0.004) * 0.28 +
        Math.sin(x * 0.011 + 2.1) * 0.18 +
        Math.sin(x * 0.027 + 0.7) * 0.1
    const bite = n1(Math.floor(x / 90)) > 0.62 ? n1(x) * 0.5 : 0 // occasional deep bite
    const teeth = (n1(x * 1.7) - 0.5) * 0.22
    const t = 0.52 + drift * 0.35 + bite * 0.4 + teeth
    return Math.max(0.18, Math.min(0.95, t)) * H
}

const W = 1200
const H = 64

const buildTear = (offset: number, coarse: number) => {
    let d = `M0 0 L${W} 0 L${W} ${(tearY(W, H) + offset).toFixed(1)}`
    for (let x = W - coarse; x >= 0; x -= coarse) {
        // midpoint tooth between coarse steps for a fibrous, non-polygonal look
        const mid = x + coarse / 2
        d += ` L${mid.toFixed(1)} ${(tearY(mid, H) + offset + (n1(mid * 3.3) - 0.5) * 5).toFixed(1)}`
        d += ` L${x.toFixed(1)} ${(tearY(x, H) + offset).toFixed(1)}`
    }
    d += " Z"
    return d
}

const TOP_PLY = buildTear(0, 11)
const UNDER_PLY = buildTear(4.5, 17)

// The bright exposed-core line just above the tear edge (open path).
const buildCore = () => {
    let d = ""
    for (let x = 0; x <= W; x += 9) {
        const y = tearY(x, H) - 1.2 + (n1(x * 5.1) - 0.5) * 1.6
        d += (x === 0 ? "M" : "L") + x.toFixed(1) + " " + y.toFixed(1)
    }
    return d
}
const CORE = buildCore()

// Loose paper fibers hanging off the tear, following the local tear height.
const FIBERS = Array.from({ length: 26 }, (_, k) => {
    const x = 14 + n1(k + 31) * (W - 28)
    const y = tearY(x, H) - 1
    const len = 3.5 + n1(k + 77) * 9
    const tilt = (n1(k + 123) - 0.5) * 6
    const w = 0.8 + n1(k + 171) * 0.7
    return { x, y, len, tilt, w }
})

/**
 * @framerSupportedLayoutWidth fullwidth
 * @framerSupportedLayoutHeight fixed
 */
export default function TornEdge(props: any) {
    const { paper = "#FFFFFF", under = "#EFEBDD", shadow = 0.28, style } = props
    return (
        <div
            style={{ width: "100%", height: "100%", overflow: "visible", ...style }}
            aria-hidden="true"
        >
            <svg
                viewBox={`0 0 ${W} ${H}`}
                preserveAspectRatio="none"
                style={{ width: "100%", height: "100%", display: "block", overflow: "visible" }}
            >
                <defs>
                    <filter id="wte-blur" x="-5%" y="-30%" width="110%" height="180%">
                        <feGaussianBlur stdDeviation="3" />
                    </filter>
                    <linearGradient id="wte-face" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor={paper} />
                        <stop offset="0.75" stopColor={paper} />
                        <stop offset="1" stopColor="#ECEAE2" />
                    </linearGradient>
                </defs>
                {/* shadow the torn lip throws on the sheet below */}
                <path
                    d={TOP_PLY}
                    transform="translate(0 6)"
                    fill={`rgba(31,34,51,${shadow})`}
                    filter="url(#wte-blur)"
                />
                {/* cream under-ply peeking out beneath the tear */}
                <path d={UNDER_PLY} fill={under} />
                {/* the white top ply with the tear */}
                <path d={TOP_PLY} fill="url(#wte-face)" />
                {/* bright exposed paper core along the tear */}
                <path
                    d={CORE}
                    fill="none"
                    stroke="rgba(255,255,255,.9)"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                />
                {/* faint grey line right at the lip for depth */}
                <path
                    d={CORE}
                    transform="translate(0 2.1)"
                    fill="none"
                    stroke="rgba(58,63,85,.14)"
                    strokeWidth="1"
                    strokeLinecap="round"
                />
                {/* loose hanging fibers */}
                {FIBERS.map((f, k) => (
                    <path
                        key={k}
                        d={`M${f.x} ${f.y} q ${f.tilt * 0.4} ${f.len * 0.55} ${f.tilt} ${f.len}`}
                        fill="none"
                        stroke="rgba(236,232,220,.95)"
                        strokeWidth={f.w}
                        strokeLinecap="round"
                        style={{ filter: "drop-shadow(0 1px 1px rgba(31,34,51,.18))" }}
                    />
                ))}
            </svg>
        </div>
    )
}

addPropertyControls(TornEdge, {
    paper: { type: ControlType.Color, title: "Paper", defaultValue: "#FFFFFF" },
    under: { type: ControlType.Color, title: "Under-ply", defaultValue: "#EFEBDD" },
    shadow: {
        type: ControlType.Number,
        title: "Shadow",
        defaultValue: 0.28,
        min: 0,
        max: 0.5,
        step: 0.02,
    },
})
