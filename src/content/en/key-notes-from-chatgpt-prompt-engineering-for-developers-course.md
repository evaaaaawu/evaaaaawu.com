---
title: Key Notes from "ChatGPT Prompt Engineering for Developers" Course
subtitle: ChatGPT Prompt Engineering for Developers is a famous course launched by DeepLearning.AI after the emergence of generative AI, serving as a comprehensive AI prompt guide suitable for everyone.
author: src/content/authors/eva.json
imageWebp: /images/articles/webp/key-notes-from-chatgpt-prompt-engineering-for-developers-course.webp
imagePng: /images/articles/png/key-notes-from-chatgpt-prompt-engineering-for-developers-course.png
imgAlt: Key Notes from "ChatGPT Prompt Engineering for Developers" Course
creationDate: 2023-11-05
updateDate: 2023-11-05
tags:
  - AI
featured: true
---

"ChatGPT Prompt Engineering for Developers" is a famous course launched by [DeepLearning.AI](https://www.deeplearning.ai/) after the emergence of generative AI. Despite its name suggesting it's for developers, it serves as a comprehensive AI prompt guide suitable for everyone.

Here I'm sharing my key notes from the course:

## Table of Contents

- [Introduction](#introduction)
- [Prompting Principles](#prompting-principles)
  - [Principle 1: Write Clear and Specific Instructions](#principle-1-write-clear-and-specific-instructions)
  - [Principle 2: Give the Model Time to "Think"](#principle-2-give-the-model-time-to-think)
- [Practical Applications](#practical-applications)
  - [Summarizing](#summarizing)
  - [Inferring](#inferring)
  - [Transforming](#transforming)
  - [Expanding](#expanding)
- [Reference](#Reference)

## Introduction

LLMs (Large Language Models) can be categorized into two types: Base LLMs and Instruction Tuned LLMs.

- Base LLMs predict the next word based on their training data.

- Instruction Tuned LLMs attempt to follow instructions.

## Prompting Principles

### Principle 1: Write Clear and Specific Instructions

- **Use delimiters (e.g., < >) to clearly mark different parts of the input.**

  e.g.,

  Summarize the text delimited by < > into a single sentence.

- **Ask for structured output (e.g., HTML, JSON format).**

  e.g.,

  Generate a list of three made-up book titles along with their authors and genres.

  Provide them in JSON format with the following keys:

  book_id, title, author, genre.

- **Ask the model to check whether conditions are satisfied (verify assumptions needed for the task).**

  e.g.,

  If it contains a sequence of instructions, re-write those instructions in the following format: Step 1 / Step 2 / Step N… If the text does not contain a sequence of instructions, then simply write "No steps provided."

  You will be provided with text delimited by triple quotes.
  If it contains a sequence of instructions,
  re-write those instructions in the following format:

  Step 1 - …
  Step 2 - …
  …
  Step N - …

  If the text does not contain a sequence of instructions,
  then simply write "No steps provided."

  {text_1}

- **Provide examples of successful task completion, then ask the model to perform the same task.**

  e.g.,

  Your task is to answer in a consistent style....

### Principle 2: Give the Model Time to "Think"

- **Specify the steps required to complete a task.**

  e.g.,
  Perform the following actions: 1…/2…/3…/4…Separate your answers with line breaks.

  Perform the following actions:

  1 - Summarize the following text delimited by triple backticks with 1 sentence.

  2 - Translate the summary into French.

  3 - List each name in the French summary.

  4 - Output a json object that contains the following keys: french_summary, num_names.

  Separate your answers with line breaks.

  Text:
  {text}

  <br>

  e.g.,
  Perform the following actions: 1…/2…/3…/4…Use the following format: ...

  Your task is to perform the following actions:

  1 - Summarize the following text delimited by <> with 1 sentence.

  2 - Translate the summary into French.

  3 - List each name in the French summary.

  4 - Output a json object that contains the following keys: french_summary, num_names.

  Use the following format:

  Text: text to summarize

  Summary: summary

  Translation: summary translation

  Names: list of names in summary

  Output JSON: json with summary and num_names

  Text:
  {text}

- **Instruct the model to work out its own solution before rushing to a conclusion.**

  e.g.,

  Your task is to determine if the student's solution is correct or not.
  To solve the problem do the following:

  - First, work out your own solution to the problem including the final total.

  - Then compare your solution to the student's solution and evaluate if the student's solution is correct or not. Don't decide if the student's solution is correct until you have done the problem yourself.

  Use the following format:

  Question:
  question here

  Student's solution:
  student's solution here

  Actual solution:
  steps to work out the solution and your solution here

  Is the student's solution the same as actual solution
  just calculated:
  yes or no

  Student grade:
  correct or incorrect

## Practical Applications

### Summarizing

- **Summaries with word or sentence limits**

  e.g.,

  Your task is to generate a short summary of a product review from an ecommerce site.

  Summarize the review below, delimited by triple backticks, in at most 30 words.

  Review: {prod_review}

- **Summaries focused on specific topics**

  e.g.,

  Your task is to generate a short summary of a product review from an ecommerce site to give feedback to the Shipping deparmtment.

  Summarize the review below, delimited by triple backticks, in at most 30 words, and focusing on any aspects that mention shipping and delivery of the product.

  Review: {prod_review}

- **Using "extraction" instead of "summarization"**

  e.g.,

  Your task is to extract relevant information from a product review from an ecommerce site to give feedback to the Shipping department.

  From the review below, delimited by triple quotes extract the information relevant to shipping and delivery. 
  
  Limit to 30 words.
  
  Review: {prod_review}

### Inferring

- **Sentiment inference**

  - **Sentiment judgment (positive/negative)**

  e.g.,

  What is the sentiment of the following product review, which is delimited with triple backticks?

  Give your answer as a single word, either "positive" or "negative".

  Review text: {lamp_review}

  - **Identifying emotion types**

  e.g.,

  Identify a list of emotions that the writer of the following review is expressing. Include no more than five items in the list.

  Format your answer as a list of lower-case words separated by commas.

  Review text: {lamp_review}

  - **Identifying anger**

  e.g.,

  Is the writer of the following review expressing anger?

  The review is delimited with triple backticks.

  Give your answer as either yes or no.

  Review text: {lamp_review}

- **Extracting specific information**

  e.g.,

  Identify the following items from the review text:

  - Item purchased by reviewer

  - Company that made the item

  The review is delimited with triple backticks.

  Format your response as a JSON object with "Item" and "Brand" as the keys.

  If the information isn't present, use "unknown" as the value.

  Make your response as short as possible.

  Review text: {lamp_review}

- **Topic inference**

  e.g.,

  Determine five topics that are being discussed in the following text, which is delimited by triple backticks.

  Make each item one or two words long.

  Format your response as a list of items separated by commas.

  Text sample: {story}

- **Generating news alerts for specific topics**

  e.g.,

  Determine whether each item in the following list of topics is a topic in the text below, which is delimited with triple backticks.

  Give your answer as list with 0 or 1 for each topic.

  List of topics: {",".join(topic_list)}

  Text sample: {story}

### Transforming

- **Translation**

  e.g., Translate the following English text to Mandarin in Taiwan: ...

  e.g., Translate the following text to Mandarin in Taiwan and English pirate: ...

  e.g., Translate the following text to English in both the formal and informal forms: ...

  e.g., Tell me which language this is: ...

- **Tone transformation**

  e.g., Translate the following from slang to a business letter: ...

- **Format conversion**

  e.g., Translate the following python dictionary from JSON to an HTML table with column headers and title: ...

- **Spelling/grammar check**

  e.g.,

  Proofread and correct the following text and rewrite the corrected version.

  If you don't find any errors, just say "No errors found".

  <br>

  e.g.,

  proofread and correct this review.

  Make it more compelling.

  Ensure it follows APA style guide and targets an advanced reader.

  Output in markdown format.

### Expanding

- **Email replies**

  e.g.,

  You are a customer service AI assistant.

  Your task is to send an email reply to a valued customer.

  Given the customer email delimited by <>,

  Generate a reply to thank the customer for their review.

  If the sentiment is positive or neutral, thank them for their review.

  If the sentiment is negative, apologize and suggest that they can reach out to customer service.

  Make sure to use specific details from the review.

  Write in a concise and professional tone.

  Sign the email as `AI customer agent`.

## Reference

[ChatGPT Prompt Engineering for Developers](https://learn.deeplearning.ai/chatgpt-prompt-eng/lesson/1/introduction)
