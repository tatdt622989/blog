---
title: Vibe Coding 做出 App 后怎么上架？2026 年 App Store 与 Google Play 双平台发布指南
date: 2026-09-23 12:00:00
updated: 2026-09-23 12:00:00
description: 面向第一次发布移动应用的 Vibe Coding 开发者，梳理 2026 年 iOS 与 Android 的账号、签名打包、真机测试、隐私申报和审核流程，以及 AI 能提供的实际帮助。
permalink: 2026/09/23/vibe-coding-app-store-google-play-guide/
translation_key: vibe-coding-app-store-google-play-guide
translations:
  zh-TW: /2026/09/23/Vibe-Coding-App-雙平台上架教學/
  en: /en/2026/09/23/vibe-coding-app-store-google-play-guide/
categories:
- 独立开发
tags:
- Vibe Coding
- App Store
- Google Play
- AI
---

![两部手机、发布检查表和 AI 工作流程组成的双平台上架示意图](cover.png)

用 Vibe Coding 做出能操作的原型，离应用商店上架还有一段距离。商店需要的是可以签名、安装并通过真机验证的应用，还需要与实际功能一致的隐私声明、商店资料和审核说明。本文面向第一次同时发布 iOS 和 Android 应用的独立开发者，按准备、测试、提交的顺序梳理流程，并给出 AI 可以直接参与的工作。

<!--more-->

## 先分清：你做的是网页，还是可发布的移动应用

先检查手里是否有能构建、签名的 iOS 与 Android 工程，以及能安装到真机的版本。浏览器中的网页或 PWA 即使运行正常，也不会自动成为商店可提交的安装包。使用跨平台框架时，同样要确认它可以生成 iOS 构建产物和 Android App Bundle，并能处理两端的权限、签名和配置。

| 当前成果 | 还需要验证什么 |
| --- | --- |
| 网页、PWA 或 AI 生成的前端 | 选定可维护的移动端方案，明确原生能力与平台限制。 |
| iOS 和 Android 工程 | 在实体 iPhone 和 Android 手机上安装，跑通启动、登录、核心操作及权限流程。 |
| 已生成安装包 | 核对签名、版本号、数据处理、商店素材和审核表单。 |

