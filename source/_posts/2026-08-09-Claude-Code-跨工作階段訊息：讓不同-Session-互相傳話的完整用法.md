title: Claude Code 跨工作階段訊息：讓不同 Session 互相傳話的完整用法
description: >-
  Claude Code v2.1.224 新增跨工作階段訊息，讓不同 Session
  交換任務摘要、詢問進度並回覆答案。本文整理實際用法、跨機限制、Agent Teams 差異與安全設定。
translation_key: claude-code-cross-session-messaging
translations:
  en: /en/2026/08/09/claude-code-cross-session-messaging/
  zh-CN: /zh-cn/2026/08/09/claude-code-cross-session-messaging/
categories:
  - AI 科技
tags:
  - AI
  - Claude Code
  - AI Agent
  - 開發工具
date: 2026-08-09 14:10:00
updated: 2026-08-27 19:00:00
---

![Claude Code 跨工作階段訊息讓多個 Session 交換任務摘要的示意圖](cover.jpg)

Claude Code 最近出現一個很容易讓人第一眼誤會、但實際上相當實用的功能：**不同的 Claude Code Session 現在可以互相傳訊息**。

它的實際用法很直覺：你可以在一個終端機裡工作到一半，請 Claude 去詢問另一個終端機裡的 Session；另一個 Session 也可以把剛完成的工作摘要傳回來，甚至在它發現自己的修改會影響其他 Session 時主動通知對方。

不過，這個功能不是把兩段完整對話合併，也不是把整個專案檔案自動搬來搬去。它傳遞的是**文字訊息與摘要**，而且每個 Session 仍然保有自己的工作目錄、權限與對話脈絡。理解這個邊界，才不會把它和 `--resume`、子代理或 Agent Teams 混在一起。

<!--more-->

## 先講結論：這是一個 Session 之間的訊息層

Claude Code 官方把它稱為 **cross-session messaging**，中文可以理解成「跨工作階段訊息」。官方變更紀錄顯示，這項能力從 **Claude Code v2.1.224** 開始加入，支援 macOS、Linux 與 WSL2。

它的運作方式可以拆成四步：

1. 你在目前的 Session 提出要求，例如「詢問另一個 Session 的 migration 做完了沒有」。
2. Claude 使用 `ListAgents` 找出目前可以聯絡的 Session，再使用 `SendMessage` 傳送一段文字。
3. 對方收到的不是你的完整歷史紀錄或檔案，而是這次傳過去的訊息。
4. 對方可以回答，回答再透過同一套機制回到原本的 Session。

所以它比較像是幾個獨立工作站之間多了一個郵差，而不是把幾個 AI 合併成一個共享大腦。

