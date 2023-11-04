---
title: TypeScript入門：什麼是TypeScript？
date: 2023-03-05 23:45:21
tags: 
- TypeScript
- JavaScript
---

![](cover.jpg)

## 簡介

隨著JavaScript在網頁開發中的使用越來越普及，TypeScript作為JavaScript的靜態超集，也開始受到越來越多的關注。TypeScript由Microsoft開發，是一種開源的程式語言，通常被稱為JavaScript的超集，它通過為JavaScript添加類型定義和其他功能來擴展JavaScript的功能。

<!-- more -->

## 類型定義

JavaScript是一種動態語言，這意味著開發人員不需要指定變量的數據類型。這可能會導致錯誤，特別是在大型項目中。TypeScript解決了這個問題，它允許開發人員指定變量的數據類型。這樣可以減少錯誤，提高程式的可讀性和可維護性。

## 其他功能

TypeScript還提供了其他一些功能，例如類型推斷、接口、泛型和枚舉。這些功能可以使程式更加清晰和容易理解，並且可以大大提高開發人員的生產力。例如，泛型可以使函數更加靈活，並且可以在不同類型的數據上進行操作。

## 總結

TypeScript是一種高效的程式語言，它通過為JavaScript添加類型定義和其他功能來擴展JavaScript的功能。類型定義可以減少錯誤，提高程式的可讀性和可維護性，而其他功能可以使程式更加清晰和容易理解，並且可以大大提高開發人員的生產力。如果你是一個JavaScript開發人員，那麼學習TypeScript肯定會使你的生活更加輕鬆。

## 使用案例

假設你正在開發一個簡單的計算機應用程序，用戶可以輸入兩個數字和一個運算符（加、減、乘、除），然後應用程序將返回計算結果。在使用 TypeScript 的情況下，你可以使用以下程式來實現這個功能：

``` typescript
type Operator = '+' | '-' | '*' | '/'; // 自訂型別只能是這些字串

function calculate(operator: Operator, num1: number, num2: number): number {
  switch (operator) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      return num1 / num2;
    default:
      throw new Error('Invalid operator');
  }
}

const num1 = 10; // 第一個數字
const num2 = 5; // 第二個數字
const operator = '+'; // 運算符

const result = calculate(operator, num1, num2); // 結果

console.log(`${num1} ${operator} ${num2} = ${result}`); // 輸出
```

這段程式定義了一個 calculate 函數，三個參數分別為：一個運算符和兩個數字。根據運算符，這個函數將執行相應的計算，然後返回結果。這個程式還定義了一個 Operator 類型，它只允許 '+'、'-'、'*' 或 '/' 中的一個值。
這個 TypeScript 程式使用了基本的 TypeScript 語法，包括類型定義、函數定義、switch 語句和錯誤處理。初學者可以通過閱讀這個程式來理解 TypeScript 的基本概念和用法。

<br>
<hr>

## 我的相關案例

[日記盒DiaryBox](https://github.com/tatdt622989/diary-box) - 一款將日記與3D結合的網頁應用程式，可以讓使用者在虛擬空間中寫下自己的心情和生活點滴，並使用各種貼圖和手繪功能來裝飾日記
