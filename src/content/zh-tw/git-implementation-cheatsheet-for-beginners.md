---
title: 給開發新手看的 Git 實作小抄
subtitle: Git 是一個分散式版本控制系統，主要用來管理和追蹤程式碼的變更，特別適合用於多人協作的開發專案。
author: src/content/authors/eva.json
imageWebp: /images/articles/webp/git-implementation-cheatsheet-for-beginners.webp
imagePng: /images/articles/png/git-implementation-cheatsheet-for-beginners.png
imgAlt: Git Implementation Cheatsheet for Beginners
creationDate: 2023-06-15
updateDate: 2023-06-15
tags:
  - Git
featured: true
---

第一次接觸到 Git 就覺得真的很喜歡這個東西。在開始學程式以前，從沒想過竟然可以用這種這麼有系統的方式去管理檔案，讓每個版本間的改動差異和到底是誰寫的等資訊都呈現的清清楚楚，對於新的改動後悔了，也可以輕鬆還原到之前的版本。

有了它，就可以讓版本控制和多人協作變得容易和清晰非常多，甚至覺得應該要讓所有非工程師在檔案管理上也都來學習使用像這樣的版本控制系統。

所以這篇文章想要來整理一下自己目前使用 Git 的習慣(流程)。

雖然針對 Git 還有非常多我還不會的使用方法，但我可以分享自己通常的使用方式，作為個人在實作上的 cheat sheet，也幫助初學者能夠快速上手！

