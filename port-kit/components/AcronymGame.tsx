// wysdym port kit · AcronymGame
// "Okay, but what does wysdym actually stand for?" — the acronym guessing
// game from the stand-for page. Letter caps are per-letter crops of the real
// wordmark SVG; visitors write their own guess, shuffle wrong answers, or
// try to reveal it. The real answer is never confirmed in copy (easter egg).
//
// Usage in Framer: drop into the page flow, width Fill (max 820), height
// Auto. Set `wordmarkUrl` to your hosted wordmark SVG (defaults to the
// preview-site asset so it renders out of the box).

import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

const LETTERS = ["w", "y", "s", "d", "y", "m"]
const WINDOWS = [[33, 74], [104, 48], [151, 39], [191, 50], [241, 44], [284, 68]]
const REAL = ["When", "Your", "Stack", "Doesn’t,", "You", "Multiply"]
const WRONG = [
    ["When", "Your", "Stack", "Doesn’t,", "You", "Multiply"],
    ["Why", "Your", "Silos", "Don’t", "Yield…", "Much"],
    ["We’re", "Your", "Shared", "Data-Yielding", "Yarn", "Machine"],
    ["Wildly", "Yearning", "Seamless", "Data,", "Yours", "Mostly"],
    ["Winning", "Your", "SDRs’", "Devotion", "Yearly,", "Maybe"],
    ["Would", "You", "Suddenly", "Deploy", "Your", "Model?"],
]
const REJECT = [
    "Officially: no. Unofficially: we’re writing that one down.",
    "Not it — but honestly better than some of ours.",
    "Nope. The napkin with the real answer stays in the drawer.",
    "Close-ish. The real one has more… revenue in it.",
    "Wrong, but it would look great on a t-shirt.",
]

const CSS = `
.wag-root{--magenta:#BA6296;--magenta-deep:#8d4874;--ink:#1f2233;--pencil:#3a3f55;--paper:#fdfcf8;--paper-2:#f5f3ea;
  --red-pen:#d2553f;--grid-strong:#9fb3c8;font-family:'Inter',sans-serif;color:var(--ink);width:100%;}
.wag-root *{box-sizing:border-box;margin:0;padding:0;}
.wag-card{background:linear-gradient(180deg,#fff,#f3ead7);border:2px solid var(--ink);border-radius:4px;
  padding:34px 30px 26px;box-shadow:6px 8px 0 rgba(58,63,85,.2);max-width:820px;}
.wag-hint{font-family:'Caveat',cursive;font-size:20px;font-weight:600;color:var(--red-pen);margin-bottom:18px;}
.wag-letters{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin:6px 0 22px;}
.wag-letter{flex:1;min-width:110px;text-align:center;}
.wag-letter .wag-cap{display:flex;justify-content:center;align-items:flex-end;height:62px;}
.wag-letter .wag-cap svg{height:58px;width:auto;display:block;filter:drop-shadow(1px 2px 1px rgba(141,72,116,.18));}
.wag-letter .wag-word{font-family:'Caveat',cursive;font-size:24px;font-weight:600;color:var(--ink);
  border-bottom:2px solid var(--grid-strong);min-height:34px;padding:2px 4px;outline:none;transition:background .15s;}
.wag-letter .wag-word[contenteditable="true"]{background:rgba(255,224,102,.35);border-bottom-color:var(--red-pen);}
.wag-ctl{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:8px;}
.wag-btn{font-family:'Inter',sans-serif;font-size:13px;font-weight:700;border:2px solid var(--ink);background:var(--paper-2);
  color:var(--ink);border-radius:2px;padding:9px 16px;box-shadow:3px 3px 0 var(--ink);cursor:pointer;transition:transform .1s,box-shadow .1s;}
.wag-btn:hover{transform:translate(-1px,-1px);box-shadow:4px 4px 0 var(--ink);}
.wag-btn.go{background:var(--magenta-deep);color:#fff;}
.wag-msg{font-family:'Caveat',cursive;font-size:22px;font-weight:600;color:var(--magenta-deep);text-align:center;margin-top:20px;min-height:30px;}
.wag-msg small{font-size:18px;color:var(--pencil);font-weight:400;}
`

function useFonts() {
    React.useEffect(() => {
        if (document.getElementById("wag-fonts")) return
        const l = document.createElement("link")
        l.id = "wag-fonts"
        l.rel = "stylesheet"
        l.href =
            "https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&family=Caveat:wght@600;700&display=swap"
        document.head.appendChild(l)
    }, [])
}

const norm = (s: string) => s.toLowerCase().replace(/[^a-z]/g, "")

/**
 * @framerSupportedLayoutWidth fullwidth
 * @framerSupportedLayoutHeight auto
 */
