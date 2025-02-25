---
title: JavaScript 的作用域(Scope)與作用域鏈(Scope Chain)
subtitle: 作用域就像是範圍的概念，可以分成全域、函式作用域和塊級作用域。
author: src/content/authors/eva.json
imageWebp: /images/articles/webp/javascript-scope-and-scope-chain-explained.webp
imagePng: /images/articles/png/javascript-scope-and-scope-chain-explained.png
imgAlt: JavaScript Scope and Scope Chain Explained
creationDate: 2024-12-01
updateDate: 2024-12-01
tags:
  - JavaScript
featured: false
---

作用域就像是範圍的概念，所以一個值（value）或者一個表達式（expression）可以被使用和找到的範圍，我們就叫做作用域。

在 JavaScript 中，作用域可以分成全域、函式作用域和塊級作用域。

- 全域是指當 JavaScript 程式碼被執行一開始時，就會創建一個全域執行環境，被定義在函式或塊級以外的變數，就會屬於全局作用域，這些變數也被稱之為全域變數 (Global variable)，在程式碼中的任何地方都能被使用到。

- 函式作用域是指由函式所創建的作用域。

- 塊級作用域是 ES6 後才出現的，它會被定義在一個中括號的塊級中，但要注意的是，只有  let  和  const  定義的變數會屬於塊級作用域，如果是  var  定義的變數會是只有函式作用域。

作用域鏈指的是當 JavaScript 使用每一個變數的時候，會先嘗試在當前作用域中尋找該變數，若在當前的作用域找不到該變數，會一直往父層作用域尋找，直到全局作用域還是沒找到，就會直接報錯，而這一層一層的關係，就是作用域鏈。

作用域鏈(Scope Chain)可以透過以下程式碼來了解：

```js
let a = 100;
function find() {
  // 在 find 函式作用域中沒有變數 a，於是透過作用域鏈往父層尋找，
  // 在這邊的父層是全域，也就找到了 a 變數
  console.log(a); // 100
}
find();
```

## Reference

[Javascript 的作用域 (Scope) 與作用域鏈 (Scope Chain) 是什麼?｜ ExplainThis](https://www.explainthis.io/zh-hant/swe/what-is-scope-and-scope-chain)
