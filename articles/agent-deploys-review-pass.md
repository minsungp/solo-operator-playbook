---
title: My coding agent shipped a bug to three pages it wasn't touching
description: How I review production code I didn't write, why the reviewer can't be the same agent that built it, and the checklist that came out of two expensive incidents.
kicker: Engineering
date: 2026-07-28
readingTime: 8 min read
slug: agent-deploys-review-pass
order: 6
---

The spec was simple: restyle the buy button on the product detail pages. Nothing else. The agent implemented it, I skimmed the diff, it looked like a button change, and I shipped it. Within a day I had a report that checkout, cart, and one subscription page had all quietly deformed. The button lived in a shared component, and restyling it for one page had restyled it everywhere that component was used. I've paid for that exact mistake twice, on two different redesigns, months apart, because the first time I fixed the symptom instead of the process.

I run a store with no other engineers. Everything that ships to production goes through a coding agent I treat like a contractor with commit access and a probation period that never ends. My job was never to write the feature. My job is to be able to say, with confidence, "this change is contained to what it claims to touch" — and for a long time I couldn't actually do that, I was just skimming a diff and hoping the file list looked reasonable.

## The naive move, and why it's expensive specifically for a store

The tempting shortcut when you're shipping alone is to let the agent push straight to production for anything that looks small — "it's just a copy change," "it's just a button." A production e-commerce site doesn't forgive that shortcut the way an internal tool would. A checkout bug costs money by the minute it's live, not by the hour someone notices it. So the bar for "small enough to skip review" needs to be near zero, not near "looks small in the diff summary."

The process that actually holds up has five stages, and I don't skip any of them for anything beyond an actual typo fix.

## 1. Spec what must NOT change

Before the agent touches anything, I write the change in plain language, and — this is the part I used to skip — I write down explicitly what must stay identical. "Restyle the buy button on PDPs; checkout, cart, and subscription pages must be pixel-identical." That second sentence is the one that would have caught my original incident before it happened, because it forces the agent (and me) to think about blast radius before writing a line of code, not after a bug report.

## 2. Grep before you restyle anything shared

This is the single rule that came directly out of two incidents, and it's now non-negotiable: before modifying any shared component, the agent greps every usage of it across the codebase and lists them in its change summary, with a one-line impact note per usage. Most of my production incidents trace back to exactly this pattern — a component gets restyled for the page someone's thinking about, and it silently deforms every other page that happens to reuse it. Once you've been burned by this twice, you stop trusting "it's a small change" as a category and start asking "what else uses this file" as a reflex, every time.

[!PITFALL] The shared-component leak happened to me twice on completely different redesigns — a checkout re-theme and, months later, a product-page redesign — and the second time it happened I realized it wasn't bad luck, it was a missing line in my checklist; when the same class of bug recurs on unrelated projects, that's a process gap, not an unlucky week.

## 3. Review with a fresh agent session, not the one that built it

The mistake that undid my early review process for a while was subtler than the shared-component problem: I had the same agent session that implemented the change also review it. The review was a formality every time, because the agent "knew what it meant" — it reviewed its own intentions, not the actual diff. It couldn't be skeptical about a decision it had just made in good faith five minutes earlier.

The fix is to spin up a genuinely fresh session with no memory of the implementation's reasoning, hand it only the spec and the diff, and frame it explicitly as a skeptical reviewer. That framing matters more than it sounds like it should. "Review this as a senior engineer looking for problems" produces a completely different quality of output than "check if this diff matches the spec." Here's how reviewing a diff you didn't write actually differs from writing it in the first place:

| | Implementer's view | Fresh reviewer's view |
|---|---|---|
| Context | Knows what it meant to change | Only knows the stated spec |
| Bias | Confirms its own intent | Hunts for contradictions to the spec |
| Blast radius | Assumes contained if it "felt" contained | Explicitly checks every file touched |
| Business rules | May not have been told them explicitly | Should be handed them as a checklist |

The reviewer's job is specific, not general: hunt for unintended file changes, shared-component blast radius, hardcoded values that should have been config, and violations of business invariants — discount schedules, pricing logic, anything that's a rule rather than a preference. "Looks fine to me" is not a verdict. "Approve" or "request changes, with reasons" is.

## 4. Preview, then smoke test, then production

Nothing goes straight from review to live. It goes to a preview deployment first, and for anything touching money — checkout, cart, subscription flows — I run a full mystery-shopper pass through the actual purchase flow on that preview URL before it goes anywhere near production. This step catches the class of bug that a code review genuinely can't: things that are syntactically fine and logically wrong, like a discount tier that computes correctly for four subscription cadences and silently wrong for the fifth.

Only after that does it go to production. And even then the job isn't done — the agent re-verifies the live site immediately after deploy, as an actual customer would experience it, and takes before-and-after screenshots. "Deployed successfully" and "deployed correctly" are different claims, and only one of them is worth trusting without a look.

## 5. Every incident becomes a permanent checklist line

My deploy checklist is nine lines long. Every line on it is a scar. That's not a rhetorical flourish — I mean it literally traces back to a specific incident that cost me something, and the checklist is the only reason I haven't repeated any of them a third time. When something goes wrong anyway, despite the process, it gets a short postmortem written into the checklist immediately, while the details are fresh, not summarized weeks later from memory.

[!IMPACT] Agency-equivalent development for a store like mine would run somewhere in the low thousands of dollars a month; my tooling costs a fraction of that, and the review process itself has caught revenue-touching bugs before they reached production at least once a quarter — each one worth more on its own than the month's entire tool bill, which is the actual argument for keeping a review pass instead of skipping it to save twenty minutes.

## What review actually looks like when you can't write the code

The honest answer to "how do you review a diff you didn't write and couldn't have written yourself" is that you don't review the code quality. You review containment and invariants. Does the file list match the stated scope. Does anything outside that scope change. Does the change respect the business rules that were true before the change and need to stay true after it — pricing, discount math, anything a customer-facing number depends on. That's a review any operator can learn to do competently without being able to write the feature themselves, and it's the actual skill that makes solo-founder shipping survivable rather than a slow-motion liability.

Here's the prompt pair I actually run — one for the implementer, one for the reviewer, always as two separate sessions:

```
Change spec: [plain-language description]. Must-not-change: [list].
Implement on branch [name]. Requirements:
- Before touching any shared component, grep all usages and list
  them in your summary with an impact note each.
- Respect business invariants: [discount schedule, pricing rules].
- Output: diff summary by file, shared-component impact list,
  and preview URL.
Then STOP. A separate review pass and my approval happen before
any production deploy.
[Reviewer session prompt:] Review this diff against the spec above
as a skeptical senior engineer. Hunt specifically for: files
changed beyond scope, shared-component side effects, and invariant
violations. Verdict: approve / request changes, with reasons.
```

One more habit that came from a genuinely dumb loss: I once had an in-progress redesign wiped out because a working directory got deleted while it was still the active workspace for a session. Commit early, push often, and treat "delete this directory" as an action that needs the same suspicion as a production deploy, because from a data-loss standpoint it basically is one.

None of this makes shipping alone as safe as shipping with a team. It makes the failure modes cheap and specific instead of expensive and vague — which, for a solo operator, is the actual bar worth clearing.
