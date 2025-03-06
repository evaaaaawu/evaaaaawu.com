---
title: 關於 JavaScript 的資料型別
subtitle: JavaScript 有原生值和物件兩大資料型別。原生值包含 String、Boolean、Number、BigInt、Undefined、Null 和 Symbol；物件則包含 Array、Function 和 Objects。
author: src/content/authors/eva.json
imageWebp: /images/articles/webp/about-javascript-data-types.webp
imagePng: /images/articles/png/about-javascript-data-types.png
imgAlt: About JavaScript Data Types
creationDate: 2024-11-03
updateDate: 2024-11-03
tags:
  - JavaScript
featured: false
---

JavaScript 有原生值和物件兩大資料型別：原生值包含 String、Boolean、Number、BigInt、Undefined、Null 和 Symbol，它們是不可變的，表示我們不能改變那個值本身，所以當你希望資料被更新時，只能「產生一個新的值來取代舊的」；物件則包含 Array、Function 和 Objects，它們是可變的，屬於以參考形式存在的資料，所以當我們 mutate 變數中的一個物件或陣列時，這個變數的參考對象並不會改變，只是內容被修改而已，因此當你想要改變一個變數的參考對象或是避免舊有的物件或陣列內容被修改到時，你應該產生一個全新的物件或陣列來取代舊有的。

要辨別一個變數的資料型別，可以使用 typeof 方法。但有一個例外是 typeof null 會得到 object，這是一個 JavaScript 的歷史遺跡，但因為要改掉這個 bug 的成本太高，所以到目前為止還是有這個錯誤；再來要注意的是 typeof function () { } 會得到 function，但 typeof [ ] 會得到 object，所以要辨別某個變數是物件還是陣列的話，要使用 Array.isArray() 或 Object.prototype.toString.call() 方法。

以下提供 Array.isArray() 和 Object.prototype.toString.call() 方法的範例：

<!-- ```js
Array.isArray([1, 2, 3]); // true
Array.isArray({ foo: 123 }); // false
``` -->

<picture>
  <source srcset="/images/article-contents/webp/about-javascript-data-types/code-1.webp" type="image/webp">
  <img src="/images/article-contents/png/about-javascript-data-types/code-1.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

<!-- ```js
const arr = [1, 2, 3];
const fn = () => {
  return 123;
};
const obj = { foo: 123 };

console.log(Object.prototype.toString.call(arr)); // [object Array]
console.log(Object.prototype.toString.call(fn)); // [object Function]
console.log(Object.prototype.toString.call(obj)); // [object Object]
``` -->

<picture>
  <source srcset="/images/article-contents/webp/about-javascript-data-types/code-2.webp" type="image/webp">
  <img src="/images/article-contents/png/about-javascript-data-types/code-2.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

## Reference
[JavaScript 有哪些資料型別 (data types)? 該怎麼辨別一個變數的資料型別?｜ExplainThis](https://www.explainthis.io/zh-hant/swe/js-data-types)
