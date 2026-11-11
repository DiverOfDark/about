---
title: "Choosing a router: pick the firmware first"
date: 2018-08-07
summary: "What I learned picking a replacement router, and what I found when I logged into the ZyXEL Armor Z2 over ssh."
---

I decided to choose a new router, but this time to go about it more responsibly and with less hurry.

The last time I bought a classic router was about 10 years ago (some netgear, absolutely amazing for its time), and for the last 6 years I lived with an Apple Time Capsule. So now a brave new world of choice has opened up to me.

The first insights I got:

- There are many different routers, and for my tasks I need a normal firmware (with local root access and so on).

- Most manufacturers actively get in the way of installing third-party firmware. Somehow, without my noticing, software became more important than hardware in this world. Everybody has almost the same hardware, and the companies fight to have you use their software.

- First choose the firmware, and only then a router that suits (is compatible with) it. I chose openwrt as the closest to Linux and the most extensible. There was also the option of routeros from mikrotik, but it seems I am not that much of a network guy and I need a more universal device. The stock firmware from asus and the like is rubbish. There are interesting options from unexpected manufacturers. For example Synology, known for its NAS systems, released a router with its own firmware, known for plugins and for being friendly to the user.

- The coolest routers, perfectly compatible with the firmware I want, are discontinued.

- When you try to google reviews of the most suitable devices, you suddenly learn on the forums that the device got a new revision that is incompatible with third-party firmware (or makes it much harder).

- Among home routers there are exactly two categories: cheap and weak (1 cpu at 600 MHz, 64 MB of memory) and top gaming ones (2 cores at 1.4 GHz, 512 MB of memory).

In the end I chose the ZyXEL Armor Z2. It is fairly top-end in specs, not that expensive, and perfectly compatible with OpenWRT. Oh yes, and the most important thing: it is sold in shops in Moscow.

## Testing the ZyXEL

The first thing I did when I got it was to enable ssh access and log in to look around, so to speak.

I was surprised to see the greeting of OpenWRT (the third-party open-source firmware for routers), version around 12.*. For reference, the current one is 18.*. In effect this means that a long, long time ago ZyXEL made its own copy of the firmware based on the open one, and stopped bothering to take updates and patches.

Anyway, I reflashed it to a fresh OpenWRT, and it works quite briskly.
