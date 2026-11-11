---
title: "A Telegram bot that writes a digest of a busy chat"
date: 2024-06-16
summary: "It runs as a userbot under my own account and uses a local Ollama, no clouds."
---

I want to try writing a bot for Telegram that would put together a digest of what was discussed in active chats, say every 500-1000 messages (using local AI).

I need an active chat for experiments 😅

## Two months later

I coded that Telegram bot. It is used in exactly one chat, through the UserAPI (logging in under my own account, not a bot one). The sources are partly on GitHub, but it is a mess in there that nobody could find their way through. I will tidy it up later. It makes heavy use of a local Ollama, no clouds and no murky APIs.

So I did write it! And it even runs in the cluster at home, as a userbot (under my account).

The sources, as is tradition, are here: [github.com/DiverOfDark/TelegramSummarizer](https://github.com/DiverOfDark/TelegramSummarizer)

Some day later I will finish the readme and a docker-compose to make it easier to run locally.
