# 實作計畫：Claude 功能比較文章發佈

本計畫說明如何建立、撰寫、生成封面圖並發佈一篇關於 **Claude 核心功能比較（Design / Cowork / Code）** 的部落格文章。

## 步驟說明

### 1. 建立 Hexo 文章
- 使用 `npx hexo new post "claude-design-cowork-code-comparison"` 指令建立新文章。
- 這會自動在 `source/_posts/` 目錄下生成：
  - `YYYY-MM-DD-claude-design-cowork-code-comparison.md`
  - 同名資源資料夾 `YYYY-MM-DD-claude-design-cowork-code-comparison/`

### 2. 生成與處理封面圖片 (Cover Image)
- 使用 `generate_image` 工具生成一張符合文章主題的封面圖。
  - **提示詞 (Prompt)**：設計一張與 AI 輔助開發、設計、協作相關的精美科技感插圖，包含 Claude 意象、代碼、設計線條與團隊協作元素。風格偏向現代、3D 渲染或精美扁平插畫，適合做為科技部落格的封面。
- 下載或將生成的圖片保存為 `cover.png`。
- 如果需要裁切或調整尺寸，使用 macOS 內建的 `sips` 工具進行處理（例如限制寬度為 1200px 或是常見的 16:9 比例）。
- 將最終的 `cover.png` 移至 Hexo 資源資料夾：`source/_posts/YYYY-MM-DD-claude-design-cowork-code-comparison/cover.png`。

### 3. 撰寫文章內容
- 編輯 Markdown 檔案，內容將涵蓋 Claude 在以下三個维度的詳細比較與實踐心得：
  1. **Design（設計）**：包含 UI/UX 原型生成、圖像生成/編輯、視覺審查等能力，以及 Artifacts 的協同設計體驗。
  2. **Cowork（協作）**：討論 Projects 功能、自訂 Instructions、團隊知識庫共享，以及多輪對話中的上下文保持與團隊協作場景。
  3. **Code（程式碼）**：評估 Claude Code (CLI Agent)、Cursor 整合、多檔案重構、測試撰寫、終端執行等日常開發體驗。
- 提供清晰的比較表格、評分，以及適合的使用情境建議。
- 在 Front-matter 設定適當的 `tags`（例如：Claude, AI, Design, Cowork, Coding）。
- 在文章開頭使用 `![](cover.png)` 引入封面圖。

### 4. 本地編譯與檢查
- 執行 `npx hexo generate` 進行靜態頁面生成，確保沒有語法錯誤。
- 檢查生成的檔案與結構。

### 5. 提交與部署 (Push)
- 執行 `git add .` 將新文章、資源資料夾、封面圖以及實作計畫加入暫存區。
- 執行 `git commit -m "feat: 新增 Claude 功能比較文章 (Design / Cowork / Code)"`。
- 執行 `git push origin main` 將變更推送至遠端 GitHub 儲存庫。
