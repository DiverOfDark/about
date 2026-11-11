---
title: "A KNOMI display, OTA updates and my first Rust project"
date: 2023-08-13
summary: "I put a small display on the printer, contributed wifi updates to its firmware, and later wrote a flashing tool in Rust."
---

I put a Knomi display on the printer. While I was at it, I contributed OTA updates over wifi to the manufacturer, because without them it was just silly.

![Red print head with a round KNOMI display showing 50°C and 26.97°C](/img/blog/knomi-firmware-and-rust-1.jpg)

## October: a flashing tool in Rust

Let me brag: yesterday I made my first micro-project in Rust.

In essence I wrote a tool for updating the KNOMI firmware to [my fork](https://github.com/DiverOfDark/KNOMI). The good parts: it contains everything in itself, including the firmware, and it is available for all 3 platforms (I tested it on only one, naturally).

On the whole I liked it. It feels like the language has everything you need for writing system software. And it builds into some minimal binary. I especially enjoyed how simple it was to put the firmware itself inside the resulting binary.

As a result, the list of technologies used in the fork is now even more entertaining :)

![GitHub language bar: C++ 48.3%, C 18.5%, Svelte 17.6%, Python 9.3%, Rust 2.0%, TypeScript 1.8%, Other 2.5%](/img/blog/knomi-firmware-and-rust-2.jpg)
