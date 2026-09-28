---
title: "Claude Sonnet 5.5 Is Here: Pricing, Features, and Upgrade Notes"
date: 2026-09-29 02:20:00
updated: 2026-09-29 02:20:00
description: Claude Sonnet 5.5 keeps API pricing unchanged. Explore its benchmarks, speed claims, Opus comparison, and breaking changes before upgrading.
permalink: 2026/09/29/claude-sonnet-5-5-launch-pricing-upgrade/
translation_key: claude-sonnet-5-5-launch-pricing-upgrade
translations:
  zh-TW: /2026/09/29/Claude-Sonnet-5-5-發布：價格、功能與升級重點一次看/
  zh-CN: /zh-cn/2026/09/29/claude-sonnet-5-5-launch-pricing-upgrade/
categories:
  - AI Technology
tags:
  - AI
  - Claude
  - Claude Code
  - Anthropic
---

![Claude Sonnet 5.5 connecting coding, documents, and tool workflows](cover.jpg)

**Claude Sonnet 5.5 launched on September 28, 2026.** Anthropic says it generates output more than 30% faster than Sonnet 5 and costs up to 30% less per task for most work. **Token prices have not changed**: the claimed savings come from greater efficiency. [Official announcement](https://www.anthropic.com/claude-sonnet-5-5)

This guide reflects official material checked on September 29 in Taipei. Benchmark results below are published figures, not independent tests conducted for this article.

<!--more-->

## Where Sonnet 5.5 fits

Anthropic positions Sonnet around well-defined everyday work: fixing bugs, implementing scoped features, and producing documents, slides, and spreadsheets. Opus 5.5 remains its stronger choice for complex, open-ended work requiring sustained judgment. [Product positioning](https://www.anthropic.com/claude-sonnet-5-5)

My starting point would be to give Sonnet a clearly specified task, then compare Opus on work involving architectural tradeoffs. Judge the result by how much correction it needs before you can use it, as well as how quickly it arrives.

## Specifications and pricing

These are **API** limits and USD prices, not subscription allowances. [Model specifications](https://platform.claude.com/docs/en/models/sonnet-5-5/overview) · [Pricing](https://platform.claude.com/docs/en/about-claude/pricing)

| Item | Sonnet 5.5 |
| --- | --- |
| API model ID | **claude-sonnet-5-5** |
| Context window | 1 million tokens |
| Standard API maximum output | 128K tokens |
| Input / output | Text and images in; text out |
| Input per million tokens | $2 |
| Output per million tokens | $10 |
| Cache reads per million tokens | $0.20 |

The advertised cost reduction reflects fewer tokens needed in Anthropic's tests. It is not a universal discount on your bill. Faster output generation also does not guarantee an equivalent reduction in end-to-end time when a task includes searches and tool execution. [Cost and speed claims](https://www.anthropic.com/claude-sonnet-5-5)

As a simple calculation, 100,000 standard input tokens plus 20,000 output tokens cost **$0.40** on Sonnet 5.5, versus **$0.80** on Opus 5.5. This excludes caching, tools, and other adjustments, and assumes identical token counts solely to compare rates.

## Published benchmarks need context

Here are three results from Anthropic's comparison. Their scales differ; the scores cannot be combined. [Results and footnotes](https://www.anthropic.com/claude-sonnet-5-5)

| Evaluation | Sonnet 5 | Sonnet 5.5 | Opus 5.5 |
| --- | ---: | ---: | ---: |
| Terminal-Bench 4.0 | 10.3% | 70.6% | 66.4% |
| CursorBench 4.0 | 34.1% | 55.5% | 57.8% |
| GDPval-AA v2.1 | 1449 | 1844 | 1846 |

Opus's Terminal-Bench result is its best score at **xhigh**, not evidence that every model used identical effort. The Sonnet GDPval-AA result used a prerelease deployment with a since-fixed structured-output bug. Anthropic expects any effect to be small; these are the published scores without adjustment.

The practical takeaway is that Sonnet deserves a place in everyday evaluations. A narrow lead on one benchmark does not establish that it can replace Opus's judgment across complex projects.

## Choose effort deliberately

**Claude apps and Claude Code default to medium; the Claude Platform API defaults to high.** That difference matters when comparing experiences across products. [Default settings](https://www.anthropic.com/claude-sonnet-5-5)

Anthropic recommends starting well-specified agentic coding at **medium**, moving to **high** for harder or longer work, and trying **low or medium** for latency-sensitive chat. Effort has been recalibrated, so old Sonnet 5 settings need fresh evaluation. [Prompting guide](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-sonnet-5-5)

I would compare a small set of actual bugs, documents, and feature requests, recording cost, completion time, and rework. If medium reliably meets the acceptance criteria, running every task at max adds an expense that still needs justification.

## Five migration checks

Changing the model ID alone may break an existing integration. The official guide identifies five areas to check. [Migration guide](https://platform.claude.com/docs/en/models/sonnet-5-5/migration-guide)

1. **Thinking:** replace `thinking: {"type": "disabled"}` with `thinking: {"type": "between_tools"}`, supported at high effort or below. Thinking blocks can still appear between tool calls.
2. **Tool selection:** `tool_choice` values `any` and `tool` return 400. Use `auto`; `strict: true` constrains arguments but does not guarantee a call.
3. **History:** thinking blocks are bound to models and conversations. Switching models or editing earlier history can drop blocks or trigger errors, depending on compatibility and account settings.
4. **Computer use:** Claude API and Google Cloud require `computer_toolset_20260801`. Bedrock still accepts `computer_20251124`.
5. **Advisors:** Sonnet 5, Opus 4.7, and Opus 4.8 are no longer valid advisors for Sonnet 5.5.

Longer progress notes between tool calls also arrive in **thinking blocks**. An interface rendering only text may look silent until its display settings and response handling are updated. [Response changes](https://platform.claude.com/docs/en/models/sonnet-5-5/whats-new-sonnet-5-5)

## Should you switch now?

For everyday Sonnet 5 users, this looks worth testing promptly: pricing is unchanged and the published gains are substantial. For production integrations, first validate tool execution, history replay, and output parsing on your own workload.

Official availability includes Claude API, Amazon Bedrock, Claude Platform on AWS, Google Cloud, and Microsoft Foundry. [Release notes](https://platform.claude.com/docs/en/release-notes/overview)

For the other side of the comparison, see our [Claude Opus 5.5 introduction](/en/2026/09/23/claude-opus-5-5-launch-benchmarks-pricing/).
