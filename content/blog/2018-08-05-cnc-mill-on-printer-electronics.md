---
title: "A small CNC mill on 3D-printer electronics"
date: 2018-08-05
summary: "I ordered a cheap desktop mill kit and decided not to use the dubious LPT drivers that came with it."
---

I lost it and ordered myself a cheap and small home milling machine, a DIY mini CNC kit from AliExpress.

It will probably be delivered in a couple of months.

All that is left is to figure out what for, where to put it, and whether it is time to start renting a garage.

## The parts arrived

The mechanics are assembled. Now the electronics are left. I do not want to use the dubious drivers controlled over LPT, so I will use electronics from a 3D printer. And I will control the spindle through a relay.

![CNC mill kit parts laid out on the floor: plates, rods, stepper motors, spindle and power supply](/img/blog/cnc-mill-on-printer-electronics-1.jpg)

![The assembled frame of the small CNC mill with spindle and stepper motors](/img/blog/cnc-mill-on-printer-electronics-2.jpg)

A week later: the electrics are assembled, and the magic smoke has not come out (yet). The spindle eats a separate 36V at 9k rpm. Next up is fixing the firmware and the software...

By the way, if anyone knows where to find a power supply with 5V, 12V and 48V outputs at once, and even better with software switch-off of the 12V and 48V lines, I will say thank you.

## More parts

I have not written anything for a long time, but nothing is happening with me either. The only news is that a batch of parts for the mill and the printer arrived. What came:

- A 3D Touch auto-levelling probe. A fun thing: it connects like a servo, can extend a probe and understands when it has hit the bottom.
- A magnetic build surface for printed objects. I am fed up with replacing PEI sheets (changed it just once and here we go again), so I decided to try this. The idea is nice: you print, then simply peel off the flexible sheet and pick the print off it. I do not know how it will work with the 3d-touch, my hypothesis is badly.
- A bunch of TMC2130 drivers, to drive the motors in the mill. After I liked them on the printer, I decided they have to go everywhere.
- A small screen for the mill, like on the printer: a reprap full graphics smart controller. The best thing for its size, and the sd card goes into it too.
- A bunch of endstops for the mill (something in me says that sooner or later things will go badly without them).
- A DCDC mosfet module for connecting the laser to the printer and matching the PWM levels (I know this solution is nonsense and an optocoupler is what it needs, but...)
- A nice flexible cable chain for the wires of the printer (or the mill, somewhere).
- An arduino due, an extra one will not hurt. In case I find that 8 bits are not enough for the mill.
