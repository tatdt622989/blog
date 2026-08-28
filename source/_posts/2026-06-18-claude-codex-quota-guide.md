---
title: Codex 額度與 5 小時限制：2026 重設時間、用量查詢與節省方法
date: 2026-06-18 14:34:36
updated: 2026-08-28 11:00:00
description: Codex 額度怎麼計算、5 小時限制何時重設？本文整理 2026 最新用量面板、週期限制、Credits、手動重設與 CodexBar 監控方式，並說明哪些做法真能延長可用時間、哪些傳聞沒有官方依據。
translation_key: claude-codex-usage-limits
translations:
  en: /en/2026/06/18/claude-codex-usage-limits-guide/
categories:
- AI 科技
tags:
- AI
- Codex
- Claude
---

![Codex 額度與用量管理指南封面](cover.webp)

先說答案：要查 Codex 剩餘額度與重設時間，請開啟 **Settings → Usage**；正在使用 Codex CLI 時，輸入 **/status** 也能查看目前限制。面板顯示的時間才是你帳戶當下最可靠的答案。

Codex 並不是每次對話扣固定次數。模型、任務執行位置、工作複雜度、上下文、推理強度、速度與工具使用都會影響消耗，因此同一個方案能完成的任務數可能差很多。本文整理官方可確認的規則，以及真正能降低浪費的做法。

<!--more-->

## Codex 額度在哪裡看

最直接的方式有兩種：

1. **Codex App 或網頁版：Settings → Usage**
   - 查看目前使用比例、已耗盡的限制、可用 Credits，以及介面顯示的重設時間。
   - 若帳戶有可用的 banked reset，這裡也可能顯示 **1 reset available** 或 **Full reset**。
2. **Codex CLI：/status**
   - 在正在進行的 CLI 工作階段輸入 **/status**，快速查看目前帳戶與用量狀態。

OpenAI 會依方案、帳戶、工作區與活動調整可用選項，所以不要把別人的截圖當成自己的固定上限。若 App、網頁與 CLI 顯示不同，先確認是否登入同一個帳戶或工作區，再重新整理 **Settings → Usage**。

## 5 小時限制怎麼計算

許多 Codex 帳戶會同時看到較短的 5 小時視窗與較長的每週視窗。任一限制耗盡，都可能讓你必須等待重設、使用 Credits、套用帳戶提供的 reset，或改用方案允許的其他選項。

官方沒有把每個任務換算成固定的「訊息次數」。實際消耗會受到以下因素影響：

- **模型**：不同模型的使用成本與可用量不同。
- **執行位置**：本機、雲端或其他功能的計量方式可能不同。
- **任務複雜度與時間**：大型重構、長時間任務通常比單一小修改消耗更多。
- **上下文**：需要讀取的檔案、對話歷史與輸入內容越多，通常越容易提高消耗。
- **推理、速度與工具**：較高推理強度、較快服務層級或大量工具操作都可能增加用量。

Codex、ChatGPT Work、ChatGPT for Excel 與 Workspace Agents 在你的方案支援這些功能時，可能共用 agentic usage 與 Credits。一般 ChatGPT 的圖片、檔案上傳或語音限制則可能是另一套配額，不能直接拿來推算 Codex。

規則與數字會調整，請以 [OpenAI 的 Codex 方案說明](https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan) 與帳戶用量面板為準。

## Credits 是什麼，什麼時候會使用

Credits 是超過方案內含額度後，讓支援功能繼續執行的按量付費額度。系統會先使用方案內含用量，達到限制後才從 Credits 餘額扣除。

是否能購買 Credits、可購買金額、自動加值與支援功能，會依方案、帳戶與地區而異。只有在你的 **Settings → Usage** 或 **Usage & Billing** 顯示相關選項時，才代表目前帳戶可用；沒有看到按鈕不等於操作錯誤。

使用前應注意：

- Credits 與 API credits 不同，也不會提高方案原本的內含上限。
- 支援的個人方案可在 **Settings → Usage** 查看餘額與近期用量。
- 自動加值若對你的帳戶開放，可設定最低餘額、目標餘額與每月上限；開啟時餘額已低於門檻，可能立即產生一筆購買。
- 購買的 Credits 通常不可退款，並有使用期限；下單前應確認畫面上的最新條款。

