---
title: JavaScript 中 null、undefined 與 undeclared 的區別
subtitle: null 可以理解為沒有；undefined 可以理解為尚未；undeclared 則是指從未被宣告過。
author: src/content/authors/eva.json
imageWebp: /images/articles/webp/the-differences-between-null-undefined-and-undeclared-in-javascript.webp
imagePng: /images/articles/png/the-differences-between-null-undefined-and-undeclared-in-javascript.png
imgAlt: The Differences Between null, undefined and undeclared in JavaScript
creationDate: 2024-11-03
updateDate: 2024-11-03
tags:
  - JavaScript
featured: false
---

null 可以理解為「沒有」，代表的是一個變數的空值。

undefined 可以理解為「尚未」，表示還未定義值，所以如果宣告了某變數但還沒有賦值，就會出現 undefined。

undeclared 則是指從未被宣告過，當還沒宣告某變數就使用會出現 ReferenceError 的錯誤，此時就是屬於 undeclared 的狀態。

## Reference

[JavaScript null、undefined 與 undeclared 的區別?｜ExplainThis](https://www.explainthis.io/zh-hant/swe/js-undefined-null-undeclared)
