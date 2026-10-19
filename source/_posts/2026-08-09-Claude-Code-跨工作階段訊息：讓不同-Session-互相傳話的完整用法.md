title: "Claude Code 跨 Session 溝通：/list-agents 列出 Session 並互傳訊息"
description: "Claude Code 兩個 Session 怎麼溝通？v2.1.224 起不用裝外掛，直接請 Claude 傳話或用 @名稱 指定對象；/list-agents（/peers）列出可聯絡的 Session，claude agents 看背景工作。附跨機、權限設定與排查。"
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
updated: 2026-10-19 16:00:00
---

![Claude Code 跨工作階段訊息讓多個 Session 交換任務摘要的示意圖](cover.jpg)

要讓兩個 Claude Code Session 溝通，只要版本在 **v2.1.224 以上**（原生 Windows 為 **v2.1.234**），在其中一個 Session 說「請告訴 @api：migration 已完成」，Claude 就會自己用 **ListAgents** 找到對方、用 **SendMessage** 傳話，對方的回覆也會傳回來。要列出可以聯絡的 Session，輸入 **/list-agents**（別名 **/peers**）；要看所有在背景執行的 Session，在終端機跑 **claude agents**。

傳過去的只有一段文字，不含對話歷史或檔案；每個 Session 仍保有自己的工作目錄與權限。以下內容依 [官方文件：Message your other Claude Code sessions](https://code.claude.com/docs/en/cross-session-messaging) 整理，查核日期 2026-10-19。

<!--more-->

## 三步讓兩個 Session 互相傳話

**1. 確認版本**（符合版本就會自動啟用，不需要安裝 MCP 或改設定）：

```bash
claude --version
```

**2. 開兩個終端機，各自啟動並命名**：

```bash
claude -n api        # 終端機 A
claude -n frontend   # 終端機 B
```

已經在 Session 裡的話，用 **/rename api** 改名。名稱就是其他 Session 找你的地址；沒命名時，Claude Code 會用「目錄名 + 兩碼後綴」當預設名稱，例如 **my-app-3f**（[Manage sessions](https://code.claude.com/docs/en/sessions#name-your-sessions)）。兩個 Session 會改同一個 repo 的話，建議先用 Git worktree 隔開工作目錄，傳訊息不會幫你處理 Git 衝突。

**3. 在 frontend Session 輸入提示詞**：

```text
請詢問 @api：目前進度、有哪些介面變更、前端需要注意什麼。把回覆整理給我。
```

- 輸入 **@** 加名稱前幾個字會跳出 Session 選單（**v2.1.232** 起）；名稱含空白時要加雙引號，例如 **@"release notes"**。
- 不用 @ 也可以，用自然語言描述對象即可，例如「在我另一個終端機跑 migration 的那個 Session」。
- **ListAgents** 與 **SendMessage** 是 Claude 內部的工具，你不用自己呼叫；訊息內容也由 Claude 撰寫。Claude 發現自己的變更會影響其他 Session 時，也可能主動通知對方。

## 怎麼列出 Claude Code 的 Session？

「列出 Session」依你想看的東西，有三個不同的指令：

| 想看什麼 | 指令 | 內容 |
| --- | --- | --- |
| 現在能傳訊息給誰 | **/list-agents**（**/peers**） | 第一行是自己的名稱，下面列出子代理、Agent Teams 隊友、本機其他 Session；連上 Remote Control 時還包含雲端與其他機器的 Session |
| 所有背景執行中的 Session | **claude agents**、**claude agents --json** | [Agent View](https://code.claude.com/docs/en/agent-view)（研究預覽），可 attach、看 log、停止；加 **--all** 連已完成的也列出 |
| 過去的對話紀錄 | **claude --resume**、**/resume** | 開啟 Session 選擇器，用來恢復舊對話，不是傳訊息 |

如果 **/list-agents** 顯示指令不存在，代表這個 Session 沒有跨 Session 訊息功能，先升級版本。**/status** 的 **Peer address** 一列會顯示本 Session 的收件位址；若顯示 **unavailable**，代表收件 socket 沒建立成功。

想熟悉更多 Session 相關指令（插話、回溯、定時巡查），可以參考 [Claude Code 有趣指令指南](/2026/10/14/Claude-Code-有趣指令指南：插話、回溯、定時巡查與終端機彩蛋/)。

## 等另一個 Session 做完再通知我

在等長時間任務時，可以請 Claude 訂閱「對方下次閒置或結束時通知一次」：

```text
migration 那個 Session 做完手上的工作時告訴我
```

- 兩邊都需要 **v2.1.236** 以上，而且只能訂閱**同一台機器**上的 Session。
- 單純訂閱不會在對方 Session 啟動新回合或消耗 token；12 小時內沒有通知就自動取消。
- 任一方把收件設成 **refuse** 就收不到通知。

## 訊息怎麼送達、對方會怎麼處理

- **對方閒置**：直接開一個新回合處理訊息。**對方正在工作**：在工具呼叫之間讀取，不會中斷正在執行的工具。
- **畫面顯示**：一行淡色預覽，例如 **› Message from @api-worker: Schema migration finished**；按 **Ctrl + O** 開啟對話紀錄檢視器看全文。
- **安全底線**：訊息不能代替你核准權限、不能要求對方修改權限設定或 CLAUDE.md；訊息裡的 **/compact** 之類指令只是文字，不會被執行；對方需要權限時照樣會跳出提示。
- **用量**：送達的訊息會像你輸入的提示詞一樣，計入收件端的使用量。
- **限制**：只能傳純文字；同機單則上限約 100 萬字元；短時間連發會在發送端被拒；收件端最多排隊 50 則，兩個 Session 互相無限回覆會被自動節流。

## 同一台機器與跨機器的差別

| 對方在哪裡 | 傳遞路徑 | 條件與限制 |
| --- | --- | --- |
| 同一台機器 | 每個 Session 的 Unix socket（原生 Windows 為 named pipe），**不經 Anthropic 伺服器** | 所有供應商可用；Amazon Bedrock、Google Cloud Agent Platform、Microsoft Foundry 等需 **v2.1.248** |
| 同一個容器內 | 容器內的 socket | 容器與主機之間、WSL 2 與原生 Windows 之間互相看不到 |
| 自己的另一台機器 | 經 Anthropic 伺服器，走對方的 [Remote Control](https://code.claude.com/docs/en/remote-control) 連線 | **v2.1.225** 起；兩邊都要連上 Remote Control 才會出現在清單；需用 claude.ai 帳號登入，API key 不行 |
| 雲端（Claude Code on the web） | 經 Anthropic 伺服器 | 發送端需連上 Remote Control 才看得到 |

- 發送端**沒連** Remote Control 時，跨機訊息仍會送出，但沒有回覆地址，對方無法回信。
- 清單中標示 **offline** 的 Session，訊息會在它重新連線後才送達。
- 標示 **can't receive cross-session messages** 的 Session，訊息不會送出，結果以 **Not sent** 開頭。
- 跨機路徑會經過伺服器，不要把 API key、密碼或個資放進訊息。

## 權限設定：收件模式、跨機核准與全部關閉

**收件模式 crossSessionInbound**（也可在 **/config** 的 **Messages from your other sessions** 設定，v2.1.232 起）：

| 值 | 行為 |
| --- | --- |
| **accept** | 每則訊息直接送給 Claude |
| **hold** | 只顯示通知，不送達；之後若改成 accept 才會放行 |
| **refuse** | 直接丟棄 |

**未設定時的預設**看兩邊的權限模式：收件端是一般模式（含 auto、acceptEdits）就直接送達，只有發送端是 bypassPermissions 時才保留；收件端是 bypassPermissions 則一律保留待核准，除非發送端也是。保留的訊息會跳出核准對話框，預設 **5 分鐘**（**dialogExpiry**）沒回應就丟棄。

**跨機訊息一律要你核准**（即使在 bypassPermissions 模式）：

```json
{
  "isolatePeerMachines": true
}
```

**完全關閉傳送、列出與接收**：

```json
{
  "permissions": {
    "deny": ["SendMessage", "ListAgents"]
  },
  "crossSessionInbound": "refuse"
}
```

注意：拒絕 **SendMessage** 也會一併關掉 Claude 對子代理與 Agent Teams 隊友傳訊息。

**非互動式 claude -p**：會建立收件 socket（bare mode 不會），但沒有核准對話框。要讓背景 worker 無人值守地接收訊息，啟動時明確指定：

```bash
claude -p "檢查 migration 是否完成" \
  --settings '{"crossSessionInbound":"accept"}'
```

設定項說明見 [Settings reference](https://code.claude.com/docs/en/settings-reference#crosssessioninbound)。

## 跨 Session 訊息、/resume、子代理、Agent Teams 怎麼選

| 機制 | 適合情境 | 共享脈絡 |
| --- | --- | --- |
| 跨 Session 訊息 | 你自己開的多個 Session 交換進度、警告、決策 | 否，只傳文字 |
| **/resume**、**claude --resume** | 回到同一段舊對話繼續 | 是，完整歷史 |
| 子代理（subagents） | 目前 Session 把小任務委派出去，結果回報給主對話 | 否，只回傳結果 |
| [Agent Teams](https://code.claude.com/docs/en/agent-teams) | 由 lead 拆任務、有共享任務清單的代理團隊 | 各自獨立，團隊內互傳訊息 |

Agent Teams 仍是**實驗性功能**，需設定 **CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1** 才會啟用，token 用量也明顯較高。只是想讓兩個終端機交換幾句進度，用跨 Session 訊息就夠了。想進一步設計多代理的開發流程，可以看 [Agentic SDLC 完整架構解析](/2026/08/24/告別-Vibe-Coding！Agentic-SDLC-完整架構解析：從狀態機、驗證閘門到熱門開源專案實戰/)；還在比較工具的話，見 [Claude Code、Codex、Cursor 比較](/2026/05/06/AI-coding-工具比較：Claude-Code、Codex、Cursor-怎麼選？/)。

## 常見問題排查

| 症狀 | 先檢查 |
| --- | --- |
| **/list-agents** 指令不存在 | 版本：macOS／Linux／WSL 2 需 v2.1.224，原生 Windows 需 v2.1.234；可執行 **claude update** |
| 清單裡找不到某個本機 Session | 該 Session 是否用 bare mode 啟動；看它的 **/status** 中 **Peer address** 是否為 unavailable |
| 找不到其他機器或雲端 Session | 兩邊是否都連上 Remote Control、是否用 claude.ai 帳號登入（API key、Bedrock 等無法跨機） |
| 訊息送出但對方沒反應 | 對方是否設成 hold／refuse、是否有核准對話框在等你、是否超過 5 分鐘被丟棄 |
| SendMessage 不見了 | 權限設定中是否有 deny 規則擋掉 **SendMessage**、**ListAgents** |
| 想把整段對話交給另一個 Session | 訊息只傳文字，改用 **claude --resume** 恢復該對話 |
