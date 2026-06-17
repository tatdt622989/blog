# CLAUDE.md

這是一個 **Hexo 6.3.0** 靜態部落格（站台：https://blog.6yuwei.com ，語言 `zh-TW`）。
本檔記錄「建立文章 → 預覽 → 部署」的完整流程，給之後操作這個 repo 的人/agent 參考。

## 環境

- Node 版本：`v18.15.0`（見 `.nvmrc`，建議 `nvm use`）
- 套件已安裝在 `node_modules/`，需要時 `npm install`

## 重要前提：CI/CD 已設定，push 即自動部署

`.github/workflows/server_deploy.yml` 會在 **push 到 `main`** 時自動觸發：

1. checkout
2. 把 `api.php` 複製成 `public/api.php`
3. 用 SCP 把整個 `public/` 上傳到伺服器 `~/php-site/blog`

→ **所以部署 = 把含 `public/` 的變更 push 到 `main`，不需要任何手動部署動作。**

關鍵：`public/`（產出的靜態檔）**會進版控**，不在 `.gitignore`。CI 上傳的就是 repo 裡的 `public/`，因此 **push 前一定要先 `npm run build` 重新生成 `public/`**，否則部署的會是舊內容。

## 發文流程

### 1. 建立文章

```bash
npx hexo new "文章標題"
```

- 產生 `source/_posts/YYYY-MM-DD-文章標題.md`（檔名格式見 `_config.yml` 的 `new_post_name`）
- 因為 `post_asset_folder: true`，會同時建立同名資產資料夾，圖片放這裡

### 2. 撰寫內容與 front matter

```markdown
---
title: 文章標題
date: 2026-06-14 12:00:00
tags:
- AI
- Claude
---

![](cover.png)

前言（這段會成為文章列表頁的摘要）……

<!--more-->

正文……
```

- 封面/圖片放在文章的資產資料夾，內文用相對路徑引用，例如 `![](cover.png)` 或 `![](cover.jpg)`
- `tags` 用 YAML 清單；分類可加 `categories`

### ⭐ 撰寫與排版慣例（重要，務必遵守）

這些是本站既有慣例，新文章一定要照做，否則列表頁與閱讀體驗會壞掉：

1. **每篇都要放 `<!--more-->`**
   - 放在「封面 + 前言」之後、第一個 `##` 段落之前。
   - 它決定文章列表頁的「摘要」切點：`<!--more-->` 以前的內容才會顯示在列表頁。**漏寫的話列表頁會把整篇灌出來。**
   - 全站慣例是無空格的 `<!--more-->`（不是 `<!-- more -->`）。

2. **強調樣式用粗體 `**...**`，不要用 inline code（反引號）**
   - 本佈景的 inline code 會渲染成很重的深色框，選單路徑、快捷鍵、按鈕名、檔名用它會很醜。
   - 選單路徑 / 按鈕 / 快捷鍵 / 檔名一律用**粗體**；選單階層用箭頭，例如 **Edit → Preferences**、**Ctrl + Space + P**、**.aseprite-extension**。
   - 反引號只留給真正的程式碼片段。

3. **又高又窄的圖片要限制高度，避免頁面過長**
   - 寬圖（寬 > 高）會被佈景自動縮到內容寬度，不用處理。
   - 但**直式、長條型的截圖**（例如側邊面板，高/寬比 > 1.5）直接放會撐出超長頁面。
   - ❌ **不要用 `<img style="max-height:...">` 硬限高**：佈景的 `img` 規則會強制寬度，max-height 反而把圖**橫向拉寬變形**。
   - ✅ **正解：不改原圖比例，把原圖置中疊在一張「符合原圖顏色」的背景上**，做成接近橫幅（如 4:3）的新圖再用一般 `![](xxx.png)` 引用。本專案有 PIL（Pillow）可用，作法：取樣原圖最常見的顏色當底色 → 新建 4:3 畫布填滿底色 → 把原圖**原尺寸**貼到正中央 → 存成新檔。
   - 改圖後存成**新檔名**（例如 `panel-main-v2.png`）再更新引用，順便避開 CDN 對舊檔名的快取（見下方部署章節的快取說明）。

