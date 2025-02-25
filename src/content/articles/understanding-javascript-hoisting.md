---
title: JavaScript 的提升(Hoisting)
subtitle: 提升是形容 JavaScript 編譯階段將變數和函式的宣告存入記憶體的概念。
author: src/content/authors/eva.json
imageWebp: /images/articles/webp/understanding-javascript-hoisting.webp
imagePng: /images/articles/png/understanding-javascript-hoisting.png
imgAlt: Understanding JavaScript Hoisting
creationDate: 2024-12-08
updateDate: 2024-12-08
tags:
  - JavaScript
featured: false
---

提升(Hoisting)是用來形容 JavaScript 編譯階段將變數和函式的宣告存入記憶體的概念。其中 var 的提升(hoisting)是指在編譯階段，JavaScript 引擎會將所有的 var 變數宣告提升到該函式作用域的頂端，只不過雖然變數宣告被提升了，但並不會賦值，所以如果提早呼叫該變數會出現 undefined；至於 let/const，如果我們再宣告前就使用會出現 ReferenceError 的錯誤，這會讓人誤以為 let/const 不會提升(hoisting)，但其實 let/const 同樣會有提升(hoisting)的行為，只是和 var 的提升(hoisting)有兩個差異：

- var 會提升到函式作用域(function scope)，但 let/const 只會提升到區塊作用域(block scope)。

- var 在創建變數與定義變數範圍時，會同時將變數值自動初始化為 undefined；但當 let/const 在提升變數到區塊作用域(block scope)範圍時，並不會初始化此變數，這個狀態可以稱之為 uninitialized，也有另一個常見的說法是，let/const 定義的變數目前存在於暫時死區(TDZ, Temporal dead zone)。暫時死區(TDZ, Temporal dead zone)錯誤最主要是為了 const 所設計的，因為如果 const 的提升行為與 var 相同，當我們在宣告前就使用 const 宣告的變數時，會拿到 undefined 的值，但是因為 const 是常數，照規定來說同個作用域中值不應該變動，所以如果先拿到 undefined 後再拿到不同值的設計會不符合規範，因此才要設計暫時死區的錯誤來避免這種情況發生。

再來是函式的宣告也會有提升，與 var 提升的差異是函式提升也會創建好函式物件，因此可以在宣告前呼叫。

但函式提升要注意的是，如果是函式表達式，提升行為會與它宣告的變數一樣，所以如果用 var 宣告的 foo 函式，在宣告前使用時，當時值會是 undefined，因此呼叫 undefined 會報錯：

```js
foo(); // Uncaught TypeError: foo is not a function
var foo = function () {};
```

用 let 宣告的 foo 函式，在宣告前使用時，此時 foo 在暫時死區，因此呼叫 foo 會報錯：

```js
foo(); // Uncaught ReferenceError: foo is not defined
let foo = function () {};
```

## Reference

[什麼是提升 (Hoisting)？｜ExplainThis](https://www.explainthis.io/zh-hant/swe/hoisting)
