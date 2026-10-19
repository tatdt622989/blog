title: "Codex 5 小時限制與額度查詢：重置時間、用完怎麼辦"
description: "Codex 額度到官方用量面板或 CLI 的 /status 查詢。Plus 與 Business 有 5 小時與每週限制，Pro 目前沒有 5 小時上限，重置時間以面板為準。用完可等待、套用 banked reset 或改用 Credits。"
translation_key: claude-codex-usage-limits
translations:
  en: /en/2026/06/18/claude-codex-usage-limits-guide/
  zh-CN: /zh-cn/2026/06/18/claude-codex-usage-limits-guide/
categories:
  - AI 科技
tags:
  - AI
  - Codex
  - Claude
date: 2026-06-18 14:34:36
updated: "2026-10-19 16:00:00"
---

![Codex 額度與用量管理指南封面](cover.webp)

**Codex 剩餘額度與重置時間，到 [官方用量面板](https://chatgpt.com/codex/settings/usage) 或在 Codex CLI 輸入 /status 查詢。** Plus 與 Standard Business 有 5 小時與每週兩個視窗；Pro 目前沒有 5 小時上限，但每週限制仍可能適用。額度何時恢復，以面板上該視窗顯示的時間為準，不是從報錯當下倒數五小時。用完時有三條路：等自動重置、套用 banked reset，或使用 Credits。

<!--more-->

## Codex 額度在哪裡查？

| 查詢方式 | 能看到什麼 |
| --- | --- |
| **Codex App / 網頁：Settings → Usage**（[直接開啟](https://chatgpt.com/codex/settings/usage)） | 各視窗使用比例、重置時間、Credits 餘額；有可用 banked reset 時會出現 **1 reset available** 或 **Full reset** |
| **Codex CLI：/status** | 目前工作階段的帳戶與剩餘額度 |

[OpenAI 官方定價頁](https://learn.chatgpt.com/docs/pricing#where-can-i-see-my-current-usage-limits)也以這兩處為查詢入口。App、網頁與 CLI 數字不同時，先確認登入的是同一個帳戶與工作區，再重新整理面板。不要拿別人的截圖推算自己的額度。

## Codex 5 小時限制怎麼算？各方案差異

依 [OpenAI 定價頁](https://learn.chatgpt.com/docs/pricing#what-are-the-usage-limits-for-my-plan)（2026 年 10 月 19 日查核）：

| 方案 | 5 小時限制 | 每週限制 |
| --- | --- | --- |
| Plus、Standard Business | 有，見下表估計值 | 可能適用 |
| Pro（$100 / $200 / $500 每月） | **目前沒有** | 可能適用，官方未公布數字 |
| Enterprise / Edu（彈性計價） | 無固定限制，依 Credits 計費 | 無固定限制 |
| Enterprise / Edu（非彈性計價） | 多數功能與 Plus 相同 | 同 Plus |

Plus 與 Standard Business 每 5 小時的本機訊息估計值：

| 模型 | 每 5 小時本機訊息 |
| --- | --- |
| GPT-6 Luna | 350–3,000 |
| GPT-6 Sol | 15–150 |
| GPT-6.1 Sol | 15–160 |
| GPT-6 Astra | 5–45 |

官方強調這些**不是固定的訊息上限**。範圍差這麼大，是因為消耗取決於模型、推理強度、上下文大小、讀取的檔案數、工具呼叫與任務長度；雲端任務通常比本機任務更耗額度。各模型的定位與價格可參考 [GPT-6 Sol、Luna 評分與選型](/2026/09/23/GPT-6-Sol%E3%80%81Luna-%E4%B8%8A%E7%B7%9A%EF%BC%9AArtificial-Analysis-%E8%A9%95%E5%88%86%E3%80%81%E5%83%B9%E6%A0%BC%E8%88%87%E9%81%B8%E5%9E%8B/)。

另外兩點：

- 方案支援時，Codex、ChatGPT Work、ChatGPT for Excel 與 Workspace Agents **共用同一份 agentic 額度與 Credits**；一般 ChatGPT 的圖片、語音等限制則另外計算。
- 進行中的回合碰到上限，官方說明 agent **仍可把這一輪做完**，不會立刻中斷。

### 為什麼等了五小時，Codex 還是不能用？

通常是**每週額度也用完了**：5 小時視窗恢復，不代表每週視窗恢復。依序核對登入的帳戶與工作區、面板上耗盡的是哪個視窗、該視窗顯示的重置時間。若是每週視窗耗盡，就只能等每週重置、套用 banked reset 或使用 Credits。

## Codex 重置時間：自動重置與 banked reset

| 類型 | 怎麼發生 | 重點 |
| --- | --- | --- |
| 自動重置 | 視窗到期自動恢復 | 時間以面板顯示為準 |
| 全域重置 | OpenAI 直接套用到符合資格的帳戶 | 立即生效，無法保留，不會變成 banked reset |
| Banked reset | 存在帳戶裡，由你在 **Settings → Usage** 手動套用 | Full reset **會改變每週重置日** |

依 [OpenAI 官方說明](https://help.openai.com/en/articles/20001498-how-banked-codex-resets-work)：

- **Full banked reset 會同時補滿 5 小時與每週視窗，並把每週重置日改到新的約七天週期。** 用完後請到面板核對新時間。
- 只有在確實刷新至少一個視窗時才會扣掉；沒有東西可重置，reset 會保留。
- 它不是購買的 Credits，也不會永久提高方案上限。
- 每個 reset 有自己的到期日，以面板或活動視窗顯示為準。不要把某次活動的 30 天期限套到所有 reset 上。

**什麼時候該用？** 比較三件事：距離自動重置還有多久、reset 還剩幾天有效、近期工作量。例如原本週一就會恢復每週額度，週日套用 reset 後，週一不會再恢復，新週期從週日重算；工作能等到週一就先保留。若 reset 快到期，就排在到期前原本就要做的工作上。

![使用 banked reset 前，先確認到期日；使用後再核對新的每週重設時間](reset-quota.png)

我也會在 X 和 Reddit 追蹤 OpenAI 與 Codex 團隊成員的發文：**看到預告即將全域重置，就把開發、測試或程式碼審查提前到重置前做完**，避免上一輪額度白白浪費。OpenAI 頻繁重置額度的背景，可參考 [OpenAI 為什麼不停重置 Codex 額度？](/2026/07/13/OpenAI-%E7%82%BA%E4%BB%80%E9%BA%BC%E4%B8%8D%E5%81%9C%E9%87%8D%E7%BD%AE-Codex-%E9%A1%8D%E5%BA%A6/)

## Codex 與 Claude 的 banked reset 不一樣

兩家都有可保留、手動套用的重置，但規則不同，同時訂閱時要分開記：

| | Codex banked reset | Claude 限額重置（Reset for free） |
| --- | --- | --- |
| 補回什麼 | Full reset 同時補滿 5 小時與每週 | 依該次重置，只補 5 小時**或**每週其中一項 |
| 每週重置日 | 改成新的七天週期 | **不變**，仍在原本的固定時間 |
| 在哪裡套用 | Codex App、CLI 或網頁的 **Settings → Usage** | 網頁或 Claude Desktop 的 **Settings → Usage**；Claude Code 終端機與 IDE 內沒有按鈕 |

Claude 的規則見 [Anthropic 官方說明](https://support.claude.com/en/articles/17007452-what-is-a-limit-reset)；完整用法與使用時機，請看 [Claude banked reset 怎麼用？](/2026/10/19/claude-banked-reset-guide/)。

## Credits 是什麼？

Credits 是方案內含額度用完後，讓支援功能繼續執行的按量付費額度：**先扣方案額度，達到上限後才扣 Credits。** 依 [OpenAI 定價頁](https://learn.chatgpt.com/docs/pricing)，Plus 與 Pro 可加購 Credits，Business、Edu 與 Enterprise 的彈性計價工作區則購買工作區 Credits。

- Credits 和 API 額度是兩回事，也不會提高方案上限。
- 開啟自動加值時，若餘額已低於門檻，可能立即扣款。
- 購買的 Credits 通常不可退款且有期限，下單前看清畫面上的條款。

細節見 [OpenAI Credits 說明](https://help.openai.com/en/articles/12642688-using-credits-for-flexible-usage-in-chatgpt-personal-plans)。若在考慮升級方案，可對照 [AI 寫程式工具訂閱方案比較](/2026/09/14/ai-coding-tools-subscription-comparison/)。

## Codex 額度用完：等待、重置還是 Credits？

| 狀況 | 建議 | 決定前要看 |
| --- | --- | --- |
| 工作能等到自動恢復 | 等待，保留 reset 與 Credits | 恢復時間是否趕得上期限 |
| 不能等，且有未到期的 banked reset | 套用 reset | reset 到期日、原本的恢復時間，以及新的七天週期 |
| 不能等，沒有 reset 或想保留原本週期 | 使用 Credits | 價格、餘額與預算；不划算就調整時程 |

Reset 會改變下週的重置時間，Credits 則是額外付費，兩者要分開比較。

## 節省 Codex 額度的做法

- **任務寫清楚完成條件。**「檢查整個專案順便優化」沒有終點。改成：「修正手機版選單打開後無法關閉。重現：390px 寬度打開選單再點背景；預期選單關閉，桌面版不受影響。先查選單元件與點擊事件，完成後驗證這兩個操作並回報，其他版面調整下次再做。」這是任務範例，不是節省比例的實測。
- **一個主題一個工作階段。** 長對話會累積上下文，做完一件事就帶著摘要開新階段；排除 build 產物、依賴目錄與大型媒體。
- **依任務選模型與推理強度。** 格式調整、單檔小改用較輕的模型；跨模組設計或難重現的錯誤再提高。
- **少做沒有新資訊的重跑。** 先跑聚焦測試，修改穩定後再跑完整套件。

## 用 CodexBar 在選單列監控

[CodexBar](https://github.com/steipete/CodexBar) 是第三方開源 macOS 選單列工具，可同時顯示 Codex、Claude Code 等服務的用量與重置倒數。

![CodexBar 在選單列顯示 Codex 與 Claude 的用量比例及重設時間](codexbar-panel.jpg)

它預設在本機解析，視你啟用的資料來源讀取 CLI 設定、本機日誌、OAuth 狀態或瀏覽器 Cookie；Cookie 匯入可能需要 Keychain 權限。它不是 OpenAI 或 Anthropic 官方產品，建議只開必要的資料來源，也不要把含 Cookie 或 token 的截圖貼到公開 issue。只想看官方數字，用 **Settings → Usage** 或 **/status** 就夠了。

還在比較各家工具定位，可以接著看 [AI coding 工具比較：Claude Code、Codex、Cursor 怎麼選？](/2026/05/06/AI-coding-%E5%B7%A5%E5%85%B7%E6%AF%94%E8%BC%83%EF%BC%9AClaude-Code%E3%80%81Codex%E3%80%81Cursor-%E6%80%8E%E9%BA%BC%E9%81%B8%EF%BC%9F/)。
