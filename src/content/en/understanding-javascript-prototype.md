---
title: Understanding JavaScript Prototype
subtitle: In JavaScript, prototype is a crucial concept in object-oriented programming, serving as the key to implementing inheritance and property sharing.
author: src/content/authors/eva.json
imageWebp: /images/articles/webp/understanding-javascript-prototype.webp
imagePng: /images/articles/png/understanding-javascript-prototype.png
imgAlt: Understanding JavaScript Prototype
creationDate: 2024-10-16
updateDate: 2024-10-16
tags:
  - JavaScript
featured: false
---

## Prototype

JavaScript is an object-oriented programming language based on "prototypes." In JavaScript, every object contains an internal hidden property called `[[Prototype]]`, which corresponds to the object's prototype. This value can be either null or a reference to another object.

## `[[Prototype]]` and `__proto__`

In JavaScript, every object contains an internal hidden property called `[[Prototype]]`, which corresponds to the object's prototype. This value can be either null or a reference to another object.

Since `[[Prototype]]` is an internal hidden property that cannot be directly accessed, browsers provide the `__proto__` accessor method. However, it's important to note that the `__proto__` method is not part of the ECMAScript specification. In actual development, to obtain an object's prototype, we use `Object.getPrototypeOf`.

Implementation examples of `prototype`, `__proto__`, and `Object.getPrototypeOf` method:

<picture>
  <source srcset="/images/article-contents/webp/understanding-javascript-prototype/code-1.webp" type="image/webp">
  <img src="/images/article-contents/png/understanding-javascript-prototype/code-1.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

## `__proto__` Property and `prototype` Property

`__proto__` and `prototype` are different properties. `__proto__` is a hidden property of every object, through which each object can access its prototype. On the other hand, `prototype` is a property that exists in all constructor functions. A constructor function's `prototype` actually points to the same place as `__proto__`, which is called the prototype object.

<picture>
  <source srcset="/images/article-contents/webp/understanding-javascript-prototype/code-2.webp" type="image/webp">
  <img src="/images/article-contents/png/understanding-javascript-prototype/code-2.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

## Prototype Chain

A prototype itself is an object, so it also has its own prototype. When we try to access a property of an object, if the object doesn't have the required property, it will look for it in its prototype. If the property is still not found in the prototype, it will continue to search up the chain until it finds the property or reaches null. This continuous path is called the prototype chain, and the end of the chain is null.

- The end value of the prototype chain is null:

  <picture>
    <source srcset="/images/article-contents/webp/understanding-javascript-prototype/code-3.webp" type="image/webp">
    <img src="/images/article-contents/png/understanding-javascript-prototype/code-3.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
  </picture>

- Implementation example of the prototype chain:

  We frequently use the filter method of arrays. Suppose we have an array "list" and we use the filter method on this array. In fact, the filter method doesn't exist on the list itself; it exists on the Array constructor function. We can use the filter method today through the prototype chain.

## Prototypal Inheritance

Prototypal inheritance allows objects that don't have certain properties to access properties of other objects. So, suppose we have an object "animal" that has its own properties and methods. At the same time, we want to create two objects based on "animal," namely "cat" and "dog." These two objects will have some unique methods and properties, but they also need to use the methods and properties of the "animal" object. In such a scenario, we don't need to copy or reimplement; we can achieve this through prototypal inheritance.

Implementation example of prototypal inheritance:

<picture>
  <source srcset="/images/article-contents/webp/understanding-javascript-prototype/code-4.webp" type="image/webp">
  <img src="/images/article-contents/png/understanding-javascript-prototype/code-4.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

## Reference

[Prototype, Prototype Chain, Prototypal Inheritance ｜ ExplainThis](https://www.explainthis.io/zh-hant/swe/most-common-js-prototype-questions)
