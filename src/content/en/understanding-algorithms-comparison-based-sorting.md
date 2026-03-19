---
title: "Understanding Algorithms: Comparison-Based Sorting"
creationDate: 2025-11-30
updateDate: 2025-11-30
topics:
  - Algorithm
featured: false
outdated: true
---

In the article [Understanding Algorithms: Getting Started](../understanding-algorithms-getting-started/), we gained a preliminary understanding of what algorithms are, how to design algorithms well, and how to evaluate their efficiency. Next, we need to delve into details to understand and analyze various common algorithms. This article will focus on understanding common "comparison-based sorting" algorithms.

This type of comparison-based sorting algorithms has a common characteristic: they completely rely on comparing the relative sizes of two elements ($a_i$ and $a_j$) (such as $a_i \leq a_j$ or $a_i > a_j$) to obtain sorting information. The algorithm cannot "peek" at the actual numerical values of elements, nor can it use any other method to obtain order.

Using a simple analogy to understand, imagine there's a pile of stones of different weights, but we only have a balance scale. We cannot read the grams marked on the stones, so the only thing we can do is put any two stones on the balance to see which side is heavier. All comparison-based sorting methods are like strategies for sorting all stones using only this balance.

After understanding what comparison-based sorting is, we'll now formally introduce various types of comparison-based sorting algorithms.

Below is the table of contents for this article:

