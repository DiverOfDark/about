---
title: "New brains for the 3D printer"
date: 2018-06-13
summary: "My 8-bit Arduino and RAMPS setup is too slow, so I ordered an Arduino Due, a RURAMPS4D and TMC2130 drivers."
---

I ordered a pile of goodies for the printer: a ruramps4d and an arduino due (32-bit brains that do not lag, finally!), a filament runout sensor, and TMC2130 stepper drivers (for quiet, good-quality printing). When all of it arrives, there will be the entertaining process of building Marlin firmware for the whole thing.

A bit more about the printer. I ordered all this to improve it radically. My current setup:

- Frame: a Prusa i3 clone with a steel frame
- Arduino: 8bit AVR
- RAMPS: the board that controls the 12V stuff like the bed, the hotend and so on
- A4988 motor drivers: the simplest thing there is, needed to drive the motors

This is a fairly basic and standard setup, and it has downsides. The 8-bit microcontroller often cannot keep up. It is simply slow, and the delays cause micro-artifacts on the prints. It is especially visible on halftone laser engraving: with fast movement of the kind "move 1 pixel, change the power, move one more pixel, change the power again", the lag is visible to the naked eye.

Some time ago I started looking for alternatives and settled on the following setup:

- Arduino Due: the same form factor, but on a 32bit ARM, much faster and more powerful. The problem is that RAMPS is not compatible with it: in the Due all logic levels are 3V3, and in the old one 5V.
- RURAMPS4D: a rethinking of RAMPS by a compatriot of mine, designed for 3V3. Almost like the old ramps, but on steroids.
- TMC2130: seriously cool motor drivers from Trinamic. In essence they create feedback from the EMF of the windings, interpret it, and report skipped steps, or optimise the power so that the motor is silent.

Yesterday I got the ruramps4d in my hands, the tmc2130 are waiting for me at the post office, all that is left is to wait for the new arduino and I can level up the printer.

UPD: [a very good review of the TMC2130](http://3dtoday.ru/blogs/svs0724/tms2130-applied-technology-and-connection-to-ruramps4d-in-the-configur/) by the author of the RURAMPS4D.
