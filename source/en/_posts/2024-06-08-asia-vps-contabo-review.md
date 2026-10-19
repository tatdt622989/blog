---
title: "Contabo Review 2026: Tokyo VPS vs Vultr, ConoHa, and OVH"
date: 2024-06-08 00:14:20
updated: 2026-10-19 16:00:00
description: "Contabo review 2026: the Tokyo Cloud VPS 4 offers 4 vCPU and 8 GB RAM from €4.40/mo, but CPU is shared. Prices compared with Vultr, ConoHa and OVH."
permalink: 2024/06/08/asia-vps-contabo-review/
translation_key: asia-vps-contabo-review
translations:
  zh-TW: /2024/06/08/高性價比亞洲-VPS-推薦與實測心得/
  zh-CN: /zh-cn/2024/06/08/asia-vps-contabo-review/
categories:
- Servers & Hosting
tags:
- VPS
- Contabo
---

![Cover comparing Asian VPS providers Contabo, OVH, and ConoHa](cover.webp)

Contabo in one line: **you get the most RAM and storage for the money, but the CPU is shared and latency to your users is something you have to test yourself**. As of October 2026, the entry Tokyo plan, **Cloud VPS 4** (4 vCPU, 8 GB RAM, 100 GB SSD), costs €4.40/month for the first 24 months. The same 8 GB of RAM costs US$40 at Vultr. It suits several small sites, databases, staging boxes, and memory-hungry self-hosted apps. If low latency or single-core speed matters more, look at ConoHa or Vultr first.

I started comparing VPS providers with Asian data centers because my old US server had high ping from Taiwan. All prices below were checked against each provider's official pages on October 19, 2026.

<!--more-->

## Contabo vs Vultr vs ConoHa vs OVH vs DigitalOcean (October 2026)

| Provider | Closest Asian locations | Entry plan | Monthly price | Traffic | Billing |
| --- | --- | --- | --- | --- | --- |
| **Contabo** | Tokyo, Singapore | 4 vCPU / 8 GB / 100 GB SSD | €4.40 (first 24 months, regular €5.50) | Listed as unlimited (fair use) | Monthly or long term |
| **Vultr** | Tokyo, Osaka, Seoul, Singapore | 1 vCPU / 1 GB / 25 GB SSD | US$5 | 1 TB | Hourly, monthly cap |
| **ConoHa** | Tokyo | 512 MB plan and up | ¥751 cap (1 GB: ¥1,065) | 100 Mbps default | Hourly or prepaid discount |
| **OVH** | Singapore (no Japan) | 2 vCore / 4 GB / 40 GB NVMe | from US$4.54 | 500 GB/month in APAC | Monthly or long term |
| **DigitalOcean** | Singapore | 1 vCPU / 1 GB / 25 GB SSD | US$6 | 1,000 GiB | Per second, monthly cap |

**What 8 GB of RAM costs at each provider:**

| Provider | Plan | Specs | Monthly price |
| --- | --- | --- | --- |
| Contabo | Cloud VPS 4 | 4 vCPU / 100 GB SSD | €4.40 (first 24 months) |
| OVH | VPS-2 | 4 vCore / 75 GB NVMe | from US$8.50 |
| Vultr | Regular Cloud Compute | 4 vCPU / 160 GB SSD | US$40 |
| DigitalOcean | Basic Regular | 4 vCPU / 160 GiB SSD | US$48 |

