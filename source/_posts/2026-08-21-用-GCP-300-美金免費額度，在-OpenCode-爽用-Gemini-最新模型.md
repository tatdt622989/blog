---
title: "GCP 300 美金免費額度實戰：OpenCode 串接 Gemini 3.8 Flash 教學"
date: 2026-08-21 10:45:00
updated: 2026-10-19 16:00:00
description: "GCP（Google Cloud）新戶 300 美金試用金可以折抵 Agent Platform（原 Vertex AI）上的 Gemini 用量。本文教你建立 API Key 接進 OpenCode，算出 300 美金能用多少 Token，並說明 90 天到期或額度用完後會怎樣。"
translation_key: gcp-300-credit-opencode-gemini
translations:
  en: /en/2026/08/21/gcp-300-credit-opencode-gemini/
  zh-CN: /zh-cn/2026/08/21/gcp-300-credit-opencode-gemini/
tags:
- AI
- 獨立開發者
- 開發工具
categories:
- AI 科技
---

![](cover.jpg)

**可以用 GCP 300 美金免費額度在 OpenCode 寫程式。** Google Cloud 新戶的 300 美元試用金（效期 90 天）可以折抵 **Agent Platform（原 Vertex AI）** 上的 Gemini 用量：在 **Agent Studio** 建一把 API Key，貼進 OpenCode 的 Vertex 設定，就能用 **Gemini 3.8 Flash** 等模型，試用期間不會自動扣款。要注意兩個例外：**AI Studio 的 Gemini API** 與 **Claude 等合作夥伴模型**都不能用這筆試用金折抵。

本文專注在 OpenCode 串接與用量控制，資料查核日期為 2026 年 10 月 19 日。試用金的申請資格、信用卡驗證與完整限制，請看 [Google Cloud 300 美金免費試用完整教學](/2026/10/19/google-cloud-300-free-trial-guide/)。

<!--more-->

## 300 美金能折抵哪些 AI 用量

