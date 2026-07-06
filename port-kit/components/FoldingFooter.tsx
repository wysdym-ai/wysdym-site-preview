// wysdym port kit · FoldingFooter
// The site footer as a folded sheet: tagline + "unfold the footer ↓" at rest;
// the nav row and the meta row fold down in sequence (rotateX paper fold with
// crease lines). Auto-unfolds when scrolled into view; click always toggles.
//
// Usage in Framer: drop at the bottom of every page, width Fill, height Auto.
// Edit the links in the properties panel. Reduced-motion users see it open.

import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "The platform", href: "/platform" },
    { label: "What we stand for", href: "/stand-for" },
    { label: "Blog", href: "/blog" },
    { label: "2026 GTM AI Stats", href: "https://gtmstats.wysdym.ai" },
    { label: "Apply for access", href: "/apply" },
]
const META_LINKS = [
    { label: "Press kit", href: "/press" },
    { label: "Privacy policy", href: "/privacy" },
    { label: "Contact", href: "/contact" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/wysdym" },
]

const CSS = `
.wff-root{--magenta-deep:#8d4874;--pencil:#3a3f55;font-family:'Inter',sans-serif;width:100%;}
.wff-root *{box-sizing:border-box;margin:0;padding:0;}
.wff-footer{padding:34px 0 50px;text-align:center;border-top:1.5px dashed rgba(58,63,85,.25);position:relative;z-index:1;}
.wff-wrap{max-width:1040px;margin:0 auto;padding:0 32px;}
.wff-top{display:block;width:100%;background:none;border:none;cursor:pointer;padding:0;font:inherit;text-align:center;}
.wff-tag{display:block;font-family:'Caveat',cursive;font-size:26px;font-weight:600;color:var(--magenta-deep);}
.wff-hint{display:inline-block;font-family:'Caveat',cursive;font-size:19px;color:var(--pencil);margin-top:8px;
  transform:rotate(-2deg);border-bottom:1.5px dashed rgba(58,63,85,.4);transition:color .15s;font-weight:600;}
.wff-top:hover .wff-hint{color:var(--magenta-deep);}
.wff-panel{perspective:1000px;max-height:0;overflow:hidden;transition:max-height .6s cubic-bezier(.2,.8,.3,1);}
.wff-face{transform-origin:top center;transform:rotateX(-91deg);opacity:.3;padding-top:18px;margin-top:16px;
  border-top:1.5px dashed rgba(58,63,85,.3);
  background:linear-gradient(180deg, rgba(58,63,85,.05), rgba(58,63,85,0) 55%);
  transition:transform .65s cubic-bezier(.2,.8,.3,1), opacity .45s;}
.wff-footer.open .wff-p1{max-height:420px;}
.wff-footer.open .wff-p1>.wff-face{transform:rotateX(0deg);opacity:1;}
.wff-footer.open .wff-p2{max-height:180px;transition-delay:.26s;}
.wff-footer.open .wff-p2>.wff-face{transform:rotateX(0deg);opacity:1;transition-delay:.26s;}
.wff-links{display:flex;gap:22px;justify-content:center;flex-wrap:wrap;}
.wff-links a{font-family:'Caveat',cursive;font-size:20px;font-weight:600;color:var(--pencil);text-decoration:none;}
.wff-links a:hover{color:var(--magenta-deep);}
.wff-meta{display:flex;gap:18px;justify-content:center;flex-wrap:wrap;font-size:12.5px;color:var(--pencil);}
.wff-meta a{color:inherit;text-decoration:none;border-bottom:1px dashed rgba(58,63,85,.4);}
.wff-meta a:hover{color:var(--magenta-deep);}
@media(prefers-reduced-motion:reduce){
  .wff-panel{max-height:none !important;overflow:visible;}
  .wff-face{transform:none;opacity:1;}
  .wff-hint{display:none;}
}
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
export default function FoldingFooter(props: any) {
    const {
        tagline = "The platform every GTM agent runs on.",
        copyright = "© 2026 wysdym, Inc.",
        hintClosed = "unfold the footer ↓",
        hintOpen = "fold it back ↑",
        autoUnfold = true,
        navLinks = NAV_LINKS,
        metaLinks = META_LINKS,
    } = props
    const rootRef = React.useRef<HTMLDivElement>(null)
    const [open, setOpen] = React.useState(false)
    useFonts()

    React.useEffect(() => {
        if (!autoUnfold || !rootRef.current) return
        if (!("IntersectionObserver" in window)) return
        const ft = rootRef.current.querySelector(".wff-footer") as HTMLElement
        const io = new IntersectionObserver(
            (es) =>
                es.forEach((e) => {
                    if (e.isIntersecting) {
                        setOpen(true)
                        io.disconnect()
                    }
                }),
            { threshold: 0.35 }
        )
        io.observe(ft)
        return () => io.disconnect()
    }, [autoUnfold])

    return (
        <div ref={rootRef} className="wff-root">
            <style>{CSS}</style>
            <footer className={"wff-footer" + (open ? " open" : "")}>
                <div className="wff-wrap">
                    <button
                        className="wff-top"
                        aria-expanded={open}
                        onClick={() => setOpen(!open)}
                    >
                        <span className="wff-tag">{tagline}</span>
                        <span className="wff-hint">
                            {open ? hintOpen : hintClosed}
                        </span>
                    </button>
                    <div className="wff-panel wff-p1">
                        <div className="wff-face">
                            <nav className="wff-links">
                                {navLinks.map((l: any, i: number) => (
                                    <a key={i} href={l.href}>
                                        {l.label}
                                    </a>
                                ))}
                            </nav>
                            <div className="wff-panel wff-p2">
                                <div className="wff-face">
                                    <div className="wff-meta">
                                        {metaLinks.map((l: any, i: number) => (
                                            <a key={i} href={l.href}>
                                                {l.label}
                                            </a>
                                        ))}
                                        <span>{copyright}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

const linkControl = {
    type: ControlType.Object,
    controls: {
        label: { type: ControlType.String, defaultValue: "Link" },
        href: { type: ControlType.Link },
    },
}

addPropertyControls(FoldingFooter, {
    tagline: {
        type: ControlType.String,
        title: "Tagline",
        defaultValue: "The platform every GTM agent runs on.",
    },
    copyright: {
        type: ControlType.String,
        title: "Copyright",
        defaultValue: "© 2026 wysdym, Inc.",
    },
    autoUnfold: {
        type: ControlType.Boolean,
        title: "Auto-unfold",
        defaultValue: true,
    },
    navLinks: {
        type: ControlType.Array,
        title: "Nav links",
        control: linkControl,
        defaultValue: NAV_LINKS,
    },
    metaLinks: {
        type: ControlType.Array,
        title: "Meta links",
        control: linkControl,
        defaultValue: META_LINKS,
    },
})
