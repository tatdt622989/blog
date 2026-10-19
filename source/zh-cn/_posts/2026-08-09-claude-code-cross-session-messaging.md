---
title: "Claude Code 跨 Session 通信：用 /list-agents 列出会话并互发消息"
description: "Claude Code 两个 Session 如何通信？v2.1.224 起无需插件，直接让 Claude 发消息或用 @名称 指定目标；/list-agents（/peers）列出可联系的会话，claude agents 查看后台任务。附跨设备、权限配置与排障。"
permalink: 2026/08/09/claude-code-cross-session-messaging/
translation_key: claude-code-cross-session-messaging
translations:
  zh-TW: /2026/08/09/Claude-Code-跨工作階段訊息：讓不同-Session-互相傳話的完整用法/
  en: /en/2026/08/09/claude-code-cross-session-messaging/
categories:
  - AI 科技
tags:
  - AI
  - Claude Code
  - AI Agent
  - 开发工具
date: 2026-08-09 14:10:00
updated: 2026-10-19 16:00:00
---

![Claude Code 跨会话消息让多个 Session 交换任务摘要的示意图](cover.jpg)

想让两个 Claude Code 会话互相通信，只要版本不低于 **v2.1.224**（原生 Windows 为 **v2.1.234**），在其中一个会话里说"告诉 @api：migration 已经跑完了"，Claude 就会自动调用 **ListAgents** 找到对方、调用 **SendMessage** 发送，对方的回复也会原路返回。查看能联系哪些会话，输入 **/list-agents**（别名 **/peers**）；查看所有在后台运行的会话，在终端执行 **claude agents**。

