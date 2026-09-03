title: AI 模型排行榜怎麼看？LMArena、SWE-bench、LiveBench 與 12 個關鍵指標完整解析
description: >-
  AI 模型排行榜到底在比什麼？比較 LMArena、Artificial Analysis、SWE-bench、Scale Labs 與
  LiveBench，白話解析 Arena Score、pass@1、TTFT、TPS、Cost per Task 等 12
  個關鍵指標，教你依任務選對評測平台。
translation_key: ai-model-leaderboards-benchmark-metrics-guide
translations:
  en: /en/2026/08/31/ai-model-leaderboards-benchmark-metrics/
  zh-CN: /zh-cn/2026/08/31/ai-model-leaderboards-benchmark-metrics/
categories:
  - AI 科技
tags:
  - AI
  - LLM
  - AI 評測
  - Benchmark
date: 2026-08-31 14:41:53
---

![五種 AI 模型評測方法連接中央處理器的概念封面](cover.jpg)

AI 模型排行榜常把不同能力濃縮成一個名次，但「第一名」只有放回評測方法、日期、版本與使用情境後才有意義。偏好票選、程式修復、推理正確率、回應速度與 API 成本，本來就在回答不同問題。

這篇文章比較五個目前值得交叉參考的 AI 評測平台，並拆解 12 個常見指標。讀完後，你不只會看誰排在前面，也能判斷那個分數是否真的適合自己的任務。

<!--more-->

## 先別問誰第一名：先問你想衡量什麼

選模型之前，最好先把問題歸到以下四類：

- **人類偏好**：回答是否自然、清楚、有幫助，使用者會不會比較喜歡。
- **任務能力**：數學、科學、程式、指令遵循或 Agent 任務究竟做對多少。
- **系統效能**：多久開始回應、輸出多快、整個任務要等多久。
- **經濟性**：完成一次真實任務要付多少錢，而不只是每百萬 Token 的牌價。

沒有一個排行榜能同時把這四類測得完美。對話產品可能重視偏好與首字延遲；Coding Agent 更在意問題解決率、整體耗時與每題成本；本地部署則還要加入模型大小、記憶體與授權條款。

所以真正有用的問題不是「哪個模型最強」，而是「哪個模型在我的任務、預算與延遲限制下最合適」。

## 12 個 AI 評測指標白話拆解

### 1. Arena Score

Arena Score 由大量兩兩比較的偏好結果估算模型相對位置。它適合回答「多數評審比較喜歡哪一個回答」，卻不是智力、事實正確率或任務完成率的絕對分數。

分數只在同一榜單、同一段時間與同一計算方法下具有可比性。不同平台即使都使用類似 Elo 的概念，也不能直接把數字放在一起比。

### 2. Pairwise Win Rate

Pairwise Win Rate 是模型在一對一比較中勝出的比例，通常還要處理平手、對手強弱與樣本分布。它比單一平均分更接近真實選擇情境，但也可能受到回答長度、語氣、排版與評審族群影響。

### 3. Confidence Interval 與 Rank Spread

排行榜顯示的名次不是毫無誤差的定論。**Confidence Interval** 描述估計分數的不確定範圍；**Rank Spread** 則讓你看到模型可能落在哪一段名次。

如果兩個模型的區間高度重疊，把第二名說成「明顯打敗」第三名通常言過其實。此時投票數與日期往往比名次差一格更重要。

### 4. Accuracy 與 Composite Index

Accuracy 是答對題目的比例，最容易理解；Composite Index 則把數個測試依特定權重合成總分。綜合指數方便快速篩選，但權重本身就是平台對「重要能力」的選擇。

因此看綜合分數時，至少要確認包含哪些題型、各自占比、是否使用工具，以及推理預算是否一致。

### 5. pass@1

pass@1 表示第一次生成的答案或程式通過測試的機率。它最接近日常只接受一次回答的情境，也是比較模型穩定度時很實用的數字。

不過它仍會受到採樣溫度、提示詞、執行環境與評測框架影響，不能脫離測試設定單獨引用。

### 6. pass@k

