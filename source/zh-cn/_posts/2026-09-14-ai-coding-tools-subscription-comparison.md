---
title: "AI 编程订阅对比 2026：Claude Code、Codex、Cursor、Copilot 价格与额度"
date: 2026-09-14 01:45:00
updated: 2026-10-19 16:00:00
translation_key: ai-frontend-coding-subscriptions-value-guide
description: "2026 年 10 月 AI 编程订阅对比：Copilot Pro 10 美元最便宜，Claude Code 和 Codex 都是 20 美元起，Cursor 已改为 X 订阅，Claude、GPT 另按 API 计费。一张表看清各套餐月费、额度和按预算怎么选最划算。"
permalink: 2026/09/14/ai-coding-tools-subscription-comparison/
translations:
  zh-TW: "/2026/09/14/ai-coding-tools-subscription-comparison/"
  en: "/en/2026/09/14/ai-coding-tools-subscription-comparison/"
categories:
- AI
tags:
- AI
- Claude Code
- Codex
- Cursor
- GitHub Copilot
- ChatGPT
---

![2026 AI 编程订阅套餐价格对比](cover.jpg)

**先说结论（2026 年 10 月 19 日对照各家官方定价页核实）**：预算只有 10 美元，选 **GitHub Copilot Pro**；20 美元档想要最多的 Agent 用量，选 **Claude Pro**（含 Claude Code）或 **ChatGPT Plus**（含 Codex）；每天高强度使用再升级到 100～200 美元的 **Claude Max** 或 **ChatGPT Pro**。**Cursor** 从 10 月 12 日起改卖 X 订阅，新套餐自带额度只覆盖 Grok 模型，用 Claude、GPT 要另外按 API 官方价付费。

<!--more-->

## 2026 年 10 月价格总表

以下为个人套餐的美元月费，不含税；数据截至 **2026-10-19**。

| 工具 | 套餐与月费 | 额度计算方式 | 可用模型 |
| --- | --- | --- | --- |
| **Claude Code** | Pro $20（年付约 $17／月）、Max 5× $100、Max 20× $200 | 5 小时窗口 + 周上限，与 Claude 应用共享；Max 是 Pro 的 5／20 倍 | Opus、Sonnet、Haiku；Max 上 Fable 最多占周额度 50% |
| **Codex** | Free、Go $8、Plus $20、Pro $100／$200／$500 | Plus 按模型估算每 5 小时消息数；Pro 目前没有 5 小时上限，只有周额度 | GPT-6.1 Sol、GPT-6 Astra、GPT-6 Luna |
| **GitHub Copilot** | Free、Pro $10、Pro+ $39、Max $100 | 每月 AI Credits（1 credit = $0.01）：1,500／7,000／20,000；代码补全不扣点 | Pro 为部分模型，Pro+ 起含高级模型 |
| **Cursor（X 订阅）** | Plus $8、Premium $30、Super $100、Ultra $200 | 与 Grok 共用周额度；Premium、Super、Ultra 分别是 Plus 的 4、15、50 倍 | 自带额度仅限 Grok；第三方模型需 Premium 及以上，按 API 官方价另计 |

