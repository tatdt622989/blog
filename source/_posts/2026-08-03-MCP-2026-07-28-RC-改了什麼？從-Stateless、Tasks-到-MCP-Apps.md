---
title: MCP 2026-07-28 RC 改了什麼？從 Stateless、Tasks 到 MCP Apps
date: 2026-08-03 18:30:00
updated: 2026-08-17 15:20:00
description: MCP 2026-07-28 RC 是 Model Context Protocol 的一次大幅改版。本文整理 Stateless、server discover、Tasks、MCP Apps、授權與相容性，帶你判斷一般使用者與 MCP 開發者現在該不該升級，以及如何安全測試。
categories:
- AI 科技
tags:
- AI
- MCP
- AI Agent
- 開發工具
---

![MCP 2026-07-28 協定更新與 AI Agent 工具連線示意圖](cover.jpg)

如果把 AI Agent 想成一位會自己查資料、操作工具的助理，那麼 **MCP（Model Context Protocol，模型上下文協定）** 就像是 AI 世界裡的一套共通插座規格。只要工具和 AI 都遵守這套規格，Agent 就能用比較一致的方式讀取資料、呼叫功能，或把結果交回使用者。

最近 MCP 出現了 **2026-07-28 RC（Release Candidate，發布候選版）**。這不是改幾個欄位的小更新，而是重新思考遠端 MCP Server 要如何連線、如何維持狀態，以及長時間任務要怎麼和使用者互動。

先講結論：**一般使用者不需要看到 RC 就立刻重設所有 MCP；MCP 開發者則應該開始測試新舊兩種連線方式。**截至 2026 年 8 月 3 日，官方規格儲存庫仍將 **2025-11-25** 列為最新正式版本，**2026-07-28** 仍以 RC 和各 SDK 的遷移文件為主要參考。不同工具的支援速度也不會完全同步。

<!--more-->

## MCP 到底是什麼？先不要被名詞嚇到

MCP 不是模型，也不是某一個 AI 軟體。它比較像一份大家共同遵守的「工具溝通規則」。

例如，AI 想要查 GitHub issue、讀資料庫、搜尋公司文件，或呼叫天氣 API，傳統上每一種工具都可能有不同的接法。MCP 的目標，是讓這些工具用相近的方式告訴 AI：**我能做什麼、需要什麼參數、結果會長什麼樣子。**

可以先用三個角色理解：

| 角色 | 說明 |
| --- | --- |
| Host | 使用者真正打開的 AI 應用程式，例如 Codex、Claude 或其他 Agent 工具 |
| Client | Host 裡負責和 MCP Server 溝通的連接器 |
| Server | 提供工具、資料或功能的一方，例如 GitHub、資料庫或公司內部服務 |

我之前介紹過的 [Docs MCP](/2026/06/22/Docs-MCP-到底改變了什麼？為什麼-2026-的-Codex、Claude-Code、Cursor-使用者都該裝/)，就是把官方文件包裝成 MCP Server，讓 Agent 可以在工作流中主動查詢資料。

## 這次最大的改變：MCP 不再依賴固定的連線狀態

### 舊做法：先報到，再拿一把 Session 鑰匙

在 2025-11-25 的 Streamable HTTP 流程中，Client 通常會先送出 `initialize`，和 Server 協商版本與能力。Server 回應後可能發給 Client 一個 `Mcp-Session-Id`，之後的請求都要帶著這把鑰匙。

這種方式不是不能用，但它會讓遠端服務變得比較難擴充。假設你有三台 MCP Server，請求可能必須一直回到同一台；如果那台剛好重啟，還要處理 Session 怎麼保存、搬移或恢復。

### 新做法：每次請求都把必要資訊帶齊

2026-07-28 RC 的方向是 **Stateless**，也就是把「協定層的記憶」拿掉。Client 先用 `server/discover` 詢問 Server 支援什麼，後續每個請求都帶著需要的版本與上下文資訊，Server 不必依賴某個先前建立的固定 Session 才能理解請求。

