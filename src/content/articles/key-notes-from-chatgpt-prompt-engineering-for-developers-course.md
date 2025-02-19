---
title: ChatGPT Prompt Engineering for Developers 課程重點筆記
subtitle: ChatGPT Prompt Engineering for Developers 是生成式 AI 出現後 DeepLearning.AI 推出的一堂很有名的課程，是一個適合給所有人看的使用 AI Prompt 指南。
author: src/content/authors/eva.json
imageSrc: /images/articles/key-notes-from-chatgpt-prompt-engineering-for-developers-course.png
imgAlt: Key Notes from "ChatGPT Prompt Engineering for Developers" Course
creationDate: 2023-05-14
updateDate: 2024-11-01
tags:
  - AI
featured: true
---

ChatGPT Prompt Engineering for Developers 是生成式 AI 出現後 [DeepLearning.AI](DeepLearning.AI) 推出的一堂很有名的課程，雖然課程名稱叫做 ChatGPT Prompt Engineering for Developers，但其實更像是給所有人看的使用 AI Prompt 指南。

在這裡分享我的重點筆記如下:

### Introduction

LLM（大型語言模型）可以分為兩種類型：基礎型 LLM（Base LLM）與指令調校型 LLM（Instruction Tuned LLM）。

- 基礎型 LLM 會根據文字訓練資料來預測下一個字詞。

- 指令調校型 LLM 則試圖依照指令進行操作。

### **Prompting Principles**

- **原則一：撰寫清晰且具體的指令**

   - **使用分隔符號（e.g., < >）明確標示輸入中不同的部分。**

      e.g., Summarize the text delimited by < > into a single sentence.

   - **要求結構化的輸出（e.g., HTML、JSON 格式）。**

      e.g., Provide them in JSON format with the following keys: ……

      ```plain
      Generate a list of three made-up book titles along with their authors and genres.
      Provide them in JSON format with the following keys: 
      book_id, title, author, genre.
      ```

   - **要求模型檢查是否符合條件（確認完成任務所需的假設）。**

      e.g., If it contains a sequence of instructions, re-write those instructions in the following format: Step 1 / Step 2 / Step N… If the text does not contain a sequence of instructions, then simply write "No steps provided."

      ```plain
      You will be provided with text delimited by triple quotes. 
      If it contains a sequence of instructions,
      re-write those instructions in the following format:
      
      Step 1 - …
      Step 2 - …
      …
      Step N - …
      
      If the text does not contain a sequence of instructions,
      then simply write \"No steps provided.\"
      
      \"\"\"{text_1}\"\"\"
      ```

   - **提供完成任務的成功範例，然後要求模型執行相同任務。**

      e.g., Your task is to answer in a consistent style. ……

- **原則二：給模型時間「思考」**

   - **指定完成任務所需的步驟。**

      e.g., Perform the following actions: 1…/2…/3…/4…Separate your answers with line breaks.

      ````plain
      Perform the following actions: 
      1 - Summarize the following text delimited by triple backticks with 1 sentence.
      2 - Translate the summary into French.
      3 - List each name in the French summary.
      4 - Output a json object that contains the following keys: french_summary, num_names.
      
      Separate your answers with line breaks.
      
      Text:
      ```{text}```
      ````

      e.g., Perform the following actions: 1…/2…/3…/4…Use the following format: ……

      ```plain
      Your task is to perform the following actions: 
      1 - Summarize the following text delimited by <> with 1 sentence.
      2 - Translate the summary into French.
      3 - List each name in the French summary.
      4 - Output a json object that contains the following keys: french_summary, num_names.
      
      Use the following format:
      Text: <text to summarize>
      Summary: <summary>
      Translation: <summary translation>
      Names: <list of names in summary>
      Output JSON: <json with summary and num_names>
      
      Text: <{text}>
      ```

   - **指示模型在下結論之前先自行推導出解答。**

      e.g.,

      ````plain
      Your task is to determine if the student's solution is correct or not.
      To solve the problem do the following:
      - First, work out your own solution to the problem including the final total. 
      - Then compare your solution to the student's solution and evaluate if the student's solution is correct or not. Don't decide if the student's solution is correct until you have done the problem yourself.
      
      Use the following format:
      Question:
      ```
      question here
      ```
      Student's solution:
      ```
      student's solution here
      ```
      Actual solution:
      ```
      steps to work out the solution and your solution here
      ```
      Is the student's solution the same as actual solution
      just calculated:
      ```
      yes or no
      ```
      Student grade:
      ```
      correct or incorrect
      ```
      ````

### Practical Application

