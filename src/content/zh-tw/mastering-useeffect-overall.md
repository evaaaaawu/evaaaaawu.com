---
title: 攻克 useEffect - 統整篇
subtitle: 詳細介紹 React 的 useEffect 和使用策略。
author: src/content/authors/eva.json
imageWebp: /images/articles/webp/mastering-useeffect-overall.webp
imagePng: /images/articles/png/mastering-useeffect-overall.png
imgAlt: Mastering useEffect
creationDate: 2025-06-25
updateDate: 2025-06-25
tags:
  - React
featured: true
---

## Table of Contents

- [useEffect 簡介](#useeffect-簡介)
- [useEffect 的執行時機](#useeffect-的執行時機)
- [useEffect 接受兩個參數：setup function 和 dependencies，並可以歸納為三大處理步驟](#useeffect-接受兩個參數setup-function-和-dependencies並可以歸納為三大處理步驟)
- [useEffect 的使用策略](#useeffect-的使用策略)
  - [誠實地在 dependency array 中包含 effect 內部使用的所有 component 內的值](#誠實地在-dependency-array-中包含-effect-內部使用的所有-component-內的值這是處理依賴問題時應該優先考慮的方法)
  - [使用 functional update 避免不必要的 effect 重新執行](#當想要避免不必要的-effect-重新執行使用-functional-update是優先考慮的選項)
  - [使用 useReducer 處理互相依賴的狀態變數](#當遇到兩個狀態變數的值互相依賴導致無法使用-functional-update-時使用-usereducer是解決方法)
  - [根據 prop 計算下一個 state 時將 reducer 定義在 component 內部](#當遇到需要根據-prop-計算下一個-state-時使用-usereducer-且將-reducer-定義在-component-內部是解決方法)
  - [將只在 effect 內部使用的函式移入 effect 內部](#如果某些函式只在-effect-內部使用就將函式移入-effect-內部)
  - [將不使用 component scope 資料的函式提升到 component 外部](#若函式被多個-effect-使用且函式不使用-component-scope-內的任何資料propsstate-等則將函式提升到-component-外部)
  - [使用 useCallback Hook 處理需要存取 component 內部資料的函式](#若函式被多個-effect-使用且函式需要存取-component-內部的-state-或-props-時使用-usecallback-hook)
  - [在 cleanup 函式中取消非同步請求](#若-useeffect-內部包含非同步方法且該非同步方法支援取消操作請記得在-cleanup-函式中取消非同步請求)
  - [使用 boolean 變數追蹤 component 有效性](#若-useeffect-內部包含非同步方法但該非同步方法沒有支援取消操作則最簡單的臨時解決方案是使用一個-boolean-變數來追蹤-component-是否仍然有效)

## useEffect 簡介

useEffect 是 React 提供的一個內建 Hooks，主要是用於連接外部系統，例如：伺服器端、瀏覽器提供的 API 或是第三方函式庫(因為這部分不是由 React 本身處理的，所以稱為外部系統)。

React 的函式元件需要是純函式，但如果我們需要執行帶有副作用的操作，例如：請求 API、使用第三方函式庫，我們就需要將這些程式碼放在 useEffect 中執行，目的是為了解決帶有副作用的操作可能會產生的負面影響如下：

- React component function 多次執行疊加所造成的副作用影響難以預測。

- React component function 的副作用可能會拖慢甚至阻塞函式本身的計算流程。

- 當 React component function 的副作用處理涉及到非同步的後續影響時，副作用被多次執行的順序不一定與非同步事件的回應順序相同，而導致 race condition 的問題。

- 當 React component function 的副作用會啟動持續性的監聽類工作(例如註冊某個事件的訂閱)，但是沒有處理對應的取消訂閱時，就有可能在 component unmount 之後仍持續監聽，導致 memory leak 的問題。

使用 useEffect 需要有的一個重要觀念是 React 的 function components 擁有「渲染隔離性」，它的運作原理是每次 render 都會產生一個完整的「快照」，包含該時刻的 props、state、event handlers、effects，以及所有其他的變數和函式。因此我們必須認知到 useEffect 和 function components 一樣：「每個渲染都是獨立的，擁有自己的一切」。在思維上，我們應該把 useEffect 視為同步工具而非生命週期方法。

## useEffect 的執行時機

1. 當元件被加入時 (mount)，useEffect 會被第一次執行。

2. 當每次元件重新渲染時，如果 dependencies 的值有改變，先將舊的 props 和 state 執行 cleanup function(如果有的話)，再帶著新的 props 和 state 執行 setup function。

   更詳細的說明，若 useEffect 中含有 cleanup 函式，其執行時機會在新的 function components render 完 UI、瀏覽器進行繪製，且使用者看到新的 UI 後才會開始清理前一個 effect。

   實際的執行順序會像以下範例：

   1. React render UI（對應 `{id: 20}`）

   2. 瀏覽器進行繪製，使用者看到新的 UI

   3. React 清理前一個 effect（仍然是 `{id: 10}`）

   4. React 執行新的 effect（對應 `{id: 20}`）

3. cleanup function 的程式碼，會在元件生命週期結束 (unmount) 時，執行最後一次。

## useEffect 接受兩個參數：setup function 和 dependencies，並可以歸納為三大處理步驟

1. 定義一個 effect 函式(setup function)

   setup function 內會寫一個如何連結外部系統的程式碼，包在 useEffect 中可以從 component render 的過程中隔離副作用的執行時機，其會將副作用的處理隔離到每次的 render 流程完成之後才執行，以避免副作用的處理直接阻塞畫面的產生與更新。

2. 在 setup function 加上 cleanup 函式來清理副作用（如果有需要的話）

   如果需要清除邏輯，可以在 setup function 中回傳一個清除 function，讓開發者能夠在 component function 中定義副作用的同時，也可以透過定義「cleanup 函式」來指定如何清除該副作用所造成的影響。cleanup 函式會在每次副作用重新執行前以及 component unmount 時被執行，以避免副作用所造成的影響不斷疊加。具體作法是在 effect 函式中 return 另一個函式作為 cleanup 函式，並在其中處理副作用的清除或逆轉。

3. 指定 dependencies

   dependencies 參數是可選的陣列，可以傳入 props、state 或元件中任何使用的變數。傳入後，React 會使用 [Object.is](Object.is) 算法來進行比較，如果 dependencies 中任意一個值與前一次不同，則此 useEffect 會重新執行。這樣做讓 useEffect 可以指定 effect 函式的依賴陣列，以跳過某些不必要的副作用處理。

   但這裡需要特別注意的是，dependencies 是一種效能優化，而非執行時機的控制，它是用來判斷「何時可以安全地跳過」而不是指定「只有何時才會執行」，當 dependencies 沒有更新時，「跳過執行副作用」的行為並不是絕對保證的，因此請不要欺諞 dependencies !!! 而根據此原則，React 官方有提供專門幫助開發者偵測甚至自動修正 hooks dependencies 的補助 linter 工具，且這套適用於 ESLint 的 React hooks linter 規則已經内建於 Create React App 或 Next.js 等整合好的開發環境之中了。另外，我們同時也需要在程式碼編輯器中安裝對應的 ESLint plugin，這樣才能在 dependencies 有問題時看到 linter 提示的警告以及使用對應的自動修復功能。

   另外，「直接不提供 dependencies 參數」與「提供一個空陣列 \[ \] 作為 dependencies 參數」，兩者的意義和執行效果是完全不同的。

   - **直接不提供 dependencies 參數**：代表維持 useEffect 的預設行為，也就是每次 render 後都會執行一次 effect 函式。

   - **提供一個空陣列 \[ \] 作為 dependencies 參數**：代表這個 effect 函式沒有依賴任何資料，component 可以在每次 re-render 時都安全的跳過 effect 函式的執行。

## useEffect 的使用策略

### 「誠實地在 dependency array 中包含 effect 內部使用的所有 component 內的值。」這是處理依賴問題時應該優先考慮的方法。

具體範例如下：

<picture>
  <source srcset="/images/article-contents/webp/mastering-useeffect-overall/code-1.webp" type="image/webp">
  <img src="/images/article-contents/png/mastering-useeffect-overall/code-1.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

### 當想要避免不必要的 effect 重新執行，「使用 functional update」是優先考慮的選項。

**使用條件**

- 當你想要避免不必要的 effect 重新執行時

- 若狀態變數單純(無相互依賴的情形)，且當你發現 effect 依賴於某個狀態值，但只是為了更新它時(如果有兩個狀態變數的值互相依賴或需要根據 prop 計算下一個 state，在這些情況下 functional update 就無法勝任。)

- 當你想要 batch multiple updates（批次多個更新）時

**具體範例**

<picture>
  <source srcset="/images/article-contents/webp/mastering-useeffect-overall/code-2.webp" type="image/webp">
  <img src="/images/article-contents/png/mastering-useeffect-overall/code-2.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

### 當遇到兩個狀態變數的值互相依賴，導致無法使用 functional update 時，「使用 useReducer」是解決方法。

具體範例如下：

<picture>
  <source srcset="/images/article-contents/webp/mastering-useeffect-overall/code-3.webp" type="image/webp">
  <img src="/images/article-contents/png/mastering-useeffect-overall/code-3.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

### 當遇到需要根據 prop 計算下一個 state 時，使用 useReducer 且「**將 reducer 定義在 component 內部**」是解決方法。

具體範例如下：

<picture>
  <source srcset="/images/article-contents/webp/mastering-useeffect-overall/code-4.webp" type="image/webp">
  <img src="/images/article-contents/png/mastering-useeffect-overall/code-4.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

### **如果某些函式只在 effect 內部使用，就**「**將函式移入 effect 內部**」

具體範例如下：

<picture>
  <source srcset="/images/article-contents/webp/mastering-useeffect-overall/code-5.webp" type="image/webp">
  <img src="/images/article-contents/png/mastering-useeffect-overall/code-5.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

<picture>
  <source srcset="/images/article-contents/webp/mastering-useeffect-overall/code-6.webp" type="image/webp">
  <img src="/images/article-contents/png/mastering-useeffect-overall/code-6.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

### 若函式被多個 effect 使用且函式不使用 component scope 內的任何資料（props、state 等），則「**將函式提升到 component 外部**」

具體範例如下：

<picture>
  <source srcset="/images/article-contents/webp/mastering-useeffect-overall/code-7.webp" type="image/webp">
  <img src="/images/article-contents/png/mastering-useeffect-overall/code-7.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

### 若函式被多個 effect 使用且函式需要存取 component 內部的 state 或 props 時，「**使用 useCallback Hook」**

具體範例如下：

<picture>
  <source srcset="/images/article-contents/webp/mastering-useeffect-overall/code-8.webp" type="image/webp">
  <img src="/images/article-contents/png/mastering-useeffect-overall/code-8.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

這個解決方案同樣適用於從 parent component 傳下來的 function props：

<picture>
  <source srcset="/images/article-contents/webp/mastering-useeffect-overall/code-9.webp" type="image/webp">
  <img src="/images/article-contents/png/mastering-useeffect-overall/code-9.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

`useCallback` 本質上是「**增加另一層 dependency 檢查**」。它不是避免函式 dependency，而是讓函式本身只在必要時才改變。

`useCallback` 可以讓函式成為資料流的一部分，因為它讓函式的身份與其依賴項目連結：

<picture>
  <source srcset="/images/article-contents/webp/mastering-useeffect-overall/code-10.webp" type="image/webp">
  <img src="/images/article-contents/png/mastering-useeffect-overall/code-10.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

### 若 useEffect 內部包含非同步方法，且該非同步方法支援取消操作，請記得在 cleanup 函式中取消非同步請求。

具體範例如下：

<picture>
  <source srcset="/images/article-contents/webp/mastering-useeffect-overall/code-11.webp" type="image/webp">
  <img src="/images/article-contents/png/mastering-useeffect-overall/code-11.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

### 若 useEffect 內部包含非同步方法，但該非同步方法沒有支援取消操作，則最簡單的臨時解決方案是使用一個 boolean 變數來追蹤 component 是否仍然有效。

具體範例如下：

<picture>
  <source srcset="/images/article-contents/webp/mastering-useeffect-overall/code-12.webp" type="image/webp">
  <img src="/images/article-contents/png/mastering-useeffect-overall/code-12.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>
