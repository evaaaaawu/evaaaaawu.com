---
title: About JavaScript Data Types
subtitle: "JavaScript has two main data types: primitives and objects. Primitives include String, Boolean, Number, BigInt, Undefined, Null, and Symbol; objects include Array, Function, and Objects."
author: src/content/authors/eva.json
imageWebp: /images/articles/webp/about-javascript-data-types.webp
imagePng: /images/articles/png/about-javascript-data-types.png
imgAlt: About JavaScript Data Types
creationDate: 2024-11-03
updateDate: 2024-11-03
tags:
  - JavaScript
featured: false
---

JavaScript has two main data types: primitives and objects. Primitives include String, Boolean, Number, BigInt, Undefined, Null, and Symbol. They are immutable, meaning we cannot change the value itself. When you want to update data, you can only "create a new value to replace the old one." Objects include Array, Function, and Objects. They are mutable and exist as references. So when we mutate an object or array in a variable, the reference of that variable doesn't change, only the content is modified. Therefore, when you want to change a variable's reference or avoid modifying the content of an existing object or array, you should create a brand new object or array to replace the old one.

To identify a variable's data type, you can use the typeof method. However, there's one exception: typeof null returns "object," which is a historical artifact in JavaScript. Because the cost of fixing this bug was too high, this error still exists today. Another thing to note is that typeof function () { } returns "function," but typeof [ ] returns "object." So to determine whether a variable is an object or an array, you should use the Array.isArray() or Object.prototype.toString.call() method.

Here are examples of Array.isArray() and Object.prototype.toString.call() methods:

<picture>
  <source srcset="/images/article-contents/webp/about-javascript-data-types/code-1.webp" type="image/webp">
  <img src="/images/article-contents/png/about-javascript-data-types/code-1.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

<picture>
  <source srcset="/images/article-contents/webp/about-javascript-data-types/code-2.webp" type="image/webp">
  <img src="/images/article-contents/png/about-javascript-data-types/code-2.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

## Reference

[JavaScript 有哪些資料型別 (data types)? 該怎麼辨別一個變數的資料型別?｜ ExplainThis](https://www.explainthis.io/zh-hant/swe/js-data-types)
