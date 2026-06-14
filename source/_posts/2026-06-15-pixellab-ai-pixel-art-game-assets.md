---
title: 想用 AI 做遊戲卻搞不定素材？PixelLab 是你的救星
date: 2026-06-15 00:17:47
tags:
- AI
- Pixel Art
- PixelLab
- Game Dev
- Aseprite
---

![](cover.png)

## 前言：有想法、有引擎，就是缺美術

如果你曾經想做一款自己的小遊戲，多半會卡在同一個地方——**美術素材**。

程式可以慢慢學，遊戲引擎（Unity、Godot、GameMaker）也都免費，網路教學一大堆。但是當你打開引擎、準備放進主角、敵人、道具、地圖磚塊時，才會發現一個殘酷的事實：

> 「我不會畫圖。」

買素材包？風格常常湊不齊，缺的東西永遠剛好沒有。外包？預算與時間都吃不消。自己學畫 pixel art？光是讓一隻角色的八個方向動起來，就足以讓人放棄整個專案。

這篇文章要介紹的 **PixelLab**，正是為了這個痛點而生：它讓你用 **AI 直接生成 pixel art 素材**——角色、動畫、道具、地圖磚塊、甚至 UI 介面，而且能直接在你熟悉的繪圖工具 **Aseprite** 裡操作。

<!--more-->

## PixelLab 是什麼？

PixelLab 是一個專注於 **pixel art（像素藝術）** 的 AI 生成服務。和那些通用型的繪圖 AI 不同，它從模型到工具流程都是為了「做遊戲素材」設計的，所以產出的東西**真的可以直接丟進遊戲裡用**：

- **角色生成**：給一段文字描述，產出帶有多個方向（4 或 8 向）的角色 sprite
- **角色動畫**：走路、攻擊、待機等動作直接生成 sprite sheet
- **道具 / 物件**：寶箱、藥水、武器、裝飾物……
- **地圖磚塊（tileset）**：俯視角 RPG 地圖、橫向卷軸平台、等角（isometric）地磚
- **UI 元素**：按鈕、圖示、面板，甚至能依照你排好的版面一次生成整套 icon

它有三種使用方式：

1. **Aseprite 外掛**（本篇主角）：在像素繪圖軟體 Aseprite 裡直接呼叫 AI
2. **網頁版**：直接在瀏覽器操作
3. **API / MCP**：給工程師接到自己的工具或 AI agent 流程裡（這個之後可以再寫一篇）

> 💡 **前置需求**：要在 Aseprite 裡使用 PixelLab，你得先有 Aseprite。安裝步驟我整理在另一篇：[Aseprite 安裝教學](/2026/06/15/aseprite-install-guide/)，照著做就能裝好並接上 PixelLab 外掛。

## 介面導覽

裝好外掛後，PixelLab 會在 Aseprite 裡開一個面板。主選單長這樣（這是一條垂直的側邊選單）：

<p align="center"><img src="panel-main.png" alt="PixelLab 主選單面板" style="max-height: 520px;"></p>

可以看到功能分得很清楚：

- **Create image / Edit image**：生成與編輯
- **Rotate / Animate**：旋轉方向、做動畫
- **Map / Inpaint**：地圖磚塊、局部重繪
- **Other**：減色（Reduce colors）、去背（Remove background）、像素修正（Pixel correction）等實用後製工具

點進 **Create image** 後，會看到一整排生成模式：

<p align="center"><img src="panel-create-image.png" alt="PixelLab Create image 子選單" style="max-height: 520px;"></p>

這裡的重點是**模式分級**：

- **Pro tools**：品質最高，會用到較多生成額度（generations），適合正式素材
- **Recommended**：日常使用的平衡選項，例如 **Image to pixel art**（把一般圖轉成像素風）、**Create character with same style**（沿用同一畫風生成）
- **32x32 或更小**：小尺寸 icon 專用

新手建議從 **Recommended** 這排開始試，熟悉之後再針對重要素材改用 Pro。

## 核心功能實測

### 1. 角色生成：一句話生出一隻主角

