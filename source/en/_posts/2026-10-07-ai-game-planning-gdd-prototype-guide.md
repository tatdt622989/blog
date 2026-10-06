---
title: "Plan a Game with AI: Core Loop, Playable Prototype, and GDD"
seo_title: "Plan a Game with AI: Core Loop, Prototype, and GDD"
date: 2026-10-07 00:23:48
updated: 2026-10-07 00:23:48
description: "Define a core loop, scope a playable prototype, and write a one-page GDD before coding with AI. Includes a star-catching example, a template, and test checks."
permalink: 2026/10/07/ai-game-planning-gdd-prototype-guide/
translation_key: ai-game-planning-gdd-prototype-guide
translations:
  zh-TW: /2026/10/07/用-AI-做遊戲前先規劃/
  zh-CN: /zh-cn/2026/10/07/ai-game-planning-gdd-prototype-guide/
categories:
- Game Development
tags:
- AI
- Game Development
- GDD
- Prototyping
---

![A game design notebook showing falling stars and a basket, beside a controller and planning cards](cover.jpg)

A request for an AI-built RPG can quickly expand into characters, equipment, random rewards, and multiplayer before a single round is playable. Start by deciding what the player repeatedly does, then reduce it to a small prototype you can play, restart, and observe. This guide uses a star-catching game to define the core loop, a one-page GDD, and first-version acceptance checks.

<!--more-->

## Describe a round of play, not just a theme

Pixel art, cozy fishing, and fantasy RPG describe a look or theme. They do not yet describe player behavior. Ask: **What action does the player take, what feedback follows, and how do they choose their next action?** That repeating sequence is the core loop.

Our example is **move the basket → catch a star and score → locate the next falling star → move again**. Investigate that loop before adding power-ups, unlocks, and rankings.

Add the play context. In this example, we assume players want short rounds on a phone in portrait orientation, with arrow-key controls on desktop too. A game that needs two people sharing a screen or precise mouse input would have a different plan.

## Scope the first prototype to one complete round

I would start with one scene, one basket, one type of falling object, and a restart button. Use simple colored shapes to get the rules running. Character animation and finished artwork can follow once the gameplay shows promise.

| Keep in the first version | Leave for later |
| --- | --- |
| Horizontal movement and catching stars | Character selection, items, and skill trees |
| Score, remaining time, and lives | Level maps, daily tasks, and long-term progression |
| Start, end, and restart | Accounts, rankings, and multiplayer |
| Touch and keyboard controls | Ads, payments, and store systems |

Unity Learn's [project design document lesson](https://learn.unity.com/tutorial/lab-1-personal-project-plan) also covers the concept, timeline, and MVP sketch before development, with later features kept in a backlog. The star-catching rules and template below are an original exercise for this article.

A **playable prototype tests a gameplay hypothesis**. Later, a short section with near-final art and audio can help assess the fuller experience. Neither means the game is ready for release; the first prototype does not need to solve every stage at once.

## Specify rules the AI should not have to invent

“Award points for catching stars” leaves many decisions open. For our example, agree on these rules:

- A round lasts at most **30 seconds**, with **3 starting lives**.
- The basket moves horizontally and cannot leave the play area.
- During play, one star spawns each second and falls at a constant speed.
- A star touching the basket awards **1 point** and is removed. Each star can score once.
- A star passing the bottom costs **1 life** and is removed, without repeated deductions on later frames.
- The round ends when time or lives reach zero. If both happen together, enter the end state once.
- After the round ends, spawning and movement stop. Restart clears old objects and timers and resets score, time, and lives.

These numbers are illustrative starting values, not tested balance settings. Keep falling speed, spawn interval, and round duration together as **adjustable parameters**. Change one at a time after playtesting so you can understand its effect.

Specify input as well: hold the left or right arrow key on desktop; drag the basket within the play area on a phone; stop at the edges. If the portrait viewport changes size, the basket and spawning area should remain visible.

## A one-page GDD for the important decisions

**GDD stands for Game Design Document.** A small prototype can begin with one page covering the gameplay, scope, and questions to investigate. Download the [blank game planning template](game-plan-template.txt), or use this completed example:

> **One-sentence concept:** move a basket to catch stars and increase your score during a short round.
>
> **Players and platform:** people wanting short rounds; portrait phones and desktop browsers.
>
> **Core loop:** move → catch and score → locate the next star → move again.
>
> **First-version content:** one scene, basket, stars, score, time, lives, end state, and restart.
>
> **Out of scope:** multiplayer, character progression, rankings, accounts, ads, and payments.
>
> **Rules and input:** use the decisions above, keeping speed and interval adjustable.
>
> **Assets:** colored shapes for the basket and stars, with clear collision and scoring feedback.
>
> **Questions to investigate:** can players understand the goal, finish a round, and explain why they want another try?

Record new ideas in the backlog rather than adding them directly to the first version. Revisit scope when an idea changes the gameplay you are trying to investigate.

## Check rule correctness and enjoyment separately

Rules can have explicit acceptance checks. Enjoyment needs people playing and observation; an AI inspecting screenshots or code cannot establish it for you.

| ID | Action | Expected result |
| --- | --- | --- |
| G1 | Keep moving or dragging left and right | The basket responds and stays within bounds. |
| G2 | Let a star touch the basket | Score increases by one and the star disappears. |
| G3 | Let a star pass the bottom | Lose one life; that star cannot affect the game again. |
| G4 | Let time or lives reach zero | Enter the end state once; falling and spawning stop. |
| G5 | End and restart several rounds | Score, lives, and time reset without accelerating star generation. |
| G6 | Play at the agreed phone and desktop sizes | Controls, score, and restart remain visible and usable. |

These are planning targets, not results from a game tested for this article. Once the prototype exists, record the device, version, steps, and actual results alongside them.

Let a playtester try without spoken instructions first. Observe whether they understand that they should catch stars, distinguish success from a miss, and choose to restart. Then ask which moment they enjoyed, where control felt awkward, and why they wanted another attempt. Record their words and actions to guide the next change. A single playtest does not establish retention.

## Give AI playable milestones

Send the GDD with a prompt such as:

> Separate the confirmed rules, missing decisions, and assumptions in this game plan. Do not add levels, items, accounts, or payment features. Break the first prototype into milestones that can each be launched and played, linking them to G1 through G6. Present the plan and unresolved questions before implementing the first milestone.

I would use this sequence:

1. **Controls:** display the basket and implement keyboard input, dragging, and bounds.
2. **Rules:** add spawning, collisions, scoring, and life loss.
3. **A complete round:** add time, ending, and restarting; check that old state is cleared.
4. **A playtest:** verify phone and desktop input, then let someone try without verbal instructions.
5. **A decision:** use observations to adjust feel, keep the loop, change rules, or reduce the prototype further.

Deliver something playable at each step. Estimate dates from your available time and familiarity with the tools; an AI-generated schedule begins as an assumption.

Once the gameplay and scope are clear, continue with the [game engine selection guide](/en/2026/09/09/gpt-6-game-engines-guide/), or return to the [AI development map](/en/ai-dev-map/) for assets, testing, and launch guides.
