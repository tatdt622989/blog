title: Claude Code vs Codex vs Cursor 比較：2026 年 10 月價格、模型與怎麼選
description: >-
  Claude Code vs Codex vs Cursor 怎麼選？2026 年 10 月比較：Claude Code 含在 Claude Pro $20 起，擅長深改
  repo；Codex 含在 ChatGPT Plus $20 起，可交辦雲端任務；Cursor 新方案用 Claude、GPT 需 Premium $30 並按 API 價計。
translation_key: ai-coding-tools-comparison
translations:
  en: /en/2026/05/06/claude-code-vs-codex-vs-cursor/
  zh-CN: /zh-cn/2026/05/06/claude-code-vs-codex-vs-cursor/
categories:
  - AI 科技
tags:
  - AI
  - OpenAI
  - Claude
  - Claude Code
  - Codex
  - Cursor
date: 2026-05-06 21:30:00
updated: 2026-10-19 16:00:00
---

![Claude Code、Codex、Cursor 三款 AI coding 工具比較封面](cover-v2.jpg)

**Claude Code vs Codex vs Cursor 直接結論**：要 AI 深入大型 repo 做重構、長鏈除錯，選 **Claude Code**（Claude Pro $20/月起）；已經付 ChatGPT、想把任務丟到本地或雲端跑完再驗收，選 **Codex**（ChatGPT Plus $20/月起，Free 也能試）；想留在編輯器裡邊看邊改，選 **Cursor**，但要注意 2026 年 10 月 12 日起新用戶改走 xAI 的 X Subscription，內含額度只涵蓋 Grok 與 Composer，用 Claude、GPT 要 Premium $30/月以上並按 API 牌價另計。

<!--more-->

## 2026 年 10 月更新：Claude Code、Codex、Cursor 比較表

以下價格、模型皆以 **2026 年 10 月 19 日**查詢的官方頁面為準（美元、月繳）。

| 比較項目 | Claude Code | Codex | Cursor |
| --- | --- | --- | --- |
| 開發商 | Anthropic | OpenAI | Anysphere（方案併入 xAI 的 X Subscription） |
| 免費版 | 無（Free 方案不含 Claude Code） | 有，Free / Go $8 可用 GPT-6 Luna | 有，限量 Grok / Composer |
| 入門付費 | Pro **$20**（年繳約 $17） | Plus **$20** | Plus **$8**（只能用 Grok 模型） |
| 進階 / 重度 | Max 5x **$100**、Max 20x **$200** | Pro **$100 / $200 / $500** | Premium **$30**、Super **$100**、Ultra **$200** |
| 主力模型 | Opus 5.5、Sonnet 5.5、Haiku 5.5；Fable 5.1 有額外限制 | GPT-6.1 Sol、GPT-6 Sol、GPT-6 Astra、GPT-6 Luna | Composer 2.5、Grok 4.7 內含；Claude / GPT / Gemini 按 API 價另計 |
| 用量計算 | 5 小時 session + 每週上限，與 Claude 聊天共用 | Plus 有 5 小時上限；Pro 目前無 5 小時上限 | 每週用量池，與 Grok app 共用 |
| 執行位置 | 終端機、VS Code / Cursor / JetBrains、桌面 app、網頁與手機 | 桌面 app、CLI、IDE 擴充、網頁、手機、Codex Cloud | 編輯器、CLI、Cloud Agents |
| 最適合 | 大型 repo、多檔重構、長鏈除錯 | 交辦完整任務、平行多任務、已付 ChatGPT | 高頻小改、UI 開發、要即時看 diff |

