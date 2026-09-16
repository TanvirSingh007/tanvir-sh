---
title: 'Security work across multi-tenant platforms'
summary: '**Per-tenant CSP enforcement**, removing **hardcoded credentials** from a hosting platform, finally getting **2FA enforced**, and hardening the **CI supply chain**.'
role: 'Engineering owner'
period: '2025 — 2026'
stack: ['Ruby on Rails', 'Chef', 'AWS', 'GitHub Actions', 'OIDC']
order: 5
featured: false
---

## The problem

Several of the products I own are multi-tenant and carry the security debt you
would expect from platforms that changed hands: **credentials hardcoded** where they
should be managed, **API tokens with no owner and no expiry**, and a **two-factor
rollout that had been attempted and abandoned**.

## Per-tenant content security policy

Rolling out **CSP enforcement** across a multi-tenant platform meant coordinated
changes spanning the application, the load balancer configuration and the
infrastructure managing it. I shipped it **behind feature flags**, because a CSP
mistake breaks a tenant's entire frontend and you want the revert to take
seconds.

## Credentials

Removed hardcoded credentials across a hosting platform in favour of **managed
secret storage**, **scoped API tokens to their owners with expiry**, and fixed a
set of authorization errors that were **leaking sensitive data through API
responses**.

## Two-factor

The earlier rollout stalled on two specific defects: the **login redirect
looped**, and the **authenticator reset flow was blocked**. Enforcing 2FA in that state would
have locked people out of their own accounts. I fixed both, then enforced it
across all accounts.

## Supply chain

**Pinned third-party CI actions to exact commits**, moved code signing onto
**short-lived issued credentials**, and fixed a **shell injection in pipeline
inputs** that static analysis had flagged.

## What changed

Tenants run under **enforced CSP**. The hosting platform has **no hardcoded
credentials left** and its tokens expire. **2FA is enforced** rather than
aspirational. CI no longer trusts a mutable tag or holds a long-lived signing
key.
