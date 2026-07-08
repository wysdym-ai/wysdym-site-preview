// wysdym port kit · SiteNav
// The site header as a CODE component so the interactive bits actually work:
// working Resources hover dropdown, current-page magenta highlighter (reads
// the URL), real wordmark image, paper-scrap Apply chip with the silver
// paperclip. Hover = color shift only; the highlighter marks the current page.
//
// Usage in Framer: replace the canvas SiteHeader instance on each page with
// this component — width Fill, height Auto, position sticky top 0.
// Which nav item gets the highlight is automatic (URL match), or force it
// with the `current` property.

import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

const ASSET_BASE = "https://wysdym-ai.github.io/wysdym-site-preview/"

const NAV = [
    { label: "Home", href: "/", match: "home" },
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
.wsn-logo{display:flex;align-items:center;gap:2px;text-decoration:none;}
.wsn-logo img.wsn-crane{width:56px;height:56px;object-fit:contain;display:block;margin-right:-2px;}
.wsn-logo img.wsn-word{width:auto;height:34px;display:block;}
.wsn-links{display:flex;align-items:center;gap:22px;}
.wsn-links a{font-family:'Caveat',cursive;font-size:21px;font-weight:600;color:var(--pencil);
  text-decoration:none;position:relative;white-space:nowrap;}
.wsn-links a:hover{color:var(--magenta-deep);}
.wsn-links a.wsn-current{color:var(--magenta-deep);}
.wsn-links a.wsn-current::after{content:'';position:absolute;left:-2px;right:-2px;bottom:-4px;height:7px;
  background:var(--magenta);opacity:.35;transform:skewX(-10deg);border-radius:40%;}
.wsn-res{position:relative;}
.wsn-menu{position:absolute;top:28px;right:0;background:var(--paper-2);border:1.5px solid var(--pencil);
  border-radius:3px;box-shadow:4px 5px 0 rgba(58,63,85,.18);padding:8px;display:none;flex-direction:column;
  gap:4px;min-width:220px;z-index:95;}
.wsn-res:hover .wsn-menu,.wsn-res:focus-within .wsn-menu{display:flex;}
.wsn-menu a{padding:7px 10px;border-radius:3px;font-size:18px;}
.wsn-menu a:hover{background:rgba(186,98,150,.12);}
.wsn-apply{position:relative;font-family:'Caveat',cursive !important;font-size:20px !important;font-weight:700 !important;
  color:#fff !important;background:linear-gradient(180deg,var(--magenta),var(--magenta-deep));
  border-radius:2px;padding:8px 20px 7px 34px;box-shadow:2px 4px 9px rgba(31,34,51,.28);
  transform:rotate(-2deg);transition:transform .15s;}
.wsn-apply:hover{transform:rotate(0) translateY(-1px);color:#fff !important;}
.wsn-clip{position:absolute;top:-16px;left:9px;width:19px;height:48px;transform:rotate(9deg);
  pointer-events:none;filter:drop-shadow(1px 2px 2px rgba(31,34,51,.35));}

/* --- mobile: hand-drawn hamburger + fold-down paper menu --- */
.wsn-burger{display:none;background:none;border:none;cursor:pointer;padding:8px;margin-left:4px;}
.wsn-burger svg{width:30px;height:24px;display:block;}
.wsn-burger svg path{stroke:var(--pencil);stroke-width:2.6;stroke-linecap:round;fill:none;}
.wsn-mwrap{display:none;position:absolute;left:0;right:0;top:100%;perspective:900px;z-index:89;}
.wsn-mpanel{transform-origin:top center;transform:rotateX(-90deg);opacity:0;
  transition:transform .45s cubic-bezier(.2,.8,.3,1),opacity .3s;
  background:rgba(253,252,248,.98);border-bottom:2px dashed rgba(58,63,85,.3);
  box-shadow:0 24px 40px -18px rgba(31,34,51,.35);padding:10px 26px 22px;
  display:flex;flex-direction:column;gap:2px;}
.wsn-mwrap.open .wsn-mpanel{transform:rotateX(0);opacity:1;}
.wsn-mpanel a{font-family:'Caveat',cursive;font-size:24px;font-weight:600;color:var(--pencil);
  text-decoration:none;padding:9px 2px;border-bottom:1.5px dashed rgba(58,63,85,.18);position:relative;}
.wsn-mpanel a:last-child{border-bottom:none;}
.wsn-mpanel a.wsn-current{color:var(--magenta-deep);}
.wsn-mpanel a.wsn-current::after{content:'';position:absolute;left:0;bottom:6px;width:120px;height:7px;
  background:var(--magenta);opacity:.35;transform:skewX(-10deg);border-radius:40%;}
.wsn-mpanel .wsn-msmall{font-family:'Inter',sans-serif;font-size:11px;letter-spacing:.16em;
  text-transform:uppercase;color:var(--pencil);opacity:.7;margin-top:12px;}
.wsn-mpanel a.wsn-mapply{font-weight:700;color:#fff;text-align:center;margin-top:14px;
  background:linear-gradient(180deg,var(--magenta),var(--magenta-deep));border-radius:2px;
  padding:10px 20px;box-shadow:2px 4px 9px rgba(31,34,51,.28);transform:rotate(-1deg);border-bottom:none;}
@media(max-width:860px){
  .wsn-links{display:none;}
  .wsn-burger{display:block;}
  .wsn-mwrap{display:block;pointer-events:none;}
  .wsn-mwrap.open{pointer-events:auto;}
  .wsn-logo img.wsn-crane{width:44px;height:44px;}
  .wsn-logo img.wsn-word{height:26px;}
  .wsn-bar{padding:10px 18px;}
}
@media(prefers-reduced-motion:reduce){.wsn-mpanel{transition:opacity .2s;transform:none;}}
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
    const [menuOpen, setMenuOpen] = React.useState(false)
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
                    <a href={applyHref} className="wsn-apply wsn-apply-desktop">
                        <svg className="wsn-clip" viewBox="0 0 20 50" aria-hidden="true">
                            <defs>
                                <linearGradient id="wsnclipg" x1="0" y1="0" x2="1" y2="0.15">
                                    <stop offset="0" stopColor="#eef1f4" />
                                    <stop offset="0.35" stopColor="#c3c9d0" />
                                    <stop offset="0.6" stopColor="#9aa2ab" />
                                    <stop offset="0.8" stopColor="#c9ced5" />
                                    <stop offset="1" stopColor="#7e858e" />
                                </linearGradient>
                            </defs>
                            <path
                                d="M6 6 C6 3.2 8 1.5 10.2 1.5 C12.4 1.5 14.5 3.2 14.5 6 L14.5 36 C14.5 41.5 10.3 45 6.8 42.5 C4.6 41 4 38.8 4 36.5 L4 13 C4 10.8 5.6 9.4 7.2 9.4 C8.8 9.4 10.4 10.8 10.4 13 L10.4 33"
                                fill="none"
                                stroke="url(#wsnclipg)"
                                strokeWidth="2.6"
                                strokeLinecap="round"
                            />
                            <path
                                d="M6 6 C6 3.2 8 1.5 10.2 1.5 C12.4 1.5 14.5 3.2 14.5 6 L14.5 36"
                                fill="none"
                                stroke="rgba(255,255,255,.55)"
                                strokeWidth="0.9"
                                strokeLinecap="round"
                            />
                        </svg>
                        Apply for access
                    </a>
                </nav>
                <button
                    className="wsn-burger"
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? (
                        <svg viewBox="0 0 30 24" aria-hidden="true">
                            <path d="M5 3.5 C12 9 19 15.5 25.5 20.5" />
                            <path d="M25 3 C18.5 9.5 11.5 15 4.5 20.8" />
                        </svg>
                    ) : (
                        <svg viewBox="0 0 30 24" aria-hidden="true">
                            <path d="M3.5 4.5 C11 3.4 20 5 27 4.1" />
                            <path d="M3 12.4 C12 11 19 13.2 27.5 11.8" />
                            <path d="M4 20.2 C11 19 21 21 26.5 19.6" />
                        </svg>
                    )}
                </button>
            </div>
            <div className={"wsn-mwrap" + (menuOpen ? " open" : "")}>
                <nav className="wsn-mpanel">
                    {NAV.map((n) => (
                        <a
                            key={n.match}
                            href={n.href}
                            className={isCurrent(n.match) ? "wsn-current" : ""}
                            onClick={() => setMenuOpen(false)}
                        >
                            {n.label}
                        </a>
                    ))}
                    <a
                        href={contactHref}
                        className={isCurrent("contact") ? "wsn-current" : ""}
                        onClick={() => setMenuOpen(false)}
                    >
                        Contact
                    </a>
                    <div className="wsn-msmall">Resources</div>
                    {RESOURCES.map((r) => (
                        <a
                            key={r.label}
                            href={r.href}
                            target={r.external ? "_blank" : undefined}
                            rel={r.external ? "noopener" : undefined}
                            onClick={() => setMenuOpen(false)}
                        >
                            {r.label}
                        </a>
                    ))}
                    <a href={applyHref} className="wsn-mapply" onClick={() => setMenuOpen(false)}>
                        Apply for access →
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
        optionTitles: ["Auto (by URL)", "Home", "The platform", "What we stand for", "Resources", "Contact"],
        defaultValue: "auto",
    },
    craneUrl: { type: ControlType.Image, title: "Crane" },
    wordmarkUrl: { type: ControlType.Image, title: "Wordmark" },
    applyHref: { type: ControlType.Link, title: "Apply link" },
    contactHref: { type: ControlType.Link, title: "Contact link" },
})
