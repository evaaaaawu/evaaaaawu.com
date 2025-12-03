---
title: 認識演算法：選擇問題
subtitle: 學習如何高效找出集合中第 i 小元素，掌握 RANDOMIZED-SELECT 與 SELECT 演算法的精髓。
author: src/content/authors/eva.json
imageWebp: /images/articles/webp/understanding-algorithms-selection-problem.webp
imagePng: /images/articles/png/understanding-algorithms-selection-problem.png
imgAlt: Understanding Algorithms_The Selection Problem
creationDate: 2025-12-02
updateDate: 2025-12-02
tags:
  - Algorithm
featured: false
---

在 [認識演算法：各種比較排序](../understanding-algorithms-comparison-based-sorting/) 和 [認識演算法：各種線性時間排序](../understanding-algorithms-linear-time-sorting/) 這兩篇文章中，我們介紹了各種常見的排序演算法，接下來這篇文章我們要接著介紹和排序問題有一點相關的選擇問題。

為什麼會說選擇問題和排序問題有一點相關呢？

首先，我們先來定義什麼是選擇問題(Selection Problem)。選擇問題指的是從一個包含 n 個不同數字的集合 A 中，找出第 i 個順序統計量。也就是說，找出集合 A 中恰好比其他 $i-1$ 個元素大的那個元素 $x$。換句話說，選擇問題需要解決的目標是**如何從一個未經排序的 n 個元素的集合中，高效地找出第 i 小的元素？**

從上面的說明我們就可以看出為什麼選擇問題和排序問題有一點相關了。因為我們很容易可以想出選擇問題最直觀的解法就是先用一個高效的排序演算法——例如：合併排序或堆積排序——將整個集合排序，然後直接取出第 i 個元素。

但是面對選擇問題，我們其實可以做得更好。要解決選擇問題，我們其實**並不需要對整個集合進行完整排序**。本篇文章我們會針對這些「不需要先排序」就可以解決選擇問題的演算法做介紹。

## RANDOMIZED-SELECT 演算法

RANDOMIZED-SELECT 是一個基於快速排序(Quicksort)分治策略的隨機演算法，它透過遞迴地分割陣列並只處理包含目標元素的其中一邊，來有效率地找出一個集合中第 i 小的元素。

RANDOMIZED-SELECT 最顯著的優勢在它**極高的平均效率**。它的期望執行時間——或稱平均執行時間——為 $\Theta(n)$，也就是線性時間。而因為它隨機化的特性，RANDOMIZED-SELECT 演算法在實務應用中表現非常穩健且高效，不容易被特定的輸入資料模式拖垮效能。

然而，RANDOMIZED-SELECT 在**最差情況下的效能會退化到** $\Theta(n^2)$，不過這種最差情況發生的機率極低，而且因為基準點是隨機選擇的，沒有任何一種特定的輸入能夠穩定地觸發最差情況。

### RANDOMIZED-SELECT 完整的實作邏輯和步驟

RANDOMIZED-SELECT 演算法的核心思想是**分治(divide-and-conquer)**，它巧妙地借鑒了快速排序的分割步驟，但避免了對兩邊都進行遞迴的浪費。它的目標是透過不斷縮小搜尋範圍，直到找到目標元素為止。我們可以用虛擬碼表示如下：

```javascript
RANDOMIZED-SELECT(A, p, r, i)
1 if p == r
2   return A[p]
3 q = RANDOMIZED-PARTITION(A, p, r)
4 k = q - p + 1
5 if i == k
6   return A[q]
7 elseif i < k
8   return RANDOMIZED-SELECT(A, p, q - 1, i)
9 else return RANDOMIZED-SELECT(A, q + 1, r, i - k)
```

**RANDOMIZED-SELECT(A, p, r, i)** 這個函式的作用是在陣列 `A` 的子陣列 `A[p...r]`——從索引 `p` 到 `r`——中，尋找第 `i` 小的元素。

- **第 1-2 行**：這是遞迴的**基本情況(Base Case)**。如果子陣列的起始索引 `p` 和結束索引 `r` 相等，表示這個子陣列只剩下一個元素。那麼這個元素自然就是我們要找的（此時 `i` 必定為 1），直接返回它。

- **第 3 行**：呼叫 `RANDOMIZED-PARTITION` 函式。這個函式會隨機在 `A[p...r]` 中選一個基準點，並圍繞它進行分割。分割後，函式會返回基準點最終所在的索引 `q`。

- **第 4 行**：計算基準點的排名。`k` 代表基準點 `A[q]` 是 `A[p...r]` 這段子陣列中的第 `k` 小的元素。

