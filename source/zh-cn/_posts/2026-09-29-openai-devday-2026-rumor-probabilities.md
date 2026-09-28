---
title: "OpenAI DevDay 2026 前瞻：十大传闻概率排名与证据核查"
date: 2026-09-29 00:18:36
updated: 2026-09-29 00:46:12
description: "OpenAI DevDay 2026 会发布什么？本文交叉核查官方公告、Codex 公开代码、媒体爆料和社区讨论，按发布可能性梳理常驻智能体 o、Pro Max、Ultrafast、新模型及硬件传闻，说明反证、北京时间与可能影响。"
permalink: 2026/09/29/openai-devday-2026-rumor-probabilities/
translation_key: openai-devday-2026-rumor-probabilities
translations:
  zh-TW: "/2026/09/29/OpenAI-DevDay-2026-前瞻：十大傳聞機率排序與證據查核/"
  en: "/en/2026/09/29/openai-devday-2026-rumor-probabilities/"
categories:
- AI 工具
tags:
- OpenAI
- DevDay
- ChatGPT
- Codex
---

![OpenAI DevDay 2026 爆料核查与 AI 智能体开发者大会概念插图](cover.jpg)

OpenAI DevDay 2026 即将开幕。常驻智能体 o、Pro Max 订阅、Ultrafast 和下一代模型，出现在会前报道与社区讨论中。部分消息已有公开代码或界面线索，其他说法仍以社区猜测为主。

本文整理十项传闻，对照官方公告、原始报道和 GitHub 记录，按现有证据支持的发布可能性排序，说明各自来源、未确认细节、可能影响和会后可核对的发布内容。

<!--more-->

## 直播时间与信息截止日期

