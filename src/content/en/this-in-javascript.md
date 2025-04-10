---
title: This in JavaScript
subtitle: In JavaScript, the value of 'this' is dynamic and typically determined by how a function is called. Therefore, what affects the value of 'this' is not when it's declared, but where it's invoked.
author: src/content/authors/eva.json
imageWebp: /images/articles/webp/this-in-javascript.webp
imagePng: /images/articles/png/this-in-javascript.png
imgAlt: This in JavaScript
creationDate: 2024-10-15
updateDate: 2024-10-15
tags:
  - JavaScript
featured: false
---

In JavaScript, the value of `this` is dynamic and typically determined by how a function is called. This means that what affects the value of `this` is not when it's declared, but where it's invoked.

There are 5 ways to determine the value of `this`:

1. In a regular function call, `this` refers to the global object (the `Window` object in browsers in non-strict mode, or `undefined` in strict mode).

2. When a function is called as a method of an object, `this` refers to that object.

3. When a function is called with the `new` keyword, a new object is created before the function executes, and `this` refers to this newly created object.

4. We can also use the `apply`, `call`, and `bind` methods to explicitly specify which object `this` should refer to.

5. Arrow functions, introduced in ES6, don't have their own `this` value. Instead, they inherit `this` from the nearest outer function. If that outer function is also an arrow function, it will continue looking up the scope chain. This process continues until it finds the default `this` value in the global environment (e.g., `window` in browsers).

## Reference

[What Is "this" in JavaScript?｜ ExplainThis](https://www.explainthis.io/en/swe/what-is-this)
