---
title: I let an agent do my books. It still has to ask first.
description: How I run monthly expense categorization with an AI agent without letting it guess its way into a bad tax filing.
kicker: Finance
date: 2026-07-28
readingTime: 8 min read
slug: ai-bookkeeping
order: 5
---

The first time I let an agent loose on my company's transaction list, it categorized a hospital bill as "staff welfare." I have no staff. I am the staff. It saw a medical merchant, saw a business card, and made a confident, wrong, entirely plausible-looking leap. Nobody caught it for two weeks, because the whole point of automating bookkeeping is that you stop looking at every line.

That single line item is why I now run a rule I'd tell any solo operator to adopt before anything else: an agent categorizing your books must ask before it guesses. Not "flag things it's not sure about eventually." Ask, structurally, every single month, before anything gets written into the real ledger.

## The problem auto-categorization doesn't solve

Every bookkeeping SaaS ships with its own auto-tagging, and it's bad in a specific, predictable way: it categorizes based on merchant type, not context. "Convenience store" becomes... what? Office supplies? A staff meal? Personal groceries picked up on the way home? The tool doesn't know, so it picks something, and if you don't look, that something sits in your books until an accountant or an auditor asks about it.

Left alone, this becomes a quarterly archaeology project. You open the books three months in, find a pile of uncategorized or badly-categorized transactions, and either burn an evening reconstructing what each one was for, or pay your accountant to guess, which is worse, because now someone with no context is making tax-relevant decisions about your business.

The fix isn't a smarter auto-tagger. It's separating the categorization work into three tiers of confidence and treating each one differently.

## High, medium, low — and only one of those gets applied automatically

Here's the actual monthly workflow I run, a few days after month-end once transactions have settled:

1. I keep a one-page categorization rulebook in the agent's memory: recurring merchants mapped to categories (a specific packaging supplier goes to "materials," cloud hosting goes to "infrastructure"), a few amount-based heuristics, and an explicit escape hatch for anything the rulebook doesn't cover.
2. The agent opens the bookkeeping tool, pulls everything uncategorized, and works through it with a confidence label on each line: **high** (it matches the rulebook exactly), **medium** (a reasonable inference, but not a rule match), **low** (genuinely unsure).
3. High-confidence items get applied directly to the books. Medium items go into a short approval list with a one-line reason each. Low items come to me as plain questions — merchant, amount, date — usually five to ten a month, not fifty.
4. Every decision I make on a medium or low item gets written back into the rulebook. The unsure pile shrinks over time because the rulebook actually learns from me, instead of me re-answering the same judgment call every month.
5. Before anything's final, the agent checks its own arithmetic: categorized count plus remaining-uncategorized count has to equal the total number of transactions imported that month. If those numbers don't add up, something got silently dropped, and that's worth catching before it becomes a hole in the filing.

[!PITFALL] Before I forced the confidence column into the output, the agent would categorize with total, unwarranted certainty — that hospital bill filed as staff welfare is the example that made me change the process, and the uncomfortable part is how plausible it looked sitting in a spreadsheet next to fifty correctly-tagged rows; a confidence label plus a mandatory low-confidence escape hatch fixed the vast majority of this on its own.

## Why the audit trail matters more than the speed

The month-end session used to take three to five dreaded hours. Now it's twenty to thirty minutes of me approving or correcting a short list. That speed gain is real, but it's not the part I'd defend if someone pushed back on the whole idea of an agent touching the books. The part I'd defend is the audit trail.

Every automated system that touches money needs to answer one question cheaply: if someone asks "why does this number look different," can you reconstruct the answer in minutes, or does it take an hour of digging? My first pass at this had no answer — exclusions and category changes went into the books with no marker, and when my accountant asked why a total had shifted, reconstructing it took real time I didn't have.

The fix was boring and it worked: every adjustment the agent makes gets a consistent, searchable memo attached — a fixed keyword plus a short reason. Not a note only I'd understand six months later. A memo my accountant, or a future version of me with no memory of this month, can search for and reconstruct instantly. Speed without a trail just moves the archaeology project from "which category" to "why did this change," and that second version is worse because it involves someone else's trust in your books.

[!IMPACT] The direct cost saving is real but modest — my accountant's cleanup billing dropped and clean categorization made a later tax-deduction review straightforward, worth a few hundred dollars a year at minimum — but the bigger, harder-to-price value is what a tax audit doesn't find later, because every exclusion and category decision has a reason attached to it instead of a shrug.

## The personal-vs-business problem is a separate job

Categorization and personal-expense auditing feel like the same task and they are not, and mixing them into one session degrades both. Categorization asks "what bucket does this business expense belong in." The audit asks a completely different question: "did a personal expense leak into the business books at all." When your company card lives in your personal wallet — which for a lot of solo founders it does — pharmacy runs, dinners that weren't really meetings, and one-off personal purchases slide into the same statement as your suppliers and hosting bills. Each one is small. Over six months they add up into a real compliance risk.

I run this as a separate, twice-a-year pass, with a written policy defined before the agent touches anything:

| Bucket | Examples | Agent's action |
|---|---|---|
| Clearly personal | clinics, salons, entertainment venues, home utilities | flag for exclusion |
| Clearly business | suppliers, hosting, shipping | leave alone, no flag needed |
| Ambiguous | convenience stores, solo meals, general retail | leave untouched, list separately |

The critical rule is that ambiguous items are left alone by default. You exclude only what's unambiguously personal. My first attempt got this backwards in both directions — one pass flagged every solo lunch as suspicious, a looser second pass missed something as obvious as home gas bills. It took two iterations of the written policy, not the prompt, to converge on something reasonable. The policy decides, not the agent's judgment call in the moment, because the policy is the thing you can defend to an accountant and the agent's in-the-moment judgment is not.

I still review every flagged line myself before anything gets excluded from the books. This is a twenty-to-forty-minute session, not a formality, because the tax consequences land on me, not on the agent.

## What your accountant actually needs

None of this is really built for me. It's built so that twice a year I can hand a package to someone with far less context than I have and have them trust it without a long phone call. That package needs three things, and none of them are "a bigger spreadsheet":

- A clean categorized ledger where every automated decision has a stated confidence level and, for anything adjusted, a searchable reason attached.
- A short, explicit list of what was excluded as personal and why, so nobody has to reconstruct it from memory.
- Totals that reconcile — imported count, categorized count, excluded count, all adding up to something an accountant can check in one pass rather than trusting blindly.

Here's the actual prompt template I run every month, unedited from what's in my agent's memory:

```
You are my bookkeeper's assistant. Open [bookkeeping tool] and list
all uncategorized transactions for [month]. Categorize each using
this rulebook: [paste rulebook]. For each item output:
merchant | amount | date | category | confidence (H/M/L) | reason.
Apply H items directly. Queue M items for my approval. Ask me about
L items individually. After applying, verify: categorized + remaining
= total imported, and report the three numbers. Flag anything that
looks like a personal expense separately — do not categorize those.
```

The last line in that prompt is doing more work than it looks like. It keeps the two jobs separate even when they're running in the same tool, in the same month, on the same list of transactions. Categorization and personal-expense auditing use different policies, different review cadences, and different levels of scrutiny from me, and the moment you let an agent conflate them, you lose the thing that made this whole exercise trustworthy in the first place: a clear, defensible answer to "why does this number look the way it does."

The agent got faster at this every month. What actually matters is that it got more honest about what it didn't know, and that it never once got to decide what happens to something it wasn't sure about.
