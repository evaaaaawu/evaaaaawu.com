---
title: "Understanding Algorithms: Getting Started"
subtitle: Deeply explore the nature of algorithms, efficiency analysis frameworks, design strategies, and their theoretical limits.
author: src/content/authors/eva.json
imageWebp: /images/articles/webp/understanding-algorithms-getting-started.webp
imagePng: /images/articles/png/understanding-algorithms-getting-started.png
imgAlt: Understanding Algorithms_Getting Started
creationDate: 2025-11-28
updateDate: 2025-11-28
tags:
  - Algorithm
featured: false
---

In everyday life, we might often hear conversations like these:

"I don't know why YouTube's algorithm recommended this video to me."

"Why does the algorithm show me this ad?"

Algorithms have long become a term frequently heard by the general public today.

But what exactly is an algorithm?

## Algorithms and Their Importance

In a concise definition, an algorithm is a well-defined computational procedure that takes one or a set of values as **input** and produces one or a set of values as **output** within finite time. In other words, an algorithm is a series of computational steps that transform input into output. You can also view it as a tool for solving a well-specified computational problem.

Algorithms have an extremely wide range of applications and are the cornerstone of modern computer technology. At the application level, including the Human Genome Project, internet search engines, e-commerce encryption, and industrial manufacturing resource allocation, all these applications have algorithms operating behind them, serving as the key to solving various practical problems. In computer technology, whether it's hardware chip design, graphical user interfaces (GUI), network routing, or programming language compilers, algorithms are operating behind all these computer technologies; additionally, machine learning, which has become popular in recent years, is essentially a collection of algorithms.

Most people might find it hard to imagine that as a technology, the importance of algorithms is actually no less than that of hardware. The reason for saying this is that through scientists' experiments, the efficiency advantage of algorithms far exceeds the performance difference in hardware, especially when dealing with large-scale problems.

## Algorithm Efficiency Analysis

After briefly understanding what algorithms are and their importance, the next important question is: **How can we systematically evaluate the efficiency of an algorithm and make meaningful comparisons with other algorithms?**

First, to evaluate the efficiency of an algorithm, we must first have a fair baseline. Therefore, I'll introduce an abstract computational model called the **RAM model**.

The full name of the RAM model is Random-Access Machine model. It is an **abstract, idealized computer model** used when analyzing algorithm efficiency.

We can imagine it as a general-purpose single-processor computer. When it operates, it has the following key simplifying assumptions:

- **Sequential Execution**: All instructions are executed one after another in order, without any concurrent operations happening simultaneously.

- **Uniform Cost**: The model assumes that each basic instruction (such as addition, subtraction, multiplication, division and other arithmetic operations, or data operations like loading and storing) takes a fixed constant time.

The main purpose of this model is to provide a unified standard, allowing us to focus on the efficiency of the algorithm's steps themselves, without worrying about differences brought about by specific hardware, programming languages, or operating systems. Although it ignores complex mechanisms like cache or virtual memory in real computers, it is usually very effective for predicting and comparing algorithm efficiency.

Next, we need to know that in algorithm analysis, we typically care most about **worst-case analysis**, because it provides a reliable upper bound guarantee for the algorithm's execution time, and in many practical applications, the worst case or "average case" close to it is actually quite common.

The above two points explain that we have established a performance analysis framework for evaluating an algorithm's efficiency. Next, we'll introduce another important concept that allows us to effectively analyze algorithm efficiency: **Order of Growth**.

Calculating the exact expression for an algorithm's execution time is usually too complex and unnecessary, because when the input size `n` becomes large enough, the execution time is mainly determined by the fastest-growing term—what we call the **order of growth**—while the influence of constant multiples and lower-order terms can be ignored. To concisely express this concept, we use a set of standardized mathematical tools—**Asymptotic Notation**—to express this approach to analyzing algorithm efficiency that only focuses on scale growth, which is analyzing the algorithm's **Asymptotic Efficiency**.

**Asymptotic efficiency** studies how an algorithm's execution time grows with input size as the input size approaches infinity. This is an analytical approach that focuses on performance under "limit" conditions.

We have the following five types of **asymptotic notation** available:

- **$\pmb{O}$-notation (Big O notation)**

  - **Definition**: Provides an **asymptotic upper bound** for a function. If a function $f(n)$ is $O(g(n))$, it means that when $n$ is large enough, the growth rate of $f(n)$ will not be faster than a constant multiple of $g(n)$.

  - **Intuitive Understanding**: Provides a "worst-case" guarantee for an algorithm's execution time, indicating that the execution time growth **will not exceed** a certain bound.

