---
title: "A smart speaker in two weekends"
date: 2026-06-01
summary: "Ten years ago this took a whole team."
---

It is amazing how far technology has come. Ten years ago you needed a whole team to make a smart speaker.

Now one person and two weekends are enough.

![A round 3D-printed speaker with FEMTO printed on top](/img/blog/smart-speaker-1.jpg)

Inside there is an ESP32-S3 with an XVF3800, and a local wake word. It connects to a backend in my home Kubernetes through STUNner.

Text-to-speech and back is done by ElevenLabs.

For brains: GPT-5.4, with Hermes as the harness.

Obviously it still needs tools, such as a timer, and a way for the agent to send something to the speaker on its own initiative.

But it is cool, right?! What a time to be alive...
