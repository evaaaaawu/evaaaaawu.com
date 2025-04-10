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

JavaScript is a prototype-based object-oriented programming language. In JavaScript, every object contains an internal hidden property called `[[Prototype]]`, which points to the object's prototype. This value can be either null or a reference to another object.

## `[[Prototype]]` and `__proto__`

Since `[[Prototype]]` is an internal hidden property that cannot be directly accessed, browsers provide the `__proto__` accessor method. However, it's important to note that the `__proto__` method is not part of the ECMAScript specification. In practical development, we use `Object.getPrototypeOf()` to obtain an object's prototype.

Implementation examples of `prototype`, `__proto__`, and `Object.getPrototypeOf` method:

<picture>
  <source srcset="/images/article-contents/webp/understanding-javascript-prototype/code-1.webp" type="image/webp">
  <img src="/images/article-contents/png/understanding-javascript-prototype/code-1.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

## `__proto__` Property and `prototype` Property

`__proto__` and `prototype` are different properties. `__proto__` is a hidden property of every object, through which each object can access its prototype. On the other hand, `prototype` is a property that exists in all constructor functions. A constructor function's `prototype` points to the same object as the `__proto__` of instances created from that constructor - this object is called the prototype object.

<picture>
  <source srcset="/images/article-contents/webp/understanding-javascript-prototype/code-2.webp" type="image/webp">
  <img src="/images/article-contents/png/understanding-javascript-prototype/code-2.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

## Prototype Chain

A prototype itself is an object, so it also has its own prototype. When we try to access a property of an object, if the object doesn't have that property, JavaScript will look for it in the object's prototype. If the property is still not found in the prototype, it will continue searching up the chain until it either finds the property or reaches null. This continuous lookup path is called the prototype chain, and the end of the chain is always null.

- The end value of the prototype chain is null:

  <picture>
    <source srcset="/images/article-contents/webp/understanding-javascript-prototype/code-3.webp" type="image/webp">
    <img src="/images/article-contents/png/understanding-javascript-prototype/code-3.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
  </picture>

- Implementation example of the prototype chain:

  We frequently use the filter method on arrays. When we have an array "list" and call the filter method on it, we're actually accessing a method that doesn't exist on the list itself. The filter method exists on the Array constructor's prototype. We can use this method through the prototype chain, as our array instance inherits from Array.prototype.

## Prototypal Inheritance

Prototypal inheritance allows objects to access properties and methods from other objects when they don't have those properties themselves.

For example, consider an object "animal" with its own properties and methods. If we want to create "cat" and "dog" objects that need both their own unique features and the common properties of the "animal" object, we don't need to duplicate code. Instead, we can use prototypal inheritance to let "cat" and "dog" access the methods and properties of "animal" through the prototype chain.

Implementation example of prototypal inheritance:

<picture>
  <source srcset="/images/article-contents/webp/understanding-javascript-prototype/code-4.webp" type="image/webp">
  <img src="/images/article-contents/png/understanding-javascript-prototype/code-4.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

## Reference

[The most common JavaScript prototype interview questions and answers (prototype, prototypal inheritance, prototype chain)｜ ExplainThis](https://www.explainthis.io/en/swe/most-common-js-prototype-questions)