**信息截止：北京时间 2026 年 9 月 29 日 00:25（UTC+8）。这是会前预测。** 主旨演讲将于**北京时间 9 月 30 日凌晨 1:00** 开始，对应旧金山当地时间 **9 月 29 日 10:00 PDT（UTC−7）**。活动地点是 Fort Mason，Sam Altman 将参加开场。[官方日程](https://devday.openai.com/)与[直播入口](https://openai.com/live/)可直接查询。

本次检索覆盖 OpenAI 公告、API 更新日志、官方 GitHub、TestingCatalog、新闻报道，以及 Reddit 的 OpenAI、Codex、singularity 和 accelerate 社区。部分 X 原帖返回 403，这部分参考的是爆料网站的内嵌内容，原始配置未能独立确认。

## 十大传闻概率排名

排序针对 **DevDay 当天是否发布、演示或预览相关产品**；正式开放、全面供应和发货时间另行判断。现有资料不足以计算经过统计校准的百分比，因此采用“高、较高、中等、较低、低”描述相对可能性。

判断依据包括可查阅的官方记录、原始爆料、信息时效，以及延期或相反证据。公开 PR 说明开发准备，界面线索说明测试中的功能；发布日期需要另外核实。同一档位的先后顺序只反映证据差异，没有可量化的概率差距。

| 排名 | 待核实事件 | 发布可能性 | 证据与边界 |
|---|---|---:|---|
| 1 | Pro Max 或新的 Pro 档位公布 | 高 | 官方代码已支持；价格未获官宣 |
| 2 | 常驻智能体 o 或同类产品亮相 | 高 | 配置与升级页线索；具体能力未定 |
| 3 | Ultrafast 扩大开放或增加入口 | 较高 | 已有预览，出现新的 Playground 线索 |
| 4 | Platform 新套餐或开发入口 | 较高 | Free／Prototype／Accelerate 界面爆料 |
| 5 | ChatGPT 的 Chat／Work 体验整合 | 中等 | 社区猜测较多，缺少正式承诺 |
| 6 | GPT-6 Cyber 或相关安全产品预览 | 较低 | 媒体有报道，但时间表已修正 |
| 7 | Astra Minor、GPT-6.1 或 Bel 预览 | 低 | 内部代号与产品名称混在一起 |
| 8 | 新一代开放权重模型 | 低 | 有期待，缺少本次发布的直接线索 |
| 9 | Sora 3 或新一代视频模型 | 低 | 主要是愿望型讨论 |
| 10 | Jony Ive 合作的消费硬件具体亮相 | 低 | 与本届大会缺少直接关联 |

前四项的线索比较具体，后半段则大多还停留在社区讨论。

## 1. Pro Max：套餐名称已进入代码，价格仍待确认

[Codex PR #47971](https://github.com/openai/codex/pull/47971)已于 9 月 25 日合并，加入 **promax** 支持及 **Pro (Max)** 显示名称。这份记录可直接确认新套餐类型已纳入程序。

[TestingCatalog 9 月 24 日](https://www.testingcatalog.com/openai-prepares-new-500-month-pro-max-plan-for-chatgpt/)则报告了每月 **500 美元**及更快 Work／Codex 的套餐描述，并解释视频中的 600 美元包含 VAT。两个价格可能只是税额差异，各地区的最终定价仍待公布。

公开代码已经加入新套餐名称，是这一项排名靠前的主要依据。正式名称、价格、额度和开售日期仍待确认，目前[官方价格页](https://chatgpt.com/pricing/)也尚未列出 Pro Max。代码可以提前部署，实际开放仍可能分批进行。

对于长任务用户，订阅成本需要连同额度、支持模型和任务完成时间一起比较。响应加快后，外部工具等待和反复修正仍可能占用大量时间。新套餐是否影响老订阅，目前也没有足够资料，需要比对正式规则和账户记录。

正式公布后，需要核对名称、税前月费、地区、可用模型、速率限制、额度和老订阅迁移规则。代码里的套餐类型只能确认工程准备，正式公告或价格页才能确认销售内容。即使最终名称调整，只要官方清楚公布新的 Pro 分级，仍属于本项范围。

## 2. 常驻智能体 o：配置和升级页出现线索

[TestingCatalog 9 月 26 日](https://www.testingcatalog.com/openai-to-announce-o-always-on-agent-during-devday/)发现 **o**、**-o** 邮件后缀及升级页的常驻助手线索。不过，**o 与 Aeon 是否为同一个产品仍未确定**，Plus 能否使用也尚未公布。

官方 [Agents API](https://openai.com/index/introducing-the-agents-api/)已在 9 月 10 日进入公测，提供 Codex 的智能体运行框架和长任务基础设施。这些基础设施让常驻助手的设想更可行，o 会如何使用它们还有待发布。

按长任务产品的用途推演，常驻智能体可能承担进度跟踪、等待外部回复、恢复任务和发送通知。这些场景尚未成为 o 的已确认功能。邮件后缀只支持邮件身份相关的推测，无法据此确定收发邮件权限。

实际使用方式仍有关键空白：电脑关机后是否继续运行、失败后如何恢复、发送邮件或修改外部数据前如何授权，以及费用如何累计。这些细节会影响可以交办的任务范围。目前也没有资料表明它能够不限量持续运行。

正式产品名称、委派入口、任务生命周期、通知、权限和开放名单，可用于确认这项传闻。如果仅介绍愿景，没有可识别产品或操作演示，仍无法确认落地。o 与 Aeon 的关系，以及邮件身份、记忆和调度能力，也需要分别核对。

## 3. Ultrafast：高速推理有望扩大开放

[OpenAI 8 月 13 日](https://openai.com/index/previewing-ultrafast/)已经预览由 Cerebras 支持的 GPT-5.6 Sol Ultrafast。[TestingCatalog 的新线索](https://www.testingcatalog.com/openai-prepares-to-expand-ultrafast-api-to-more-users/)是 Playground 的速度选择器。本次传闻涉及扩大使用范围。

现有预览和新界面线索共同支持扩大开放的可能性。更新可能体现为新增 Playground 入口或逐步增加使用资格，但尚无资料确认所有 GPT-6 模型都支持同一速度档位。

多轮推理的工作可能受益于等待缩短，但浏览器加载、外部 API、测试和人工审批仍然耗时。输出 token 速度只反映部分过程，不能直接换算成整项任务的加速倍数。实际评估需要在相同任务和质量要求下比较耗时与总费用。

发布内容需要包含新增资格、操作入口或其他实际使用范围变化。模型、账户、地区、价格和速率限制都需明确；如果只是重播已有预览，不能据此认定扩大开放。界面出现选项时，后台资格仍可能受限。

## 4. Platform：传出三种新套餐

[TestingCatalog 9 月 23 日](https://www.testingcatalog.com/devday-new-plans-and-new-platform-for-building-ai-apps/)报告新流程中的 **Free、Prototype、Accelerate**。报道本身也指出，界面线索不能证明完整应用托管会同步推出。

三种套餐名称对应试用、原型和正式服务阶段。如果平台继续整合执行环境、预算和监控，可能减少开发者在不同设置之间切换的工作；这些属于产品方向分析，尚未构成已公布的功能清单。

完整应用托管仍未确认。正式服务需要域名、数据库、密钥管理和持久存储，目前的界面线索还看不出这些部分会做到什么程度。

确认本项需要正式套餐页、计费规则或可操作的新开发流程。应用托管还需单独确认域名、存储、部署和对外连接能力。仅有智能体沙箱，不足以确定完整托管服务；技术课程和旧平台演示也不属于新套餐发布。

## 5. Chat 与 Work：聊天和工作模式可能整合

[9 月 26 日的 Reddit 讨论](https://www.reddit.com/r/singularity/comments/1wr52pw/openai_devday_leaks_ultrafast_around_750_tokenss/)提到 Sol 进入 Chat、聊天与工作模式整合，也有用户质疑这些说法只是许愿。目前还没有足够资料确认改版内容。

[官方 Sol、Luna 发布文](https://openai.com/index/introducing-gpt-6-sol-and-luna/)明确最初在 Work 和 Codex 提供，尚未进入 Chat。后续扩展使用场景是合理推测，发布日期则没有承诺。

界面整合可能减少聊天与长任务之间的切换，让需求提交、进度查看和结果接收集中在同一处。目前尚未说明模式是否自动选择、能否手动切换，以及 Codex 独立工具如何安排。

会后可比较模型菜单、聊天与工作入口，以及创建任务的步骤。Sol 进入 Chat 属于使用范围变化；单纯更名还需检查工作流是否改变。Codex 独立工具停用、账户合并或数据迁移，都需要单独的官方依据。

## 6. GPT-6 Cyber：可能还要等上几周

[Reuters 转述](https://finance.yahoo.com/news/openai-preview-gpt-6-cyber-225804238.html)提及 GPT-6 Cyber 与安全产品，消息同样来自 Fortune。原文改为数周。[Fortune 更新](https://fortune.com/2026/09/24/openai-launching-gpt-6-cyber-model-and-security-product-devday/)

时间表的修正降低了大会当天亮相的确定性。现有报道支持继续跟踪这条产品线，但尚不足以确认指定发布日期，因此列为较低可能性。

如果产品包含安全工作流，实际价值取决于能否从漏洞发现、验证推进到修复完成，以及授权范围、审计记录和人工介入要求。企业采用还需要可复现的修复结果与明确的责任分工。

确认条件是官方明确介绍新的安全模型或相关产品。试用申请、适用客户和访问方式有助于区分演示、有限预览与正式供应。仅重申安全投入尚不能确认发布，企业实际采用仍取决于授权条件和支持范围。

## 7. Astra Minor、GPT-6.1、Bel：新模型传闻有哪些线索？

[8 月的 Bel 帖子](https://www.reddit.com/r/ChatGPT/comments/1vztv6r/openais_next_pretrain_codename_bel_devday/)讨论传闻中的预训练代号；[后来的预测串](https://www.reddit.com/r/singularity/comments/1wnkzxy/what_are_your_predictions_for_openai_devday/)将它与 Astra Minor、GPT-6.1 并列。这些名称未必对应同一产品或同一研发阶段。

新模型预览列为低可能性，原因是缺少对应本届活动的官方模型页和明确日期。即使预训练已完成，后训练、评估、算力供应和产品集成也可能继续推进，研究进度与可用产品之间仍有时间差。

Astra Minor 和 6.1 的具体定位尚不清楚，Bel 则更接近研发进度的传闻。现有资料不足以分别确认三者的产品身份、价格、能力和发布时间，因此作为一组证据较少的模型传闻讨论。

本项涵盖上述名称中至少一个新通用模型正式预览，需能识别正式名称与新增能力。重新演示 Sol、Luna 不属于新模型。只有研发进展、尚无产品身份的内容，应记为研究消息；价格与评测成绩也需要各自的来源。

## 8. 开放权重模型：社区期待 gpt-oss 后续更新

[社区](https://www.reddit.com/r/singularity/comments/1wnkzxy/what_are_your_predictions_for_openai_devday/)有人期待开放权重更新，OpenAI 也在 [2025 年发布过 gpt-oss](https://openai.com/index/introducing-gpt-oss/)，但历史产品不能确定今年大会的安排。

新开放权重模型列为低可能性，主要缺少与本届大会直接相关的发布线索。若有更新，影响可能集中在本地部署、定制和自行管理推理成本；许可证、硬件要求和获取渠道将决定实际使用范围。

新模型介绍、权重获取方式或明确的模型预览可用于确认。商用许可、硬件要求和量化版本将影响部署选择。SDK、工具和教程开源属于其他更新，应与模型权重开放分别记录。

## 9. Sora 3：目前消息仍少

Sora 3 出现在[社区预测串](https://www.reddit.com/r/singularity/comments/1wnkzxy/what_are_your_predictions_for_openai_devday/)，本次未找到版本与大会时间的直接证据。

Sora 3 列为低可能性。目前可追溯的资料主要是社区期待，缺少版本、测试资格或明确发布时间的直接线索。视频适合现场展示，但展示形式本身无法说明产品是否准备就绪。

官方明确介绍新一代视频模型及其新增能力，才足以确认本项。旧模型的新案例、额度调整和合作演示另行记录。开放对象、生成限制、输出规格和 API 供应时间都尚待公布，目前没有依据给出具体数值。

## 10. 消费硬件：会展示原型吗？

[WIRED 2 月报道](https://www.wired.com/story/openai-drops-io-branding-hardware-devices/)引述文件称，首款设备不会早于 2027 年 2 月底交付。提前展示原型仍有可能，距离买得到则还有一段时间。

具体设备亮相列为低可能性，当天发货的依据更少。提前展示原型可以与较晚交付并存，软件智能体和硬件也可能采用不同发布节奏。用途、与现有设备的配合方式和销售地区仍待说明。

具体原型、用途或操作演示可确认设备亮相，愿景视频和合作重申仍缺少产品细节。发布、预购与交付应分别记录，再核对销售地区、价格和时间。字母或圆形宣传图本身无法确认设备外形与功能。

## 其他讨论：已发布功能与零星猜测

- **Sol、Luna 首次发布：已完成。** [官方日志](https://developers.openai.com/api/docs/changelog)记录日期为 9 月 22 日。
- **自动化研究实习生首次得到官方确认：已有说法。** OpenAI 的 [9 月 6 日文章](https://openai.com/index/research-acceleration-view-inside-openai/)宣称达到内部目标，是否会做成公开销售的产品，尚未公布。
- **OpenAI Linux 发行版：证据不够。** [讨论串](https://www.reddit.com/r/accelerate/comments/1wo0p7v/whats_next_for_openai_dev_day/)从模糊暗示展开猜测。目前看不出指的是 Linux 支持、云端环境，还是其他更新。
- **AGI／ASI：** 有人这样期待，但没有给出具体产品或评估标准，因此未列入排名。

## 发布后的三个观察重点

**长任务能否交付可检查的成果。** 常驻智能体的评估需要覆盖来源、文件、操作记录和失败恢复。完整演示能够说明任务如何从交办走到完成；只展示最后的回答，仍难以判断过程是否可靠。电脑关机后能否继续运行、执行中能否补充指令，也会影响适用场景。

**速度、额度和费用如何组合。** Pro Max、Ultrafast、API 和沙箱可能分别计费，同台演示并不意味着都包含在同一订阅中。需要核对月费、额度、额外用量和计算资源费用。已有用户还需确认模型资格、功能开放和迁移规则是否变化。

**开发者能否控制成本和操作权限。** 重试、暂停、取消、恢复以及外部工具范围，都影响长任务的维护成本。持续执行还涉及费用上限、日志和人工介入步骤，这些细节决定产品能否融入已有业务。

现有线索主要集中在套餐、推理速度、智能体产品和开发流程。新模型与硬件缺少直接绑定本届大会的证据，仍待正式资料。会后应分别记录已发布、有限预览、已经开放和未出现的项目，并保留会前核查时间，便于对照传闻准确程度。

## 资料来源与阅读限制

来源放在相关段落旁。不少报道最后追溯到 TestingCatalog 或 Tibor Blaho 的同一组帖子，本文按同一条消息来源处理，没有把转载数量当作独立证实。部分 X 原帖不可读；Reuters 全文打开失败，本文仅使用可读的搜索转述，再核对 Fortune 更新。以上判断以文首的信息截止时间为准。

延伸阅读：[GPT-6 Sol、Luna：价格、评测与选型](/zh-cn/2026/09/23/gpt-6-sol-luna-pricing-aa-review/)。
