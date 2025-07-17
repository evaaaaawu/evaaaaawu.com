---
title: First-Class、Higher-Order 與 First-Order Function
subtitle: 介紹三個看起來很像、容易混淆的專有名詞，並比較它們之間的關係。
author: src/content/authors/eva.json
imageWebp: /images/articles/webp/first-class-vs-higher-order-vs-first-order-function.webp
imagePng: /images/articles/png/first-class-vs-higher-order-vs-first-order-function.png
imgAlt: First-Class v.s. Higher-Order v.s. First-Order Function
creationDate: 2025-07-17
updateDate: 2025-07-17
tags:
  - JavaScript
featured: true
---

First-Class Function(一級函式)、Higher-Order Function(高階函式) 與 First-Order Function(一階函式) 這三個專有名詞看起來很像，非常容易造成混淆，因此這篇文章要來好好的介紹這三個專有名詞是什麼，以及比較它們之間的關係。

## First-Class Function(一級函式)：函式即是值

First-Class Function(一級函式) 是程式語言設計中的一個重要概念，指的是程式語言將函式當作「第一等公民」來對待，具有與其他資料型別相同的權利和能力。

換句話說，當函式在該程式語言中可以被視為跟其他的變數一樣輸入或輸出時，我們會稱那樣的程式語言擁有一級函式。

具體來說，擁有一級函式的函式具備以下能力：

1. **可以賦值給變數**

2. **可以作為參數傳遞**

3. **可以作為回傳值**

4. **可以在執行時期建立**

5. **可以儲存在資料結構中**

以 JavaScript 為例，我們可以再更具體的參考以下程式碼：

```javascript
// 1. 可以儲存在變數中
const greet = function (name) {
  return `Hello, ${name}!`;
};

// 2. 可以作為參數傳遞
function executeFunction(fn, value) {
  return fn(value);
}

// 3. 可以作為回傳值
function createMultiplier(factor) {
  return function (number) {
    return number * factor;
  };
}

// 4. 可以在 runtime(執行時期) 建立
const dynamicFunction = new Function("x", "y", "return x + y");

// 5. 可以儲存在資料結構中
const operations = {
  add: (a, b) => a + b,
  multiply: (a, b) => a * b,
};
```

而大多數的現代程式語言都有支持一級函式，例如 JavaScript，Python 等。這讓函式變得極其靈活，開啟了 Higher-Order Functions(高階函式)、Callbacks(回調函式)、Closures(閉包) 等強大的程式設計模式。

## Higher-Order Function(高階函式)：操作函式的函式

Higher-Order Function(高階函式) 簡單來說就是：以函式為參數或回傳函式的函式。

它的核心特性如下：

1. 函式是 first-class citizens(一等公民)：可以被當作 value 傳遞

2. 抽象化 pattern：將重複的邏輯抽取出來

3. 組合性：小函式組合成複雜的功能

這是 functional programming 的核心概念，它是一種思維模式，讓你的程式碼可以更加模組化、可重用和可組合。

## First-Order Function(一階函式)：基礎函式

First-Order Function(一階函式) 指的是「不接受函式作為參數，也不回傳函式」的普通函式。

這是相對於 Higher-Order Function(高階函式) 的概念。

具體範例如下：

```javascript
// First-Order Functions - 只處理基本資料型別
function add(a, b) {
  return a + b;
}

function square(x) {
  return x * x;
}

function getName(user) {
  return user.name;
}
```

## 三者關係與比較

總結來說：

1. First-Class Function 是語言特性，不是函式的分類，它讓函式可以被當作值來操作，是實現 Higher-Order Function 的基礎。

2. Higher-Order Function 接受函式作為參數或返回函式，是建立在 First-Class Function 的特性之上，提供強大的抽象能力。

3. First-Order Function 是不涉及函式操作的普通函式，為最基礎的函式形式，通常是業務邏輯的具體實現。

理解這三個概念的關鍵在於：First-Class Function 是**語言特性**，Higher-Order Function 是**設計模式**，First-Order Function 是**基礎實現**。在實際開發中，它們相輔相成，共同構成了現代 JavaScript/TypeScript 開發的核心。
