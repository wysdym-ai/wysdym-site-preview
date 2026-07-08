// wysdym port kit · OrigamiDoodle
// The hand-drawn origami identity icons, one per harness pillar:
// elephant=Graph · pinwheel=Skills · boat=Connect · house=Gateway ·
// star=Observe · plane=Plays · crane=Operator.
// Pick the shape and color in the properties panel; drop next to a
// section kicker at ~34-40px.

import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

const PEN = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
}

const SHAPES: Record<string, React.ReactNode> = {
    elephant: (
        <>
            <path d="M15.5 10.5 C9.5 12 6.5 17 7.5 22 C8 26 6.5 30.5 5 33.5" {...PEN} />
            <path d="M15.5 10.5 C24 6.5 36 7.5 40.5 13.5 C43.5 17.5 43.5 24 41.5 29 C33 31.5 21 31.5 12.5 28.5" {...PEN} />
            <path d="M17.5 29.5 L17.5 36 M35.5 30 L35.5 36" {...PEN} />
            <path d="M20.5 13 C26.5 11 29.5 16 26.5 20.5 C23.5 23.5 19.5 21.5 19.8 16.8" {...PEN} strokeWidth={2} />
            <circle cx="13" cy="15.5" r="1.4" fill="currentColor" />
        </>
    ),
    pinwheel: (
        <>
            <path d="M24 20 L24 4.5 L33.5 14 Z M24 20 L39.5 20 L30 29.5 Z M24 20 L24 35.5 L14.5 26 Z M24 20 L8.5 20 L18 10.5 Z" {...PEN} />
            <circle cx="24" cy="20" r="1.6" fill="currentColor" />
        </>
    ),
    boat: (
        <>
            <path d="M4.5 24 L43.5 24 L35 33 L13 33 Z M13.5 24 L24 8.5 L34.5 24" {...PEN} />
            <path d="M24 10.5 L24 22.5" {...PEN} strokeDasharray="2 4" strokeWidth={1.8} />
        </>
    ),
    house: (
        <path d="M8 21 L24 6.5 L40 21 M11.5 18 L11.5 34 L36.5 34 L36.5 18 M21 34 L21 25 L27.5 25 L27.5 34" {...PEN} />
    ),
    star: (
        <path d="M24 5.5 L27.8 15.4 L38.4 16 L30.2 22.8 L32.9 33 L24 27.3 L15.1 33 L17.8 22.8 L9.6 16 L20.2 15.4 Z" {...PEN} />
    ),
    plane: (
        <path d="M4 23 L44 5.5 L31.5 35 L23 26 Z M23 26 L44 5.5 M23 26 L20.5 34" {...PEN} />
    ),
    crane: (
        <path d="M3 33 L15 26 L19 5 L24 19 L35 6 L42 10 L33 19 L36 26 L28 32 L12 32 Z" {...PEN} />
    ),
    // Home "problem" card doodles, ported from wysdym-home-lined-v2.html
    brain: (
        <g transform="translate(4 0) scale(0.833)">
            <path d="M18 30c-6 1-8.5-5-4.5-8.4-2.4-4.4 2.4-8.8 6.4-7.4 1.6-4.2 9-4.4 10.8.2 4.4-1.4 9 3.2 6.6 7.6 3.8 3-1 8.4-4.6 7.8" {...PEN} strokeWidth={2.4} />
            <path d="M18.5 21.5c2-2.2 6.8-2 8.6.3" {...PEN} strokeWidth={2.4} />
            <path d="M23.5 30.5l.8 7.4" {...PEN} strokeWidth={2.4} />
            <path d="M19 41.5c3-.8 6.5-.6 9.5.3" {...PEN} strokeWidth={2.4} strokeDasharray="1.5 4.5" />
            <path d="M14 15l-2.5-2.8" {...PEN} strokeWidth={1.9} />
        </g>
    ),
    network: (
        <g transform="translate(4 0) scale(0.833)">
            <path d="M7 12.5c-.6-3 1.6-5.4 4.2-5 2.8.4 4 3.6 2.4 6-1.8 2.4-6 1.8-6.6-1z" {...PEN} strokeWidth={2.4} />
            <path d="M35 7.5c2.8-1.4 6 1 5.6 4-.4 2.8-4 4-6 2-1.8-1.8-1.6-4.6.4-6z" {...PEN} strokeWidth={2.4} />
            <path d="M21.5 34c-.8-2.8 1.6-5.6 4.4-5 2.8.4 4 4 2 6.2-2 2-6 1-6.4-1.2z" {...PEN} strokeWidth={2.4} />
            <path d="M13.5 15.5l7.2 6.3" {...PEN} strokeWidth={2.4} />
            <path d="M23.5 27.5l-1.8 7.2" {...PEN} strokeWidth={2.4} strokeDasharray="2.5 5" />
            <path d="M34.5 13.5l-6.8 8" {...PEN} strokeWidth={2.4} strokeDasharray="2.5 5" />
            <path d="M30.5 27l5 3.6" {...PEN} strokeWidth={2.4} />
        </g>
    ),
    shield: (
        <g transform="translate(4 0) scale(0.833)">
            <path d="M24 4.5l14.5 5.2c.4 10.4-5.4 17-14.2 20.4C15.2 26.6 9.6 20 10 9.9L24 4.5z" {...PEN} strokeWidth={2.4} />
            <path d="M17.5 22.5l5.2 5.4 9.6-11.6" {...PEN} strokeWidth={2.4} strokeDasharray="2.5 4" />
            <path d="M11 38.5L39.5 9.5" {...PEN} strokeWidth={2.4} />
            <path d="M13.5 41l3-2.8" {...PEN} strokeWidth={1.9} />
        </g>
    ),
}

/**
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight fixed
 */
export default function OrigamiDoodle(props: any) {
    const { shape = "crane", color = "#BA6296", style } = props
    if (shape === "logo") {
        return (
            <img
                src="https://wysdym-ai.github.io/wysdym-site-preview/origami-crane-wysdym.png"
                alt="wysdym crane"
                style={{ width: "100%", height: "100%", objectFit: "contain", display: "block", ...style }}
            />
        )
    }
    return (
        <svg
            viewBox="0 0 48 40"
            style={{ width: "100%", height: "100%", display: "block", color, ...style }}
            aria-hidden="true"
        >
            {SHAPES[shape] || SHAPES.crane}
        </svg>
    )
}

addPropertyControls(OrigamiDoodle, {
    shape: {
        type: ControlType.Enum,
        title: "Shape",
        options: ["elephant", "pinwheel", "boat", "house", "star", "plane", "crane", "brain", "network", "shield", "logo"],
        optionTitles: ["Elephant (Graph)", "Pinwheel (Skills)", "Boat (Connect)", "House (Gateway)", "Star (Observe)", "Plane (Plays)", "Crane (Operator)", "Brain (Memory)", "Network (Connection)", "Shield (Governance)", "Crane logo (real image)"],
        defaultValue: "crane",
    },
    color: { type: ControlType.Color, title: "Ink", defaultValue: "#BA6296" },
})
