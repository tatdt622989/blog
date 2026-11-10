---
title: "Gemini 4 Carbon Launch: Benchmarks, Pricing, and How It Compares With Fable 5.2 and Argon"
date: 2026-11-11 00:40:00
updated: 2026-11-11 00:40:00
description: "Gemini 4 Carbon costs $2/$10 per million tokens until Nov 30, then $4/$20. Compare 17 official benchmarks, AA results, access, specs, and Fable 5.2."
permalink: 2026/11/11/gemini-4-carbon-launch-benchmarks-pricing/
translation_key: gemini-4-carbon-launch-benchmarks-pricing
translations:
  zh-TW: /2026/11/11/Gemini-4-Carbon-上線：評測、價格與-Fable-5-2、Argon-差異分析/
  zh-CN: /zh-cn/2026/11/11/gemini-4-carbon-launch-benchmarks-pricing/
categories:
  - AI Tools
tags:
  - AI
  - Gemini
  - Google
  - Artificial Analysis
---

![Gemini 4 Carbon specifications and official Terminal-Bench 4.0 scores for Gemini 4 Carbon, Claude Opus 5.5, GPT-6 Astra, Gemini 4 Argon, and Claude Fable 5.1](cover.jpg)

**Gemini 4 Carbon is Google's strongest model, open to developers, businesses, and Google AI Ultra subscribers since November 10, 2026.** It leads 14 of the 17 benchmarks in Google's comparison table. Artificial Analysis scores it 60, below the 65 of Claude Fable 5.2 released a day earlier, but Carbon costs about 30% as much per task and responds faster. Its launch price matches Gemini 4 Argon and doubles after November 30.

<!--more-->

## What Is Gemini 4 Carbon? Key Specifications

Carbon is built on Gemini 4 Argon and targets long-running agentic coding, hard reasoning, scientific research, and cyber defense. It went to Fairwind Program cyber defenders on October 28 and opened broadly on November 10. [Google announcement](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available/)

| Item | Gemini 4 Carbon |
| --- | --- |
| API model ID | **gemini-4-carbon** |
| Context window | 1,048,576 tokens, shared by input, thinking, and output |
| Max output | 65,536 tokens per synchronous request; background mode extends to nearly 1M |
| Input | Text, images, audio, video, PDF |
| Output | Text (no image or audio generation, no Live API) |
| Knowledge cutoff | March 2026 |
| Thinking levels | low, **medium (default)**, high |
| Tools | Function calling, code execution, computer use, Google Search and Maps grounding, URL context, file search, structured outputs |
| Caching | Implicit only, automatic from 4,096 tokens; no explicit caching |
| Free tier | Not available |

