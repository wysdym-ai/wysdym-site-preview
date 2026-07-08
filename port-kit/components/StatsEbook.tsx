// wysdym port kit · StatsEbook
// The 2026 GTM AI Statistics reference page dressed up as a real asset: a
// pinned report cover with a page stack, magenta title band, dog-ear corner,
// and the red pushpin holding it to the notebook. Drop it beside the featured
// resource card on /blog (about 210x290, tilt ~2.5°).

import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

const CSS = `
.web-root{--magenta:#BA6296;--magenta-deep:#8d4874;--ink:#1f2233;--pencil:#3a3f55;--gold:#C9992E;
  font-family:'Inter',sans-serif;width:100%;height:100%;display:flex;align-items:center;justify-content:center;}
.web-root *{box-sizing:border-box;margin:0;padding:0;}
.web-book{position:relative;width:100%;max-width:230px;aspect-ratio:210/290;transform:rotate(var(--tilt,2.5deg));
  filter:drop-shadow(6px 14px 18px rgba(31,34,51,.32));transition:transform .25s;}
.web-book:hover{transform:rotate(0deg) translateY(-3px);}
/* page stack peeking out right + bottom */
.web-pages{position:absolute;inset:0;}
.web-pages i{position:absolute;inset:0;background:#f4f1e7;border:1px solid rgba(58,63,85,.18);border-radius:2px 4px 4px 2px;}
.web-pages i:nth-child(1){transform:translate(5px,5px) rotate(.6deg);}
.web-pages i:nth-child(2){transform:translate(3px,3px) rotate(-.4deg);background:#faf8f0;}
/* the cover */
.web-cover{position:absolute;inset:0;background:linear-gradient(160deg,#ffffff,#faf7ef 70%,#f1ede0);
  border:1.5px solid rgba(58,63,85,.35);border-radius:2px 4px 4px 2px;overflow:hidden;
  display:flex;flex-direction:column;padding:9% 9% 8%;}
/* spine shading */
.web-cover::before{content:'';position:absolute;top:0;bottom:0;left:0;width:9%;
  background:linear-gradient(90deg,rgba(31,34,51,.14),rgba(31,34,51,0));pointer-events:none;}
/* faint ruled lines like the notebook */
.web-cover::after{content:'';position:absolute;inset:0;
  background:repeating-linear-gradient(180deg,transparent 0 22px,rgba(126,162,204,.16) 22px 23px);pointer-events:none;}
.web-kicker{font-family:'Caveat',cursive;font-size:15px;font-weight:600;color:var(--pencil);transform:rotate(-1.4deg);}
.web-band{position:relative;margin:7% -12% 0;background:linear-gradient(180deg,var(--magenta),var(--magenta-deep));
  padding:9% 14%;transform:rotate(-1.6deg);box-shadow:0 3px 8px rgba(31,34,51,.25);}
.web-band .web-year{font-family:'Caveat',cursive;font-size:clamp(20px,17cqw,34px);font-weight:700;color:rgba(255,255,255,.85);line-height:1;}
.web-band .web-title{font-size:clamp(13px,10cqw,21px);font-weight:800;letter-spacing:-.02em;color:#fff;line-height:1.12;margin-top:2px;}
.web-sub{margin-top:11%;font-size:clamp(9px,5.4cqw,11.5px);line-height:1.5;color:var(--pencil);}
.web-sub b{color:var(--ink);}
.web-badge{margin-top:auto;display:flex;align-items:center;gap:6px;}
.web-badge img{width:24px;height:24px;object-fit:contain;}
.web-badge span{font-family:'Caveat',cursive;font-size:14px;font-weight:600;color:var(--magenta-deep);}
.web-free{position:absolute;right:4%;top:3%;transform:rotate(8deg);font-family:'Caveat',cursive;
  font-size:12px;font-weight:700;color:var(--gold);border:1.8px solid var(--gold);border-radius:50%;
  padding:7px 5px;line-height:1.05;max-width:32%;text-align:center;opacity:.9;}
/* dog-ear folded corner */
.web-ear{position:absolute;right:-1px;bottom:-1px;width:15%;aspect-ratio:1;
  background:linear-gradient(315deg,transparent 48%,#e7e2d2 50%,#d8d3c1 100%);
  clip-path:polygon(100% 0,0 100%,100% 100%);
  filter:drop-shadow(-2px -2px 2px rgba(31,34,51,.12));}
/* the red pushpin */
.web-pin{position:absolute;top:-8%;left:50%;transform:translateX(-50%);width:19%;aspect-ratio:44/58;z-index:5;
  filter:drop-shadow(0 6px 5px rgba(0,0,0,.3));}
.web-pin svg{width:100%;height:100%;display:block;}
`

