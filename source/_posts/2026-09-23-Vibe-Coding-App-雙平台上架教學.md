---
title: Vibe Coding 做出 App 後怎麼上架？2026 iOS 與 Android 雙平台準備、測試與送審教學
date: 2026-09-23 12:00:00
updated: 2026-09-23 12:00:00
description: 從 Vibe Coding 原型走到 App Store 與 Google Play，整理 2026 年雙平台帳號、簽署建置、實機測試、隱私申報與送審步驟，並示範 AI 能幫忙盤點哪些資料。
permalink: 2026/09/23/Vibe-Coding-App-雙平台上架教學/
translation_key: vibe-coding-app-store-google-play-guide
translations:
  zh-CN: /zh-cn/2026/09/23/vibe-coding-app-store-google-play-guide/
  en: /en/2026/09/23/vibe-coding-app-store-google-play-guide/
categories:
- 獨立開發
tags:
- Vibe Coding
- App Store
- Google Play
- AI
---

![兩支手機、發布檢查表與 AI 工作流程構成的雙平台上架示意圖](cover.png)

用 Vibe Coding 做出能操作的畫面，只是上架的起點。商店要收到的是能簽署、安裝、通過實機測試的 App，還要有正確的資料揭露、商店頁面和審核資訊。這篇以第一次同時送 App Store 與 Google Play 的獨立開發者為例，帶你把原型變成可送審版本，也說清楚 AI 能在哪些地方省時間、哪些結論必須自己驗證。

<!--more-->

## 第一步：確認做出的是網站，還是能上架的 App

先問自己：手上是否有可以建置與簽署的 iOS、Android 專案，以及能在實體手機安裝的版本？瀏覽器裡跑得動的網頁或 PWA，並不會自動變成兩個商店可提交的安裝檔。若你使用跨平台框架，仍須確認它能產出 iOS 建置版本和 Android App Bundle，並能管理各平台的權限、簽署與商店設定。

| 手上已有 | 下一步要證明 |
| --- | --- |
| 網站、PWA 或 AI 產生的前端 | 選擇可維護的 App 技術方案，列出原生功能與平台限制；不要把「網頁預覽成功」當成上架完成。 |
| iOS、Android 專案 | 在實體 iPhone 與 Android 手機安裝，確認啟動、登入、核心流程及權限正常。 |
| 可安裝版本 | 檢查簽署、版本號、資料流、商店素材與送審表單是否與實際功能一致。 |

