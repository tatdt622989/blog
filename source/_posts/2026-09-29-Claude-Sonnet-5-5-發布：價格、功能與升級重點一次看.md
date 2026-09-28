---
title: Claude Sonnet 5.5 發布：價格、功能與升級重點一次看
date: 2026-09-29 02:20:00
updated: 2026-09-29 02:20:00
description: Claude Sonnet 5.5 正式發布，官方稱輸出速度提升逾 30%，API 單價維持不變。本文整理主要評測、與 Opus 5.5 的定位差異、100 萬上下文規格，以及開發者升級前要注意的思考模式、工具呼叫與對話相容性變更。
translation_key: claude-sonnet-5-5-launch-pricing-upgrade
translations:
  zh-CN: /zh-cn/2026/09/29/claude-sonnet-5-5-launch-pricing-upgrade/
  en: /en/2026/09/29/claude-sonnet-5-5-launch-pricing-upgrade/
categories:
  - AI 科技
tags:
  - AI
  - Claude
  - Claude Code
  - Anthropic
---

![Claude Sonnet 5.5 串連程式開發、文件與工具工作的主題插畫](cover.jpg)

**Claude Sonnet 5.5 正式發布了。** Anthropic 在 2026 年 9 月 28 日推出新版 Sonnet，主打日常開發與文件工作的速度、品質和成本平衡。官方表示輸出速度比 Sonnet 5 快逾 30%，多數工作的單次成本最多降低 30%；**API 每 token 單價並沒有調降**。[官方公告](https://www.anthropic.com/claude-sonnet-5-5)

這篇以台灣時間 9 月 29 日查到的官方公告與開發文件為準，整理值得先看的功能和升級差異。評測數字是官方公布結果，本文尚未進行獨立實測。

<!--more-->

## Sonnet 5.5 適合做什麼？

這次的定位很清楚：把範圍明確、需要反覆修改的工作交給 Sonnet，例如修復 bug、實作已定義的功能、整理文件與製作簡報。Anthropic 仍把 Opus 5.5 放在需要持續判斷、需求開放而複雜的工作上；Sonnet 的賣點是讓日常迭代更快、更省。[官方定位](https://www.anthropic.com/claude-sonnet-5-5)

我的選法會是：需求清楚的修改先試 Sonnet；涉及架構取捨、跨系統重構，再拿同一份任務對照 Opus。是否值得換模型，應看交付結果需要多少人工修正，而不是只看它回答得多快。

## 規格與價格：維持 2／10 美元

下表是 **Claude API** 規格與美元價格；訂閱介面的額度不能直接套用這張表。[模型文件](https://platform.claude.com/docs/en/models/sonnet-5-5/overview) · [官方價目表](https://platform.claude.com/docs/en/about-claude/pricing)

| 項目 | Sonnet 5.5 |
| --- | --- |
| API 模型 ID | **claude-sonnet-5-5** |
| 上下文視窗 | 100 萬 tokens |
| 一般 API 最大輸出 | 128K tokens |
| 輸入／輸出 | 文字與圖片輸入，文字輸出 |
| 每百萬輸入 tokens | US$2 |
| 每百萬輸出 tokens | US$10 |
| 每百萬快取讀取 tokens | US$0.20 |

官方稱省下的成本主要來自完成工作所需的 tokens 減少。**「最多省 30%」是官方測試中的每任務成本，不是所有使用者帳單保證打七折**；輸出快逾 30% 也不等於包含搜尋、工具等待的整個工作流程都縮短相同比例。[成本與速度說明](https://www.anthropic.com/claude-sonnet-5-5)

舉個只計標準文字 tokens 的算例：10 萬輸入加 2 萬輸出，Sonnet 5.5 是 **US$0.40**，同樣用量的 Opus 5.5 是 **US$0.80**。這是依單價計算，不含快取、工具費或其他加價，也沒有假設兩個模型實際會用相同 tokens。

## 官方評測進步多少？不要把單項勝出當成全面超越

以下摘錄官方比較表，方便看出升級幅度。不同評測的分數尺度不同，不能互相相加。[官方評測與註腳](https://www.anthropic.com/claude-sonnet-5-5)

| 評測 | Sonnet 5 | Sonnet 5.5 | Opus 5.5 |
| --- | ---: | ---: | ---: |
| Terminal-Bench 4.0 | 10.3% | 70.6% | 66.4% |
| CursorBench 4.0 | 34.1% | 55.5% | 57.8% |
| GDPval-AA v2.1 | 1449 | 1844 | 1846 |

Terminal-Bench 一項，Sonnet 5.5 的公布分數甚至高於 Opus；但官方註明 Opus 的 66.4% 是 **xhigh** 下的最高成績，這不是把所有模型固定在同一 effort 的測試。GDPval-AA 的 Sonnet 成績則出自發布前環境；官方表示當時有個可能影響結構化輸出的 bug，已修復，影響若存在預期不大。本文保留已公布的原分數。

我最在意的是 CursorBench 和文件工作評測已靠近 Opus，這讓 Sonnet 更值得放進日常工作比較。它仍不代表長時間、開放式任務的判斷力完全相同。

## effort 怎麼選：App 和 API 預設不同

**Claude App 與 Claude Code 預設 medium，Claude Platform API 預設 high。** 因此不同入口的體感差異，可能先來自設定，而不只是模型能力。[官方設定說明](https://www.anthropic.com/claude-sonnet-5-5)

Anthropic 的提示指南建議，規格明確的代理開發可從 **medium** 開始，較難或較長的任務再用 **high**；對話等重視延遲的工作則先測 **low／medium**。新版 effort 已重新校準，不宜直接沿用 Sonnet 5 的成本預期。[Sonnet 5.5 提示指南](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-sonnet-5-5)

我的建議是拿幾件真實工作比較：同一個 bug、同一份文件、同一段需求，記下完成時間、花費和返工次數。若 medium 已經穩定交付，就沒有必要讓每件事都跑 max。

## 升級 API 前，先檢查這五件事

既有 Sonnet 5 程式不能保證只改模型名稱就成功。官方遷移指南列出五類不相容變更：[完整升級說明](https://platform.claude.com/docs/en/models/sonnet-5-5/migration-guide)

1. **關閉前置思考的寫法改了。** 舊的 `thinking: {"type": "disabled"}` 會報錯；改用 `thinking: {"type": "between_tools"}`，且 effort 必須在 high 以下或等於 high。它仍可能在工具呼叫之間產生思考區塊。
2. **不能強制指定工具呼叫。** `tool_choice` 的 `any` 和 `tool` 會回傳 400；改用 `auto`。工具參數需要符合結構時可搭配 `strict: true`，但這不保證模型一定呼叫工具。
3. **思考區塊有模型與對話綁定。** 切換模型、改寫較早的訊息或工具定義，都應檢查歷史處理；依相容性與帳戶設定，可能丟棄區塊或報錯。
4. **舊版電腦操作工具有平台差異。** Claude API 與 Google Cloud 必須遷移至 `computer_toolset_20260801`；Amazon Bedrock 仍接受舊的 `computer_20251124`。
5. **advisor 搭配需要更新。** Sonnet 5、Opus 4.7 與 Opus 4.8 不能再作為 Sonnet 5.5 的 advisor。

還有一個容易被誤會成「卡住」的變化：較長的工具間進度文字會放進 **thinking 區塊**，只顯示 text 的介面可能突然安靜。請依官方文件處理顯示設定與回應區塊，而不是直接判定請求失敗。[回應格式變更](https://platform.claude.com/docs/en/models/sonnet-5-5/whats-new-sonnet-5-5)

## 值不值得現在換？

**對正在用 Sonnet 5 做日常開發的人，Sonnet 5.5 值得優先試用。** 它維持單價，官方評測進步明顯，也把速度和工作效率放在產品核心。但有正式 API 整合的人，應先跑過自己的工具流程和對話歷史案例，再擴大切換。

目前官方已列出 Claude API、Amazon Bedrock、Claude Platform on AWS、Google Cloud 與 Microsoft Foundry 的可用性。[API 發布紀錄](https://platform.claude.com/docs/en/release-notes/overview)

想比較另一個 5.5 家族模型，可以接著看本站的 [Claude Opus 5.5 介紹](/2026/09/23/Claude-Opus-5-5-上線：AA-登頂、價格降幅與完整評測解析/)。兩篇一起看，更容易決定哪些工作要追求能力上限，哪些適合交給更快的 Sonnet。
