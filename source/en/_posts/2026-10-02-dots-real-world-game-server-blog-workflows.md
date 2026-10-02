---
title: "Dots in Practice: Game Testing, Minecraft Maintenance, and Blog Publishing"
date: 2026-10-02 17:30:00
updated: 2026-10-02 17:30:00
description: "Three real Dots workflows: fishing-game testing, safe Minecraft maintenance, and multilingual blog publishing, with setup costs and clear limits."
permalink: 2026/10/02/dots-real-world-game-server-blog-workflows/
translation_key: dots-real-world-game-server-blog-workflows
translations:
  zh-TW: /2026/10/02/Dots-實測：遊戲試玩、Minecraft-維護與-Blog-發布的三個真實案例/
  zh-CN: /zh-cn/2026/10/02/dots-real-world-game-server-blog-workflows/
categories:
- AI Tools
tags:
- AI
- OpenAI
- ChatGPT
- AI Agent
---

![Concept illustration of Dots handling game testing, server maintenance, and blog publishing](cover.jpg)

There are plenty of Dots feature introductions. What I wanted to know was simpler: **when I hand over my own work, what comes back?** I asked it to play a game from the beginning, maintain my Minecraft server, and research, write, and publish a blog post. All three tasks made progress, but the game remains unfinished, and getting the environment and controls working took considerable effort. Those details are the subject of this post.

<!--more-->

**These are my personal usage notes through October 2, 2026.** The tool and environment adjustments describe this particular setup. The cover is a concept illustration; the three interface screenshots are from my own setup and do not prove completion of the tasks.

## What is Dots? A brief introduction

