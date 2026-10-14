---
title: "Claude Code 趣味命令指南：临时提问、回滚、定时检查与终端彩蛋"
description: "Claude Code 有哪些好玩又实用的命令？本文通过可复制示例介绍临时提问、回滚、会话分支、使用报告、定时检查、语音输入和电台彩蛋，并梳理远程控制的使用条件、命令别名与旧版教程差异，帮助你把终端里的 AI 编程助手用得更顺手。"
date: 2026-10-14 11:38:45
updated: 2026-10-14 15:48:20
permalink: 2026/10/14/claude-code-fun-commands/
translation_key: claude-code-fun-commands
translations:
  zh-TW: /2026/10/14/Claude-Code-有趣指令指南：插話、回溯、定時巡查與終端機彩蛋/
  en: /en/2026/10/14/claude-code-fun-commands/
categories:
  - AI 科技
tags:
  - Claude
  - Claude Code
  - AI 开发工具
---

![Claude Code 终端命令与会话分支、回滚、定时检查和电台的插图](cover.jpg)

Claude Code 有哪些好玩又实用的命令？除了修复 Bug、生成代码，它还能让你临时插一句话、为会话开一条新路线、回到之前的检查点，甚至打开编程时听的电台。

这篇按使用场景整理斜杠命令，并提供可以复制的示例。第一次尝试，推荐从 **/btw、/rewind、/radio** 开始：一个用来问临时问题，一个方便撤回尝试，一个负责换换工作氛围。

<!--more-->

## 这些命令应该输入在哪里？

先在项目目录的终端中启动 Claude Code：

```bash
claude
```

进入会话后，再输入本文中的 **/btw**、**/loop** 等命令。它们不应直接贴到普通 Shell 中。输入 **/** 可以浏览可用项目，**/help** 用于查看帮助。

