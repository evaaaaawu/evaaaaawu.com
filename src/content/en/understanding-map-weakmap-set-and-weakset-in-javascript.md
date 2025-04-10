---
title: Understanding Map, WeakMap, Set, and WeakSet in JavaScript
subtitle: Map/WeakMap are data structures similar to Objects, while Set/WeakSet are similar to arrays.
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

Map is a data structure similar to Object; both store data in key-value pairs. WeakMap is similar to Map in usage, but with two main differences: it only accepts Objects as keys, and these objects can be garbage collected.

### Set vs. WeakSet

Set is a data structure similar to an array, but all elements inside are unique with no duplicates. WeakSet is similar to Set in usage, but with two main differences: elements can only be Objects and these objects can be garbage collected.

## Map

### Introduction

Map is a data structure similar to Object; both store data in key-value pairs. In JavaScript, Map is a constructor function that creates Map instances using `new Map()`.

### Common Operations

- get(key): Retrieves a value using its key
- set(key, value): Adds or updates a key-value pair in the Map
- delete(key): Removes an element from the Map by its key
- has(key): Determines if a certain key exists in the Map
- size property: Returns the number of elements

### Common Iteration Methods

The iteration order corresponds to the insertion order of elements.

- values(): Returns all element values in the Map
- keys(): Returns all element keys in the Map
- entries(): Returns all elements in the Map as [key, value] pairs

## WeakMap

Similar to Map in usage, but with two main differences:

- WeakMap only accepts Objects as keys (excluding `null`).
- Keys in WeakMap are "weak references," meaning the objects referenced by keys can be garbage collected when there are no other references to them, at which point their associated entries are automatically removed.

## Set

### Introduction

Set is a data structure similar to an array, but all elements inside are unique with no duplicates. In JavaScript, Set is a constructor function that creates Set instances using `new Set()`.

### Common Operations

- add(value): Adds a value to the Set
- delete(value): Removes a value from the Set
- has(value): Determines if a certain value exists in the Set
- size property: Returns the number of elements

## WeakSet

Similar to Set in usage, but with two main differences:

- Elements in WeakSet can only be Objects (while Set can accept values of various data types).
- Elements in WeakSet are "weak references," meaning they can be garbage collected when there are no other references to them.

## References

[What Is the Difference Between Set, Map, WeakSet, and WeakMap in JavaScript?｜ ExplainThis](https://www.explainthis.io/en/swe/set-map-weakset-weakmap)
