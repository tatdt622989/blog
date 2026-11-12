---
title: Rust 为什么越来越火？Discord、Linux、GitHub 纷纷转向 Rust 的原因与反例
date: 2026-11-12 18:00:00
updated: 2026-11-12 18:00:00
description: Rust 为什么越来越火？Linux 7.0 正式支持 Rust，Android、Windows、Cloudflare、Vite、GitHub Copilot 相继采用，Discord 也宣布桌面端弃用 Electron。汇总知名重写案例、五大原因，以及 TypeScript 选 Go 等反例。
permalink: 2026/11/12/why-rust-is-popular-2026/
translation_key: why-rust-is-popular-2026
translations:
  zh-TW: /2026/11/12/Rust-為什麼越來越紅？Discord、Linux、GitHub-都改用-Rust-的原因與反例/
  en: /en/2026/11/12/why-rust-is-popular-2026/
categories:
  - 软件工程
tags:
  - Rust
  - 编程语言
  - Discord
  - Linux
  - 内存安全
---

![Rust 重写案例一览：操作系统 Linux、Android、Windows、Ubuntu，云服务 Cloudflare、AWS Firecracker，开发工具 Vite、Next.js、uv、Ruff、fish，应用 Discord、GitHub Copilot、Chrome](cover.jpg)

**Rust 确实越来越火，但火在特定领域：操作系统、云基础设施、开发工具，以及对内存占用和启动速度敏感的桌面应用。** 核心原因是内存安全，以及不依赖垃圾回收（GC）也能跑得快。2026 年又多了一股推力：AI 让大规模重写的成本大幅下降。不过 Rust 还不是通用首选，TypeScript 7 的编译器就选了 Go，TIOBE 11 月排名也从第 10 跌回第 11。

<!--more-->

## Rust 有多火？三个指标

