---
title: "Node.js October 2026 Security Update: Brotli RCE, TLS Bypasses and What to Patch"
date: 2026-10-21 23:49:20
updated: 2026-10-21 23:55:04
description: "Analyze Node.js's October 2026 fixes: Brotli RCE, TLS bypasses, random-cache snapshots, affected branches, npm audit limits and deployment checks."
permalink: 2026/10/21/nodejs-october-2026-security-analysis/
translation_key: nodejs-october-2026-security-analysis
translations:
  zh-TW: /2026/10/21/Nodejs十月安全更新深度解析/
  zh-CN: /zh-cn/2026/10/21/nodejs-october-2026-security-analysis/
categories:
- Cybersecurity
tags:
- Node.js
- Security Vulnerabilities
- Website Operations
- JavaScript
---

![Node.js security maintenance connecting server, decompression, TLS identity and random-state repair symbols](cover.jpg)

The **October 21, 2026 Node.js security update** lists 10 named vulnerabilities, with **High** as the highest severity. They include possible remote code execution in the Brotli decoder, TLS hostname verification bypasses, and random values replayed from startup snapshots.

The relevant paths extend beyond incoming website requests. Fetching remote content, reusing HTTP connections and building single executable applications introduce different conditions. This analysis follows the official announcement, release notes and public patches to explain what operators should actually inspect.

<!--more-->

**Reporting cutoff: October 21, 2026, 23:50 in Taiwan (UTC+8).** Fixed releases were available when checked. The scenarios below are derived from public information and code paths; **they are not confirmed victim reports or attacks reproduced for this article**.

## Fixed releases and the scope of the update

The [official security announcement](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases) identifies these fixed releases. Apply the fix within **your release branch**, or a later release in that branch containing the corrections.

