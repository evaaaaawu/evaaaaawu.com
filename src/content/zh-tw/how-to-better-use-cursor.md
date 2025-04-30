---
title: 如何更好的使用 Cursor
subtitle: 分享我的 Cursor 學習筆記和目前的使用方法。
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

## 基礎知識

### 三個最常用的快捷鍵

(如果是使用 Mac，請自行將 Control 替換成 Command)

- Control + K: 能讓你在程式碼中直接進行編輯，或選取某段程式碼後提出問題。
- Control + L：可以開啟 AI 聊天助手的對話框，讓你跟 AI 進行互動。
- Control + I：用來啟動 AI 代理的快捷鍵，幫助你自動完成某些任務。

### 你可能不知道的好用功能

- Cursor 的 Chat 也可以上傳圖片，這在快速生成 UI 元件的情境上很好用。

## 提高回覆品質的方法

### Cursor Rules

1. 全域 Cursor Rules

點開 Cursor Settings 並進到 Rules 頁面，在 User Rules 標題下寫下你的 Rules。
我目前使用的是 Cursor 員工分享的 Rules 如下([參考來源連結](https://x.com/kayladotdev/status/1853272891023872450))：

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

2. 專案相關的 Cursor Rules

除了全域設置，Cursor 還支援專案層級的 Prompt。具體做法是在專案中創建一個 `.cursor` 資料夾。然後在 `.cursor` 資料夾內創建子資料夾 `rules`，並設置不同的 Prompt 檔案。

p.s. 這部份如果我有實作出一些心得後，會再回來寫的更詳細。

### 推薦的 Prompt 架構

Open AI 共同創辦人 Greg Brockman 曾推薦一種 Prompt 寫法，在 X 上廣為流傳 ([參考來源連結](https://x.com/daniel_mac8/status/1878283032215408886))：

- 目標（Goal）：清楚說明請 AI 完成什麼任務。
- 回覆格式（Return Format）：明確定義期望的輸出格式。
- 注意事項（Warnings）：提醒 AI 在處理任務時需特別注意的地方。
- 脈絡（Context）：提供相關背景資訊。

其中最重要的是將目標/需求描述的足夠清楚。

至於如何在 Cursor 中更好的寫出脈絡? 我們可以利用以下五大部分：

1. 寫好前面段落說明的 Cursor Rules
2. Cursor 有提供一些實用的索引讓我們能更方便的將相關脈絡導入，包含：
   - `@file`：引用整個檔案作為上下文。
   - `@code`：引用特定程式碼段落（避免過多無關內容）。
   - `@git`：引用 Git 記錄（如 commit、PR diff），方便 Code Review。
   - `@docs`：引用技術文件（如 Next.js 官方文件），避免模型使用過時資訊。
   - `@web`：讓 Cursor 先進行網路搜尋，再根據最新內容回答（適用於無官方文件的新技術）。
3. 透過「決策脈絡」來避免 AI 的失憶問題

   大致上的作法是，每次 AI 的輸出不如預期時：

   1. 請 AI 調整後，再請 AI 總結應該要怎麼做
   2. 把該總結放到 fyi.md 當中
   3. 在未來的 prompts 中帶上 fyi.md

   p.s. 這部份如果我有實作出一些心得後，會再回來寫的更詳細。

4. 透過「單一脈絡原則」，確保高品質的回覆

   單一脈絡原則(single purpose composers)這個概念源自 Cursor 團隊的 Eric Zakariasson 在 X 上分享過的概念([參考來源連結](https://x.com/ericzakariasson/status/1890018010926055578))

   這邊我的理解是，要讓每個對話串只為了「解決一個特定的目的」。所以當我開啟一個為了解決「目的 A」的 New chat，但是在對話過程中有其他和這個「目的 A」不相關的問題或改動要解決，就直接再開一個 New chat 去提問，之後再回到原本的對話串繼續解決「目的 A」即可。

   看到這個概念後，我發現自己其實原本就有習慣用這個概念在使用 AI，我在內心把他稱為「主線任務」和「支線任務」，所以實際上各個對話串就會長得像樹枝那樣。

5. 其他推薦的小技巧

   - 可以在 prompts 的最後加上：

     <span style="color: rgba(101, 98, 90, 1);">If you need clarification or have any questions, feel free to ask.</span>

     這樣可以讓 Cursor 主動提問，幫助你補充更多脈絡，進而提升回覆品質或改動結果。([參考來源連結](https://x.com/PrajwalTomar_/status/1886060043163906404))

   - 當想要保留對話串的重點內容，可以在原本的長對話視窗中，輸入以下的 prompts：

     <span style="color: rgba(101, 98, 90, 1);">Summarize what you did and output in Markdown format that I can copy directly.</span>

## 進階實戰

以下會舉出專案各個階段中會有的一些可以請 AI 來幫助我們的情境，並附上範例 prompts：

### 1. 設計階段

這裡很推薦可以將技術設計文件直接存放在程式碼庫中。

#### 情境：修改技術設計文件

<div style="color: rgba(101, 98, 90, 1);">
e.g., 在這份聊天系統的技術設計文件中，原本只有純文字訊息，但 PM 希望增加多媒體訊息傳送功能，例如圖片或影音。請基於原本的技術設計，提供幾個不同的技術設計方案，以支援多媒體訊息傳送。
</div>

<div style="color: rgba(101, 98, 90, 1);">
e.g., 現在的群組聊天設計在擴展性上有局限，群組人數一多就難以支援。請提出設計上的不同觀點，來突破這個限制。
</div>

#### 情境：為文字內容製作圖片

<div style="color: rgba(101, 98, 90, 1);">
e.g., 這段內容純文字很難讀，請加上 ASCII 圖示來協助說明。
</div>

<div style="color: rgba(101, 98, 90, 1);">
e.g., 請基於這段內容生成 Mermaid 圖。
</div>

#### 情境：快速上手程式碼庫

<div style="color: rgba(101, 98, 90, 1);">
e.g., 我剛加入這個團隊，對程式碼庫還不熟悉，請協助我理解目前程式碼庫的架構。
</div>

<div style="color: rgba(101, 98, 90, 1);">
e.g., 我想處理語言模型回傳的 Markdown 格式，確保呈現給使用者的是精美格式，目前程式碼庫有沒有相關的轉換或呈現方法？
</div>

### 2. 實作階段

#### 情境：實作測試驅動開發(TDD)的開發流程

<div style="color: rgba(101, 98, 90, 1);">
e.g., 我需要實作一個把 HTML 格式轉換成 Markdown 格式的函式，請用 TypeScript 來實作，在實作前先根據 @fyi_test.mdc @test_jest.mdc 來先寫測試，新增函式到...中，如果要驗證測試，請根據 @code_command.mdc
</div>

#### 情境：檢查程式碼

<div style="color: rgba(101, 98, 90, 1);">
e.g., 這段程式碼把所有的處理都混在一起，相對比較難閱請跟維護，請把程式碼寫更乾淨一點
</div>

#### 情境：撰寫 commit message

Cursor 的 commit 欄位本生有「Generate Commit Message」的按鈕可以使用，推薦可以設定全域的 Cursor Rules 來確保 Cursor 生成的訊息遵循 [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)，例如可以這樣寫：

<div style="color: rgba(101, 98, 90, 1);">
when generating commit message, follow conventional commit and start with a category such as `feat:`, `chore:`, or `fix:`, and then only give one line commit message
</div>

#### 情境：撰寫 PR message

推薦在專案相關的 Cursor Rules 中加入撰寫 PR message 的模板(可放在 .cursor/rules/pr_generation.mdc 中)：

```
## 背景描述 (Why)

<!-- 描述此 PR 的背景，為什麼需要這個 PR? 它解決了什麼問題? -->

## 實作方法 (How)

<!-- 描述實作方法和所做的架構決策。 -->

## 實際變更（做了什麼）

<!-- 強調此合併請求中實作的主要變更。具體說明您更改了什麼以及為什麼。 -->

- [ ] 功能/變更 1
- [ ] 功能/變更 2

### 截圖或錄影參考

<!-- 如適用，添加設計參考（連結）、截圖或螢幕錄製 -->

### 測試驗證

<!-- 列出已驗證的測試案例。包括極端案例。 -->

- [ ] 測試場景 1
- [ ] 測試場景 2
- [ ] 測試場景 3

<!-- 為審核者添加任何其他測試註釋 -->

## 補充說明

<!-- 任何對 PR 審核者有幫助的資訊（例如：已知限制、未來待辦事項） -->

## 相關連結

<!-- 跟 PR 相關的連結 -->
```

有了撰寫 PR message 的模板和 Cursor 本身提供的 `@git` 功能後，就可以使用類似「使用 PR Generation 提示詞為這兩個 commit 撰寫描述」的語句來請 Cursor 幫忙生成 PR message。

#### 情境：協助 Code Review

- 推薦可以有一份風格指南 (Style Guide) 放在 Cursor 的 Docs 中，再搭配 Cursor 提供的 `@git` 功能後，就可以使用類似「用 JavaScript Style Guide 來 Review 某個 PR」的語句來請 Cursor 協助 Code Review。

- 除了風格指南，前面有提到的決策脈絡紀錄，也能依情況用在 code review。

- 除了用 `@git` ，在用 Cursor 看程式碼時，不一定只能針對整個 PR，也可以鎖定單一檔案或程式碼片段進行審查。例如，將某個 React 元件檔案引用進來，讓 Cursor 根據 React 的原則提出改進建議。

## Reference

[Cursor 入門到實戰 — 導覽｜ ExplainThis](https://www.explainthis.io/zh-hant/ai/cursor-guide)
