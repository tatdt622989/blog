---
title: "Claude Banked Reset: How to Use Your Free Usage Limit Reset"
date: 2026-10-19 16:30:00
updated: 2026-10-19 16:30:00
description: "Claude's banked reset refills your 5-hour or weekly limit from Settings → Usage on web or Desktop: steps, deadline, Claude Code impact, vs Codex."
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

**Claude's banked reset is a one-time usage limit reset that Anthropic gave subscribers with the Opus 5.5 launch on September 22, 2026, to save and use whenever they choose.** On claude.ai or Claude Desktop, open **Settings → Usage**, click **Reset for free** in the **Resets** section, and confirm. Your five-hour or weekly limit (whichever your offer covers) goes back to full immediately. According to @ClaudeDevs posts as reported by a third-party guide, Pro, Max, and Team users can use it until **October 22, 2026**. The exact cutoff time and time zone have not been published, so go by the expiry shown in your own Settings → Usage. An unused reset simply expires.

Anthropic's help center calls this a **limit reset**; "banked reset" is the community name for the same thing. Facts checked on October 19, 2026.

<!--more-->

## Who got it?

| Plan | Status | Basis |
| --- | --- | --- |
| Pro, Max (5x and 20x), Team | Yes, reportedly usable until Oct 22 | The [Anthropic announcement](https://www.anthropic.com/claude-opus-5-5) gives the reset to "subscription users"; plan list and deadline come from [@ClaudeDevs posts quoted by findskill.ai](https://findskill.ai/blog/claude-reset-for-free-button-limits-explained/) |
| Seat-based Enterprise | Unclear | The announcement raised its five-hour limits but did not name it for the reset |
| Free | No evidence | The offer targets subscription users |
| API (Claude Console) | Not applicable | This is a claude.ai subscription benefit, not an API quota |

The quickest check: if **Settings → Usage** shows a **Resets** section with a **Reset for free** button, you have one.

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

## What happens after October 22?

- An unused reset **expires** at the time listed in the offer. It does not turn into anything else.
- Your normal five-hour and weekly limits keep working as before.
- Anthropic describes limit resets as an occasional offer to eligible plans. Any future one will also appear in **Settings → Usage** with its own expiry date.

## When do normal Claude limits reset?

| Limit | How it resets | Where to check |
| --- | --- | --- |
| Five-hour session limit | Renews five hours after the session starts | **Settings → Usage**; **/usage** in Claude Code |
| Weekly limit | At a **fixed time each week** assigned to your account, regardless of when you started using Claude | **Settings → Usage** shows the next reset time |
| Max weekly Fable limit | Max plans have a separate weekly limit for Fable | Same as above |

Sources: [Pro plan](https://support.claude.com/en/articles/8325606-what-is-the-pro-plan), [Claude Code with Pro or Max](https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-or-max-plan). Opus 5.5 also raised five-hour limits on Pro, Max, Team, and seat-based Enterprise; see our [Claude Opus 5.5 launch analysis](/en/2026/09/23/claude-opus-5-5-launch-benchmarks-pricing/) for the background.

## Claude vs. Codex banked resets

Both are called "banked resets," but the rules differ:

| | Claude limit reset | OpenAI Codex banked reset |
| --- | --- | --- |
| What it refills | Five-hour **or** weekly, depending on the offer | A full reset refills both the five-hour and weekly windows |
| Weekly reset time | **Unchanged** | **Changes**; check the panel for the new time afterward |
| Where to redeem | Web and Claude Desktop only | **Settings → Usage** in the Codex app, CLI, or web |
| Used before running out | Allowed, and consumed immediately with no undo | Only consumed if it refreshes at least one window |
| Expiry | Shown in **Settings → Usage** (this one reportedly Oct 22) | Shown in your account |

Codex details are from [OpenAI's help article](https://help.openai.com/en/articles/20001498-how-banked-codex-resets-work). For checking Codex usage, Credits, and timing, see [Codex Usage Limits: 5-Hour Window, Reset Times, and Banked Resets](/en/2026/06/18/claude-codex-usage-limits-guide/).
