---
title: 關於 JavaScript 的 Map、WeakMap、Set 和 WeakSet
subtitle: Map/WeakMap 是類似於 Object 的資料結構；Set/WeakSet 的資料結構則類似於陣列。
author: src/content/authors/eva.json
imageWebp: /images/articles/webp/understanding-map-weakmap-set-and-weakset-in-javascript.webp
imagePng: /images/articles/png/understanding-map-weakmap-set-and-weakset-in-javascript.png
imgAlt: Understanding Map, WeakMap, Set, and WeakSet in JavaScript
creationDate: 2024-11-17
updateDate: 2024-11-17
tags:
  - JavaScript
featured: false
---

## TL;DR

### Map v.s. WeakMap

Map 是類似於 Object 的資料結構，都是用鍵與值(key-value pair)的形式儲存資料格式；WeakMap 和 Map 的使用方法相似，但有兩個主要不同的地方，分別是只允許 Object 作為鍵(key)和鍵(key)所指向的對象可以被垃圾回收。

### Set v.s. WeakSet

Set 這個數據結構類似陣列，但是裡面的元素值都是唯一，不會有重複的值；WeakSet 和 Set 的使用方法相似，但有兩個主要不同的地方，分別是元素值只能是 Object 和元素可以被垃圾回收。

## Map

### 介紹

Map 是類似於 Object 的資料結構，都是用鍵與值(key-value pair)的形式儲存資料格式。在 JavaScript 當中，Map 本身是一種構造函式，用來生成 Map 這種數據結構，具體做法是  new Map()  來生成實例。

### 常見操作方法

- get(key)：透過鍵(key)查詢特定元素，並返回 value

- set(key, value)：Map 新增元素

- delete(key)：透過鍵(key)從 Map 中移除特定元素

- has(key)：判斷 Map 中是否存在某鍵(key)

- size  方法：取得元素數量

### 常見遍歷方法(遍歷順序會是置放到 Map 時的順序)

- values()：返回 Map 中所有元素的值

- keys()：返回 Map 中所有元素的鍵

- entries()：返回 Map 中所有的元素，返回的會是  [key, value]  的形式

## WeakMap

和 Map 的使用方法相似，但有兩個主要不同的地方：

- WeakMap 只允許 Object 作為鍵(key)，但是  null  除外。

- WeakMap 中的鍵名是「弱引用」(weak reference)，鍵(key)所指向的對象可以被垃圾回收，此時的鍵(key)是無效的。

## Set

### 介紹

Set 這個數據結構類似陣列，但是裡面的元素值都是唯一，不會有重複的值。在 JavaScript 當中，Set 本身是一種構造函式，用來生成 Set 這種數據結構，具體的做法是透過  new Set()  來生成實例。

### 常見操作方法

- add(value)：用來新增值

- delete(value)：用來刪除每個 Set 中的值

- has(value)：判斷 Set 中是否存在每個值

- size  方法：取得元素數量

## WeakSet

和 Set 的使用方法相似，但有兩個主要不同的地方：

- WeakSet 內的元素值只能是 Object（Set 可接受各種資料類型的值）。

- WeakSet 內的元素都是「弱引用」(weak reference)，可以被垃圾回收機制回收。

## Reference

[請解釋 Set、Map、WeakSet 和 WeakMap 的區別？｜ ExplainThis](https://www.explainthis.io/zh-hant/swe/set-map-weakset-weakmap)
