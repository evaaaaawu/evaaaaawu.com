---
title: How to Better Use Cursor
subtitle: Sharing my Cursor learning notes and effective usage methods.
author: src/content/authors/eva.json
imageWebp: /images/articles/webp/how-to-better-use-cursor.webp
imagePng: /images/articles/png/how-to-better-use-cursor.png
imgAlt: How to Better Use Cursor
creationDate: 2025-04-30
updateDate: 2025-06-10
tags:
  - AI
  - Digital Workflow
featured: true
---

## Before You Start Reading

- This article is primarily a curated collection of key insights from ExplainThis's [Cursor Guide](https://www.explainthis.io/zh-hant/ai/cursor-guide) and [Cursor's official documentation](https://docs.cursor.com/welcome).

- After reading this, you'll not only get up to speed with Cursor quickly, but also learn how to craft better AI prompts, especially for software development scenarios.

- Currently, this article doesn't cover how to use MCP (Model Context Protocol) with Cursor. While I have a surface-level understanding of MCP, I haven't actually implemented it in my own projects yet. I might update this article or write a new one once I gain hands-on experience.

## Table of Contents

- [Most Essential Cursor Shortcuts](#most-essential-cursor-shortcuts)
  - [Tab](#tab)
  - [Chat](#chat)
  - [Apply](#apply)
- [Cursor Features You Might Not Know About](#cursor-features-you-might-not-know-about)
  - [Cursor Chat Applications](#cursor-chat-applications)
  - [Generate Commit Message](#generate-commit-message)
- [Important Cursor Considerations](#important-cursor-considerations)
- [My Cursor User Rules](#my-cursor-user-rules)
- [My Cursor Project Rules](#my-cursor-project-rules)
- [Prompt Writing Techniques](#prompt-writing-techniques)
  - [1. Start every new conversation with the Goal, Return Format, Warnings, Context framework](#1-start-every-new-conversation-with-the-goal-return-format-warnings-context-framework)
  - [2. Ensure high-quality responses through the "Single Context Principle"](#2-ensure-high-quality-responses-through-the-single-context-principle)
  - [3. For ambiguous or complex questions, add this at the end of your prompts: "If you need clarification or have any questions, feel free to ask."](#3-for-ambiguous-or-complex-questions-add-this-at-the-end-of-your-prompts-if-you-need-clarification-or-have-any-questions-feel-free-to-ask)
  - [4. To preserve key points from lengthy conversation threads, use this prompt: "Summarize what you did and output in Markdown format that I can copy directly."](#4-to-preserve-key-points-from-lengthy-conversation-threads-use-this-prompt-summarize-what-you-did-and-output-in-markdown-format-that-i-can-copy-directly)
  - [5. Recommended prompts for documentation writing](#5-recommended-prompts-for-documentation-writing)
  - [6. Example prompts for different software development phases and scenarios](#6-example-prompts-for-different-software-development-phases-and-scenarios)
- [Reference](#reference)

## Most Essential Cursor Shortcuts

(If you're using Mac, replace Control with Command)

### Tab

When dealing with Cursor's code auto-completion, use these shortcuts:

- **Tab**: Accept everything
- **Esc**: Reject everything
- **Control + →**: Accept one piece at a time

### Chat

- **Control + K**: Edit code directly or ask questions about selected code.
- **Control + L**: Open the AI chat assistant dialog for interaction.
- **Control + I**: Activate the AI agent to automatically complete specific tasks.
- **Control + N**: Start a new conversation.

### Apply

- **Control + Enter**: Accept
- **Control + Backspace**: Reject

## Cursor Features You Might Not Know About

### Cursor Chat Applications

- Cursor Chat supports image uploads, which is incredibly useful for quickly generating UI components.
- Use **Control + T** to open and run multiple conversation threads simultaneously.

### Generate Commit Message

Cursor's commit field has a built-in "Generate Commit Message" button. I recommend setting up global Cursor Rules to ensure Cursor generates messages following **[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)**.

For example:

When generating commit messages, follow conventional commit format, starting with a category such as: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, `chore:`, `revert:`, etc., then only give one line commit message.

## Important Cursor Considerations

Cursor can read a maximum of 250 lines in normal mode and up to 750 lines in max mode.

## My Cursor User Rules

Open Cursor Settings, navigate to the Rules page, and write your Rules under the User Rules section.

<picture>
  <source srcset="/images/article-contents/webp/how-to-better-use-cursor/cursor-user-rules.webp" type="image/webp">
  <img src="/images/article-contents/png/how-to-better-use-cursor/cursor-user-rules.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

I've modified the Rules shared by Cursor employees (**[reference link](https://x.com/kayladotdev/status/1853272891023872450)**) to create my own User Rules as follows (text version available [here](https://raw.githubusercontent.com/evaaaaawu/quick-share/refs/heads/main/my-cursor-user-rules.md)):

<picture>
  <source srcset="/images/article-contents/webp/how-to-better-use-cursor/my-cursor-user-rules.webp" type="image/webp">
  <img src="/images/article-contents/png/how-to-better-use-cursor/my-cursor-user-rules.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

## My Cursor Project Rules

Beyond global settings, Cursor also supports project-level prompts. To implement this, create a `.cursor` folder in your project, then create a `rules` subfolder within `.cursor` and set up different prompt files.

I think this needs some experimentation and hands-on experience before I can share best practices. However, I've found some excellent examples worth trying in your own projects:

- **Decision Context Project Rules**: These aim to prevent AI "amnesia" through decision context. The basic approach is: whenever AI output doesn't meet expectations:

  1. Ask AI to adjust, then ask AI to summarize what should be done
  2. Put that summary in `fyi.md`
  3. Include `fyi.md` in future prompts

  For a detailed explanation, see [AddyOsmani.com - Automated Decision Logs in AI-Assisted Coding](https://addyosmani.com/blog/automated-decision-logs/) and [ExplainThis Guide 2-6](https://www.explainthis.io/zh-hant/ai/cursor-guide/2-6-avoiding-hallucinations).

- **PR Message Project Rules**: I recommend adding a PR message template to your project-specific Cursor Rules (place it in `.cursor/rules/pr_generation.mdc`). Combined with Cursor's `@git` feature, you can use prompts like "Use the PR Generation prompt to write a description for these two commits" to generate comprehensive PR messages. For templates and detailed instructions, see [ExplainThis Guide 3-6](https://www.explainthis.io/zh-hant/ai/cursor-guide/3-6-pr-description).

- **TypeScript Project Rules**: Matt Pocock provides downloadable TypeScript project rules in [Cursor Rules for Better AI Development | Total TypeScript](https://www.totaltypescript.com/cursor-rules-for-better-ai-development).

## Prompt Writing Techniques

This section isn't specifically about Cursor, but to use Cursor effectively, the fundamental principle is understanding how to craft better AI prompts.

### 1. Start every new conversation with the Goal, Return Format, Warnings, Context framework

This prompt writing approach was recommended by OpenAI co-founder Greg Brockman and became widely shared on X (**[reference link](https://x.com/daniel_mac8/status/1878283032215408886)**):

- **Goal**: Clearly state what task you want the AI to complete
- **Return Format**: Explicitly define the expected output format
- **Warnings**: Remind AI about specific considerations when handling the task
- **Context**: Provide relevant background information

By leveraging Cursor's features effectively, you can provide rich context to AI models. The most important aspect of prompting is describing your goals and requirements with crystal clarity.

### 2. Ensure high-quality responses through the "Single Context Principle"

The single context principle (single purpose composers) concept was shared by Cursor team member Eric Zakariasson on X (**[reference link](https://x.com/ericzakariasson/status/1890018010926055578)**).

My understanding is that each conversation thread should focus on "solving one specific purpose." When I open a New chat to solve "Purpose A," but encounter unrelated issues during the conversation, I open another New chat to address those separately, then return to the original conversation to continue with "Purpose A."

After discovering this concept, I realized I've been instinctively using this approach. I mentally categorize it as "main quests" and "side quests," creating conversation threads that branch like a tree.

### 3. For ambiguous or complex questions, add this at the end of your prompts: "If you need clarification or have any questions, feel free to ask."

This encourages Cursor to proactively ask questions, helping you provide more context and improving response quality (**[reference link](https://x.com/PrajwalTomar_/status/1886060043163906404)**).

### 4. To preserve key points from lengthy conversation threads, use this prompt: "Summarize what you did and output in Markdown format that I can copy directly."

### 5. Recommended prompts for documentation writing

**From existing code**

- **API Documentation**: Generate API documentation for this Express router, including all endpoints, parameters, and response formats
- **JSDoc Comments**: Add comprehensive JSDoc comments to this class, documenting all methods and their parameters
- **README Creation**: Create a README for this project that includes setup instructions, usage examples, and API overview

**From chat sessions**

- **Problem Solving**: Summarize our conversation about setting up authentication into a step-by-step guide for the team wiki
- **Architecture**: Create documentation explaining why we chose this database design, including the trade-offs we discussed
- **Debugging**: Write a troubleshooting guide based on this bug we just fixed, including symptoms and resolution steps

### 6. Example prompts for different software development phases and scenarios

**[Design Phase]**

I strongly recommend storing technical design documents directly in your code repository.

**Scenario: Modifying Technical Design Documents**

- e.g., "In this chat system technical design document, there's currently only text messaging, but the PM wants to add multimedia message capabilities like images or videos. Based on the original technical design, please provide several different technical design options to support multimedia messaging."

- e.g., "The current group chat design has scalability limitations, making it difficult to support large groups. Please provide different design perspectives to overcome this limitation."

**Scenario: Creating Visual Aids for Text Content**

When you want to create visual aids for text content, you can choose to generate ASCII or Mermaid diagrams.

- e.g., "This pure text content is hard to read, please add ASCII diagrams to help explain it."
- e.g., "Please generate a Mermaid diagram based on this content."

**Scenario: Quickly Understanding a Codebase**

- e.g., "I just joined this team and am not familiar with the codebase yet. Please help me understand the current architecture of the codebase."
- e.g., "I want to handle Markdown format returned by language models, ensuring that what's presented to users is beautifully formatted. Does the current codebase have any relevant conversion or presentation methods?"

**[Implementation Phase]**

**Scenario: Implementing Test-Driven Development (TDD) Workflow**

- e.g., "I need to implement a function that converts HTML format to Markdown format. Please implement it using TypeScript. Before implementation, first write tests based on @fyi_test.mdc @test_jest.mdc, add the function to... If you need to validate the tests, please refer to @code_command.mdc"

**Scenario: Code Review**

- e.g., "This code mixes all the processing together, making it relatively difficult to read and maintain. Please make the code cleaner."

**Scenario: Writing Commit Messages**

As mentioned in the [Cursor Features You Might Not Know About](#cursor-features-you-might-not-know-about) section, Cursor's commit field has a built-in "Generate Commit Message" button. I recommend setting up global Cursor Rules to ensure Cursor generates messages following **[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)**.

For example:

When generating commit messages, follow conventional commit format, starting with a category such as: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, `chore:`, `revert:`, etc., then only give one line commit message.

**Scenario: Writing PR Messages**

As mentioned in the [My Cursor Project Rules](#my-cursor-project-rules) section above, I recommend adding a PR message template to your project-specific Cursor Rules (place it in `.cursor/rules/pr_generation.mdc`). Combined with Cursor's `@git` feature, you can use prompts like "Use the PR Generation prompt to write a description for these two commits" to generate comprehensive PR messages. For templates and detailed instructions, see [ExplainThis Guide 3-6](https://www.explainthis.io/zh-hant/ai/cursor-guide/3-6-pr-description).

**Scenario: Assisting with Code Review**

- I recommend maintaining a Style Guide in Cursor's Docs. Combined with Cursor's `@git` feature, you can use prompts like "Review this PR using the JavaScript Style Guide" to assist with code reviews.

- In addition to the style guide, the decision context records mentioned earlier can also be useful during code reviews depending on the situation.

- Beyond using `@git`, when reviewing code with Cursor, you don't need to focus only on entire PRs; you can target specific files or code snippets for review. For example, import a React component file and have Cursor suggest improvements based on React best practices.

## Reference

- [Cursor Guide | ExplainThis](https://www.explainthis.io/zh-hant/ai/cursor-guide)
- [Cursor Docs](https://docs.cursor.com/welcome)
