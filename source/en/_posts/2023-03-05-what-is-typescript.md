title: What Is TypeScript? A Beginner's Introduction
description: >-
  Learn TypeScript fundamentals, including static types, inference, interfaces,
  generics, enums, and a calculator example for JavaScript developers.
permalink: 2023/03/05/what-is-typescript/
translation_key: typescript-introduction
translations:
  zh-TW: /2023/03/05/TypeScript入門：什麼是TypeScript？/
  zh-CN: /zh-cn/2023/03/05/what-is-typescript/
categories:
  - Frontend Development
tags:
  - TypeScript
  - JavaScript
date: 2023-03-05 23:45:21
updated: 2026-08-27 18:25:00
---

![TypeScript and JavaScript static typing introduction cover](cover.webp)

As JavaScript has become central to web development, TypeScript has attracted increasing attention as a way to make JavaScript projects safer and easier to maintain. Developed by Microsoft as an open-source language, TypeScript extends JavaScript with static types and related language features while still compiling to ordinary JavaScript.

<!--more-->

## Static Type Definitions

JavaScript is dynamically typed, which means developers do not have to declare the data type of every variable. That flexibility is useful, but it can also allow incorrect values to travel through a program until they cause a runtime error, especially in a large codebase.

TypeScript addresses this problem by allowing developers to describe the types of variables, function parameters, and return values. The compiler can then catch many mismatches before the code reaches a browser or server. These declarations also make the intent of a program easier for teammates and development tools to understand.

## Other Useful TypeScript Features

TypeScript includes more than explicit type annotations. Type inference can determine a type from an assigned value, interfaces can describe the shape of an object, generics let a function or class work safely with several types, and enums can represent a fixed group of named values.

Together, these features help code remain clear as a project grows. They can also improve editor completion and navigation because the editor has more information about the values moving through the application.

## A Small Calculator Example

Imagine a calculator that accepts two numbers and one of four operators: addition, subtraction, multiplication, or division. TypeScript can restrict the operator parameter so that unsupported strings are rejected during development.

```typescript
type Operator = '+' | '-' | '*' | '/';

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

const num1 = 10;
const num2 = 5;
const operator: Operator = '+';

const result = calculate(operator, num1, num2);

console.log(`${num1} ${operator} ${num2} = ${result}`);
```

The **Operator** type is a union of four permitted strings. The **calculate** function then requires an **Operator**, two numbers, and promises to return a number. Passing an unsupported operator or a non-numeric argument produces a compiler error before the code runs.

This short example demonstrates several TypeScript fundamentals at once: a custom type, typed function parameters, a return type, a switch statement, and an unreachable fallback for invalid input.

## Why JavaScript Developers Learn TypeScript

TypeScript does not replace the JavaScript ecosystem. Instead, it adds a compile-time checking layer and produces JavaScript that can run in the same browsers and runtimes. A team can adopt it gradually, starting with a small file or project and increasing strictness as the codebase matures.

For JavaScript developers, the main benefit is earlier feedback. Type errors that would otherwise appear during testing or in production can often be identified directly in the editor or build process. That makes TypeScript particularly useful for applications with shared data structures, reusable components, and multiple contributors.

## Related Project

[DiaryBox](https://github.com/tatdt622989/diary-box) is a web application that combines journaling with a 3D environment. Users can record moments and decorate entries with stickers and drawings; it is one example of the type of interactive frontend project that benefits from clearer data contracts.
