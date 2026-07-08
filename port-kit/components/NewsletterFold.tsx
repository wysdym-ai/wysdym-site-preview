// wysdym port kit · NewsletterFold
// The "Join the wysdym community" email capture: a handwritten-style email
// line + the magenta paper-scrap "Count me in →" button. On submit the form
// gives way to the success note. Set `postUrl` to a real endpoint
// (Formspree/Basin/etc.) to deliver signups — it POSTs JSON {email}
// fire-and-forget. Leave empty for display-only (mockup behavior).
//
// Usage in Framer: drop below the "Join the wysdym community" heading on
// /blog, width Fill (max 560), height Auto.

import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

const CSS = `
.wnf-root{--magenta:#BA6296;--magenta-deep:#8d4874;--ink:#1f2233;--pencil:#3a3f55;--green:#5a8f63;
  --grid-strong:#9fb3c8;--red-pen:#d2553f;font-family:'Inter',sans-serif;width:100%;max-width:560px;}
.wnf-root *{box-sizing:border-box;margin:0;padding:0;}
.wnf-row{display:flex;align-items:flex-end;gap:16px;flex-wrap:wrap;}
.wnf-field{flex:1;min-width:220px;}
.wnf-field label{font-family:'Caveat',cursive;font-size:20px;font-weight:600;color:var(--red-pen);
  display:block;transform:rotate(-1deg);}
.wnf-field input{width:100%;font-family:'Caveat',cursive;font-size:22px;color:var(--ink);background:transparent;
  border:none;border-bottom:2px solid var(--grid-strong);padding:4px 6px;outline:none;}
.wnf-field input:focus{border-bottom-color:var(--red-pen);}
.wnf-btn{font-family:'Caveat',cursive;font-size:21px;font-weight:700;color:#fff;
  background:linear-gradient(180deg,var(--magenta),var(--magenta-deep));border:none;border-radius:2px;
  padding:9px 22px;box-shadow:2px 4px 9px rgba(31,34,51,.28);transform:rotate(-2deg);cursor:pointer;
  transition:transform .15s;white-space:nowrap;}
.wnf-btn:hover{transform:rotate(0) translateY(-1px);}
.wnf-note{font-family:'Caveat',cursive;font-size:23px;font-weight:600;color:var(--green);}
.wnf-note small{display:block;font-size:.68em;color:var(--pencil);font-weight:400;}
.wnf-err{font-family:'Caveat',cursive;font-size:19px;color:var(--red-pen);margin-top:6px;min-height:24px;}
`

function useFonts() {
    React.useEffect(() => {
        if (document.getElementById("wnf-fonts")) return
        const l = document.createElement("link")
        l.id = "wnf-fonts"
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
export default function NewsletterFold(props: any) {
    const {
        label = "your work email",
        placeholder = "name@company.com",
        buttonText = "Count me in →",
        sentText = "✓ You're in — first note lands soon.",
        sentSubtext = "(Wired to the newsletter on the live site.)",
        postUrl = "",
    } = props
    const [email, setEmail] = React.useState("")
    const [sent, setSent] = React.useState(false)
    const [err, setErr] = React.useState("")
    useFonts()

    const submit = (e?: any) => {
        e && e.preventDefault()
        if (sent) return
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setErr("that doesn't look like an email — one more try?")
            return
        }
        setErr("")
        if (postUrl) {
            try {
                fetch(postUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json", Accept: "application/json" },
                    body: JSON.stringify({ email }),
                }).catch(() => {})
            } catch (e) {}
        }
        setSent(true)
    }

    return (
        <div className="wnf-root">
            <style>{CSS}</style>
            {sent ? (
                <div className="wnf-note">
                    {sentText}
                    {sentSubtext ? <small>{sentSubtext}</small> : null}
                </div>
            ) : (
                <form className="wnf-row" onSubmit={submit}>
                    <div className="wnf-field">
                        <label>{label}</label>
                        <input
                            type="email"
                            placeholder={placeholder}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            aria-label="Work email"
                        />
                    </div>
                    <button className="wnf-btn" type="submit">
                        {buttonText}
                    </button>
                    {err ? <div className="wnf-err" style={{ flexBasis: "100%" }}>{err}</div> : null}
                </form>
            )}
        </div>
    )
}

addPropertyControls(NewsletterFold, {
    label: { type: ControlType.String, title: "Label", defaultValue: "your work email" },
    placeholder: { type: ControlType.String, title: "Placeholder", defaultValue: "name@company.com" },
    buttonText: { type: ControlType.String, title: "Button", defaultValue: "Count me in →" },
    sentText: {
        type: ControlType.String,
        title: "Sent text",
        defaultValue: "✓ You're in — first note lands soon.",
    },
    sentSubtext: {
        type: ControlType.String,
        title: "Sent subtext",
        defaultValue: "(Wired to the newsletter on the live site.)",
    },
    postUrl: {
        type: ControlType.String,
        title: "Form endpoint",
        defaultValue: "",
        placeholder: "https://formspree.io/f/…",
    },
})
