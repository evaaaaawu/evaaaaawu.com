---
title: JavaScript Scope and Scope Chain Explained
subtitle: Scope is the concept that determines where variables are accessible within your code, including global, function, and block scopes.
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

Scope determines where variables are accessible and can be referenced within your code.

In JavaScript, scope can be divided into three types: global, function, and block scope.

- Global scope refers to the execution environment created when JavaScript code begins running. Variables defined outside of any function or block belong to the global scope. These global variables can be accessed from anywhere in your code.

- Function scope refers to the environment created by a function declaration. Variables defined inside a function are only accessible within that function and any nested functions. They cannot be accessed from outside the function where they're declared.

- Block scope was introduced in ES6 and is defined within a pair of curly braces `{}`. Note that only variables declared with `let` and `const` respect block scope. Variables declared with `var` only have function scope and ignore block boundaries.

The scope chain describes how JavaScript looks up variables during execution. When code references a variable, JavaScript first searches for it in the current scope. If not found, it continues searching upward through parent scopes until reaching the global scope. If the variable isn't found in the global scope, JavaScript throws a reference error. This hierarchical lookup process forms the scope chain.

You can see the scope chain in action through this example:

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

In this example, when the `find()` function tries to access variable `a`, it doesn't find it in its local scope. JavaScript then looks up the scope chain and finds `a` in the global scope, successfully logging the value `100`.

## Reference

[What Is the Scope and Scope Chain of JavaScript?｜ ExplainThis](https://www.explainthis.io/en/swe/what-is-scope-and-scope-chain)