- **摘要/總結**

   - **設定字數或句數限制的摘要**

      e.g., Your task is to generate a short summary of a…from…. Summarize the…below, delimited by <>, in at most…words.

      ````plain
      Your task is to generate a short summary of a product review from an ecommerce site.
      
      Summarize the review below, delimited by triple backticks, in at most 30 words. 
      
      Review: ```{prod_review}```
      ````

   - **聚焦特定主題的摘要**

      e.g., Your task is to generate a short summary of a…from…to…. Summarize the…below, delimited by <>, in at most…words, and focusing on…. 

      ````plain
      Your task is to generate a short summary of a product review from an ecommerce site to give feedback to the Shipping deparmtment. 
      
      Summarize the review below, delimited by triple backticks, in at most 30 words, and focusing on any aspects that mention shipping and delivery of the product. 
      
      Review: ```{prod_review}```
      ````

   - **使用「提取」替代「摘要」**

      e.g., Your task is to extract relevant information from…to…. From the…below, delimited by <> extract the information relevant to…. Limit to…words.

      ````plain
      Your task is to extract relevant information from a product review from an ecommerce site to give feedback to the Shipping department. 
      
      From the review below, delimited by triple quotes extract the information relevant to shipping and delivery. Limit to 30 words. 
      
      Review: ```{prod_review}```
      ````

- **推論**

   - **推論情緒**

      - **情感判斷（正面/負面）**

         e.g., What is the sentiment of the following…, which is delimited with <>? Give your answer as a single word, either "positive" or "negative".

         ```plain
         What is the sentiment of the following product review, which is delimited with triple backticks?
         
         Give your answer as a single word, either "positive" or "negative".
         
         Review text: '''{lamp_review}'''
         ```

      - **識別情緒類型**

         e.g., Identify a list of emotions that the writer of the following…is expressing. Include no more than five items in the list. Format your answer as a list of lower-case words separated by commas.

         ```plain
         Identify a list of emotions that the writer of the following review is expressing. Include no more than five items in the list. Format your answer as a list of lower-case words separated by commas.
         
         Review text: '''{lamp_review}'''
         ```

      - **識別憤怒情緒**

         e.g., Is the writer of the following review expressing anger? The review is delimited with <>. Give your answer as either yes or no.

         ```plain
         Is the writer of the following review expressing anger?
         The review is delimited with triple backticks.
         Give your answer as either yes or no.
         
         Review text: '''{lamp_review}'''
         ```

   - **提取特定資訊**

      e.g., Identify the following items from the…: ……The…is delimited with <>. Format your response as a JSON object with…as the keys. If the information isn't present, use "unknown" as the value. Make your response as short as possible.

      ```plain
      Identify the following items from the review text: 
      - Item purchased by reviewer
      - Company that made the item
      
      The review is delimited with triple backticks.
      Format your response as a JSON object with "Item" and "Brand" as the keys. 
      If the information isn't present, use "unknown" as the value.
      Make your response as short as possible.
        
      Review text: '''{lamp_review}'''
      ```

   - **推論主題**

      e.g., Determine five topics that are being discussed in the following text, which is delimited by <>. Make each item one or two words long. Format your response as a list of items separated by commas.

      ```plain
      Determine five topics that are being discussed in the following text, which is delimited by triple backticks.
      
      Make each item one or two words long. 
      
      Format your response as a list of items separated by commas.
      
      Text sample: '''{story}'''
      ```

   - **針對特定主題生成新聞提醒**

      e.g., Determine whether each item in the following list of topics is a topic in the text below, which is delimited with <>. Give your answer as list with 0 or 1 for each topic.

      ```plain
      Determine whether each item in the following list of topics is a topic in the text below, which is delimited with triple backticks.
      
      Give your answer as list with 0 or 1 for each topic.
      
      List of topics: {", ".join(topic_list)}
      
      Text sample: '''{story}'''
      ```

- **轉換**

   - **翻譯**

      e.g., Translate the following English text to Mandarin in Taiwan: ……

      e.g., Translate the following  text to Mandarin in Taiwan and English pirate: ……

      e.g., Translate the following text to English in both the formal and informal forms: ……

      e.g., Tell me which language this is: ……

   - **語氣轉換**

      e.g., Translate the following from slang to a business letter: …………

   - **格式轉換**

      e.g., Translate the following python dictionary from JSON to an HTML table with column headers and title: ……

   - **拼寫/文法檢查**

      e.g., Proofread and correct…

      ```plain
      Proofread and correct the following text and rewrite the corrected version. 
      If you don't find and errors, just say "No errors found". 
      Don't use any punctuation around the text:
      ```

      ```plain
      proofread and correct this review.
      Make it more compelling.
      Ensure it follows APA style guide and targets an advanced reader.
      Output in markdown format.
      ```

- **擴展**

   - **回覆信件**

      e.g., Given the…email delimited by <>, Generate a reply to…. Make sure to use specific details from the…. Write in a concise and professional tone.

      ````plain
      You are a customer service AI assistant.
      Your task is to send an email reply to a valued customer.
      Given the customer email delimited by ```,
      Generate a reply to thank the customer for their review.
      If the sentiment is positive or neutral, thank them for
      their review.
      If the sentiment is negative, apologize and suggest that they can reach out to customer service. 
      Make sure to use specific details from the review.
      Write in a concise and professional tone.
      Sign the email as `AI customer agent`.
      ````

### Reference

- <https://learn.deeplearning.ai/courses/chatgpt-prompt-eng/lesson/1/introduction>