- **第 5-6 行**：**檢查是否命中**。如果我們要找的排名 `i` 恰好等於基準點的排名 `k`，那麼 `A[q]` 就是答案，直接返回。

- **第 7-8 行**：如果我們要找的排名 `i` 小於基準點的排名 `k`，說明目標元素在基準點的**左側**。因此，我們對左側子陣列 `A[p...q-1]` 進行遞迴呼叫，繼續尋找第 `i` 小的元素。

- **第 9 行**：如果我們要找的排名 `i` 大於基準點的排名 `k`，說明目標元素在基準點的**右側**。我們對右側子陣列 `A[q+1...r]` 進行遞迴呼叫。但請注意，此時我們尋找的目標變成了右側子陣列中的第 `i-k` 小的元素，因為已經有 `k` 個元素（左側子陣列 + 基準點）被確認比目標小了。

我們可以看到這個過程會不斷重複，每一次分割都會讓搜尋的陣列範圍縮小，直到在某一次的「檢查與遞迴」步驟中，基準點的排名 $k$ 恰好等於我們要找的 $i$，演算法便宣告成功。

### 使用 JavaScript 撰寫 RANDOMIZED-SELECT 演算法

```javascript
/**
 * 主函式：RANDOMIZED-SELECT 演算法。
 * 在期望線性時間內找到陣列中第 i 小的元素。
 * @param {Array<number>} arr - 輸入陣列 (會被原地修改)。
 * @param {number} p - 當前處理的子陣列的起始索引。
 * @param {number} r - 當前處理的子陣列的結束索引。
 * @param {number} i - 要尋找的順序統計量 (例如，i=1 是最小值)。
 * @returns {number} 陣列中第 i 小的元素。
 */
function randomizedSelect(arr, p, r, i) {
  // --- 遞迴的基本情況 ---
  // 如果子陣列只剩下一個元素，那它就是我們要找的。
  if (p === r) {
    return arr[p];
  }

  // --- 分割 (Divide) ---
  // 隨機分割子陣列 `arr[p...r]`，並得到基準點的索引 `q`。
  const q = randomizedPartition(arr, p, r);

  // --- 征服 (Conquer) ---
  // 計算基準點 `arr[q]` 是當前子陣列中的第幾小。
  // `k` 是基準點的排名。
  const k = q - p + 1;

  // 比較我們要找的排名 `i` 和基準點的排名 `k`。
  if (i === k) {
    // 情況 1: 找到了！基準點就是第 i 小的元素。
    return arr[q];
  } else if (i < k) {
    // 情況 2: 目標在基準點的左邊。
    // 在左側子陣列 `arr[p...q-1]` 中繼續尋找第 `i` 小的元素。
    return randomizedSelect(arr, p, q - 1, i);
  } else {
    // 情況 3: 目標在基準點的右邊。
    // 在右側子陣列 `arr[q+1...r]` 中繼續尋找。
    // 因為我們已經排除了 k 個較小的元素，所以目標變成了右側的第 `i-k` 小元素。
    return randomizedSelect(arr, q + 1, r, i - k);
  }
}

/**
 * 輔助函式：隨機化分割。
 * 這是 RANDOMIZED-SELECT 的核心步驟之一。
 * 它會隨機選擇一個基準點，並重新排列陣列，使得所有小於等於基準點的元素在左邊，大於的在右邊。
 * @param {Array<number>} arr - 目標陣列。
 * @param {number} p - 子陣列的起始索引。
 * @param {number} r - 子陣列的結束索引。
 * @returns {number} 基準點分割後所在的最終索引。
 */
function randomizedPartition(arr, p, r) {
  // 1. 在 [p, r] 範圍內隨機選擇一個索引。
  const randomIndex = Math.floor(Math.random() * (r - p + 1)) + p;

  // 2. 將隨機選中的基準點與子陣列的最後一個元素交換。
  // 這是為了方便使用標準的 Lomuto 分割演算法。
  swap(arr, randomIndex, r);

  // 3. 執行 Lomuto 分割。
  const pivot = arr[r]; // 將最後一個元素作為基準值。
  let i = p - 1; // i 指向小於基準點的區域的邊界。

  for (let j = p; j < r; j++) {
    // 如果當前元素小於或等於基準點
    if (arr[j] <= pivot) {
      i++; // 擴大「小於」區域
      swap(arr, i, j); // 並將當前元素放入該區域
    }
  }

  // 4. 將基準點放到它最終的正確位置。
  swap(arr, i + 1, r);

  // 5. 返回基準點的最終索引。
  return i + 1;
}

/**
 * 輔助函式：交換陣列中兩個元素的位置。
 * @param {Array<number>} arr - 目標陣列。
 * @param {number} i - 第一個元素的索引。
 * @param {number} j - 第二個元素的索引。
 */
function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}
```

