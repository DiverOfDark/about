---
title: "Why you should not save money on a BLTouch clone"
date: 2018-10-13
summary: "A Chinese 3D Touch gave me a 0.35 mm spread on the Z axis. The original gave 0.011."
---

I ordered an Xbox One power supply on AliExpress. Why, if I have no Xbox? For the 3D printer!

It is actually a small and powerful power supply that gives 12V 17A and 5V 1A, with the ability to switch off the 12V lines in software. Right now I use an ordinary converted ATX, and I will try to replace it with something pretty and small.

True, I will then have to move the Raspberry Pi3 to some other power source (I think 1A will not be enough for it).

Meanwhile, because of the magnetic bed the capacitive sensor no longer works. So I rigged up the 3dtouch as the Z-axis endstop.

Briefly, why you must not save money and buy a Chinese clone of the BLTouch:

```
Recv: M48 Z-Probe Repeatability Test
Recv: 1 of 10: z: 0.206
Recv: 2 of 10: z: 0.092
Recv: 3 of 10: z: 0.075
Recv: 4 of 10: z: 0.002
Recv: 5 of 10: z: 0.159
Recv: 6 of 10: z: 0.143
Recv: 7 of 10: z: 0.256
Recv: 8 of 10: z: 0.202
Recv: 9 of 10: z: 0.261
Recv: 10 of 10: z: 0.352
Recv: Finished!
Recv: Mean: 0.174884 Min: 0.002 Max: 0.352 Range: 0.350
Recv: Standard Deviation: 0.097545
```

A spread of 0.35 mm on the Z axis is A LOT. I print with a 0.15 mm layer.

P.S. Ordered the original.

## The original arrived

The original BLTouch came, and the M48 results:

```
Recv: Finished!
Recv: Mean: 0.018375 Min: 0.014 Max: 0.025 Range: 0.011
Recv: Standard Deviation: 0.003562
```

A completely different story!

I spent the whole weekend on the printer: installed the original bltouch, levelled the bed with it, and hid the ruramps with a fan in a case, hiding half of the wires that trailed across the desk. Surprisingly, with cooling (a 12 mm fan, no less!) the drivers do not overheat.

The coolest part was that I managed to print a big flat thing, almost without flaws or delamination, and take it off the bed undamaged.

Along the way I started connecting a second relay for the laser. I want to separate the power path and the TTL path of this thing, because it seems that on the ruramps this is not done very well.
