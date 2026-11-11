---
title: "The early end of the ZAPO router"
date: 2018-06-11
summary: "A test clip, binwalk, a broken CLK pin and a replacement flash chip from AliExpress. It did not come back to life."
---

Continuing the router story. Those two capacitors and the resistor that I knocked off: it seems they were a filter for the input voltage of the memory chip. It looks like everything works without them.

After a couple of hours I managed to fix the short circuit on the router (at least it powers on and blinks its lights, so the lan controller chips work). But soldering onto the memory does not work out at all, my hands are just too crooked (plus a suspicion that I killed the second soldering iron tip). I found a workaround and ordered a [test clip](https://www.chipdip.ru/product/dip16-soic16-test-clip) made exactly for cases like this. I will still try to connect the memory chip over SPI directly to the raspberry and read what is on it, and whether it matches the dump I have.

## The dump

I tried to take apart the firmware dump I had copied from the router, and it turns out that apparently I was right: a wrap-around write did happen.

I figured this out with a wonderful utility, binwalk. It takes binary files apart, finds known file signatures in them and unpacks them.

That way I got the root filesystem out of the dump as a cpio (a big piece of luck), some certificate with a private key on a separate jffs2 partition, and the config header of the uBoot used for booting. On the minus side, there were a couple more partitions that cannot be recovered.

The partition offsets in the boot log and in the dump are shifted against each other. Now this thing definitely has to be reflashed.

![Router boot log in an SSH window listing seven MTD partitions, with the Bootloader line marked Good](/img/blog/zapo-router-the-end-1.jpg)

![binwalk output for the mtd0 dump in a terminal, with the U-Boot version string marked WTF](/img/blog/zapo-router-the-end-2.jpg)

## The clip

My crooked hands did finish it off. When I tried to connect to the memory over SPI with the clip, the raspberry pi could not detect the chip. Reasoning sensibly (actually not) that the board and a bad contact were probably in the way, I desoldered the memory and, while trying to get it to make contact with the clip, broke off the CLK leg. That is beyond repair. Now the options are to buy the same memory chip, or another router.

Oh yes, being completely ham-fisted, I tore off almost all the traces the original memory was soldered to. On the other hand, right under it there turned out to be a footprint for the same memory in a different package.

![Router board with the memory chip removed and its solder pads damaged](/img/blog/zapo-router-the-end-3.jpg)

I ran a poll on what to do next. 6 votes out of 10 were for buying a new memory chip, flashing it and soldering it to the router board, hoping it starts without the lost resistor and capacitors. 4 were for buying a new router and burying the Chinese Zapo. So I ordered a memory chip on AliExpress. Thanks to those who believe in me, you are either hopeless optimists or you want a show 😅

The chip took surprisingly long to arrive, apparently in transit from China through Latvia. Evidently, if you draw a straight line from China to Moscow, Latvia will be somewhere in the middle. I cannot explain logistics like that any other way. Or they shipped 1 chip worth 50 roubles by sea.

## Fiasco

Time to admit the fiasco. I never managed to flash the firmware onto the memory chip, and after a look at the state of the board (thanks to me) I decided to send the corpse to the bin and buy a normal router, not a Chinese one.

The question is what to get. I am looking at the mikrotik hap ac, but maybe there is something better or more interesting? I plan to put openwrt on it, unless of course I fall in love with Mikrotik's RouterOS. The single cpu and the small amount of flash bother me.

I want wifi ac and a file and media server.
