---
title: "Understanding Algorithms: The Selection Problem"
subtitle: Learn how to efficiently find the i-th smallest element in a set, mastering the essence of RANDOMIZED-SELECT and SELECT algorithms.
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

In the articles [Understanding Algorithms: Comparison-Based Sorting](../understanding-algorithms-comparison-based-sorting/) and [Understanding Algorithms: Linear-Time Sorting](../understanding-algorithms-linear-time-sorting/), we introduced various common sorting algorithms. In this article, we'll continue by introducing the selection problem, which is somewhat related to the sorting problem.

Why do we say the selection problem is somewhat related to the sorting problem?

First, let's define what the selection problem is. The selection problem refers to finding the i-th order statistic from a set A containing n distinct numbers. In other words, finding the element $x$ in set A that is exactly larger than $i-1$ other elements. Put another way, the goal that the selection problem needs to solve is: **how to efficiently find the i-th smallest element from an unsorted set of n elements?**

From the above explanation, we can see why the selection problem is somewhat related to the sorting problem. Because we can easily think of the most intuitive solution to the selection problem: first use an efficient sorting algorithm—such as merge sort or heapsort—to sort the entire set, then directly retrieve the i-th element.

However, for the selection problem, we can actually do better. To solve the selection problem, we actually **don't need to perform complete sorting on the entire set**. In this article, we'll introduce these algorithms that can solve the selection problem "without sorting first."

## RANDOMIZED-SELECT Algorithm

RANDOMIZED-SELECT is a randomized algorithm based on the divide-and-conquer strategy of quicksort. It efficiently finds the i-th smallest element in a set by recursively partitioning the array and only processing one side that contains the target element.

RANDOMIZED-SELECT's most significant advantage lies in its **extremely high average efficiency**. Its expected execution time—or average execution time—is $\Theta(n)$, which is linear time. And because of its randomization characteristic, the RANDOMIZED-SELECT algorithm performs very robustly and efficiently in practical applications, not easily having its performance dragged down by specific input data patterns.

However, RANDOMIZED-SELECT's **worst-case performance degrades to** $\Theta(n^2)$, though the probability of this worst case occurring is extremely low, and because the pivot is randomly selected, no specific input can stably trigger the worst case.

### Complete Implementation Logic and Steps of RANDOMIZED-SELECT

The core idea of the RANDOMIZED-SELECT algorithm is **divide-and-conquer**. It cleverly borrows quicksort's partitioning step but avoids the waste of recursing on both sides. Its goal is to continuously narrow the search range until finding the target element. We can represent it in pseudocode as follows:

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

**RANDOMIZED-SELECT(A, p, r, i)** This function's purpose is to find the i-th smallest element in the subarray `A[p...r]` of array `A`—from index `p` to `r`.

- **Lines 1-2**: This is the recursion's **base case**. If the subarray's starting index `p` and ending index `r` are equal, it means this subarray has only one element left. Then this element is naturally what we're looking for (at this point `i` must be 1), so directly return it.

- **Line 3**: Call the `RANDOMIZED-PARTITION` function. This function will randomly select a pivot in `A[p...r]` and partition around it. After partitioning, the function returns the final index `q` where the pivot resides.

- **Line 4**: Calculate the pivot's rank. `k` represents that pivot `A[q]` is the k-th smallest element in the subarray `A[p...r]`.

- **Lines 5-6**: **Check if hit**. If the rank `i` we're looking for happens to equal the pivot's rank `k`, then `A[q]` is the answer—directly return it.

- **Lines 7-8**: If the rank `i` we're looking for is less than the pivot's rank `k`, it means the target element is on the **left** side of the pivot. Therefore, we recursively call on the left subarray `A[p...q-1]`, continuing to look for the i-th smallest element.

- **Line 9**: If the rank `i` we're looking for is greater than the pivot's rank `k`, it means the target element is on the **right** side of the pivot. We recursively call on the right subarray `A[q+1...r]`. But note that at this point the target we're looking for becomes the `i-k`-th smallest element in the right subarray, because there are already `k` elements (left subarray + pivot) confirmed to be smaller than the target.

We can see this process keeps repeating. Each partition narrows the search array range until in some "check and recurse" step, the pivot's rank $k$ happens to equal the $i$ we're looking for, and the algorithm declares success.

### Writing RANDOMIZED-SELECT Algorithm in JavaScript