const Pin = () => (
    <svg viewBox="0 0 44 58" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
            <linearGradient id="webPinH" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#ff938c" />
                <stop offset=".45" stopColor="#dd4a40" />
                <stop offset="1" stopColor="#8d1f18" />
            </linearGradient>
            <linearGradient id="webPinC" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#c8352c" />
                <stop offset="1" stopColor="#7c1a14" />
            </linearGradient>
            <linearGradient id="webPinM" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#eef1f4" />
                <stop offset=".5" stopColor="#9aa2ab" />
                <stop offset="1" stopColor="#5d646c" />
            </linearGradient>
        </defs>
        <g transform="rotate(-14 22 28)">
            <path d="M22 46 L20.8 30 L23.2 30 Z" fill="url(#webPinM)" />
            <path d="M20.9 29 L23.1 29 L22.6 40 L21.4 40 Z" fill="url(#webPinM)" />
            <ellipse cx="22" cy="25.5" rx="9.5" ry="4" fill="url(#webPinC)" />
            <path d="M12.5 11 C15 18.5 29 18.5 31.5 11 L30 24 C26 27.5 18 27.5 14 24 Z" fill="url(#webPinC)" />
            <ellipse cx="22" cy="10" rx="13.5" ry="6.5" fill="url(#webPinH)" />
            <ellipse cx="17.5" cy="8" rx="4.6" ry="2" fill="rgba(255,255,255,.65)" />
        </g>
    </svg>
)

function useFonts() {
    React.useEffect(() => {
        if (document.getElementById("web-fonts")) return
        const l = document.createElement("link")
        l.id = "web-fonts"
        l.rel = "stylesheet"
        l.href =
            "https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&family=Caveat:wght@600;700&display=swap"
        document.head.appendChild(l)
    }, [])
}

/**
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight fixed
 */
export default function StatsEbook(props: any) {
    const {
        kicker = "the reference sheet",
        year = "2026",
        title = "GTM AI Statistics",
        subtitle = "52 sourced stats on agents, governance & spend — every citable number in one place.",
        badge = "free · always current",
        tilt = 2.5,
    } = props
    useFonts()
    return (
        <div className="web-root" style={{ containerType: "inline-size" } as any}>
            <style>{CSS}</style>
            <div className="web-book" style={{ "--tilt": `${tilt}deg` } as any}>
                <div className="web-pages" aria-hidden="true"><i></i><i></i></div>
                <div className="web-cover">
                    <div className="web-kicker">{kicker} ↓</div>
                    <div className="web-band">
                        <div className="web-year">{year}</div>
                        <div className="web-title">{title}</div>
                    </div>
                    <div className="web-sub"><b>{subtitle.split("—")[0]}</b>{subtitle.includes("—") ? "— " + subtitle.split("—").slice(1).join("—") : ""}</div>
                    <div className="web-badge">
                        <img src="https://wysdym-ai.github.io/wysdym-site-preview/origami-crane-wysdym.png" alt="" />
                        <span>by wysdym</span>
                    </div>
                    <div className="web-free">{badge}</div>
                </div>
                <div className="web-ear" aria-hidden="true"></div>
                <div className="web-pin" aria-hidden="true"><Pin /></div>
            </div>
        </div>
    )
}

addPropertyControls(StatsEbook, {
    kicker: { type: ControlType.String, title: "Kicker", defaultValue: "the reference sheet" },
    year: { type: ControlType.String, title: "Year", defaultValue: "2026" },
    title: { type: ControlType.String, title: "Title", defaultValue: "GTM AI Statistics" },
    subtitle: {
        type: ControlType.String,
        title: "Subtitle",
        displayTextArea: true,
        defaultValue: "52 sourced stats on agents, governance & spend — every citable number in one place.",
    },
    badge: { type: ControlType.String, title: "Badge", defaultValue: "free · always current" },
    tilt: { type: ControlType.Number, title: "Tilt", defaultValue: 2.5, min: -6, max: 6, step: 0.5, unit: "°" },
})
