---
title: "The SD card that died quietly"
date: 2018-05-31
summary: "The memory card in my 3D printer's Raspberry Pi went read-only, and thanks to the write-back buffer I did not notice for a long time."
---

Speaking of flash memory and memory cards, I remembered a wonderful story from the life of my 3D printer. Some time ago (half a year to a year back) its memory card passed away. An ordinary microsd, plugged into the raspberry pi that runs the printer's web interface (octoprint).

And I did not understand that it had died for quite a while, thanks to that same write-back buffer. What did it look like? Everything worked fine, except that prints from big files (long ones) got ruined at some point for some reason. When I logged in over ssh and changed settings or cleaned up the disk, everything was fixed.

Until the first reboot.

It turned out that the card had gone into read-only mode. When the system tried to write changes to it (a newly uploaded file, say, or changed settings of anything at all), it did not really succeed, the file stayed hanging in memory (until the memory went to swap, heh), and almost everything worked. Until the reboot. And then Groundhog Day.
