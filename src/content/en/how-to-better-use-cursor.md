---
title: How to Better Use Cursor
subtitle: Sharing my Cursor learning notes and effective usage methods.
author: src/content/authors/eva.json
imageWebp: /images/articles/webp/how-to-better-use-cursor.webp
imagePng: /images/articles/png/how-to-better-use-cursor.png
imgAlt: How to Better Use Cursor
creationDate: 2025-04-30
updateDate: 2025-04-30
tags:
  - AI
featured: true
---

## Basic Knowledge

### Three Most Essential Shortcuts

(If you're using a Mac, replace Control with Command)

- Control + K: Directly edit code or ask questions about selected code.
- Control + L: Open the AI chat assistant dialog box for interaction.
- Control + I: Activate the AI agent to automatically complete specific tasks.

### Useful Features You Might Not Know

- Cursor's Chat supports image uploads, which is extremely useful for quickly generating UI components.

## Methods to Improve Response Quality

### Cursor Rules

1. Global Cursor Rules

Open Cursor Settings, navigate to the Rules page, and write your Rules under the User Rules title.
I currently use Rules shared by Cursor employees as follows ([reference link](https://x.com/kayladotdev/status/1853272891023872450)):

<div style="color: rgba(101, 98, 90, 1);">
DO NOT GIVE ME HIGH LEVEL SHIT, IF I ASK FOR FIX OR EXPLANATION, I WANT ACTUAL CODE OR EXPLANATION!!! I DON'T WANT "Here's how you can blablabla"

- Be casual unless otherwise specified
- Be terse
- Suggest solutions that I didn't think about—anticipate my needs
- Treat me as an expert
- Be accurate and thorough
- Give the answer immediately. Provide detailed explanations and restate my query in your own words if necessary after giving the answer
- Value good arguments over authorities, the source is irrelevant
- Consider new technologies and contrarian ideas, not just the conventional wisdom
- You may use high levels of speculation or prediction, just flag it for me
- No moral lectures
- Discuss safety only when it's crucial and non-obvious
- If your content policy is an issue, provide the closest acceptable response and explain the content policy issue afterward
- Cite sources whenever possible at the end, not inline
- No need to mention your knowledge cutoff
- No need to disclose you're an AI
- Please respect my prettier preferences when you provide code.
- Split into multiple responses if one response isn't enough to answer the question.

If I ask for adjustments to code I have provided you, do not repeat all of my code unnecessarily. Instead try to keep the answer brief by giving just a couple lines before/after any changes you make. Multiple code blocks are ok.

</div>

2. Project-Specific Cursor Rules

Beyond global settings, Cursor also supports project-level prompts. To implement this, create a `.cursor` folder in your project. Then create a subfolder called `rules` inside the `.cursor` folder, and set up different prompt files.

Note: If I develop more insights after implementation, I'll update this section with additional details.

### Recommended Prompt Structure

OpenAI co-founder Greg Brockman once recommended a prompt writing approach that became widely shared on X ([reference link](https://x.com/daniel_mac8/status/1878283032215408886)):

- Goal: Clearly state what task you want the AI to complete.
- Return Format: Explicitly define the expected output format.
- Warnings: Remind AI about specific considerations when handling the task.
- Context: Provide relevant background information.

The most critical element is describing your goals and requirements with clarity.

For better context writing in Cursor, utilize these five key components:

1. Write the Cursor Rules as explained in the previous section
2. Leverage Cursor's useful indexing features to import relevant context:
   - `@file`: Reference an entire file as context.
   - `@code`: Reference specific code segments (avoiding irrelevant content).
   - `@git`: Reference Git records (such as commits, PR diffs) for convenient code reviews.
   - `@docs`: Reference technical documentation (such as Next.js official docs) to avoid outdated information.
   - `@web`: Have Cursor conduct a web search first, then answer based on the latest content (ideal for new technologies without official documentation).
3. Use "decision context" to avoid AI memory issues

   When AI output doesn't meet your expectations:

   1. Ask AI to adjust, then ask AI to summarize what should be done
   2. Put that summary in fyi.md
   3. Include fyi.md in future prompts

   Note: If I develop more insights after implementation, I'll update this section with additional details.

4. Ensure high-quality responses through the "Single Context Principle"

   The single context principle (single purpose composers) concept was shared by Cursor team member Eric Zakariasson on X ([reference link](https://x.com/ericzakariasson/status/1890018010926055578)).

   My understanding is that each conversation thread should focus on "solving one specific purpose." When I open a New chat to solve "Purpose A," but encounter unrelated issues during the conversation, I open another New chat to address those separately, then return to the original conversation to continue with "Purpose A."

   After discovering this concept, I realized I've been instinctively using this approach. I mentally categorize it as "main quest" and "side quests," creating conversation threads that branch like a tree.

5. Additional recommended tips

   - Add the following at the end of your prompts:

     <span style="color: rgba(101, 98, 90, 1);">If you need clarification or have any questions, feel free to ask.</span>

     This encourages Cursor to proactively ask questions, helping you provide more context and improving response quality. ([reference link](https://x.com/PrajwalTomar_/status/1886060043163906404))

   - To preserve key points from a lengthy conversation thread, use this prompt:

     <span style="color: rgba(101, 98, 90, 1);">Summarize what you did and output in Markdown format that I can copy directly.</span>

## Advanced Practical Applications

Below are scenarios where AI can assist during different project phases, with example prompts:

### 1. Design Phase

I strongly recommend storing technical design documents directly in your code repository.

#### Scenario: Modifying Technical Design Documents

<div style="color: rgba(101, 98, 90, 1);">
e.g., In this technical design document for the chat system, there's currently only text messaging, but the PM wants to add multimedia message sending capabilities, such as images or video. Based on the original technical design, please provide several different technical design options to support multimedia messaging.
</div>

<div style="color: rgba(101, 98, 90, 1);">
e.g., The current group chat design has limitations in scalability, making it difficult to support large groups. Please provide different design perspectives to overcome this limitation.
</div>

#### Scenario: Creating Visual Aids for Text Content

<div style="color: rgba(101, 98, 90, 1);">
e.g., This text content is difficult to read. Please add ASCII diagrams to help explain it.
</div>

<div style="color: rgba(101, 98, 90, 1);">
e.g., Please generate a Mermaid diagram based on this content.
</div>

#### Scenario: Quickly Understanding a Codebase

<div style="color: rgba(101, 98, 90, 1);">
e.g., I just joined this team and am not familiar with the codebase yet. Please help me understand the current architecture of the codebase.
</div>

<div style="color: rgba(101, 98, 90, 1);">
e.g., I want to handle Markdown format returned by language models, ensuring that what is presented to users is beautifully formatted. Does the current codebase have any relevant conversion or presentation methods?
</div>

### 2. Implementation Phase

#### Scenario: Implementing Test-Driven Development (TDD) Workflow

<div style="color: rgba(101, 98, 90, 1);">
e.g., I need to implement a function that converts HTML format to Markdown format. Please implement it using TypeScript. Before implementation, first write tests based on @fyi_test.mdc @test_jest.mdc, add the function to... If you need to validate the tests, please refer to @code_command.mdc
</div>

#### Scenario: Code Review

<div style="color: rgba(101, 98, 90, 1);">
e.g., This code mixes all the processing together, making it relatively difficult to read and maintain. Please make the code cleaner.
</div>

#### Scenario: Writing Commit Messages

Cursor's commit field has a "Generate Commit Message" button. I recommend setting global Cursor Rules to ensure that Cursor generates messages following [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). For example:

<div style="color: rgba(101, 98, 90, 1);">
When generating commit message, follow conventional commit and start with a category such as `feat:`, `chore:`, or `fix:`, and then only give one line commit message.
</div>

#### Scenario: Writing PR Messages

I recommend adding a template for PR messages in your project-specific Cursor Rules (place it in .cursor/rules/pr_generation.mdc):

```
## Background (Why)

<!-- Describe the background of this PR. Why is this PR needed? What problem does it solve? -->

## Implementation Method (How)

<!-- Describe the implementation method and architectural decisions made. -->

## Actual Changes (What)

<!-- Highlight the main changes implemented in this merge request. Specifically explain what you changed and why. -->

- [ ] Feature/Change 1
- [ ] Feature/Change 2

### Screenshots or Video References

<!-- If applicable, add design references (links), screenshots, or screen recordings -->

### Test Verification

<!-- List the test cases that have been verified. Include edge cases. -->

- [ ] Test scenario 1
- [ ] Test scenario 2
- [ ] Test scenario 3

<!-- Add any other test notes for reviewers -->

## Additional Notes

<!-- Any information that would help PR reviewers (e.g., known limitations, future todos) -->

## Related Links

<!-- Links related to the PR -->
```

With this PR template and Cursor's `@git` feature, you can use prompts like "Use the PR Generation prompt to write a description for these two commits" to generate comprehensive PR messages.

#### Scenario: Assisting with Code Review

- I recommend maintaining a Style Guide in Cursor's Docs. Combined with the `@git` feature, you can use prompts like "Review this PR using the JavaScript Style Guide" to assist with code reviews.

- In addition to the style guide, the decision context records mentioned earlier can also be useful during code reviews.

- Beyond using `@git`, you don't need to focus only on entire PRs; you can target specific files or code snippets for review. For example, import a React component file and have Cursor suggest improvements based on React best practices.

## Reference

[Cursor 入門到實戰 — 導覽｜ ExplainThis](https://www.explainthis.io/zh-hant/ai/cursor-guide)
