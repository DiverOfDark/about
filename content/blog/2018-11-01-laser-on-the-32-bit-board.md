---
title: "The laser works on the new board, and I broke the board twice"
date: 2018-11-01
summary: "The servo outputs give a fine 5V PWM for the laser. The RURAMPS4D takes wrong polarity very badly."
---

Good news: for the first time since moving from the 8-bit arduino+ramps to the due+ruramps4d, I found out how to attach the laser to this wonder so that it works. It turns out that the outputs for controlling servos give an excellent 5V pwm that suits the laser's ttl input, and the laser's power I connected through a relay.

On the minus side, the ruramps4d itself takes wrong polarity (and the author's crooked hands) very badly, and something seems to have broken in it, because of which the 3dtouch stopped working. When it is connected there is hellish interference on the screen and the sensor does not react. It looks like something in the 5V circuit. Given that the mosfet for the second fan has been permanently on for a long time in a similar way, I decided it is time to order a replacement. I hope the author has them in stock.

## The replacement

I got the new ruramps4d, and everything was fine until I connected the new mks tft screen the wrong way... and now something is broken in this one too, and the old full graphics display does not work, it is all interference 😭

But I connected the laser, did a couple of test engravings, and I see the same problem as on 8 bits: movement slows down under a large stream of commands.

I will try the klipper firmware. It has a different philosophy (the firmware on the printer itself only drives the motors, and all the logic is on the raspberry pi), and they say it does better with this.

I also tested lasergrbl (excellent software for converting pictures to g-code, including vectorisation). Though for that I had to write my own converter from the machine-tool dialect of g-code to the printer one.
