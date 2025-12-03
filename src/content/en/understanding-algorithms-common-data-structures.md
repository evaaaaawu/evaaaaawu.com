---
title: Understanding Algorithms: Common Data Structures
subtitle: Comprehensive introduction to arrays, linked lists, stacks, queues, trees, hash tables and other common data structures—mastering the foundation of efficient algorithm design.
author: src/content/authors/eva.json
imageWebp: /images/articles/webp/understanding-algorithms-common-data-structures.webp
imagePng: /images/articles/png/understanding-algorithms-common-data-structures.png
imgAlt: Understanding Algorithms_Common Data Structures
creationDate: 2025-11-29
updateDate: 2025-11-29
tags:
  - Algorithm
featured: false
---

In the article [Understanding Algorithms: Getting Started](../understanding-algorithms-getting-started/), we mentioned that one strategy that can help design better algorithms is using **data structures**.

We also mentioned that a data structure is a way of storing and organizing data, with the purpose of making data access and modification more convenient. Furthermore, there are many types of data structures, and selecting the appropriate data structure for a specific problem is an important part of algorithm design.

In this article, we'll further introduce common data structures.

Below is the table of contents for this article:

1. [Array](#array)
2. [Matrix](#matrix)
3. [Linked List](#linked-list)
4. [Stack](#stack)
5. [Queue](#queue)
6. [Rooted Tree](#rooted-tree)
   - [Binary Tree](#binary-tree)
   - [Binary Search Tree (BST)](#binary-search-tree-bst)
   - [Heap](#heap)
   - [Red-Black Tree](#red-black-tree)
7. [Hash Table](#hash-tables)

## Array

An array is a data structure that stores data elements in a contiguous, uninterrupted space in memory.

The core characteristics of arrays can be understood from how they are stored in memory, which directly determines their access efficiency and limitations.

- **Contiguous Memory Storage**\
   This is the most fundamental characteristic of arrays. When we declare an array, the computer finds a sufficiently large, contiguous space in memory, and then places all the array's elements one after another. For example, an array containing 6 integers occupies 6 consecutive integer spaces tightly connected in memory.

- **Constant-Time Access**\
   Because elements are stored contiguously, we can quickly locate any element through mathematical calculation. The time required for this process is fixed and doesn't change with the array size or element position, with a time complexity of $O(1)$.

   The detailed calculation process is as follows:

  - Suppose the starting memory address of the array is $a$.

  - Each element occupies $b$ bytes.

  - The starting index of the array is $s$ (for example, it's 0 in some languages, 1 in others).

  - Then, to access the element at index $i$, its memory address can be calculated through the formula $a + b \times (i - s)$.

   Because this calculation is very simple and direct, the computer can immediately jump to the specified memory location to read or write data. This is also one of the array's main advantages.

- **Uniform Element Size**\
   The above fast access formula holds under the premise that each element in the array occupies the same amount of memory space—that is, $b$ in the formula is a constant. Most programming languages enforce that all elements in an array must be of the same type, such as an integer array or a character array.

- **Handling Elements of Different Sizes**\
   If in reality we need to store objects of different sizes (for example, strings of different lengths), storing them directly in an array would be difficult. The solution in this case is that the array itself doesn't directly store objects, but stores "pointers" pointing to these objects. Because pointers themselves are of fixed size, the array can still maintain the "uniform element size" characteristic, allowing us to quickly locate a pointer and then access the actual object through that pointer.

The existence of arrays as a data structure is mainly to **leverage the contiguous storage characteristics of computer memory to achieve the most efficient random access to data collections**. Its core advantages are as follows:

- **Ultimate Access Efficiency**: As mentioned above, regardless of how large the array is, accessing any element takes a fixed constant time $O(1)$. This contrasts sharply with the Linked List we'll introduce later. In a linked list, to find the $k$-th element, you must traverse from the beginning one by one, requiring $\Theta(k)$ time.

- **High Memory Usage Efficiency**: When using a single array to represent structures like two-dimensional matrices, all data is stored tightly together without extra pointers taking up space, which is usually more efficient on modern computers.

However, arrays still have some disadvantages and limitations, including:

- **Low Insertion and Deletion Efficiency**: The array's advantage also brings disadvantages. Due to its fixed contiguous memory locations, to insert a new element at the beginning or middle of the array, all subsequent elements must move back one position to make room. Similarly, after deleting an element, subsequent elements need to move forward to fill the gap. In the worst case, these operations need to move $n-1$ elements, with a time complexity of $\Theta(n)$.

- **Fixed Size**: Traditional arrays usually need to specify their size when declared, and it's difficult to change afterwards. If space runs out, an "overflow" error occurs. Although modern programming languages provide some dynamic array implementations, they typically involve the costly process of reallocating a larger array and copying all elements.

- **Poor Flexibility**: For non-linear or irregularly structured data, such as "ragged arrays" where each row has a different length, using a single contiguous array for representation is very difficult and inflexible.

## Matrix

A matrix is a two-dimensional array, typically implemented through one or more one-dimensional arrays for storage in memory.

The characteristics of matrices are mainly reflected in their diverse memory storage methods. We have several strategies for mapping a two-dimensional logical structure to one-dimensional linear memory. These strategies directly affect data access efficiency and usage flexibility.

- **Single-Array Representation**

   This method places the entire $m \times n$ matrix in a contiguous one-dimensional array. There are mainly two orderings:

  - **Row-Major Order**: This is the most common storage method. It connects each row of the matrix sequentially. For example, for the matrix $M = \begin{pmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{pmatrix}$, it will be stored in memory as the sequence `1 2 3 4 5 6`.

  - **Column-Major Order**: This method connects each column of the matrix sequentially. For the same matrix $M$, it will be stored as the sequence `1 4 2 5 3 6`.

   In both methods, to access a specific element $M[i, j]$, the computer needs to calculate its index position in the one-dimensional array through a formula. This process is very fast, with a time complexity of $O(1)$.

- **Multiple-Array Representation**

   This method doesn't use a single contiguous memory block, but uses a main array to store pointers to other sub-arrays.

  - **Row-major version**: The main array has $m$ elements, each being a pointer that points to $m$ independent sub-arrays storing each row's data.

  - **Column-major version**: Conversely, the main array has $n$ elements, each pointer pointing to $n$ sub-arrays storing each column's data.

- **Block Representation**

   This is a less common but still existing storage strategy. It divides the entire matrix into several small sub-matrices (blocks), then stores these blocks contiguously in memory. For example, a $4 \times 4$ matrix can be viewed as four $2 \times 2$ blocks. The storage order might be storing the upper-left block first, then the upper-right, and so on.

Matrices can **effectively organize and represent datasets with two-dimensional—or higher-dimensional—relationships**. Whenever data has a logical concept of "rows" and "columns," such as tables, chessboards, image pixels, etc., using matrices for representation is very natural and intuitive.

## Linked List

A linked list is a data structure in which objects determine their linear arrangement through internal pointers, rather than being determined by contiguous positions in memory like arrays.

A linked list is a highly flexible dynamic set representation. Its core characteristics revolve around the concepts of "nodes" and "pointers." Below is a detailed introduction to linked list characteristics:

1. **Node Structure**

   - Each element in a linked list is an independent object, usually called a "node."

   - Each node contains at least two properties: one is a `key` for storing data, and one or more pointers pointing to other nodes. Nodes can also contain other auxiliary data.

2. **Pointers Determine Order**

   - Unlike arrays, the linear order of a linked list is determined by the pointers within nodes. In a doubly linked list, each node `x` has:

      - `x.next`: Points to its successor node.

      - `x.prev`: Points to its predecessor node.

   - The first element of the list is called the "head," whose `prev` pointer is `NIL` (null). The last element is called the "tail," whose `next` pointer is `NIL`. The beginning of the entire list is identified by a property `L.head` pointing to the head.

3. **Various Forms**

   - Linked lists can be divided into many types according to different structures and uses:

      - **Singly Linked vs. Doubly Linked**: Singly linked list nodes only have a `next` pointer, while doubly linked lists have both `next` and `prev` pointers.

      - **Sorted vs. Unsorted**: In a sorted list, elements are arranged according to their `key` values, with the smallest value at the head and the largest at the tail. Unsorted lists have no such restriction.

      - **Circular vs. Non-circular**: In a circular list, the tail's `next` pointer points to the head, and the head's `prev` pointer points to the tail, forming a circle.

4. **Sentinel Application**

   - To simplify handling boundary conditions—such as insertion/deletion at the head or tail of the list—we can introduce a dummy object called a "sentinel" `L.nil`.

   - This sentinel is located between the head and tail, making the list a circular structure. For example: the sentinel's `next` points to the actual head, and `prev` points to the actual tail. This way, all insertion and deletion operations can be viewed as occurring between two nodes, without needing to write extra code for special cases at the head/tail, thus simplifying implementation.

The main purpose of linked lists is to provide a more flexible representation for "dynamic sets." In many application scenarios, we need a data collection that can efficiently add and delete elements, while traditional arrays have performance bottlenecks in these operations. The linear order of a linked list is determined by pointers rather than fixed memory indices, which is the source of its flexibility. Based on the above explanation, we can summarize two major advantages of linked lists:

- **Efficient Insertion and Deletion**: This is the most significant advantage of linked lists. To insert or delete an element in a list, you only need to modify the pointers of surrounding nodes. This operation has a time complexity of $O(1)$. In contrast, inserting or deleting elements at the beginning of an array requires moving all subsequent elements, with a worst-case time complexity of $\Theta(n)$.

- **Flexible Space Usage**: Linked list nodes don't need to be stored contiguously in memory and can dynamically allocate space when needed. Therefore, they don't occupy a fixed-size block of memory in advance like arrays, making space usage more efficient.

However, linked lists also have their disadvantages:

- **Inefficient Element Access and Search**: Linked lists cannot directly access the $k$-th element in $O(1)$ time like arrays. To find the $k$-th element, you must start from the head and traverse along the pointers $k$ times, with a time complexity of $\Theta(k)$.

- **Poor Search Performance**: Similarly, to search for an element with a specific `key` value in a linked list containing $n$ elements, the worst case requires traversing the entire list. This is a linear search with a time complexity of $\Theta(n)$.

- **Extra Pointer Space**: Each node requires extra space to store one or more pointers. When the stored data itself is very small, the space overhead of these pointers becomes relatively significant.

Common applications of linked lists include:

- **Implementing Other Data Structures**: Due to their efficient insertion and deletion characteristics, linked lists are ideal for implementing stacks and queues. PUSH/POP and ENQUEUE/DEQUEUE operations can all achieve $O(1)$ time complexity.

- **Hash Table Collision Handling**: In hash tables, when multiple different keys are hashed to the same index position, a "collision" occurs. A common method to solve this problem is "chaining," which uses a linked list to store all colliding elements at that index position.

- **Representing Dynamic Sets**: In applications requiring frequently changing members, such as compiler symbol tables (though hash tables are more commonly used), linked lists provide a simple and flexible basic structure.

## Stack

A stack is a dynamic set where the element deleted is always the one most recently inserted, thus implementing the "Last-In, First-Out" (LIFO) principle. Below is a detailed introduction to stack characteristics:

- **Core Principle: Last-In, First-Out (LIFO)**

   This is the most fundamental characteristic of a stack. We can imagine it as a stack of plates at a cafeteria: the newest plate placed goes on top, and when we want to take a plate, we can only take from the top. Therefore, the order in which plates are removed is exactly opposite to the order they were placed. Only the topmost element is directly accessible.

- **Main Operations: PUSH and POP**

  - **PUSH (push)**: Equivalent to the `INSERT` operation, placing a new element at the very top of the stack.

  - **POP (pop)**: Equivalent to the `DELETE` operation. It doesn't require parameters because it always removes and returns the topmost element of the stack.

   Both of these operations that modify stack content execute in only $O(1)$ time, making them very efficient.

- **Array-based Implementation**

   A stack can be implemented through an array, which we'll represent as `S[1:n]` for the following explanation. This implementation has several key properties:

  - `S.top`: This is an index value that always points to the "topmost"—that is, most recently inserted—element in the stack.

  - `S.size`: This represents the array size used to store the stack, which is the stack's capacity limit.

  - The actual elements in the stack are stored in the range `S[1...S.top]`. `S[1]` is the element at the bottom of the stack, while `S[S.top]` is the element at the top. When `S.top` is 0, it means the stack is empty.

- **Boundary Conditions: Overflow and Underflow**

  - **Overflow**: If we try to perform a PUSH operation on a stack that's already full—that is, `S.top` already equals the array size `S.size`—an error occurs because there's no space to store the new element.

  - **Underflow**: If we try to perform a POP operation on an empty stack, an error also occurs because there are no elements left to remove.

The existence of the stack data structure is to solve a class of problems with "last-in, first-out" characteristics. Its design is simple and focused, bringing significant advantages but also some limitations. Below is a summary of the advantages and disadvantages of stacks:

- **Advantages**

   1. **Extremely High Efficiency**: The core advantage of stacks lies in their operational efficiency. Both PUSH and POP operations only involve incrementing/decrementing the `top` index and accessing a single array position, so their time complexity is $O(1)$. This means that no matter how large the stack is, adding and removing top elements is equally fast, which is crucial in scenarios requiring frequent such operations.

   2. **Simple Structure**: Array-based stack implementation is very intuitive, requiring only an array and a variable pointing to the top. This simplicity makes the code easier to write, understand, and debug.

- **Disadvantages**

   1. **Fixed Capacity (in array-based implementation)**: When using an array to implement a stack, its size is fixed at initialization. If the number of stored elements exceeds the array size, it leads to an "overflow" error. Although dynamic arrays or linked lists can be used to overcome this, the most basic implementation has this limitation.

   2. **Restricted Access**: The stack's design only allows access to the top element. We cannot directly read or modify elements in the middle of the stack unless we first POP all elements above it. While this LIFO access pattern is its characteristic, it becomes a major disadvantage in scenarios requiring random element access.

**Managing Subroutine Linkage** is one of the most classic applications of stacks. When our code calls a function, the system PUSHes information like return address, parameters, and local variables onto a memory area called the "call stack." If this function calls another function, the new information is again PUSHed to the top of the stack. When a function finishes executing and returns, the corresponding information is POPped from the stack, and the program flow can return to the previous position. This last-in, first-out mechanism perfectly handles nested function calls.

## Queue

A queue is a dynamic set that is a data structure following the "First-In, First-Out" (FIFO) principle. Like a waiting line in real life, the first element to enter the queue will be the first to be removed. Below is a detailed introduction to queue characteristics:

- **First-In, First-Out (FIFO) Principle**

   This is the most fundamental characteristic of queues. Opposite to the "last-in, first-out" (LIFO) of stacks, queues strictly follow the "first-in, first-out" (FIFO) strategy. We can imagine a queue like a group of customers waiting for service. New customers always join at the end of the line, and the first to receive service is always the customer at the front who has been waiting the longest.

- **Having "Head" and "Tail"**

   Queues have two important positions: **head** and **tail**.

  - **Head**: Points to the front of the line, which is the next element to be removed.

  - **Tail**: Points to the end of the line, representing where newly joined elements will be placed.

- **Main Operations**

  - **ENQUEUE (enqueue)**: This is the queue's `INSERT` operation. When a new element is "enqueued," it's placed at the tail of the queue.

  - **DEQUEUE (dequeue)**: This is the queue's `DELETE` operation. This operation removes the element at the head of the queue, which is the element that has been in the queue the longest. It's worth noting that the `DEQUEUE` operation doesn't need to specify which element to remove because the target is always fixed.

- **Array-based Implementation**

   A queue can be implemented through an array, which we'll represent as `Q[1:n]` for the following explanation. This implementation is very clever.

  - It uses an array `Q[1:n]` of size `n`, and uses two attributes `Q.head` and `Q.tail` to index the head and tail respectively.

  - To avoid having to move all other elements in the array after removing the head element, this implementation adopts a "wrap around" approach. When the index reaches the array end `n`, the next position returns to the beginning `1`, forming a circular structure.

  - In this implementation, both `ENQUEUE` and `DEQUEUE` operations only need to move index pointers, so the time complexity can reach `O(1)`, which is very efficient.

The existence of queues is to solve scenarios requiring **sequential processing** of tasks or data. Its core value lies in its built-in "**fairness**" and "**ordering**." When multiple items need to share limited resources (such as a printer or a CPU core), queues provide a simple and predictable management mechanism, ensuring that first-arriving requests are processed first. It abstracts the fair real-world behavior of "waiting in line" into a data structure in computer science. Below is a summary of queue advantages and disadvantages:

**Advantages**

- **Efficient Operations**: For the main `ENQUEUE` and `DEQUEUE` operations, whether using the circular array implementation mentioned above or a linked list implementation, the time complexity is `O(1)`. This means that regardless of how many elements are in the queue, the time to add and remove basic elements is fixed—very efficient.

- **Intuitive and Easy to Understand**: The FIFO concept is completely consistent with our daily life experience, making it very easy to understand and apply.

- **Guarantees Order**: The FIFO characteristic of queues ensures that the processing order of data or tasks is consistent with their arrival order, which is crucial in many algorithms and system designs.

**Disadvantages**

- **Inflexible Access**: The main limitation of queues is that we can only remove elements from the head and add elements at the tail. Elements in the middle of the queue cannot be directly accessed or removed. To put it another way, the element deleted is "prespecified," which reflects the limitation of queues. To search for a specific element, in the worst case, all elements before it must be `DEQUEUE`d, which is very inefficient.

- **Possible Capacity Limitation (array-based implementation)**: If using a fixed-size array to implement a queue, when the queue is full, attempting to `ENQUEUE` will cause an "overflow" error. Although this problem can be solved through dynamic arrays or linked lists, it's an issue that needs consideration in basic array implementations.

The FIFO characteristic of queues gives them wide applications in the computer science field. Below are some common examples:

- **Task Scheduling**: Operating systems often use queues to manage pending processes. The CPU retrieves processes from the queue for execution according to certain scheduling algorithms—such as first-come, first-served.

- **Buffers**: When transferring data between two processes of different speeds, queues are often used as buffers. For example, when watching streaming video online, the player puts pre-downloaded data into a queue and then retrieves it for playback in order, to cope with network speed fluctuations.

- **Printer Queue**: When multiple users send print requests to the same printer, these requests are placed in a queue, and the printer processes them in order.

- **Breadth-First Search (BFS)**: In graph theory or tree traversal, the BFS algorithm uses a queue to store nodes to be visited, ensuring nodes are visited layer by layer according to their distance from the starting point.

- **Message Queues**: In distributed systems, different services asynchronously pass messages through message queues, ensuring messages can be reliably processed in order.

## Rooted Tree

A rooted tree is a linked data structure that represents non-linear hierarchical relationships through node objects and pointers. Its core characteristic lies in how nodes are organized and the connection relationships between nodes. Below, let's first introduce the basic characteristics of rooted trees:

- **Nodes are the Basic Unit**

   Each node in a tree is viewed as an object. Like linked lists, each node object contains a `key` property for storing its value, while other properties are pointers to other nodes. The design of these pointers varies according to the tree type.

- **Pointers Define Hierarchical Relationships**

   Unlike linked lists that can only represent linear relationships, tree structures establish parent-child, sibling, and other hierarchical relationships through pointers.

   One particularly noteworthy implementation method is called **Left-child, Right-sibling Representation**. This representation is very clever, specifically designed to solve the "unbounded branching" problem where the number of child nodes is not fixed. In this structure, each node `x` still has a pointer `x.p` to its parent node, but for child nodes, it only uses two pointers:

   1. `x.left-child`: Points to `x`'s **leftmost** child node.

   2. `x.right-sibling`: Points to the **adjacent right** sibling node of `x`.

   If node `x` has no child nodes, its `x.left-child` is `NIL`. If `x` is the rightmost child of its parent, then `x.right-sibling` is `NIL`. This representation uses only $O(n)$ space, making it very memory-efficient.

**Many relationships in the real world are essentially non-linear**. Traditional linked lists are very suitable for representing linear relationship data like sequences and queues. However, when we need to simulate or process data with hierarchical, branching, or subordinate relationships, such as company organization charts, folder structures, family trees, etc., linear structures fall short. Rooted trees provide an intuitive and efficient way to model these complex non-linear hierarchical relationships.

Below, let's further introduce common types of rooted trees:

### Binary Tree

A binary tree is a tree data structure where each node has at most two children (a left child and a right child). This is one of the most basic tree representations. Below are the characteristics of binary trees:

- **Core Properties (Pointers)**: In a typical binary tree, each node `x` contains three key pointer properties.

  - `x.p`: Pointer to its **parent node**.

  - `x.left`: Pointer to its **left child**.

  - `x.right`: Pointer to its **right child**.

- **Determining Special Nodes**:

  - **Root Node**: If a node `x`'s parent pointer `x.p` is `NIL` (null), then `x` is the root node of the entire tree. The root node of the entire tree is pointed to by a property called `T.root`.

  - **Empty Tree**: If the value of `T.root` is `NIL`, it means the tree is empty.

  - **Leaf Node** / **Missing Children**: If node `x` has no left child, then `x.left` is `NIL`; similarly, if it has no right child, then `x.right` is `NIL`.

### Heap

A heap is an array object that we can view as a nearly complete binary tree.

A heap is a very efficient data structure. Its core characteristics revolve around its special structure and element ordering rules. Below is a detailed introduction to heap characteristics:

- **Structure: Nearly Complete Binary Tree**

   Conceptually, a heap is a binary tree where all levels are completely filled except possibly the bottom level, and the bottom level's nodes are filled from left to right. Although we view it as a tree, it's actually stored in an array. The array's first element $A$ is the tree's root node.

- **Parent-Child Node Index Relationships**

   Since a heap is implemented using an array, the indices of any node's parent, left child, and right child can be quickly calculated through simple mathematical operations:

  - `PARENT(i)`: $\lfloor i/2 \rfloor$

  - `LEFT(i)`: $2i$

  - `RIGHT(i)`: $2i+1$

   On most computers, these operations can be completed through efficient bit-shift operations. For example, calculating $2i$ is equivalent to left-shifting the binary representation of $i$ by one bit, making the operation very fast.

- **Heap Property**

   Heaps are divided into two main types, both satisfying a specific "heap property" that determines the relationship between a node and its parent:

  - **Max-Heap**: Except for the root node, for each node $i$, its parent's value is greater than or equal to that node's value—that is, $A[\text{PARENT}(i)] \geq A[i]$. This means the largest element in a max-heap is always stored in the root node.

  - **Min-Heap**: Opposite to a max-heap, except for the root node, for each node $i$, its parent's value is less than or equal to that node's value—that is, $A[\text{PARENT}(i)] \leq A[i]$. Therefore, the smallest element in a min-heap is always stored in the root node.

- **Height and Operation Time**\
   A heap containing $n$ elements has a height of $\Theta(\lg n)$. Basic operations on a heap (such as maintaining the heap property, insertion, extraction, etc.) execute in time at most proportional to the tree's height, so the time complexity is $O(\lg n)$.

- **Distinction from Garbage Collection "Heap"**\
   It's important to note that the "heap" in data structures is completely different from the "heap" used for "garbage-collected storage" in programming languages (like Java, Python). The "heap" mentioned in this article always refers to the former—this specific data structure.

The emergence of the heap data structure is mainly to solve efficiency problems of specific algorithms and provide an efficient information management design technique. Common applications include heapsort and priority queues.

### **Binary Search Trees**

A binary search tree is a data structure rooted in binary trees. Its organization satisfies a key property: for any node x in the tree, all nodes in its left subtree have values less than or equal to x's value, while all nodes in its right subtree have values greater than or equal to x's value.

The core characteristics of binary search trees all revolve around its unique "binary-search-tree property," which determines its structure and behavior. Below is a detailed introduction to binary search tree characteristics:

- **The Binary-Search-Tree Property**

   This is the most fundamental rule of this data structure. Specifically, assume `x` is any node in the tree:

  - If `y` is a node in `x`'s left subtree, then `y.key ≤ x.key`.

  - If `y` is a node in `x`'s right subtree, then `y.key ≥ x.key`.

   This property applies not only to the root node but equally to every node in the tree.

- **Structural Representation**\
   The physical structure of a binary search tree is a linked data structure. Each node object contains a key and satellite data, along with three pointer properties: `left`, `right`, and `p`, pointing to its left child, right child, and parent node respectively. If a child or parent doesn't exist, the corresponding pointer value is NIL. The root node is the only node whose parent is NIL.

- **Sorted Order Traversal**\
   Due to the binary search tree property, we can use a simple recursive algorithm called "inorder tree walk" to print all keys in the tree in sorted order. The principle of this algorithm is to first recursively traverse the left subtree, then print the root node's key, and finally recursively traverse the right subtree. Performing an inorder traversal on any binary search tree yields a sorted key sequence in $Θ(n)$ time complexity.

### **Red-Black Trees**

A red-black tree is a self-balancing binary search tree. By assigning each node a "red" or "black" color attribute and following a specific set of rules, it ensures that the longest path from the root to a leaf is never more than twice the length of the shortest path, thereby maintaining the tree's height at logarithmic level $O(\lg n)$, ensuring that operations like search, insertion, and deletion maintain high performance even in the worst case.

The core of red-black trees is that they're not just binary search trees—they must always satisfy the following five "red-black properties." It's the combined effect of these properties that enables red-black trees to self-maintain balance.

First, we need to understand the structure of red-black trees. In addition to having `key` (key value), `left` (left child), `right` (right child), and `p` (parent) like ordinary binary search trees, each node additionally stores a `color` property whose value is either "red" or "black."

Below are the five properties that red-black trees must observe:

1. **Every node is either red or black.**

   This is the most basic color rule, ensuring each node has a definite color state.

2. **The root node must be black.**

   This rule ensures that paths starting from the root always begin with a black node.

3. **Every leaf node (NIL) is black.**

   The "leaf node" here is a very critical concept. In the theoretical model of red-black trees, it doesn't refer to key-value nodes without children, but to the empty (NIL) positions being pointed to. For convenience in code implementation, usually a single black node `T.nil` called a "sentinel" is used to represent all these NIL leaves, as well as the root node's parent.

4. **If a node is red, then both its children must be black.**

   This property is one of the keys to maintaining balance. It directly prohibits two consecutive red nodes from appearing on any path. This also means that on any path downward from any node, the number of red nodes won't exceed the number of black nodes.

5. **For each node, every simple path from that node to all its descendant leaf nodes contains the same number of black nodes.**

   This property is the most ingenious and powerful rule of red-black trees. It defines a concept called "**black-height**," which is the number of black nodes on any path from a node `x` downward (not including `x` itself) to its descendant leaf nodes, denoted as $\operatorname { b h } ( x )$. This rule ensures that for any node, all downward paths have equal "black length." Combined with the fourth property, this ensures no path is much longer than others, keeping the tree "approximately balanced."

Standard binary search trees perform well in ideal situations, but they have a fatal flaw: their performance entirely depends on the tree's height `h`, and all basic operations have a time complexity of $O(h)$. If inserted data is random, the expected tree height is $O(\lg n)$, with excellent performance. But if the inserted data is already sorted (for example, inserting 1, 2, 3, 4, 5 in order), the binary search tree degenerates into a linked list, with tree height `h` becoming $n$. At this point, operation performance drops sharply to $O(n)$, completely losing the advantage of the tree structure.

The birth of red-black trees is to solve this "worst-case" performance collapse problem. Through the five properties mentioned above, it forcibly constrains the tree's structure, ensuring the tree's **height always remains at the $O(\lg n)$ level**. This way, even in the worst case, various dynamic set operations on red-black trees (such as search, insertion, deletion, finding maximum/minimum values, etc.) can **guarantee a time complexity of $O(\lg n)$**.

After introducing the above four common rooted tree types, we can use the following simple analogy to more clearly understand their relationships:

First, **Binary Tree** is the **ancestor** of this family. **Heap** and **Binary Search Tree** are two **children** of the ancestor. They inherited the ancestor's characteristics but developed completely different personalities. Finally, **Red-Black Tree** is the "**specialist**" form that **Binary Search Tree** evolved into to make itself more powerful and reliable.

## Hash Tables

A hash table is an efficient data structure that, through a special function called a hash function, directly computes and maps a key to a specific position in an array—called a slot—to achieve fast data access.

To deeply understand hash tables, we can break down its characteristics into the following core concepts:

- **Core Operation: Mapping Through Hash Function**

   The fundamental idea of hash tables is to use a **hash function**. This function's task is to transform or map a huge or even infinite "universe of keys, $U$" into a much smaller fixed array index range, typically $\{0, 1, ..., m-1\}$, where $m$ is the size of the hash table—that is, the underlying array.

  - **Hash Value**: For a given key $k$, the index value $h(k)$ computed by the hash function is its hash value.

  - **Ideal Hash Function**: A good hash function should approximate "independent uniform hashing," meaning each key should have an equal probability of being hashed to any slot, independent of where other keys are hashed. In practice, designing a fixed function that performs perfectly for all possible inputs is very difficult, so modern methods tend to randomly select one from a family of functions. This is called **random hashing**.

- **Core Problem: Collision**

   When a hash function maps two or more different keys to the same slot, this situation is called a "collision." Since the number of possible keys $|U|$ is typically much larger than the number of slots $m$, collisions are inevitable. Therefore, how to effectively handle collisions is key to hash table design, which also derives the main resolution strategies.

- **Core Strategy: Collision Resolution Methods**

   Two mainstream collision resolution methods:

  - **Chaining — External Storage**

    - **Concept**: Store all elements hashed to the same slot in a linked list. Each slot in the hash table is essentially a pointer to the head of that list.

    - **Operation**:

      - **INSERT**: Compute the hash value, directly add the new element to the front of the corresponding linked list, time complexity is $O(1)$.

      - **SEARCH**: Compute the hash value, then perform a linear search in the corresponding linked list.

      - **DELETE**: If the list is doubly linked, deletion also only requires $O(1)$ time.

    - **Performance**: Average performance depends on the "load factor" $\alpha$, defined as $\alpha = n / m$ (number of elements / number of slots). It represents the average length of each linked list. Under the assumption of independent uniform hashing, whether for successful or unsuccessful searches, average time complexity is $\Theta(1 + \alpha)$.

  - **Open Addressing — Internal Absorption**

    - **Concept**: All elements are stored directly in the hash table array itself, without using any external storage structures (like linked lists). When a collision occurs, it **probes** the next available slot in the table until finding an empty position.

    - **Probe Sequence**: Each key's probe order is determined by an extended hash function $h(k, i)$, where $i$ is the number of probes (starting from 0). A good probe sequence should be able to traverse all slots.

      - **Linear Probing**: The simplest but most clumsy. If position `i` is occupied, try `i+1`, then `i+2`... This method causes "primary clustering," where occupied slots connect into clusters, severely affecting performance.

      - **Double Hashing**: A smarter method. It uses two hash functions—one determines the starting position, the other determines the "step size" of probing. This makes probe sequences more dispersed, with performance approaching the ideal state.

    - **Performance**: Performance is also closely related to the load factor $\alpha$, but here $\alpha$ cannot exceed 1. As the table becomes fuller ($\alpha$ approaches 1), the expected number of probes to find an empty slot increases dramatically.

- **Practical Consideration: Memory Hierarchy**

   Traditional analysis typically assumes memory access time is fixed, but in modern computer architecture, the existence of CPU cache changes the rules of the game.

  - **Advantage of Linear Probing**: Although in theoretical models, linear probing has poor performance due to **primary clustering**—occupied slots tend to connect into long chains—in systems with memory hierarchy, this actually becomes an advantage. Because consecutive probes are very likely to all hit the same cache block, which is much faster than randomly accessing different memory locations.

  - **Complex Hash Functions**: Because complex computations (like encryption-level hash functions) can be completed in the CPU's fast registers, they may take less time than one main memory read. Therefore, on modern hardware, using a computationally more complex but better randomized hash function combined with linear probing that has good locality can actually achieve extremely high overall performance.

The emergence of hash tables is mainly to solve the fundamental limitations of **Direct-address Tables**.

- **Direct-address Table Concept**: This is the simplest idea—directly use key $k$ as the array index value, storing data at the $k$-th position of the array. This method is very fast, with all operations being $O(1)$.

- **Direct-address Table Dilemma**: This method is only feasible when the "universe of all possible keys $U$" is small. For example, if your keys are English words or person names (strings), the number of possible combinations is astronomical. Reserving an array slot for every possible key would require impractically large or even impossible amounts of memory space, and most of that space would be wasted.

- **Hash Table Solution**: Hash tables perfectly solve this problem. The array size they use is typically only proportional to the "number of actually stored elements," not the "number of all possible keys." Through hash functions, they compress a huge key space into a manageable array size, thereby greatly saving storage space.

The advantages of hash tables include:

- **Extremely High Average Speed**: This is the core advantage of hash tables. Under reasonable assumptions—such as using a good hash function—hash tables support insertion, search, and deletion dictionary operations with **average time complexity of** $O(1)$. This is faster than tree-based $O(\lg n)$ search time, making it an excellent choice for implementing dynamic sets requiring high-speed lookups.

- **Space Efficiency**: When the actually stored key set $K$ is very small relative to the universe of all possible keys $U$, the storage space required by hash tables is far less than direct-address tables, with extremely high space utilization.

However, hash tables still have their disadvantages:

- **Poor Worst-Case Performance**: This is the main drawback of hash tables. If the hash function is poorly designed, or if a malicious attacker deliberately constructs a specific set of keys, it might cause all keys to "collide" into the same slot. In this situation:

  - If using **Chaining**, the hash table degenerates into a linked list of length $n$, with search time degrading from $O(1)$ to $O(n)$.

  - If using **Open Addressing**, the table quickly fills up, causing subsequent operation probe counts to increase dramatically.

- **Sensitivity to Load Factor**: Especially for open addressing, when the load factor $\alpha$ increases—that is, the table becomes full—performance significantly declines.

- **Unordered Nature**: Elements in hash tables are stored according to their hash values, which is typically unordered. Therefore, hash tables are not suitable for applications requiring range queries or quickly finding maximum/minimum values, predecessor/successor elements. These operations are more efficient in ordered data structures like binary search trees.

## References

[Introduction to Algorithms, fourth edition](https://www.amazon.com/Introduction-Algorithms-fourth-Thomas-Cormen/dp/026204630X)

## Appendix

This article is part of a series. Currently, five articles have been written:

1. [Understanding Algorithms: Getting Started](../understanding-algorithms-getting-started/)
2. [Understanding Algorithms: Common Data Structures](../understanding-algorithms-common-data-structures/)
3. [Understanding Algorithms: Comparison-Based Sorting](../understanding-algorithms-comparison-based-sorting/)
4. [Understanding Algorithms: Linear-Time Sorting](../understanding-algorithms-linear-time-sorting/)
5. [Understanding Algorithms: The Selection Problem](../understanding-algorithms-selection-problem/)
