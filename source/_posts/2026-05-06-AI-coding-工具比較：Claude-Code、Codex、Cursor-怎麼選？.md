---
title: 2026 AI Coding 工具比較：Claude Code、Codex、Cursor 怎麼選？
date: 2026-05-06 21:30:00
tags:
- AI
- OpenAI
- Claude
categories:
- AI
---

![](cover.jpg)

## 前言

最近 AI coding 工具真的變化很快，從一開始幫你補幾行程式碼，到現在直接讀整個 repo、改多個檔案、跑測試，甚至幫你整理出下一步該怎麼做，整個開發流程都不太一樣了。

而這幾個月最常被拿來討論的，基本上就是 **Claude Code、Codex、Cursor** 這三個方向。尤其是 Claude Code 的 Pro / Max 方案到底差多少、實際會不會很快撞到限制，還有 Codex 到底值不值得因為它去訂 ChatGPT，這些問題我自己也查了很久。

<!--more-->

所以這篇我不只看官方說明，也另外翻了不少 Reddit 上的近期使用心得，盡量把 **官方規則** 跟 **實際使用感受** 分開整理。這樣如果你最近也想開始試 AI coding 工具，應該會比較快知道自己適合哪一種。

如果先講結論，我自己的看法是：

- 如果你要的是目前最完整的 terminal agent 體驗，**Claude Code 依然很強**
- 如果你本來就有 ChatGPT Plus / Pro，**Codex 是最值得先試的選項**
- 如果你最在意的是編輯器裡的手感、補全和日常小改動，**Cursor 還是很順**

## [1. Claude Code：目前最像真正工程代理人的工具](https://support.claude.com/en/articles/11145838-using-claude-code-with-your-pro-or-max-plan)

Claude Code 最大的特色，不是它會寫 code 而已，而是它真的比較像一個在 terminal 裡工作的代理人。它可以直接看你的資料夾結構、讀檔、改檔、跑指令，對於多檔案重構、大型專案除錯、整理現有程式碼脈絡這種事情，整體體驗通常比純編輯器型工具更完整。

### 目前官方方案與大致限制

| 方案 | 月費 | 官方提供的平均用量 | 適合誰 |
| --- | --- | --- | --- |
| Pro | **<span style="color:#c13232">$20/月</span>** | 約 **10-40** 個 Claude Code prompts / 5 小時 | 小型 repo、輕量體驗 |
| Max 5x | **<span style="color:#c13232">$100/月</span>** | 約 **50-200** 個 Claude Code prompts / 5 小時 | 每天都會用、開始碰到 Pro 限制的人 |
| Max 20x | **<span style="color:#c13232">$200/月</span>** | 約 **200-800** 個 Claude Code prompts / 5 小時 | 重度使用者、平行開很多任務的人 |

需要注意的是，**Claude 與 Claude Code 的用量是共用的**，不是分開算。如果你白天已經在 Claude 網頁版開很多長對話，晚上再進 Claude Code，用量會一起被吃掉。

另外一個很容易忽略的點是，如果你的環境裡有設定 `ANTHROPIC_API_KEY`，Claude Code 可能會直接走 API 計費，而不是吃你的 Pro / Max 訂閱額度，這點官方文件有特別提醒。

### Reddit 上比較常見的使用感受

我看下來，近期 Reddit 上對 Claude Code 的共識其實蠻明顯的：

- 大家普遍認為它在 **大型 codebase 理解、多檔案修改、規劃能力** 上很強
- 真正的問題通常不是品質，而是 **Pro 方案很容易不夠用**
- 很多人會把 Claude Code 留給「功能級別」的工作，像是重構、長鏈除錯、架構整理，而不是拿來做每一個小修改

也就是說，**Claude Code Pro 比較像試水溫方案**。如果你只是偶爾寫小工具，它可以用；但如果你是希望它真的變成日常主力，很多使用者最後還是會往 Max 5x 甚至 Max 20x 移動。

