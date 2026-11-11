---
title: "kata-pulse: an evening project that got a little out of hand"
date: 2025-10-26
summary: "I only wanted to play with Rust in the evenings. I ended up writing monitoring for Kata Containers."
---

Last week I only wanted to play with Rust in the evenings. I ended up writing a whole monitoring tool for Kata Containers 😅

kata-pulse is a small daemon in Rust. It collects metrics from every Kata sandbox and serves them in a Prometheus-compatible form, in the cAdvisor format. It finds the containers by itself, pulls the data and adds metadata from Kubernetes.

So it works with the standard kube-prometheus-stack monitoring and its dashboards without changes.

Inside: Tokio, Axum, and caching on Arc/RwLock. It installs through Helm in one line.

In short, it is kata-monitor, only without Go.

[github.com/diverofdark/kata-pulse](https://github.com/diverofdark/kata-pulse)
