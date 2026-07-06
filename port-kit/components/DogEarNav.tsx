// wysdym port kit · DogEarNav
// The page-turn corner: a folded dog-ear fixed to the bottom-right of the
// page. Hover lifts it and shows "turn the page → {next}"; click navigates
// to the next page in the site cycle.
//
// Usage in Framer: drop one on each main page (position anywhere — it
// renders position:fixed). Set the link + label per page:
// Home → platform, Platform → stand-for, Stand-for → blog, Blog → apply,
// Apply → home ("back to the start").

import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

const CSS = `
.wde-root{font-family:'Inter',sans-serif;}
.wde{position:fixed;right:0;bottom:0;width:66px;height:66px;z-index:75;display:block;transform-origin:100% 100%;
  transition:transform .25s cubic-bezier(.2,.8,.3,1);text-decoration:none;}
.wde:hover{transform:scale(1.35);}
.wde svg{width:100%;height:100%;display:block;}
.wde-tip{position:absolute;right:74px;bottom:16px;white-space:nowrap;font-family:'Caveat',cursive;font-size:20px;
  font-weight:600;color:#8d4874;background:rgba(253,252,248,.92);border:1.5px dashed #BA6296;border-radius:100px;
  padding:2px 14px;opacity:0;transform:translateX(8px) rotate(-2deg);transition:opacity .2s,transform .25s;pointer-events:none;}
.wde:hover .wde-tip{opacity:1;transform:translateX(0) rotate(-2deg);}
@media(max-width:720px){.wde{display:none;}}
`

function useFonts() {
    React.useEffect(() => {
        if (document.getElementById("wag-fonts") || document.getElementById("wde-fonts")) return
        const l = document.createElement("link")
        l.id = "wde-fonts"
        l.rel = "stylesheet"
        l.href =
            "https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&display=swap"
        document.head.appendChild(l)
    }, [])
}

/**
 * @framerSupportedLayoutWidth auto
 * @framerSupportedLayoutHeight auto
 */
export default function DogEarNav(props: any) {
    const { link = "/platform", label = "the platform" } = props
    useFonts()
    return (
        <div className="wde-root">
            <style>{CSS}</style>
            <a className="wde" href={link} aria-label={`Turn the page — ${label}`}>
                <span className="wde-tip">
                    turn the page → <b>{label}</b>
                </span>
                <svg viewBox="0 0 80 80" aria-hidden="true">
                    <path d="M14 80 L80 14 L80 80 Z" fill="rgba(141,72,116,.13)" />
                    <path
                        d="M14 80 L80 14 L74 74 Z"
                        fill="#f4efe4"
                        stroke="rgba(94,44,75,.4)"
                        strokeWidth="1.2"
                        style={{ filter: "drop-shadow(-2px -2px 3px rgba(31,34,51,.18))" }}
                    />
                    <path
                        d="M30 68 L64 34"
                        stroke="rgba(94,44,75,.25)"
                        strokeWidth="1"
                        strokeDasharray="3 4"
                    />
                </svg>
            </a>
        </div>
    )
}

addPropertyControls(DogEarNav, {
    link: { type: ControlType.Link, title: "Next page" },
    label: {
        type: ControlType.String,
        title: "Label",
        defaultValue: "the platform",
    },
})
