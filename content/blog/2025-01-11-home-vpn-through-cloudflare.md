---
title: "VPN into my home network through Cloudflare"
date: 2025-01-11
summary: "I do not want everything at home on the public internet, but I still want to reach it from my phone."
---

Something new and fun I set up recently: VPN access to my home network through Cloudflare.

I do not want to expose everything that runs at home to the public internet, but I still want to get to it. So I looked into Cloudflare Zero Trust.

It is a pretty nice thing. You can grant access to specific places in a private network quite precisely, including authentication through OIDC providers.

The result: my repo got a piece of Terraform that configures this part of the infrastructure, and my phone got Cloudflare One, which lets me open ArgoCD and the rest.

Doing the same with Tailscale looks like it would be simpler. But why bring in one more cloud service when I already use Cloudflare?
