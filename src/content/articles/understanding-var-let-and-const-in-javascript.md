---
title: 關於 JavaScript 中的 var、let 和 const
subtitle: var、let 和 const 都是在 JavaScript 用來做變數宣告的保留字，早期原本只有 var，直到 ES6 後才加入了 let 和 const。
author: src/content/authors/eva.json
imageWebp: /images/articles/webp/understanding-var-let-and-const-in-javascript.webp
imagePng: /images/articles/png/understanding-var-let-and-const-in-javascript.png
imgAlt: Understanding var, let and const in JavaScript
creationDate: 2024-10-20
updateDate: 2024-10-20
tags:
  - JavaScript
featured: false
---

var、let 和 const 都是在 JavaScript 用來做變數宣告的保留字，早期原本只有 var，直到 ES6 後才加入了 let 和 const。

針對 var 和 let/const 的比較，主要有三個不同：

## 1. 在作用域上，var 可以是全域、也可以是以函式作為範圍；let 與 const 則是以區塊作為範圍。

在作用域上，var 可以是全域、也可以是以函式作為範圍，let 與 const 則是以區塊作為範圍。當我們在一個文件的最外層使用 var 來宣告變數，這時它的範圍會是全域，因此當我們在 console 當中輸入

`var greeting = "hello";`

我們可以接著輸入

`window.greeting;` // "hello"

其結果會是 hello，但是用 let 與 const 宣告則不會有同樣效果。 而除了全域，var 在某個函式中範圍則是該函式。

## 2. 在宣告上，var 可以被重複宣告，但是 let 與 const 則不行。

在宣告上，var 可以被重複宣告，但是 let 與 const 則不行。所以當使用 var 時，可以做到以下這樣：

```js
var greeting = "Hello! This ExplainThis :)";
var greeting = "ExplainThis is a website that helps you learn programming!";
```

let 則不能重複宣告，但可以重新賦值，所以會如下面這樣：

```js
// 不行這樣！不然會有 SyntaxError: Identifier 'greeting' has already been declared
let greeting = "Hello! This ExplainThis :)";
let greeting = "ExplainThis is a website that helps you learn programming!";

// 可以這樣 :)
let greeting = "Hello! This ExplainThis :)";
greeting = "ExplainThis is a website that helps you learn programming!";
```

## 3. 在提升上，var 宣告的變數會自動初始化值為 undefined，因此在宣告前就使用變數，不會出現錯誤，而會是 undefined ；但是 let 與 const 宣告的變數則不會自動初始化，而是會進到暫時死區 (TDZ)，因此在 let 與 const 宣告變數前使用該變數，會出現錯誤。

在提升上，var 宣告的變數會自動初始化，因此在宣告前就使用變數，不會出現錯誤，而會是 undefined ，例如下面這樣：

```js
console.log(greeting); // undefined
var greeting = "hi there";
```

但是 let 與 const 則不會，而是會進到暫時死區 (TDZ)，因此在 let 與 const 宣告變數前使用該變數，會出現錯誤：

```js
console.log(greeting); // Uncaught ReferenceError: greeting is not defined
let greeting = "hi there";
```

## 而針對 let 和 const 的比較，最主要的一大區別在於，用 let 宣告的變數可以重新賦值，但是用 const 的不行。

let 與 const 在絕多數面向都是一樣，兩者的一大區別在於，用 let 宣告的變數可以重新賦值，但是用 const 的不行。

特別注意，這邊指的差別是在於「賦值」，而不是改變某個變數。如果是改變某個變數，若該變數是原生值(primitive values)，例如字串、數字，let 與 const 都不能改變；但假如該變數是物件 (objects)，則不論 let 或 const 在宣告後，都仍是可以改變該物件。

所以下面這個例子是可行的：

```js
const user = { name: "小明" };
user.name = "小王";
console.log(user); // {name: '小王'}
```

至於何時用 let；何時用 const，沒有一個標準答案。業界目前普遍的觀點是多數時候都用 const，只有非得要重新賦值才用 let。

## Reference

[在 JavaScript 中用 var, let, 以及 const 有什麼差別？什麼時候該用哪個？ ｜ExplainThis](https://www.explainthis.io/zh-hant/swe/js-var-let-const-in-javascript)