## [2. Codex：如果你已經在 ChatGPT 生態裡，最值得先試](https://chatgpt.com/codex/pricing/)

Codex 現在和早期大家印象中的「OpenAI 舊 Codex 模型」已經不是同一回事。現在它更像是 OpenAI 的 coding agent 產品線，能在本地或雲端幫你做實際任務，也可以接 IDE、CLI 與額外工具。

對一般使用者來說，Codex 最大的優勢很簡單：**它已經被包進 ChatGPT 方案裡了**。如果你本來就有 ChatGPT Plus 或 Pro，那其實不太需要額外再決定一次要不要買別的工具，先用 Codex 看看自己的工作流合不合，通常是最合理的做法。

### 目前官方方案與限制重點

截至 **2026 年 5 月 6 日**，OpenAI 官方說明是：

- **ChatGPT Plus：<span style="color:#c13232">$20/月</span>**
- **ChatGPT Pro：<span style="color:#c13232">$100/月</span>** 與 **<span style="color:#c13232">$200/月</span>** 兩個 tiers
- Codex 已包含在 Free / Go / Plus / Pro / Business / Enterprise 中

以 Plus 方案的 **GPT-5.3-Codex** 為例，官方目前給的平均值大致如下：

| 類型 | Plus 方案平均值 / 5 小時 |
| --- | --- |
| Local messages | **30-150** |
| Cloud tasks | **10-60** |
| Code reviews | **20-50** |

而 Pro 目前是走 **5x 或 20x 比 Plus 更多用量** 的方式，超過內含用量後，Plus / Pro 也可以另外買 credits 繼續用。OpenAI 在 **2026 年 4 月 2 日** 也把 Codex 的 flexible pricing 往 token / credits 的方向調整，所以它的成本感受會比單純「一則訊息算一次」更明顯和任務大小綁在一起。

### Reddit 上比較常見的使用感受

Reddit 上對 Codex 的評價，這陣子我看到比較多的是這幾點：

- 很多人喜歡它的 **指令遵循與推理品質**
- 對複雜問題，有些使用者會覺得它比 Claude 更穩，或至少更乾淨
- 但如果你主要依賴 cloud task，那種「丟一個任務等它回來」的節奏，很多人也會覺得 **回饋迴圈比較慢**

所以 Codex 的問題通常不是「能不能做」，而是 **你喜不喜歡它的工作節奏**。如果你已經習慣在編輯器裡一直來回微調，Codex 不一定是最順手的；但如果你本來就習慣把需求講清楚，再讓代理人一次做大一點的工作，它其實很有吸引力。

## [3. Cursor：編輯器體驗還是很強](https://cursor.com/pricing)

如果把 Claude Code 跟 Codex 都看成比較偏代理人的工具，那 Cursor 目前仍然是比較像「AI editor」的成熟產品。它的優勢不是哪個單一模型一定最強，而是整個體驗做得比較完整：補全、inline diff、在編輯器裡來回修小地方，整體都比較自然。

### 目前官方方案

| 方案 | 月費 |
| --- | --- |
| Pro | **<span style="color:#c13232">$20/月</span>** |
| Pro+ | **<span style="color:#c13232">$60/月</span>** |
| Ultra | **<span style="color:#c13232">$200/月</span>** |

Cursor 官方目前比較強調不同方案對 OpenAI、Claude、Gemini 模型的使用倍數差異，例如 **Pro+ 是 3x usage、Ultra 是 20x usage**。它不像 Claude Code 那樣把「大約幾個 prompts / 5 小時」寫得那麼直接，所以實際感受會更看你的模型選擇和工作方式。

### Reddit 上比較常見的使用感受

近期 Reddit 上對 Cursor 的看法大致是：

