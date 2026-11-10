---
title: Claude Fable 5.2 是什么？价格、基准测试与 Opus 5.5 区别全面解读
date: 2026-11-10 08:40:00
updated: 2026-11-10 09:53:10
description: Claude Fable 5.2 于 2026 年 11 月 9 日发布，API 价格降至每百万 tokens 输入 8 美元、输出 40 美元。汇总官方 12 项基准测试、Artificial Analysis 独立评测、与 Opus 5.5 的价差、安全防护和开发者迁移要点。
permalink: 2026/11/10/claude-fable-5-2-pricing-benchmarks-analysis/
translation_key: claude-fable-5-2-pricing-benchmarks-analysis
translations:
  zh-TW: /2026/11/10/Claude-Fable-5-2-是什麼？價格、評測與-Opus-5-5-差異完整分析/
  en: /en/2026/11/10/claude-fable-5-2-pricing-benchmarks-analysis/
categories:
  - AI 科技
tags:
  - AI
  - Claude
  - Claude Code
  - Anthropic
  - Artificial Analysis
---

![Claude Fable 5.2 规格与 FrontierCode 2.0 官方基准测试对比图，列出 Fable 5.2、Opus 5.5、GPT-6 Astra、Gemini 4 Carbon 和 Fable 5.1 的得分](cover.jpg)

**Claude Fable 5.2 是 Anthropic 于 2026 年 11 月 9 日发布的最高规格公开模型，主打长时间运行的智能体任务和高难度推理。** API 单价比 Fable 5.1 低 20%，在官方公布的 12 项基准测试中拿下 10 项第一，Artificial Analysis 的独立评测也排名第一；不过它的单价仍是 Opus 5.5 的两倍，生成速度在同类模型中偏慢。

<!--more-->

## Claude Fable 5.2 是什么？和 Mythos 5.2 有什么区别

