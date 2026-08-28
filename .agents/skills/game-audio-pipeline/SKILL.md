---
name: game-audio-pipeline
description: 獨立遊戲聲音與配樂生成工作流手冊。包含本地開源模型（MOSS-SoundEffect-v2.0 48kHz、Stable Audio Open）短音效批次生成指令、Suno 結構化配樂提示詞與無縫循環（Seamless Loop）後製 SOP、候選音效池（Candidate Pool）管理與引擎格式規範。
---

# 獨立遊戲 AI 音訊生產管線手冊 (Game Audio Pipeline Skill)

本手冊定義了獨立遊戲開發中，從**短音效（SFX）本地批次生成**、**背景音樂（BGM）Suno 結構化提示詞**，到**候選音效池管理與遊戲引擎匯入**的標準化 SOP。

---

## 核心架構與工具分工

```
[聲音生產管線 (Game Audio Pipeline)]
  ├── 本地短音效 (SFX) ─── 純本機 CLI (Python / MLX / CUDA)
  │    ├── MOSS-SoundEffect-v2.0 (48kHz, DiT + Flow Matching, Apache 2.0)
  │    └── Stable Audio Open 1.0 (44.1kHz 立體聲, 1.2B DiT, 47s 環境音)
  │
  ├── 雲端配樂 (BGM) ───── Suno 網頁端 + Chrome 擴充套件
  │    ├── Codex 讀取關卡脈絡 ── 輸出中括號結構化 Prompt
  │    ├── Suno Pro 方案 (每月 $8~$10 美金，2,500 點 / 500 首歌，含商業授權)
  │    └── 30 秒 Crossfade 後製 ── 消除頭尾接縫，達成 Seamless Loop
  │
  └── 資產管理與引擎整合 ─ 候選音效池 (Candidate Pool)
       ├── 變體批次生成 (.wav + 同名 .json 參數側車檔)
       └── 格式分流：短音效 WAV (零延遲) / BGM OGG/MP3 (Streaming)
```

---

## 一、 本地短音效生成 (Local SFX Workflow)

本地生成短音效**完全不依賴任何瀏覽器**，直接在終端機執行 Python 腳本或由 AI 助理（Codex / Claude）呼叫執行。

### 1. 硬體與環境需求
* **Mac 平台**：Apple Silicon（M4 / M5 / M6 等 M 系列晶片，建議 16GB+ Unified Memory），使用 `moss-soundeffect-mlx` 4-bit 量化版。
* **PC 平台**：Windows / Linux 搭配 NVIDIA 顯卡（RTX 3060 以上，8GB+ VRAM），使用 PyTorch / `diffusers` (CUDA)。
* **外接儲存**：高速外接 SSD（NVMe / USB-C）存放模型權重與音訊候選檔。

### 2. 提示詞公式 (Prompt Formula)
下詞結構嚴格遵循：**動作 (Action) + 物理材質 (Material) + 聲音特性 (Acoustics)**。

```text
[動作動詞] + [材質與物件] + [瞬態/殘響/頻率特徵]
```

### 3. 經典場景提示詞配方庫 (Prompt Recipes)

#### UI 與選單互動
* **木質溫潤點擊**：`Subtle soft UI wood click, clean interface menu button feedback, short crisp transient, no reverb`
* **機械金屬確認**：`Tactile mechanical switch click, premium metallic toggle button, crisp snap, dry acoustic`
* **現代科技彈窗**：`Futuristic holographic UI pop, subtle digital chime, clean modern notification, high pitch transient`

#### 轉蛋與抽卡系統
* **撕開包裝**：`Foil snack pack tearing open, crisp plastic wrapper rip, physical ASMR tactile sound`
* **抽中大獎**：`Magical sparkle chime fanfare, golden star twinkling bell sound effect, rewarding ascending pitch`
* **卡牌翻轉**：`Heavy card deck shuffle flip, thick cardboard slide slap, crisp paper friction`

#### 核心遊戲機制
* **釣魚咬鉤**：`Water bubble pop followed by quick sharp splash, fishing bobber dipping into lake, sudden tug sound`
* **3D 踩地雷翻牌**：`Mechanical tile flip, gentle stone block slide click, crisp tactile grid uncover`
* **腳步聲（草地）**：`Footstep on dry grass and dirt, subtle foliage rustle, natural outdoor footsteps`
* **硬幣收集**：`Bright metallic coin pickup ping, retro arcade golden ring chime, clear crystal transient`

