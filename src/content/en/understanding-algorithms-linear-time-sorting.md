---
title: Understanding Algorithms: Linear-Time Sorting
subtitle: Explore counting sort, radix sort, bucket sort and other linear-time sorting algorithms that break through the limits of comparison-based sorting.
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

At the end of the article [Understanding Algorithms: Comparison-Based Sorting](../understanding-algorithms-comparison-based-sorting/), we discussed that comparison-based sorting algorithms have an insurmountable theoretical limit on time efficiency—that is, in the worst case, their time complexity **absolutely cannot** be better than $O(n \log n)$.

The next question we need to ask is: **If we don't use the "pairwise comparison" method for sorting, can we find other ways to sort? If so, can this method's time efficiency surpass the speed limit of comparison-based sorting—that is, $O(n \log n)$?**

Most people can probably guess that since we've already separated out a category of "comparison-based sorting" algorithms, we can infer that there must also exist algorithms that don't sort through "comparison."

And for sorting algorithms that can break through the speed limit of comparison-based sorting, we can call them linear-time sorting.

This article will introduce common "linear-time sorting"—that is, non-comparison-based sorting—algorithms.

Below is the table of contents for this article:

1. [**Counting Sort**](#counting-sort)
2. [**Radix Sort**](#radix-sort)
3. [**Bucket Sort**](#bucket-sort)

## **Counting Sort**

Counting sort is a non-comparison sorting algorithm suitable for integers within a specific range. It directly determines an element's final position in the sorted array by calculating the number of occurrences of each element.

Counting sort's greatest advantage lies in its **linear time** execution efficiency. Its time complexity is $\Theta(n+k)$, where $n$ is the number of input elements and $k$ is the element range (maximum value). When the scale of $k$ is comparable to $n$—that is, $k=O(n)$—its time complexity becomes an amazing $\Theta(n)$. This is far faster than any comparison-based sorting algorithm.

Another advantage of counting sort is that it's a stable algorithm. This means if two elements have the same value, their relative order in the sorted output array will be exactly the same as in the input. This property is very important because it allows counting sort to serve as a subprocedure in more complex sorting algorithms—such as Radix Sort, which we'll introduce below.

However, we must also note that counting sort's super-high efficiency is built on a strict assumption: **input elements must be integers within a known range (such as 0 to $k$)**. If the data range $k$ becomes very large (for example, far greater than $n$), the algorithm's efficiency will decrease to $\Theta(k)$, and it will require a huge auxiliary array, causing space waste. Additionally, since counting sort uses element values directly as array indices, it cannot directly sort non-integer types—such as floating-point numbers or strings—of data.

In summary, counting sort's advantages are **extremely high efficiency** and **stability**, but it also has disadvantages of **limited application scenarios** and **unsuitability for non-integer data**. We can view counting sort as a "specialized" algorithm that achieves ultimate performance in specific scenarios by sacrificing generality.

### **Complete Implementation Logic and Steps of Counting Sort**

The core idea of counting sort is: **by calculating the number of elements less than or equal to a certain element $x$, determine $x$'s position in the final sorting result**. The implementation logic represented in pseudocode as follows:

```javascript
COUNTING-SORT(A, n, k)
1  let B[1:n] and C[0:k] be new arrays
2  for i = 0 to k
3    C[i] = 0
4  for j = 1 to n
5    C[A[j]] = C[A[j]] + 1
6  // C[i] now contains the number of elements equal to i.
7  for i = 1 to k
8    C[i] = C[i] + C[i-1]
9  // C[i] now contains the number of elements less than or equal to i.
10 // Starting from the end of array A, copy A to B.
11 for j = n downto 1
12   B[C[A[j]]] = A[j]
13   C[A[j]] = C[A[j]] - 1
14 return B
```

- **Line 1**: Create an output array $B$ of size $n$ and a counting array $C$ of size $k+1$.

- **Lines 2-3**: Initialize all elements of counting array $C$ to 0.

- **Lines 4-5**: Traverse the input array $A$, count the number of occurrences of each element, and store in $C$.

- **Lines 7-8**: Calculate cumulative counts. After traversal, $C[i]$ stores the total number of elements less than or equal to $i$.

- **Lines 11-13**: Traverse the input array $A$ from back to front. For each element `A[j]`, the value of `C[A[j]]` is its correct position in output array $B$. After placing `A[j]` in that position, decrement `C[A[j]]` by 1 so that the next element with the same value can be placed in the previous position.

- **Line 14**: Return the sorted array $B$.

This clever design completes sorting entirely without element comparisons, but through counting and index operations.

### Writing **Counting Sort** Algorithm in JavaScript

```javascript
/**
 * Sort an integer array using the counting sort algorithm.
 * @param {number[]} A - Input array with elements being integers from 0 to k.
 * @param {number} k - Maximum value in the input array.
 * @returns {number[]} - A new sorted array.
 */
function countingSort(A, k) {
  // Get the number of elements n from input array A's length
  const n = A.length;

  // Step 1: Create auxiliary arrays
  // B is the output array to store sorting results
  const B = new Array(n);
  // C is the counting array, size k+1, used to store information for numbers 0 to k
  // Initialize all elements to 0
  const C = new Array(k + 1).fill(0);

  // Step 2: Calculate the number of occurrences of each element
  // Traverse input array A, using each element's value as an index, incrementing the corresponding position in C array
  for (let j = 0; j < n; j++) {
    C[A[j]]++;
  }
  // At this point, C[i] represents the number of times number i appears in A.

  // Step 3: Calculate cumulative counts
  // Traverse counting array C, updating each position's value to the sum of itself and the previous position's value
  for (let i = 1; i <= k; i++) {
    C[i] = C[i] + C[i - 1];
  }
  // At this point, C[i] represents the total number of elements less than or equal to i.
  // This value also corresponds to element i's 1-based index position in the sorted array.

  // Step 4: Place elements into output array B
  // Traverse input array A from back to front—this is key to ensuring sorting stability
  for (let j = n - 1; j >= 0; j--) {
    // Get the value of current element A[j]
    const value = A[j];
    // Look up value's final position from C array (1-based index)
    // And convert it to B array's 0-based index
    const position = C[value] - 1;

    // Place value at the correct position in B array
    B[position] = value;

    // Decrement the count at the corresponding position in C array by 1
    // This way the next element with the same value will be placed in the previous position
    C[value]--;
  }

  // Return the sorted array B
  return B;
}
```

Below is also a clean version without comments:

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

### Efficiency Analysis of **Counting Sort**

Through rigorous mathematical proof, counting sort has an execution time of $\Theta(n+k)$ in worst case, best case, and average case.

In practical applications, we typically use counting sort when $k=O(n)$, at which point time complexity simplifies to $\Theta(n+O(n)) = \Theta(n)$.

Counting sort is so efficient because it transforms the sorting problem into a series of simple counting and data movement problems. The entire algorithm contains only four main loops:

1. One loop initializes counting array $C$ (length $k$).

2. One loop traverses input array $A$ to count (length $n$).

3. One loop traverses counting array $C$ to calculate cumulative sum (length $k$).

4. One loop traverses input array $A$ again to place elements into output array $B$ (length $n$).

The algorithm's total work is basically the sum of these several independent loops. There are no nested loops, nor recursive calls. Therefore, total time naturally has a linear relationship with input size $n$ and data range $k$—that is, $n+k$.

## **Radix Sort**

Like counting sort introduced earlier, radix sort is a non-comparison integer sorting algorithm. It performs stable sorting on each digit of numbers from least significant digit to most significant digit, ultimately completing sorting of all numbers.

**Stable Sort** means if a sorting algorithm can guarantee that elements with the same value maintain the same relative order in the sorted output array as they had in the input array, then this algorithm is stable.

One advantage of radix sort is that under specific conditions—such as when the number of digits $d$ is constant and the possible value range $k$ of each digit is similar to the total number of elements $n$—execution time can reach linear time $\Theta(n)$, which is faster than any comparison-based sorting algorithm's $\Theta(n \lg n)$.

Another advantage of radix sort is that it's very suitable for sorting data composed of multiple fields, such as sorting dates by "year, month, day." The traditional approach is to write a complex comparison function, but using radix sort, we can more intuitively perform three stable sorts: first sort by "day," then by "month," finally by "year," to get the correct result.

It should be noted that although radix sort is theoretically very efficient, in practical applications it also has some obvious disadvantages, including:

1. **Large Constant Factors**: Although radix sort's asymptotic time complexity may be linear $\Theta(n)$, the constant factor hidden in the $\Theta$ notation may be large. Compared to quicksort, each pass of radix sort may take longer.

2. **Not In-place**: When using Counting Sort as its stable sub-sorting algorithm, radix sort requires extra storage space to store intermediate results. This differs from many $\Theta(n \lg n)$ comparison-based sorting algorithms—like quicksort, heapsort—that can operate directly on the original array (in-place). When memory space is very precious, in-place sorting algorithms may be better choices.

3. **Poor Hardware Cache Utilization**: In modern computer architecture, quicksort can typically utilize hardware caches more effectively, making its practical performance often superior to radix sort.

### **Complete Implementation Logic and Steps of Radix Sort**

Radix sort adopts a counterintuitive but very clever method: **starting from the least significant digit**. Simply represented in pseudocode as follows:

```javascript
RADIX-SORT (A, n, d)
1 for i = 1 to d
2   use a stable sort to sort array A[1:n] on digit i
```

- **Parameter Description**:

  - `A`: The array to sort.

  - `n`: Array size.

  - `d`: The number of digits of the maximum number in the array.

- **Pseudocode Explanation**:

   This is a loop that iterates from `i=1` (least significant digit, the ones place) to `d` (most significant digit). In each iteration, it calls a stable sorting algorithm (like counting sort) to sort the entire array `A` based on the current `i`-th digit.

The reason this algorithm can succeed is that **each digit sort must be stable**. Stability ensures that the sorting results from previous lower digits are preserved into the next higher digit sort.

### Writing Radix Sort Algorithm in JavaScript

```javascript
/**
 * Main function for radix sort
 * @param {Array<number>} arr - Array of numbers to sort
 * @returns {Array<number>} - Sorted array
 */
function radixSortWithCountingSort(arr) {
  if (!Array.isArray(arr) || arr.length <= 1) {
    return arr;
  }

  // 1. Find the maximum value to determine how many digits need sorting
  const maxNum = Math.max(...arr);

  // 2. Iterate through each digit, starting from ones place (exp = 1)
  let exp = 1;
  while (maxNum / exp >= 1) {
    // 3. Execute one stable counting sort for the current digit
    countingSortOnDigit(arr, exp);
    exp *= 10;
  }

  return arr;
}

/**
 * Auxiliary function for counting sort on a specific digit (stable sort)
 * @param {Array<number>} arr - Array to sort (will be modified in-place)
 * @param {number} exp - Exponent representing which digit to sort (1 for ones, 10 for tens, ...)
 */
function countingSortOnDigit(arr, exp) {
  const n = arr.length;
  const output = new Array(n).fill(0); // Output array B
  const count = new Array(10).fill(0); // Counting array C (digits can only be 0-9)

  // Step 1: Calculate frequency of each digit (0-9)
  for (let i = 0; i < n; i++) {
    const digit = Math.floor(arr[i] / exp) % 10;
    count[digit]++;
  }

  // Step 2: Calculate cumulative counts to determine each number's final position
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  // Step 3: Traverse from back to front, placing elements in correct output array positions to ensure stability
  for (let i = n - 1; i >= 0; i--) {
    const digit = Math.floor(arr[i] / exp) % 10;
    const position = count[digit] - 1;
    output[position] = arr[i];
    count[digit]--;
  }

  // Step 4: Copy sorted results back to original array
  for (let i = 0; i < n; i++) {
    arr[i] = output[i];
  }
}
```

Here we also need to introduce another writing style more popular in implementation—**the bucket method**—this writing is equivalent to the previous one, but it has many advantages making it more commonly used in implementation, including more concise writing, higher code readability, good utilization of modern programming language dynamic array features, and it implicitly completes counting and placement without explicit count and position calculations.

```javascript
/**
 * Radix sort main function
 * @param {Array<number>} nums - Array of numbers to sort
 * @returns {Array<number>} - Sorted array
 */
function radixSort(nums) {
  // 1. Find how many sorting rounds to execute—the number of digits in the maximum number
  const maxDigitCount = mostDigits(nums);

  // 2. Iterate by digit, from least significant (k=0) to most significant
  for (let k = 0; k < maxDigitCount; k++) {
    // 3. Create a bucket for each digit (0-9)
    //    These buckets are equivalent to temporary storage space in counting sort
    let digitBuckets = Array.from({ length: 10 }, () => []);

    // 4. Traverse all numbers in the current array
    for (let i = 0; i < nums.length; i++) {
      // Get the value of the current number at the k-th digit
      let digit = getDigit(nums[i], k);
      // Place this number into the corresponding bucket
      // Since we place them in order, this ensures sorting stability
      digitBuckets[digit].push(nums[i]);
    }

    // 5. Retrieve all numbers from buckets in order (bucket 0 to bucket 9), recombining into a new array
    //    This step completes sorting for the k-th digit
    nums = [].concat(...digitBuckets);
  }

  // 6. After all rounds end, return the fully sorted array
  return nums;
}

/**
 * Helper function: Find how many digits the number with most digits has in an array
 * @param {Array<number>} nums - Number array
 * @returns {number} - Maximum number of digits
 */
function mostDigits(nums) {
  let maxDigits = 0;
  for (let i = 0; i < nums.length; i++) {
    maxDigits = Math.max(maxDigits, digitCount(nums[i]));
  }
  return maxDigits;
}

/**
 * Helper function: Calculate how many digits a number has
 * @param {number} num - Input number
 * @returns {number} - Number of digits
 */
function digitCount(num) {
  // Special case: 0 is one digit
  if (num === 0) return 1;
  // e.g., digitCount(732) -> floor(log10(732)) + 1 -> floor(2.86) + 1 -> 2 + 1 -> 3
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

/**
 * Helper function: Get a number's value at a specific digit
 * @param {number} num - Input number
 * @param {number} place - Digit position (0 is ones, 1 is tens, ...)
 * @returns {number} - The digit at that position (0-9)
 */
function getDigit(num, place) {
  // e.g., getDigit(732, 2) -> Math.floor(732 / 100) % 10 -> 7
  return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
}
```

Below is also a clean version without comments:

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

### Efficiency Analysis of **Radix Sort**

Through rigorous mathematical proof, for $n$ numbers with $d$ digits, where each digit has at most $k$ possible values, if radix sort's stable sorting algorithm takes $\Theta(n+k)$ time (such as counting sort), then radix sort's execution time is $\Theta(d(n+k))$.

Understanding intuitively, radix sort needs to sort $d$ digits of numbers in total. Each round of sorting uses a stable sub-sorting algorithm—such as counting sort—to process $n$ numbers. If the sub-sorting algorithm's time is linear, such as $\Theta(n+k)$, then total time is repeating this process $d$ times, which is $d \times \Theta(n+k)$, or $\Theta(d(n+k))$.

## **Bucket Sort**

Bucket sort is the last non-comparison sorting algorithm we'll introduce in this article. It's an algorithm that distributes elements to be sorted into a limited number of "buckets," sorts elements within each bucket individually, then sequentially merges all bucket elements.

Bucket sort can achieve **linear time efficiency of $O(n)$ on average under specific conditions**. This condition—which is also this algorithm's most important assumption—is that **input data is generated by a random process and is uniformly and independently distributed within a known interval** (such as [0, 1)). Under this ideal assumption, all elements will be evenly allocated to each bucket, resulting in very few elements in each bucket. The cost of sorting a small number of elements is extremely low, so the algorithm's main overhead is just one traversal to place $n$ elements into buckets, thus achieving linear execution time.

However, this restriction also brings disadvantages. Bucket sort's disadvantages are rooted in its core assumption. Its high performance completely depends on the "uniform distribution" of input data.

- **Performance Degradation in Worst Case**: If input data distribution is extremely uneven, for example all elements are concentrated in a very small range, then most or even all elements will be allocated to the same bucket. In this situation, the algorithm's performance degrades to the performance of the sorting algorithm used for handling this single bucket. If we use insertion sort, then bucket sort's overall worst execution time will be $\Theta(n^2)$.

- **Restrictions on Input Data**: Bucket sort assumes the input data range is known and can be easily divided into multiple sub-intervals (buckets). For data types whose range cannot be predicted or are non-numeric, application is more difficult.

In summary, bucket sort is a specialized algorithm that, under the powerful assumption of "uniformly distributed data," exchanges for performance exceeding traditional comparison-based sorting algorithms.

### **Complete Implementation Logic and Steps of Bucket Sort**

Bucket sort's overall logic is very intuitive. We can imagine it as the process of organizing playing cards.

Suppose we want to organize a deck of cards numbered from 0 to 99. We can prepare 10 boxes—that is, buckets—and label them 0-9, 10-19, ..., 90-99 respectively. Then, we pick up cards one by one, placing each into the corresponding box based on the number on the card. After placing all cards, we organize the cards in each box individually (since there aren't many cards in each box, organizing is quick). Finally, following the order of boxes (0-9, 10-19, ...), we take out all organized cards to get a completely sorted sequence.

Represented in pseudocode as follows:

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

- **Lines 1-3**: Initialize an array named `B` that will contain `n` buckets. The loop initializes each bucket `B[i]` as an empty list, ready to receive elements.

- **Lines 4-5**: This is the distribution step. Traverse each element in input array `A`. For each element `A[i]`, determine its bucket index by calculating `floor(n * A[i])`, then insert `A[i]` into the corresponding bucket `B`.

- **Lines 6-7**: This is the step of sorting each bucket. Traverse all buckets and use insertion sort (or other sorting algorithms) to internally sort each non-empty bucket.

- **Lines 8-9**: This is the step of merging results. Connect all buckets (from `B[0]` to `B[n-1]`) in order to form a single sorted list, and return it as the result.

### Writing Bucket Sort Algorithm in JavaScript

```javascript
/**
 * Sort an array containing floating-point numbers in the [0, 1) interval using the bucket sort algorithm.
 * @param {number[]} arr - Array to sort.
 * @returns {number[]} - Sorted array.
 */
function bucketSort(arr) {
  // Handle edge case: if array is empty, return directly.
  if (arr.length === 0) {
    return arr;
  }

  // Get input array's length, which will also be the number of buckets we use.
  const n = arr.length;

  // Step 1: Initialize n empty buckets.
  // We create an array of length n where each element is an empty array (representing a bucket).
  let buckets = new Array(n);
  for (let i = 0; i < n; i++) {
    buckets[i] = [];
  }

  // Step 2: Distribute each element in the array to corresponding buckets.
  // Traverse input array `arr`.
  for (let i = 0; i < n; i++) {
    // Calculate which bucket the element should be placed in based on element value.
    // Since element values are in [0, 1), multiplying by n gives results in [0, n).
    // Math.floor() ensures the index is an integer.
    let bucketIndex = Math.floor(n * arr[i]);
    // Place the element into the calculated bucket.
    buckets[bucketIndex].push(arr[i]);
  }

  // Step 3: Sort elements in each bucket.
  // Traverse all buckets.
  for (let i = 0; i < n; i++) {
    // Insertion sort could be used here since we expect few elements in each bucket, but in JavaScript, directly using the built-in .sort() method is more convenient and efficient.
    // For number sorting, need to provide a comparison function (a, b) => a - b.
    buckets[i].sort((a, b) => a - b);
  }

  // Step 4: Sequentially merge all elements from all buckets to get the final sorted result.
  // `buckets` is now a two-dimensional array (array of arrays).
  // Using ES2019's .flat() method can flatten it into a one-dimensional array.
  // Effect is equivalent to `[].concat(...buckets)`.
  const sortedArr = buckets.flat();

  // Return the fully sorted array.
  return sortedArr;
}
```

Below is also a clean version without comments:

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

### Efficiency Analysis of **Bucket Sort**

Through rigorous mathematical proof, bucket sort has an execution time of $\Theta(n^2)$ in the worst case; $\Theta(n)$ in the best case; and $\Theta(n)$ in the **average case**.

The reason bucket sort can achieve amazing $\Theta(n)$ efficiency on average is the combination of "divide and conquer" with "probability." The core idea is: if we have $n$ elements, and we prepare $n$ buckets, and these elements are very "obedient" (uniformly distributed), then they will very evenly scatter into these $n$ buckets.

In the ideal situation, each bucket gets exactly one element, so we don't need to sort bucket interiors at all. Even if not so ideal, on average each bucket will only get a constant number of elements. Sorting a list with only two or three elements takes almost no time. Therefore, the most time-consuming part of the entire algorithm becomes the single process of "placing $n$ elements one by one into corresponding buckets," and this process's complexity is obviously $\Theta(n)$.

However, when all elements are "disobedient," all cramming into the same bucket—that is, the worst case—this algorithm degrades to using only insertion sort on these $n$ elements, naturally dropping efficiency to $\Theta(n^2)$.

## References

[Introduction to Algorithms, fourth edition](https://www.amazon.com/Introduction-Algorithms-fourth-Thomas-Cormen/dp/026204630X)

## Appendix

This article is part of a series. Currently, five articles have been written:

1. [Understanding Algorithms: Getting Started](../understanding-algorithms-getting-started/)
2. [Understanding Algorithms: Common Data Structures](../understanding-algorithms-common-data-structures/)
3. [Understanding Algorithms: Comparison-Based Sorting](../understanding-algorithms-comparison-based-sorting/)
4. [Understanding Algorithms: Linear-Time Sorting](../understanding-algorithms-linear-time-sorting/)
5. [Understanding Algorithms: The Selection Problem](../understanding-algorithms-selection-problem/)