Apple 的[审核指南 4.2](https://developer.apple.com/app-store/review/guidelines/)要求应用提供足够的功能与价值。仅给网站套一层容器，可能无法过审；先把移动端产品体验和用途做扎实。

## 两个平台各要准备什么

| 项目 | App Store | Google Play |
| --- | --- | --- |
| 开发者账号 | [Apple Developer Program](https://developer.apple.com/programs/enroll/) 年费 99 美元；个人账号展示法定姓名，组织申请涉及 D-U-N-S Number。 | [Play Console](https://support.google.com/googleplay/android-developer/answer/6112435?hl=en-AU) 一次性注册费 25 美元，还需完成身份验证。 |
| 构建要求 | 使用 Xcode 上传已签名的 iOS 构建版本。自 2026 年 4 月 28 日起，提交至 App Store Connect 的 iOS 应用须使用 [Xcode 26 或更新版本及 iOS 26 SDK](https://developer.apple.com/news/upcoming-requirements/) 构建。 | 新应用使用 [Android App Bundle（AAB）](https://developer.android.com/guide/app-bundle) 与 Play App Signing。自 2026 年 8 月 31 日起，手机和平板的新应用及更新须[以 Android 16／API 36 或更高版本为目标](https://developer.android.com/google/play/requirements/target-sdk)；其他设备类别有例外。 |
| 基础资料 | 应用名称、Bundle ID、版本、图标、真实界面截图、描述与支持网址。 | 包名、版本、图标、真实界面截图、商店描述与联系信息。 |
| 声明与审核 | 隐私政策、[App Privacy](https://developer.apple.com/help/app-store-connect/manage-app-information/manage-app-privacy)、年龄分级、审核测试账号与操作说明。 | 隐私政策、[Data safety](https://support.google.com/googleplay/android-developer/answer/10787469?hl=en-AE)、内容分级、目标受众与广告声明，以及适用的测试资格。 |

费用以上述官方页面显示的美元价格为准，付款币种、税费及申请资格以实际地区和账号类型为准。打算用公司名义发布时，先确定商店中应显示的法律主体。

把登录、通知、相机、定位、分析、广告、支付和第三方 SDK 做成一张数据清单。隐私表单填写的是**应用实际怎样处理数据**。Apple 要求说明应用及第三方代码的数据处理；Google 的 Data safety 即使在应用不采集数据时也需要完成相应申报。若应用允许用户创建账号，Apple 要求在应用内提供[发起账号删除的功能](https://developer.apple.com/support/offering-account-deletion-in-your-app/)；Google 还要求提供应用内入口与[网页删除请求链接](https://support.google.com/googleplay/android-developer/answer/13327111?hl=en)。

## 让 AI 帮你做三件高价值的事

**第一，盘点发布缺口。**把项目配置、依赖列表、iOS 与 Android 构建设置、功能列表交给 AI，让它按「已证实／缺失／待核实」输出清单，并写明依据。可直接使用下面的提示词：

> 根据我提供的项目文件，整理 iOS 与 Google Play 发布清单，逐项核对构建格式、签名、版本号、权限、SDK、商店素材和测试方法。每个判断都附文件路径或我给出的证据；没有证据就标注「待核实」。不要猜测，也不要向我索取私钥、证书或密码。

**第二，整理隐私申报草稿。**提供 SDK、接口、权限、数据保存周期及第三方服务清单，让 AI 列出「收集什么、用途是什么、共享给谁、如何删除」。然后由开发者结合服务端日志、供应商文档和真实流量核实，再填写 App Privacy 和 Data safety。**AI 生成的表格不能直接当成事实声明。**

**第三，生成测试用例与审核说明。**让 AI 根据真实功能覆盖首次启动、注册登录、拒绝权限、弱网、支付、退出登录和删除账号；根据实测结果整理审核员可执行的操作步骤。商店截图须来自真实应用，文案也不能写尚未实现的功能。

## 真机验证比构建成功更关键

至少用一部实体 iPhone 和一部实体 Android 手机安装候选版本。每条结果记录**机型、系统版本、应用版本、操作步骤与结果**。构建成功只说明产出了文件，并不能说明用户可以完成任务。

- 从全新安装开始，验证启动、登录或注册、主要功能。
- 拒绝通知、相机、定位等权限，检查应用是否还能正常工作，权限说明是否准确。
- 测试断网、弱网、外部链接、前后台切换，以及重新启动后的状态。
- 如果有购买、订阅或账号，分别验证恢复购买、取消流程、退出登录与删除账号。
- 使用提供给审核员的账号完整走一遍；需要登录的应用应按 [Apple 审核指南 2.1](https://developer.apple.com/app-store/review/guidelines/)提供有效演示账号或演示模式。

销售数字功能或内容时，提前核对 [Apple 规则 3.1.1](https://developer.apple.com/app-store/review/guidelines/)与 [Google Play 支付政策](https://support.google.com/googleplay/android-developer/answer/9858738?hl=en)。两平台对应用内支付有各自的要求及地区例外，不能只凭 AI 的一句建议选择支付方案。

## iOS：从 App Store Connect 到提交审核

1. 加入 Apple Developer Program，确认个人或组织身份，并完成适用的协议与付款设置。
2. 在 App Store Connect [创建应用记录](https://developer.apple.com/help/app-store-connect/create-an-app-record/add-a-new-app)，填写名称、主要语言、Bundle ID 和 SKU，确保与工程配置一致。
3. 用符合当前 SDK 要求的 Xcode 构建、签名、上传，并通过 [TestFlight](https://developer.apple.com/help/app-store-connect/test-a-beta-version/testflight-overview/)测试。外部测试的首个构建版本可能需要 Beta App Review。
4. 填写商店介绍、真实截图、支持和隐私政策网址、App Privacy、年龄分级及其他适用声明；向审核员提供测试账号和必要操作说明。
5. 选择已测试的构建版本，按 [App Store Connect 提交流程](https://developer.apple.com/help/app-store-connect/manage-submissions-to-app-review/submit-an-app)送审。通过后，再检查实际上架状态及商店页面。

如果在欧盟提供应用，还需根据发布地区和自身身份核对 App Store Connect 的交易者身份要求。

## Android：从 Play Console 到正式发布

1. 注册 Play Console 并完成身份验证。部分新个人账号还需要通过 Play Console 手机应用，使用[实体 Android 设备完成验证](https://support.google.com/googleplay/android-developer/answer/14316361?hl=en)。
2. 在 Play Console [创建应用](https://support.google.com/googleplay/android-developer/answer/9859152?hl=en&rd=2)，设置包名、商店资料及联系信息。生成已签名的 AAB，配置 Play App Signing，核对目标 API 要求。
3. 完成商店页面、真实截图、隐私政策、Data safety、内容分级、目标受众、广告等[应用内容声明](https://support.google.com/googleplay/android-developer/answer/9867159?hl=en)。
4. 先通过内部测试或封闭测试轨道安装验证。对于 **2023 年 11 月 13 日之后创建的个人开发者账号**，申请正式版访问权限前，还要完成[至少 12 名测试者连续参与封闭测试 14 天](https://support.google.com/googleplay/android-developer/answer/14151465?hl=en)。这项规则不要直接套用到所有旧账号或组织账号。
5. 满足适用条件后，使用已验证的 AAB 按[发布轨道说明](https://support.google.com/googleplay/android-developer/answer/9859348?hl=en)创建正式版并提交。通过审核后，核对发布地区、下载和启动，以及商店信息。

如果**应用本身**向用户生成 AI 内容，还要查看 [Google Play 的 AI 生成内容政策](https://support.google.com/googleplay/android-developer/answer/14094294?hl=en-GB)，包括适用时的应用内举报机制。用 AI 辅助开发，与向用户提供 AI 生成内容，所涉及的审核要求并不相同。

## 提交前的最后检查

- 两个平台都有已安装、已跑通核心流程的候选版本，版本号与所选构建产物一致。
- 截图、文案、权限说明及数据申报符合真实行为；隐私政策、支持网址和删除入口可访问。
- 审核员能进入受登录保护的功能；支付、订阅与账号流程已在对应测试环境验证。
- 按账号类型完成身份及测试要求；发布后再次检查首次安装和商店页面。

AI 可以加速整理检查表、测试用例和文案。最终能证明应用具备发布条件的，仍是**可安装的构建版本、真机测试结果与准确申报**。本文的官方规则核对日期为 2026 年 9 月 23 日；正式提交当天，请再次查看文中 Apple、Google 官方页面及后台提示。
