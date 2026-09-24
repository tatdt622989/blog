---
title: "Claude Opus 5.5 Launch: AA Leadership, Pricing, and Benchmark Analysis"
date: 2026-09-23 00:56:00
updated: 2026-09-24 21:39:00
description: "Claude Opus 5.5 leads AA at 58. Compare all nine official benchmarks, five effort levels, API prices, subscription resets, and migration changes."
permalink: 2026/09/23/claude-opus-5-5-launch-benchmarks-pricing/
translation_key: claude-opus-5-5-launch-benchmarks-pricing
translations:
  zh-TW: /2026/09/23/Claude-Opus-5-5-上線：AA-登頂、價格降幅與完整評測解析/
  zh-CN: /zh-cn/2026/09/23/claude-opus-5-5-launch-benchmarks-pricing/
categories:
  - AI Tools
tags:
  - AI
  - Claude
  - Claude Code
  - Anthropic
  - Artificial Analysis
---

![Editorial illustration of Claude Opus 5.5 agentic coding, document work, and efficiency](cover.jpg)

**Claude Opus 5.5 is available, and Artificial Analysis lists it first with an Intelligence Index score of 58.** Higher capability and lower token prices make this a release worth examining. There is one essential distinction: the headline score uses maximum reasoning effort, while Anthropic's estimated 40% task-cost reduction concerns typical work at default settings.

This launch-day analysis compares the announcement, API documentation, the complete official benchmark chart, and live Artificial Analysis pages. **It is source-based reporting, not a claim that this blog has independently tested the model.**

<!--more-->

