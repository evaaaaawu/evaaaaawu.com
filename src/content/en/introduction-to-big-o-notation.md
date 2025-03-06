---
title: Introduction to Big O Notation
subtitle: Big O is a mathematical notation used to describe algorithm efficiency, primarily focusing on input scale, growth patterns, and worst-case scenarios.
author: src/content/authors/eva.json
imageWebp: /images/articles/webp/introduction-to-big-o-notation.webp
imagePng: /images/articles/png/introduction-to-big-o-notation.png
imgAlt: Introduction to Big O Notation
creationDate: 2024-11-05
updateDate: 2024-11-05
tags:
  - Algorithm
featured: false
---

Big O is a mathematical notation used to describe algorithm efficiency, but it doesn't focus on precision (e.g., actual execution time or CPU usage). Instead, it focuses on input scale, growth patterns, and worst-case scenarios.

Therefore, the three key concepts of Big O Time Complexity are: "growth is relative to input," "constants are ignored," and "worst-case scenarios are typically what we measure."

Common Big O notations include O(1), O(log n), O(n), O(n log n), O(n^2), O(2^n), and O(n!). These notations primarily focus on algorithm performance in worst-case scenarios, helping us make effective comparisons and judgments when designing and selecting algorithms.

### The common complexities

<picture>
  <source srcset="/images/article-contents/webp/introduction-to-big-o-notation/big-o-complexity.webp" type="image/webp">
  <img src="/images/article-contents/png/introduction-to-big-o-notation/big-o-complexity.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

This is why we use Big O: it typically helps us decide which data structures and algorithms to use. Understanding their performance can maximally help us write the best code.

## Reference

[Algorithms & Data Structures | Learn Algorithms with TypeScript for Interviews | Frontend Masters](https://frontendmasters.com/courses/algorithms/)
