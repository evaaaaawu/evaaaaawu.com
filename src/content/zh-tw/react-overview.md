---
title: React 概覽
subtitle: 參考「React 思維進化」這本書所撰寫的 React 概覽，希望可以藉此看到整個 React 的 big picture。
author: src/content/authors/eva.json
imageWebp: /images/articles/webp/react-overview.webp
imagePng: /images/articles/png/react-overview.png
imgAlt: React Overview
creationDate: 2024-08-18
updateDate: 2024-08-18
tags:
  - React
featured: true
---

前陣子花了非常多的時間在理解 React，想要試著寫出自己目前對於它粗淺輪廓的認識，因此這篇文章會試著用綜覽的角度去撰寫，希望可以藉此看到整個 React 的 big picture，如果有較深入的細節想撰寫則會另外再寫成其他篇文章。

## Table of Contents
- [起源](#起源)
- [開始之前需要先知道的兩個名詞/概念](#開始之前需要先知道的兩個名詞概念)
  - [瀏覽器開給其他程式語言操作的 API 介面：DOM](#瀏覽器開給其他程式語言操作的-api-介面dom)
  - [設計模式：單向資料流](#設計模式單向資料流)
- [實現單向資料流的 DOM 渲染策略](#實現單向資料流的-dom-渲染策略)
- [用 Virtual DOM 的概念進行全部重繪，以解決直接在 DOM 上進行全部重繪的效能問題](#用-virtual-dom-的概念進行全部重繪以解決直接在-dom-上進行全部重繪的效能問題)
  - [用 Virtual DOM 概念的額外好處：將畫面管理流程分離成兩個獨立的階段，分別為「定義階段」和「實際繪製階段」](#用-virtual-dom-概念的額外好處將畫面管理流程分離成兩個獨立的階段分別為定義階段和實際繪製階段)
- [Virtual DOM 概念在 React 中的實現：React element](#virtual-dom-概念在-react-中的實現react-element)
- [建立 React element 方法的「語法糖」：JSX 語法](#建立-react-element-方法的語法糖jsx-語法)
- [開發者自定義的畫面元件藍圖：Component](#開發者自定義的畫面元件藍圖component)
  - [將特定參數從外部傳遞給 Component 內部的機制：Props](#將特定參數從外部傳遞給-component-內部的機制props)
  - [僅可在 function component 內頂層作用域中呼叫的特殊函式 aka React 提供的 API：Hooks](#僅可在-function-component-內頂層作用域中呼叫的特殊函式-aka-react-提供的-apihooks)
- [Component 的三大生命週期](#component-的三大生命週期)
  - [mount = render](#mount--render)
  - [update = re-render = reconciliation](#update--re-render--reconciliation)
  - [unmount](#unmount)
- [最新應用程式狀態與畫面結構的本體：Fiber node](#最新應用程式狀態與畫面結構的本體fiber-node)
- [總結](#總結)
- [Reference](#reference)

## 起源

關於 React 的起源這邊沒有打算要談，但是有興趣的話很推薦可以看 YouTube [Honeypot](https://www.youtube.com/@Honeypotio/videos) 頻道製作的 [How A Small Team of Developers Created React at Facebook | React.js: The Documentary](https://www.youtube.com/watch?v=8pDqJVdNa44) 這部關於 React 的紀錄片；或者也可以看 [ExplainThis](https://www.explainthis.io/zh-hant) 寫的 [React 紀錄片心得 1 — 重新思考最佳實踐](https://www.explainthis.io/zh-hant/swe/react-documentary/part1) 和 [React 紀錄片心得 2 — 社群驅動創新](https://www.explainthis.io/zh-hant/swe/react-documentary/part2) 這兩篇針對這部 React 紀錄片寫的心得。

## 開始之前需要先知道的兩個名詞/概念

### 瀏覽器開給其他程式語言操作的 API 介面：DOM

React 是 JavaScript 的 UI 套件，而在撰寫網頁應用程式時，若要操作瀏覽器的 UI 畫面，就一定要透過瀏覽器開給其他程式語言操作的 API 介面：DOM，它是採用 tree (樹狀結構) 來儲存網頁元素，樹狀裡每一個部分叫做 node (節點)，其中最上面的根節點是 document，代表網頁本身。

### 設計模式：單向資料流

React 是使用「單向資料流」的設計模式，單向資料流的核心概念是「以資料驅動畫面」，所以只有當資料改變時畫面才會跟著更新。由於這是一個單向的流程，因此畫面不會因為資料變化以外的任何原因隨意改變，這樣就可以保證將 UI 產生的主要變因限縮在「資料」上，並且當資料更新時對應綁定的畫面就會自動發生變化，進而提升前端應用程式的可靠性與可維護性。

## 實現單向資料流的 DOM 渲染策略

大致了解 DOM 和單向資料流這兩個名詞/概念後，再來必須理解 React 是如何用單向資料流的設計模式來操作 DOM 以實現瀏覽器畫面的渲染/更新的？

在開始說明 React 所採用的做法前，我們可以先有一個認知是其實直接操作 DOM 的效能成本很高，因為它會連動瀏覽器的渲染引擎重繪畫面，因此前端效能優化有一個重要關鍵就是減少 DOM 的操作，也就是盡量以最小範圍的 DOM 操作來完成所需的畫面變動。

而在這樣的前提下，實現單向資料流的 DOM 渲染策略比較直覺的做法是「當資料更新後，人工判斷並手動修改所有應受到連動更新的 DOM element」，這樣做的優點是減少多餘 DOM 操作的效能浪費，但缺點是完全依賴人為操作 DOM，在複雜的應用中要有周全的判斷和精確的操作非常困難，而 Vue.js 就是解決了人為操作 DOM 的困難問題並採用此方法的套件/框架。

除了上述的做法，實現單向資料流的 DOM 渲染策略還有一個比較瘋狂的想法是「當資料更新後，一律將整個畫面的 DOM element 全部清除，再以最新的原始資料來全部重繪」，這樣做就可以直接解決上述人為操作 DOM 的困難問題，開發者只需要關注資料更新和模板定義，不需手動維護，因此較為直覺簡單，但缺點就是全部重繪明顯違反了我們想要達成前端效能優化的關鍵原則：減少 DOM 的操作，因此會造成很大的效能浪費，在龐大複雜的應用程式中，會影響使用者體驗，而 React 就是解決了全部重繪所造成的效能浪費問題並採用此方法的套件/框架。

## 用 Virtual DOM 的概念進行全部重繪，以解決直接在 DOM 上進行全部重繪的效能問題

但 React 是如何解決全部重繪所造成的效能浪費問題的？答案是用「Virtual DOM」的概念進行全部重繪。

至於什麼是 Virtual DOM？Virtual DOM 只是一種概念，它的本質是普通的 JavaScript 物件資料，這個概念的核心是以一種「虛擬畫面結構」的自創資料（可以想像成畫面繪製的試做品），來模擬並對應實際 DOM 的畫面結構。實作流程是當畫面需要更新時，透過先產生新的 Virtual DOM 畫面結構 → 與舊有畫面的 Virtual DOM 結構進行細節比較 → 根據差異之處來執行最小範圍的 DOM 操作，以減少效能成本。

### 用 Virtual DOM 概念的額外好處：將畫面管理流程分離成兩個獨立的階段，分別為「定義階段」和「實際繪製階段」

Virtual DOM 除了可以優化 DOM 操作的效能外，還有一個好處是將畫面管理流程分離成兩個獨立的階段：「定義及管理畫面結構描述(reconciler)」與「將畫面結構的描述繪製成實際畫面成品(renderer)」，其中 reconciler 是各環境都能通用的（只要有辦法在該環境中跑 JavaScript）、而 renderer 則可以被任意替換，讓 React 也可以用於管理並產生瀏覽器 DOM 以外的 UI 或畫面（e.g., Android/iOS APP 畫面的 React Native、產生 PDF 文件的 React-pdf）。

## Virtual DOM 概念在 React 中的實現：React element

React element 是 React 基於 Virtual DOM 概念所實現的虛擬畫面結構元素，它是作為描述並組成畫面的最小單位。更具體說明，它是一個普通的 JavaScript 物件資料，用於描述一個預期的實際 DOM element 結構。

需要注意的是，React element 在建立後是不可被修改的，因為它是在描述某個時間版本的畫面結構，就像是一種畫面結構的歷史紀錄。也因為 React element 不可被修改的特性，當重新產生新的 React element 時，React 才可以和上一個舊版本的 React element 進行結構的比較，進而找出具體是哪些地方的 DOM 需要真正被操作更新，達成最小範圍的 DOM 操作目的，以減少效能成本。

實際語法操作上，我們可以透過呼叫 React 提供 createElement 方法來建立一個 React element。另外，React element 和 DOM element 雖然有對應關係，但在某些屬性的命名會有所差異：常見的像是所有的 property 和 attribute（包括 event handler）都會改以 camel case 命名（例外：aria-\* 和 data-\*）、涉及到 JavaScript 內建保留字的屬性會改名，以避免意外情況（e.g., class → className）等。

## 建立 React element 方法的「語法糖」：JSX 語法

JSX 語法是 React.createElement 方法的「語法糖」，它長的很像 HTML 語法只是因為它被刻意設計成模仿 HTML 語法的撰寫與開發體驗，但是它在本質上完全和 HTML 是不同的東西。

JSX 的程式碼在 build time 時就會被轉譯，常見的轉譯工具有 Babel 和 TypeScript compiler。而 React.createElement 有一個可以在轉譯時的優化方法是呼叫 jsx-runtime 的 \_jsx 方法（React 17 開始支援）；React.createElement() 和 \_jsx() 都是用來建立 React element 的方法，差別只在於 \_jsx 方法會包含一些額外的優化，另外要注意的是 jsx-runtime 的 \_jsx 方法只能由 transpiler 透過 JSX 語法的轉譯而呼叫，不能像 React.createElement 方法直接撰寫。

在寫 JSX 語法有一些要注意的地方，像是 JSX 語法的第一層只能有一個節點，因為一段 JSX ＝ 呼叫一次 React.createElement 的方法，所以它只會回傳「一個 React element」，而一個 React element 代表一段樹狀資料結構（只能有一個根節點）。因此若有多個節點要再用一個共同的父元素包起來，而 React 為此也創建了一個內建的特殊元素類型：Fragment，它可以作為容器用途，但不會產生對應實際的 DOM element，我們通常會使用簡寫的 <> 空標籤來表達一個 fragment 類型的 React element 元素。

另外一個要注意的地方是各種資料型別作為 React element 的子元素並轉換到 DOM 時的處理行為包含：字串會直接印出；數字會轉字串型別後印出；布林值的 false、null、undefined 會直接忽略；陣列會攤開成多個子元素後依序全部印出；最後要小心的是物件、函式無法轉換，會發生錯誤。

實際語法操作上，JSX 語法為嚴格標籤閉合，所以就算是在 HTML 語法中不需要閉合的標籤（e.g., `<br>`、`<img>`、`<input>`），在寫 JSX 語法也一定要閉合。另外，我們也可以使用自我閉合的簡寫語法來表示沒有子元素的標籤（e.g., `const img = <img src="./image.jpg" />`）。

再來，JSX 語法有字面值（e.g., 字串）和表達式（e.g., 變數）兩大資料表達方式。其中字面值的資料表達會用像是 HTML 語法的格式寫：對於屬性的值的字面值會使用雙引號 “ “ 包住；對於子元素的字面值則可以直接寫。表達式的資料表達則會使用 JSX 的指定語法 { } 包住，像是「變數」或「在 JSX 語法中表達另一段 JSX 語法作為子元素」都算是表達式的類型，但在第二種情境下你不寫 { } 也可以，因為 JSX 語法也有支援直接在父元素的開標籤與閉標籤之間寫上子元素的標籤，為了可以更貼近過去寫 HTML 語法的開發體驗。

## 開發者自定義的畫面元件藍圖：Component

總結一下上面我們提到了 React 是以「單向資料流」為原則所設計的 UI 套件/框架，而在 DOM 渲染策略上，使用了「當資料更新後，一律將整個畫面的 DOM element 全部清除，再以最新的原始資料來全部重繪」的策略以實現單向資料流，但為了解決頻繁在 DOM 上進行全部清除又重繪所造成的效能浪費問題，React 並不會直接在 DOM 上做這樣的操作，而是引進 Virtual DOM 的概念先使用 JavaScript 的物件型別格式模擬實際 DOM 的畫面結構來進行全部重繪的動作，這邊的 Virtual DOM 概念在 React 中的實現就是 React element，所以 React element 其實是一個虛擬畫面結構元素，它是作為描述並組成畫面的最小單位。但是在實作上，我們通常不會直接寫一個 React element，而是會把 React element 包在 Component 之中。

Component 可以想像成是一個模板或積木零組件，是一種由開發者自定義的畫面元件藍圖，它會接收由開發者自訂格式的 props 資料作為參數，並回傳一個 React component 作為畫面區塊的結構。

我們可以理解一個 Component 回傳的值實際上是一個 React element，而 Component 中除了可以包含對應實際 DOM 的 React element 元素之外，其實也可以包含並呼叫其他的 Component 作為子 Component，就像組裝積木那樣。

設計 Component 的本質與意義是要依據需求以及邏輯意義進行抽象化，將那些關心的特徵與行為歸納出來，設計一套適用於特定情境和意義範圍的流程或邏輯，並將實作細節封裝起來以便於重用。

在 function component 時代，我們會以「函式」來定義 Component，因為它所定義的內容是「特定畫面的產生流程與邏輯」，它是一種「描述」，而不是一塊已經產生好的固定畫面本身。所以同樣的 Component（想像成藍圖）被呼叫多次，每一次被呼叫出來的 Component（想像成實例）之間是相互獨立的，因此完全可以根據需求去分別做客製化。

實際語法操作上，Component 命名中的首字母必須為大寫，不然會和一般的元素標籤搞混。這樣當標籤名稱為小寫時，React 在建立 React element 就會將它視為字串；當標籤名稱為大寫時，React 在建立 React element 就會將它視為變數名稱。

另外，有兩種可以匯出 Component 的方式：default export 和 named export。一個 JS 檔案只能有一個 default export，但可以同時有多個 named export。以 default export 為例，我們可以使用 export default 來匯出 Component；使用 import 元件名稱 from ‘檔案路徑‘ 來匯入 Component。

### 將特定參數從外部傳遞給 Component 內部的機制：Props

Props 的全名是 properties (屬性)，所以 Props 是 Component 的 properties，它是一種可以讓我們在呼叫 Component 的時候，將特定的參數從外部傳遞給 Component 這個藍圖內部的機制，這樣我們就能夠根據傳入的參數來進行一些畫面產生流程的客製化，以應付更多的需求情境。

React 對於 Component 的 Props 可以傳遞什麼樣的資料型別沒有任何的限制。而值得一提的是，甚至一個 React element 也能作為 Props 的值來傳遞，因為 React element 本身就是個普通的 JavaScript 物件，這為 UI 抽象化設計提供了更多的可能性。

而需要注意的是，Props 是從外部來的資料，所以在內部中是唯讀/不可被修改的。這實際上是為了維護單向資料流的可靠性，一般 React 會用 Object.freeze(props) 凍結 Props 讓你沒辦法修改，但是會有無法被偵測到的狀況（e.g., 當用像是 push 方法直接修改原本的陣列時），所以要小心！

實際語法操作上，component function 接收的第一個參數會是 Props 物件，包含我們在調用 Component 時傳入的各種屬性。我們可以直接在定義參數的地方寫 props 或者直接解構取出所需的屬性資料。另外，React 有一個特殊的 Props 叫 children，這個 children prop 在純 React element 中有限制只能是特定型別（前面的 JSX 語法章節有提到各種資料型別作為 React element 的子元素並轉換到 DOM 時的處理行為，並有提醒物件、函式無法轉換，會發生錯誤。），但在 Component 類型的 React element 中則是可以讓 children prop 接受任何類型的值而不受限制，這是因為 Component 的 children prop 具體會被使用在何處，是由開發者自行在 Component 內部決定的。

### 僅可在 function component 內頂層作用域中呼叫的特殊函式 aka React 提供的 API：Hooks

Hooks 是由 React 提供的 API，是一種僅可以在 function component 內的頂層作用域中才能呼叫的特殊函式，用於將各種 React 的核心特性或功能注入到 Component 當中。

至於為什麼 Hooks 只可以在 function component 內的頂層作用域中呼叫？這是為了確保 Hooks 的一些內部機制能夠正常的運作，避免造成資料丟失等意外問題，其中最主要的內部機制就是 Component 中的所有 Hooks 在每次 render 中都會依賴於固定的呼叫順序來區別彼此，所以規定這個限制就是為了保證所有 Hooks 在每次的 render 過程中都會被呼叫到。舉一個具體的例子，如果今天有一個 Hook 被放在 if 的條件式內而非頂層作用域中，若第一次 render 此 Component 時 if 的條件為 true，所以這個 Hook 有被執行到；但第二次 render 此 Component 時 if 的條件變成 false，所以裡面的 Hook 就不會被執行到，這邊我們就會發現一個問題：記得前面有說過「Component 中的所有 Hooks 在每次 render 中都會依賴於固定的呼叫順序來區別彼此」，但是如果 Component 中的每一個 Hooks 不是每次 render 時都一定會全部被呼叫到的話，就會導致順序對不起來，所以才會有「Hooks 只可以在 function component 內的頂層作用域中呼叫」的這個限制。

再往更上層看，為什麼要用呼叫的「順序」，而不是其他方式（e.g., 名稱）來區別彼此？這是因為以順序性函式呼叫的設計可以解決鑽石問題(diamond problem)。

React 中較常見的 Hooks 包含 useState、useEffect、useCallback、useMemo、useRef、useContext 等，這邊特別針對 useState 和 useEffect 這兩個 Hooks 做初步的介紹：

- **定義與存取 State 的 Hook：useState**

在 function component 中，我們可以透過呼叫 useState 這個 Hook 來定義與存取 State。在 React 開發的慣例中，我們通常會以陣列解構的語法來將 useState 回傳的 state 值以及 setState 方法根據商業邏輯上的意義重命名為自訂的變數名稱（e.g., 將代表計數器狀態資料的 state 值變數重命名為 count，並將對應的 setState 方法名為 setCount）。

同一個 Component 中是可以有多個 state 的，而 React 之所以有辦法辨認同一個 component 中的不同的 state 是因為上面有說明過 Hooks 會用「順序」的方式來記憶和區別彼此的這個特性。

觸發 Component re-render 的唯一合法方法是透過呼叫 setState 方法去更新 state 值，但要注意的是 setState 方法是非同步的，在呼叫 setState 方法後，React 並不會立即性的觸發 re-render，而是會等待正在執行的事件內的所有程式都結束後，才會開始進行 re-render。

需要注意的是，上面在介紹 Props 時，我們有提到為了維護單向資料流的可靠性，Props 在 Component 內部中是唯讀/不可被修改的；同理，State 也是一樣，immutable state 是維持 React 資料流可靠性的重要關鍵，State 是用於表示 Component 某個歷史時刻（某次 render）的狀態資料，是一經建立後就不該再被修改的，否則有可能會導致資料流的可靠性被破壞，或是某些機制無法正常運作（e.g., 呼叫 setState 方法時的資料新舊檢查需求、過去 render 的舊 State 仍有被讀取的需求、React 效能優化機制的參考檢查需求），因此在 React 中我們不應該去 mutate 一個物件或陣列型別的 State 資料，而是應該與對待原始型別的值一樣，產生一個新的物件或陣列去取代舊的，但因為這並不是 JavaScript 在物件資料型別的原生特性，所以是必須完全靠開發者自己手動維持並遵守的一個重要原則。

- **處理副作用的 Hook：useEffect**

在介紹 useEffect 前，我們可以先來了解 effect：effect = side effect，當一個函式除了回傳一個結果值之外，還會依賴或影響函式外某些系統狀態，又或是與外部環境產生互動時，我們就稱這個函式是帶有副作用的（e.g., 修改函式外的全域變數、讀寫檔案、資料庫操作、網路請求…都是常見的副作用）。而可預測性降低、測試困難、高耦合度、難以維護和理解、優化限制是 effect 會有的負面影響。

大致了解完 effect 和其會有的負面影響後，我們可以來細看 React component function 中的 effect 可能會有的負面影響包含：

1. 在 React component function 中副作用可能會拖慢甚至阻塞函式本身的計算流程。

2. 在 React component function 中函式多次執行所疊加造成的副作用影響難以預測。

3. 在 React component function 中副作用的處理涉及到非同步的後續影響時，副作用被多次執行的順序不一定與非同步事件的回應順序相同，而導致 race condition 的問題。

4. 在 React component function 中當一個副作用會啟動持續性的監聽類工作（例如註冊某個事件的訂閱），但是沒有處理對應的取消訂閱時，就有可能在 Component unmount 之後仍持續監聽，導致 memory leak 的問題。

而在 React 中要解決副作用可能帶來的負面影響的方法就是使用 useEffect 這個 Hook。

在使用上需要注意的是，useEffect 是屬於「宣告式(declarative)」的程式設計，我們只會關注預期的結果是什麼模樣（也就是目的地），而不在乎過程中是如何一步一步走到結果的，因此如果你嘗試去控制 effect 函式只會在第一次的 render 才執行的話，其實是違反了 useEffect 本身的設計思維。當我們的 effect 函式的執行效果是依賴於「過程的執行時機」而不是「目的地為何」，則很容易寫出不可靠的副作用處理邏輯。另外也需要了解，useEffect 的用途是「將原始資料同步化到畫面以外的副作用處理上」，而非生命週期 API。

使用 useEffect 大致包含三大步驟：

1. 定義一個 effect 函式：useEffect 可以從 Component render 的過程中隔離副作用的執行時機，其會將副作用的處理隔離到每次的 render 流程完成之後才執行，以避免副作用的處理直接阻塞畫面的產生與更新，也就是解決上面提到的 React component function 中的 effect 可能會有的第一個負面影響（拖慢/阻塞函式本身的計算流程）。

2. 加上 cleanup 函式來清理副作用（如果有需要的話）：useEffect 讓開發者能夠在 component function 中定義副作用的同時，也可以透過定義「cleanup 函式」來指定如何清除該副作用所造成的影響。cleanup 函式會在每次副作用重新執行前以及 Component unmount 時被執行，以避免副作用所造成的影響不斷疊加，也就是解決上面提到的 React component function 中的 effect 可能會有的第二至四個負面影響（包含函式多次執行所疊加造成的副作用影響難以預測、副作用處理涉及到非同步的後續影響時會有 race condition 問題，以及 memory leak 問題）。

3. 指定 effect 函式的 dependencies 陣列，以跳過某些不必要的副作用處理（選填）：dependencies 是一種效能優化，而非執行時機的控制，它是用來判斷「何時可以安全地跳過」而不是指定「只有何時才會執行」，當 dependencies 沒有更新時，「跳過執行副作用」的行為並不是絕對保證的，因此請不要欺諞 dependencies！另外要注意的是，「直接不提供 dependencies 參數」與「提供一個空陣列 \[ \] 作為 dependencies 參數」，兩者的意義和執行效果是完全不同的。直接不提供 dependencies 參數代表維持 useEffect 的預設行為，也就是每次 render 後都會執行一次 effect 函式；提供一個空陣列 \[ \] 作為 dependencies 參數則代表這個 effect 函式沒有依賴任何資料，component 可以在每次 re-render 時都安全的跳過 effect 函式的執行。

## Component 的三大生命週期

Component 有三大生命週期，分別為 mount、update，和 unmount

### mount = render

當一個 component function 首次被呼叫並執行時，它會進行第一次的 render 來產生初始狀態的畫面，這個階段的流程也被稱為 mount。

mount 的過程會經歷兩個階段，分別為 render phase 和 commit phase：

- render phase 會執行 component function，以 Props 與 State 等資料來產生初始畫面的 React element，並將產生好的 React element 交給 commit phase 繼續處理。

- commit phase 會將 Component 在 render phase 所產生的 React element 全部進行轉換（因為第一次 render 時，瀏覽器的實際 DOM 中還沒有任何這個 Component 實例的畫面區塊所對應的 DOM element），並建立成對應的實際 DOM element，然後透過瀏覽器的 DOM API appendchild() 全部放置到實際畫面中。

mount 流程完成的狀態被稱為「mounted」，意思是 Component 首次的 render 流程執行完成且已經成功的「掛載」到實際的瀏覽器畫面中了，這意謂著你必須在 mounted 之後才能夠從瀏覽器的 DOM 結構中找到這個 Component 所對應的那些 DOM element。

整個 render 流程可以看作是一種由上而下、由外而內的過程。

### update = re-render = reconciliation

當一個 Component 內部的狀態資料發生更新時，React 會再次執行 component function 來產生對應新版資料的新版畫面，這個過程我們稱之為 re-render（再次渲染畫面）或是 reconciliation，也就是 update 階段。

update 的過程也同樣會經歷到 render phase 和 commit phase 這兩個階段：

- 在進入到 render phase 之前，會先從呼叫 setState() 開始（前面在介紹 useState 這個 Hook 時我們有簡單提到觸發 Component re-render 的唯一合法方法就是透過呼叫 setState 方法去更新 state 值，因此 update 階段一定是從呼叫 setState() 開始），再來會用 [Object.is](Object.is)() 比較既有 state 值與新指定的 state 值是否相同。若是，則直接中斷後續流程；若否，則進入到 render phase。

- render phase 會先更新 State 資料並 re-render component function，以產生新版的 React element，再來會將新舊版本的兩份 React element 以 diffing 演算法進行結構比較，找出其中差異之處，接著會進入 commit phase。

- commit phase 會操作更新那些新舊 React element 差異之處所對應的實際 DOM element，以完成瀏覽器的畫面更新。

最後補充說明，雖然觸發 Component re-render 的唯一合法手段是透過呼叫 setState 方法去更新 State 值，但其實觸發 Component re-render 可以分成兩種可能的情況：

1. Component 本身有定義 State，且該 State 對應的 setState 方法被呼叫時。

2. Component 的父代或祖父代 Component 因為 setState 呼叫而發生了 re-render，所以身為子 Component 的自己也連帶被 re-render。

### unmount

當該位置上 Component 類型的 React element 在 re-render 後的新畫面結構中不再出現時，該處所對應的 Component 實例就會進入「unmount」階段，意謂著「該區塊不再需要存在於畫面中」。React 會進行副作用的清理，並且將該 Component 實例所對應的實際 DOM element 從瀏覽器中移除，流程大致如下：

1. 當應用程式新一次 render 的畫面結構中，有某個 Component 類型的 React element 與前一次 render 相比之下不見了，則 React 就會認為該處對應的 Component 實例應該被 unmount。

2. 執行 Component 最後一次副作用處理所對應的 cleanup 函式，以清理剩餘的副作用影響。

3. 將 Component 實例所對應的實際 DOM element 從瀏覽器中移除。

4. React 會在內部移除對應的 Component 實例，也就是接下來我們要介紹的 Fiber node。這意謂著 Component 實例內的所有 State 等狀態資料都會被丟棄。

## 最新應用程式狀態與畫面結構的本體：Fiber node

Fiber node 在 React 中是作為核心的最新應用程式狀態與畫面結構的本體，其工作是負責保存並維護目前 React 應用程式的最新狀態資料，因此我們會看到 Fiber node 裡面存放了 Component 中各種 Hooks 的相關最新狀態資料，像是當我們在 Component 中呼叫多個 useState 時，Fiber node 就會以 linked list 的資料結構儲存 State 的資料。而除了 State 的資料會被存放在 Fiber node 中，當連續呼叫 setState 方法時的待執行計算序列也會被存放在 Fiber node。

在 mount 階段，當我們在畫面結構中某處首次 render 出一個 Component 類型的 React element 時，React 就會在整個應用程式的 Fiber node 樹的對應位置建立一個新的 Component 實例，因此精確來說，一個 Component 實例就是指一個 Fiber node。

在 update 階段，reconciler 會負責去調度 Component 的 render 並將資料的改動更新到 Fiber node 裡，接著將該次 render 出來的 React element 與前一次 render 的 React element 進行比較，並移交 renderer 處理實際 DOM 的操作更新。

## 總結

在理解完 React 的大致輪廓後，我想從我們寫程式的角度出發來說明我想像中在使用 React 時整個流程大概是如何運作的：通常使用 React 這個 UI 套件/框架來寫前端應用程式時，我們會從使用 JSX 語法來撰寫 Component 出發，而 Component 會回傳一個 React element，產生 React element 後 React 就會在整個應用程式的 Fiber node 樹的對應位置建立/更新 Component 實例，並在裡面存放 Component 中各種 Hooks 的相關最新狀態資料。再來，React 會將產生的 React element 進行轉換並建立成對應的實際 DOM element，以完成瀏覽器的畫面繪製/更新。最後，如果 Component 有用到 useEffect，則會在畫面繪製/更新完成後執行本次 render 版本的 effect 函式，而如果 useEffect 有提供 cleanup 函式，則在執行本次 render 版本的 effect 函式前會先執行前一次 render 版本的 cleanup 函式（若為首次 render 則跳過此環節）。

## Reference

[React 思維進化：一次打破常見的觀念誤解，躍升專業前端開發者](https://www.tenlong.com.tw/products/9786263336841)
