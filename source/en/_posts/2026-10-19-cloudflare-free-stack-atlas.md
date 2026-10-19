---
title: "Cloudflare Free Stack: Free Tiers, Limits, and Starter Stacks for 41 Services"
date: 2026-10-19 14:00:00
updated: 2026-10-19 14:00:00
description: "I built Cloudflare Free Stack, a guide for indie developers covering 41 Cloudflare services, including Workers, Pages, R2, D1, Workers AI, and Tunnel. It lists free allowances, billing units, and limits, plus five starter stacks for Vue, Capacitor, Node / Coolify, multiplayer games, and AI knowledge bases."
permalink: 2026/10/19/cloudflare-free-stack-atlas/
translation_key: cloudflare-free-stack-atlas
translations:
  zh-TW: /2026/10/19/cloudflare-free-stack-atlas/
  zh-CN: /zh-cn/2026/10/19/cloudflare-free-stack-atlas/
categories:
- Indie Development
tags:
- Cloudflare
- Indie Developer
- Serverless
- Free Resources
---

![Cloudflare Free Stack cover: a glowing orange cloud floating above layered dark platforms, representing cloud services you can combine](cover.jpg)

Cloudflare's free plan is generous, but the word "free" hides units that are easy to misread. The 10,000 Neurons in Workers AI are not 10,000 requests. The 5M in Vectorize counts vector dimensions, not vectors. D1's 5 GB is the total for your whole account. These details are spread across dozens of official pages, and I kept looking them up again for every new project.