Apple 的[審核準則 4.2](https://developer.apple.com/app-store/review/guidelines/)要求 App 具備足夠的功能與價值；若只是把網站包成殼，可能無法通過審核。先把產品用途做清楚，再決定如何封裝。

## 上架前要準備的帳號、檔案與資料

| 項目 | App Store | Google Play |
| --- | --- | --- |
| 開發者帳號 | [Apple Developer Program](https://developer.apple.com/programs/enroll/) 年費 99 美元；個人帳號會顯示法定姓名，組織申請涉及 D-U-N-S Number。 | [Play Console](https://support.google.com/googleplay/android-developer/answer/6112435?hl=en-AU) 一次性註冊費 25 美元，並須完成身分驗證。 |
| 建置格式 | 使用 Xcode 上傳已簽署的 iOS 建置版本。自 2026 年 4 月 28 日起，提交 App Store Connect 的 iOS App 須使用 [Xcode 26 以上與 iOS 26 SDK](https://developer.apple.com/news/upcoming-requirements/) 建置。 | 新 App 使用 [Android App Bundle（AAB）](https://developer.android.com/guide/app-bundle) 與 Play App Signing。自 2026 年 8 月 31 日起，手機與平板的新 App 及更新須[以 Android 16／API 36 以上為目標](https://developer.android.com/google/play/requirements/target-sdk)；其他裝置類別有例外。 |
| 識別與素材 | 確定 App 名稱、Bundle ID、版本、圖示、實際畫面截圖、說明與支援網址。 | 確定套件名稱、版本、圖示、實際畫面截圖、商店說明與聯絡資訊。 |
| 法規與審核資料 | 隱私權政策、[App Privacy](https://developer.apple.com/help/app-store-connect/manage-app-information/manage-app-privacy)、年齡分級、審核測試帳號與操作說明。 | 隱私權政策、[Data safety](https://support.google.com/googleplay/android-developer/answer/10787469?hl=en-AE)、內容分級、目標受眾與廣告聲明；依帳號類型準備測試資格。 |

費用以官方頁面標示的美元金額為準，實際付款幣別、稅費與帳號資格依所在地及申請方式確認。若以公司名義上架，先決定商店要顯示的法律實體，避免做到最後才發現帳號類型不符。

此外，先盤點登入方式、通知、相機、定位、分析、廣告、付款與第三方 SDK。表單問的是**實際資料處理行為**，不是程式碼裡是否出現某個套件名稱。Apple 要求申報 App 及第三方程式碼的資料處理；Google 的 Data safety 也要求開發者申報，即使 App 宣稱不蒐集資料也要完成相應欄位。若提供帳號建立功能，Apple 要求在 App 中可發起[帳號刪除](https://developer.apple.com/support/offering-account-deletion-in-your-app/)；Google 另要求在 App 中與網頁提供[刪除途徑](https://support.google.com/googleplay/android-developer/answer/13327111?hl=en)。

## AI 最適合做的三種上架準備工作

AI 可以幫你整理證據與找遺漏，但它看不到你未提供的後端設定、第三方儀表板與實際網路流量。把它當成整理助手，輸出要能追溯到檔案或實測結果。

**一、盤點發行缺口。**把專案設定、依賴清單、iOS／Android 建置設定與功能列表交給 AI，要求它列出：已有證據、缺少項目、仍待確認的問題。提示詞可以這樣寫：

> 請依照我提供的專案檔案，製作 iOS 與 Google Play 上架盤點表。逐項列出建置格式、簽署、版本號、權限、SDK、商店素材及測試方法；每個結論附檔案位置或我提供的證據。沒有證據的地方標「待確認」，不要猜測。不要要求我貼私鑰、憑證或密碼。

**二、草擬資料流與隱私申報。**提供實際使用的 SDK、API、權限、資料保存方式與第三方服務清單，請 AI 整理「收集什麼、為何使用、傳給誰、可否刪除」的矩陣，再由開發者對照伺服器紀錄、服務供應商文件與商店表單確認。**AI 草稿不能直接當作 App Privacy 或 Data safety 的事實聲明。**

**三、產生實機測試與審核說明。**讓 AI 根據真實功能列出首次開啟、註冊登入、權限拒絕、弱網、付款、登出與刪除帳號的測試案例；把已通過的結果和操作路徑整理成審核員可讀的說明。截圖應呈現實際 App 畫面，商店文案不可承諾尚未做出的功能。

## 先在兩支實體手機跑完關鍵流程

在送審前，至少用一支實體 iPhone 和一支實體 Android 手機安裝候選版本。逐項記錄**裝置、系統版本、App 版本、操作步驟與結果**。建置成功只能證明產出檔案，不能證明使用者真的能完成流程。

- 從全新安裝開始，檢查啟動畫面、註冊或登入，以及主要任務能否完成。
- 拒絕定位、通知、相機等權限，確認 App 不會卡死，說明文字也與用途一致。
- 測試斷網、慢網、連結跳轉、前景與背景切換，以及重新開啟後的狀態。
- 若有購買、訂閱或建立帳號，分別驗證購買恢復、取消流程、登出及刪除帳號。
- 使用供審核員測試的帳號走一次完整流程；需要登入的 App 應依[Apple 審核準則 2.1](https://developer.apple.com/app-store/review/guidelines/)提供有效示範帳號或示範模式及必要說明。

若 App 販售數位功能或內容，先對照 [Apple App Review Guideline 3.1.1](https://developer.apple.com/app-store/review/guidelines/) 和 [Google Play 付款政策](https://support.google.com/googleplay/android-developer/answer/9858738?hl=en)。兩邊對應用內付款各有規則與地區例外，不要讓 AI 只憑一句「接 Stripe 就好」決定結帳流程。

## iOS：從 App Store Connect 到送審

1. 申請並啟用 Apple Developer Program，確認個人或組織身分、合約與付款設定。
2. 在 App Store Connect 建立 [App 記錄](https://developer.apple.com/help/app-store-connect/create-an-app-record/add-a-new-app)，設定名稱、主要語言、Bundle ID 與 SKU；讓程式中的識別碼與記錄一致。
3. 使用符合當前 SDK 要求的 Xcode 建置、簽署並上傳。先用 [TestFlight](https://developer.apple.com/help/app-store-connect/test-a-beta-version/testflight-overview/) 測試；外部測試的首個建置版本可能需要 Beta App Review。
4. 填寫商店說明、實際截圖、支援及隱私權政策網址、App Privacy、年齡分級與需要的其他聲明。把登入方式、測試帳號及特殊操作寫給審核員。
5. 選擇已測試的建置版本，檢查所有必填欄位，然後依 [App Store Connect 送審流程](https://developer.apple.com/help/app-store-connect/manage-submissions-to-app-review/submit-an-app)提交。通過審核後再確認實際上架狀態與商店頁面。

如果在歐盟提供 App，還須依你的發行範圍與身分，檢查 App Store Connect 的交易者身分要求；不要套用別人的勾選結果。

## Android：從 Play Console 到正式發布

1. 建立 Play Console 開發者帳號、完成身分驗證。部分新個人帳號還須透過 Play Console 手機 App 以[實體 Android 裝置驗證](https://support.google.com/googleplay/android-developer/answer/14316361?hl=en)。
2. 在 Play Console [建立 App](https://support.google.com/googleplay/android-developer/answer/9859152?hl=en&rd=2)，確認套件名稱、商店資料及聯絡資訊。產出已簽署的 AAB，設定 Play App Signing，並檢查適用的 target API 要求。
3. 完成商店頁面、實際截圖、隱私權政策、Data safety、內容分級、目標受眾及廣告等[App content 聲明](https://support.google.com/googleplay/android-developer/answer/9867159?hl=en)。
4. 先用內部或封閉測試軌道安裝與驗證。若是 **2023 年 11 月 13 日後建立的個人開發者帳號**，正式版申請前須先完成[至少 12 名測試者連續加入封閉測試 14 天](https://support.google.com/googleplay/android-developer/answer/14151465?hl=en)，再申請正式版存取權；不要把這項條件誤套到所有舊帳號或組織帳號。
5. 達到帳號適用條件後，選擇已驗證的 AAB，依 [發布軌道流程](https://support.google.com/googleplay/android-developer/answer/9859348?hl=en)建立正式版並送審。審核通過後，核對實際發布範圍、下載、啟動與商店資訊。

若 App **本身**能生成 AI 內容，還要檢查 [Google Play 的 AI 生成內容政策](https://support.google.com/googleplay/android-developer/answer/14094294?hl=en-GB)，包括適用情況下的使用者檢舉機制。用 AI 協助寫程式，與向使用者提供 AI 生成內容，是兩件不同的事。

## 送審前最後核對

- 兩個平台各有一份已安裝、已走完核心流程的候選版本，版本號與商店選取的建置檔一致。
- 截圖、文案、權限提示、資料申報與實際行為一致；隱私權政策、支援網址及刪除途徑可開啟。
- 審核員可進入需要登入的功能；付款、訂閱及帳號功能已用對應測試環境驗證。
- 已依帳號類型完成 Apple／Google 要求的測試與身分步驟；發布後安排首次安裝與商店頁面複查。

AI 能把檢查清單、測試案例與商店文案做得更快，但真正的上架證據是**可安裝的建置版本、實機結果與準確的申報**。本文的官方規則查核於 2026 年 9 月 23 日；提交當天，仍要以連結的 Apple 與 Google 官方頁面和後台提示為準。

完成上架後，若要處理商店頁面的曝光與轉換，可以接著看本站的 [App 上架與 ASO 實戰手冊](/2026/08/25/獨立開發者必讀：App-上架與-ASO-實戰完全手冊，從零打造高排名的增長飛輪/)。
