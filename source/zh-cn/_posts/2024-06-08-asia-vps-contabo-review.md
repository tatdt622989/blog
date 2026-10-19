---
title: Contabo 评测 2026：日本 VPS 值得买吗？与 Vultr、ConoHa、OVH 对比
date: 2024-06-08 00:14:20
updated: 2026-10-19 16:00:00
description: Contabo 怎么样？东京 Cloud VPS 4 前 24 个月每月 €4.40 就有 4 vCPU、8 GB 内存，同价位内存最大，但 CPU 共享、延迟要实测。整理 2026 年 10 月套餐，并与 Vultr、ConoHa、OVH 对比价格和流量。
permalink: 2024/06/08/asia-vps-contabo-review/
translation_key: asia-vps-contabo-review
translations:
  zh-TW: /2024/06/08/高性價比亞洲-VPS-推薦與實測心得/
  en: /en/2024/06/08/asia-vps-contabo-review/
categories:
- 服务器与建站
tags:
- VPS
- Contabo
---

![亚洲 VPS 推荐：Contabo、OVH、ConoHa 对比封面](cover.webp)

先说结论：**Contabo 同样的钱能买到最大的内存和硬盘，但 CPU 是共享的，网络延迟得自己实测**。2026 年 10 月，东京机房入门款 **Cloud VPS 4**（4 vCPU、8 GB 内存、100 GB SSD）前 24 个月每月 €4.40；同样 8 GB 内存，Vultr 要 40 美元。适合跑多个小站、数据库、测试环境和吃内存的自建服务；如果更看重延迟或单核性能，先看 ConoHa 或 Vultr。

我当初是因为原来的美国服务器在台湾 Ping 值太高，才开始对比有亚洲机房的海外 VPS。下文价格已于 2026 年 10 月 19 日对照各家官网更新。

<!--more-->

## Contabo、Vultr、ConoHa、OVH、DigitalOcean 对比（2026 年 10 月）

| 服务商 | 亚洲机房 | 入门配置 | 月费 | 流量 | 计费方式 |
| --- | --- | --- | --- | --- | --- |
| **Contabo** | 东京、新加坡 | 4 vCPU / 8 GB / 100 GB SSD | €4.40（前 24 个月，原价 €5.50） | 标称不限量（合理使用） | 月付或长期合约 |
| **Vultr** | 东京、大阪、首尔、新加坡 | 1 vCPU / 1 GB / 25 GB SSD | 5 美元 | 1 TB | 按小时，月费封顶 |
| **ConoHa** | 东京 | 512 MB 起 | 封顶 ¥751（1 GB 为 ¥1,065） | 默认 100 Mbps | 按小时或长期折扣 |
| **OVH** | 新加坡（无日本） | 2 vCore / 4 GB / 40 GB NVMe | 4.54 美元起 | 亚太区每月 500 GB | 月付或长期合约 |
| **DigitalOcean** | 新加坡 | 1 vCPU / 1 GB / 25 GB SSD | 6 美元 | 1,000 GiB | 按秒，月费封顶 |

**同样 8 GB 内存，各家月费对比：**

| 服务商 | 套餐 | 配置 | 月费 |
| --- | --- | --- | --- |
| Contabo | Cloud VPS 4 | 4 vCPU / 100 GB SSD | €4.40（前 24 个月） |
| OVH | VPS-2 | 4 vCore / 75 GB NVMe | 8.50 美元起 |
| Vultr | Regular Cloud Compute | 4 vCPU / 160 GB SSD | 40 美元 |
| DigitalOcean | Basic Regular | 4 vCPU / 160 GiB SSD | 48 美元 |

