---
title: 'Rebuilding two enterprise build systems'
summary: 'Cut one enterprise CRM build from **over three hours to under ninety minutes**, then authored all **seventeen pipelines** for a second platform from scratch.'
role: 'Sole author'
period: '2025 — 2026'
stack: ['GitHub Actions', 'Jenkins', 'Windows runners', 'Terraform', 'PowerShell']
domains: ['infra']
context: 'trilogy'
order: 2
featured: true
---

## The problem

A large enterprise CRM built on aging CI. Every build took **over three hours**,
and a recurring class of infrastructure failures meant a meaningful share of those
three hours produced nothing at all. The codebase had **more than 18,000
commits** and had never required a test to pass before merging.

## What I did

I moved the build onto modern CI backed by an **autoscaled fleet of self-hosted
Windows runners**, sized to demand rather than provisioned for peak.

Getting that fleet to survive real-world conditions took longer than the port
itself. Builds were failing on **file-lock contention** from processes that outlived
their jobs, which needed **scoped cleanup** between runs. To be sure the build could
survive a database outage rather than assuming it, I **injected the fault
deliberately**, reproduced the failure, and then made it resilient.

With the build reliable enough to depend on, I added the **first enforced test
gate** that codebase had ever had, publishing results onto pull requests so a
failure **blocks the merge**.

Then a second platform: **seventeen pipelines** covering **thirteen components**
plus the orchestrator tying them together. I authored the **whole CI surface**, and wrote
an **interactive terminal tool** that gives developers the same build on their
own machine, so nobody has to push a commit to find out whether it compiles.

Customer patch delivery used to be a manual build-and-ship. That is now the
pipeline's job: validated fixes get **built, signed and packaged
automatically**.

## What changed

Build time went from **over three hours to under ninety minutes**, the
infrastructure failure class is gone, and the compute savings run to **thousands
of dollars a year**. An 18,000-commit codebase now has a test gate. Patch delivery
no longer depends on someone being available to run it.
