---
title: Rust 為什麼越來越紅？Discord、Linux、GitHub 都改用 Rust 的原因與反例
date: 2026-11-12 18:00:00
updated: 2026-11-12 18:00:00
description: Rust 為什麼越來越紅？Linux 7.0 正式支援 Rust，Android、Windows、Cloudflare、Vite、GitHub Copilot 陸續改用，Discord 也宣布桌面版拋棄 Electron。整理知名改寫案例、五個流行原因，以及 TypeScript 選 Go、Cloudflare 當機等反例。
translation_key: why-rust-is-popular-2026
translations:
  zh-CN: /zh-cn/2026/11/12/why-rust-is-popular-2026/
  en: /en/2026/11/12/why-rust-is-popular-2026/
categories:
  - 軟體工程
tags:
  - Rust
  - 程式語言
  - Discord
  - Linux
  - 記憶體安全
---

![戴著工地安全帽的橘色螃蟹，把軟體城市裡龜裂的灰色石磚換成閃亮的鏽橘色金屬磚，周圍有伺服器、終端機、聊天 App 視窗與手機](cover.jpg)

**Rust 確實越來越紅，但紅在特定地方：作業系統、雲端基礎設施、開發工具，以及在意記憶體與啟動速度的桌面 App。** 主因是記憶體安全，以及不靠垃圾回收（GC）也能跑得快。2026 年又多了一個推力：AI 讓大型改寫的成本大降。不過 Rust 還不是通用首選，TypeScript 7 的編譯器就選了 Go，TIOBE 11 月排名也從第 10 掉回第 11。

<!--more-->

## Rust 有多紅？三個指標

