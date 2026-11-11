---
title: "Creative disk layout on a home router"
date: 2018-08-15
summary: "Building my own firmware for the router, I ran into a 4 GB eMMC that is almost unused."
---

While building my own version of the firmware for the router, I ran into a creative organisation of disk space. That is what this is about.

But first a little background.

Embedded devices usually have one chip for persistent storage, a NAND (or something similar) of fairly small size (usually from 2 MB to 128 MB).

Because the size is so limited, there is no partition table at all, and the split into partitions happens by an agreement of the kind "from byte 0 to 2 MB is the first one, from 2 MB to 6 MB is the second" and so on. Accordingly there are no creative things like "active" or "bootable" or any other meta-information about the partitions.

The whole boot works because a bootloader (usually uBoot) is written starting at byte 0, and it has a config with the partition table and knows where to hand over control and with which parameters.

In the simplest variant the next partition is the linux kernel (compressed, to be unpacked into memory. Remember, space is tight! I am not sure who unpacks it, the kernel itself or uBoot), and after it the root filesystem (ext2 or squashfs).

Often a partition is added with permanent files from the manufacturer, which must not be lost when the firmware is updated. For example, pieces of microcode for controllers of something or other.

That is the simplest case.

## What I have

Now what has been dreamed up for storage on my router.

First, a good practice in the industry: a copy of the kernel and of the compressed root squashfs. (squashfs is a compressed readonly filesystem that is unpacked into memory at start. Because it is readonly it compresses very well, and suits all kinds of embedded things.)

So the partitions are roughly:

- uBoot
- env (config for uBoot)
- kernel-primary
- rootfs-primary
- kernel-secondary
- rootfs-secondary
- switch (a separate partition whose first byte says what to boot, primary or secondary)

Second, overlayfs is used for persistent file storage (the configs with the router settings have to be saved somewhere, right?). The principle is almost like in docker: it is mounted as a layer on top of rootfs and keeps all the changes. The juiciest part is what gets mounted.

Since the size of the squashfs is known and does not change, one more filesystem is created in the free space of the root filesystem partition, and it acts as the storage for the changes.

And now the really juicy part: besides the memory chip, this router also has a proper soldered-on 4 GB eMMC, which is almost unused!

So in reality the partitions are:

mtd:

- uBoot
- uBoot env
- switch
- mysterious things from the manufacturer

eMMC:

- kernel 1 - 8 MB
- rootfs 1 - 64 MB (squashfs 5 MB + ext4 59 MB)
- kernel 2 - 8 MB
- rootfs 2 - 64 MB
- mysterious things from the manufacturer
- a partition that is not used - 3 GB

So my nearest plan is to move the upper FS of the overlayfs from an odd spot in the leftovers of a partition into the separate unused partition.

Why? Because I plainly do not have enough space to install third-party software.

## Update, two weeks later

I have accepted that the root partition cannot be changed. It seems to be nailed down almost inside a kernel module, and I am not ready to go in there. I made a bunch of symlinks, and on the whole it works.
