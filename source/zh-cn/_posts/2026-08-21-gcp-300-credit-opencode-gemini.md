---
title: "GCP 300 美元免费额度实战：OpenCode 接入 Gemini 3.8 Flash 教程"
date: 2026-08-21 10:45:00
updated: 2026-10-19 16:00:00
description: "GCP（谷歌云）新用户 300 美元试用赠金可以抵扣 Agent Platform（原 Vertex AI）上的 Gemini 调用费用。本文教你创建 API Key 并接入 OpenCode，算清 300 美元能跑多少 Token，以及 90 天到期或赠金用完后会发生什么。"
permalink: 2026/08/21/gcp-300-credit-opencode-gemini/
translation_key: gcp-300-credit-opencode-gemini
translations:
  zh-TW: /2026/08/21/用-GCP-300-美金免費額度，在-OpenCode-爽用-Gemini-最新模型/
  en: /en/2026/08/21/gcp-300-credit-opencode-gemini/
categories:
- AI 工具
tags:
- AI
- 独立开发者
- 开发工具
---

![](cover.jpg)

**GCP 300 美元免费额度可以直接拿来在 OpenCode 里写代码。** Google Cloud 新用户的 300 美元试用赠金（有效期 90 天）可以抵扣 **Agent Platform（原 Vertex AI）** 上的 Gemini 调用费用：在 **Agent Studio** 创建一个 API Key，填进 OpenCode 的 Vertex 配置，就能调用 **Gemini 3.8 Flash** 等模型，试用期内不会自动扣费。有两个例外：**AI Studio 的 Gemini API** 和 **Claude 等合作伙伴模型**都不能用这笔赠金抵扣。

本文只讲 OpenCode 接入和用量管控，信息核对时间为 2026 年 10 月 19 日。试用资格、绑卡验证和完整限制，请看 [Google Cloud 300 美元免费试用完整教程](/zh-cn/2026/10/19/google-cloud-300-free-trial-guide/)。文中截图来自繁体中文控制台。

<!--more-->

## 300 美元赠金能抵扣哪些 AI 费用