Sources: [Contabo VPS](https://contabo.com/en/vps/), [Vultr Pricing](https://www.vultr.com/pricing/), [ConoHa pricing](https://www.conoha.jp/vps/pricing/), [OVHcloud VPS](https://www.ovhcloud.com/en/vps/), [DigitalOcean Droplets](https://www.digitalocean.com/pricing/droplets). Taxes, exchange rates, and promotions change; the checkout page is final.

**Quick pick:**

- **RAM and storage first, occasional jitter is fine**: Contabo.
- **Low latency first, want to spin servers up and down by the hour**: Vultr Tokyo or ConoHa.
- **Lowest total price, light traffic**: OVH Singapore, but mind the APAC traffic quota.

## Contabo review: pros and cons

![Contabo control panel and brand page](contabo.png)

Contabo is a German host with Asian data centers in Tokyo and Singapore.

| Pros | Cons |
| --- | --- |
| Most RAM and storage per dollar | Shared vCPU; benchmark before running sustained heavy loads |
| Traffic listed as unlimited (fair use) | Entry plan port is only 200 Mbit/s |
| SSD or NVMe on mid and upper plans | Lowest price needs a 24-month term; shorter terms cost more |
| API, CLI, and Terraform support | The panel and support flow may not suit you; trial it with a non-critical service first |

Contabo's Japan page lists 54 ms from Tokyo to Hong Kong and 30 ms to Seoul. Your own numbers depend on your ISP and routing, so test them (see below).

## Contabo Cloud VPS plans and prices (where did Cloud VPS 10 go?)

If you searched for **Contabo Cloud VPS 10**: when I checked in August 2026 the lineup was still Cloud VPS 10 / 20 / 30. By October it had been renamed to the **Core VPS** series, named by vCPU count. Matched by RAM: Cloud VPS 10 (8 GB) → Cloud VPS 4, Cloud VPS 20 (12 GB) → Cloud VPS 6, Cloud VPS 30 (24 GB) → Cloud VPS 8.

Tokyo plans from [Contabo's Japan location page](https://contabo.com/en/locations/asia-japan/), shown as tax-inclusive euro prices for the first 24 months:

| Plan | vCPU | RAM | Storage | Port | Monthly |
| --- | --- | --- | --- | --- | --- |
| **Cloud VPS 4** | 4 | 8 GB | 100 GB SSD | 200 Mbit/s | €4.40 |
| **Cloud VPS 6** | 6 | 12 GB | 200 GB SSD or 100 GB NVMe | 300 Mbit/s | €6.00 |
| **Cloud VPS 8** | 8 | 24 GB | 300 GB SSD or 150 GB NVMe | 600 Mbit/s | €11.20 |
| **Cloud VPS 12** | 12 | 48 GB | 400 GB SSD or 200 GB NVMe | 800 Mbit/s | €20.00 |

- **Regular price**: €5.50 / €7.50 / €14.00 / €25.00 for VPS 4 / 6 / 8 / 12, which applies after the first 24 months.
- **Need steadier CPU**: look at **Cloud VPS Plus** (AMD EPYC, all NVMe), from €10.80 for Plus 4.
- **Currency and tax**: the displayed price includes VAT. Accounts in many Asian countries default to US dollars with no VAT added; check the total at checkout.
- **Traffic**: the VPS overview lists **Unlimited Traffic\*** under a fair-use policy. The Japan location used to list 10 TB of outbound traffic per month and the page no longer states a figure, so ask support before running a bandwidth-heavy service.

## Vultr vs Contabo: which one?

![Vultr Tokyo VPS pricing page](vultr.webp)

| | Contabo | Vultr |
| --- | --- | --- |
| What about US$5 buys | 4 vCPU / 8 GB | 1 vCPU / 1 GB |
| Asian locations | Tokyo, Singapore | Tokyo, Osaka, Seoul, Singapore, and more |
| Billing | Monthly, cheapest on long terms | Hourly, destroy any time |
| Traffic | Listed as unlimited | 1 TB on the 1 GB plan |
| Best for | Always-on, memory-heavy services | Short tests, multi-region deploys, consistency |

Vultr's cheapest Tokyo plan is **US$5** (1 vCPU, 1 GB, 25 GB SSD, 1 TB). The US$2.50 and US$3.50 plans are only offered in a few US locations and do not show up for Tokyo. When I wrote this in 2024, I measured about **40 ms** from Taiwan to Vultr Japan, the lowest of the providers here.

## ConoHa VPS: prices and features

![ConoHa VPS plan and pricing page](conoha.png)

ConoHa is a Japanese host run by GMO, with data centers in Tokyo and a mostly Japanese interface. You can pay **by the hour** (with a monthly cap) or prepay for a discount. In 2024 I measured about **50 ms** from Taiwan.

On July 1, 2026 ConoHa dropped its 10% service maintenance fee and revised prices. Hourly rates and monthly caps after the change (tax included):

| Plan | Hourly | Monthly cap |
| --- | --- | --- |
| **512 MB** | ¥1.3 | ¥751 |
| **1 GB** | ¥1.9 | ¥1,065 |
| **2 GB** | ¥3.7 | ¥2,033 |
| **4 GB** | ¥6.6 | ¥3,608 |

The 36-month prepaid plan gives the biggest discount. Default bandwidth is 100 Mbps, and 500 Mbps or 1 Gbps upgrades became available in October 2026. Full prices are on [ConoHa VPS pricing](https://www.conoha.jp/vps/pricing/).

## Does OVH have a data center in Japan?

![OVHcloud VPS pricing page](ovhcloud.webp)

**No.** OVHcloud VPS in Asia-Pacific is available in Singapore, Sydney, and Mumbai. Singapore was about **50 ms** from Taiwan in my 2024 test.

The old Starter and VLE plans have been replaced by a new VPS range. Starting prices from the official page:

| Plan | vCore | RAM | NVMe | From | APAC monthly traffic |
| --- | --- | --- | --- | --- | --- |
| **VPS-1** | 2 | 4 GB | 40 GB | US$4.54 | 500 GB |
| **VPS-2** | 4 | 8 GB | 75 GB | US$8.50 | 1 TB |
| **VPS-3** | 6 | 12 GB | 100 GB | US$12.32 | 1 TB |
| **VPS-4** | 8 | 24 GB | 200 GB | US$23.37 | 3 TB |

Traffic is unlimited in Europe and North America, but the [OVHcloud VPS page](https://www.ovhcloud.com/en/vps/) states that **APAC plans have a monthly quota, after which bandwidth drops to 10 Mbps**. Starting prices may differ by location; check the configurator. Daily backups and anti-DDoS are included.

## DigitalOcean

![DigitalOcean Droplet pricing page](digitalocean.png)

DigitalOcean's Asian regions are Singapore and Bangalore, and I like its dashboard and built-in browser SSH. Since January 1, 2026, Droplets are **billed per second** with a monthly cap. Basic plans: 512 MB **US$4**, 1 GB **US$6**, 2 GB **US$12**, 4 GB (2 vCPU) **US$24**. Pricing is in line with Vultr, with similarly small specs.

## How to test latency from your location

The latency numbers above are my 2024 measurements, not current ones. Before moving a production service, test ping, packet loss, and routes (**mtr** or **traceroute**) at different times of day from the network your users are actually on. Vultr and DigitalOcean let you create a server by the hour and delete it after testing; with Contabo and OVH, start with a monthly term.

For game servers such as Minecraft, check single-core performance and peak latency, not just RAM.

## Further reading

- [Cloudflare Free Stack](/en/2026/10/19/cloudflare-free-stack-atlas/): expose services on your VPS safely with Tunnel and store backups in R2. You still pay for the server, but you save on everything around it.
- [Why localhost cannot be shared](/en/2026/09/06/why-localhost-cannot-be-shared-web-deployment-101/): not sure you need a VPS yet? Start with what a site needs to go live.

Prices and plans are subject to each provider's official website.
