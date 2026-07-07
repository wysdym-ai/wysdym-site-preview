// wysdym port kit · PaperPrint
// A product screenshot mounted like a photo print: white border, photo
// corners, uppercase caption, magnifier badge — click to enlarge into a
// lightbox whose close button is a realistic red push-pin ("unpin to close").
//
// Usage in Framer: drop next to each platform component's text column,
// width Fill, height Auto. Pick the image + caption in the properties panel.
// The lightbox renders fullscreen from inside the component.

import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

const CSS = `
.wpp-root{--ink:#1f2233;--grey:#565a70;font-family:'Inter',sans-serif;width:100%;}
.wpp-root *{box-sizing:border-box;margin:0;padding:0;}
.wpp-print{position:relative;background:#fff;padding:15px 15px 40px;box-shadow:0 22px 46px -18px rgba(31,34,51,.4);
  transform:rotate(var(--pr,-1deg));transition:transform .25s;cursor:zoom-in;margin:0;}
.wpp-print:hover{transform:rotate(0) scale(1.015);}
.wpp-print img{display:block;width:100%;background:#1a1833;}
.wpp-pc{position:absolute;width:24px;height:24px;background:linear-gradient(135deg,#efece2,#d9d5c6);box-shadow:0 1px 2px rgba(0,0,0,.15);}
.wpp-pc.tl{top:7px;left:7px;clip-path:polygon(0 0,100% 0,0 100%);}
.wpp-pc.tr{top:7px;right:7px;clip-path:polygon(0 0,100% 0,100% 100%);}
.wpp-pc.bl{bottom:32px;left:7px;clip-path:polygon(0 0,0 100%,100% 100%);}
.wpp-pc.br{bottom:32px;right:7px;clip-path:polygon(100% 0,100% 100%,0 100%);}
.wpp-cap{position:absolute;left:0;right:0;bottom:11px;text-align:center;font-size:10.5px;letter-spacing:.2em;
  text-transform:uppercase;color:var(--grey);}
.wpp-zoom{position:absolute;right:14px;bottom:34px;width:30px;height:30px;border-radius:50%;
  background:rgba(253,252,248,.92);border:1.5px solid rgba(58,63,85,.5);display:flex;align-items:center;
  justify-content:center;color:#3a3f55;box-shadow:0 2px 5px rgba(0,0,0,.18);}
.wpp-zoom svg{width:15px;height:15px;}
.wpp-lb{position:fixed;inset:0;z-index:200;background:rgba(31,34,51,.55);display:none;align-items:center;
  justify-content:center;padding:72px 30px 34px;}
.wpp-lb.show{display:flex;}
.wpp-lbcard{background:#fff;padding:16px 16px 44px;box-shadow:0 30px 70px rgba(0,0,0,.45);
  max-width:min(940px,94vw);position:relative;}
.wpp-lbcard img{display:block;max-width:100%;max-height:calc(100vh - 220px);background:#1a1833;}
.wpp-lbcap{position:absolute;left:0;right:0;bottom:14px;text-align:center;font-size:11px;letter-spacing:.2em;
  text-transform:uppercase;color:var(--grey);}
.wpp-x{position:absolute;top:-32px;left:50%;transform:translateX(-50%);width:46px;height:58px;border:none;
  background:none;cursor:pointer;z-index:5;padding:0;filter:drop-shadow(0 7px 6px rgba(0,0,0,.32));transition:transform .15s;}
.wpp-x svg{width:100%;height:100%;display:block;}
.wpp-x:hover{transform:translateX(-50%) scale(1.07);}
`

