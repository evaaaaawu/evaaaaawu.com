---
title: 為什麼在 JavaScript 中 0.1 + 0.2 不會剛好是 0.3？
subtitle: 因為二進位制 + 電腦記憶體有限，所以 0.1 + 0.2 = 0.30000000000000004。
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

在 JavaScript 中 0.1 + 0.2 不會剛好是 0.3，這不是 JavaScript 獨有的現象，而是使用二進制浮點運算的程式語言都會遇到的問題。

在一般生活中，我們多數情況是使用十進位，此時只有 1/2、1/4、1/5、1/8、1/10 這幾個數能夠被十進位的小數清楚表達；而像是 1/3、1/6、1/7、1/9 則不行。以 1/3 來說，我們知道會是 0.33333333 一路到無窮無盡。而對於二進位制來說，只有 1/2、1/4、1/8 等可以被清楚表達，其他則會無窮無盡地延伸下去，但是因為電腦的記憶體有限，程式語言會分配給一個數字的記憶體也是有限，所以在精准度的表達會有限制，這也是導致在 JavaScript 中 0.1 + 0.2 = 0.30000000000000004 這個怪異數字的原因。

如果要避免上述問題，在 JavaScript 中有  toFixed  和  toPrecision  等給數字操作的方法，讓我們能夠設定我們要的精確度，舉例來說，可以設定精確到小數第一位。

<!-- ```js
console.log((0.1 + 0.2).toFixed(1)); // 0.3
console.log((0.1 + 0.2).toPrecision(1)); // 0.3
``` -->

<picture>
  <source srcset="/images/article-contents/webp/why-01-plus-02-equals-030000000000000004-in-javascript/code.webp" type="image/webp">
  <img src="/images/article-contents/png/why-01-plus-02-equals-030000000000000004-in-javascript/code.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

## Reference

[在 JavaScript 中 0.1 + 0.2 會是多少？為什麼？如何避免相關問題？｜ ExplainThis](https://www.explainthis.io/zh-hant/swe/js-zero-point-one-plus-zero-point-two)
