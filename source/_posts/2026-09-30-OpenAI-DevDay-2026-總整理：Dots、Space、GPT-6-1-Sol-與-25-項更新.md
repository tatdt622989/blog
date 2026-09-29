---
title: "OpenAI DevDay 2026 總整理：Dots、Space、GPT-6.1 Sol 與 25 項更新"
date: 2026-09-30 01:52:47
updated: 2026-09-30 01:52:47
description: "OpenAI DevDay 2026 發表總整理，解析 Dots 個人代理、ChatGPT Space、GPT-6.1 Sol、Ultrafast、Decisions API 與 Codex Cloud，附 25 項更新索引、API 價格及預覽與推出狀態。"
translation_key: openai-devday-2026-announcements
translations:
  zh-CN: "/zh-cn/2026/09/30/openai-devday-2026-announcements/"
  en: "/en/2026/09/30/openai-devday-2026-announcements/"
categories:
- AI 工具
tags:
- OpenAI
- DevDay
- ChatGPT
- Codex
- GPT-6.1 Sol
---
![Dots 個人 AI 代理與 GPT-6.1 Sol 新模型概念封面](cover.jpg)

OpenAI DevDay 2026 把個人代理、團隊文件與開發工具串在一起：**dots 接手持續性工作，ChatGPT Space 保存共同脈絡，GPT-6.1 Sol 與 Ultrafast 則分別處理能力、成本與等待時間。** 這篇整理官方目前列出的 25 項發表，先看新產品，再拆解開發者最關心的 API 與方案差異。

<!--more-->

**資料整理日期：2026 年 9 月 30 日，台灣時間。** 本文依發表期間已公開的官方公告與文件整理；已推出、限量預覽與後續推出分開說明，實際開放仍受方案、地區與管理員設定影響。

## Dots：把工作交給持續運作的個人代理

