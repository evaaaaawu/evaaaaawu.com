---
title: JavaScript 中 ==、=== 與 Object.is()的區別
subtitle: == 會強制轉換型別與值；=== 不會強制轉換型別與值；Object.is()會比較兩個值是不是相等。
author: src/content/authors/eva.json
imageWebp: /images/articles/webp/differences-between-equals-strict-equals-and-objectis-in-javascript.webp
imagePng: /images/articles/png/differences-between-equals-strict-equals-and-objectis-in-javascript.png
imgAlt: Differences between ==, === and Object.is() in JavaScript
creationDate: 2024-10-27
updateDate: 2024-10-27
tags:
  - JavaScript
featured: false
---

## == 鬆散比較(loose equality)

在比較兩個值之前，會先強制轉換型別與值

- `console.log(1 == "1");` // true

- `console.log(0 == false);` // true

- `console.log(undefined == null);` // true

## === 嚴格比較(strict equality)

不會強制轉換型別與值，但有兩個例外情況：

- `console.log(+0 === -0);` // true

- `console.log(NaN === NaN);` // false

## Object.is() 同值比較(same-value equality)

顧名思義是在比較兩個值是不是相等(雖然是 Object 開頭，但比較的可以是任意的兩個值)。上面提到的兩種在  ===  時遇到的問題，可以透過  Object.is  有效分辨：

- `console.log(Object.is(+0, -0));` // false

- `console.log(Object.is(NaN, NaN));` // true

## Reference

[在 JavaScript 當中，==、=== 與 Object.is()的區別｜ ExplainThis](https://www.explainthis.io/zh-hant/swe/js-equality)