发过去的只是一段文本，不包含对话历史和文件；每个会话依然使用自己的工作目录和权限。本文依据官方文档 [Message your other Claude Code sessions](https://code.claude.com/docs/en/cross-session-messaging) 整理，核对日期为 2026-10-19。

<!--more-->

## 三步实现两个会话互发消息

**1. 检查版本**（满足版本要求即默认开启，无需安装 MCP，也不用改配置）：

```bash
claude --version
```

**2. 在两个终端分别启动并命名会话**：

```bash
claude -n api        # 终端 A
claude -n frontend   # 终端 B
```

已经在会话中的话，用 **/rename api** 重命名。会话名就是其他会话找到你的地址；不命名时，Claude Code 会生成"目录名 + 两位后缀"形式的默认名，例如 **my-app-3f**（见 [Manage sessions](https://code.claude.com/docs/en/sessions#name-your-sessions)）。如果两个会话要改同一个仓库，建议先用 Git worktree 隔离工作目录，消息功能本身不会帮你解决 Git 冲突。

**3. 在 frontend 会话中输入提示词**：

```text
问一下 @api：当前进度、接口有哪些变更、前端需要注意什么。把回复整理给我。
```

- 输入 **@** 加名称的前几个字符会弹出会话选择列表（**v2.1.232** 起支持）；名称带空格时要加双引号，例如 **@"release notes"**。
- 不用 @ 也行，直接用自然语言描述目标，例如"另一个终端里跑 migration 的那个会话"。
- **ListAgents** 和 **SendMessage** 是 Claude 内部调用的工具，你无需手动调用，消息内容也由 Claude 自己撰写。当 Claude 发现自己的改动会影响其他会话时，也可能主动发消息提醒。

## 如何列出 Claude Code 的会话？

"列出会话"根据你想看的内容，对应三个不同的命令：

| 想查看 | 命令 | 输出内容 |
| --- | --- | --- |
| 当前能给谁发消息 | **/list-agents**（**/peers**） | 第一行是本会话的名称，下面列出子代理、Agent Teams 成员、本机其他会话；连接 Remote Control 时还会列出云端和其他设备上的会话 |
| 所有后台运行的会话 | **claude agents**、**claude agents --json** | [Agent View](https://code.claude.com/docs/en/agent-view)（研究预览版），可 attach、查看日志、停止；加 **--all** 会包含已结束的会话 |
| 历史对话记录 | **claude --resume**、**/resume** | 打开会话选择器恢复旧对话，与发消息无关 |

如果提示 **/list-agents** 命令不存在，说明当前会话不支持跨会话消息，先升级版本。**/status** 中的 **Peer address** 一行显示本会话的收件地址；显示 **unavailable** 则表示收件套接字创建失败。

更多会话相关命令（插话、回退、定时巡检）可以参考 [Claude Code 趣味命令指南](/zh-cn/2026/10/14/claude-code-fun-commands/)。

## 等另一个会话完成后再通知我

等待耗时任务时，可以让 Claude 订阅"对方下次空闲或退出时通知一次"：

```text
migration 那个会话把手头的任务做完后告诉我
```

- 双方都需要 **v2.1.236** 及以上版本，且只能订阅**同一台机器**上的会话。
- 单独订阅不会在被监听的会话里触发新一轮对话，也不消耗 token；12 小时内没收到通知会自动取消订阅。
- 任意一方把入站消息设为 **refuse**，都收不到通知。

## 消息如何投递，接收方如何处理

- **接收方空闲**：直接以这条消息开启新一轮对话。**接收方正忙**：在两次工具调用之间读取，不会打断正在执行的工具。
- **界面显示**：一行灰色预览，例如 **› Message from @api-worker: Schema migration finished**；按 **Ctrl + O** 打开对话记录查看器阅读全文。
- **安全边界**：消息不能代你批准权限，不能让对方修改权限配置或 CLAUDE.md；消息中的 **/compact** 等命令只是普通文本，不会执行；接收方需要权限时照常弹出确认。
- **用量**：投递成功的消息和你手动输入的提示词一样，计入接收方的用量。
- **限制**：仅支持纯文本；本机单条消息上限约 100 万字符；短时间内连续发送会在发送端被拒绝；接收方最多排队 50 条，两个会话之间的消息死循环会被自动限流。

## 本机与跨设备通信的区别

| 对方在哪里运行 | 传输路径 | 条件与限制 |
| --- | --- | --- |
| 同一台机器 | 每个会话独立的 Unix 套接字（原生 Windows 为命名管道），**不经过 Anthropic 服务器** | 所有模型供应商均可用；Amazon Bedrock、Google Cloud Agent Platform、Microsoft Foundry 等需要 **v2.1.248** |
| 同一个容器内 | 容器内的套接字 | 容器与宿主机之间、WSL 2 与原生 Windows 之间互不可见 |
| 你的另一台设备 | 经 Anthropic 服务器，通过对方的 [Remote Control](https://code.claude.com/docs/en/remote-control) 连接送达 | **v2.1.225** 起；双方都连接 Remote Control 才会出现在列表中；需要 claude.ai 账号登录，API Key 不行 |
| 云端（Claude Code on the web） | 经 Anthropic 服务器 | 发送方需要连接 Remote Control |

- 发送方**未连接** Remote Control 时，跨设备消息仍会发出，但不带回复地址，对方无法回复。
- 列表中标记为 **offline** 的会话，消息会在其重新连接后送达。
- 标记为 **can't receive cross-session messages** 的会话不会被发送，结果以 **Not sent** 开头。
- 跨设备消息会经过服务器，不要在消息里放 API Key、密码或个人信息。

## 权限配置：入站模式、跨设备审批与彻底关闭

**入站模式 crossSessionInbound**（也可以在 **/config** 的 **Messages from your other sessions** 中设置，v2.1.232 起）：

| 取值 | 行为 |
| --- | --- |
| **accept** | 每条消息都直接交给 Claude |
| **hold** | 只显示通知、不投递；之后若改为 accept 才会放行 |
| **refuse** | 直接丢弃 |

**未配置时的默认行为**取决于双方的权限模式：接收方处于需要确认的模式（包括 auto、acceptEdits）时直接投递，只有发送方是 bypassPermissions 才会暂存；接收方是 bypassPermissions 时一律暂存待审批，除非发送方也是。暂存的消息会弹出审批对话框，默认 **5 分钟**（**dialogExpiry**）无响应即丢弃。

**所有跨设备消息都必须经你审批**（bypassPermissions 模式下同样生效）：

```json
{
  "isolatePeerMachines": true
}
```

**彻底关闭发送、列出和接收**：

```json
{
  "permissions": {
    "deny": ["SendMessage", "ListAgents"]
  },
  "crossSessionInbound": "refuse"
}
```

注意：禁用 **SendMessage** 也会同时关闭 Claude 给子代理和 Agent Teams 成员发消息的能力。

**非交互模式 claude -p**：会创建收件套接字（bare 模式不会），但没有审批对话框。要让后台 worker 在无人值守时接收消息，需要在启动时显式配置：

```bash
claude -p "检查 migration 是否完成" \
  --settings '{"crossSessionInbound":"accept"}'
```

配置优先级见 [Settings reference](https://code.claude.com/docs/en/settings-reference#crosssessioninbound)。

## 跨会话消息、/resume、子代理、Agent Teams 怎么选

| 机制 | 适用场景 | 是否共享上下文 |
| --- | --- | --- |
| 跨会话消息 | 你自己开的多个会话之间同步进度、预警、决策 | 否，只传文本 |
| **/resume**、**claude --resume** | 回到之前的对话继续 | 是，完整历史 |
| 子代理（subagents） | 当前会话把小任务委派出去，结果回传主对话 | 否，只返回结果 |
| [Agent Teams](https://code.claude.com/docs/en/agent-teams) | 由 lead 拆分任务、带共享任务列表的多智能体团队 | 各自独立，团队内互发消息 |

Agent Teams 仍是**实验性功能**，需要设置 **CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1** 才会启用，token 消耗也明显更高。如果只是让两个终端交换几句进度，跨会话消息就够用了。想进一步设计多智能体研发流程，可以看 [Agentic SDLC 完整架构解析](/zh-cn/2026/08/24/agentic-sdlc-architecture-guide/)；还在选型的话，参考 [Claude Code、Codex、Cursor 对比](/zh-cn/2026/05/06/claude-code-vs-codex-vs-cursor/)。

## 常见问题排查

| 现象 | 优先检查 |
| --- | --- |
| 提示 **/list-agents** 命令不存在 | 版本：macOS／Linux／WSL 2 需要 v2.1.224，原生 Windows 需要 v2.1.234；可执行 **claude update** 升级 |
| 列表里看不到某个本机会话 | 该会话是否以 bare 模式启动；它的 **/status** 中 **Peer address** 是否为 unavailable |
| 看不到其他设备或云端会话 | 双方是否都连接了 Remote Control、是否用 claude.ai 账号登录（API Key、Bedrock 等无法跨设备） |
| 消息发出但对方没反应 | 对方是否设为 hold／refuse、是否有审批对话框在等待、是否超过 5 分钟被丢弃 |
| 找不到 SendMessage 工具 | 权限配置中是否有禁用 **SendMessage**、**ListAgents** 的 deny 规则 |
| 想把整段对话交给另一个会话 | 消息只能传文本，改用 **claude --resume** 恢复该对话 |
