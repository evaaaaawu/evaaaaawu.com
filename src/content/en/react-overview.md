---
title: React Overview
subtitle: An overview of React based on the book "React Thinking Evolution", aiming to provide a big picture of the entire React ecosystem.
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

I've spent a considerable amount of time recently trying to understand React. I want to document my current understanding of its basic structure, so this article will attempt to provide an overview perspective, showing the big picture of React. If I want to delve into more specific details, I'll write separate articles for those topics.

## Table of Contents

- [Origin](#origin)
- [Two Concepts You Need to Know Before Starting](#two-concepts-you-need-to-know-before-starting)
  - [Browser API Interface for Other Programming Languages: DOM](#browser-api-interface-for-other-programming-languages-dom)
  - [Design Pattern: Unidirectional Data Flow](#design-pattern-unidirectional-data-flow)
- [DOM Rendering Strategy to Implement Unidirectional Data Flow](#dom-rendering-strategy-to-implement-unidirectional-data-flow)
- [Using the Virtual DOM Concept for Complete Redrawing to Solve Performance Issues of Direct DOM Redrawing](#using-the-virtual-dom-concept-for-complete-redrawing-to-solve-performance-issues-of-direct-dom-redrawing)
  - [Additional Benefit of Using Virtual DOM: Separating Screen Management into Two Independent Phases - "Definition Phase" and "Actual Rendering Phase"](#additional-benefit-of-using-virtual-dom-separating-screen-management-into-two-independent-phases---definition-phase-and-actual-rendering-phase)
- [Implementation of Virtual DOM Concept in React: React Element](#implementation-of-virtual-dom-concept-in-react-react-element)
- ["Syntactic Sugar" for Creating React Elements: JSX Syntax](#syntactic-sugar-for-creating-react-elements-jsx-syntax)
- [Developer-Defined UI Component Blueprint: Component](#developer-defined-ui-component-blueprint-component)
  - [Mechanism for Passing Specific Parameters from Outside to Inside a Component: Props](#mechanism-for-passing-specific-parameters-from-outside-to-inside-a-component-props)
  - [Special Functions That Can Only Be Called in the Top-Level Scope of Function Components aka React APIs: Hooks](#special-functions-that-can-only-be-called-in-the-top-level-scope-of-function-components-aka-react-apis-hooks)
- [Three Major Lifecycle Phases of a Component](#three-major-lifecycle-phases-of-a-component)
  - [mount = render](#mount--render)
  - [update = re-render = reconciliation](#update--re-render--reconciliation)
  - [unmount](#unmount)
- [The Core Entity of the Latest Application State and UI Structure: Fiber Node](#the-core-entity-of-the-latest-application-state-and-ui-structure-fiber-node)
- [Summary](#summary)
- [Reference](#reference)

## Origin

I don't intend to discuss the origins of React here, but if you're interested, I highly recommend watching the YouTube documentary [How A Small Team of Developers Created React at Facebook | React.js: The Documentary](https://www.youtube.com/watch?v=8pDqJVdNa44) by the [Honeypot](https://www.youtube.com/@Honeypotio/videos) channel. Alternatively, you can read the reflections on this documentary written by [ExplainThis](https://www.explainthis.io/en): [React Documentary Reflections 1 — Rethinking Best Practices](https://www.explainthis.io/zh-hant/swe/react-documentary/part1) and [React Documentary Reflections 2 — Community-Driven Innovation](https://www.explainthis.io/zh-hant/swe/react-documentary/part2).

## Two Concepts You Need to Know Before Starting

### Browser API Interface for Other Programming Languages: DOM

React is a JavaScript UI library. When writing web applications, if you want to manipulate the browser's UI, you must do so through the browser's API interface for other programming languages: the DOM. The DOM uses a tree structure to store web elements, with each part of the tree called a node. The root node at the top is the document, representing the webpage itself.

### Design Pattern: Unidirectional Data Flow

React uses a "unidirectional data flow" design pattern. The core concept is "data-driven UI," meaning the UI only updates when the data changes. Since this is a one-way process, the UI won't change for any reason other than data changes. This ensures that the main factor affecting UI is limited to "data," and when data updates, the corresponding bound UI elements automatically change, thereby improving the reliability and maintainability of frontend applications.

## DOM Rendering Strategy to Implement Unidirectional Data Flow

After understanding the concepts of DOM and unidirectional data flow, we need to understand how React uses the unidirectional data flow design pattern to manipulate the DOM for browser rendering/updating.

Before explaining React's approach, we should recognize that directly manipulating the DOM is performance-intensive because it triggers the browser's rendering engine to redraw the screen. Therefore, a key aspect of frontend performance optimization is reducing DOM operations by minimizing the scope of DOM manipulations needed for UI changes.

Given this premise, a more intuitive approach to implementing unidirectional data flow for DOM rendering would be "manually modifying all DOM elements that should be updated when data changes." The advantage of this approach is reducing unnecessary DOM operations, but the disadvantage is relying entirely on manual DOM manipulation, which becomes extremely difficult to manage comprehensively in complex applications. Vue.js is a framework that adopts this method while solving the challenges of manual DOM manipulation.

Another more radical approach to implementing unidirectional data flow for DOM rendering is "clearing all DOM elements of the entire screen when data updates, then completely redrawing based on the latest data." This directly solves the difficulty of manual DOM manipulation mentioned above. Developers only need to focus on data updates and template definitions without manually maintaining the DOM. While more intuitive and simple, this approach clearly violates our key principle of frontend performance optimization: reducing DOM operations. It causes significant performance waste, affecting user experience in large, complex applications. React is a framework that adopts this method while solving the performance waste problem of complete redrawing.

## Using the Virtual DOM Concept for Complete Redrawing to Solve Performance Issues of Direct DOM Redrawing

How does React solve the performance waste problem of complete redrawing? The answer is by using the "Virtual DOM" concept for complete redrawing.

What is the Virtual DOM? The Virtual DOM is simply a concept. Its essence is ordinary JavaScript object data that creates a "virtual screen structure" (think of it as a prototype for screen rendering) to simulate and correspond to the actual DOM's screen structure. The implementation process works like this: when the screen needs updating, React first generates a new Virtual DOM structure, then compares it in detail with the old Virtual DOM structure, and finally executes DOM operations only on the differences to reduce performance costs.

### Additional Benefit of Using Virtual DOM: Separating Screen Management into Two Independent Phases - "Definition Phase" and "Actual Rendering Phase"

Besides optimizing DOM operation performance, the Virtual DOM has another benefit: separating screen management into two independent phases: "defining and managing screen structure descriptions (reconciler)" and "rendering these descriptions into actual screen products (renderer)." The reconciler is universal across environments (as long as JavaScript can run in that environment), while the renderer can be arbitrarily replaced, allowing React to manage and produce UIs or screens beyond the browser DOM (e.g., React Native for Android/iOS app screens, React-pdf for generating PDF documents).

## Implementation of Virtual DOM Concept in React: React Element

A React element is React's implementation of the Virtual DOM concept - a virtual screen structure element that serves as the smallest unit for describing and composing the screen. More specifically, it's an ordinary JavaScript object that describes an expected actual DOM element structure.

It's important to note that React elements are immutable once created because they describe a version of the screen structure at a specific time, like a historical record of the screen structure. Due to this immutability, when generating a new React element, React can compare it with the previous version to identify exactly which parts of the DOM need to be updated, achieving minimal DOM operations to reduce performance costs.

In practical syntax, we can create a React element by calling React's createElement method. While React elements correspond to DOM elements, some property naming conventions differ: commonly, all properties and attributes (including event handlers) use camel case naming (exceptions: aria-_ and data-_), and properties involving JavaScript built-in reserved words are renamed to avoid unexpected situations (e.g., class → className).

## "Syntactic Sugar" for Creating React Elements: JSX Syntax

JSX syntax is "syntactic sugar" for the React.createElement method. It looks like HTML syntax because it was deliberately designed to mimic HTML syntax and development experience, but it is fundamentally different from HTML.

JSX code is transpiled at build time, with common transpilation tools being Babel and the TypeScript compiler. An optimization method for React.createElement during transpilation is calling the \_jsx method of jsx-runtime (supported since React 17). Both React.createElement() and \_jsx() are methods for creating React elements, with the difference being that the \_jsx method includes some additional optimizations. Note that the \_jsx method of jsx-runtime can only be called through JSX syntax transpilation by a transpiler and cannot be written directly like the React.createElement method.

When writing JSX syntax, there are some points to note. For instance, JSX syntax can only have one node at the first level because a piece of JSX equals one call to the React.createElement method, so it only returns "one React element," and one React element represents a tree data structure (which can only have one root node). Therefore, if there are multiple nodes, they need to be wrapped in a common parent element. React has created a special built-in element type for this purpose: Fragment, which can serve as a container but doesn't produce a corresponding actual DOM element. We typically use the shorthand empty tag <> to express a Fragment-type React element.

Another point to note is how various data types are handled when used as children of React elements and converted to the DOM: strings are printed directly; numbers are converted to strings and then printed; boolean values of false, null, and undefined are ignored; arrays are flattened into multiple child elements and all printed in sequence; and be careful that objects and functions cannot be converted and will cause errors.

In practical syntax, JSX syntax requires strict tag closure, so even tags that don't need to be closed in HTML syntax (e.g., `<br>`, `<img>`, `<input>`) must be closed when writing JSX syntax. Additionally, we can use self-closing shorthand syntax to represent tags without children (e.g., `const img = <img src="./image.jpg" />`).

Furthermore, JSX syntax has two main ways of expressing data: literals (e.g., strings) and expressions (e.g., variables). For literal data expression, the format is similar to HTML syntax: literal values for attributes use double quotes " "; literal values for children can be written directly. Expression data uses JSX's specified syntax { } to enclose it, such as "variables" or "expressing another piece of JSX syntax as a child element within JSX syntax" are types of expressions. In the second scenario, you don't have to write { } because JSX syntax also supports writing child element tags directly between the parent element's opening and closing tags, to provide a development experience closer to writing HTML syntax.

## Developer-Defined UI Component Blueprint: Component

To summarize what we've covered so far: React is a UI library/framework designed based on the principle of "unidirectional data flow." For its DOM rendering strategy, it uses the approach of "clearing all DOM elements of the entire screen when data updates, then completely redrawing based on the latest data" to implement unidirectional data flow. However, to solve the performance waste problem of frequently clearing and redrawing everything on the DOM, React doesn't perform these operations directly on the DOM. Instead, it introduces the Virtual DOM concept to first simulate the actual DOM's screen structure using JavaScript object format for complete redrawing. This Virtual DOM concept is implemented in React as React elements, so a React element is actually a virtual screen structure element that serves as the smallest unit for describing and composing the screen. But in practice, we usually don't write React elements directly; instead, we encapsulate them within Components.

A Component can be thought of as a template or building block. It's a developer-defined UI component blueprint that receives developer-customized props data as parameters and returns a React element as the structure of a screen section.

We can understand that a Component actually returns a React element. Besides containing React elements corresponding to actual DOM elements, a Component can also contain and call other Components as sub-Components, like assembling building blocks.

The essence and significance of designing Components is to abstract based on requirements and logical meaning, categorizing features and behaviors of concern, designing a process or logic suitable for specific scenarios and semantic ranges, and encapsulating implementation details for reuse.

In the function component era, we define Components as "functions" because they define "the process and logic for generating a specific screen." They are a kind of "description," not a fixed screen that has already been generated. So the same Component (imagine it as a blueprint) can be called multiple times, and each instance of the Component is independent, allowing for customization according to requirements.

In practical syntax, the first letter of a Component name must be capitalized to distinguish it from regular element tags. This way, when a tag name is lowercase, React treats it as a string when creating a React element; when a tag name is capitalized, React treats it as a variable name.

Additionally, there are two ways to export Components: default export and named export. A JS file can only have one default export but can have multiple named exports. For default export, we can use export default to export the Component and import ComponentName from 'file path' to import it.

### Mechanism for Passing Specific Parameters from Outside to Inside a Component: Props

Props, short for properties, are the properties of a Component. They provide a mechanism for passing specific parameters from outside to inside a Component blueprint when calling it. This allows us to customize the screen generation process based on the parameters passed in, accommodating more usage scenarios.

React doesn't impose any restrictions on what data types can be passed as Props to a Component. Notably, even a React element can be passed as a Props value because a React element itself is just an ordinary JavaScript object, which provides more possibilities for UI abstraction design.

It's important to note that Props are data from the outside, so they are read-only/immutable inside the Component. This is to maintain the reliability of unidirectional data flow. React typically uses Object.freeze(props) to freeze Props so you can't modify them, but there are situations that can't be detected (e.g., when directly modifying an original array using methods like push), so be careful!

In practical syntax, the first parameter received by a component function is the Props object, containing various properties we pass in when calling the Component. We can either write props directly in the parameter definition or destructure to extract the needed property data. Additionally, React has a special Prop called children. This children prop in pure React elements is limited to specific types (as mentioned in the JSX syntax section about how various data types are handled when used as children of React elements and converted to the DOM, with a reminder that objects and functions cannot be converted and will cause errors). However, in Component-type React elements, the children prop can accept any type of value without restriction because how the children prop is used in a Component is determined by the developer inside the Component.

### Special Functions That Can Only Be Called in the Top-Level Scope of Function Components aka React APIs: Hooks

Hooks are APIs provided by React. They are special functions that can only be called in the top-level scope of function components, used to inject various React core features or functionalities into Components.

Why can Hooks only be called in the top-level scope of function components? This is to ensure that some internal mechanisms of Hooks can work properly and avoid unexpected issues like data loss. The main internal mechanism is that all Hooks in a Component rely on a fixed calling order in each render to distinguish from each other, so this restriction ensures that all Hooks are called in every render process. For a concrete example, if a Hook is placed inside an if condition rather than in the top-level scope, and the condition is true during the first render of the Component so the Hook is executed, but the condition becomes false during the second render so the Hook isn't executed, we encounter a problem: remember that "all Hooks in a Component rely on a fixed calling order in each render to distinguish from each other," but if not all Hooks in a Component are definitely called during each render, it leads to misaligned order. That's why there's the restriction that "Hooks can only be called in the top-level scope of function components."

Looking at a higher level, why use "order" of calls, rather than other methods (e.g., names) to distinguish between Hooks? This is because the design of sequential function calls can solve the diamond problem.

Common Hooks in React include useState, useEffect, useCallback, useMemo, useRef, useContext, etc. Here's a preliminary introduction to two of these Hooks: useState and useEffect:

- **Hook for Defining and Accessing State: useState**

In function components, we can define and access State by calling the useState Hook. In React development conventions, we typically use array destructuring syntax to rename the state value and setState method returned by useState according to their business logic meaning (e.g., renaming the state value variable representing counter state data to count, and the corresponding setState method to setCount).

A Component can have multiple states, and React can recognize different states in the same component because of the characteristic mentioned above that Hooks use "order" to remember and distinguish from each other.

The only legal way to trigger a Component re-render is by calling the setState method to update the state value. However, note that the setState method is asynchronous. After calling the setState method, React doesn't immediately trigger a re-render but waits until all programs in the current event have finished before starting the re-render.

It's important to note that, as mentioned when introducing Props, Props are read-only/immutable inside a Component to maintain the reliability of unidirectional data flow. Similarly, State is the same. Immutable state is a crucial key to maintaining the reliability of React's data flow. State is used to represent a Component's state data at a certain historical moment (a certain render) and should not be modified once created, otherwise it might lead to the reliability of the data flow being compromised or some mechanisms not working properly (e.g., data new/old check requirements when calling the setState method, requirements for reading old State from past renders, reference check requirements for React performance optimization mechanisms). Therefore, in React, we should not mutate an object or array-type State data but should, like dealing with primitive type values, generate a new object or array to replace the old one. However, since this is not a native feature of JavaScript for object data types, it's an important principle that must be manually maintained and adhered to entirely by developers.

- **Hook for Handling Side Effects: useEffect**

Before introducing useEffect, let's understand what an effect is: effect = side effect. When a function, besides returning a result value, also depends on or affects some system state outside the function, or interacts with the external environment, we say this function has side effects (e.g., modifying global variables outside the function, reading/writing files, database operations, network requests... are all common side effects). Reduced predictability, testing difficulties, high coupling, difficulty in maintenance and understanding, and optimization limitations are negative impacts of effects.

After understanding effects and their negative impacts, let's look at the potential negative impacts of effects in React component functions:

1. Side effects in React component functions might slow down or even block the calculation process of the function itself.

2. The accumulated impact of side effects caused by multiple executions of functions in React component functions is difficult to predict.

3. When handling side effects in React component functions involves subsequent asynchronous impacts, the order of execution of side effects may not be the same as the order of responses to asynchronous events, leading to race condition problems.

4. In React component functions, when a side effect starts continuous monitoring work (such as registering a subscription to an event) but doesn't handle the corresponding unsubscription, it might continue monitoring even after the Component unmounts, leading to memory leak problems.

The method to solve the potential negative impacts of side effects in React is to use the useEffect Hook.

It's important to note that useEffect belongs to "declarative" programming. We only care about what the expected result looks like (i.e., the destination), not how it gets there step by step. Therefore, if you try to control the effect function to only execute on the first render, you're actually violating the design thinking of useEffect itself. When the execution effect of our effect function depends on "the timing of execution in the process" rather than "what the destination is," it's easy to write unreliable side effect handling logic. Also, understand that the purpose of useEffect is to "synchronize original data to side effect handling beyond the screen," not a lifecycle API.

Using useEffect generally involves three major steps:

1. Define an effect function: useEffect can isolate the execution timing of side effects from the Component render process. It isolates the handling of side effects to execute after each render process is completed, to avoid side effect handling directly blocking the generation and updating of the screen. This solves the first potential negative impact of effects in React component functions mentioned above (slowing down/blocking the calculation process of the function itself).

2. Add a cleanup function to clean up side effects (if needed): useEffect allows developers to define side effects in the component function while also specifying how to clean up the impact caused by the side effect through defining a "cleanup function." The cleanup function is executed before each re-execution of the side effect and when the Component unmounts, to avoid the continuous accumulation of impacts caused by side effects. This solves the second to fourth potential negative impacts of effects in React component functions mentioned above (including the difficulty in predicting the accumulated impact of multiple function executions, race condition problems when side effect handling involves subsequent asynchronous impacts, and memory leak problems).

3. Specify the dependencies array of the effect function to skip some unnecessary side effect handling (optional): dependencies are a performance optimization, not a control of execution timing. They are used to determine "when it's safe to skip" rather than specifying "only when it will execute." When dependencies haven't updated, the behavior of "skipping the execution of side effects" is not absolutely guaranteed, so please don't lie about dependencies! Also, note that "not providing the dependencies parameter at all" and "providing an empty array [] as the dependencies parameter" have completely different meanings and execution effects. Not providing the dependencies parameter at all means maintaining the default behavior of useEffect, which is executing the effect function once after each render; providing an empty array [] as the dependencies parameter means this effect function doesn't depend on any data, and the component can safely skip the execution of the effect function during each re-render.

## Three Major Lifecycle Phases of a Component

Components have three major lifecycle phases: mount, update, and unmount.

### mount = render

When a component function is called and executed for the first time, it performs the first render to generate the initial state of the screen. This phase is also called mount.

The mount process goes through two phases: render phase and commit phase:

- The render phase executes the component function, using data such as Props and State to generate the React element for the initial screen, and then passes the generated React element to the commit phase for further processing.

- The commit phase converts all React elements generated by the Component in the render phase (because during the first render, there are no DOM elements corresponding to this Component instance's screen section in the browser's actual DOM yet) and creates corresponding actual DOM elements, then places them all in the actual screen through the browser's DOM API appendChild().

The state after the mount process is completed is called "mounted," meaning the Component's first render process has been completed and has successfully "mounted" to the actual browser screen. This means you can only find the DOM elements corresponding to this Component in the browser's DOM structure after it's mounted.

The entire render process can be seen as a top-down, outside-in process.

### update = re-render = reconciliation

When the internal state data of a Component changes, React executes the component function again to generate a new version of the screen corresponding to the new version of data. This process is called re-render or reconciliation, which is the update phase.

The update process also goes through the render phase and commit phase:

- Before entering the render phase, it starts with calling setState() (as mentioned when introducing the useState Hook, the only legal way to trigger a Component re-render is by calling the setState method to update the state value, so the update phase definitely starts with calling setState()). Then it uses Object.is() to compare whether the existing state value and the newly specified state value are the same. If they are, it directly terminates the subsequent process; if not, it enters the render phase.

- The render phase first updates the State data and re-renders the component function to generate a new version of React elements. Then it compares the structure of the new and old versions of React elements using the diffing algorithm to find the differences between them, and then enters the commit phase.

- The commit phase updates those actual DOM elements corresponding to the differences between the new and old React elements, to complete the browser's screen update.

Finally, although the only legal means to trigger a Component re-render is by calling the setState method to update the State value, there are actually two possible situations that can trigger a Component re-render:

1. The Component itself has defined State, and the setState method corresponding to that State is called.

2. The parent or grandparent Component of the Component has a re-render due to a setState call, so the Component itself, as a child Component, is also re-rendered.

### unmount

When a Component-type React element at that position no longer appears in the new screen structure after re-render, the corresponding Component instance enters the "unmount" phase, meaning "that section no longer needs to exist on the screen." React will clean up side effects and remove the actual DOM elements corresponding to that Component instance from the browser. The process is roughly as follows:

1. When in the new render of the application, a Component-type React element has disappeared compared to the previous render, React will consider that the corresponding Component instance at that location should be unmounted.

2. Execute the cleanup function corresponding to the Component's last side effect handling to clean up the remaining side effect impacts.

3. Remove the actual DOM elements corresponding to the Component instance from the browser.

4. React will internally remove the corresponding Component instance, which is the Fiber node we'll introduce next. This means all state data and other status data inside the Component instance will be discarded.

## The Core Entity of the Latest Application State and UI Structure: Fiber Node

The Fiber node in React serves as the core entity of the latest application state and UI structure. Its job is to store and maintain the latest state data of the current React application. Therefore, we see that the Fiber node stores the latest state data related to various Hooks in the Component, such as when we call multiple useState in a Component, the Fiber node stores the State data in a linked list data structure. Besides State data being stored in the Fiber node, the pending computation sequence when continuously calling the setState method is also stored in the Fiber node.

In the mount phase, when we first render a Component-type React element at a certain place in the screen structure, React creates a new Component instance at the corresponding position in the Fiber node tree of the entire application. Therefore, precisely speaking, a Component instance refers to a Fiber node.

In the update phase, the reconciler is responsible for scheduling the Component's render and updating the data changes to the Fiber node, then comparing the React elements rendered this time with the React elements from the previous render, and handing over to the renderer to handle the actual DOM operation updates.

## Summary

After understanding the general outline of React, I want to explain how I imagine the whole process works when using React from our programming perspective: Usually, when using React as a UI library/framework to write frontend applications, we start by writing Components using JSX syntax. Components return React elements. After generating React elements, React creates/updates Component instances at the corresponding positions in the Fiber node tree of the entire application and stores the latest state data related to various Hooks in the Component. Then, React converts the generated React elements and creates corresponding actual DOM elements to complete the browser's screen rendering/updating. Finally, if the Component uses useEffect, it executes the effect function of this render version after the screen rendering/updating is completed. If useEffect provides a cleanup function, it executes the cleanup function of the previous render version before executing the effect function of this render version (if it's the first render, this step is skipped).

## Reference

[React Thinking Evolution: Breaking Common Misconceptions and Elevating to Professional Frontend Developer](https://www.tenlong.com.tw/products/9786263336841)
