---
title: "GPT-6 Sol and Luna: Artificial Analysis Scores, API Prices, and How to Choose"
date: 2026-09-23 08:33:00
updated: 2026-09-23 09:57:11
description: "Compare GPT-6 Sol and Luna API prices, cache discounts, context limits, Artificial Analysis scores, benchmark costs, and model-selection tradeoffs."
permalink: 2026/09/23/gpt-6-sol-luna-pricing-aa-review/
translation_key: gpt-6-sol-luna-pricing-aa-review
translations:
  zh-TW: /2026/09/23/GPT-6-Sol、Luna-上線：Artificial-Analysis-評分、價格與選型/
  zh-CN: /zh-cn/2026/09/23/gpt-6-sol-luna-pricing-aa-review/
categories:
  - AI Tools
tags:
  - GPT-6
  - OpenAI
  - Artificial Analysis
  - AI Agents
---

![Editorial illustration of GPT-6 Sol and Luna represented by sunlight, moonlight, and connected AI workflows](cover.jpg)

**GPT-6 Sol and GPT-6 Luna became available on September 22, 2026. The practical pitch is newer reasoning and agent capabilities at lower API prices.** They are not simply two speed settings for one model: Sol targets complex coding and agentic workflows, while Luna is positioned for focused, high-volume work where cost matters.

On September 23, Artificial Analysis listed Sol at 48 points and Luna at 37 at their highest reasoning settings. Luna’s measured cost per task in the composite evaluation was about seven cents. The useful question is therefore less “which model wins at everything?” and more “where does the additional capability justify its cost?” This article separates OpenAI’s own results from independent Artificial Analysis measurements. For a same-day product comparison, see the [Claude Opus 5.5 launch analysis](/en/2026/09/23/claude-opus-5-5-launch-benchmarks-pricing/).

<!--more-->

## GPT-6 Sol and Luna specifications and access