4. **封面圖可用 PixelLab MCP 生成**
   - 本專案已設定 PixelLab MCP server（見 `~/.claude.json` 對應本專案的 `mcpServers.pixellab`）。
   - 生成「場景型」封面用 `create_map_object`（基本模式、`width`/`height` 設成橫幅比例如 400×240），效果比單一角色 sprite 更像吸睛的封面；角色則用 `create_character`（`mode: v3` 品質最佳）。
   - 都是非同步：先 `create_*` 拿 id，再用 `get_*` 取結果。`get_map_object` / `get_character` 會回 download URL，用帶 `Authorization: Bearer <token>` 的 `curl` 下載成文章資產資料夾裡的 `cover.png` 或已壓縮的 `cover.jpg`（體積建議限制在 300KB 以下，以利 SEO 載入速度）。
   - ⚠️ map object 產生後 **8 小時內會自動刪除**，記得儘快下載。

### 3. 本機預覽

```bash
npm run server   # hexo server，預設 http://localhost:4000
```

### 4. 生成靜態檔

```bash
npm run build    # hexo generate → 重新產生 public/
```

若改動較大或產出怪異，先 `npm run clean`（`hexo clean`）再 build。

### 5. 部署（push 到 main）

最簡單的方式是專案內建的：

```bash
npm run deploy
```

它等同於：

```bash
hexo generate && git add . && git commit -m "Updated Articles" && git push origin main
```

push 後 GitHub Actions 會自動把 `public/` 部署到伺服器。

## ⚠️ `npm run deploy` 的注意事項

`npm run deploy` 內含 `git add .`，會把 **working tree 裡所有變更**一起 commit。
因此**只有在「本次變更全都是文章相關內容」時**才能直接跑，例如：

- 新增/修改 `source/_posts/` 的文章
- 新增/修改文章封面、圖片
- 對應重新生成的 `public/`

**若 working tree 夾帶無關變更，不要直接跑 `npm run deploy`**，否則會把不該上線的檔案一起推上去並自動部署。常見要排除的：

- `docs/` 臨時文件、測試檔
- 與本次發文無關的設定修改

這種情況請先整理乾淨（只留本次要發布的內容），或改用手動方式精準 `git add` 指定檔案後再 commit / push。

## ⚠️ CDN（Cloudflare）快取：換圖看不到更新時

網站前面有 Cloudflare，**靜態圖片（png 等）會被快取約 4 小時**（`cache-control: max-age=14400`），但文章 HTML 是 `cf-cache-status: DYNAMIC`（不快取）。

影響：**已部署過的圖片，如果用「同檔名」換內容，訪客仍會看到舊圖**（CDN 回快取），就算 origin 已更新也一樣。新文章第一次發布不受影響（路徑全新）。

- 排查：用 `curl -sI <圖片url>` 看 `cf-cache-status` / `age`；加上 `?nocache=隨機` 繞過快取就能確認 origin 其實已是新圖。
- 解法（擇一）：
  1. **改成新檔名**（如 `cover-v2.png`、`panel-main-v2.png`）並更新引用 → 網址一變 CDN 直接 miss，所有訪客立即看到新圖（本專案採用此法）。
  2. 到 Cloudflare 後台 **Purge Cache**（清該 URL 或全清）。
- 自己的瀏覽器另外用 **Cmd + Shift + R** 硬刷。

## 正常發文檢查清單

1. 編輯 `source/_posts/` 文章
2. 補上封面與相關圖片
3. `npm run build` 確認 `public/` 正常生成
4. `git status` 確認 working tree 沒有夾帶無關檔案
5. 確認全是文章相關內容後，`npm run deploy`（或手動 commit + `git push origin main`）
6. CI 自動部署，稍後到 https://blog.6yuwei.com 確認

## 專案結構速查

| 路徑 | 用途 |
|------|------|
| `source/_posts/` | 文章 Markdown 與資產資料夾 |
| `public/` | `hexo generate` 產出的靜態站台（**進版控、CI 部署的對象**） |
| `scaffolds/` | `hexo new` 用的模板 |
| `_config.yml` | Hexo 站台設定 |
| `.github/workflows/server_deploy.yml` | push 到 main 的自動部署 |
| `api.php` | 部署時複製到 `public/api.php` |

## Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com> 不要寫這個在 commit