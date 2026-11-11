---
title: "Homelab updates: rook ceph instead of longhorn"
date: 2024-11-03
summary: "Lighting in the rack, printed mounts, real nvme drives, and a backup I have not tested yet."
---

A few homelab updates.

I added lighting. I printed a rack mount for two mini-PCs and one thin client.

![Small server rack lit red with two mini PCs and a thin client mounted side by side](/img/blog/homelab-updates-1.jpg)

I rolled out rook ceph instead of longhorn, and the storage became much nicer and more stable. I replaced the dubious Chinese SSDs with honest nvme drives.

For now I do backups with Velero+restic to my home computer. But I have not tested a restore yet, and I very much want to.
