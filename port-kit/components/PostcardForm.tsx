// wysdym port kit · PostcardForm
// The contact postcard: taped card with a crane "par avion" stamp and
// handwritten fields. On send it folds itself up and flies off the page as
// a paper plane, leaving "✓ Folded & flown" and an unfold-a-fresh-card reset.
//
// Usage in Framer: drop into the contact page flow, width Fill (max 640),
// height Auto. Set `postUrl` to a real form endpoint (Formspree/Basin/etc.)
// to actually deliver messages — it POSTs JSON {name, email, message}
// fire-and-forget before the animation. Leave empty for display-only.

import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

const CSS = `
.wpc-root{--magenta:#BA6296;--magenta-deep:#8d4874;--ink:#1f2233;--pencil:#3a3f55;--paper-2:#f5f3ea;
  --red-pen:#d2553f;--green:#5a8f63;--grid-strong:#9fb3c8;font-family:'Inter',sans-serif;width:100%;position:relative;}
.wpc-root *{box-sizing:border-box;margin:0;padding:0;}
.wpc-card{position:relative;max-width:640px;background:linear-gradient(180deg,#fff,#f9f6ee);
  border:1.5px solid rgba(58,63,85,.35);padding:30px 34px 28px;transform:rotate(-.6deg);
  box-shadow:0 18px 38px -14px rgba(31,34,51,.35);}
.wpc-card::before{content:'';position:absolute;top:-13px;left:44px;width:90px;height:26px;background:rgba(255,244,200,.65);
  transform:rotate(-4deg);border-left:1px dashed rgba(0,0,0,.07);border-right:1px dashed rgba(0,0,0,.07);
  box-shadow:0 1px 3px rgba(0,0,0,.14);}
.wpc-card.sent{animation:wpcFold 1.2s ease-in forwards;pointer-events:none;}
@keyframes wpcFold{
  0%{transform:rotate(-.6deg);}
  45%{transform:perspective(900px) rotateX(72deg) scale(.78);opacity:1;}
  72%{transform:perspective(900px) rotateX(72deg) scale(.4);opacity:.75;}
  100%{transform:perspective(900px) rotateX(72deg) scale(.12);opacity:0;}
}
.wpc-stamp{position:absolute;top:18px;right:20px;width:66px;height:78px;border:2px dashed rgba(58,63,85,.4);
  border-radius:2px;background:var(--paper-2);display:flex;flex-direction:column;align-items:center;
  justify-content:center;gap:2px;transform:rotate(2deg);}
.wpc-stamp img{width:42px;height:42px;object-fit:contain;}
.wpc-stamp span{font-family:'Caveat',cursive;font-size:12px;color:var(--pencil);}
.wpc-field{margin-bottom:18px;}
.wpc-field label{font-family:'Caveat',cursive;font-size:21px;font-weight:600;color:var(--red-pen);display:block;transform:rotate(-1deg);}
.wpc-field input{width:100%;font-family:'Caveat',cursive;font-size:22px;color:var(--ink);background:transparent;border:none;
  border-bottom:2px solid var(--grid-strong);padding:4px 2px;outline:none;}
.wpc-field input:focus{border-bottom-color:var(--red-pen);}
.wpc-field textarea{width:100%;font-family:'Caveat',cursive;font-size:22px;color:var(--ink);background:transparent;border:none;
  outline:none;resize:vertical;min-height:124px;line-height:31px;padding:0 2px;
  background-image:repeating-linear-gradient(180deg, transparent 0 30px, var(--grid-strong) 30px 31px);}
.wpc-send{font-family:'Inter',sans-serif;font-size:14px;font-weight:700;color:#fff;background:var(--magenta-deep);
  border:2px solid var(--ink);border-radius:2px;padding:11px 20px;box-shadow:3px 4px 0 var(--ink);cursor:pointer;
  transition:transform .12s,box-shadow .12s;}
.wpc-send:hover{transform:translate(-1px,-1px);box-shadow:4px 5px 0 var(--ink);}
.wpc-plane{position:absolute;width:68px;left:26%;top:230px;opacity:0;pointer-events:none;z-index:6;
  filter:drop-shadow(2px 5px 5px rgba(31,34,51,.28));}
.wpc-plane.fly{animation:wpcFly 1.6s .5s cubic-bezier(.3,.1,.45,1) forwards;}
@keyframes wpcFly{
  0%{opacity:0;transform:translate(0,0) rotate(2deg) scale(.65);}
  12%{opacity:1;}
  100%{opacity:0;transform:translate(58vw,-62vh) rotate(20deg) scale(1.05);}
}
.wpc-note{display:none;font-family:'Caveat',cursive;font-size:23px;font-weight:600;color:var(--green);margin-top:10px;max-width:520px;}
.wpc-note.show{display:block;}
.wpc-note small{font-size:.8em;color:var(--pencil);font-weight:400;}
.wpc-again{display:inline-block;margin-top:8px;font-family:'Caveat',cursive;font-size:20px;font-weight:600;color:var(--magenta-deep);
  background:none;border:none;border-bottom:1.5px dashed var(--magenta);cursor:pointer;padding:0;}
@media(prefers-reduced-motion:reduce){.wpc-card.sent{animation:none;opacity:0;} .wpc-plane{display:none;}}
`