這樣做的好處很直觀：請求比較容易被負載平衡器分配到任何一台 Server，也比較容易放進快取、追蹤與監控系統。官方文件示範的新請求會帶上 `MCP-Protocol-Version`、`Mcp-Method` 等資訊，讓基礎設施不必先解讀整個請求內容，便能知道它要做什麼。

但請注意，**Stateless 不等於應用程式不能保存資料。**如果購物車、瀏覽器或任務需要跨多次呼叫保持狀態，Server 仍然可以回傳一個 `basket_id`、`browser_id` 或其他明確的狀態識別碼，下一次由 Client 再把它傳回來。改變的是「誰負責記住這件事」，不是所有記憶都被刪掉。

## `server/discover` 是做什麼的？

以前 Client 主要透過 `initialize` 完成第一次握手。新流程增加了 `server/discover`，可以把它想成打電話前先問總機：

1. 你支援哪些 MCP 版本？
2. 你有哪些工具和能力？
3. 你希望 Client 用什麼方式和你溝通？

這讓版本協商變得更清楚，也讓同一個 Client 有機會同時面對新舊 Server。若對方不懂 `server/discover`，支援版本協商的 SDK 可以回退到舊的 `initialize` 流程；因此升級不一定代表一夜之間把所有舊 Server 判定為不能使用。

這也是目前最重要的相容性觀念：**不要只問「我有沒有升級 SDK」，還要問「我的 Client 和 Server 能不能協商出共同版本」。**

## Tasks 和 MCP Apps，解決的是哪種問題？

### Tasks：讓 MCP 能處理不會立刻結束的工作

有些工具呼叫很快，例如查一筆資料或讀一個檔案；但有些工作可能要跑幾分鐘，甚至需要使用者中途確認。

以前，這類工作容易被塞進一條長連線裡，連線中斷就要猜測任務到底完成了沒有。新方向把長時間工作整理成 **Tasks 擴充功能**，讓任務可以有比較清楚的生命週期，例如等待中、執行中、完成或失敗。

對使用者來說，這比較像把「請 AI 幫我跑一個工作」從一次性的按鈕，變成可以追蹤的工作單。對開發者來說，則要處理重試、過期、結果保存與取消等問題。

### MCP Apps：工具不只回傳文字，也能帶一個介面

如果 MCP Server 只能回傳文字，很多工作仍然要靠 AI 自己描述結果。但有些情境用介面更清楚，例如：

- 編輯一張資料表
- 查看一個可互動的報表
- 選擇日期、檔案或篩選條件
- 預覽一個即將送出的動作

**MCP Apps** 的方向，是讓 Server 可以提供由 Server 渲染的互動介面，讓支援的 Host 把它顯示在 AI 工作流裡。這不代表每個 MCP Client 都會自動出現漂亮的畫面，而是協定開始為「工具加上介面」預留正式位置。

## 這次還有哪些重要變化？

### 授權更靠近 OAuth 與 OpenID Connect

當 MCP Server 從本機小工具變成遠端服務，登入、權限、Token 保存和撤銷就不能再用臨時做法處理。2026-07-28 RC 把授權方向拉近 OAuth 與 OpenID Connect 的實務部署，目標是讓企業比較容易接上既有的登入與權限系統。

這對一般使用者的提醒是：看到 MCP 要求連接外部帳號時，不要只看它「能不能用」，也要確認它會存取哪些資料、能不能執行寫入操作，以及權限能不能隨時撤銷。

### Roots、Sampling、Logging 被標示為 Deprecated

在新版本方向中，Roots、Sampling 和 Logging 被標示為 **Deprecated（不建議新的實作繼續依賴）**。Deprecated 不等於今天立刻全部消失，而是代表開發者不應再把它們當成未來唯一的設計基礎。

