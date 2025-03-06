---
title: JavaScript Object v.s. Map
subtitle: Map is a syntax added in ES6, so before ES6, Object was always used as a Map.
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

Map is a syntax added in ES6, so before ES6, Object was always used as a Map. The newly added Map has several differences compared to the original Object:

## Map Advantages

### Map has no prototype, making it safer and avoiding accidental key naming conflicts

- Map is safer: When setting user-provided key-value pairs with an Object, attackers might be able to overwrite the Object's prototype, potentially leading to object injection attacks.

- Map avoids accidental key naming conflicts: With Objects, you need to be careful about default keys that might conflict with keys you add yourself.

- NOTE: Although these issues can be resolved by using Object.create(null), we rarely do this.

### Map keys can be any value, while Object keys can only be String or Symbol

Map won't cause accidental naming conflicts due to keys being automatically converted to String: When handling data with key-value pairs, developers often use various types as keys. However, in JavaScript, when using Objects, whatever you use as a key will be converted to a string, which can cause errors. For example, when converted to strings, two originally different keys might become the same string, leading to key collision issues. Map objects solve this problem, allowing developers to use anything as keys.

### Map supports iteration

We can directly iterate over a Map using for...of or forEach, but to iterate over an Object, we need to use additional methods like Object.entries or Object.keys.

### Map keys maintain insertion order

As mentioned above, Map is iterable, and it has a related advantage of maintaining order during iteration. In the past, when using Objects, even with object methods (like Object.entries or Object.keys to assist iteration), the iteration results might not follow the order in which we inserted the key-value pairs. However, sometimes when writing algorithms, we need to preserve order, which makes Map objects much more useful.

### Map provides many commonly used methods for key-value pairs

For example, to know the size of a key-value collection, Map has a size method, which is simple and useful; but with original Objects, we might need to use Object.keys and then .length to find out how many keys the object has, which is more cumbersome. Additionally, Map also provides a clear method that can delete all key-value pairs at once; with original Objects, you would need to delete them one by one.

### Map performs better in situations with frequent key-value pair modifications

Map is suitable for scenarios requiring efficient lookup, insertion, and deletion operations.

## Map Disadvantages

### Map has no native support for serialization or parsing

Objects can be serialized and parsed using JSON.stringify() and JSON.parse() respectively, but Map does not have native support for serialization and parsing, requiring custom implementation.

## Reference

- [Map - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [What's the difference between Map and object in JavaScript? Why do we need Map when we have object? | ExplainThis](https://www.explainthis.io/zh-hant/swe/map-vs-object)