- **$\pmb{\Omega}$-notation (Big Omega notation)**

  - **Definition**: Provides an **asymptotic lower bound** for a function. If a function $f(n)$ is $\Omega(g(n))$, it means that when $n$ is large enough, $f(n)$ grows at least as fast as a constant multiple of $g(n)$.

  - **Intuitive Understanding**: Provides a "best-case" guarantee for an algorithm's execution time, indicating that the execution time growth **will not be lower than** a certain bound.

- **$\pmb{\Theta}$-notation (Big Theta notation)**

  - **Definition**: Provides an **asymptotically tight bound** for a function. If a function $f(n)$ is $\Theta(g(n))$, it means it is both $O(g(n))$ and $\Omega(g(n))$. That is, when $n$ is large enough, the growth rate of $f(n)$ and the growth rate of $g(n)$ are the same within a constant factor range.

  - **Intuitive Understanding**: Most precisely describes the growth rate of an algorithm's execution time.

- **$o$-notation (Little o notation)**

  - **Definition**: Provides an **upper bound that is not asymptotically tight**. If $f(n) = o(g(n))$, it means $f(n)$ grows much slower than $g(n)$.

  - **Difference from Big O**: $O$ allows the same growth rate (such as $2n^2 = O(n^2)$), while $o$ requires the growth rate to be strictly slower (such as $2n = o(n^2)$, but $2n^2 \neq o(n^2)$).

- **$\pmb{\omega}$-notation (Little omega notation)**

  - **Definition**: Provides a **lower bound that is not asymptotically tight**. If $f(n) = \omega(g(n))$, it means $f(n)$ grows much faster than $g(n)$.

  - **Difference from Big Omega**: $\Omega$ allows the same growth rate, while $\omega$ requires the growth rate to be strictly faster.

## Algorithm Design Strategies

Besides evaluating an algorithm's efficiency in a good way being important, looking further upstream, having a good set of algorithm design strategies is also very important.

So the next question is: **How can we better design algorithms?**

Many useful algorithms are recursive in structure: to solve a given problem, they recursively—that is, call themselves—one or more times to deal with subproblems similar to the original problem but smaller in size. These algorithms typically follow the **divide-and-conquer** approach. They break the problem down into several subproblems similar to the original problem but smaller in size, recursively solve these subproblems, and then combine these solutions to form a solution to the original problem.

In divide-and-conquer, if the problem size is small enough—the base case—we solve it directly without recursion. Otherwise—the recursive case—we perform three characteristic steps:

- **Divide:** Partition the problem into one or more smaller subproblems of the same type.

- **Conquer:** Conquer these subproblems by solving them recursively.

- **Combine:** Combine the solutions of the subproblems to form a solution to the original problem.

Using divide-and-conquer is one good algorithm design strategy. Another strategy that can help us better design algorithms is using **data structures**.

A data structure is a way of storing and organizing data, with the purpose of making data access and modification more convenient.

There are many types of data structures, and selecting the appropriate data structure for a specific problem is an important part of algorithm design.

## The Challenge of Algorithms

Now we have a preliminary understanding of how to design algorithms well and evaluate their efficiency. Finally, let's also discuss the current challenges in algorithms.

Regarding algorithm challenges, there currently exists a class of problems called **NP-complete** for which no one has been able to find efficient solutions. There are three reasons:

- **Uncertainty**: Although efficient solutions haven't been found yet, no one has been able to prove that such solutions "absolutely don't exist."

- **Interconnectedness**: All NP-complete problems form a "community of fate." As long as an efficient solution is found for any one of these problems, then all NP-complete problems can be solved.

- **Similarity**: They are often extremely similar to certain problems known to have efficient solutions. Minor differences in problem description can cause the difficulty to jump from "easy" to "difficult."

The practical significance of understanding NP-complete problems is: when the problem we encounter is proven to be NP-complete, we shouldn't waste time looking for a perfect optimal solution. At this time, a more pragmatic strategy is to turn to developing "approximation algorithms" that, while unable to guarantee finding the optimal solution, can provide a sufficiently good answer within a reasonable time.

## References

[Introduction to Algorithms, fourth edition](https://www.amazon.com/Introduction-Algorithms-fourth-Thomas-Cormen/dp/026204630X)

## Appendix

This article is part of a series. Currently, five articles have been written:

1. [Understanding Algorithms: Getting Started](../understanding-algorithms-getting-started/)
2. [Understanding Algorithms: Common Data Structures](../understanding-algorithms-common-data-structures/)
3. [Understanding Algorithms: Comparison-Based Sorting](../understanding-algorithms-comparison-based-sorting/)
4. [Understanding Algorithms: Linear-Time Sorting](../understanding-algorithms-linear-time-sorting/)
5. [Understanding Algorithms: The Selection Problem](../understanding-algorithms-selection-problem/)
