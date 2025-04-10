---
title: Why Isn't 0.1 + 0.2 Exactly 0.3 in JavaScript?
subtitle: Due to binary representation and limited computer memory, 0.1 + 0.2 = 0.30000000000000004.
author: src/content/authors/eva.json
imageWebp: /images/articles/webp/why-01-plus-02-equals-030000000000000004-in-javascript.webp
imagePng: /images/articles/png/why-01-plus-02-equals-030000000000000004-in-javascript.png
imgAlt: Why 0.1 + 0.2 equals 0.30000000000000004 in JavaScript
creationDate: 2024-11-24
updateDate: 2024-11-24
tags:
  - JavaScript
featured: false
---

In JavaScript, 0.1 + 0.2 doesn't equal exactly 0.3. This isn't unique to JavaScript but is a common issue in all programming languages that use binary floating-point arithmetic.

In everyday life, we mostly use the decimal system, where fractions like 1/2, 1/4, 1/5, 1/8, and 1/10 can be precisely represented as decimals. However, fractions like 1/3, 1/6, 1/7, and 1/9 cannot. For example, 1/3 is 0.33333333... continuing infinitely.

Similarly, in binary, only fractions like 1/2, 1/4, 1/8, etc. can be precisely represented, while others like 1/10 (0.1 in decimal) cannot be exactly represented and extend infinitely. Since computer memory is limited, programming languages allocate finite memory to numbers, restricting precision. This limitation causes JavaScript to calculate 0.1 + 0.2 as 0.30000000000000004.

To avoid this issue in practical applications, JavaScript provides methods like `toFixed` and `toPrecision` for number operations, allowing us to set our desired precision level, such as rounding to one decimal place.

<!-- ```js
console.log((0.1 + 0.2).toFixed(1)); // 0.3
console.log((0.1 + 0.2).toPrecision(1)); // 0.3
``` -->

<picture>
  <source srcset="/images/article-contents/webp/why-01-plus-02-equals-030000000000000004-in-javascript/code.webp" type="image/webp">
  <img src="/images/article-contents/png/why-01-plus-02-equals-030000000000000004-in-javascript/code.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

## Reference

[What Will 0.1 + 0.2 Be in JavaScript? Why?｜ ExplainThis](https://www.explainthis.io/en/swe/js-zero-point-one-plus-zero-point-two)
