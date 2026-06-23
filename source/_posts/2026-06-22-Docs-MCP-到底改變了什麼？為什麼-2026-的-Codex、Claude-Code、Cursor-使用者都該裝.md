---
title: Docs MCP 到底改變了什麼？為什麼 2026 的 Codex、Claude Code、Cursor 使用者都該裝
date: 2026-06-22 17:58:52
tags:
- AI
- Codex
- Claude Code
- Cursor
- OpenAI
categories:
- AI
description: Docs MCP 是 OpenAI 官方提供的文件 MCP server，讓 Codex、Claude Code、Cursor 直接把官方文件拉進上下文。這篇整理它真正改變的工作流，以及 2026 年為什麼值得先裝起來。
---

![OpenAI Docs MCP 讓 Codex、Claude Code 與 Cursor 直接讀官方文件的工作流封面](cover.png)

如果你最近常在 **Codex**、**Claude Code**、**Cursor** 之間切來切去，應該多少都有同一種煩躁感：工具本身愈來愈強，但只要一碰到 **OpenAI API**、**Responses API**、模型參數、工具 schema 這些細節，還是得自己跳出去翻官方文件。翻完之後，還得再把看到的內容重新餵回 agent。

這就是我覺得 **Docs MCP** 真正有意思的地方。它不是另一個花俏插件，也不是單純把搜尋框搬進編輯器，而是把「查官方文件」這件事正式變成 agent 工作流的一部分。對 2026 年已經習慣讓 AI 直接進 repo 做事的人來說，這個差別其實很大。

<!--more-->

## Docs MCP 不是什麼新模型，它是官方文件入口

截至 **2026-06-22**，OpenAI 已經把 **Docs MCP** 做成公開的文件 MCP server，地址就是：

```text
https://developers.openai.com/mcp
```

它提供的是**唯讀**的 OpenAI 開發文件存取：可以搜尋、可以讀頁面內容，但**不會代你呼叫 OpenAI API**。這點很重要，因為它的定位不是幫你執行任務，而是讓 agent 在工作中能直接查到 **developers.openai.com** 與 **platform.openai.com** 上的官方文件。

換句話說，Docs MCP 的價值不是「多一個工具」，而是把**文件本身變成工具上下文**。

## 它真正改變的，是三件很日常的事

第一，**你不必再把文件內容當搬運工手動轉貼**。

以前最常見的流程是：先去官網找頁面、自己讀、複製重點，再回來跟 agent 說「你照這個規格改」。現在比較合理的做法，是直接讓 agent 去查官方文件，再根據查到的內容回答或改 code。這會讓回答更接近當下版本，也比較不容易混進過期參數或舊模型名稱。

第二，**它讓不同 agent 工具的 OpenAI 文件查詢方式開始統一**。

OpenAI 這頁文件沒有只寫 **Codex**。它把 **Codex**、**VS Code Agent Mode**、**Cursor**、**Claude Code** 的接法都放進同一份 quickstart，甚至連對應的 **AGENTS.md** 提示句都直接給你。這代表一件事：文件查詢不再只是某一套工具的私房功能，而是開始變成跨工具共通的工作流基礎設施。

第三，**它把 agent 的「可靠度」往前推了一格**。

OpenAI 在文件裡甚至直接建議，把「只要碰到 OpenAI API、ChatGPT Apps SDK、Codex 等問題，就優先用 OpenAI developer documentation MCP server」這種句子寫進 **AGENTS.md**。這很值得注意，因為它等於是在承認：如果你不把文件查詢習慣做成規則，agent 就很容易退回「憑記憶回答」。

## 為什麼這件事在 2026 特別重要

因為現在的 AI coding 工具，早就不是只幫你補一小段 code 了。

你可能會讓它：

- 幫你把舊的 API 寫法改成新的 **Responses API**
- 幫你確認 tool schema 需要哪些欄位
- 幫你挑目前支援某個工具的模型
- 幫你比較 **Codex**、**Claude Code**、**Cursor** 裡某個設定該怎麼接

這些工作一旦牽涉到**會變動的官方規格**，只靠模型記憶就不夠穩。模型再強，也不代表它腦中那份文件永遠是最新的。Docs MCP 的核心價值，就是讓「去看官方現在怎麼寫」這個動作，能在 agent 流程裡自然發生，而不是靠你每次人工提醒。

## 誰最該先裝

如果你屬於下面這幾種人，我會覺得 Docs MCP 幾乎是低成本高報酬：

- 你有在碰 **OpenAI API** 或 **Responses API**
- 你會讓 **Codex** 或 **Claude Code** 直接幫你改實際專案
- 你在 **Cursor** 裡也常用 agent 模式處理 SDK、模型、schema 問題
- 你已經有自己的 **AGENTS.md**、skills、plugin 或 MCP 工作流

反過來說，如果你平常完全不用 OpenAI 的產品、也不太需要查規格，那它就沒有那麼急。但只要你最近常在看 OpenAI 文件，這個東西應該比你想像中更快回本。

## 安裝其實很短，重點是把它接進規則

以 **Codex** 為例，官方文件給的指令很直接：

```bash
codex mcp add openaiDeveloperDocs --url https://developers.openai.com/mcp
codex mcp list
```

**Claude Code** 也有對應指令：

```bash
claude mcp add --transport http openaiDeveloperDocs https://developers.openai.com/mcp
claude mcp list
```

如果你是 **Cursor**，則可以在 **~/.cursor/mcp.json** 裡加上：

```json
{
  "mcpServers": {
    "openaiDeveloperDocs": {
      "url": "https://developers.openai.com/mcp"
    }
  }
}
```

但我覺得真正不能省的不是安裝，而是把規則補上。你最好在 **AGENTS.md** 裡明寫：只要問題跟 OpenAI API、ChatGPT Apps SDK、Codex 有關，優先查 Docs MCP。否則多數 agent 在壓力下還是會先用自己記得的內容回答。

## 我自己的結論：它不是炫技，而是讓 agent 少講錯話

Docs MCP 最值得寫的地方，不是因為它很新潮，而是它把一個大家每天都在做、卻一直做得很散的動作標準化了：**遇到 OpenAI 的規格問題，就直接查官方文件，而且讓 agent 自己去查**。

如果你前陣子還在比較 [Claude Code、Codex、Cursor 怎麼選？](/2026/05/06/AI-coding-工具比較：Claude-Code、Codex、Cursor-怎麼選？/)，或剛看完我前一篇 [Claude Code 六月更新實測](/2026/06/20/Claude-Code-2026-六月更新實測：四個我馬上開來用的新功能/)，那我會把 Docs MCP 當成下一步很合理的補強：不是換工具，而是把你現在手上的工具變得更可靠。

對我來說，這類東西真正的指標只有一個：**它有沒有讓 agent 更少一本正經地講錯話**。而 Docs MCP，至少目前看起來，確實有。

## 參考資料

- [OpenAI Developers: Docs MCP](https://developers.openai.com/learn/docs-mcp)
- [OpenAI API Docs: MCP and Connectors](https://developers.openai.com/api/docs/guides/tools-connectors-mcp)
- [OpenAI Codex Docs: Model Context Protocol](https://developers.openai.com/codex/mcp)
