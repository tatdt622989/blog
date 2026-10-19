---
title: "AI Coding Subscriptions Compared (2026): Claude Code vs Codex vs Cursor vs Copilot Pricing"
date: 2026-09-14 01:45:00
updated: 2026-10-19 16:00:00
translation_key: ai-frontend-coding-subscriptions-value-guide
description: "October 2026 AI coding plan prices: Copilot Pro $10, Claude Code and Codex from $20, Cursor now sold as the X Subscription. Which plan is the best value?"
permalink: 2026/09/14/ai-coding-tools-subscription-comparison/
translations:
  zh-TW: "/2026/09/14/ai-coding-tools-subscription-comparison/"
  zh-CN: "/zh-cn/2026/09/14/ai-coding-tools-subscription-comparison/"
categories:
- AI Tools
tags:
- AI
- Claude Code
- Codex
- Cursor
- GitHub Copilot
- ChatGPT
---

![AI coding subscription pricing comparison for 2026](cover.jpg)

**Short answer (checked against official pricing pages on October 19, 2026):** on a $10 budget, pick **GitHub Copilot Pro**. At $20, **Claude Pro** (includes Claude Code) or **ChatGPT Plus** (includes Codex) gives the most agent usage. Heavy daily users should move up to **Claude Max** or **ChatGPT Pro** at $100 to $200. Since October 12, **Cursor** is sold as the X Subscription: the included allowance covers Grok models only, and Claude or GPT usage is billed separately at API list prices.

<!--more-->

## October 2026 price table

Individual plans, USD per month, excluding tax. Data as of **2026-10-19**.

| Tool | Plans and monthly price | How usage is measured | Models |
| --- | --- | --- | --- |
| **Claude Code** | Pro $20 (about $17/mo billed annually), Max 5× $100, Max 20× $200 | 5-hour session limit plus weekly limit, shared with the Claude apps; Max is 5× or 20× Pro | Opus, Sonnet, Haiku; Fable up to 50% of weekly limits on Max |
| **Codex** | Free, Go $8, Plus $20, Pro $100 / $200 / $500 | Plus has estimated messages per 5 hours by model; Pro currently has no 5-hour limit, only a weekly allowance | GPT-6.1 Sol, GPT-6 Astra, GPT-6 Luna |
| **GitHub Copilot** | Free, Pro $10, Pro+ $39, Max $100 | Monthly AI Credits (1 credit = $0.01): 1,500 / 7,000 / 20,000; code completions are not charged | A selection of models on Pro; premium models from Pro+ |
| **Cursor (X Subscription)** | Plus $8, Premium $30, Super $100, Ultra $200 | Weekly pool shared with Grok; Premium, Super and Ultra are 4×, 15× and 50× Plus | Included usage is Grok only; third-party models need Premium or above and are billed at API list price |

