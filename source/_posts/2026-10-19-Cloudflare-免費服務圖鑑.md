---
title: "Cloudflare 免費服務圖鑑：41 項服務的額度、限制與獨立開發者實戰組合"
date: 2026-10-19 14:00:00
updated: 2026-10-19 14:00:00
description: "我做了一個 Cloudflare 免費服務圖鑑網站，整理 Workers、Pages、R2、D1、Workers AI、Tunnel 等 41 項服務的官方額度、計量單位與使用限制，並提供 Vue、Capacitor、Node / Coolify、多人遊戲與 AI 知識庫五套實戰組合。"
permalink: 2026/10/19/cloudflare-free-stack-atlas/
translation_key: cloudflare-free-stack-atlas
translations:
  zh-CN: /zh-cn/2026/10/19/cloudflare-free-stack-atlas/
  en: /en/2026/10/19/cloudflare-free-stack-atlas/
categories:
- 獨立開發
tags:
- Cloudflare
- 獨立開發者
- Serverless
- 免費資源
---

![Cloudflare Free Stack 封面：發光的橘色雲朵懸浮在多層深色平台上，象徵可自由組合的雲端服務](cover.jpg)

Cloudflare 的免費方案很大方，但「免費」兩個字背後的計量單位很容易看錯：Workers AI 的 10,000 Neurons 不是 10,000 次請求，Vectorize 的 5M 是向量維度而不是向量筆數，D1 的 5 GB 是整個帳號的總量。這些細節散落在幾十份官方文件裡，每次開新專案都要重查一次。

