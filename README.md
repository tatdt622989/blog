# 6yuwei Blog

這是一個使用 Hexo 的靜態部落格專案。

## 文章位置

- 文章放在 `source/_posts/`
- 有封面或圖片時，使用對應的文章資產資料夾
- 產出的靜態檔在 `public/`

## 常用指令

```bash
npm run build
npm run server
npm run deploy
```

## 重要規則

### 1. `npm run deploy` 只用在「部落格文章更新」

`npm run deploy` 的內容是：

```bash
hexo generate && git add . && git commit -m "Updated Articles" && git push origin main && cd ..
```

因為這個指令會直接執行 `git add .`，所以它會把目前 working tree 裡的所有變更一起 commit。

因此只有在以下情況才能執行：

- 新增或修改部落格文章
- 新增或修改文章封面、文章圖片
- 更新 `public/` 的靜態輸出
- 其他明確屬於本次發文內容的檔案

### 2. 如果有非文章相關變更，不可以直接跑 `npm run deploy`

例如以下情況，不能直接跑：

- `docs/` 有臨時文件
- 有測試用檔案
- 有和這次發文無關的設定修改
- working tree 裡混有其他不想發布的變更

這種情況要先整理乾淨，只保留這次文章需要發布的內容，再執行部署。

### 3. 正常發文流程

1. 編輯 `source/_posts/` 文章
2. 補上文章封面與相關圖片
3. 執行 `npm run build` 確認 `public/` 正常生成
4. 確認 working tree 沒有夾帶無關檔案
5. 只有在「本次變更全都是文章相關內容」時，才執行 `npm run deploy`

## 給之後操作這個 repo 的人

不要把這個專案當成一般程式專案來操作。

這個 repo 目前的部署習慣是：

- 發文時直接使用 `npm run deploy`
- `public/` 會一起進版控
- 部署前必須先確認沒有夾帶其他無關變更

如果沒有先檢查 working tree，就很容易把不該上線的檔案一起推上去。

## GitHub Actions 自動建置與部署（建議發文方式）

文章與圖片只需提交來源檔，不需要本機編譯或提交新的 `public/`：

1. 修改 `source/_posts/`、`source/zh-cn/_posts/`、`source/en/_posts/`，文章與圖片按三語系規範一起維護。
2. 建立 PR，GitHub Actions 會在 **macOS** 執行 `npm ci`、`npm test`、`npm run build` 並檢查三語系輸出。PR 不會連線到正式伺服器。
3. 合併到 `main` 後，Actions **重新產生** `public/`（不依賴 Git 裡既有的編譯檔），上傳成 workflow artifact，然後下載到 Ubuntu 部署工作並以 SCP 發布到 `~/php-site/blog`。
4. 成功部署後通知 IndexNow。也可在 GitHub Actions 手動執行 **Build and deploy blog**（workflow_dispatch）。

部署沿用 `SERVER_IP`、`SERVER_USER`、`SERVER_SSH_PRIVATE_KEY`、`SERVER_SSH_PASSPHRASE` 四個既有 Secrets。部署前需確保設定仍有效。現在圖片最佳化依賴 macOS `sips`，所以建置 job 使用 macOS runner；未來若換成跨平台圖片程式可改 Ubuntu 降低 CI 成本。

`public/` 為歷史上已納入版控的產物，**CI 會在每次建置前刪除舊內容並重建**，不必將新生成檔案 commit。對於未來新增的文章，建議直接用 PR 提交來源檔。舊版 `npm run deploy` 仍含 `git add .` 與直接推送 `main`，不建議繼續用於正常發文。

為避免 GitHub checkout 的檔案 mtime 讓所有舊文章被誤判為最近更新，`updated_option` 設成 `date`；需要標示修訂時間時請在文章 front matter 明確設定 `updated:`。

注意：目前 SCP 步驟仍沿用既有 `rm: true`，會在上傳前清理目的目錄。正式部署建議在第一次切換時檢查伺服器備份及 GitHub Actions 執行結果。
