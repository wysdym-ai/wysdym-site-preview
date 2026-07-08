// wysdym port kit · SeoFaqSchema
// Injects FAQPage JSON-LD (schema.org) into <head> so Google can show the
// Home-page FAQ as rich results. Renders nothing on the live site; on the
// Framer canvas it shows a small "SEO" chip so you can find it again.
//
// Usage in Framer: drop ONE instance anywhere on the Home page (bottom of
// the layer stack is fine, 40x18). Keep the questions in sync with
// FAQAccordion if the FAQ copy ever changes.

import * as React from "react"
import { addPropertyControls, ControlType, RenderTarget } from "framer"

const FAQ = [
    { q: "What is wysdym?", a: "Wysdym is the platform every go-to-market (GTM) AI agent runs on — the harness beneath the agents, not another agent. It gives every agent shared memory, a skills library, connected integrations, governance, and an outcome feedback loop, so each one inherits the same grounding, acts on your terms, and compounds instead of drifting." },
    { q: "What is “the harness” in go-to-market?", a: "The harness is the infrastructure layer that sits underneath AI agents — shared memory, skills, integrations, governance, and a feedback loop. Most GTM teams already run several agents in parallel; the harness is what lets those agents share context and get smarter together instead of operating in isolated silos." },
    { q: "How is wysdym different from an AI agent or a sales copilot?", a: "Agents and copilots do tasks; wysdym is the layer they run on. Rather than adding one more agent, wysdym makes the agents you already use better — grounding them in your knowledge, governing what they can do, and learning from every outcome. It's a substrate, not a competitor: as foundation models improve, wysdym gets more useful, not less." },
    { q: "Does wysdym replace the AI agents we already use?", a: "No. Wysdym is agent- and CRM-agnostic — it's the layer your existing and future agents plug into over MCP (the Model Context Protocol). It ships with Operator, a working reference agent, but you keep whatever agents you prefer; wysdym simply gives them shared memory, common guardrails, and a way to compound." },
    { q: "Why do GTM teams need a harness for their AI agents?", a: "Because isolated agents don't compound — and what doesn't compound doesn't grow revenue. Each agent keeps its own memory, wires up the same integrations separately, and runs with no shared governance or feedback. Gartner projects 40% of agentic AI projects will be cancelled by the end of 2027, largely over cost and governance — a shared harness is built to close exactly those gaps." },
    { q: "Is wysdym available today?", a: "Yes — selectively. wysdym is live and running, and interest has run well ahead of what we can onboard. Rather than open the doors, we're hand-picking a small cohort of customers to work with directly. If that's you, apply — we read every application and take on the ones we can go deepest with." },
]

/**
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight fixed
 */
export default function SeoFaqSchema() {
    React.useEffect(() => {
        if (document.getElementById("wsf-faq-jsonld")) return
        const s = document.createElement("script")
        s.id = "wsf-faq-jsonld"
        s.type = "application/ld+json"
        s.text = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
        })
        document.head.appendChild(s)
        return () => {
            s.remove()
        }
    }, [])

    const onCanvas =
        typeof RenderTarget !== "undefined" &&
        RenderTarget.current() === RenderTarget.canvas
    if (!onCanvas) return null
    return (
        <div
            title="FAQPage JSON-LD — invisible on the live site"
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#BA6296",
                color: "#fff",
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: ".08em",
                fontFamily: "Inter, sans-serif",
                borderRadius: 4,
            }}
        >
            SEO
        </div>
    )
}

addPropertyControls(SeoFaqSchema, {})
