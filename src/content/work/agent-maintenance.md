---
title: 'Automating the maintenance pipeline'
summary: 'Built the **agent infrastructure** that now triages, fixes, tests and reviews defect work across **six enterprise products**. My own throughput went up **fourfold in two years**.'
role: 'Sole author, adopted team-wide'
period: '2025 — present'
stack: ['Claude Code', 'MCP', 'GitHub Actions', 'Python', 'PowerShell']
domains: ['ai', 'infra']
context: 'trilogy'
order: 1
featured: true
---

## The problem

**Six enterprise SaaS products**, most of them inherited through acquisition, all
carrying defect backlogs. The documentation that came with them was scattered
across wikis, dead Confluence spaces and people's heads. Picking up a ticket on
an unfamiliar product meant **a day or two of archaeology** before writing a line
of code.

AI coding agents were the obvious lever, and out of the box they were useless
here. A two-decade-old desktop CRM builds on Windows. The iPad client needs real
hardware to install and debug on. An agent that cannot reach the platform cannot
do the work.

## What I did

The first problem was **reach**. I built harnesses that provision and drive
**Windows virtual machines** so agents can build the desktop CRM and validate
tests against it, and instrumented **physical iPad hardware** so they can install
and debug iOS builds. That turns "agents cannot work here" into a solved problem.

Reach without context still produces guesswork, so the next piece was a **central
knowledge base** covering every product in the portfolio. It consolidates the
inherited mess into one structured source and is wired into the agents, so they
answer from real product knowledge. I wrote the **bulk migration tool** that moves
legacy documents in with AI-proposed structure, and the **per-product context
layer** each agent loads before it touches a codebase.

On top of that sit **serverless pipelines** that take an incoming defect ticket,
reproduce the failure, **analyse crash dumps on remote machines**, implement a
fix, open a pull request, run the tests and review the result. Engineers handle what
the agents cannot.

The review step needed the most care. An agent writing its own regression test
will happily write one that passes against the broken code, which proves nothing.
So I codified a **red-green protocol**: every regression test has to be **observed
failing** before the fix is restored, enforced by a validation agent that rejects
any test never seen to fail.

## What changed

Onboarding onto an unfamiliar product got **roughly 70 percent faster**. My own
merged changes went from **41** in the second half of 2024, to **131** in 2025, to
**179** so far in 2026, while closing **580 of 591** assigned defects. The
pipelines are **used across the team** now rather than just by me.
