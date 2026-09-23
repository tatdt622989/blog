---
title: GPT-6 Sol 与 Luna 发布：Artificial Analysis 评分、API 价格与选型
date: 2026-09-23 08:33:00
updated: 2026-09-23 08:33:00
description: GPT-6 Sol 与 Luna 于 2026 年 9 月 22 日发布。本文对比官方 API 规格、标准与缓存单价、长上下文费率，以及 Artificial Analysis 的 Intelligence Index 分数与单项评测成本，说明如何选择 Sol 或 Luna。
permalink: 2026/09/23/gpt-6-sol-luna-pricing-aa-review/
translation_key: gpt-6-sol-luna-pricing-aa-review
translations:
  zh-TW: /2026/09/23/GPT-6-Sol、Luna-上線：Artificial-Analysis-評分、價格與選型/
  en: /en/2026/09/23/gpt-6-sol-luna-pricing-aa-review/
categories:
  - AI 科技
tags:
  - GPT-6
  - OpenAI
  - Artificial Analysis
  - AI Agent
---

![GPT-6 Sol 与 Luna 以日光和月色呈现的 AI 工作流程插画](cover.jpg)

**GPT-6 Sol 与 GPT-6 Luna 已于 2026 年 9 月 22 日发布。这次更新的实际卖点，是把更先进的推理与智能体能力带到更低的 API 价位。** 不过，Sol 和 Luna 不是同一模型的快慢模式：Sol 面向复杂编程与多步骤智能体任务；Luna 更适合目标明确、调用量大且预算敏感的工作。

我在 9 月 23 日查看 Artificial Analysis 实时榜单时，Sol 的最高推理档位得 48 分，Luna 得 37 分；与此同时，Luna 在该综合评测中的单项任务成本约为 7 美分。与其只问“谁全面胜出”，不如看两者怎样取舍。本文将 OpenAI 自行公布的测试与 Artificial Analysis 的独立评测分开整理，并附上[同日发布的 Claude Opus 5.5 评测分析](/zh-cn/2026/09/23/claude-opus-5-5-launch-benchmarks-pricing/)作为参照。

<!--more-->

## GPT-6 Sol 与 Luna 的规格和入口

