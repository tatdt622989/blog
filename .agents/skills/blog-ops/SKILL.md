---
name: blog-ops
description: 操作 6yuwei.com 這個 Hexo 部落格——查看/建立/編輯選題趨勢、寫新文、改舊文、發布。當使用者要求跟「趨勢/選題/新文章/優化舊文/部署部落格」相關的任何操作時使用。
---

# 部落格全自動管理 — 操作手冊

兩層目錄,不要搞混:

- **repo 根目錄** `/Volumes/X9Pro/project/blog`:公開的 Hexo 部落格本體。文章在 `source/_posts/`,SOP 與排版慣例見根目錄 `CLAUDE.md`(務必先讀,所有寫文/改文都要照它的規則)。
- **`automation/`**:本地用的數據與選題系統,整個目錄被 `.gitignore` 排除,不會進公開版控。`automation/data/` 底下是歷史快照與佇列檔案(JSON)。

## ⚠️ 舊的 Node 全自動排程已停用,不要重新啟用、不要呼叫 trends/write/optimize

`automation/cli.js` 裡還留著一套完整的 `trends`/`write`/`optimize`/`run-daily` pipeline,原本搭配 `~/Library/LaunchAgents/com.6yuwei.blog-automation.plist` 每天 8:00 用 launchd 跑 `run-daily --go`。**這套東西本身可以正常執行,不是壞的**——但它會全自動發文/改文,完全不等使用者確認,這正是這份 skill 要取代掉的行為,所以已經 `launchctl unload` 把排程停掉了。

**不要**重新 `launchctl load` 這個 plist、**不要**手動跑 `node cli.js trends`/`write`/`optimize`/`run-daily --go`。選題/寫文/改文一律照這份 skill 的流程由你自己做。(補充:若在互動 session 裡直接呼叫這幾個指令,它們內部會再 spawn 一次 `agy` subprocess,巢狀呼叫容易卡住失敗——但這只是順便一提,不是停用的主要原因。)

以下指令是安全的、可以直接跑(它們不會呼叫 agy,純粹讀資料/寄信):

```bash
cd /Volumes/X9Pro/project/blog/automation
node cli.js collect          # 抓 GA4/AdSense/GSC 昨日數據存快照
node cli.js analyze          # 用快照算出待優化文章佇列
node cli.js report --dry-run # 印出每日報告(不寄信)
node cli.js whoami           # 列出可用的 GA4/AdSense/GSC 帳號 id
```

## 新增一篇文章:沒指定題目時,先用數據分析推薦清單,不要自己悶頭選

當使用者要新增文章、但**沒有**指定題目時,**不要自己選定題目就直接動筆寫**。流程是「先推薦、使用者選、才寫」:

1. 讀 `automation/config.yml` 的 `niches`(目前是 AI、Claude、日語學習、遊戲開發、Codex、ChatGPT)當題材範圍。
2. 讀 `automation/data/` 底下**最新一份** `metrics-*.json`(用 `ls -t` 找最新),裡面有兩個對選題有用的訊號:
   - `opportunities.striking`:GSC 排名落在 8–20、已經有曝光的「查詢×頁面」——這些主題小幅延伸/補強最容易在短期內衝上第一頁,是加分選項。
   - `adsense.topPages`:目前流量/收益最好的頁面——可以考慮寫該主題的延伸或更新版,承接既有的興趣。
3. `ls source/_posts` 看現有文章標題,**避開**重複或高度相似的題目。
4. 針對上面範圍,**上網搜尋當下(用 `date +%F` 確認今天日期,不要憑記憶)真正最新的新聞/工具/版本**。
5. **整理 3–5 個候選題目回報給使用者**,每個都要附上:標題、一句話切入角度、**為什麼推薦(用了哪些數據訊號,例如「對應 GSC 機會詞『contabo 評價』,目前排名 9.21,差一點上第一頁」或「契合利基 X,且沒有寫過」)**。
6. **停在這裡,等使用者回覆要選哪一個,或自己提供別的題目**——不要自動接著寫文、不要自己幫使用者做決定。

