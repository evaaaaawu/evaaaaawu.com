---
title: 如何更好的使用 Cursor
subtitle: 分享我的 Cursor 學習筆記和目前的使用方法。
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

## 開始閱讀前的注意事項

- 本篇主要是看完 ExplainThis 的 [Cursor 入門到實戰](https://www.explainthis.io/zh-hant/ai/cursor-guide)和 [Cursor 的官方文件](https://docs.cursor.com/welcome)後整理的重點筆記。

- 看完後除了可以幫助快速上手 Cursor，也可以學習如何更好的使用 AI Prompts，尤其是在軟體開發方面的 AI Prompts。

- 本篇目前沒有包含如何在 Cursor 使用 MCP 的部分，因為雖然我有表層的理解 MCP 了，但並沒有真正的實作在自己的專案上過，可能會等我有實戰經驗後再更新本篇文章或是另外寫一篇新文章。

## Table of Contents

- [Cursor 最常用的快捷鍵](#cursor-最常用的快捷鍵)
  - [Tab](#tab)
  - [Chat](#chat)
  - [Apply](#apply)
- [Cursor 你可能不知道的好用功能](#cursor-你可能不知道的好用功能)
  - [Cursor Chat 的應用](#cursor-chat-的應用)
  - [Generate Commit Message](#generate-commit-message)
- [Cursor 注意事項](#cursor-注意事項)
- [我的 Cursor 的 User Rules](#我的-cursor-的-user-rules)
- [我的 Cursor 的 Project Rules](#我的-cursor-的-project-rules)
- [Prompts 撰寫技巧](#prompts-撰寫技巧)
  - [1. 每當開啟一個新的對話時，都從 Goal、Return Format、Warnings、Context 這個架構開始問起。](#1-每當開啟一個新的對話時都從-goalreturn-formatwarningscontext-這個架構開始問起)
  - [2. 透過「單一脈絡原則」，確保高品質的回覆](#2-透過單一脈絡原則確保高品質的回覆)
  - [3. 當問題較為模糊或複雜時，可以在 prompts 的最後加上：If you need clarification or have any questions, feel free to ask.](#3-當問題較為模糊或複雜時可以在-prompts-的最後加上if-you-need-clarification-or-have-any-questions-feel-free-to-ask)
  - [4. 當想要保留對話串的重點內容，可以在原本的長對話視窗中，輸入以下的 prompts：Summarize what you did and output in Markdown format that I can copy directly.](#4-當想要保留對話串的重點內容可以在原本的長對話視窗中輸入以下的-promptssummarize-what-you-did-and-output-in-markdown-format-that-i-can-copy-directly)
  - [5. 一些撰寫文件的推薦 prompts](#5-一些撰寫文件的推薦-prompts)
  - [6. 根據軟體開發的不同階段和情境，提供範例 prompts 作為靈感。](#6-根據軟體開發的不同階段和情境提供範例-prompts-作為靈感)
- [Reference](#reference)

## Cursor 最常用的快捷鍵

(如果是使用 Mac，請自行將 Control 替換成 Command)

### Tab

面對 cursor 的程式碼自動完成功能，請用下列快捷鍵回應：

- Tab：全部接受

- Esc：全部拒絕

- Control + →：一個一個接受

### Chat

- Control + K: 能讓你在程式碼中直接進行編輯，或選取某段程式碼後提出問題。

- Control + L：可以開啟 AI 聊天助手的對話框，讓你跟 AI 進行互動。

- Control + I：用來啟動 AI 代理的快捷鍵，幫助你自動完成某些任務。

- Control + N：開啟新的對話。

### Apply

- Control + Enter：接受

- Control + Backspace：拒絕

## Cursor 你可能不知道的好用功能

### Cursor Chat 的應用

- Cursor 的 Chat 也可以上傳圖片，這在快速生成 UI 元件的情境上很好用。

- 使用 Control + T 可以同時開啟並執行多個對話串。

### Generate Commit Message

Cursor 的 commit 欄位本生有「Generate Commit Message」的按鈕可以使用，推薦可以設定全域的 Cursor Rules 來確保 Cursor 生成的訊息遵循 **[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)**，例如可以這樣寫：

When generating commit messages, follow conventional commit format, starting with a category such as: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, `chore:`, `revert:`, etc., then only give one line commit message.

## Cursor 注意事項

cursor 在一般模式中讀取檔案最多只能讀 250 行；max 模式最多可以讀 750 行。

## 我的 Cursor 的 User Rules

點開 Cursor Settings 並進到 Rules 頁面，在 User Rules 標題下寫下你的 Rules。

<picture>
  <source srcset="/images/article-contents/webp/how-to-better-use-cursor/cursor-user-rules.webp" type="image/webp">
  <img src="/images/article-contents/png/how-to-better-use-cursor/cursor-user-rules.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

目前我是以 Cursor 員工分享的 Rules(**[參考來源連結](https://x.com/kayladotdev/status/1853272891023872450)**)為基礎修改成我的 User Rules 如下(文字版本可到[這裡](https://raw.githubusercontent.com/evaaaaawu/quick-share/refs/heads/main/my-cursor-user-rules.md)複製)：

<picture>
  <source srcset="/images/article-contents/webp/how-to-better-use-cursor/my-cursor-user-rules.webp" type="image/webp">
  <img src="/images/article-contents/png/how-to-better-use-cursor/my-cursor-user-rules.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

以下是中文翻譯版本(文字版本可到[這裡](https://raw.githubusercontent.com/evaaaaawu/quick-share/refs/heads/main/my-cursor-user-rules-zh-tw.md)複製)：

<picture>
  <source srcset="/images/article-contents/webp/how-to-better-use-cursor/my-cursor-user-rules-zh-tw.webp" type="image/webp">
  <img src="/images/article-contents/png/how-to-better-use-cursor/my-cursor-user-rules-zh-tw.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
</picture>

## 我的 Cursor 的 Project Rules

除了全域設置，Cursor 還支援專案層級的 Prompt。具體做法是在專案中創建一個 .cursor 資料夾。然後在 .cursor 資料夾內創建子資料夾 rules，並設置不同的 Prompt 檔案。

這裡我覺得需要一些時間嘗試和實作才可以分享應該怎麼寫比較好，不過目前有幾個我看到不錯的分享，可以先用在自己的專案試試看：

- 第一個是決策脈絡的 project rules，目的是透過決策脈絡以避免 AI 失憶的問題。大致上的作法是，每次 AI 的輸出不如預期時：

  1.  請 AI 調整後，再請 AI 總結應該要怎麼做

  2.  把該總結放到 [fyi.md](fyi.md) 當中

  3.  在未來的 prompts 中帶上 [fyi.md](fyi.md)

  更詳細完整的說明可以看 [AddyOsmani.com](AddyOsmani.com)[ - Automated Decision Logs in AI-Assisted Coding](https://addyosmani.com/blog/automated-decision-logs/) 和 [2-6 如何透過決策脈絡，避免 AI 失憶問題｜ ExplainThis](https://www.explainthis.io/zh-hant/ai/cursor-guide/2-6-avoiding-hallucinations)。

- 第二個是撰寫 PR message 的 project rules，推薦可以在專案相關的 Cursor Rules 中加入撰寫 PR message 的模板(可放在 .cursor/rules/pr_generation.mdc 中)。有了撰寫 PR message 的模板和 Cursor 本身提供的 `@git` 功能後，就可以使用類似「使用 PR Generation 提示詞為這兩個 commit 撰寫描述」的語句來請 Cursor 幫忙生成 PR message。模板和詳細的說明可以參考 [3-6 透過 Cursor 協助生成 PR 描述｜ ExplainThis](https://www.explainthis.io/zh-hant/ai/cursor-guide/3-6-pr-description)。

- 第三個是 TypeScript 的 project rules。Matt Pocock 在 [Cursor Rules for Better AI Development | Total TypeScript](https://www.totaltypescript.com/cursor-rules-for-better-ai-development) 有提供他寫的 TypeScript 的 project rules 可供下載。

## Prompts 撰寫技巧

這部分和 Cursor 本身比較沒有關係，但要用的好 Cursor 從底層來看更根本的原則和關鍵因素就是應該如何更好的使用 AI Prompts。

### 1. 每當開啟一個新的對話時，都從 Goal、Return Format、Warnings、Context 這個架構開始問起。

這是 Open AI 共同創辦人 Greg Brockman 曾推薦的一種 Prompt 寫法，在 X 上廣為流傳 (**[參考來源連結](https://x.com/daniel_mac8/status/1878283032215408886)**)：

- 目標（Goal）：清楚說明請 AI 完成什麼任務。

- 回覆格式（Return Format）：明確定義期望的輸出格式。

- 注意事項（Warnings）：提醒 AI 在處理任務時需特別注意的地方。

- 脈絡（Context）：提供相關背景資訊。

這裡只要好好善用 Cursor 的功能就可以提供充足的脈絡給 AI 模型，所以在 Prompt 的部分最重要的就是將目標/需求描述的足夠清楚。

### 2. 透過「單一脈絡原則」，確保高品質的回覆

單一脈絡原則(single purpose composers)這個概念源自 Cursor 團隊的 Eric Zakariasson 在 X 上分享過的概念(**[參考來源連結](https://x.com/ericzakariasson/status/1890018010926055578)**)。

這邊我的理解是，要讓每個對話串只為了「解決一個特定的目的」。所以當我開啟一個為了解決「目的 A」的 New chat，但是在對話過程中有其他和這個「目的 A」不相關的問題或改動要解決，就直接再開一個 New chat 去提問，之後再回到原本的對話串繼續解決「目的 A」即可。

看到這個概念後，我發現自己其實原本就有習慣用這個概念在使用 AI，我在內心把他稱為「主線任務」和「支線任務」，所以實際上各個對話串就會長得像樹枝那樣。

### 3. 當問題較為模糊或複雜時，可以在 prompts 的最後加上：If you need clarification or have any questions, feel free to ask.

這樣可以讓 Cursor 主動提問，幫助你補充更多脈絡，進而提升回覆品質或改動結果。(**[參考來源連結](https://x.com/PrajwalTomar_/status/1886060043163906404)**)

### 4. 當想要保留對話串的重點內容，可以在原本的長對話視窗中，輸入以下的 prompts：Summarize what you did and output in Markdown format that I can copy directly.

### 5. 一些撰寫文件的推薦 prompts

**From existing code**

- **API Documentation**：Generate API documentation for this Express router, including all endpoints, parameters, and response formats

- **JSDoc Comments**：Add comprehensive JSDoc comments to this class, documenting all methods and their parameters

- **README Creation**：Create a README for this project that includes setup instructions, usage examples, and API overview

**From chat sessions**

- **Problem Solving**：Summarize our conversation about setting up authentication into a step-by-step guide for the team wiki

- **Architecture**：Create documentation explaining why we chose this database design, including the trade-offs we discussed

- **Debugging**：Write a troubleshooting guide based on this bug we just fixed, including symptoms and resolution steps

### 6. 根據軟體開發的不同階段和情境，提供範例 prompts 作為靈感。

**\[設計階段\]**

這裡很推薦可以將技術設計文件直接存放在程式碼庫中。

**情境：修改技術設計文件**

- e.g., 在這份聊天系統的技術設計文件中，原本只有純文字訊息，但 PM 希望增加多媒體訊息傳送功能，例如圖片或影音。請基於原本的技術設計，提供幾個不同的技術設計方案，以支援多媒體訊息傳送。

- e.g., 現在的群組聊天設計在擴展性上有局限，群組人數一多就難以支援。請提出設計上的不同觀點，來突破這個限制。

**情境：為文字內容製作圖片**

當想要為文字內容製作圖片，可以選擇生成 ASCII 或 Mermaid 圖示。

- e.g., 這段內容純文字很難讀，請加上 ASCII 圖示來協助說明。

- e.g., 請基於這段內容生成 Mermaid 圖。

**情境：快速上手程式碼庫**

- e.g., 我剛加入這個團隊，對程式碼庫還不熟悉，請協助我理解目前程式碼庫的架構。

- e.g., 我想處理語言模型回傳的 Markdown 格式，確保呈現給使用者的是精美格式，目前程式碼庫有沒有相關的轉換或呈現方法？

**\[實作階段\]**

**情境：實作測試驅動開發(TDD)的開發流程**

- e.g., 我需要實作一個把 HTML 格式轉換成 Markdown 格式的函式，請用 TypeScript 來實作，在實作前先根據 @fyi_test.mdc @test_jest.mdc 來先寫測試，新增函式到...中，如果要驗證測試，請根據 @code_command.mdc

**情境：檢查程式碼**

- e.g., 這段程式碼把所有的處理都混在一起，相對比較難閱請跟維護，請把程式碼寫更乾淨一點

**情境：撰寫 commit message**

如同前面 [Cursor 你可能不知道的好用功能](#cursor-你可能不知道的好用功能)段落中有提到的，Cursor 的 commit 欄位本生有「Generate Commit Message」的按鈕可以使用，推薦可以設定全域的 Cursor Rules 來確保 Cursor 生成的訊息遵循 **[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)**，例如可以這樣寫：

When generating commit messages, follow conventional commit format, starting with a category such as: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, `chore:`, `revert:`, etc., then only give one line commit message.

**情境：撰寫 PR message**

如同上一段落[我的 Cursor 的 Project Rules](#我的-cursor-的-project-rules) 中有提到的，推薦可以在專案相關的 Cursor Rules 中加入撰寫 PR message 的模板(可放在 .cursor/rules/pr_generation.mdc 中)。有了撰寫 PR message 的模板和 Cursor 本身提供的 `@git` 功能後，就可以使用類似「使用 PR Generation 提示詞為這兩個 commit 撰寫描述」的語句來請 Cursor 幫忙生成 PR message。模板和詳細的說明可以參考 [3-6 透過 Cursor 協助生成 PR 描述｜ ExplainThis](https://www.explainthis.io/zh-hant/ai/cursor-guide/3-6-pr-description)。

**情境：協助 Code Review**

- 推薦可以有一份風格指南 (Style Guide) 放在 Cursor 的 Docs 中，再搭配 Cursor 提供的 `@git` 功能後，就可以使用類似「用 JavaScript Style Guide 來 Review 某個 PR」的語句來請 Cursor 協助 Code Review。

- 除了風格指南，前面有提到的決策脈絡紀錄，也能依情況用在 code review。

- 除了用 `@git` ，在用 Cursor 看程式碼時，不一定只能針對整個 PR，也可以鎖定單一檔案或程式碼片段進行審查。例如，將某個 React 元件檔案引用進來，讓 Cursor 根據 React 的原則提出改進建議。

## Reference

- [Cursor 入門到實戰 — 導覽｜ ExplainThis](https://www.explainthis.io/zh-hant/ai/cursor-guide)

- [Cursor Docs](https://docs.cursor.com/welcome)
