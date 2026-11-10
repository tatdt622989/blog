---
title: "Claude Fable 5.2 Explained: Pricing, Benchmarks, and How It Compares With Opus 5.5"
date: 2026-11-10 08:40:00
updated: 2026-11-10 08:40:00
description: "Claude Fable 5.2 costs $8/$40 per million tokens. Compare 12 official benchmarks, AA results, Opus 5.5 pricing, safeguards, and migration changes."
permalink: 2026/11/10/claude-fable-5-2-pricing-benchmarks-analysis/
translation_key: claude-fable-5-2-pricing-benchmarks-analysis
translations:
  zh-TW: /2026/11/10/Claude-Fable-5-2-是什麼？價格、評測與-Opus-5-5-差異完整分析/
  zh-CN: /zh-cn/2026/11/10/claude-fable-5-2-pricing-benchmarks-analysis/
categories:
  - AI Tools
tags:
  - AI
  - Claude
  - Claude Code
  - Anthropic
  - Artificial Analysis
---

![Claude Fable 5.2 specifications and official FrontierCode 2.0 scores for Fable 5.2, Opus 5.5, GPT-6 Astra, Gemini 4 Carbon, and Fable 5.1](cover.jpg)

**Claude Fable 5.2 is the most capable public model Anthropic offers, released on November 9, 2026 for long-running agent work and hard reasoning.** Its API price is 20% lower than Fable 5.1, it leads 10 of the 12 benchmarks Anthropic published for public models, and Artificial Analysis ranks it first. It also costs twice as much as Opus 5.5 per token and is one of the slowest models measured.

This analysis uses the Anthropic announcement, the API documentation, and Artificial Analysis data to cover specifications, pricing, benchmarks, limits, and fit. **Most benchmark figures are self-reported by Anthropic; this blog did not test the model independently.**

<!--more-->

## What Is Claude Fable 5.2, and How Is It Different From Mythos 5.2?