MCP 仍然需要一段新舊版本並存的時間，因此升級時要看你連接的 Client、Server 和 SDK 各自支援什麼，而不是只看規格文件上的一個日期。

## 一般使用者現在需要做什麼？

如果你只是用 Codex、Claude Code 或其他 Agent 連接現成的 MCP Server，建議先做三件事：

1. **不要為了追版本而刪掉目前能正常工作的設定。**
2. 查看使用中的 Client 和 Server 是否已支援 `2026-07-28`，以及是否能回退到 `2025-11-25`。
3. MCP Server 涉及帳號、檔案或資料庫時，重新檢查它的權限範圍。

換句話說，現在比較像是「準備升級、開始測試」，還不是「所有人今天都必須重做設定」。

## MCP Server 開發者的升級清單

如果你自己維護 MCP Server，可以依照這個順序檢查：

1. 列出目前依賴 `Mcp-Session-Id`、Session 儲存、資源訂閱或 Server 主動通知的功能。
2. 確認 SDK 是否支援版本協商，以及是否能在新舊版本間自動回退。
3. 把需要長時間執行或使用者確認的工作，拆成可追蹤的 Task 或 `input_required` 流程。
4. 測試多台 Server、負載平衡、重試、逾時和中途重啟，不要只在單機上測一次成功案例。
5. 把 OAuth、Token、工具權限和稽核紀錄當成正式功能處理。
6. 保留切回舊版本的開關，等實際 Client 生態穩定後再逐步放大新版本流量。

TypeScript SDK 的遷移文件特別提醒，2026-07-28 的支援仍涉及新的 v2 套件和明確的版本協商；Go SDK 則已提供對應版本支援，但同樣保留與舊版協定的相容路徑。這表示生態正在往前走，但「支援」和「所有工具預設啟用」是兩回事。

## 常見問題

### Stateless 是不是代表 AI 完全沒有記憶？

不是。它主要是指 MCP 協定本身不再要求用固定 Session 維持每次請求。應用程式仍然可以用資料庫、狀態識別碼或 `requestState` 保存工作進度。

### 我現在就要升級 MCP 嗎？

如果你只是使用現成工具，通常不用急著手動改設定。如果你維護 MCP Server，則應該在測試環境先驗證新舊版本的協商與回退。

### MCP Apps 是不是所有 MCP Server 都會自動變成圖形介面？

不是。MCP Apps 是擴充能力，Server、Host 和 Client 都要支援，介面才會真的出現。沒有支援的工具仍然可以用文字或結構化資料回傳結果。

## 結語：MCP 正從「接工具」走向「運行工具」

MCP 早期最容易理解的價值，是把 AI 和外部工具接起來；2026-07-28 RC 更進一步處理了遠端服務真正會遇到的問題：如何擴充、如何追蹤長任務、如何做授權，以及如何讓工具帶著自己的互動介面。

這次更新最值得記住的不是一串新名詞，而是三個方向：**連線不必綁死在某一台 Server、長任務要有清楚的生命週期、權限和相容性要在一開始就設計好。**

如果你正在使用 [Claude Code、Codex 與 Cursor](/2026/05/06/AI-coding-工具比較：Claude-Code、Codex、Cursor-怎麼選？/) 這類 Agent，現在最適合做的事不是盲目追最新版本，而是先盤點自己使用的 MCP Server，確認它提供了什麼權限，再選一個低風險專案測試版本協商和回退。

## 參考資料

- [Model Context Protocol：2026-07-28 Release Candidate](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/)
- [Model Context Protocol GitHub Releases](https://github.com/modelcontextprotocol/modelcontextprotocol/releases)
- [TypeScript SDK：Supporting protocol revision 2026-07-28](https://github.com/modelcontextprotocol/typescript-sdk/blob/main/docs/migration/support-2026-07-28.md)
- [Go SDK：MCP 2026-07-28 release](https://github.com/modelcontextprotocol/go-sdk/releases)