詳細規則可查看 [OpenAI Credits 說明](https://help.openai.com/en/articles/12642688-using-credits-for-flexible-usage-in-chatgpt-personal-plans)。

## Banked reset 會重設哪些額度

Banked reset 是儲存在合格帳戶中的一次性 Codex 用量重設，不是現金、API credits 或可轉移餘額。若帳戶有可用 reset，可在 **Settings → Usage** 的用量摘要中查看期限並手動套用。

使用 full banked reset 時，系統會刷新符合資格的 Codex 用量視窗，包括介面標示的 5 小時與每週視窗；它不會改變原定的每週重設日期。只有成功刷新至少一個符合資格的視窗時，reset 才會被消耗；若目前沒有可重設的用量，它會保留。

Banked reset 屬於活動權益，資格、數量、適用限制與到期日都可能不同，而且未來不保證再發放。不要根據社群貼文預設自己一定會收到；請以帳戶顯示為準。完整規則見 [OpenAI 的 banked Codex resets 說明](https://help.openai.com/en/articles/20001498-how-banked-codex-resets-work)。

![Codex 用量面板顯示可用重設時，使用者可自行確認並套用](reset-quota.png)

## 用 CodexBar 在選單列監控

[CodexBar](https://github.com/steipete/CodexBar) 是第三方開源工具，可在 macOS 選單列顯示 Codex、Claude Code 等服務的用量、重設時間與使用速度，適合同時管理多個 AI 工具的人。

![CodexBar 在選單列顯示 Codex 與 Claude 的用量比例及重設時間](codexbar-panel.jpg)

CodexBar 預設以裝置端解析為主，會依你啟用的資料來源讀取特定位置，例如 CLI 設定、已知的本機日誌、OAuth 狀態或瀏覽器 Cookie。瀏覽器 Cookie 匯入可能需要 macOS Keychain，Safari 資料來源也可能需要完整磁碟存取。

它不是 OpenAI 官方產品。安裝前請先閱讀專案的隱私與權限說明，採取最小權限原則：

- 優先使用你能理解的 CLI 或 OAuth 資料來源。
- 不需要瀏覽器資料時，關閉 Cookie 匯入或 Keychain 存取。
- 不要把 Cookie、token、設定檔或可讀取秘密的除錯截圖貼到公開 issue。
- 更新後若出現新的權限要求，先確認請求程式與用途再允許。

若只想確認官方數字，直接查看 **Settings → Usage** 或使用 **/status** 即可，不必另外安裝工具。

## 真正能節省 Codex 額度的做法

### 先縮小任務，再交給 Codex

不要一開始就要求讀完整個大型 repository。先指出目標模組、錯誤訊息、重現步驟與驗收條件，讓 Codex 少走探索支線。當問題尚未定位時，可先要求只做唯讀診斷，再決定是否實作。

### 控制上下文與輸出範圍

長對話會累積上下文。完成一個主題後，以清楚摘要開新工作階段，通常比讓無關歷史持續膨脹更有效。也應排除 build 產物、依賴目錄、大型媒體與與任務無關的檔案。

### 依任務選模型與推理強度

格式調整、單檔小改與明確測試修正，不一定需要最高成本的模型或推理設定。先用足以完成任務的選項；遇到跨模組設計、難以重現的錯誤或高風險變更，再提高模型能力或推理強度。

### 減少沒有資訊增量的重跑

反覆執行相同測試、重新讀取整個專案或要求多份近似答案，都會消耗額度。把驗證對準變更風險：先跑聚焦測試，確定修改穩定後再跑完整套件。

### 在使用 reset 或 Credits 前看兩個視窗

先看 5 小時與每週視窗各自剩餘多少，以及何時重設。如果短視窗即將恢復，等待可能比消耗一次 banked reset 更划算；若每週視窗已耗盡且工作有明確商業價值，再比較 reset、Credits、升級或延後工作的成本。

## 常見傳聞哪些不能當策略

以下說法沒有普遍適用的官方保證：

- **新模型發布一定會替所有人重設額度**。
- **服務當機後一定會發補償 reset 或 Credits**。
- **社群有人收到 reset，代表所有方案與地區都會收到**。
- **先把剩餘額度用光，就一定能在活動中多拿一輪**。

OpenAI 可能針對特定活動、方案、工作區或地區提供 reset，但每次資格與條件都可能不同。社群消息可以用來發現異常，不能取代官方公告、服務狀態頁與自己的 **Settings → Usage**。

## 快速決策表

| 你看到的狀況 | 優先處理方式 |
|---|---|
| 不確定還剩多少額度 | 開啟 **Settings → Usage**，或在 CLI 輸入 **/status** |
| 5 小時視窗快重設 | 優先等待，避免浪費 banked reset |
| 每週視窗耗盡 | 查看帳戶是否提供 reset、Credits、升級或等待選項 |
| Credits 消耗比預期快 | 檢查高用量任務、模型、上下文、推理與工具使用 |
| App 與 CLI 數字不同 | 確認帳戶與工作區，重新整理用量頁 |
| 社群宣稱全員補償 | 先查官方公告與自己的用量面板，不預先耗盡額度 |

## 結語

Codex 額度管理的核心不是猜下一次免費重設，而是隨時知道哪個視窗正在限制你，並讓每次高成本任務都有明確產出。先用 **Settings → Usage** 或 **/status** 查證，再依工作價值選擇等待、banked reset、Credits 或方案調整，會比追逐未證實的傳聞穩定得多。

如果你還在比較不同 AI 程式工具的定位，也可以接著閱讀 [AI coding 工具比較：Claude Code、Codex、Cursor 怎麼選？](/2026/05/06/AI-coding-%E5%B7%A5%E5%85%B7%E6%AF%94%E8%BC%83%EF%BC%9AClaude-Code%E3%80%81Codex%E3%80%81Cursor-%E6%80%8E%E9%BA%BC%E9%81%B8%EF%BC%9F/)。