**New hands-on project, September 24:** I built a [playable 3D island with Opus 5.5](https://app.6yuwei.com/island/). The finished scene and the limits of what this example demonstrates are at the end of the article.

## Release date, specifications, and availability

Anthropic dates the release **September 22, 2026**. The sources below were checked early on **September 23 in Taiwan, UTC+8**. These are API specifications; a subscription interface may expose different limits. [Official model documentation](https://platform.claude.com/docs/en/models/opus-5-5/overview)

| Item | Confirmed detail |
| --- | --- |
| Claude API model ID | **claude-opus-5-5** |
| Context window | 1 million tokens |
| Standard API maximum output | 128K tokens |
| Modalities | Text and image input; text output |
| Reasoning | Always-on adaptive thinking; **medium** effort by default |
| Claude plans | Pro, Max, Team, Enterprise |
| Developer platforms | Claude API, Amazon Bedrock, Claude Platform on AWS, Google Cloud, Microsoft Foundry |

Plan availability is documented on the [Opus product page](https://www.anthropic.com/claude/opus); cloud availability is listed in the [API release notes](https://platform.claude.com/docs/en/release-notes/overview). Access still depends on the platform and account configuration.

## Artificial Analysis: first at max, with a different picture at medium

At the time checked, **Artificial Analysis Intelligence Index v4.3.2** showed Opus 5.5 at **58**, ahead of Fable 5.1 and GPT-6 Astra, both displayed at 53. These are the site's rounded scores. Both Claude entries are labeled **max with fallback**; Astra is labeled **max**. [Live AA leaderboard](https://artificialanalysis.ai/)

AA has also published five Opus 5.5 effort variants. All rows below use **Default Fallback**. Token counts are aggregate output across the Intelligence Index evaluation, **not a single response or the context-window capacity**.

| Effort | AA Intelligence Index | Total evaluation output tokens |
| --- | ---: | ---: |
| [max](https://artificialanalysis.ai/models/claude-opus-5-5) | 58 | Approximately 260M |
| [xhigh](https://artificialanalysis.ai/models/claude-opus-5-5-xhigh) | 56 | Approximately 100M |
| [high](https://artificialanalysis.ai/models/claude-opus-5-5-high) | 54 | Approximately 53M |
| [medium](https://artificialanalysis.ai/models/claude-opus-5-5-medium) | 51 | Approximately 38M |
| [low](https://artificialanalysis.ai/models/claude-opus-5-5-low) | 42 | Approximately 20M |

**My reading: test medium and high for routine development before making max the default.** Using the displayed approximations, max produces about **6.8 times** medium's total output for seven more index points. That is not a bill multiplier: input, caching, and other charges also matter. It does show why the highest-scoring configuration and the most useful everyday configuration need separate evaluation.

AA's new model pages still showed **N/A** for speed and cost per task, alongside some **$0.00** price fields. Those fields conflict with Anthropic's published paid pricing. This article therefore uses the official rate card and does not interpret the unfinished fields as free access or measured throughput. [AA model page](https://artificialanalysis.ai/models/claude-opus-5-5)

## All nine official benchmarks, including where Astra leads

The following reproduces the numerical comparison in Anthropic's official chart, checked against its announcement. **This vendor-published comparison is separate from AA's overall Intelligence Index.** “Not listed” means the chart provides no result, not that the model scored zero. [Official announcement](https://www.anthropic.com/claude-opus-5-5)

| Benchmark | Opus 5.5 | Fable 5.1 | Opus 5 | GPT-6 Astra | GPT-5.6 Sol |
| --- | ---: | ---: | ---: | ---: | ---: |
| Terminal-Bench 4.0 | **66.4%** | 55.8% | 52.3% | 57.9% | 37.3% |
| FrontierCode v1.1 (Main) | **54.4%** | 50.3% | 48.0% | 53.3% | 47.5% |
| CursorBench 4.0 | **57.8%** | 51.8% | 46.6% | Not listed | 41.7% |
| GDPval-AA v2.1 | **1846** | 1735 | 1708 | 1542 | 1588 |
| AutomationBench | 40.0% | 31.4% | 26.9% | **41.4%** | 28.8% |
| Humanity's Last Exam, with tools | **67.7%** | 65.6% | 63.6% | 57.2% | Not listed |
| Terminal-Bench-Science 0.1 | 58.7% | 52.6% | 29.0% | **64.6%** | 22.4% |
| OSWorld 2.0, partial | **81.8%** | 80.7% | 74.0% | Not listed | Not listed |
| Chartography, with tools | **89.0%** | 88.4% | 83.4% | Not listed | Not listed |

GDPval-AA is a rating, **not a percentage**. The OSWorld **partial** label and tool-use conditions are retained because these rows do not all measure the same kind of success.

Terminal-Bench shows a **14.1 percentage-point** gain over Opus 5 and an **8.5-point** lead over Astra. The FrontierCode margin over Astra is only 1.1 points, however, and Astra has the highest listed scores on business workflows and agentic scientific research. The chart does not support a claim of universal superiority.

Its footnotes also matter:

- Most Opus 5.5 results use **max** effort, while Terminal-Bench uses **xhigh**; Astra's Terminal-Bench result uses **high**. This is not an equal-effort experiment.
- Production safeguards are enabled, and some tasks fall back to older models. Zapier's AutomationBench runs use no fallback, counting safeguard interventions as failures.
- Opus 5.5's Terminal-Bench standard error is ±2.6 points. The science benchmark reports approximately ±3.5–5 points per model. Small margins should not be treated as settled rankings.

<details>
<summary>View the complete official benchmark image and footnotes</summary>

![Anthropic's complete Claude Opus 5.5 benchmark comparison and methodology footnotes](official-benchmarks.png)

Image credit: Anthropic's official release materials. Original figures and footnotes are preserved.

</details>

## Pricing: distinguish the 20%, 40%, and 60% reductions

Standard Claude API prices are in **USD per million tokens**. [Official pricing documentation](https://platform.claude.com/docs/en/about-claude/pricing)

| Charge | Opus 5 | Opus 5.5 | Unit-price reduction |
| --- | ---: | ---: | ---: |
| Uncached input | $5 | $4 | 20% |
| Output | $25 | $20 | 20% |
| Five-minute cache write | $6.25 | $5 | 20% |
| One-hour cache write | $10 | $8 | 20% |
| Cache-hit read | $0.50 | $0.20 | 60% |

The **40% figure is Anthropic's estimated reduction in typical task cost**, combining pricing and token efficiency. It is not a blanket 40% rate-card discount. Anthropic also reports over 30% faster output generation; that does not guarantee a project finishes 30% sooner. [Announcement](https://www.anthropic.com/claude-opus-5-5)

Consider a fixed-volume example: one million uncached input tokens and 200,000 output tokens, excluding tools and other charges, cost **$10** on Opus 5 and **$8** on Opus 5.5. That saves 20%. Fewer retries, shorter outputs, or better cache use can reduce the bill further, but those are workload outcomes to measure.

Repeated repository reads are particularly relevant: ten million cache-hit tokens cost **$2 instead of $5**, excluding the original cache write and any output.

**Fast mode** has a separate premium rate of **$8 input and $40 output**, with Anthropic advertising up to 2.5 times standard speed. Opus 5.5's standard input/output rates are also 60% below Fable 5.1's $10/$50; that remains a token-price comparison, not a guarantee about total task cost. [Opus product page](https://www.anthropic.com/claude/opus), [model comparison](https://platform.claude.com/docs/en/about-claude/models/overview)

## Subscription limits and a reset you can save

Anthropic announced higher **five-hour limits for Pro, Max, and Team**, plus a subscription limit reset users can activate when needed. The announcement does not specify one universal increase, so “every plan doubles its allowance” would be unsupported. [Official announcement](https://www.anthropic.com/claude-opus-5-5)

Eligible accounts can find **Settings → Usage → Resets → Reset for free** on the web or desktop app. The offer specifies whether it resets session or weekly usage and when it expires. Mobile and the Claude Code terminal currently lack that button, but the restored account allowance applies there too. [Reset instructions](https://support.claude.com/en/articles/17007452-what-is-a-limit-reset)

An API price cut is not a subscription-price announcement. For a broader purchasing comparison, see this blog's [AI coding subscription guide](/en/2026/09/14/ai-coding-tools-subscription-comparison/), keeping its snapshot date in mind.

## Four API migration changes to check before switching traffic

Choosing a model in Claude and migrating a custom Messages API integration are different operations. For the latter, review more than the model ID:

1. **Thinking cannot be disabled.** Old `thinking.type` values `"disabled"` and `"enabled"` return 400; use effort instead.
2. **Forced tool calls are unsupported.** Replace `tool_choice` types `any` or `tool` as appropriate with `auto` and strict tools or structured outputs. Strict schemas do not guarantee a tool will be called. [API release notes](https://platform.claude.com/docs/en/release-notes/overview)
3. **Thinking blocks bind to their model and conversation.** Editing earlier context can invalidate replayed blocks; check cross-model routing too.
4. **Computer use varies by platform.** Claude API and Google Cloud require `computer_toolset_20260801`; Bedrock still accepts `computer_20251124`. [Migration guide](https://platform.claude.com/docs/en/models/opus-5-5/migration-guide)

There is also a response-format change: narration between tool calls moves into **thinking blocks**, whose text is empty under the default display setting. A UI that streams only text blocks can consequently appear silent; update its parsing and display configuration. [Response-format documentation](https://platform.claude.com/docs/en/models/opus-5-5/overview)

## How I would evaluate the upgrade

**If Opus 5 is already part of your coding workflow, Opus 5.5 deserves an early trial.** Use a familiar task with a verifiable outcome, then record passing tests, human corrections, elapsed time, and total cost. AA's effort table suggests useful configurations to compare; it cannot decide your acceptance criteria.

For scientific research or business automation, keep Astra in that comparison. For a move from Fable 5.1, establish that difficult tasks retain their quality before treating the lower unit price as a saving.

Also record which model actually finishes the task. **With fallback** describes part of the deployed behavior: Anthropic explains that some requests switch models and the interface identifies the responder. [Model-switching documentation](https://support.claude.com/en/articles/16049681-why-claude-switched-models-in-your-conversation-with-opus-5-or-opus-5-5)

This article reflects sources checked early September 23, 2026, UTC+8. Rankings and account benefits can change. Sonnet 5.5 and Haiku 5.5 are announced for the coming weeks, not simultaneous releases. [Launch announcement](https://www.anthropic.com/claude-opus-5-5)

## September 24 update: a playable 3D island from one prompt

I used one prompt with Claude Opus 5.5 to create a [playable 3D island](https://app.6yuwei.com/island/). You can orbit the world to see its mountain, volcano, and villages, switch to walking mode, change the time of day, and generate a different island with a new seed.

![Overview of the 3D survival island made with Claude Opus 5.5, showing the mountain, volcano, villages, and minimap](island-overview.jpg)

This is a **personal project showcase** added after the launch-day analysis, not a rerun of the benchmarks above. I confirmed that the public scene loads in a desktop browser. The full prompt, any later edits, and mobile interaction results are not documented here yet, so this example should not be read as proof that every similar project can ship unchanged in one attempt.