| 用途 | 能否用試用金折抵 | 依據 |
|------|------------------|------|
| Agent Platform 上的 Gemini 模型（OpenCode 走的路線） | 可以 | 官方未排除；筆者帳單實測 Vertex AI 費用全數由抵免額沖銷 |
| AI Studio 的 Gemini API | 不行 | [官方：試用金不能支付 AI Studio 的 Gemini API 費用](https://docs.cloud.google.com/free/docs/free-cloud-features) |
| Claude 等以託管 API 提供的合作夥伴模型 | 不行，試用期也不能用 Marketplace | 同上 |
| 申請提高配額 | 試用期不能申請 | 同上 |
| Google AI Pro 每月 10 美元 | 另計的獨立抵免額，可疊加使用 | [Google 官方部落格](https://blog.google/innovation-and-ai/technology/developers-tools/gdp-premium-ai-pro-ultra/) |

所以 OpenCode 裡請只選 **Gemini** 模型；想用 Claude 得另外付費，且要先升級成付費帳戶。

## 300 美金能用多少 Token

以下為 [Agent Platform 官方價格](https://cloud.google.com/vertex-ai/generative-ai/pricing)（global 端點，每 100 萬 Token）：

| 模型 | 輸入 / 輸出 | 快取輸入 | 300 美金約可換 |
|------|-------------|----------|----------------|
| Gemini 3.8 / 3.7 Flash（優惠價，至 2026/12/31） | $0.75 / $3.75 | $0.075 | 4 億輸入或 8,000 萬輸出 |
| Gemini 3.8 / 3.7 Flash（2027/1/1 起標準價） | $1.50 / $7.50 | $0.15 | 2 億輸入或 4,000 萬輸出 |
| Gemini 4 Argon（優惠價，至 2026/11/30） | $2 / $10 | $0.10 | 1.5 億輸入或 3,000 萬輸出 |

- 官方註明 Flash 的優惠價是以「**淨支出 50% 回饋抵免額**」的方式實現，沒有說明試用金支出是否適用，**保守估算請用標準價**。
- Coding Agent 每輪都會重送大量上下文，輸入 Token 遠多於輸出；**快取輸入只要原價的十分之一**，所以實際能用的量通常比單算輸入價更多。

## 步驟一：確認試用金已入帳

1. 依 [試用教學](/2026/10/19/google-cloud-300-free-trial-guide/) 開通 Free Trial，並建立一個專用專案（例如 **ai-coding-sandbox**）。
2. **選用**：有訂閱 **Google AI Pro** 的話，到 [Google Developer Program 福利頁](https://me.developers.google.com/benefits) 每月領取 10 美元的 Gen AI 與 Cloud 抵免額：

![Google Developer Program 福利專區領取每月 10 美元 Gen AI 抵免額](google-developer-benefits.jpg)

3. 到 **Billing → Credits**，確認 **Free Trial** 300 美元與月度抵免額都已入帳：

![GCP 結算後台顯示 300 美元 Free Trial 試用抵免額與每月 10 美元開發者福利已入帳](gcp-billing-credits.jpg)

## 步驟二：啟用 Agent Platform API 並建立 API Key

Vertex AI 已更名為 **Gemini Enterprise Agent Platform**，主控台簡稱 **Agent Platform**，API 也改叫 **Agent Platform API**。

1. 在主控台搜尋並啟用 **Agent Platform API**。
2. 打開 [Agent Studio 的 API 金鑰頁](https://console.cloud.google.com/agent-platform/studio/settings/api-keys)，建立一把 API Key。
3. 建議在金鑰設定加上 **API 限制**，只允許 Agent Platform API；官方提醒拿到金鑰的人都能花你的配額。[官方 API Key 說明](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/start/api-keys)

用 API Key 不需要安裝 gcloud CLI，也不用設定 Service Account。另外，官方還有一種免綁卡的 **express mode** 免費方案（限 @gmail.com 帳號、90 天、配額較低），它和 300 美金試用金是**兩套不同的方案**，不要混在一起。[express mode 說明](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/start/express-mode/overview)

## 步驟三：在 OpenCode 連上 Vertex 並選模型

1. 在 OpenCode 輸入 **/connect**，選 **Vertex**，貼上 API Key。也可以改用環境變數：

```bash
export GOOGLE_VERTEX_API_KEY="你的 API Key"
```

2. 輸入 **/models**，切換到 **Gemini 3.8 Flash**。

下圖是 8 月實測時用 Gemini 3.7 Flash 的畫面，可看到 1,048,576 Token（1M）上下文：

![OpenCode 介面成功載入 Vertex AI 的 Gemini 3.7 Flash 模型與 1M 上下文](opencode-vertex-gemini.jpg)

模型怎麼選：

| 模型 | 適合 | 備註 |
|------|------|------|
| **Gemini 3.8 Flash** | 日常主力 | 1M 上下文、最多 65,536 輸出 Token；推理等級只有 LOW / MEDIUM / HIGH。[官方規格](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-8-flash)；新功能見 [Gemini 3.8 Flash 介紹](/2026/09/03/Gemini-3-8-Flash-突襲登場！維持-3-7-極低費率、長時程代理迴圈與-DeepSWE-關鍵突破/) |
| **Gemini 3.7 Flash** | 想省 Token | 同價位，官方建議重視運算效率時改用 3.7 |
| **Gemini 4 Argon** | 困難的長任務 | 價格約 Flash 的 2.7 倍，12/1 起再翻倍；見 [Gemini 4 Argon 價格與限制](/2026/10/01/Gemini-4-Argon-發布：百萬輸出、API-價格與開放限制/) |

如果連線出現認證錯誤，先檢查環境裡是否同時設了 **GOOGLE_CLOUD_PROJECT**、**VERTEX_LOCATION** 等專案或區域設定。OpenCode 在有明確專案或區域時可能改走 ADC（gcloud 登入）認證，而不是 API Key。

## 監控用量，避免超支

**Token 用量**：到 [Agent Studio 用量主頁](https://console.cloud.google.com/agent-platform/studio/settings/usage-dashboard) 看每日輸入與輸出 Token：

![Google Cloud 用量資訊主頁即時查看 Gemini 3.7 Flash 每日輸入與輸出 Token 統計](gcp-usage-dashboard.jpg)

**折抵明細**：到 **Billing → Reports**，確認 Vertex AI（Agent Platform）的費用都由抵免額沖銷、實付為 0：

![GCP 結算報表顯示 Vertex AI 費用被抵免額完全折抵，實際應付金額為 0 元](gcp-billing-reports.jpg)

升級成付費帳戶後，到 **Billing → Budgets & alerts** 設預算。一般預算只發通知、[不會自動停止用量](https://docs.cloud.google.com/billing/docs/how-to/budgets)；要硬上限請改設 **spend cap** 預算，它支援 Agent Platform，專案花費超過預算時會自動暫停新請求，直到下個預算週期。[官方 spend cap 說明](https://docs.cloud.google.com/billing/docs/how-to/budgets-spend-caps)

## 90 天到期或額度用完會怎樣

依 [官方 Free Trial 說明](https://docs.cloud.google.com/free/docs/free-cloud-features)：

| 情況 | 結果 |
|------|------|
| 試用期間 | 不會自動扣款 |
| 300 美金用完，或滿 90 天（先到者為準） | 帳單停用，資源停止，OpenCode 的 API 呼叫也會跟著失敗；進入 30 天寬限期 |
| 寬限期內沒升級 | 試用期間建立的資源會被永久刪除 |
| 期間內升級為付費帳戶 | 剩餘額度保留到原本的 90 天到期；超出額度的用量開始按價計費 |

試用結束後如果不想按量付費，可以參考 [AI 寫程式工具訂閱方案比較](/2026/09/14/ai-coding-tools-subscription-comparison/)，改用固定月費的方案。
