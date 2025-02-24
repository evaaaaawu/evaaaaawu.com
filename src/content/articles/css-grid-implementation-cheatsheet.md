---
title: CSS GRID 實作小抄
subtitle: CSS Grid 是一種強大的二維佈局系統，能夠幫助我們更靈活的控制網頁元素的排列和大小。
author: src/content/authors/eva.json
imageWebp: /images/articles/webp/css-grid-implementation-cheatsheet.webp
imagePng: /images/articles/png/css-grid-implementation-cheatsheet.png
imgAlt: CSS GRID Implementation Cheatsheet
creationDate: 2024-02-11
updateDate: 2024-02-11
tags:
  - CSS
featured: true
---

CSS Grid 是一種強大的二維佈局系統，能夠幫助我們更靈活的控制網頁元素的排列和大小。

它允許設計者在行（row）和列（column）上進行精確的控制，進而創建複雜的佈局，讓我們可以不需要依賴於浮動或定位等傳統技術。

這裡分享我閱讀 [CSS Grid Layout Guide](https://css-tricks.com/snippets/css/complete-guide-grid/) 這篇文章整理的 CSS GRID 實作筆記。

## Table of Contents

- [Properties for the Parent (Grid Container)](#properties-for-the-parent-grid-container)
  - [宣告](#宣告)
    - [display](#display)
  - [網格](#網格)
    - [grid-template-columns / grid-template-rows](#grid-template-columns--grid-template-rows)
    - [grid-template-areas](#grid-template-areas)
    - [grid-auto-rows / grid-auto-columns](#grid-auto-rows--grid-auto-columns)
    - [grid-auto-flow](#grid-auto-flow)
  - [容器整體](#容器整體)
    - [align-content](#align-content)
    - [justify-content](#justify-content)
    - [place-content](#place-content)
  - [容器內](#容器內)
    - [align-items](#align-items)
    - [justify-items](#justify-items)
    - [place-items](#place-items)
  - [網格間空隙](#網格間空隙)
    - [row-gap / column-gap](#row-gap--column-gap)
    - [gap](#gap)
- [Properties for the Children (Grid Items)](#properties-for-the-children-grid-items)
  - [grid-column-start / grid-column-end / grid-row-start / grid-row-end](#grid-column-start--grid-column-end--grid-row-start--grid-row-end)
  - [grid-column / grid-row](#grid-column--grid-row)
  - [grid-area](#grid-area)
  - [align-self](#align-self)
  - [justify-self](#justify-self)
  - [place-self](#place-self)
- [Reference](#reference)

## Properties for the Parent (Grid Container)

### **宣告**

#### **display**

- 宣告我要用 grid

```css
.container {
  display: grid | inline-grid;
}
```

### **網格**

#### **grid-template-columns / grid-template-rows**

- 網格邊線長度 & 交接點名稱
- 可直接寫寬 / 高 數字，亦可加入 \[自行取名\]，幫網格切線取名

```css
.container {
  grid-template-columns: [first] 40px [line2] 50px [line3] auto [col4-start] 50px [five] 40px [end];
  grid-template-rows: [row1-start] 25% [row1-end] 100px [third-line] auto [last-line];
}
```

<picture>
  <source srcset="/images/article-contents/webp/css-grid-implementation-cheatsheet/grid-template-columns+grid-template-rows.webp" type="image/webp">
  <img src="/images/article-contents/png/css-grid-implementation-cheatsheet/grid-template-columns+grid-template-rows.png" alt="" loading="lazy" style="width: 70%; margin: 0 auto; border-radius: 10px;">
</picture>

- 同一條網格切線可以有多個名字

```css
.container {
  grid-template-rows: [row1-start] 25% [row1-end row2-start] 25% [row2-end];
}
```

- 可以用 repeat() 簡化內容

```css
.container {
  grid-template-columns: repeat(3, 20px [col-start]);
}
```

#### **grid-template-areas**

- 網格區塊配置（要搭配 grid-area）

```css
.item-a {
  grid-area: header;
}
.item-b {
  grid-area: main;
}
.item-c {
  grid-area: sidebar;
}
.item-d {
  grid-area: footer;
}

.container {
  display: grid;
  grid-template-columns: 50px 50px 50px 50px;
  grid-template-rows: auto;
  grid-template-areas:
    "header header header header"
    "main main . sidebar"
    "footer footer footer footer";
}
```

<picture>
  <source srcset="/images/article-contents/webp/css-grid-implementation-cheatsheet/grid-template-areas.webp" type="image/webp">
  <img src="/images/article-contents/png/css-grid-implementation-cheatsheet/grid-template-areas.png" alt="" loading="lazy" style="width: 70%; margin: 0 auto; border-radius: 10px;">
</picture>

#### **grid-auto-rows / grid-auto-columns**

- 隱形網格邊線長度
- 指定任何自動生成的隱形網格邊線長度，我們可以根據以下流程說明思考 grid-auto-rows / grid-auto-columns 是如何被創建：

```css
.container {
  grid-template-rows: 90px 90px;
  grid-template-columns: 60px 60px;
}
```

<picture>
  <source srcset="/images/article-contents/webp/css-grid-implementation-cheatsheet/grid-auto-rows+grid-auto-columns(1).webp" type="image/webp">
  <img src="/images/article-contents/png/css-grid-implementation-cheatsheet/grid-auto-rows+grid-auto-columns(1).png" alt="" loading="lazy" style="width: 70%; margin: 0 auto; border-radius: 10px;">
</picture>

```css
.item-a {
  grid-column: 1 / 2;
  grid-row: 2 / 3;
}
.item-b {
  grid-column: 5 / 6;
  grid-row: 2 / 3;
}
```

<picture>
  <source srcset="/images/article-contents/webp/css-grid-implementation-cheatsheet/grid-auto-rows+grid-auto-columns(2).webp" type="image/webp">
  <img src="/images/article-contents/png/css-grid-implementation-cheatsheet/grid-auto-rows+grid-auto-columns(2).png" alt="" loading="lazy" style="width: 70%; margin: 0 auto; border-radius: 10px;">
</picture>

```css
.container {
  grid-auto-columns: 60px;
}
```

<picture>
  <source srcset="/images/article-contents/webp/css-grid-implementation-cheatsheet/grid-auto-rows+grid-auto-columns(3).webp" type="image/webp">
  <img src="/images/article-contents/png/css-grid-implementation-cheatsheet/grid-auto-rows+grid-auto-columns(3).png" alt="" loading="lazy" style="width: 70%; margin: 0 auto; border-radius: 10px;">
</picture>

#### **grid-auto-flow**

- 未定位 item 排列流向
- 如果我們有未在網格上明確定位的 item，則自動佈局算法會自動將這些項目放置在網格上，而此屬性是用於控制自動佈局算法的工作方式，它會決定未定位 item 排列的流向。

以下舉例說明：

```css
<section class="container">
  <div class="item-a">item-a</div>
  <div class="item-b">item-b</div>
  <div class="item-c">item-c</div>
  <div class="item-d">item-d</div>
  <div class="item-e">item-e</div>
</section>
```

我們定義了一個具有五列和兩行的網格，並且將 grid-auto-flow 設置為 row（這也是預設值）：

```css
.container {
  display: grid;
  grid-template-columns: 60px 60px 60px 60px 60px;
  grid-template-rows: 30px 30px;
  grid-auto-flow: row;
}
```

在將 items 放置到網格上時，我們只為其中兩個 items 指定了位置：

```css
.item-a {
  grid-column: 1;
  grid-row: 1 / 3;
}
.item-e {
  grid-column: 5;
  grid-row: 1 / 3;
}
```

因為我們將 grid-auto-flow 設置為 row，所以網格將如下所示：

<picture>
  <source srcset="/images/article-contents/webp/css-grid-implementation-cheatsheet/grid-auto-flow(1).webp" type="image/webp">
  <img src="/images/article-contents/png/css-grid-implementation-cheatsheet/grid-auto-flow(1).png" alt="" loading="lazy" style="width: 70%; margin: 0 auto; border-radius: 10px;">
</picture>

如果我們改成將 grid-auto-flow 設置為 column，則 item-b、item-c 和 item-d 將沿著列向下排列：

```css
.container {
  display: grid;
  grid-template-columns: 60px 60px 60px 60px 60px;
  grid-template-rows: 30px 30px;
  grid-auto-flow: column;
}
```

<picture>
  <source srcset="/images/article-contents/webp/css-grid-implementation-cheatsheet/grid-auto-flow(2).webp" type="image/webp">
  <img src="/images/article-contents/png/css-grid-implementation-cheatsheet/grid-auto-flow(2).png" alt="" loading="lazy" style="width: 70%; margin: 0 auto; border-radius: 10px;">
</picture>

### **容器整體**

#### **align-content**

- 容器整體的垂直對齊方式

<!-- ```css
.container {
  align-content: start | end | center | stretch | space-around | space-between | space-evenly;
}
``` -->

<picture>
  <source srcset="/images/article-contents/webp/css-grid-implementation-cheatsheet/align-content.webp" type="image/webp">
  <img src="/images/article-contents/png/css-grid-implementation-cheatsheet/align-content.png" alt="" loading="lazy" style="width: 70%; margin: 0 auto; border-radius: 10px;">
</picture>

#### **justify-content**

- 容器整體的水平對齊方式

<!-- ```css
.container {
  justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
}
``` -->

<picture>
  <source srcset="/images/article-contents/webp/css-grid-implementation-cheatsheet/justify-content.webp" type="image/webp">
  <img src="/images/article-contents/png/css-grid-implementation-cheatsheet/justify-content.png" alt="" loading="lazy" style="width: 70%; margin: 0 auto; border-radius: 10px;">
</picture>

#### **place-content**

- 容器整體的垂直＋水平對齊方式
- 用法: place-content: align-content justify-content;，也可以只設一個數字，代表 align-content = justify-content

```css
.center {
  display: grid;
  place-content: center;
}
```

### **容器內**

#### **align-items**

- 容器內每個網格內容的垂直對齊方式

<!-- ```css
.container {
  align-items: start | end | center | stretch;
}
``` -->

<picture>
  <source srcset="/images/article-contents/webp/css-grid-implementation-cheatsheet/align-items.webp" type="image/webp">
  <img src="/images/article-contents/png/css-grid-implementation-cheatsheet/align-items.png" alt="" loading="lazy" style="width: 70%; margin: 0 auto; border-radius: 10px;">
</picture>

#### **justify-items**

- 容器內每個網格內容的水平對齊方式

<!-- ```css
.container {
  justify-items: start | end | center | stretch;
}
``` -->

<picture>
  <source srcset="/images/article-contents/webp/css-grid-implementation-cheatsheet/justify-items.webp" type="image/webp">
  <img src="/images/article-contents/png/css-grid-implementation-cheatsheet/justify-items.png" alt="" loading="lazy" style="width: 70%; margin: 0 auto; border-radius: 10px;">
</picture>

#### **place-items**

- 容器內每個網格內容的垂直＋水平對齊方式
- 用法: place-items: align-items justify-items;，也可以只設一個數字，代表 align-items = justify-items

```css
.center {
  display: grid;
  place-items: center;
}
```

### **網格間空隙**

#### **row-gap / column-gap**

- 網格間的空隙

```css
.container {
  grid-template-columns: 100px 50px 100px;
  grid-template-rows: 80px auto 80px;
  row-gap: 15px;
  column-gap: 10px;
}
```

<picture>
  <source srcset="/images/article-contents/webp/css-grid-implementation-cheatsheet/row-gap+column-gap.webp" type="image/webp">
  <img src="/images/article-contents/png/css-grid-implementation-cheatsheet/row-gap+column-gap.png" alt="" loading="lazy" style="width: 70%; margin: 0 auto; border-radius: 10px;">
</picture>

#### **gap**

- 網格間的空隙
- 用法: gap: row-gap column-gap;，也可以只設一個數字，代表 row-gap = column-gap

```css
.container {
  grid-template-columns: 100px 50px 100px;
  grid-template-rows: 80px auto 80px;
  gap: 15px 10px;
}
```

## Properties for the Children(Grid Items)

#### **grid-column-start / grid-column-end / grid-row-start / grid-row-end**

- 決定 item 的格子從哪開始、到哪結束

```css
.item-a {
  grid-column-start: 2;
  grid-column-end: five;
  grid-row-start: row1-start;
  grid-row-end: 3;
}
```

<picture>
  <source srcset="/images/article-contents/webp/css-grid-implementation-cheatsheet/grid-column-start+grid-column-end+grid-row-start+grid-row-end(1).webp" type="image/webp">
  <img src="/images/article-contents/png/css-grid-implementation-cheatsheet/grid-column-start+grid-column-end+grid-row-start+grid-row-end(1).png" alt="" loading="lazy" style="width: 70%; margin: 0 auto; border-radius: 10px;">
</picture>

```css
.item-b {
  grid-column-start: 1;
  grid-column-end: span col4-start;
  grid-row-start: 2;
  grid-row-end: span 2;
}
```

<picture>
  <source srcset="/images/article-contents/webp/css-grid-implementation-cheatsheet/grid-column-start+grid-column-end+grid-row-start+grid-row-end(2).webp" type="image/webp">
  <img src="/images/article-contents/png/css-grid-implementation-cheatsheet/grid-column-start+grid-column-end+grid-row-start+grid-row-end(2).png" alt="" loading="lazy" style="width: 70%; margin: 0 auto; border-radius: 10px;">
</picture>

- 注意事項
  - 如果沒有宣告 grid-column-end 或 grid-row-end，則該項目預設會跨越 1 個網格軌道 (track)。
  - 項目之間可以互相重疊，可以使用 z-index 來控制它們的堆疊順序。

#### **grid-column / grid-row**

- 決定 item 的格子從哪開始、到哪結束

```css
.item-c {
  grid-column: 3 / span 2;
  grid-row: third-line / 4;
}
```

<picture>
  <source srcset="/images/article-contents/webp/css-grid-implementation-cheatsheet/grid-column+grid-row(1).webp" type="image/webp">
  <img src="/images/article-contents/png/css-grid-implementation-cheatsheet/grid-column+grid-row(1).png" alt="" loading="lazy" style="width: 70%; margin: 0 auto; border-radius: 10px;">
</picture>

<picture>
  <source srcset="/images/article-contents/webp/css-grid-implementation-cheatsheet/grid-column+grid-row(2).webp" type="image/webp">
  <img src="/images/article-contents/png/css-grid-implementation-cheatsheet/grid-column+grid-row(2).png" alt="" loading="lazy" style="width: 70%; margin: 0 auto; border-radius: 10px;">
</picture>

- 注意事項
  - 如果未宣告終止線的數值，該項目將預設跨越 1 個軌道 (track)。

#### **grid-area**

- 決定 item 的格子從哪開始、到哪結束

```css
.item {
  grid-area: <name> | <row-start> / <column-start> / <row-end> / <column-end>;
}
```

- 作為為項目指定名稱的一種方式：

```css
.item-d {
  grid-area: header;
}
```

- 作為簡寫（short-shorthand）來同時設定 grid-row-start + grid-column-start + grid-row-end + grid-column-end：

```css
.item-d {
  grid-area: 1 / col4-start / last-line / 6;
}
```

<picture>
  <source srcset="/images/article-contents/webp/css-grid-implementation-cheatsheet/grid-area(1).webp" type="image/webp">
  <img src="/images/article-contents/png/css-grid-implementation-cheatsheet/grid-area(1).png" alt="" loading="lazy" style="width: 70%; margin: 0 auto; border-radius: 10px;">
</picture>

<picture>
  <source srcset="/images/article-contents/webp/css-grid-implementation-cheatsheet/grid-area(2).webp" type="image/webp">
  <img src="/images/article-contents/png/css-grid-implementation-cheatsheet/grid-area(2).png" alt="" loading="lazy" style="width: 70%; margin: 0 auto; border-radius: 10px;">
</picture>

#### **align-self**

- 此網格內容的垂直對齊方式

<!-- ```css
.item {
  align-self: start | end | center | stretch;
}
``` -->

<picture>
  <source srcset="/images/article-contents/webp/css-grid-implementation-cheatsheet/align-self.webp" type="image/webp">
  <img src="/images/article-contents/png/css-grid-implementation-cheatsheet/align-self.png" alt="" loading="lazy" style="width: 70%; margin: 0 auto; border-radius: 10px;">
</picture>

#### **justify-self**

- 此網格內容的水平對齊方式

<!-- ```css
.item {
  justify-self: start | end | center | stretch;
}
``` -->

<picture>
  <source srcset="/images/article-contents/webp/css-grid-implementation-cheatsheet/justify-self.webp" type="image/webp">
  <img src="/images/article-contents/png/css-grid-implementation-cheatsheet/justify-self.png" alt="" loading="lazy" style="width: 70%; margin: 0 auto; border-radius: 10px;">
</picture>

#### **place-self**

- 此網格內容的垂直＋水平對齊方式
- 用法: place-self: align-self justify-self;，也可以只設一個數字，代表 align-self = justify-self

```css
.item-a {
  place-self: center;
}
```

<picture>
  <source srcset="/images/article-contents/webp/css-grid-implementation-cheatsheet/place-self.webp" type="image/webp">
  <img src="/images/article-contents/png/css-grid-implementation-cheatsheet/place-self.png" alt="" loading="lazy" style="width: 70%; margin: 0 auto; border-radius: 10px;">
</picture>

## Reference

[CSS Grid Layout Guide | CSS-Tricks](https://css-tricks.com/snippets/css/complete-guide-grid/)
