---
title: "Claude Banked Reset: How to Claim & Use Free Limit Resets"
date: 2026-10-19 16:30:00
updated: 2026-11-25 00:30:00
description: "Claim and use Claude's free limit reset (banked reset) in Settings → Usage, including Fable 5.2 resets through March 2027, Claude Code, and Codex."
permalink: 2026/10/19/claude-banked-reset-guide/
translation_key: claude-banked-reset-guide
translations:
  zh-TW: /2026/10/19/claude-banked-reset-guide/
  zh-CN: /zh-cn/2026/10/19/claude-banked-reset-guide/
categories:
  - AI Tools
tags:
  - Claude
  - Claude Code
  - Anthropic
  - AI Development Tools
---

![Claude banked reset cover: a circular usage gauge refilling to 100%](cover.jpg)

**Claude's banked reset (officially called a limit reset) is an occasional usage reset Anthropic grants to subscribers to save and redeem whenever they need it.** On claude.ai or Claude Desktop, open **Settings → Usage**, click **Reset for free** in the **Resets** section, and confirm to restore the eligible five-hour or weekly window immediately. After the September 2026 Opus 5.5 wave (expired in October), Anthropic issued a new wave of **Fable resets** with the November 9 Fable 5.2 launch: Max, Ultra, and eligible Team or Enterprise premium seats receive 1 to 3 resets based on subscription tenure, valid until **March 8, 2027**.

Always check **Settings → Usage** for your exact count and expiry date; unused resets simply expire. Facts updated on November 25, 2026.

<!--more-->

## Who is eligible? Current and past reset waves

Anthropic has granted banked limit resets around major model launches. Here is how eligibility breaks down as of November 2026:

