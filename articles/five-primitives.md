---
title: The five primitives I run a whole company on
description: A one-person company is not a productivity hack. It is four agents and one rule. Here is the exact stack I use to run inventory, billing, bookkeeping, filings, and production deploys alone.
kicker: Pillar
date: 2026-07-28
readingTime: 9 min read
slug: five-primitives
order: 1
---

I run a consumer product company by myself. Physical inventory, two storefronts, multiple marketplaces, subscription billing, bookkeeping, tax filings, government paperwork, content in two languages, and a codebase that ships to production most weeks. Headcount: one. Not "one plus a virtual assistant." One.

Three years ago this was not possible. It is also not possible today by keeping a chat window open and asking it questions. The thing that changed is not that models got smarter in the abstract. The thing that changed is that agents can now **operate software the way an employee does**: click through admin dashboards, fill in government forms, read email, write and deploy code, remember what happened last Tuesday, and run on a schedule without being asked.

Once that is true, most of what a small company's staff does becomes a workflow you can write down, hand to an agent, and audit weekly instead of doing daily.

Everything I run sits on five primitives. Tool names will churn every six months. These won't.

## 1. A browser-operating agent

An agent that drives a real browser session with my real logins: seller dashboards, banking portals, government sites, ad platforms, email.

This is the highest-leverage primitive, and it is the one most people skip. The reason is uncomfortable: **roughly 90% of small-business operations live behind a login wall with no usable API.** Your marketplace seller console. Your payment provider's merchant dashboard. Your country's tax portal. The grant program that still ships application forms as attachments.

If your automation strategy requires an official API for everything, you will automate the 10% that already had one, and you will still be doing the other 90% by hand at 11pm.

The browser agent is my hands. It logs in, navigates, reads what's on screen, fills forms, downloads documents, and reports what it found.

## 2. A coding agent

An agent that reads my repositories, writes changes, opens a review pass, and deploys.

I treat it exactly like a contractor with commit access and a probation period that never ends. It built the storefront, the internal dashboards, the scrapers, and all the glue scripts. My job is not to write the code. My job is to read a diff at the level of "this changes the checkout page and nothing else" and to notice when that claim is false.

That distinction matters more than it sounds. You do not need to be able to write the feature. You need to be able to tell whether the change is contained.

## 3. Scheduled routines

Recurring jobs. "Every morning at 7, scan these five grant portals and report anything new." "Every day, draft two posts and three replies for my approval."

The unlock here is psychological as much as technical. A solo operator's scarcest resource is not hours, it is **open loops** — the things you're holding in your head because if you forget them, nobody else will remember. Every loop you hold costs attention whether or not you act on it.

Things that run on a schedule stop occupying your head. That is the actual product.

One rule I learned the hard way: **a scheduled job must report "nothing changed" explicitly.** If silence can mean either "no news" or "the job has been broken for nine days," you will eventually discover it was the second one. Mine tell me they found nothing. Then silence always means breakage.

## 4. Persistent memory

Structured notes my agents read and write: per-site notes ("this bookkeeping tool's export button is under Settings → Data"), per-project notes ("payment provider B's review is pending, last checked on the 23rd"), and per-decision notes ("subscriptions stay on card billing only; do not re-add wallet pay to subscriptions").

Without memory, every session starts from zero and re-makes old mistakes. You re-explain your business, the agent re-discovers that the export button moved, and it re-proposes the thing you rejected in March.

With memory, your staff has tenure. This is the difference between an intern who started this morning and one who has been with you a year.

The trap is dumping everything into one giant note. Then retrieval gets worse as it grows, and the agent reads three thousand words of history to answer a question about one dashboard. Split it: one file per site, one per project, one per durable decision.

## 5. Approval gates

The rule that makes all of the above safe enough to run on a business with real money in it:

> Agents draft. I approve. Agents execute.

Anything irreversible passes an explicit human checkpoint. Sending money. Filing a government application. Posting publicly. Emailing a customer. Deploying to production.

People read that as a compromise on automation — as if the gate is the part I haven't automated yet. It is the opposite. **The gate is the automation strategy.** It converts a hundred hours of doing into one hour of reviewing, and reviewing is a job one person can actually hold.

It also changes the cost of failure, which is what makes the whole thing possible. An agent that drafts a bad grant application costs me five minutes of review. An agent that *submits* a bad grant application costs me a lot more than five minutes. So mine can't.

## What this actually buys, honestly

In conservative terms, across the last stretch of running this way:

- It covers roughly two to four full-time roles' worth of routine work: ops assistant, bookkeeper's assistant, junior marketer, junior developer.
- It costs a few hundred dollars a month in tooling. Less than one day of one employee.
- It does **not** replace judgment. I still decide pricing, brand, product, and legal strategy. Agents make those decisions cheap to execute, not unnecessary to make.
- It fails regularly. A deploy shipped wrong subscription discount tiers. A refund reported "done" that the payment gateway had actually blocked. A scraper returned stale competitor data for nine days without complaining. Every one of those became a checklist line.

That last point is the one I'd underline. The failures are survivable *because* of the gates, not because the agents are reliable. Anyone selling you the version where the agents don't fail is selling you something else.

## Where to start if you're one person

Do not install all five at once. The order that worked:

1. **Pick the single workflow that wastes the most of your week.** Run it manually with an agent twice before you schedule it. You are debugging your own process description, not the model.
2. **Write the memory notes.** The moment you stop re-explaining your business, everything else gets cheaper.
3. **Put gates on money paths before you automate them**, not after.
4. **Then schedule.** Only things that have already worked manually twice.

The failure mode I see most often is the reverse: schedule first, discover later that the workflow was never right, and end up with a cron job that produces confident garbage every morning at seven.

---

This is the introduction to a longer thing. I wrote down all 30 workflows I actually run — each with the numbered playbook, a copy-paste prompt, the pitfalls that burned me, and honest time and money ranges.
