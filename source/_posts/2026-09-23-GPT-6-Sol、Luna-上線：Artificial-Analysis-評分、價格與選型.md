---
title: GPT-6 Sol、Luna 上線：Artificial Analysis 評分、價格與選型
date: 2026-09-23 08:33:00
updated: 2026-09-23 08:33:00
description: GPT-6 Sol 與 Luna 已於 2026 年 9 月 22 日上線。本文對照官方 API 規格、標準與快取單價、長上下文費率，以及 Artificial Analysis 的 Intelligence Index 與每項評測成本，說明何時該用 Sol、何時 Luna 更划算。
translation_key: gpt-6-sol-luna-pricing-aa-review
translations:
  zh-CN: /zh-cn/2026/09/23/gpt-6-sol-luna-pricing-aa-review/
  en: /en/2026/09/23/gpt-6-sol-luna-pricing-aa-review/
categories:
  - AI 科技
tags:
  - GPT-6
  - OpenAI
  - Artificial Analysis
  - AI Agent
---

![GPT-6 Sol 與 Luna 以日光與月色呈現的 AI 工作流程插畫](cover.jpg)

**GPT-6 Sol 與 GPT-6 Luna 已在 2026 年 9 月 22 日公開。這次更新最實際的賣點，是把較新的推理與代理能力帶到更低的 API 價位。** 但 Sol 與 Luna 不是同一模型的快慢模式：Sol 面向複雜程式開發與多步驟代理工作，Luna 則定位在聚焦、量大、預算敏感的任務。

我在 9 月 23 日查看 Artificial Analysis 即時榜單時，Sol 的最高推理設定得 48 分、Luna 得 37 分；同時，Luna 的每項綜合評測任務成本低至約 7 美分。這些結果說明兩者的取捨比「誰全面勝出」更值得看。本文把 OpenAI 自行公布的測試與 Artificial Analysis 的獨立評測分開整理，並附上[前一篇 Claude Opus 5.5 評測分析](/2026/09/23/Claude-Opus-5-5-上線：AA-登頂、價格降幅與完整評測解析/)作為同日新品的參照。

<!--more-->

## GPT-6 Sol 與 Luna 規格、使用方式