| Node.js branch | Security release | Status at the announcement |
| --- | --- | --- |
| 22.x | **22.23.4** | LTS; [release notes](https://nodejs.org/en/blog/release/v22.23.4) |
| 24.x | **24.22.1** | LTS; [release notes](https://nodejs.org/en/blog/release/v24.22.1) |
| 26.x | **26.12.1** | Current; [release notes](https://nodejs.org/en/blog/release/v26.12.1) |

Counting the named entries gives **four High, three Medium and three Low issues**. Dependencies and certificate data were also updated, so those 10 entries are not an exhaustive count of everything addressed by the release.

Node.js 18 and 20 are already EOL in the [official release status table](https://nodejs.org/en/about/previous-releases). Plan migration to a supported branch. If a vendor supplies extended maintenance or backports, obtain its security advisory and package revision evidence.

## The 10 vulnerabilities and their affected branches

This table follows the **official security announcement**. Branch inclusion does not establish identical exploitability across every historical version and configuration. The announcement does not identify the first affected release for every issue.

| Vulnerability | Severity | Listed branches | Main issue |
| --- | --- | --- | --- |
| **CVE-2026-111497** | High | 22 / 24 / 26 | Brotli decoder out-of-bounds write can lead to remote code execution |
| **CVE-2026-105482** | High | 22 / 24 / 26 | NUL characters can truncate names passed to DNS resolution |
| **CVE-2026-105483** | High | 24 / 26 | IP addresses written with fullwidth digits can bypass TLS hostname checks |
| **CVE-2026-106069** | High | 22 / 24 / 26 | Loosely parsed IP-like hostnames can bypass TLS identity checks |
| **CVE-2026-105481** | Medium | 22 / 24 / 26 | A keep-alive connection can process data written before its next request |
| **CVE-2026-106072** | Medium | 22 / 24 / 26 | Non-canonical IPv4 names can allow DNS certificate identities to authenticate IP endpoints |
| **CVE-2026-106074** | Medium | 22 / 24 / 26 | Random caches stored in snapshots or SEAs can replay values across processes |
| **CVE-2026-106070** | Low | 26 | ZIP reads after failed header validation can return attacker-controlled prefix bytes |
| **CVE-2026-106071** | Low | 26 | Permission Model wildcard path lookup can grant excessive filesystem access |
| **CVE-2026-106073** | Low | 22 / 24 / 26 | fs.realpathSync lacks a required Permission Model check |

A patch can address multiple CVEs. The [same TLS change](https://github.com/nodejs/node/commit/ad788ccd076b30e4e547910ace0beda2d063ad10) handles **106069** and **106072**, although the public advisory assigns different severities to them. Counting commits would therefore give a misleading vulnerability total.

## Brotli RCE also matters to backends fetching remote content

For **CVE-2026-111497**, the central question is whether **untrusted Brotli data reaches a vulnerable decoder**. Node.js identifies remote code execution as a possible impact. That does not establish a universal HTTP request capable of compromising every Node.js website.

The [upstream Brotli patch](https://github.com/google/brotli/commit/0ed4268a4401abcb4472096340477cf4af7d1a2b) changes block-switch error handling so invalid streams are detected earlier and errors propagate to callers. This concerns native decoder behavior; adding a JavaScript exception handler does not replace the runtime correction.

An easily missed path is an **outbound request made by your own backend**. The fixed runtime's bundled [Undici fetch implementation](https://github.com/nodejs/node/blob/v26.12.1/deps/undici/src/lib/web/fetch/index.js) invokes Brotli decompression for a response encoded as **br**.

That makes user-supplied URL fetching, remote imports, attacker-influenced response sources and external compressed files relevant inventory targets. These are scenarios inferred from data flow, **not confirmation that every such feature has an exploitable attack chain**.

Compressing a page into Brotli for a browser is not, by itself, evidence that the decoder flaw is reachable. Follow who supplies the compressed bytes and which component decodes them.

## DNS and TLS must agree about the destination

The shared theme is **one input being interpreted as different names or addresses by different components**.

### NUL truncation can separate validation from resolution

**CVE-2026-105482** concerns a NUL character: a character with a numeric value of zero. The [patch](https://github.com/nodejs/node/commit/6b78ea171de305446126cb94ceb6a45b6297466c) rejects NUL-containing strings at DNS resolution entry points, covering callback and Promise paths.

If application policy checks the complete string while a later resolver uses only a truncated portion, a validation mismatch can arise. Whether that creates SSRF or another application-level issue depends on input control, policy rules and subsequent connection behavior. The CVE title alone does not establish that outcome.

### A valid certificate chain still needs the correct host identity

**105483, 106069 and 106072** concern fullwidth digits, non-canonical IP spellings and certificate name matching. HTTPS needs both certificate trust and authentication of the intended peer.

The [final TLS implementation in 26.12.1](https://github.com/nodejs/node/blob/v26.12.1/lib/tls.js) rejects a host that is not originally a canonical IP address but becomes one after name conversion. Canonical IP literals follow IP-address certificate matching. The correction tightens the boundary between name normalization and peer authentication.

Inspect custom-URL proxies, remote importers, link previews and services enforcing outbound destination policies. Exploitation still requires a reachable input path and suitable certificate and endpoint conditions. **The announcement does not establish that every HTTPS connection is compromised.**

If newly rejected non-canonical names break an integration, correct the input and certificate configuration while retaining TLS identity checks.

## HTTP connection reuse and snapshot randomness

### Keep-alive concerns the request-response association

**CVE-2026-105481** concerns an HTTP Agent reusing an idle connection when data already waits in the operating system's socket buffer before the next request is sent.

The [patch description](https://github.com/nodejs/node/commit/0683ee5f7d512332c9701a3e06cdeec2c34bcdbf) explains that the existing guard depended on event-loop I/O polling and might not yet have observed that data. The correction checks for pending reads before reuse and discards a connection when necessary.

Connection-pooled API integrations should care about whether a response belongs to the current request. Calling this a demonstrated server-side request-smuggling exploit, or claiming cross-account data access, would require additional evidence.

### Startup snapshots can copy unused random-cache entries

**CVE-2026-106074** involves startup snapshots, including SEAs containing relevant snapshot state, retaining unused **randomUUID() / randomInt()** cache entries. Processes restored from the same state can replay the same values.

The [fix](https://github.com/nodejs/node/commit/acffa610db2d85c81d01545194d99fb67920d309) resets caches at critical serialization and deserialization stages. It addresses state carried through a particular build and startup process; it does not establish that every Node.js random API is broken.

Applications requiring these values to be unpredictable tokens could face more serious consequences; identifier use could encounter collisions. Those are application-level implications, not reports of observed token theft.

Rebuild affected snapshots and executables with the fixed toolchain. The [SEA documentation](https://nodejs.org/api/single-executable-applications.html) describes bundling the Node.js executable with application data. Updating a separate host installation does not prove an existing SEA has replaced its embedded runtime.

## Permission Model and ZIP issues need their usage context

**CVE-2026-106071** concerns wildcard authorization, while **106073** concerns **fs.realpathSync** permission checks. The [realpath patch](https://github.com/nodejs/node/commit/cc244131aaeef774effdc94b59a8a2de84a2d262) checks the resolved input path before filesystem traversal can probe paths outside the granted set.

Tools and file-processing workflows using **--permission** should inspect these fixes. The realpath evidence does not establish arbitrary reading of every file's contents.

The [Permission Model documentation](https://github.com/nodejs/node/blob/v26.12.1/doc/api/permissions.md) also sets a fundamental boundary: it constrains trusted code's accidental resource access and **does not guarantee isolation from malicious code**. AI tools or services executing untrusted code still need operating-system-level isolation.

**CVE-2026-106070** concerns the ZIP functionality listed for 26.x. Its [patch](https://github.com/nodejs/node/commit/745ad771566d6f0133eee775a661f48056f2cf50) validates local-header consistency and calculates the content offset before caching either. This prevents a failed validation from leaving state that a subsequent read can misuse. The evidence concerns failure and retry behavior, not an established arbitrary-file-write primitive.

## What npm audit covers, and what the runtime still needs

[npm audit](https://docs.npmjs.com/cli/v11/commands/npm-audit/) checks known vulnerabilities in project dependencies. Its result cannot establish that **the running Node.js binary, bundled native libraries and certificate data** contain this security update.

The release notes also show bundled Undici updates to **6.29.1 on 22.x, 7.30.1 on 24.x, and 8.12.2 on 26.x**. OpenSSL was updated on 22.x and 24.x, SQLite on 22.x, alongside c-ares and certificate-related work.

These are useful release-content checks. An independently installed Undici package and the version bundled for built-in fetch need separate inspection. Editing **package-lock.json** does not automatically replace a deployed Node.js executable.

The security announcement also lists certificate updates related to the eMudhra intermediate-CA incident. The release therefore includes changes to runtime trust data as well as executable code.

## Prioritize reachable paths and verify the deployed workload

The following is an **operational priority order inferred from input reachability**, not a determination that a particular service has been attacked.

1. **Services decoding external Brotli data or fetching user-controlled sources:** verify the native decoder and actual runtime first.
2. **Services accepting custom hosts or URLs, or enforcing outbound restrictions:** inspect DNS, TLS normalization and identity validation.
3. **HTTP Agent connection-pool users:** verify response association, error handling and retries after updating.
4. **Snapshot, SEA and Permission Model users:** rebuild artifacts and test the actual startup and resource-control paths.
5. **Sites using Node.js only during a build:** inventory CI and build environments, and establish whether production also has a public Node.js process.

Inspect the version **inside the actual container, process launch environment or platform workload**, rather than relying on your laptop's terminal:

```bash
node -p "JSON.stringify({ node: process.version, executable: process.execPath, versions: process.versions }, null, 2)"
```

This reads version and executable information without upgrading anything. Fields vary with Node.js version and build configuration. Vendor backports still require package revision and advisory evidence.

Deployment verification should establish that **running workers were restarted or replaced, every replica loads a fixed runtime, relevant snapshots and SEAs were rebuilt, and essential connection and decompression flows pass checks**. A changed image tag or successful CI job alone does not establish that old workloads stopped serving traffic.

The same day's [PHP incident and service suspensions](/en/2026/10/21/php-critical-vulnerabilities-japan-shutdowns-2026/) also illustrate the operational importance of runtime updates. Those PHP maintenance notices cannot establish exploitation of these Node.js flaws. A decision to suspend a service should follow its actual exposure, patch availability and deployment capabilities.
