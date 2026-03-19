---
title: Differences between ==, === and Object.is() in JavaScript
creationDate: 2024-10-27
updateDate: 2024-10-27
topics:
  - JavaScript
featured: false
outdated: true
---

## == Loose Equality

The == operator performs type coercion before comparing values

- `console.log(1 == "1");` // true

- `console.log(0 == false);` // true

- `console.log(undefined == null);` // true

## === Strict Equality

It doesn't perform type coercion or value conversion, but there are two notable behaviors to be aware of:

- `console.log(+0 === -0);` // true

- `console.log(NaN === NaN);` // false

## Object.is() Same-Value Equality

As the name suggests, it compares if two values are the same. Despite starting with "Object", it can compare any two values.

Unlike ===, Object.is() handles the special cases of zero and NaN differently:

- `console.log(Object.is(+0, -0));` // false

- `console.log(Object.is(NaN, NaN));` // true

## Reference

[What Is the Difference Between ==, === and Object.is in JavaScript?｜ ExplainThis](https://www.explainthis.io/en/swe/js-equality)
