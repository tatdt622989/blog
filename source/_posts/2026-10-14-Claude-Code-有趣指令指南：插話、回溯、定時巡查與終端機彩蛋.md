---
title: "Claude Code 有趣指令指南：插話、回溯、定時巡查與終端機彩蛋"
description: "Claude Code 有哪些有趣指令？從插話、回溯與對話分支，到使用報告、定時巡查、語音輸入及電台彩蛋，本文用可複製範例介紹操作方式，也整理遠端控制的使用條件、指令別名與舊版教學差異，幫你挑出適合日常開發的功能。"
date: 2026-10-14 11:38:45
updated: 2026-10-14 15:48:20
translation_key: claude-code-fun-commands
translations:
  zh-CN: /zh-cn/2026/10/14/claude-code-fun-commands/
  en: /en/2026/10/14/claude-code-fun-commands/
categories:
  - AI 科技
tags:
  - Claude
  - Claude Code
  - AI 開發工具
---

![Claude Code 終端機指令搭配對話分支、回溯、定時巡查與電台的插圖](cover.jpg)

Claude Code 有哪些有趣指令？除了請它修 Bug、寫程式，你還能臨時插話、替對話開分支、回到先前狀態，甚至開一台寫程式時聽的電台。

這篇從實際使用情境出發，整理值得試試看的斜線指令與可複製範例。想先玩三個，可以從 **/btw、/rewind、/radio** 開始：分別解決「突然想到一個問題」、「這個方向想重來」與「想換個工作氣氛」。

<!--more-->

## 先分清楚：指令要輸入在哪裡？

先在專案資料夾的終端機啟動 Claude Code：

```bash
claude
```

進入對話後，再輸入本文的 **/btw**、**/loop** 等指令；不要直接把它們貼到一般 Shell。輸入 **/** 可瀏覽可用項目，**/help** 可查看說明。

