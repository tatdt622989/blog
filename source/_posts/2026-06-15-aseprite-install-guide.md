---
title: Aseprite 安裝教學：踏進 AI Pixel Art 的第一步
date: 2026-06-15 00:18:00
tags:
- Aseprite
- Pixel Art
- PixelLab
- 遊戲開發
- AI
categories:
- 遊戲開發
description: Aseprite 像素繪圖軟體安裝與 PixelLab AI 像素外掛串接教學。本文為你整理 Steam 正式版購買、免費編譯原始碼等三種取得管道，並帶你一步步完成外掛授權，快速解決遊戲美術素材短缺痛點。
updated: 2026-06-22 11:45:00
cover: cover-v2.png
---

![Aseprite 安裝與 PixelLab 外掛串接教學封面](cover-v2.png)

## 前言

在上一篇 [想用 AI 做遊戲卻搞不定素材？PixelLab 是你的救星](/2026/06/15/pixellab-ai-pixel-art-game-assets/) 裡，我介紹了用 AI 生成 pixel art 素材的神器 **PixelLab**。但要在桌面端把它用得最順，得先有一個東西——**Aseprite**。

Aseprite 是業界最受歡迎的像素繪圖軟體，而 PixelLab 的桌面外掛就是掛在它上面跑的。這篇就帶你把 Aseprite 從零裝好，並接上 PixelLab 外掛。

> ⚠️ **先講最重要的雷**：Aseprite 的**試用版（Trial）不支援外掛（plugin / extension）**。也就是說，如果你的目的是用 PixelLab，**就必須取得正式版**，試用版裝不了外掛。

<!--more-->

## Aseprite 是什麼？為什麼用它？

Aseprite 是一套專門做 **pixel art 與像素動畫**的編輯器，支援逐格動畫、圖層、調色盤、tileset、匯出 sprite sheet 等遊戲開發需要的功能，幾乎是獨立遊戲圈的標準工具。

它跨平台支援 **Windows、macOS、Linux（Ubuntu）**。

## 取得 Aseprite 的三種方式

### 方式一：購買正式版（推薦）

最省事的做法。官方定價為 **USD $19.99 起**，一次買斷，可在以下平台購買，**軟體本體都一樣**：

- [Aseprite 官方網站](https://www.aseprite.org/)
- **Steam**（推薦，會透過 Steam 自動更新）
- itch.io、Humble Bundle、Gumroad 等

買哪個都行。如果你已經習慣用 Steam 管理軟體，從 Steam 買最方便。

### 方式二：從原始碼自行編譯（免費，但有技術門檻）

Aseprite 的原始碼是公開的。根據官方授權，你**可以自行下載原始碼、編譯，並用於個人用途**，甚至能用它**製作商業素材**；唯一限制是**不能把編譯好的程式再散布出去**給別人。

這條路完全免費，但需要自己處理編譯環境（C++、相依套件），對非工程背景的人門檻偏高。原始碼在 [Aseprite 的 GitHub](https://github.com/aseprite/aseprite)。

### 方式三：試用版（注意限制）

官方有提供試用版，可以先感受介面與操作。但如前面所述：

> **試用版不能安裝外掛**，所以無法用來跑 PixelLab。

試用版適合「想先確認自己喜不喜歡 Aseprite」，但只要你確定要用 PixelLab，就直接走方式一或方式二。

## 安裝 Aseprite

- **Steam**：在 Steam 商店頁按「購買」，安裝後直接從 Steam 啟動即可，更新由 Steam 處理。
- **官方網站 / itch.io 等**：購買後下載對應平台的安裝檔——Windows 為 **.exe**、macOS 為 **.dmg**，依一般軟體流程安裝即可。
- **macOS 補充**：若開啟時被 Gatekeeper 擋下，可到「系統設定 → 隱私權與安全性」按「仍要打開」。

裝好後先打開一次，確認能正常進到主畫面。

> 📌 PixelLab 外掛需要 **Aseprite v1.3.7 或更新版本**。可在 **Help → About** 確認版本，太舊的話先更新。

## 安裝 PixelLab 外掛

確認 Aseprite 是正式版且版本夠新後，就能裝外掛了：

### 1. 下載外掛檔

到 [PixelLab 官網](https://www.pixellab.ai/) 登入你的帳號，進到帳號頁面下載外掛檔，副檔名為 **.aseprite-extension**。

> 還沒有帳號的話，先在 PixelLab 註冊（可先用免費方案試用流程）。

### 2. 安裝外掛

有兩種方式，擇一即可：

- **直接雙擊**（最簡單）：雙擊下載好的 **.aseprite-extension** 檔，Aseprite 會自動安裝。
- **手動安裝**：開啟 Aseprite → **Edit → Preferences** → 左側選 **Extensions** → 點 **Add Extension** → 選擇剛下載的檔案。

### 3. 重新啟動 Aseprite

關閉並重新開啟 Aseprite，讓外掛生效。

### 4. 授權權限

第一次啟動外掛時，Aseprite 會跳出權限請求，需要允許：

- **package.json** 檔案存取
- **WebSocket** 連線（外掛需要連網跟 PixelLab 溝通）
- （選用）給予 **full trust**，可啟用外掛自動更新

### 5. 開啟外掛面板

授權完成後，PixelLab 面板通常會自動跳出。如果沒看到，可從：

- 選單 **Edit → PixelLab → Open plugin**
- 或快捷鍵 **Ctrl + Space + P**

外掛會透過你的 **PixelLab 帳號**進行驗證，登入後就能開始生成素材了。

## 完成！接下來呢？

到這裡，你已經具備了用 AI 生成 pixel art 的完整環境：**Aseprite（編輯器）＋ PixelLab（AI 生成外掛）**。

接下來就回到上一篇，照著功能導覽動手生第一隻角色吧 👉 [想用 AI 做遊戲卻搞不定素材？PixelLab 是你的救星](/2026/06/15/pixellab-ai-pixel-art-game-assets/)

祝你做遊戲順利，從此再也不用為素材卡關。
