---
title: Understanding JavaScript Closures
subtitle: A closure is when an inner function can access variables from an outer function and remembers these variables.
author: src/content/authors/eva.json
imageWebp: /images/articles/webp/understanding-javascript-closures.webp
imagePng: /images/articles/png/understanding-javascript-closures.png
imgAlt: Understanding JavaScript Closures
creationDate: 2024-12-15
updateDate: 2024-12-15
tags:
  - JavaScript
featured: false
---

## What is a Closure?

A closure is when an inner function can access variables from an outer function and remembers these variables.

## Applications of Closures

### State Preservation

In programming, we often need to maintain state information. The React library provides a useState hook that allows developers to manage state.

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

While closures are useful, they can lead to memory leaks when they maintain references to variables that are no longer needed. When this happens, these variables cannot be released by JavaScript's garbage collection mechanism, causing them to remain in memory unnecessarily.

JavaScript's garbage collection algorithm (Mark-and-sweep) starts from global objects (roots), identifies all referenced objects, and then collects anything unreachable. Memory leaks occur when objects are still reachable through references but are no longer needed by your program. Specifically, when you no longer need something, but references to it still exist, it won't be garbage collected, leading to memory leaks. For this reason, closures should be used with caution.

## Reference

[What is JavaScript Closures?｜ ExplainThis](https://www.explainthis.io/en/swe/what-is-closure)
