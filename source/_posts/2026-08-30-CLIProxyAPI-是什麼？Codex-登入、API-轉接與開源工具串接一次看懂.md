---
title: CLIProxyAPI 是什麼？Codex 登入、API 轉接與開源工具串接一次看懂
date: 2026-08-30 01:06:38
updated: 2026-08-30 01:19:28
description: 用白話介紹 CLIProxyAPI 如何將 Codex 登入轉成常見的 API 入口，包含安裝概念、OpenCode 等開源工具用例、OpenAI 公開說明與安全界線。
translation_key: cliproxyapi-codex-open-source-tools
translations:
  en: /en/2026/08/30/cliproxyapi-codex-open-source-tools/
categories:
- AI 科技
tags:
- AI
- Codex
- 開源工具
---

![CLIProxyAPI 將 Codex 連接到程式開發、網頁介面、工作流、文件與記憶工具](cover.jpg)

很多開源 AI 工具在第一次啟用時，都會要你填入 **API 位址、密鑰與模型名稱**。問題是，ChatGPT 訂閱和 OpenAI API 原本是兩套不同的使用方式，不能因為有訂閱就直接拿到 API 密鑰。

[CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) 做的事，就是在自己的電腦上加一層轉接站：你先用 ChatGPT 帳號登入 Codex，再讓其他工具透過大家熟悉的 API 格式使用它。對想自己選擇使用介面的人來說，這是一個很有意思的開源工具。

<!--more-->

## CLIProxyAPI 到底在做什麼？

可以把 CLIProxyAPI 想成旅行用的轉接頭。開源工具說的是 OpenAI 相容 API，Codex 登入則是另一種連線方式；CLIProxyAPI 負責在中間接收請求、轉換格式，再把結果送回原本的工具。

它的核心能力包括：

- 透過 OAuth 登入 Codex，不需要把 ChatGPT 密碼交給其他工具。
- 提供 OpenAI 相容介面，並支援 Responses API。
- 支援即時輸出、工具呼叫，以及文字與圖片輸入。
- 把連線資料集中在一個本機入口，更換客戶端時不必重做整套登入。

這不是 OpenAI 官方 API，也不是替你多送一份額度。它是由第三方維護的開源轉接層，所有使用量仍會計入原本的 Codex 訂閱限制。

## Codex 真的支援第三方工具嗎？

OpenAI 在官方的 [Codex for Open Source](https://developers.openai.com/community/codex-for-oss) 頁面明確寫道，開發者應該能在自己喜歡的工具中寫程式，並直接點名 Codex、OpenCode、Cline 與 Pi 等選擇。OpenAI Codex 的 Tibo 也公開表示，透過 **Sign in with ChatGPT** 在支援的開源客戶端使用自己的訂閱是沒有問題的。

不過，[同一則公開說明](https://x.com/thsottiaux/status/2090675027670978569) 也畫出了界線：不支持把訂閱轉成 API 流量後，再提供多人共用或轉售。這句話證明的是「可以選擇第三方工具」，並不等於 OpenAI 官方認證每一個代理專案。使用 CLIProxyAPI 時，最穩妥的做法是限定在自己的電腦和自己的帳號。

## 最短的使用流程

以 macOS 為例，官方支援透過 Homebrew 安裝：

```bash
brew install cliproxyapi
cli-proxy-api --codex-login
```

完成瀏覽器授權後，依照[官方快速開始](https://help.router-for.me/cn/introduction/quick-start)準備設定檔並啟動服務。接著到目標工具填入：

- **API 位址：http://127.0.0.1:8317/v1**
- **API 密鑰：你在 CLIProxyAPI 設定檔中自己建立的密鑰**
- **模型名稱：以當下模型清單實際顯示為準**

這裡的 API 密鑰不是 OpenAI 平台密鑰，而是你替本機入口設定的密碼。模型名稱與設定方式會隨版本變動，不建議照抄過時教學裡的名稱。

## 能接上哪些開源專案？

以 2026 年 8 月 30 日的 GitHub 公開數字為準，下面每個方向只選一個代表：

| 使用方向 | 代表專案 | 約略星數 | 與 CLIProxyAPI 的關係 |
|---|---|---:|---|
| AI 程式開發 | [OpenCode](https://github.com/anomalyco/opencode) | 14.6 萬 | 可設定自訂 OpenAI 相容 API，是最直接的使用例 |
| 自架網頁聊天 | [Open WebUI](https://github.com/open-webui/open-webui) | 15 萬 | 將本機 API 加入網頁介面，方便非終端使用 |
| AI 工作流與應用 | [Dify](https://github.com/langgenius/dify) | 15.4 萬 | 可透過 OpenAI 相容模型供應器接入 |
| 文件知識庫 | [RAGFlow](https://github.com/infiniflow/ragflow) | 9 萬 | 可把對話模型指向相容 API；向量模型通常仍要另外準備 |
| 開發工作記憶 | [agentmemory](https://github.com/rohitg00/agentmemory) | 2.6 萬 | 它透過 MCP 搭配 Codex 或 OpenCode，不是直接呼叫 CLIProxyAPI |

這些專案不需要全部安裝。如果你只想換一個寫程式介面，先試 OpenCode 就夠了；只想用瀏覽器聊天，選 Open WebUI；要做工作流或文件問答，再考慮 Dify 與 RAGFlow。

## 安裝前先知道這些限制

- **不要對外網公開端口**：設定中建議綁定 **127.0.0.1**，避免未授權的人使用你的額度。
- **不要上傳授權檔與密鑰**：OAuth 憑證與設定檔不可提交到 GitHub，也不要傳給別人。
- **相容不代表完全相同**：有些專案還需要向量、語音或其他 API，不是只有 Codex 就能開啟所有功能。
- **仍受原本額度限制**：使用不同介面不會讓訂閱額度變多，開源專案也可能更快消耗上下文。

## 值不值得安裝？

如果你只使用官方 Codex，也不想嘗試其他介面，CLIProxyAPI 不是必裝工具。但如果你已經在用多個開源 AI 專案，常常碰到「請填入 API 位址」這一格，它就能把分散的連線設定收整成一個自己掌控的本機入口。

這才是 CLIProxyAPI 最實際的價值：它不是新的 AI 模型，而是一個讓 Codex 更容易進入現有開源工具的轉接層。
