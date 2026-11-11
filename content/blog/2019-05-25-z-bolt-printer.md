---
title: "A new printer, and the list of things to redo on it"
date: 2019-05-25
summary: "A z-bolt max arrived: corexy, hiwin rails, and an 8-bit board that I plan to replace with a duet wifi."
---

A new 3D printer has joined the family, and I am wrecked from hauling 36 kg in a box.

![Wooden shipping crate marked Z-BOLT standing on the floor](/img/blog/z-bolt-printer-1.jpg)

So, about the new printer. It is a z-bolt max: 200x300 print area, corexy mechanics, an enclosed case, rails from hiwin, 24V main power, and the bed is heated from 220V.

That is where the pluses end and the areas for improvement begin:

- I need to fit the bl-touch auto-levelling on it somehow. The authors of the printer provided a mount for it, but it is a bit cramped in there.
- An 8-bit control board.
- An mks tft screen (a subjective minus: it is pretty, but does little).
- It is very noisy. The power supply, the motors and the fans make noise, and the plywood amplifies it like a drum. I plan to replace the current control board with its drivers (mks gen l + a4988) with a duet wifi (which has tmc 2208 soldered on), which I already have lying around. As a consequence that means changing the firmware, the screen and so on.
- The case lighting is controlled by a button on the side, when really it could be controlled from the firmware.
- The laser has to be mounted on the printer somehow. Probably by printing an alternative mount for the print head and running power to it somehow.
- Possibly the power supply and the fans should be replaced with something less noisy.
