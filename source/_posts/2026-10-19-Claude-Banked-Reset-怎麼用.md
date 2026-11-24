---
title: "Claude Banked Reset 怎麼用？免費額度重設券領取資格、步驟與限制"
date: 2026-10-19 16:30:00
updated: 2026-11-25 00:30:00
description: "Claude 免費額度重設（Banked Reset）怎麼拿與怎麼用？整理最新 Fable 5.2 重設資格（Max／Ultra 效期至 2027/3/8）、Settings → Usage 領取步驟、Claude Code 連動，以及與 Codex 重設的差異。"
permalink: 2026/10/19/claude-banked-reset-guide/
translation_key: claude-banked-reset-guide
translations:
  zh-CN: /zh-cn/2026/10/19/claude-banked-reset-guide/
  en: /en/2026/10/19/claude-banked-reset-guide/
categories:
  - AI 科技
tags:
  - Claude
  - Claude Code
  - Anthropic
  - AI 開發工具
---

![Claude banked reset 封面：環形用量表從耗盡重新補滿到 100%](cover.jpg)

**Claude 的 banked reset（官方稱 limit reset，社群常稱免費重設券），是 Anthropic 不定期發給訂閱者的「先存著、想用再用」額度重設權益。** 用網頁版 claude.ai 或 Claude Desktop 打開 **Settings → Usage**，在 **Resets** 區塊按 **Reset for free** 並確認，對應的五小時或每週額度就會立刻恢復。目前除了 2026 年 9 月隨 Opus 5.5 發放的那一波（已於 10 月到期）外，Anthropic 在 2026 年 11 月 9 日推出 Fable 5.2 時也再次發放 **Fable 重設**：Max、Ultra 與 Team 進階席位依訂閱時長可拿 1 到 3 次，效期一路到 **2027 年 3 月 8 日**。

實際可用次數與到期時間以你帳戶 **Settings → Usage** 頁面上顯示的為準，過期沒用就會失效。本文資料更新查核日為 2026 年 11 月 25 日。

<!--more-->

## 誰拿得到？最新重設資格一覽

Anthropic 會在重大模型發布時發放限時重設，截至 2026 年 11 月已有兩波主要發放紀錄：

