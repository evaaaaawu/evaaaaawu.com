---
title: Understanding Map, WeakMap, Set, and WeakSet in JavaScript
subtitle: Map/WeakMap are data structures similar to Objects; Set/WeakSet data structures are similar to arrays.
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

### Map vs. WeakMap

Map is a data structure similar to Object, both store data in key-value pair format; WeakMap is similar to Map in usage, but has two main differences: it only allows Objects as keys and the objects referenced by keys can be garbage collected.

### Set vs. WeakSet

Set is a data structure similar to an array, but all elements inside are unique with no duplicates; WeakSet is similar to Set in usage, but has two main differences: elements can only be Objects and elements can be garbage collected.

## Map

### Introduction

Map is a data structure similar to Object, both store data in key-value pair format. In JavaScript, Map itself is a constructor function used to generate the Map data structure, specifically by using `new Map()` to create instances.

### Common Operations

- get(key): Query a specific element through its key and return the value

- set(key, value): Add elements to a Map

- delete(key): Remove a specific element from the Map through its key

- has(key): Determine if a certain key exists in the Map

- size property: Get the number of elements

### Common Iteration Methods (iteration order will be the order in which elements were placed in the Map)

- values(): Returns all element values in the Map

- keys(): Returns all element keys in the Map

- entries(): Returns all elements in the Map in the form of [key, value] pairs

## WeakMap

Similar to Map in usage, but with two main differences:

- WeakMap only allows Objects as keys, with the exception of `null`.

- Keys in WeakMap are "weak references," meaning the objects referenced by keys can be garbage collected, at which point the keys become invalid.

## Set

### Introduction

Set is a data structure similar to an array, but all elements inside are unique with no duplicates. In JavaScript, Set itself is a constructor function used to generate the Set data structure, specifically by using `new Set()` to create instances.

### Common Operations

- add(value): Used to add values

- delete(value): Used to delete values from the Set

- has(value): Determine if a certain value exists in the Set

- size property: Get the number of elements

## WeakSet

Similar to Set in usage, but with two main differences:

- Elements in WeakSet can only be Objects (Set can accept values of various data types).

- Elements in WeakSet are "weak references," meaning they can be reclaimed by the garbage collection mechanism.

## Reference

[Please explain the differences between Set, Map, WeakSet, and WeakMap? | ExplainThis](https://www.explainthis.io/zh-hant/swe/set-map-weakset-weakmap)
