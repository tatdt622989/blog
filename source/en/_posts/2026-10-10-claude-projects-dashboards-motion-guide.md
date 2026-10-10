---
title: "Claude's New Products: Projects, Dashboards, and Motion Explained"
date: 2026-10-10 20:24:21
updated: 2026-10-10 22:43:02
description: "Explore Claude's redesigned Projects, Dashboards, and Motion: availability, starter prompts, practical limits, and Claude Design migration."
permalink: 2026/10/10/claude-projects-dashboards-motion-guide/
translation_key: claude-projects-dashboards-motion-guide
translations:
  zh-TW: /2026/10/10/Claude-新產品介紹：新版-Projects、Dashboards-與-Motion-怎麼用/
  zh-CN: /zh-cn/2026/10/10/claude-projects-dashboards-motion-guide/
categories:
  - AI Technology
tags:
  - AI
  - Claude
  - Claude Code
  - Anthropic
---

![Concept illustration of Claude Projects coordinating work alongside Dashboards charts and Motion animations](cover.jpg)

**Claude's recent product updates include redesigned Projects, Dashboards, and Motion.** The Projects beta was announced on September 17, followed by Dashboards and Motion on October 8. Together, these updates add ways to manage ongoing work, explore data, and explain ideas visually. [Projects announcement](https://claude.com/resources/articles/projects-redesigned), [Dashboards and Motion announcement](https://claude.com/resources/articles/dashboards-and-motion).

This article uses official announcements and documentation checked on **October 10, 2026**. I have not tested these products independently. The guide separates what each feature offers, who can access it, and the small tasks I would use to evaluate it.

<!--more-->

## What each product does, and who can use it

| Product | Main purpose | Current availability |
| --- | --- | --- |
| Redesigned Projects | Coordinate related tasks and parallel threads over time | Beta rolling out to selected Claude Code users on Pro and Max |
| Dashboards | Build dashboards from connected data sources | Beta on Pro, Max, Team, and Enterprise |
| Motion | Animate text, charts, and images into explainers | Beta on Team and Enterprise |
| Docs, Slides, and Design | Create documents, presentations, and designs | Out of beta, available on all plans, including Free |