| 指標 | 數字 |
| --- | --- |
| [TIOBE 2026 年 11 月](https://www.tiobe.com/tiobe-index/) | 第 11 名，1.63%；一年前第 14 名。7 到 10 月連續四個月排第 10，11 月被 Go 超越 |
| [Stack Overflow 2026 調查](https://survey.stackoverflow.co/2026/technology/data/languages) | 18.0% 的受訪者大量使用，排第 12 |
| Stack Overflow 2025 調查 | 連續第九年「最受喜愛語言」，72% 用過的人還想繼續用 |

使用率不算高，但用過的人很少離開；排名一年內進步三名。

## 改用 Rust 的知名案例

| 領域 | 專案 | 改了什麼 | 時間 |
| --- | --- | --- | --- |
| 作業系統 | Linux 核心 | [Linux 7.0](https://linuxiac.com/linux-kernel-7-0-released/) 拿掉 Rust 的「實驗性」標籤，Rust 正式成為核心語言之一 | 2026-04 |
| 作業系統 | Android | 新程式碼大量用 Rust，記憶體安全漏洞[首度低於總數 20%](https://blog.google/security/rust-in-android-move-fast-fix-things/) | 2025 |
| 作業系統 | Windows | 字型解析 DirectWriteCore 移植成 15.4 萬行 Rust；Win32k 的 GDI region 程式碼已隨 Windows 出貨（[Azure CTO Russinovich](https://www.thestack.technology/rewriting-windows-in-rust/)） | 2025 |
| 作業系統 | Ubuntu 26.04 LTS | 預設改用 sudo-rs 與 Rust 版 coreutils，cp、mv、rm 仍用 GNU 版 | 2026-04 |
| 雲端 | Cloudflare | [Pingora](https://blog.cloudflare.com/how-we-built-pingora-the-proxy-that-connects-cloudflare-to-the-internet/) 取代 NGINX，每天處理超過 1 兆個請求，同流量下 CPU 少 70%、記憶體少 67% | 2022 |
| 雲端 | AWS | Lambda 與 Fargate 背後的微型虛擬機 Firecracker 用 Rust 寫成 | 2018 |
| 瀏覽器 | Chrome | 網頁字型改用 Rust 寫的 [Skrifa](https://developer.chrome.com/blog/memory-safety-fonts) 取代 FreeType | 2025 |
| 開發工具 | Vite 8 | 預設打包器換成 Rust 寫的 [Rolldown](https://vite.dev/blog/announcing-vite8)，官方稱建置快 10 到 30 倍 | 2026-03 |
| 開發工具 | Next.js 16 | Rust 寫的 [Turbopack](https://nextjs.org/blog/next-16) 成為預設打包器 | 2025-10 |
| 開發工具 | uv、Ruff | Python 套件管理與 Lint 工具；開發商 Astral 被 [OpenAI 宣布收購](https://thenewstack.io/openai-astral-acquisition/)，併入 Codex 團隊 | 2026-03 |
| 開發工具 | fish shell | 4.0 版整個從 C++ 移植到 Rust | 2025-02 |
| 開發工具 | GitHub Copilot | Agent 執行環境從 TypeScript／Node.js [改寫成 83 萬行 Rust](https://github.blog/news-insights/product-news/migrating-the-github-copilot-runtime-to-rust-using-copilot/) | 2026-08 |
| 應用 | Discord | 後端服務、語音，2026 年再加上桌面版，見下節 | 2018 起 |

共同點很明顯：都是**底層、長時間執行、對效能或安全很敏感**的軟體，而不是一般的商業後台。

## Discord：從後端一路改到桌面版

Discord 是「應用程式改用 Rust」最完整的例子，從 2018 年起就在基礎設施、語音和部分客戶端用 Rust。

| 時間 | 事件 |
| --- | --- |
| 2020-02 | [Read States 服務從 Go 改成 Rust](https://discord.com/blog/why-discord-is-switching-from-go-to-rust)。Go 的 GC 每 2 分鐘強制執行一次，造成延遲尖峰；Rust 版沒有尖峰，延遲、CPU、記憶體全面勝出 |
| 2026-09 | 升級到 Electron 42，中位數 CPU 降約 17%，記憶體反而升約 4% |
| 2026-11-04 | CTO Stanislav Vishnevskiy 宣布桌面版[拋棄 Electron](https://www.ghacks.net/2026/11/06/discord-is-rebuilding-its-desktop-app-in-rust-with-the-new-client-using-290-mb-of-ram/)，UI 改用 Zed 編輯器團隊的 GPUI，內部代號 Phoenix |

Phoenix 的計畫與官方稱的數字：

| 項目 | 內容 |
| --- | --- |
| 記憶體 | Windows 11 上開兩個帳號 290.2 MB（CTO 公布的截圖） |
| 啟動時間 | 約 1 秒，舊版約 6 秒 |
| 手機版 | 拿掉 React Native，保留原生介面，和桌面版共用 Rust 寫的邏輯 |
| 網頁版 | 保留 HTML 顯示，邏輯改成 WebAssembly |
| 上線時間 | 目前只有內部版本，CTO 說「很快」開始測試，沒有公布日期 |

## 為什麼選 Rust？五個原因

| 原因 | 說明 | 例子 |
| --- | --- | --- |
| 記憶體安全 | 編譯器在編譯時就擋掉越界存取、use-after-free 這類錯誤，而這類錯誤是 C／C++ 漏洞的大宗 | Android 的 Rust 程式碼，記憶體安全漏洞密度約為 C／C++ 的千分之一；變更的回滾率也低 4 倍 |
| 沒有 GC 停頓 | 不用垃圾回收，延遲穩定，適合即時服務與核心 | Discord Read States 的延遲尖峰消失 |
| 效能接近 C | 執行環境小、啟動快 | Copilot 的啟動加一輪對話從 5.25 秒降到 292 毫秒（[InfoQ](https://infoq.com/news/2026/10/github-copilot-rust-migration)） |
| 一份程式碼多處共用 | 可透過 FFI 給其他語言呼叫，也能編成 WebAssembly | Copilot 的 Rust 執行環境供六種語言的 SDK 使用；Discord 桌面、手機、網頁共用邏輯 |
| AI 讓改寫變便宜 | 改寫最貴的是人力；AI 寫程式加上 Rust 嚴格的編譯檢查，大型移植變得可行 | GitHub 稱 Copilot 執行環境原本要一個團隊做一到兩年，這次主要由一位工程師用 Copilot 在約 14.5 週完成 |

第五點是 2026 年的新變化。Rust 的編譯器很嚴格，AI 寫錯的程式碼大多編譯不過，等於多了一道自動檢查。

## 不選 Rust 的情況與代價

| 情況 | 說明 |
| --- | --- |
| TypeScript 7 選了 Go | 微軟把 TypeScript 編譯器改寫成 Go，速度快約 10 倍。原編譯器大量依賴 GC 和互相參照的資料結構，Go 可以逐檔移植，Rust 則要重新設計 |
| 難學、缺人 | [DeveloperTech](https://www.developer-tech.com/news/rust-adoption-stalls-memory-safe-programming-trends/) 2026 年 4 月報導企業採用放緩，原因是學習曲線陡、資深工程師難找；一般企業後台仍以 Java、C#、Go 為主 |
| Rust 也會當機 | 2025 年 11 月 18 日 [Cloudflare 全球大當機](https://blog.cloudflare.com/18-november-2025-outage/)：設定檔超過上限，Rust 寫的 FL2 代理程式在 `unwrap()` 直接 panic，是 Cloudflare 自 2019 年以來最嚴重的事故。記憶體安全不等於邏輯正確 |
| 生態系還在長 | Discord 用的 GPUI 還沒到 1.0，Discord 得自己維護修改版 |
| 傳言要分清楚 | 微軟工程師 Galen Hunt 說要在 2030 年前「消除所有 C／C++」，後來澄清這是遷移工具的研究計畫，不是用 Rust 重寫 Windows |

## 什麼專案適合用 Rust？

| 適合 | 不一定需要 |
| --- | --- |
| 作業系統、驅動程式、瀏覽器引擎 | 一般 CRUD 網站與企業後台 |
| 高流量代理、資料庫、即時服務 | 依賴 GC 與複雜物件關係的既有大型程式 |
| 編譯器、打包器、CLI 等開發工具 | 團隊沒有 Rust 經驗、上線時程很趕的專案 |
| 要同時跑在桌面、手機、網頁的核心邏輯 | 效能瓶頸在資料庫或網路，而不在程式本身 |
