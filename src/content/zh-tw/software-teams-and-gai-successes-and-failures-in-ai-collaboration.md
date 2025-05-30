---
title: 軟體團隊與 GAI - 與 AI 協作的成與敗
subtitle: 分享 AI Your Summer 此系列活動 2023/6/13 場次的筆記。
author: src/content/authors/eva.json
imageWebp: /images/articles/webp/software-teams-and-gai-successes-and-failures-in-ai-collaboration.webp
imagePng: /images/articles/png/software-teams-and-gai-successes-and-failures-in-ai-collaboration.png
imgAlt: Software Teams and GAI - Successes and Failures in AI Collaboration
creationDate: 2023-07-17
updateDate: 2023-07-17
tags:
  - AI
featured: true
---

本文為 [AI Your Summer](https://gai-2023.alphacamp.co/) 此系列活動 [2023/6/13 場次](https://www.accupass.com/event/2305221045441859361432) 筆記分享，內容有經過個人的重新架構，並非當天講座流程，歡迎一起討論交流。

Speaker:

- Mosky（Pinkoi / Architect）
- Caesar（TransIot / Chief Technology Officer）

Host:

- Bernard（ALPHA Camp / CEO, Founder）

## 影響面

### Q: AI 時代對軟體工程師的影響？(相關問題: 未來軟體工程師這個工作的轉變？Junior 職缺會不會變少？企業以後會不會不需要軟體工程師了？)

Caesar:「短時間內工程師不會失業，因為目前 AI 還沒有辦法幫忙處理一些抽象的事情，我們目前所需要軟體工程師的工作，都還是基於一些抽象的連結，包含老闆的需求、客戶的需求、天馬行空的需求，他其實都是很不一樣的連結，雖然說很多底層當然都還是 CRUD，可是當你有抽象連結的時候，目前的 AI 它沒有辦法去處理抽象連結這件事情，他是透過人去跟他講一個抽象的問題 > 然後他給予一個具體的結果 > 然後逼近於我們想要的答案 > 然後我們繼續一步步往下走，才有辦法去進行這個結果的過程，所以在這個過程裡面軟體工程師還是有必要。」

Mosky:「我不確定市場會如何去平衡 junior 和 senior 的需求，我聽過很多版本，但我自己也沒有一個很肯定的答案，但是我還滿確定的是你在學習的路上，你的學習方式會跟我們以前很不一樣，也不是說舊的方式就會被丟棄了，我覺得 google 還是很好用，而是他會給你一個嶄新的路，說不定對你而言是更適合的，那一定要去多嘗試多使用這些工具，但也不要全然的相信( ChatGPT 會唬爛 )。整體而言，我不會那麼焦慮，反而會更樂觀看待。」

### Q: 公司對於工作上 AI 的使用有沒有訂出目標或期待？

Caesar:「希望 50% 以上的工作使用 AI，可能一個 engineer 搭配一個 AI Assistant；engineer 負責發想、架構、理解整個需求，AI 負責任何一個 framework 和 CRUD 等。」

Mosky:「請大家去探索 AI 可以節省你幾 ％ 的時間？根據這個 metrics 再去衡量大家是不是應該都要使用 AI 到某個節省程度的時間(擴大使用)。公司目前的態度是非常強烈鼓勵大家去嘗試，其實在 Generative AI 年會前原本是比較保守的，但經過 Generative AI 年會後覺得好像不能那麼保守，所以每一個 AI 服務我個人都會代表公司去認真讀過，然後明定說什麼樣的服務是可以用到什麼程度 ex. ChatGPT 絕對不可以傳跟公司有關的資料，因為他東西都會拿來 train。
sum up: 我會用時間當作是衡量的指標，內部會有明確的 guideline 讓大家知道什麼樣的東西可以怎麼樣子用。」

### Q: AI 時代對程式學習者的影響？軟體工程師需要投入培育的能力技能樹發展有不一樣嗎？有工具後可以往一些更橫向的東西發展？會需要做哪些調整？

Caesar:「對於 junior 來說必經的路還是會需要經過，以前端工程師為例，我自己的職能就會是 JavaScript、HTML、CSS，這些你還是要懂，甚至是跳一層 React / Vue / Angular 這些東西你有興趣，或是公司在用的，你還是要知道框架怎麼去運作，甚至是 virtual DOM、fiber，或者是整個 event 怎麼去做處理，他的整個 lifecycle 怎麼去進行，這個雖然說 ChatGPT 會跟你講答案，可是你要知道這整個事情是怎麼樣去運作的，那為什麼還是需要知道這件事情呢？因為當你已經知道答案的時候，你才知道怎麼去問答案，如果當你連答案都不曉得的時候，你連他的 lifecycle 定位在哪邊，或者是問題出現在哪個定位點都不曉得，那你怎麼會期待他產出一個對的答案？所以我覺得這是 junior 要面對的課題，然後我覺得嚴峻的未來有可能發生的是其實大部分的工作、大部分的 CRUD、大部分的所有基礎 coding 能力，可能 AI 都已經可以取代你了，然後一個 senior 他搭配一個 AI 就可以做完可能 1 個或 1.5 個 junior developer 能做的事情，那 junior 如果你是從零到想要入門的時候，這一段你可能自己要練苦工、不斷學習，所以 junior 的門檻會提高，工程師的發展需要用更宏觀、抽象的角度去思考。」

Mosky:「我覺得一定是有一個起點，然後你要到達那個終點。以前必須自己敲鍵盤，現在是下 prompt 就可以加速你到終點，可是有一件很重要的事情是你還是必須知道你的終點在哪裡，ChatGPT 是幫助你更快的跑到這個終點，所以對於所有工程師來說，有一件非常重要的事情是，你還是需要知道你的終點在哪裡，這個技能你還是必須培養，而且在人類還需要為產出負責的前提下，一定要有人知道那個終點在哪裡，無論你是 senior 還是 junior，所以一定程度的硬實力是需要培養的，所以我會認為 ChatGPT 他不是取代你，而是去加速你到終點。ex. 終點: 學習到某個技能、完成公司某個需求，那 ChatGPT 可以做的是提供另外一個途徑，幫助你達到你想要獲得的硬實力/軟實力。sum up: 要知道你的終點在哪裡、該培養的硬實力/軟實力還是要去培養，但是在這個過程中，AI 可以幫助你達到你想要做到的事情。」

- Bernard 幫大家提問: 「我是 junior，我本來就不知道終點在哪裡，我不知道我不知道什麼，所以當我不知道終點在哪裡個時候，我要怎麼去知道終點在哪裡？對於一個要拼入行拿到門票的 junior，你給他的建議是什麼？」

- Mosky:「junior 定義: 拿到一個擁有 software engineering 這個 title 的工作 (有人願意付錢請你做這件事情)，這個點是一直在變化的，他是一個範圍；十年前和現在的標準不一樣、每間公司的標準也不一樣，每個人需要自己去決定。JD 看一下 > summary & 列出來 > 利用 AI 幫助你學你需要學到的東西 > 應徵上一個願意付錢請你做 software engineering 的工作」

- Caesar:「AI 工具落地已經是一個既定的事實，所以你要如何習慣/了解 AI 工具能夠幫助你達到什麼樣的境界，然後同時間 AI 的產出你必須要去不斷的質疑他，因為你不知道他到底回答的是正確與否，因為你沒有經驗，然後你其實很多東西還在揣摩的階段，所以當你從 ChatGPT 去 copy paste 一段程式碼的時候，你要知道你 copy paste 這一段到底它代表的意義是什麼，我們以前被稱為 copy paste 大師 > 現在變成 tab 大師，但自然生成的背後，他到底幫你產了什麼東西，我覺得特別對於 junior 一定要去了解他後面到底幫你 import 了什麼 library、幫你加了什麼魔法……」

## 實作面

### 有幫助的 use case

- 本身已經有想法，實作上交給 ChatGPT 做時，ex. refactor / convert (已經知道怎麼改，但又很懶的自己去改的時候)。以下提供範例 (Caesar 提供):
1. js, how to covert to await async [下面提供原程式碼]
2. (若對於上述 ChatGPT 的回答還不滿意，你可以這樣做) plz make it readable, and ez understand

- 想要了解別人的程式碼時

- 貼一段你喜歡的 code 風格給他，然後叫他按照那樣的 style 生成

### 不適合的 use case

Mosky:「需求是人類寫的，還需要另外一個人類再去探索過的東西。」> Bernard 補充: 「換句話說需求需要明確，或許 PM 的工作還可以需要存在???」

Caesar:「你對於這個結果是不確定的 / 你在問問題的時候就已經沒有方向，在和 ChatGPT 聊，無法往下收斂時，其實會得不到你要的結果。當你問問題的角度本身就不對了，或是你其實也不知道你要的是什麼樣的結果(沒有明確的定調)，你給不明確的東西，ChatGPT 它就像是一個對手一樣，對手越強，它就可以回答得越好；但對手越弱，它就像個弱智，所以你就會覺得它好像在跟一個不是那麼了解我的人在講。」

**這裡補充一下個人目前使用的心得：**
ChatGPT 不一定會把最佳解法告述你，你或許還是可以用它來解決問題，但你知道的愈多，就有辦法引導它回答出更好的答案，所以有一定的基礎能力還是很重要！

Bernard:「做產品有一個 framework: frequency v.s. accuracy，其中 AI 較適合做 frequency 高 、accuracy 低的事情。」
