---
title: JavaScript 的 splice、slice、split 傻傻分不清楚
subtitle: splice 用於修改原陣列，可以進行插入、刪除或同時進行；slice 用於提取陣列或字串的部分，並返回新陣列或字串，且不改變原內容；split 會將字串依照指定分隔符號切分為新的陣列，原字串則保持不變。
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

開始之前直接先附上我整理的總結表格：

<picture>
  <source srcset="/images/article-contents/webp/understanding-splice-slice-and-split-in-javascript/summary-table.webp" type="image/webp">
  <img src="/images/article-contents/png/understanding-splice-slice-and-split-in-javascript/summary-table.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

splice、slice、split 在分開看它們時沒什麼感覺，但當三個都遇到一遍後就會覺得似曾相識，分不太清楚彼此的差異，就好像丸子三兄弟一樣，不仔細看清楚並停下來好好分析一番，就會不知道到底什麼情況下應該要用誰？

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

「丸子三兄弟」是日本 NHK 兒童教育節目《與媽媽同樂》於 1999 年 1 月推出的歌曲，在日本非常紅，歌曲風格超可愛又好聽，推薦可以聽聽看紓壓一下！

## Table of Contents

- [長男 splice](#長男-splice)
- [次男 slice](#次男-slice)
- [三男 split](#三男-split)
- [為什麼 slice 可以操作 array 和 string，但 splice 就只能夠操作 array，卻不能操作 string ?](#為什麼-slice-可以操作-array-和-string但-splice-就只能夠操作-array卻不能操作-string)

## 長男 splice

[mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) 解釋( Array.prototype.splice() )：

The splice() method changes the contents of an array by removing or replacing existing elements and/or adding new elements in place.

在說明 splice 的功能前，先來提醒一下以後在服用「陣列」類型的常用函式時需要注意的事項，就是**知道它所回傳的型態、方式是什麼很重要**。
e.g., 是回傳「陣列」還是「字串」? 回傳的是「一個新的陣列」還是「改變原本的陣列」? 知道後在服用時才比較不會寫出錯誤的程式碼。

那我們就開始吧！

**splice 可以做 2 件事：在原「陣列」中 1. 插入元素 2. 刪除元素，也可以兩者同時做 → 它會改變原本的「陣列」，並可以自行定義一個新的變數名稱來接住「被刪除的元素」，若沒有被刪除的元素則會回傳空陣列。**

來寫一些例子：

從索引 2 的位置開始，刪除 0 個元素並插入「a」：

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

從索引 2 的位置開始，刪除 1 個元素：

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

從索引 2 的位置開始，刪除 1 個元素並插入「a」：

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

從索引 2 的位置開始，刪除 1 個元素並插入「a, b, c」：

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

## 次男 slice

[mdn](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) 解釋( Array.prototype.slice() )：

The slice() method returns a shallow copy of a portion of an array into a new array object selected from start to end (end not included) where start and end represent the index of items in that array. The original array will not be modified.

[mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice) 解釋( String.prototype.slice() )：

The slice() method extracts a section of a string and returns it as a new string, without modifying the original string.

**slice 可以提取「陣列」或「字串」的一部分 → 它會回傳一個新的「陣列」或「字串」，也就是被提取的片段，而原本的「陣列」或「字串」並不會被改變。**

來寫一些例子：

從位置 3 開始切：

<!-- ```js
let arr = [0, 1, 2, 3, 4, 5, 6];
console.log(arr.slice(3));
// [ 3, 4, 5, 6 ]
``` -->

<picture>
  <source srcset="/images/article-contents/webp/understanding-splice-slice-and-split-in-javascript/code-5.webp" type="image/webp">
  <img src="/images/article-contents/png/understanding-splice-slice-and-split-in-javascript/code-5.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

從位置 3 開始切，切到位置 6 (不包含位置 6 )：

<!-- ```js
let arr = [0, 1, 2, 3, 4, 5, 6];
console.log(arr.slice(3, 6));
// [ 3, 4, 5 ]
``` -->

<picture>
  <source srcset="/images/article-contents/webp/understanding-splice-slice-and-split-in-javascript/code-6.webp" type="image/webp">
  <img src="/images/article-contents/png/understanding-splice-slice-and-split-in-javascript/code-6.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

以上只有舉出提取「陣列」的例子，至於提取「字串」的部分，就請發揮想像力，自行舉一反三了。(翻譯：我懶得寫了 😂)

## 三男 split

[mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) 解釋( String.prototype.split() )：

The split() method takes a pattern and divides a String into an ordered list of substrings by searching for the pattern, puts these substrings into an array, and returns the array.

**split 的作用就是「將字串分割成陣列」，使用時必須告訴它你想要用原本字串裡面的什麼符號作為分隔 → 它會回傳一個新的「陣列」，而原本的「字串」並不會被改變。**

直接用以下例子進行說明：

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

要注意使用的分隔符號在回傳的新「陣列」中會不見，以上述的例子來看，我們指定用「!」作為分隔符號，所以回傳的新陣列，也就是原本字串的分割，就不會有「!」出現。

這個方法在處理 .csv 檔案時會非常好用！(.csv 是 Excel 或 Google Sheet 最常見的匯出格式之一，會把 spreadsheet 裡的欄位變成用逗號隔開的文字檔案)

再來也看一下 [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) 提供的 Demo：

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

這邊可以發現若原本的字串是一個完整的句子，使用「' '」(中間有空格)作為分隔符號會拆分成一個一個單子、使用「''」(中間沒有空格)作為分隔符號會拆分成一個一個字母，使用「」(沒有放入任何東西)作為分隔符號則會把原本完整的字串(這裡是一個完整的句子)，直接放進新的陣列中，成為此陣列唯一的元素。

好了，「大家來找碴」遊戲到這裡暫時告一段落，這之中大概還有很多功能我沒有列舉出來，這些就等以後如果我有機會碰到再說了。

## 為什麼 slice 可以操作 array 和 string，但 splice 就只能夠操作 array，卻不能操作 string？

這個是我玩完「找不同」遊戲後心裡所產生的疑問，目前我的理解是，通常可以拿來操作 array 的函式應該大部分也可以用來操作 string，畢竟這樣能夠一舉兩得，是再好不過的了，但是 splice 為什麼就偏偏只能操作 array？

這是因為在 JavaScript 中，若變數型態為 Primitive Types (包含 string)，它會有 Immutable (不可變的) 的特性，也就是你不能直接修改變數型態為 Primitive Types 的內容。注意這邊是指不能直接呼叫任何內建函式去做修改，但是還是可以重新賦值讓內容改變。以下舉個簡單的例子做說明：

若變數型態為 Primitive Types，只呼叫任何內建函式，變數的值並不會改變，e.g.,

<!-- ```js
let a = "hello";
a.toUpperCase();
console.log(a); // hello
``` -->

<picture>
  <source srcset="/images/article-contents/webp/understanding-splice-slice-and-split-in-javascript/code-11.webp" type="image/webp">
  <img src="/images/article-contents/png/understanding-splice-slice-and-split-in-javascript/code-11.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

必須要重新賦值，a 才會被改變：

<!-- ```js
let a = "hello";
a = a.toUpperCase();
console.log(a); // HELLO
``` -->

<picture>
  <source srcset="/images/article-contents/webp/understanding-splice-slice-and-split-in-javascript/code-12.webp" type="image/webp">
  <img src="/images/article-contents/png/understanding-splice-slice-and-split-in-javascript/code-12.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

回到原本的問題，我們知道 splice 函式本身的功能是會直接改變原本的值的，這樣就會和 JavaScript 中 Immutable (不可變的) 的特性相互違背，這也就是為什麼 splice 函式不能操作 string 的原因，就好像是法律上會有憲法的最高原則掛在那邊，如果底下的民法、刑法等違背了憲法，就會不適用的道理一樣。但是因為 array 在 JavaScript 中的變數型態為 Object，沒有 Immutable (不可變的) 的特性，所以直接操作原本的值並不會有問題。以下也舉個簡單的例子說明：

<!-- ```js
let arr = [1, 2, 3];
arr.push(4);
console.log(arr); // [1, 2, 3, 4]
``` -->

<picture>
  <source srcset="/images/article-contents/webp/understanding-splice-slice-and-split-in-javascript/code-13.webp" type="image/webp">
  <img src="/images/article-contents/png/understanding-splice-slice-and-split-in-javascript/code-13.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

從上述的例子可以看到，若變數型態是 Object，直接呼叫內建函式，變數的值就會被改變。

至於 slice 函式，因為它本身的功能並不會改變原本的值，所以就不會有上述相互違背的情況發生，用在 array 和 string 的操作上都不會有問題。

最後，再貼一次我整理的總結表格，希望以後可以輕鬆分辨出這三位丸子三兄弟，不要再傻傻分不清楚了。

<picture>
  <source srcset="/images/article-contents/webp/understanding-splice-slice-and-split-in-javascript/summary-table.webp" type="image/webp">
  <img src="/images/article-contents/png/understanding-splice-slice-and-split-in-javascript/summary-table.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>
