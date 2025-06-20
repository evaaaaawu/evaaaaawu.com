---
title: 攻克 useEffect - Dan Abramov 的 A Complete Guide to useEffect — overreacted 文章摘要和理解筆記
subtitle: 從前 React 開發團隊成員 Dan Abramov 的文章來深度理解 useEffect。
author: src/content/authors/eva.json
imageWebp: /images/articles/webp/mastering-useeffect.webp
imagePng: /images/articles/png/mastering-useeffect.png
imgAlt: Mastering useEffect
creationDate: 2025-06-19
updateDate: 2025-06-19
tags:
  - React
featured: true
---

useEffect 大概是 React 當中數一數二重要但又難理解的 Hook 了，之前我在 [React 概覽](https://evaaaaawu.com/zh-tw/articles/react-overview/) 這篇文章中的[這個段落](https://evaaaaawu.com/zh-tw/articles/react-overview/#%E5%83%85%E5%8F%AF%E5%9C%A8-function-component-%E5%85%A7%E9%A0%82%E5%B1%A4%E4%BD%9C%E7%94%A8%E5%9F%9F%E4%B8%AD%E5%91%BC%E5%8F%AB%E7%9A%84%E7%89%B9%E6%AE%8A%E5%87%BD%E5%BC%8F-aka-react-%E6%8F%90%E4%BE%9B%E7%9A%84-apihooks)有大概介紹到 useEffect，這裡則要來從前 React 開發團隊成員 Dan Abramov 的 [A Complete Guide to useEffect — overreacted](https://overreacted.io/a-complete-guide-to-useeffect/) 這篇文章更深入的理解 useEffect。

## Table of Contents

- [useEffect 的每個渲染都是獨立的，擁有自己的一切](#useeffect-的每個渲染都是獨立的擁有自己的一切)
- [若需要在 useEffect 中讀取「最新」的值，可以使用另外一個 Hook：useRef](#若需要在-useeffect-中讀取最新的值可以使用另外一個-hookuser-ref)
- [關於 useEffect Cleanup 機制的執行時機](#關於-useeffect-cleanup-機制的執行時機)
- [同步，而非生命週期](#同步而非生命週期)
- [關於 useEffect Dependency 的使用目的和運作原理](#關於-useeffect-dependency-的使用目的和運作原理)
- [請不要對 useEffect 的 Dependencies 撒謊](#請不要對-useeffect-的-dependencies-撒謊)
- [useEffect 的使用策略](#useeffect-的使用策略)
  - [策略一：確保 dependency array 包含所有使用的值](#策略一確保-dependency-array-包含所有使用的值)
  - [策略二：合法減少 effect 對頻繁變化值的依賴](#策略二合法減少-effect-對頻繁變化值的依賴)
  - [策略三：遇到 Race Condition 的處理方法](#策略三遇到-race-condition-的處理方法)
- [結尾](#結尾)
- [Reference](#reference)

## useEffect 的每個渲染都是獨立的，擁有自己的一切

首先，在「Each Render Has Its Own Props and State」、「Each Render Has Its Own Event Handlers」、「Each Render Has Its Own Effects」以及「Each Render Has Its Own… Everything」這四個段落中，我們可以知道 function components 中的每次 render 都會產生一個完整的「快照」，包含該時刻的：

- **Props 和 State**：這裡的 props 和 state 是不可變的常數，並不是動態綁定。所以必須要理解它們只是一個普通的數字，並不會去「監聽」狀態變化並自動更新。

- **Event handlers**：這裡的 event handler 會「捕獲」點擊當下的 state 值，也就是每個 event handler 都「屬於」特定的 render，並且會記住該次 render 的 state 值。 這與 JavaScript 的 closure(閉包) 機制有關 - 每個函式都會記住它被創建時的環境變數。

- **Effects**：要注意 effect 本身並不是在「監聽」state 的變化，而是每次都是全新的 函式。換句話說，每次 render 時，React 都會得到一個全新的 effect 函式，每個 effect 函式都會「看見」屬於它那次 render 的 props 和 state。

- **所有其他的變數和函式**

這種「渲染隔離性」與 class components 中 `this.state` 永遠指向最新值的行為完全不同。理解這個差異是掌握 useEffect 和整個 Hooks 思維模型的關鍵。每個 render 都是獨立的，有自己的一切，這讓 React 的行為變得可預測且易於理解。

## 若需要在 useEffect 中讀取「最新」的值，可以使用另外一個 Hook：useRef

在理解完 useEffect 的渲染隔離性觀念後，我們可能會有的困境是：如果在某些情況下，我們真的就是需要讀取「最新」的值，而不是被「捕獲」的值的時候該怎麼辦?

Dan 將這種做法比喻為「swimming against the tide(逆流而上)」，而解決的方法是可以使用到另外一個 Hook：useRef，具體範例如下：

<picture>
  <source srcset="/images/article-contents/webp/mastering-useeffect/code-1.webp" type="image/webp">
  <img src="/images/article-contents/png/mastering-useeffect/code-1.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

當你需要「最新」值時，使用 `useRef` 是正確的逃生艙，但要謹慎使用，因為它破壞了 functional component 的純粹性和可預測性。

其他注意事項：

**1\. Mutation(變更) 的合理性**

雖然在 React 中 mutate(變更) 看起來很奇怪，但這正是 React 在 class component 中重新賦值 `this.state` 的方式。

**2\. 無保證性**

讀取 `latestCount.current` 無法保證在任何特定 callback 中都會得到相同的值，因為它本質上是 mutable(可變的)。

**3\. 非預設行為**

這種方式不是預設行為，你必須明確選擇使用它，這是刻意的設計決策。

## 關於 useEffect Cleanup 機制的執行時機

接著在「So What About Cleanup?」這個段落，我們可以正確認知到 useEffect Cleanup 機制的執行時機，以避免對於 effect 執行時機常見的錯誤理解。

### 錯誤的思維模型

許多開發者習慣用 class component 的生命週期思維來理解 useEffect，認為：

1. React 先清理舊的 effect（對應 `{id: 10}`）

2. React 重新 render UI（對應 `{id: 20}`）

3. React 執行新的 effect（對應 `{id: 20}`）

**但這個理解是完全錯誤的。**

### 實際的執行順序

真正的執行順序其實是：

1. React render UI（對應 `{id: 20}`）

2. 瀏覽器進行繪製，使用者看到新的 UI

3. React 清理前一個 effect（仍然是 `{id: 10}`）

4. React 執行新的 effect（對應 `{id: 20}`）

至於為什麼 Cleanup 能夠看到舊的 props，這個在最前面的段落 useEffect 的每個渲染都是獨立的，擁有自己的一切中就已經解釋了原因，其中關鍵的概念是 closure(閉包)。

這樣的設計有兩個重要優點：

1. **效能優化**：effects 在瀏覽器繪製之後才執行，不會阻塞 UI 更新，讓應用程式可以更快。

2. **邏輯正確性**：確保 cleanup 總能正確清理對應的 effect，避免 memory leak 或錯誤的取消訂閱。

這讓 React 能夠可靠的處理 effects，並且預設就能提供更好的效能。

## 同步，而非生命週期

如果要用一句話總結前面段落所要表達最重要的觀念，那就是「同步，而非生命週期」。

Dan 在「Synchronization, Not Lifecycle」這個段落也強調了這個關鍵的思維轉換：我們應該把 `useEffect` 視為**同步工具**而非**生命週期方法**。

這個思維轉換對於寫 `useEffect` 有深遠的影響：

1. 打破傳統的生命週期思維，不要想著「在 mount(掛載) 時做 X，在 update(更新) 時做 Y」

   雖然我學程式和接觸到 React 的時間比較晚，所以我自己本身並沒有經歷過 class component 的階段，但是根據 Dan 的文章所述，傳統的思維模式會讓我們想著：

   - mount(掛載)：component 第一次出現時做什麼

   - update(更新)：component 更新時做什麼

   - unmount(卸載)：component 消失時做什麼

   Dan 強調這是**錯誤的思維方式**。如果你試圖寫一個根據「是否為首次渲染」而有不同行為的 effect，**你就是在與 React 的設計哲學對抗**。

2. 而要想著「確保外部資源 Z 始終反映當前的 props 和 state」

   React 最優雅的特點之一是它**統一了初始渲染和更新的描述方式**。無論 component 是第一次渲染還是後續更新，我們都是用相同的方式來描述 UI 應該呈現的樣子。換句話說，我們在使用 React 的 function component 時應該要有「目標導向」的思維，而非「過程導向」。

   **「目標導向」v.s. 「過程導向」差異**

   - **jQuery 的方式**：關注「過程」- 我們需要手動呼叫 `$.addClass` 和 `$.removeClass`

   - **React 的方式**：關注「目標」- 我們直接指定 CSS 類別應該是什麼

   這就是「旅程 vs 目的地」的差別。React 讓我們專注於**最終狀態**，而不用擔心如何從 A 狀態轉換到 B 狀態。

3. 讓 React 決定何時以及如何執行同步邏輯

這種思維方式讓我們能夠寫出更可預測、更容易理解和維護的程式碼，並且與 React 的聲明式特性完美契合。

### 效能考量的平衡

然而 Dan 也承認，每次渲染都執行所有 effect 可能不是最有效率的，甚至可能導致無限循環。這就是為什麼 React 提供了 dependency array 等機制來最佳化效能(後面的段落會提到)。

但最重要的關鍵是：**最佳化是後來的考量，同步邏輯的正確性才是首要目標**。

## 關於 useEffect Dependency 的使用目的和運作原理

在「Teaching React to Diff Your Effects」這個段落中，我們可以知道 React 如何透過 dependency array 來處理 `useEffect` 的最佳化問題。

Dan 首先建立了一個類比：我們都知道 React 在處理 DOM 更新時會進行 diff(差異檢測)，只更新實際改變的部分。例如當一個 `<h1>` 的內容從 "Hello, Dan" 變成 "Hello, Yuzhi" 時，React 會比較前後的 props：

<picture>
  <source srcset="/images/article-contents/webp/mastering-useeffect/code-2.webp" type="image/webp">
  <img src="/images/article-contents/png/mastering-useeffect/code-2.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

React 發現只有 `children` 改變了，所以只會執行 `domNode.innerText = 'Hello, Yuzhi'`，而不會碰 `className`。

接著我們就會好奇在執行 `useEffect` 時，是否也能像處理 DOM 更新時一樣，可以避免在不必要的時候重新執行 effects?

### 困難點：React 無法直接比較函式

Dan 解釋了為什麼 React 無法像比較 DOM props 那樣直接比較 effects：

<picture>
  <source srcset="/images/article-contents/webp/mastering-useeffect/code-3.webp" type="image/webp">
  <img src="/images/article-contents/png/mastering-useeffect/code-3.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

針對上述的程式碼範例，React 並不能夠看出這兩個函式是在做同樣的事情，即使程式碼看起來一樣，函式內部還是可能會閉合不同的變數或 props，這就是為什麼我們需要 dependency array。

### 解決方案：Dependency Array

Dependency Array 的使用範例如下：

<picture>
  <source srcset="/images/article-contents/webp/mastering-useeffect/code-4.webp" type="image/webp">
  <img src="/images/article-contents/png/mastering-useeffect/code-4.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

**這就像是我們告訴 React：「嘿，我知道你看不到這個函式裡面在做什麼，但我保證它只使用 `name` 而不會用到渲染範圍中的其他東西。」**

當 React 收到 dependency array 後，它會比較前後兩次的 dependencies：

<picture>
  <source srcset="/images/article-contents/webp/mastering-useeffect/code-5.webp" type="image/webp">
  <img src="/images/article-contents/png/mastering-useeffect/code-5.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

**關鍵規則**：如果 dependency array 中有任何一個值在兩次 render 之間不同，React 就知道不能跳過這個 effect 的執行，必須重新同步。

從上述的說明我們可以認知到 React 是抱持著信任的態度讓開發者使用 dependency array，也就是 React 會相信開發者提供的 dependency array 是正確且完整的。而透過 dependency array 明確告訴 React 這個 effect 依賴了哪些值則完全是開發者的責任。這解釋了為什麼 React 的 linter 會嚴格檢查 dependency array，以及為什麼漏掉 dependencies 非常容易導致錯誤 - 因為這是 React 用來決定是否重新執行 effect 的唯一依據。

## 請不要對 useEffect 的 Dependencies 撒謊

接著在「Don't Lie to React About Dependencies 」和「What Happens When Dependencies Lie」的段落中，我們可以知道 Dependencies 不是用來控制「何時重新觸發 effect」，而是告訴 React「effect 使用了哪些來自渲染作用域的值」。

對 Dependencies 撒謊很容易會導致程式執行時發生錯誤，這裡以一個經典的 counter(計數器) 範例來說明問題：

<picture>
  <source srcset="/images/article-contents/webp/mastering-useeffect/code-6.webp" type="image/webp">
  <img src="/images/article-contents/png/mastering-useeffect/code-6.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

### 為什麼會出錯?

1. **閉包陷阱**：在第一次 render(渲染)時，`count` 是 0

2. **Effect 不會重新執行**：因為 dependencies 是空陣列 `[]`，React 認為這個 effect 永遠不需要更新

3. **過時的值**：`setInterval` 中的 callback 永遠記住的是第一次 render 時的 `count` 值（0）

4. **結果**：每秒都在執行 `setCount(0 + 1)`，count 永遠停在 1

### 正確的流程：

- React 比較前後兩次 render 的 dependencies

- 如果有任何值改變，就重新執行 effect

- 如果撒謊（遺漏實際使用的值），就會導致 stale closure(過時閉包)問題

## useEffect 的使用策略

理解完「不要對 useEffect 的 Dependencies 撒謊」這個重要原則後，接著來談在實作中最重要的使用策略。

在「Two Ways to Be Honest About Dependencies」這個段落中，Dan 提出了處理 useEffect dependencies 的兩種根本策略。

### **策略一：確保 dependency array 包含所有使用的值**

第一種策略是**誠實地在 dependency array 中包含 effect 內部使用的所有 component 內的值**。這是處理依賴問題時應該優先考慮的方法。我們繼續使用 counter(計數器) 的範例如下：

<picture>
  <source srcset="/images/article-contents/webp/mastering-useeffect/code-7.webp" type="image/webp">
  <img src="/images/article-contents/png/mastering-useeffect/code-7.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

這個策略可以確保 dependency array 的正確性、避免 stale closure 問題，並且每次 effect 都能獲得最新的值。但它的缺點是 effect 會在每次依賴值改變時重新執行，這樣可能會造成效能問題和不必要的 side effects。以上述範例為例，使用此策略會讓 interval 不斷的被清除和重新建立。

### 策略二：合法減少 effect 對頻繁變化值的依賴

為了解決策略一的缺點，我們可以想辦法修改 effect 的程式碼，讓它不需要依賴那些變化頻率高於我們期望的值。需要注意的是，這並不是要隱瞞依賴關係，而是重新設計 effect 讓它擁有更少的 dependencies。

至於「減少 effect 對頻繁變化值的依賴」這個策略具體上要如何實作有包含多種方法，接下來我們會循序漸進的做說明。

**\[方法一：使用 functional update\]**

在「Making Effects Self-Sufficient」段落中，Dan 說明了如何在 `useEffect` 裡面使用 functional updater 方法藉以合法的移除不必要的 dependencies，達到效能問題的解決。

首先先來回顧一次上面策略一提到的原始問題：

<picture>
  <source srcset="/images/article-contents/webp/mastering-useeffect/code-8.webp" type="image/webp">
  <img src="/images/article-contents/png/mastering-useeffect/code-8.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

在這個範例中，effect 依賴於 `count` 變數，這造成了一個問題：

- 每當 `count` 改變時，整個 effect 會重新執行

- 舊的 interval 被清除，新的 interval 被建立

- 這是效能上的浪費，也不是我們真正想要的行為

再來為了重新思考依賴的必要性，我們可以先問自己一個重要的問題：**我們使用 `count` 是為了什麼？**

這個問題的答案是「我們只是為了在 `setCount` 中使用它。」，而這揭露了一個更深層的真相：

1. **React 已經知道當前的 `count` 值**

2. **我們實際上只需要告訴 React「如何改變狀態」，而不是「改變成什麼值」**

**解決方法：使用 functional update**，具體範例如下：

<picture>
  <source srcset="/images/article-contents/webp/mastering-useeffect/code-9.webp" type="image/webp">
  <img src="/images/article-contents/png/mastering-useeffect/code-9.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

這個解決方案的精妙之處在於：

#### 1\. 消除假依賴

- `count` 看似是必要的 dependency，但實際上是「假依賴」

- 我們真正需要的不是 `count` 的值，而是「increment（遞增）」這個操作

#### 2\. 狀態更新的新思維模式

- 從「告訴 React 新的值是什麼」轉變為「告訴 React 如何計算新的值」

- `setCount(c => c + 1)` 可以理解為向 React「發送指令」，指示狀態應該如何改變

#### 3\. 自給自足的 effect

- Effect 不再需要從渲染範圍讀取 `count` 值

- 即使 effect 只執行一次，interval callback 仍然能正確工作

- 每次 interval 觸發時，它都會發送正確的更新指令

這樣的思維模式可以應用到更廣泛的場景：

- 當你發現 effect 依賴於某個狀態值，但只是為了更新它時

- 當你想要 batch multiple updates（批次多個更新）時

- 當你想要避免不必要的 effect 重新執行時

這個概念強調了 **declarative programming（宣告式程式設計）** 的重要性：我們描述「要做什麼」而不是「怎麼做」，讓 React 處理具體的實作細節。

接著 Dan 在「Functional Updates and Google Docs」段落中更深入的解釋了 functional update 這個方法。

Dan 以 Google Docs 為例說明了一個重要原則：當你在 Google Docs 中編輯文件時，系統不會把整個頁面內容都傳送到伺服器，因為這樣太沒效率了。相反地，它只傳送「使用者嘗試執行的動作」的表示法。

這個哲學同樣適用於 effects：**我們應該從 effects 內部向 component 傳送最少必要的資訊**。而要達到這樣的目標，我們應該要有「編碼 **intent(意圖)** 而非結果」的意識，類似於 Google Docs 解決協作編輯的方式。

回到上面的例子，我們可以比較一下這兩種寫法：

- `setCount(c => c + 1)` (functional update)

- `setCount(count + 1)` (直接更新)

**Functional update 傳達的資訊更少，但這反而是優點**，因為它沒有被當前的 count 值「污染」，它只表達了「遞增」這個動作本身。這符合 React 的核心原則：找出最小但完整的 state 表示法。

然而，Dan 也坦承 `setCount(c => c + 1)` 並不完美：

1. **語法看起來有點奇怪**

2. **功能受限**：如果有兩個狀態變數的值互相依賴或需要根據 prop 計算下一個 state，在這些情況下 functional update 就無法勝任。

**\[方法二：使用 useReducer\]**

因此在下一個段落「Decoupling Updates from Actions」中，Dan 提出了 functional update 無法勝任時的解決辦法：使用 useReducer - 它是 `setCount(c => c + 1)` 的「更強大的姊妹模式」。

先參考下面的範例：

<picture>
  <source srcset="/images/article-contents/webp/mastering-useeffect/code-10.webp" type="image/webp">
  <img src="/images/article-contents/png/mastering-useeffect/code-10.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

這個版本的問題：

1. `setCount(c => c + step)`：這行程式碼讀取了 `step` 的值

2. `[step]` dependency：因為 effect 內使用了 `step`，所以必須將它加入 dependencies array

3. 重新執行問題：每當使用者改變 `step` 輸入框的值，整個 `useEffect` 會重新執行

4. Timer 重置：這意味著 `setInterval` 會被清除並重新建立，計時器會重置

**解決方法：使用 useReducer**，具體範例如下：

<picture>
  <source srcset="/images/article-contents/webp/mastering-useeffect/code-11.webp" type="image/webp">
  <img src="/images/article-contents/png/mastering-useeffect/code-11.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

完整執行流程比較：

- 原始版本

  1.  使用者改變 input → `setStep` → `step` 狀態更新

  2.  `step` 改變 → `useEffect` 重新執行 → 計時器重置

  3.  新的計時器開始，每秒呼叫 `setCount(c => c + step)`

- 改進版本

  1.  使用者改變 input → `dispatch({ type: 'step', step: 新值 })`

  2.  Reducer 處理 action → 更新 `state.step`

  3.  **`useEffect` 不會重新執行**，因為 `dispatch` 沒有改變(React 保證 `dispatch` 函式在 component 生命週期中是常數。)

  4.  計時器持續運行，每秒發送 `{ type: 'tick' }` action

  5.  Reducer 用最新的 `step` 值來計算新的 `count`

這樣就可以讓計時器不會重置，但仍然使用最新的步長值進行計算！

這就是「解耦」的精髓：effect 不需要知道具體的業務邏輯，只需要告訴系統「時間到了」，而狀態更新的邏輯全部集中在 reducer 中處理。

這種方法帶來了重要的架構改進：

1. **關注點分離**：Effect 不再需要**讀取**狀態，而是**派發**一個描述「發生了什麼」的動作

2. **集中化邏輯**：Reducer 集中處理所有狀態更新邏輯

3. **解耦設計**：Effect 不關心**如何**更新狀態，只需要告訴系統**發生了什麼事**

上面的範例是解決「當兩個狀態變數的值互相依賴」的問題，接下來我們要來看另外一種情況：「需要根據 prop 計算下一個 state」。

Dan 在「Why useReducer Is the Cheat Mode of Hooks」段落中說明了這種情況的問題和解決方法。

當我們的 component 需要接收 props 並在 effect 中使用這些 props 來更新 state 時，傳統做法會迫使我們將 `props.step` 加入 dependency array 中。這看似無法避免，但實際上會造成 effect 頻繁重新執行的效能問題。

**解決方法：將 reducer 定義在 component 內部**

將 `reducer` 函式定義在 component 內部，讓它能夠直接存取當前渲染的 props。具體範例如下：

<picture>
  <source srcset="/images/article-contents/webp/mastering-useeffect/code-12.webp" type="image/webp">
  <img src="/images/article-contents/png/mastering-useeffect/code-12.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

需要注意的是雖然這個模式很強大，但 Dan 也提醒這會禁用某些最佳化，所以在實作時，只有在真正需要在 reducer 中存取 props 時，才會建議使用「內部定義 reducer」這個模式，其他情況下還是將 reducer 定義在 component 外部比較好。

最後，Dan 稱使用 `useReducer` 這個方法為「作弊模式」，其原因在於它提供了一種優雅的解耦方式來達成以下的效果：

1. **邏輯分離**：將更新邏輯(what to do)與事件描述(what happened)分離

2. **Dependency 最小化**：幫助移除不必要的 dependencies，避免 effect 過度執行

3. **效能最佳化**：減少重新渲染和 effect 重新執行的頻率

**\[方法三：將函式移入 effect 內部\]**

有一個常見的 `useEffect` 使用錯誤是開發者經常認為函式不需要被列在 dependencies array 中。這個錯誤看似無害，但隨著 component 複雜度增長，會導致嚴重的資料流同步問題。

我們可以先來看一下問題演進的過程：

- **階段一：看似正常的程式碼**

  <picture>
    <source srcset="/images/article-contents/webp/mastering-useeffect/code-13.webp" type="image/webp">
    <img src="/images/article-contents/png/mastering-useeffect/code-13.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
  </picture>

  這段程式碼在表面上運作正常，但 Dan 指出核心問題：**當 component 規模擴大時，很難確保我們處理了所有的情況**。

- **階段二：複雜度增加的隱患**

  當函式變得更大更複雜，並且彼此之間有調用關係時：

  <picture>
    <source srcset="/images/article-contents/webp/mastering-useeffect/code-14.webp" type="image/webp">
    <img src="/images/article-contents/png/mastering-useeffect/code-14.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
  </picture>

- **階段三：bug 的產生**

  當我們在這些函式中開始使用 state 或 props 時，問題就暴露了：

  <picture>
    <source srcset="/images/article-contents/webp/mastering-useeffect/code-15.webp" type="image/webp">
    <img src="/images/article-contents/png/mastering-useeffect/code-15.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
  </picture>

  此時如果忘記更新 effect 的 dependencies，effect 將無法同步 props 和 state 的變化，導致資料不一致的問題。

**解決方法：將函式移入 effect 內部**

Dan 在「Moving Functions Inside Effects」這個段落提出了一個簡潔有效的解決方案：**如果某些函式只在 effect 內部使用，就將它們直接移動到 effect 內部**。

<picture>
  <source srcset="/images/article-contents/webp/mastering-useeffect/code-16.webp" type="image/webp">
  <img src="/images/article-contents/png/mastering-useeffect/code-16.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

使用這個方法的優點如下：

1. **消除 transitive dependencies(傳遞依賴)**

   將函式移入 effect 後，我們不再需要思考複雜的傳遞依賴關係。dependency array 變得誠實：我們確實沒有使用 component 外層作用域的任何東西。

2. **自然的程式碼提醒機制**

   當我們後續修改這些函式並引入 state 時：

   <picture>
     <source srcset="/images/article-contents/webp/mastering-useeffect/code-17.webp" type="image/webp">
     <img src="/images/article-contents/png/mastering-useeffect/code-17.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
   </picture>

   因為我們在 effect 內部直接編輯這些函式，我們更容易注意到正在使用外層的變數，因此需要將其加入 dependencies 中。

Dan 強調這個解決方案體現了 `useEffect` 的設計哲學：**`useEffect` 的設計迫使你注意到資料流的變化，並選擇你的 effect 應該如何同步這些變化**，而不是忽略它們直到使用者遇到 bug。

添加 `query` 作為 dependency 不僅僅是為了「取悅 React」，而是因為當查詢改變時重新獲取資料在邏輯上是正確的。

總結來說，我們可以看到將函式移入 effect 內部這個看似簡單的重構，實際上是在建立一個更清晰的心智模型，讓資料流的依賴關係變得顯而易見且易於維護。

但這個方法會遇到一個困境：

當你有一個函式被多個 effect 使用時，你無法將這個函式移動到每個 effect 內部，因為這樣會造成程式碼重複。以下先舉一個具體範例：

<picture>
  <source srcset="/images/article-contents/webp/mastering-useeffect/code-18.webp" type="image/webp">
  <img src="/images/article-contents/png/mastering-useeffect/code-18.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

這會導致 effects 在每次 render 時都重新執行，因為 `getFetchUrl` 每次都是新的函式。

**\[方法四：將函式提升到 component 外部\]**

因此在「But I Can’t Put This Function Inside an Effect」這個段落，Dan 接著說明遇到上述情況的其中一個解決方法是將函式提升到 component 外部。如果函式不使用 component scope 內的任何資料（props、state 等），可以將它移到 component 外部：

<picture>
  <source srcset="/images/article-contents/webp/mastering-useeffect/code-19.webp" type="image/webp">
  <img src="/images/article-contents/png/mastering-useeffect/code-19.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

**\[方法五：使用 useCallback Hook\]**

另外一個解決方法是使用 useCallback Hook。當函式需要存取 component 內部的 state 或 props 時，使用 `useCallback`：

<picture>
  <source srcset="/images/article-contents/webp/mastering-useeffect/code-20.webp" type="image/webp">
  <img src="/images/article-contents/png/mastering-useeffect/code-20.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

`useCallback` 本質上是「**增加另一層 dependency 檢查**」。它不是避免函式 dependency，而是讓函式本身只在必要時才改變。

Dan 用了 Excel 試算表來比喻：當你改變某個儲存格的值時，使用該值的其他儲存格會自動重新計算。同樣地，當 `query` 改變時，`getFetchUrl` 也會改變，進而觸發相關的 effects。

這個解決方案同樣適用於從 parent component 傳下來的 function props：

<picture>
  <source srcset="/images/article-contents/webp/mastering-useeffect/code-21.webp" type="image/webp">
  <img src="/images/article-contents/png/mastering-useeffect/code-21.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

Dan 強調這個解決方案體現了「**擁抱資料流和同步思維**」的重要性。透過正確使用 `useCallback`，我們可以確保：

1. Effects 誠實地宣告其 dependencies

2. 只有在真正需要時才重新執行

3. 維持程式碼的可維護性和邏輯共享

後面的「Are Functions Part of the Data Flow?」段落，Dan 更進一步的解釋了 `useCallback` 。

`useCallback` 可以讓函式成為資料流的一部分，因為它讓函式的身份與其依賴項目連結：

<picture>
  <source srcset="/images/article-contents/webp/mastering-useeffect/code-22.webp" type="image/webp">
  <img src="/images/article-contents/png/mastering-useeffect/code-22.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

而 React 的另一個 Hook：`useMemo` 也是用了類似的概念。

另外，Dan 也強調不要過度使用 `useCallback`，到處使用會看起來很笨重。以下是適合使用的場景：

- Function 被傳遞到 child 且在 child 的 effect 中被呼叫

- 為了防止破壞 child component 的 memoization(記憶化)

### 策略三：遇到 Race Condition 的處理方法

在「Speaking of Race Conditions」這個段落，Dan 透過三個階段的程式碼範例，清楚的說明了在處理非同步資料擷取時會遇到的經典問題，以及 useEffect 如何處理這些問題。

**第一階段：基礎但有缺陷的實作**

<picture>
  <source srcset="/images/article-contents/webp/mastering-useeffect/code-23.webp" type="image/webp">
  <img src="/images/article-contents/png/mastering-useeffect/code-23.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

這個版本只在 component 掛載時擷取資料，完全無法處理 props 更新的情況。如果 `id` 改變了，component 不會重新擷取資料，導致顯示過時的內容。

**第二階段：處理更新但仍有問題**

<picture>
  <source srcset="/images/article-contents/webp/mastering-useeffect/code-24.webp" type="image/webp">
  <img src="/images/article-contents/png/mastering-useeffect/code-24.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

這個版本看似解決了更新問題，但引入了更嚴重的 **race condition(競態條件)** 問題。

**什麼是 race condition?**

這邊先跳出來解釋 race condition，它是當兩個或多個操作的執行結果依賴於它們的執行順序，但這個順序無法保證時發生的問題。

這是所有支援並發或多執行緒的程式語言都會面臨的問題，而順序無法保證主要是因為在並發(concurrency)環境中操作共享資源且這些操作不是原子性的。

所以我們可以歸納出導致 race condition 問題有三個關鍵因素，分別是並發(concurrency)執行、共享資源和非原子操作，而 JavaScript 的非同步操作是導致並發(concurrency)的一種常見方式。

以下針對導致 race condition 問題的三個關鍵因素提供更詳細的解釋：

1. **並發執行**:

   - 多個指令流同時運行

   - 這可能是多執行緒(threads)、多處理程序(processes)，或是單執行緒中的非同步操作

2. **共享資源**:

   - 多個執行流存取相同的資源(記憶體、檔案等)

   - 沒有共享資源就不會有競爭

3. **非原子操作**:

   - 單一邏輯操作實際由多個步驟組成(如讀取-修改-寫入)

   - 這些步驟之間可能被其他執行流中斷

**race condition 的實際場景範例**

假設使用者快速切換文章：

1. 使用者點擊文章 ID 10 → 發送請求 A

2. 使用者立即點擊文章 ID 20 → 發送請求 B

3. 由於網路狀況，請求 B 先回傳 → 正確顯示文章 20

4. 請求 A 後回傳 → 錯誤地覆蓋 state，顯示文章 10

這就是 race condition：即使使用者最後選擇的是文章 20，但因為請求 A 後完成，最終錯誤地顯示了文章 10。

**\[解決方法一：支援 Cancellation\]**

如果你使用的非同步方法支援取消操作，那很好！你可以在 cleanup 函式中取消非同步請求：

<picture>
  <source srcset="/images/article-contents/webp/mastering-useeffect/code-25.webp" type="image/webp">
  <img src="/images/article-contents/png/mastering-useeffect/code-25.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

**\[解決方法二：Boolean Flag 模式\]**

這是最簡單的臨時解決方案，使用一個 boolean 變數來追蹤 component 是否仍然有效：

<picture>
  <source srcset="/images/article-contents/webp/mastering-useeffect/code-26.webp" type="image/webp">
  <img src="/images/article-contents/png/mastering-useeffect/code-26.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

## 結尾

最後需要強調的是， `useEffect` 的真正價值在於**同步化思維**，它讓副作用成為 React data flow 的一部分，確保 component 行為的一致性。雖然學習成本較高，但一旦掌握，就能大幅提升應用程式處理複雜狀況的能力。

總結來說，`useEffect` 不只是替代生命週期方法的工具，而是一種全新的思考 React component 同步化的方式。

## Reference

- [A Complete Guide to useEffect — overreacted](https://overreacted.io/a-complete-guide-to-useeffect/)
