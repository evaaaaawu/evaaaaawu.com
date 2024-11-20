---
title: 征服 RWD
subtitle: RWD 是一種設計方式，讓網站能夠在各種設備和螢幕尺寸下進行調整，以最佳化的方式呈現內容。
author: Eva Wu
imageSrc: mastering-responsive-web-design-rwd.png
imgAlt: Mastering Responsive Web Design
creationDate: 2023-02-05
updateDate: 2024-11-01
tags:
  - CSS
featured: true
---

RWD = Responsive Web Design = 響應式網頁設計，它是一種設計方式，讓網站能夠在各種設備和螢幕尺寸下自適應顯示。

這代表無論使用者使用的是桌面、筆記型電腦、平板還是手機，網站都會根據設備螢幕大小進行調整，以最佳化的方式呈現內容。

RWD 的核心目標是提供一致且良好的使用體驗，不需要針對不同設備開發多個版本的網頁。

而在看了 CSS 大師 [Kevin Powell](https://www.youtube.com/kevinpowell) 推出的 [Conquering Responsive Layouts](https://courses.kevinpowell.co/conquering-responsive-layouts) 這堂課程後，分享一些我整理寫出具有 RWD 網頁可以注意的事和要擁有的思維:

- 預設的版面都是 responsive 的，是我們設定的 css 破壞了它。

- 不要設固定尺寸的 width，這樣會無法根據多螢幕自動調整大小，**要使用百分比取代**。

- 能不用到 heights 就不要用，使用 heights 會因不同螢幕尺寸而破壞版面。

- 在設定 font-size 時，使用 rem 為相對單位的參考基準點是 html element 的 font-size 大小(預設為 16 px)；使用 em 為相對單位的參考基準點則是它的 parent element 的 font-size 大小(預設為 16 px)。

- 在設定 margin, padding 以及其他非 font-size 的 css 時，使用 rem 為相對單位的參考基準點是 html element 的 font-size 大小；使用 em 為相對單位的參考基準點則是同一 element 的 font-size 大小。

- 大部分情況，設定 font-size 較適合使用 rem；設定 margin, padding 較適合使用 em。

- 使用相對單位可以讓我們在實作 responsive layouts 時，一切變得更簡單。

   - e.g., 只要簡單在 media query 中更改 html element 的 font-size 大小，就可以輕易讓整個網頁在大螢幕上放大。

      ```css
      @media (min-width: 700px) {
        html {
          font-size: 25px;
        }
      }
      ```

- 使用 max-width 以防止在大螢幕檢視時寬度過大。e.g. 如下:

   ```css
   .container {
     background: #23424a;
     color: white;
   
     width: 80%;
     max-width: 750px; /* 新增這個 */
     margin: 0 auto;
   
     padding: 2em;
   }
   ```

- CSS Units: vh, vw, vmin, vmax

   - vh = viewport height、vw = viewport width。

   - 若想要讓某元素置中版面，可以將高度直接設定 100vh，並使用 align-items/justify-content: center。

   - 若想要讓圖片寬度佔總版面寬度的一半，那就是 50vw。

   - vmin 和 vmax 兩者的差異，在於 min 指的是 vw 和 vh 中較小的一邊；max 則是 vm 和 vh 中較大的一邊。舉例來說，1280px \* 1600px 的長寬視窗比，vmin 指的就是 1280px；vmax 則是 1600px。而設定的則是比率，例如 120vmin 指的是 1280px \* 120% 的意思；而 80vmax 指的是 1600px \* 80% 的意思。

- 下述兩個設定其實本質上是一樣的，但第一個寫法比較符合直覺，所以我會選擇用第一個。

   ```css
   .container {
     width: 100%;
     max-width: 600px;
   }
   ```

   ```css
   .container {
     width: 600px; 
     max-width: 100%;
   }
   ```

- 補充: min(), max(), and clamp()

   - min() 寫法:

      ```css
      .content {
        width: min(500px, 70%)
      }
      ```

      上述寫法等同於:

      ```css
      .content {
        width: 70%
        max-width: 500px;
      }
      ```

   - clamp() 寫法:

      ```css
      .title {
        font-size: clamp(2rem, 5vw, 5rem);
      }
      
      .p {
        font-size: clamp(1rem, 1.25vw, 1.25rem);
      }
      ```

### Reference

- [Conquering Responsive Layouts](https://courses.kevinpowell.co/view/courses/conquering-responsive-layouts)