OpenAI 將 Sol 描述為複雜程式開發與代理工作模型，Luna 則是高效率、適合大量聚焦任務的選擇。官方 API 文件目前列出兩者皆有 105 萬 tokens 上下文視窗、最多輸出 12.8 萬 tokens，並支援六種推理強度。兩者接受文字與圖片輸入、輸出文字；透過 Responses API 可使用工具和函式呼叫。[GPT-6 Sol 文件](https://developers.openai.com/api/docs/models/gpt-6-sol)、[GPT-6 Luna 文件](https://developers.openai.com/api/docs/models/gpt-6-luna)

| 項目 | GPT-6 Sol | GPT-6 Luna |
| --- | --- | --- |
| API 模型 ID | **gpt-6-sol** | **gpt-6-luna** |
| 官方定位 | 複雜程式開發、代理工作 | 聚焦任務、高用量服務 |
| 上下文視窗 | 1,050,000 tokens | 1,050,000 tokens |
| 最大輸出 | 128,000 tokens | 128,000 tokens |
| 推理強度 | none、low、medium、high、xhigh、max | none、low、medium、high、xhigh、max |
| 輸入與輸出 | 文字、圖片輸入；文字輸出 | 文字、圖片輸入；文字輸出 |

公告列出的使用入口是 ChatGPT Work 與 Codex，開放對象包含 Plus、Pro、Business、Enterprise、Edu。Free 與 Go 使用者可在桌面 App 使用 Luna；公告當時一般 Chat 介面尚未開放，模型也採逐步推出。API 則使用表格列出的模型 ID。這是產品公告所述的推出範圍，實際帳戶仍要看當下的介面與權限。[OpenAI 發布公告](https://openai.com/index/introducing-gpt-6-sol-and-luna/)

## API 價格：Sol 對半，Luna 輸出也再降

以下是每 100 萬 tokens 的標準 API 價格。OpenAI 以 GPT-5.6 的先前價格作比較，宣稱兩款新模型的價格降低約 50%。細看單價，Sol 的輸入與輸出都減半；Luna 的輸入減半，輸出則由 $1.20 降至 $0.50，實際降幅約 58%。[官方價格表](https://developers.openai.com/api/docs/pricing)

| 模型 | 輸入 | 快取命中輸入 | 輸出 |
| --- | ---: | ---: | ---: |
| GPT-5.6 Sol | $4.00 | $0.40 | $20.00 |
| GPT-6 Sol | $2.00 | $0.20 | $10.00 |
| GPT-5.6 Luna | $0.20 | $0.02 | $1.20 |
| GPT-6 Luna | $0.10 | $0.01 | $0.50 |

對長時間維持上下文的代理流程，快取命中輸入是值得留意的成本項目：GPT-6 的命中快取價格是一般輸入的 10%。不過，105 萬 tokens 的上下文上限不代表整段請求都按表格中的短上下文費率計價。輸入超過 27.2 萬 tokens 時，該次請求的輸入與快取費率加倍，輸出費率為 1.5 倍；Batch 與 Flex 是標準價格的一半，Fast mode 則以適用價格的兩倍計費。部署到大量請求前，應把這些條件一起放進成本估算。

## Artificial Analysis 即時評分與每項任務成本

Artificial Analysis 的 Intelligence Index v4.3.2 整合 10 項評測，涵蓋代理工作、程式與終端操作、科學推理、知識可靠度和長文理解。以下是 **2026 年 9 月 23 日查到的即時榜單快照**，不是永久排名。指數分數不是答對率；任務成本是依該組評測的實際 token 使用量與價格計算的加權平均，也不是每位使用者都會花到的固定金額。[Artificial Analysis 排行榜](https://artificialanalysis.ai/leaderboards/models)、[評測方法](https://artificialanalysis.ai/methodology/intelligence-benchmarking)

| 推理強度 | Sol 指數分數 | Sol 每項任務成本 | Luna 指數分數 | Luna 每項任務成本 |
| --- | ---: | ---: | ---: | ---: |
| low | 34 | $0.13 | 21 | $0.0045 |
| medium | 40 | $0.25 | 29 | $0.02 |
| high | 43 | $0.37 | 32 | $0.03 |
| xhigh | 44 | $0.53 | 34 | $0.04 |
| max | 48 | $1.06 | 37 | $0.07 |

這組數據給出一個有用的選型刻度：Sol 從 xhigh 升到 max，分數增加 4 分，AA 測得的平均任務成本則加倍；Luna 從 xhigh 升到 max，增加 3 分，成本由 4 美分升到 7 美分。若拿同為 max 的設定比較，Sol 的分數較高，但 AA 任務成本約是 Luna 的 15 倍。**高推理強度買到的是特定測試上的額外能力，不是免費的預設升級。**

排行榜也顯示 Sol 的最高分不是全站第一：同一份榜單上的 GPT-6 Astra max 為 53 分，Claude Opus 5.5 max（含 fallback）為 58 分。若需要比較這些模型，需一併考慮推理設定、fallback、工具、任務成本與自己的工作類型，不能只看最高分。

另有一個規格落差值得明講：OpenAI API 文件列 Sol 與 Luna 的上下文視窗都是 105 萬 tokens；Artificial Analysis 的模型資料列 Sol 為 87.2 萬、Luna 為 100 萬。公開資料沒有說明差異成因，所以本文把提供商標示與 AA 實測資料分開呈現，不把兩個欄位當成同一種保證。

## 官方測試支持什麼，又有哪些界線

OpenAI 公布的 DeepSWE v1.1 結果中，Sol max 得 68.8%，Luna max 得 66.6%；公告也指出 Luna 在高推理設定下比 GPT-5.6 Luna 進步。這些數字來自 OpenAI 的發布資料，不是本站自行重跑。其比較對象包括 Claude Opus 5 與 Claude Fable 5，而不是同日推出的 Claude Opus 5.5；因此適合用來理解 OpenAI 的測試結果，不宜包裝成與最新競品的完整對決。[OpenAI 對程式能力的說明](https://openai.com/index/introducing-gpt-6-sol-and-luna/)

OpenAI 也表示，Sol 在自家、以使用者曾回報錯誤的對話建立的事實性評測中，錯誤約減半；官方同時提醒，這批刻意挑出的錯誤對話不代表日常請求。對產品選型而言，這仍是正向訊號，但應用程式上線前仍要用自己的資料、工具鏈與評分標準做小型驗證。

## Sol 還是 Luna：依照錯誤成本選

如果任務需要讀大型程式庫、跨檔案修改、反覆呼叫工具、在不完整規格下規劃多步驟工作，我會先從 **GPT-6 Sol medium** 試起，再比較 high 或 xhigh 是否值得額外成本。官方把這一型工作列為 Sol 的定位，AA 的數據也顯示提高推理強度會同時增加分數與任務成本。

如果工作邊界清楚、每次輸出不長，但每天要處理大量分類、抽取、客服草稿或固定流程，先試 **GPT-6 Luna medium**。在 AA 的特定綜合評測中，Luna max 的 37 分高於 Sol low 的 34 分，測得任務成本還低於 Sol low；這是該評測集的成本效益觀察，不代表 Luna 在每個真實工作上都會勝出。

GPT-6 Sol、Luna 的價值在於讓團隊能依任務難度調整模型與推理強度：簡單工作用低成本設定，需要多步推理時再往上加。成本表與綜合排名適合縮小候選範圍，最後還是要用自己的成功率、人工修正時間、錯誤風險與實際帳單決定。若你也在比較另一款當日旗艦，可接著看[Claude Opus 5.5 的完整評測與價格分析](/2026/09/23/Claude-Opus-5-5-上線：AA-登頂、價格降幅與完整評測解析/)；若是準備用 GPT-6 寫程式，可參考[用 GPT-6 做遊戲的工具選擇指南](/2026/09/09/GPT-6-做遊戲用什麼引擎？Godot、Unity、Unreal-與網頁遊戲工具怎麼選/)。
