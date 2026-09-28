---
title: "OpenAI DevDay 2026 Preview: Ten Rumors Ranked by Probability"
date: 2026-09-29 00:18:36
updated: 2026-09-29 00:46:12
description: "An evidence-based OpenAI DevDay 2026 preview: ten rumors ranked by likelihood, from o and Pro Max to Ultrafast, new models, and hardware."
permalink: 2026/09/29/openai-devday-2026-rumor-probabilities/
translation_key: openai-devday-2026-rumor-probabilities
translations:
  zh-TW: "/2026/09/29/OpenAI-DevDay-2026-前瞻：十大傳聞機率排序與證據查核/"
  zh-CN: "/zh-cn/2026/09/29/openai-devday-2026-rumor-probabilities/"
categories:
- AI Tools
tags:
- OpenAI
- DevDay
- ChatGPT
- Codex
---

![Evidence gathering and connected AI agents at a developer conference](cover.jpg)

OpenAI DevDay 2026 approaches with reports of a persistent agent called o, a Pro Max subscription, broader Ultrafast access, and new models. The evidence varies: some claims have public code or interface clues, while others originate in community speculation.

This article examines ten rumors against official announcements, original reporting, and GitHub records. They are ranked by the available evidence for an event announcement, with the remaining uncertainties, potential implications, and specific details to verify afterward.

<!--more-->

## Livestream time and research cutoff

