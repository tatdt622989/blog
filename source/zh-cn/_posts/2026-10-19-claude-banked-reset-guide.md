---
title: "Claude Banked Reset 怎么用？免费重置额度的步骤、期限与限制"
date: 2026-10-19 16:30:00
updated: 2026-10-19 16:30:00
description: "Claude banked reset 是 Anthropic 随 Opus 5.5 发放给 Pro、Max、Team 用户的一次性额度重置，在网页端或桌面端 Settings → Usage 点击 Reset for free 即可把 5 小时或每周额度恢复满格，据报道可用到 10 月 22 日。本文梳理操作步骤、为什么在 Claude Code 里点不了、每周周期会不会变，以及它和 Codex banked reset 的区别。"
permalink: 2026/10/19/claude-banked-reset-guide/
translation_key: claude-banked-reset-guide
translations:
  zh-TW: /2026/10/19/claude-banked-reset-guide/
  en: /en/2026/10/19/claude-banked-reset-guide/
categories:
  - AI 科技
tags:
  - Claude
  - Claude Code
  - Anthropic
  - AI 开发工具
---

![Claude banked reset 封面：环形用量仪表从耗尽重新充满到 100%](cover.jpg)

**Claude 的 banked reset，是 Anthropic 在 2026 年 9 月 22 日发布 Opus 5.5 时，给订阅用户的一次“可以先存着、随时再用”的额度重置。** 在网页端 claude.ai 或 Claude Desktop 打开 **Settings → Usage**，在 **Resets** 区域点击 **Reset for free** 并确认，5 小时额度或每周额度（以你的优惠卡片为准）会立即恢复满格。根据第三方整理的 @ClaudeDevs 帖子，Pro、Max、Team 用户可以用到 **2026 年 10 月 22 日**，具体时刻和时区官方尚未公布，请以账号页面显示的到期时间为准；过期不用就作废。

官方帮助文档把它叫作 **limit reset**，“banked reset”是社区和第三方的说法，指的是同一个功能。本文信息核对日期为 2026 年 10 月 19 日。

<!--more-->

## 哪些用户能拿到？