| Plan | Fable 5.2 wave (Nov 9, 2026) | Opus 5.5 wave (Sep 22, 2026) | Source |
| --- | --- | --- | --- |
| Max (5x, 20x), Ultra, Team premium seats, legacy seat-based Enterprise premium seats | **1 to 3 Fable resets** by paid tenure (under 6 months: 1; 6–12 months: 2; over 12 months: 3), **valid through March 8, 2027** | Expired Oct 22, 2026 | [Fable 5.2 launch offer](https://support.claude.com/en/articles/17506494) |
| Pro, Team standard seats | 1 Fable reset during the Nov 9–16 launch window (expired Nov 16, 2026) | Expired Oct 22, 2026 | Same |
| Free, self-serve / usage-billed / HIPAA Enterprise | Not eligible | Not eligible | Same |
| API (Claude Console) | Not applicable (subscription benefit only, not API credits) | Not applicable | [Limit reset help center](https://support.claude.com/en/articles/17007452-what-is-a-limit-reset) |

The quickest check: if **Settings → Usage** shows a **Resets** section with a **Reset for free** button, you have an active reset. For full Fable 5.2 plan billing rules (including how Fable resets refund weekly Fable usage and refill five-hour limits), see [Claude Fable 5.2 Explained: Pricing, Benchmarks, and How It Compares With Opus 5.5](/en/2026/11/10/claude-fable-5-2-pricing-benchmarks-analysis/).

**If you downgrade or cancel before using it, the reset is no longer available.** [Help center](https://support.claude.com/en/articles/17007452-what-is-a-limit-reset)

## How to redeem it

1. Sign in to **claude.ai** in a browser or open **Claude Desktop**.
2. Go to **Settings → Usage**.
3. In the **Resets** section, read the card: whether it restores your **five-hour** or **weekly** limit, and when it expires.
4. Click **Reset for free**, then confirm.

You can also click the same **Reset for free** button on the message that appears when you hit a limit.

Three rules from the [help center](https://support.claude.com/en/articles/17007452-what-is-a-limit-reset):

- **You don't have to wait until you hit a limit**, but once used, it can't be undone.
- **The button is not available in the mobile apps or in Claude Code in the terminal or IDE.** Use the web or Desktop.
- It does not refund extra usage you've already been billed for, and it does not change your usage credit balance.

## What it restores, and does the weekly schedule change?

| Question | Answer |
| --- | --- |
| Which limit is refilled | **Either the five-hour limit or the weekly limit**, depending on the offer |
| Does the weekly reset time move | **No.** Weekly limits still reset on their usual day and time |
| Can I save it | Yes, until the expiry shown on the card |
| Extra usage already billed | Not refunded |

Because your weekly schedule stays the same, timing comes down to one question: **how long until your next automatic reset?** If your weekly limit refills tomorrow anyway, using the reset now wastes it. If you've just run out with several days to go and work that can't wait, that is the best moment. Your next reset time is shown in **Settings → Usage**.

## How it affects Claude Code

**Claude usage limits are shared across your account.** Anthropic states that usage on claude.ai, Claude Code, and Claude Desktop counts toward the same limit, and IDE extension usage does too. [Usage limits](https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work), [Claude Code with Pro or Max](https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-or-max-plan)

So when Claude Code hits a limit:

1. Switch to a browser or Claude Desktop and click **Reset for free** in **Settings → Usage**.
2. Back in Claude Code, run **/usage** to check that the plan usage bars have refilled. [Claude Code docs](https://code.claude.com/docs/en/costs)
3. Carry on with your task.

With no reset available, Claude Code v2.1.234 or later can wait for the limit to reset and then continue the interrupted task (in some cases it starts waiting on its own; otherwise pick it from **/rate-limit-options**). If usage credits are on, **/usage-credits** lets you keep going at API rates. [Claude Code docs](https://code.claude.com/docs/en/costs)

## What happens if a reset expires? Will Anthropic grant more?

- An unused reset **expires** at the time listed on the offer card. It does not convert into credits or carry over.
- Your normal five-hour and weekly limits keep working as before.
- Anthropic describes limit resets as an occasional benefit for eligible plans, as seen with both Opus 5.5 in September and Fable 5.2 in November. Any future reset will appear in **Settings → Usage** with its own expiry date.

## When do normal Claude limits reset?

| Limit | How it resets | Where to check |
| --- | --- | --- |
| Five-hour session limit | Renews five hours after the session starts | **Settings → Usage**; **/usage** in Claude Code |
| Weekly limit | At a **fixed time each week** assigned to your account, regardless of when you started using Claude | **Settings → Usage** shows the next reset time |
| Fable usage billing | Max, Ultra, and Team premium seats share the weekly limit with other models; Pro bills Fable to usage credits | Same as above |

Sources: [Pro plan](https://support.claude.com/en/articles/8325606-what-is-the-pro-plan), [Claude Code with Pro or Max](https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-or-max-plan), [Fable 5.2 launch offer](https://support.claude.com/en/articles/17506494). Opus 5.5 also raised five-hour limits on Pro, Max, Team, and seat-based Enterprise; see our [Claude Opus 5.5 launch analysis](/en/2026/09/23/claude-opus-5-5-launch-benchmarks-pricing/) for the background.

## Claude vs. Codex banked resets

Both are called "banked resets," but the rules differ:

| | Claude limit reset | OpenAI Codex banked reset |
| --- | --- | --- |
| What it refills | Five-hour **or** weekly (Fable resets refund weekly Fable usage and refill the 5-hour window), depending on the offer | A full reset refills both the five-hour and weekly windows |
| Weekly reset time | **Unchanged** | **Changes**; check the panel for the new time afterward |
| Where to redeem | Web and Claude Desktop only | **Settings → Usage** in the Codex app, CLI, or web |
| Used before running out | Allowed, and consumed immediately with no undo | Only consumed if it refreshes at least one window |
| Expiry | Shown in **Settings → Usage** (e.g., March 8, 2027 for Fable resets) | Shown in your account |

Codex details are from [OpenAI's help article](https://help.openai.com/en/articles/20001498-how-banked-codex-resets-work). For checking Codex usage, Credits, and timing, see [Codex Usage Limits: 5-Hour Window, Reset Times, and Banked Resets](/en/2026/06/18/claude-codex-usage-limits-guide/).