来源：[Claude 定价](https://claude.com/pricing)、[Max 套餐说明](https://support.claude.com/en/articles/11049741-what-is-the-max-plan)、[Codex 定价](https://learn.chatgpt.com/docs/pricing)、[Copilot 套餐](https://docs.github.com/en/copilot/get-started/plans)、[Cursor 定价](https://cursor.com/pricing)。

## 哪个最划算？按预算选

| 每月预算 | 推荐 | 原因 |
| --- | --- | --- |
| 10 美元以内 | **Copilot Pro** | 10 美元换 15 美元的 AI Credits，补全不限量；只用 Grok 的话 X Plus 8 美元也够 |
| 20 美元左右 | **Claude Pro** 或 **ChatGPT Plus** | 跑满的情况下，多来源估算的用量价值远高于月费；Claude 免费版不含 Claude Code |
| 30 美元 | **Cursor Premium** | 看重 Cursor 编辑器体验才选；Claude、GPT 用量另外付费 |
| 100 美元 | **Claude Max 5×**、**ChatGPT Pro 100**、**Copilot Max** | Copilot Max 目前含 200 美元 credits（flex 部分可能调整）；前两者官方不公布 token 数 |
| 200 美元以上 | **Claude Max 20×**、**ChatGPT Pro 200／500** | 只有 Pro 500 有 Codex Ultrafast 模式 |

**每 1 美元能换多少用量**：Copilot 和 Cursor 对第三方模型都按 API 价格扣费，Copilot 算上 flex 额度约为月费的 **1.5～2 倍**，Cursor 调用 Claude、GPT 就是 **1 倍**。Anthropic 和 OpenAI 不公布 token 数，我做的 [Atlas 排行榜](https://atlas.6yuwei.com) 10 月 19 日的多来源估算从几倍到几十倍不等，最高样本是 Claude Max 5× 约 77 倍、ChatGPT Plus 约 22 倍，属于研究估算，不是官方承诺。倍率怎么算、有哪些坑，见 [AI 订阅怎么买最划算](/zh-cn/2026/09/17/how-to-buy-ai-subscriptions-best-value/)。

## Claude Code 套餐：Pro 还是 Max？

- **Claude Pro 起就包含 Claude Code**，免费版不含。Pro 用 Fable 需要另购 usage credits，Max 最多可用掉周额度的 50%。
- **9 月 14 日起周上限调整为促销前基准的 125%**，比促销期的 150% 少约 16.7%；5 小时上限不在这次调整范围内。[官方公告](https://x.com/ClaudeDevs/status/2093742321473065266)、[官方补充](https://x.com/ClaudeDevs/status/2093742322525810912)
- **Max 附赠的每月 100／200 美元 API credits 不能在 Claude Code 里用**，超出额度后的 usage credits 按 API 价格计费。[Anthropic 说明](https://support.claude.com/en/articles/11145838-using-claude-code-with-your-pro-or-max-plan)

## Codex 该买哪个 ChatGPT 套餐？

- **Plus（20 美元）每 5 小时大约能发** GPT-6.1 Sol 15～160 条、GPT-6 Astra 5～45 条、GPT-6 Luna 350～3,000 条本地消息，另有周上限。
- **Pro 分 100、200、500 美元三档**，目前都没有 5 小时上限；只有 500 美元档支持 Ultrafast。200 美元档 9 月 10 日曾暂停新订阅，9 月底已重新开放，但新用户的额度有调整。
- **Free 和 Go 也能用 Codex 跑轻量任务**（GPT-6 Luna，逐步开放）；GPT-5.5 已于 10 月 14 日从 Codex 下线。[Codex 定价](https://learn.chatgpt.com/docs/pricing)

新模型和 Pro 500 的来龙去脉见 [OpenAI DevDay 2026 总结](/zh-cn/2026/09/30/openai-devday-2026-announcements/)；额度用完怎么办见 [Claude 与 Codex 额度指南](/zh-cn/2026/06/18/claude-codex-usage-limits-guide/)。

## Cursor 改成 X 订阅后还值得买吗？

- **10 月 12 日起 Cursor 与 Grok、X Premium 打包成 X 订阅**，Premium（30 美元）包含原 Cursor Pro 的权益。[xAI 公告](https://x.ai/news/x-subscription)
- **自带额度只给 Grok**：Plus 只能用 Grok 模型；Premium 及以上可在 Cursor 里调用第三方模型，但要先充值、按 API 官方价扣费。
- **老 Cursor 用户不会被强制迁移**，可以保留原套餐、价格和自带的第三方模型额度，主动切换时按比例退款。

如果主要用 Claude 或 GPT 写代码，现在直接订 Claude Pro 或 ChatGPT Plus 比走 Cursor 更划算；Cursor 的价值在于编辑器和 Agent 交互。三者的功能差异见 [Claude Code、Codex、Cursor 功能对比](/zh-cn/2026/05/06/claude-code-vs-codex-vs-cursor/)。

## GitHub Copilot 套餐与 AI Credits

- **6 月 1 日起全面改为 AI Credits 计费**：基础额度等于月费，另加会浮动的 flex 额度（Pro 5 美元、Pro+ 31 美元、Max 100 美元）。[GitHub 公告](https://github.blog/news-insights/company-news/github-copilot-individual-plans-introducing-flex-allotments-in-pro-and-pro-and-a-new-max-plan/)
- **付费套餐的代码补全和 next edit suggestions 不扣点**，只需要补全的话，Pro（10 美元）就够了。
- **Pro+ 和 Max 可以把任务派给 Claude、Codex 等第三方编程 Agent**（预览中）；Pro 起包含 Copilot cloud agent。