這是最殺的功能。你只要描述角色外觀，PixelLab 就會產出像素風角色。下面這隻是用 AI 生出的 chibi 角色：

![](character-large.png)

放大看細節，pixel art 該有的乾淨色塊、外框線都到位：

![](character-pixel.png)

更重要的是，它不是只給你「一張正面圖」——你可以接著用 **Rotate** 生成八個方向、用 **Animate** 生成走路 / 攻擊動畫，整套丟進引擎就是一個能動的角色。對獨立開發者來說，這等於把過去最痛苦的工作量壓縮成幾分鐘。

### 2. Image to pixel art：把現有圖片像素化

手邊已經有 concept art、AI 生圖、或一張參考照片？用 **Image to pixel art** 可以把它轉成像素風，並且自動處理配色與解析度，省去手動「降採樣 + 對齊像素格」的苦工。

### 3. UI from layout：一次生成整套介面 icon

這個功能對做遊戲的人特別實用。你在面板上排好版面、替每個格子命名（avatar、mail、chest、money bag……），PixelLab 就會**一次生成整套風格一致的 icon**：

![](ui-from-layout.png)

右邊就是依左邊版面生出的成果——頭像、信件、寶箱、寶石、金幣、鈴鐺……全部同一個畫風。過去要請美術統一風格畫一整套 UI icon，現在一個指令搞定。（注意這類 Pro 工具一次會吃掉約 20–40 個生成額度。）

### 4. 後製工具：去背、減色、像素修正

生成只是第一步，PixelLab 也內建了讓素材「能用」的後製：

- **Remove background**：自動去背，輸出透明 PNG
- **Reduce colors**：壓到指定色數，符合復古風或省記憶體需求
- **Pixel correction**：修正歪掉、糊掉的像素，讓邊緣乾淨對齊

## 價格方案

PixelLab 採訂閱制，並以「生成額度（generations）」計價。每個動作會消耗不同數量的額度（一般生成 1 個、Pro 工具 20–40 個）。

![](pricing.png)

| 方案 | 價格 | 適合對象 |
|------|------|----------|
| **Free trial** | 免費 | 想先試水溫，每月有少量快速生成額度 |
| **Tier 1：Pixel Apprentice** | $12 / 月 | 個人玩票、做 game jam 小專案 |
| **Tier 2：Pixel Artisan** | $24 / 月 | 認真開發中的獨立開發者（額度與功能平衡） |
| **Tier 3：Pixel Architect** | $50 / 月 | 重度使用、團隊、需要 API / 商用授權 |

### 越訂越便宜：忠誠折扣與年方案

PixelLab 的訂閱有兩個能幫你省錢的機制，值得特別留意：

- **連續訂閱會逐漸變便宜**：訂閱維持得越久，每月費用會隨著時間慢慢往下降——等於是給長期使用者的忠誠折扣。如果你打算長期開發一款遊戲，越早開始、訂得越久就越划算。
- **年方案（Yearly Billing）更省**：在價格頁上方可以把計費方式從 **Monthly Billing** 切到 **Yearly Billing**，一次付一年會比逐月付便宜不少。確定 PixelLab 適合你之後，改用年方案是最省的選擇。

> 💡 實際的折扣幅度與每月價格官方會隨時調整，下手前請以 [PixelLab 官網價格頁](https://www.pixellab.ai/pricing) 顯示的當前金額為準。

建議先用 **Free trial** 把流程跑過一遍，確認產出的風格符合你的遊戲；覺得合用之後，再依使用量挑方案，並考慮直接上年方案省錢。

## 結語：給「卡在素材」的你

做遊戲最容易讓人放棄的，往往不是程式，而是「東西做不出畫面」的那種無力感。PixelLab 把 pixel art 從「需要長期練習的專業技能」變成「描述需求就能得到素材」的工具，讓你能把精力放回**遊戲設計與玩法**本身。

如果你也是那種「有滿腦子遊戲點子、卻被美術擋在門外」的人，這套工具非常值得一試。

下一步：先把工具裝起來。請接著看 👉 [Aseprite 安裝教學：踏進 AI Pixel Art 的第一步](/2026/06/15/aseprite-install-guide/)
