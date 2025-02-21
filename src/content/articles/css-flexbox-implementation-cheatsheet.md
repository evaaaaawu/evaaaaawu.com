---
title: CSS Flexbox 實作小抄
subtitle: CSS Flexbox 是一種強大的佈局模型，能夠幫助我們簡化和靈活化網頁元素的排版。
author: src/content/authors/eva.json
imageSrc: /images/articles/css-flexbox-implementation-cheatsheet.png
imgAlt: CSS Flexbox Implementation Cheatsheet
creationDate: 2023-01-15
updateDate: 2024-11-10
tags:
  - CSS
featured: true
---

CSS Flexbox 是一種強大的佈局模型，能夠幫助我們簡化和靈活化網頁元素的排版。
它特別適合於需要響應式設計的場景，可以自動調整元素的大小和排列方式，以適應不同的設備和螢幕尺寸。
這裡分享我閱讀[這篇](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)文章整理的 CSS Flexbox 實作筆記:
## Properties for the Parent (flex container)
### 宣告
**display【宣告我要用 flex】**
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
  <source srcset="/images/article-contents/webp/flex-direction.webp" type="image/webp">
  <img src="/images/article-contents/png/flex-direction.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

#### **flex-wrap**
<!-- ```css
.container {
   flex-wrap: nowrap | wrap | wrap-reverse;
 }
``` -->

<picture>
  <source srcset="/images/article-contents/webp/flex-wrap.webp" type="image/webp">
  <img src="/images/article-contents/png/flex-wrap.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

**flex-flow**
- **= flex-direction + flex-wrap** 
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
  <source srcset="/images/article-contents/webp/align-content.webp" type="image/webp">
  <img src="/images/article-contents/png/align-content.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

#### **justify-content**
<!-- NOTE: This code will make UI broken. -->
<!-- ```css
.container {
   justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly | start | end | left | right ... + safe | unsafe;
 }
``` -->

<picture>
  <source srcset="/images/article-contents/webp/justify-content.webp" type="image/webp">
  <img src="/images/article-contents/png/justify-content.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

#### **align-items**
<!-- NOTE: This code will make UI broken. -->
<!-- ```css
.container {
   align-items: stretch | flex-start | flex-end | center | baseline | first baseline | last baseline | start | end | self-start | self-end + ... safe | unsafe;
 }
``` -->

<picture>
  <source srcset="/images/article-contents/webp/align-items.webp" type="image/webp">
  <img src="/images/article-contents/png/align-items.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

### **空隙**
```css
.container {
   row-gap: 10px;
   column-gap: 20px;
 }
```
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
  <source srcset="/images/article-contents/webp/order.webp" type="image/webp">
  <img src="/images/article-contents/png/order.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

#### **flex-grow / flex-shrink / flex-basis**
<picture>
  <source srcset="/images/article-contents/webp/flex-grow+flex-shrink+flex-basis.webp" type="image/webp">
  <img src="/images/article-contents/png/flex-grow+flex-shrink+flex-basis.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

#### **flex**
- 這是 flex-grow、flex-shrink 和 flex-basis 的簡寫。
- 第二和第三個參數（即 flex-shrink 和 flex-basis）是可選的。
- 默認值為 0 1 auto，但如果僅使用一個數值設定，例如 flex: 5;，這會將 flex-basis 變為 0%，相當於設定 flex-grow: 5; flex-shrink: 1; flex-basis: 0%;。
```css
.item {
   flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
 }
```
```css
.one {
   flex: 0 1 250px;
 }

.two {
   flex: 3 2 250px;
 }

.three {
   flex: 3 1 250px;
 }
```
#### **align-self**
<!-- ```css
.item {
   align-self: auto | flex-start | flex-end | center | baseline | stretch;
 }
``` -->

<picture>
  <source srcset="/images/article-contents/webp/align-self.webp" type="image/webp">
  <img src="/images/article-contents/png/align-self.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

## 其他推薦
可到 [Flexbox Playground](https://flexiting.com/playground/) 網站測試實際效果。
## Reference
[CSS Flexbox Layout Guide | CSS-Tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)