**Research cutoff: September 28, 2026, at 16:25 UTC (9:25 a.m. PDT). This article was written before the event.** The keynote is scheduled for **September 29 at 10 a.m. PDT (17:00 UTC)**, at Fort Mason in San Francisco, featuring Sam Altman. See the [official schedule](https://devday.openai.com/) and [livestream page](https://openai.com/live/).

The research covered OpenAI announcements and API records, its public GitHub repository, TestingCatalog, news reporting, and Reddit discussions in OpenAI, Codex, singularity, and accelerate. Several original X posts returned 403 errors; embedded posts on the reporter's site do not constitute independent verification of the underlying configuration.

## Ten predictions, ranked

The table below covers ten widely discussed DevDay rumors. Some features show signs of development or testing, but OpenAI has not confirmed an announcement at the event. Even if they appear, they may be previews or demos rather than features available that day.

| Rank | Event being predicted | Likelihood | Strongest evidence and limitation |
|---|---|---:|---|
| 1 | Pro Max or revised Pro tiers announced | High | Merged public code; pricing remains a leak |
| 2 | Persistent agent o, or a comparable product, unveiled | High | Configuration and upgrade-page reports; scope unknown |
| 3 | Broader Ultrafast access or a new entry point | Relatively high | Existing preview plus Playground clues |
| 4 | New Platform plans or development entry points | Relatively high | Reported Free, Prototype, and Accelerate interface |
| 5 | Integration of ChatGPT's Chat and Work experience | Moderate | Community speculation, no firm commitment |
| 6 | GPT-6 Cyber or a related security product preview | Relatively low | Reporting exists, but its timing was corrected |
| 7 | An Astra Minor, GPT-6.1, or Bel model preview | Low | Unclear relationship between names and products |
| 8 | A new open-weight model | Low | Community expectation, little event-specific evidence |
| 9 | Sora 3 or another next-generation video model | Low | Mostly a wish-list item |
| 10 | A concrete reveal of the Jony Ive consumer device | Low | Weak connection to this event |

The first four items have the clearest evidence. Further down the list, the discussion becomes more speculative.

## 1. Pro Max: plan support in code, pricing still unconfirmed

[Codex PR #47971](https://github.com/openai/codex/pull/47971), merged September 25, adds **promax** support and the **Pro (Max)** display name. That is the strongest reason to expect a new plan.

[TestingCatalog's September 24 report](https://www.testingcatalog.com/openai-prepares-new-500-month-pro-max-plan-for-chatgpt/) supplies the **$500 monthly price** and faster Work/Codex description. It explains the $600 figure in its video as VAT-inclusive. The difference may simply be tax; regional pricing remains unannounced.

The merged plan support is the main reason this item ranks first. Naming, price, allowances, and launch timing remain unannounced, and the [public pricing page](https://chatgpt.com/pricing/) did not list Pro Max at the cutoff. Code can be deployed before a staged rollout.

For sustained workloads, subscription cost needs to be assessed alongside allowances, model access, and completion time. Tool waits and repeated corrections can remain expensive even with faster generation. The effect on existing subscriptions requires separate confirmation through published rules and account records.

Confirmation requires an official plan announcement or pricing page specifying the name, pre-tax monthly price, regions, model access, rate limits, allowances, and migration rules. Code establishes preparation rather than commercial availability. A clearly announced new Pro tier would satisfy the prediction even if its final branding changes.

## 2. Persistent agent o: configuration and upgrade-page clues

[TestingCatalog's September 26 report](https://www.testingcatalog.com/openai-to-announce-o-always-on-agent-during-devday/) describes an **o** display name, an **-o** email suffix, and an upgrade-page clue. The relationship between **o and Aeon remains uncertain**. Plus eligibility is still unknown.

OpenAI's [Agents API public beta](https://openai.com/index/introducing-the-agents-api/), announced September 10, already provides the Codex harness and infrastructure for long tasks. That gives OpenAI a foundation for a persistent assistant, though how o might use it remains unclear.

Potential uses of a persistent agent include tracking progress, waiting for external replies, resuming work, and notifying a user. These are plausible scenarios for the product category, not confirmed o features. An email suffix suggests an email identity but does not establish permission to read or send messages.

Unresolved operating details include whether work continues after the computer is turned off, how failures are recovered, how spending accumulates, and when permission is required to send mail or modify external data. These determine the tasks that can be delegated. Unlimited continuous execution has not been established.

An identifiable product, delegation interface, task lifecycle, notification method, permissions, and eligibility would establish what has been announced. A vision statement without a product or demonstration would leave the rumor unresolved. The relationship to Aeon and any email identity, memory, or scheduling features require separate confirmation.

## 3. Ultrafast: faster inference for more developers

OpenAI [previewed Cerebras-powered GPT-5.6 Sol Ultrafast on August 13](https://openai.com/index/previewing-ultrafast/). The new [TestingCatalog report](https://www.testingcatalog.com/openai-prepares-to-expand-ultrafast-api-to-more-users/) concerns a Playground speed selector. The current rumor concerns broader access or another entry point.

The existing preview and new interface clues support a broader rollout. That could mean another Playground entry point or expanded eligibility. The evidence does not establish that every GPT-6 model will support the same speed tier.

Shorter reasoning cycles can reduce waiting across a long task. Browser loads, external APIs, tests, and human approval still contribute to completion time. Output-token throughput covers only part of the workflow; an end-to-end comparison needs the same task, quality requirements, and a record of total cost.

A broader rollout needs an actual change in eligibility, interface access, or availability. Models, account types, regions, pricing, and rate limits should be checked together. Replaying the existing preview would not establish expansion, and an interface option could still depend on restricted backend eligibility.

## 4. Platform: three new plans reportedly in testing

[TestingCatalog's September 23 report](https://www.testingcatalog.com/devday-new-plans-and-new-platform-for-building-ai-apps/) identifies **Free, Prototype, and Accelerate** in a new onboarding flow. The report itself distinguishes those clues from proof of full application hosting.

The reported plan names correspond to experimentation, prototyping, and production. Further integration of execution environments, budgets, and monitoring could reduce setup work. That is an analysis of the possible product direction, not an announced feature list.

Full application hosting remains an open question. Domains, databases, durable storage, and secrets management would all need an answer before a team could rely on the platform for a production service.

An official plan page, billing rules, or a usable new development flow would confirm the platform change. Full application hosting separately requires domains, storage, deployment, and public-serving capabilities. An agent sandbox, workshop, or demonstration of an existing platform would not establish that larger hosting claim.

## 5. Chat and Work: a possible interface update

[A September 26 Reddit thread](https://www.reddit.com/r/singularity/comments/1wr52pw/openai_devday_leaks_ultrafast_around_750_tokenss/) discusses Sol in Chat and a merging of product experiences. Other commenters challenge the list as wishful thinking. The details of any redesign remain unconfirmed.

The [official Sol and Luna announcement](https://openai.com/index/introducing-gpt-6-sol-and-luna/) initially makes them available in Work and Codex, explicitly excluding Chat at that point. An expansion is a reasonable possibility, without an event-specific commitment.

An integrated interface could keep task submission, progress, and results in one place as a conversation becomes a longer assignment. Automatic mode selection, manual overrides, and the future arrangement of standalone Codex tools remain unspecified.

The model menu, Chat and Work entry points, and task-creation flow can be compared after the event. Sol entering Chat would be an availability change; a renamed interface would require checking for an actual workflow change. Discontinuation of standalone Codex tools, account consolidation, or data migration each needs its own official basis.

## 6. GPT-6 Cyber: the wait may be longer

[Reuters' account](https://finance.yahoo.com/news/openai-preview-gpt-6-cyber-225804238.html) attributes the Cyber report to Fortune, so it is not independent corroboration. [Fortune corrected the timing to weeks.](https://fortune.com/2026/09/24/openai-launching-gpt-6-cyber-model-and-security-product-devday/)

The corrected timing weakens the case for a DevDay appearance. The reporting supports tracking this product line, but does not establish a launch on that particular day. Its event-specific likelihood is therefore relatively low.

A security workflow would need to connect vulnerability discovery and validation to a tested fix. Authorization scope, audit records, and required human intervention would determine its fit in an enterprise security process, alongside reproducible results and clear responsibility.

An explicitly introduced security model or product would establish a reveal. Application procedures, intended customers, and access details would help distinguish a demonstration from limited preview or general availability. Broad statements about security investment alone would not establish this release; practical adoption also depends on authorization and supported scope.

## 7. Astra Minor, GPT-6.1, and Bel: what do the model rumors tell us?

[The August Bel discussion](https://www.reddit.com/r/ChatGPT/comments/1vztv6r/openais_next_pretrain_codename_bel_devday/) concerns a rumored pretraining codename. [A later predictions thread](https://www.reddit.com/r/singularity/comments/1wnkzxy/what_are_your_predictions_for_openai_devday/) places it alongside Astra Minor and 6.1. They need not be the same project or stage of development.

A model preview in this group is assessed as low likelihood because no official model page or release date ties these names to DevDay. Completed pretraining could still leave post-training, evaluations, capacity planning, and product integration before a usable release.

Astra Minor and 6.1 still lack clear product descriptions, while the Bel discussion is closer to a report about research progress. There is insufficient detail to establish a separate product identity, price, capability set, or release date for each name, so they are treated as one group of weakly supported model rumors.

This item covers an official preview of at least one new general-purpose model from the group, with an identifiable name and new capabilities. Repeating a Sol or Luna demonstration would not qualify. Research progress without a product identity should be recorded as research, while any pricing or benchmark claims need their own evidence.

## 8. Open weights: hopes for a gpt-oss follow-up

[Community predictions](https://www.reddit.com/r/singularity/comments/1wnkzxy/what_are_your_predictions_for_openai_devday/) include new open weights, while OpenAI [released gpt-oss in 2025](https://openai.com/index/introducing-gpt-oss/). An existing open-weight product cannot establish this event's release schedule.

A new open-weight release is assessed as low likelihood, with little evidence connecting it to this event. Potential benefits concern local deployment, customization, and control over inference costs. Licensing, hardware requirements, and access to weights would determine practical adoption.

A specific model introduction, a way to obtain weights, or a concrete model preview would establish the announcement. Commercial licensing, hardware needs, and quantized versions would affect deployment choices. Open-source SDKs, tools, and tutorials should be recorded separately from model-weight releases.

## 9. Sora 3: few concrete clues so far

Sora 3 appears in the [community prediction thread](https://www.reddit.com/r/singularity/comments/1wnkzxy/what_are_your_predictions_for_openai_devday/). The reviewed material contains no direct evidence tying that version to this event.

Sora 3 is assessed as low likelihood. The traceable material mainly records community expectations, without direct clues about a model version, test access, or release timing. Its suitability for a stage demonstration does not establish readiness.

Confirmation requires an identifiable next-generation video model and newly described capabilities. Examples, allowance changes, or partnerships for an existing model should be recorded separately. Eligibility, generation limits, output specifications, and API timing remain unannounced; no specific values can be inferred from the available rumor.

## 10. Consumer hardware: could we see a prototype?

[WIRED reported in February](https://www.wired.com/story/openai-drops-io-branding-hardware-devices/) that the first device would not ship before late February 2027. An earlier prototype reveal remains possible.

A concrete device reveal is assessed as low likelihood, with still less support for shipment that day. A prototype could precede delivery, and software agents and hardware could follow different schedules. The use case, relationship to existing devices, and sales regions remain unspecified.

A concrete prototype, use case, or operating demonstration would establish a reveal. A vision video or renewed partnership statement would leave product details open. Announcement, preorders, and delivery should be recorded separately, alongside sales regions, price, and timing. A letter or circular teaser does not establish the device design.

## Other discussions: existing releases and scattered guesses

- **Sol and Luna's first release:** already recorded on September 22 in the [API changelog](https://developers.openai.com/api/docs/changelog).
- **First official claim of an automated research intern:** already made in OpenAI's [September 6 post](https://openai.com/index/research-acceleration-view-inside-openai/). A public product under that name has yet to be announced.
- **An OpenAI Linux distribution:** a [discussion thread](https://www.reddit.com/r/accelerate/comments/1wo0p7v/whats_next_for_openai_dev_day/) extrapolates from an ambiguous hint. It is unclear whether the hint concerns Linux support, a cloud environment, or another update.
- **AGI or ASI:** these also appear in community predictions, with too little agreement on a product or evaluation standard to include in the ranking.

## Three areas to assess after the announcements

**Inspectable results from long-running work.** Evaluating a persistent agent requires sources, output files, action records, and failure recovery. A complete demonstration can show how an assignment reaches delivery; a final answer alone leaves reliability questions unresolved. Continued execution after a computer shuts down and the ability to provide instructions mid-task also affect its usefulness.

**The relationship between speed, allowances, and billing.** Pro Max, Ultrafast, API processing, and sandboxes could be billed separately. A shared demonstration does not establish that one subscription includes them all. Monthly charges, included usage, overages, and compute fees need comparison, along with any changes to existing subscribers' model access and migration rules.

**Control over costs and external actions.** Retries, pauses, cancellation, recovery, and tool permissions influence the maintenance burden of sustained tasks. Continuous execution also raises practical requirements for spending limits, logs, and human intervention. Those details determine how the product can fit into an existing workflow.

The clearest available clues concern subscription tiers, inference speed, agents, and developer workflows. Event-specific evidence for new models and hardware is weaker. Afterward, each item can be recorded as announced, in limited preview, available, or absent, retaining the original research cutoff for a fair comparison with the rumors.

## Sources and access limitations

Sources are linked beside the relevant claims. Reports tracing back to the same TestingCatalog or Tibor Blaho posts are treated as one reporting chain; repetition is not counted as independent corroboration.

Some X originals were inaccessible. The Reuters full-page fetch failed; only its readable search extract was used before checking the updated Fortune article. These estimates reflect the information available at the stated cutoff.

Further reading: [GPT-6 Sol and Luna: pricing, evaluations, and model selection](/en/2026/09/23/gpt-6-sol-luna-pricing-aa-review/).
