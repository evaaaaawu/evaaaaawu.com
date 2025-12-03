---
title: 認識演算法：各種線性時間排序
subtitle: 探索計數排序、基數排序、桶排序等突破比較排序極限的線性時間排序演算法。
author: src/content/authors/eva.json
imageWebp: /images/articles/webp/understanding-algorithms-linear-time-sorting.webp
imagePng: /images/articles/png/understanding-algorithms-linear-time-sorting.png
imgAlt: Understanding Algorithms_Linear-Time Sorting Algorithms
creationDate: 2025-12-01
updateDate: 2025-12-01
tags:
  - Algorithm
featured: false
---

在 [認識演算法：各種比較排序](../understanding-algorithms-comparison-based-sorting/) 這篇文章的結尾中，我們談到了比較排序演算法在時間效率上有一個無法突破的理論極限，也就是在最壞情況下，它的時間複雜度**絕對不可能**優於 $O(n \log n)$。

接下來我們要問的問題就是：**若不用「兩兩比較」的方式來排序，我們還可以找到其他方式來進行排序嗎？若可以，這個方法的時間效率能否超越比較排序的速度極限——也就是** $O(n \log n)$**？**

相信大部分的人都猜的到，竟然我們已經將排序演算法拆出一塊「比較排序」的類型，那我們就可以推知一定也有不是透過「比較」來排序的演算法存在。

而對於有辦法突破比較排序速度極限的排序演算法，我們可以稱做線性時間排序。

這篇文章就是要來認識常見的「線性時間排序」——也就是非比較排序——相關演算法。

以下是本篇文章的目錄：

