// wysdym port kit · PenUnderline (code OVERRIDE, not a component)
// The hand-drawn pen-stroke underline that wipes in on hover — for nav and
// footer links. In Framer, overrides attach to existing canvas elements:
// select a link/text layer → right panel → Code Overrides → File:
// PenUnderline → Override: WithPenUnderline.
//
// Apply to each nav link (not the Apply paper-scrap button).

import type { ComponentType } from "react"
import * as React from "react"

const STROKE =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='44' height='5' viewBox='0 0 44 5'%3E%3Cpath d='M1 3.2 C6 1.6 11 4.2 16 3 C21 1.8 26 4 31 3 C36 2 41 3.8 43 2.6' fill='none' stroke='%23ba6296' stroke-width='1.8' stroke-linecap='round'/%3E%3C/svg%3E\")"

function ensureStyle() {
    if (document.getElementById("wpu-style")) return
    const s = document.createElement("style")
    s.id = "wpu-style"
    s.textContent = `
.wpu-underline{position:relative;}
.wpu-underline::before{content:'';position:absolute;left:0;bottom:-4px;height:5px;width:0;
  background:${STROKE} repeat-x;background-size:44px 5px;transition:width .28s ease;pointer-events:none;}
.wpu-underline:hover::before{width:100%;}
`
    document.head.appendChild(s)
}

export function WithPenUnderline(Component: any): ComponentType {
    return (props: any) => {
        React.useEffect(ensureStyle, [])
        return (
            <Component
                {...props}
                className={((props.className || "") + " wpu-underline").trim()}
            />
        )
    }
}
