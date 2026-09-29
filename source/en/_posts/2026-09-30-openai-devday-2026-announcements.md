---
title: "OpenAI DevDay 2026: Dots, Space, GPT-6.1 Sol and All 25 Updates"
date: 2026-09-30 01:52:47
updated: 2026-09-30 01:52:47
description: "Explore all 25 OpenAI DevDay 2026 announcements, from dots and GPT-6.1 Sol to Space, Codex Cloud, API pricing, previews, and rollout details."
translation_key: openai-devday-2026-announcements
permalink: 2026/09/30/openai-devday-2026-announcements/
translations:
  zh-TW: "/2026/09/30/OpenAI-DevDay-2026-總整理：Dots、Space、GPT-6-1-Sol-與-25-項更新/"
  zh-CN: "/zh-cn/2026/09/30/openai-devday-2026-announcements/"
categories:
- AI Tools
tags:
- OpenAI
- DevDay
- ChatGPT
- Codex
- GPT-6.1 Sol
---
![Concept illustration of a dots personal agent and the GPT-6.1 Sol model](cover.jpg)

OpenAI DevDay 2026 connects personal agents, shared documents, and developer infrastructure. **Dots takes on ongoing work, ChatGPT Space holds shared context, and GPT-6.1 Sol and Ultrafast address capability, cost, and latency.** This guide covers the 25 entries in OpenAI's announcement index and explains the distinctions that matter before trying them.

<!--more-->

**Updated September 30, 2026, UTC+8.** This article reflects official material available during the event. Released features, limited previews, and upcoming capabilities are distinguished below; access can depend on plan, region, and administrator settings.

## Dots: a personal agent for ongoing work