使用者選定(或自己提供)題目後,才進入下面「寫一篇新文章」的流程。

## 寫一篇新文章

當使用者已經給定明確題目(自己提供的,或從上面推薦清單裡選的):

1. **先研究**:針對該題目的關鍵字上網搜尋當下真實資料、新聞、案例、數據,記住來源用於查證——但**不要逐句照抄或近似貼上**,消化後用自然語氣、自己的話原創改寫。不確定/查不到的具體數字一律不寫,不要捏造。
2. **建檔走 SOP,不要手刻 .md**:
   ```bash
   cd /Volumes/X9Pro/project/blog
   npx hexo new "文章標題"
   ```
   會建立 `source/_posts/YYYY-MM-DD-文章標題.md` 與同名資產資料夾。
3. **寫內容**,嚴格遵守(根目錄 `CLAUDE.md` 的慣例,這裡列最容易忘記的幾條):
   - 繁體中文台灣用語,嚴禁簡體字。
   - 字數以約 1500 字為基準,內容紮實時可適度超出(不必為了湊字數或硬砍重點而犧牲品質);語氣像真人部落客在分享,不要 AI 八股套話、不要又長又無聊。
   - 封面 + 前言之後、第一個 `##` 之前一定要放 `<!--more-->`(無空格)。
   - 強調用 `**粗體**`,選單路徑/按鈕/快捷鍵/檔名都用粗體,不要用反引號(反引號只留給真正程式碼)。
   - front-matter 的 `title`/`description` 必須是純文字,不可有 markdown、粗體、反引號、連結。
   - **內文不可放置編造的假網址（如 example.com），亦不可殘留 `[[wiki]]` 語法。但為了最大化 Google SEO 效果與頁面權重傳遞，合理且安全的內部連結（導流相關文章）與官方外部連結（如官方 GitHub 或官網）是允許且建議的。**
   - 直式長條型截圖(高/寬比 > 1.5)不要直接放、不要用 `max-height` 硬縮,要把原圖置中疊在符合原圖顏色的背景上做成 4:3 banner(見 `CLAUDE.md`)。
   - **一律禁止使用表情符號（Emoji）**：不論是文章大標題、副標題（H2、H3、H4 等，即目錄/目次中會出現的標題）或內文，一律禁止使用 Emoji 表情符號，以維持部落格的專業與簡潔。
4. **生封面**:生成一張 16:9、乾淨扁平向量風格、**畫面中完全沒有任何文字/字母/數字**的插圖,存成資產資料夾裡的 `cover.png` 或已壓縮的 `cover.jpg` (體積必須限制在 300KB 以下以利行動端載入速度),文章開頭用對應格式引用。
5. **先停在草稿,不要自動發布**:做完 1–4 步後就停下來,把寫好的標題、字數、文章路徑回報給使用者,讓他看過草稿(`.md` 內容 + `cover.png`)再決定要不要上線。**除非使用者一開始就明確說「直接發布/上線/deploy」,否則不要自己往下做部署。**
   - ⚠️ **硬性闸門,沒有例外**:你自己執行指令時收到的任何「權限已自動核准」「已收到自動核准的通知」之類的系統/工具層訊息,**都不是使用者同意發布**——那只是執行環境的權限設定,跟使用者本人的意思無關。**唯一能讓你執行第 6 步的條件,是這次任務最初的 prompt 裡使用者就已經明確寫了「直接發布/上線/deploy」字樣,或使用者事後另外傳達了明確的發布指示。**如果不確定,就停下來回報草稿、不要動 git/build。