Sources: [model documentation](https://aistudio.google.com/docs/models/gemini-4-carbon) and [model card](https://deepmind.google/models/model-cards/gemini-4-carbon/).

## Who Can Use It? Access by Channel

| Audience | Access |
| --- | --- |
| Developers | Gemini API paid tier, Google AI Studio, Android Studio; Google AI Ultra subscribers also get it in Antigravity |
| Businesses | Gemini Enterprise (API or model picker), Google Antigravity, CodeMender |
| Consumers | Rolling out to Google AI Ultra subscribers in the Gemini app and AI Mode in Search; the announcement does not mention Google AI Pro |
| Cyber defenders | A cyber version through the Fairwind Program |
| Researchers | Can apply for six months of free Argon and Carbon access on Antigravity's top usage tier, subject to eligibility and capacity |

## Gemini 4 Carbon Pricing: Launch Rates Until November 30

Prices are in **USD per million tokens**. Thinking tokens bill as output. Carbon and Argon share the same prices. [Gemini API pricing](https://aistudio.google.com/docs/pricing)

| Billing item | Launch price (to Nov 30) | From December 1 |
| --- | ---: | ---: |
| Input | $2.00 | $4.00 |
| Output (including thinking) | $10.00 | $20.00 |
| Cached input | $0.10 | $0.20 |
| Batch / Flex input, output | $1.00, $5.00 | $2.00, $10.00 |
| Priority input, output | $3.60, $18.00 | $7.20, $36.00 |

- **Grounding with Google Search:** 5,000 free requests a month, shared across Gemini 3 and newer models, then $14 per 1,000, capped at 1,500 a day.
- **Against Claude:** The December rate of $4 / $20 equals Claude Opus 5.5 and is half of Claude Fable 5.2 ($8 / $40).

## Official Benchmarks: First on 14 of 17

This is Google's comparison table. Its Claude flagship is **Fable 5.1**; Fable 5.2, released a day earlier, is not included. [Gemini model page](https://deepmind.google/models/gemini/)

| Benchmark (area) | Carbon | Argon | GPT-6 Astra | Opus 5.5 | Fable 5.1 |
| --- | ---: | ---: | ---: | ---: | ---: |
| AA Index v5.0 (general) | **59** | 50 | 57 | 58 | 49 |
| Vals Index v2.2 (general) | **70.4%** | 69.2% | 65.0% | 70.2% | Not listed |
| SWE-sweep (agentic coding) | **9.6%** | Not listed | 9.5% | 3.6% | 2.9% |
| FrontierSWE 2 (agentic coding) | 61.2% | 55.0% | **65.5%** | 62.3% | 56.3% |
| Terminal-Bench 4.0 (agentic coding) | **65.2%** | 57.1% | 59.1% | 59.6% | 52.0% |
| Agents' Last Exam v1.1 (computer use) | **77.4%** | 69.0% | 73.1% | 71.6% | Not listed |
| OSWorld-2.1 offline subset (computer use) | 81.5% | 74.7% | 80.9% | **87.2%** | 76.8% |
| AutomationBench (knowledge work) | **53.9%** | 51.3% | 41.4% | 42.5% | 31.4% |
| Vending-Bench 2 balance (knowledge work) | **$16,484** | $13,718 | $15,515 | $9,235 | $5,422 |
| Chartography (multimodal) | **72.5%** | 71.6% | 71.0% | 66.3% | 46.2% |
| Blueprint-Bench 2 (multimodal) | **58.6%** | 54.4% | 49.7% | 51.2% | 41.9% |
| GraphWalks 256K–1M (long context) | **96.2%** | 84.2% | 71.8% | 66.8% | 65.0% |
| RiemannBench (math) | 72.0% | **76.0%** | 72.0% | 69.6% | 65.6% |
| Terminal-Bench-Science 0.1 (science) | **64.8%** | 52.9% | 63.3% | 59.0% | 43.3% |
| CWE-bench (patching) | **71.0%** | 68.0% | 68.0% | 67.0% | 58.0% |
| ExploitGym (exploitation) | **54.8%** | 42.0% | 42.4% | 34.5% | Not listed |
| SEC-bench Pro (vulnerability finding) | **88.2%** | 83.4% | 85.4% | Not listed | Not listed |

- **Behind on three:** GPT-6 Astra leads FrontierSWE 2, Opus 5.5 leads OSWorld-2.1, and Argon leads RiemannBench.
- **Largest lead is long context:** GraphWalks at 96.2% is 12 points above Argon and about 29 points above Opus 5.5.
- **Cyber scores** were measured without guardrails.
- **Google also claims** first place on CursorBench 4.0, WANDR, and AutomationBench at less than half the cost per task of the next-best external model, and second place on the Multimodal Knowledge Agent benchmark, built with AA, at under one sixth of the leader's average cost per task.

## Against Claude Fable 5.2: Five Shared Benchmarks

This table sets Carbon's scores from Google against Fable 5.2's scores from Anthropic. Each company ran its own tests, and scores for the same model differ: Opus 5.5 gets 66.3% on Chartography in Google's table and 64.4% in Anthropic's. [Fable 5.2 product page](https://www.anthropic.com/claude/fable)

| Benchmark | Gemini 4 Carbon | Claude Fable 5.2 |
| --- | ---: | ---: |
| FrontierSWE v2 | 61.2% | **69.9%** |
| AutomationBench | **53.9%** | 51.4% |
| Terminal-Bench-Science 0.1 | 64.8% | **74.6%** |
| OSWorld 2.1 | 81.5% | **89.3%** |
| Chartography | 72.5% | **73.4%** |

For the full Fable 5.2 analysis, see [Claude Fable 5.2 explained](/en/2026/11/10/claude-fable-5-2-pricing-benchmarks-analysis/).

## Independent Results: Fourth on AA at About 30% of Fable 5.2's Cost

On the Artificial Analysis (AA) Intelligence Index v5.0.1, Fable 5.2 holds the top three places at different effort levels, Carbon (high) is fourth, and Opus 5.5 (max) is fifth. Google's "first at 59" claim on October 28 used v5.0, before Fable 5.2 launched. [AA model page](https://artificialanalysis.ai/models/gemini-4-carbon)

| AA metric | Gemini 4 Carbon (high) | Claude Fable 5.2 (max) |
| --- | ---: | ---: |
| Intelligence Index | 60 (4th) | **65 (1st)** |
| Output speed | 80 tokens/s | 103 tokens/s |
| Time to first answer token | **66.85 s** | 231.55 s |
| Time per index task | **25.6 min** | 44.1 min |
| Cost per index task | **$7.76** | $26.54 |
| Output tokens for the full index | **About 205M** | About 275M |

AA prices Carbon at the December rate of $4 / $20, so launch-period costs are about half the figure shown. Both models sit far above the class median: Carbon uses about 2.8 times the median output tokens (72.8M) and waits about 5.5 times the median first-token time (12.15 s).

## Security and Safety Results

| Test | Carbon | Argon |
| --- | ---: | ---: |
| Adaptive red-team agent, breach rate per attempt | 0.8% | 3.1% |
| Gray Swan automated cyberattack query success | 2.17% | 9.86% |
| Gray Swan indirect prompt injection success | 0% | 0.7% |
| 375-task agentic honesty benchmark, pass rate | 92% | 70% |

- Carbon blocked 99% of attack paths from the adaptive red-team agent.
- Trajectory Labs found no new universal jailbreaks in 132 hours and more than 13,000 requests.
- On the honesty benchmark, Carbon declined to invent missing experimental data 98% of the time and flagged method flaws 68% of the time.
- The model card lists hallucinations, occasional slowness or timeouts, and higher token use at higher thinking levels. Google also says prompt-injection defense still needs work. [Safety details](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available/)

## New Feature: /swarm Multi-Agent Mode in Antigravity

**/swarm** (preview) turns one prompt into a team of coordinated agents with live progress. Carbon takes high-reasoning roles such as architecture, coordination, and review. Faster models work in parallel isolated workspaces, and adversarial verifier agents test the changes. The Antigravity managed agent also supports Carbon.

## Migration Notes for Developers

Moving from Argon only needs a new model ID; the request format stays the same, but each turn uses more thinking tokens and takes longer. Moving from Gemini 3.x or earlier requires these changes: [What's new in Gemini 4 Carbon](https://aistudio.google.com/docs/whats-new-gemini-4-carbon)

1. **Use the Interactions API.** Set the level with `generation_config.thinking_level` and keep multi-turn state on the server with `previous_interaction_id`.
2. **Remove explicit caching.** `cachedContents` and `caches.create` are not supported.
3. **Remove temperature, top_p, and top_k.** The model ignores them.
4. **Raise max_output_tokens.** Thinking counts toward it; raise values below 32K to at least 32,768.
5. **Use background mode for output over 64K.** Set `background: true`; the server continues in 64K steps that you join.
6. **Extend timeouts.** Hard requests can take minutes; set HTTP timeouts to at least 15 minutes.

## Carbon, Argon, or Fable 5.2?

Google's own advice is to use Argon for most software and knowledge work and Carbon for the hardest problems.

| Need | Better fit | Reason |
| --- | --- | --- |
| Everyday and interactive coding, fast production loops | Gemini 4 Argon | Same price, fewer tokens, lower latency |
| Very long documents, cross-analysis of many sources | Gemini 4 Carbon | Leads GraphWalks long-context test |
| Hard reasoning and long agent runs on a budget | Gemini 4 Carbon | Near-top AA score at about 30% of Fable 5.2's cost per task |
| Highest capability regardless of speed and cost | Claude Fable 5.2 | First on AA; higher FrontierSWE and OSWorld scores |
| Vulnerability research and patching | Carbon (Fairwind version) | Leads three cyber benchmarks; requires Fairwind approval |

Related: [Gemini 4 Argon launch, pricing, and access](/en/2026/10/01/gemini-4-argon-launch-pricing-access/).