OpenAI describes dots as personal agents that keep working on responsibilities. You create one in the ChatGPT desktop app, and it uses Codex and connected tools to advance tasks. It has its own cloud computer, and you can choose to connect your computer. Permissions and rules determine what it can do independently and what needs approval. [Official Dots overview](https://chatgpt.com/features/dots/)

I named my dot **six**. The name and appearance are an entry point; the useful question is whether a delegated task produces something I can check.

![Dots customization screen showing six, character styles, and pet options](customize.png)

*My customization screen. This post moves straight from the appearance settings to the work itself.*

## Case one: testing a game starts with getting it to run

The assignment was to play **《伊萊雅－大漁祭》**, a fishing game, from the beginning as an ordinary first-time player, recording progress, time, and suspected bugs. That is more specific than “test my game”: I wanted to see what happens between starting out and running out of resources.

The initial request was for Android in a cloud environment with a visible desktop. The APK installed, but play did not follow. This particular environment lacked hardware acceleration; software rendering and system unresponsiveness held up the task. Its older WebView 83 also hit an **Object.hasOwn** compatibility problem and displayed a blank screen. A long stretch of troubleshooting produced no valid gameplay observation.

We then moved to my Mac, using an ARM64 emulator with HVF virtualization and GPU acceleration, API 36, and WebView 133. The emulator booted in about **26 seconds**. That is an observation about this setup, not evidence that every dots cloud computer cannot run Android. The practical lesson was to **record setup time separately from play time**, so tool failures do not become conclusions about the game experience.

![Dots computer connection card showing the dot computer and personal Mac, with the desktop preview masked](computers-safe.png)

*The computer connection card, with a solid mask over the desktop thumbnail. It illustrates the available environments, not emulator performance.*

### Completing the loop is different from playing like a person

When the computer interaction tool could not capture the emulator, I authorized **ADB**. Having the model judge every action and wait for a tool response was too slow. Progress became steadier after switching to a local controller driven by visible pixel feedback, with AI handling unfamiliar screens and strategy.

The controller initially failed calibration, too. Those failures cannot be counted as game difficulty. Once calibrated reliably, it recorded **62 out of 62** successful fishing attempts on day one and **86 out of 86** on day two, for 148 successes. That **is not a typical human success rate**, and it does not show that AI had learned to play as an ordinary player would.

Timing needs the same care. The 62 controller rounds on day one took **641.089 seconds**; the 86 on day two took **993.991 seconds**. These measurements include tools and waiting, and some timing intervals overlap. They cannot be added into a human completion time or used to claim faster play than a person.

The tested loop was **fish → sell → exchange for tickets → draw bait → equip**. Progress in the first pool was **48 out of 160; the game was not completed**. This helps check the game flow, but it does not establish whether a beginner's experience feels natural. A feedback controller changes the controls, while model round trips introduce delays a human would not have.

### Running out of resources does not settle the design question

On day two, the same save was used after waiting for the natural midnight replenishment. After further play, the result was still **zero bait, zero tickets, 46 gold, and an empty fish bucket**. This exposes a replenishment barrier in the “sell everything, then exchange for tickets and draw bait” strategy. Alternatives such as keeping fish in the tank were not explored sufficiently, so this does not prove every player will get stuck.

My focus was the first-time experience. I suggested a one-time free mechanism, but **it had not been implemented**. Testing can raise design questions; observations, suggestions, and completed changes need separate labels.

A suspected fish-bucket multi-select problem was investigated separately to preserve the playtest baseline. Across 38 unit/component checks and eight UI checks, it did not reproduce. Instead, the controller was found to have misidentified a checkbox. No game bug was established, and no code was changed. Recording a suspicion and then withdrawing it after investigation is more useful than reporting a nonexistent bug.

## Case two: a Minecraft restart needs evidence that the world was saved

The next task was routine maintenance: safely stop and restart my personal Minecraft server running in **tmux** on Oracle, then review its startup logs.

It located the server through an existing SSH alias on my Mac. After confirming **zero players online**, it sent **stop** through the console, waited for all dimensions to save and the old process to exit, then launched the original **start.sh** once. This completed at **16:44:55 Taipei time on October 2**, with subsequent observed TPS around 20.

For this task, “the command did not error” is insufficient. Acceptance requires evidence that **the world was saved, the old process exited, the new process started only once, and the service resumed**. Including those conditions in the assignment makes the restart checkable.

The log findings were also separated by certainty:

- **Confirmed broken:** the **/sell** alias targets a plugin that is not installed, so that command cannot work properly.
- **Needs investigation:** BlueMap reported **No regions found** for nether/end despite region files being present. A path issue remained a suspicion.
- **Warnings to assess:** plugin compatibility messages require individual impact checks; they do not automatically mean the server has failed.

There was no unrequested plugin repair, service reinstall, or world modification. The restart and diagnosis were completed, with unresolved findings preserved. Choosing the next repair remains a separate, scoped task. I could see the important findings without reading every log line, and a warning did not trigger a wholesale server rebuild.

## Case three: “write and publish” ends with a live URL

On October 1, I asked it to write and publish an article about Google's newly announced model. This was a useful test of whether dots could carry a workflow through: consult official sources, distinguish confirmed information, follow the blog's existing Traditional Chinese, Simplified Chinese, and English conventions, prepare a cover and SEO fields, build, deploy, and verify the page.

The deliverable was the live [Gemini 4 Argon article](/en/2026/10/01/gemini-4-argon-launch-pricing-access/), rather than a draft waiting for me to paste it into the blog. The article also distinguished official information from unverified details; it did not present announcement research as hands-on model testing.

The prerequisites were clear: I already had a repository, an editorial style, a deployment process, and an explicit request to publish. An agent can connect research, writing, and building, but **source reliability, private information in the draft, and whether the live page actually loads** still need individual checks. A successful build does not prove the website has updated.

A topic with no established style or contradictory sources might require much more judgment. This case shows delivery through an existing publishing process, not that a single instruction can produce reliable coverage of any subject.

## How I would assign the next task

These three experiences made completion criteria more important to me. Instead of only saying “handle this,” I would include:

1. **Goal:** specify whether this is a first-time playtest, a restart, or publication.
2. **Scope:** identify the computer, save, or repository, and what can be changed.
3. **Acceptance:** request progress notes, save and restart evidence, or a working public URL.
4. **Stop conditions:** if setup repeatedly fails, the time budget is exceeded, or changes need a wider scope, report progress and blockers first.

![Dots call card showing six calling, with mute and hang-up buttons](calling.png)

*The call card shows Calling…. The cases above rely on text instructions and execution records; this image is not verification of call quality.*

**Dots fits work with a clear goal, evidence to retain, and results that can be checked incrementally.** Game-flow checks, routine maintenance, and publication under existing conventions can all be accepted against concrete outputs. This experience gives me less reason to hand over tasks requiring continuous low-latency reactions, subjective human experience measurements, or an undefined standard of success.

The game remains unfinished, the BlueMap question remains open, and the blog has a published article. Those differences belong in the usage record: what was completed, what it cost to get there, and which conclusions remain unsupported. For the launch background, see the [OpenAI DevDay 2026 recap](/en/2026/09/30/openai-devday-2026-announcements/).