內容主要分為 **[基本流程](#基本流程)** 和 **[多人協作](#多人協作)** 兩大部分，後面也有做一些補充說明。

## Table of Contents

- [基本流程](#基本流程)
- [補充：(在還沒上傳到 GitHub 前) commit 完後悔想還原怎麼辦？](#補充在還沒上傳到-github-前-commit-完後悔想還原怎麼辦)
  - [狀況一：你不小心 commit 錯了(還原後你想要讓修改/更新的程式碼仍保留在本地的工作區)](#狀況一你不小心-commit-錯了還原後你想要讓修改更新的程式碼仍保留在本地的工作區)
  - [狀況二：你把程式改壞了(你想要真的整個還原)](#狀況二你把程式改壞了你想要真的整個還原)
- [多人協作](#多人協作)
- [補充：review 別人的 PR](#補充review-別人的-pr)
- [其他小知識](#其他小知識)
- [其他指令](#其他指令)

## **基本流程**

1. `git init`

   登錄專案(啟動這個資料夾的版本控制)

2. `touch .gitignore`

   建立要忽略的檔案

3. `git add .`

   程式碼更動已告一段落，先把所有檔案加進去版本控制系統

4. `git commit -m "[commit 內容]"`

   提交一筆改動，並寫下你的改動訊息(commit 內容)

   **git commit message 推薦寫法
   (我是參考這篇：[git commit message 推薦寫法](https://wadehuanglearning.blogspot.com/2019/05/commit-commit-commit-why-what-commit.html))：**

   - feat: 新增/修改功能 (feature)。
   - fix: 修補 bug (bug fix)。
   - docs: 文件 (documentation)。
   - style: 格式 (不影響程式碼運行的變動 white-space, formatting, missing semi colons, etc)。
   - refactor: 重構 (既不是新增功能，也不是修補 bug 的程式碼變動)。
   - perf: 改善效能 (A code change that improves performance)。
   - test: 增加測試 (when adding missing tests)。
   - chore: 建構程序或輔助工具的變動 (maintain)。
   - revert: 撤銷回覆先前的 commit。

步驟 3 & 4 會一直重複

5. GitHub + new repository

   將專案上傳到 GitHub (按照 GitHub 提供的指示操作)

6. `git push origin [branch 名稱]`

   commit 完後可以把這個 branch 推到 GitHub 上

只要你想更新 GitHub 上的程式碼到最新狀況，就執行一次步驟 6

## **補充：(在還沒上傳到 GitHub 前) commit 完後悔想還原怎麼辦？**

(詳細版本可參考 [【狀況題】剛才的 Commit 後悔了，想要拆掉重做… - 為你自己學 Git | 高見龍](https://gitbook.tw/chapters/using-git/reset-commit))

### 狀況一：你不小心 commit 錯了(還原後你想要讓修改/更新的程式碼仍保留在本地的工作區)

- `git log --oneline`

  查看摘要版的版本紀錄

- `git reset b339b8d^` (編號需自行更換)
  恢復到 b339b8d 的上一個版本(但 code 還在)

### 狀況二：你把程式改壞了(你想要真的整個還原)

- `git reset --hard HEAD`

  恢復到最新提交版本

- `git reset --hard HEAD~1`
  恢復到上一個提交版本(要退回到更前面的版本以此類推: ~2, ~3, ~4…)

## **多人協作**

1. `git checkout -b [branch 名稱]`

   新開一個分支，並切換到該分支

   分開寫法：

   1. `git branch [branch 名稱]`

      新開一個 branch

   2. `git checkout [branch 名稱]`

      切換到 branch

2. (寫 code…基本流程步驟 3 & 4 循環)

3. `git push origin [branch 名稱]`

   推到 GitHub

4. 到自己的 repo 去，並撰寫 & 發起 PR (Pull Request)

5. 把 PR 的連結複製起來，交給你的好夥伴(像是主管、同事等)

6. (等你的好夥伴改完並且 merge 以後) `git checkout main`

   切換到 main

7. `git pull origin main`

   把最新的改動拉下來

   分開寫法：

   1. `git fetch origin`

      抓取遠端更新

   2. `git merge origin/main`

      合併遠端更新

每開發或更新完一個功能，在想要發起 PR 前，最好也都要先執行一次步驟 6 & 7，然後將最新的 main 合併進準備要發 PR 的分支，此時若有衝突發生，先在本地端解掉再發 PR 會是比較好的方式。

多人協作和自己寫程式最大的差異之一就是需要解衝突，這方面還需要再有更多經驗。

## **補充：review 別人的 PR**

若想要在本地端 review 可使用步驟 1 + 2：

1. `git fetch origin`

   抓取遠端更新

2. `git checkout [branch 名稱]`

   切換到 branch

3. (檢查 OK 後要合併進主幹) `git checkout main`

   要先切回主幹

4. `git merge [branch 名稱]`

   在主幹上進行合併

5. 若沒有衝突就可以順利的合併進主幹，但若有衝突就要先解完衝突才可合併進去

   - 如何減少需要解衝突的情況？

     1. 分配工作的學問
     2. 先將最新的 main 合併進準備要發 PR 的分支，再發 PR

   - 下次有協作機會想要討論的議題：若有衝突，應該由 review 的人 merge，還是發 PR 的人 merge？

     照理來說是 review 的人檢查 OK 後直接 merge 進主幹，但如果遇到有衝突的情況，其實發 PR 的人才是比較了解 code 的人 (因為 code 是他寫的)，這樣是否應該由發 PR 的人去解衝突？

## **其他小知識**

(我是參考 [mentor-program-5th/examples/week1](https://github.com/Lidemy/mentor-program-5th/tree/master/examples/week1))

- 做版本控制時，聰明的 Git 真正儲存的是「檔案的差異」，並不會每開一個 branch 就開一個資料夾，也不會每一個 commit 就複製一次檔案。另外，對於每一個檔案，Git 也都有自己的壓縮演算法去壓縮，所以比你的檔案還小是正常的。

- main/master 就只是「預設的 branch」，或者通常是最主要的 branch，但這並不代表它是「最新的 branch」。舉例來說，你也可以切出一條 branch 叫做「test」，然後一直往 test 加東西，但是從來都不合併回 main/master，那 test 就是在你專案裡的最新的 branch。所以 master 就只是一條預設的 branch 而已，最新的東西不一定在上面。

- 發 PR 時，如果有東西你想改，其實你可以自己在電腦上改完以後 commit 再 push，GitHub 上的 PR 就會自動更新了，你什麼都不用做，更不用把 PR 關掉再開起來。因為 PR 的主體是「branch」，所以 branch 更新了，PR 的內容自然也會一起更新。

## **其他指令**

- `git clone 網址`

  複製 GitHub 的專案到本機端

- `git status`

  查看狀態

- `git log`

  查看歷史

- `git diff`

  對照差異(如果指令後不加任何參數，會直接把工作中的程式碼拿來和最新版本做比較，此情況直接看 GUI 會更清楚)

- `git diff [SHA-1] [SHA-1]`

  從 A 版本到 B 版本，發生了哪些程式碼變化

- `git branch`

  列出目前所有的分支名稱清單(只會列出本地分支)

- `git branch -v`

  查看各個分支的最新 commit

- `git branch --all`

  列出目前所有的分支名稱清單(包含遠端分支)

- `git branch -m [原本的 branch 名稱] [新的名稱]`

  重新命名分支

- `git branch -d [branch 名稱]`

  (情境)刪除已經 merge 的 branch

- `git rebase` 流程

  1. `git checkout [branch名稱]`
  2. `git rebase main`
  3. 若有衝突就要開始解衝突，解完一個衝突，要 `git add .`

     -`git rebase --continue`

     - 會跳出 vi 編輯器，可直接儲存預設 commit，按 :wq，表儲存 & 離開

- `git rebase squash`
  把多個 commit 合併成一個 commit (太瑣碎，需要用到時可再參考 [【狀況題】把多個 Commit 合併成一個 Commit - 為你自己學 Git | 高見龍](https://gitbook.tw/chapters/rewrite-history/merge-multiple-commits-to-one-commit))
