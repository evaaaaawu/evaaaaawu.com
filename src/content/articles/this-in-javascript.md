---
title: JavaScript 的 this
subtitle: 在 JavaScript 中，this 的值是動態的，通常會由被呼叫的函式來決定。所以，影響 this 的值不是宣告的時機，關鍵在於在哪裡被調用。
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

在 JavaScript 中，this 的值是動態的，通常會由被呼叫的函式來決定。所以，影響 this 的值不是宣告的時機，關鍵在於在哪裡被調用。

而 this 值有 5 種判斷的方式，包含:

1. 一般函式調用會指向全局物件，若是在非嚴格模式下的瀏覽器會默認為 Window；嚴格模式下 this 則為 undefined。

2. 當一個函式是做為一個物件的方法來調用時，this 會指向這個物件。

3. 當一個函式用 new 關鍵字調用時，此函式執行前會先創造一個新的物件，this 會指向這個新組成的物件。

4. 我們也可以使用 apply、call、bind 方法來指定 this 指向的物件。

5. ES6 後出現的箭頭函式(arrow function)並沒有屬於自己的 this 值，它會從本身最近的外在函式繼承他的 this，如果它的外在函式也是箭頭函式，就會再繼續往上尋找，直到找到全域環境的預設 this 值(例如：瀏覽器中就是 window)。

## Reference

[解釋 JavaScript 中 this 的值?｜ExplainThis](https://www.explainthis.io/zh-hant/swe/what-is-this)