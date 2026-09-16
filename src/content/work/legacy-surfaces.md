---
title: 'Fixes on hard legacy surfaces'
summary: 'A **native C++ crash** in a record merge, **Exchange connectors duplicating records**, spreadsheet export corruption, and **Scala polling workers** rewritten for a new database driver.'
role: 'Engineering owner'
period: '2024 — present'
stack: ['C++', 'Scala', 'Akka', 'Ruby on Rails', 'PostgreSQL', 'SSIS']
domains: ['backend', 'native']
context: 'trilogy'
order: 6
featured: false
---

## The problem

Most of what I do is maintenance in the real sense. A customer hits something
broken on a product that predates everyone currently working on it, and I own it
from the first reproduction through to the merged fix. **Finding where the fix
belongs usually takes longer than writing it.**

## What I did

A few that were worth the time they took.

There was a crash in the record merge path of a two-decade-old desktop CRM,
triggered by merging records in a particular state. It was **native C++**, and I
worked it through **crash dumps from customer machines** rather than a
reproduction I could attach a debugger to.

Calendar and mail connectors were creating duplicate records against Microsoft
Exchange. The duplicates were the symptom. The cause sat in **how the connector reconciled
identity between the two systems**, which meant the fix had to go **where every
sync path routed through** instead of where the duplicates surfaced.

Spreadsheet exports were coming out corrupted. That one traced back to the
**transform layer** rather than the export itself, which is where everyone had
been looking.

On a high-traffic platform I rebuilt activity feed pagination on **keyset
pagination with pre-filtered common table expressions**, correcting cursor
uniqueness and index alignment, shipped by **concurrent migration with no
downtime**.

The migrations were their own category: rewriting **every polling worker in a
Scala service** for a new database driver, moving the datastore **across two
major versions**, and replacing a decommissioned analytics vendor by rewriting
its SDK calls as direct database queries.

## What changed

**580 of 591** assigned defects closed across **six products**, every change
traceable to a tracked ticket and paired with a regression test that was
**observed failing first**.
