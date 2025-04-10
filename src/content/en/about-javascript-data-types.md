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

## JavaScript Has Two Main Data Types: "Primitive Values" and "Objects"

Primitive values include String, Boolean, Number, BigInt, Undefined, Null, and Symbol. They are immutable, meaning we cannot change the value itself. When you want to update the data, you can only create a new value to replace the old one.

Objects include Array, Function, and Objects. They are mutable and exist as references. When we mutate an object or array in a variable, the reference itself doesn't change—only the content is modified. Therefore, when you want to change a variable's reference or prevent existing object or array content from being modified, you should create an entirely new object or array to replace the existing one.

## To Identify a Variable's Data Type, You Can Use the typeof Operator

However, there's one exception: typeof null returns "object". This is a historical artifact in JavaScript. Because the cost of fixing this bug would be too high, this error still persists to this day.

Note that typeof function () { } returns "function", but typeof [ ] returns "object". So to determine whether a variable is an object or an array, you should use Array.isArray() or Object.prototype.toString.call() methods.

Below are examples of Array.isArray() and Object.prototype.toString.call() methods:

<picture>
  <source srcset="/images/article-contents/webp/about-javascript-data-types/code-1.webp" type="image/webp">
  <img src="/images/article-contents/png/about-javascript-data-types/code-1.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

<picture>
  <source srcset="/images/article-contents/webp/about-javascript-data-types/code-2.webp" type="image/webp">
  <img src="/images/article-contents/png/about-javascript-data-types/code-2.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

## Reference

[What Are the Primitive Types in JavaScript? How To Check the Type of a Variable?｜ ExplainThis](https://www.explainthis.io/en/swe/js-data-types)