价格来源：[Contabo VPS](https://contabo.com/en/vps/)、[Vultr Pricing](https://www.vultr.com/pricing/)、[ConoHa 料金](https://www.conoha.jp/vps/pricing/)、[OVHcloud VPS](https://www.ovhcloud.com/en/vps/)、[DigitalOcean Droplets](https://www.digitalocean.com/pricing/droplets)。税费、汇率和促销随时会变，以下单页为准。

**怎么选：**

- **内存和存储优先，能接受偶尔抖动**：Contabo。
- **延迟优先，想按小时开关机**：Vultr 东京或 ConoHa。
- **最在意总价、流量不大**：OVH 新加坡，但要留意亚太区流量配额。

## Contabo 评测：优缺点

![Contabo 控制面板与品牌页](contabo.png)

Contabo 是德国服务商，亚洲有东京和新加坡机房。

| 优点 | 缺点 |
| --- | --- |
| 同价位内存、存储最大 | vCPU 共享，长时间高负载前先跑 benchmark |
| 标称不限流量（合理使用） | 入门款端口只有 200 Mbit/s |
| 中高配可选 SSD 或 NVMe | 最低价要签 24 个月，短期合约更贵 |
| 提供 API、CLI，支持 Terraform | 控制面板和工单流程不一定顺手，先拿非核心业务试跑 |

官方日本页给出的延迟是东京到香港 54 ms、到首尔 30 ms。实际延迟取决于你的运营商和线路，需要自己测（见下文）。

## Contabo Cloud VPS 套餐与价格（Cloud VPS 10 改名对照）

搜 **Contabo Cloud VPS 10** 的朋友注意：2026 年 8 月我核对时官网还叫 Cloud VPS 10 / 20 / 30，到 10 月已经改成按 vCPU 数命名的 **Core VPS** 系列。按内存对应：Cloud VPS 10（8 GB）→ Cloud VPS 4，Cloud VPS 20（12 GB）→ Cloud VPS 6，Cloud VPS 30（24 GB）→ Cloud VPS 8。

下表来自 [Contabo 日本机房页](https://contabo.com/en/locations/asia-japan/)，价格为前 24 个月的含税欧元月费：

| 套餐 | vCPU | 内存 | 存储 | 端口 | 月费 |
| --- | --- | --- | --- | --- | --- |
| **Cloud VPS 4** | 4 | 8 GB | 100 GB SSD | 200 Mbit/s | €4.40 |
| **Cloud VPS 6** | 6 | 12 GB | 200 GB SSD 或 100 GB NVMe | 300 Mbit/s | €6.00 |
| **Cloud VPS 8** | 8 | 24 GB | 300 GB SSD 或 150 GB NVMe | 600 Mbit/s | €11.20 |
| **Cloud VPS 12** | 12 | 48 GB | 400 GB SSD 或 200 GB NVMe | 800 Mbit/s | €20.00 |

- **原价**：VPS 4 / 6 / 8 / 12 分别为 €5.50 / €7.50 / €14.00 / €25.00，24 个月后按原价续费。
- **需要稳定 CPU**：改选 **Cloud VPS Plus**（AMD EPYC、全 NVMe），Plus 4 €10.80 起。
- **币种与税费**：官网标价含税。中国大陆、香港、台湾账户默认以美元结算，Contabo 不额外加收 VAT，实付以结账页为准。
- **流量**：VPS 总览页标注 **Unlimited Traffic\***（合理使用）。日本机房以前写的是每月 10 TB 出站流量，现在日本页没有单独说明，跑大流量业务前建议先问客服。

## Vultr 和 Contabo 怎么选

![Vultr 东京 VPS 价格页面](vultr.webp)

| 对比项 | Contabo | Vultr |
| --- | --- | --- |
| 5 美元左右的配置 | 4 vCPU / 8 GB | 1 vCPU / 1 GB |
| 亚洲机房 | 东京、新加坡 | 东京、大阪、首尔、新加坡等 |
| 计费 | 月付，长期合约最便宜 | 按小时，随用随删 |
| 流量 | 标称不限量 | 1 GB 套餐 1 TB |
| 适合 | 长期常驻、吃内存的服务 | 短期测试、多地域部署、看重稳定性 |

Vultr 东京最便宜是 **5 美元**（1 vCPU、1 GB、25 GB SSD、1 TB 流量）。官网的 2.5 / 3.5 美元套餐只在美国少数机房有，选东京时看不到。我 2024 年写这篇时实测台湾到 Vultr 日本机房约 **40 ms**，是这几家里最低的。

## ConoHa VPS 价格与特点

![ConoHa VPS 套餐与价格页面](conoha.png)

ConoHa 是 GMO 旗下的日本服务商，机房在东京，控制台以日文为主。支持**按小时计费**（有月费上限），也可以买长期套餐打折。我 2024 年实测台湾延迟约 **50 ms**。

ConoHa 从 2026 年 7 月 1 日起取消 10% 的服务维护调整费并调整价格，调整后的按小时价格与月费上限（含税）如下：

| 套餐 | 按小时 | 月费上限 |
| --- | --- | --- |
| **512 MB** | ¥1.3 | ¥751 |
| **1 GB** | ¥1.9 | ¥1,065 |
| **2 GB** | ¥3.7 | ¥2,033 |
| **4 GB** | ¥6.6 | ¥3,608 |

长期使用选 36 个月套餐折扣最大。默认带宽 100 Mbps，2026 年 10 月起可以加购 500 Mbps 或 1 Gbps。完整价格见 [ConoHa VPS 料金](https://www.conoha.jp/vps/pricing/)。

## OVH 有日本机房吗？

![OVHcloud VPS 价格页面](ovhcloud.webp)

**没有。** OVHcloud 的 VPS 在亚太区只有新加坡、悉尼和孟买，我 2024 年实测台湾到新加坡约 **50 ms**。

老的 Starter、VLE 套餐已换成新版 VPS 系列，官网起价如下：

| 套餐 | vCore | 内存 | NVMe | 起价 | 亚太区每月流量 |
| --- | --- | --- | --- | --- | --- |
| **VPS-1** | 2 | 4 GB | 40 GB | 4.54 美元 | 500 GB |
| **VPS-2** | 4 | 8 GB | 75 GB | 8.50 美元 | 1 TB |
| **VPS-3** | 6 | 12 GB | 100 GB | 12.32 美元 | 1 TB |
| **VPS-4** | 8 | 24 GB | 200 GB | 23.37 美元 | 3 TB |

欧美机房不限流量，但 [OVHcloud 官网](https://www.ovhcloud.com/en/vps/) 写明**亚太区有每月流量配额，用完后带宽限速到 10 Mbps**。不同机房起价可能不同，以配置页为准。所有套餐都包含每日备份和 Anti-DDoS。

## DigitalOcean

![DigitalOcean Droplet 价格页面](digitalocean.png)

DigitalOcean 亚洲有新加坡和班加罗尔机房，控制台和内置的网页 SSH 很好用。2026 年 1 月 1 日起改为**按秒计费**，月费有上限。Basic 套餐：512 MB **4 美元**、1 GB **6 美元**、2 GB **12 美元**、4 GB（2 vCPU）**24 美元**。价格和 Vultr 一个档次，配置同样偏小。

## 怎么测网络延迟

上面的延迟是我 2024 年在台湾测的，不代表现在，也不代表大陆线路。正式迁移前，在用户实际使用的网络（电信、联通、移动或公司网络）不同时段测 Ping、丢包和路由（**mtr** 或 **traceroute**）。Vultr 和 DigitalOcean 可以按小时开机测完就删；Contabo 和 OVH 建议先买月付。

如果要搭 Minecraft 之类的游戏服务器，除了内存，还要看单核性能和高峰时段延迟。

## 延伸阅读

- [Cloudflare 免费服务图鉴](/zh-cn/2026/10/19/cloudflare-free-stack-atlas/)：用 Tunnel 把 VPS 上的服务安全暴露出去、用 R2 存备份，服务器钱照付，但能省下不少周边成本。
- [为什么 localhost 发给朋友打不开？](/zh-cn/2026/09/06/why-localhost-cannot-be-shared-web-deployment-101/)：还不确定要不要买 VPS，先了解网站上线需要哪些组件。

价格与套餐以各服务商官网为准。