Dots 是這次最容易改變日常使用方式的產品：你可以交付一項持續性的責任，而不只是逐次問問題。官方產品頁明確表示，**dots 由 GPT-6 Astra 驅動**，從 ChatGPT 桌面版建立。這點值得和同場推出的 Sol 分開看，不能因為兩者同時發表，就認為 dots 預設使用新 Sol。[Dots 官方介紹](https://chatgpt.com/features/dots/)

我的理解是，個人代理的價值要看「隔天是否還能接著做」。例如追蹤一份專案資料，真正有幫助的成果是持續更新、保留脈絡，並把需要你決定的地方交回來。這也是觀察 dots 時，比單次示範更值得注意的方向。

## GPT-6.1 Sol：接近 Astra 的能力與較低成本

OpenAI 將 GPT-6.1 Sol 定位為程式開發、電腦操作與專業工作的升級，宣稱在多項評測接近 Astra。**這是官方評測結論，不是本文的實測結果**，也不代表每一類任務都能取代 Astra。[模型公告](https://openai.com/index/introducing-gpt-6-1-sol/)

| 標準 API 項目 | 每百萬 tokens 費用 |
|---|---:|
| 輸入 | US$2 |
| 快取輸入 | US$0.10 |
| 輸出 | US$10 |

API 名稱為 **gpt-6.1-sol**，支援約 105 萬 tokens 上下文、最高 12.8 萬 tokens 輸出。超過 272K 輸入的長上下文請求另有較高費率，不能直接用表中標準單價估算所有工作。[模型規格與計價](https://developers.openai.com/api/docs/models/gpt-6.1-sol)

開發者還要注意：工具呼叫使用 Responses API；推理強度支援 low、medium、high、xhigh、max，沒有 none 或 minimal。模型目前開放給 Plus、Pro、Business、Enterprise、Edu 的 **ChatGPT Work 與 Codex**，公告特別註明尚未進入一般 Chat。

## Ultrafast 與 Pro 500：速度和額度分開看

Ultrafast 是推論服務層級。API 可指定 `service_tier: "ultrafast"`；對需要反覆呼叫工具的工作，官方建議使用持續的 WebSocket 連線降低往返負擔。它目前支援美國資料落地與全球處理，不支援其他區域端點。[Ultrafast 文件](https://developers.openai.com/api/docs/guides/ultrafast-mode)

本次宣布先提供 Astra Ultrafast，**GPT-6.1 Sol Ultrafast 尚待推出**。速度宣稱指 token 生成，不能直接當成整個專案完成速度。

新 **Pro 500 為每月 US$500**。在個人 Pro 方案中，只有 Pro 500 包含 Ultrafast；Pro 100、Pro 200 即使加購 credits，發表時也不會因此解鎖。使用量會先扣方案額度，再使用 credit 餘額。[Pro 方案說明](https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers)

## ChatGPT Space、Pages 與協作簡報

Space 是團隊工作的共同空間。Pages 可以讓同事即時編輯、留言，再請 ChatGPT 或 dot 接續處理；官方也將連接工具的資料更新納入使用情境。這讓文件更像一份會持續演進的工作成果。[Space 官方介紹](https://chatgpt.com/features/space/)

Space 開放 Pro、Business、Enterprise。**協作簡報與試算表仍標示 coming soon**，不能把產品頁展示的所有格式都當成今日已能使用。

對團隊而言，我會先觀察一件事：資料修改後，其他人與 agent 能否容易辨認最新版，以及誰負責下一步。共編功能只有和清楚的任務交接結合，才會減少重複溝通。

## Codex Harness、Cloud 與 Agents API 怎麼分

**Harness 可以理解為讓模型持續工作的執行系統**：管理工具、狀態與工作流程。它描述的是執行能力；Cloud 則回答工作在哪裡跑。官方總整理沒有把「Codex Harness」另外列為獨立產品，因此這裡用它解釋架構，不另算第 26 項發表。

Codex Cloud 可以準備 repository、相依套件與工具，將環境發布後重複用於任務，同時保留各任務獨立的工作狀態。重點是讓工作不再依賴目前開著的那台電腦；成果仍要檢查，再提交或開 PR。[Codex Cloud 文件](https://learn.chatgpt.com/docs/cloud)

Agents API 則把代理能力提供給應用程式，這次加入 computer use。從產品角度看，Cloud 適合直接交付開發任務，API 適合把代理融入自己的服務；不必把兩者視為同一個介面。[Computer use 文件](https://developers.openai.com/api/docs/guides/agents-api/tools/computer-use)

Codex Security Cloud 也值得獨立注意：它可掃描連接的 GitHub repository、追蹤新 commits，並產生待審查的修補提案。官方文件區分雲端掃描與本地 Security plugin，使用時應選對執行環境。[Security Cloud 設定](https://learn.chatgpt.com/docs/security/setup)

## Decisions API：快速決定下一步

Decisions API 讓 Luna 根據文字或圖片，從開發者定義的有限答案中做選擇，可用於分類、分流或 agent 下一步決策。目前為**限量預覽**，官方預計未來數天擴大推出。[DevDay 官方總整理](https://openai.com/index/devday-2026-recap/)

Google Flights 的現場示範展示了介面操作情境，但這項 API 的用途更廣。可以把它想成流程中的判斷點：先決定走哪條路，再由其他工具完成後續動作；示範畫面本身不代表 API 會代管整段購票流程。

## Plugins：讓 ChatGPT 成為可擴充的工作介面

Plugin extensions 讓開發者加入側欄入口、對話旁面板與自訂檔案檢視器。文件也列出雙向脈絡共享、深層連結與結構化輸入表單，適合把原本分散的工具放進同一工作流程。[Extensions 文件](https://developers.openai.com/plugins/build/extensions)

開放狀態要看細項：**Free、Go 的網頁 extensions 仍待推出，輸入框 mentions 目前限桌面版**。因此「所有方案」的概括公告，不等於每個平台上的所有擴充能力同時可用。

## 25 項發表速查

以下依官方清單列出項目，方便回頭查找；表中的名稱不代表全部已全面開放。[完整官方索引](https://openai.com/index/devday-2026-recap/)

| # | 項目 | 用途 |
|---|---|---|
| 1 | Dots | 常駐個人代理 |
| 2 | GPT-6.1 Sol | 新模型 |
| 3 | Ultrafast | 高速推論 |
| 4 | Private Intelligence | 企業隱私 |
| 5 | Codex Cloud | 雲端開發 |
| 6 | Codex CLI | 終端更新 |
| 7 | Code Review | 程式碼審查 |
| 8 | Codex Security Cloud | 資安檢查 |
| 9 | Decisions API | 有限選項決策 |
| 10 | Agents API + Computer use | 代理執行 |
| 11 | Bedrock Managed Agents | AWS 整合 |
| 12 | Plugin extensions | 介面擴充 |
| 13 | Plugin Creator / discovery | 建立與探索插件 |
| 14 | Sites + plugins | 網站整合 |
| 15 | MCP events | 事件自動化 |
| 16 | ChatGPT Space | 團隊空間 |
| 17 | Pages | 協作文件 |
| 18 | Collaborative slides | 協作簡報 |
| 19 | Teams / shared tasks | 共用任務 |
| 20 | @ChatGPT in Slack / Teams | 通訊協作 |
| 21 | Meetings plugin | 會議紀錄 |
| 22 | Shareable profiles | 分享作品 |
| 23 | Sign in with ChatGPT | 帳號與額度整合 |
| 24 | Pro 500 | 新訂閱方案 |
| 25 | OpenAI Marketplace | 企業採購 |

其中 **Private Inference 預計秋季預覽、協作簡報預計未來數週推出、Meetings 為 macOS Beta**。訂閱資格與推出階段是兩件事，付費方案符合資格，也可能仍需等待功能開放。

## 這次更新值得注意的方向

我認為這次 DevDay 最清楚的方向，是讓 AI 工作延續到對話以外：dots 接責任、Space 留成果、Cloud 提供執行環境，模型則在成本與速度上提供不同選擇。對個人開發者，先看 Sol 的實際任務品質；對團隊，則看共用資料、交接與審查能否形成完整流程。

至於要不要升級 Pro 500，最好用自己常跑的工作衡量等待時間與用量。較快的 token 生成很有吸引力，但能否縮短交付時間，仍取決於工具等待、測試與人工確認。

想對照發表前的預期，也可以閱讀本站的 [DevDay 2026 前瞻與傳聞查核](/2026/09/29/OpenAI-DevDay-2026-前瞻：十大傳聞機率排序與證據查核/)。
