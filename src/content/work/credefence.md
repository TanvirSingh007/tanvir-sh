---
title: 'Credefence'
summary: '**Multi-tenant SaaS for device financing**: admin and retailer portals, an **Android device-owner agent** doing remote lock and zero-touch provisioning, **70+ API endpoints**.'
role: 'Built solo'
period: '2024 — 2025'
stack: ['Python', 'Android', 'PostgreSQL', 'REST']
link: 'https://credefence.com'
order: 7
featured: false
---

## The problem

Device financing works on trust that the borrower keeps paying after they walk
out with the phone. Retailers in the market this targeted had no mechanism for
that beyond hoping, so they either priced the risk in heavily or did not offer
financing at all.

## What I did

Built the platform end to end, alone.

An **admin portal** for the financing operator, a **retailer portal** for the
shops issuing devices, and an **Android device-owner agent** that does the
enforcement:
**remote lock**, **factory reset protection** so a wipe does not clear the
obligation, and **QR-based zero-touch provisioning** so a retailer can enrol a
device without touching a settings screen. **More than 70 API endpoints** behind it, with
payment collection integrated.

The device-owner agent was the hard part. **Android's device owner APIs** give
you real control, and the provisioning flow has to work **in a shop, in one pass**,
by someone who is not technical and has a customer waiting.

## What changed

It reached production. The launch was then blocked by a Google platform policy
change to the device owner APIs the whole enforcement model depended on. That is
the risk of building on someone else's platform controls, and I did not price it
in.

It is here because the engineering holds up, and because how it ended is worth
saying plainly.
