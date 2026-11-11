---
title: "Building a Voron 2.4"
date: 2022-10-23
summary: "An open-source printer that is just a list of parts and a manual. Magic smoke on the first power-on, and a week lost to two swapped pulleys."
---

Now that we have settled in a bit, I want to build myself a new 3D printer. This time it will be a Voron 2.4. What sets it apart is that it is not a finished printer made by some company, but an Open-Source Design: in essence just a list of components you have to buy and a manual on how to assemble them. And at the same time it is practically the coolest thing you can build right now. I have already ordered all the components and most of them have arrived, so I will start building soon :) It looks like this will take just about a couple of months.

## December: first power-on

I moved all of the printer's electronics into its basement. Now I somehow have to make cable management out of that 😅

![Voron frame turned upside down with the electronics bay full of loose wires](/img/blog/building-a-voron-1.jpg)

I tried to turn the printer on.

Magic smoke came out of the head, and the scale of the damage is not clear yet. Everything else seems to work.

On the minus side, the manufacturer of the Octopus Pro (the printer's mainboard) is a rascal: by default it turns all the heating elements on at maximum, before any firmware is flashed.

The bed heats up fast.

I switched everything off and am waiting for it to cool down, and for now I will install all the software. Tomorrow I will figure out what is wrong with the head.

## January: the pulleys

The pluses: from the point of view of electronics this beauty works completely. The head is connected over the CAN bus, and everything heats, spins and moves.

![Assembled Voron 2.4 frame with a red print head standing on a white cabinet](/img/blog/building-a-voron-2.jpg)

The minuses: the belts and the squareness. Right now it is so crooked that it cannot travel properly along the Z axis, and when it moves along X it shifts slightly along Y.

In the end I spent almost the whole week trying to understand what was wrong with the printer. I went through everything I could, redid the connectors, squared the printer, re-tensioned the belts several times. And just when I had completely given up, I finally saw that during assembly I had mixed up the pulleys between Z3 and X/Y, and they are different: 16 and 20 teeth.

The mystery is solved, tomorrow I will swap them and carry on building.

## It moves

Well, the printer works: it moves in all directions as it should, and the gantry levels itself against the bed.

And then I tried to test the extruder, and in the end I clogged the nozzle, plastic leaked out where it should not, and while I was trying to take it all apart with the power on, I again broke something in the sb2040 board on the head. It no longer runs from the printer's 24 volts 😭

Stay tuned, some day I will overcome this.