| 指标 | 数据 |
| --- | --- |
| [TIOBE 2026 年 11 月](https://www.tiobe.com/tiobe-index/) | 第 11 名，1.63%；一年前第 14 名。7 到 10 月连续四个月排第 10，11 月被 Go 反超 |
| [Stack Overflow 2026 调查](https://survey.stackoverflow.co/2026/technology/data/languages) | 18.0% 的受访者大量使用，排第 12 |
| Stack Overflow 2025 调查 | 连续第九年当选“最受推崇语言”，72% 的使用者还想继续用 |

使用率不算高，但用户黏性很强；一年内排名上升三位。

## 转向 Rust 的知名案例

| 领域 | 项目 | 改了什么 | 时间 |
| --- | --- | --- | --- |
| 操作系统 | Linux 内核 | [Linux 7.0](https://linuxiac.com/linux-kernel-7-0-released/) 去掉 Rust 的“实验性”标签，Rust 正式成为内核语言之一 | 2026-04 |
| 操作系统 | Android | 新代码大量采用 Rust，内存安全漏洞[首次降到总数的 20% 以内](https://blog.google/security/rust-in-android-move-fast-fix-things/) | 2025 |
| 操作系统 | Windows | 字体解析组件 DirectWriteCore 移植为 15.4 万行 Rust；Win32k 的 GDI region 代码已随 Windows 发布（[Azure CTO Russinovich](https://www.thestack.technology/rewriting-windows-in-rust/)） | 2025 |
| 操作系统 | Ubuntu 26.04 LTS | 默认改用 sudo-rs 和 Rust 版 coreutils，cp、mv、rm 仍用 GNU 版 | 2026-04 |
| 云服务 | Cloudflare | [Pingora](https://blog.cloudflare.com/how-we-built-pingora-the-proxy-that-connects-cloudflare-to-the-internet/) 替代 NGINX，日处理请求超过 1 万亿，同等流量下 CPU 降低 70%、内存降低 67% | 2022 |
| 云服务 | AWS | Lambda 和 Fargate 底层的微虚拟机 Firecracker 由 Rust 编写 | 2018 |
| 浏览器 | Chrome | Web 字体改用 Rust 编写的 [Skrifa](https://developer.chrome.com/blog/memory-safety-fonts) 替代 FreeType | 2025 |
| 开发工具 | Vite 8 | 默认打包工具换成 Rust 编写的 [Rolldown](https://vite.dev/blog/announcing-vite8)，官方称构建提速 10 到 30 倍 | 2026-03 |
| 开发工具 | Next.js 16 | Rust 编写的 [Turbopack](https://nextjs.org/blog/next-16) 成为默认打包工具 | 2025-10 |
| 开发工具 | uv、Ruff | Python 包管理与代码检查工具；开发商 Astral 被 [OpenAI 宣布收购](https://thenewstack.io/openai-astral-acquisition/)，并入 Codex 团队 | 2026-03 |
| 开发工具 | fish shell | 4.0 版整体从 C++ 迁移到 Rust | 2025-02 |
| 开发工具 | GitHub Copilot | Agent 运行时从 TypeScript／Node.js [重写为 83 万行 Rust](https://github.blog/news-insights/product-news/migrating-the-github-copilot-runtime-to-rust-using-copilot/) | 2026-08 |
| 应用 | Discord | 后端服务、语音，2026 年再加上桌面端，详见下节 | 2018 起 |

共同点很明显：都是**底层、长时间运行、对性能或安全高度敏感**的软件，而不是普通的业务系统。

## Discord：从后端一路改到桌面端

Discord 是“应用转向 Rust”最完整的案例，2018 年起就在基础设施、语音和部分客户端中使用 Rust。

| 时间 | 事件 |
| --- | --- |
| 2020-02 | [Read States 服务从 Go 迁移到 Rust](https://discord.com/blog/why-discord-is-switching-from-go-to-rust)。Go 的 GC 每 2 分钟强制运行一次，导致延迟毛刺；Rust 版没有毛刺，延迟、CPU、内存全面占优 |
| 2026-09 | 升级到 Electron 42，CPU 中位数下降约 17%，内存反而上升约 4% |
| 2026-11-04 | CTO Stanislav Vishnevskiy 宣布桌面端[弃用 Electron](https://www.ghacks.net/2026/11/06/discord-is-rebuilding-its-desktop-app-in-rust-with-the-new-client-using-290-mb-of-ram/)，UI 改用 Zed 编辑器团队的 GPUI，内部代号 Phoenix |

Phoenix 的规划与官方称的数据：

| 项目 | 内容 |
| --- | --- |
| 内存 | Windows 11 上登录两个账号占用 290.2 MB（CTO 公布的截图） |
| 启动时间 | 约 1 秒，旧版约 6 秒 |
| 移动端 | 去掉 React Native，保留原生界面，与桌面端共享 Rust 编写的业务逻辑 |
| Web 端 | 保留 HTML 渲染，逻辑改为 WebAssembly |
| 上线时间 | 目前只有内部版本，CTO 表示“很快”开始测试，未公布日期 |

## 为什么选 Rust？五大原因

| 原因 | 说明 | 例子 |
| --- | --- | --- |
| 内存安全 | 编译期就拦下越界访问、use-after-free 等错误，而这类错误是 C／C++ 漏洞的大头 | Android 的 Rust 代码，内存安全漏洞密度约为 C／C++ 的千分之一；变更回滚率也低 4 倍 |
| 没有 GC 停顿 | 不用垃圾回收，延迟稳定，适合实时服务和内核 | Discord Read States 的延迟毛刺消失 |
| 性能接近 C | 运行时小、启动快 | Copilot 启动加一轮对话从 5.25 秒降到 292 毫秒（[InfoQ](https://infoq.com/news/2026/10/github-copilot-rust-migration)） |
| 一套代码多端复用 | 可通过 FFI 供其他语言调用，也能编译成 WebAssembly | Copilot 的 Rust 运行时供六种语言的 SDK 调用；Discord 桌面、移动、Web 共享逻辑 |
| AI 降低重写成本 | 重写最贵的是人力；AI 编程加上 Rust 严格的编译检查，大规模迁移变得可行 | GitHub 称 Copilot 运行时原本需要一个团队做一到两年，这次主要由一名工程师借助 Copilot 在约 14.5 周内完成 |

第五点是 2026 年的新变化。Rust 编译器非常严格，AI 写错的代码大多编译不过，相当于多了一道自动检查。

## 不选 Rust 的情况与代价

| 情况 | 说明 |
| --- | --- |
| TypeScript 7 选了 Go | 微软把 TypeScript 编译器用 Go 重写，速度提升约 10 倍。原编译器重度依赖 GC 和相互引用的数据结构，Go 可以逐文件移植，Rust 则需要重新设计 |
| 学习难、招人难 | [DeveloperTech](https://www.developer-tech.com/news/rust-adoption-stalls-memory-safe-programming-trends/) 2026 年 4 月报道企业采用放缓，原因是学习曲线陡、资深工程师难招；普通业务系统仍以 Java、C#、Go 为主 |
| Rust 也会宕机 | 2025 年 11 月 18 日 [Cloudflare 全球大故障](https://blog.cloudflare.com/18-november-2025-outage/)：配置文件超出上限，Rust 编写的 FL2 代理在 `unwrap()` 处直接 panic，是 Cloudflare 自 2019 年以来最严重的事故。内存安全不等于逻辑正确 |
| 生态仍在成长 | Discord 采用的 GPUI 尚未到 1.0，Discord 需要自行维护补丁 |
| 传闻要分清 | 微软工程师 Galen Hunt 称要在 2030 年前“消除所有 C／C++”，后来澄清这是迁移工具的研究项目，并非用 Rust 重写 Windows |

## 什么项目适合用 Rust？

| 适合 | 不一定需要 |
| --- | --- |
| 操作系统、驱动、浏览器引擎 | 普通 CRUD 网站和业务后台 |
| 高并发代理、数据库、实时服务 | 依赖 GC 和复杂对象关系的存量大型项目 |
| 编译器、打包工具、CLI 等开发工具 | 团队没有 Rust 经验、上线周期很紧的项目 |
| 需要同时运行在桌面、移动、Web 的核心逻辑 | 性能瓶颈在数据库或网络，而不在代码本身 |
