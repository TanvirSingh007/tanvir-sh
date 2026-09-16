---
title: 'Owning an iOS release train'
summary: '**Seventeen TestFlight builds in seven weeks** for an enterprise iPad client, plus customer-branded packages, and a **pre-build check** that catches what Apple would reject days later.'
role: 'Release owner'
period: '2026'
stack: ['Objective-C', 'iOS', 'TestFlight', 'Fastlane', 'code signing']
order: 4
featured: false
---

## The problem

The iPad client of an enterprise CRM platform, shipping to named enterprise
customers as **customer-branded packages** as well as through the standard
channel.
Release cadence was high and the feedback loop on mistakes was terrible: submit
a build, wait days, get rejected by Apple for something a check could have caught
before the build started.

## What I did

Took ownership of the release train and shipped **seventeen builds through
TestFlight over seven weeks**, alongside the branded packages for enterprise
clients.

The rejection loop was the thing worth fixing. A submission rejected for an SDK
version mismatch costs days, and it is entirely predictable: the information
needed to catch it is available before the build runs. So I added a **pre-build
SDK check** that fails immediately and locally, turning a **multi-day round trip
into an error you see in the first few seconds**.

Working on the client also meant working on the parts of it that only show up on
real hardware, which is what pushed me to instrument physical iPads for the agent
tooling described in the maintenance pipeline work.

## What changed

**Seventeen builds in seven weeks** with the branded packages keeping pace. The
class of Apple rejection that used to cost days now **surfaces before the build
starts**.
