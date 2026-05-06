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