| 方案 | 最新 Fable 5.2 重設（11/9 發放） | 過往 Opus 5.5 重設（9/22 發放） | 依據 |
| --- | --- | --- | --- |
| Max（5x、20x）、Ultra、Team 進階席位、舊版席位制 Enterprise 進階席位 | **1 到 3 次 Fable 重設**，依首次付費起算訂閱時長（未滿 6 個月 1 次、6–12 個月 2 次、超過 12 個月 3 次），**2027 年 3 月 8 日到期** | 已於 10 月 22 日到期 | [Fable 5.2 推出優惠說明](https://support.claude.com/zh-TW/articles/17506494) |
| Pro、Team 標準席位 | 11 月 9 日至 16 日推出期間提供 1 次（已於 11 月 16 日到期） | 已於 10 月 22 日到期 | 同上 |
| Free、自助式／用量計費／HIPAA Enterprise | 不適用 | 不適用 | 同上 |
| API（Claude Console） | 不適用（此為 claude.ai 訂閱用量權益，非 API 額度） | 不適用 | [官方 limit reset 說明](https://support.claude.com/en/articles/17007452-what-is-a-limit-reset) |

最簡單的確認方式：打開 **Settings → Usage**，有 **Resets** 區塊和 **Reset for free** 按鈕，就代表帳號裡還有可用次數。關於 Fable 5.2 的方案計費與重設細則（例如 Fable 重設會退回每週額度中花在 Fable 的用量，並補滿五小時額度），可延伸閱讀 [Claude Fable 5.2 是什麼？價格、評測與 Opus 5.5 差異完整分析](/2026/11/10/Claude-Fable-5-2-是什麼？價格、評測與-Opus-5-5-差異完整分析/)。

**注意：在使用前降級或取消訂閱，這次重設就會消失。**[官方說明](https://support.claude.com/en/articles/17007452-what-is-a-limit-reset)

## 使用步驟

1. 用**網頁版 claude.ai** 或 **Claude Desktop** 登入你的訂閱帳號。
2. 進入 **Settings → Usage**。
3. 在 **Resets** 區塊看卡片：這次重設的是**五小時額度**還是**每週額度**，以及到期日。
4. 按 **Reset for free**，再確認一次。

另一個入口：碰到用量上限時跳出的提示訊息，上面也有同一顆 **Reset for free** 按鈕。

使用前要知道三件事（皆出自[官方說明](https://support.claude.com/en/articles/17007452-what-is-a-limit-reset)）：

- **不必等到用完才能按**，但按下去就無法復原。
- **手機 App、終端機與 IDE 裡的 Claude Code 都沒有這顆按鈕**，只能在網頁版或桌面版操作。
- 重設不會退還已經被收費的超額用量（usage credits），也不會改變 credit 餘額。

## 會補回什麼？每週重設時間會變嗎？

| 問題 | 答案 |
| --- | --- |
| 補回哪個額度 | 依優惠內容，**五小時額度或每週額度其中之一**立刻回到滿格 |
| 每週重設時間會不會改 | **不會**，每週額度仍在原本固定的日期與時間重設 |
| 能不能留到以後 | 可以存著，但要在到期前用掉 |
| 已付的超額費用 | 不退還 |

因為每週週期不會被打亂，使用時機只要看一件事：**離下一次自動重設還有多久。** 如果每週額度明天就會自動恢復，現在按等於浪費；如果剛用完、離重設還有好幾天，又有工作要趕，這時按最划算。下一次重設時間同樣在 **Settings → Usage** 可以看到。

## 對 Claude Code 有什麼影響？

**Claude 的用量上限是整個帳號共用的。**官方寫明 claude.ai、Claude Code、Claude Desktop 的用量都算進同一個上限，IDE 擴充套件也一樣。[用量限制說明](https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work)、[Claude Code 搭配 Pro／Max](https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-or-max-plan)

所以在 Claude Code 裡碰到上限時，流程是：

1. 切到瀏覽器或 Claude Desktop，在 **Settings → Usage** 按 **Reset for free**。
2. 回到 Claude Code，輸入 **/usage** 看方案用量條是否已補滿。[Claude Code 文件](https://code.claude.com/docs/en/costs)
3. 繼續原本的工作。

如果手上沒有重設可用，Claude Code v2.1.234 之後可以等額度恢復後自動接續中斷的任務（部分情況會自動開始等待，也可從 **/rate-limit-options** 選擇）；有開 usage credits 的話，也可以用 **/usage-credits** 付費繼續。[Claude Code 文件](https://code.claude.com/docs/en/costs)

## 到期沒用會怎樣？之後還會發嗎？

- 沒用掉的重設會在優惠標示的時間**直接失效**，不會轉成其他額度或現金折抵。
- 平常的五小時與每週限制照常運作，不受影響。
- 官方把 limit reset 定義為「不定期提供給符合資格方案的優惠」，像 9 月 Opus 5.5 與 11 月 Fable 5.2 都有額外發放；之後若再發放，同樣會出現在 **Settings → Usage**，並標示各自的到期日。

## 平常的 Claude 額度什麼時候重設？

| 限制 | 重設方式 | 在哪裡看 |
| --- | --- | --- |
| 五小時 session 限制 | 從該次 session 開始算起，五小時後恢復 | **Settings → Usage**；Claude Code 用 **/usage** |
| 每週限制 | 每週在帳號被指定的**固定時間**重設，不因你何時開始使用而改變 | **Settings → Usage** 會顯示下一次重設時間 |
| Fable 用量計算 | Max、Ultra、Team 進階席位與其他模型共用每週額度；Pro 平常改扣 usage credits | 同上 |

資料來源：[Pro 方案說明](https://support.claude.com/en/articles/8325606-what-is-the-pro-plan)、[Claude Code 搭配 Pro／Max](https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-or-max-plan)、[Fable 5.2 推出優惠說明](https://support.claude.com/zh-TW/articles/17506494)。Opus 5.5 同時提高了 Pro、Max、Team 與席次制 Enterprise 的五小時上限，完整背景見本站的 [Claude Opus 5.5 上線解析](/2026/09/23/Claude-Opus-5-5-上線：AA-登頂、價格降幅與完整評測解析/)。

## 和 Codex banked reset 有什麼不同？

兩家都叫「banked reset」，但規則不一樣，不要混用：

| 項目 | Claude limit reset | OpenAI Codex banked reset |
| --- | --- | --- |
| 補回範圍 | 五小時**或**每週（Fable 重設會退回每週 Fable 用量並補滿五小時），依優惠而定 | full reset 會同時補回五小時與每週 |
| 每週重設時間 | **不變** | **會改變**，用完要回面板確認新的重設時間 |
| 在哪裡按 | 只有網頁版、Claude Desktop | Codex App、CLI、網頁的 **Settings → Usage** |
| 額度還沒用完時按下 | 可以按，按下即用掉、無法復原 | 至少補回一個視窗才會被扣掉 |
| 期限 | 以 **Settings → Usage** 標示為準（例如 Fable 重設至 2027/3/8） | 以帳戶顯示為準 |

Codex 部分依據 [OpenAI 官方說明](https://help.openai.com/en/articles/20001498-how-banked-codex-resets-work)。Codex 的額度查詢、Credits 與使用時機，請看 [Codex 額度用完怎麼辦？](/2026/06/18/claude-codex-quota-guide/)。
