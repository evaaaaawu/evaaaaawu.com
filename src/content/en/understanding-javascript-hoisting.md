---
title: Understanding JavaScript Hoisting
subtitle: Hoisting is a concept that describes how JavaScript stores variable and function declarations in memory during the compilation phase.
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

Hoisting is a concept that describes how JavaScript stores variable and function declarations in memory during the compilation phase. For variables declared with `var`, hoisting moves these declarations to the top of their function scope during compilation. However, while variable declarations are hoisted, their values are not assigned. This means if you access such a variable before its assignment, you'll get `undefined`.

When using variables declared with `let/const` before their declaration, we encounter a `ReferenceError`. This might lead people to believe that `let/const` don't hoist. In fact, `let/const` do exhibit hoisting behavior, but with two key differences from `var`:

- Variables declared with `var` are hoisted to function scope, whereas `let/const` variables are only hoisted to block scope.

- During hoisting, `var` automatically initializes variables with the value `undefined`. In contrast, `let/const` declarations are hoisted without initialization. This "uninitialized" state is commonly referred to as the Temporal Dead Zone (TDZ). The TDZ error was primarily designed for `const` variables. If `const` followed the same hoisting behavior as `var`, using a `const` variable before its declaration would return `undefined`. However, since constants should never change value within their scope, initially returning `undefined` and later a different value would violate this principle. The TDZ error prevents this inconsistency.

Function declarations are also hoisted. Unlike variables, function hoisting creates the complete function object, allowing you to call functions before they appear in your code.

It's important to note that function expressions behave differently. Their hoisting behavior matches the variable type they're declared with. For example, if a function `foo` is declared as a variable with `var`, accessing it before the declaration will yield `undefined`, and attempting to call `undefined` results in an error:

<picture>
  <source srcset="/images/article-contents/webp/understanding-javascript-hoisting/code-1.webp" type="image/webp">
  <img src="/images/article-contents/png/understanding-javascript-hoisting/code-1.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

Similarly, for a function `foo` declared with `let`, accessing it before declaration places it in the temporal dead zone, resulting in a reference error:

<picture>
  <source srcset="/images/article-contents/webp/understanding-javascript-hoisting/code-2.webp" type="image/webp">
  <img src="/images/article-contents/png/understanding-javascript-hoisting/code-2.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

## Reference

[Explain What Hoisting Is in JavaScript ｜ ExplainThis](https://www.explainthis.io/en/swe/hoisting)
