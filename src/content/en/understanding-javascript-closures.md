---
title: Understanding JavaScript Closures
subtitle: A closure is when an inner function can access variables from an outer function and remembers these variables.
author: src/content/authors/eva.json
imageWebp: /images/articles/webp/understanding-javascript-closures.webp
imagePng: /images/articles/png/understanding-javascript-closures.png
imgAlt: Understanding JavaScript Closures
creationDate: 2024-12-08
updateDate: 2024-12-08
tags:
  - JavaScript
featured: false
---

## What is a Closure?

A closure is when an inner function can access variables from an outer function and remembers these variables.

## Applications of Closures

### State Preservation

When programming, we often need to remember certain states. The React library provides a useState hook that allows developers to manage state.

Simplified implementation example of useState:

<picture>
  <source srcset="/images/article-contents/webp/understanding-javascript-closures/code-1.webp" type="image/webp">
  <img src="/images/article-contents/png/understanding-javascript-closures/code-1.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

### Caching Mechanism

Since closures allow inner functions to remember external variables, we can use this characteristic to implement caching mechanisms.

Implementing a caching mechanism:

<picture>
  <source srcset="/images/article-contents/webp/understanding-javascript-closures/code-2.webp" type="image/webp">
  <img src="/images/article-contents/png/understanding-javascript-closures/code-2.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

### Simulating Private Variables

Many programming languages have syntax for declaring private methods. These private variables are hidden from the outside, which is an important feature because sometimes we don't want external code to access the internal details of our implementation. JavaScript doesn't natively support private variables, but we can achieve similar functionality through closures.

Example implementation of simulated private variables:

<picture>
  <source srcset="/images/article-contents/webp/understanding-javascript-closures/code-3.webp" type="image/webp">
  <img src="/images/article-contents/png/understanding-javascript-closures/code-3.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

## Drawback of Closures: Memory Leaks

Although closures are useful, they cause inner functions to remember external variables. When closures maintain references to variables that are no longer needed, these variables cannot be released by the garbage collection mechanism. This causes variables to remain in memory, and excessive use may lead to memory leaks, so they should be used with caution.

The garbage collection mechanism mentioned above is provided by JavaScript to help developers manage memory without having to manually release it. In JavaScript, the garbage collection algorithm is called Mark-and-sweep. It starts from the root (i.e., global objects), finds all objects referenced from the root, then finds all objects referenced by those objects, and so on. If an object cannot be reached through this algorithm, it will be garbage collected. Whether an object is still reachable from the root is key to determining whether it will be garbage collected. Memory leaks occur when you no longer use an object, but it is still reachable. Specifically, when you no longer need something, but references to it still exist, so it won't be garbage collected, leading to memory leaks.

## Reference

[什麼是閉包 (Closure)？｜ ExplainThis](https://www.explainthis.io/zh-hant/swe/what-is-closure)