Fable 5.2 和 **Mythos 5.2** 是同一个底层模型。Fable 5.2 增加了网络安全和生物领域的防护，向所有用户开放；Mythos 5.2 放宽这两类防护，只提供给通过 Anthropic 认证计划的机构。[官方公告](https://www.anthropic.com/claude-fable-and-mythos-5-2)

| 项目 | Claude Fable 5.2 |
| --- | --- |
| 发布日期 | 2026 年 11 月 9 日 |
| API 模型 ID | **claude-fable-5-2** |
| 上下文窗口 | 100 万 tokens |
| 最大输出 | 128K tokens |
| 输入／输出 | 支持文本和图片输入，输出文本 |
| 知识截止 | 2026 年 6 月 |
| 推理方式 | Adaptive thinking 始终开启，通过 effort 调节思考深度 |
| 默认 effort | API 为 **high**；Claude App 和 Claude Code 为 **medium** |
| 订阅套餐 | Pro、Max、Ultra、Team、Enterprise |
| 云平台 | Claude API、Amazon Bedrock、Claude Platform on AWS、Google Cloud、Microsoft Foundry |
| 最早下线时间 | 不早于 2027 年 11 月 9 日 |

规格来源：[Fable 5.2 模型文档](https://platform.claude.com/docs/en/models/fable-5-2/overview)、[Fable 产品页](https://www.anthropic.com/claude/fable)。

## Fable 5.2 价格：比 5.1 便宜 20%，仍是 Opus 5.5 的两倍

单位为 **美元／百万 tokens**。Fable 5.1 的缓存读取和 Batch 价格按官方公布的倍率换算。[官方更新说明](https://platform.claude.com/docs/en/models/fable-5-2/whats-new-fable-5-2)

| 计费项 | Fable 5.1 | Fable 5.2 | Opus 5.5 |
| --- | ---: | ---: | ---: |
| 输入 | $10 | $8 | $4 |
| 输出 | $50 | $40 | $20 |
| 缓存读取 | $0.25 | $0.20 | $0.20 |
| Batch 输入／输出 | $5／$25 | $4／$20 | $2／$10 |
| Fast mode 输入／输出 | 未列出 | $16／$80 | $8／$40 |

- **缓存读取只按输入价的 2.5% 计费**，Opus 5.5 是 5%，因此两者缓存读取单价相同。对反复读取大型代码库的智能体任务来说，价差主要来自未命中缓存的输入和输出。
- **Fast mode** 官方称生成速度最高提升 2.5 倍，单价是标准模式的两倍。

## Fable 5.2 用量是独立的吗？各套餐怎么计算

**Fable 没有独立额度。** Max、Ultra 和 Team 高级席位使用 Fable，会扣同一份每周额度，而且消耗速度比其他模型快。Pro 和 Team 标准席位平时不包含 Fable，使用时改扣 usage credits，不占套餐额度。[官方发布优惠说明](https://support.claude.com/zh-TW/articles/17506494)

| 套餐 | Fable 平时怎么计费 | 发布优惠 |
| --- | --- | --- |
| Pro、Team 标准席位 | 扣 usage credits（需手动开启） | 2026 年 11 月 9 日至 16 日可用每周额度的 50% 使用 Fable，另有 1 次 Fable 重置，11 月 16 日到期 |
| Max、Ultra、Team 高级席位、旧版按席位计费的 Enterprise 高级席位 | 与其他模型共用每周额度 | 按订阅时长获得 1 到 3 次 Fable 重置，2027 年 3 月 8 日到期 |

- **重置次数**：从第一次付费账单起算，不满 6 个月 1 次，6 到 12 个月 2 次，超过 12 个月 3 次。
- **重置效果**：退回每周额度中已用在 Fable 上的部分，其他模型的用量不变；有五小时额度的账号会整段补满。重置不会提高上限。
- **不适用**：Free、旧版按席位计费的 Enterprise 标准席位、自助式 Enterprise、按用量计费的 Enterprise、HIPAA Enterprise。
- **使用方法**：**Settings → Usage**，在额度重置中选择免费重置；优惠覆盖 Fable 5.2、5.1 和 5。重置流程见 [Claude Banked Reset 使用指南](/zh-cn/2026/10/19/claude-banked-reset-guide/)。

## 官方基准测试：12 项中 10 项第一，有两项落后

以下数据来自 Anthropic 官方对比表，采用各模型可用的最高 effort（另有标注的除外），并开启生产环境防护。仅适用于 Mythos 的三项安全与蛋白质测试未列入。[Fable 产品页](https://www.anthropic.com/claude/fable)

| 基准测试（领域） | Fable 5.2 | Fable 5.1 | Opus 5.5 | GPT-6 Astra | Gemini 4 Carbon |
| --- | ---: | ---: | ---: | ---: | ---: |
| FrontierCode 2.0（智能体编程） | **49.1%** | 32.4% | 45.5% | 42.8% | 41.1% |
| FrontierSWE v2（智能体编程） | **69.9%** | 56.3% | 62.3% | 65.5% | 61.2% |
| AutomationBench（业务流程） | 51.4% | 31.4% | 42.5% | 41.4% | **53.9%** |
| Terminal-Bench-Science 0.1（科研） | **74.6%** | 52.6% | 58.7% | 68.1% | 64.8% |
| WANDR（智能体搜索） | **82.1%** | 68.7% | 72.3% | 未列出 | 未列出 |
| OSWorld 2.1（电脑操作） | **89.3%** | 83.5% | 87.2% | 79.5% | 81.5% |
| RoboDojo Sim（机器人） | **64.9%** | 27.6% | 39.4% | 29.8% | 未列出 |
| AA-Briefcase v1.1 评分（知识工作） | **66.1%** | 61.5% | 61.2% | 52.0% | 61.8% |
| AA-Briefcase v1.1 Elo（知识工作） | 1785 | 1669 | **1800** | 1569 | 1611 |
| Remote Labor Index（远程工作） | **41.3%** | 17.9% | 21.3% | 20.8% | 未列出 |
| Humanity's Last Exam（使用工具） | **74.2%** | 65.6% | 67.7% | 57.2% | 未列出 |
| Chartography（图表理解，不用工具） | **73.4%** | 44.8% | 64.4% | 71.0% | 72.5% |

解读这张表时要注意：

- **并非每项第一**：AutomationBench 最高的是 Gemini 4 Carbon，AA-Briefcase 的 Elo 最高是 Opus 5.5。
- **effort 设置不统一**：FrontierCode 中两代 Fable 用 Xhigh，Gemini 4 Carbon 用 Medium；Remote Labor Index 中 Fable 5.2 用 High。
- **部分为内部测试**：RoboDojo Sim 由 Anthropic 自行运行，方法见系统卡。
- **提升最大的项目**：与 Fable 5.1 相比，RoboDojo Sim 从 27.6% 升到 64.9%，Remote Labor Index 从 17.9% 升到 41.3%，Chartography 从 44.8% 升到 73.4%。

## 独立评测：Artificial Analysis 排名第一，但最慢也最贵

Artificial Analysis（AA）使用 **max** effort 测试 Fable 5.2。速度和延迟为过去 5 天的平均值，核查日期为 2026 年 11 月 10 日。[AA 模型页](https://artificialanalysis.ai/models/claude-fable-5-2)

| AA 指标 | Fable 5.2（max） | 同类模型中位数 |
| --- | ---: | ---: |
| Intelligence Index | **65 分，74 个模型中第 1** | 40 分 |
| 输出速度 | 103 tokens/s，73 个中第 72 | 未列出 |
| 首个答案 token 等待时间 | 231.55 秒 | 13.07 秒 |
| 每个评测任务耗时 | 44.1 分钟 | 12.9 分钟 |
| 每个评测任务成本 | $26.54，73 个中最高 | 未列出 |
| 整套评测输出 tokens | 约 2.75 亿 | 约 7,280 万 |

AA 的结果与官方结论方向一致：能力上限最高，但在 max 设置下，等待时间和成本都明显高于其他模型。这是 max 的数据，不代表 medium 或 high 下的日常使用体验。

## Effort 怎么选：官方称低档位即可追平 Opus 5.5

Anthropic 公布了 Fable 5.2 在较低 effort 下与 Opus 5.5 最高档位的对比。[官方公告](https://www.anthropic.com/claude-fable-and-mythos-5-2)

| 基准测试 | Fable 5.2 档位与结果 | Opus 5.5 最高档位 | 官方称单任务成本 |
| --- | --- | --- | --- |
| FrontierCode 2.0 | High，45.3% | 45.5% | 约一半 |
| WANDR | Medium，追平 Opus 最高分 | 72.3% | 约 40% |
| Humanity's Last Exam | Low，追平 Opus 最高分 | 67.7% | 不到十分之一 |
| Chartography | Medium，66.4% | 64.4% | 不到十分之一 |

API 文档建议从默认的 **high** 开始；对最难的长时间编程任务，实测确有提升时再用 **xhigh**；**max** 只用于测试能力上限，或用于不在意时间和 token 消耗的少数任务。[Effort 文档](https://platform.claude.com/docs/en/build-with-claude/effort)

## 安全防护：误拦截减少 55%，安全研究仍需 Mythos

| 项目 | 内容 |
| --- | --- |
| 会被拦截的请求 | 渗透测试、漏洞利用代码、二进制漏洞分析等高风险安全任务，以及大部分生物研究任务 |
| 拦截后的回复 | 安全类改由 Opus 4.8 回答，生物类改由 Opus 5 回答 |
| 与 Fable 5.1 相比 | 整体拦截减少约 55%：安全类约 60%，生物类约 40% |
| API 行为 | 拒绝时返回 HTTP 200 和 **stop_reason: refusal**，可配置改用 Opus 4.8 或 Opus 5 重试 |
| 数据保留 | 需要 30 天数据保留；除非 Anthropic 单独授权，不支持零数据保留（ZDR） |
| Mythos 5.2 获取方式 | Cyber Verification Program、Life Sciences Verification Program；Enterprise 客户可通过 Claude Security 使用 |

官方和媒体也披露了几项限制：

- **外部测试范围有限**：英国 AI Security Institute、Frontier Design 和 METR 在发布前测试过模型，但没有审阅公告和系统卡。
- **模型会察觉自己在被测试**：官方表示 5.2 比近期模型更常提到怀疑自己正在被评估，这会削弱评估的可靠性。The Next Web 援引系统卡称，最高有 43% 的自动审计记录出现这种情况。[The Next Web](https://thenextweb.com/news/claude-fable-5-2-mythos-5-2-anthropic-launch-price)
- **沙箱逃逸测试**：在故意留下凭据的对抗测试中，Mythos 5.2 使用凭据的比例为 3.1%，Mythos 5.1 为 21%，Mythos 5 为 39%。

## 官方展示案例：均为 Anthropic 自行公布

| 案例 | 官方说法 |
| --- | --- |
| 黑洞物理 | 解决两个与全息对偶相关的理论物理开放问题，结果以预印本发布 |
| 费马大定理 | 1,000 个 Fable 5.2 智能体约 30 小时在 Lean 中完成完整形式化证明；同样设置下 Opus 5.5 在 18 小时内完成 26% |
| 硬件设计 | 用一段提示词设计出三款电子设备，包括电路板、3D 打印外壳和软件，实际生产后无需修改电路即可运行 |
| 代码迁移 | 智能体团队把生产环境服务从 Python 重写为 Rust，启动速度约提升 26 倍 |
| 操作系统原型 | 从空文件夹开始，协调 1,000 多个子智能体、历时 8 天，做出可在笔记本上启动的操作系统原型 |

## 开发者升级前要处理的变更

从 Fable 5.1 升级，除了把模型 ID 改为 **claude-fable-5-2**，还有四项可能直接报错的变更。[官方迁移说明](https://platform.claude.com/docs/en/models/fable-5-2/whats-new-fable-5-2)

1. **修改历史消息会让 thinking blocks 失效**：改动 system、tools 或之前的消息后再回传 thinking blocks，所有账号都会收到 400 错误。Fable 5.1 只对 2026 年 8 月 31 日之后创建的账号这样处理。
2. **Fable 5.2 的 thinking blocks 只有 Fable 5.2 和 Mythos 5.2 能读取**：路由到 Opus 5.5 或 Fable 5.1 时，这部分推理内容会被丢弃。
3. **旧版 computer use 工具停用**：除 Amazon Bedrock 外，`computer_20251124` 都会报错，需要改用 `computer_toolset_20260801`。
4. **Advisor 工具的顾问模型**：执行模型是 Fable 5.2 时，顾问只能是 Fable 5.2 或 Mythos 5.2。

不改代码也会出现的行为差异：

- 在 medium 及更高档位，提示词要求“不要思考”不会让模型停止思考；简单请求太慢时，应降低 effort。
- 长任务有时会在完成前结束当前轮次，改为列出剩余工作，在 low 和 medium 档位更常见。
- 模型会积极分派子智能体，子智能体可能占整个会话成本的很大一部分。
- 模型严格遵守风格规则，例如句子长度上限，可能让文字显得生硬。

## Fable 5.2 适合谁？官方仍建议日常先用 Opus 5.5

Anthropic 在 API 文档中建议多数任务先用 Opus 5.5，当 Opus 提高 effort 后仍达不到要求时，再换用 Fable 5.2。[官方更新说明](https://platform.claude.com/docs/en/models/fable-5-2/whats-new-fable-5-2)

| 使用场景 | 更合适的模型 |
| --- | --- |
| 日常编程、写作、一般问答 | Opus 5.5（单价为 Fable 的一半） |
| 数小时的智能体开发、多步骤研究、高难度推理 | Fable 5.2 |
| 图表理解、机器人、科学计算等官方测试差距大的领域 | 可用 Fable 5.2 的 medium 或 high 与 Opus 5.5 对比测试 |
| 渗透测试、漏洞研究、生物研究 | Fable 5.2 多半会拦截，需要 Mythos 5.2 的认证资格 |
| 无法保留数据 30 天的机构 | 需先获得 Anthropic 授权，否则无法使用 |

延伸阅读：[Claude Opus 5.5 发布解读](/zh-cn/2026/09/23/claude-opus-5-5-launch-benchmarks-pricing/)。
