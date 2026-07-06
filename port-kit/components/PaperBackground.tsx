// wysdym port kit · PaperBackground
// The lined-paper world: ruled lines, red margin line, punched binder holes,
// and the soft top shading — as one layer you pin behind the page content.
//
// Usage in Framer: add this as a code component, place it on the page,
// set position Absolute, pin all sides (inset 0), send to back.
// Set `fixedChrome` ON so the margin line + holes stay put while scrolling
// (exactly like the HTML mockups).

import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

/**
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
 */
export default function PaperBackground(props: any) {
    const {
        paper = "#fdfcf8",
        lineColor = "rgba(126,162,204,0.42)",
        lineGap = 32,
        showMargin = true,
        marginX = 96,
        showHoles = true,
        fixedChrome = true,
        style,
    } = props

    const chromePos: any = fixedChrome ? "fixed" : "absolute"

    return (
        <div
            style={{
                position: "absolute",
                inset: 0,
                overflow: "hidden",
                background: paper,
                backgroundImage: `radial-gradient(ellipse 120% 60% at 50% -10%, rgba(60,50,30,.05), transparent 60%),
          repeating-linear-gradient(180deg, transparent 0 ${lineGap - 1}px, ${lineColor} ${lineGap - 1}px ${lineGap}px)`,
                backgroundSize: `100% 100%, 100% ${lineGap}px`,
                pointerEvents: "none",
                ...style,
            }}
        >
            {showMargin && (
                <div
                    style={{
                        position: chromePos,
                        top: 0,
                        left: marginX,
                        width: 2,
                        height: "100%",
                        background: "rgba(224,90,90,.5)",
                    }}
                />
            )}
            {showHoles &&
                [16, 49, 82].map((topPct) => (
                    <div
                        key={topPct}
                        style={{
                            position: chromePos,
                            left: 28,
                            top: `${topPct}%`,
                            width: 26,
                            height: 26,
                            borderRadius: "50%",
                            background:
                                "radial-gradient(circle at 38% 32%, #efece3, #d9d5c8 72%)",
                            boxShadow:
                                "inset 0 3px 6px rgba(0,0,0,.3), inset 0 -1px 2px rgba(255,255,255,.8)",
                        }}
                    />
                ))}
        </div>
    )
}

addPropertyControls(PaperBackground, {
    paper: { type: ControlType.Color, title: "Paper", defaultValue: "#fdfcf8" },
    lineColor: {
        type: ControlType.Color,
        title: "Rule lines",
        defaultValue: "rgba(126,162,204,0.42)",
    },
    lineGap: {
        type: ControlType.Number,
        title: "Line gap",
        defaultValue: 32,
        min: 20,
        max: 48,
        step: 1,
    },
    showMargin: {
        type: ControlType.Boolean,
        title: "Margin line",
        defaultValue: true,
    },
    marginX: {
        type: ControlType.Number,
        title: "Margin X",
        defaultValue: 96,
        min: 24,
        max: 200,
        step: 1,
        hidden: (p: any) => !p.showMargin,
    },
    showHoles: {
        type: ControlType.Boolean,
        title: "Binder holes",
        defaultValue: true,
    },
    fixedChrome: {
        type: ControlType.Boolean,
        title: "Fix margin/holes",
        defaultValue: true,
    },
})
