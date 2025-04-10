---
title: Understanding var, let and const in JavaScript
subtitle: var, let, and const are reserved keywords used for variable declaration in JavaScript. Initially, only var was available until ES6 introduced let and const.
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

var, let, and const are reserved keywords used for variable declaration in JavaScript. Initially, only var was available until ES6 introduced let and const.

When comparing var with let/const, there are three main differences:

## 1. Scope: var vs let/const

var can be global or function-scoped, while let and const are block-scoped. When we declare a variable with var at the outermost level of a file, its scope becomes global. For example, when we enter in the console:

`var greeting = "hello";`

We can then access it as:

`window.greeting;` // "hello"

The result will be "hello", but using let or const won't have the same effect. Besides global scope, var's scope within a function is limited to that function.

## 2. Redeclaration: var vs let/const

var can be redeclared, but let and const cannot. With var, you can do the following:

<picture>
  <source srcset="/images/article-contents/webp/understanding-var-let-and-const-in-javascript/code-1.webp" type="image/webp">
  <img src="/images/article-contents/png/understanding-var-let-and-const-in-javascript/code-1.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

let cannot be redeclared, but it can be reassigned:

<picture>
  <source srcset="/images/article-contents/webp/understanding-var-let-and-const-in-javascript/code-2.webp" type="image/webp">
  <img src="/images/article-contents/png/understanding-var-let-and-const-in-javascript/code-2.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

## 3. Hoisting and Initialization

Variables declared with var are automatically initialized with undefined, so using them before declaration won't cause an error but will return undefined:

<picture>
  <source srcset="/images/article-contents/webp/understanding-var-let-and-const-in-javascript/code-3.webp" type="image/webp">
  <img src="/images/article-contents/png/understanding-var-let-and-const-in-javascript/code-3.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

In contrast, let and const enter a Temporal Dead Zone (TDZ), so using them before declaration will result in an error:

<picture>
  <source srcset="/images/article-contents/webp/understanding-var-let-and-const-in-javascript/code-4.webp" type="image/webp">
  <img src="/images/article-contents/png/understanding-var-let-and-const-in-javascript/code-4.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

## Comparing let and const

let and const are similar in most aspects, but their main difference is that variables declared with let can be reassigned, while those declared with const cannot.

It's important to note that this difference applies to "reassignment," not to changing a variable's value. If the variable holds a primitive value (like strings or numbers), neither let nor const can change it after declaration. However, if the variable references an object, both let and const allow changes to the object's properties after declaration.

For example, this is valid:

<picture>
  <source srcset="/images/article-contents/webp/understanding-var-let-and-const-in-javascript/code-5.webp" type="image/webp">
  <img src="/images/article-contents/png/understanding-var-let-and-const-in-javascript/code-5.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

As for when to use let versus const, there's no definitive answer. Current industry practice generally favors using const in most cases and only using let when reassignment is necessary.

## Reference

[What Is the Difference Between var, let and const in JavaScript?｜ ExplainThis](https://www.explainthis.io/en/swe/js-var-let-const-in-javascript)