資料來源：[Claude 方案](https://claude.com/pricing)、[Codex 方案](https://learn.chatgpt.com/docs/pricing)、[Cursor 模型與計費](https://cursor.com/docs/models)、[xAI X Subscription 公告](https://x.ai/news/x-subscription)。

## Claude Code vs Codex：差在哪？

兩者都是能讀 repo、改多個檔案、跑指令的 coding agent，真正的差別在模型、計費與工作節奏。

| 比較項目 | Claude Code | Codex |
| --- | --- | --- |
| 訂閱門檻 | 至少 Claude Pro $20 | ChatGPT Free 就能試，Plus $20 才有 CLI、IDE、雲端整合 |
| 額度風險 | 與 Claude 網頁、桌面聊天**共用**額度 | Plus 依模型差很大，例如 GPT-6.1 Sol 每 5 小時約 15–160 則本地訊息 |
| 高階方案特色 | Max 可用 Fable 5.1（獨立週上限） | Pro $500 獨享 Ultrafast 高速模式 |
| 專案設定檔 | **CLAUDE.md**（也能讀 **AGENTS.md**） | **AGENTS.md** |
| 適合的節奏 | 在終端機陪 agent 一步步規劃、修改、驗證 | 把需求與驗收條件寫清楚，讓 agent 跑完再看 diff |

兩邊共同的坑：

- Claude Code 若偵測到 **ANTHROPIC_API_KEY** 並經你同意使用，會改走 API 計費，不扣訂閱額度。[Anthropic 說明](https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-or-max-plan)
- Codex 已於 **2026 年 10 月 14 日**讓 GPT-5.5 從 ChatGPT 登入的 Codex 退役，舊設定要改選 GPT-6 系列。[OpenAI 方案頁](https://learn.chatgpt.com/docs/pricing)
- ChatGPT Pro $200 不符合保留資格的新訂閱，額度低於先前的 Pro $200，升級前先看 [OpenAI Pro 方案說明](https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers)。

額度怎麼看、什麼時候重設，可參考 [Claude 與 Codex 額度指南](/2026/06/18/claude-codex-quota-guide/)；兩家最新模型的差異則見 [Claude Opus 5.5 評測整理](/2026/09/23/Claude-Opus-5-5-上線：AA-登頂、價格降幅與完整評測解析/) 與 [OpenAI DevDay 2026 總整理](/2026/09/30/OpenAI-DevDay-2026-總整理：Dots、Space、GPT-6-1-Sol-與-25-項更新/)。

## Codex vs Cursor：差在哪？

Cursor 是**編輯器優先**：補全、inline diff、Agent、手動編輯都在同一個畫面，適合每一步都要看、隨時微調。Codex 是**任務優先**：交代目標後讓 agent 在本地或 Codex Cloud 跑完，再回來審查。

| 比較項目 | Cursor | Codex |
| --- | --- | --- |
| 主要介面 | AI 編輯器（另有 CLI 與 Cloud Agents） | 桌面 app、CLI、IDE 擴充、網頁 |
| 內含模型 | Composer 2.5、Grok 4.7 | GPT-6.1 Sol 等 OpenAI 模型 |
| 用 GPT / Claude | 新方案需 Premium $30 以上，從第一個請求起按 API 牌價扣預付額度 | GPT 模型內含於方案；不能用 Claude |
| 雲端代理 / Code review | Premium 以上才有 Cloud Agents 與 Bugbot | Plus 起有雲端任務與自動 code review |
| 最低付費 | Plus $8（只能用 Grok） | Go $8（桌面 app 的 GPT-6 Luna） |

**10 月方案改版的影響**：如果你想在 Cursor 裡主力使用 GPT 或 Claude，新方案等於「月費 + API 用量」兩筆錢；同樣用 GPT，直接用 Codex 通常較省。已經在付 Cursor Pro / Pro+ / Ultra 的人，官方表示**不轉換就維持原方案、價格與功能**，但轉換到 X Subscription 後**無法復原**。[Cursor 官方說明](https://cursor.com/help/the-x-subscription/overview)

## Claude Code vs Cursor：可以一起用嗎？

可以，而且很常見。Claude Code 官方提供 VS Code 擴充，同樣能裝在 Cursor 裡，用 Claude 訂閱額度在 Cursor 編輯器內跑 Claude Code，不必透過 Cursor 的第三方模型付 API 價。[Claude Code 官方文件](https://code.claude.com/docs/en/overview)

常見分工：Cursor 負責補全與小改，Claude Code 負責重構、除錯這類需要長時間推理的任務。兩個 agent 同時改同一批未提交檔案容易衝突，建議用 git worktree 隔開。

## 各工具方案重點

### Claude Code

| 方案 | 月費 | 重點 |
| --- | --- | --- |
| Pro | **<span style="color:#c13232">$20</span>** | 含 Claude Code；Opus、Sonnet、Haiku 可用，Fable 需用 usage credits |
| Max 5x | **<span style="color:#c13232">$100</span>** | Pro 的 5 倍用量；Max 的 Fable 有獨立週上限 |
| Max 20x | **<span style="color:#c13232">$200</span>** | Pro 的 20 倍用量 |

Pro 與 Max 都有 5 小時 session 與每週上限，Claude、Claude Code 與 IDE 內使用全部共用。撞到上限後可開啟 usage credits 繼續用。[Max 方案說明](https://support.claude.com/en/articles/11049741-what-is-the-max-plan)

### Codex

| 方案 | 月費 | 重點 |
| --- | --- | --- |
| Free / Go | **<span style="color:#c13232">$0 / $8</span>** | 桌面 app 的 GPT-6 Luna，適合短小任務 |
| Plus | **<span style="color:#c13232">$20</span>** | 網頁、CLI、IDE、iOS；GPT-6.1 Sol 與 GPT-6 Luna；可加購 credits |
| Pro | **<span style="color:#c13232">$100 / $200 / $500</span>** | 目前無 5 小時上限；$500 獨享 Ultrafast |
| Business | **<span style="color:#c13232">$25/人</span>**（年繳 $20） | 雲端任務用較大 VM、SSO、預設不拿資料訓練 |

實際用量看 **Settings → Usage** 或 CLI 的 **/status**。

### Cursor（X Subscription）

| 方案 | 月費 | 重點 |
| --- | --- | --- |
| Free | **<span style="color:#c13232">$0</span>** | 限量 Agent 與 Chat |
| Plus | **<span style="color:#c13232">$8</span>** | 只能用 Grok 模型，無 Cloud Agents、Bugbot |
| Premium | **<span style="color:#c13232">$30</span>** | Plus 的 4 倍用量；Cloud Agents、Bugbot、第三方模型（按 API 價） |
| Super | **<span style="color:#c13232">$100</span>** | Plus 的 15 倍用量，尖峰優先存取 |
| Ultra | **<span style="color:#c13232">$200</span>** | Plus 的 50 倍用量 |

用量池每週重設，並與 Grok app 共用。[Cursor 方案頁](https://cursor.com/pricing)

## 依情境怎麼選

| 你的情況 | 建議 |
| --- | --- |
| 已經有 ChatGPT Plus，想先試 AI coding | **先用 Codex**，零額外成本 |
| 大型 repo、多檔重構、長鏈除錯是日常 | **Claude Code**，正式專案建議 Max 5x 起 |
| 主要是邊寫邊改、UI 調整，習慣看 inline diff | **Cursor Premium**，或 Cursor 免費版 + Claude Code 擴充 |
| 想在 Cursor 裡主力用 GPT / Claude | 先算 API 用量；常用 GPT 的話直接訂 **Codex** 通常較划算 |
| 常離開電腦，想從手機或網頁交辦背景任務 | **Codex Cloud** 或 **Claude Code 網頁版** |
| 每天高強度、平行開多個任務 | **Claude Max 20x** 或 **ChatGPT Pro** |

想看每美元能換多少 API 等值用量，可對照 [2026 年 9 月 AI 寫程式訂閱方案比較](/2026/09/14/ai-coding-tools-subscription-comparison/)；Codex 額度一直被重置的背景，見 [OpenAI 為什麼不停重置 Codex 額度](/2026/07/13/OpenAI-為什麼不停重置-Codex-額度/)。

## 參考資料

- [Anthropic：Claude 方案與價格](https://claude.com/pricing)
- [Anthropic：Use Claude Code with your Pro or Max plan](https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-or-max-plan)
- [Anthropic：What is the Max plan](https://support.claude.com/en/articles/11049741-what-is-the-max-plan)
- [Anthropic：Claude Code 文件](https://code.claude.com/docs/en/overview)
- [Anthropic：Models overview](https://platform.claude.com/docs/en/about-claude/models/overview)
- [OpenAI：Codex 方案與價格](https://learn.chatgpt.com/docs/pricing)
- [OpenAI：About ChatGPT Pro tiers](https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers)
- [OpenAI：Codex Cloud](https://learn.chatgpt.com/docs/cloud)
- [Cursor：Pricing](https://cursor.com/pricing)
- [Cursor：Models](https://cursor.com/docs/models)
- [Cursor：The X Subscription](https://cursor.com/help/the-x-subscription/overview)
- [xAI：Introducing The X Subscription](https://x.ai/news/x-subscription)
