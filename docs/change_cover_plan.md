# 實作計畫：更換最新日語學習文章封面圖

本計畫說明如何為最新的日語學習文章《善用頂級LLM：2026年日語學習的高效進階策略 (以先進AI模型為例)》生成並更換一張更具美感、符合科技與語言學習主題的封面圖。

## 步驟說明

### 1. 建立計畫文件
- 於 `docs/change_cover_plan.md` 建立此實作計畫。

### 2. 生成新封面圖片 (Cover Image)
- 使用 `generate_image` 工具生成一張符合文章主題的背景封面圖。
  - **主題**：先進 AI 輔助日語學習，融合科技感與日文元素。
  - **提示詞 (Prompt)**：
    > A futuristic yet warm illustration representing Japanese language learning with the help of an advanced AI. A clean desk with a laptop, showing a modern study interface with Japanese characters like 'あ', '語', '日本'. A friendly, soft-glowing holographic AI assistant or neural network graphic floats nearby. Beautiful pastel and neon color palette, soft lighting, depth of field, professional tech blog header, 16:9 aspect ratio.
  - **輸出檔名**：`japanese-llm-learning-cover-original.png`

### 3. 裁剪與處理圖片
- 由於 Gemini 生成的圖片可能不是標準的 16:9 比例（通常是 1024x1024 或者是其預設尺寸），我們需要使用 macOS 內建的 `sips` 工具將其裁剪成 1200x675 (16:9) 或者是 1024x576。
- 裁剪完畢後，命名為 `japanese-llm-learning-cover.png`。

### 4. 移動至 Hexo 文章資源資料夾
- 將 `japanese-llm-learning-cover.png` 移至：
  `/Volumes/X9Pro/project/blog/source/_posts/2026-06-16-善用頂級LLM：2026年日語學習的高效進階策略-以Claude-Opus-4-8為例/japanese-llm-learning-cover.png`

### 5. 更新文章 Markdown 內容
- 編輯 `/Volumes/X9Pro/project/blog/source/_posts/2026-06-16-善用頂級LLM：2026年日語學習的高效進階策略-以Claude-Opus-4-8為例.md`。
- 將 `![日語學習封面圖，顯示AI與日文學習相關元素](cover-v2.png)` 替換為 `![日語學習封面圖，顯示AI與日文學習相關元素](japanese-llm-learning-cover.png)`。

### 6. 本地編譯驗證
- 執行 `npm run build` 或 `npx hexo generate` 進行靜態網頁生成，確保無任何語法錯誤，並且圖片連結正確。
- 刪除暫存的原始圖檔 `japanese-llm-learning-cover-original.png`。
