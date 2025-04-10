---
title: The Differences Between null, undefined, and undeclared in JavaScript
subtitle: null can be understood as nothing; undefined can be understood as not yet; undeclared refers to never having been declared.
author: src/content/authors/eva.json
imageWebp: /images/articles/webp/the-differences-between-null-undefined-and-undeclared-in-javascript.webp
imagePng: /images/articles/png/the-differences-between-null-undefined-and-undeclared-in-javascript.png
imgAlt: The Differences Between null, undefined, and undeclared in JavaScript
creationDate: 2024-11-03
updateDate: 2024-11-03
tags:
  - JavaScript
featured: false
---

JavaScript has three distinct ways to represent missing values. Understanding their differences is important for debugging and writing reliable code.

**null** can be understood as "nothing," representing an empty value for a variable.

```javascript
let emptyValue = null; // explicitly set to empty
```

**undefined** can be understood as "not yet," indicating that a value has not been defined. For example, if you declare a variable but haven't assigned a value to it, you'll get undefined.

```javascript
let unassignedValue; // value is undefined
console.log(unassignedValue); // undefined
```

**undeclared** can be understood as "never existed," referring to something that has never been declared. When you try to use a variable that hasn't been declared, you'll get a ReferenceError.

```javascript
console.log(nonExistentVariable); // throws ReferenceError: nonExistentVariable is not defined
```

## Reference

[What is the difference between null, undefined and undeclared in JavaScript?｜ ExplainThis](https://www.explainthis.io/en/swe/js-undefined-null-undeclared)