function useFonts() {
    React.useEffect(() => {
        if (document.getElementById("wpc-fonts")) return
        const l = document.createElement("link")
        l.id = "wpc-fonts"
        l.rel = "stylesheet"
        l.href =
            "https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Caveat:wght@600;700&display=swap"
        document.head.appendChild(l)
    }, [])
}

/**
 * @framerSupportedLayoutWidth fullwidth
 * @framerSupportedLayoutHeight auto
 */
export default function PostcardForm(props: any) {
    const {
        stampUrl = "https://wysdym-ai.github.io/wysdym-site-preview/origami-crane-wysdym.png",
        messagePlaceholder = "Our stack has five agents and none of them talk to each other…",
        sentText = "✓ Folded & flown — we read every note and reply fast.",
        sentSubtext = "",
        postUrl = "",
    } = props
    const [sent, setSent] = React.useState(false)
    const [name, setName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [message, setMessage] = React.useState("")
    useFonts()

    const send = () => {
        if (sent) return
        if (postUrl) {
            try {
                fetch(postUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json", Accept: "application/json" },
                    body: JSON.stringify({ name, email, message }),
                }).catch(() => {})
            } catch (e) {}
        }
        setSent(true)
    }
    const reset = () => {
        setSent(false)
        setName(""); setEmail(""); setMessage("")
    }

    return (
        <div className="wpc-root">
            <style>{CSS}</style>
            <div className={"wpc-card" + (sent ? " sent" : "")}>
                <div className="wpc-stamp" aria-hidden="true">
                    <img src={stampUrl} alt="" />
                    <span>par avion</span>
                </div>
                <div className="wpc-field" style={{ maxWidth: "70%" }}>
                    <label>from</label>
                    <input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="wpc-field" style={{ maxWidth: "70%" }}>
                    <label>work email</label>
                    <input
                        type="email"
                        placeholder="name@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="wpc-field">
                    <label>what's on your mind</label>
                    <textarea
                        placeholder={messagePlaceholder}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>
                <button className="wpc-send" onClick={send}>
                    Send it our way →
                </button>
            </div>
            <svg className={"wpc-plane" + (sent ? " fly" : "")} viewBox="0 0 60 40" aria-hidden="true">
                <path
                    d="M2 26 L56 6 L38 36 L28 24 Z"
                    fill="#f6f0f8"
                    stroke="#8d4874"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                />
                <path d="M28 24 L56 6" stroke="#8d4874" strokeWidth="1.2" />
            </svg>
            <div className={"wpc-note" + (sent ? " show" : "")} style={{ display: undefined }}>
                {sent && (
                    <FadeInNote sentText={sentText} sentSubtext={sentSubtext} onReset={reset} />
                )}
            </div>
        </div>
    )
}

function FadeInNote({ sentText, sentSubtext, onReset }: any) {
    const [visible, setVisible] = React.useState(false)
    React.useEffect(() => {
        const t = setTimeout(() => setVisible(true), 1500)
        return () => clearTimeout(t)
    }, [])
    if (!visible) return null
    return (
        <div className="wpc-note show">
            {sentText}{" "}
            {sentSubtext ? <small>({sentSubtext})</small> : null}
            <br />
            <button className="wpc-again" onClick={onReset}>
                unfold a fresh card ↺
            </button>
        </div>
    )
}

addPropertyControls(PostcardForm, {
    stampUrl: {
        type: ControlType.String,
        title: "Stamp image",
        defaultValue:
            "https://wysdym-ai.github.io/wysdym-site-preview/origami-crane-wysdym.png",
    },
    messagePlaceholder: {
        type: ControlType.String,
        title: "Placeholder",
        displayTextArea: true,
        defaultValue: "Our stack has five agents and none of them talk to each other…",
    },
    sentText: {
        type: ControlType.String,
        title: "Sent text",
        defaultValue: "✓ Folded & flown — we read every note and reply fast.",
    },
    sentSubtext: {
        type: ControlType.String,
        title: "Sent subtext",
        defaultValue: "",
    },
    postUrl: {
        type: ControlType.String,
        title: "Form endpoint",
        defaultValue: "",
        placeholder: "https://formspree.io/f/…",
    },
})
