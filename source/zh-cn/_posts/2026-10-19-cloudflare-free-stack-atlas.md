---
title: "Cloudflare 免费服务图鉴：41 项服务的额度、限制与独立开发者实战组合"
date: 2026-10-19 14:00:00
updated: 2026-10-19 15:00:00
description: "我做了一个 Cloudflare 免费服务图鉴网站，梳理 Workers、Pages、R2、D1、Workers AI、Tunnel 等 41 项服务的官方额度、计费单位和使用限制，并给出 Vue、Capacitor、Node / Coolify、多人游戏和 AI 知识库五套实战组合。"
permalink: 2026/10/19/cloudflare-free-stack-atlas/
translation_key: cloudflare-free-stack-atlas
translations:
  zh-TW: /2026/10/19/cloudflare-free-stack-atlas/
  en: /en/2026/10/19/cloudflare-free-stack-atlas/
categories:
- 独立开发
tags:
- Cloudflare
- 独立开发者
- Serverless
- 免费资源
---

![Cloudflare Free Stack 封面：发光的橙色云朵悬浮在多层深色平台上，象征可以自由组合的云服务](cover.jpg)

Cloudflare 免费套餐的额度分散在几十篇官方文档里，计费单位也很容易看错。我把常用的 41 项服务整理成一个图鉴网站：每项列出免费额度、限制、什么时候开始收费和官方出处，另外附了五套实战组合。网站是繁体中文界面，所以下面的截图是繁体。

> **网站入口：[Cloudflare Free Stack 免费服务图鉴](https://cloudflare-free-stack-atlas.opal-pearl-8326.chatgpt.site/)**
> 免费访问、无需注册。也可以直接跳到 [实战组合](https://cloudflare-free-stack-atlas.opal-pearl-8326.chatgpt.site/#stacks) 或 [核查笔记](https://cloudflare-free-stack-atlas.opal-pearl-8326.chatgpt.site/#notes)。

<!--more-->

## 收录范围与费用标签

![服务图鉴首页：搜索框、分类标签和费用筛选，下方是 Workers、Pages、R2 等服务卡片](atlas.jpg)

41 项服务分为开发部署 15 项、AI 与搜索 5 项、安全与网络 13 项、其他工具 8 项，数据核查日期为 2026-10-19。每项都标注三种费用标签之一：

| 标签 | 含义 | 数量 |
| --- | --- | --- |
| 真正 $0 免费 | 不按用量计费，比如 DNS、CDN、SSL、DDoS、Tunnel、Turnstile | 14 |
| 免费额度 | 有每日或每月上限，超限后停止服务或开始计费 | 23 |
| 必须付费 | 放进来做对照，避免误以为免费 | 4 |

支持按名称、用途或关键词搜索（首页按 **/** 或 **Cmd + K**），可以按分类和费用筛选，也能收藏服务。筛选条件会写进 URL，可以直接分享。

## 核心服务的免费额度

| 服务 | 免费额度 | 注意 |
| --- | --- | --- |
| Workers | 100,000 次请求 / 天，每次 10 ms CPU | 与 Pages Functions 共享请求配额 |
| Pages | 静态请求不限量，500 次构建 / 月 | Functions 按 Workers 额度计算 |
| R2 | 10 GB-month，出站流量 US$0 | 需要绑定账单，超额自动计费 |
| D1 | 读 500 万行 / 天，写 10 万行 / 天 | 账号总量 5 GB，单库 500 MB |
| Workers KV | 读 10 万次 / 天，写 1,000 次 / 天 | 最终一致性，不适合余额或游戏状态 |
| Durable Objects | 100,000 次请求 / 天 | 免费套餐只支持 SQLite 后端 |
| Workers AI | 10,000 Neurons / 天 | Neurons 不是请求数 |
| Turnstile | 验证次数不限 | token 必须在服务端校验 |

## 最容易看错的数字

- **Workers AI**：Neurons 按模型和输入输出长度消耗，不等于请求数。
- **Vectorize**：5M 是向量维度，768 维向量大约只能存 6,500 条。
- **Queues**：10,000 是操作次数，一条消息正常投递要 3 次操作。
- **D1**：读取额度按扫描行数计算，不建索引的查询很快就会用完。
- **Pages** 的 500 是构建次数，**Cron** 的 5 是触发器数量，**DNS** 的 200 是解析记录条数，都不是使用次数。

## 容易误以为免费的四项

| 服务 | 价格 | 免费的只有 |
| --- | --- | --- |
| Email Sending | Workers Paid 每月 US$5 起 | Email Routing 收件转发 |
| Images Storage | 每月 US$5 / 10 万张 | 每月 5,000 次图片转换 |
| Stream | 每月 US$5 / 1,000 分钟存储 | 上传和转码 |
| Containers | Workers Paid 每月 US$5 起 | 没有，免费 Workers 不是 Docker 主机 |

## 五套实战组合

![实战组合板块：Vue / Vite 组合的架构链路 Vue + Vite、Pages、Workers、D1，附构建步骤和注意事项](stacks.jpg)

| 组合 | 架构 | 注意 |
| --- | --- | --- |
| Vue / Vite | Vue → Pages → Workers → D1 | 只有纯静态请求不限量，API 和数据库各有额度 |
| Capacitor | Capacitor → Workers → D1 → R2 | 不要把 R2 凭证或 API 密钥打包进 App |
| Node / Coolify | Tunnel → 自己的 VPS → R2 | Tunnel 只负责连接，服务器费用照付 |
| 个人游戏平台 | Pages → Durable Objects → D1 → R2 | 游戏状态不要放 KV，排名不能只信客户端 |
| AI 知识库 | Workers AI → Vectorize → AI Gateway | AI Search 从 2026-11-01 开始计费 |

## 服务介绍页

![Workers 服务介绍页：数据怎么看、免费额度表、计费边界和使用限制](service-page.jpg)

点开任意卡片会进入独立页面，比如 [Workers](https://cloudflare-free-stack-atlas.opal-pearl-8326.chatgpt.site/services/workers/)。页面包含额度解读、配置步骤和示例代码、搭配服务，以及官方文档链接。

图鉴数值是 2026-10-19 的快照，启用前请以官方页面为准。这是个人整理的网站，不是 Cloudflare 官方资源。