所以我做了 **[Cloudflare Free Stack](https://cloudflare-free-stack-atlas.opal-pearl-8326.chatgpt.site/)**：一個給獨立開發者的 Cloudflare 免費服務圖鑑。它收錄 41 項服務與功能，每一項都列出免費額度、使用限制、費用邊界與官方來源，再加上五套從前端到 AI 的實戰組合。這篇介紹網站的內容與用法，也順便把最值得記住的數字整理出來。

> **網站入口：[Cloudflare Free Stack 免費服務圖鑑](https://cloudflare-free-stack-atlas.opal-pearl-8326.chatgpt.site/)**
> 免費開啟、不需註冊，電腦與手機都能瀏覽。也可以直接跳到 [實戰組合](https://cloudflare-free-stack-atlas.opal-pearl-8326.chatgpt.site/#stacks) 或 [查核筆記](https://cloudflare-free-stack-atlas.opal-pearl-8326.chatgpt.site/#notes)。

<!--more-->

## 網站收錄了什麼

圖鑑目前收錄 **41 項服務與功能**，其中 37 項有免費功能或免費額度，另外 4 項是放進來對照的付費服務。全部資料在 **2026-10-19** 查核，每張卡片都連回 Cloudflare 官方文件。

| 分類 | 數量 | 代表服務 |
| --- | --- | --- |
| 開發部署 | 15 | Workers、Pages、R2、D1、KV、Durable Objects、Queues |
| AI 與搜尋 | 5 | Workers AI、Vectorize、AI Gateway、AI Search、Browser Run |
| 安全網路 | 13 | DNS、CDN、Universal SSL、DDoS、Tunnel、Access |
| 其他工具 | 8 | Email Routing、Web Analytics、Images、Stream |

它不是 Cloudflare 的完整產品清單，而是挑出獨立開發者最可能用到的服務，把「能不能免費用、用到哪裡會停」講清楚。

## 怎麼使用：搜尋、篩選與收藏

![服務圖鑑首頁：搜尋列、分類分頁與費用篩選，下方是 Workers、Pages、R2 等服務卡片](atlas.jpg)

首頁的服務圖鑑有幾個方便的操作：

- **搜尋**：可以搜服務名稱、用途、額度或關鍵字，例如輸入 **Vue**、**WebSocket**、**R2**。在首頁按 **/** 或 **Cmd + K** 會直接跳到搜尋框。
- **分類與費用篩選**：先選開發部署、AI 與搜尋、安全網路或其他工具，再用費用標籤縮小範圍。
- **熱門推薦**：只看 Workers、Pages、R2、D1、Workers AI、Turnstile 這幾個最常用的服務。
- **收藏**：點卡片右上角的書籤，就能把想用的服務留下來，之後切到收藏模式一次看完。
- **可分享的網址**：搜尋與篩選條件會寫進網址，例如 **?category=ai**，直接傳給別人就能看到同樣的結果。

每張卡片的大數字是該服務最關鍵的額度，下面一行是第二重要的限制，掃一眼就能比較。

## 三種費用標籤，先分清楚再選

圖鑑把每個服務分成三種費用標籤，這是我覺得最重要的設計：

| 標籤 | 意思 | 數量 |
| --- | --- | --- |
| 真正 $0 免費 | 基礎功能不按用量收費，仍有功能與合理使用限制 | 14 |
| 免費額度 | 有每日、每月或容量上限，達限可能停止服務，部分產品超額會計費 | 23 |
| 必須付費方案 | 要先訂閱付費方案，內含用量不等於零成本 | 4 |

「真正 $0」大多集中在安全網路類：DNS、CDN、Universal SSL、DDoS Protection、Tunnel、Turnstile 都不會因為用量增加而收費。開發與 AI 類幾乎都是「免費額度」，用多了就會碰到上限。

## 獨立開發者最常用的核心額度

以下是圖鑑裡標為熱門的服務，以及我認為開新專案時一定要知道的數字：

| 服務 | 用途 | 免費額度 | 要注意的地方 |
| --- | --- | --- | --- |
| Workers | 邊緣 API | 100,000 次請求 / 日，10 ms CPU / 次 | 與 Pages Functions 共用每日請求 |
| Pages | 靜態網站部署 | 靜態請求不限，500 次建置 / 月 | Functions 依 Workers 額度計算 |
| R2 | 物件儲存 | 10 GB-month，egress US$0 | 需綁帳單，超額自動計費 |
| D1 | SQLite 資料庫 | 讀 5M 列 / 日、寫 100K 列 / 日 | 帳號總量 5 GB，單庫 500 MB |
| Workers KV | 設定與快取 | 讀 100K / 日、寫 1K / 日 | 最終一致，不適合餘額或遊戲狀態 |
| Durable Objects | 多人房間、WebSocket | 100,000 次請求 / 日 | 免費方案只有 SQLite 後端 |
| Workers AI | 模型推論 | 10,000 Neurons / 日 | Neurons 不是 token 也不是請求數 |
| Turnstile | 表單真人驗證 | 驗證次數不限 | 必須在後端驗證 token |

安全網路類則可以放心當成基礎建設：DNS 查詢不限量、基礎 CDN 與 Universal SSL 免費、標準 DDoS 防護不依攻擊量計費；Cloudflare Tunnel 每個帳號包含 1,000 條 tunnel，Zero Trust Free 提供 50 位使用者給 Access 和 Gateway 共用。

## 最容易誤讀的數字

做圖鑑時，我發現最常出錯的不是額度大小，而是計量單位。網站在「查核筆記」區特別列出這幾個：

- **Workers AI**：Neurons 不等於請求數。同一次呼叫，依模型、輸入與輸出長度，消耗的 Neurons 差很多。
- **Vectorize**：5M 是儲存的向量維度。1,000 筆 768 維向量就是 768,000 個維度，所以免費額度大約只能放 6,500 筆 768 維向量。
- **Queues**：10,000 是操作數，不是訊息數。一則小訊息正常投遞需要寫入、讀取、刪除三次操作，重試還會再增加。
- **D1**：5 GB 是帳號裡所有資料庫的總量，單一資料庫上限是 500 MB；讀取額度算的是實際掃描的列數，沒加索引的查詢會很快吃光。

另外幾個也很容易誤會：Pages 的 500 是**建置次數**，不是瀏覽次數；Cron Triggers 的 5 是**觸發器數量**，不是一天只能跑五次；DNS 的 200 是新 Free zone 的**紀錄筆數上限**，不是解析次數。

## 看起來免費，其實要付費的四項

圖鑑刻意收錄了 4 個付費服務，因為它們很容易和免費功能混在一起：

| 服務 | 起跳價格 | 容易混淆的免費功能 |
| --- | --- | --- |
| Email Sending | Workers Paid US$5 / 月起，含 3,000 封 | Email Routing 只免費轉寄收信，不能寄給任意收件人 |
| Images Storage | US$5 / 100,000 張 / 月 | Images Transformations 每月 5,000 次免費轉換不含託管儲存 |
| Stream | US$5 / 1,000 分鐘儲存 / 月 | 上傳與編碼免費，但儲存與觀看分鐘都要計費 |
| Containers | Workers Paid US$5 / 月起 | 免費 Workers 不是 Docker 主機，也不是免費 VPS |

如果你的專案需要寄交易通知信、託管大量圖片或播放影片，最好一開始就把這幾項的費用算進去。

## 五套實戰組合：從一個前端到一個作品

![實戰組合區塊：Vue / Vite 組合的架構流程 Vue + Vite、Pages、Workers、D1，附建置步驟與注意事項](stacks.jpg)

單一服務再好用，還是要組合起來才能變成作品。網站的「實戰組合」區整理了五種常見情境，每套都有架構流程、三個步驟、費用說明和注意事項：

| 組合 | 架構 | 適合 | 費用 |
| --- | --- | --- | --- |
| Vue / Vite | Vue → Pages → Workers → D1 | 作品集、內容網站、會員 MVP | 額度內可從 $0 開始 |
| Capacitor | Capacitor → Workers → D1 → R2 | 網站與手機 App 共用後端 | Cloudflare 額度內 $0，開發者帳號另計 |
| Node / Coolify | 使用者 → Tunnel → 自己的 VPS → R2 | 已有主機與資料庫的自架服務 | Cloudflare 可免費，主機另計 |
| 個人遊戲平台 | Pages → Durable Objects → D1 → R2 | 多人房間、排行榜 | 小規模額度內 $0 |
| AI 知識庫 | 文件 → Workers AI → Vectorize → AI Gateway | RAG、語意搜尋、文件問答 | 依模型、索引與查詢量估算 |

每套組合的注意事項都是實際會踩到的坑，例如：

- **Vue / Vite**：Pages 不限量的是純靜態請求，Functions、API 與資料庫各有自己的日額度。
- **Capacitor**：不要把 R2 憑證或第三方 API secret 打包進 App，上傳流程要由後端授權。
- **Node / Coolify**：Tunnel 只負責連線，不會替你執行 Node；VPS、資料庫與備份的成本不會因此消失。
- **個人遊戲平台**：KV 不適合高頻、強一致的遊戲狀態；金額、獎勵與排名不能只相信客戶端回報。
- **AI 知識庫**：AI Search 從 2026-11-01 開始計費，外部 LLM 的費用也不能當成免費。

## 每個服務都有一頁完整介紹

![Workers 服務介紹頁：數據怎麼看、免費額度表、費用邊界與使用限制](service-page.jpg)

點開任何一張卡片，會進到該服務的獨立頁面，例如 [Workers 介紹頁](https://cloudflare-free-stack-atlas.opal-pearl-8326.chatgpt.site/services/workers/)。每頁固定有四段：

1. **數據怎麼看**：用一段話解釋額度的計量方式，接著是額度表、費用邊界與使用限制。
2. **怎麼開始使用**：開始前準備、四個設定步驟，部分服務附上範例程式（例如 Workers 的最小 JSON API、D1 的排行榜資料表、Cron 的 UTC 排程），最後告訴你怎麼確認設定成功。
3. **和什麼搭配**：推薦三個搭配服務，並說明各自負責什麼。
4. **官方文件與查核來源**：官方設定指南與定價頁連結。

每頁都有自己的網址，可以直接分享給隊友，側欄也能一鍵複製或收藏。

## 即將生效的兩項變更

![查核筆記區塊：三種費用標籤說明，以及 2026-11-01 AI Search 計費、2026-12-01 Workers Logs 新制的時間軸](notes.jpg)

圖鑑也把已公告、但還沒生效的變更標在卡片上：

- **2026-11-01，AI Search 開始計費**：每月內含 5M ingestion tokens、10 GB-month 儲存，以及語意查詢與全文檢索各 1,000 次；生成與外部模型的費用仍需另算。
- **2026-12-01，Workers Logs 改用 Observability 新制**：目前是每日 200,000 筆日誌事件、保留 3 天；新制的 Free 額度是每日 0.5 GB ingestion、保留 7 天。

有這類變更的服務，卡片上會出現「有已公告變更」的提示，避免把現在的免計費當成永久免費。

## 用圖鑑規劃新專案的流程

我自己開新專案時，大致照這個順序用：

1. 到**實戰組合**找最接近的情境，先確定架構需要哪幾塊。
2. 逐一點進每個服務頁，看**數據怎麼看**，確認計量單位和自己的使用方式對得上。
3. 用費用篩選切到**必須付費方案**，確認沒有不小心依賴付費功能。
4. 把要用的服務加入**收藏**，之後回來檢查額度就不用重新搜尋。
5. 正式上線前，依各服務頁的**怎麼確認設定成功**逐項驗證，再點官方來源核對最新方案。

最後提醒一下：圖鑑裡的數值是 2026-10-19 的查核快照，價格以美元計。Cloudflare 的方案會調整，啟用前請以官方頁面和自己帳號的實際限制為準。這是我個人整理的網站，不是 Cloudflare 官方資源。

工具已經準備好了，接下來輪到你的點子：[Cloudflare Free Stack](https://cloudflare-free-stack-atlas.opal-pearl-8326.chatgpt.site/)。
