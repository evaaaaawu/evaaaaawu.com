---
title: CSS 的 position 定位
subtitle: CSS 的 position 屬性用於控制 HTML 元素的定位方式。
author: src/content/authors/eva.json
imageSrc: /images/articles/css-positioning-explained.png
imgAlt: CSS Positioning Explained
creationDate: 2023-01-29
updateDate: 2024-11-01
tags:
  - CSS
featured: false
---

### 靜態定位 position: static

```
.targetClass {
    position: static;  // 昭告天下，我是乖乖牌 
    top: 100px;        // 無效 
    left: 100px;       // 無效 
}
```

### 相對定位 position: relative

```
.targetClass {
    position: relative;    // 我是一般少年 
    top: 10px;             // 會受外在刺激，產生向下偏移 
    left: 20px;            // 會受外在刺激，產生向右偏移 
}
```

### 絕對定位 position: absolute

一但設定位移屬性 top / right / bottom / left 時，absolute 元素會開始往上層尋找到非靜態區塊 (不是 position: static 的元素) 作為定位參考點。

因此，要使用絕對定位時，我們通常會在它的父層定義 position: relative ，做為狂妄少年 (absolute) 的定位參考點。

```
.targetClass {
    position: absolute;  // 我是狂妄少年
    top: 10px;           // 會受外在刺激，產生向下偏移，但請給我一個歸屬！ 
    left: 20px;          // 會受外在刺激，產生向右偏移，但請給我一個歸屬！
} 
```

### 固定定位 position: fixed

```
.targetClass {
    position: fixed;  // 我是猖狂少年
    top: 10px;        // 會受外在刺激，產生向下偏移，但我心中的格局是像 viewport 這麼大！
    left: 20px;       // 會受外在刺激，產生向右偏移，但我心中的格局是像 viewport 這麼大！
}
```

根據「頁面當前的可視區」來定位就代表，當頁面捲動時，猖狂少年 (fixed) 的區塊會還是會一直保持在畫面上的相同位置。

### z-index

position 是一個「座標系統」的概念，當你使用 position 讓元素跳脫頁面流時，網頁元素除了 x 與 y 軸外，也會變成像一層層疊加的圖層，也就是有了「深度」。

我們可以通過 z-index 來定義元素的層級，愈大的數字會放在愈上層，愈小的數字會放在愈下層，而視窗位於 0 的位置。
