---
title: Big O 簡介
subtitle: Big O 是一種用來描述演算法效率的數學符號，主要會關注在輸入的規模、如何成長和最壞的情況。
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

Big O 是一種用來描述演算法效率的數學符號，但它並不會關注在精確這件事情上（e.g., 真正的執行時間或需要用到多少 CPU），而是關注在輸入的規模、如何成長和最壞的情況。

所以「成長是相對於 input」、「Constants 會被忽略」、 「最壞的情況通常是我們測量的方式」是 Big O Time Complexity 的三大重要概念。

常見的 Big O 表示法包含 O(1)、O(log n)、O(n)、O(n log n)、O(n^2)、O(2^n)、O(n!)，這些表示法主要關注的是演算法在最壞情況下的表現，因此能夠幫助我們在設計和選擇演算法時進行有效的比較和判斷。

### The common complexities

<picture>
  <source srcset="/images/article-contents/webp/introduction-to-big-o-notation/big-o-complexity.webp" type="image/webp">
  <img src="/images/article-contents/png/introduction-to-big-o-notation/big-o-complexity.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

這也是我們使用 Big O 的原因：通常它會幫助我們決定使用什麼資料結構和演算法。了解他們的表現可以最大程度的幫助我們寫出最好的程式。

## Reference

[Algorithms & Data Structures | Learn Algorithms with TypeScript for Interviews | Frontend Masters](https://frontendmasters.com/courses/algorithms/)
