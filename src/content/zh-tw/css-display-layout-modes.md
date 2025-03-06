---
title: CSS 的 display 排列模式
subtitle: CSS 的 display 屬性會決定一個元素在頁面中的排列方式，並影響其內部和周圍元素的佈局。
author: src/content/authors/eva.json
imageWebp: /images/articles/webp/css-display-layout-modes.webp
imagePng: /images/articles/png/css-display-layout-modes.png
imgAlt: CSS Display Layout Modes
creationDate: 2023-01-22
updateDate: 2023-01-22
tags:
  - CSS
featured: false
---

### display: block

預設會佔用整個容器的寬度，使相鄰元素被擠到下一行。

### display: inline

類似自然流動的文字，它佔用的空間由內容決定，後面的元素會緊鄰在後。你無法隨意控制 inline 元素的寬度和高度。

### display: inline-block

以 inline 方式排版，但具有 block 屬性表示你對它的尺寸有絕對的掌控權，但是它不會占用整個水平空間，可以彼此相鄰。

### display: flex

可參考我寫的 [CSS Flexbox 實作小抄](/articles/css-flexbox-implementation-cheatsheet) 本篇文章

### display: grid

可參考我寫的 [CSS GRID 實作小抄](/articles/css-grid-implementation-cheatsheet) 本篇文章

### display: none

這個設定會讓元素消失。

### 其他

[htmlreference.io](https://htmlreference.io) 網站可以快速查看到元素和它們的 display 屬性。
