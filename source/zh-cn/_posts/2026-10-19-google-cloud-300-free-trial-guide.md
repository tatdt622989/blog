---
title: "Google Cloud 300 美元免费额度：申请条件、90 天期限、可用范围与防扣费"
date: 2026-10-19 16:45:00
updated: 2026-10-19 16:45:00
description: "Google Cloud 新用户可领取 US$300 免费试用金，有效期 90 天，不升级就不会扣费。本文梳理申请条件、哪些服务不能抵扣、Gemini 能否使用、到期后的处理、剩余额度查询与预算设置。"
permalink: 2026/10/19/google-cloud-300-free-trial-guide/
translation_key: google-cloud-300-free-trial-guide
translations:
  zh-TW: /2026/10/19/google-cloud-300-free-trial-guide/
  en: /en/2026/10/19/google-cloud-300-free-trial-guide/
categories:
- 独立开发
tags:
- Google Cloud
- GCP
- 免费资源
- 独立开发者
---

![Google Cloud 300 美元免费额度封面：深色背景上的信用卡和云朵几何图形，搭配蓝绿黄红点缀色](cover.jpg)

Google Cloud 给**从未付费过的新用户**发放 US$300 的 Welcome credit（免费试用金），**自注册起 90 天内有效**。试用期内不计费；额度用完或满 90 天后资源会被停掉，**只要你没有手动升级为付费账号，就不会自动扣费**。需要注意：**AI Studio 的 Gemini API 不能用这笔钱抵扣**，但在 Google Cloud 上通过 Gemini Enterprise Agent Platform（原 Vertex AI）调用 Gemini 可以。

以下内容以 Google Cloud 官方文档为准，核对日期 2026-10-19。

<!--more-->

## 核心信息速览

| 项目 | 内容 |
| --- | --- |
| 金额 | US$300 Welcome credit |
| 有效期 | 自注册起 90 天，**不能暂停或延期** |
| 试用期内费用 | 不计费 |
| 结束条件 | 额度用完、满 90 天、主动升级，三者以先到者为准 |
| 结束后 | 资源停止，进入 30 天宽限期，之后永久删除 |
| 自动扣费 | 不会；只有升级为付费账号后，超出额度的用量才会扣费 |

