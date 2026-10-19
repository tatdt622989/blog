---
title: "Codex 5 小时限制与额度查询：重置时间、用完怎么办"
description: "Codex 额度可在官方用量面板或 CLI 的 /status 查看。Plus 和 Business 有 5 小时与每周限制，Pro 目前没有 5 小时上限，重置时间以面板为准。用完后可以等待、使用 banked reset 或改用 Credits。"
permalink: 2026/06/18/claude-codex-usage-limits-guide/
translation_key: claude-codex-usage-limits
translations:
  zh-TW: /2026/06/18/claude-codex-quota-guide/
  en: /en/2026/06/18/claude-codex-usage-limits-guide/
categories:
  - AI 科技
tags:
  - AI
  - Codex
  - Claude
date: 2026-06-18 14:34:36
updated: "2026-10-19 16:00:00"
---

![Codex 额度与用量管理指南封面](cover.webp)

**Codex 剩余额度和重置时间，可以在 [官方用量面板](https://chatgpt.com/codex/settings/usage) 查看，或在 Codex CLI 里执行 /status。** Plus 和 Standard Business 有 5 小时与每周两个窗口；Pro 目前没有 5 小时上限，但仍可能有每周限制。额度什么时候恢复，以面板上对应窗口显示的时间为准，而不是从报错那一刻起算五小时。额度用完有三种选择：等待自动重置、使用 banked reset，或者消耗 Credits。

<!--more-->

## Codex 额度在哪里查看？

| 查看入口 | 能看到的信息 |
| --- | --- |
| **Codex 客户端 / 网页端：Settings → Usage**（[直接打开](https://chatgpt.com/codex/settings/usage)） | 各窗口用量比例、重置时间、Credits 余额；有可用 banked reset 时会显示 **1 reset available** 或 **Full reset** |
| **Codex CLI：/status** | 当前会话对应的账号和剩余额度 |

[OpenAI 官方定价页](https://learn.chatgpt.com/docs/pricing#where-can-i-see-my-current-usage-limits)给出的也是这两个入口。客户端、网页端和 CLI 数值对不上时，先确认登录的是同一个账号和工作区，再刷新面板。别人的截图不能用来推算你自己的额度。

## Codex 5 小时限制怎么算？各套餐差异

根据 [OpenAI 定价页](https://learn.chatgpt.com/docs/pricing#what-are-the-usage-limits-for-my-plan)（2026 年 10 月 19 日核对）：

| 套餐 | 5 小时限制 | 每周限制 |
| --- | --- | --- |
| Plus、Standard Business | 有，估算值见下表 | 可能有 |
| Pro（每月 $100 / $200 / $500） | **目前没有** | 可能有，官方未公布具体数值 |
| Enterprise / Edu（弹性计费） | 无固定限制，按 Credits 计费 | 无固定限制 |
| Enterprise / Edu（非弹性计费） | 大部分功能与 Plus 相同 | 同 Plus |

Plus 和 Standard Business 每 5 小时的本地消息估算值：

| 模型 | 每 5 小时本地消息数 |
| --- | --- |
| GPT-6 Luna | 350–3,000 |
| GPT-6 Sol | 15–150 |
| GPT-6.1 Sol | 15–160 |
| GPT-6 Astra | 5–45 |

官方特别说明这些**不是固定的消息条数上限**。区间跨度这么大，是因为实际消耗取决于模型、推理强度、上下文长度、读取的文件数量、工具调用次数和任务时长；云端任务一般比本地任务更耗额度。各模型的定位和价格可参考 [GPT-6 Sol 与 Luna 评分与选型](/zh-cn/2026/09/23/gpt-6-sol-luna-pricing-aa-review/)。

另外两条规则：

- 在套餐支持的前提下，Codex、ChatGPT Work、ChatGPT for Excel 和 Workspace Agents **共用同一份 agentic 额度和 Credits**；普通 ChatGPT 的图片、语音等限制单独计算。
- 正在执行的轮次触顶时，官方表示 agent **仍可以把这一轮跑完**，不会被立即打断。

### 为什么等了五小时，Codex 还是用不了？

多半是**每周额度也耗尽了**：5 小时窗口恢复，不等于每周窗口恢复。依次检查登录的账号和工作区、面板上耗尽的是哪个窗口、该窗口显示的重置时间。如果是每周窗口耗尽，就只能等每周重置、使用 banked reset 或消耗 Credits。

## Codex 重置时间：自动重置与 banked reset

| 类型 | 触发方式 | 要点 |
| --- | --- | --- |
| 自动重置 | 窗口到期后自动恢复 | 时间以面板显示为准 |
| 全局重置 | OpenAI 直接对符合条件的账号生效 | 立即生效，不能保留，也不会变成 banked reset |
| Banked reset | 存放在账号中，由你在 **Settings → Usage** 手动使用 | Full reset **会改变每周重置日** |

根据 [OpenAI 官方说明](https://help.openai.com/en/articles/20001498-how-banked-codex-resets-work)：

- **Full banked reset 会同时重置 5 小时和每周窗口，并把每周重置日挪到新的约七天周期。** 使用后记得去面板确认新的时间。
- 只有真正刷新了至少一个窗口才会被扣除；没有可重置的额度时，reset 会继续保留。
- 它不是付费购买的 Credits，也不会永久提高套餐上限。
- 每个 reset 有各自的有效期，以面板或活动弹窗显示为准。不要把某次活动的 30 天期限套到所有 reset 上。

**什么时候用最划算？** 同时比较三项：距离自动重置还有多久、reset 还剩几天有效期、近期的任务量。比如原本周一恢复每周额度，周日用了 reset 之后，周一就不会再恢复，新周期从周日开始算；任务能拖到周一，就先留着。reset 快过期了，就安排到期前本来就要做的任务。

![使用 banked reset 前确认有效期，使用后核对新的每周重置时间](reset-quota.png)

我也会在 X 和 Reddit 关注 OpenAI 和 Codex 团队成员的动态：**一旦看到全局重置的预告，就把开发、测试和代码评审提前到重置之前完成**，避免上一轮额度白白浪费。

## Codex 和 Claude 的 banked reset 有什么区别

两家都提供可保存、手动使用的重置，但规则不同，两边都订阅的话要分开记录：

| | Codex banked reset | Claude 限额重置（Reset for free） |
| --- | --- | --- |
| 恢复哪些额度 | Full reset 同时恢复 5 小时和每周窗口 | 视该次重置而定，只恢复 5 小时**或**每周中的一项 |
| 每周重置日 | 变为新的七天周期 | **不变**，仍按原来的固定时间 |
| 在哪里使用 | Codex 客户端、CLI 或网页端的 **Settings → Usage** | 网页端或 Claude Desktop 的 **Settings → Usage**；终端和 IDE 里的 Claude Code 没有该按钮 |

Claude 的规则见 [Anthropic 官方说明](https://support.claude.com/en/articles/17007452-what-is-a-limit-reset)；详细用法和使用时机，请看 [Claude banked reset 怎么用？](/zh-cn/2026/10/19/claude-banked-reset-guide/)。

## Credits 是什么？

Credits 是套餐内含额度用完后，让支持的功能继续运行的按量付费额度：**先扣套餐额度，触顶后才扣 Credits。** 根据 [OpenAI 定价页](https://learn.chatgpt.com/docs/pricing)，Plus 和 Pro 用户可以加购 Credits，Business、Edu 和 Enterprise 的弹性计费工作区则购买工作区 Credits。

- Credits 与 API 余额是两套体系，也不会提高套餐上限。
- 开启自动充值时，如果余额已低于阈值，可能会立即扣款。
- 已购买的 Credits 一般不退款且有有效期，下单前请看清结算页条款。

详见 [OpenAI Credits 说明](https://help.openai.com/en/articles/12642688-using-credits-for-flexible-usage-in-chatgpt-personal-plans)。如果在考虑升级套餐，可以对照 [AI 编程工具订阅方案对比](/zh-cn/2026/09/14/ai-coding-tools-subscription-comparison/)。

## Codex 额度用完：等待、重置还是 Credits？

| 情况 | 建议 | 决定前确认 |
| --- | --- | --- |
| 任务可以等到自动恢复 | 等待，保留 reset 和 Credits | 恢复时间能否赶上交付期限 |
| 等不了，且有未过期的 banked reset | 使用 reset | reset 有效期、原定恢复时间，以及新的七天周期 |
| 等不了，没有 reset 或想保留原有周期 | 消耗 Credits | 价格、余额和预算；不划算就调整排期 |

Reset 会改变下周的重置时间，Credits 则是额外付费，两者要分开评估。

## 节省 Codex 额度的做法

- **给任务明确的完成标准。** “检查整个项目顺便优化一下”没有终点。可以改成：“修复移动端菜单打开后无法关闭的问题。复现：390px 宽度下打开菜单再点击背景；预期菜单关闭，桌面端不受影响。先排查菜单组件和点击事件，完成后验证这两个操作并汇报，其他布局调整另开任务。”这只是任务描述示例，不代表实测节省比例。
- **一个主题一个会话。** 长对话会不断累积上下文，做完一件事就带着摘要开新会话；把构建产物、依赖目录和大体积媒体文件排除在外。
- **按任务选模型和推理强度。** 格式化、单文件小改动用轻量模型；跨模块设计或难以复现的 Bug 再调高。
- **减少没有增量信息的重跑。** 先跑聚焦当前改动的测试，改动稳定后再跑全量用例。

## 用 CodexBar 在菜单栏监控用量

[CodexBar](https://github.com/steipete/CodexBar) 是第三方开源的 macOS 菜单栏工具，可以同时显示 Codex、Claude Code 等服务的用量和重置倒计时。

![CodexBar 在菜单栏显示 Codex 与 Claude 的用量比例及重置时间](codexbar-panel.jpg)

它默认在本地解析数据，按你开启的数据源读取 CLI 配置、本地日志、OAuth 状态或浏览器 Cookie；导入 Cookie 可能需要钥匙串（Keychain）授权。它不是 OpenAI 或 Anthropic 的官方产品，建议只开启必要的数据源，也不要把含 Cookie 或 Token 的截图发到公开 Issue。只想看官方数据的话，**Settings → Usage** 或 **/status** 就够了。

还在对比各家工具的定位，可以继续阅读 [AI 编程工具对比：Claude Code、Codex、Cursor 怎么选？](/zh-cn/2026/05/06/claude-code-vs-codex-vs-cursor/)。
