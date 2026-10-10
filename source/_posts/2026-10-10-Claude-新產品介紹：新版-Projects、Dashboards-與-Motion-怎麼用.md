---
title: Claude 新產品介紹：新版 Projects、Dashboards 與 Motion 怎麼用
date: 2026-10-10 20:24:21
updated: 2026-10-10 22:43:02
description: Claude 最近有哪些新產品？本文介紹新版 Projects 的雲端任務協調、Dashboards 資料儀表板與 Motion 動畫解說，整理支援方案、入門提示詞和使用限制，也說明 Docs、Slides、Design 正式開放及獨立 Design 站的遷移時程。
translation_key: claude-projects-dashboards-motion-guide
translations:
  zh-CN: /zh-cn/2026/10/10/claude-projects-dashboards-motion-guide/
  en: /en/2026/10/10/claude-projects-dashboards-motion-guide/
categories:
  - AI 科技
tags:
  - AI
  - Claude
  - Claude Code
  - Anthropic
---

![Claude 新版 Projects 協調工作、Dashboards 資料圖表與 Motion 動畫的概念插畫](cover.jpg)

**Claude 最近的新產品，值得留意的有新版 Projects、Dashboards 與 Motion。** Projects 在 9 月 17 日推出改版 Beta；Dashboards 和 Motion 則於 10 月 8 日登場。這幾項更新，把工作推進、資料分析和視覺說明放進了 Claude 的產品介面。[Projects 公告](https://claude.com/resources/articles/projects-redesigned) · [Dashboards 與 Motion 公告](https://claude.com/resources/articles/dashboards-and-motion)

本文依 **2026 年 10 月 10 日** 查到的官方公告與文件整理，尚未進行產品實測。以下把新版功能、開放範圍和適合先試的任務分開說明。

<!--more-->

## 先看用途與開放方案

| 產品 | 主要用途 | 目前開放範圍 |
| --- | --- | --- |
| 新版 Projects | 協調多項任務與工作分支，持續推進專案 | 部分 Claude Code Pro、Max 使用者，分批推出 Beta |
| Dashboards | 從連接的資料來源建立儀表板 | Pro、Max、Team、Enterprise，Beta |
| Motion | 把文字、圖表與圖片做成動畫解說 | Team、Enterprise，Beta |
| Docs、Slides、Design | 文件、簡報與設計作品 | 已結束 Beta，支援所有方案，含 Free |

新版 Projects 的資格依 [Projects 說明](https://support.claude.com/en/articles/9517075-what-are-projects)；其餘作品模板依 [Artifacts 方案表](https://support.claude.com/en/articles/17153992-what-are-artifacts-and-how-do-i-use-them)。Enterprise 的實際入口還受管理員設定影響。

![Claude 三項新產品用途圖解：Projects 推進任務、Dashboards 分析資料、Motion 製作動畫](products-overview.jpg)

*圖解 1：由要完成的工作選入口。Projects 是「目標 → 並行任務 → 審查」；Dashboards 是「資料 → 圖表 → 查核」；Motion 是「素材 → 動畫 → MP4」。*

## Projects：把一連串工作交給同一個專案

原本的 Projects 能集中聊天、知識檔案與專案指示；**新版增加了任務協調**。你在主對話交代目標，Claude 分配工作、協調並行任務，再整理結果。各個雲端工作分支會帶入專案資料、指示與記憶，產出的檔案集中在 **Library**。[原有與新版功能](https://support.claude.com/en/articles/9517075-what-are-projects)

![Claude Projects 任務協調圖：目標交給協調者，修復、測試與文件分支帶入共用背景，再整理成果供審查](projects-workflow.jpg)

*圖解 2：以一次遊戲更新為例，主對話協調修復、測試與文件三件工作。雲端分支帶入共用背景，成果回到審查與 Library；實際分工由任務決定。*

對做 App 或遊戲的人，我認為它最值得試的場景，是一次更新牽涉數件相關工作：修登入問題、補測試、整理上架說明。重點在於能否少花時間重複交代背景，並看清哪些成果等你檢查。

第一次可以先給一個小範圍的任務，例如：

> 這個專案的目標是改善新玩家第一次進入遊戲的流程。先找出教學介面最容易誤解的兩個步驟，提出修改建議，再補測試。先告訴我怎麼分工；程式變更整理成可供審查的 PR，合併前交給我確認。

有新版入口的人，可從 **claude.ai/code → Projects** 或桌面 App 的 **Code** 分頁建立專案、加入需要的儲存庫和檔案。雲端程式工作需要對應的 GitHub 存取權限；它也不會自動取得你電腦上的所有工具與設定。[建立與設定指南](https://code.claude.com/docs/en/claude-projects)

**雲端工作在闔上筆電後仍可繼續；改由本機執行的工作，則需要電腦保持喚醒與連線。** 並行修改若碰到相同程式，仍可能有合併衝突；多個工作同時跑也會更快消耗方案額度。我會先從一兩件小任務開始，確認成果與用量，再擴大範圍。[雲端與本機執行](https://code.claude.com/docs/en/remote-control) · [並行工作與用量](https://claude.com/resources/articles/projects-redesigned)

如果你只看到原本的聊天 Projects，不能據此認定已取得這次改版。官方目前仍標示新版分批開放，Team、Enterprise 尚未支援；原有 Projects 繼續運作。[目前可用性](https://code.claude.com/docs/en/claude-projects)

## Dashboards：讓每個數字都能回頭檢查

Claude Dashboards 可以連接 BigQuery、Snowflake 等資料平台，以及 Salesforce 等應用程式。你用自然語言提出問題，Claude 建立圖表；每張圖表能查看查詢與最後更新時間。[Dashboards 入門](https://support.claude.com/en/articles/17454700-get-started-with-claude-dashboards)

![Claude Dashboards 使用流程圖：連接資料並提出問題，建立圖表後檢查查詢與最後更新時間，再核對及分享](dashboards-workflow.jpg)

*圖解 3：資料與問題形成儀表板，接著檢查查詢與最後更新時間，核對統計口徑後再分享。圖中的圖表為流程示意。*

這對經營產品的人，最有用的起點是明確的小問題。例如「上個月付費用戶增加，主要來自哪個方案？」比「做一個漂亮的數據看板」更容易檢查結果。

> 使用已連接的訂閱資料，比較最近八週各方案的新增付費用戶與取消訂閱人數。列出採用的日期欄位、時區與計算定義，再建立每週趨勢圖。

**圖表漂亮，還是要檢查計算口徑。** 新增訂閱是否扣掉退款、取消訂閱按申請日還是到期日計算，都會影響解讀。我的建議是先拿一週已知資料核對，再把儀表板用進日常工作。

官方把它定位在快速探索問題，較深入的分析可轉往其他分析工具。連接器也沿用來源服務的存取權限，資料是否可讀仍取決於授權。[使用定位](https://support.claude.com/en/articles/17454700-get-started-with-claude-dashboards) · [連接器權限](https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities)

## Motion：把產品說明做成可修改的短動畫

Claude Motion 適合把更新亮點、功能操作或圖表變化做成短動畫。它以程式碼安排文字、圖形與圖片的動態，方便調整內容和節奏；目前不提供生成寫實影片或人物的功能。[Motion 入門](https://support.claude.com/en/articles/17454997-get-started-with-claude-motion)

![Claude Motion 四步驟圖解：準備素材、描述故事、修改動畫、匯出 MP4](motion-workflow.jpg)

*圖解 4：依序準備素材、說清楚故事、修改動畫，再匯出 MP4。先交代觀眾與預期長度，會比較容易把各段內容與節奏調整到位。*

如果要介紹遊戲新功能，我會先寫清楚觀眾與素材，再請它製作：

> 使用我附上的遊戲畫面，製作一段給新玩家看的 20 秒教學動畫。依序說明選擇關卡、開始挑戰、領取獎勵，每個畫面只呈現一個重點。保留素材中的按鈕名稱，讓玩家能對照遊戲介面。

可以從聊天輸入框的 **Output → Motion**，或 **Artifacts** 裡的 Motion 模板開始。完成後能下載 **MP4**；動畫內容也能透過對話或編輯器調整。[建立與匯出方式](https://support.claude.com/en/articles/17454997-get-started-with-claude-motion) · [作品編輯方式](https://support.claude.com/en/articles/17153992-what-are-artifacts-and-how-do-i-use-them)

Motion 會計入原方案額度，較長、較複雜的動畫用量也較高。先做一個短段落，確認資訊正確、節奏清楚，再延伸成完整介紹會比較容易掌握。[Motion 用量說明](https://support.claude.com/en/articles/17454997-get-started-with-claude-motion)

## Docs、Slides、Design 也有同步更新

10 月 8 日公告同時宣布 **Docs、Slides、Design 結束 Beta，開放所有方案**。Enterprise 的這三種模板預定 **10 月 15 日** 預設啟用；Dashboards、Motion 在 Enterprise 仍預設關閉，由管理員於 **Organization settings → Artifacts** 啟用。[官方公告](https://claude.com/resources/articles/dashboards-and-motion) · [管理員設定](https://support.claude.com/en/articles/16994751-artifacts-admin-guide-for-team-and-enterprise-plans)

既有 Claude Design 使用者還要留意：**獨立站 claude.ai/design 將於 2026 年 12 月 14 日關閉**。官方已提供設計系統遷移入口；專案暫時繼續留在獨立站，後續搬移方式尚待說明。聊天與留言不會隨之帶入，舊站公開專案連結也會失效，需要的內容應事先保存。[Design 遷移指南](https://support.claude.com/en/articles/17440474-migrate-from-standalone-claude-design-to-claude)

## 依照眼前的工作，選一項開始

- **一個開發目標持續衍生多件工作**：先試新版 Projects，觀察分工、成果審查與額度。
- **想釐清產品數據的變化**：先試 Dashboards，從一個有明確定義的指標開始。
- **需要讓玩家或同事快速看懂功能**：有 Team、Enterprise 方案的人可先試 Motion。

對獨立開發者，我最想先驗證的是 Projects 的協調效果：需求變動時，它能否維持一致的方向，成果是否容易檢查。Dashboards 與 Motion 則可以從既有的週報和產品說明切入，用一件熟悉的工作判斷它們省下多少整理時間。

想進一步比較程式開發工具，也可以看本站的 [Claude Code、Codex、Cursor 使用場景比較](/2026/05/06/AI-coding-工具比較：Claude-Code、Codex、Cursor-怎麼選？/)。