| 套餐 | 情况 | 依据 |
| --- | --- | --- |
| Pro、Max（5x、20x）、Team | 有，据报道可用到 10 月 22 日 | [Anthropic 公告](https://www.anthropic.com/claude-opus-5-5)写明发放对象是“subscription users”；套餐范围和期限来自 [findskill.ai 引用的 @ClaudeDevs 帖子](https://findskill.ai/blog/claude-reset-for-free-button-limits-explained/) |
| 按席位计费的 Enterprise | 不明确 | 公告只提到上调了 5 小时额度，没有点名重置 |
| Free | 未见相关信息 | 公告对象是订阅用户 |
| API（Claude Console） | 不适用 | 这是 claude.ai 订阅的用量权益，不是 API 配额 |

最快的判断方法：打开 **Settings → Usage**，能看到 **Resets** 区域和 **Reset for free** 按钮，就说明你有。

**注意：使用前降级或退订，这次重置就会失效。**[官方说明](https://support.claude.com/en/articles/17007452-what-is-a-limit-reset)

## 操作步骤

1. 用**网页端 claude.ai** 或 **Claude Desktop** 登录订阅账号。
2. 进入 **Settings → Usage**。
3. 查看 **Resets** 区域的卡片：这次重置的是 **5 小时额度**还是**每周额度**，以及到期时间。
4. 点击 **Reset for free**，再确认一次。

还有一个入口：触发用量上限时弹出的提示里，也有同一个 **Reset for free** 按钮。

使用前要清楚三点（均来自[官方说明](https://support.claude.com/en/articles/17007452-what-is-a-limit-reset)）：

- **不用等额度耗尽才能点**，但一旦点击就无法撤销。
- **手机 App、终端和 IDE 里的 Claude Code 都没有这个按钮**，只能在网页端或桌面端操作。
- 重置不会退还已经扣费的超额用量（usage credits），也不会改变 credit 余额。

## 能恢复什么？每周重置时间会变吗？

| 问题 | 答案 |
| --- | --- |
| 恢复哪项额度 | 视优惠而定，**5 小时额度或每周额度二选一**，立即恢复满格 |
| 每周重置时间会不会变 | **不会**，每周额度仍按原来固定的日期和时间重置 |
| 能否留着以后用 | 可以，但必须在到期前用掉 |
| 已产生的超额费用 | 不退还 |

既然每周周期不受影响，什么时候用只需要看一点：**离下一次自动重置还有多久。** 如果每周额度明天本来就会恢复，现在点就是浪费；如果刚用完、离重置还有好几天，手上又有急活，这时用最划算。下一次重置时间同样可以在 **Settings → Usage** 查看。

## 对 Claude Code 有什么影响？

**Claude 的用量上限按账号统一计算。**官方明确说明，claude.ai、Claude Code 和 Claude Desktop 的用量都计入同一个上限，IDE 插件也是如此。[用量限制说明](https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work)、[在 Pro／Max 套餐中使用 Claude Code](https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-or-max-plan)

所以 Claude Code 撞到上限时，可以这样处理：

1. 切到浏览器或 Claude Desktop，在 **Settings → Usage** 点击 **Reset for free**。
2. 回到 Claude Code，执行 **/usage**，确认套餐用量条已经恢复。[Claude Code 文档](https://code.claude.com/docs/en/costs)
3. 继续之前的任务。

如果手上没有可用的重置，Claude Code v2.1.234 及以上版本可以等额度恢复后自动继续被中断的任务（部分情况下会自动进入等待，也可以在 **/rate-limit-options** 中选择）；开启了 usage credits 的话，还可以通过 **/usage-credits** 按 API 价格付费继续用。[Claude Code 文档](https://code.claude.com/docs/en/costs)

## 10 月 22 日之后会怎样？

- 没用掉的重置会在优惠标注的时间**直接作废**，不会折算成其他额度。
- 日常的 5 小时和每周限制照常生效，不受影响。
- 官方把 limit reset 定义为“不定期向符合条件的套餐提供的优惠”，以后如果再发放，同样会出现在 **Settings → Usage**，并标注各自的到期时间。

## 平时的 Claude 额度什么时候重置？

| 限制 | 重置规则 | 查看位置 |
| --- | --- | --- |
| 5 小时会话限制 | 从本次会话开始算起，5 小时后恢复 | **Settings → Usage**；Claude Code 中用 **/usage** |
| 每周限制 | 每周在分配给账号的**固定时间**重置，与你何时开始使用无关 | **Settings → Usage** 会显示下次重置时间 |
| Max 的 Fable 每周限制 | Max 套餐另有一个独立的 Fable 每周上限 | 同上 |

来源：[Pro 套餐说明](https://support.claude.com/en/articles/8325606-what-is-the-pro-plan)、[在 Pro／Max 套餐中使用 Claude Code](https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-or-max-plan)。Opus 5.5 发布时还上调了 Pro、Max、Team 和按席位计费 Enterprise 的 5 小时额度，背景可以看本站的 [Claude Opus 5.5 发布解读](/zh-cn/2026/09/23/claude-opus-5-5-launch-benchmarks-pricing/)。

## 和 Codex banked reset 有什么区别？

两家都叫“banked reset”，但规则不同，别搞混：

| 对比项 | Claude limit reset | OpenAI Codex banked reset |
| --- | --- | --- |
| 恢复范围 | 5 小时**或**每周，视优惠而定 | full reset 同时恢复 5 小时和每周额度 |
| 每周重置时间 | **不变** | **会变**，用完后要回面板确认新的重置时间 |
| 在哪里使用 | 仅网页端、Claude Desktop | Codex App、CLI、网页端的 **Settings → Usage** |
| 额度没用完时点击 | 可以点，点了即消耗、无法撤销 | 至少恢复一个窗口才会被扣除 |
| 有效期 | 以 **Settings → Usage** 显示为准（本次据报道为 10 月 22 日） | 以账号显示为准 |

Codex 部分依据 [OpenAI 官方说明](https://help.openai.com/en/articles/20001498-how-banked-codex-resets-work)。Codex 额度查询、Credits 和使用时机，见 [Codex 5 小时限制与额度查询：重置时间、用完怎么办](/zh-cn/2026/06/18/claude-codex-usage-limits-guide/)。
