---
title: Claude 新产品介绍：新版 Projects、Dashboards 和 Motion 怎么用
date: 2026-10-10 20:24:21
updated: 2026-10-10 23:21:28
description: Claude 最近推出了哪些新产品？本文介绍新版 Projects 的云端任务协调、Dashboards 数据看板与 Motion 动画讲解，梳理支持的订阅方案、入门提示词和使用限制，并说明 Docs、Slides、Design 正式开放及独立 Design 站的迁移安排。
permalink: 2026/10/10/claude-projects-dashboards-motion-guide/
translation_key: claude-projects-dashboards-motion-guide
translations:
  zh-TW: /2026/10/10/Claude-新產品介紹：新版-Projects、Dashboards-與-Motion-怎麼用/
  en: /en/2026/10/10/claude-projects-dashboards-motion-guide/
categories:
  - AI 科技
tags:
  - AI
  - Claude
  - Claude Code
  - Anthropic
---

![Claude 新版 Projects 协调任务、Dashboards 数据图表与 Motion 动画的概念插画](cover.jpg)

**Claude 最近值得关注的新产品，包括新版 Projects、Dashboards 和 Motion。** Projects 于 9 月 17 日推出新版 Beta；Dashboards 和 Motion 则在 10 月 8 日发布。这些更新把任务推进、数据分析和可视化讲解带进了 Claude 的产品界面。[Projects 公告](https://claude.com/resources/articles/projects-redesigned) · [Dashboards 与 Motion 公告](https://claude.com/resources/articles/dashboards-and-motion)

<!--more-->

## 先看用途和订阅要求

| 产品 | 主要用途 | 当前开放范围 |
| --- | --- | --- |
| 新版 Projects | 协调多项任务和工作线程，持续推进项目 | 部分 Claude Code Pro、Max 用户，分批开放 Beta |
| Dashboards | 基于已连接的数据源创建看板 | Pro、Max、Team、Enterprise，Beta |
| Motion | 把文字、图表和图片做成动画讲解 | Team、Enterprise，Beta |
| Docs、Slides、Design | 文档、演示文稿和设计作品 | 已结束 Beta，支持所有方案，包括 Free |

新版 Projects 的资格以 [Projects 帮助文档](https://support.claude.com/en/articles/9517075-what-are-projects) 为准；其他作品模板参见 [Artifacts 方案表](https://support.claude.com/en/articles/17153992-what-are-artifacts-and-how-do-i-use-them)。Enterprise 用户还需要确认管理员是否启用了相关功能。

![Claude 三项新产品用途图解：Projects 推进任务、Dashboards 分析数据、Motion 制作动画](products-overview.jpg)

*图解 1：先按任务选择入口。Projects 对应“目标 → 并行任务 → 审查”；Dashboards 对应“数据 → 图表 → 核对”；Motion 对应“素材 → 动画 → MP4”。*

## Projects：在一个项目里持续分配和推进任务

原有 Projects 可以集中聊天记录、知识文件和项目指令；**新版进一步加入了任务协调能力**。你在主对话中描述目标，Claude 分配任务、协调并行工作，再汇总结果。云端工作线程会读取项目资料、指令与记忆，生成的文件集中保存在 **Library** 中。[原版与新版说明](https://support.claude.com/en/articles/9517075-what-are-projects)

![Claude Projects 任务协调图：目标交给协调者，修复、测试和文档线程共享背景信息，最后汇总结果供审查](projects-workflow.jpg)

*图解 2：以一次游戏版本更新为例，主对话统筹修复、测试和文档三项任务。云端线程使用共享背景信息，结果汇总到审查与 Library；实际任务拆分取决于需求。*

对 App 或游戏开发者来说，我认为最适合先试的场景，是一次更新带来多件关联任务：修复登录问题、补充测试、编写发布说明。能否减少重复交代背景的时间，以及能否清楚看到等待审查的结果，比同时开多少线程更值得关注。

可以先用一个边界清楚的任务验证：

> 这个项目的目标是改善新玩家首次进入游戏的体验。先找出新手引导界面最容易误解的两个步骤，提出修改建议，再补充测试。先说明你的任务拆分；代码修改整理为可审查的 PR，合并前由我确认。

获得新版入口后，可以从 **claude.ai/code → Projects** 或桌面应用的 **Code** 标签页创建项目，添加需要的代码仓库和文件。云端代码任务需要相应的 GitHub 访问权限，也不会自动继承你本机的所有工具和配置。[创建与配置指南](https://code.claude.com/docs/en/claude-projects)

**云端线程在合上笔记本后仍可继续运行；在本机执行的线程，则要求电脑保持唤醒和连接。** 并行任务修改同一段代码时，仍可能产生合并冲突；同时运行多个线程也会更快消耗订阅额度。我会先从一两件小任务开始，检查交付质量和用量，再扩大范围。[云端与本机运行](https://code.claude.com/docs/en/remote-control) · [并行任务与用量](https://claude.com/resources/articles/projects-redesigned)

只看到原有聊天 Projects，并不代表已经获得新版。官方仍在分批开放，Team 和 Enterprise 目前尚不支持新版，现有 Projects 继续正常使用。[当前可用性](https://code.claude.com/docs/en/claude-projects)

## Dashboards：从一个数据问题开始创建看板

Claude Dashboards 可以连接 BigQuery、Snowflake 等数据平台，以及 Salesforce 等应用。用自然语言提出问题后，Claude 创建图表；每张图表都能查看查询语句和最后刷新时间。[Dashboards 入门](https://support.claude.com/en/articles/17454700-get-started-with-claude-dashboards)

![Claude Dashboards 使用流程图：连接数据并提出问题，生成图表后检查查询与最后刷新时间，再核对和分享](dashboards-workflow.jpg)

*图解 3：结合数据与问题生成看板，再检查查询语句和最后刷新时间。确认统计口径后再分享。图中图表仅用于说明流程。*

对负责产品运营的人来说，一个明确的小问题通常更容易验证。例如“上个月付费用户增加，主要来自哪个套餐？”就比“做个好看的数据看板”更有帮助。

> 使用已连接的订阅数据，对比最近八周各套餐新增付费用户和取消订阅的人数。先列出采用的日期字段、时区和统计定义，再创建每周趋势图。

**看板做得漂亮，仍要核对统计口径。** 新增订阅是否扣除了退款、取消订阅按申请日期还是到期日期计算，都会改变结论。我的建议是先用一周已知数据对账，再把它纳入日常分析。

官方将 Dashboards 定位为快速探索问题的工具，深入分析可以转到其他分析平台继续。连接器会继承源服务的访问权限，数据是否可读仍取决于授权。[产品定位](https://support.claude.com/en/articles/17454700-get-started-with-claude-dashboards) · [连接器权限](https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities)

## Motion：把产品讲解做成便于修改的短动画

Claude Motion 适合制作功能更新介绍、操作演示或动态图表。它通过代码安排文字、图形和图片的动画，方便修改内容和节奏；当前没有生成写实视频或人物的功能。[Motion 入门](https://support.claude.com/en/articles/17454997-get-started-with-claude-motion)

![Claude Motion 四步图解：准备素材、描述故事、编辑动画、导出 MP4](motion-workflow.jpg)

*图解 4：按顺序准备素材、描述故事、编辑动画，再导出 MP4。提前交代目标观众和预计时长，后续调整内容与节奏会更容易。*

介绍游戏新功能时，我会先交代观众和素材，再提出制作要求：

> 使用我附上的游戏截图，制作一段面向新玩家的 20 秒教学动画。依次说明选择关卡、开始挑战、领取奖励，每个画面只呈现一个重点。保留素材里的按钮名称，让玩家能对照游戏界面操作。

可以从聊天输入框的 **Output → Motion**，或 **Artifacts** 中的 Motion 模板开始。完成后可下载 **MP4**，也可以通过对话或编辑器调整动画。[创建与导出步骤](https://support.claude.com/en/articles/17454997-get-started-with-claude-motion) · [作品编辑方式](https://support.claude.com/en/articles/17153992-what-are-artifacts-and-how-do-i-use-them)

Motion 计入原有方案的使用额度，较长或较复杂的动画消耗更多。先制作一个短片段，确认信息准确、节奏清楚，再扩展成完整介绍，更容易控制修改成本。[Motion 用量说明](https://support.claude.com/en/articles/17454997-get-started-with-claude-motion)

## Docs、Slides 和 Design 的同步变化

10 月 8 日的公告还宣布 **Docs、Slides、Design 结束 Beta，向所有方案开放**。Enterprise 的这三种模板预计于 **10 月 15 日** 默认启用；Dashboards 和 Motion 在 Enterprise 中仍默认关闭，需要管理员在 **Organization settings → Artifacts** 中启用。[官方公告](https://claude.com/resources/articles/dashboards-and-motion) · [管理员配置](https://support.claude.com/en/articles/16994751-artifacts-admin-guide-for-team-and-enterprise-plans)

已有 Claude Design 项目的用户还要留意：**独立站 claude.ai/design 将于 2026 年 12 月 14 日关闭**。官方已提供设计系统迁移入口，项目暂时留在独立站，后续迁移方式有待公布。聊天记录和评论不会一并转移，独立站项目的公开链接也将失效，需要的内容应提前保存。[Design 迁移指南](https://support.claude.com/en/articles/17440474-migrate-from-standalone-claude-design-to-claude)

## 按手头的任务选择试用入口

- **一个开发目标持续产生多项任务**：先试新版 Projects，观察任务拆分、结果审查和额度消耗。
- **需要解释产品数据的变化**：先试 Dashboards，从定义清楚的单个指标开始。
- **需要让玩家或同事快速理解功能**：使用 Team、Enterprise 方案的人可以先试 Motion。

作为独立开发者，我最想先验证的是 Projects 的协调效果：需求变化时，任务是否仍朝同一个方向推进，结果是否方便审查。Dashboards 和 Motion 则可以先用在已有周报和产品介绍中，用熟悉的工作判断它们能节省多少整理时间。

如果还想比较开发工具，可以接着看本站的 [Claude Code、Codex、Cursor 使用场景比较](/zh-cn/2026/05/06/claude-code-vs-codex-vs-cursor/)。
