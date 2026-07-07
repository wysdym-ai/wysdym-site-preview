// wysdym port kit · FAQAccordion
// The FAQ rows from Home as working fold-toggles: each question carries a
// folded paper corner that peels open, and the answer folds down (rotateX)
// like lifting a flap. Replaces the static Q/A rows.
//
// Usage in Framer: drop below the FAQ heading, width Fill, height Auto.
// Questions/answers editable in the properties panel.

import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

const DEFAULT_ITEMS = [
    { q: "What is wysdym?", a: "Wysdym is the platform every go-to-market (GTM) AI agent runs on — the harness beneath the agents, not another agent. It gives every agent shared memory, a skills library, connected integrations, governance, and an outcome feedback loop, so each one inherits the same grounding, acts on your terms, and compounds instead of drifting." },
    { q: "What is “the harness” in go-to-market?", a: "The harness is the infrastructure layer that sits underneath AI agents — shared memory, skills, integrations, governance, and a feedback loop. Most GTM teams already run several agents in parallel; the harness is what lets those agents share context and get smarter together instead of operating in isolated silos." },
    { q: "How is wysdym different from an AI agent or a sales copilot?", a: "Agents and copilots do tasks; wysdym is the layer they run on. Rather than adding one more agent, wysdym makes the agents you already use better — grounding them in your knowledge, governing what they can do, and learning from every outcome. It's a substrate, not a competitor: as foundation models improve, wysdym gets more useful, not less." },
    { q: "Does wysdym replace the AI agents we already use?", a: "No. Wysdym is agent- and CRM-agnostic — it's the layer your existing and future agents plug into over MCP (the Model Context Protocol). It ships with Operator, a working reference agent, but you keep whatever agents you prefer; wysdym simply gives them shared memory, common guardrails, and a way to compound." },
    { q: "Why do GTM teams need a harness for their AI agents?", a: "Because isolated agents don't compound — and what doesn't compound doesn't grow revenue. Each agent keeps its own memory, wires up the same integrations separately, and runs with no shared governance or feedback. Gartner projects 40% of agentic AI projects will be cancelled by the end of 2027, largely over cost and governance — a shared harness is built to close exactly those gaps." },
    { q: "Is wysdym available today?", a: "Yes — selectively. wysdym is live and running, and interest has run well ahead of what we can onboard. Rather than open the doors, we're hand-picking a small cohort of customers to work with directly. If that's you, apply — we read every application and take on the ones we can go deepest with." },
]

const CSS = `
.wfq-root{--magenta:#BA6296;--ink:#1f2233;--pencil:#3a3f55;font-family:'Inter',sans-serif;width:100%;max-width:820px;}
.wfq-root *{box-sizing:border-box;margin:0;padding:0;}
.wfq-item{border-bottom:1.5px dashed rgba(58,63,85,.3);padding:16px 0;cursor:pointer;}
.wfq-q{font-family:'Caveat',cursive;font-size:23px;font-weight:600;color:var(--ink);display:flex;justify-content:space-between;gap:12px;align-items:flex-start;}
.wfq-tw{color:var(--magenta);flex:none;margin-top:3px;transition:transform .25s;}
.wfq-tw svg{width:20px;height:20px;display:block;}
.wfq-flap{transform-origin:3.5px 3.5px;transition:transform .4s cubic-bezier(.2,.8,.3,1);}
.wfq-item:hover .wfq-tw{transform:rotate(-4deg);}
.wfq-item.open .wfq-flap{transform:scale(.28);}
.wfq-a{font-size:15px;color:var(--pencil);line-height:1.6;max-height:0;overflow:hidden;
  transform:perspective(700px) rotateX(-28deg);transform-origin:top center;
  transition:max-height .38s ease,transform .45s cubic-bezier(.2,.8,.3,1);}
.wfq-item.open .wfq-a{max-height:340px;margin-top:10px;transform:perspective(700px) rotateX(0deg);}
@media(prefers-reduced-motion:reduce){
  .wfq-a{transform:none;transition:max-height .2s ease;}
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
export default function FAQAccordion(props: any) {
    const { items = DEFAULT_ITEMS } = props
    const [open, setOpen] = React.useState<number | null>(null)
    useFonts()

    return (
        <div className="wfq-root">
            <style>{CSS}</style>
            {items.map((it: any, i: number) => (
                <div
                    key={i}
                    className={"wfq-item" + (open === i ? " open" : "")}
                    onClick={() => setOpen(open === i ? null : i)}
                    role="button"
                    tabIndex={0}
                    aria-expanded={open === i}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault()
                            setOpen(open === i ? null : i)
                        }
                    }}
                >
                    <div className="wfq-q">
                        <span>{it.q}</span>
                        <span className="wfq-tw" aria-hidden="true">
                            <svg viewBox="0 0 22 22">
                                <path
                                    d="M3.5 3.5 H18.5 V18.5 H3.5 Z"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeDasharray="2.5 3"
                                />
                                <path
                                    className="wfq-flap"
                                    d="M3.5 3.5 L18.5 3.5 L3.5 18.5 Z"
                                    fill="currentColor"
                                    opacity=".85"
                                />
                            </svg>
                        </span>
                    </div>
                    <div className="wfq-a">{it.a}</div>
                </div>
            ))}
        </div>
    )
}

addPropertyControls(FAQAccordion, {
    items: {
        type: ControlType.Array,
        title: "Questions",
        control: {
            type: ControlType.Object,
            controls: {
                q: { type: ControlType.String, title: "Q" },
                a: {
                    type: ControlType.String,
                    title: "A",
                    displayTextArea: true,
                },
            },
        },
        defaultValue: DEFAULT_ITEMS,
    },
})