1. [**計數排序(Counting Sort)**](#計數排序counting-sort)
2. [**基數排序(Radix Sort)**](#基數排序radix-sort)
3. [**桶排序(Bucket Sort)**](#桶排序bucket-sort)

## **計數排序(Counting Sort)**

計數排序是一種非比較型排序演算法，適用於特定範圍內的整數，它透過計算每個元素出現的次數來直接決定它在排序後陣列中的最終位置。

計數排序最大的優勢在於它**線性時間**的執行效率。它的時間複雜度是 $\Theta(n+k)$，其中 $n$ 是輸入元素的數量，$k$ 是元素的範圍（最大值）。當 $k$ 的規模與 $n$ 相當——也就是 $k=O(n)$——時，它的時間複雜度就變成了驚人的 $\Theta(n)$。這遠遠快於任何比較排序演算法。

計數排序的另一個優勢是它是一個穩定的演算法。這意味著如果兩個元素的值相同，它們在排序後的輸出陣列中的相對順序會和輸入時完全一樣。這個特性非常重要，因為它讓計數排序可以被當作更複雜排序演算法——例如下面將介紹到的基數排序(Radix Sort)——中的一個子程序。

但我們也必須要注意，計數排序的超高效率是建立在一個嚴格的假設之上的：**輸入的元素必須是某個已知範圍（例如 0 到 $k$）內的整數**。如果資料範圍 $k$ 變得非常大（例如遠大於 $n$），那麼演算法的效率就會下降為 $\Theta(k)$，並且會需要一個巨大的輔助陣列，導致空間浪費。再來是，由於計數排序利用元素的值直接作為陣列的索引，它不能直接用於排序非整數類型——例如浮點數或字串——的資料。

總結來說，計數排序的優勢是它擁有**極高的效率**和**穩定性(Stable)**，但它也有**應用場景受限**和**不適用於非整數資料**的劣勢。我們可以將計數排序視為是一種「特化型」的演算法，它透過犧牲通用性，換取了在特定場景下超越傳統比較排序演算法的極致效能。

### **計數排序**完整的實作邏輯和步驟

計數排序的核心思想是：**透過計算小於或等於某個元素 $x$ 的數量，來確定 $x$ 在最終排序結果中的位置**。實作邏輯用虛擬碼表示如下：

```javascript
COUNTING-SORT(A, n, k)
1  let B[1:n] and C[0:k] be new arrays
2  for i = 0 to k
3    C[i] = 0
4  for j = 1 to n
5    C[A[j]] = C[A[j]] + 1
6  // C[i] 現在包含等於 i 的元素(element)數量。
7  for i = 1 to k
8    C[i] = C[i] + C[i-1]
9  // C[i] 現在包含小於或等於 i 的元素(element)數量。
10 // 從陣列(array) A 的結尾開始，將 A 複製到 B。
11 for j = n downto 1
12   B[C[A[j]]] = A[j]
13   C[A[j]] = C[A[j]] - 1
14 return B
```

- **第 1 行**：建立一個大小為 $n$ 的輸出陣列 $B$ 和一個大小為 $k+1$ 的計數陣列 $C$。

- **第 2-3 行**：初始化計數陣列 $C$ 的所有元素為 0。

- **第 4-5 行**：遍歷輸入陣列 $A$，統計每個元素出現的次數，並存儲在 $C$ 中。

- **第 7-8 行**：計算累積次數。遍歷完成後，$C[i]$ 存儲了小於或等於 $i$ 的元素總數。

- **第 11-13 行**：從後向前遍歷輸入陣列 $A$。對於每個元素 `A[j]`，`C[A[j]]` 的值就是它在輸出陣列 $B$ 中的正確位置。將 `A[j]` 放入該位置後，將 `C[A[j]]` 減 1，以便下一個相同值的元素能被放在前一個位置。

- **第 14 行**：返回排序好的陣列 $B$。

這個巧妙的設計，完全沒有元素間的比較，而是透過計數和索引操作完成了排序。

### 使用 JavaScript 撰寫**計數排序**演算法

```javascript
/**
 * 使用計數排序演算法對一個整數陣列進行排序。
 * @param {number[]} A - 輸入陣列，元素為 0 到 k 之間的整數。
 * @param {number} k - 輸入陣列中的最大值。
 * @returns {number[]} - 一個新的、已排序的陣列。
 */
function countingSort(A, k) {
  // 從輸入陣列 A 的長度獲取元素個數 n
  const n = A.length;

  // 步驟 1: 建立輔助陣列
  // B 是用於存放排序結果的輸出陣列
  const B = new Array(n);
  // C 是計數陣列，大小為 k+1，用於儲存 0 到 k 每個數字的資訊
  // 並將所有元素初始化為 0
  const C = new Array(k + 1).fill(0);

  // 步驟 2: 計算每個元素出現的次數
  // 遍歷輸入陣列 A，將每個元素的值作為索引，在 C 陣列中對應位置加 1
  for (let j = 0; j < n; j++) {
    C[A[j]]++;
  }
  // 此時，C[i] 代表數字 i 在 A 中出現的次數。

  // 步驟 3: 計算累積次數
  // 遍歷計數陣列 C，將每個位置的值更新為其自身與前一個位置值的和
  for (let i = 1; i <= k; i++) {
    C[i] = C[i] + C[i - 1];
  }
  // 此時，C[i] 代表小於或等於 i 的元素總個數。
  // 這個值也對應了元素 i 在排序後陣列中的 1-based 索引位置。

  // 步驟 4: 將元素放置到輸出陣列 B 中
  // 從後向前遍歷輸入陣列 A，這是確保排序穩定性的關鍵
  for (let j = n - 1; j >= 0; j--) {
    // 獲取當前元素 A[j] 的值
    const value = A[j];
    // 從 C 陣列中查詢 value 的最終位置 (1-based index)
    // 並將其轉換為 B 陣列的 0-based index
    const position = C[value] - 1;

    // 將 value 放置到 B 陣列的正確位置
    B[position] = value;

    // 將 C 陣列中對應位置的計數減 1
    // 這樣下一個相同值的元素就會被放在前一個位置
    C[value]--;
  }

  // 返回排序完成的陣列 B
  return B;
}
```

以下也提供無註解的乾淨版本：

```javascript
function countingSort(A, k) {
  const n = A.length;
  const B = new Array(n);
  const C = new Array(k + 1).fill(0);

  for (let j = 0; j < n; j++) {
    C[A[j]]++;
  }

  for (let i = 1; i <= k; i++) {
    C[i] = C[i] + C[i - 1];
  }

  for (let j = n - 1; j >= 0; j--) {
    const position = C[A[j]] - 1;
    B[position] = A[j];
    C[A[j]]--;
  }

  return B;
}
```

### **計數排序**的效率分析

經過嚴謹的數學證明，計數排序在最差情況、最好情況及平均情況下的執行時間均為 $\Theta(n+k)$。

在實際應用中，我們通常在 $k=O(n)$ 的情況下使用計數排序，此時時間複雜度就簡化為 $\Theta(n+O(n)) = \Theta(n)$。

計數排序之所以如此高效，是因為它將排序問題轉換為一系列簡單的計數和資料搬移問題。整個演算法只包含四個主要的迴圈：

1. 一個迴圈初始化計數陣列 $C$（長度為 $k$）。

2. 一個迴圈遍歷輸入陣列 $A$ 來計數（長度為 $n$）。

3. 一個迴圈遍歷計數陣列 $C$ 來計算累積和（長度為 $k$）。

4. 一個迴圈再次遍歷輸入陣列 $A$ 來放置元素到輸出陣列 $B$（長度為 $n$）。

演算法的總工作量基本上就是這幾個獨立迴圈的總和。沒有嵌套迴圈，也沒有遞迴呼叫。因此，總時間自然與輸入大小 $n$ 和資料範圍 $k$ 呈線性關係，也就是 $n+k$。

## **基數排序(Radix Sort)**

基數排序和前面介紹的計數排序一樣是一種非比較型的整數排序演算法，它透過從最低位數到最高位數，逐輪對數字的各個位數進行穩定排序(stable sort)，最終完成所有數字的排序。

**穩定排序(Stable Sort)**指的是如果一個排序演算法能保證具有相同值的元素在排序後的輸出陣列中，其相對順序與它們在輸入陣列中的順序相同，那麼這個演算法就是穩定的。

基數排序的其中一項優勢是在特定條件下——例如：當數字的位數 $d$ 為常數，且每個位數的可能值範圍 $k$ 與元素總數 $n$ 差不多時——的執行時間可以達到線性時間 $\Theta(n)$，這比任何比較型排序演算法的 $\Theta(n \lg n)$ 還要快。

基數排序的另一項優勢是它非常適合用來排序由多個欄位組成的資料，例如將日期按照「年、月、日」排序。傳統做法是撰寫一個複雜的比較函數，但使用基數排序，我們可以更直觀地進行三次穩定排序：首先按「日」排序，然後按「月」排序，最後按「年」排序，即可得到正確的結果。

需要注意的是，儘管基數排序在理論上非常高效，但在實際應用中，它也存在一些明顯的劣勢，包含以下：

1. **常數因子(Constant Factors)較大**：雖然基數排序的漸近時間複雜度可能是線性的 $\Theta(n)$，但其 $\Theta$ 符號中隱藏的常數因子可能很大。相較於快速排序，基數排序的每一輪傳遞都可能花費更長的時間。

2. **非原地排序(Not In-place)**：當使用計數排序(Counting Sort)作為其穩定的子排序演算法時，基數排序需要額外的儲存空間來存放中間結果，這與許多 $\Theta(n \lg n)$ 的比較型排序演算法——如快速排序、堆積排序——可以直接在原陣列上操作(in-place)不同。當記憶體空間非常寶貴時，原地排序演算法可能是更好的選擇。

3. **對硬體快取(Hardware Caches)的利用率較差**：在現代電腦架構中，快速排序通常能更有效地利用硬體快取，這使得它在實務上的表現往往優於基數排序。

### **基數排序**完整的實作邏輯和步驟

基數排序採用一種反直覺但非常巧妙的方法：**從最低位數(least significant digit)開始排序**。先簡單用虛擬碼表示如下：

```javascript
RADIX-SORT (A, n, d)
1 for i = 1 to d
2   use a stable sort to sort array A[1:n] on digit i
```

- **參數說明**：

  - `A`：要排序的陣列。

  - `n`：陣列大小。

  - `d`：陣列中最大數字的位數。

- **虛擬碼解釋**：

   這是一個迴圈，從 `i=1` (最低位，即個位數) 迭代到 `d` (最高位)。在每一次迭代中，它會呼叫一個穩定的排序演算法（如計數排序）來對整個陣列 `A` 根據當前的第 `i` 位數進行排序。

這個演算法之所以能成功，關鍵在於**每一次的位數排序都必須是穩定的**。穩定性確保了前一輪低位數的排序成果會被保留到下一輪高位數的排序中。

### 使用 JavaScript 撰寫基數排序演算法

```javascript
/**
 * 基數排序的主函數
 * @param {Array<number>} arr - 待排序的數字陣列
 * @returns {Array<number>} - 排序完成的陣列
 */
function radixSortWithCountingSort(arr) {
  if (!Array.isArray(arr) || arr.length <= 1) {
    return arr;
  }

  // 1. 找出最大值，以確定需要排序的位數
  const maxNum = Math.max(...arr);

  // 2. 迭代每一個位數，從個位數 (exp = 1) 開始
  let exp = 1;
  while (maxNum / exp >= 1) {
    // 3. 對當前位數執行一次穩定的計數排序
    countingSortOnDigit(arr, exp);
    exp *= 10;
  }

  return arr;
}

/**
 * 針對特定位數進行計數排序的輔助函式 (穩定排序)
 * @param {Array<number>} arr - 待排序的陣列 (會被原地修改)
 * @param {number} exp - 指數，代表要排序的位數 (1代表個位, 10代表十位, ...)
 */
function countingSortOnDigit(arr, exp) {
  const n = arr.length;
  const output = new Array(n).fill(0); // 輸出陣列 B
  const count = new Array(10).fill(0); // 計數陣列 C (位數只可能是 0-9)

  // 步驟 1: 計算每個位數 (0-9) 出現的頻率
  for (let i = 0; i < n; i++) {
    const digit = Math.floor(arr[i] / exp) % 10;
    count[digit]++;
  }

  // 步驟 2: 計算累積次數，確定每個數字的最終位置
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  // 步驟 3: 從後向前遍歷，將元素放入輸出陣列的正確位置以保證穩定性
  for (let i = n - 1; i >= 0; i--) {
    const digit = Math.floor(arr[i] / exp) % 10;
    const position = count[digit] - 1;
    output[position] = arr[i];
    count[digit]--;
  }

  // 步驟 4: 將排序好的結果複製回原陣列
  for (let i = 0; i < n; i++) {
    arr[i] = output[i];
  }
}
```

在這裡我們還要介紹另一個在實作中更受歡迎的寫法——**桶子法**——這個寫法和前面的寫法是等價的，但是它擁有許多優點使得它更常在實作上被使用，包含它的寫法更簡潔、程式碼可讀性更高、它能很好地利用現代程式語言的動態陣列特性，以及它隱含地完成了計數和放置，而不需要顯式的計數和位置計算。

```javascript
/**
 * 基數排序主函數
 * @param {Array<number>} nums - 待排序的數字陣列
 * @returns {Array<number>} - 排序完成的陣列
 */
function radixSort(nums) {
  // 1. 找出需要執行的排序輪數，即最大數字的位數
  const maxDigitCount = mostDigits(nums);

  // 2. 根據位數，從最低位(k=0)到最高位進行迭代
  for (let k = 0; k < maxDigitCount; k++) {
    // 3. 為每個位數 (0-9) 創建一個桶 (bucket)
    //    這裡的桶就相當於計數排序中的臨時儲存空間
    let digitBuckets = Array.from({ length: 10 }, () => []);

    // 4. 遍歷目前陣列中的所有數字
    for (let i = 0; i < nums.length; i++) {
      // 獲取當前數字在第 k 位上的值
      let digit = getDigit(nums[i], k);
      // 將該數字放入對應的桶中
      // 由於我們是依序放入，這保證了排序的穩定性
      digitBuckets[digit].push(nums[i]);
    }

    // 5. 從桶中按順序 (0號桶到9號桶) 取出所有數字，重新組合成新的陣列
    //    這一步完成了對第 k 位數的排序
    nums = [].concat(...digitBuckets);
  }

  // 6. 所有輪次結束後，返回完全排序好的陣列
  return nums;
}

/**
 * 輔助函數：找出一個陣列中，位數最多的數字有幾位
 * @param {Array<number>} nums - 數字陣列
 * @returns {number} - 最大的位數
 */
function mostDigits(nums) {
  let maxDigits = 0;
  for (let i = 0; i < nums.length; i++) {
    maxDigits = Math.max(maxDigits, digitCount(nums[i]));
  }
  return maxDigits;
}

/**
 * 輔助函數：計算一個數字共有幾位數
 * @param {number} num - 輸入的數字
 * @returns {number} - 數字的位數
 */
function digitCount(num) {
  // 特殊情況：0 是一位數
  if (num === 0) return 1;
  // e.g., digitCount(732) -> floor(log10(732)) + 1 -> floor(2.86) + 1 -> 2 + 1 -> 3
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

/**
 * 輔助函數：獲取一個數字在特定位數上的值
 * @param {number} num - 輸入的數字
 * @param {number} place - 位數 (0是個位, 1是十位, ...)
 * @returns {number} - 該位數上的數字 (0-9)
 */
function getDigit(num, place) {
  // e.g., getDigit(732, 2) -> Math.floor(732 / 100) % 10 -> 7
  return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
}
```

以下也提供無註解的乾淨版本：

```javascript
function radixSort(nums) {
  const maxDigitCount = mostDigits(nums);

  for (let k = 0; k < maxDigitCount; k++) {
    let digitBuckets = Array.from({ length: 10 }, () => []);

    for (let i = 0; i < nums.length; i++) {
      let digit = getDigit(nums[i], k);
      digitBuckets[digit].push(nums[i]);
    }

    nums = [].concat(...digitBuckets);
  }

  return nums;
}

function mostDigits(nums) {
  let maxDigits = 0;
  for (let i = 0; i < nums.length; i++) {
    maxDigits = Math.max(maxDigits, digitCount(nums[i]));
  }
  return maxDigits;
}

function digitCount(num) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

function getDigit(num, place) {
  return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
}
```

### **基數排序**的效率分析

經過嚴謹的數學證明，對於 $n$ 個 $d$ 位數的數字，其中每個位數最多有 $k$ 種可能的值，若基數排序使用的穩定排序演算法耗時為 $\Theta(n+k)$（例如計數排序），則基數排序的執行時間為 $\Theta(d(n+k))$。

用直觀的方式來理解，基數排序總共需要對數字的 $d$ 個位數進行排序。每一輪排序，它都會使用一個穩定的子排序演算法——例如計數排序——來處理 $n$ 個數字。如果子排序演算法的時間是線性的，例如 $\Theta(n+k)$，那麼總時間就是把這個過程重複 $d$ 次，也就是 $d \times \Theta(n+k)$，即 $\Theta(d(n+k))$。

## **桶排序(Bucket Sort)**

桶排序是本篇要介紹的最後一個非比較型排序演算法，它是一種將待排序的元素分散到有限數量的「桶」中，對每個桶內的元素進行單獨排序，最後再依序合併所有桶中元素的排序演算法。

桶排序在特定條件下可以達到**平均情況下 $O(n)$ 的線性時間效率**。這個條件——也是此演算法最重要的假設——是**輸入的資料是由一個隨機過程所產生，並且均勻且獨立地分佈在一個已知的區間內**（例如 \[0, 1)）。在這個理想的假設下，所有元素會被平均地分配到各個桶中，導致每個桶內只會有極少量的元素。對少量元素進行排序的成本極低，因此整體演算法的主要開銷就只剩下將 $n$ 個元素放入桶中的這一次遍歷，從而實現了線性的執行時間。

但這樣的限制也為它帶來了劣勢，桶排序的劣勢根植於它的核心假設。它的高效能完全依賴於輸入資料的「均勻分佈」。

- **最差情況下的效能衰退**：如果輸入資料的分佈極不均勻，例如所有元素都集中在一個極小的範圍內，那麼絕大多數甚至所有元素都會被分配到同一個桶中。在這種情況下，演算法的效能就退化成處理這個單一桶所使用的排序演算法的效能。如果我們使用的排序演算法是插入排序，那麼桶排序的整體最差執行時間將會是 $\Theta(n^2)$。

- **對輸入資料的限制**：桶排序假設輸入資料的範圍是已知的，並且能夠被輕易地劃分成多個子區間（桶）。對於無法預知範圍或非數值的資料類型，應用起來就比較困難。

總結來說，桶排序是一個在「資料分佈均勻」這個強力假設下，用來換取超越傳統比較排序演算法效能的專用演算法。

### **桶排序**完整的實作邏輯和步驟

桶排序的整體邏輯非常直觀，我們可以將它想像成整理撲克牌的過程。

假設我們要整理一疊數字從 0 到 99 的卡牌，我們可以準備 10 個盒子——也就是桶，並分別標記 0-9、10-19、...、90-99。接著，我們逐一拿起卡牌，根據卡牌上的數字將其放入對應的盒子裡。放完所有卡牌後，我們再分別整理每個盒子裡的卡牌（因為每個盒子裡的牌不多，所以整理起來很快）。最後，按照盒子的順序（0-9, 10-19, ...）將所有整理好的卡牌拿出來，就得到了一個完全排序好的序列。

用虛擬碼表示如下：

```javascript
BUCKET-SORT(A, n)
1 let B[0:n-1] be a new array
2 for i = 0 to n-1
3   make B[i] an empty list
4 for i = 1 to n
5   insert A[i] into list B[floor(n * A[i])]
6 for i = 0 to n-1
7   sort list B[i] with insertion sort
8 concatenate the lists B[0], B[1], ..., B[n-1] together in order
9 return the concatenated lists
```

- **第 1-3 行**：初始化一個名為 `B` 的陣列，它將包含 `n` 個桶。迴圈將每個桶 `B[i]` 初始化為一個空列表，準備用來接收元素。

- **第 4-5 行**：這是分發步驟。遍歷輸入陣列 `A` 中的每一個元素。對於每個元素 `A[i]`，通過計算 `floor(n * A[i])` 來確定其桶的索引，然後將 `A[i]` 插入到對應的桶 `B` 中。

- **第 6-7 行**：這是對每個桶進行排序的步驟。遍歷所有的桶，並使用插入排序（或其他排序演算法）對每個非空的桶進行內部排序。

- **第 8-9 行**：這是合併結果的步驟。按順序將所有桶（從 `B[0]` 到 `B[n-1]`）中的元素連接起來，形成一個單一的、已排序的列表，並將它作為結果返回。

### 使用 JavaScript 撰寫桶排序演算法

```javascript
/**
 * 使用桶排序演算法對一個包含 [0, 1) 區間內浮點數的陣列進行排序。
 * @param {number[]} arr - 待排序的陣列。
 * @returns {number[]} - 排序後的陣列。
 */
function bucketSort(arr) {
  // 處理邊界情況：如果陣列為空，直接返回。
  if (arr.length === 0) {
    return arr;
  }

  // 獲取輸入陣列的長度，這也將是我們要使用的桶的數量。
  const n = arr.length;

  // 步驟 1: 初始化 n 個空桶。
  // 我們創建一個長度為 n 的陣列，其中每個元素都是一個空陣列（代表一個桶）。
  let buckets = new Array(n);
  for (let i = 0; i < n; i++) {
    buckets[i] = [];
  }

  // 步驟 2: 將陣列中的每個元素分發到對應的桶中。
  // 遍歷輸入陣列 `arr`。
  for (let i = 0; i < n; i++) {
    // 根據元素值計算其應放入的桶的索引。
    // 因為元素值在 [0, 1) 之間，乘以 n 後，結果將在 [0, n) 之間。
    // Math.floor() 確保索引為整數。
    let bucketIndex = Math.floor(n * arr[i]);
    // 將元素放入計算出的桶中。
    buckets[bucketIndex].push(arr[i]);
  }

  // 步驟 3: 對每個桶中的元素進行排序。
  // 遍歷所有桶。
  for (let i = 0; i < n; i++) {
    // 這裡可以使用插入排序，因為預期每個桶中的元素很少，但在 JavaScript 中，直接使用內建的 .sort() 方法更為方便且高效。
    // 對於數字排序，需要提供一個比較函式 (a, b) => a - b。
    buckets[i].sort((a, b) => a - b);
  }

  // 步驟 4: 依序合併所有桶中的元素，以獲得最終排序結果。
  // `buckets` 現在是一個二維陣列（陣列的陣列）。
  // 使用 ES2019 的 .flat() 方法可以將其攤平成一個一維陣列。
  // 效果等同於 `[].concat(...buckets)`。
  const sortedArr = buckets.flat();

  // 返回完全排序後的陣列。
  return sortedArr;
}
```

以下也提供無註解的乾淨版本：

```javascript
function bucketSort(arr) {
  if (arr.length === 0) {
    return arr;
  }

  const n = arr.length;
  let buckets = new Array(n);
  for (let i = 0; i < n; i++) {
    buckets[i] = [];
  }

  for (let i = 0; i < n; i++) {
    let bucketIndex = Math.floor(n * arr[i]);
    buckets[bucketIndex].push(arr[i]);
  }

  for (let i = 0; i < n; i++) {
    buckets[i].sort((a, b) => a - b);
  }

  const sortedArr = buckets.flat();

  return sortedArr;
}
```

### **桶排序**的效率分析

經過嚴謹的數學證明，桶排序在最差情況下的執行時間為 $\Theta(n^2)$；在最好情況下的執行時間為 $\Theta(n)$；在**平均情況**下的執行時間為 $\Theta(n)$。

桶排序之所以在平均情況下能達到驚人的 $\Theta(n)$ 效率，其直覺來源於「分而治之」與「機率」的結合。核心思想是：如果我們有 $n$ 個元素，並且我們準備了 $n$ 個桶，而這些元素又很「聽話」（均勻分佈），那麼它們就會很均勻地散落在這 $n$ 個桶裡。

理想情況下，每個桶正好分到一個元素，這樣我們根本不需要對桶內部進行排序。即使不那麼理想，平均來看，每個桶也只會分到常數個元素。對一個只有兩三個元素的列表進行排序，幾乎不花時間。因此，整個演算法最耗時的部分就變成了那一次「將 $n$ 個元素逐一放入對應桶中」的過程，這個過程的複雜度顯然是 $\Theta(n)$。

然而，當所有元素都「不聽話」，全部擠進同一個桶時——也就是最差情況，這個演算法就退化成了對這 $n$ 個元素只使用插入排序，效率自然就掉到了 $\Theta(n^2)$。

## 參考資料

[Introduction to Algorithms, fourth edition](https://www.amazon.com/Introduction-Algorithms-fourth-Thomas-Cormen/dp/026204630X)

## 附錄

本文為系列文章，目前寫了五篇:

1. [認識演算法：啟程](../understanding-algorithms-getting-started/)
2. [認識演算法：常用資料結構](../understanding-algorithms-common-data-structures/)
3. [認識演算法：各種比較排序](../understanding-algorithms-comparison-based-sorting/)
4. [認識演算法：各種線性時間排序](../understanding-algorithms-linear-time-sorting/)
5. [認識演算法：選擇問題](../understanding-algorithms-selection-problem/)
