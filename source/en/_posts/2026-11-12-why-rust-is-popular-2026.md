---
title: "Why Is Rust So Popular? Why Discord, Linux, and GitHub Are Moving to Rust, and Who Isn't"
date: 2026-11-12 18:00:00
updated: 2026-11-12 18:00:00
description: "Linux 7.0 makes Rust official, Android, Windows, Cloudflare and GitHub adopt it, and Discord drops Electron. Key rewrites, reasons, counterexamples."
permalink: 2026/11/12/why-rust-is-popular-2026/
translation_key: why-rust-is-popular-2026
translations:
  zh-TW: /2026/11/12/Rust-為什麼越來越紅？Discord、Linux、GitHub-都改用-Rust-的原因與反例/
  zh-CN: /zh-cn/2026/11/12/why-rust-is-popular-2026/
categories:
  - Software Engineering
tags:
  - Rust
  - Programming Languages
  - Discord
  - Linux
  - Memory Safety
---

![Overview of Rust rewrites: Linux, Android, Windows and Ubuntu in operating systems, Cloudflare and AWS Firecracker in the cloud, Vite, Next.js, uv, Ruff and fish in dev tools, and Discord, GitHub Copilot and Chrome in apps](cover.jpg)

**Rust is growing, but in specific places: operating systems, cloud infrastructure, developer tools, and desktop apps that care about memory use and startup time.** The main reasons are memory safety and speed without a garbage collector (GC). In 2026 a new force joined them: AI has made large rewrites much cheaper. Rust is still not the default choice for everything, though. The TypeScript 7 compiler went with Go, and Rust slipped from 10th to 11th on TIOBE in November.

<!--more-->

## How Popular Is Rust? Three Indicators