pass@k 衡量產生 k 個候選答案時，至少有一個通過的機率。當產品允許多次嘗試、平行生成或自動挑選答案時，這個指標很有價值。

但 k 越大通常代表更多 Token、時間與費用。高 pass@k 不等於使用者第一次就能拿到正確答案，也不能與 pass@1 混為一談。

### 7. Resolve Rate

Resolve Rate 常見於 SWE-bench 一類的軟體工程評測，代表在指定工具、環境與時間限制下，成功解決多少真實問題。它衡量的不只是寫出一小段函式，而是理解程式庫、修改檔案並通過測試的完整能力。

比較 Resolve Rate 時，必須一起確認資料集版本、Agent 框架、是否允許多次嘗試，以及運算預算。相同模型搭配不同 Agent，結果可能差很多。

### 8. Time to First Token

**Time to First Token，TTFT** 是送出請求到收到第一個輸出 Token 的時間。聊天產品很重視它，因為使用者會直接感受到「系統有沒有開始回應」。

但對會先進行內部推理的模型來說，第一個串流 Token 不一定是第一個真正可見的答案。

### 9. Time to First Answer Token

**Time to First Answer Token，TTFA** 專門衡量第一個可見答案 Token 出現前的等待時間。它把推理階段納入等待，因此比較 reasoning model 時，往往比 TTFT 更貼近使用者體感。

### 10. Output Speed

Output Speed 通常以每秒輸出的 Token 數表示，也常被寫成 tokens/s 或 TPS。它描述模型開始回答後的生成速度，但沒有包含前面的等待時間。

一個模型可能 TTFA 很慢、開始回答後卻很快；另一個則立即開始但逐字輸出較慢。只看 TPS 會漏掉一半體驗。

### 11. End-to-End Response Time

End-to-End Response Time 從請求送出一路算到完整答案結束。它同時受到輸入長度、思考時間、輸出長度、工具呼叫與網路影響，最接近使用者完成一次任務真正等待多久。

報告這個數字時，應註明輸出長度或任務類型，否則短回答與長篇報告不能公平比較。

### 12. Cost per Task

Cost per Task 是完成一個固定任務的平均成本。它比單看每百萬 Token 價格更適合比較推理模型與 Agent，因為便宜的 Token 不代表整題便宜：模型可能思考更久、產生更多內容，或必須重試數次。

每百萬輸入與輸出 Token 的牌價仍然重要，但應搭配實際 Token 用量、快取價格、工具費用、成功率與重試成本一起看。

## 五個主流 AI 評測平台各自在回答什麼

### LMArena：真實使用者偏好與盲測比較

