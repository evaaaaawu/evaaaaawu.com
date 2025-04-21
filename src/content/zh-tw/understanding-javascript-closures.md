---
title: JavaScript 的閉包(Closure)
subtitle: 閉包就是內部函式能夠取得函式外部的變數，並且記住這個變數。
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

## 什麼是閉包?

閉包就是內部函式能夠取得函式外部的變數，並且記住這個變數。

## 閉包的應用場景

### 狀態保存

在寫程式時，我們很常會需要記住某個狀態，React 套件就有提供一個 useState 讓開發者來管理狀態。

簡化版 useState 實作範例：

<!-- ```js
function useState(initialState) {
  let state = initialState;

  function getState() {
    return state;
  }

  function setState(updatedState) {
    state = updatedState;
  }

  return [getState, setState];
}

const [count, setCount] = useState(0);

count(); // 0
setCount(1);
count(); // 1
setCount(500);
count(); // 500
``` -->

<picture>
  <source srcset="/images/article-contents/webp/understanding-javascript-closures/code-1.webp" type="image/webp">
  <img src="/images/article-contents/png/understanding-javascript-closures/code-1.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

### 快取(cache)機制

因為閉包可以讓內部函式記住外部的變數，我們可以依照這個特性，透過閉包來實現快取(cache)機制。

手寫快取(cache)機制：

<!-- ```js
function memoize(fn) {
  const cache = {};

  return (...args) => {
    const key = JSON.stringify(args);
    if (key in cache) {
      return cache[key];
    } else {
      const val = fn(...args);
      cache[key] = val;
      return val;
    }
  };
}
``` -->

<picture>
  <source srcset="/images/article-contents/webp/understanding-javascript-closures/code-2.webp" type="image/webp">
  <img src="/images/article-contents/png/understanding-javascript-closures/code-2.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

### 模擬私有變數

許多程式語言有宣告私有方法的語法，這些私有變數對於外部來講是隱藏的，這是一項很重要的特性，因為有時候我們在開發的程式碼內部細節，並不想讓外部來獲取。JavaScript 並不支援私有變數，但我們可以透過閉包做出類似的功能。

模擬私有變數實作範例：

<!-- ```js
var counter = (function () {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function () {
      changeBy(1);
    },
    decrement: function () {
      changeBy(-1);
    },
    value: function () {
      return privateCounter;
    },
  };
})();

console.log(counter.value()); // logs 0
counter.increment();
counter.increment();
console.log(counter.value()); // logs 2
counter.decrement();
console.log(counter.value()); // logs 1
``` -->

<picture>
  <source srcset="/images/article-contents/webp/understanding-javascript-closures/code-3.webp" type="image/webp">
  <img src="/images/article-contents/png/understanding-javascript-closures/code-3.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

## 閉包的缺點：記憶體洩漏(memory leak)

閉包雖然很好用，但由於閉包會讓內部函式記得外部的變數，所以當閉包保持對不再需要的變數的引用時，這些變數會無法被垃圾回收機制釋放，導致變數常駐在記憶體當中，如果使用過多可能會造成記憶體洩漏(memory leak)，需要小心使用。

上面提到的垃圾回收機制是 JavaScript 提供的一個機制，幫助開發者管理記憶體，而不需要手動釋放記憶體。在 JavaScript 中，垃圾回收算法稱為標記清除 (Mark-and-sweep)。它從根（即全局對象）開始，找到所有從根引用的對象，然後找到這些對象引用的所有對象，依此反覆進行。如果一個對象無法通過這個算法到達，它將被垃圾回收。一個對象是否仍然可以從根到達，是決定該對象是否會被垃圾回收的關鍵。而記憶體洩漏則發生在你實際上不再使用一個對象，但它仍然是可達的情況下。具體來說，會是當你不再需要某個東西，但對該東西的引用仍存在，所以該東西不會被垃圾回收，進而導致記憶體洩漏。

## Reference

[什麼是閉包 (Closure)？｜ ExplainThis](https://www.explainthis.io/zh-hant/swe/what-is-closure)
