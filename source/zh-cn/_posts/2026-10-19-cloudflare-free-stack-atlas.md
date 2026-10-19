---
title: "Cloudflare 免费服务图鉴：41 项服务的额度、限制与独立开发者实战组合"
date: 2026-10-19 14:00:00
updated: 2026-10-19 14:00:00
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

Cloudflare 的免费套餐给得很大方，但“免费”两个字背后的计费单位很容易看错：Workers AI 的 10,000 Neurons 不是 10,000 次请求，Vectorize 的 5M 是向量维度而不是向量条数，D1 的 5 GB 是整个账号的总配额。这些细节分散在几十篇官方文档里，每次开新项目都得重新查一遍。

所以我做了 **[Cloudflare Free Stack](https://cloudflare-free-stack-atlas.opal-pearl-8326.chatgpt.site/)**：一个面向独立开发者的 Cloudflare 免费服务图鉴。它收录了 41 项服务和功能，每一项都列出免费额度、使用限制、计费边界和官方出处，另外还整理了从前端到 AI 的五套实战组合。这篇文章介绍网站的内容和用法，顺便把最值得记住的数字梳理出来。

网站本身是繁体中文界面，所以下面截图里的文字是繁体。

> **网站入口：[Cloudflare Free Stack 免费服务图鉴](https://cloudflare-free-stack-atlas.opal-pearl-8326.chatgpt.site/)**
> 免费访问、无需注册，电脑和手机都能打开。也可以直接跳到 [实战组合](https://cloudflare-free-stack-atlas.opal-pearl-8326.chatgpt.site/#stacks) 或 [核查笔记](https://cloudflare-free-stack-atlas.opal-pearl-8326.chatgpt.site/#notes)。

<!--more-->

## 网站收录了哪些内容

图鉴目前收录 **41 项服务和功能**，其中 37 项提供免费功能或免费额度，另外 4 项是放进来做对照的付费服务。所有数据都在 **2026-10-19** 核对过，每张卡片都链接回 Cloudflare 官方文档。

| 分类 | 数量 | 代表服务 |
| --- | --- | --- |
| 开发部署 | 15 | Workers、Pages、R2、D1、KV、Durable Objects、Queues |
| AI 与搜索 | 5 | Workers AI、Vectorize、AI Gateway、AI Search、Browser Run |
| 安全与网络 | 13 | DNS、CDN、Universal SSL、DDoS、Tunnel、Access |
| 其他工具 | 8 | Email Routing、Web Analytics、Images、Stream |

它不是 Cloudflare 的完整产品清单，而是挑出独立开发者最可能用到的服务，把“能不能免费用、用到什么程度会被限制”讲清楚。

## 怎么用：搜索、筛选和收藏

![服务图鉴首页：搜索框、分类标签和费用筛选，下方是 Workers、Pages、R2 等服务卡片](atlas.jpg)

首页的服务图鉴有几个好用的功能：

- **搜索**：支持按服务名、用途、额度或关键词搜索，比如输入 **Vue**、**WebSocket**、**R2**。在首页按 **/** 或 **Cmd + K** 可以直接跳到搜索框。
- **分类和费用筛选**：先选开发部署、AI 与搜索、安全与网络或其他工具，再用费用标签缩小范围。
- **热门推荐**：只看 Workers、Pages、R2、D1、Workers AI、Turnstile 这几个最常用的服务。
- **收藏**：点卡片右上角的书签，就能把想用的服务存下来，之后切到收藏视图一次看完。
- **可分享的链接**：搜索和筛选条件会写进 URL，比如 **?category=ai**，直接发给别人就能看到同样的结果。

每张卡片上的大号数字是这个服务最关键的额度，下面一行是第二重要的限制，扫一眼就能横向对比。

## 三种费用标签，先分清再选型

图鉴把每个服务归入三种费用标签，我觉得这是整个网站最重要的设计：

| 标签 | 含义 | 数量 |
| --- | --- | --- |
| 真正 $0 免费 | 基础功能不按用量计费，但仍有功能和合理使用限制 | 14 |
| 免费额度 | 有每日、每月或容量上限，超限后可能停止服务，部分产品超额会计费 | 23 |
| 必须付费 | 需要先订阅付费套餐，套餐内含用量不等于零成本 | 4 |

“真正 $0”的服务大多集中在安全与网络类：DNS、CDN、Universal SSL、DDoS Protection、Tunnel、Turnstile 都不会因为用量增加而收费。开发和 AI 类几乎都属于“免费额度”，用量上去之后迟早会碰到上限。

## 独立开发者最常用的核心额度

下面是图鉴里标为热门的服务，以及我认为开新项目前一定要了解的数字：

| 服务 | 用途 | 免费额度 | 需要注意 |
| --- | --- | --- | --- |
| Workers | 边缘 API | 100,000 次请求 / 天，每次 10 ms CPU | 与 Pages Functions 共享每日请求配额 |
| Pages | 静态站点部署 | 静态请求不限量，500 次构建 / 月 | Functions 按 Workers 额度计算 |
| R2 | 对象存储 | 10 GB-month，出站流量 US$0 | 需要绑定账单，超额自动计费 |
| D1 | SQLite 数据库 | 读 500 万行 / 天，写 10 万行 / 天 | 账号总量 5 GB，单库 500 MB |
| Workers KV | 配置与缓存 | 读 10 万次 / 天，写 1,000 次 / 天 | 最终一致性，不适合余额或游戏状态 |
| Durable Objects | 多人房间、WebSocket | 100,000 次请求 / 天 | 免费套餐只支持 SQLite 存储后端 |
| Workers AI | 模型推理 | 10,000 Neurons / 天 | Neurons 既不是 token 也不是请求数 |
| Turnstile | 表单人机验证 | 验证次数不限 | 必须在服务端校验 token |

安全与网络类可以放心当作基础设施来用：DNS 查询不限量，基础 CDN 和 Universal SSL 免费，标准 DDoS 防护不按攻击流量计费；Cloudflare Tunnel 每个账号包含 1,000 条隧道，Zero Trust Free 提供 50 个用户席位，由 Access 和 Gateway 共享。

## 最容易看错的数字

做图鉴的过程中我发现，最常出错的不是额度大小，而是计费单位。网站在“核查笔记”板块专门列出了这几个：

- **Workers AI**：Neurons 不等于请求数。同样一次调用，模型不同、输入输出长度不同，消耗的 Neurons 差别很大。
- **Vectorize**：5M 指的是存储的向量维度。1,000 条 768 维向量就占 768,000 个维度，所以免费额度大约只能存 6,500 条 768 维向量。
- **Queues**：10,000 是操作次数，不是消息条数。一条小消息正常投递要经过写入、读取、删除三次操作，重试还会继续增加。
- **D1**：5 GB 是账号下所有数据库的总量，单个数据库上限 500 MB；读取额度按实际扫描的行数计算，不建索引的查询很快就会把额度用完。

还有几个也很容易误解：Pages 的 500 是**构建次数**，不是访问量；Cron Triggers 的 5 是**触发器数量**，不是一天只能跑五次；DNS 的 200 是新建 Free zone 的**解析记录条数上限**，不是查询次数。

## 看起来免费、实际要付费的四项

图鉴特意收录了 4 个付费服务，因为它们很容易和免费功能混为一谈：

| 服务 | 起步价格 | 容易混淆的免费功能 |
| --- | --- | --- |
| Email Sending | Workers Paid 每月 US$5 起，含 3,000 封 | Email Routing 只免费转发收件，不能向任意收件人发信 |
| Images Storage | 每月 US$5 / 10 万张 | Images Transformations 每月 5,000 次免费转换，不含托管存储 |
| Stream | 每月 US$5 / 1,000 分钟存储 | 上传和转码免费，但存储和播放分钟都要计费 |
| Containers | Workers Paid 每月 US$5 起 | 免费 Workers 不是 Docker 主机，也不是免费 VPS |

如果项目需要发交易通知邮件、托管大量图片或者播放视频，最好一开始就把这几项费用算进预算。

## 五套实战组合：从一个前端到一个完整作品

![实战组合板块：Vue / Vite 组合的架构链路 Vue + Vite、Pages、Workers、D1，附构建步骤和注意事项](stacks.jpg)

单个服务再好用，也要组合起来才能做成产品。网站的“实战组合”板块整理了五种常见场景，每套都有架构链路、三个步骤、费用说明和注意事项：

| 组合 | 架构 | 适用场景 | 费用 |
| --- | --- | --- | --- |
| Vue / Vite | Vue → Pages → Workers → D1 | 作品集、内容站、会员 MVP | 额度内可以 $0 起步 |
| Capacitor | Capacitor → Workers → D1 → R2 | 网站和 App 共用一套后端 | Cloudflare 额度内 $0，开发者账号另算 |
| Node / Coolify | 用户 → Tunnel → 自己的 VPS → R2 | 已有服务器和数据库的自托管服务 | Cloudflare 可以免费，服务器另算 |
| 个人游戏平台 | Pages → Durable Objects → D1 → R2 | 多人房间、排行榜 | 小规模、额度内 $0 |
| AI 知识库 | 文档 → Workers AI → Vectorize → AI Gateway | RAG、语义搜索、文档问答 | 按模型、索引和查询量估算 |

每套组合的注意事项都是实际开发中很容易踩的坑，比如：

- **Vue / Vite**：Pages 不限量的只是纯静态请求，Functions、API 和数据库都有各自的每日额度。
- **Capacitor**：不要把 R2 凭证或第三方 API 密钥打包进 App，上传流程要由后端鉴权。
- **Node / Coolify**：Tunnel 只负责打通连接，不会帮你跑 Node；VPS、数据库和备份的成本并不会因此消失。
- **个人游戏平台**：KV 不适合高频读写、要求强一致的游戏状态；金币、奖励和排名不能只信客户端上报。
- **AI 知识库**：AI Search 从 2026-11-01 开始计费，外部大模型的调用费用也不能当成免费。

## 每个服务都有一个完整介绍页

![Workers 服务介绍页：数据怎么看、免费额度表、计费边界和使用限制](service-page.jpg)

点开任意一张卡片，就会进入该服务的独立页面，比如 [Workers 介绍页](https://cloudflare-free-stack-atlas.opal-pearl-8326.chatgpt.site/services/workers/)。每页固定包含四个部分：

1. **数据怎么看**：用一段话解释额度怎么计量，然后是额度表、计费边界和使用限制。
2. **怎么开始用**：准备工作、四个配置步骤，部分服务还附带示例代码（比如 Workers 的最小 JSON API、D1 的排行榜表结构、Cron 的 UTC 定时配置），最后说明怎么确认配置生效。
3. **和什么搭配**：推荐三个搭配服务，并说明各自负责哪部分。
4. **官方文档与核查来源**：官方配置指南和定价页链接。

每页都有独立 URL，可以直接分享给队友，侧边栏也能一键复制链接或收藏。

## 即将生效的两项变更

![核查笔记板块：三种费用标签说明，以及 2026-11-01 AI Search 开始计费、2026-12-01 Workers Logs 新计费规则的时间线](notes.jpg)

图鉴还把已经公告、但尚未生效的变更标注在卡片上：

- **2026-11-01，AI Search 开始计费**：每月内含 5M ingestion tokens、10 GB-month 存储，以及语义检索和全文检索各 1,000 次；生成和外部模型的费用仍需另算。
- **2026-12-01，Workers Logs 改用 Observability 新计费规则**：目前是每天 200,000 条日志事件、保留 3 天；新规则下 Free 额度为每天 0.5 GB ingestion、保留 7 天。

有这类变更的服务，卡片上会显示“有已公告变更”的提示，避免把现在的不计费误当成永久免费。

## 用图鉴规划新项目的流程

我自己开新项目时，大致按这个顺序来用：

1. 在**实战组合**里找最接近的场景，先确定架构需要哪几块。
2. 逐个打开服务页，看**数据怎么看**，确认计费单位和自己的使用方式对得上。
3. 用费用筛选切到**必须付费**，确认没有无意中依赖付费功能。
4. 把要用的服务加入**收藏**，之后回来查额度就不用重新搜索。
5. 正式上线前，按每个服务页的验证方法逐项检查，再点开官方来源核对最新套餐。

最后提醒一句：图鉴里的数值是 2026-10-19 的核查快照，价格以美元计。Cloudflare 的套餐会调整，启用前请以官方页面和自己账号的实际限制为准。这是我个人整理的网站，不是 Cloudflare 官方资源。

工具已经准备好了，接下来就看你的点子了：[Cloudflare Free Stack](https://cloudflare-free-stack-atlas.opal-pearl-8326.chatgpt.site/)。