出处：[Google Cloud Free Program 官方文档](https://docs.cloud.google.com/free/docs/free-cloud-features)、[Free Trial 条款](https://cloud.google.com/terms/free-trial)。

## 申请条件

官方只列了两条，必须同时满足（[出处](https://docs.cloud.google.com/free/docs/free-cloud-features#free-trial)）：

- 从未成为 Google Cloud、Google Maps Platform 或 Firebase 的付费用户
- 之前没有申请过 Free Trial

另外，[条款第 1.2 条](https://cloud.google.com/terms/free-trial)把美国和墨西哥的政府机构排除在外。

注册时需要留意：

- **必须绑定信用卡或其他有效支付方式**，部分国家和地区还要验证银行账户，用途是核实身份、防范欺诈。
- 注册后会出现一笔 **US$0～1 的预授权冻结**，不是实际扣款，一般几天到一个月内解冻。
- 支付方式和结算币种因国家或地区而异，可查官方的[币种与支付方式列表](https://docs.cloud.google.com/billing/docs/resources/currency)。
- [不支持的支付方式](https://docs.cloud.google.com/billing/docs/how-to/payment-methods)：**预付卡**、**需要双重验证的借记卡**。

申请入口：[console.cloud.google.com/freetrial](https://console.cloud.google.com/freetrial)。开通后系统会自动创建一个名为 **My First Project** 的项目，以及一个名为 **My Billing Account** 的试用结算账号。

## 300 美元能抵扣什么、不能抵扣什么

| 用途 | 能否用试用金 | 依据 |
| --- | --- | --- |
| Compute Engine、Cloud Run、BigQuery、Cloud Storage 等大部分 Google Cloud 产品 | 可以，也能抵扣超出 Always Free 的部分 | [Free Program](https://docs.cloud.google.com/free/docs/free-cloud-features#free-trial) |
| Gemini Enterprise Agent Platform（原 Vertex AI）上的 Gemini 模型 | 可以 | [Gemini 平台产品页 FAQ](https://cloud.google.com/vertex-ai) |
| **AI Studio 的 Gemini API** | **不行** | [Gemini API 计费 FAQ](https://ai.google.dev/gemini-api/docs/billing) |
| 以托管 API（model as a service）形式提供的第三方生成式 AI 模型 | 不行 | [Free Program](https://docs.cloud.google.com/free/docs/free-cloud-features#during-free-trial) |
| 挖矿 | 禁止 | [条款第 3.2 条](https://cloud.google.com/terms/free-trial) |

试用结算账号在**升级之前**还有以下限制：

- 不能给虚拟机挂 GPU
- 不能使用 Google Cloud Marketplace
- 不能申请提升配额
- 不能创建 Windows Server 虚拟机
- 不能创建 Google Cloud VMware Engine 资源
- Compute Engine 同时最多使用 **8 个核**（[条款第 3.1 条](https://cloud.google.com/terms/free-trial)）

### 调用 Gemini 要选对入口

同样是 Gemini，怎么计费取决于密钥从哪里来：

- **在 AI Studio 创建的 Gemini API 密钥**：走 Gemini API 计费。官方原话是 Welcome credit 或免费试用金「不能用于 Gemini API 或 AI Studio」，这条路只能用 Gemini API 免费层或预付费方案。
- **在 Google Cloud 控制台启用 Agent Platform API（服务名 aiplatform.googleapis.com）**：用量记在 Google Cloud 账单上，可以用 300 美元抵扣。

具体配置步骤见：[用 GCP 300 美元免费额度，在 OpenCode 里畅用最新 Gemini 模型](/zh-cn/2026/08/21/gcp-300-credit-opencode-gemini/)。

## 满 90 天或额度用完会怎样

如果没有升级，试用结算账号会自动关闭，随后依次发生（[出处](https://docs.cloud.google.com/free/docs/free-cloud-features#free-trial-ends)）：

1. 项目停用结算，试用期间创建的所有资源被**停止**，Compute Engine 等服务里的数据被标记为待删除。
2. 无法再访问 Google Cloud 产品，可能会收到「结算账号已取消或已暂停」的通知。
3. 进入 **30 天宽限期**：在此期间升级为付费账号，**有可能**恢复被停止的资源和数据。
4. 宽限期结束仍未升级，试用期间的资源会被**永久删除**。

**整个过程不会从你的卡上扣钱。**如果数据重要，记得在到期前自行备份或升级。

## 升级为付费账号后有什么变化

| | 试用结算账号 | 付费结算账号 |
| --- | --- | --- |
| 计费 | 不计费 | 超出剩余试用金、超出 Always Free 额度，或使用不在试用范围内的产品，都会从支付方式扣费 |
| 剩余试用金 | 可用 | **保留**，但仍按原注册日起 90 天过期 |
| GPU、Marketplace、第三方模型 | 不可用 | 解锁 |
| 到期时的资源 | 停止 | 继续运行，不中断 |

升级步骤（需要是该结算账号的 **Billing Account Administrator**）：

1. 打开控制台的 [**Welcome** 页面](https://console.cloud.google.com/welcome)
2. 点击工具栏上的 **Activate**
3. 在确认对话框中再点一次 **Activate**

结算概览页的 **Free credit** 面板里也有同一个 **Activate** 按钮。**建议先配好下文的预算再升级**，因为升级之后才真正存在扣费风险。

## Always Free 和 300 美元试用金的区别

| | 300 美元试用金 | Always Free（Free Tier） |
| --- | --- | --- |
| 性质 | 一次性额度 | 每月固定的用量上限 |
| 有效期 | 注册后 90 天 | 长期有效（Google 可提前 30 天通知调整） |
| 适用对象 | 新用户 | 任何有效的结算账号，试用或付费均可 |
| 没用完的部分 | 到期作废 | 不结转到下个月 |

常用的 Always Free 额度（[完整列表](https://docs.cloud.google.com/free/docs/free-cloud-features#free-tier-usage-limits)）：

| 产品 | 每月免费额度 |
| --- | --- |
| Compute Engine | 1 台 **e2-micro**（仅限 us-west1、us-central1、us-east1）、30 GB-月标准永久性磁盘、北美出站流量 1 GB |
| Cloud Storage | 5 GB-月（仅限 us-east1、us-west1、us-central1）、5,000 次 A 类操作、50,000 次 B 类操作 |
| BigQuery | 查询 1 TiB、存储 10 GiB |
| Cloud Run | 200 万次请求、360,000 GB-秒内存、180,000 vCPU-秒 |
| Firestore | 每个项目 1 GiB 存储；每天 50,000 次读、20,000 次写、20,000 次删除 |

GPU 和 TPU 不在 Always Free 范围内，始终收费。

Always Free 需要一个有效的结算账号。试用到期后不升级，结算账号会被关闭，Always Free 也就用不了了；想长期使用只能升级。如果只是想免费部署网站或 API，也可以看看 [Cloudflare 免费服务图鉴](/zh-cn/2026/10/19/cloudflare-free-stack-atlas/)。

## 如何查看剩余额度

1. 在控制台点击左上角**导航菜单 → Billing → Overview**（或直接打开 [console.cloud.google.com/billing/overview](https://console.cloud.google.com/billing/overview)）
2. 如果有多个结算账号，选择试用的那个
3. 账号类型显示 **Free trial account** 表示不会计费；**Free credit** 面板会显示**剩余金额和剩余天数**

想知道钱花在了哪些服务上，打开 **Billing → Reports**：试用金抵扣的金额列在 **Other savings** 列，**Usage cost** 列是按标准价格计算的用量费用（[出处](https://docs.cloud.google.com/free/docs/free-cloud-features#monitor-optimize-costs)）。

## 如何避免意外扣费

**试用期内不升级，最坏的结果是资源被停，不会扣钱。**真正的风险在升级之后，下面这些建议在升级前就配置好。

### 设置预算告警

路径：**Billing → Budgets & alerts → Create new budget**（[官方步骤](https://docs.cloud.google.com/billing/docs/how-to/budgets)）。设置预算金额和告警阈值（比如 50%、90%、100%），超出时会发邮件提醒。

注意：普通预算**只发告警，不会自动停服**，费用照常产生。

### 用 spend cap 防止 API 费用失控

[Spend cap 预算](https://docs.cloud.google.com/billing/docs/how-to/budgets-spend-caps)会在超出金额后自动暂停服务，但限制不少：

| 项目 | 说明 |
| --- | --- |
| 支持的服务 | 只有 Gemini API、Gemini Enterprise Agent Platform（原 Vertex AI）、Cloud Run、Cloud Run functions |
| 作用范围 | 每个预算只能绑定**一个项目里的一个服务**，周期固定为按月 |
| 计算口径 | 按**未扣除任何折扣和试用金的预估原价**计算，所以试用金还有余额时也可能先触发暂停 |
| 管不到的部分 | 虚拟机、存储这类持续占用的资源照常计费 |
| 时效 | 不是实时生效，触发前已经超出的部分照常收费 |

像把 Gemini 接入编程工具这种调用量可能很大的场景，最适合用 spend cap 兜底。

### 用完及时释放资源

官方建议的止损方式（[出处](https://docs.cloud.google.com/free/docs/free-cloud-features#stopping-charges)）：

- 把用量控制在 Always Free 范围内
- 关闭或删除不再使用的资源
- 对项目停用结算
- 直接关闭结算账号，停止所有计费服务
