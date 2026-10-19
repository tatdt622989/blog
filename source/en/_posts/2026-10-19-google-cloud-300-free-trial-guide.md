---
title: "Google Cloud $300 Free Credit: Eligibility, 90-Day Limit, Coverage, and Avoiding Charges"
date: 2026-10-19 16:45:00
updated: 2026-10-19 16:45:00
description: "New Google Cloud (GCP) customers get US$300 in free trial credit for 90 days, and you are not charged unless you upgrade. This guide covers eligibility, what the credit cannot pay for (Gemini API in AI Studio is excluded, Gemini on Agent Platform is covered), what happens at the end of the trial, upgrading, Always Free limits, where to check your remaining credit, and budgets."
permalink: 2026/10/19/google-cloud-300-free-trial-guide/
translation_key: google-cloud-300-free-trial-guide
translations:
  zh-TW: /2026/10/19/google-cloud-300-free-trial-guide/
  zh-CN: /zh-cn/2026/10/19/google-cloud-300-free-trial-guide/
categories:
- Indie Development
tags:
- Google Cloud
- GCP
- Free Resources
- Indie Developer
---

![Google Cloud $300 free credit cover: a credit card and cloud shapes on a dark background with blue, green, yellow, and red accents](cover.jpg)

Google Cloud gives **new customers who have never paid for it** US$300 in Welcome credit, **valid for 90 days from sign-up**. You are not billed during the trial. When the credit runs out or 90 days pass, your resources are stopped, and **you are not charged unless you manually upgrade to a paid account**. One catch: **the credit cannot pay for the Gemini API in AI Studio**, but calling Gemini through Gemini Enterprise Agent Platform (formerly Vertex AI) on Google Cloud is covered.

Everything below follows Google Cloud's official documentation as of 2026-10-19.

<!--more-->

## Key terms at a glance

| Item | Details |
| --- | --- |
| Amount | US$300 Welcome credit |
| Duration | 90 days from sign-up; **cannot be paused or extended** |
| Charges during the trial | None |
| Trial ends when | The credit runs out, 90 days pass, or you upgrade, whichever comes first |
| After it ends | Resources stop, a 30-day grace period starts, then resources are permanently deleted |
| Automatic charges | None; only usage beyond your credit after you upgrade is charged |

