---
title: "A Chinese router with no alternative firmware"
date: 2018-05-27
summary: "I bought a ZAPO 2600 gaming router from AliExpress, opened it up and found a serial console next to the processor."
---

Another project of mine: a home wifi router, with wifi-ac and so on.

Remembering our friends from the Celestial Empire, I ordered a rather interesting (hardware-wise) "gaming" router from AliExpress, the ZAPO 2600. It is notable because there is no alternative firmware for it, and the stock one is as wretched as it gets. That is where my adventures with it began.

First I tried to find a console, to run some commands and understand what I am dealing with at all. Having completely failed to notice the "enable telnet" option in the settings, I remembered that I am an engineer after all, and decided to take it apart and look inside. Inside, everything turned out to be fairly friendly: the main processor is a MediaTek MT7621AT, wifi is an MT7615, 16 MB of flash from Winbond and 128 MB of ddr3 from nanyo.

The nicest part: next to the main processor I found 4 contacts. For those who are not electronics people, I will explain. If something like that sits next to the main processor, or has RX/TX written on it, it is an rs232 port (almost like a COM port, only the voltages are different). You can easily connect to it and get a local console, which is what I did.

I hacked three wires onto those contacts: receive, transmit and ground of the rs232. The fourth contact is power, but it is not needed, the router has its own.

![ZAPO router board in its open case with wires soldered on, powered up with blue LEDs lit](/img/blog/zapo-router-serial-console-1.jpg)

![Close-up of the MediaTek wifi chip on the router board](/img/blog/zapo-router-serial-console-2.jpg)

![Close-up of the router board with the memory chips and the serial wires attached](/img/blog/zapo-router-serial-console-3.jpg)

In parallel with taking the router apart, I downloaded OpenWRT and tried to build it from source for the most similar router, a ZBT of some model (also Chinese, but on the same chips). Still, flashing this router with the result is risky: if the hardware wiring of two Chinese devices from different manufacturers differs even slightly, there is a chance of getting a pretty brick.

At the same time I tried to show some managerial qualities and asked the support of this thing to build a firmware for me themselves, or at least to give me something. After being fed promises for a while, I was told they would not do anything, because it is "new development". I asked them to at least send me the original (their own) firmware. I want to have some kind of backup.

The next story is about how I turned the router into a brick while making a backup.