| Indicator | Figure |
| --- | --- |
| [TIOBE, November 2026](https://www.tiobe.com/tiobe-index/) | 11th at 1.63%, up from 14th a year earlier. It held 10th from July to October, then Go passed it |
| [Stack Overflow 2026 survey](https://survey.stackoverflow.co/2026/technology/data/languages) | 18.0% of respondents use it extensively, 12th overall |
| Stack Overflow 2025 survey | Most admired language for the ninth year running; 72% of its users want to keep using it |

Usage is modest, but people who try Rust tend to stay, and it climbed three places in a year.

## Well-Known Moves to Rust

| Area | Project | What changed | When |
| --- | --- | --- | --- |
| OS | Linux kernel | [Linux 7.0](https://linuxiac.com/linux-kernel-7-0-released/) drops the "experimental" label; Rust is now an official kernel language | 2026-04 |
| OS | Android | Much of the new code is written in Rust; memory safety bugs [fell below 20% of all vulnerabilities](https://blog.google/security/rust-in-android-move-fast-fix-things/) for the first time | 2025 |
| OS | Windows | The DirectWriteCore font parser was ported to 154,000 lines of Rust; Win32k's GDI region code already ships in Windows ([Azure CTO Mark Russinovich](https://www.thestack.technology/rewriting-windows-in-rust/)) | 2025 |
| OS | Ubuntu 26.04 LTS | sudo-rs and Rust coreutils are the defaults; cp, mv and rm still come from GNU | 2026-04 |
| Cloud | Cloudflare | [Pingora](https://blog.cloudflare.com/how-we-built-pingora-the-proxy-that-connects-cloudflare-to-the-internet/) replaced NGINX, serves over 1 trillion requests a day, and uses 70% less CPU and 67% less memory for the same traffic | 2022 |
| Cloud | AWS | Firecracker, the microVM behind Lambda and Fargate, is written in Rust | 2018 |
| Browser | Chrome | Web fonts now use the Rust library [Skrifa](https://developer.chrome.com/blog/memory-safety-fonts) instead of FreeType | 2025 |
| Dev tools | Vite 8 | The default bundler is now the Rust-based [Rolldown](https://vite.dev/blog/announcing-vite8); Vite claims 10 to 30 times faster builds | 2026-03 |
| Dev tools | Next.js 16 | The Rust-based [Turbopack](https://nextjs.org/blog/next-16) is the default bundler | 2025-10 |
| Dev tools | uv, Ruff | Python package manager and linter; [OpenAI announced it is acquiring](https://thenewstack.io/openai-astral-acquisition/) their maker Astral for its Codex team | 2026-03 |
| Dev tools | fish shell | Version 4.0 is fully ported from C++ to Rust | 2025-02 |
| Dev tools | GitHub Copilot | The agent runtime moved from TypeScript and Node.js to [832,000 lines of Rust](https://github.blog/news-insights/product-news/migrating-the-github-copilot-runtime-to-rust-using-copilot/) | 2026-08 |
| Apps | Discord | Backend services and voice, and from 2026 the desktop client (next section) | Since 2018 |

The pattern is clear: these are **low-level, long-running programs where performance or security matters**, not typical business back offices.

## Discord: From the Backend to the Desktop App

Discord is the most complete example of an app moving to Rust. It has used Rust since 2018 for infrastructure, voice, and parts of the client.

| When | Event |
| --- | --- |
| 2020-02 | [The Read States service moved from Go to Rust](https://discord.com/blog/why-discord-is-switching-from-go-to-rust). Go forced a GC run every 2 minutes, which caused latency spikes; the Rust version had no spikes and beat Go on latency, CPU and memory |
| 2026-09 | The upgrade to Electron 42 cut median CPU use by about 17%, while memory rose about 4% |
| 2026-11-04 | CTO Stanislav Vishnevskiy announced the desktop app will [drop Electron](https://www.ghacks.net/2026/11/06/discord-is-rebuilding-its-desktop-app-in-rust-with-the-new-client-using-290-mb-of-ram/) for GPUI, the UI framework from the Zed editor team. The internal code name is Phoenix |

What Discord says about Phoenix:

| Item | Detail |
| --- | --- |
| Memory | 290.2 MB with two accounts signed in on Windows 11 (screenshot posted by the CTO) |
| Startup | About 1 second, versus about 6 for the current app |
| Mobile | React Native goes away; native UIs stay and share Rust app logic with desktop |
| Web | HTML rendering stays; the logic moves to WebAssembly |
| Release | Internal builds only; the CTO says testing starts "soon", with no date |

## Why Rust? Five Reasons

| Reason | What it means | Example |
| --- | --- | --- |
| Memory safety | The compiler blocks out-of-bounds access and use-after-free bugs, the largest source of C and C++ vulnerabilities | Android's Rust code has about 1/1000 the memory safety bug density of its C and C++; Rust changes are rolled back 4 times less often |
| No GC pauses | No garbage collector means steady latency, which suits real-time services and kernels | Discord's Read States latency spikes disappeared |
| Near-C performance | Small runtime and fast startup | Copilot's startup plus one chat turn dropped from 5.25 seconds to 292 milliseconds ([InfoQ](https://infoq.com/news/2026/10/github-copilot-rust-migration)) |
| One codebase, many hosts | Other languages can call it through FFI, and it compiles to WebAssembly | Copilot's Rust runtime serves SDKs in six languages; Discord shares logic across desktop, mobile and web |
| AI makes rewrites cheaper | Labor is the main cost of a rewrite; AI coding plus Rust's strict compiler makes large ports practical | GitHub says the Copilot runtime port would once have taken a team one to two years; one engineer did most of it with Copilot in about 14.5 weeks |

The fifth reason is new in 2026. Rust's compiler is strict, so most wrong code from an AI does not compile. That works as an extra automatic check.

## When Teams Don't Choose Rust, and What It Costs

| Case | Detail |
| --- | --- |
| TypeScript 7 chose Go | Microsoft rewrote the TypeScript compiler in Go and got about 10 times faster builds. The old compiler relies heavily on GC and cyclic data structures; Go allowed a file-by-file port, while Rust would have needed a redesign |
| Hard to learn, hard to hire | [DeveloperTech](https://www.developer-tech.com/news/rust-adoption-stalls-memory-safe-programming-trends/) reported in April 2026 that enterprise adoption has slowed because of the learning curve and a thin talent pool; business back ends still run mostly on Java, C# and Go |
| Rust code still fails | On November 18, 2025, [Cloudflare's global outage](https://blog.cloudflare.com/18-november-2025-outage/) began when a config file exceeded a limit and the Rust-based FL2 proxy panicked on `unwrap()`. Cloudflare called it its worst outage since 2019. Memory safety does not mean correct logic |
| Young ecosystem | GPUI, which Discord picked, is not yet 1.0, so Discord maintains its own patches |
| Separate fact from rumor | Microsoft engineer Galen Hunt posted a goal to "eliminate every line of C and C++" by 2030, then clarified it is a research project on migration tools, not a Rust rewrite of Windows |

## What Kind of Project Fits Rust?

| Good fit | Not necessarily |
| --- | --- |
| Operating systems, drivers, browser engines | Typical CRUD sites and business back ends |
| High-traffic proxies, databases, real-time services | Large existing codebases built around GC and complex object graphs |
| Compilers, bundlers, CLIs and other dev tools | Teams with no Rust experience on a tight deadline |
| Core logic shared across desktop, mobile and web | Apps whose bottleneck is the database or network, not the code |