| 用途 | 能否用赠金抵扣 | 依据 |
|------|----------------|------|
| Agent Platform 上的 Gemini 模型（OpenCode 走的就是这条链路） | 可以 | 官方未排除；笔者账单实测 Vertex AI 费用全部由赠金冲抵 |
| AI Studio 的 Gemini API | 不行 | [官方：试用赠金不能支付 AI Studio 的 Gemini API 费用](https://docs.cloud.google.com/free/docs/free-cloud-features) |
| Claude 等以托管 API 形式提供的合作伙伴模型 | 不行，试用期也不能使用 Marketplace | 同上 |
| 申请提升配额 | 试用期不能申请 | 同上 |
| Google AI Pro 每月 10 美元 | 独立发放的赠金，可叠加使用 | [Google 官方博客](https://blog.google/innovation-and-ai/technology/developers-tools/gdp-premium-ai-pro-ultra/) |

因此在 OpenCode 里只选 **Gemini** 系列模型；想用 Claude 需要额外付费，并且要先升级为付费账号。

## 300 美元能跑多少 Token

以下为 [Agent Platform 官方定价](https://cloud.google.com/vertex-ai/generative-ai/pricing)（global 端点，每百万 Token）：

| 模型 | 输入 / 输出 | 缓存输入 | 300 美元大约可换 |
|------|-------------|----------|------------------|
| Gemini 3.8 / 3.7 Flash（优惠价，截至 2026/12/31） | $0.75 / $3.75 | $0.075 | 4 亿输入或 8,000 万输出 |
| Gemini 3.8 / 3.7 Flash（2027/1/1 起标准价） | $1.50 / $7.50 | $0.15 | 2 亿输入或 4,000 万输出 |
| Gemini 4 Argon（优惠价，截至 2026/11/30） | $2 / $10 | $0.10 | 1.5 亿输入或 3,000 万输出 |

- 官方注明 Flash 的优惠价是通过“**按净支出返还 50% 赠金**”实现的，并未说明试用赠金产生的支出是否适用，**做预算时请按标准价估算**。
- Coding Agent 每一轮都会重新发送大段上下文，输入 Token 远多于输出；**缓存命中的输入只要原价的十分之一**，所以实际能用的量通常比只按输入价计算的更多。

## 第一步：确认赠金已到账

1. 按 [试用教程](/zh-cn/2026/10/19/google-cloud-300-free-trial-guide/) 开通 Free Trial，并新建一个专用项目（例如 **ai-coding-sandbox**）。
2. **可选**：如果订阅了 **Google AI Pro**，可以到 [Google Developer Program 权益页](https://me.developers.google.com/benefits) 每月领取 10 美元的 Gen AI 与 Cloud 赠金：

![在 Google Developer Program 权益页领取每月 10 美元 Gen AI 赠金](google-developer-benefits.jpg)

3. 打开 **Billing → Credits**，确认 **Free Trial** 300 美元和月度赠金都已到账：

![GCP 结算页面显示 300 美元 Free Trial 赠金与每月 10 美元开发者权益已到账](gcp-billing-credits.jpg)

## 第二步：启用 Agent Platform API 并创建 API Key

Vertex AI 已更名为 **Gemini Enterprise Agent Platform**，控制台中简称 **Agent Platform**，对应的 API 也改名为 **Agent Platform API**。

1. 在控制台搜索并启用 **Agent Platform API**。
2. 打开 [Agent Studio 的 API 密钥页](https://console.cloud.google.com/agent-platform/studio/settings/api-keys)，创建一个 API Key。
3. 建议给密钥加上 **API 限制**，只允许调用 Agent Platform API；官方提醒，任何拿到密钥的人都能消耗你的配额。[官方 API Key 文档](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/start/api-keys)

使用 API Key 无需安装 gcloud CLI，也不用配置服务账号（Service Account）。另外，官方还有一个免绑卡的 **express mode** 免费层（仅限 @gmail.com 账号、90 天、配额更低），它和 300 美元试用赠金是**两套独立的方案**，不要混淆。[express mode 文档](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/start/express-mode/overview)

## 第三步：在 OpenCode 中连接 Vertex 并选择模型

1. 在 OpenCode 中输入 **/connect**，选择 **Vertex**，粘贴 API Key。也可以改用环境变量：

```bash
export GOOGLE_VERTEX_API_KEY="你的 API Key"
```

2. 输入 **/models**，切换到 **Gemini 3.8 Flash**。

下图是 8 月实测 Gemini 3.7 Flash 时的界面，可以看到 1,048,576 Token（1M）上下文窗口：

![OpenCode 成功加载 Vertex AI 的 Gemini 3.7 Flash 模型与 1M 上下文](opencode-vertex-gemini.jpg)

模型选型建议：

| 模型 | 适用场景 | 说明 |
|------|----------|------|
| **Gemini 3.8 Flash** | 日常主力 | 1M 上下文，最多 65,536 输出 Token；思考等级只支持 LOW / MEDIUM / HIGH。[官方规格](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-8-flash)；新特性见 [Gemini 3.8 Flash 解读](/zh-cn/2026/09/03/gemini-3-8-flash-unleashed-long-horizon-agentic-loops-deepswe/) |
| **Gemini 3.7 Flash** | 节省 Token | 价格相同，官方建议在更看重计算效率时改用 3.7 |
| **Gemini 4 Argon** | 高难度长任务 | 单价约为 Flash 的 2.7 倍，12 月 1 日起再翻倍；详见 [Gemini 4 Argon 价格与开放范围](/zh-cn/2026/10/01/gemini-4-argon-launch-pricing-access/) |

如果连接时报认证错误，先检查环境里是否同时设置了 **GOOGLE_CLOUD_PROJECT**、**VERTEX_LOCATION** 等项目或区域配置。OpenCode 在显式指定项目或区域时，可能改用 ADC（gcloud 登录凭据）认证，而不是 API Key。

## 监控用量，防止超支

**Token 用量**：在 [Agent Studio 用量面板](https://console.cloud.google.com/agent-platform/studio/settings/usage-dashboard) 查看每日输入与输出 Token：

![Google Cloud 用量面板实时查看 Gemini 3.7 Flash 每日输入与输出 Token](gcp-usage-dashboard.jpg)

**抵扣明细**：在 **Billing → Reports** 确认 Vertex AI（Agent Platform）的费用都已被赠金冲抵、实付为 0：

![GCP 结算报表显示 Vertex AI 费用被赠金全额抵扣，实付金额为 0](gcp-billing-reports.jpg)

升级为付费账号后，记得在 **Billing → Budgets & alerts** 设置预算。普通预算只会发告警，[不会自动停止调用](https://docs.cloud.google.com/billing/docs/how-to/budgets)；需要硬性上限的话，改用 **spend cap** 预算：它支持 Agent Platform，项目花费超过预算后会自动暂停新请求，直到下一个预算周期。[官方 spend cap 文档](https://docs.cloud.google.com/billing/docs/how-to/budgets-spend-caps)

## 90 天到期或赠金用完会怎样

依据 [官方 Free Trial 说明](https://docs.cloud.google.com/free/docs/free-cloud-features)：

| 情况 | 结果 |
|------|------|
| 试用期间 | 不会自动扣费 |
| 300 美元用完，或满 90 天（以先到者为准） | 结算账号被停用、资源停止运行，OpenCode 的 API 调用也会随之失败；进入 30 天宽限期 |
| 宽限期内未升级 | 试用期间创建的资源会被永久删除 |
| 在期限内升级为付费账号 | 剩余赠金保留到原定 90 天到期；超出部分开始按量计费 |

试用结束后如果不想按量付费，可以参考 [AI 编程工具订阅方案对比](/zh-cn/2026/09/14/ai-coding-tools-subscription-comparison/)，换成固定月费方案。
