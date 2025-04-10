---
title: Understanding splice, slice, and split in JavaScript
subtitle: splice modifies the original array, allowing insertion, deletion, or both simultaneously; slice extracts a portion of an array or string, returning a new array or string without modifying the original; split divides a string into an array based on a specified separator, leaving the original string unchanged.
author: src/content/authors/eva.json
imageWebp: /images/articles/webp/understanding-splice-slice-and-split-in-javascript.webp
imagePng: /images/articles/png/understanding-splice-slice-and-split-in-javascript.png
imgAlt: Understanding splice, slice, and split in JavaScript
creationDate: 2023-08-05
updateDate: 2023-08-05
tags:
  - JavaScript
featured: true
---

<!-- Before we begin, here's a summary table I've prepared:

<picture>
  <source srcset="/images/article-contents/webp/understanding-splice-slice-and-split-in-javascript/summary-table.webp" type="image/webp">
  <img src="/images/article-contents/png/understanding-splice-slice-and-split-in-javascript/summary-table.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture> -->

When looking at splice, slice, and split individually, they might not seem confusing. However, once you've encountered all three, they start to feel familiar yet distinct, making it difficult to differentiate between them. They're like the "Dango Three Brothers" - without careful examination, it's easy to confuse which one to use in different situations.

<iframe 
  width="560" 
  height="315" 
  src="https://www.youtube.com/embed/xTwgS1V_8zQ?si=W21_GQRuBA5UP8Vk" 
  title="YouTube video player" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
  referrerpolicy="strict-origin-when-cross-origin" 
  allowfullscreen 
  style="width: 80%; margin: 0 auto; border-radius: 10px;"
>
</iframe>

The "Dango Three Brothers" is a song from the Japanese NHK children's educational program "Fun with Mom" released in January 1999. It became extremely popular in Japan. The song style is super cute and pleasant to listen to - I recommend giving it a try to relieve some stress!

## Table of Contents

