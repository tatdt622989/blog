title: "What Is Artificial Analysis? How to Read the Intelligence Index, Speed and Cost"
description: "Artificial Analysis benchmarks LLMs on intelligence, speed, latency and cost. How to read Intelligence Index v4.3.2 and Cost per Task, Oct 2026."
permalink: 2026/08/17/artificial-analysis-definitive-guide-llm-selection/
translation_key: artificial-analysis-definitive-guide-llm-selection
translations:
  zh-TW: /2026/08/17/選模型別再憑感覺！Artificial-Analysis-完整指南：從品質、速度到成本，情境化挑出最適合你的-AI/
  zh-CN: /zh-cn/2026/08/17/artificial-analysis-definitive-guide-llm-selection/
categories:
  - AI Technology
tags:
  - AI
  - LLM
  - Artificial Analysis
  - Software Engineering
date: 2026-08-17 14:13:06
updated: 2026-10-19 16:00:00
---

![Artificial Analysis Independent Benchmarking Platform Cover](cover.jpg)

**[Artificial Analysis](https://artificialanalysis.ai/) (artificialanalysis.ai) is an independent AI benchmarking site. It runs every LLM through the same evaluations and the same API speed tests, then compares how smart (Intelligence Index), how fast (output speed and latency) and how expensive (Cost per Task) each model is.** If you want to know whether a new model is actually better, or which API fits your budget, the **Leaderboards → Models** page gives you a first answer in one table. This guide explains each metric, how the index is scored as of October 2026, and which chart to use for which job.

<!--more-->

## What Pages Does Artificial Analysis Have?

Public pages are free to browse (a paid Premium tier also exists). For choosing an LLM, these matter most:

| Page | What it is for |
|------|------|
| [Models](https://artificialanalysis.ai/models) | Every chart: intelligence, token use, cost, speed, latency, end-to-end time, context window |
| [Leaderboards → Models](https://artificialanalysis.ai/leaderboards/models) | One table with Intelligence Index, Cost per Task, output speed and latency |
| [Coding Agents](https://artificialanalysis.ai/agents/coding-agents) | Coding Agent Index, time per task and cost per task |
| [Model Recommender](https://artificialanalysis.ai/models/recommend) | Weight intelligence, speed and cost with sliders to get recommendations |
| Leaderboards → Providers | Speed and price of the same open-weights model across cloud providers |
| Image, Video, Speech | Blind-vote arenas and leaderboards for media models |

For how it compares with LMArena, SWE-bench and other leaderboards, see [How to Read AI Model Leaderboards: LMArena, SWE-bench, LiveBench, and 12 Metrics That Matter](/en/2026/08/31/ai-model-leaderboards-benchmark-metrics/).

## What Is the Artificial Analysis Intelligence Index? The 10 Evaluations in v4.3.2

The **Artificial Analysis Intelligence Index** is a weighted composite of several evaluations; higher is better. According to the official [Intelligence Benchmarking methodology](https://artificialanalysis.ai/methodology/intelligence-benchmarking), **v4.3.2** (current since September 2026) has 10 evaluations in four categories:

| Category (weight) | Evaluations and weights |
|------|------|
| Agents (30%) | AA-Briefcase v1.1 15%, GDPval-AA v2.1 10%, AutomationBench-AA 5% |
| Coding (20%) | Terminal-Bench 4.0 10%, SciCode 10% |
| General (30%) | AA-Omniscience 15%, GDP.pdf 10%, AA-LCR v1.1 5% |
| Scientific Reasoning (20%) | Humanity's Last Exam 10%, CritPt 10% |

Three things to keep in mind:

- **Versions change, and scores across versions are not comparable.** In 2026 alone the index went from v4.0 to v4.3.2; v4.2 dropped GPQA Diamond and v4.3 replaced Terminal-Bench 2.1 with 4.0. Scores in older articles or screenshots (including the August screenshots below) cannot be compared with today's.
- **One model appears several times, once per reasoning effort.** **Claude Opus 5.5 (max)**, **(xhigh)** and **(high)** are the same model with very different scores, costs and latency. Match the row to the setting you will actually run.
- **A lightbulb icon marks reasoning models**, which spend thinking tokens before answering. That affects both cost and latency.

## How to Read Speed, Latency and Cost

![Artificial Analysis homepage highlights: Intelligence, Speed and Cost per Task (August 2026 screenshot)](01_homepage_highlights.jpg)

Definitions from the official [Performance Benchmarking methodology](https://artificialanalysis.ai/methodology/performance-benchmarking) and chart notes:

| Metric | Definition | Use it for |
|------|------|------|
| **Output Speed** (tokens/s) | Tokens per second received after the first chunk arrives | Long generations, streaming feel |
| **Latency / Time to First Token** | Seconds from sending the request to the first token | Live chat, autocomplete |
| **Time to First Answer Token** | Seconds to the first answer token, including a reasoning model's thinking time | Real wait time for reasoning models |
| **End-to-End Response Time** | Seconds to output 500 tokens, including latency and thinking time | Total wait per request |
| **Cost per Task** (USD) | Weighted average cost of one Intelligence Index task, covering input, cache, reasoning and answer tokens | Real cost of getting work done |
| **Price** (USD per 1M tokens) | Cache-hit, input and output list prices, plus a Blended Price | Estimating your own bill |

Speed figures come from the model creator's first-party API, or the median across providers where there is none. Tests run 8 times a day and the site shows the **median (P50) over the past 72 hours**, so numbers move with peak hours and provider load.

**Cost per Task beats list price.** A reasoning model with cheap per-token pricing can still cost more per task than a pricier model if it burns many thinking tokens. For totals, the Models page's **Cost to Run Artificial Analysis Intelligence Index** chart breaks the full run into output, reasoning and cache costs.

![Cost to Run Artificial Analysis Intelligence Index, stacked by output, reasoning and cache cost (August 2026 screenshot)](02_pareto_quality_cost.jpg)

## Leaderboard Snapshot: October 2026

Selected rows from [Leaderboards → Models](https://artificialanalysis.ai/leaderboards/models) on October 19, 2026 (Intelligence Index v4.3.2; figures update continuously):

| Model (setting) | Intelligence Index | Cost per Task | Output speed (t/s) | First-chunk latency (s) |
|------|------|------|------|------|
| Claude Opus 5.5 (max) | 58 | $5.98 | 98 | 562.75 |
| Claude Sonnet 5.5 (max) | 56 | $5.46 | 136 | 391.60 |
| Claude Opus 5.5 (xhigh) | 56 | $3.46 | 85 | 115.10 |
| Claude Opus 5.5 (high) | 54 | $1.82 | 82 | 40.49 |
| GPT-6 Astra (max) | 53 | $3.26 | 69 | 292.33 |
| Gemini 4 Argon (high) | 53 | $1.99 | n/a | n/a |
| GPT-6.1 Sol (max) | 52 | $0.72 | 60 | 239.97 |
| Claude Sonnet 5.5 (xhigh) | 52 | $2.01 | 112 | 36.17 |

Two takeaways:

- **The top score is not the best value.** GPT-6.1 Sol (max) is 6 points behind the leader at under one-eighth of the Cost per Task.
- **Max settings often take minutes to the first chunk.** They suit background batch and agent jobs, not interfaces that need an instant reply.

Launch-day details: [Claude Opus 5.5 Launch: AA Leadership, Pricing, and Benchmark Analysis](/en/2026/09/23/claude-opus-5-5-launch-benchmarks-pricing/) and [GPT-6 Sol and Luna: Artificial Analysis Scores, API Prices, and How to Choose](/en/2026/09/23/gpt-6-sol-luna-pricing-aa-review/).

## Using the Pareto Frontier to Find Value

The **Intelligence Index vs. Cost per Task** scatter plot on the Models page is the most useful chart for selection:

- The **Y-axis** is intelligence (higher is smarter); the **X-axis** is Cost per Task (further left is cheaper).
- The upper-left **Most attractive quadrant** is smart and cheap.
- The **Pareto line** connects models that are the smartest at their price or the cheapest at their score. Models on the line are the best option in their tier; models far below it are beaten by something both smarter and cheaper.

The same section has **Intelligence Index vs. Time per Task**, **vs. Output Speed** and **vs. End-to-End Response Time**. Read them the same way, with time instead of cost.

## Which Chart to Use for Your Use Case

| Use case | Look at | How to decide |
|------|------|------|
| Live chat, voice assistants, IDE autocomplete | **Latency**, **Output Speed** | Low time to first token, high speed, or a low reasoning setting |
| High-volume APIs, batch document work | **Intelligence Index vs. Cost per Task** | Cheapest model on the Pareto line that scores high enough |
| Coding agents (tools like Claude Code or Codex) | **Coding Agents** page | Score, time per task and cost per task together |
| Finance, legal, healthcare and other industries | **Capability Indexes** | The matching industry sub-index, not the overall score |
| Self-hosting or picking a provider for an open model | **Leaderboards → Providers** | Speed and price of one model across providers |
| Still unsure | **Model Recommender** | Recommendations from your weights |

![Artificial Analysis output speed bar chart and Time per Task chart (August 2026 screenshot)](03_speed_latency.jpg)

On the **Coding Agents** page, **Coding Agent Index v1.5** weights three benchmarks equally, averaging pass@1 over three attempts per task:

- **DeepSWE v1.1** (Datacurve): 113 real software engineering tasks
- **Terminal-Bench 4.0** (Laude Institute): 66 agentic terminal tasks
- **SWE-Atlas-QnA** (Scale AI): 124 technical Q&A tasks about codebases

The page also shows time per task, cost per task, token usage, and newly added safety-refusal and reward-hacking rates. When scores differ by a few points, time and cost usually decide what is practical day to day. For tool-level differences, see [Claude Code vs Codex vs Cursor](/en/2026/05/06/claude-code-vs-codex-vs-cursor/).

![Artificial Analysis Coding Agent Benchmarks page (August 2026 screenshot, index v1.3 at the time)](04_coding_agents.jpg)

The **Model Recommender** is a 5-step flow: the first step sets the importance of Intelligence, Speed and Cost with sliders, and the last produces recommendations from those weights.

![Artificial Analysis Model Recommender priority sliders (August 2026 screenshot)](05_model_recommender.jpg)

## Limitations of Artificial Analysis

- **The overall score is an average.** The index leans toward agentic work (Agents is 30%). If your workload is translation, support replies or classification, the overall rank may not reflect real performance.
- **Speed varies by provider and time of day.** A 72-hour median is good for comparison, not a promise of your production P95 latency.
- **Official price pages are the source of truth.** Check each vendor's pricing before committing, and factor in your own caching and batch discounts.
- **Test on your own data.** Artificial Analysis also offers **Optima** for building custom benchmarks from your own tasks, or you can run your top 2–3 candidates on 20–50 real examples.