OpenAI 将 Sol 定位为复杂编程与智能体工作模型，将 Luna 定位为高效率、大批量聚焦任务的选择。官方 API 文档目前为两者列出 105 万 tokens 上下文窗口、最多 12.8 万输出 tokens，以及六档推理强度。两者都接受文本和图片输入、生成文本；通过 Responses API 还可使用工具和函数调用。[GPT-6 Sol 文档](https://developers.openai.com/api/docs/models/gpt-6-sol)、[GPT-6 Luna 文档](https://developers.openai.com/api/docs/models/gpt-6-luna)

| 项目 | GPT-6 Sol | GPT-6 Luna |
| --- | --- | --- |
| API 模型 ID | **gpt-6-sol** | **gpt-6-luna** |
| 官方定位 | 复杂编程、智能体工作流 | 聚焦任务、高用量服务 |
| 上下文窗口 | 1,050,000 tokens | 1,050,000 tokens |
| 最大输出 | 128,000 tokens | 128,000 tokens |
| 推理档位 | none、low、medium、high、xhigh、max | none、low、medium、high、xhigh、max |
| 输入与输出 | 文本、图片输入；文本输出 | 文本、图片输入；文本输出 |

公告列出的使用入口是 ChatGPT Work 和 Codex，适用于 Plus、Pro、Business、Enterprise、Edu。Free 和 Go 用户可在桌面应用中使用 Luna；公告发布时，普通 Chat 还未开放这些模型，且采用逐步推送。API 则使用表格中的模型 ID。这是产品公告当时说明的范围，实际账户仍应以界面和权限为准。[OpenAI 发布公告](https://openai.com/index/introducing-gpt-6-sol-and-luna/)

## API 价格：Sol 减半，Luna 输出价降幅更大

下表列出每 100 万 tokens 的标准 API 价格。OpenAI 以 GPT-5.6 先前的价格为基准，称两款新模型整体便宜约 50%。按单价计算，Sol 的输入和输出都减半；Luna 输入减半，输出则从 $1.20 降至 $0.50，降幅约为 58%。[官方价格表](https://developers.openai.com/api/docs/pricing)

| 模型 | 输入 | 缓存命中输入 | 输出 |
| --- | ---: | ---: | ---: |
| GPT-5.6 Sol | $4.00 | $0.40 | $20.00 |
| GPT-6 Sol | $2.00 | $0.20 | $10.00 |
| GPT-5.6 Luna | $0.20 | $0.02 | $1.20 |
| GPT-6 Luna | $0.10 | $0.01 | $0.50 |

对于需要长时间保留上下文的智能体，缓存命中输入是值得关注的成本项：GPT-6 的缓存命中价是普通输入价的 10%。不过，105 万 tokens 的上下文上限不等于整次请求都按短上下文费率计费。输入超过 27.2 万 tokens 时，该请求的输入与缓存费率翻倍，输出费率为 1.5 倍；Batch 和 Flex 是标准价格的一半，Fast mode 则按适用价格的两倍计费。大批量上线之前，应把这些条件一起纳入成本估算。

## Artificial Analysis 实时评分与单项任务成本

Artificial Analysis Intelligence Index v4.3.2 汇总 10 项评测，涉及智能体任务、编程与终端操作、科学推理、知识可靠性和长文理解。下表是 **2026 年 9 月 23 日查询时的实时榜单快照**，排名会变化。指数分数不是答题正确率；单项任务成本是根据该评测集实际 token 用量和价格计算的加权平均值，并非每位用户都会支付的固定费用。[Artificial Analysis 榜单](https://artificialanalysis.ai/leaderboards/models)、[评测方法](https://artificialanalysis.ai/methodology/intelligence-benchmarking)

| 推理档位 | Sol 指数分数 | Sol 单项任务成本 | Luna 指数分数 | Luna 单项任务成本 |
| --- | ---: | ---: | ---: | ---: |
| low | 34 | $0.13 | 21 | $0.0045 |
| medium | 40 | $0.25 | 29 | $0.02 |
| high | 43 | $0.37 | 32 | $0.03 |
| xhigh | 44 | $0.53 | 34 | $0.04 |
| max | 48 | $1.06 | 37 | $0.07 |

这些数字提供了一个实用的选择刻度：Sol 从 xhigh 升到 max，分数提高 4 分，AA 测得的平均任务成本翻倍；Luna 从 xhigh 升到 max，增加 3 分，成本从 4 美分升至 7 美分。若比较 max 档，Sol 分数更高，但 AA 的任务成本约为 Luna 的 15 倍。**更高推理档位买到的是特定评测里的额外能力，不是免费的默认升级。**

Sol 的最高分也不是当前榜单第一：同一榜单上的 GPT-6 Astra max 得 53 分，Claude Opus 5.5 max（含 fallback）得 58 分。比较这些模型时，要同时考虑推理档位、fallback、工具、单项任务成本和自己的工作类型，不能只看最高分。

还有一项规格差异需要说明：OpenAI API 文档为 Sol 和 Luna 都列出 105 万 tokens 上下文窗口；Artificial Analysis 当前模型资料显示 Sol 为 87.2 万、Luna 为 100 万。公开资料没有解释差异原因，因此本文分别引用提供商规格和 AA 数据，不把两种口径当作同一项保证。

## OpenAI 自行公布的测试能说明什么

OpenAI 公布的 DeepSWE v1.1 结果显示，Sol max 为 68.8%，Luna max 为 66.6%；公告也称 Luna 在高推理档位下优于 GPT-5.6 Luna。这些数字来自 OpenAI 的发布资料，并非本站重新运行测试。公告拿它们与 Claude Opus 5 和 Claude Fable 5 比较，而非同日发布的 Claude Opus 5.5，因此适合用来了解 OpenAI 的测试结果，不宜包装成与最新竞品的完整对决。[OpenAI 对编程能力的说明](https://openai.com/index/introducing-gpt-6-sol-and-luna/)

OpenAI 还表示，Sol 在一项根据用户曾标记为错误的对话建立的内部事实性评测中，错误数约减少一半；官方同时说明，这批刻意挑选的错误对话并不代表日常请求。这个结果值得关注，但应用正式上线前，仍要用自己的数据、工具链和评分标准做小规模验证。

## Sol 还是 Luna：根据出错成本选择

如果任务需要读取大型代码库、跨文件修改、反复调用工具，或在规格不完整时规划多步骤工作，我会先从 **GPT-6 Sol medium** 开始，再测试 high 或 xhigh 是否值得额外成本。官方把这类工作列为 Sol 的适用场景；AA 的数据也显示，调高推理档位会同时增加分数与任务成本。

如果工作边界清楚、单次输出不长，但每天要处理大量分类、信息抽取、客服草稿或固定流程，可以先试 **GPT-6 Luna medium**。在 AA 的这组综合评测中，Luna max 得 37 分，高于 Sol low 的 34 分，测得的任务成本还更低。这只是该评测集中的成本效益观察，并不表示 Luna 在所有真实工作中都会胜出。

GPT-6 Sol 和 Luna 的实用价值，是让团队能按任务难度调整模型与推理档位：简单任务使用低成本配置，需要多步推理时再提高档位。单价和综合排名适合缩小候选范围，最后仍应根据任务成功率、人工修正时间、错误风险和真实账单做决定。如果你还在比较另一款同期旗舰，可以继续看[Claude Opus 5.5 完整评测与价格分析](/zh-cn/2026/09/23/claude-opus-5-5-launch-benchmarks-pricing/)；如果计划用 GPT-6 编写游戏，则可参考[GPT-6 游戏开发工具选择指南](/zh-cn/2026/09/09/gpt-6-game-engines-guide/)。
