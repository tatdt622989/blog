---
title: "Four AI models built the same rescue game. What changed?"
date: 2026-09-16 11:28:18
updated: 2026-09-16 11:36:43
description: "Four AI models build one 60-second rescue game. Compare their interfaces, rule corrections, execution conditions, and verified music and voice credit use."
permalink: 2026/09/16/four-ai-models-rescue-game/
translation_key: four-ai-models-rescue-game
translations:
  zh-TW: "/2026/09/16/four-ai-models-rescue-game/"
  zh-CN: "/zh-cn/2026/09/16/four-ai-models-rescue-game/"
categories:
  - "AI Tools"
  - "Game Development"
tags:
  - "AI Coding"
  - "Qwen"
  - "DeepSeek"
  - "SWE-2 Max"
  - "GPT-6 Astra"
  - "Suno"
  - "ElevenLabs"
---

![Four rescue boats face one storm, illustrating four AI models building the same game](cover.png)

**What changes when four AI models build the same game from the same specification?** I used Qwen3.8-Max, DeepSeek V4.1 Flash, SWE-2 Max, and GPT-6 Astra to make a 60-second sea rescue game. All four can start a rescue. The more useful differences are in feedback, corrections, and the work required to turn generated code into something playable.

<!--more-->

## What each model delivered

The comparison is organized by **model**, with the execution tool listed separately.

| Model | Tool and setting | Observed result |
|---|---|---|
| Qwen3.8-Max | Qoder CLI | Persistent rescue stats and a departure prompt; a game existed at the initial 25-minute limit, with inspection notes added later |
| DeepSeek V4.1 Flash | Command Code | A live score and hearts for health; complete content was generated, but file writes were blocked |
| SWE-2 Max | Devin CLI | Visible keyboard, joystick, and pause instructions; reinforcement timing and collision protection needed correction |
| GPT-6 Astra | Codex, xhigh | Four separate rescue stats and text feedback for pickup, full capacity, and delivery; added later as a comparison entry |

**There is no winner for “most fun” yet.** Each version passed 12 controlled rules checks, for 48 across the four games. Those checks establish specific behavior, not player preference.

![The four-version rescue game page with version switching, play controls, and vote reveal](play-lab.png)

The play page presents A/B/C/D before revealing model names. **This article remains a draft; public play and online voting have not launched.** The public link and player results will be added when they are available.

## Why picking someone up is only half the rescue

The game, **The Last Boat Before the Storm**, places twelve people at sea. You have sixty seconds to return at least eight to the harbor and keep your boat afloat.

There are only three seats. Each passenger reduces speed by 8% of the boat’s base speed, and a rescue counts only when you return to port. That creates a recurring choice: detour for a third passenger, or deliver the people already aboard?

Floating logs damage the boat; whirlpools slow it down. Delivering eight people is enough if you survive until time runs out. Delivering all twelve ends the round early. Route choice, capacity, and risk form a complete game loop that every model has to implement.

## Two different kinds of failure

**DeepSeek V4.1 Flash encountered a delivery problem.** Command Code generated the complete file content, but permissions blocked the write. The recorded content was saved exactly as produced, without changing gameplay. This affected the delivery workflow; it does not establish that the model could not write the game.

**SWE-2 Max needed timing corrections.** The specification adds logs at twenty and forty seconds, with a warning starting 1.5 seconds earlier. The initial implementation needed changes to that schedule and to collision invulnerability. A screenshot alone would not reveal these errors: they required advancing the game state and checking the rules.

Generating files, starting the game, and implementing the rules correctly are separate delivery milestones.

## Shared rules, different execution conditions

The games share the map, survivor positions, movement values, collisions, and artwork. The first comparison is silent. Models can choose their layout and feedback, but cannot change the rescue objective or scoring.

**GPT-6 Astra was added later.** It retained the conversation used to integrate and review the first three games, and it did not use their initial 25-minute CLI limit. That context difference may affect the result and belongs in the comparison.

The models also ran through different tools, permissions, and workflows. This is a comparison of these finished submissions and their production process, rather than evidence for a general model ranking.

## What the subscription credits produced

| Resource | Output | Verified deduction |
|---|---|---|
| Suno v6 | Six candidates: two each for marimba adventure, electronic urgency, and a chamber-style return to port | 30 credits |
| ElevenLabs Multilingual v2 | About 75.6 seconds of Traditional Chinese narration | 383 credits |
| Four coding models | Four games, inspection notes, and corrections | Incomplete deduction records; no total cost claimed |

The six tracks are candidates, with no final selection yet. The existing narration and rough-cut video describe the original three entries and need updating for the fourth. The games remain silent so the first comparison focuses on play.

For subscription context, see the [AI coding tool subscription comparison](/en/2026/09/14/ai-coding-tools-subscription-comparison/).

## The next comparison belongs to players

Background-browser checks exercised start, pause, version switching, and reveal. GPT-6 Astra’s version also completed an actual pointer-joystick pickup and return, timeout, and restart. Physical-phone touch feel and human difficulty testing remain open.

The hosted vote will require at least fifteen active seconds in each version. Players can then choose a favorite and see model names, counts, shares, and total participation. One anonymous browser gets one ballot per round, but switching devices can still allow repeat participation. Results will therefore be labeled as voluntary player preferences.

The four games and their development records now exist. The next question is which one people want to play again before they know who made it.
