---
title: "Japan's PHP Security Scramble: Why pixiv, BASE and Other Services Went Offline"
date: 2026-10-21 22:48:07
updated: 2026-10-21 22:48:07
description: "Japan's PHP security scramble: two critical flaws, fixed versions, the prime minister's warning, and six verified service maintenance notices."
permalink: 2026/10/21/php-critical-vulnerabilities-japan-shutdowns-2026/
translation_key: php-critical-vulnerabilities-japan-shutdowns-2026
translations:
  zh-TW: /2026/10/21/PHP重大漏洞引發日本停機潮/
  zh-CN: /zh-cn/2026/10/21/php-critical-vulnerabilities-japan-shutdowns-2026/
categories:
- Cybersecurity
tags:
- PHP
- Security Vulnerabilities
- Website Operations
- Japan
---

![Online services temporarily closing while a shared server receives security repairs after the critical PHP vulnerabilities](cover.jpg)

The **critical PHP vulnerabilities announced in October 2026** became a very visible problem in Japan on October 21. Illustration communities, online stores and childcare software published emergency maintenance notices. Even Prime Minister Sanae Takaichi urged website operators to prepare for urgent patching and consider temporary suspension when necessary.

The striking part is how far the disruption reached into ordinary activities. Here is what the official advisories say, followed by six groups of verified service notices.

<!--more-->

**Reporting cutoff: October 21, 2026, 22:48 in Taiwan (UTC+8).** All maintenance windows below use **Japan Standard Time (JST, UTC+9)**. They are announced schedules, not measured outage durations. Check each provider for subsequent recovery updates. PHP had published fixed releases by the time of this review.

## What are the two PHP vulnerabilities?

PHP's October 20 [advance notice](https://www.php.net/archive/2026.php#2026-10-20-1) scheduled a security release for **October 21 at 14:00 UTC: 22:00 in Taiwan and 23:00 in Japan**. Both vulnerabilities carry a **CVSS v4.0 score of 9.2, Critical**.

- **CVE-2026-109618:** Out-of-memory handling can leave internal request data incompletely initialized. Cleanup can then use that invalid data, potentially allowing remote code execution. [Upstream advisory](https://github.com/php/php-src/security/advisories/GHSA-w8hw-w9fx-j79w)
- **CVE-2026-109619:** Internal state associated with one request can outlive its backing memory. A later request can consume that stale state, potentially allowing remote code execution. [Upstream advisory](https://github.com/php/php-src/security/advisories/GHSA-6wmf-4rv5-p3rp)

The practical concern is **code execution without first authenticating to the application**. Exploitation still depends on the environment and triggering conditions. This does not mean one universal request can compromise every PHP website.

The flaws concern the PHP runtime itself. Updating a WordPress plugin or application dependency alone does not establish that the server's PHP installation has been patched.

## Why did the prime minister recommend urgent action?

In her [original post](https://x.com/takaichi_sanae/status/2112890642590564386), Takaichi asked operators to identify public websites using PHP and prepare to apply the update promptly. She described temporary website suspension as one way to reduce risk when immediate patching was difficult.

[CERT-EU's advance advisory](https://cert.europa.eu/publications/security-advisories/2026-018) likewise recommended considering isolation of internet-facing applications when immediate remediation was not feasible.

Suspending service interrupts customers and business operations. The fact that providers accepted those costs makes the urgency easier to understand than a severity score alone.

## Six groups of official service notices

These entries come from providers' own announcements. **Some explicitly name PHP; others describe security maintenance without identifying PHP. The latter do not establish exposure to these CVEs.**

| Service | Announced impact | Schedule and stated reason |
| --- | --- | --- |
| **pixiv, pixiv Encyclopedia, pixivFANBOX and others** | Listed websites and apps unavailable; some functions in other services using pixiv accounts could also be affected | October 21, 19:00, into the early hours of October 22. Security maintenance; PHP not named. [Official post](https://x.com/pixiv/status/2112844262790648311) |
| **BOOTH** | New logins, purchases and related functions unavailable; this does not establish closure of every page | October 21, 19:00, into the early hours of October 22. Security improvements; PHP not named. [Official notice](https://booth.pm/announcements/1004) |
| **BASE / PAY ID** | Shop administration, storefront browsing and orders, PAY ID app operations, and the BASE API | Start brought forward to October 21, 15:50; planned end October 22, 07:00. Updated notice explicitly names the PHP vulnerabilities. [Official notice](https://help.thebase.in/hc/ja/articles/63455442867737) |
| **CoDMON** | All services, including the parent app, suspended; alternative paper attendance templates offered | October 21 suspension, with resumption expected early October 22. Current notice refers to vulnerable software without naming PHP. [Official notice](https://www.codmon.com/info/maintenance/10243/) |
| **Konica Minolta tomoLinks** | Education service temporarily suspended pending completion of security work | October 21 notice concerns PHP and links to IPA's alert; no fixed recovery time given. [Official notice](https://tomolinks.konicaminolta.jp/news/20261021/) |
| **CyberMates** | All content and services suspended | Precautionary suspension from October 21, pending patching and safety checks. PHP explicitly named. [Official notice](https://cyber-mates.net/) |

These notices span creative work, commerce and education. A customer may lose access to checkout while a merchant loses the administration tools and API needed to process business. A childcare provider may need a temporary way to record attendance.

BOOTH also illustrates the reach of shared identity systems: maintenance affecting accounts can interrupt a purchasing workflow on a related service. Dependencies that usually make the web convenient can spread the operational cost of an emergency update.

## A long social media list is not a breach list

The [thread by @anywhere_otaku](https://x.com/anywhere_otaku/status/2112859388780191900) collected many familiar names, including Granblue Fantasy, Umamusume, pixiv, BOOTH, BOOK☆WALKER and Niconico.

The author labels it a personal compilation of services **already undergoing maintenance or preparing to do so**. It is a useful reporting lead. It is not independent confirmation that every listed service is vulnerable to these PHP flaws or has suffered an intrusion. The table above preserves the narrower scope of each verified announcement.

**Precautionary suspension does not establish a successful attack or data leak.** The cited pixiv, BOOTH, BASE, CoDMON and CyberMates notices each said that relevant unauthorized access or information leakage had not been confirmed at the time of their announcements.

## Fixed releases are available

The [PHP security announcement](https://www.php.net/archive/2026.php#2026-10-21-5) lists these fixed releases:

| PHP branch | Fixed release for this incident |
| --- | --- |
| PHP 8.2 | **8.2.35** |
| PHP 8.3 | **8.3.36** |
| PHP 8.4 | **8.4.27** |
| PHP 8.5 | **8.5.12** |

Distribution and hosting vendors may backport fixes, so check their security advisories and package revisions. Operators running older PHP branches need to establish who provides security maintenance or move to a supported branch.

Verify that **the PHP runtime actually serving public requests is patched, running workers have loaded the update, and essential application functions work before restoring access**. A different PHP version shown in a terminal does not prove the website's runtime has changed.

PHP also warns that configuration changes reduce exposure to particular attack paths without completely replacing an update. For ordinary users, the immediate reference is the provider's recovery announcement; a maintenance page alone is not evidence that their account has been compromised.

The disruption shows how a shared runtime can connect otherwise unrelated daily activities. Providers accepting temporary service interruption to address that common risk is what made this PHP security event so visible.