const Pin = ({ uid }: { uid: string }) => (
    <svg viewBox="0 0 44 58" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
            <linearGradient id={uid + "H"} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#ff938c" />
                <stop offset=".45" stopColor="#dd4a40" />
                <stop offset="1" stopColor="#8d1f18" />
            </linearGradient>
            <linearGradient id={uid + "C"} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#c8352c" />
                <stop offset="1" stopColor="#7c1a14" />
            </linearGradient>
            <linearGradient id={uid + "M"} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#eef1f4" />
                <stop offset=".5" stopColor="#9aa2ab" />
                <stop offset="1" stopColor="#5d646c" />
            </linearGradient>
        </defs>
        <g transform="rotate(-14 22 28)">
            <path d="M22 46 L20.8 30 L23.2 30 Z" fill={`url(#${uid}M)`} />
            <path d="M20.9 29 L23.1 29 L22.6 40 L21.4 40 Z" fill={`url(#${uid}M)`} />
            <ellipse cx="22" cy="25.5" rx="9.5" ry="4" fill={`url(#${uid}C)`} />
            <path d="M12.5 11 C15 18.5 29 18.5 31.5 11 L30 24 C26 27.5 18 27.5 14 24 Z" fill={`url(#${uid}C)`} />
            <ellipse cx="22" cy="10" rx="13.5" ry="6.5" fill={`url(#${uid}H)`} />
            <ellipse cx="17.5" cy="8" rx="4.6" ry="2" fill="rgba(255,255,255,.65)" />
        </g>
    </svg>
)

/**
 * @framerSupportedLayoutWidth fullwidth
 * @framerSupportedLayoutHeight auto
 */
const ASSET_BASE = "https://wysdym-ai.github.io/wysdym-site-preview/assets/"
const DEFAULT_BY_CAPTION: Record<string, string> = {
    wysdymGraph: "01-wysdymGraph.gif",
    wysdymSkills: "02-wysdymSkills.gif",
    wysdymConnect: "03-wysdymConnect.gif",
    wysdymGateway: "04-wysdymGateway.gif",
    wysdymObserve: "05-wysdymObserve.gif",
    wysdymPlays: "07-wysdymPlays.png",
    Operator: "06-wysdymCopilot.png",
}

export default function PaperPrint(props: any) {
    const { image, caption = "wysdymGraph", rotate = -1 } = props
    const [open, setOpen] = React.useState(false)
    const uid = React.useMemo(
        () => "wpp" + Math.abs((caption + image).split("").reduce((a: number, c: string) => a * 31 + c.charCodeAt(0), 7) % 100000),
        [caption, image]
    )

    React.useEffect(() => {
        if (!open) return
        const onEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false)
        }
        document.addEventListener("keydown", onEsc)
        return () => document.removeEventListener("keydown", onEsc)
    }, [open])

    const src =
        (typeof image === "string" ? image : image?.src) ||
        (DEFAULT_BY_CAPTION[caption]
            ? ASSET_BASE + DEFAULT_BY_CAPTION[caption]
            : undefined)

    return (
        <div className="wpp-root">
            <style>{CSS}</style>
            <figure
                className="wpp-print"
                style={{ "--pr": `${rotate}deg` } as any}
                role="button"
                tabIndex={0}
                aria-label={`Enlarge ${caption}`}
                onClick={() => setOpen(true)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        setOpen(true)
                    }
                }}
            >
                <span className="wpp-pc tl" />
                <span className="wpp-pc tr" />
                <span className="wpp-pc bl" />
                <span className="wpp-pc br" />
                <img src={src} alt={caption} loading="lazy" />
                <figcaption className="wpp-cap">{caption}</figcaption>
                <span className="wpp-zoom" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                        <circle cx="10.5" cy="10.5" r="5.5" />
                        <path d="M15 15l6 6" />
                    </svg>
                </span>
            </figure>
            <div
                className={"wpp-lb" + (open ? " show" : "")}
                aria-hidden={!open}
                onClick={(e) => {
                    if (e.target === e.currentTarget) setOpen(false)
                }}
            >
                <div className="wpp-lbcard">
                    <button
                        className="wpp-x"
                        aria-label="Unpin to close"
                        title="unpin to close"
                        onClick={() => setOpen(false)}
                    >
                        <Pin uid={uid} />
                    </button>
                    {open && <img src={src} alt={caption} />}
                    <div className="wpp-lbcap">{caption} · unpin to close</div>
                </div>
            </div>
        </div>
    )
}

addPropertyControls(PaperPrint, {
    image: { type: ControlType.Image, title: "Image" },
    caption: {
        type: ControlType.String,
        title: "Caption",
        defaultValue: "wysdymGraph",
    },
    rotate: {
        type: ControlType.Number,
        title: "Tilt",
        defaultValue: -1,
        min: -4,
        max: 4,
        step: 0.5,
        unit: "°",
    },
})