[LMArena](https://arena.ai/leaderboard/text) 起源於 UC Berkeley 的 LMSYS Chatbot Arena。使用者向兩個匿名模型送出相同問題，閱讀回答後選擇較佳者或平手，平台再根據大量成對偏好計算 Arena Score。

它的優勢是題目來自真實使用者，不完全依賴固定考古題；匿名比較也能降低品牌先入為主的影響。現在的文字榜單除了 Overall，還可查看 Expert、Coding、Math、Instruction Following、Multi-Turn、Creative Writing 與 Hard Prompts 等分類。

閱讀時不要只抄第一名。更值得一起看的欄位包括分數不確定性、Rank Spread、投票數、日期與分項結果。它的主要盲點是人類偏好可能受到長度、語氣與版面影響，也不適合單靠短時間票選驗證需要執行、查證或長流程操作的任務。

### Artificial Analysis：能力、速度與成本放在同一張選型地圖

[Artificial Analysis](https://artificialanalysis.ai/) 適合開發者與企業做模型選型。它把模型能力、輸出速度、TTFT、TTFA、整體回應時間與 API 價格放在可篩選的資料中，也能比較同一模型由不同供應商提供時的效能差異。

它的 Intelligence Index 是多項評測依權重組成的綜合指數，而不是一張神祕的單科考卷。平台也有獨立的 [Coding Agents](https://artificialanalysis.ai/agents/coding-agents) 評測，將任務成功率、成本、時間與 Token 使用量並列，適合評估 Agent 的工程落地表現。

需要注意的是，平台的方法與指數版本會更新，引用時應寫明版本與日期。綜合指數目前仍以英文文字能力為主，多語、影像與語音要查看各自的獨立評測。若想深入理解操作方式，可以再看本站的 [Artificial Analysis 完整指南](/2026/08/17/選模型別再憑感覺！Artificial-Analysis-完整指南：從品質、速度到成本，情境化挑出最適合你的-AI/)。

### SWE-bench：讓 AI 修復真實 GitHub 專案

[SWE-bench](https://www.swebench.com/) 取材自真實開源專案的 Issue 與 Pull Request。評測系統建立可重現的 Docker 環境，套用模型或 Agent 產生的修補程式，再執行測試確認問題是否解決，以及原本應通過的功能有沒有被破壞。

常見版本包括完整集、Lite，以及由專業工程師逐題驗證的 [SWE-bench Verified](https://www.swebench.com/verified.html)。Verified 共有 500 個經人工確認、較少歧義的案例，是 SWE-bench 團隊與 OpenAI 合作整理的子集。後來的家族也擴展到多模態與多語版本。

這裡有一個常見誤解需要更正：SWE-bench 的重點不是籠統宣稱「使用完全未公開的單元測試」，而是用標準化環境、測試修補與明確的 FAIL_TO_PASS、PASS_TO_PASS 條件判定修復是否成立。它比單一函式題更接近真實工程，但得分仍屬於「模型、Agent 框架、工具、預算與資料集版本」的組合，不是模型名稱本身的永久能力。

若你正在比較開發工具，可以把成績與本站的 [Claude Code、Codex、Cursor 選型比較](/2026/05/06/AI-coding-工具比較：Claude-Code、Codex、Cursor-怎麼選？/) 一起閱讀。

### Scale Labs Leaderboards：從 SEAL 延伸的專家評測

[Scale Labs Leaderboards](https://labs.scale.com/leaderboard) 延續早期 SEAL Leaderboards 強調的專家設計與防止題庫污染方向，但現在已經擴展成更廣的評測集合，涵蓋前沿能力、Agentic 任務與安全等領域。

平台同時使用私有與開放資料集，由人類設計評分標準，再視規模搭配模型輔助評分。私有測試能降低廠商針對公開題庫過度調校的空間，專家規範則適合處理指令遵循、領域推理與較複雜的工作品質。

因此，今天不宜再把 Scale 的整個體系簡化成一張固定的「SEAL 五領域排行榜」。閱讀每個子榜時，應分別確認資料集是否公開、評分者是人類還是模型、題目領域、提交條件與更新日期。

### LiveBench：用新題目與客觀答案降低污染

[LiveBench](https://livebench.ai/) 的核心設計是定期加入來自近期資訊來源的新題目，降低模型在訓練階段看過題庫的機率。它涵蓋數學、程式、推理、語言、指令遵循與資料分析，並盡量使用可自動驗證的客觀答案。

與人類偏好票選或 LLM-as-a-Judge 不同，LiveBench 優先用 ground truth 自動評分，讓結果更容易重現，也減少評審模型偏好自己的回答風格。它適合觀察模型面對新問題的能力，但客觀評分較難完整捕捉創意、溝通品質與開放式任務價值，所以仍要與 LMArena 等偏好型資料互補。

## Hugging Face Open LLM Leaderboard 為什麼不再列入

Hugging Face Open LLM Leaderboard 曾是搜尋開源模型的重要入口，v2 使用 MMLU-Pro、GPQA、IFEval、MATH、MuSR 等標準測試，並讓社群模型以透明方式排隊評測。

不過官方已在 **2025 年 3 月 13 日**[宣布排行榜退役](https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard/discussions/1135)。原因包括模型能力與推理方式快速變化，原有評測組合逐漸無法提供足夠鑑別度。它評估過超過 13,000 個模型，仍是重要的歷史資料，但不應再被寫成持續更新的當代五大平台之一。

現在要挑選開源模型，除了參考歷史紀錄，也要查看模型卡、授權、上下文長度、量化版本、記憶體需求，以及在自己硬體與任務上的實測。

## 多平台比較表

| 平台 | 主要回答的問題 | 核心方法 | 最值得看的指標 | 主要盲點 |
| --- | --- | --- | --- | --- |
| **LMArena** | 使用者比較喜歡誰的回答 | 匿名成對比較與社群投票 | Arena Score、Rank Spread、投票數、分項榜 | 長度與風格偏誤，難驗證長流程任務 |
| **Artificial Analysis** | 哪個模型符合能力、速度與預算 | 標準測試加 API 效能與價格實測 | Intelligence Index、TTFA、TPS、E2E、Cost per Task | 指數權重與方法版本會改變 |
| **SWE-bench** | AI 能否修好真實軟體問題 | 重現專案環境、套用 Patch、執行測試 | Resolve Rate、pass@1、成本、時間 | 高度依賴 Agent 框架與運算預算 |
| **Scale Labs** | 模型在專家規範與新任務下表現如何 | 私有或開放資料集、人類設計標準 | 各子榜能力分數與評分方法 | 不同子榜不能視為同一套固定規則 |
| **LiveBench** | 模型能否回答近期且可客觀驗證的新題 | 定期更新題目與 ground truth 自動評分 | 分領域正確率、平均分、更新日期 | 較難衡量創意與主觀溝通品質 |

## 依照使用情境選平台

### 聊天機器人與內容助理

先看 LMArena 的 Overall、Instruction Following、Multi-Turn 與對應語言表現，再用自己的品牌語氣、正確性與拒答案例做小型盲測。偏好高不代表內容一定正確，事實查核仍不可省略。

### API 產品與大量推論服務

先用 Artificial Analysis 篩選能力、TTFA、TPS、端到端時間與價格，再以真實流量測試尖峰延遲、錯誤率、速率限制與供應商穩定性。標示價格不能取代實際帳單。

### Coding Agent 與自動化開發

查看 SWE-bench Verified 與其他終端、程式庫知識評測，同時記錄 Agent 框架、工具權限、嘗試次數、Cost per Task 與 End-to-End Time。若要設計完整開發流程，也可參考 [Agentic SDLC 架構指南](/2026/08/24/告別-Vibe-Coding！Agentic-SDLC-完整架構解析：從狀態機、驗證閘門到熱門開源專案實戰/)。

### 高風險或專業領域

優先查看 Scale Labs 等專家設計評測，並自行建立含邊界案例、拒答政策與人工覆核的私有測試集。醫療、法律與財務情境不能只憑公開總榜上線。

### 追蹤新模型與資料污染風險

用 LiveBench 觀察新題表現，再與偏好型和專家型評測交叉驗證。若一個模型只在多年不變的靜態題庫突然大幅領先，應先檢查資料污染與測試設定，而不是立刻下結論。

## 看排行榜時一定要記錄的六個欄位

分享任何 AI 跑分時，至少把以下資訊一起保存：

1. **模型的完整版本與日期**：不要只寫產品家族名稱。
2. **資料集與版本**：例如 SWE-bench Verified，而不是只寫 Coding Benchmark。
3. **評測框架與工具**：模型裸跑和 Agent 使用終端、搜尋、重試不是同一條件。
4. **推理與採樣設定**：包含 reasoning effort、溫度、輸出上限與嘗試次數。
5. **成本與時間**：同樣成功率下，便宜十倍或快十倍可能更有商業價值。
6. **不確定性與樣本數**：分數差距若落在誤差範圍內，就不應宣稱有確定勝負。

最後，最好再用 20 到 100 個自己的真實案例做驗收。公開排行榜適合縮小候選名單，產品資料才能決定最後選擇。

## 結語：把排行榜當地圖，不要當判決書

LMArena 告訴你人們偏好什麼，Artificial Analysis 幫你平衡能力、速度與成本，SWE-bench 檢查真實軟體修復，Scale Labs 提供專家規範與較難針對性準備的測試，LiveBench 則用持續更新的客觀題目降低污染。

它們不是互相取代，而是五張比例尺不同的地圖。先定義任務，再挑對平台與指標，最後用自己的資料驗證，才是選 AI 模型最可靠的方法。