菜单会同时列出内置命令、官方随附的 Skills，以及你安装的插件。具体功能取决于版本、平台、登录方式和套餐。本文依据 **2026 年 10 月 14 日核对的官方文档**编写，示例用于演示用法，没有逐项实机测试。请以自己的界面为准。[官方命令参考](https://code.claude.com/docs/en/commands)

## /btw：主任务继续跑，临时问题单独问

Claude 正在修改登录模块，你突然想确认之前为什么选了某个认证方案，可以输入：

```text
/btw 刚才为什么选用 Cookie，而没有把登录状态放进 localStorage？
```

**/btw** 会在单独的小窗口中回答，不打断主任务，也不会把这段问答加入主会话历史。它适合回顾已经讨论过的决策，或确认 Claude 已经读过的信息。

临时提问**没有工具权限**，只能利用现有上下文。需要读取新文件、联网搜索或修改代码时，应在正常会话中提出要求。[官方临时提问说明](https://code.claude.com/docs/en/interactive-mode#side-questions-with-btw)

## /rewind：把一次失败尝试退回检查点

重构越改越复杂，想回到开始拆分组件前的状态，可以输入：

```text
/rewind
```

选择之前的消息，再决定恢复会话、恢复代码，或一起恢复。菜单也提供摘要操作，方便保留当前文件、只压缩会话上下文。输入框为空时，连续按两次 **Esc** 也能打开回滚菜单。

它适合短期尝试的恢复。**通过 Bash 修改的文件不会被检查点追踪**，部署和数据库写入等外部操作也不能靠会话回滚撤销。重要变更仍应保留 Git 提交记录。[官方检查点说明](https://code.claude.com/docs/en/checkpointing)

## /branch：保留原讨论，再试另一种方案

购物车设计已经讨论得差不多，你还想比较另一种状态管理方案。可以先给当前会话命名，再创建会话分支：

```text
/rename cart-original
/branch cart-alternative
```

进入新分支后再提出替代方案，之后用 **/resume** 找回原会话。架构选型、文章切入点和排查假设，都适合这样比较。

**会话分支不是 Git 分支，也不会隔离文件修改。** 两条路线都要改代码时，需要另行安排 Git 分支和 worktree。希望自己留在当前会话、让副本在后台工作，则使用 **/fork**；它在不同版本中的行为有过调整，请先核对版本。[官方会话管理说明](https://code.claude.com/docs/en/sessions)

## /context 与 /compact：检查并整理上下文

会话进行很久之后，先用 **/context** 查看上下文占用，再用 **/compact** 生成摘要、释放空间。摘要可以指定保留重点：

```text
/context
/compact 保留当前目标、禁止修改的文件、已确认的原因和下一步；省略重复测试输出。
```

长时间排查问题时，这组命令很实用。把决策与待办留下，比反复携带整段日志更容易接续工作。摘要会省略细节；不能丢失的规格仍应写进项目文档。[官方上下文与压缩命令](https://code.claude.com/docs/en/commands)

## /insights：让 Claude 分析你的使用习惯

想看看自己经常在哪些项目中工作，或哪些沟通方式容易让任务卡住，可以运行：

```text
/insights
```

它会分析本机近期会话，生成 HTML 使用报告，整理工作模式、常见问题和改进建议。最新报告位于 **~/.claude/usage-data/report.html**。

查询额度与使用统计则用 **/usage**。目前官方将 **/cost** 和 **/stats** 列为它的别名，**/stats** 会打开统计标签页。注意：**/insights 的分析会消耗套餐或 API 用量**，报告也不会汇总其他设备上的全部对话。[官方使用报告与用量说明](https://code.claude.com/docs/en/costs#analyze-your-usage-patterns)

## /loop：按指定间隔检查进度

等待 CI 结果时，不必一直手动刷新，可以把检查任务写清楚：

```text
/loop 5m 检查当前分支的 CI 状态。仅在状态变化或需要我处理时报告，保持只读。
```

这会按指定间隔重复执行提示词。想取消时，直接让 Claude 列出计划任务，再删除对应任务即可。

**任务仅在 Claude Code 正在运行且空闲时触发**，重复检查也会消耗用量。这种方式适合工作期间的轮询；长期调度可以评估官方云端 Routines 或桌面计划任务。示例同时指定了间隔、任务和只读范围；新版直接运行 **/loop** 而不带提示词，可能采用内置维护任务。[官方调度说明](https://code.claude.com/docs/en/scheduled-tasks)

## /remote-control 与 /voice：换个设备或输入方式

### /remote-control：从手机继续本机会话

在当前会话输入 **/remote-control**，按界面提示完成连接后，就能通过 Claude 手机 App 或浏览器接着操作。

代码仍在本机执行，所以**电脑必须开机，Claude Code 进程也必须持续运行**。它需要符合条件的 Claude 订阅登录，不支持 API 密钥登录；Team 和 Enterprise 用户还可能需要管理员开启功能。[官方远程控制说明](https://code.claude.com/docs/en/remote-control)

### /voice：先把需求说出来，再补充细节

**/voice** 可以切换语音输入，**/voice hold** 和 **/voice tap** 分别用于按住录音和点按切换。默认按住 **Space** 说话，松开后将识别结果填入输入框。

适合先描述操作中遇到的问题，再用键盘补上文件名。这是**语音转文字**，发送前可以编辑。它需要 Claude.ai 账户和本地麦克风，录音会上传到 Anthropic 服务器完成识别。[官方语音输入说明](https://code.claude.com/docs/en/voice-dictation)

## 终端彩蛋：配色、电台、互动教程与贴纸

这些命令适合在熟悉基本操作后尝试：

| 命令 | 用途 |
| --- | --- |
| **/color purple** | 将当前会话的提示栏改为紫色 |
| **/theme** | 打开主题选择菜单 |
| **/radio** | 在浏览器打开 Claude FM 的 lo-fi 电台 |
| **/powerup** | 通过短篇互动教程与动画了解功能 |
| **/stickers** | 进入 Claude Code 贴纸订购功能 |

同时开多个终端时，可以先试试不同提示栏颜色，让会话更容易区分；写文档时可以听听电台。**/stickers** 涉及订购，价格和配送条件请以当时的页面为准。[官方命令列表](https://code.claude.com/docs/en/commands)

## /copy 与 /export：把有用的回答带走

Claude 整理出一段值得保存的说明后，**/copy** 可复制最近的回答，**/export** 可导出当前会话：

```text
/copy
/export session-notes.txt
```

复制适合保存某段文字，导出适合保留完整讨论过程。分享前应检查内容是否包含私人信息或项目敏感资料。[官方复制与导出命令](https://code.claude.com/docs/en/commands)

## 如何组合使用？

不用一次记住所有命令，先挑一条符合日常工作的路线：

- **比较方案：/plan → /branch。** 先把设计讨论清楚，再尝试替代方案；实施时另行安排文件隔离。
- **长期排查：/btw → /context → /compact。** 临时问题单独问，上下文变满后留下关键结论。
- **等待 CI：/loop 5m 加明确的只读提示。** 说明检查频率、报告条件和停止方式。
- **复盘习惯：/insights → /copy。** 阅读使用报告，再整理需要调整的工作习惯。

知道什么时候提问、什么时候整理上下文，以及什么时候保留原方案，往往比背熟命令列表更有帮助。

## 为什么别人能用的命令，我这里没有？

先用 **/status** 查看版本与登录状态，再核对官方文档。部分功能取决于套餐、平台或插件，有些命令也不会显示在菜单中。

此外，**/vim 已在 v2.1.92 中移除**，现在应通过 **/config → Editor mode** 切换 Vim 编辑模式。旧教程中的 **/vim**，以及对 **/cost、/stats、/usage** 的分类，都需要结合当前文档重新确认。[官方命令参考](https://code.claude.com/docs/en/commands)、[Vim 编辑模式](https://code.claude.com/docs/en/interactive-mode#vim-editor-mode)

开始同时使用多个会话后，可以继续阅读本站的 [Claude Code 跨会话消息指南](/zh-cn/2026/08/09/claude-code-cross-session-messaging/)，把会话命名、分工和交接连起来。
