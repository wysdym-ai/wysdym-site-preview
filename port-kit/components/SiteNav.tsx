// wysdym port kit · SiteNav
// The site header as a CODE component so the interactive bits actually work:
// working Resources hover dropdown, current-page magenta highlighter (reads
// the URL), pen-stroke hover underlines, real wordmark image, paper-scrap
// Apply chip with the silver paperclip.
//
// Usage in Framer: replace the canvas SiteHeader instance on each page with
// this component — width Fill, height Auto, position sticky top 0.
// Which nav item gets the highlight is automatic (URL match), or force it
// with the `current` property.

import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

const ASSET_BASE = "https://wysdym-ai.github.io/wysdym-site-preview/"

const NAV = [
    { label: "The problem", href: "/", match: "home" },
    { label: "The platform", href: "/platform", match: "platform" },
    { label: "What we stand for", href: "/stand-for", match: "stand-for" },
]
const RESOURCES = [
    { label: "2026 GTM AI Stats", href: "https://gtmstats.wysdym.ai", external: true },
    { label: "Blog", href: "/blog", external: false },
]

const CSS = `
.wsn-root{--magenta:#BA6296;--magenta-deep:#8d4874;--ink:#1f2233;--pencil:#3a3f55;--paper-2:#f5f3ea;
  font-family:'Inter',sans-serif;width:100%;position:sticky;top:0;z-index:90;}
.wsn-root *{box-sizing:border-box;margin:0;padding:0;}
.wsn-bar{display:flex;align-items:center;justify-content:space-between;padding:14px 32px;
  backdrop-filter:blur(4px);background:rgba(253,252,248,.85);border-bottom:1.5px dashed rgba(58,63,85,.25);}
.wsn-logo{display:flex;align-items:center;gap:10px;text-decoration:none;}
.wsn-logo img.wsn-crane{width:60px;height:60px;object-fit:contain;display:block;}
.wsn-logo img.wsn-word{width:auto;height:34px;display:block;}
.wsn-links{display:flex;align-items:center;gap:22px;}
.wsn-links a{font-family:'Caveat',cursive;font-size:21px;font-weight:600;color:var(--pencil);
  text-decoration:none;position:relative;white-space:nowrap;}
.wsn-links a:hover{color:var(--magenta-deep);}
.wsn-links a:not(.wsn-apply)::before{content:'';position:absolute;left:0;bottom:-4px;height:5px;width:0;
  background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='44' height='5' viewBox='0 0 44 5'%3E%3Cpath d='M1 3.2 C6 1.6 11 4.2 16 3 C21 1.8 26 4 31 3 C36 2 41 3.8 43 2.6' fill='none' stroke='%23ba6296' stroke-width='1.8' stroke-linecap='round'/%3E%3C/svg%3E") repeat-x;
  background-size:44px 5px;transition:width .28s ease;pointer-events:none;}
.wsn-links a:not(.wsn-apply):hover::before{width:100%;}
.wsn-links a.wsn-current{color:var(--magenta-deep);}
.wsn-links a.wsn-current::after{content:'';position:absolute;left:-2px;right:-2px;bottom:-4px;height:7px;
  background:var(--magenta);opacity:.35;transform:skewX(-10deg);border-radius:40%;}
.wsn-links a.wsn-current::before{display:none;}
.wsn-res{position:relative;}
.wsn-menu{position:absolute;top:28px;right:0;background:var(--paper-2);border:1.5px solid var(--pencil);
  border-radius:3px;box-shadow:4px 5px 0 rgba(58,63,85,.18);padding:8px;display:none;flex-direction:column;
  gap:4px;min-width:220px;z-index:95;}
.wsn-res:hover .wsn-menu,.wsn-res:focus-within .wsn-menu{display:flex;}
.wsn-menu a{padding:7px 10px;border-radius:3px;font-size:18px;}
.wsn-menu a::before{display:none !important;}
.wsn-menu a:hover{background:rgba(186,98,150,.12);}
.wsn-apply{position:relative;font-family:'Caveat',cursive !important;font-size:20px !important;font-weight:700 !important;
  color:#fff !important;background:linear-gradient(180deg,var(--magenta),var(--magenta-deep));
  border-radius:2px;padding:8px 20px 7px 36px;box-shadow:2px 4px 9px rgba(31,34,51,.28);
  transform:rotate(-2deg);transition:transform .15s;}
.wsn-apply:hover{transform:rotate(0) translateY(-1px);color:#fff !important;}
.wsn-apply::before{content:'' !important;position:absolute;top:-10px;left:12px;width:13px;height:26px;
  border:2.5px solid #d7dae0;border-bottom:none;border-radius:7px 7px 5px 5px;
  filter:drop-shadow(0 1px 1px rgba(0,0,0,.3));background:none !important;transition:none !important;}
.wsn-apply::after{content:'';position:absolute;top:-4px;left:16.5px;width:4px;height:16px;
  border:2px solid #aeb3bb;border-bottom:none;border-radius:3px 3px 0 0;}
@media(max-width:860px){.wsn-links a:not(.wsn-apply){display:none;}}
`

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
export default function SiteNav(props: any) {
    const {
        current = "auto",
        craneUrl = ASSET_BASE + "origami-crane-wysdym.png",
        wordmarkUrl = ASSET_BASE + "wysdym-wordmark-magenta.svg",
        applyHref = "/apply",
        contactHref = "/contact",
    } = props
    useFonts()

    const [path, setPath] = React.useState("")
    React.useEffect(() => {
        setPath(window.location.pathname.replace(/\/$/, "") || "/")
    }, [])

    const isCurrent = (m: string) => {
        if (current !== "auto") return current === m
        if (m === "home") return path === "/"
        return path.endsWith("/" + m)
    }
    const resCurrent = current === "auto" ? path.endsWith("/blog") : current === "resources"

    const src = (u: any) => (typeof u === "string" ? u : u?.src)

    return (
        <div className="wsn-root">
            <style>{CSS}</style>
            <div className="wsn-bar">
                <a className="wsn-logo" href="/" aria-label="wysdym home">
                    <img className="wsn-crane" src={src(craneUrl)} alt="wysdym crane" />
                    <img className="wsn-word" src={src(wordmarkUrl)} alt="wysdym" />
                </a>
                <nav className="wsn-links">
                    {NAV.map((n) => (
                        <a
                            key={n.match}
                            href={n.href}
                            className={isCurrent(n.match) ? "wsn-current" : ""}
                        >
                            {n.label}
                        </a>
                    ))}
                    <span className="wsn-res">
                        <a href="/blog" className={resCurrent ? "wsn-current" : ""}>
                            Resources ▾
                        </a>
                        <span className="wsn-menu">
                            {RESOURCES.map((r) => (
                                <a
                                    key={r.label}
                                    href={r.href}
                                    target={r.external ? "_blank" : undefined}
                                    rel={r.external ? "noopener" : undefined}
                                >
                                    {r.label}
                                </a>
                            ))}
                        </span>
                    </span>
                    <a
                        href={contactHref}
                        className={isCurrent("contact") ? "wsn-current" : ""}
                    >
                        Contact
                    </a>
                    <a href={applyHref} className="wsn-apply">
                        Apply for access
                    </a>
                </nav>
            </div>
        </div>
    )
}

addPropertyControls(SiteNav, {
    current: {
        type: ControlType.Enum,
        title: "Highlight",
        options: ["auto", "home", "platform", "stand-for", "resources", "contact"],
        optionTitles: ["Auto (by URL)", "The problem", "The platform", "What we stand for", "Resources", "Contact"],
        defaultValue: "auto",
    },
    craneUrl: { type: ControlType.Image, title: "Crane" },
    wordmarkUrl: { type: ControlType.Image, title: "Wordmark" },
    applyHref: { type: ControlType.Link, title: "Apply link" },
    contactHref: { type: ControlType.Link, title: "Contact link" },
})
