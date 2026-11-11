---
title: "What runs on my 30-euro server"
date: 2024-02-13
summary: "I do not like paying for cloud services I cannot take my data out of, so here is everything I host myself, and the few things I gave up on."
---

I am not a fan of paid cloud services for everyday life. They cost money, and on top of that you cannot take your data with you when you want to change provider. So today: what runs on my server, and what I use from the self-hosted world in general.

I rent a dedicated server at OVH for 30 euros a month (Intel Xeon D-1520, 4 cores / 8 threads, 32 GB RAM, 2 x 480 GB SSD in RAID 0). Why there and not at one of the cloud providers? Because I can set the machine up myself, and a virtual server of that size at something like AWS would cost far more.

It runs Ubuntu 23.10 (next time it will be NixOS), and every web domain sits behind Cloudflare. All software runs in Docker containers from a single docker-compose file. From experience, moving to a new server takes a few hours, and part of that is copying the data over scp.

I would split the containers into three groups: infrastructure, media, and apps for life.

## Infrastructure

- **Traefik**: a modern reverse proxy with its own dashboard, fast and light, and it picks up containers through labels. I could have used nginx proxy manager, but I believe we are no longer in 2010. I have used Traefik since version one and even contributed to it.
- **Watchtower**: updates the other containers automatically. My belief is that if you update all the time, you never end up unable to update because of some incompatibility. So as soon as any app publishes a new image, it is pulled and restarted.
- **node-exporter**: ships server metrics to a hosted Grafana, so I can look at what happened if something goes wrong. In practice it has never been needed.
- **homarr**: a dashboard of all the services, and also my default new tab in the browser.
- **hugo**: turns Markdown files into HTML. My personal site runs on it.

## Media

- **Plex**: a media server that transcodes and streams to my computer, the TV, the phone, or wherever. I could have used the free Jellyfin, but it supports fewer platforms.

## Apps for life

- **Nextcloud**: a private Dropbox. The phone dumps photos into it and every computer syncs its work folder and downloads there.
- **Actual Budget**: self-hosted finance tracking with EU bank integration, so it pulls transactions from all my banks by itself.
- **paperless-ngx**: digitises and stores documents. It can watch a mailbox, pick up PDFs, index them (images too, with OCR) and search by content. One day I will scan all my paper documents into it, but first I want to move it from this server to inside my home network.
- **PhotoPrism**: a photo archive with grouping and face recognition. A self-hosted Google Photos.
- **rsstt**: RSS to Telegram. A bot that turns some of my RSS subscriptions, such as lobste.rs and Hackaday, into channels I read.
- **bonsai**: the official demo site of a self-hosted family tree that a good friend of mine builds. I do not use it myself, I just help host the demo :)

## What I could not replace

Sadly, not everything can be hosted at home. For some things there is simply no good substitute. What I still use, if not every day then often:

- **Gmail**, because hosting email yourself is extremely hard. DKIM, SPF, DMARC and many other difficult words, all so that your mail does not land in spam. For mail from my own domain I use Cloudflare for forwarding and Google for sending.
- **ClickUp**, because I have not found a decent open-source task tracker for personal life that is easy to feed from a phone.
- **Onshape**, because it is the best parametric CAD in a browser and there are simply no alternatives.
- **ChatGPT**, because it works better and faster, and I have no money to buy a 4090 for home or rent a server with GPUs for hundreds of euros :)

At home, on the home network, things are still much simpler: just Pi-hole for blocking ads and unbound as a recursive DNS resolver. I still plan to build a Kubernetes cluster at home and move some of the services there, but that is for another time.
