---
title: JavaScript Scope and Scope Chain Explained
subtitle: Scope is like a concept of range, which can be divided into global, function scope, and block scope.
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

Scope is like a concept of range, defining the area where a value or an expression can be used and found.

In JavaScript, scope can be divided into global, function scope, and block scope.

- Global scope refers to the global execution environment created when JavaScript code begins execution. Variables defined outside of functions or blocks belong to the global scope. These variables are also called global variables and can be accessed from anywhere in the code.

- Function scope refers to the scope created by a function.

- Block scope appeared after ES6 and is defined within a pair of curly braces. It's important to note that only variables defined with `let` and `const` belong to block scope. Variables defined with `var` only have function scope.

The scope chain refers to how JavaScript looks up variables. When JavaScript uses a variable, it first tries to find it in the current scope. If the variable isn't found in the current scope, it continues searching up through parent scopes until it reaches the global scope. If the variable still isn't found in the global scope, an error is thrown. This layer-by-layer relationship is called the scope chain.

The scope chain can be understood through the following code:

<!-- ```js
let a = 100;
function find() {
  console.log(a); // 100
}
find();
``` -->

<picture>
  <source srcset="/images/article-contents/webp/javascript-scope-and-scope-chain-explained/code.webp" type="image/webp">
  <img src="/images/article-contents/png/javascript-scope-and-scope-chain-explained/code.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

## Reference

[Javascript 的作用域 (Scope) 與作用域鏈 (Scope Chain) 是什麼?｜ ExplainThis](https://www.explainthis.io/zh-hant/swe/what-is-scope-and-scope-chain)
