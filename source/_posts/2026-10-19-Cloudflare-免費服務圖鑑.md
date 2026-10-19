---
title: "Cloudflare 免費服務圖鑑：41 項服務的額度、限制與獨立開發者實戰組合"
date: 2026-10-19 14:00:00
updated: 2026-10-19 15:00:00
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

Cloudflare 免費方案的額度散在幾十份官方文件裡，計量單位也很容易看錯。我把常用的 41 項服務整理成一個圖鑑網站：每項列出免費額度、限制、何時開始收費與官方來源，另外附五套實戰組合。

> **網站入口：[Cloudflare Free Stack 免費服務圖鑑](https://cloudflare-free-stack-atlas.opal-pearl-8326.chatgpt.site/)**
> 免費開啟、不需註冊。也可以直接跳到 [實戰組合](https://cloudflare-free-stack-atlas.opal-pearl-8326.chatgpt.site/#stacks) 或 [查核筆記](https://cloudflare-free-stack-atlas.opal-pearl-8326.chatgpt.site/#notes)。

<!--more-->

## 收錄範圍與費用標籤

![服務圖鑑首頁：搜尋列、分類分頁與費用篩選，下方是 Workers、Pages、R2 等服務卡片](atlas.jpg)

41 項服務分成開發部署 15 項、AI 與搜尋 5 項、安全網路 13 項、其他工具 8 項，資料查核日為 2026-10-19。每項都標上三種費用標籤之一：

| 標籤 | 意思 | 數量 |
| --- | --- | --- |
| 真正 $0 免費 | 不按用量收費，例如 DNS、CDN、SSL、DDoS、Tunnel、Turnstile | 14 |
| 免費額度 | 有每日或每月上限，達限會停止或開始計費 | 23 |
| 必須付費方案 | 放進來對照，避免誤以為免費 | 4 |

可以用名稱、用途或關鍵字搜尋（首頁按 **/** 或 **Cmd + K**），依分類與費用篩選，也能收藏服務。篩選條件會寫進網址，可直接分享。

## 核心服務的免費額度

| 服務 | 免費額度 | 注意 |
| --- | --- | --- |
| Workers | 100,000 次請求 / 日，10 ms CPU / 次 | 與 Pages Functions 共用請求額度 |
| Pages | 靜態請求不限，500 次建置 / 月 | Functions 依 Workers 額度計算 |
| R2 | 10 GB-month，egress US$0 | 需綁帳單，超額自動計費 |
| D1 | 讀 5M 列 / 日、寫 100K 列 / 日 | 帳號總量 5 GB，單庫 500 MB |
| Workers KV | 讀 100K / 日、寫 1K / 日 | 最終一致，不適合餘額或遊戲狀態 |
| Durable Objects | 100,000 次請求 / 日 | 免費方案只有 SQLite 後端 |
| Workers AI | 10,000 Neurons / 日 | Neurons 不是請求數 |
| Turnstile | 驗證次數不限 | token 必須在後端驗證 |

## 最容易看錯的數字

- **Workers AI**：Neurons 依模型與輸入輸出長度消耗，不等於請求數。
- **Vectorize**：5M 是向量維度。768 維向量大約只能存 6,500 筆。
- **Queues**：10,000 是操作數。一則訊息正常投遞要 3 次操作。
- **D1**：讀取額度算掃描列數，沒加索引的查詢很快吃光。
- **Pages** 的 500 是建置次數、**Cron** 的 5 是觸發器數量、**DNS** 的 200 是紀錄筆數，都不是使用次數。

## 容易誤以為免費的四項

| 服務 | 價格 | 免費的只有 |
| --- | --- | --- |
| Email Sending | Workers Paid US$5 / 月起 | Email Routing 收信轉寄 |
| Images Storage | US$5 / 100,000 張 / 月 | 每月 5,000 次圖片轉換 |
| Stream | US$5 / 1,000 分鐘儲存 / 月 | 上傳與編碼 |
| Containers | Workers Paid US$5 / 月起 | 無，免費 Workers 不是 Docker 主機 |

## 五套實戰組合

![實戰組合區塊：Vue / Vite 組合的架構流程 Vue + Vite、Pages、Workers、D1，附建置步驟與注意事項](stacks.jpg)

| 組合 | 架構 | 要注意 |
| --- | --- | --- |
| Vue / Vite | Vue → Pages → Workers → D1 | 只有純靜態請求不限量，API 與資料庫各有額度 |
| Capacitor | Capacitor → Workers → D1 → R2 | 不要把 R2 憑證或 API secret 放進 App |
| Node / Coolify | Tunnel → 自己的 VPS → R2 | Tunnel 只負責連線，主機費用照付 |
| 個人遊戲平台 | Pages → Durable Objects → D1 → R2 | 遊戲狀態不要放 KV，排名不能只信客戶端 |
| AI 知識庫 | Workers AI → Vectorize → AI Gateway | AI Search 2026-11-01 起計費 |

## 服務介紹頁

![Workers 服務介紹頁：數據怎麼看、免費額度表、費用邊界與使用限制](service-page.jpg)

點開任一卡片會進到獨立頁面，例如 [Workers](https://cloudflare-free-stack-atlas.opal-pearl-8326.chatgpt.site/services/workers/)。內容包含額度解讀、設定步驟與範例程式、搭配服務，以及官方文件連結。

圖鑑數值是 2026-10-19 的快照，啟用前請以官方頁面為準。這是個人整理的網站，不是 Cloudflare 官方資源。
