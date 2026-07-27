---
title: Six things I stopped trying to automate
description: A solo founder's field notes on where automation quietly costs more than doing the task by hand, and the filter that now catches it early.
kicker: Judgment
date: 2026-07-28
readingTime: 8 min read
slug: when-not-to-automate
order: 7
---

I spent most of a month building a listing-creation workflow for my products, and I rebuilt it four times before I admitted the actual problem: my listing format was still changing every week. I wasn't automating a process. I was automating a moving target, which meant every automation run needed its own manual fix afterward, which is a worse position than just doing the task by hand in the first place. I eventually killed the workflow, did listings manually for six more weeks until the format genuinely stopped changing, and only then rebuilt it — in an afternoon, correctly, because by then there was actually something stable to automate.

Running a company with agents instead of employees makes automation feel free. It isn't. Every workflow you build is a small system you now own — it can break, drift, and quietly mislead you, and someone has to notice when it does. That someone is still you. The real skill isn't finding things to automate. It's noticing, early, which things will cost you more automated than manual. Here are six specific shapes that keeps showing up.

## 1. The one-off wearing a recurring-task costume

Some tasks feel like they'll happen again because they're annoying, not because they actually will. I've caught myself starting to build a workflow for something that, on reflection, I was only ever going to do once or twice — a specific one-time filing, a single vendor negotiation, a report I needed exactly once for exactly one audience. The tell is asking, honestly, "will this happen ten more times in the next year." If the answer is no, or "maybe, vaguely," the correct move is to just do it, by hand, this one time. Building infrastructure for a task that never recurs is pure sunk cost with no future payoff, and the build time alone often exceeds just doing the thing.

## 2. Work where the judgment IS the job

Some tasks look like execution but are actually judgment wearing execution's clothes. Final creative taste calls are the clearest example I have. Brand voice drift is cumulative and close to invisible in any single decision — one slightly-off caption, one slightly-generic product description — but it compounds silently until the brand doesn't sound like anything anymore. An agent can draft ten variations and even rank them by a stated rubric, but the actual decision of "this is the one that sounds like us" is the job itself, not a step before the job. Automating that step doesn't save time on the real work; it replaces the real work with something that resembles it.

[!PITFALL] I let a semi-automated version of a partner email go out that was factually perfect and relationally tone-deaf — every fact in it was correct, and it still cost more goodwill to repair than a hundred fully-automated tasks had saved me that quarter, which is what convinced me relationship weight needed to be a first-class filter question, not an afterthought.

## 3. Anything where being wrong is expensive and you can't easily check

This is the quiet one, because it doesn't fail loudly. I once automated a data-entry task and didn't build a fast way to spot-check its output. Errors accumulated unseen for a month before I noticed. The lesson that stuck: if you can't verify the output faster than you could have just done the task, you haven't automated the task, you've automated the risk. Automation without cheap verification isn't a shortcut, it's a delayed bill with an unknown amount on it.

The filter question I now ask explicitly: can I check this output in meaningfully less time than doing it would take? If checking takes as long as doing, the automation adds a step, not a savings.

## 4. Relationship-critical communication

Some counterparties can tell when it isn't really you, and it matters to them specifically that it is. A wholesale partner notices. A long-standing customer notices. These aren't tasks where the content needs to be correct — it's where the *source* of the message is part of the message. I keep an explicit "manual on purpose" list for this reason, and key relationship conversations are permanently on it, not because an agent can't draft convincing text, but because the value of the interaction is partly "this person took the time," and that value evaporates the moment it's detected as manufactured, whether or not it actually was.

## 5. Anything whose inputs change shape every time you do it

Automation assumes a stable, repeatable shape to the input. When the underlying process is still evolving — a form that changes fields, a listing format you're still iterating on, a workflow you've done differently each of the last three times — automating it means rebuilding constantly, and each rebuild costs more than the manual version would have. My rule now: run the task manually until it's boring. Boring means stable. If you're still discovering new edge cases on manual run number four, you don't have a process yet, you have an experiment, and experiments don't automate — they get concluded first.

| Signal | Ready to automate | Not ready yet |
|---|---|---|
| Last 3 manual runs | Identical steps | Different each time |
| Output check | Faster than doing the task | As slow as doing the task |
| Failure cost | Reversible, cheap | Irreversible or expensive |
| Counterparty | Doesn't care who did it | Specifically values you |
| Frequency | 10+ times a year | Once or twice, ever |

## 6. Vanity automation you never actually read

This is the most embarrassing one because it's not a failure of judgment about the task — it's a failure to notice the automation stopped earning its keep. A routine that reports the same forty items every single day, with no distinction between "nothing changed" and "here's what's new," trains you to stop reading it within a couple of weeks. At that point it isn't automating anything. It's producing a report that exists so you can feel like something is being monitored, while nothing is actually being watched, because the one person who was supposed to read it stopped.

The fix isn't complicated: every recurring routine has to be diff-based and has to explicitly say "nothing new" when nothing's new, instead of silently repeating yesterday's list. A routine that tells you "2 new since yesterday" stays read for months. A routine that dumps the same forty rows every morning gets ignored within two weeks, and an ignored automation is worse than no automation, because it creates the false confidence that something is covered when nothing is.

[!IMPACT] Running an honest filter before building anything kills roughly a third of my automation ideas before they cost a single hour of build time — that's real hours a year not spent on workflows that would have rotted, and the near-misses I did catch late (the unstable listing rebuild, the tone-deaf partner email) suggest the things I chose not to automate protected more value than several of the things I did build.

## The filter, in practice

Before I build anything now, I run it through five questions, out loud, honestly, before writing a line of workflow logic:

```
Automation decision review for: [task]. Answer honestly:
1) Expected repetitions over 12 months?
2) Has the process been identical the last 3 manual runs?
3) Can output be verified in <20% of the time doing it takes?
4) Worst-case failure: reversible? At what cost?
5) Does anyone on the other side value ME doing this personally?
Recommend: automate fully / automate edges only (specify which) /
keep manual, with reasoning. If "automate," also state its
maintenance cost and which weekly-audit check will catch its decay.
```

The "automate edges only" answer is the one I underuse the least and value the most. Most of the tasks on my manual-on-purpose list aren't fully manual in practice — an agent still assembles the research, drafts the first pass, and organizes the evidence. What it doesn't do is make the final call or sit in the seat where a relationship or a legal outcome depends on it being genuinely me. A legal dispute is the clearest version of this: an agent can build the timeline, gather the evidence, and draft the numbers, but the strategy and every submission stay human, always.

The number of workflows worth running isn't "as many as possible." It's the number whose upkeep you can actually audit on a regular basis without it becoming its own job. Past that number, the correct move is pruning, not adding — and the six patterns above are just the fastest way I've found to recognize, before I spend the week building it, which candidate is going to end up on the pruning list anyway.
