---
title: Git Implementation Cheatsheet for Beginners
subtitle: Git is a distributed version control system primarily used to manage and track code changes, particularly suitable for collaborative development projects.
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

The first time I encountered Git, I immediately fell in love with it. Before I started learning programming, I never imagined that files could be managed in such a systematic way, clearly showing the differences between versions and who wrote what. If you regret making changes, you can easily revert to previous versions.

With Git, version control and collaboration become much easier and clearer. I even think all non-engineers should learn to use version control systems like this for file management.

So in this article, I want to organize my current Git usage habits (workflow).

Although there are still many Git features I don't know how to use, I can share my typical usage patterns as a personal implementation cheat sheet, helping beginners to quickly get started!

The content is mainly divided into two parts: **[Basic Workflow](#basic-workflow)** and **[Collaboration](#collaboration)**, with some additional explanations at the end.

## Table of Contents

- [Basic Workflow](#basic-workflow)
- [Additional: What if you regret after committing (before pushing to GitHub)?](#additional-what-if-you-regret-after-committing-before-pushing-to-github)
  - [Scenario 1: You committed by mistake (you want to keep your code changes in the working directory)](#scenario-1-you-committed-by-mistake-you-want-to-keep-your-code-changes-in-the-working-directory)
  - [Scenario 2: You broke your code (you want to completely revert)](#scenario-2-you-broke-your-code-you-want-to-completely-revert)
- [Collaboration](#collaboration)
- [Additional: Reviewing Others' PRs](#additional-reviewing-others-prs)
- [Other Knowledge](#other-knowledge)
- [Other Commands](#other-commands)

### **Basic Workflow**

1. `git init`

   Initialize a project (start version control for this folder)

2. `touch .gitignore`

   Create a file to specify which files to ignore

3. `git add .`

   When code changes are complete, add all files to the version control system

4. `git commit -m "[commit message]"`

   Submit a change and write your change message (commit content)

   **Recommended git commit message format
   (I referenced this article: [git commit message recommended format](https://wadehuanglearning.blogspot.com/2019/05/commit-commit-commit-why-what-commit.html)):**

   1. feat: Add/modify features.
   2. fix: Fix bugs.
   3. docs: Documentation.
   4. style: Formatting (changes that don't affect code execution like white-space, formatting, missing semi-colons, etc).
   5. refactor: Refactoring (code changes that are neither new features nor bug fixes).
   6. perf: Performance improvements (A code change that improves performance).
   7. test: Adding tests (when adding missing tests).
   8. chore: Changes to build processes or auxiliary tools (maintain).
   9. revert: Undo previous commits, e.g., revert: type(scope): subject (reverting version: xxxx).

Steps 3 & 4 will be repeated continuously

5. GitHub + new repository

   Upload your project to GitHub (follow the instructions provided by GitHub)

6. `git push origin [branch name]`

   After committing, you can push this branch to GitHub

Whenever you want to update your code on GitHub to the latest status, execute step 6

### **Additional: What if you regret after committing (before pushing to GitHub)?**

(For detailed version, refer to [What if I regret my recent commit and want to undo it... - Learn Git for Yourself | Kang-Chung Kao](https://gitbook.tw/chapters/using-git/reset-commit))

#### Scenario 1: You committed by mistake (you want to keep your code changes in the working directory)

- `git log --oneline`

  View a summary of version history

- `git reset b339b8d^` (replace the number as needed)
  Restore to the version before b339b8d (but the code changes remain)

#### Scenario 2: You broke your code (you want to completely revert)

- `git reset --hard HEAD`

  Restore to the latest committed version

- `git reset --hard HEAD~1`
  Restore to the previous committed version (to go back further: ~2, ~3, ~4...)

### **Collaboration**

1. `git checkout -b [branch name]`

   Create a new branch and switch to it

   Alternative approach:

   1. `git branch [branch name]`

      Create a new branch

   2. `git checkout [branch name]`

      Switch to the branch

2. (Write code... repeat basic workflow steps 3 & 4)

3. `git push origin [branch name]`

   Push to GitHub

4. Go to your repo and write & create a PR (Pull Request)

5. Copy the PR link and give it to your partners (like managers, colleagues, etc.)

6. (After your partner reviews and merges) `git checkout main`

   Switch to main

7. `git pull origin main`

   Pull down the latest changes

   Alternative approach:

   1. `git fetch origin`

      Fetch remote updates

   2. `git merge origin/main`

      Merge remote updates

After developing or updating a feature, before creating a PR, it's best to execute steps 6 & 7, then merge the latest main into your branch that's ready for PR. If conflicts occur, resolving them locally before creating the PR is a better approach.

One of the biggest differences between collaboration and coding alone is the need to resolve conflicts, which requires more experience.

### **Additional: Reviewing Others' PRs**

If you want to review locally, use steps 1 + 2:

1. `git fetch origin`

   Fetch remote updates

2. `git checkout [branch name]`

   Switch to the branch

3. (After checking and approving) `git checkout main`

   Switch back to the main branch first

4. `git merge [branch name]`

   Merge on the main branch

5. If there are no conflicts, you can smoothly merge into the main branch, but if there are conflicts, you need to resolve them before merging

   - How to reduce the need to resolve conflicts?

     1. The art of work distribution
     2. Merge the latest main into your branch before creating a PR

   - Topic for future collaboration discussions: If there are conflicts, should the reviewer merge or the PR creator merge?

     Theoretically, the reviewer should merge into the main branch after checking and approving, but in case of conflicts, the PR creator actually understands the code better (since they wrote it). Should the PR creator resolve the conflicts in this case?

### **Other Knowledge**

(I referenced [mentor-program-5th/examples/week1](https://github.com/Lidemy/mentor-program-5th/tree/master/examples/week1))

- When doing version control, the clever Git actually stores "file differences," not creating a folder for each branch or copying files for each commit. Additionally, Git has its own compression algorithm for each file, so it's normal that Git repositories are smaller than your actual files.

- main/master is just the "default branch," or usually the main branch, but this doesn't mean it's the "latest branch." For example, you can create a branch called "test" and keep adding to it without ever merging back to main/master, making "test" the latest branch in your project. So master is just a default branch, and the latest content isn't necessarily there.

- When creating a PR, if you want to change something, you can make changes on your computer, commit, and push again. The PR on GitHub will update automatically - you don't need to do anything else, and certainly don't need to close and reopen the PR. Since a PR is based on a "branch," when the branch updates, the PR content naturally updates with it.

### **Other Commands**

- `git clone URL`

  Copy a GitHub project to your local machine

- `git status`

  Check status

- `git log`

  View history

- `git diff`

  Compare differences (if no parameters are added after the command, it directly compares your working code with the latest version; in this case, looking at the GUI is clearer)

- `git diff [SHA-1] [SHA-1]`

  What code changes occurred from version A to version B

- `git branch`

  List all current branch names (only local branches)

- `git branch -v`

  View the latest commit of each branch

- `git branch --all`

  List all current branch names (including remote branches)

- `git branch -m [original branch name] [new name]`

  Rename a branch

- `git branch -d [branch name]`

  (Scenario) Delete a branch that has been merged

- `git rebase` workflow

  1. `git checkout [branch name]`
  2. `git rebase main`
  3. If there are conflicts, start resolving them. After resolving a conflict, use `git add .`

     -`git rebase --continue`

     - A vi editor will appear; you can directly save the default commit by pressing :wq, which means save & exit

- `git rebase squash`
  Combine multiple commits into one (too detailed; when needed, refer to [How to Combine Multiple Commits into One Commit - Learn Git for Yourself | Kang-Chung Kao](https://gitbook.tw/chapters/rewrite-history/merge-multiple-commits-to-one-commit))
