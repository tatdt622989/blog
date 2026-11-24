---
title: "Artificial Analysis 排行榜怎么看？2026 最新大模型排名、Intelligence Index 与成本指南"
description: "Artificial Analysis 是独立 AI 模型榜单，对比 LLM 智能、速度与 Cost per Task。更新 2026 年 11 月 v5.0.1 榜首（Fable 5.2、Gemini 4 Carbon），讲清指标口径与帕累托前沿选型法。"
permalink: 2026/08/17/artificial-analysis-definitive-guide-llm-selection/
translation_key: artificial-analysis-definitive-guide-llm-selection
translations:
  zh-TW: /2026/08/17/選模型別再憑感覺！Artificial-Analysis-完整指南：從品質、速度到成本，情境化挑出最適合你的-AI/
  en: /en/2026/08/17/artificial-analysis-definitive-guide-llm-selection/
categories:
  - AI 科技
tags:
  - AI
  - LLM
  - Artificial Analysis
  - 软件工程
date: 2026-08-17 14:13:06
updated: 2026-11-25 00:30:00
---

![Artificial Analysis 大模型选型指南封面](cover.jpg)

**[Artificial Analysis](https://artificialanalysis.ai/)（artificialanalysis.ai）是目前开发者参考最多的独立 AI 模型评测网站：它在统一测试环境与 API 测速条件下跑各家大模型，横向对比“有多聪明（Intelligence Index）、有多快（输出速度与延迟）、要花多少钱（Cost per Task）”。** 截至 **2026 年 11 月（Intelligence Index v5.0.1）**，榜首由 [Claude Fable 5.2](/zh-cn/2026/11/10/claude-fable-5-2-pricing-benchmarks-analysis/)（max，65 分）拿下，[Gemini 4 Carbon](/zh-cn/2026/11/11/gemini-4-carbon-launch-benchmarks-pricing/)（high，60 分）以不到三成的单任务成本位列第 4。想看实时排名可直接打开 [Leaderboards → Models](https://artificialanalysis.ai/leaderboards/models)；本文讲清核心指标口径以及不同场景该看哪张图。

<!--more-->

## Artificial Analysis 网站有哪些页面

公开页面可以免费查看（另有付费的 Premium）。做模型选型时最常用的是这几个页面：

| 页面 | 用途 |
|------|------|
| [Models](https://artificialanalysis.ai/models) | 全部图表：智能、Token 消耗、成本、速度、延迟、端到端耗时、上下文窗口 |
| [Leaderboards → Models](https://artificialanalysis.ai/leaderboards/models) | 一张表汇总 Intelligence Index、Cost per Task、输出速度和延迟 |
| [Coding Agents](https://artificialanalysis.ai/agents/coding-agents) | 编程智能体的 Coding Agent Index、单题耗时与费用 |
| [Model Recommender](https://artificialanalysis.ai/models/recommend) | 用滑块设置智能／速度／成本权重，生成推荐模型 |
| Leaderboards → Providers | 同一个开源模型在不同云厂商上的速度和价格 |
| Image、Video、Speech | 图像、视频、语音模型的盲测竞技场与榜单 |

如果还想了解它和 LMArena、SWE-bench 等榜单的区别，可以先看[AI 模型排行榜到底怎么看？LMArena、SWE-bench、LiveBench 与 12 个关键评测指标深度解析](/zh-cn/2026/08/31/ai-model-leaderboards-benchmark-metrics/)。

## Intelligence Index 是什么？v4.3.2 包含的 10 项评测

**Artificial Analysis Intelligence Index** 是多项评测加权后的综合得分，分数越高代表综合能力越强。根据官方 [Intelligence Benchmarking 方法论](https://artificialanalysis.ai/methodology/intelligence-benchmarking)，2026 年 9 月起启用的 **v4.3.2** 由 4 个大类、10 项评测构成：

| 类别（权重） | 评测及权重 |
|------|------|
| Agents（30%） | AA-Briefcase v1.1 15%、GDPval-AA v2.1 10%、AutomationBench-AA 5% |
| Coding（20%） | Terminal-Bench 4.0 10%、SciCode 10% |
| General（30%） | AA-Omniscience 15%、GDP.pdf 10%、AA-LCR v1.1 5% |
| Scientific Reasoning（20%） | Humanity's Last Exam 10%、CritPt 10% |

看分数时有三个坑要避开：

- **指数会改版，不同版本的分数没有可比性。** 仅 2026 年就从 v4.0 迭代到 v4.3.2，比如 v4.2 去掉了 GPQA Diamond，v4.3 把 Terminal-Bench 2.1 换成了 4.0。旧文章、旧截图里的分数（包括本文 8 月的截图）不能和现在直接对比。
- **同一个模型会按推理强度拆成多行。** **Claude Opus 5.5 (max)**、**(xhigh)**、**(high)** 是同一模型的不同档位，得分、成本、延迟差距很大，选型时要对准你线上实际使用的档位。
- **带小灯泡图标的是推理（Reasoning）模型**，回答前会先消耗思考 Token，成本和延迟都会受影响。

## 速度、延迟与成本怎么看

![Artificial Analysis 首页 Intelligence、Speed、Cost per Task 三张重点图（2026 年 8 月截图）](01_homepage_highlights.jpg)

首页和 Models 页的指标口径如下（来自官方 [Performance Benchmarking 方法论](https://artificialanalysis.ai/methodology/performance-benchmarking)及图表说明）：

| 指标 | 口径 | 适用场景 |
|------|------|------|
| **Output Speed**（tokens/s） | 收到第一个 chunk 之后，每秒收到的 Token 数 | 长文本生成、流式输出体验 |
| **Latency / Time to First Token** | 从发出请求到收到第一个 Token 的秒数 | 实时对话、代码补全 |
| **Time to First Answer Token** | 计入推理模型“思考时间”后，收到第一个答案 Token 的秒数 | 推理模型的真实等待时长 |
| **End-to-End Response Time** | 输出 500 个 Token 所需秒数，含首包延迟和思考时间 | 单次请求的总耗时 |
| **Cost per Task**（美元） | 跑一道 Intelligence Index 评测题的加权平均费用，含输入、缓存、推理和答案 Token | 衡量“把活干完”的真实成本 |
| **Price**（美元 / 百万 Token） | 缓存命中、输入、输出的官方单价，以及 Blended Price | 估算自己的 API 账单 |

速度数据取自模型厂商的官方 API，没有官方 API 时取多家服务商的中位数；每天测 8 次，页面展示**过去 72 小时的中位数（P50）**，因此会随高峰时段和服务商负载波动。

**Cost per Task 比官方单价更有参考意义**：推理模型单价看着便宜，但思考 Token 一多，单题成本可能反而超过单价更贵的模型。想看总账，可以用 Models 页的 **Cost to Run Artificial Analysis Intelligence Index**，它把跑完整套评测的费用拆成 Output、Reasoning、Cache 等部分。

![Cost to Run Artificial Analysis Intelligence Index 堆叠图，拆分输出、推理与缓存成本（2026 年 8 月截图）](02_pareto_quality_cost.jpg)

## 2026 年 11 月最新榜单亮点（Intelligence Index v5.0.1）

Artificial Analysis 已于 2026 年 11 月将综合指数更新至 **Intelligence Index v5.0.1**。根据 2026 年 11 月中旬核对 [Claude Fable 5.2](https://artificialanalysis.ai/models/claude-fable-5-2) 与 [Gemini 4 Carbon](https://artificialanalysis.ai/models/gemini-4-carbon) 官方 AA 模型页的实测数据，头部模型呈现出明显的“能力上限 vs 成本效率”分化：

| 模型（档位） | v5.0.1 排名与分数 | 单任务评测成本 | 输出速度（t/s） | 首个答案 Token 等待（秒） | 深度解读 |
|------|------|------|------|------|------|
| **Claude Fable 5.2 (max)** | **65 分（第 1）** | $26.54 | 103 | 231.55 | [Fable 5.2 价格与基准测试解读](/zh-cn/2026/11/10/claude-fable-5-2-pricing-benchmarks-analysis/) |
| **Gemini 4 Carbon (high)** | **60 分（第 4）** | $7.76（优惠期约半价） | 80 | 66.85 | [Gemini 4 Carbon 评测与迁移指南](/zh-cn/2026/11/11/gemini-4-carbon-launch-benchmarks-pricing/) |

- 前 3 名全部由不同 effort 档位的 **Claude Fable 5.2** 占据，**Claude Opus 5.5 (max)** 排在第 5（v5.0 为 58 分）。
- Fable 5.2 (max) 综合上限最高，但单任务耗时 44.1 分钟、成本 $26.54 位居榜内最高；**Gemini 4 Carbon (high)** 成本不到三成且等待时长缩短约七成，更适合预算敏感的长时智能体任务。

### 前版 v4.3.2 多模型成本与速度对照参考（2026 年 10 月）

以下保留 2026 年 10 月 19 日 [Leaderboards → Models](https://artificialanalysis.ai/leaderboards/models) 的 **Intelligence Index v4.3.2** 快照，便于观察同一模型在不同档位（max / xhigh / high）下的延迟和单任务费用差距（不同版本分数不可直接相减）：

| 模型（档位） | Intelligence Index (v4.3.2) | Cost per Task | 输出速度（t/s） | 首个 chunk 延迟（秒） |
|------|------|------|------|------|
| Claude Opus 5.5 (max) | 58 | $5.98 | 98 | 562.75 |
| Claude Sonnet 5.5 (max) | 56 | $5.46 | 136 | 391.60 |
| Claude Opus 5.5 (xhigh) | 56 | $3.46 | 85 | 115.10 |
| Claude Opus 5.5 (high) | 54 | $1.82 | 82 | 40.49 |
| GPT-6 Astra (max) | 53 | $3.26 | 69 | 292.33 |
| Gemini 4 Argon (high) | 53 | $1.99 | 暂无数据 | 暂无数据 |
| GPT-6.1 Sol (max) | 52 | $0.72 | 60 | 239.97 |
| Claude Sonnet 5.5 (xhigh) | 52 | $2.01 | 112 | 36.17 |

这张表能直接得出两个选型结论：

- **最高分不等于性价比最高。** GPT-6.1 Sol (max) 只比同版榜首低 6 分，Cost per Task 却不到其八分之一。
- **max 档位的首个 chunk 延迟往往以分钟计**，更适合后台批处理和智能体任务，不适合要求秒级响应的交互界面。

其他模型发布时的详细评测也可参考 [Claude Opus 5.5 发布解读](/zh-cn/2026/09/23/claude-opus-5-5-launch-benchmarks-pricing/) 和 [GPT-6 Sol 与 Luna 评分与选型](/zh-cn/2026/09/23/gpt-6-sol-luna-pricing-aa-review/)。

## 用帕累托前沿找高性价比模型

Models 页的 **Intelligence Index vs. Cost per Task** 散点图是选型最实用的一张图：

- **纵轴**是智能得分（越高越强），**横轴**是 Cost per Task（越靠左越便宜）。
- **左上角的 Most attractive quadrant** 就是又强又便宜的区域。
- **Pareto line（帕累托前沿线）** 把“同价位最强、同分数最便宜”的模型连成一条边界。线上的模型是各自价位的最优解；离线越远，说明已经有模型比它更强也更便宜，可以直接排除。

同一区域还有 **Intelligence Index vs. Time per Task**、**vs. Output Speed**、**vs. End-to-End Response Time**，读法一样，只是把成本换成了耗时。

## 不同场景该看哪张图

| 场景 | 优先看 | 判断方法 |
|------|------|------|
| 实时对话、语音助手、IDE 补全 | **Latency**、**Output Speed** | 选首 Token 延迟低、吞吐高的模型或低推理档位 |
| 高并发 API 调用、批量文档处理 | **Intelligence Index vs. Cost per Task** | 在帕累托前沿上找分数够用的最便宜模型 |
| 编程智能体（Claude Code、Codex 这类工具） | **Coding Agents** 页 | 得分、单题耗时、单题费用一起看 |
| 金融、法律、医疗等垂直行业 | **Capability Indexes** | 看对应行业的子指数，而不是总分 |
| 私有化部署开源模型或挑选云厂商 | **Leaderboards → Providers** | 同一模型在不同服务商上的速度与价格 |
| 仍然拿不定主意 | **Model Recommender** | 按权重生成推荐列表 |

![Artificial Analysis 输出速度柱状图与 Time per Task 图表（2026 年 8 月截图）](03_speed_latency.jpg)

**Coding Agents 页**的 **Coding Agent Index v1.5** 由三项评测等权重构成，每题跑 3 次，取 pass@1 平均值：

- **DeepSWE v1.1**（Datacurve）：113 道真实软件工程任务
- **Terminal-Bench 4.0**（Laude Institute）：66 道终端智能体任务
- **SWE-Atlas-QnA**（Scale AI）：124 道代码库技术问答

页面还提供单题耗时、费用、Token 消耗，以及新增的安全拒答率和 Reward Hacking 比例。几个模型分数只差几分时，耗时和费用往往才决定日常开发是否顺手。工具层面的差异可以看[AI 编程工具对比：Claude Code、Codex、Cursor 怎么选？](/zh-cn/2026/05/06/claude-code-vs-codex-vs-cursor/)。

![Artificial Analysis Coding Agent Benchmarks 页面（2026 年 8 月截图，当时为 v1.3）](04_coding_agents.jpg)

**Model Recommender** 一共 5 步：第一步用滑块设定 Intelligence、Speed、Cost 的重要程度，最后按权重输出推荐模型。

![Artificial Analysis Model Recommender 优先级滑块（2026 年 8 月截图）](05_model_recommender.jpg)

## Artificial Analysis 的局限

- **总分是平均值**：Intelligence Index 偏重智能体任务（Agents 占 30%），如果你的业务是翻译、客服或简单分类，总分排名不一定反映真实效果。
- **速度随服务商和时段波动**：72 小时中位数适合横向对比，不代表上线后的 P95 延迟。
- **价格以官方定价为准**：上线前去各家官方定价页核实，并把缓存、批处理折扣算进去。
- **最终还是要用自己的数据测**：官方提供 **Optima**，可以用自己的任务构建自定义评测；也可以挑出前 2–3 名候选模型，拿 20–50 条真实业务样本实测。
