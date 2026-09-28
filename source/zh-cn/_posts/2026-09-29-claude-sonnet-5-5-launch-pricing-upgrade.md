---
title: Claude Sonnet 5.5 发布：价格、功能与升级要点
date: 2026-09-29 02:20:00
updated: 2026-09-29 02:20:00
description: Claude Sonnet 5.5 正式发布，官方称输出速度提升超过 30%，API 单价保持不变。本文梳理主要评测、与 Opus 5.5 的定位差异、百万 token 上下文，以及开发者升级时需要检查的思考模式、工具调用和对话历史兼容性问题。
permalink: 2026/09/29/claude-sonnet-5-5-launch-pricing-upgrade/
translation_key: claude-sonnet-5-5-launch-pricing-upgrade
translations:
  zh-TW: /2026/09/29/Claude-Sonnet-5-5-發布：價格、功能與升級重點一次看/
  en: /en/2026/09/29/claude-sonnet-5-5-launch-pricing-upgrade/
categories:
  - AI 科技
tags:
  - AI
  - Claude
  - Claude Code
  - Anthropic
---

![Claude Sonnet 5.5 连接代码开发、文档和工具任务的主题插画](cover.jpg)

**Claude Sonnet 5.5 已于 2026 年 9 月 28 日发布。** Anthropic 将它定位为日常编程和知识工作的高效选择：官方称输出速度比 Sonnet 5 快超过 30%，多数任务的成本最多降低 30%，但 **API 的 token 单价保持不变**。[官方公告](https://www.anthropic.com/claude-sonnet-5-5)

本文按台北时间 9 月 29 日查到的官方资料整理。评测来自官方公布结果，尚未经过本站独立实测。

<!--more-->

## 它适合接手哪些工作？

修复缺陷、实现明确的需求、整理文档、制作演示文稿，都是 Sonnet 5.5 的主要应用方向。对于复杂、开放式、需要持续判断的任务，Anthropic 仍认为 Opus 5.5 更强。[产品定位](https://www.anthropic.com/claude-sonnet-5-5)

我的建议是先按任务拆分：边界明确的开发工作交给 Sonnet 试跑；涉及架构权衡或跨系统重构，再用相同任务比较 Opus。真正影响效率的是结果能否直接采用，以及需要多少人工返工。

## 核心规格与 API 价格

以下为 API 规格和美元价格，不代表订阅产品的使用额度。[模型文档](https://platform.claude.com/docs/en/models/sonnet-5-5/overview) · [价格表](https://platform.claude.com/docs/en/about-claude/pricing)

| 项目 | Sonnet 5.5 |
| --- | --- |
| API 模型 ID | **claude-sonnet-5-5** |
| 上下文窗口 | 100 万 tokens |
| 常规 API 最大输出 | 128K tokens |
| 输入／输出 | 文本和图片输入，文本输出 |
| 每百万输入 tokens | US$2 |
| 每百万输出 tokens | US$10 |
| 每百万缓存读取 tokens | US$0.20 |

所谓成本降低，来自官方测试中完成任务所需的 tokens 减少，不能理解为价格统一打七折。生成速度提升也不代表搜索、工具执行和模型等待在内的完整流程都会等比例加速。[官方成本说明](https://www.anthropic.com/claude-sonnet-5-5)

只按标准文本单价计算，10 万输入加 2 万输出，Sonnet 5.5 为 **US$0.40**，Opus 5.5 为 **US$0.80**。这是相同 token 用量的算例，未计算缓存、工具费用或其他附加项；真实任务的 token 消耗可能不同。

## 官方评测：进步明显，但不是全面取代 Opus

下面摘录官方对比表。各项评测的尺度不同，分数不可直接相加。[完整评测及脚注](https://www.anthropic.com/claude-sonnet-5-5)

| 评测 | Sonnet 5 | Sonnet 5.5 | Opus 5.5 |
| --- | ---: | ---: | ---: |
| Terminal-Bench 4.0 | 10.3% | 70.6% | 66.4% |
| CursorBench 4.0 | 34.1% | 55.5% | 57.8% |
| GDPval-AA v2.1 | 1449 | 1844 | 1846 |

Terminal-Bench 中 Opus 的 66.4% 是 **xhigh** 下的最高成绩，并非所有模型都使用相同 effort。GDPval-AA 的 Sonnet 分数来自预发布环境，当时有一个可能影响结构化输出的问题；官方表示已经修复，若影响分数，预计幅度较小。这里保留已公布数据。

Sonnet 在部分任务上接近甚至超过 Opus，足以让它进入日常选型名单，但不能由此推导出两者在复杂、开放式任务上的判断能力完全相同。

## 先选对 effort，再比较体验

**Claude 应用和 Claude Code 默认 medium，Claude Platform API 默认 high。** 不同入口的响应体验可能因此不同。[官方设置](https://www.anthropic.com/claude-sonnet-5-5)

官方提示指南建议：需求明确的代理编程先用 **medium**，更难或更长的任务再升到 **high**；聊天等延迟敏感场景先试 **low／medium**。新版重新调整了 effort 对应的思考强度，不能照搬 Sonnet 5 的成本预期。[提示指南](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-sonnet-5-5)

实际评估时，我会固定同一组缺陷、文档和功能需求，记录耗时、费用、返工次数。只要 medium 能稳定交付，就没有必要让所有任务都跑 max。

## 现有 API 集成要检查五类兼容性变化

只替换模型 ID 可能导致请求失败。部署前请检查这些设置：[迁移指南](https://platform.claude.com/docs/en/models/sonnet-5-5/migration-guide)

1. **关闭前置思考：** 将 `thinking: {"type": "disabled"}` 改成 `thinking: {"type": "between_tools"}`，仅支持 high 及以下 effort；工具调用之间仍可能产生思考块。
2. **强制工具调用：** `tool_choice` 的 `any` 和 `tool` 会返回 400，改用 `auto`。`strict: true` 可以约束工具参数结构，但不保证一定调用工具。
3. **历史思考块：** 它们受模型和对话绑定限制；切换模型或改写历史后，根据兼容性和账户设置，可能被丢弃或导致错误。
4. **计算机操作工具：** Claude API 和 Google Cloud 改用 `computer_toolset_20260801`；Amazon Bedrock 仍接受旧版 `computer_20251124`。
5. **advisor 配对：** Sonnet 5、Opus 4.7、Opus 4.8 不再支持作为 Sonnet 5.5 的 advisor。

另外，较长的工具间进度消息会进入 **thinking 块**。只渲染 text 的前端可能看起来没有动静，需要同步处理显示设置和响应类型。[响应变化](https://platform.claude.com/docs/en/models/sonnet-5-5/whats-new-sonnet-5-5)

## 现在值得升级吗？

对已经使用 Sonnet 5 的开发者，我认为值得尽早对比试用：单价不变，官方公布的能力和效率都有进步。生产集成则应先验证工具链、历史消息和输出解析，再扩大切换范围。

官方已列出 Claude API、Amazon Bedrock、Claude Platform on AWS、Google Cloud 和 Microsoft Foundry 的支持情况。[发布记录](https://platform.claude.com/docs/en/release-notes/overview)

如果还在比较两个 5.5 模型，可以阅读本站的 [Claude Opus 5.5 介绍](/zh-cn/2026/09/23/claude-opus-5-5-launch-benchmarks-pricing/)，结合自己的任务复杂度选择。
