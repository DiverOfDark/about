---
title: "A home e-ink dashboard, built mostly by AI"
date: 2026-05-09
summary: "I saw TRMNL and wanted one. A colour e-ink panel, a Rust backend in the homelab, and Claude doing most of the iterations."
---

I recently found out about TRMNL and thought: I want a home e-ink dashboard like that.

![The e-ink dashboard showing weather, system load and alerts](/img/blog/e-ink-dashboard-1.jpg)

I took a Seeed Studio reTerminal E1002 (colour e-ink!) and built my own version on it:

- screen and device: reTerminal E1002
- design: Claude Design
- code and most of the iterations: Claude Code
- backend: Rust
- all of it runs in my homelab

Right now the dashboard pulls data from a few sources:

- my calendar
- weather
- budget numbers from Actual Budget
- alerts from Alertmanager

The nicest thing about the whole story is that it really was quick to build, thanks to AI. Not in the sense of "AI did everything by itself", but in the sense that it made the whole custom layer much easier: layout, glue code, rendering, integrations and fast iterations.

I think this is exactly where AI is especially good right now. It makes hyper-local solutions for one particular person cheap and realistic. Before, they would have been too niche and too expensive in time to take seriously.

All that is left is to hang it on the wall. And to think about what else I want to see on it.
