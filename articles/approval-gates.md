---
title: The one rule that lets me run a company with no employees
description: Agents draft, I approve, agents execute. That single sentence, enforced in three places at once, is the whole reason none of this has blown up yet.
kicker: Guardrails
date: 2026-07-28
readingTime: 8 min read
slug: approval-gates
order: 4
---

There's a specific bad day every solo founder running agents pictures at least once: money leaves an account that shouldn't have left it, a legal document gets filed that shouldn't have been filed, a public post goes out that shouldn't have gone out. Not because the agent was malicious. Because it was confident, and confidently wrong, and nobody was standing between the decision and the action. That fear is the reason most founders keep AI at "chat toy" status — useful for drafting an email, too dangerous to trust with anything that touches the real world.

The mistake in that fear is the word "trust." You do not need to trust an agent to run a company on one. You need to design a system where trust was never the load-bearing part. That system is a lot simpler than it sounds: agents draft, I approve, agents execute. The entire discipline of running a company with zero employees comes down to enforcing that one sentence well enough that it never quietly stops being true.

## Sorting actions by whether you can take them back

The first real decision isn't about any particular workflow. It's a classification you make once, up front, and apply everywhere: how reversible is this action, really?

Some things are freely reversible — drafts, internal research notes, a categorization that's easy to relabel later. Those need no gate at all; gating them just adds friction with no safety benefit. Some things are reversible but cost something to undo — a code deploy, a listing change, a bookkeeping entry that's wrong. Those get process gates: a review pass, a check against known-good state, a second look before anything ships. And some things are not reversible, full stop, or reach outside your own systems into the world: sending money, submitting a government application, posting publicly, emailing a customer, agreeing to a contract. Those get a hard human gate, with no exceptions carved out for routine-feeling cases, because "this one's routine" is exactly the sentence that precedes most gate failures.

| Class | Examples | Gate |
|---|---|---|
| A — freely reversible | Drafts, internal notes, research summaries | None |
| B — reversible with cost | Deploys, listing edits, expense categorization | Process gate: review pass, invariant check |
| C — irreversible or external | Payments, government submissions, public posts, customer emails, contracts | Hard human gate, always |

The temptation is to let category C shrink over time as an agent proves itself reliable in category B. Resist that. Reliability in one class says nothing about the next one, and the cost of being wrong in class C is not symmetric with the cost of being wrong in class B.

## One gate is not enough

A gate that lives only as an instruction in a prompt — "draft this, never send it" — will eventually fail, not because the model is malicious but because language is ambiguous and instructions get reinterpreted under pressure. I lost one that way: an instruction to "handle the customer reply" got read as license to send a response, when what I meant was closer to "handle" as in "prepare a response for me to send." Handle isn't send. It's close enough, under the wrong reading, to be genuinely dangerous.

That's why the gate has to exist in three separate layers, each one catching what the layer before it might miss:

- **Prompt-level**: the instruction itself says "draft, never send," stated plainly in every task.
- **Workflow-level**: the tooling itself stages the draft somewhere that sending requires a manual click from me — not a matter of the agent choosing to stop, but a mechanical fact about how the tool works.
- **Platform-level**: the agent structurally lacks the permission — a read-only API key instead of a write one, a spend cap set inside the ad platform itself, no bank transfer authority on the account at all.

Any one layer can fail on its own. All three failing on the same action, at the same time, is a much smaller probability, and that's the actual point of stacking them. You're not trying to build a perfect gate. You're trying to make sure no single point of failure is load-bearing.

## The "never list," written down and loaded every time

Beyond the reversibility classification, there's a short, explicit list of absolute prohibitions I keep in memory and load with every task, regardless of workflow: never enter my national ID number or a card's security code anywhere, never sign or consent to a contract, never final-submit a government application, never send money, never tell a customer something is finished before verified state actually confirms it's finished.

That last one deserves its own callout, because it's the failure mode that shows up most often and is easiest to miss:

[!PITFALL] A click is not a confirmation — after any state-changing action, the only thing worth trusting is what the resulting screen actually shows, not what the agent's own summary claims happened, because agents report actions while reality reports outcomes, and those two things silently diverge more often than feels comfortable to admit.

I've had a refund reported as processed that the payment gateway had actually blocked behind a limit I didn't know existed. I've had a listing update reported as live that hadn't actually rendered on the storefront. I've had an API call reported as successful that had, in fact, returned a 404 the whole time. None of those were caught by trusting the agent's report. All of them were caught by looking at the actual resulting state before believing anything was done.

```
Standing guardrails (load with every task):
- Action classes: A) reversible → proceed; B) costly-reversible →
  follow the process gate for that workflow; C) irreversible
  (payments, submissions, public posts, customer comms, contracts,
  deletions) → PREPARE ONLY, stage for my explicit approval.
- Never list: [your absolute prohibitions].
- A click is not a confirmation: after any state-changing action,
  verify the resulting state on screen before reporting it done.
- If you are unsure which class an action is, treat it as C and ask.
Violations of this block are the only unforgivable failure mode.
```

## Make the gate cheap or you'll erode it yourself

Here's the part that surprised me most: the biggest threat to a gate isn't the agent going rogue. It's me, months in, deciding the gate has become unnecessary friction. After enough clean grant-application drafts in a row, auto-submission started to feel obviously safe — it wasn't a big leap, it felt like removing a formality. The week I came closest to actually loosening that rule, the draft sitting in front of me for review contained an eligibility claim that had quietly gone stale since the profile was last checked against my real registration documents. The gate didn't just catch a paperwork error that time. It caught my own complacency, at the exact moment complacency was about to become policy.

The practical fix is making the gate cheap enough to operate that skipping it never looks tempting on a busy day. Batched digests instead of one-off pings. One-tap approvals instead of multi-step review. Pre-formatted views — a dashboard, a staged draft folder — so reviewing costs seconds instead of minutes. An expensive gate gets bypassed by exactly the person the gate was supposed to protect: you, on the day you're too busy to do it properly.

[!IMPACT] Gates cost roughly 20 to 40 minutes of my day in approvals, which is now genuinely the core of my job, and it's a good trade for the 4 to 6 hours of doing they replace — the real payoff is that the downside of any single agent failure is bounded at minutes of review instead of an actual incident, which is the property that makes it sane to run all the rest of this on a business with real money in it.

## Testing the gate like you test a backup

The last habit worth stealing is the one that feels the most paranoid and pays off the most reliably: periodically ask an agent to attempt a gated action in a sandbox, on purpose, and confirm it refuses or stages rather than executes. A backup you've never restored from isn't a backup, it's a hope. A gate you've never watched fail closed is the same thing. Every actual near-miss gets written down and traced back to the specific layer that should have caught it — a missing checklist line, not a bad agent — because the discipline that matters here isn't punishing the agent for the mistake. It's making sure the same mistake has no path back into the system.

None of this is about distrust of the technology. It's closer to the opposite: the gates are what make it safe to hand over as much as I actually have, because the cost of any one thing going wrong stays bounded no matter how much surface area the agents are covering. That bound is the entire reason a company with zero employees can carry real money, real customers, and real legal exposure without it being reckless.
