---
title: "OpenAI DevDay 2026 汇总：Dots、Space、GPT-6.1 Sol 与 25 项更新"
date: 2026-09-30 01:52:47
updated: 2026-09-30 01:52:47
description: "OpenAI DevDay 2026 发布汇总，解析 Dots 个人智能体、ChatGPT Space、GPT-6.1 Sol、Ultrafast、Decisions API 与 Codex Cloud，涵盖 25 项更新、API 定价、订阅及功能上线阶段。"
translation_key: openai-devday-2026-announcements
permalink: 2026/09/30/openai-devday-2026-announcements/
translations:
  zh-TW: "/2026/09/30/OpenAI-DevDay-2026-總整理：Dots、Space、GPT-6-1-Sol-與-25-項更新/"
  en: "/en/2026/09/30/openai-devday-2026-announcements/"
categories:
- AI 工具
tags:
- OpenAI
- DevDay
- ChatGPT
- Codex
- GPT-6.1 Sol
---
![Dots 个人智能体与 GPT-6.1 Sol 新模型概念封面](cover.jpg)

OpenAI DevDay 2026 将个人智能体、团队文档和开发工具连到了一起：**dots 承担持续性任务，ChatGPT Space 沉淀共享上下文，GPT-6.1 Sol 和 Ultrafast 分别改善能力、成本与等待时间。** 本文汇总官方目前列出的 25 项发布，并说明 API、订阅及上线阶段的差别。

<!--more-->

**资料更新日期：2026 年 9 月 30 日，UTC+8。** 本文依据发布期间公开的官方资料整理，区分已上线、有限预览和后续推出；具体权限取决于套餐、地区及管理员配置。

## Dots：持续运行的个人智能体