以下也提供無註解的乾淨版本：

```javascript
function randomizedSelect(arr, p, r, i) {
  if (p === r) {
    return arr[p];
  }

  const q = randomizedPartition(arr, p, r);
  const k = q - p + 1;

  if (i === k) {
    return arr[q];
  } else if (i < k) {
    return randomizedSelect(arr, p, q - 1, i);
  } else {
    return randomizedSelect(arr, q + 1, r, i - k);
  }
}

function randomizedPartition(arr, p, r) {
  const randomIndex = Math.floor(Math.random() * (r - p + 1)) + p;

  swap(arr, randomIndex, r);

  const pivot = arr[r];
  let i = p - 1;
  for (let j = p; j < r; j++) {
    if (arr[j] <= pivot) {
      i++;
      swap(arr, i, j);
    }
  }

  swap(arr, i + 1, r);

  return i + 1;
}

function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}
```

### RANDOMIZED-SELECT 的效率分析

經過嚴謹的數學證明，RANDOMIZED-SELECT 在最差情況下的執行時間為 $\Theta(n^2)$；在最好情況下的執行時間為 $\Theta(n)$；在平均——期望——情況下的執行時間為 $\Theta(n)$。

這裡會用比較直觀的方式來進行說明。我們可以想像一下，每次我們隨機選擇一個基準點(pivot)時，最理想的情況是選到中位數，這樣陣列會被精準地分成兩半，我們就能排除掉一半的元素。最糟的情況是選到最大或最小的數，這樣我們只能排除掉一個元素。

RANDOMIZED-SELECT 的高效率秘訣在於，我們並不需要每次都選到完美的中位數。只要我們選的基準點**不要太差**，演算法就能很有效率。我們可以定義一個「好的」選擇，例如，只要基準點落在排序後陣列的「中間一半」（即第 25 百分位數到第 75 百分位數之間），那麼我們每次至少能排除掉四分之一的元素。

由於基準點是隨機選的，它有 50% 的機率會落在這個「中間一半」的理想區域。這就像丟硬幣一樣，平均丟兩次就會有一次正面。同樣地，我們平均進行兩次分割，就有一次是「好的」分割。即使偶爾遇到「壞的」分割，它很快就會被接下來的「好的」分割所彌補。這種持續且穩定地縮小問題規模的能力，使得總體計算量的期望值趨近於一個線性級數（例如 $n + \frac{3}{4}n + (\frac{3}{4})^2n + \dots$），而這個級數的總和是 $O(n)$。因此，整體的平均執行時間就是非常高效的線性時間 $\Theta(n)$。

## SELECT 演算法

面對 RANDOMIZED-SELECT 演算法在**最差情況下的效能會退化到** $\Theta(n^2)$的問題，我們有一個理論上完美但較複雜的解決方案——SELECT 演算法。這個演算法的目標是**消除隨機性中的「壞運氣」**，透過一個巧妙的程序來**確保每次都能選出一個「足夠好」的基準點**，從而**保證**無論輸入是什麼，演算法的執行時間都能維持在線性的 $Θ(n)$。

然而，SELECT 演算法雖然在理論上很完美，但在實際應用中通常比 `RANDOMIZED-SELECT` 慢。這是因為它為了保證選出一個「好」的基準點，需要執行一系列複雜的操作——包含分組、組內排序、遞迴找中位數的中位數，這些操作的常數因子(constant factor)很大。因此，SELECT 演算法的價值更多在於理論上的啟發。

因為 SELECT 演算法的理論意義大於實用價值，因此針對這個演算法我們就先不再繼續展開做細部的介紹了。

## 參考資料

[Introduction to Algorithms, fourth edition](https://www.amazon.com/Introduction-Algorithms-fourth-Thomas-Cormen/dp/026204630X)

## 附錄

本文為系列文章，目前寫了五篇:

1. [認識演算法：啟程](../understanding-algorithms-getting-started/)
2. [認識演算法：常用資料結構](../understanding-algorithms-common-data-structures/)
3. [認識演算法：各種比較排序](../understanding-algorithms-comparison-based-sorting/)
4. [認識演算法：各種線性時間排序](../understanding-algorithms-linear-time-sorting/)
5. [認識演算法：選擇問題](../understanding-algorithms-selection-problem/)