- [First Brother: splice](#first-brother-splice)
- [Second Brother: slice](#second-brother-slice)
- [Third Brother: split](#third-brother-split)
- [Why can slice operate on both arrays and strings, while splice can only operate on arrays but not strings?](#why-can-slice-operate-on-both-arrays-and-strings-while-splice-can-only-operate-on-arrays-but-not-strings)

## First Brother: splice

[mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) explanation (Array.prototype.splice()):

The splice() method changes the contents of an array by removing or replacing existing elements and/or adding new elements in place.

Before explaining splice's functionality, I want to highlight something important to remember when using array methods: **it's crucial to know what type they return and how they operate**.
For example, does it return an "array" or a "string"? Does it return "a new array" or "modify the original array"? Knowing this helps prevent writing incorrect code.

Let's get started!

**splice can perform two operations on the original array: 1. Insert elements, and 2. Delete elements—or do both simultaneously → It modifies the original array and you can define a new variable name to capture the "deleted elements". If no elements are deleted, it returns an empty array.**

Let's look at some examples:

Starting from index 2, delete 0 elements and insert "a":

<!-- ```js
let arr1 = [0, 1, 2, 3, 4, 5, 6];
arr2 = arr1.splice(2, 0, "a");
console.log(arr1);
// [
//   0, 1, 'a', 2,
//   3, 4, 5, 6
// ]
console.log(arr2);
// []
``` -->

<picture>
  <source srcset="/images/article-contents/webp/understanding-splice-slice-and-split-in-javascript/code-1.webp" type="image/webp">
  <img src="/images/article-contents/png/understanding-splice-slice-and-split-in-javascript/code-1.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

Starting from index 2, delete 1 element:

<!-- ```js
let arr1 = [0, 1, 2, 3, 4, 5, 6];
arr2 = arr1.splice(2, 1);
console.log(arr1);
// [ 0, 1, 3, 4, 5, 6 ]
console.log(arr2);
// [ 2 ]
``` -->

<picture>
  <source srcset="/images/article-contents/webp/understanding-splice-slice-and-split-in-javascript/code-2.webp" type="image/webp">
  <img src="/images/article-contents/png/understanding-splice-slice-and-split-in-javascript/code-2.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

Starting from index 2, delete 1 element and insert "a":

<!-- ```js
let arr1 = [0, 1, 2, 3, 4, 5, 6];
arr2 = arr1.splice(2, 1, "a");
console.log(arr1);
// [
//   0, 1, 'a', 3,
//   4, 5, 6
// ]
console.log(arr2);
// [ 2 ]
``` -->

<picture>
  <source srcset="/images/article-contents/webp/understanding-splice-slice-and-split-in-javascript/code-3.webp" type="image/webp">
  <img src="/images/article-contents/png/understanding-splice-slice-and-split-in-javascript/code-3.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

Starting from index 2, delete 1 element and insert "a, b, c":

<!-- ```js
let arr1 = [0, 1, 2, 3, 4, 5, 6];
arr2 = arr1.splice(2, 1, "a", "b", "c");
console.log(arr1);
// [
//   0, 1, 'a', 'b', 'c',
//   3, 4, 5, 6
// ]
console.log(arr2);
// [ 2 ]
``` -->

<picture>
  <source srcset="/images/article-contents/webp/understanding-splice-slice-and-split-in-javascript/code-4.webp" type="image/webp">
  <img src="/images/article-contents/png/understanding-splice-slice-and-split-in-javascript/code-4.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

## Second Brother: slice

[mdn](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) explanation (Array.prototype.slice()):

The slice() method returns a shallow copy of a portion of an array into a new array object selected from start to end (end not included) where start and end represent the index of items in that array. The original array will not be modified.

[mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice) explanation (String.prototype.slice()):

The slice() method extracts a section of a string and returns it as a new string, without modifying the original string.

**slice can extract a portion of an "array" or "string" → It returns a new "array" or "string", which is the extracted segment, while the original "array" or "string" remains unchanged.**

Let's look at some examples:

Slice from position 3 onwards:

<!-- ```js
let arr = [0, 1, 2, 3, 4, 5, 6];
console.log(arr.slice(3));
// [ 3, 4, 5, 6 ]
``` -->

<picture>
  <source srcset="/images/article-contents/webp/understanding-splice-slice-and-split-in-javascript/code-5.webp" type="image/webp">
  <img src="/images/article-contents/png/understanding-splice-slice-and-split-in-javascript/code-5.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

Slice from position 3 to position 6 (not including position 6):

<!-- ```js
let arr = [0, 1, 2, 3, 4, 5, 6];
console.log(arr.slice(3, 6));
// [ 3, 4, 5 ]
``` -->

<picture>
  <source srcset="/images/article-contents/webp/understanding-splice-slice-and-split-in-javascript/code-6.webp" type="image/webp">
  <img src="/images/article-contents/png/understanding-splice-slice-and-split-in-javascript/code-6.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

I've only provided examples of extracting from "arrays" above. For extracting from "strings", please use your imagination and apply the same principles. (Translation: I'm too lazy to write more examples 😂)

## Third Brother: split

[mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) explanation (String.prototype.split()):

The split() method takes a pattern and divides a String into an ordered list of substrings by searching for the pattern, puts these substrings into an array, and returns the array.

**split's function is to "divide a string into an array". When using it, you specify which character(s) in the original string to use as a separator → It returns a new "array", while the original "string" remains unchanged.**

Let me explain with the following example:

<!-- ```js
const myString = "hello!nihao!你好";
const myNewArray = myString.split("!");
console.log(myNewArray);
// [ 'hello', 'nihao', '你好' ]
``` -->

<picture>
  <source srcset="/images/article-contents/webp/understanding-splice-slice-and-split-in-javascript/code-7.webp" type="image/webp">
  <img src="/images/article-contents/png/understanding-splice-slice-and-split-in-javascript/code-7.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

Note that the separator used will disappear in the returned new "array". In the example above, we specified "!" as the separator, so the exclamation marks don't appear in the resulting array elements.

This method is particularly useful when processing .csv files! (.csv is one of the most common export formats for Excel or Google Sheets, which converts spreadsheet fields into a text file with comma-separated values)

Let's also look at the demo provided by [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split):

<!-- ```js
const str = "The quick brown fox jumps over the lazy dog.";
const words = str.split(" ");
console.log(words);
// [
//   'The',   'quick',
//   'brown', 'fox',
//   'jumps', 'over',
//   'the',   'lazy',
//   'dog.'
// ]
``` -->

<picture>
  <source srcset="/images/article-contents/webp/understanding-splice-slice-and-split-in-javascript/code-8.webp" type="image/webp">
  <img src="/images/article-contents/png/understanding-splice-slice-and-split-in-javascript/code-8.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

<!-- ```js
const str = "The quick brown fox jumps over the lazy dog.";
const chars = str.split("");
console.log(chars);
// [
//   'T', 'h', 'e', ' ', 'q', 'u', 'i',
//   'c', 'k', ' ', 'b', 'r', 'o', 'w',
//   'n', ' ', 'f', 'o', 'x', ' ', 'j',
//   'u', 'm', 'p', 's', ' ', 'o', 'v',
//   'e', 'r', ' ', 't', 'h', 'e', ' ',
//   'l', 'a', 'z', 'y', ' ', 'd', 'o',
//   'g', '.'
// ]
``` -->

<picture>
  <source srcset="/images/article-contents/webp/understanding-splice-slice-and-split-in-javascript/code-9.webp" type="image/webp">
  <img src="/images/article-contents/png/understanding-splice-slice-and-split-in-javascript/code-9.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

<!-- ```js
const str = "The quick brown fox jumps over the lazy dog.";
const strCopy = str.split();
console.log(strCopy);
// ['The quick brown fox jumps over the lazy dog.']
``` -->

<picture>
  <source srcset="/images/article-contents/webp/understanding-splice-slice-and-split-in-javascript/code-10.webp" type="image/webp">
  <img src="/images/article-contents/png/understanding-splice-slice-and-split-in-javascript/code-10.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

Here we can see that if the original string is a complete sentence, using "' '" (with a space in between) as the separator will split it into individual words, using "''" (with no space in between) as the separator will split it into individual letters, and using "" (not putting anything) as the separator will put the entire original string (in this case, a complete sentence) directly into the new array as its only element.

Well, our "spot the difference" game ends here for now. There are probably many more features I haven't listed, but I'll leave those for another time if I happen to encounter them.

## Why can slice operate on both arrays and strings, while splice can only operate on arrays but not strings?

This was a question that came to mind after playing the "spot the difference" game. My current understanding is that functions that can operate on arrays should typically also be able to operate on strings, as this would be a win-win situation. But why can splice only operate on arrays?

This is because in JavaScript, primitive types (including strings) are immutable, meaning you cannot directly modify the content of primitive type variables. Note that this refers to not being able to directly call any built-in functions to make modifications, but you can still reassign values to change the content. Here's a simple example to illustrate:

If a variable is of primitive type, calling any built-in function alone won't change the variable's value, e.g.,

<!-- ```js
let a = "hello";
a.toUpperCase();
console.log(a); // hello
``` -->

<picture>
  <source srcset="/images/article-contents/webp/understanding-splice-slice-and-split-in-javascript/code-11.webp" type="image/webp">
  <img src="/images/article-contents/png/understanding-splice-slice-and-split-in-javascript/code-11.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

You must reassign the value for a to change:

<!-- ```js
let a = "hello";
a = a.toUpperCase();
console.log(a); // HELLO
``` -->

<picture>
  <source srcset="/images/article-contents/webp/understanding-splice-slice-and-split-in-javascript/code-12.webp" type="image/webp">
  <img src="/images/article-contents/png/understanding-splice-slice-and-split-in-javascript/code-12.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

Back to the original question, we know that the splice function itself is designed to directly change the original value, which would contradict JavaScript's immutability principle for primitive types. This is why the splice function cannot operate on strings. Arrays in JavaScript are objects, which don't have the immutability restriction, so directly manipulating the original value is possible. Here's a simple example to illustrate:

<!-- ```js
let arr = [1, 2, 3];
arr.push(4);
console.log(arr); // [1, 2, 3, 4]
``` -->

<picture>
  <source srcset="/images/article-contents/webp/understanding-splice-slice-and-split-in-javascript/code-13.webp" type="image/webp">
  <img src="/images/article-contents/png/understanding-splice-slice-and-split-in-javascript/code-13.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

From the example above, we can see that if a variable is of Object type, directly calling built-in functions will change the variable's value.

As for the slice function, since its functionality doesn't change the original value, there's no contradiction as mentioned above, so it works fine for both array and string operations.

<!-- Finally, let me share my summary table again. I hope it helps you easily distinguish between these three "Dango Brothers" and never confuse them again.

<picture>
  <source srcset="/images/article-contents/webp/understanding-splice-slice-and-split-in-javascript/summary-table.webp" type="image/webp">
  <img src="/images/article-contents/png/understanding-splice-slice-and-split-in-javascript/summary-table.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture> -->
