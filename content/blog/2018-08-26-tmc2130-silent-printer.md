---
title: "TMC2130 drivers: the printer went silent"
date: 2018-08-26
summary: "I finally swapped the stepper drivers, and the loudest thing left is the fan."
---

I finally got round to swapping the drivers on the printer for TMC2130.

And let me tell you, it is something else! If you have a 3D printer, you really should look into buying proper drivers.

I have not had time to print anything yet, but I did manage to set microstepping to 1/256 instead of 1/16 (without interpolation, on 32 bits there is enough power to compute it on the chip) and to appreciate how much quieter the printer became.

Not even like that: QUIETER.

And the motion seems smoother, but that has to be tested by printing.

Unfortunately I need to replace the PEI sheet on the bed and re-level it, so I will not print anything big soon, but a calibration cube is coming 😁

## Three days later

I printed the test cube. So, the printer did not become quieter. It became silent altogether.

The loudest things during the print were the part cooling fan and the fan in the ATX power supply.