Sources: [Google Cloud Free Program](https://docs.cloud.google.com/free/docs/free-cloud-features), [Free Trial Terms](https://cloud.google.com/terms/free-trial).

## Who is eligible

Google lists two conditions, and you must meet both ([source](https://docs.cloud.google.com/free/docs/free-cloud-features#free-trial)):

- You have never been a paying user of Google Cloud, Google Maps Platform, or Firebase.
- You have not signed up for the Free Trial before.

[Section 1.2 of the terms](https://cloud.google.com/terms/free-trial) also excludes U.S. and Mexican government entities.

What to expect at sign-up:

- **You must add a credit card or another valid payment method.** In some countries you also need to verify your bank account. Google uses this to verify your identity and reduce fraud.
- A **temporary authorization hold of US$0 to US$1** appears. It is not a charge and is usually released within a few days to a month.
- Payment methods and billing currency vary by country. Check the [currency and payment methods table](https://docs.cloud.google.com/billing/docs/resources/currency). For example, Taiwan is billed in TWD and accepts credit or debit cards.
- [Not accepted](https://docs.cloud.google.com/billing/docs/how-to/payment-methods): **prepaid cards** and **debit cards that require two-factor authentication**.

Sign up at [console.cloud.google.com/freetrial](https://console.cloud.google.com/freetrial). Google creates a project named **My First Project** and a trial billing account named **My Billing Account**.

## What the $300 can and cannot pay for

| Usage | Covered by the credit? | Source |
| --- | --- | --- |
| Most Google Cloud products, such as Compute Engine, Cloud Run, BigQuery, and Cloud Storage | Yes, including usage beyond Always Free limits | [Free Program](https://docs.cloud.google.com/free/docs/free-cloud-features#free-trial) |
| Gemini models on Gemini Enterprise Agent Platform (formerly Vertex AI) | Yes | [Gemini platform product page FAQ](https://cloud.google.com/vertex-ai) |
| **Gemini API in AI Studio** | **No** | [Gemini API billing FAQ](https://ai.google.dev/gemini-api/docs/billing) |
| Third-party generative AI models offered as a managed API (model as a service) | No | [Free Program](https://docs.cloud.google.com/free/docs/free-cloud-features#during-free-trial) |
| Cryptocurrency mining | Prohibited | [Terms, section 3.2](https://cloud.google.com/terms/free-trial) |

Until you upgrade, a trial billing account also cannot:

- Add GPUs to VMs
- Use Google Cloud Marketplace
- Request quota increases
- Create Windows Server VMs
- Create Google Cloud VMware Engine resources
- Use more than **8 concurrent Compute Engine cores** ([Terms, section 3.1](https://cloud.google.com/terms/free-trial))

### Use the right Gemini entry point

Billing depends on where your key comes from:

- **A Gemini API key created in AI Studio** is billed through the Gemini API. Google states that "the Google Cloud Welcome credit or free trial credit can't be used towards the Gemini API or AI Studio." Use the Gemini API free tier or a Prepay plan there instead.
- **Enabling the Agent Platform API (service name aiplatform.googleapis.com) in the Google Cloud console** puts usage on your Google Cloud bill, where the $300 credit applies.

For a step-by-step setup, see [Use GCP's $300 free credit to run the latest Gemini models in OpenCode](/en/2026/08/21/gcp-300-credit-opencode-gemini/).

## What happens when the 90 days end or the credit runs out

If you have not upgraded, the trial billing account closes automatically, and the following happens ([source](https://docs.cloud.google.com/free/docs/free-cloud-features#free-trial-ends)):

1. Billing is disabled on your projects. All resources created during the trial are **stopped**, and data in services such as Compute Engine is marked for deletion.
2. You lose access to Google Cloud products, and you may get a message that your billing account was canceled or suspended.
3. A **30-day grace period** starts. If you upgrade during this period, you **might** recover your stopped resources and data.
4. If you still have not upgraded when the grace period ends, your trial resources are **permanently deleted**.

**Your card is not charged at any point in this process.** If you care about the data, back it up or upgrade before the trial ends.

## What changes when you upgrade to a paid account

| | Free Trial billing account | Paid billing account |
| --- | --- | --- |
| Charges | None | Your payment method is charged for usage beyond your remaining credit, beyond Always Free limits, or on products the trial does not cover |
| Remaining credit | Available | **Kept**, but still expires 90 days after the original sign-up |
| GPUs, Marketplace, third-party models | Unavailable | Unlocked |
| Resources at the end of the trial | Stopped | Keep running without interruption |

To upgrade, you must be a **Billing Account Administrator** on that account:

1. Open the [**Welcome** page](https://console.cloud.google.com/welcome) in the console.
2. Click **Activate** in the toolbar.
3. Click **Activate** again in the confirmation dialog.

The **Free credit** pane on the billing overview page has the same **Activate** button. **Set up the budgets described below before you upgrade.** Real charges only become possible after the upgrade.

## Always Free vs. the $300 trial credit

| | $300 trial credit | Always Free (Free Tier) |
| --- | --- | --- |
| Type | One-time credit | Fixed monthly usage limits |
| Duration | 90 days from sign-up | No end date (Google can change it with 30 days' notice) |
| Who gets it | New customers | Any active billing account, trial or paid |
| Unused amount | Expires | Does not roll over to the next month |

Common Always Free limits ([full list](https://docs.cloud.google.com/free/docs/free-cloud-features#free-tier-usage-limits)):

| Product | Free each month |
| --- | --- |
| Compute Engine | 1 **e2-micro** VM (us-west1, us-central1, or us-east1 only), 30 GB-months of standard persistent disk, 1 GB of outbound data from North America |
| Cloud Storage | 5 GB-months (us-east1, us-west1, us-central1 only), 5,000 Class A and 50,000 Class B operations |
| BigQuery | 1 TiB of queries, 10 GiB of storage |
| Cloud Run | 2 million requests, 360,000 GB-seconds of memory, 180,000 vCPU-seconds |
| Firestore | 1 GiB of storage per project; 50,000 reads, 20,000 writes, and 20,000 deletes per day |

GPUs and TPUs are never part of Always Free.

Always Free requires an active billing account. If your trial ends and you do not upgrade, the billing account closes, so you can no longer use Always Free. Upgrade if you want to keep using it. If you only need free hosting for a site or API, see [Cloudflare Free Stack](/en/2026/10/19/cloudflare-free-stack-atlas/) as well.

## How to check your remaining credit

1. In the console, open the **Navigation menu → Billing → Overview** (or go straight to [console.cloud.google.com/billing/overview](https://console.cloud.google.com/billing/overview)).
2. If you have more than one billing account, pick the trial one.
3. **Free trial account** means you are not billed. The **Free credit** pane shows your **remaining credit and days**.

To see which services use the credit, open **Billing → Reports**. Credit applied to your usage appears in the **Other savings** column, and the **Usage cost** column shows usage at on-demand rates ([source](https://docs.cloud.google.com/free/docs/free-cloud-features#monitor-optimize-costs)).

## How to avoid surprise bills

**If you do not upgrade, the worst case is that your resources stop. You are not charged.** The real risk starts after you upgrade, so set these up first.

### Set budget alerts

Go to **Billing → Budgets & alerts → Create new budget** ([official steps](https://docs.cloud.google.com/billing/docs/how-to/budgets)). Set an amount and alert thresholds such as 50%, 90%, and 100%, and you get an email when spending crosses each one.

Note that a regular budget **only sends alerts. It does not stop any service**, and charges keep accruing.

### Use a spend cap to stop runaway API usage

A [spend cap budget](https://docs.cloud.google.com/billing/docs/how-to/budgets-spend-caps) automatically pauses a service once spending passes the amount, with several limits:

| Item | Details |
| --- | --- |
| Supported services | Only Gemini API, Gemini Enterprise Agent Platform (formerly Vertex AI), Cloud Run, and Cloud Run functions |
| Scope | One service in one project per budget, monthly only |
| How cost is measured | **Gross estimated cost before any savings or credits**, so it can pause a service even while you still have trial credit |
| What it does not stop | Persistent resources such as VMs and storage keep running and accruing charges |
| Timing | Not instant; overages incurred before enforcement are billed as normal |

A spend cap works best for workloads that can make a lot of calls, such as connecting Gemini to a coding tool.

### Shut things down when you are done

Google's recommended ways to stop charges ([source](https://docs.cloud.google.com/free/docs/free-cloud-features#stopping-charges)):

- Keep usage within Always Free limits
- Shut down resources you no longer use
- Disable billing on the project
- Close the billing account to stop all billable services
