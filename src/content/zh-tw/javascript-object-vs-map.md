---
title: JavaScript 的 Object v.s. Map
subtitle: Map 是 ES6 新增的語法，所以在 ES6 之前，Object 一直被當作 Map 來使用。
author: src/content/authors/eva.json
imageWebp: /images/articles/webp/javascript-object-vs-map.webp
imagePng: /images/articles/png/javascript-object-vs-map.png
imgAlt: JavaScript Object v.s. Map
creationDate: 2024-11-10
updateDate: 2024-11-10
tags:
  - JavaScript
featured: false
---

Map 是 ES6 新增的語法，所以在 ES6 之前，Object 一直被當作 Map 來使用，而新增的 Map 相較於原始的 Object 有下列幾項差異：

## Map 優勢

### Map 沒有原型(prototype)，因此更加安全且不會有意外的鍵(key)命名衝突問題

- Map 更加安全：使用 Object 在設定使用者提供的鍵值對(key-value pairs)時可能會允許攻擊者覆寫該 Object 的原型(prototype)，這可能會導致物件注入攻擊。

- Map 不會有意外的鍵(key)命名衝突問題：使用 Object 需要小心預設鍵(key)可能會與我們自己放入的鍵(key)發生衝突。

- NOTE: 雖然以上問題可以透過使用 Object.create(null) 來解決，但我們很少這樣做。

### Map 的鍵(key)可以是任何值，但 Object 的鍵(key)只能是 String 或 Symbol

Map 不會因為鍵(key)被自動轉換成 String 導致意外的命名衝突問題：在用鍵值對處理資料時，很常開發者會用各類東西做為鍵(key)，但是在 JavaScript，如果用 Object，不管用什麼當做鍵(key)，都會被轉換成字串，這往往會造成一些錯誤，例如被轉成字串時，原本兩個不同的鍵(key)被轉成同樣的字串，這就導致撞鍵(key)問題。而 Map 物件解決了這個問題，開發者想用什麼當鍵(key)都可以。

### Map 支援迭代(iteration)

我們可以直接對 Map 用 for...of 、forEach 進行迭代，但是如果想要迭代 Object 則需要使用額外的方法，例如 Object.entries、Object.keys 來協助。

### Map 的鍵(key)有順序性

上面提到 Map 是可迭代的，它有一個相關的優點是在迭代時是有順序性的。過去使用 Object，即使用物件方法 (例如 Object.entries、Object.keys 來協助迭代)，迭代出的結果順序不一定會是我們放入鍵值對的順序。但有時候在寫演算法時，我們需要保留順序，這時 Map 物件就會好用很多。

### Map 提供許多鍵值對(key-value pairs)常用的方法

舉例來說，如果要知道一個鍵值對的大小，Map 有 size 方法，簡單又好用；但如果用原始物件，我們可能需要使用 Object.keys 然後搭配 .length 去自己找該物件有多少個鍵，這就麻煩很多。另外 Map 也有提供 clear 方法，可以一次把所有鍵值對刪掉；如果是原始物件就需要一個個刪。

### Map 在頻繁改動鍵值對(key-value pairs)的情況下效能更好

Map 適合用於需要高效查找、插入和刪除操作的場景。

## Map 劣勢

### Map 沒有對序列化或解析的原生支援

Object 可以分別使用 JSON.stringify() 和 JSON.parse() 進行序列化和解析，但 Map 並沒有針對序列化和解析的原生支援，需要自己另外實作。

## Reference

- [Map - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [在 JavaScript 中，Map 與 object 的差別？為什麼有 object 還需要 Map？｜ExplainThis](https://www.explainthis.io/zh-hant/swe/map-vs-object)
