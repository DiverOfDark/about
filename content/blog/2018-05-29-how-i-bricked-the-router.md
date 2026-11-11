---
title: "How I bricked the router while making a backup"
date: 2018-05-29
summary: "Telnet, a cut-down busybox, a web server with a writable partition, and then a soldering iron."
---

Once I connected to rs232, I really could see everything that happens to the router at startup, even before it boots.

Like almost any embedded Linux device, it boots from SPI flash, which is divided into several partitions: the bootloader (uboot), a compressed Linux kernel, a compressed root filesystem, and some private data, scraps of drivers and settings for the wifi and ethernet chips. Those are usually distributed under a different licence, cannot be shipped as part of Linux, and can be specific almost to a particular chip.

Here I got both success and disappointment. I saw the boot log, how the flash is partitioned (how many partitions, what size, what names), saw Linux start, confirmed my guesses about the sizes of the flash and the memory, and saw a million debug messages and initialisation errors (hello, China. If nobody sees it, there is no need to fix it). The only problem was that there was no way to run local commands. On one hand that is logical: when you are saving on hardware as hard as you can, starting even one extra process is an unaffordable luxury.

Upset, I went to study the router's admin web UI in more detail, in case I had overlooked something useful. And there it was: the "enable telnet" option I missed last time, and next to it a checkbox so that the firewall lets telnet traffic through for local connections.

Telnet is an ancient protocol for connecting to a remote server and exchanging text commands. Leaky as a colander, simple as three kopecks, and used almost nowhere. It was replaced by SSH (Secure SHell), where all traffic is encrypted and which is used for remote access to Linux servers all over the world.

So, connecting to the router by telnet over the local network, I finally had my success: I could look at the filesystem and the processes, poke at it with commands and so on.

After wandering around the filesystem a bit I found some private keys, and thought it would be good to copy everything there is to my computer. After reflashing all of it will be lost, and there may be files that cannot be restored at all, like the settings for that same wifi.

And here it got difficult. I need to transfer 16 MB over the network somehow (the contents of the whole flash, conveniently sitting at /dev/mtd0), but how do I download them?

On embedded Linuxes, to save space and for speed, all the command-line utilities are usually statically linked into one binary, busybox, which works out who it is and what to do from the file name it was started with.

The usual scp is not there (for copying over ssh), curl/wget do not work (to upload to a remote server), tftp does not work either (the Chinese built busybox in such a way that it is sort of there, but it does not work)...

And then it dawned on me: there is a web admin UI, so there is a web server that can serve files. And after that came the failure.

## The web server

I found that the router runs lighttpd as its web server, found where it serves static files from, and tried to make a symbolic link there to /dev/mtd, to download the whole flash from the browser. But I could not create a symbolic link across different partitions. Hello to the cut-down ln in busybox.

How does Linux work on systems like this in general? At startup it unpacks the whole filesystem into RAM and after that does not touch the flash. And you can mount some flash partition as writable, to save settings there, for example. Who would have thought that the writable partition would turn out to be the one with the static files.

## The brick

There is a thing called a write-back buffer. It is a buffer in memory where data lands before it is physically written to disk. It is mostly needed for performance: most applications write in very small pieces and to different places, and for the disk it is easier to write one big chunk of data at once.

So, without thinking, I copy the whole flash image into the web server's static folder and download it with the browser. Then I thought that since everything is going so well, I could also copy it partition by partition, purely for convenience. One more file copy, and telnet disconnects me, and in the local console I see that an Out-of-memory happened (meaning the memory ran out, completely) and the kernel decided to kill the extra unneeded processes.

Without thinking long, I reboot the router, hoping that all the changes will now be undone and everything will be fine. But no. It does not boot, and in the local console there are not even messages from the bootloader. I try to understand what happened, and an idea comes up. Purely theoretically, an address overflow could have happened, and my copied file overwrote the bootloader on the flash. In any case this router is now an expensive paperweight, unless I revive it.

I have one idea...

## The soldering iron

There is an idea, but my hands let me down. So, we have SPI flash memory. You can solder onto it (sic!) and flash it through something external, for example a raspberry pi. I even googled it: the chip is a typical one, supported by some sorry piece of software.

The raspberry pi in general is a great example of a device from two worlds at once. On one side it has Linux, a console and commands familiar (since childhood), and on the other a pile of low-level input-output ports, the kind dumb hardware usually works with.

The idea is wonderful, but the hands let me down. Or the Chinese soldering. But I still think it was the hands. While trying to solder on, I first dropped a blob that shorted pins 1 through 8 of the chip, and while trying to fix that I knocked off a couple of resistors and a capacitor of roughly 0402 or 0603 size (length x width in tenths of a millimetre) and lost them. And it seems that along the way I either shorted ground and power somewhere, or broke the power circuit.

I also overheated the tip of my new soldering iron, it got covered in scale, and now it needs rescuing somehow. So a fine engineer I turned out to be: killed not only the router but the soldering iron tip as well 😂