```javascript
/**
 * Main function: RANDOMIZED-SELECT algorithm.
 * Finds the i-th smallest element in an array in expected linear time.
 * @param {Array<number>} arr - Input array (will be modified in-place).
 * @param {number} p - Starting index of the current subarray being processed.
 * @param {number} r - Ending index of the current subarray being processed.
 * @param {number} i - The order statistic to find (e.g., i=1 is the minimum).
 * @returns {number} The i-th smallest element in the array.
 */
function randomizedSelect(arr, p, r, i) {
  // --- Base case of recursion ---
  // If the subarray has only one element left, it's what we're looking for.
  if (p === r) {
    return arr[p];
  }

  // --- Divide ---
  // Randomly partition subarray `arr[p...r]` and get the pivot's index `q`.
  const q = randomizedPartition(arr, p, r);

  // --- Conquer ---
  // Calculate what rank pivot `arr[q]` is in the current subarray.
  // `k` is the pivot's rank.
  const k = q - p + 1;

  // Compare the rank `i` we're looking for with the pivot's rank `k`.
  if (i === k) {
    // Case 1: Found it! The pivot is the i-th smallest element.
    return arr[q];
  } else if (i < k) {
    // Case 2: Target is on the left of the pivot.
    // Continue looking for the i-th smallest element in left subarray `arr[p...q-1]`.
    return randomizedSelect(arr, p, q - 1, i);
  } else {
    // Case 3: Target is on the right of the pivot.
    // Continue looking in right subarray `arr[q+1...r]`.
    // Since we've excluded k smaller elements, target becomes the `i-k`-th smallest on the right.
    return randomizedSelect(arr, q + 1, r, i - k);
  }
}

/**
 * Auxiliary function: Randomized partitioning.
 * This is one of the core steps of RANDOMIZED-SELECT.
 * It randomly selects a pivot and rearranges the array so all elements less than or equal to the pivot are on the left, greater ones on the right.
 * @param {Array<number>} arr - Target array.
 * @param {number} p - Starting index of the subarray.
 * @param {number} r - Ending index of the subarray.
 * @returns {number} The final index where the pivot resides after partitioning.
 */
function randomizedPartition(arr, p, r) {
  // 1. Randomly select an index in the range [p, r].
  const randomIndex = Math.floor(Math.random() * (r - p + 1)) + p;

  // 2. Swap the randomly selected pivot with the last element of the subarray.
  // This is to facilitate using the standard Lomuto partition algorithm.
  swap(arr, randomIndex, r);

  // 3. Execute Lomuto partition.
  const pivot = arr[r]; // Use the last element as the pivot value.
  let i = p - 1; // i points to the boundary of the region less than the pivot.

  for (let j = p; j < r; j++) {
    // If current element is less than or equal to the pivot
    if (arr[j] <= pivot) {
      i++; // Expand the "less than" region
      swap(arr, i, j); // And place current element into that region
    }
  }

  // 4. Place the pivot in its final correct position.
  swap(arr, i + 1, r);

  // 5. Return the pivot's final index.
  return i + 1;
}

/**
 * Auxiliary function: Swap two elements' positions in an array.
 * @param {Array<number>} arr - Target array.
 * @param {number} i - First element's index.
 * @param {number} j - Second element's index.
 */
function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}
```

Below is also a clean version without comments:

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

### Efficiency Analysis of RANDOMIZED-SELECT

Through rigorous mathematical proof, RANDOMIZED-SELECT has an execution time of $\Theta(n^2)$ in the worst case; $\Theta(n)$ in the best case; and $\Theta(n)$ in the average—expected—case.

We'll explain this in a more intuitive way. We can imagine that each time we randomly select a pivot, the most ideal situation is selecting the median, which precisely divides the array in half, allowing us to exclude half the elements. The worst situation is selecting the maximum or minimum number, where we can only exclude one element.

The efficiency secret of RANDOMIZED-SELECT is that we don't need to select the perfect median every time. As long as the pivot we select is **not too bad**, the algorithm can be very efficient. We can define a "good" selection—for example, as long as the pivot falls in the "middle half" of the sorted array (that is, between the 25th and 75th percentiles), then we can at least exclude one-quarter of elements each time.

Since the pivot is randomly selected, it has a 50% probability of falling in this "middle half" ideal region. This is like flipping a coin—on average, flipping twice will result in one heads. Similarly, on average after two partitions, one will be a "good" partition. Even if occasionally encountering "bad" partitions, they'll quickly be compensated by the following "good" partitions. This ability to continuously and steadily reduce problem scale makes the expected total computation approach a linear series (such as $n + \frac{3}{4}n + (\frac{3}{4})^2n + \dots$), and the sum of this series is $O(n)$. Therefore, the overall average execution time is the very efficient linear time $\Theta(n)$.

## SELECT Algorithm

Facing the problem that RANDOMIZED-SELECT's **worst-case performance degrades to** $\Theta(n^2)$, we have a theoretically perfect but more complex solution—the SELECT algorithm. This algorithm's goal is to **eliminate the "bad luck" in randomization** by using a clever procedure to **ensure every time we select a "good enough" pivot**, thereby **guaranteeing** that regardless of input, the algorithm's execution time can remain at linear $Θ(n)$.

However, although the SELECT algorithm is theoretically perfect, in practical applications it's typically slower than `RANDOMIZED-SELECT`. This is because to guarantee selecting a "good" pivot, it needs to execute a series of complex operations—including grouping, sorting within groups, recursively finding the median of medians. These operations have large constant factors. Therefore, the SELECT algorithm's value is more in theoretical inspiration.

Because the SELECT algorithm's theoretical significance is greater than practical value, we won't continue to expand on detailed introductions for this algorithm.

## References

[Introduction to Algorithms, fourth edition](https://www.amazon.com/Introduction-Algorithms-fourth-Thomas-Cormen/dp/026204630X)

## Appendix

This article is part of a series. Currently, five articles have been written:

1. [Understanding Algorithms: Getting Started](../understanding-algorithms-getting-started/)
2. [Understanding Algorithms: Common Data Structures](../understanding-algorithms-common-data-structures/)
3. [Understanding Algorithms: Comparison-Based Sorting](../understanding-algorithms-comparison-based-sorting/)
4. [Understanding Algorithms: Linear-Time Sorting](../understanding-algorithms-linear-time-sorting/)
5. [Understanding Algorithms: The Selection Problem](../understanding-algorithms-selection-problem/)