export default function AcronymGame(props: any) {
    const {
        wordmarkUrl = "https://wysdym-ai.github.io/wysdym-site-preview/wysdym-wordmark-magenta.svg",
        hintText = "Take a guess — write a word for each letter, or check out previous wrong answers for a laugh.",
    } = props
    const rootRef = React.useRef<HTMLDivElement>(null)
    useFonts()

    React.useEffect(() => {
        const root = rootRef.current
        if (!root) return
        const lettersEl = root.querySelector(".wag-letters") as HTMLElement
        const msg = root.querySelector(".wag-msg") as HTMLElement
        const hint = root.querySelector(".wag-hint") as HTMLElement
        const btnGuess = root.querySelector(".wag-guess") as HTMLElement
        const btnSubmit = root.querySelector(".wag-submit") as HTMLElement
        const btnDice = root.querySelector(".wag-dice") as HTMLElement
        const btnReveal = root.querySelector(".wag-reveal") as HTMLElement
        let words = REAL.slice(), diceIdx = 0, editing = false

        function render() {
            lettersEl.innerHTML = ""
            LETTERS.forEach((L, i) => {
                const d = document.createElement("div")
                d.className = "wag-letter"
                const W = WINDOWS[i]
                const cap = `<svg viewBox="${W[0]} 3 ${W[1]} 82" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${L}"><image href="${wordmarkUrl}" x="0" y="0" width="400" height="100"/></svg>`
                d.innerHTML = `<div class="wag-cap">${cap}</div><div class="wag-word" data-i="${i}" ${editing ? 'contenteditable="true"' : ""}>${words[i]}</div>`
                lettersEl.appendChild(d)
            })
        }
        render()

        const onDice = () => {
            editing = false
            ;(btnSubmit as HTMLElement).style.display = "none"
            diceIdx = (diceIdx + 1) % WRONG.length
            words = WRONG[diceIdx].slice()
            render()
            msg.textContent =
                diceIdx === 1
                    ? "Ooh, that one’s honestly growing on us."
                    : "Nope. But keep them coming."
        }
        const onGuess = () => {
            editing = true
            words = ["", "", "", "", "", ""]
            render()
            hint.textContent = "Your turn — write a word on each line, then submit."
            msg.textContent = ""
            ;(btnSubmit as HTMLElement).style.display = ""
            const first = lettersEl.querySelector(".wag-word") as HTMLElement
            if (first) first.focus()
        }
        const onSubmit = () => {
            const ws = [...lettersEl.querySelectorAll(".wag-word")].map((w) =>
                (w.textContent || "").trim()
            )
            if (ws.some((w) => !w)) {
                msg.textContent = "Six lines, six words — fill them all in ✎"
                return
            }
            const guess = ws.join(" ")
            if (ws.every((w, i) => norm(w) === norm(REAL[i]))) {
                msg.innerHTML =
                    "“" + guess + "” — …that’s eerily close. We’ll neither confirm nor deny. 👀"
            } else {
                msg.innerHTML =
                    "“" + guess + "” — " + REJECT[Math.floor(Math.random() * REJECT.length)]
            }
        }
        const onReveal = () => {
            editing = false
            ;(btnSubmit as HTMLElement).style.display = "none"
            words = REAL.slice()
            render()
            msg.innerHTML =
                "We’re not going to give it up THAT easily — we’ll share it one day…<br><small>(Though “Why Your Silos Don’t Yield… Much” is honestly growing on us.)</small>"
        }
        const onKey = (e: KeyboardEvent) => {
            const t = e.target as HTMLElement
            if (!t.classList.contains("wag-word") || e.key !== "Enter") return
            e.preventDefault()
            const all = [...lettersEl.querySelectorAll(".wag-word")] as HTMLElement[]
            const i = all.indexOf(t)
            if (i < all.length - 1) all[i + 1].focus()
            else onSubmit()
        }
        btnDice.addEventListener("click", onDice)
        btnGuess.addEventListener("click", onGuess)
        btnSubmit.addEventListener("click", onSubmit)
        btnReveal.addEventListener("click", onReveal)
        lettersEl.addEventListener("keydown", onKey)
        return () => {
            btnDice.removeEventListener("click", onDice)
            btnGuess.removeEventListener("click", onGuess)
            btnSubmit.removeEventListener("click", onSubmit)
            btnReveal.removeEventListener("click", onReveal)
            lettersEl.removeEventListener("keydown", onKey)
        }
    }, [wordmarkUrl])

    return (
        <div ref={rootRef} className="wag-root">
            <style>{CSS}</style>
            <div className="wag-card">
                <div className="wag-hint">{hintText}</div>
                <div className="wag-letters" />
                <div className="wag-ctl">
                    <button className="wag-btn go wag-guess">✎ Write your own</button>
                    <button
                        className="wag-btn go wag-submit"
                        style={{ display: "none" }}
                    >
                        ✓ Submit my guess
                    </button>
                    <button className="wag-btn wag-dice">😂 Wrong guesses</button>
                    <button className="wag-btn wag-reveal">Reveal the answer</button>
                </div>
                <div className="wag-msg" />
            </div>
        </div>
    )
}

addPropertyControls(AcronymGame, {
    wordmarkUrl: {
        type: ControlType.String,
        title: "Wordmark URL",
        defaultValue:
            "https://wysdym-ai.github.io/wysdym-site-preview/wysdym-wordmark-magenta.svg",
    },
    hintText: {
        type: ControlType.String,
        title: "Hint",
        displayTextArea: true,
        defaultValue:
            "Take a guess — write a word for each letter, or check out previous wrong answers for a laugh.",
    },
})