So I built **[Cloudflare Free Stack](https://cloudflare-free-stack-atlas.opal-pearl-8326.chatgpt.site/)**, a guide to Cloudflare's free services for indie developers. It covers 41 services and features. Each entry lists the free allowance, the limits, where billing starts, and links to the official sources. The site also includes five starter stacks, from a simple frontend to an AI knowledge base. This post walks through the site and pulls out the numbers most worth remembering.

The site itself is written in Traditional Chinese, so the screenshots below show Chinese labels. The figures and service names match what I describe here.

> **Visit the site: [Cloudflare Free Stack](https://cloudflare-free-stack-atlas.opal-pearl-8326.chatgpt.site/)**
> Free to use with no sign-up, on desktop or mobile. You can also jump straight to the [starter stacks](https://cloudflare-free-stack-atlas.opal-pearl-8326.chatgpt.site/#stacks) or the [notes on billing units](https://cloudflare-free-stack-atlas.opal-pearl-8326.chatgpt.site/#notes).

<!--more-->

## What the guide covers

The guide lists **41 services and features**. Thirty-seven include a free feature or free allowance. The other four are paid services, included for comparison. All figures were checked on **2026-10-19**, and every card links back to Cloudflare's documentation.

| Category | Count | Examples |
| --- | --- | --- |
| Build and deploy | 15 | Workers, Pages, R2, D1, KV, Durable Objects, Queues |
| AI and search | 5 | Workers AI, Vectorize, AI Gateway, AI Search, Browser Run |
| Security and network | 13 | DNS, CDN, Universal SSL, DDoS Protection, Tunnel, Access |
| Other tools | 8 | Email Routing, Web Analytics, Images, Stream |

It is not a full Cloudflare product catalog. I picked the services indie developers are most likely to use and focused on two questions: can you use it for free, and where does it stop?

## Search, filter, and save

![Service guide home page with a search bar, category tabs, pricing filters, and cards for Workers, Pages, R2, and other services](atlas.jpg)

The service guide on the home page offers a few handy controls:

- **Search** by service name, use case, allowance, or keyword, such as **Vue**, **WebSocket**, or **R2**. On the home page, press **/** or **Cmd + K** to jump straight to the search box.
- **Filter** by category (build and deploy, AI and search, security and network, or other tools), then narrow the results by pricing label.
- **Popular** shows only the most-used services: Workers, Pages, R2, D1, Workers AI, and Turnstile.
- **Save** a service with the bookmark icon on its card, then switch to saved view to see your picks together.
- **Share** your exact view. Search and filter settings are written into the URL, for example **?category=ai**, so you can send a link to someone else.

The large number on each card is the service's key allowance, and the line below it shows the next most important limit. That makes it quick to compare services at a glance.

## Three pricing labels

The guide sorts every service into one of three pricing labels. I think this is the most useful part of the design.

| Label | Meaning | Count |
| --- | --- | --- |
| Truly $0 | Usage of the basic feature is not billed. Feature limits and fair-use rules still apply. | 14 |
| Free allowance | Daily, monthly, or storage caps apply. Hitting a cap may stop the service, and some products bill for overages. | 23 |
| Paid plan required | You need a paid subscription first. Included usage does not mean zero cost. | 4 |

Most truly $0 services are in the security and network group. DNS, CDN, Universal SSL, DDoS Protection, Tunnel, and Turnstile are not billed by usage. Almost every build and AI service falls under free allowance, so heavier use will eventually hit a cap.

## Core allowances for indie developers

These are the services marked as popular in the guide, plus the numbers I think you should know before starting a project:

| Service | Use | Free allowance | Watch out for |
| --- | --- | --- | --- |
| Workers | Edge APIs | 100,000 requests / day, 10 ms CPU per invocation | Daily requests are shared with Pages Functions |
| Pages | Static site hosting | Unlimited static requests, 500 builds / month | Functions count against Workers quotas |
| R2 | Object storage | 10 GB-month, US$0 egress | Requires billing setup; overages are billed |
| D1 | SQLite database | 5M rows read / day, 100K rows written / day | 5 GB per account, 500 MB per database |
| Workers KV | Config and cache | 100K reads / day, 1K writes / day | Eventually consistent; not for balances or game state |
| Durable Objects | Multiplayer rooms, WebSockets | 100,000 requests / day | Free plan supports only the SQLite backend |
| Workers AI | Model inference | 10,000 Neurons / day | Neurons are neither tokens nor requests |
| Turnstile | Bot checks for forms | Unlimited verifications | Tokens must be verified on your server |

You can treat the security and network services as reliable infrastructure. DNS queries are unlimited, basic CDN and Universal SSL are free, and standard DDoS protection is not billed by attack size. Each account includes 1,000 Cloudflare Tunnels, and Zero Trust Free gives you 50 users shared between Access and Gateway.

## The numbers people misread most

While building the guide, I found that most mistakes come from the units, not the size of the allowance. The notes section on the site calls out four of them:

- **Workers AI**: Neurons are not requests. The same call can use very different amounts depending on the model and the input and output length.
- **Vectorize**: 5M counts stored vector dimensions. 1,000 vectors with 768 dimensions use 768,000 dimensions, so the free allowance holds roughly 6,500 such vectors.
- **Queues**: 10,000 counts operations, not messages. Delivering one small message normally takes three operations: write, read, and delete. Retries add more.
- **D1**: 5 GB is the total across all databases in your account, and a single database is capped at 500 MB. Read quotas count rows scanned, so queries without an index can use them up quickly.

A few other numbers are easy to get wrong. Pages' 500 is **builds**, not page views. Cron Triggers' 5 is the number of **triggers**, not five runs a day. DNS's 200 is the **record limit** for a new Free zone, not a query limit.

## Four services that look free but are not

The guide includes four paid services on purpose, because they are easy to confuse with free features:

| Service | Starting price | Free feature it gets confused with |
| --- | --- | --- |
| Email Sending | From Workers Paid at US$5 / month, includes 3,000 emails | Email Routing only forwards inbound mail for free; it cannot send to any recipient |
| Images Storage | US$5 per 100,000 images / month | Images Transformations' 5,000 free transformations a month do not include hosted storage |
| Stream | US$5 per 1,000 minutes stored / month | Uploads and encoding are free, but storage and viewing minutes are billed |
| Containers | From Workers Paid at US$5 / month | Free Workers are not a Docker host or a free VPS |

If your project needs transactional email, hosts many images, or plays video, budget for these from the start.

## Five starter stacks

![Starter stacks section showing the Vue / Vite flow from Vue + Vite to Pages, Workers, and D1, with setup steps and a caution note](stacks.jpg)

A single service only goes so far. You need to combine several to ship something. The starter stacks section covers five common scenarios. Each one has an architecture diagram, three steps, a cost note, and a caution.

| Stack | Flow | Good for | Cost |
| --- | --- | --- | --- |
| Vue / Vite | Vue → Pages → Workers → D1 | Portfolios, content sites, membership MVPs | Can start at $0 within allowances |
| Capacitor | Capacitor → Workers → D1 → R2 | One backend for a website and mobile app | $0 within Cloudflare allowances; developer accounts are extra |
| Node / Coolify | Users → Tunnel → your own VPS → R2 | Self-hosted apps with an existing server and database | Cloudflare can be free; hosting is extra |
| Personal game platform | Pages → Durable Objects → D1 → R2 | Multiplayer rooms and leaderboards | $0 at small scale within allowances |
| AI knowledge base | Docs → Workers AI → Vectorize → AI Gateway | RAG, semantic search, document Q&A | Depends on models, index size, and query volume |

The cautions describe problems you are likely to hit:

- **Vue / Vite**: Pages makes only purely static requests unlimited. Functions, APIs, and databases each have their own daily allowances.
- **Capacitor**: Never ship R2 credentials or third-party API secrets inside the app. Uploads should be authorized by your backend.
- **Node / Coolify**: Tunnel only provides the connection. It does not run Node for you, and your VPS, database, and backup costs do not go away.
- **Personal game platform**: KV is a poor fit for frequently updated game state that must stay consistent. Never trust balances, rewards, or rankings reported by the client alone.
- **AI knowledge base**: AI Search billing starts on 2026-11-01, and external LLM costs are not free either.

## A full page for every service

![Workers service page with an explanation of the numbers, a free allowance table, billing notes, and usage limits](service-page.jpg)

Each card opens a dedicated page for that service, such as the [Workers page](https://cloudflare-free-stack-atlas.opal-pearl-8326.chatgpt.site/services/workers/). Every page has the same four sections:

1. **Understand the numbers**: a short explanation of how the allowance is measured, followed by the quota table, billing notes, and limits.
2. **Get started**: what to prepare, four setup steps, and sometimes a code sample, such as a minimal JSON API for Workers, a leaderboard table for D1, or a UTC schedule for Cron. It ends with a way to check that the setup works.
3. **Better together**: three suggested services to pair with it, and what each one handles.
4. **Official references**: links to the official setup guide and pricing pages.

Every page has its own URL, so you can share it with teammates. The sidebar can copy the link or save the service in one click.

## Two announced changes

![Notes section explaining the three pricing labels, with a timeline for AI Search billing on 2026-11-01 and the new Workers Logs pricing on 2026-12-01](notes.jpg)

The guide also flags changes that have been announced but have not taken effect yet:

- **2026-11-01, AI Search billing starts**: each month includes 5M ingestion tokens, 10 GB-month of storage, and 1,000 queries each for semantic and full-text search. Generation and external model costs are still separate.
- **2026-12-01, Workers Logs moves to Observability pricing**: today you get 200,000 log events a day with 3 days of retention. The announced Free allowance is 0.5 GB of ingestion a day with 7 days of retention.

Services with an announced change show a notice on their card, so today's free usage is not mistaken for a permanent price.

## How I plan a new project with it

When I start something new, I use the guide in roughly this order:

1. Find the closest scenario in **starter stacks** to decide which pieces the architecture needs.
2. Open each service page and read **understand the numbers** to make sure the billing unit matches how I will use it.
3. Filter by **paid plan required** to check that I am not relying on a paid feature by accident.
4. **Save** the services I plan to use so I can check their allowances later without searching again.
5. Before launch, work through each page's verification step, then check the official sources for the latest plans.

One last reminder: the figures are a snapshot taken on 2026-10-19, and prices are in US dollars. Cloudflare changes its plans, so check the official pages and your own account limits before you rely on anything. This is my own independent project, not an official Cloudflare resource.

The tools are ready. Now it's your idea's turn: [Cloudflare Free Stack](https://cloudflare-free-stack-atlas.opal-pearl-8326.chatgpt.site/).