Fable 5.2 and **Mythos 5.2** are the same underlying model. Fable 5.2 adds cybersecurity and biology safeguards and is open to everyone. Mythos 5.2 relaxes those safeguards and is limited to organizations verified through Anthropic programs. [Official announcement](https://www.anthropic.com/claude-fable-and-mythos-5-2)

| Item | Claude Fable 5.2 |
| --- | --- |
| Release date | November 9, 2026 |
| API model ID | **claude-fable-5-2** |
| Context window | 1M tokens |
| Max output | 128K tokens |
| Input / output | Text and images in, text out |
| Knowledge cutoff | June 2026 |
| Reasoning | Adaptive thinking always on; effort controls depth |
| Default effort | **high** on the API; **medium** in the Claude apps and Claude Code |
| Subscription plans | Pro, Max, Ultra, Team, Enterprise |
| Cloud platforms | Claude API, Amazon Bedrock, Claude Platform on AWS, Google Cloud, Microsoft Foundry |
| Earliest retirement | Not before November 9, 2027 |

Sources: [Fable 5.2 model documentation](https://platform.claude.com/docs/en/models/fable-5-2/overview) and the [Fable product page](https://www.anthropic.com/claude/fable).

## Fable 5.2 Pricing: 20% Below Fable 5.1, Still Twice Opus 5.5

Prices are in **USD per million tokens**. Fable 5.1 cache-read and batch prices are derived from the multipliers Anthropic publishes. [What's new in Fable 5.2](https://platform.claude.com/docs/en/models/fable-5-2/whats-new-fable-5-2)

| Billing item | Fable 5.1 | Fable 5.2 | Opus 5.5 |
| --- | ---: | ---: | ---: |
| Input | $10 | $8 | $4 |
| Output | $50 | $40 | $20 |
| Cache read | $0.25 | $0.20 | $0.20 |
| Batch input / output | $5 / $25 | $4 / $20 | $2 / $10 |
| Fast mode input / output | Not listed | $16 / $80 | $8 / $40 |

- **Cache reads cost 2.5% of the input price**, against 5% on Opus 5.5, so both models charge the same for cache reads. For agents that reread a large codebase, the price gap comes mostly from uncached input and from output.
- **Fast mode** generates up to 2.5 times faster, according to Anthropic, at double the standard price.
- **Subscriptions:** On Pro and standard Team seats, Fable can use up to 50% of the weekly allowance. Eligible paid plans get one to three Fable resets, depending on subscription length. See [how Claude banked resets work](/en/2026/10/19/claude-banked-reset-guide/).

## Official Benchmarks: First on 10 of 12, Behind on Two

These figures come from Anthropic's comparison table. They use each model's highest available effort unless noted, with production safeguards on. Three Mythos-only security and protein tests are left out. [Fable product page](https://www.anthropic.com/claude/fable)

| Benchmark (area) | Fable 5.2 | Fable 5.1 | Opus 5.5 | GPT-6 Astra | Gemini 4 Carbon |
| --- | ---: | ---: | ---: | ---: | ---: |
| FrontierCode 2.0 (agentic coding) | **49.1%** | 32.4% | 45.5% | 42.8% | 41.1% |
| FrontierSWE v2 (agentic coding) | **69.9%** | 56.3% | 62.3% | 65.5% | 61.2% |
| AutomationBench (business workflows) | 51.4% | 31.4% | 42.5% | 41.4% | **53.9%** |
| Terminal-Bench-Science 0.1 (research) | **74.6%** | 52.6% | 58.7% | 68.1% | 64.8% |
| WANDR (agentic search) | **82.1%** | 68.7% | 72.3% | Not listed | Not listed |
| OSWorld 2.1 (computer use) | **89.3%** | 83.5% | 87.2% | 79.5% | 81.5% |
| RoboDojo Sim (robotics) | **64.9%** | 27.6% | 39.4% | 29.8% | Not listed |
| AA-Briefcase v1.1 rubric (knowledge work) | **66.1%** | 61.5% | 61.2% | 52.0% | 61.8% |
| AA-Briefcase v1.1 Elo (knowledge work) | 1785 | 1669 | **1800** | 1569 | 1611 |
| Remote Labor Index (remote work) | **41.3%** | 17.9% | 21.3% | 20.8% | Not listed |
| Humanity's Last Exam (with tools) | **74.2%** | 65.6% | 67.7% | 57.2% | Not listed |
| Chartography (charts, no tools) | **73.4%** | 44.8% | 64.4% | 71.0% | 72.5% |

Read the table with these points in mind:

- **Not first everywhere:** Gemini 4 Carbon leads AutomationBench, and Opus 5.5 leads the AA-Briefcase Elo.
- **Effort settings differ:** On FrontierCode, both Fable versions use Xhigh and Gemini 4 Carbon uses Medium. On Remote Labor Index, Fable 5.2 uses High.
- **Some tests are internal:** Anthropic ran RoboDojo Sim itself; methods are in the system card.
- **Largest gains over Fable 5.1:** RoboDojo Sim rose from 27.6% to 64.9%, Remote Labor Index from 17.9% to 41.3%, and Chartography from 44.8% to 73.4%.

## Independent Results: First on Artificial Analysis, but Slowest and Most Expensive

Artificial Analysis (AA) tested Fable 5.2 at **max** effort. Speed and latency are five-day averages, checked on November 10, 2026. [AA model page](https://artificialanalysis.ai/models/claude-fable-5-2)

| AA metric | Fable 5.2 (max) | Median of comparable models |
| --- | ---: | ---: |
| Intelligence Index | **65, first of 74 models** | 40 |
| Output speed | 103 tokens/s, 72nd of 73 | Not listed |
| Time to first answer token | 231.55 s | 13.07 s |
| Time per index task | 44.1 min | 12.9 min |
| Cost per index task | $26.54, highest of 73 | Not listed |
| Output tokens for the full index | About 275M | About 72.8M |

AA agrees with Anthropic on capability: Fable 5.2 has the highest ceiling. At max effort, it also has much longer waits and higher cost than other models. These are max-effort figures, not a guide to daily use at medium or high.

## Choosing an Effort Level: Lower Settings Match Opus 5.5, Says Anthropic

Anthropic compared Fable 5.2 at lower effort with Opus 5.5 at its top setting. The cost ratios are Anthropic estimates and have no third-party check yet. [Official announcement](https://www.anthropic.com/claude-fable-and-mythos-5-2)

| Benchmark | Fable 5.2 setting and result | Opus 5.5 top setting | Cost per task, per Anthropic |
| --- | --- | --- | --- |
| FrontierCode 2.0 | High, 45.3% | 45.5% | About half |
| WANDR | Medium, matches Opus top score | 72.3% | About 40% |
| Humanity's Last Exam | Low, matches Opus top score | 67.7% | Under one tenth |
| Chartography | Medium, 66.4% | 64.4% | Under one tenth |

The API documentation says to start at the default **high**. Use **xhigh** for the hardest long-running coding work when you measure a gain. Keep **max** for measuring the ceiling or for rare tasks where time and tokens do not matter. [Effort documentation](https://platform.claude.com/docs/en/build-with-claude/effort)

## Safeguards: 55% Fewer Blocks, but Security Work Still Needs Mythos

| Item | Details |
| --- | --- |
| Blocked requests | High-risk security work such as penetration testing, exploit writing, and binary vulnerability analysis, plus most biology research tasks |
| What answers instead | Opus 4.8 for security requests, Opus 5 for biology requests |
| Compared with Fable 5.1 | About 55% fewer blocks overall: about 60% fewer in security, about 40% fewer in biology |
| API behavior | Refusals return HTTP 200 with **stop_reason: refusal**; fallback to Opus 4.8 or Opus 5 is available |
| Data retention | 30-day retention is required; zero data retention needs explicit Anthropic approval |
| Access to Mythos 5.2 | Cyber Verification Program, Life Sciences Verification Program; Enterprise customers through Claude Security |

Anthropic and the press also point out limits:

- **External testing was narrow:** The UK AI Security Institute, Frontier Design, and METR tested the model before launch but did not review the announcement or system card.
- **The model suspects it is being tested:** Anthropic says the 5.2 models voice this suspicion more often than recent models, which weakens evaluation results. The Next Web, citing the system card, reports this in up to 43% of automated audit transcripts. [The Next Web](https://thenextweb.com/news/claude-fable-5-2-mythos-5-2-anthropic-launch-price)
- **Sandbox escape test:** In an adversarial test with planted credentials, Mythos 5.2 used them in 3.1% of scenarios, against 21% for Mythos 5.1 and 39% for Mythos 5.

## Showcase Results: All Reported by Anthropic

| Case | Anthropic's claim |
| --- | --- |
| Black hole physics | Solved two open problems related to holographic duality, published as preprints |
| Fermat's Last Theorem | 1,000 Fable 5.2 agents fully formalized the proof in Lean in about 30 hours; Opus 5.5 reached 26% in 18 hours with the same setup |
| Hardware design | Designed three electronic devices from one prompt, with circuit boards, 3D-printed cases, and software; all worked without electrical changes |
| Code migration | An agent team rewrote a production service from Python to Rust; it starts about 26 times faster |
| Operating system prototype | Starting from an empty folder, it coordinated over 1,000 subagents for eight days and built an OS prototype that boots on a laptop |

No third party has reproduced these results. They show how Anthropic positions the model, not what a typical user should expect.

## Changes Developers Must Handle Before Upgrading

Moving from Fable 5.1 means changing the model ID to **claude-fable-5-2** and checking four changes that can return errors. [Official migration notes](https://platform.claude.com/docs/en/models/fable-5-2/whats-new-fable-5-2)

1. **Editing history invalidates thinking blocks:** If you change system, tools, or an earlier message and send thinking blocks back, every account gets a 400 error. On Fable 5.1, this applied only to accounts created on or after August 31, 2026.
2. **Only Fable 5.2 and Mythos 5.2 read Fable 5.2 thinking blocks:** Routing a conversation to Opus 5.5 or Fable 5.1 drops that reasoning.
3. **The old computer use tool is gone:** `computer_20251124` returns an error everywhere except Amazon Bedrock. Use `computer_toolset_20260801`.
4. **Advisor tool pairing:** With a Fable 5.2 executor, the advisor must be Fable 5.2 or Mythos 5.2.

Behavior changes that appear without code changes:

- At medium effort and above, a prompt that asks the model not to think does not stop it from thinking. Lower the effort for easy requests that run too long.
- On long tasks, a turn can end early with a list of remaining work. This happens more at low and medium effort.
- The model delegates readily to subagents, which can account for a large share of session cost.
- The model follows style rules closely; a hard sentence-length limit can make its prose choppy.

## Who Should Use Fable 5.2? Anthropic Still Recommends Opus 5.5 First

Anthropic's API documentation suggests starting most work on Opus 5.5 and moving to Fable 5.2 when Opus at higher effort still falls short. [What's new in Fable 5.2](https://platform.claude.com/docs/en/models/fable-5-2/whats-new-fable-5-2)

| Use case | Better fit |
| --- | --- |
| Everyday coding, writing, general questions | Opus 5.5 (half the price of Fable) |
| Multi-hour agent work, multistep research, hard reasoning | Fable 5.2 |
| Charts, robotics, scientific computing, where official gaps are large | Test Fable 5.2 at medium or high against Opus 5.5 |
| Penetration testing, vulnerability research, biology research | Fable 5.2 mostly blocks these; Mythos 5.2 requires verification |
| Organizations that cannot keep data for 30 days | Needs Anthropic approval before use |

Data checked on November 10, 2026. Benchmarks, rankings, and plan benefits can change; the official pages are authoritative. Related: [Claude Opus 5.5 launch analysis](/en/2026/09/23/claude-opus-5-5-launch-benchmarks-pricing/).