官方文件： [Message your other Claude Code sessions](https://code.claude.com/docs/en/cross-session-messaging)、[Claude Code v2.1.224 changelog](https://code.claude.com/docs/en/changelog)。

## 它到底能解決什麼問題？

### 1. 不用重新解釋剛剛做過的事

假設你有一個 Session 正在處理資料庫 schema migration，另一個 Session 正在處理前端表單。以前前端 Session 想知道後端改了哪些欄位，你通常要自己整理一段背景，再貼到另一個對話裡。

現在可以直接在前端 Session 說：

```text
請詢問負責資料庫 migration 的 Session：schema 是否已完成，實際改了哪些欄位，以及前端需要注意哪些相容性問題。請把答案整理後回傳給我。
```

Claude 會負責找對方、組織問題、等待回覆，再把結果帶回目前的對話。這對同一個專案同時開很多終端機的人特別方便。

### 2. 平行工作時交換進度

你可以讓不同 Session 各自負責一個邊界清楚的工作：

| Session | 工作內容 | 需要傳出去的資訊 |
| --- | --- | --- |
| API | 修改 API 與資料模型 | endpoint、欄位、驗證結果 |
| 前端 | 更新畫面與型別 | API response 的實際變更 |
| 測試 | 檢查回歸與邊界案例 | 測試結果、失敗案例、阻塞原因 |

API Session 完成後，可以主動傳一則摘要給前端或測試 Session。這比讓每個 Session 不斷重新掃描整個 repository，更接近人類團隊交接工作的方式。

### 3. 詢問另一台機器上的工作狀態

官方文件也把跨機器回覆列為用途之一。比如你在筆電上的 Session 想知道桌機上的長時間測試是否完成，可以發出詢問，讓遠端 Session 回答狀態。

但這裡有一個很重要的限制：**跨機器或 Claude Code Web 的 Session 目前主要是回覆型連線**。你不能把它當成任意方向、任意時間都能推送工作的遠端控制通道；通常要先有可回覆的訊息路徑，且 Remote Control 必須讓對方 Session 可被找到。

## 實際怎麼用？

### 第一步：確認版本與環境

先在終端機確認版本：

```bash
claude --version
```

官方要求是 **v2.1.224 或更新版本**，可用平台是 macOS、Linux 與 WSL2；原生 Windows 目前不在支援範圍內。這不是一個需要另外安裝 MCP 或啟用外掛的功能，符合版本與平台條件後，功能會隨 Claude Code 提供。

我目前檢查這台工作環境得到的版本是 `2.1.186`，低於官方要求，因此本文把官方文件與變更紀錄確認到的用法整理出來，沒有把這台舊版本的結果冒充成跨 Session 實測。升級後可用下面的檢查清單驗證：

```bash
claude --version
```

進入 Claude Code 後，再輸入：

```text
/list-agents
```

如果指令不存在，或沒有列出可聯絡的 Session，先檢查版本、平台、Remote Control 狀態與功能是否被組織設定關閉。

### 第二步：開啟兩個獨立的 Claude Code Session

在兩個終端機分別進入同一個專案，或進入各自的 worktree：

```bash
claude
```

建議一開始就替 Session 命名，後面比較容易辨識。進入 Claude Code 後，可以使用：

```text
/rename api
```

另一個終端機則可以命名為：

```text
/rename frontend
```

如果兩個分支需要同時修改，最好使用 Git worktree 把工作目錄隔離開來。例如：

```bash
git worktree add ../project-api feature/api
git worktree add ../project-frontend feature/frontend
```

跨 Session 訊息本身不會替你解決 Git 衝突，也不會讓兩個 Session 共享未提交的修改。工作目錄隔離與責任邊界仍然要由你自己設計。

### 第三步：查看目前可以聯絡誰

在 Claude Code 裡輸入：

```text
/list-agents
```

這個指令的別名是：

```text
/peers
```

清單可能包含：

- 同一台機器上的其他互動式 Session
- 綁定了 inbox socket 的背景或非互動式 Session
- 目前透過 Remote Control 可達的其他機器或 Web Session

Session 名稱可以來自 `/rename` 或啟動時的 `--name`；如果沒有命名，Claude Code 會根據工作目錄產生名稱，重名時再加上短識別字串。

這裡要分清楚兩個容易混淆的名稱：`/list-agents` 是「查看可以傳訊息的對象」；`claude agents` 則是另一個用來查看或管理代理狀態的 CLI 介面，兩者不是同一件事。

### 第四步：用自然語言請 Claude 傳話

使用者通常不需要自己呼叫 `ListAgents` 或 `SendMessage`。只要描述你希望完成的交接：

```text
請把我們剛完成的登入流程修改摘要傳給 frontend Session，包含變更的 API、錯誤格式，以及它需要更新的型別。請不要傳整份檔案，只傳必要摘要。
```

也可以反過來詢問：

```text
請問 tests Session 目前是否已跑完回歸測試？如果失敗，請回傳失敗測試名稱、錯誤原因與是否阻塞發布。
```

Claude 會在需要時使用 `ListAgents` 找到對象，再使用 `SendMessage` 傳送文字。真正傳出的內容應該是清楚、短小、可執行的交接資訊，而不是「請自己看完整個專案」這種模糊要求。

### 第五步：理解收件端的行為

如果收件 Session 正在等待，它通常會開始處理收到的訊息；如果它正在執行其他工作，訊息會在工具呼叫之間送達，不會硬插入目前正在進行的工具操作。

收件 Session 回答後，原本的 Session 會收到回覆。訊息畫面會顯示類似 **Message from** 的列，必要時可以使用 `Ctrl + O` 展開較完整的內容。

這個設計有兩個好處：不會偷偷中斷另一個 Session 的檔案操作；同時也讓每個 Session 保有自己的權限判斷。如果收件端原本就被禁止執行某個動作，另一個 Session 不能透過傳訊息繞過這個限制。

## 同一台機器與跨機器，行為不一樣

這是目前最值得在文章裡講清楚的部分。官方文件把訊息的傳遞路徑分成幾種情境：

| 情境 | 傳遞方式 | 能做什麼 | 主要限制 |
| --- | --- | --- | --- |
| 同一台機器 | 每個 Session 的本機 socket | 可互傳新訊息與回覆 | 兩邊要看得到同一個可用的檔案系統與 inbox socket |
| 同一個 container | container 內的 Session socket | 可互傳訊息 | Host 與 container 之間的 Session 不會自動互相看見 |
| 自己的另一台機器 | Anthropic 服務與 Remote Control | 主要是回覆訊息 | 需要建立可達連線，通常不是任意方向的主動推送 |
| Claude Code Web | Anthropic 服務 | 主要是回覆訊息 | 不是同機 Session 的完整雙向 socket 通道 |

同機訊息不會經過 Anthropic 伺服器；跨機器與 Web 路徑則會經過 Anthropic 服務。因此，如果訊息可能跨機器，就不要把 API key、個人資料、密碼或不必要的原始碼直接塞進摘要裡。

另外，兩個 Session 即使在同一個 repository，也不代表它們共享對話歷史。訊息只是額外送到對方的文字；檔案是否存在、工作目錄是否相同、未提交修改是否可見，仍然取決於實際的檔案系統與 Git 配置。

## 它和 `--resume`、子代理、Agent Teams 有什麼不同？

這四種機制都能讓人感覺「不只一個 AI 在工作」，但設計目標完全不同：

| 機制 | 核心用途 | 是否共享完整脈絡 | 是否有共享任務清單 |
| --- | --- | --- | --- |
| 跨工作階段訊息 | 讓獨立 Session 互相詢問與交接 | 否，只傳文字訊息 | 否 |
| `--resume` 或 `/resume` | 回到同一段既有對話 | 是，回到原本 Session 的脈絡 | 不適用 |
| 子代理 | 把工作委派給目前 Session 的子工作者 | 子代理回報給父 Session | 不適用 |
| Agent Teams | 組成有 lead 與 teammates 的代理團隊 | 各自有脈絡，可直接互傳團隊訊息 | 有，共享任務清單 |

如果只是「我在兩個終端機各開一個 Claude，請它們交換幾句進度」，用跨工作階段訊息就夠了。

如果你要的是一個主代理拆任務、追蹤狀態、管理多個隊友，那是 Agent Teams。Agent Teams 目前仍是實驗性功能，需設定：

```bash
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
```

它們不是同一個功能，也不要因為都使用 `SendMessage` 就以為兩者共享同一套任務管理。跨 Session 訊息是比較鬆散的郵件式交接；Agent Teams 則有團隊成員、任務清單與更完整的協作協定。

完整差異可參考 [Agent Teams 官方文件](https://code.claude.com/docs/en/agent-teams) 與 [Tools reference](https://code.claude.com/docs/en/tools-reference)。

## 權限與安全設定：不要一開就全部接受

跨 Session 傳訊息雖然只是文字，但它仍然會影響另一個代理接下來的行為。官方提供幾個設定控制收件、跨機器與工具權限。

### 控制收到訊息時的行為

`crossSessionInbound` 有三種值：

```json
{
  "crossSessionInbound": "hold"
}
```

- `accept`：自動接受可進入的訊息，適合你完全掌控的背景工作。
- `hold`：先保留並通知你審核，互動式工作比較適合這個方式。
- `refuse`：拒絕收到的跨 Session 訊息。

未設定時，實際行為會受到發送端與收件端權限模式影響，不要把它理解成所有訊息都會自動執行。被保留的訊息需要審核，官方文件說明互動式保留對話有等待期限；如果收件端沒有能力顯示審核對話，就不適合依賴 `hold` 來做無人值守流程。

### 阻止跨機器訊息直接通過

如果你想讓跨機器回覆一定經過明確批准，可以在設定中加入：

```json
{
  "isolatePeerMachines": true
}
```

這會要求跨機器的訊息經過明確核准，即使 Session 使用比較寬鬆的模式也一樣；同一台機器內的訊息不會因此多一道提示。這個設定適合團隊共用設定或你不確定遠端 Session 目前由誰控制的環境。

### 完全關閉傳送與搜尋

如果專案根本不需要這項能力，可以同時拒絕兩個工具：

```json
{
  "permissions": {
    "deny": ["SendMessage", "ListAgents"]
  },
  "crossSessionInbound": "refuse"
}
```

拒絕 `SendMessage` 也會阻止 Claude 對子代理或 Agent Teams teammate 傳送訊息，所以這不是只關掉跨 Session 的細項，而是關掉整個訊息工具。

### 非互動式 `claude -p` 的注意事項

非互動式模式如果要接收訊息，必須有 inbox socket。官方文件指出，`claude -p` 會綁定 socket，但最精簡的 bare mode 不會；而 `-p` 沒有互動式審核對話，因此若要讓它無人值守接收，必須明確設定 `crossSessionInbound`：

```bash
claude -p "檢查 migration 是否完成" \
  --settings '{"crossSessionInbound":"accept"}'
```

這個例子只適合你清楚知道收件 Session 會接到什麼內容的自動化工作。對一般開發流程來說，先用互動式 Session 加上 `hold`，比較容易看見誰在傳什麼訊息。

還有三條安全底線很重要：

1. 收到的訊息不能替你核准原本被拒絕的權限。
2. 訊息裡的 `/compact`、`/resume` 等 slash command 只是文字，不會在收件端自動執行。
3. 訊息會算入收件 Session 的使用量，跨 Session 傳越多冗長內容，仍然會消耗額度與上下文空間。

## 最適合的工作流：摘要交接，不是整包搬運

我會建議把每一則跨 Session 訊息限制在以下格式：

```text
工作：完成登入 API schema 調整
狀態：已完成，測試通過 18/18
變更：POST /api/login 的錯誤回應新增 code 欄位；成功回應未變
需要你處理：更新 frontend 的 LoginError 型別與錯誤提示
注意：舊版 client 仍可能只讀 message 欄位
```

這種訊息有三個優點：

- 收件端不需要重新猜測背景。
- 發送端不必傳整個檔案或整段歷史紀錄。
- 之後回頭看訊息時，可以快速知道狀態、變更與下一步。

相反地，以下幾種說法都很容易讓協作失控：

- 「你自己看一下剛才改了什麼。」
- 「把所有 context 傳過去。」
- 「請直接幫我完成另一個 Session 的工作。」

第一種不夠具體，第二種違反這個功能只傳文字摘要的設計，第三種則忽略了收件端自己的權限、工作目錄與任務邊界。好的跨 Session 訊息應該像工程師交接，不像把責任整包丟給另一個人。

## 常見問題與排查順序

### `/list-agents` 找不到指令

先確認 Claude Code 是否至少是 v2.1.224。若版本正確，仍要檢查平台是否為 macOS、Linux 或 WSL2，以及目前使用的 Claude Code 供應方式是否支援這項能力。官方文件列出 Amazon Bedrock、Claude Platform on AWS、Google Cloud 的 Agent Platform 與 Microsoft Foundry 等環境目前不提供這項功能。

### 清單有 Session，但訊息沒有立刻出現

收件端如果正在執行工具，不一定會在畫面上立刻插入訊息；它會等到工具呼叫之間再讀取。若它是互動式 Session，也可能因為 `hold` 正在等待你核准。先查看收件端的訊息列與權限提示，不要立刻重送一堆相同內容。

### 以為傳訊息就會自動傳檔案

不會。官方明確說明，跨 Session 訊息是純文字，沒有對話歷史或檔案。需要完整上下文時，應該回到同一個 Session 使用 `/resume`；需要共同修改檔案時，則要先設計好 worktree、分支與測試責任。

### 以為跨機器可以隨時主動呼叫

目前跨機器與 Web Session 的主要用途是回覆。你需要先讓對方 Session 可被 Remote Control 找到，而且實際可用方向受官方訊息路徑限制。不要把它當成一般遠端執行 API，也不要把沒有回應誤判為對方正在執行你指定的工作。

### 以為訊息可以繞過權限

不可以。收件端仍會按照自己的權限模式、工具允許與專案規則處理；另一個 Session 傳來的文字不是使用者同意書，也不會自動核准危險動作。

## 這項功能真正有趣的地方

以前多個 Claude Code Session 的問題是：它們雖然可以平行工作，卻互不知道彼此做到哪裡。你得充當人工路由器，在不同終端機之間複製貼上進度、錯誤訊息與下一步。

跨工作階段訊息補上的，正是這一層很薄、但很關鍵的協作能力。它沒有假裝所有代理共享同一份記憶，也沒有把檔案與權限邊界抹平；它只讓一個獨立 Session 可以在需要時問另一個 Session 一句話，再把答案帶回來。

因此，這個功能最適合的定位不是「Claude Code 終於變成一個超級代理」，而是：**Claude Code 開始具備多個獨立工作者之間的基本溝通能力**。如果你的工作方式本來就會同時開 API、前端、測試、文件或長時間背景任務，這會是一個很自然的效率提升。

但如果你要的是完整的任務分派、共享清單與團隊協議，應該研究 Agent Teams；如果你只是要恢復原本的長對話，應該用 `/resume`。把工具用在正確的協作層級上，才不會讓新的訊息功能反而增加混亂。

## 官方資料

- [Claude Code：Message your other Claude Code sessions](https://code.claude.com/docs/en/cross-session-messaging)
- [Claude Code Tools reference](https://code.claude.com/docs/en/tools-reference)
- [Claude Code Settings](https://code.claude.com/docs/en/settings)
- [Claude Code Agent Teams](https://code.claude.com/docs/en/agent-teams)
- [Claude Code Changelog](https://code.claude.com/docs/en/changelog)
- [ClaudeDevs 原始貼文](https://x.com/ClaudeDevs/status/2085817074816070014)
