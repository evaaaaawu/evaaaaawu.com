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

Hoisting is a concept used to describe how JavaScript stores variable and function declarations in memory during the compilation phase. For variables declared with `var`, hoisting means that during compilation, the JavaScript engine moves all `var` variable declarations to the top of their function scope. However, while the variable declarations are hoisted, they are not assigned values, so if you call such a variable early, you'll get `undefined`. As for `let/const`, if we use them before declaration, we'll get a `ReferenceError`, which might lead people to think that `let/const` don't hoist. In fact, `let/const` do exhibit hoisting behavior, but there are two key differences from `var` hoisting:

- `var` is hoisted to function scope, but `let/const` are only hoisted to block scope.

- When creating variables and defining their scope, `var` automatically initializes the variable value to `undefined`. However, when `let/const` hoist variables to block scope, they don't initialize these variables. This state can be called "uninitialized," and there's another common term for it: the variable exists in a Temporal Dead Zone (TDZ). The TDZ error was primarily designed for `const`, because if `const` hoisting behavior were the same as `var`, when we use a variable declared with `const` before its declaration, we would get `undefined`. But since `const` is a constant, by definition its value should not change within the same scope. Therefore, a design that first gives `undefined` and then a different value would not comply with the specification, which is why the TDZ error was designed to prevent this situation.

Next, function declarations are also hoisted. The difference from `var` hoisting is that function hoisting also creates the function object, so you can call it before its declaration.

However, it's important to note that if it's a function expression, the hoisting behavior will be the same as the variable it's declared with. So if a function `foo` is declared with `var`, when used before declaration, its value at that time will be `undefined`, and calling `undefined` will result in an error:

<!-- ```js
foo(); // Uncaught TypeError: foo is not a function
var foo = function () {};
``` -->

<picture>
  <source srcset="/images/article-contents/webp/understanding-javascript-hoisting/code-1.webp" type="image/webp">
  <img src="/images/article-contents/png/understanding-javascript-hoisting/code-1.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

For a function `foo` declared with `let`, when used before declaration, `foo` is in the temporal dead zone, so calling `foo` will result in an error:

<!-- ```js
foo(); // Uncaught ReferenceError: foo is not defined
let foo = function () {};
``` -->

<picture>
  <source srcset="/images/article-contents/webp/understanding-javascript-hoisting/code-2.webp" type="image/webp">
  <img src="/images/article-contents/png/understanding-javascript-hoisting/code-2.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

## Reference

[What is Hoisting? | ExplainThis](https://www.explainthis.io/zh-hant/swe/hoisting)
