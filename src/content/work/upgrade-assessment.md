---
title: 'A customer-facing product in sixteen days'
summary: '**Empty repository to signed public release in sixteen days**, built alone: scans a customer estate, classifies upgrade blockers, computes a viable path and produces a readiness report.'
role: 'Sole engineer, 95% of commits'
period: '2026'
stack: ['C#', '.NET', 'rules engine', 'code signing']
order: 3
featured: true
---

## The problem

Customers on old versions of an enterprise platform wanted to upgrade, and
nobody could tell them cheaply what it would take. Working that out meant an
engineer going onsite through their installed estate by hand, which does not
scale past a handful of customers and produces an answer only as good as whoever
did the walk.

## What I did

Built a product that does the assessment itself.

It **scans the customer's installed estate**, classifies upgrade blockers against
a **versioned rules engine**, computes a **viable upgrade path** from where they
actually are, and produces a **readiness report a board can read**.

The rules engine is **versioned on purpose**. Upgrade blockers change as the
platform ships, so a tool with its logic frozen at release date starts giving
wrong answers within a quarter. Versioning the rules means the assessment can be
corrected without shipping a new binary to every customer.

I wrote the **architecture decisions into the repository** as I went, so the
reasoning survives me. It ships as a **signed public release**.

## What changed

**Empty repository to signed release in sixteen days**, alone. An assessment that
used to require an engineer onsite is now something a customer can run
themselves.
