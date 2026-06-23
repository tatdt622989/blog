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
description: Docs MCP 是 OpenAI 官方提供的文件 MCP server，讓 Codex、Claude Code、Cursor 直接將最新官方文件拉進上下文。這篇整理它如何精簡開發工作流，以及為什麼值得立即配置。
---

![OpenAI Docs MCP 讓 Codex、Claude Code 與 Cursor 直接讀官方文件的工作流封面](cover.png)

在使用 **Codex**、**Claude Code** 或 **Cursor** 開發時，每當碰到 **OpenAI API**、**Responses API** 或工具 schema 的調整，我們往往得跳出編輯器翻閱官方文件，再手動複製貼上給 AI。

這就是 **Docs MCP** 解決的痛點。它不是一個外掛或搜尋框，而是將「查閱官方最新文件」直接變成 Agent 工作流的內建能力。對 2026 年習慣讓 AI 直接在專案中改 code 的開發者來說，這個改變至關重要。

<!--more-->

## 什麼是 Docs MCP？

**Docs MCP** 是 OpenAI 官方推出的公開 Model Context Protocol（模型上下文協定）伺服器，地址為：

```text
https://developers.openai.com/mcp
```

它提供對 **developers.openai.com** 與 **platform.openai.com** 的**唯讀**文件存取。這意味著 Agent 能夠直接在編輯器中搜尋、讀取最新規格，而不需要使用者手動搬運資訊。

## 它真正改變的兩大日常工作流

### 1. 消除「手動複製貼上」的搬運工模式
以前的流程是：查文件 → 複製規格 → 餵給 AI。現在，Agent 會在需要時自己呼叫 Docs MCP 去查，確保代碼修改基於當下的最新 API 版本，避免因模型過期記憶而引入舊參數。

### 2. 統一多工具的文件查詢基礎設施
OpenAI 在這份 Quickstart 中同時支援了 **Codex**、**VS Code Agent Mode**、**Cursor** 與 **Claude Code**，並提供了通用的 **AGENTS.md** 提示詞指引。這代表文件查詢不再是特定工具的專利，而是跨編輯器的共通標準。

## 為什麼 2026 年這件事特別重要？

現在的 AI coding 工具已經進入自動改專案的 Agent 時代。不論是將舊 API 重構為新的 **Responses API**，或是確認複雜的 schema 欄位，這些變動頻繁的官方規格，都極度依賴即時資料。比起依賴 LLM 的訓練記憶，讓 Agent 自動去對照最新官方文件，是降低出錯率最有效的方式。

## 快速安裝與規則配置

### 1. 各工具的安裝指令

若使用 **Codex**：
```bash
codex mcp add openaiDeveloperDocs --url https://developers.openai.com/mcp
```

若使用 **Claude Code**：
```bash
claude mcp add --transport http openaiDeveloperDocs https://developers.openai.com/mcp
```

若使用 **Cursor**，請在 **~/.cursor/mcp.json** 中寫入：
```json
{
  "mcpServers": {
    "openaiDeveloperDocs": {
      "url": "https://developers.openai.com/mcp"
    }
  }
}
```

### 2. 重要：寫入 **AGENTS.md**
只安裝是不夠的，必須在專案的 **AGENTS.md** 中明確指示：**凡遇到 OpenAI API、ChatGPT Apps SDK、Codex 等問題，優先查閱 Docs MCP**。否則，Agent 在執行時仍會傾向使用記憶回答。

## 結論：讓 Agent 少說錯話的必備補強

如果你看過我之前的 [Claude Code、Codex、Cursor 怎麼選？](/2026/05/06/AI-coding-工具比較：Claude-Code、Codex、Cursor-怎麼選？/) 或 [Claude Code 六月更新實測](/2026/06/20/Claude-Code-2026-六月更新實測：四個我馬上開來用的新功能/)，那麼 Docs MCP 就是下一步最合理的補強。它不華麗，但能讓你的 Agent 更腳踏實地，不再一本正經地胡說八道。

## 參考資料

- [OpenAI Developers: Docs MCP](https://developers.openai.com/learn/docs-mcp)
- [OpenAI API Docs: MCP and Connectors](https://developers.openai.com/api/docs/guides/tools-connectors-mcp)
- [OpenAI Codex Docs: Model Context Protocol](https://developers.openai.com/codex/mcp)