1. [Insertion Sort](#insertion-sort)
2. [Merge Sort](#merge-sort)
3. [Heapsort](#heapsort)
4. [Quicksort](#quicksort)
5. [Introducing the "Randomized" Version of Quicksort](#introducing-the-randomized-version-of-quicksort)
6. [Summary](#summary)

## Insertion Sort

The implementation logic of insertion sort simulates the process of organizing playing cards—taking unsorted cards one by one and inserting them into the correct position in the already sorted hand.

Insertion sort is efficient in specific scenarios and is a sorting method that simulates human intuitive thinking, making it very easy to understand and implement. From the above description, we can infer that the value of insertion sort lies in its simplicity and efficient performance on small or nearly sorted datasets. Conversely, when dealing with large-scale, unordered data, insertion sort's quadratic growth execution time makes it a poor choice.

### Complete Implementation Logic and Steps of Insertion Sort

The core logic of insertion sort is to divide the array into two parts: one is the **sorted** subarray, and the other is the **unsorted** subarray. The algorithm sequentially takes elements from the unsorted part, then finds the correct position in the sorted part and inserts them.

Represented in pseudocode as follows:

```javascript
INSERTION-SORT(A, n)
1 for i = 2 to n
2   key = A[i]
3   // Insert A[i] into the sorted subarray A[1:i-1]
4   j = i - 1
5   while j > 0 and A[j] > key
6     A[j+1] = A[j]
7     j = j - 1
8   A[j+1] = key
```

- **Line 1**: This is the main loop that traverses all elements in the array that need to be sorted. `i` points to the current element to be inserted. The loop starts from `i=2` because `A[1]` itself already constitutes a sorted subarray. At the beginning of each `for` loop, the subarray `A[1:i-1]` is always sorted.

- **Line 2**: Store the value of the current element to be inserted `A[i]` in the variable `key`. This prevents the original value of `A[i]` from being overwritten during subsequent element shifting.

- **Line 4**: Initialize an index `j` to point to the rightmost element of the sorted subarray `A[1:i-1]`. We'll start comparing from here moving left.

- **Line 5**: This is the inner `while` loop, responsible for finding the insertion point for `key`. It continues executing as long as these conditions are met:

  - `j` is still within the valid range of the array (`j > 0`).

  - The value of the sorted element `A[j]` pointed to by `j` is greater than `key`.

   As long as both conditions are met, it means the final position for `key` hasn't been found yet, and we need to continue searching left.

- **Lines 6-7**: This is the "move right" operation. If `A[j]` is greater than `key`, copy the value of `A[j]` to the position on its right `A[j+1]`, then decrement `j` by 1 to continue checking the next element to the left.

- **Line 8**: When the `while` loop ends, it means the correct position has been found. There are two reasons for ending:

   1. Found `A[j]` such that `A[j] <= key`.

   2. `j` became 0, meaning all elements in the sorted subarray are greater than `key`.

   In either case, position `j+1` is where `key` should be inserted.

### Writing Insertion Sort Algorithm in JavaScript

```javascript
/**
 * Sort an array in-place using the insertion sort algorithm.
 * @param {number[]} arr - The array of numbers to sort.
 * @returns {number[]} - Returns the same sorted array.
 */
function insertionSort(arr) {
  // Length of the array
  const n = arr.length;

  // The outer loop starts from the second element, as the first element alone already constitutes a sorted subarray.
  // This corresponds to "for i = 2 to n" in the pseudocode.
  // In 0-based indexing, this means starting from index 1.
  for (let i = 1; i < n; i++) {
    // `key` is the current element to be inserted into the sorted part.
    // This corresponds to "key = A[i]" in the pseudocode.
    let key = arr[i];

    // `j` points to the last element of the sorted subarray.
    // This corresponds to "j = i - 1" in the pseudocode.
    let j = i - 1;

    // Move elements in the sorted subarray that are greater than `key` one position to the right.
    // This corresponds to "while j > 0 and A[j] > key" in the pseudocode.
    // Note that in 0-based indexing, the condition j > 0 becomes j >= 0.
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }

    // Insert `key` at the correct position.
    // This corresponds to "A[j + 1] = key" in the pseudocode.
    arr[j + 1] = key;
  }

  // Return the sorted array
  return arr;
}
```

Below is also a clean version without comments:

```javascript
function insertionSort(arr) {
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }

    arr[j + 1] = key;
  }

  return arr;
}
```

### Efficiency Analysis of Insertion Sort

Through rigorous mathematical proof, insertion sort has an execution time of $\Theta(n^2)$ in the worst case; $\Theta(n)$ in the best case; and $\Theta(n^2)$ in the average case.

Below we'll explain using a more intuitive understanding:

- **Worst Case - Reverse-Ordered Array**: Imagine the cards on the table are completely reversed (from largest to smallest). Each time you pick up a new card (like 3), it's smaller than all the cards in your hand (like 10, 8, 5). To make room for it at the leftmost position, you must move every card in your hand to the right once. The second card needs 1 move, the third card needs 2 moves, ..., the `n`th card needs `n-1` moves. The total number of moves is approximately $1+2+...+(n-1)$, which equals $n(n-1)/2$—that is, growth rate is equivalent to $n^2$, so efficiency is quadratic.

- **Best Case - Already Sorted Array**: Imagine the playing cards you're organizing are already sorted from smallest to largest. Each time you pick up a new card from the table (like 6), you only need to compare it once with the largest card in your hand (like 5). Finding the new card is larger, you directly place it at the rightmost position, without needing to move any other cards in your hand. This process is the same for each card, so picking up `n` cards requires approximately only `n` comparisons, making efficiency linear.

- **Average Case - Random Array**: In a random card set, when you pick up a new card, on average it will be larger than half the cards in your hand and smaller than the other half. So on average, you need to move half the cards in your hand. This number of moves is still proportional to `n`, and when accumulated, the total number of times has a growth rate the same as the worst case—also at the $n^2$ level.

## Merge Sort

Merge sort is a **divide-and-conquer** algorithm (regarding divide-and-conquer, the Algorithm Design Strategies section of the article [Understanding Algorithms: Getting Started](../understanding-algorithms-getting-started/) provides relevant explanations). It recursively divides the sequence to be sorted in half until each subsequence has only one element, then merges these sorted subsequences two by two, ultimately combining them into a completely sorted sequence.

In algorithm design, there are multiple problem-solving strategies, and the "divide-and-conquer" used by merge sort is a very powerful design technique. Compared to the "incremental method" used by insertion sort, divide-and-conquer provides a completely different approach. Algorithms designed with this approach typically have significant improvements in efficiency, especially when dealing with large-scale data.

This also brings one advantage of merge sort: **better time complexity—high efficiency**. Merge sort has an execution time of $Θ(n \lg n)$ in the worst case. In comparison, insertion sort has an execution time of $Θ(n^2)$ in the worst case. The logarithmic function $(\lg n)$ grows much slower than the linear function $(n)$, so when the input data size $n$ becomes very large, merge sort's efficiency far exceeds insertion sort.

Merge sort has another advantage: **applicable to all cases—stability**. Unlike insertion sort, whose execution time varies drastically based on the degree of sortedness of input data—from best case $Θ(n)$ to worst case $Θ(n^2)$—merge sort has an execution time of $Θ(n \lg n)$ in best, worst, and average cases. This makes its performance predictable and stable.

Although merge sort has the advantages of high efficiency and stability, it requires extra array space during implementation, so it's not as space-efficient as Insertion Sort or Heapsort and Quicksort, which will be introduced in the sections below.

### Complete Implementation Logic and Steps of Merge Sort

The implementation logic of merge sort perfectly embodies the three core steps of "divide-and-conquer": **Divide**, **Conquer**, and **Combine**.

The entire algorithm can be composed of a main recursive procedure—responsible for recursively dividing and conquering—and an auxiliary merge procedure—responsible for the crucial merge step.

First, the main recursive procedure represented in pseudocode as follows:

```javascript
MERGE-SORT(A, p, r)
1  if p >= r  // If the subarray has zero or one element, return directly
2    return
3  q = floor((p + r) / 2)  // Calculate the midpoint, dividing the array in half
4  MERGE-SORT(A, p, q)  // Recursively sort the left half
5  MERGE-SORT(A, q + 1, r)  // Recursively sort the right half
6  MERGE(A, p, q, r)  // Merge the sorted left and right halves
```

This function recursively divides the array in half until subarrays have only one element.

- **Parameter Description**:

  - `A`: The target array to sort.

  - `p`: The starting index of the subarray.

  - `r`: The ending index of the subarray.

- **Step Explanation**:

  - **Lines 1-2 (Base Case)**: This is the recursion termination condition. If `p >= r`, it means this subarray has length 0 or 1. An array with only a single element is already sorted, so nothing needs to be done—directly `return` to end this function call.

  - **Line 3 (Divide)**: Calculate the midpoint `q` between start `p` and end `r`. The `floor` function means rounding down to an integer. This step divides the current subarray `A[p:r]` into two smaller subarrays: `A[p:q]` (left half) and `A[q+1:r]` (right half).

  - **Lines 4-5 (Conquer)**: This is the core of recursion. The function calls itself to handle the left half just divided—`MERGE-SORT(A, p, q)`—and the right half—`MERGE-SORT(A, q+1, r)`. This process continues until line 1's base case is triggered.

  - **Line 6 (Combine)**: When the recursive calls on lines 4 and 5 are both complete, it means the left half `A[p:q]` and right half `A[q+1:r]` are each individually sorted. At this point, call the auxiliary merge function `MERGE(A, p, q, r)` introduced below to merge these two sorted subarrays into a larger, complete sorted subarray.

Next, the auxiliary merge procedure represented in pseudocode as follows:

```javascript
MERGE(A, p, q, r)
1  n_L = q - p + 1  // Calculate the length of the left subarray
2  n_R = r - q  // Calculate the length of the right subarray
3  let L[0 : n_L - 1] and R[0 : n_R - 1] be new arrays
4  for i = 0 to n_L - 1  // Copy the contents of A[p:q] to L
5    L[i] = A[p + i]
6  for j = 0 to n_R - 1  // Copy the contents of A[q+1:r] to R
7    R[j] = A[q + j + 1]

8  i = 0  // i is the index of the smallest remaining element in L
9  j = 0  // j is the index of the smallest remaining element in R
10 k = p  // k is the index of the position in A waiting to be filled

11 // While both L and R still have unmerged elements
12 while i < n_L and j < n_R
13   if L[i] <= R[j]
14     A[k] = L[i]
15     i = i + 1
16   else
17     A[k] = R[j]
18     j = j + 1
19   k = k + 1

20 // If one of L or R has finished merging, copy all remaining elements from the other to the end of A
21 while i < n_L
22   A[k] = L[i]
23   i = i + 1
24   k = k + 1
25 while j < n_R
26   A[k] = R[j]
27   j = j + 1
28   k = k + 1
```

This function is the core of merge sort, responsible for merging two sorted adjacent subarrays `A[p:q]` and `A[q+1:r]` into a single sorted subarray `A[p:r]`.

- **Parameter Description**:

  - `A`, `p`, `r`: Same as above.

  - `q`: The partition point index, used to define two adjacent sorted subarrays `A[p:q]` and `A[q+1:r]`.

- **Step Explanation**:

  - **Lines 1-7 (Preparation Phase)**:

    - Calculate the lengths of the left and right subarrays `n_L` and `n_R`.

    - Create two new temporary arrays `L` and `R`.

    - Through `for` loops, completely copy the left and right halves of data from the original array `A` to temporary arrays `L` and `R`. This is so that during merging, we have the original, sorted data to reference without losing data while overwriting `A`.

  - **Lines 8-10 (Initialize Indices)**:

    - `i` and `j` serve as read pointers for arrays `L` and `R` respectively, both starting from 0.

    - `k` serves as the write pointer for the original array `A`, starting from `p`, because we want to put the merged result back into the `A[p:r]` section.

  - **Lines 12-19 (Core Merge Loop)**:

    - This is the most crucial part of the merge process. The `while` loop condition is that both `i` and `j` must be within their respective array's valid range, meaning both `L` and `R` still have elements to be processed.

    - Inside the loop, compare the sizes of `L[i]` and `R[j]`.

    - If `L[i]` is smaller or equal, place the value of `L[i]` into `A[k]`, then move `i` forward one position.

    - If `R[j]` is smaller, place the value of `R[j]` into `A[k]`, then move `j` forward one position.

    - Regardless of which element is placed, `k` moves forward one position, preparing for the next write.

  - **Lines 21-28 (Handle Remaining Elements)**:

    - When the above `while` loop ends, it means one of arrays `L` or `R` has been completely compared and placed back into `A`.

    - But the other array may still have remaining elements (these elements must all be larger than already merged elements).

    - The purpose of these two `while` loops is to handle this situation. In practice, only one of these two loops will execute.

    - If `L` still has remaining elements, the first loop will place the remaining elements of `L` sequentially at the end of `A`.

    - If `R` still has remaining elements, the second loop will place the remaining elements of `R` sequentially at the end of `A`.

### Writing Merge Sort Algorithm in JavaScript

```javascript
/**
 * Main Recursive Function: MERGE-SORT
 * Uses divide-and-conquer to sort arr[left...right]
 * @param {number[]} arr - The target array to sort
 * @param {number} left - The starting index of the subarray
 * @param {number} right - The ending index of the subarray
 */
function mergeSort(arr, left, right) {
  // 1. Base Case: Recursion termination condition
  // If left >= right, it means the subarray has one or zero elements, already sorted
  if (left >= right) {
    return;
  }

  // 2. Divide: Find the midpoint of the subarray
  // To avoid potential integer overflow from (left + right), using left + floor((right - left) / 2) is more robust
  const mid = left + Math.floor((right - left) / 2);

  // 3. Conquer: Recursively sort the left and right subarrays
  mergeSort(arr, left, mid);      // Sort the left half
  mergeSort(arr, mid + 1, right); // Sort the right half

  // 4. Combine: Merge the two sorted subarrays back together
  merge(arr, left, mid, right);
}

/**
 * Auxiliary Merge Function: MERGE
 * Merges arr[left...mid] and arr[mid+1...right], two sorted subarrays
 * @param {number[]} arr - Target array
 * @param {number} left - Starting index of the left subarray (0-based)
 * @param {number} mid - Partition point index
 * @param {number} right - Ending index of the right subarray
 */
function merge(arr, left, mid, right) {
  // --- Preparation Phase ---
  // Calculate the lengths of the left and right subarrays
  const n1 = mid - left + 1; // Corresponds to n_L in pseudocode
  const n2 = right - mid;    // Corresponds to n_R in pseudocode

  // Create new temporary arrays L and R
  let L = new Array(n1);
  let R = new Array(n2);

  // Use loops to copy data from the original array to temporary arrays
  for (let i = 0; i < n1; i++) {
    L[i] = arr[left + i];
  }
  for (let j = 0; j < n2; j++) {
    R[j] = arr[mid + 1 + j];
  }

  // --- Merge Phase ---
  // Initialize three index pointers
  let i = 0; // Points to the current element of array L
  let j = 0; // Points to the current element of array R
  let k = left; // Points to the next position to be filled in original array arr

  // Core merge loop: continuously compare the top elements of L and R, placing the smaller one into arr
  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++; // L's pointer moves forward
    } else {
      arr[k] = R[j];
      j++; // R's pointer moves forward
    }
    k++; // arr's write pointer moves forward
  }

  // --- Handle Remaining Elements ---
  // When the above loop ends, it means one of L or R has been completely merged
  // Only one of the following two while loops will execute

  // If L still has remaining elements, copy them all to the end of arr
  while (i < n1) {
    arr[k] = L[i];
    i++;
    k++;
  }

  // If R still has remaining elements, copy them all to the end of arr
  while (j < n2) {
    arr[k] = R[j];
    j++;
    k++;
  }
}
```

Below is also a clean version without comments:

```javascript
function mergeSort(arr, left, right) {
  if (left >= right) {
    return;
  }

  const mid = left + Math.floor((right - left) / 2);

  mergeSort(arr, left, mid);
  mergeSort(arr, mid + 1, right);

  merge(arr, left, mid, right);
}

function merge(arr, left, mid, right) {
  const n1 = mid - left + 1;
  const n2 = right - mid;

  let L = new Array(n1);
  let R = new Array(n2);

  for (let i = 0; i < n1; i++) {
    L[i] = arr[left + i];
  }
  for (let j = 0; j < n2; j++) {
    R[j] = arr[mid + 1 + j];
  }

  let i = 0;
  let j = 0;
  let k = left;

  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }
    k++;
  }

  while (i < n1) {
    arr[k] = L[i];
    i++;
    k++;
  }

  while (j < n2) {
    arr[k] = R[j];
    j++;
    k++;
  }
}
```

### Efficiency Analysis of Merge Sort

Through rigorous mathematical proof, merge sort has an execution time of $Θ(n \lg n)$ in worst case, best case, and average case.

We'll explain this in a more intuitive way. We can imagine its recursive process forming a "recursion tree."

1. **Tree Height (Recursion Depth)**: The algorithm divides the problem size in half each time (`n -> n/2 -> n/4 ...`) until the problem size becomes 1. This process is like repeatedly asking "how many times do we need to divide `n` by 2 to get 1?" This number is precisely the logarithm with base 2, which is $\lg n$. So the height of this recursion tree is approximately $\lg n$ levels (strictly speaking, $\lg n + 1$ levels).

2. **Work at Each Level**: At each level of the recursion tree, although the number of subproblems doubles, the size of each subproblem is halved. For example, the first level merges two subarrays of size $n/2$, with total work being $c \cdot (n/2) + c \cdot (n/2) = c \cdot n$. The second level merges four subarrays of size $n/4$, with total work being $4 \cdot (c \cdot n/4) = c \cdot n$. You'll notice that at each level of the tree, **the total work of merge operations is a constant proportional to $n$**, which we call $Θ(n)$.

3. **Total Work**: Since the tree's height is $Θ(\lg n)$, and the work at each level is $Θ(n)$, the total work is naturally multiplying these two together, obtaining $Θ(n \lg n)$.

Simply put, merge sort's efficiency comes from it cleverly distributing sorting work across $\lg n$ levels, and ensuring the total work at each level remains at the scale of $n$.

## Heapsort

Heapsort is an algorithm that utilizes the properties of the **Heap** data structure. It first reconstructs the array to be sorted into a **Max-Heap**, then repeatedly extracts the largest element from the heap—that is, the root node—and places it at the end of the array, ultimately achieving sorting.

Heapsort combines the advantages of merge sort and insertion sort. It's an algorithm that balances both efficiency and space effectiveness. In terms of time efficiency, heapsort has a time complexity of $O(n \lg n)$, which, like merge sort, is **asymptotically optimal** efficiency among comparison-based sorting algorithms. In terms of space efficiency, heapsort is an **in-place sorting** method, meaning during the sorting process it only requires a constant number of extra storage spaces. This is similar to insertion sort but superior to merge sort, which requires extra array space.

However, in practical applications, a good Quicksort implementation—which we'll introduce in the sections below—is typically faster than heapsort on average. Although quicksort's worst-case time complexity is $\Theta(n^2)$, not as stable as heapsort, its average performance and constant factors are usually superior.

### Complete Implementation Logic and Steps of Heapsort

The entire heapsort algorithm can be broken down into three core procedures that work together to complete the sorting task.

First, the purpose of the first core procedure is to maintain the max-heap property. This procedure is the foundation of heapsort. Its task is to "fix" a small region that may not satisfy the max-heap property. Represented in pseudocode as follows:

```javascript
MAX-HEAPIFY(A, i)
  // Calculate the indices of left and right child nodes
1 l = LEFT(i)
2 r = RIGHT(i)

  // Find the index of the largest among the current node, left child, and right child
3 if l ≤ A.heap-size and A[l] > A[i]
4   largest = l
5 else largest = i
6 if r ≤ A.heap-size and A[r] > A[largest]
7   largest = r

  // If the largest is not the current node, swap and recursively fix downward
8 if largest ≠ i
9   exchange A[i] with A[largest]
10  MAX-HEAPIFY(A, largest)
```

- **Premise**: Assume both the left and right subtrees of node `i` are already max-heaps. The only problem might be that node `i`'s value is smaller than its children.

- **Lines 1-2**: First, calculate the array indices of node `i`'s left child `l` and right child `r`.

- **Lines 3-7**: Among these three (`A[i]`, `A[l]`, `A[r]`), find the one with the largest value and store its index in the `largest` variable. Here we need to check if child nodes exist (`l ≤ A.heap-size`), because node `i` might not have children.

- **Line 8**: Check if `largest` is still `i`.

  - If so, it means node `i`'s value is already greater than both its children, satisfying the max-heap property, and the procedure ends directly.

  - If not, it means one of `i`'s children has a larger value, violating the max-heap property and requiring correction.

- **Line 9**: Swap the values of `A[i]` and the larger child `A[largest]`. This way, these three nodes with `i` as root satisfy the max-heap property.

- **Line 10**: However, this swap put a smaller value (originally `A[i]`) down, which might cause new problems in the subtree rooted at `largest`. Therefore, we must **recursively call `MAX-HEAPIFY`** on node `largest`, letting this smaller value continue to "sink down" until it finds an appropriate position.

Next, the purpose of the second core procedure is to build a max-heap. This procedure's task is to transform a completely unsorted array into a complete max-heap. Represented in pseudocode as follows:

```javascript
BUILD-MAX-HEAP(A)
1 A.heap-size = A.length
2 for i = floor(A.length / 2) down to 1
3   MAX-HEAPIFY(A, i)
```

- **Line 1**: Initialize the `A.heap-size` property, indicating the current heap contains all elements of the entire array.

- **Line 2**: The loop starts from `floor(A.length / 2)` and decrements to 1. Why start from `floor(A.length / 2)`? Because all nodes after this index (`floor(A.length / 2) + 1` to `A.length`) are leaf nodes, and a single leaf node can already be considered a valid max-heap, requiring no adjustment.

- **Line 3**: In the loop, call `MAX-HEAPIFY` bottom-up on each non-leaf node. Since we process from back to front, when we call `MAX-HEAPIFY` on node `i`, all its child nodes have already been processed in previous iterations, ensuring its subtrees are already max-heaps. This precisely satisfies the premise of `MAX-HEAPIFY`, ensuring the correctness of the entire construction process. When the loop ends, the root node (index 1) has also been fixed, and the entire array becomes a max-heap.

The last is heapsort's main procedure, which uses the already built max-heap for sorting. Represented in pseudocode as follows:

```javascript
HEAPSORT(A)
1 BUILD-MAX-HEAP(A)
2 for i = A.length down to 2
3   exchange A[1] with A[i]
4   A.heap-size = A.heap-size - 1
5   MAX-HEAPIFY(A, 1)
```

- **Line 1**: First, call `BUILD-MAX-HEAP(A)` to transform the entire array into a max-heap. Now we know the largest element in the array is at the root node `A[1]`.

- **Line 2**: Enter a loop decrementing from `i = A.length` to 2. Each iteration of this loop places the current heap's largest element in its final sorted position.

- **Line 3**: Swap the heap's root node (that is, the current maximum value `A[1]`) with the heap's last element `A[i]`. After swapping, the maximum value found this time is placed at the array's end `A[i]`, which is its position in the sorted array.

- **Line 4**: The array's end (`A[i]`) is now the sorted part. We decrement the heap size by one, logically removing `A[i]` from the heap and no longer considering it.

- **Line 5**: After swapping, the new root node `A[1]` was swapped up from `A[i]`. This value is likely smaller, breaking the max-heap property. Therefore, we need to call `MAX-HEAPIFY(A, 1)` on the root node to fix this heap with `i-1` elements, letting the next maximum value float to the root.

- **Loop End**: When the loop ends, `i` will equal 1. At this point, the largest `n-1` elements in the array have been placed sequentially in positions `A[2]` to `A[n]`, and the smallest element naturally remains at `A[1]`, completing the entire array sorting.

In summary, heapsort's logic is: first spend some cost (`BUILD-MAX-HEAP`) to "organize" the array, then use this organized structure—the max-heap—in each iteration at a small cost (`MAX-HEAPIFY`) to find the current maximum among remaining elements and place it in position.

### Writing Heapsort Algorithm in JavaScript

```javascript
/**
 * Main Procedure: HEAPSORT
 * @param {number[]} arr - The array of numbers to sort.
 * @returns {number[]} - The sorted array.
 */
function heapsort(arr) {
  // Get the array's length, which is also the initial heap size
  const n = arr.length;

  // ==========================================================
  // Step 1: Build Max-Heap
  // This process reconstructs the unsorted array into a max-heap,
  // ensuring the array's maximum element is at index 0.
  // ==========================================================
  buildMaxHeap(arr, n);

  // ==========================================================
  // Step 2: Iterative Sorting
  // Repeatedly extract the maximum element from the heap and place it at the array's end.
  // ==========================================================
  // Loop from the last element down to the second element (index 1).
  for (let i = n - 1; i > 0; i--) {
    // Swap the heap's root node (current maximum value at arr[0])
    // with the current heap's last element (at arr[i]).
    // This way, the maximum value found this iteration is placed in its final sorted position.
    [arr[0], arr[i]] = [arr[i], arr[0]];

    // After swapping, the new root node may violate the max-heap property.
    // Therefore, we need to execute maxHeapify on the reduced heap (size changes from n to i),
    // on the root node (index 0) to restore the max-heap property.
    maxHeapify(arr, i, 0);
  }

  return arr;
}

/**
 * Core Procedure 2: Build Max-Heap (BUILD-MAX-HEAP)
 * @param {number[]} arr - The array to transform.
 * @param {number} n - The heap size (array length).
 */
function buildMaxHeap(arr, n) {
  // **** Index Conversion Key ****
  // In 1-based indexing, the last non-leaf node is floor(n/2).
  // In 0-based indexing, it corresponds to index Math.floor(n / 2) - 1.
  const lastNonLeafNode = Math.floor(n / 2) - 1;

  // Starting from the last non-leaf node, execute maxHeapify bottom-up, right to left on each node.
  // This ensures that when processing node i, its subtrees are already max-heaps.
  for (let i = lastNonLeafNode; i >= 0; i--) {
    maxHeapify(arr, n, i);
  }
}

/**
 * Core Procedure 1: Maintain Max-Heap Property (MAX-HEAPIFY)
 * Assumes node i's subtrees are already max-heaps; this function ensures the tree rooted at i is also a max-heap.
 * @param {number[]} arr - The array storing the heap.
 * @param {number} n - The current heap size (note: becomes smaller during sorting phase).
 * @param {number} i - The current node index to perform heapify operation on (root).
 */
function maxHeapify(arr, n, i) {
  // Initialize largest as the current node i
  let largest = i;

  // **** Index Conversion Key ****
  // 1-based: LEFT(i) = 2i, RIGHT(i) = 2i + 1
  // 0-based: LEFT(i) = 2i + 1, RIGHT(i) = 2i + 2
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  // Check if the left child exists (left < n) and if its value is greater than current largest's value
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  // Check if the right child exists (right < n) and if its value is greater than current largest's value
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  // If largest's index is no longer the original i, it means a child has a value greater than the parent
  if (largest !== i) {
    // Swap the parent node with this larger child's value
    [arr[i], arr[largest]] = [arr[largest], arr[i]];

    // Because we swapped values, the originally smaller element was swapped to the child position,
    // which may break that subtree's max-heap property.
    // Therefore, we need to recursively perform maxHeapify on the swapped child (new index is largest).
    maxHeapify(arr, n, largest);
  }
}
```

Below is also a clean version without comments:

```javascript
function heapsort(arr) {
  const n = arr.length;

  buildMaxHeap(arr, n);

  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    maxHeapify(arr, i, 0);
  }

  return arr;
}

function buildMaxHeap(arr, n) {
  const lastNonLeafNode = Math.floor(n / 2) - 1;
  for (let i = lastNonLeafNode; i >= 0; i--) {
    maxHeapify(arr, n, i);
  }
}

function maxHeapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    maxHeapify(arr, n, largest);
  }
}
```

### Efficiency Analysis of Heapsort

Through rigorous mathematical proof, heapsort has an execution time of $\Theta(n \lg n)$ in worst case, best case, and average case.

We'll explain this in a more intuitive way. We can imagine heapsort's cost as two phases:

1. **Initial Organization Cost (BUILD-MAX-HEAP)**: This phase's task is to organize a completely unsorted array into a max-heap. Intuitively, you might think this requires $O(n \lg n)$ time, because it seems like we need to do "insertion"-like actions for n elements. But in reality, we can prove this process is actually very efficient, **only requiring $O(n)$ linear time**. This is because in the heap structure, the vast majority of nodes (about half) are leaf nodes, requiring no adjustment. As we go up, although adjustment cost increases, the quantity decreases. Ultimately, the total cost is only proportional to n.

2. **Repeated Maximum Extraction Cost (HEAPSORT main loop)**: This phase is the algorithm's core. It repeatedly executes n-1 cycles of "extract maximum -> place at array end -> maintain heap." After extracting the maximum each time—that is, the root node—we need to call MAX-HEAPIFY once to fix the heap structure, ensuring we can still find the next largest value. This fixing cost is proportional to the heap's height, and a heap with n elements has a height of approximately $\lg n$. Therefore, we can view this as executing approximately n operations, each costing $\lg n$, with total cost naturally being $O(n \lg n)$.

**Total Cost**: The entire algorithm's total time = initial organization cost + repeated extraction cost = $O(n) + O(n \lg n)$. In asymptotic analysis, higher-order terms dominate the result, so the final time complexity is $O(n \lg n)$.

## Quicksort

The strategic thinking quicksort uses is the same as merge sort—it's a **divide-and-conquer** algorithm. It selects a "pivot" element and partitions the array into two parts, making one part's elements all less than or equal to the pivot, and the other part's elements all greater than or equal to the pivot, then recursively sorts these two parts.

The reason quicksort has become an important and widely applied sorting algorithm is because it performs extremely well on average and has some implementation advantages that other algorithms don't have. Including:

- **Extremely High Average Efficiency**: Although quicksort's worst execution time is $\Theta(n^2)$, on average, its expected execution time is $\Theta(n \lg n)$. For randomly input data, it's typically faster than other $\Theta(n \lg n)$ algorithms—like merge sort—because its hidden constant factors are very small.

- **In-place Sorting**: Unlike merge sort, one key advantage of quicksort is it can sort "in-place." This means it only requires a small, fixed extra space—mainly for the recursion stack—and doesn't need to create an auxiliary array of size comparable to the original array like merge sort.

- **Suitable for Virtual Memory Environments**: The in-place sorting characteristic makes it perform well in virtual memory environments, because it can minimize memory page swapping.

- **High Tolerance for Unbalanced Partitioning**: Even if partitioning isn't very perfect (for example, always partitioning in a 9:1 ratio), quicksort's execution time complexity remains $O(n \lg n)$, demonstrating the robustness of its algorithmic structure.

But it still has some disadvantages, including:

- **Poor Worst-Case Performance**: Quicksort's main drawback is its worst execution time of $\Theta(n^2)$. This situation occurs when partitioning is extremely unbalanced, for example: each recursion produces a subproblem containing $n-1$ elements and an empty problem.

- **Sensitivity to Specific Inputs**: If the input array is already sorted or roughly sorted, it triggers worst-case performance. This is a very practical problem because in some application scenarios, input data may already be partially ordered. But the good news is this problem has a solution: to overcome the disadvantage of sensitivity to specific inputs, in practice we can adopt **randomized version of quicksort** (introduced in the sections below). By randomly selecting the pivot, we can ensure no specific input will stably trigger the worst case, making the expected execution time on all inputs the efficient $\Theta(n \lg n)$.

- **Recursion Depth May Be Very Deep**: In the worst case, recursion depth may reach $\Theta(n)$, consuming large amounts of stack space. In comparison, merge sort's recursion depth is always $\Theta(\lg n)$.

### Complete Implementation Logic and Steps of Quicksort

As mentioned above, quicksort, like merge sort, is a sorting algorithm adopting a divide-and-conquer strategy, so we can also think about implementation steps using divide-and-conquer thinking.

First, the **Divide** step is the most crucial part of quicksort. We can package this step as a subprocedure, naming this procedure `PARTITION`. The implementation logic of `PARTITION` represented in pseudocode as follows:

```javascript
PARTITION(A, p, r)
1  x = A[r]
2  i = p - 1
3  for j = p to r - 1
4    if A[j] <= x
5      i = i + 1
6      exchange A[i] with A[j]
7  exchange A[i + 1] with A[r]
8  return i + 1
```

- **Line 1**: Select the last element `A[r]` of subarray `A[p..r]` as the pivot `x`.

- **Line 2**: Initialize an index `i` as `p-1`. `i` is used to mark the right boundary of the "low side"—that is, the region where all elements are less than or equal to `x`.

- **Lines 3-6**: This is the main loop, traversing all elements from `p` to `r-1`.

- **Line 4**: Check if the current element `A[j]` is less than or equal to the pivot `x`.

- **Lines 5-6**: If `A[j]` is indeed less than or equal to `x`, it means it belongs to the "low side." We first increment `i` by one to expand the low side range, then swap `A[i]` and `A[j]`. This operation effectively places `A[j]` into the low side region.

- **Line 7**: After the loop ends, all elements from `p` to `i` are less than or equal to `x`. Now we swap the pivot `A[r]` with `A[i+1]` (the first element of the high side), placing the pivot in its final correct position.

- **Line 8**: Return the pivot's new position `i+1`.

Next, the **Conquer** step is quicksort's main procedure, represented in pseudocode as follows:

```javascript
QUICKSORT(A, p, r)
1  if p < r
2    q = PARTITION(A, p, r)
3    QUICKSORT(A, p, q - 1)
4    QUICKSORT(A, q + 1, r)
```

What we're mainly doing here is recursively calling the `QUICKSORT` algorithm to sort the low side subarray `A[p..q-1]` and high side subarray `A[q+1..r]` respectively.

- **Line 1**: This is the recursion's base case. If `p >= r`, it means the subarray has at most one element, already sorted, so nothing needs to be done.

- **Line 2**: If the subarray has more than one element, call the `PARTITION` procedure to partition the array and obtain the pivot's final position `q`.

- **Line 3**: Recursively call `QUICKSORT` to sort the "low side" subarray `A[p..q-1]` to the left of the pivot.

- **Line 4**: Recursively call `QUICKSORT` to sort the "high side" subarray `A[q+1..r]` to the right of the pivot.

The final **Combine** step is very simple: **do nothing**. Because when both subarrays are recursively sorted, since the pivot `A[q]` is already in the correct position, the entire array `A[p..r]` is naturally also sorted.

### Writing Quicksort Algorithm in JavaScript

```javascript
/**
 * A user-friendly wrapper function to initiate the quicksort procedure.
 * It handles the initial call with correct indices.
 * @param {Array<number>} arr The array to sort.
 * @returns {Array<number>} The sorted array (in-place sort).
 */
function quickSort(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("Input must be an array.");
  }
  // Initial call to sort the entire array from index 0 to length - 1.
  quickSortRecursive(arr, 0, arr.length - 1);
  return arr;
}

/**
 * Main Procedure
 * @param {Array<number>} arr The array to sort.
 * @param {number} p The starting index of the subarray to sort.
 * @param {number} r The ending index of the subarray to sort.
 */
function quickSortRecursive(arr, p, r) {
  // Base case of recursion: if the subarray has 1 or 0 elements, it's already sorted.
  if (p < r) {
    // Partition the array and get the final index 'q' of the pivot.
    // arr[q] is now in its correct sorted position.
    const q = partition(arr, p, r);

    // Recursively sort elements before the pivot (low end).
    quickSortRecursive(arr, p, q - 1);

    // Recursively sort elements after the pivot (high end).
    quickSortRecursive(arr, q + 1, r);
  }
}

/**
 * Core Procedure: PARTITION
 * @param {Array<number>} arr The array containing the subarray.
 * @param {number} p The starting index of the subarray.
 * @param {number} r The ending index of the subarray (also the initial index of the pivot).
 * @returns {number} The new index of the pivot after partitioning.
 */
function partition(arr, p, r) {
  // Select the last element as the pivot.
  const pivot = arr[r];

  // 'i' is the index of the last element in the "low end" (elements <= pivot).
  // It starts at p-1 because initially the low end is empty.
  let i = p - 1;

  // Traverse the subarray from starting position (p) to one before the pivot (r-1).
  for (let j = p; j < r; j++) {
    // If the current element is less than or equal to the pivot...
    if (arr[j] <= pivot) {
      // It belongs to the low end.
      // Increment 'i' to make room for this new element in the low end.
      i++;
      // Swap the current element (arr[j]) with the first element of the high end (arr[i]).
      swap(arr, i, j);
    }
  }

  // After the loop, the pivot is still at arr[r].
  // We swap it with the element at arr[i + 1], which is the first element greater than the pivot.
  // This places the pivot in its final sorted position.
  swap(arr, i + 1, r);

  // Return the new index of the pivot.
  return i + 1;
}

/**
 * Helper Function: Swap two elements in an array.
 * @param {Array<number>} arr The array.
 * @param {number} i The index of the first element.
 * @param {number} j The index of the second element.
 */
function swap(arr, i, j) {
  // A temporary variable is needed during the swap to hold one of the values.
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
```

Below is also a clean version without comments:

```javascript
function quickSort(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("Input must be an array.");
  }
  quickSortRecursive(arr, 0, arr.length - 1);
  return arr;
}

function quickSortRecursive(arr, p, r) {
  if (p < r) {
    const q = partition(arr, p, r);
    quickSortRecursive(arr, p, q - 1);
    quickSortRecursive(arr, q + 1, r);
  }
}

function partition(arr, p, r) {
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
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
```

### Efficiency Analysis of Quicksort

Through rigorous mathematical proof, quicksort has an execution time of $\Theta(n^2)$ in the worst case; $\Theta(n \lg n)$ in the best case; and $\Theta(n \lg n)$ in the average case—or randomized version.

In summary, quicksort's efficiency entirely depends on **whether the partitioning done by the `PARTITION` procedure is balanced**. We'll explain this in a more intuitive way:

- **Worst-case Partitioning**: Imagine being very unlucky each time, selecting the smallest or largest element as the pivot. For example: on an already sorted array, each time selecting the last element `A[r]` as the pivot, `PARTITION` will produce a subproblem containing $n-1$ elements and an empty problem. This causes the recursion tree to become a long chain with depth $n$. At each recursion level, the work amounts are $\Theta(n), \Theta(n-1), \dots$ respectively, and summing them up gives an arithmetic series, with time complexity of $\Theta(n^2)$, as slow as insertion sort.

- **Best-case (Balanced Partitioning)**: Imagine being very lucky each time `PARTITION` selects the median as the pivot, perfectly dividing the array into two nearly equal halves (each about $n/2$ elements). The recursion tree's depth would then be $\lg n$. At each recursion level, the `PARTITION` procedure needs to scan all elements at that level, with total work being $\Theta(n)$. Therefore, total execution time is (number of levels) $\times$ (work per level), which is $\Theta(n \lg n)$, comparable to merge sort's efficiency.

- **Average Case**: In reality, partitioning is rarely perfect, and it's also unlikely to always be worst case. It's typically a mix of "good" and "bad" partitions. Intuitively, even if a "bad" partition (like $n-1$ and $0$) is followed by a "good" partition (like dividing $n-1$ in half), the total cost of these two steps $\Theta(n) + \Theta(n-1)$ is at the same level as producing a good partition in one step $\Theta(n)$. As long as partitioning isn't persistently extremely unbalanced (even if every partition is 99:1), the recursion tree's depth remains at logarithmic level $\Theta(\lg n)$, and total execution time still remains $\Theta(n \lg n)$. Randomizing pivot selection ensures we can expect to achieve this mixed partitioning effect on average.

## Introducing the "Randomized" Version of Quicksort

Compared to quicksort, the randomized version of quicksort doesn't always select an element at a fixed position—such as the last one—as the pivot before partitioning the array, but "randomly" picks an element from the current subarray as the pivot.

To understand the value of the randomized version, we must first understand the weakness of the original deterministic quicksort.

### The Challenge of Original Quicksort: Worst Case

The core spirit of the quicksort algorithm is divide-and-conquer. Its efficiency highly depends on whether each "partition" is balanced.

- **Ideal Situation—Balanced Partitioning**: If each selected pivot cleverly divides the array into nearly equal halves, then the algorithm's execution time complexity would be the highly efficient $\Theta(n \lg n)$, comparable to merge sort.

- **Worst Case—Unbalanced Partitioning**: However, if luck is bad and each selected pivot is the largest or smallest element in the current subarray, this causes extremely unbalanced partitioning. For example: producing a subproblem containing $n-1$ elements and a subproblem containing 0 elements. In this situation, recursion depth increases sharply from $\lg n$ to $n$, making execution time degrade to the same slowness as insertion sort—$\Theta(n^2)$.

A typical example that triggers this worst case is executing quicksort on an "already sorted" array. If the algorithm always selects the last element as the pivot, then each partition will be the worst case.

#### Randomization: Breaking the Spell of Specific Inputs

The main motivation for introducing randomization is to prevent the algorithm's performance from being controlled by specific input patterns. In the original version, as long as someone knows your pivot selection strategy—for example: always selecting the last element—they can deliberately construct input data that triggers worst performance, called a "killer adversary."

Randomization breaks the strong correlation between input order and execution performance by randomly selecting the pivot before partitioning. This brings it an advantage: **avoiding systematic occurrence of worst cases**, because the pivot is randomly selected, any specific input—whether already sorted, reverse sorted, or specially arranged—won't stably trigger the worst case. Although theoretically, the randomized version could still have extremely bad luck, consecutively selecting the worst pivots, leading to $\Theta(n^2)$ time, the probability of this happening is extremely small. Across all possible random selections, its "expected" or "average" execution time is the efficient $O(n \lg n)$.

Due to the randomized version quicksort's excellent average performance and in-place sorting characteristics, it's very popular in practice, with many software libraries choosing it as the default sorting algorithm.

In summary, randomized quicksort is a strategy that sacrifices certainty for "best-case input" in exchange for a very high probability of achieving near-best-case performance on "any input."

### Complete Implementation Logic and Steps of Randomized Version Quicksort

Compared to standard quicksort, the randomized version of quicksort makes a key modification in the **partition** step, represented in pseudocode as follows:

```javascript
RANDOMIZED-PARTITION(A, p, r)
1  i = RANDOM(p, r)
2  exchange A[r] with A[i]
3  return PARTITION(A, p, r)
```

- **Line 1**: Randomly select an index `i` between `p` and `r` (inclusive of both).

- **Line 2**: Swap the randomly selected element `A[i]` with the last element of the subarray `A[r]`. The purpose of doing this is to allow the subsequent standard `PARTITION` function to run smoothly, because it expects the pivot to be at `A[r]`.

- **Line 3**: Call the standard `PARTITION` function (detailed steps can be found in the previous section), and return its result.

Finally, the main procedure represented in pseudocode as follows:

```javascript
RANDOMIZED-QUICKSORT(A, p, r)
1  if p < r
2    q = RANDOMIZED-PARTITION(A, p, r)
3    RANDOMIZED-QUICKSORT(A, p, q - 1)
4    RANDOMIZED-QUICKSORT(A, q + 1, r)
```

- **Line 1**: Check `p < r`. This is the recursion termination condition. If `p` is not less than `r`, it means this subarray has at most one element, naturally already sorted.

- **Line 2**: Call `RANDOMIZED-PARTITION` to partition the current subarray, and return the final index `q` where the pivot resides.

- **Line 3**: Recursively call itself to sort the subarray `A[p..q-1]` to the left of the pivot.

- **Line 4**: Recursively call itself to sort the subarray `A[q+1..r]` to the right of the pivot.

This flow ensures the pivot selection is random, thereby ensuring partitioning balance is guaranteed on average.

### Writing Randomized Version Quicksort Algorithm in JavaScript

```javascript
/**
 * Main RANDOMIZED-QUICKSORT procedure.
 * Sorts subarray arr[p..r] in-place.
 * @param {Array<number>} arr The array to sort.
 * @param {number} p The starting index of the subarray to sort.
 * @param {number} r The ending index of the subarray to sort.
 */
function randomizedQuicksort(arr, p, r) {
    // Base case of recursion: if the subarray has 1 or 0 elements, it's already sorted.
    if (p < r) {
        // Partition the array and get the final index q of the pivot.
        const q = randomizedPartition(arr, p, r);

        // Recursively sort the two resulting subarrays.
        // Handle the subproblem to the left of the pivot.
        randomizedQuicksort(arr, p, q - 1);
        // Handle the subproblem to the right of the pivot.
        randomizedQuicksort(arr, q + 1, r);
    }
}

/**
 * RANDOMIZED-PARTITION procedure.
 * It randomly selects a pivot, then calls the standard partition procedure.
 * @param {Array<number>} arr The array.
 * @param {number} p The starting index.
 * @param {number} r The ending index.
 * @returns {number} The final index of the randomly selected pivot.
 */
function randomizedPartition(arr, p, r) {
    // 1. Select a random index between p and r (inclusive).
    const randomIndex = Math.floor(Math.random() * (r - p + 1)) + p;

    // 2. Swap the randomly selected element with the last element (arr[r]).
    // This places our random pivot in the position expected by the partition() function.
    swap(arr, randomIndex, r);

    // 3. Call the standard partition procedure.
    return partition(arr, p, r);
}

/**
 * Core Procedure: PARTITION
 * Partitions subarray arr[p..r] using arr[r] as the pivot.
 * @param {Array<number>} arr The array to be partitioned.
 * @param {number} p The starting index of the subarray.
 * @param {number} r The ending index of the subarray (also the initial index of the pivot).
 * @returns {number} The final index of the pivot element.
 */
function partition(arr, p, r) {
    // The pivot element is chosen as the last element of the subarray.
    const pivot = arr[r];
    // i is the index of the last element in the "less than or equal to pivot" partition.
    let i = p - 1;

    // Iterate through the array from p to r-1.
    for (let j = p; j < r; j++) {
        // If the current element is less than or equal to the pivot
        if (arr[j] <= pivot) {
            // Increment i and swap arr[i] with arr[j].
            // This moves the smaller element arr[j] into the smaller elements partition.
            i++;
            swap(arr, i, j);
        }
    }

    // After the loop, all elements from p to i are <= pivot.
    // The pivot (originally at arr[r]) should be placed after this partition.
    // Therefore we swap it with arr[i + 1].
    swap(arr, i + 1, r);
    // Return the new index of the pivot.
    return i + 1;
}

/**
 * Helper Function: Swap two elements in an array.
 * @param {Array<number>} arr The array.
 * @param {number} i The index of the first element.
 * @param {number} j The index of the second element.
 */
function swap(arr, i, j) {
  // Use array destructuring for concise swapping
  [arr[i], arr[j]] = [arr[j], arr[i]];
}
```

Below is also a clean version without comments:

```javascript
function randomizedQuicksort(arr, p, r) {
    if (p < r) {
      const q = randomizedPartition(arr, p, r);
      randomizedQuicksort(arr, p, q - 1);
      randomizedQuicksort(arr, q + 1, r);
    }
}

function randomizedPartition(arr, p, r) {
  const randomIndex = Math.floor(Math.random() * (r - p + 1)) + p;
  swap(arr, randomIndex, r);
  return partition(arr, p, r);
}

function partition(arr, p, r) {
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

### Efficiency Analysis of Randomized Version Quicksort

Through rigorous mathematical proof, randomized quicksort has an execution time of $\Theta(n^2)$ in the worst case; $\Theta(n \lg n)$ in the best case; and $\Theta(n \lg n)$ in the average—or expected—case.

Quicksort's efficiency depends on the degree of partitioning balance. A "good" partition is when both sides are similar in size, while a "bad" partition is when both sides are extremely unequal in size.

In the randomized version, because the pivot is randomly picked, we expect "good" and "bad" partitions to appear randomly throughout the entire sorting process.

Intuitively, we can consider a situation: assume "good" partitions (for example: perfectly dividing in half) and "bad" partitions (for example: dividing into 0 and n-1) appear alternately.

1. The first time is a "bad" partition, costing $\Theta(n)$, producing subproblems of size $0$ and $n-1$.

2. The second time performs a "good" partition on the subproblem of size $n-1$, costing $\Theta(n-1)$, producing two subproblems of size approximately $(n-1)/2$.

The total cost of these two partitions is $\Theta(n) + \Theta(n-1) = \Theta(n)$. The result produced (two subproblems of size approximately $n/2$) is very similar to one perfect "good" partition. This means the negative impact of one "bad" partition can be "absorbed" by the immediately following "good" partition.

Because in a random process, good and bad partitions appear mixed, the overall effect will approach continuously performing good partitions. Therefore, average execution time will be very close to the best case of $\Theta(n \lg n)$.

## Summary

The above content is an introduction to various common "comparison-based sorting" algorithms.

At the end of this article, there's a question very worth thinking about: **For any algorithm that can only sort through "pairwise comparison," how fast can it be at its fastest? Is there a speed baseline that cannot be surpassed?**

This question has been proven—there exists an **insurmountable theoretical barrier** for comparison-based sorting. No matter how cleverly you design the algorithm, as long as it follows the "pairwise comparison" rule, then in the worst case, its time complexity **absolutely cannot** be better than $O(n \log n)$.

This also explains why algorithms like **Merge Sort** and **Heapsort** are so important. Their worst-case time complexity is both $O(n \log n)$, precisely reaching the theoretical lower bound we proved. Therefore, we call them **asymptotically optimal** comparison-based sorting algorithms. In other words, you cannot invent a fundamentally faster comparison-based sorting method.

## References

[Introduction to Algorithms, fourth edition](https://www.amazon.com/Introduction-Algorithms-fourth-Thomas-Cormen/dp/026204630X)

## Appendix

This article is part of a series. Currently, five articles have been written:

1. [Understanding Algorithms: Getting Started](../understanding-algorithms-getting-started/)
2. [Understanding Algorithms: Common Data Structures](../understanding-algorithms-common-data-structures/)
3. [Understanding Algorithms: Comparison-Based Sorting](../understanding-algorithms-comparison-based-sorting/)
4. [Understanding Algorithms: Linear-Time Sorting](../understanding-algorithms-linear-time-sorting/)
5. [Understanding Algorithms: The Selection Problem](../understanding-algorithms-selection-problem/)
