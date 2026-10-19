title: "Claude Code Cross-Session Messaging: List Sessions and Send Messages"
description: "Make two Claude Code sessions talk on v2.1.224+: @-mention a session to message it, list sessions with /list-agents, and fix common issues."
permalink: 2026/08/09/claude-code-cross-session-messaging/
translation_key: claude-code-cross-session-messaging
translations:
  zh-TW: /2026/08/09/Claude-Code-跨工作階段訊息：讓不同-Session-互相傳話的完整用法/
  zh-CN: /zh-cn/2026/08/09/claude-code-cross-session-messaging/
categories:
  - AI Tools
tags:
  - Claude Code
  - AI Agent
  - Developer Tools
  - Parallel Work
date: 2026-08-09 14:10:00
updated: 2026-10-19 16:00:00
---

![Claude Code cross-session messaging between independent development sessions](cover.jpg)

To make two Claude Code sessions talk, run **v2.1.224 or later** (**v2.1.234** on native Windows) and tell one session something like "let @api know the migration finished." Claude finds the target with **ListAgents**, sends the text with **SendMessage**, and the reply comes back the same way. To list the sessions you can reach, type **/list-agents** (alias **/peers**); to see every session running in the background, run **claude agents** in your shell.

Only a piece of text crosses over, never conversation history or files, and each session keeps its own working directory and permissions. Everything below follows the official [Message your other Claude Code sessions](https://code.claude.com/docs/en/cross-session-messaging) page, checked on 2026-10-19.

<!--more-->

## Make Two Sessions Talk in Three Steps

**1. Check your version.** Messaging turns on automatically once you meet the requirement; there is no MCP server or setting to add.

```bash
claude --version
```

**2. Start and name two sessions in separate terminals:**

```bash
claude -n api        # terminal A
claude -n frontend   # terminal B
```

Inside a running session, use **/rename api** instead. The name is the address other sessions use. Unnamed interactive sessions get a default such as **my-app-3f** (directory name plus a two-character suffix), per [Manage sessions](https://code.claude.com/docs/en/sessions#name-your-sessions). If both sessions edit the same repository, give each its own Git worktree; messaging does not resolve Git conflicts.

**3. In the frontend session, type a prompt:**

```text
Ask @api for its progress, any interface changes, and what the frontend needs to know. Summarize the reply for me.
```

- Typing **@** plus the first letters of a name opens a session picker (**v2.1.232+**). Quote names with spaces, such as **@"release notes"**.
- Plain language works too: "the session running the migration in my other terminal."
- **ListAgents** and **SendMessage** are Claude's internal tools, so you never call them yourself, and Claude writes the message. Claude may also message another session unprompted when its own change affects that session's work.

## How to List Claude Code Sessions

"List sessions" means three different commands depending on what you want:

| What you want | Command | What it shows |
| --- | --- | --- |
| Who can I message right now | **/list-agents** (**/peers**) | Your own name on the first line, then subagents, agent-team teammates, and other local sessions; cloud and other-machine sessions appear while connected to Remote Control |
| Every background session | **claude agents**, **claude agents --json** | [Agent view](https://code.claude.com/docs/en/agent-view) (research preview): attach, read logs, stop; add **--all** to include finished ones |
| Past conversations | **claude --resume**, **/resume** | The session picker for resuming old transcripts, not messaging |

If **/list-agents** is not recognized, the session lacks cross-session messaging, so update first. The **Peer address** row in **/status** shows the session's inbox; **unavailable** means the inbox socket could not be created.

For more session commands (interjecting, rewinding, scheduled checks), see [Claude Code fun commands](/en/2026/10/14/claude-code-fun-commands/).

## Get Notified When Another Session Finishes

While waiting on a long task, ask Claude for a one-time notice when the other session next goes idle or exits:

```text
Tell me when the migration session finishes what it's working on
```

- Both sessions need **v2.1.236+**, and it only works for sessions on **this machine**.
- Subscribing on its own does not start a turn or spend tokens in the watched session. Unanswered subscriptions expire after 12 hours.
- If either side sets inbound messages to **refuse**, no notice arrives.

## How Messages Arrive and What the Receiver Can Do

- **Idle receiver**: Claude Code starts a new turn with the message. **Busy receiver**: Claude reads it between tool calls, so a running tool is never interrupted.
- **On screen**: a dim one-line preview such as **› Message from @api-worker: Schema migration finished**; press **Ctrl + O** for the full text.
- **Safety rules**: a message cannot approve permission prompts, cannot get the receiver to change permission settings or CLAUDE.md, and commands such as **/compact** inside it are plain text that never run. The receiver's own permission prompts still fire.
- **Usage**: a delivered message counts toward the receiver's usage like a prompt you type.
- **Limits**: plain text only; same-machine messages are capped at roughly one million characters; rapid bursts are refused at the sender; the receiver queues at most 50 messages, so message loops throttle themselves.

## Same Machine vs. Other Machines

| Where the other session runs | Path | Requirements and limits |
| --- | --- | --- |
| This machine | Per-session Unix socket (named pipe on native Windows), **never through Anthropic servers** | Works on every provider; Amazon Bedrock, Google Cloud Agent Platform, Microsoft Foundry and similar need **v2.1.248** |
| Same container | Socket inside the container | Host and container can't reach each other; neither can WSL 2 and native Windows |
| Another of your machines | Anthropic servers, over that machine's [Remote Control](https://code.claude.com/docs/en/remote-control) connection | **v2.1.225+**; both sides must be on Remote Control to appear in the list; needs a claude.ai sign-in, not an API key |
| Cloud (Claude Code on the web) | Anthropic servers | The sending session must be connected to Remote Control |

- If the sender is **not** on Remote Control, a cross-machine message still goes out but carries no reply address, so the receiver can't answer.
- A session marked **offline** gets the message after it reconnects.
- A session marked **can't receive cross-session messages** is never sent to; the result begins with **Not sent**.
- Cross-machine messages pass through servers, so keep API keys, passwords, and personal data out of them.

## Permission Settings: Inbound Mode, Cross-Machine Approval, Off Switch

**Inbound mode, crossSessionInbound** (also in **/config** under **Messages from your other sessions**, v2.1.232+):

| Value | Behavior |
| --- | --- |
| **accept** | Every message goes to Claude |
| **hold** | Shows a notice, doesn't deliver; released if an accept applies later |
| **refuse** | Drops every message |

**Default when unset** depends on both permission modes. A receiver in a prompting mode (including auto and acceptEdits) delivers each message, holding it only if the sender bypasses permissions. A receiver in bypassPermissions holds each message unless the sender also bypasses. Held messages open an approval dialog that drops the message after **5 minutes** by default (**dialogExpiry**).

**Require approval for every cross-machine message**, even in bypassPermissions mode:

```json
{
  "isolatePeerMachines": true
}
```

**Turn off sending, listing, and receiving:**

```json
{
  "permissions": {
    "deny": ["SendMessage", "ListAgents"]
  },
  "crossSessionInbound": "refuse"
}
```

Denying **SendMessage** also removes messaging to subagents and agent-team teammates.

**Non-interactive claude -p** binds an inbox socket (bare mode does not) but has no approval dialog. To let a worker take messages unattended, set it explicitly:

```bash
claude -p "check whether the migration finished" \
  --settings '{"crossSessionInbound":"accept"}'
```

See the [settings reference](https://code.claude.com/docs/en/settings-reference#crosssessioninbound) for precedence rules.

## Cross-Session Messaging vs. /resume, Subagents, and Agent Teams

| Mechanism | Best for | Shared context |
| --- | --- | --- |
| Cross-session messaging | Your own sessions swapping status, warnings, decisions | No, text only |
| **/resume**, **claude --resume** | Continuing an old conversation | Yes, full history |
| Subagents | Delegating a focused task from the current session | No, result only |
| [Agent teams](https://code.claude.com/docs/en/agent-teams) | A lead plus teammates with a shared task list | Separate contexts, team messaging |

Agent teams are still **experimental** and need **CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1**, and they use noticeably more tokens. For two terminals trading a few updates, messaging is enough. For designing a full multi-agent workflow, read the [Agentic SDLC architecture guide](/en/2026/08/24/agentic-sdlc-architecture-guide/); if you're still choosing tools, see [Claude Code vs Codex vs Cursor](/en/2026/05/06/claude-code-vs-codex-vs-cursor/).

## Troubleshooting

| Symptom | Check |
| --- | --- |
| **/list-agents** not recognized | Version: v2.1.224 on macOS/Linux/WSL 2, v2.1.234 on native Windows; run **claude update** |
| A local session is missing from the list | Was it started in bare mode? Does its **/status** show **Peer address** as unavailable? |
| Other-machine or cloud sessions missing | Are both sides on Remote Control with a claude.ai sign-in? (API keys and Bedrock etc. can't reach other machines) |
| Message sent but nothing happens | Receiver set to hold or refuse, an approval dialog waiting, or the 5-minute expiry passed |
| SendMessage is unavailable | A permission deny rule on **SendMessage** or **ListAgents** |
| Want to hand over a whole conversation | Messages carry text only; use **claude --resume** instead |
