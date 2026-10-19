---
title: "Codex Usage Limits: 5-Hour Window, Reset Times, and Banked Resets"
description: "Check Codex usage in the dashboard or with /status. Plus has 5-hour and weekly limits; Pro has no 5-hour cap. Plus how Codex and Claude banked resets differ."
permalink: 2026/06/18/claude-codex-usage-limits-guide/
translation_key: claude-codex-usage-limits
translations:
  zh-TW: /2026/06/18/claude-codex-quota-guide/
  zh-CN: /zh-cn/2026/06/18/claude-codex-usage-limits-guide/
categories:
  - AI Tools
tags:
  - Claude Code
  - Codex
  - Usage Limits
  - CodexBar
date: 2026-06-18 14:34:36
updated: "2026-10-19 16:00:00"
---

![Claude Code and Codex usage limit management guide](cover.webp)

**Check your remaining Codex usage and reset times in the [official usage dashboard](https://chatgpt.com/codex/settings/usage) or with /status in the Codex CLI.** Plus and Standard Business have a five-hour window and a weekly window; Pro currently has no five-hour limit, though weekly limits may apply. Your reset time is the one the dashboard shows for the exhausted window, not five hours after the error. When you run out, you can wait, apply a banked reset, or use credits. Looking for **Claude's** banked reset instead? See the [comparison below](#Codex-vs-Claude-Banked-Resets) or the [Claude banked reset guide](/en/2026/10/19/claude-banked-reset-guide/).

<!--more-->

## Where to Check Codex Usage

| Where | What it shows |
| --- | --- |
| **Codex app / web: Settings → Usage** ([open directly](https://chatgpt.com/codex/settings/usage)) | Usage per window, reset times, credit balance, and **1 reset available** or **Full reset** when you hold a banked reset |
| **Codex CLI: /status** | Account and remaining limits for the current session |

[OpenAI's pricing page](https://learn.chatgpt.com/docs/pricing#where-can-i-see-my-current-usage-limits) points to the same two places. If the app, web, and CLI disagree, confirm you are signed in to the same account and workspace, then refresh the dashboard.

## How the Codex 5-Hour Limit Works by Plan

From [OpenAI's pricing page](https://learn.chatgpt.com/docs/pricing#what-are-the-usage-limits-for-my-plan), checked October 19, 2026:

| Plan | 5-hour limit | Weekly limit |
| --- | --- | --- |
| Plus, Standard Business | Yes, estimates below | May apply |
| Pro ($100 / $200 / $500 per month) | **None currently** | May apply; no published number |
| Enterprise / Edu with flexible pricing | No fixed limits; usage scales with credits | No fixed limits |
| Enterprise / Edu without flexible pricing | Same per-seat limits as Plus for most features | Same as Plus |

Estimated local messages per five hours on Plus and Standard Business:

| Model | Local messages per 5 hours |
| --- | --- |
| GPT-6 Luna | 350–3,000 |
| GPT-6 Sol | 15–150 |
| GPT-6.1 Sol | 15–160 |
| GPT-6 Astra | 5–45 |

OpenAI says these are **not fixed message limits**. The ranges are wide because consumption depends on the model, reasoning effort, context size, files read, tool calls, and task length; cloud tasks typically use more. For model trade-offs, see [GPT-6 Sol and Luna: scores, prices, and how to choose](/en/2026/09/23/gpt-6-sol-luna-pricing-aa-review/).

Two more rules:

- Where the plan supports them, Codex, ChatGPT Work, ChatGPT for Excel, and Workspace Agents **share one agentic allowance and credit pool**. Regular ChatGPT image and voice limits are separate.
- If you hit a limit mid-turn, OpenAI says the agent **can finish that turn**.

### Why Is Codex Still Limited After Five Hours?

Usually because **the weekly window is also exhausted**. A five-hour reset does not restore weekly capacity. Check the signed-in account and workspace, which window is exhausted, and that window's displayed reset time. If it is the weekly window, your options are the weekly reset, a banked reset, or credits.

## Codex Reset Times: Automatic, Global, and Banked Resets

| Type | How it happens | Key point |
| --- | --- | --- |
| Automatic reset | The window expires | Time shown in the dashboard |
| Global reset | OpenAI applies it to eligible accounts | Takes effect immediately; cannot be saved |
| Banked reset | Saved on your account; you apply it in **Settings → Usage** | A full reset **moves your weekly reset date** |

Per [OpenAI's banked reset article](https://help.openai.com/en/articles/20001498-how-banked-codex-resets-work):

- **A full banked reset refreshes both the five-hour and weekly windows and starts a new, roughly seven-day weekly cycle.** Confirm the new date in the dashboard afterward.
- It is consumed only if it actually refreshes at least one window; otherwise it stays available.
- It is not purchased credit and does not permanently raise your plan's limit.
- Each reset has its own expiry, shown in the dashboard or the offer. Do not assume one promotion's 30-day deadline applies to every reset.

**When to redeem:** compare time until automatic recovery, time until the reset expires, and your upcoming workload. If your weekly allowance would recover Monday and you redeem on Sunday, the Monday reset no longer happens; the new cycle starts Sunday. If the work can wait until Monday, keep the reset. If it is about to expire, use it on work you already planned.

![Check the banked reset expiration before use and the new weekly reset time afterward](reset-quota.png)

I also follow OpenAI and Codex team members on X and Reddit. **When they announce an upcoming global reset, I pull development, testing, and code review forward** so the remaining allowance is not wasted.

## Codex vs Claude Banked Resets

Both services offer saved, manually applied resets, but the rules differ. Track them separately if you use both.

| | Codex banked reset | Claude limit reset ("Reset for free") |
| --- | --- | --- |
| What it restores | A full reset restores both 5-hour and weekly windows | Either the 5-hour session **or** the weekly limit, depending on the reset |
| Weekly reset day | Moves to a new seven-day cycle | **Unchanged**; stays on your usual day and time |
| Where to apply | **Settings → Usage** in the Codex app, CLI, or web | **Settings → Usage** on the web or Claude Desktop; no button in Claude Code in the terminal or IDE |

Claude's rules are in [Anthropic's limit reset article](https://support.claude.com/en/articles/17007452-what-is-a-limit-reset). Because Claude limits are shared, a reset applied on the web also restores Claude Code. For timing and step-by-step use, see [Claude banked reset: how it works and when to use it](/en/2026/10/19/claude-banked-reset-guide/).

## Claude Code Usage Limits in Brief

- **Subscription sign-in (Pro, Max):** five-hour session and weekly limits shared across Claude and Claude Code. Use **/usage** in Claude Code, or **Settings → Usage** on the web, to see bars and reset times. Weekly limits reset at a fixed time assigned to your account ([Pro plan article](https://support.claude.com/en/articles/8325606-what-is-the-pro-plan)).
- **API key:** pay-as-you-go, no plan limit; **/cost** shows session spend ([Anthropic](https://support.claude.com/en/articles/14552983-models-usage-and-limits-in-claude-code)). A stray **ANTHROPIC_API_KEY** in your environment overrides your subscription login and bills at API rates ([Claude Code costs docs](https://code.claude.com/docs/en/costs)); check with **/status**.
- **Usage limit vs context limit:** a usage limit caps work per period; a context limit caps one conversation. Use **/compact** to keep going on the same task and **/clear** before an unrelated one.

## Credits vs Banked Resets

Credits are pay-as-you-go capacity that kicks in **after** your included allowance is used. Per [OpenAI's pricing page](https://learn.chatgpt.com/docs/pricing), Plus and Pro users can buy extra credits; Business, Edu, and Enterprise flexible-pricing workspaces buy workspace credits.

- Credits are separate from API credit and do not raise your plan limit.
- Enabling auto top-up while below the threshold can trigger an immediate purchase.
- Purchased credits are generally non-refundable and expire; read the terms at checkout.

Details: [OpenAI flexible usage credits](https://help.openai.com/en/articles/12642688-using-credits-for-flexible-usage-in-chatgpt-free-go-plus-pro-sora). Weighing a plan upgrade instead? See the [AI coding tool subscription comparison](/en/2026/09/14/ai-coding-tools-subscription-comparison/).

## Out of Codex Usage: Wait, Reset, or Use Credits?

| Situation | Choose | Check first |
|---|---|---|
| The task can wait for automatic recovery | Wait; keep your reset and credits | Whether the reset time meets your deadline |
| It cannot wait and you hold an unexpired banked reset | Redeem the reset | Its expiry, the old reset time, and the new seven-day cycle |
| It cannot wait, no reset, or you want to keep your weekly schedule | Use credits | Price, balance, and budget; otherwise reschedule |

## Ways to Use Less Codex Usage

- **Give the task a finish line.** "Check the whole project and optimize it" never ends. Try: "Fix the mobile menu failing to close. Reproduce at 390px width by opening the menu and clicking the backdrop. It should close, and desktop must still work. Start with the menu component and click handlers. Verify both interactions and report; leave other layout work for later." This is an example brief, not a measured savings claim.
- **One topic per session.** Start fresh with a summary when a topic is done; exclude build output, dependencies, and large media.
- **Match the model to the work.** Use lighter models and lower reasoning for routine edits; escalate for cross-module design or hard bugs.
- **Avoid reruns that add nothing.** Run focused tests first, then the full suite once changes are stable.
- **Plan before large diffs, and use Git worktrees** for parallel sessions so they do not overwrite each other.

## Monitor Codex and Claude With CodexBar

[CodexBar](https://github.com/steipete/CodexBar) is a third-party, open-source macOS menu bar app that shows usage meters and reset countdowns for Codex, Claude, and other providers.

![CodexBar showing Claude and Codex session and weekly usage](codexbar-panel.jpg)

It parses locally by default; browser-cookie access is opt-in and may need Keychain permission. It is not an OpenAI or Anthropic product, so enable only the data sources you need. For official numbers, **Settings → Usage** and **/status** are enough.

Still choosing between tools? Read [Claude Code vs Codex vs Cursor](/en/2026/05/06/claude-code-vs-codex-vs-cursor/).