#### 長環境氛圍音 (Stable Audio Open 1.0)
* **地牢環境**：`Dungeon interior ambience, distant water drops dripping on stone floor, flickering torch fire whoosh, eerie echo`
* **清晨湖畔**：`Peaceful lake shore morning ambience, gentle water lapping, subtle bird chirping in distance, soft breeze`

---

## 二、 遊戲背景音樂 (Game BGM Workflow)

背景音樂採用雲端 **Suno** 平台生成，並搭配 **Suno Pro 方案** 確保具備合法商業使用權。

### 1. Suno 方案選擇與商用原則
* **商用強制要求**：商業遊戲嚴禁使用 Basic 免費版（無商業授權）。
* **Pro 方案**：
  * **價格**：年繳平均每月 **$8 美金**（月繳 $10 美金，約台幣 260~320 元）。
  * **額度**：每月 **2,500 點 Credits**（約可產 **500 首曲目**）。
  * **授權**：享有訂閱期間生成之**完整商業使用權（Commercial Rights）**，可安心上架 Steam、App Store、Google Play。

### 2. 結構化中括號提示詞模板 (Structured Prompt Template)
在 Suno **Style of Music** 欄位中使用中括號標籤，防止 AI 產出人聲或偏離風格：

```text
[Genre: Cozy Lofi / Ambient Game BGM]
[Instruments: Soft Electric Piano, Acoustic Guitar, Gentle Sub Bass, Subtle Vinyl Crackle]
[Mood: Peaceful, Relaxing, Nostalgic, Early Morning Fishing]
[Tempo: 75 BPM, Slow, Steady Groove]
[Structure: Instrumental Loopable Track, No Vocals]
```

### 3. 30 秒無縫循環 (Seamless Loop) 後製 SOP
Suno 生成的原檔自帶頭尾淡出，直接循環會有卡頓。無縫循環處理步驟如下：

1. **裁切核心段**：在 Audacity 或 DAW 中裁掉開頭前奏與結尾淡出，保留中間平穩的 30 到 60 秒。
2. **切分接縫**：將音軌最後 2 秒切下，搬移至整軌的最前端（作為重疊層）。
3. **交叉淡入淡出 (Crossfade)**：對重疊的 2 秒套用 **500ms 至 1000ms 的 Crossfade**。
4. **單曲循環驗收**：開啟播放器「單曲循環（Repeat One）」，反覆聆聽接縫處確認 100% 平順無爆音。

---

## 三、 候選音效池與資產管理 (Asset Pipeline)

### 1. 建立候選音效池 (Candidate Pool)
每次生成音效時，批次產出 5 到 10 個變體（`candidates`），並保存同名 `.json` 側車檔（Sidecar）：

```
assets/audio/candidates/fishing-bite/
  ├── bite_var01.wav
  ├── bite_var01.json   <-- 記錄 Prompt, Model, Seed, Temperature
  ├── bite_var02.wav
  ├── bite_var02.json
  └── ...
```

* **優點**：日後若需擴充同風格資產，可隨時調出相同的 Prompt 與參數重現。
* **遊戲內實測**：將候選變體綁定遊戲按鍵，在實際遊戲場景中試玩挑選打擊感最佳的版本。

### 2. 遊戲引擎格式選用標準

| 聲音類別 | 推薦格式 | 取樣規格 | 引擎載入方式 | 核心理由 |
| :--- | :--- | :--- | :--- | :--- |
| **短音效 (SFX, < 1s)** | **WAV** | 44.1 kHz / 16-bit Mono | **Decompress on Load** | 記憶體解碼零負擔，按鍵觸發零延遲發聲。 |
| **環境氛圍音 (3～10s)** | **OGG / AAC** | 128 kbps 立體聲 | **Compressed in Memory** | 高壓縮比，節省遊戲安裝包體積。 |
| **背景音樂 (BGM, 1～2 min)** | **OGG / MP3** | 160 kbps 立體聲 | **Stream from Disk** | 串流載入，不佔用啟動記憶體。 |

---

## 四、 執行檢查清單 (Action Checklist)

- [ ] **硬體確認**：Mac Apple Silicon 或 PC NVIDIA GPU，外接 SSD 快取掛載正常。
- [ ] **短音效生成**：純 CLI 執行 `MOSS-SoundEffect` / `Stable Audio Open`，產出候選音效池與 `.json` 紀錄。
- [ ] **配樂生成**：透過 Codex 產出結構化中括號 Prompt，使用 Suno Pro 生成 BGM。
- [ ] **循環後製**：對 BGM 執行 Crossfade 接縫處理，驗收 Seamless Loop。
- [ ] **格式規範**：短音效輸出為 WAV，BGM 輸出為 OGG/MP3 並設定為 Stream 載入模式。