- 日常小修改、快速迭代、手動微調時，**Cursor 通常比 terminal agent 更順**
- 如果是大型多檔案任務，很多人還是會覺得 **Claude Code 更能掌握全局**
- 有些人最後不是三選一，而是 **Cursor + Claude Code** 一起用，讓 Cursor 負責日常編輯，Claude Code 負責重任務

這也是為什麼 Cursor 到現在還是很有競爭力。因為很多人真正要的，不是完全放手，而是 **在保留 IDE 手感的前提下，把 AI 接進原本 workflow**。

## 我自己會怎麼選

如果今天是我自己要花錢，我大概會這樣分：

| 你的情況 | 我會比較推薦 |
| --- | --- |
| 只是想先試 AI coding，而且已經有 ChatGPT Plus | **先用 Codex** |
| 想讓 AI 直接進 repo 做大改動、跑指令、幫你規劃 | **Claude Code Max 5x** |
| 很在意 IDE 體驗，平常是大量小改動與反覆微調 | **Cursor Pro / Pro+** |
| 幾乎每天都在高強度 coding，還會同時開很多任務 | **Claude Code Max 20x** 或 **ChatGPT Pro** |

如果你現在最在意的是 **Claude Code 的方案值不值得上**，那我自己的結論會是：

- **Pro 可以試，但不要用 Pro 來判斷 Claude Code 的上限**
- 如果你真的拿它做正經專案，**Max 5x 才比較像進入實用區間**
- 如果你本來就有 ChatGPT Plus，則可以先把 **Codex 當成最低成本的比較基準**

也就是說，最不容易後悔的順序通常是：

1. 先用自己現有方案能碰到的工具
2. 確認自己到底偏好 editor workflow 還是 terminal agent workflow
3. 再決定要不要往 Claude Code Max 或更高 tier 的 Codex / Cursor 走

## 結語

AI coding 工具現在已經不是單純比模型聰不聰明了，而是在比 **工作流、限制設計、價格結構，還有你自己會不會真的把它用進日常開發**。

如果你問我現在最值得注意的是哪一個，我會說 **Claude Code 與 Codex 都很值得試**，只是前者更像是專門給重度開發者的代理人工作台，後者則比較適合已經在 ChatGPT 生態裡的人直接延伸使用。至於 Cursor，則依然是「最好上手、最像正常 IDE」的那一邊。

所有價格、限制與方案內容皆以筆者於 **2026 年 5 月 6 日** 撰寫當下查詢到的官方資訊為準，若之後有任何調整，請以各家官方網站為主。

## 參考資料

- [Anthropic 官方：Using Claude Code with your Pro or Max plan](https://support.claude.com/en/articles/11145838-using-claude-code-with-your-pro-or-max-plan)
- [Anthropic 官方：About Claude's Pro Plan Usage](https://support.anthropic.com/en/articles/8324991-about-claude-s-pro-plan-usage/)
- [Anthropic 官方：About Claude's Max Plan Usage](https://support.anthropic.com/en/articles/11014257-about-claude-s-max-plan-usage/)
- [OpenAI 官方：Codex Pricing](https://chatgpt.com/codex/pricing/)
- [OpenAI 官方：About ChatGPT Pro plans](https://help.openai.com/en/articles/9793128-about-chatgpt-pro-plans)
- [Cursor 官方：Pricing](https://cursor.com/pricing)
- [Reddit 討論：Claude code vs codex vs cursor](https://www.reddit.com/r/ClaudeCode/comments/1rc7nfl/claude_code_vs_codex_vs_cursor/)
- [Reddit 討論：Cursor vs Claude Code vs Codex](https://www.reddit.com/r/cursor/comments/1qz8rof/cursor_vs_claude_code_vs_codex_ignore_price/)
- [Reddit 討論：Is Claude Max worth it?](https://www.reddit.com/r/ClaudeAI/comments/1qktuif/is_claude_max_worth_it/)
- [Reddit 討論：Codex Local vs Cloud](https://www.reddit.com/r/codex/comments/1t06u9l/codex_local_vs_cloud/)
