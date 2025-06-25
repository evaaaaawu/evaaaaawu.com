---
title: Mastering useEffect - Complete Guide
subtitle: A comprehensive introduction to React's useEffect and usage strategies.
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

- [Introduction to useEffect](#introduction-to-useeffect)
- [When useEffect Executes](#when-useeffect-executes)
- [useEffect accepts two parameters: setup function and dependencies, and can be summarized into three main processing steps](#useeffect-accepts-two-parameters-setup-function-and-dependencies-and-can-be-summarized-into-three-main-processing-steps)
- [useEffect Usage Strategies](#useeffect-usage-strategies)
  - [Honestly include all component values used inside effects in the dependency array](#honestly-include-all-component-values-used-inside-effects-in-the-dependency-array-this-is-the-first-method-to-consider-when-dealing-with-dependency-issues)
  - [Use functional updates to avoid unnecessary effect re-execution](#when-you-want-to-avoid-unnecessary-effect-re-execution-using-functional-updates-is-the-preferred-option)
  - [Use useReducer to handle interdependent state variables](#when-encountering-two-state-variables-with-interdependent-values-that-prevent-using-functional-updates-usereducer-is-the-solution)
  - [Define reducer inside component when calculating next state based on props](#when-you-need-to-calculate-the-next-state-based-on-props-use-usereducer-and-define-the-reducer-inside-the-component)
  - [Move functions used only inside effects into the effect](#if-certain-functions-are-only-used-inside-effects-move-the-functions-into-the-effect)
  - [Lift functions that don't use component scope data outside the component](#if-functions-are-used-by-multiple-effects-and-dont-use-any-component-scope-data-props-state-etc-lift-the-functions-outside-the-component)
  - [Use useCallback Hook for functions that need to access component internal data](#if-functions-are-used-by-multiple-effects-and-need-to-access-component-internal-state-or-props-use-the-usecallback-hook)
  - [Cancel asynchronous requests in cleanup functions](#if-useeffect-contains-asynchronous-methods-that-support-cancellation-remember-to-cancel-async-requests-in-the-cleanup-function)
  - [Use boolean variables to track component validity](#if-useeffect-contains-asynchronous-methods-that-dont-support-cancellation-the-simplest-workaround-is-using-a-boolean-variable-to-track-component-validity)

## Introduction to useEffect

useEffect is a built-in Hook provided by React, primarily used for connecting to external systems such as servers, browser APIs, or third-party libraries (since these aren't handled by React itself, they're called external systems).

React function components need to be pure functions, but when we need to perform operations with side effects—like API calls or using third-party libraries—we need to put this code inside useEffect. This solves the negative impacts that side effects can cause:

- The cumulative side effects from multiple executions of React component functions can have unpredictable impacts.

- Side effects in React component functions might slow down or even block the function's own computation flow.

- When side effects in React component functions involve asynchronous follow-up effects, the execution order of multiple side effects may not match the response order of asynchronous events, leading to race condition problems.

- When side effects in React component functions start persistent monitoring tasks (like subscribing to events) without handling the corresponding unsubscription, they might continue monitoring even after component unmount, causing memory leak issues.

An important concept when using useEffect is that React function components have "render isolation." This works by creating a complete "snapshot" for each render, including props, state, event handlers, effects, and all other variables and functions at that moment. Therefore, we must recognize that useEffect, like function components, follows the principle: "each render is independent and has its own everything." Conceptually, we should think of useEffect as a synchronization tool rather than a lifecycle method.

## When useEffect Executes

1. When a component is mounted, useEffect runs for the first time.

2. On each component re-render, if any dependency values have changed, the old props and state execute the cleanup function (if any), then the setup function runs with the new props and state.

   More specifically, if useEffect contains a cleanup function, its execution timing will be after the new function component renders the UI, the browser paints, and the user sees the new UI, then it starts cleaning up the previous effect.

   The actual execution order would look like this example:

   1. React renders UI (corresponding to `{id: 20}`)

   2. Browser paints, user sees the new UI

   3. React cleans up the previous effect (still `{id: 10}`)

   4. React runs the new effect (corresponding to `{id: 20}`)

3. The cleanup function code executes one final time when the component lifecycle ends (unmount).

## useEffect accepts two parameters: setup function and dependencies, and can be summarized into three main processing steps

1. Define an effect function (setup function)

   The setup function contains code for connecting to external systems. Wrapping it in useEffect isolates the timing of side effect execution from the component render process, moving side effect handling to after each render flow completes, avoiding side effects directly blocking UI generation and updates.

2. Add a cleanup function to the setup function to clean up side effects (if needed)

   If cleanup logic is needed, you can return a cleanup function from the setup function. This allows developers to define side effects within component functions while also specifying how to clean up the impacts of those side effects through the "cleanup function." The cleanup function runs before each side effect re-execution and when the component unmounts, preventing the impacts of side effects from accumulating. The specific approach is to return another function as the cleanup function within the effect function and handle side effect cleanup or reversal within it.

3. Specify dependencies

   The dependencies parameter is an optional array that can include props, state, or any variables used in the component. When provided, React uses the [Object.is](Object.is) algorithm for comparison—if any value in dependencies differs from the previous time, this useEffect will re-execute. This allows useEffect to specify a dependency array for the effect function to skip unnecessary side effect processing.

   However, it's important to note that dependencies are a performance optimization, not execution timing control. They're used to determine "when it's safe to skip" rather than specifying "only when it will execute." When dependencies haven't updated, the behavior of "skipping side effect execution" isn't absolutely guaranteed, so please don't lie about dependencies!!! Following this principle, React officially provides a linter tool specifically to help developers detect and even automatically fix hooks dependencies. This ESLint React hooks linter rule is already built into integrated development environments like Create React App or Next.js. Additionally, we need to install the corresponding ESLint plugin in our code editor to see linter warning prompts when dependencies have issues and use the corresponding auto-fix functionality.

   Also, "not providing dependencies parameter" and "providing an empty array \[ \] as dependencies parameter" have completely different meanings and execution effects.

   - **Not providing dependencies parameter**: Maintains useEffect's default behavior, meaning the effect function executes once after every render.

   - **Providing an empty array \[ \] as dependencies parameter**: Indicates this effect function doesn't depend on any data, so the component can safely skip effect function execution on every re-render.

## useEffect Usage Strategies

### "Honestly include all component values used inside effects in the dependency array." This is the first method to consider when dealing with dependency issues.

Specific example:

<picture>
  <source srcset="/images/article-contents/webp/mastering-useeffect-overall/code-1.webp" type="image/webp">
  <img src="/images/article-contents/png/mastering-useeffect-overall/code-1.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

### When you want to avoid unnecessary effect re-execution, "using functional updates" is the preferred option.

**Usage conditions**

- When you want to avoid unnecessary effect re-execution

- If state variables are simple (no interdependencies), and when you find the effect depends on a state value but only to update it (if two state variables have interdependent values or need to calculate the next state based on props, functional updates won't suffice in these cases)

- When you want to batch multiple updates

**Specific example**

<picture>
  <source srcset="/images/article-contents/webp/mastering-useeffect-overall/code-2.webp" type="image/webp">
  <img src="/images/article-contents/png/mastering-useeffect-overall/code-2.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

### When encountering two state variables with interdependent values that prevent using functional updates, "using useReducer" is the solution.

Specific example:

<picture>
  <source srcset="/images/article-contents/webp/mastering-useeffect-overall/code-3.webp" type="image/webp">
  <img src="/images/article-contents/png/mastering-useeffect-overall/code-3.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

### When you need to calculate the next state based on props, use useReducer and "**define the reducer inside the component**" as the solution.

Specific example:

<picture>
  <source srcset="/images/article-contents/webp/mastering-useeffect-overall/code-4.webp" type="image/webp">
  <img src="/images/article-contents/png/mastering-useeffect-overall/code-4.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

### **If certain functions are only used inside effects, "**move the functions into the effect\*\*"

Specific example:

<picture>
  <source srcset="/images/article-contents/webp/mastering-useeffect-overall/code-5.webp" type="image/webp">
  <img src="/images/article-contents/png/mastering-useeffect-overall/code-5.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

<picture>
  <source srcset="/images/article-contents/webp/mastering-useeffect-overall/code-6.webp" type="image/webp">
  <img src="/images/article-contents/png/mastering-useeffect-overall/code-6.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

### If functions are used by multiple effects and don't use any component scope data (props, state, etc.), "**lift the functions outside the component**"

Specific example:

<picture>
  <source srcset="/images/article-contents/webp/mastering-useeffect-overall/code-7.webp" type="image/webp">
  <img src="/images/article-contents/png/mastering-useeffect-overall/code-7.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

### If functions are used by multiple effects and need to access component internal state or props, "**use the useCallback Hook**"

Specific example:

<picture>
  <source srcset="/images/article-contents/webp/mastering-useeffect-overall/code-8.webp" type="image/webp">
  <img src="/images/article-contents/png/mastering-useeffect-overall/code-8.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

This solution also applies to function props passed down from parent components:

<picture>
  <source srcset="/images/article-contents/webp/mastering-useeffect-overall/code-9.webp" type="image/webp">
  <img src="/images/article-contents/png/mastering-useeffect-overall/code-9.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

`useCallback` essentially "**adds another layer of dependency checking**." It doesn't avoid function dependencies but makes the function itself change only when necessary.

`useCallback` allows functions to become part of the data flow by linking the function's identity to its dependencies:

<picture>
  <source srcset="/images/article-contents/webp/mastering-useeffect-overall/code-10.webp" type="image/webp">
  <img src="/images/article-contents/png/mastering-useeffect-overall/code-10.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

### If useEffect contains asynchronous methods that support cancellation, remember to cancel async requests in the cleanup function.

Specific example:

<picture>
  <source srcset="/images/article-contents/webp/mastering-useeffect-overall/code-11.webp" type="image/webp">
  <img src="/images/article-contents/png/mastering-useeffect-overall/code-11.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

### If useEffect contains asynchronous methods that don't support cancellation, the simplest workaround is using a boolean variable to track component validity.

Specific example:

<picture>
  <source srcset="/images/article-contents/webp/mastering-useeffect-overall/code-12.webp" type="image/webp">
  <img src="/images/article-contents/png/mastering-useeffect-overall/code-12.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>
