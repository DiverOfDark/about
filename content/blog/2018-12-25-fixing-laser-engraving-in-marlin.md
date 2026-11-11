---
title: "Fixing laser engraving speed in Marlin 2.0"
date: 2018-12-25
summary: "Laser control in Marlin is thoroughly broken, so the laser now pretends to be a part cooling fan. Halftone photos work."
---

I fixed the speed of laser engraving. It now works fast and, more importantly, without delays when the power changes, so I can engrave photos in halftones.

Laser, plywood, halftones, success.

So what was wrong with the laser and how did I fix it?

Like any decent CNC machine, this contraption is controlled by G-Code commands. My laser is mounted on the 3D printer, and it uses the Marlin 2.0 firmware for 3D printers.

In Marlin, laser control (the M3-M5 commands) is thoroughly broken. It uses the same approach as for controlling a mill's spindle: "turned it on, waited until it spins up, carried on working".

With a laser you cannot do that. Here the power has to change right during the movement, and any delay leads to the current point burning for a long time.

In Marlin all movement along the axes is controlled by the so-called "planner", which in a very short tick of time performs the movement needed at that moment. By some misunderstanding the part cooling fans are also controlled through the planner, so the recommendation of the firmware developers themselves is "well, until we fix the API for the laser, use it as if it were the fan".

And it would all have just worked, but the problem is that the movements end up not synchronised. Luckily another person had already run into this problem and wrote in [an issue on GitHub](https://github.com/MarlinFirmware/Marlin/issues/11576) how he fixed it. I did the same, and everything worked.

To create the G-Code I use both [a tool I wrote myself](https://github.com/DiverOfDark/PictureToLaserGcode) and LaserGRBL.

Unfortunately LaserGRBL produces a slightly different format of G-Code, which I then convert, with the same tool, into something Marlin can understand. On the other hand, compared to my contraption LaserGRBL can vectorise pictures and on average gives better quality in general, so I recommend it to everyone.