Dots is intended to take responsibility for continuing work, beyond answering individual prompts. Its product page explicitly says it is **powered by GPT-6 Astra**, and users create a dot in the ChatGPT desktop app. Its appearance alongside the new Sol model should not be taken to mean Sol powers it by default. [Dots product page](https://chatgpt.com/features/dots/)

The question I would use to judge it is simple: can it pick up the work tomorrow? Keeping project information current, preserving context, and returning consequential decisions to the user would make a more meaningful difference than a single successful demonstration.

## GPT-6.1 Sol: capability at a lower price

OpenAI positions GPT-6.1 Sol close to Astra on several coding, computer-use, and professional-work evaluations. Those are vendor results, not benchmarks performed for this article, and they do not establish equivalence on every task. [Model announcement](https://openai.com/index/introducing-gpt-6-1-sol/)

| Standard API usage | Price per million tokens |
|---|---:|
| Input | US$2 |
| Cached input | US$0.10 |
| Output | US$10 |

The model ID is **gpt-6.1-sol**. Its context window is 1,050,000 tokens, with up to 128,000 output tokens. Requests exceeding 272K input tokens have higher long-context rates, so the standard prices above are not a universal estimate. [Model specifications](https://developers.openai.com/api/docs/models/gpt-6.1-sol)

Tool calling requires the Responses API. Supported reasoning efforts are low, medium, high, xhigh, and max; none and minimal are unavailable. The announcement makes the model available in **ChatGPT Work and Codex** for Plus, Pro, Business, Enterprise, and Edu, while explicitly excluding ordinary Chat for now.

## Ultrafast and Pro 500

Ultrafast is an inference service tier, selected in API requests with `service_tier: "ultrafast"`. For applications that call tools frequently, OpenAI recommends a persistent WebSocket connection to reduce round-trip overhead. Regional support currently covers US data residency and global processing. [Ultrafast documentation](https://developers.openai.com/api/docs/guides/ultrafast-mode)

Astra Ultrafast launches first; **GPT-6.1 Sol Ultrafast is still upcoming**. Faster token generation should not be read as an equivalent improvement in the time needed to finish an entire project.

**Pro 500 costs US$500 per month.** Among personal Pro plans, it is the one that includes Ultrafast. Buying credits on Pro 100 or Pro 200 does not unlock it at launch. Usage draws on the plan allowance first, then the credit balance. [Pro plan details](https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers)

## ChatGPT Space, Pages, and collaborative slides

Space gives people and agents shared context. Pages support live editing and comments, with ChatGPT or a dot invited to make changes. Connected tools can also help keep information current. Space is offered on Pro, Business, and Enterprise; collaborative slides and spreadsheets remain marked as coming soon. [Space product page](https://chatgpt.com/features/space/)

For a team, the practical test is whether everyone can identify the current version and the next responsible person. A shared document becomes more useful when it also makes handoffs clear.

## Understanding the Codex harness, Cloud, and Agents API

A **harness** is the execution system around a model: the machinery coordinating tools, state, and workflows. Cloud describes where work runs. The official index does not list “Codex Harness” as a separate product, so this guide uses the term to explain architecture rather than adding a 26th announcement.

Codex Cloud prepares repositories, dependencies, and tools in reusable published environments, while maintaining separate working state for individual tasks. Developers review changes and test results before committing or opening a pull request. [Codex Cloud](https://learn.chatgpt.com/docs/cloud)

The Agents API is an integration surface for applications, with computer use added to its capabilities. Directly assigning a development task and embedding an agent in a service are distinct ways of using this infrastructure. [Computer-use documentation](https://developers.openai.com/api/docs/guides/agents-api/tools/computer-use)

Security Cloud scans connected GitHub repositories, monitors commits, and can propose patches for review. Its cloud workflow is separate from the local Security plugin. [Security Cloud setup](https://learn.chatgpt.com/docs/security/setup)

## Decisions API

This limited preview uses Luna to choose among developer-defined answers from text or image context. That supports classification, routing, and selecting an agent's next action. Broader release is planned in the coming days. [Official recap](https://openai.com/index/devday-2026-recap/)

The flight-search demonstration illustrates a possible workflow. It does not establish that the API manages an entire booking process. A useful interpretation is a decision point whose output determines which action another tool should take.

## Plugins as part of the working interface

Extensions support sidebar entry points, conversation panels, and custom file viewers. The documentation also describes shared context, deep links, and structured forms. Web extensions for Free and Go are still upcoming, and composer mentions are desktop-only. [Extension documentation](https://developers.openai.com/plugins/build/extensions)

## All 25 entries at a glance

This is an index, not a claim of universal availability. [Official announcement list](https://openai.com/index/devday-2026-recap/)

| # | Announcement | Focus |
|---|---|---|
| 1 | Dots | Persistent personal agents |
| 2 | GPT-6.1 Sol | New model |
| 3 | Ultrafast | Faster inference |
| 4 | Private Intelligence | Enterprise privacy |
| 5 | Codex Cloud | Cloud development |
| 6 | Codex CLI | Terminal updates |
| 7 | Code Review | Code review |
| 8 | Codex Security Cloud | Security scanning |
| 9 | Decisions API | Constrained decisions |
| 10 | Agents API + Computer use | Agent execution |
| 11 | Bedrock Managed Agents | AWS integration |
| 12 | Plugin extensions | Interface extensions |
| 13 | Plugin Creator / discovery | Plugin discovery |
| 14 | Sites + plugins | Site integration |
| 15 | MCP events | Event automation |
| 16 | ChatGPT Space | Team workspace |
| 17 | Pages | Shared documents |
| 18 | Collaborative slides | Shared presentations |
| 19 | Teams / shared tasks | Team tasks |
| 20 | @ChatGPT in Slack / Teams | Messaging integration |
| 21 | Meetings plugin | Meeting notes |
| 22 | Shareable profiles | Creator profiles |
| 23 | Sign in with ChatGPT | Account integration |
| 24 | Pro 500 | New subscription |
| 25 | OpenAI Marketplace | Enterprise purchasing |

Private Inference is planned for a fall preview; collaborative slides are expected in the coming weeks; Meetings is a macOS beta. Plan eligibility and rollout status remain separate questions.

## What I would evaluate first

The common theme is continuity: agents take responsibility, shared spaces retain results, and cloud environments keep work running. For an individual developer, I would start with Sol's performance on representative tasks. For a team, I would evaluate shared context, handoffs, and review as a complete workflow.

A Pro 500 upgrade should be judged against actual usage and waiting time. Tools, tests, and human review can still dominate delivery time even when generation becomes faster.

For a comparison with expectations before the event, see our [DevDay preview](/en/2026/09/29/openai-devday-2026-rumor-probabilities/).