See the [Projects availability guide](https://support.claude.com/en/articles/9517075-what-are-projects) and [Artifacts plan comparison](https://support.claude.com/en/articles/17153992-what-are-artifacts-and-how-do-i-use-them). Enterprise access also depends on administrator settings.

![Claude product comparison: Projects coordinates tasks, Dashboards explores data, and Motion creates animations](products-overview.jpg)

*Figure 1. Choose by the work: Projects takes a goal through parallel tasks to review; Dashboards takes data through charts to inspection; Motion takes assets through animation to an MP4 export.*

## Projects: one place to keep related work moving

Existing Projects organize chats, knowledge files, and project instructions. **The redesign adds coordination:** you describe work in a central conversation, and Claude distributes tasks, coordinates progress, and assembles results. Cloud threads use shared project context and memory, while **Library** collects the files you add and the files they produce. [Existing and redesigned Projects](https://support.claude.com/en/articles/9517075-what-are-projects).

![Claude Projects coordination flow: a goal reaches a coordinator, cloud threads work with shared context, and results return for review](projects-workflow.jpg)

*Figure 2. One possible game-release task split: the main conversation coordinates fixes, tests, and documentation. Cloud threads share project context, with results collected for review and in Library. The actual split depends on the task.*

For an app or game developer, I would start with a release that involves several related tasks: fixing login, adding tests, and drafting release notes. The useful question is whether the project reduces repeated briefings and makes work awaiting review easier to find.

A first task could look like this:

> The goal of this project is to improve a new player's first session. Identify the two most confusing steps in the tutorial, propose improvements, and add tests. Explain your task split first. Deliver code changes as reviewable PRs and leave merging to me.

If the rollout has reached your account, start in **claude.ai/code → Projects** or the desktop app's **Code** tab. Add the repositories and files the work needs. Cloud coding tasks require the appropriate GitHub access; your local tools and configuration are not automatically inherited. [Setup guide](https://code.claude.com/docs/en/claude-projects).

**Cloud threads can continue after you close your laptop. Threads running on your computer need it awake and connected.** Parallel edits can still create merge conflicts, and multiple sessions consume your plan allowance faster. I would begin with one or two small tasks, inspect the results and usage, then widen the scope. [Cloud and local execution](https://code.claude.com/docs/en/remote-control), [parallel work and usage](https://claude.com/resources/articles/projects-redesigned).

Having the existing chat Projects interface does not establish access to the redesign. The beta is still rolling out, and Team and Enterprise do not have it yet. Existing Projects continue to work. [Current availability](https://code.claude.com/docs/en/claude-projects).

## Dashboards: make the numbers inspectable

Claude Dashboards connects to platforms such as BigQuery and Snowflake, as well as apps such as Salesforce. Ask a question in natural language and Claude builds charts with inspectable queries and data refresh timestamps. [Dashboards guide](https://support.claude.com/en/articles/17454700-get-started-with-claude-dashboards).

![Claude Dashboards flow: connect data, ask a question, inspect each chart's query and refresh time, then verify and share](dashboards-workflow.jpg)

*Figure 3. Data and a question produce a dashboard. Inspect its query and last refresh time, then verify the metric definitions before sharing. The charts shown are conceptual illustrations.*

For product work, start with a question you can check. “Which subscription plan drove last month's growth?” gives you a clearer test than “Make a nice dashboard.”

> Using the connected subscription data, compare new paid users and cancellations by plan over the last eight weeks. State the date fields, time zone, and metric definitions, then build weekly trend charts.

**A polished chart still needs a sound definition.** Refund treatment and whether cancellations count at request time or subscription expiry can change the interpretation. I would reconcile one known week before relying on the dashboard in a regular report.

Anthropic positions Dashboards for quick exploration, with deeper work continuing in other analytics tools. Connectors inherit source-service access permissions, so available data still depends on authorization. [Intended use](https://support.claude.com/en/articles/17454700-get-started-with-claude-dashboards), [connector permissions](https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities).

## Motion: explain a feature with editable animation

Claude Motion makes short explainers, product walkthroughs, and animated charts. It animates text, shapes, and images through code, allowing changes to content and timing. It does not generate realistic footage or people. [Motion guide](https://support.claude.com/en/articles/17454997-get-started-with-claude-motion).

![Claude Motion's four steps: supply assets, describe the story, edit the animation, and export MP4](motion-workflow.jpg)

*Figure 4. Supply assets, describe the story, edit the animation, then export MP4. Naming the audience and intended duration helps you refine the content and pacing.*

For a game tutorial, I would specify the audience and supply the material first:

> Use the attached game screenshots to make a 20-second tutorial for new players. Show choosing a level, starting a challenge, and collecting rewards in that order, with one point per scene. Preserve the button names so players can match the animation to the game interface.

Start through **Output → Motion** in the message box, or choose a Motion template in **Artifacts**. You can adjust the result through chat or the editor and export it as **MP4**. [Creation and export](https://support.claude.com/en/articles/17454997-get-started-with-claude-motion), [editing artifacts](https://support.claude.com/en/articles/17153992-what-are-artifacts-and-how-do-i-use-them).

Motion draws on your existing plan limits, with longer or more complex animations using more. A short first segment makes it easier to check accuracy and pacing before expanding the piece. [Motion usage](https://support.claude.com/en/articles/17454997-get-started-with-claude-motion).

## What changed for Docs, Slides, and Design

The October 8 announcement also takes **Docs, Slides, and Design out of beta and onto every plan**. On Enterprise, these templates turn on by default on **October 15**. Dashboards and Motion remain off by default there; owners enable them in **Organization settings → Artifacts**. [Announcement](https://claude.com/resources/articles/dashboards-and-motion), [administrator guide](https://support.claude.com/en/articles/16994751-artifacts-admin-guide-for-team-and-enterprise-plans).

Existing Design users have another date to track: **the standalone claude.ai/design site closes on December 14, 2026**. Design-system migration is available now. Projects remain on the standalone site for the moment, with migration details still to come. Chats and comments will not carry over, and standalone public project links will stop working, so save anything you need beforehand. [Design migration guide](https://support.claude.com/en/articles/17440474-migrate-from-standalone-claude-design-to-claude).

## Choose a first task you already understand

- **An ongoing development goal keeps producing tasks:** try redesigned Projects and inspect coordination, review quality, and usage.
- **You need to understand a change in product metrics:** try Dashboards with one clearly defined metric.
- **Players or colleagues need a quick feature explanation:** Team and Enterprise users can try Motion.

As an independent developer, I would first evaluate whether Projects keeps related tasks aligned when requirements change, and whether its output is easy to review. For Dashboards and Motion, an existing weekly report or product explanation gives you a familiar baseline for judging the time saved.

For a broader comparison of coding tools, see [Claude Code, Codex, and Cursor: which fits your work?](/en/2026/05/06/claude-code-vs-codex-vs-cursor/).
