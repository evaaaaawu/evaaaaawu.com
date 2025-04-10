---
title: CSS Flexbox Implementation Cheatsheet
subtitle: CSS Flexbox is a powerful layout model that helps us simplify and make webpage element layouts more flexible.
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

CSS Flexbox is a powerful layout model that helps us simplify and make webpage element layouts more flexible.

It's particularly suitable for responsive design scenarios. The model automatically adjusts element sizes and arrangements to adapt to different devices and screen dimensions.

This article provides implementation notes on CSS Flexbox based on the comprehensive guide [CSS Flexbox Layout Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/).

## Table of Contents

- [Properties for the Parent (flex container)](#properties-for-the-parent-flex-container)
  - [Declaration](#declaration)
    - [display](#display)
  - [Direction and Wrapping](#direction-and-wrapping)
    - [flex-direction](#flex-direction)
    - [flex-wrap](#flex-wrap)
    - [flex-flow](#flex-flow)
  - [Alignment](#alignment)
    - [align-content](#align-content)
    - [justify-content](#justify-content)
    - [align-items](#align-items)
  - [Spacing](#spacing)
    - [row-gap / column-gap](#row-gap--column-gap)
    - [gap](#gap)
- [Properties for the Children (flex items)](#properties-for-the-children-flex-items)
  - [order](#order)
  - [flex-grow / flex-shrink / flex-basis and their shorthand flex](#flex-grow--flex-shrink--flex-basis-and-their-shorthand-flex)
  - [align-self](#align-self)
- [Other Recommendations](#other-recommendations)
- [Reference](#reference)

## Properties for the Parent (flex container)

### Declaration

#### **display**

- Declaring that I want to use flex

<!-- ```css
.container {
  display: flex | inline-flex;
}
``` -->

<picture>
  <source srcset="/images/article-contents/webp/css-flexbox-implementation-cheatsheet/display.webp" type="image/webp">
  <img src="/images/article-contents/png/css-flexbox-implementation-cheatsheet/display.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

### Direction and Wrapping

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
- Default value is row nowrap

<!-- ```css
.container {
  flex-flow: column wrap;
}
``` -->

<picture>
  <source srcset="/images/article-contents/webp/css-flexbox-implementation-cheatsheet/flex-flow.webp" type="image/webp">
  <img src="/images/article-contents/png/css-flexbox-implementation-cheatsheet/flex-flow.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

### Alignment

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

### **Spacing**

#### **row-gap / column-gap**

<!-- ```css
.container {
  display: flex;
  ...
  row-gap: 10px;
  column-gap: 20px;
}
``` -->

<picture>
  <source srcset="/images/article-contents/webp/css-flexbox-implementation-cheatsheet/row-gap+column-gap.webp" type="image/webp">
  <img src="/images/article-contents/png/css-flexbox-implementation-cheatsheet/row-gap+column-gap.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

#### **gap**

<!-- ```css
.container {
  display: flex;
  ...
  gap: 10px;
  gap: 10px 20px; /* row-gap column gap */
}
``` -->

<picture>
  <source srcset="/images/article-contents/webp/css-flexbox-implementation-cheatsheet/gap.webp" type="image/webp">
  <img src="/images/article-contents/png/css-flexbox-implementation-cheatsheet/gap.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

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

#### **flex-grow / flex-shrink / flex-basis and their shorthand flex**

These properties involve more complex behaviors and will be covered in a future update.

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

## Other Recommendations

The Flexbox Playground website allows for testing these properties in real-time: [Flexbox Playground](https://flexiting.com/playground/).

## Reference

[CSS Flexbox Layout Guide | CSS-Tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