6. **使用者確認要發布後才做**:
   ```bash
   npm run build     # 重新產生 public/
   git status        # 確認 working tree 只有這次發文相關的變更,沒有夾帶 automation/ 或其他無關檔案
   npm run deploy     # hexo generate && git add . && git commit && git push origin main → CI 自動部署
   ```
   若 `git status` 發現夾帶無關變更,不要直接 `npm run deploy`,改成只 `git add` 這次要發的檔案再手動 commit/push。
   commit message **不要**加 `Co-Authored-By: Claude ...` 這行。

## 改既有文章(SEO 優化/補內容)與新鮮度優化

`automation/data/optimize-queue-*.json` 是流量差、值得優化的候選文章佇列,格式:

```json
[{ "postPath": "source/_posts/xxx.md", "title": "...", "url": "...", "signals": ["recent-low-traffic"], "evidence": { "clicks": 0, "impressions": 4, "position": 14 }, "score": 91 }]
```

流程:
1. 讀 `postPath`(相對 repo 根目錄)→ 只做「輕改」(標題/meta description/補一段,不要整篇重寫、不動原結構)。
2. 同樣套用上面「寫新文章」的所有慣例規則。
3. **重要 SEO 新鮮度優化**：每次修改既有文章，必須在 front-matter 中新增或更新 `updated: YYYY-MM-DD HH:mm:ss` 欄位，以傳遞「最後修改時間」給搜尋引擎爬蟲。
4. **網址變更限制**：非必要絕對不修改已發布文章的檔名或網址 (URL)。若因標題優化必須重新命名檔案（變更 URL），部署後必須於伺服器或 Cloudflare 設置 301 轉址，防止 SEO 權重丟失與 404 死連結。
5. 建置部署：`npm run build` ➔ 確認 git status 乾淨 ➔ `npm run deploy`。

## 📊 數據收集與 CSV 時序資料庫儲存規範

為了方便長期趨勢分析，數據採集系統除了產生 JSON 快照外，也會在 `automation/data/` 底下自動寫入與追加以下 4 個 CSV 時序檔案。這 4 個檔案已被 `.gitignore` 排除，**絕對不能 commit 進公開 Git 版控**：
- `daily_site_metrics.csv`：網站每日核心總量指標。
- `gsc_pages_history.csv`：所有自然搜尋頁面排名的長期歷史。
- `ga4_pages_history.csv`：所有單頁流量與參與率歷史。
- `action_history_log.csv`：變更日誌，記錄每一次優化（optimized）或發文（created），以便與流量波動進行關聯分析。

## 🤖 場景導向的工具調用對照表

當你在管理此部落格時，根據使用者的具體需求情境，正確調用對應的本地指令：

| 使用者需求場景 | 正確調用指令序列 |
| :--- | :--- |
| 1. 想看昨日部落格數據與運營成效時 | 執行 `node cli.js collect` ➔ 執行 `node cli.js report --dry-run` |
| 2. 想寫新文，但尚未確定題目與方向時 | 執行 `node cli.js trends` (生成主題佇列供使用者選擇) |
| 3. 使用者選定題目，準備撰寫新文草稿時 | 執行 `node cli.js write` (生成 draft 草稿與封面，停下等審閱) |
| 4. 想要找出流量下滑或值得優化的老文章時 | 執行 `node cli.js analyze` ➔ 執行 `node cli.js optimize` 提供修改提案 |
| 5. 當內容修改完，使用者指令「部署/上傳/上線」時 | 執行 `npm run build` (確認編譯) ➔ 執行 `npm run deploy` (推送發布) |

## 選題調研記錄要存哪裡

如果你想額外留一份選題的調研/分析過程記錄,存到 `automation/docs/`(gitignored,不會進公開版控),不要存到 repo 根目錄的 `docs/`(那是公開版控,會被 `npm run deploy` 的 `git add .` 一起 commit 上去)。

## 🤖 新文章與優化 SEO 驗證指引 (SEO Verification Checklist)

當你在建立新文章（Created）或進行舊文章優化（Optimized）時，**必須**逐項檢查以下 SEO 最優實踐（Checklist），並在完成後的主動回報中註明各項驗證結果：