同一份選單可能包含內建指令、官方隨附 Skills，以及你安裝的外掛。功能也會受版本、平台、登入方式與方案影響。本文依 **2026 年 10 月 14 日查核的官方文件**撰寫，範例是操作示範，沒有逐項實機測試。可用項目以你的介面為準。[官方指令參考](https://code.claude.com/docs/en/commands)

## /btw：工作進行中，順便問一句

Claude 正在改登入流程，你突然忘了前面決定採用哪個驗證方式。這時可以問：

```text
/btw 剛才我們為什麼選擇 Cookie，而沒有用 localStorage 存登入狀態？
```

**/btw** 會用獨立的小視窗回答，不打斷主線工作，也不把這段問答加入主要對話歷史。很適合回顧剛才的決策、確認名詞或找回 Claude 已讀過的資訊。

它**沒有工具權限**，只能依現有上下文回答。要它搜尋最新資料、開啟尚未讀過的檔案或修改程式，請回到正常對話提出要求。[官方插話說明](https://code.claude.com/docs/en/interactive-mode#side-questions-with-btw)

## /rewind：把失敗的嘗試退回檢查點

一次重構改得太遠，想回到「開始拆元件以前」？輸入：

```text
/rewind
```

選擇先前的訊息，再依選單決定要復原對話、程式碼，或兩者一起復原。選單也提供摘要操作，適合保留目前檔案、只整理對話上下文。輸入欄空白時，連按兩次 **Esc** 也能開啟回溯選單。

把它當成短期嘗試的復原工具就好：**透過 Bash 修改的檔案不在檢查點追蹤範圍內**，部署、資料庫寫入等外部操作也不能靠對話回溯撤銷。重要修改仍要保留 Git 紀錄。[官方檢查點說明](https://code.claude.com/docs/en/checkpointing)

## /branch：替同一個問題開出另一條思路

你已經討論完購物車設計，想比較另一種狀態管理方式，但也想保留原本的討論。可以先替目前工作階段命名，再開對話分支：

```text
/rename cart-original
/branch cart-alternative
```

接著在新分支提出另一種方案，之後用 **/resume** 找回原本的對話。這很適合比較架構、文章切角或除錯假設。

**對話分支不等於 Git 分支，也不會替你隔離檔案修改。** 如果兩條路線都要動程式，請另外安排 Git 分支與 worktree。想保留目前對話、讓副本在背景工作，則是 **/fork**；它的行為曾隨版本調整，先確認自己的版本。[官方工作階段管理說明](https://code.claude.com/docs/en/sessions)

## /context 與 /compact：看看對話的背包裝了什麼

聊得很久以後，先用 **/context** 查看上下文占用，再用 **/compact** 摘要對話、釋放空間。你可以指定摘要要保留的重點：

```text
/context
/compact 保留目前目標、不能改動的檔案、已確認的原因與下一步；省略重複測試輸出。
```

這組特別適合長時間除錯。比起把所有日誌一直帶著走，讓摘要保留決策與待辦，更容易接續工作。摘要會省略細節；不能遺失的規格，仍應寫進專案文件。[官方上下文與摘要指令](https://code.claude.com/docs/en/commands)

## /insights：請 Claude 分析你怎麼使用 Claude

想知道自己常把時間花在哪些專案，或哪些溝通方式容易讓任務卡住，可以執行：

```text
/insights
```

它會分析這台電腦上的近期工作階段，產生一份 HTML 使用報告，整理工作模式、常見摩擦與改善建議。最新報告放在 **~/.claude/usage-data/report.html**。

要查額度與使用統計，則用 **/usage**。目前官方將 **/cost** 與 **/stats** 列為它的別名，**/stats** 會開啟統計分頁。也要留意：**/insights 的分析會消耗方案或 API 用量**，而且不包含其他裝置上的所有對話。[官方使用報告與用量說明](https://code.claude.com/docs/en/costs#analyze-your-usage-patterns)

## /loop：交給 Claude 定時巡查

等待 CI 結果時，一直手動重新整理很煩。可以指定間隔與要檢查的事情：

```text
/loop 5m 檢查目前分支的 CI 狀態。只有狀態改變或需要我處理時才回報，維持唯讀。
```

這是「每隔一段時間再執行提示詞」的用法。想取消時，直接請 Claude 列出排程並刪除對應任務即可。

**/loop 的任務要在 Claude Code 執行中且空閒時才會觸發**，也會消耗用量。它適合工作期間的巡查；需要長期排程時，應另外評估官方雲端 Routines 或桌面排程。上述範例刻意附上間隔、任務與唯讀條件，讓巡查範圍清楚；新版裸跑 **/loop** 可能使用內建維護提示詞。[官方排程說明](https://code.claude.com/docs/en/scheduled-tasks)

## /remote-control 與 /voice：離開鍵盤，也能接續工作

### /remote-control：用手機接上本機工作階段

在目前對話輸入 **/remote-control**，依介面完成連線後，就能從 Claude 手機 App 或瀏覽器接續這個本機工作階段。

程式仍在你的電腦上執行，因此**電腦必須開著，Claude Code 也必須繼續執行**。它需要符合條件的 Claude 訂閱登入；API 金鑰登入不支援，Team 與 Enterprise 也可能需要管理員啟用。[官方遠端控制說明](https://code.claude.com/docs/en/remote-control)

### /voice：把想到的需求直接說出來

輸入 **/voice** 可切換語音輸入，**/voice hold** 與 **/voice tap** 可選擇按住錄音或點按切換。預設按住 **Space** 說話，放開後將辨識文字放入輸入欄。

很適合先口述「這個流程哪裡怪怪的」，再用鍵盤補上檔案名稱。這是**語音轉文字**；送出前仍可修改內容。功能需要 Claude.ai 帳戶與本機麥克風，錄音會送至 Anthropic 伺服器辨識。[官方語音輸入說明](https://code.claude.com/docs/en/voice-dictation)

## 換個氣氛：顏色、電台、互動教學與貼紙

這幾個最有「原來還有這招」的感覺：

| 指令 | 可以做什麼 |
| --- | --- |
| **/color purple** | 把目前工作階段的提示列換成紫色 |
| **/theme** | 打開佈景主題選單 |
| **/radio** | 在瀏覽器開啟 Claude FM 的 lo-fi 電台 |
| **/powerup** | 用短篇互動教學與動畫認識功能 |
| **/stickers** | 進入 Claude Code 貼紙訂購功能 |

開多個終端機時，我會優先試不同提示列顏色，讓工作階段容易辨識；寫文件時可以試試電台。**/stickers** 涉及訂購，價格與寄送條件請看當下頁面。[官方指令清單](https://code.claude.com/docs/en/commands)

## /copy 與 /export：把好答案帶走

Claude 整理出一段好用的說明後，**/copy** 可以複製最近的回答；**/export** 則能匯出目前對話。

```text
/copy
/export session-notes.txt
```

前者適合搬走一段文字，後者適合留下完整討論紀錄。匯出前看一下內容是否含有私人資料或專案敏感資訊。[官方匯出與複製指令](https://code.claude.com/docs/en/commands)

## 怎麼搭配，才會每天都用得到？

不用一次記住整張選單。可以先挑一條符合自己工作的組合：

- **想比較方案：/plan → /branch。** 先把設計討論清楚，再試另一條思路；需要實作時另安排檔案隔離。
- **長時間除錯：/btw → /context → /compact。** 小問題順便問，對話太滿時保留關鍵資訊。
- **等待 CI：/loop 5m 搭配明確的唯讀提示。** 把檢查頻率、回報條件與停止方式說清楚。
- **整理經驗：/insights → /copy。** 看完使用報告，再把要調整的工作習慣整理成短筆記。

最值得養成的習慣，是知道何時插話、何時收束對話，以及何時保留一條可以回來的路線。

## 為什麼別人的指令，在我這裡找不到？

先用 **/status** 看版本與登入狀態，再比對官方文件。有些功能受方案、平台或外掛影響，部分指令也不會顯示在選單裡。

另外，**/vim 已在 v2.1.92 移除**，目前要到 **/config → Editor mode** 切換 Vim 編輯模式。看到舊教學列出 **/vim**，或把 **/cost、/stats、/usage** 當成完全獨立的三套功能，記得再核對目前文件。[官方指令參考](https://code.claude.com/docs/en/commands)、[Vim 編輯模式](https://code.claude.com/docs/en/interactive-mode#vim-editor-mode)

如果你已經開始同時開多個工作階段，可以接著讀本站的 [Claude Code 跨 Session 傳訊息指南](/2026/08/09/Claude-Code-跨工作階段訊息：讓不同-Session-互相傳話的完整用法/)，把命名、分工與交接串起來。