Dots 面向持续性工作，而不只是一次问答。官方明确说明，**dots 由 GPT-6 Astra 驱动**，可在 ChatGPT 桌面端创建。它与 Sol 同场发布，并不意味着默认使用新 Sol。[官方介绍](https://chatgpt.com/features/dots/)

我更关心的是，第二天它能否延续前一天的工作。以项目跟进为例，持续更新资料、保留上下文、把关键决策交还给用户，比一次完成演示更能体现个人智能体的价值。

## GPT-6.1 Sol：能力与成本的新平衡

OpenAI 表示，GPT-6.1 Sol 在编程、计算机操作和专业任务的多项评测中接近 Astra。**这是官方评测结果，并非本文实测**，也不能推导为所有任务都能替代 Astra。[模型公告](https://openai.com/index/introducing-gpt-6-1-sol/)

| 标准 API 项目 | 每百万 tokens 费用 |
|---|---:|
| 输入 | US$2 |
| 缓存输入 | US$0.10 |
| 输出 | US$10 |

模型 ID 为 **gpt-6.1-sol**，上下文窗口约 105 万 tokens，最大输出 12.8 万 tokens。超过 272K 输入的长上下文请求采用更高费率，不能一律按标准价格估算。[模型规格](https://developers.openai.com/api/docs/models/gpt-6.1-sol)

工具调用需使用 Responses API。推理强度支持 low、medium、high、xhigh、max，不支持 none 或 minimal。Plus、Pro、Business、Enterprise、Edu 用户可在 **ChatGPT Work 和 Codex** 中使用；普通 Chat 暂未开放。

## Ultrafast 和 Pro 500：速度不等于无限额度

Ultrafast 是推理服务层级，API 通过 `service_tier: "ultrafast"` 指定。对频繁调用工具的应用，官方建议持续使用 WebSocket 连接减少往返开销。目前支持美国数据驻留及全球处理，不支持其他区域端点。[Ultrafast 文档](https://developers.openai.com/api/docs/guides/ultrafast-mode)

本次先推出 Astra Ultrafast，**GPT-6.1 Sol Ultrafast 尚未上线**。加速指标针对 token 生成，不能直接换算成项目交付效率。

**Pro 500 每月 US$500**。个人 Pro 套餐中仅 Pro 500 包含 Ultrafast；发布时，Pro 100、Pro 200 加购 credits 也不会解锁该功能。使用先消耗套餐额度，再消耗 credit 余额。[Pro 套餐说明](https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers)

## ChatGPT Space、Pages 与协作演示文稿

Space 将团队资料放在共同空间中。Pages 支持实时编辑、评论以及邀请 ChatGPT 或 dot 修改内容，也可以结合已连接工具中的信息持续更新。[Space 产品页](https://chatgpt.com/features/space/)

Space 面向 Pro、Business、Enterprise。**协作演示文稿和电子表格仍标注 coming soon**，不应将展示中的每种文档都理解为已正式开放。

团队实际采用时，我会先看版本与责任是否清楚：资料更新后，参与者能否找到最新内容，智能体完成工作后又由谁接手。协作界面的价值取决于它能否减少反复确认。

## Codex Harness、Cloud 与 Agents API 的关系

**Harness 可以理解为模型的任务执行系统**，负责协调工具、状态和工作流程；Cloud 则是执行环境。官方汇总并未将 Codex Harness 单列为产品，因此本文用它解释架构，不额外算作第 26 项发布。

Codex Cloud 可以准备代码仓库、依赖和开发工具，发布可重复使用的环境，并让不同任务维持独立工作状态。完成后仍应审查变更和测试结果，再提交或创建 PR。[Cloud 文档](https://learn.chatgpt.com/docs/cloud)

Agents API 面向需要把智能体嵌入应用的开发者，本次加入 computer use。直接委派开发任务和在自己的服务中集成执行能力，是两个不同的使用入口。[Computer use 文档](https://developers.openai.com/api/docs/guides/agents-api/tools/computer-use)

Codex Security Cloud 支持扫描已连接的 GitHub 仓库、检查新提交并生成修复建议。云端版本与本地 Security plugin 是不同执行路径，修复补丁仍需审查。[Security Cloud 文档](https://learn.chatgpt.com/docs/security/setup)

## Decisions API：从有限答案中快速选择

Decisions API 让 Luna 根据文本或图像，在开发者预先定义的答案中做判断，用于分类、请求路由及下一步动作选择。当前为**有限预览**，计划在未来几天扩大开放。[官方汇总](https://openai.com/index/devday-2026-recap/)

Google Flights 演示提供了一个界面操作场景，但不能据此认为它是完整的订票 API。更准确的理解是流程中的判断节点：选择路径之后，后续操作仍由相应工具执行。

## Plugins：扩展 ChatGPT 的工作界面

Plugin extensions 支持侧边栏入口、会话面板和自定义文件查看器，也包括双向上下文共享、深层链接和结构化输入表单。[Extensions 文档](https://developers.openai.com/plugins/build/extensions)

具体开放情况需要单独看：**Free、Go 的网页扩展仍待推出，输入框 mentions 暂限桌面端**。套餐范围与平台功能不能混为一谈。

## 25 项发布速查

下表按官方清单整理，名称不代表全部已普遍可用。[官方完整索引](https://openai.com/index/devday-2026-recap/)

| # | 项目 | 用途 |
|---|---|---|
| 1 | Dots | 常驻个人智能体 |
| 2 | GPT-6.1 Sol | 新模型 |
| 3 | Ultrafast | 高速推理 |
| 4 | Private Intelligence | 企业隐私 |
| 5 | Codex Cloud | 云端开发 |
| 6 | Codex CLI | 终端更新 |
| 7 | Code Review | 代码审查 |
| 8 | Codex Security Cloud | 安全检查 |
| 9 | Decisions API | 有限选项决策 |
| 10 | Agents API + Computer use | 智能体执行 |
| 11 | Bedrock Managed Agents | AWS 集成 |
| 12 | Plugin extensions | 界面扩展 |
| 13 | Plugin Creator / discovery | 创建与发现插件 |
| 14 | Sites + plugins | 网站集成 |
| 15 | MCP events | 事件自动化 |
| 16 | ChatGPT Space | 团队空间 |
| 17 | Pages | 协作文档 |
| 18 | Collaborative slides | 协作演示文稿 |
| 19 | Teams / shared tasks | 共享任务 |
| 20 | @ChatGPT in Slack / Teams | 通信协作 |
| 21 | Meetings plugin | 会议纪要 |
| 22 | Shareable profiles | 分享作品 |
| 23 | Sign in with ChatGPT | 账号与额度整合 |
| 24 | Pro 500 | 新订阅方案 |
| 25 | OpenAI Marketplace | 企业采购 |

**Private Inference 计划秋季预览，协作演示文稿预计未来数周推出，Meetings 为 macOS Beta。** 符合订阅资格不代表功能已向账号开放。

## 对个人开发者与团队意味着什么

我的判断是，这次更新的重点在于持续执行：dots 接任务，Space 保留成果，Cloud 提供运行环境，模型提供成本和速度选项。个人开发者可以先关注 Sol 在真实任务中的表现；团队则需要检验共享上下文、任务交接和结果审查能否衔接。

是否升级 Pro 500，应依据自身的使用量和等待成本。工具响应、测试和人工确认都可能成为耗时环节，仅看 token 速度不足以判断实际收益。

也可以对照本站的 [DevDay 发布前瞻](/zh-cn/2026/09/29/openai-devday-2026-rumor-probabilities/)，看看哪些预期最终落地。
