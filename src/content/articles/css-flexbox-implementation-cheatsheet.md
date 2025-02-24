---
title: CSS Flexbox 實作小抄
subtitle: CSS Flexbox 是一種強大的佈局模型，能夠幫助我們簡化和靈活化網頁元素的排版。
author: src/content/authors/eva.json
imageWebp: /images/articles/webp/css-flexbox-implementation-cheatsheet.webp
imagePng: /images/articles/png/css-flexbox-implementation-cheatsheet.png
imgAlt: CSS Flexbox Implementation Cheatsheet
creationDate: 2024-02-04
updateDate: 2024-02-04
tags:
  - CSS
featured: true
---

CSS Flexbox 是一種強大的佈局模型，能夠幫助我們簡化和靈活化網頁元素的排版。

它特別適合於需要響應式設計的場景，可以自動調整元素的大小和排列方式，以適應不同的設備和螢幕尺寸。

這裡分享我閱讀 [CSS Flexbox Layout Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) 這篇文章整理的 CSS Flexbox 實作筆記。

## Table of Contents

- [Properties for the Parent (flex container)](#properties-for-the-parent-flex-container)
  - [宣告](#宣告)
    - [display](#display)
  - [排列方向與換行](#排列方向與換行)
    - [flex-direction](#flex-direction)
    - [flex-wrap](#flex-wrap)
    - [flex-flow](#flex-flow)
  - [對齊方式](#對齊方式)
    - [align-content](#align-content)
    - [justify-content](#justify-content)
    - [align-items](#align-items)
  - [空隙](#空隙)
    - [row-gap / column-gap](#row-gap--column-gap)
    - [gap](#gap)
- [Properties for the Children (flex items)](#properties-for-the-children-flex-items)
  - [order](#order)
  - [flex-grow / flex-shrink / flex-basis 以及它們的縮寫 flex](#flex-grow--flex-shrink--flex-basis-以及它們的縮寫-flex)
  - [align-self](#align-self)
- [其他推薦](#其他推薦)
- [Reference](#reference)

## Properties for the Parent (flex container)

### 宣告

#### **display**

- 宣告我要用 flex

```css
.container {
  display: flex; /* or inline-flex */
}
```

### 排列方向與換行

#### **flex-direction**

<!-- ```css
.container {
  flex-direction: row | row-reverse | column | column-reverse;
}
``` -->

<picture>
  <source srcset="/images/article-contents/webp/css-flexbox-implementation-cheatsheet/flex-direction.webp" type="image/webp">
  <img src="/images/article-contents/png/css-flexbox-implementation-cheatsheet/flex-direction.png" alt="" loading="lazy" style="width: 70%; margin: 0 auto; border-radius: 10px;">
</picture>

#### **flex-wrap**

<!-- ```css
.container {
  flex-wrap: nowrap | wrap | wrap-reverse;
}
``` -->

<picture>
  <source srcset="/images/article-contents/webp/css-flexbox-implementation-cheatsheet/flex-wrap.webp" type="image/webp">
  <img src="/images/article-contents/png/css-flexbox-implementation-cheatsheet/flex-wrap.png" alt="" loading="lazy" style="width: 70%; margin: 0 auto; border-radius: 10px;">
</picture>

#### **flex-flow**

- = flex-direction + flex-wrap
- 預設值是 row nowrap

```css
.container {
  flex-flow: column wrap;
}
```

### 對齊方式

#### **align-content**

<!-- NOTE: This code will make UI broken. -->
<!-- ```css
.container {
  align-content: flex-start | flex-end | center | space-between | space-around | space-evenly | stretch | start | end | baseline | first baseline | last baseline + ... safe | unsafe;
}
``` -->

<picture>
  <source srcset="/images/article-contents/webp/css-flexbox-implementation-cheatsheet/align-content.webp" type="image/webp">
  <img src="/images/article-contents/png/css-flexbox-implementation-cheatsheet/align-content.png" alt="" loading="lazy" style="width: 70%; margin: 0 auto; border-radius: 10px;">
</picture>

#### **justify-content**

<!-- NOTE: This code will make UI broken. -->
<!-- ```css
.container {
  justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly | start | end | left | right ... + safe | unsafe;
}
``` -->

<picture>
  <source srcset="/images/article-contents/webp/css-flexbox-implementation-cheatsheet/justify-content.webp" type="image/webp">
  <img src="/images/article-contents/png/css-flexbox-implementation-cheatsheet/justify-content.png" alt="" loading="lazy" style="width: 70%; margin: 0 auto; border-radius: 10px;">
</picture>

#### **align-items**

<!-- NOTE: This code will make UI broken. -->
<!-- ```css
.container {
  align-items: stretch | flex-start | flex-end | center | baseline | first baseline | last baseline | start | end | self-start | self-end + ... safe | unsafe;
}
``` -->

<picture>
  <source srcset="/images/article-contents/webp/css-flexbox-implementation-cheatsheet/align-items.webp" type="image/webp">
  <img src="/images/article-contents/png/css-flexbox-implementation-cheatsheet/align-items.png" alt="" loading="lazy" style="width: 70%; margin: 0 auto; border-radius: 10px;">
</picture>

### **空隙**

#### **row-gap / column-gap**

```css
.container {
  display: flex;
  ...
  row-gap: 10px;
  column-gap: 20px;
}
```

#### **gap**

```css
.container {
  display: flex;
  ...
  gap: 10px;
  gap: 10px 20px; /* row-gap column gap */
}
```

## Properties for the Children (flex items)

#### **order**

<!-- ```css
.item {
  order: 5; /* default is 0 */
}
``` -->

<picture>
  <source srcset="/images/article-contents/webp/css-flexbox-implementation-cheatsheet/order.webp" type="image/webp">
  <img src="/images/article-contents/png/css-flexbox-implementation-cheatsheet/order.png" alt="" loading="lazy" style="width: 70%; margin: 0 auto; border-radius: 10px;">
</picture>

#### **flex-grow / flex-shrink / flex-basis 以及它們的縮寫 flex**

這個部份我覺得我好像沒有真的理解，也懷疑實作上是否會很常用到這些屬性，決定等真的需要用到時再來了解。

<!-- NOTE: Save the picture temporarily -->
<!-- <picture>
  <source srcset="/images/article-contents/webp/css-flexbox-implementation-cheatsheet/flex-grow+flex-shrink+flex-basis.webp" type="image/webp">
  <img src="/images/article-contents/png/css-flexbox-implementation-cheatsheet/flex-grow+flex-shrink+flex-basis.png" alt="" loading="lazy" style="width: 70%; margin: 0 auto; border-radius: 10px;">
</picture> -->

#### **align-self**

<!-- ```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
``` -->

<picture>
  <source srcset="/images/article-contents/webp/css-flexbox-implementation-cheatsheet/align-self.webp" type="image/webp">
  <img src="/images/article-contents/png/css-flexbox-implementation-cheatsheet/align-self.png" alt="" loading="lazy" style="width: 70%; margin: 0 auto; border-radius: 10px;">
</picture>

## 其他推薦

可到 [Flexbox Playground](https://flexiting.com/playground/) 網站測試實際效果。

## Reference

[CSS Flexbox Layout Guide | CSS-Tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
