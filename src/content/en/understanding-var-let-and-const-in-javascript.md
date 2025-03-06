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

## 1. In terms of scope, var can be global or function-scoped, while let and const are block-scoped.

In terms of scope, var can be global or function-scoped, while let and const are block-scoped. When we use var to declare a variable at the outermost level of a file, its scope becomes global. Therefore, when we enter in the console:

`var greeting = "hello";`

We can then enter:

`window.greeting;` // "hello"

The result will be "hello", but using let or const won't have the same effect. Besides global scope, var's scope within a function is limited to that function.

## 2. In terms of declaration, var can be redeclared, but let and const cannot.

In terms of declaration, var can be redeclared, but let and const cannot. So when using var, you can do the following:

<picture>
  <source srcset="/images/article-contents/webp/understanding-var-let-and-const-in-javascript/code-1.webp" type="image/webp">
  <img src="/images/article-contents/png/understanding-var-let-and-const-in-javascript/code-1.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

let cannot be redeclared, but it can be reassigned, so it works like this:

<picture>
  <source srcset="/images/article-contents/webp/understanding-var-let-and-const-in-javascript/code-2.webp" type="image/webp">
  <img src="/images/article-contents/png/understanding-var-let-and-const-in-javascript/code-2.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

## 3. In terms of hoisting, variables declared with var are automatically initialized with undefined, so using the variable before its declaration won't cause an error but will return undefined; however, variables declared with let and const are not automatically initialized and enter a Temporal Dead Zone (TDZ), so using them before declaration will result in an error.

In terms of hoisting, variables declared with var are automatically initialized, so using the variable before its declaration won't cause an error but will return undefined, like this:

<picture>
  <source srcset="/images/article-contents/webp/understanding-var-let-and-const-in-javascript/code-3.webp" type="image/webp">
  <img src="/images/article-contents/png/understanding-var-let-and-const-in-javascript/code-3.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

But let and const don't behave this way. Instead, they enter a Temporal Dead Zone (TDZ), so using them before declaration will result in an error:

<picture>
  <source srcset="/images/article-contents/webp/understanding-var-let-and-const-in-javascript/code-4.webp" type="image/webp">
  <img src="/images/article-contents/png/understanding-var-let-and-const-in-javascript/code-4.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

## When comparing let and const, the main difference is that variables declared with let can be reassigned, while those declared with const cannot.

let and const are similar in most aspects, but their main difference is that variables declared with let can be reassigned, while those declared with const cannot.

It's important to note that this difference is about "reassignment," not about changing a variable's value. If the variable is a primitive value (like strings or numbers), neither let nor const can change it after declaration. However, if the variable is an object, both let and const allow changes to the object's properties after declaration.

So the following example is valid:

<picture>
  <source srcset="/images/article-contents/webp/understanding-var-let-and-const-in-javascript/code-5.webp" type="image/webp">
  <img src="/images/article-contents/png/understanding-var-let-and-const-in-javascript/code-5.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

As for when to use let versus const, there's no standard answer. The current industry perspective generally favors using const in most cases and only using let when reassignment is necessary.

## Reference

[What's the difference between var, let, and const in JavaScript? When should you use which one? | ExplainThis](https://www.explainthis.io/zh-hant/swe/js-var-let-const-in-javascript)
