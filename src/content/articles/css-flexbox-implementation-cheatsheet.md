---
title: CSS Flexbox 實作小抄
subtitle: CSS Flexbox 是一種強大的佈局模型，能夠幫助我們簡化和靈活化網頁元素的排版。
author: Eva Wu
imageSrc: css-flexbox-implementation-cheatsheet.png
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

- **display【宣告我要用 flex】**

   ```css
   .container {
     display: flex; /* or inline-flex */
   }
   ```

### 排列方向與換行

- **flex-direction**

   ```css
   .container {
     flex-direction: row | row-reverse | column | column-reverse;
   }
   ```

   ![截圖 2023-12-19 上午11.02.55.png](./CSS%20Flexbox%20實作小抄-assets/截圖%202023-12-19%20上午11.02.55.png)

- **flex-wrap**

   ```css
   .container {
     flex-wrap: nowrap | wrap | wrap-reverse;
   }
   ```

   ![截圖 2023-12-19 上午11.04.19.png](./CSS%20Flexbox%20實作小抄-assets/截圖%202023-12-19%20上午11.04.19.png)

- **flex-flow**

   - **= flex-direction + flex-wrap** 

   - 預設值是 row nowrap

   ```css
   .container {
     flex-flow: column wrap;
   }
   ```

### 對齊方式

- **align-content**

   ```css
   .container {
     align-content: flex-start | flex-end | center | space-between | space-around | space-evenly | stretch | start | end | baseline | first baseline | last baseline + ... safe | unsafe;
   }
   ```

   ![截圖 2023-12-19 上午11.13.10.png](./CSS%20Flexbox%20實作小抄-assets/截圖%202023-12-19%20上午11.13.10.png)

- **justify-content**

   ```css
   .container {
     justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly | start | end | left | right ... + safe | unsafe;
   }
   ```

   ![截圖 2023-12-19 上午11.09.25.png](./CSS%20Flexbox%20實作小抄-assets/截圖%202023-12-19%20上午11.09.25.png)

   **justify-content: ... + safe | unsafe; 的用法（by GPT-4)**

   - 在大多數情況下，不需要顯示使用 `safe` 或 `unsafe`，因為瀏覽器會自動處理對齊和溢出問題。

   - 當處理特定的布局挑戰時，如當容器非常小且對齊方式可能導致內容不可見或溢出時，使用 `safe` 或 `unsafe` 可以提供更細致的控制。

   - 範例

      ```css
      .container { 
        display: flex; 
        justify-content: center safe; 
      }
      ```

      - 在這個例子中，容器內的項目將在主軸上居中對齊，但如果居中會導致內容溢出，瀏覽器會自動調整對齊方式，以確保所有項目都在容器內部且可見。

   - 總之，`safe` 和 `unsafe` 是用於處理對齊導致的溢出問題的高級功能。它們在大多數日常布局中不是必需的，但在特定情況下可以提供額外的布局控制。

- **align-items**

   ```css
   .container {
     align-items: stretch | flex-start | flex-end | center | baseline | first baseline | last baseline | start | end | self-start | self-end + ... safe | unsafe;
   }
   ```

   ![截圖 2023-12-19 上午11.43.52.png](./CSS%20Flexbox%20實作小抄-assets/截圖%202023-12-19%20上午11.43.52.png)

### **空隙**

- **row-gap / column-gap**

   ```css
   .container {
     display: flex;
     ...
     row-gap: 10px;
     column-gap: 20px;
   }
   ```

- **gap**

   ```css
   .container {
     display: flex;
     ...
     gap: 10px;
     gap: 10px 20px; /* row-gap column gap */
   }
   ```

## Properties for the Children (flex items)

- **order**

   ```css
   .item {
     order: 5; /* default is 0 */
   }
   ```

   ![截圖 2023-12-19 上午11.50.00.png](./CSS%20Flexbox%20實作小抄-assets/截圖%202023-12-19%20上午11.50.00.png)

- **flex-grow / flex-shrink / flex-basis**

   ![截圖 2023-12-19 上午11.56.36.png](./CSS%20Flexbox%20實作小抄-assets/截圖%202023-12-19%20上午11.56.36.png)

- **flex**

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

- **align-self**

   ```css
   .item {
     align-self: auto | flex-start | flex-end | center | baseline | stretch;
   }
   ```

   ![截圖 2023-12-19 下午12.05.01.png](./CSS%20Flexbox%20實作小抄-assets/截圖%202023-12-19%20下午12.05.01.png)

## Reference

- <https://css-tricks.com/snippets/css/a-guide-to-flexbox/>
