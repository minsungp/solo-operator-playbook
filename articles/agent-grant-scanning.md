---
title: I let an agent hunt government grants every morning
description: A daily browser-agent sweep found funding I would have missed, ranked it honestly, and drafted the paperwork. I still click submit myself, every time.
kicker: Finance
date: 2026-07-28
readingTime: 8 min read
slug: agent-grant-scanning
order: 2
---

Last spring I found out, by accident, that my country had been running a storefront-improvement subsidy for three months. Direct cash, no strings beyond receipts, aimed at exactly the kind of small physical retail expansion I was quietly considering. The application window closed in nine days. I found it because a supplier mentioned it in passing, not because I'd been looking. I hadn't been looking, because looking is a full-time habit nobody has time for on top of running the actual business.

That is the real shape of the grant problem. It isn't that the money doesn't exist. It's scattered across a dozen portals, each with its own posting cadence, its own PDF-only application forms, and a window that opens and closes in a few weeks with no advertising beyond the portal itself. Missing 90% of it isn't a competence failure. It's what happens when the monitoring cost is higher than any one founder can sustainably pay, every single day, forever.

So I stopped trying to be the monitor. I built a daily routine instead: a browser agent that sweeps the portals every morning before I'm awake, and reports back only what's new.

## What the sweep actually does

The mechanics are unglamorous, which is exactly why they work. Every morning, the agent visits a fixed list of grant and subsidy portals — national, regional, and industry-specific — and diffs what it finds against what it saw yesterday. New listings get evaluated against an eligibility profile I keep in persistent memory: legal entity type, registered region, industry classification, headcount, revenue band, and the documents I already have on hand versus the ones I'd need to chase down.

The profile has to be built from actual registration documents, not from what I assume about my own business. My mailing address and my registered business address are in different cities, and the first two drafts the agent produced were quietly disqualified before they started because the program filtered on registration region, not the address in my email signature. Grant portals don't care where you get your mail. They care what's on the paper you filed with the government.

The second piece of the profile is a filter policy, written down explicitly, because an agent left to its own judgment about what counts as "opportunity" will happily surface things that aren't. Mine excludes anything that isn't direct cash: no networking events, no exposure programs, no prize-less pitch competitions, no pure mentoring tracks. Those all show up in a raw sweep of any government portal, dressed up in the same official language as a $40,000 cash subsidy, and if you don't exclude them explicitly the agent will keep reporting them as if they were real leads.

## Ranking, not just listing

A list of programs is not useful on its own. What made the sweep worth ten minutes a day instead of a research project was forcing every match through the same scoring pass, on the same axes, every time:

| Axis | What it captures |
|---|---|
| Cash amount | Actual funding on offer, net of any required matching contribution |
| Fit | How closely the program's stated criteria match my eligibility profile |
| Probability | Realistic odds given competition, past cycles, and how narrow the criteria are |
| Self-pay requirement | Whether I have to spend first and get reimbursed, or the funding is up front |
| Prep burden | Hours of documentation and drafting required to apply |
| Deadline | Days remaining, weighed against prep burden |

Amount alone is a trap. A $70,000 program with a 20-page business plan requirement and a 40% self-pay match is often worse than a $5,000 program with a one-page form and no match, once you price in the hours. The scoring forces that comparison instead of letting the biggest number win by default.

Fit scoring needed a second fix. Early on, almost everything came back scored 4 or 5 out of 5 — the agent was being agreeable, not honest. Adding one instruction changed that completely: require the agent to cite the specific eligibility criterion behind every score. The moment it has to point at an actual sentence in the program's requirements rather than a vibe, the scores get real, and the 4s and 5s that remain are ones I trust.

## Deadlines against the actual posting, not the summary

This is the part I'd flag hardest if I were writing this for someone just starting. Grant portals get re-posted, extended, and occasionally mis-dated by aggregator sites that scrape them secondhand. An agent that reads a deadline off a third-party summary page and puts it on your calendar has told you something that might be wrong by days in either direction, and a missed government deadline isn't the kind of mistake you get to retry.

[!PITFALL] The deadline that matters is the one on the official posting itself, verified at the source, not the one on a news aggregator or a summary email — I now require the agent to screenshot or quote the exact line from the original portal page before any date goes on my calendar, because a deadline off by even one day on a government submission is not a mistake you get a second attempt at.

Every new match that clears the filter gets its deadline added to my calendar automatically, with a few days of reminder buffer built in. That alone solved most of the actual miss rate — not the research, the remembering.

## From match to draft

For anything scoring high enough to be worth the hours, the agent goes further than reporting. It drafts the actual application: the form fields, a business narrative pulled from a reusable company-story document I keep in memory, and a mapping of required attachments to the documents I already have filed. What used to be three to eight hours of form-wrangling per application becomes a draft sitting in a folder, ready for me to read.

Here's the prompt I run every morning, roughly as written:

```
Daily grant sweep. Portals: [list]. My eligibility profile and
filter policy are in memory. For each NEW program since yesterday:
name | funding type | cash amount | deadline | eligibility verdict
(cite the specific criterion) | fit score 1-5 | one-line reason.
EXCLUDE: networking, exposure, mentoring-only, prize-less programs.
For any program scored 4+, draft the application into [folder]:
filled form fields, narrative sections using my company-story doc,
and required-attachment mapping. STOP before any submit action.
Add deadlines to my calendar with a 3-day buffer.
```

## Why I still click submit myself

The gate is not decorative. A government application is a legally binding statement about your business, and the agent's confident draft is only as current as the eligibility profile behind it. My business registration gained a new industry classification at some point, and an outdated profile silently skipped programs I'd actually qualified for — the opposite failure, but proof the profile needs a quarterly reality check against the actual documents, not against my memory of them.

The more dangerous failure runs the other direction. After months of clean drafts, the temptation to let the agent submit on its own is real and it grows with every successful cycle. I haven't done it, and the one time I came close to loosening that rule, the draft in front of me contained an eligibility claim that had quietly gone stale. The gate didn't just catch a paperwork error. It caught me getting comfortable.

[!IMPACT] The sweep costs about ten minutes of review a day in exchange for what used to be an impossible daily research habit, and each application draft it produces saves three to eight hours of form-filling; the ceiling is the real story though, since individual small-business grants in my market run from roughly two thousand to seventy thousand dollars equivalent, and a single approval can fund years of the tooling this whole system runs on, while every miss costs nothing but a few minutes of reading.

I track every application in a plain pipeline — drafted, submitted, result — so nothing falls through after the fact. That part matters more than it sounds like it should. Grant programs rarely tell you their decision on a schedule you can predict, and a submitted application you've stopped thinking about is exactly the kind of open loop that used to live in my head before any of this existed. Now it lives in a spreadsheet instead, and the only thing that still requires me personally is the one click that was always going to require me personally.