Sources: [Claude pricing](https://claude.com/pricing), [Max plan](https://support.claude.com/en/articles/11049741-what-is-the-max-plan), [Codex pricing](https://learn.chatgpt.com/docs/pricing), [Copilot plans](https://docs.github.com/en/copilot/get-started/plans), [Cursor pricing](https://cursor.com/pricing).

## Which plan is the best value? Pick by budget

| Monthly budget | Pick | Why |
| --- | --- | --- |
| Under $10 | **Copilot Pro** | $10 buys $15 of AI Credits with unlimited completions; X Plus at $8 works if Grok is enough |
| About $20 | **Claude Pro** or **ChatGPT Plus** | Used fully, multi-source estimates put their usage value far above the price; Claude Free does not include Claude Code |
| $30 | **Cursor Premium** | Only if you want the Cursor editor; Claude and GPT usage costs extra |
| $100 | **Claude Max 5×**, **ChatGPT Pro 100**, **Copilot Max** | Copilot Max currently includes $200 of credits (the flex part can change); the other two publish no token figures |
| $200+ | **Claude Max 20×**, **ChatGPT Pro 200 / 500** | Only Pro 500 gets Codex Ultrafast mode |

**Usage per dollar:** Copilot and Cursor charge third-party models at API prices. With flex credits, Copilot gives roughly **1.5× to 2×** its price; Cursor with Claude or GPT is **1×**. Anthropic and OpenAI do not publish token amounts. Multi-source estimates on my [Atlas ranking](https://atlas.6yuwei.com) as of October 19 range from a few times to dozens of times the price, with the highest samples at about 77× for Claude Max 5× and 22× for ChatGPT Plus. These are research estimates, not guarantees. For how the multiplier works and common traps, see [How to buy AI subscriptions for the best value](/en/2026/09/17/how-to-buy-ai-subscriptions-best-value/).

## Claude Code plans: Pro or Max?

- **Claude Code is included from Pro**; Free does not include it. Fable on Pro requires usage credits, while Max can spend up to 50% of its weekly limit on Fable.
- **Since September 14, the weekly limit is 125% of the pre-promotion baseline**, about 16.7% less than the 150% promotion. The 5-hour limit was not part of this change. [Official announcement](https://x.com/ClaudeDevs/status/2093742321473065266), [clarification](https://x.com/ClaudeDevs/status/2093742322525810912)
- **Max's monthly $100 / $200 API credits cannot be used in Claude Code.** Usage credits beyond your limits are billed at API rates. [Anthropic help](https://support.claude.com/en/articles/11145838-using-claude-code-with-your-pro-or-max-plan)

## Which ChatGPT plan for Codex?

- **Plus at $20 allows roughly** 15 to 160 local messages per 5 hours on GPT-6.1 Sol, 5 to 45 on GPT-6 Astra and 350 to 3,000 on GPT-6 Luna, with weekly limits on top.
- **Pro comes in $100, $200 and $500 tiers**, none of which currently has a 5-hour limit. Only the $500 tier includes Ultrafast. New sign-ups for the $200 tier were paused on September 10 and reopened at the end of September with a changed allowance for new subscribers.
- **Free and Go can run light Codex tasks** on GPT-6 Luna as it rolls out. GPT-5.5 was retired from Codex on October 14. [Codex pricing](https://learn.chatgpt.com/docs/pricing)

Background on the new models and Pro 500 is in the [OpenAI DevDay 2026 recap](/en/2026/09/30/openai-devday-2026-announcements/); for running out of quota, see the [Claude and Codex usage limits guide](/en/2026/06/18/claude-codex-usage-limits-guide/).

## Is Cursor still worth it after the X Subscription change?

- **Since October 12, Cursor is bundled with Grok and X Premium** as the X Subscription. Premium at $30 includes the former Cursor Pro benefits. [xAI announcement](https://x.ai/news/x-subscription)
- **Included usage is Grok only.** Plus is Grok-only; Premium and above can use third-party models in Cursor, paid through top-ups at API list price.
- **Existing Cursor subscribers are not switched automatically.** They keep their plan, price and included third-party usage, and get a prorated refund if they choose to switch.

If you mainly code with Claude or GPT, subscribing to Claude Pro or ChatGPT Plus directly is now cheaper than going through Cursor; Cursor's value is its editor and agent interface. For a feature comparison, see [Claude Code vs Codex vs Cursor](/en/2026/05/06/claude-code-vs-codex-vs-cursor/).

## GitHub Copilot plans and AI Credits

- **All plans moved to AI Credits on June 1.** Base credits equal the price, plus a flex allotment that can change ($5 on Pro, $31 on Pro+, $100 on Max). [GitHub announcement](https://github.blog/news-insights/company-news/github-copilot-individual-plans-introducing-flex-allotments-in-pro-and-pro-and-a-new-max-plan/)
- **Code completions and next edit suggestions are free on paid plans**, so Pro at $10 is enough if completions are what you need.
- **Pro+ and Max can delegate tasks to third-party coding agents** such as Claude and Codex (preview); the Copilot cloud agent is included from Pro.