OpenAI positions Sol for complex coding and agentic workflows, and Luna for efficient, focused work at higher volume. The current API documentation lists a 1.05-million-token context window and up to 128,000 output tokens for both. Each supports six reasoning settings. Both accept text and image input and return text; the Responses API also supports tools and function calling. See the [GPT-6 Sol documentation](https://developers.openai.com/api/docs/models/gpt-6-sol) and [GPT-6 Luna documentation](https://developers.openai.com/api/docs/models/gpt-6-luna).

| Specification | GPT-6 Sol | GPT-6 Luna |
| --- | --- | --- |
| API model ID | **gpt-6-sol** | **gpt-6-luna** |
| Positioning | Complex coding and agentic work | Focused tasks at high volume |
| Context window | 1,050,000 tokens | 1,050,000 tokens |
| Maximum output | 128,000 tokens | 128,000 tokens |
| Reasoning settings | none, low, medium, high, xhigh, max | none, low, medium, high, xhigh, max |
| Input and output | Text and image input; text output | Text and image input; text output |

OpenAI’s launch announcement lists ChatGPT Work and Codex for Plus, Pro, Business, Enterprise, and Edu users. Free and Go users can access Luna in the desktop app. At announcement time, the models were not yet available in regular Chat, and OpenAI said the rollout would be gradual. API access uses the model IDs above. This reflects the published rollout; individual account availability still depends on the product interface and permissions. [OpenAI’s launch announcement](https://openai.com/index/introducing-gpt-6-sol-and-luna/)

## API prices: Sol is half price; Luna output falls further

The table shows standard API rates per million tokens. OpenAI says both models are about 50% cheaper than their GPT-5.6 counterparts. At the token level, Sol’s input and output rates are both halved. Luna’s input rate is halved, while its output rate drops from $1.20 to $0.50, a reduction of about 58%. See the [official pricing table](https://developers.openai.com/api/docs/pricing).

| Model | Input | Cached input | Output |
| --- | ---: | ---: | ---: |
| GPT-5.6 Sol | $4.00 | $0.40 | $20.00 |
| GPT-6 Sol | $2.00 | $0.20 | $10.00 |
| GPT-5.6 Luna | $0.20 | $0.02 | $1.20 |
| GPT-6 Luna | $0.10 | $0.01 | $0.50 |

For agents that reuse long prompts, cached input matters: GPT-6 cache hits are priced at 10% of uncached input. The 1.05-million-token context limit does not mean every request is billed at the short-context rate, however. Requests with more than 272,000 input tokens incur twice the input and cache rates and 1.5 times the output rate for the entire request. Batch and Flex cost half the standard rates; Fast mode costs twice the applicable rate. Include these rules when estimating production traffic.

## Artificial Analysis scores and measured task costs

Artificial Analysis Intelligence Index v4.3.2 combines ten evaluations covering agentic work, coding and terminal use, science, knowledge reliability, and long-context reasoning. This table is a **live leaderboard snapshot checked on September 23, 2026**, not a permanent ranking. Index scores are not accuracy percentages. The task-cost figures are weighted averages calculated from measured token use and prices across this evaluation suite; they are not fixed prices for every user’s task. See the [Artificial Analysis leaderboard](https://artificialanalysis.ai/leaderboards/models) and [evaluation methodology](https://artificialanalysis.ai/methodology/intelligence-benchmarking).

| Reasoning setting | Sol index | Sol cost per task | Luna index | Luna cost per task |
| --- | ---: | ---: | ---: | ---: |
| low | 34 | $0.13 | 21 | $0.0045 |
| medium | 40 | $0.25 | 29 | $0.02 |
| high | 43 | $0.37 | 32 | $0.03 |
| xhigh | 44 | $0.53 | 34 | $0.04 |
| max | 48 | $1.06 | 37 | $0.07 |

These results offer a useful selection scale. Moving Sol from xhigh to max adds four index points while doubling its measured average task cost. Moving Luna from xhigh to max adds three points, with cost rising from four to seven cents. At max, Sol scores higher, but its measured task cost is about 15 times Luna’s. **Higher reasoning effort buys additional capability on these evaluations; it is not a free default upgrade.**

Sol is not the top model on the same leaderboard: GPT-6 Astra max scores 53, and Claude Opus 5.5 max with fallback scores 58. A useful comparison has to include reasoning settings, fallback behavior, tools, task costs, and the work you actually need done, not only the highest score.

There is also a context-window discrepancy worth flagging. OpenAI’s API docs list 1.05 million tokens for Sol and Luna, while Artificial Analysis currently lists 872,000 for Sol and one million for Luna. The public sources do not explain the difference, so I report provider specifications and AA data separately rather than treating them as the same guarantee.

## What OpenAI’s published tests do and do not show

OpenAI reports scores of 68.8% for Sol max and 66.6% for Luna max on DeepSWE v1.1, and says Luna improves on GPT-5.6 Luna at higher reasoning settings. These are results from OpenAI’s launch materials, not tests rerun by this site. The comparisons include Claude Opus 5 and Claude Fable 5, rather than the Claude Opus 5.5 released on the same day. They help explain OpenAI’s results but should not be presented as a complete head-to-head against the newest competitor. [OpenAI’s coding results](https://openai.com/index/introducing-gpt-6-sol-and-luna/)

OpenAI also says Sol made about half as many mistakes as its predecessor on an internal factuality evaluation built from conversations where users had flagged errors. The company notes that these deliberately error-prone conversations are not representative of typical requests. It is a useful signal, but a production application still needs evaluation against its own data, tools, and success criteria.

## Sol or Luna: choose according to the cost of failure

For a large codebase, cross-file edits, repeated tool calls, or multi-step work with an incomplete specification, I would start with **GPT-6 Sol medium**, then test whether high or xhigh earns its extra cost. OpenAI positions Sol for this kind of work, and Artificial Analysis shows both index scores and task costs rising with higher effort.

For well-bounded work with short outputs but high daily volume—such as classification, extraction, support drafts, or a fixed workflow—start with **GPT-6 Luna medium**. In this composite evaluation, Luna max scores 37 versus Sol low at 34, while its measured cost per task is lower. That is a cost-efficiency observation about this particular evaluation suite, not a promise that Luna will win every real-world task.

The practical value of Sol and Luna is the ability to match model and reasoning effort to task difficulty: use a lower-cost setting for routine work and spend more when a task needs deeper reasoning. Price tables and composite rankings can narrow the candidates. The final choice should use your own success rate, time spent correcting output, risk, and bill. For more context, see the [GPT-6 game-development tool guide](/en/2026/09/09/gpt-6-game-engines-guide/).
