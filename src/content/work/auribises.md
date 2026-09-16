---
title: 'Shipping and running client applications'
summary: 'Replaced manual deploys with **automated continuous delivery**, integrated the **WhatsApp Business API** for **1,000+ users**, and ran the **Linux production servers** it all sat on.'
role: 'Full-stack developer'
period: '2023 — 2024'
stack: ['Python', 'JavaScript', 'Docker', 'Linux', 'REST']
domains: ['infra', 'backend', 'product']
context: 'auribises'
order: 8
featured: false
---

## The problem

A small agency shipping client applications, where releases happened by hand. Someone
SSHed into a box, pulled, restarted services and hoped. That works right up until it
does not, and the failures always land at the worst possible time: a bad deploy on a
Friday, a missed step nobody documented, a server whose current state matches no
commit anyone can point at.

Nobody owned the infrastructure either. It was whoever was free.

## What I did

The first thing to go was the manual deploy. I replaced it with **automated
continuous delivery**, which cut release time and removed an entire recurring class of
errors: the ones caused by a person skipping a step at 6pm on a Friday.

Then the environments themselves. I **containerised the applications** so a running
environment was something you could rebuild rather than something you inherited, and
took ownership of the **Linux production servers** underneath, including stability,
security patching and incident resolution.

On the product side I **integrated the WhatsApp Business API** into client
applications serving **more than 1,000 users**, delivering it from the API layer
through to the interface. Messaging APIs are less forgiving than they look: delivery
is asynchronous, the failure modes are quiet, and templates get rejected for reasons
the documentation describes loosely.

Alongside that I built internal automation tooling for data management, and mentored
the associates and interns working across the frontend and backend stack.

## What changed

Releases became repeatable instead of nerve-wracking. Applications ran on
infrastructure that could be rebuilt from a definition rather than from memory. This
is also where I started caring about the operational half of software rather than
just the code, which is most of what I do now.