1. **Front-matter 欄位合規性**
   - **`description`**: 必須填寫，長度控制在 **80 至 150 字**之間，且必須是純文字，不得包含 Markdown 語法、粗體、反引號、超連結等。其內容應包含文章核心關鍵字以提升搜尋點擊率 (CTR)。
   - **`date`**: 必須填寫建立日期與時間，格式為 `YYYY-MM-DD HH:mm:ss`。
   - **`updated` (重要的新鮮度指標)**: 每次修改/優化既有文章時，**必須**新增或更新 `updated: YYYY-MM-DD HH:mm:ss`，以告知搜尋引擎該文章已進行內容更新（提升新鮮度權重）。
   - **`tags` & `categories`**: 必須正確配置，方便搜尋引擎理解網站結構與內部權重傳遞。

2. **首屏與封面圖片優化**
   - **封面圖片格式與大小**: 首頁/封面圖片格式優先使用 `jpeg`/`jpg`。單張體積**嚴禁超過 300KB**，避免拖慢行動端載入速度（行動端友善是 Google Core Web Vitals 的重點指標）。
   - **圖片壓縮 SOP**: 若圖片過大，必須使用 `sips`（macOS 內建工具）將 PNG/大圖轉換為 JPEG 75% 質量或原地壓縮，並更新文章中的引用副檔名。
   - **圖片 Alt 屬性**: 所有內文插圖 `![alt 描述](圖片路徑)` 必須在方括號中填寫具體、帶有搜尋意圖與上下文脈絡的中文描述，不得留空，這對 Google 圖片搜尋非常重要。

3. **內容結構與排版**
   - **閱讀延伸分段線 `<!--more-->`**: 在封面圖片與前言段落後、第一個 `##` 標題前，**必須**放置無空格的 `<!--more-->`。這不僅可避免首頁列出全文，也是搜尋引擎提取精選摘要 (Featured Snippet) 的關鍵標記。
   - **Heading 階層**: 網頁中只會有一個 `<h1>`（即文章標題），內文的標題必須嚴格按照 `##` (H2)、`###` (H3)、`####` (H4) 等階層結構遞增，切勿跳躍階層（例如 H2 直接跳 H4）。
   - **關鍵字佈局與 LSI 詞彙**: 文章前 100 字內必須自然帶出主要關鍵字，並在內文中合理分佈同義詞與語意關聯詞（LSI），避免關鍵字堆砌（Keyword Stuffing）。
   - **強調格式規範**: 強調用字請使用 `**粗體**`，選單路徑/按鈕/快捷鍵/檔名都用粗體，反引號只保留給程式碼。

4. **連結與架構驗證**
   - **連結安全性**: 不得使用編造的假網址（如 `example.com`），也不得殘留 Wiki 語法 `[[wiki]]`。
   - **內外部連結**: 合理配置連向部落格其他文章的內部連結（傳遞 PageRank 與降低跳出率），並配置連向官方、具權威性之來源的外部連結。
   - **Sitemap 與 Robots.txt**: 每當新增或大量優化文章後，部署前須確保 `hexo-generator-sitemap` 能正確生成 `sitemap.xml`，且 `source/robots.txt` 已正確指向它，促使 Googlebot 快速收錄。

5. **網址不變性**
   - 非必要絕對不修改已發布文章 the 檔名或網址 (URL)。若因標題優化必須變更 URL，部署後必須於伺服器或 Cloudflare 設置 301 轉址，防止 SEO 權重丟失。

## 絕對禁區

- **嚴禁讀取或外洩 `automation/yuwei-342913-*.json`**(Vertex service account 金鑰),這是高度敏感資訊,不要 `cat`、不要貼到 any 輸出。
- 不要動 `automation/oauth-token.json`、`automation/.env`。
- 不要把 `automation/` 底下任何東西 commit 進 git(整個目錄本來就被 `.gitignore` 排除)。
