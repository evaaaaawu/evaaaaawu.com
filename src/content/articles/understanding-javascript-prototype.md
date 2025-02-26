---
title: JavaScript 原型(prototype)相關
subtitle: 在 JavaScript 中，原型(prototype)是物件導向程式語言中非常重要的概念，它們是 JavaScript 中實現繼承和屬性共享的關鍵。
author: src/content/authors/eva.json
imageWebp: /images/articles/webp/understanding-javascript-prototype.webp
imagePng: /images/articles/png/understanding-javascript-prototype.png
imgAlt: Understanding JavaScript Prototype
creationDate: 2024-10-16
updateDate: 2024-10-16
tags:
  - JavaScript
featured: false
---

## 原型(`prototype`)

JavaScript 是一個以「原型」為基礎的物件導向程式語言。在 JavaScript 中，每個物件都包含了一個  `[[Prototype]]`  內部隱藏屬性，這個屬性對應到的就是該物件的原型(`prototype`)，值有可能是  null  或是指向另一個物件。

## `[[Prototype]]`  和 `__proto__`

在 JavaScript 中，每個物件都包含了一個  `[[Prototype]]`  內部隱藏屬性，這個屬性對應到的就是該物件的原型(`prototype`)，值有可能是  null  或是指向另一個物件。

因為  `[[Prototype]]`  為內部隱藏屬性並無法直接被訪問到，所以瀏覽器提供了 `__proto__`  的訪問方法。但要注意的是，`__proto__`  方法並不在 ECMAScript 規範中，實際上開發要取得物件的原型會使用  `Object.getPrototypeOf`。

`prototype`、`__proto__`、`Object.getPrototypeOf` 方法實作範例：

```js
// Person 是一個構造函式
function Person() {}
// 透過 Person 構造函式，創建了一個 personA 對象
const personA = new Person();

// 透過 __proto__ 方式，查看 personA 的原型
console.log(personA.__proto__); // {constructor: ƒ}
// personA 物件可以透過 __proto__ 方法訪問到它的原型
personA.__proto__ === Person.prototype; // true
Object.getPrototypeOf(personA) === Person.prototype; // true
personA.__proto__ === Object.getPrototypeOf(personA); // true
```

## `__proto__`  屬性和  `prototype`  屬性

`__proto__`  和  `prototype`  是不同的屬性。 `__proto__`  是每個物件的一個隱藏屬性，每個物件可以由  `__proto__`  訪問到它的原型。而  `prototype`  是存在於所有構造函式中的一個屬性，構造函式的  `prototype`  其實和  `__proto__`  會指向同一個地方的，這個地方就叫做原型對象。

```js
// Person 是一個構造函式
function Person() {}
// 透過 Person 構造函式，創建了一個 personA 對象
const personA = new Person();

personA.__proto__ === Person.prototype; // true
```

## 原型鏈(prototype chain)

原型(prototype)本身是一種物件，因此它也擁有自己的原型。當我們試圖訪問某個物件的屬性時，如果這個物件沒有所需的屬性，它會在其原型(prototype)中尋找。如果原型(prototype) 中仍然沒有找到，它將會繼續往上一層查找，直到找到，或者到達 null 為止。這條連續的路徑被稱為原型鏈(prototype chain)，鏈的終點值為  null。

- 原型鏈(prototype chain)的終點值為  null:

  ```js
  personA.__proto__.__proto__.__proto__ === null;
  ```

- 原型鏈(prototype chain)的實作範例:

  我們經常使用陣列的  filter  方法。假設現在有一個陣列 「list」，我們在這個陣列上使用  filter  方法。但事實上，filter  方法並不存在於這個 list，它存在於  Array  這個構造函式上。我們今天能使用  filter  方法，也是通過原型鏈 (prototype chain)  實現的。

## 原型繼承(prototypal inheritance)

原型繼承可以讓本來沒有某個屬性的物件去存取其他物件的屬性。所以假設今天有一個物件 「animal」，這個物件擁有自己的屬性和方法。同時我們又想建立兩個基於 「animal」 的物件，分別為分別為「cat」和「dog」，這兩個物件會有一些獨特的方法和屬性，但同時又需要用到「animal」物件的方法和屬性。在這樣的情境下，我們不需要透過複製或重新實現，可以透過原型繼承來達成這個目的。

原型繼承(prototypal inheritance)實作範例：

```js
// 構造函式 Animal
function Animal() {}

// 實例
const cat = new Animal();

// 往原型對象加上方法
Animal.prototype.sleep = function () {
  console.log("sleep");
};

// 使用構造函式的 prototype 的方法
cat.sleep(); // sleep
```

## Reference

[原型 (prototype)、原型鏈 (prototype chain) 、原型繼承 (prototypal inheritance)｜ ExplainThis](https://www.explainthis.io/zh-hant/swe/most-common-js-prototype-questions)
