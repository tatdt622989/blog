---
title: 快速使用 Firebase Cloud Functions 創建網頁後端API
date: 2023-07-08 00:14:32
tags:
- JavaScript
- Firebase
---

![](cover.jpg)

## Firebase Cloud Functions 介紹

**Firebase Cloud Functions** 是 Firebase 的一項服務，能夠讓使用者在不需要考慮伺服器的情況下，建立可以在雲端執行的程式碼，並使用HTTPS或其他Firebase的服務進行調用，<!-- more -->但是若要使用這項服務，必須將專案升級成[Blaze Plan](https://firebase.google.com/pricing)才能夠使用，並且調用是需要費用的，但是每個月的免費額度對一般的開發者來說應該是相當夠用了(一個月200萬次呼叫)，費用詳情可以參考[這裡](https://firebase.google.com/pricing)，針對請求數、儲存空間、執行時間等都有詳細的價格說明。

## 開始使用 Firebase Cloud Functions

在使用任何 Firebase 相關的服務時，需要先建立一個專案和網頁應用程式，選擇"新增專案"後，請按照流程往下走把專案建立起來。
\
![](firebase1.png)

接著，點選網頁建立網頁應用程式，接著輸入應用程式名稱，依照流程跑完。
![](firebase5.png)

請記得將專案升級至Blaze Plan
![](firebase6.png)

## 安裝 Firebase CLI

要使用Firebase Functions還需要在本地安裝 Firebase CLI ，這裡使用NPM的形式做安裝。

```bash
npm install -g firebase-tools
```

安裝成功後，需要做身分驗證，請透過以下指令登入

```bash
firebase login
```

登入成功之後，請使用以下指令確認帳戶內是否有一開始創建的專案，若沒有請先將專案建立起來並確定專案是否為「**Blaze Plan**」

```bash
firebase projects:list
```

確認完專案存在後，需要進行初始化

```bash
firebase init
```

輸入指令後，會出現許多問題，請在選擇Firebase服務的問題內，選擇Functions和Realtime Database(本範例會稍微介紹如何使用在Cloud Functions，不一定需要裝)，如下圖

![](firebase2.png)

請選擇Use an existing project並選擇已創建的專案，其他選項則是可以直接一路enter帶過

![](firebase3.png)

這樣一來就把整個環境建立起來了，詳細的專案設定以及Realtime Database的使用方式請查閱[官方文件](https://firebase.google.com/docs/build?authuser=0&hl=zh-tw)，由於這些內容不在本篇討論範圍所以就不詳細說明。

建立專案之後，可以看到資料夾內有一個functions的資料夾，資料夾內有一支名為index.js的檔案，這支檔案就是function撰寫的地方。

![](firebase4.png)

## 開始撰寫function

在index.js中，我們可以看到他有提供一些範例程式碼如下，當中需要注意的是筆者使用的版本是v2也就是第二代，跟第一代的寫法會略有不同。

``` javascript
/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
```

其中我們會發現到exports.helloWorld的內容就是建立function的方式，也等於之後我們會用來調用的後端API，而為了能夠被ajax所調用，我們需要使用**onRequest**這個函式，使用方法如下

``` javascript
const {onRequest, onCall} = require("firebase-functions/v2/https");
const {setGlobalOptions} = require("firebase-functions/v2");
const logger = require("firebase-functions/logger");

setGlobalOptions({region: "asia-east1"}); // 設定資料中心

// 將數字加上隨機數字1-1000
exports.addRandomNumber = onRequest({
    cors: true, // 允許跨域
  }, (req, res) => {
    const {number} = req.body;
    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    const result = parseInt(number, 10) + randomNumber;
    res.status(200).send({result}); // 將結果回傳給使用者
});

```

functions因為儲存在google的雲端運算中心，所以為了得到最好的響應速度，建議設定離自己或是客戶較為接近的資料中心，筆者這裡是設定為 **asia-east1(台灣)** ，若想使用其他的資料中心[**請參考**](https://firebase.google.com/docs/functions/locations)。
上面的程式裡簡單寫了一個function，功能是只要帶數字進來，就會隨機加上一個1-1000的數字並回傳。

寫完function後，需要將function部署到雲端，請使用以下指令

``` bash
 firebase deploy --only functions
```

![](firebase7.png)

部署成功之後，回到Firebase後台會發現以下的畫面，內容包含了請求所需的網址

![](firebase8.png)

這個網址可以使用 **GET** 、 **POST** 、 **PUT** 、 **DELETE** 和 **OPTIONS** 的HTTP方法進行調用，由於這個function使用req.body接收資料，所以這裡筆者選用POST的方式進行測試。

![](firebase9.png)

使用Postman測試可以發現確實回傳給我隨機的數字，這樣就代表成功了！

## 補充：如何搭配Realtime Database

若希望在function內使用Realtime Database做資料的存取，可以使用firebase-admin來協助將資料寫入資料庫

```javascript
const {onCall, HttpsError} = require("firebase-functions/v2/https");
const {setGlobalOptions} = require("firebase-functions/v2");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");

// Initialize the app
admin.initializeApp();

setGlobalOptions({region: "asia-east1"});
```

這裡將先前的function修改成會將結果寫入資料庫，主要就是使用 **const db = admin.database();** 來將資料庫引入，再執行寫入。

``` javascript
// 將數字加上隨機數字1-1000，並存入資料庫
exports.addRandomNumber = onRequest({
    cors: true, // 允許跨域
  }, async(req, res) => {
    const {number} = req.body;
    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    const result = parseInt(number, 10) + randomNumber;
    const db = admin.database(); // 引入Realtime Database
    const numberRef = db.ref(`number`); // 定義寫入路徑
    await numberRef.set(result); // 寫入Realtime Database
    res.status(200).send({result});
});
```

修改完成後，再使用Postman進行調用，會發現資料庫的數值確實被修改了

![](firebase10.png)

**※注意：由於Firebase經常在更新，所以有些內容可能會已過時，若有錯誤還煩請各位朋友告知！**

以上就是這次的全部內容，感謝看到這裡的你！

參考資料：
[官方文件](https://firebase.google.com/docs/functions)