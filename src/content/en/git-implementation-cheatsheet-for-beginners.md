---
title: Git Implementation Cheatsheet for Beginners
subtitle: Git is a distributed version control system mainly used to manage and track code changes, particularly suitable for collaborative development projects.
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

The first time I encountered Git, I immediately loved it. Before learning programming, I never imagined that files could be managed in such a systematic way, clearly showing the differences between versions and who wrote what. If you regret making changes, you can easily revert to previous versions.

With Git, version control and collaboration become much easier and clearer. I even think all non-engineers should learn to use such a version control system for file management.

This article aims to organize my current Git habits (workflows).

Although there are still many Git functionalities I don't know how to use, I can share my typical usage patterns as a personal implementation cheat sheet, helping beginners quickly get started!

The content is mainly divided into two parts: **[Basic Workflow](#basic-workflow)** and **[Collaboration](#collaboration)**, with some additional explanations at the end.

## Table of Contents

- [Basic Workflow](#basic-workflow)
- [Additional: What if you regret after committing (before pushing to GitHub)?](#additional-what-if-you-regret-after-committing-before-pushing-to-github)
  - [Situation 1: You committed by mistake (but want to keep your code changes in the working directory)](#situation-1-you-committed-by-mistake-but-want-to-keep-your-code-changes-in-the-working-directory)
  - [Situation 2: You broke your code (and want to completely revert)](#situation-2-you-broke-your-code-and-want-to-completely-revert)
- [Collaboration](#collaboration)
- [Additional: Reviewing others' PRs](#additional-reviewing-others-prs)
- [Other Knowledge](#other-knowledge)
- [Other Commands](#other-commands)

## **Basic Workflow**

1. `git init`

   Initialize a project (start version control in this folder)

2. `touch .gitignore`

   Create a file for ignored files

3. `git add .`

   After finishing a segment of code changes, add all files to the version control system

4. `git commit -m "[commit message]"`

   Submit a change and write your commit message

   **Recommended git commit message format
   (I referenced this article: [Recommended git commit message format](https://wadehuanglearning.blogspot.com/2019/05/commit-commit-commit-why-what-commit.html)):**

   - feat: Add/modify features
   - fix: Fix bugs
   - docs: Documentation
   - style: Formatting (changes that don't affect code execution: white-space, formatting, missing semi-colons, etc.)
   - refactor: Refactoring (code changes that neither add features nor fix bugs)
   - perf: Improve performance
   - test: Add tests
   - chore: Changes to build processes or auxiliary tools
   - revert: Revert previous commits

Repeat steps 3 & 4 continuously

5. GitHub + new repository

   Upload the project to GitHub (follow the instructions provided by GitHub)

6. `git push origin [branch name]`

   After committing, push this branch to GitHub

Any time you want to update your code on GitHub to the latest version, execute step 6

## **Additional: What if you regret after committing (before pushing to GitHub)?**

(For detailed information, see [What if I regret my commit and want to undo it... - Learn Git for Yourself | Kaiying Lung](https://gitbook.tw/chapters/using-git/reset-commit))

### Situation 1: You committed by mistake (but want to keep your code changes in the working directory)

- `git log --oneline`

  View a summary of the commit history

- `git reset b339b8d^` (replace the ID as needed)
  Restore to the version before b339b8d (while keeping your code changes)

### Situation 2: You broke your code (and want to completely revert)

- `git reset --hard HEAD`

  Restore to the latest committed version

- `git reset --hard HEAD~1`
  Restore to the previous committed version (to go back further: ~2, ~3, ~4...)

## **Collaboration**

1. `git checkout -b [branch name]`

   Create a new branch and switch to it

   Alternative approach:

   1. `git branch [branch name]`

      Create a new branch

   2. `git checkout [branch name]`

      Switch to the branch

2. (Write code...repeating steps 3 & 4 of the basic workflow)

3. `git push origin [branch name]`

   Push to GitHub

4. Go to your repo, write & create a PR (Pull Request)

5. Copy the PR link and give it to your colleagues (such as supervisors, coworkers, etc.)

6. (After your colleagues review and merge) `git checkout main`

   Switch to main

7. `git pull origin main`

   Pull the latest changes

   Alternative approach:

   1. `git fetch origin`

      Fetch remote updates

   2. `git merge origin/main`

      Merge remote updates

After developing or updating a feature, before creating a PR, it's best to execute steps 6 & 7, then merge the latest main into your branch. If conflicts occur, it's better to resolve them locally before creating the PR.

One of the biggest differences between collaboration and solo coding is the need to resolve conflicts, which requires more experience.

## **Additional: Reviewing others' PRs**

If you want to review locally, use steps 1 + 2:

1. `git fetch origin`

   Fetch remote updates

2. `git checkout [branch name]`

   Switch to the branch

3. (After checking and approving) `git checkout main`

   Switch back to the main branch

4. `git merge [branch name]`

   Merge the branch into main

5. If there are no conflicts, the merge into main will proceed smoothly; if there are conflicts, they must be resolved before merging

   - How to reduce conflict situations?

     1. The art of work distribution
     2. Merge the latest main into your branch before creating a PR

   - Topic for future collaboration discussions: If there are conflicts, should the reviewer merge or the PR creator merge?

     Theoretically, the reviewer should merge into the main branch after checking. However, in case of conflicts, the PR creator might understand the code better (since they wrote it). Should the PR creator resolve conflicts in this case?

## **Other Knowledge**

(I referenced [mentor-program-5th/examples/week1](https://github.com/Lidemy/mentor-program-5th/tree/master/examples/week1))

- In version control, Git intelligently stores "file differences" rather than creating a new folder for each branch or copying files for each commit. Additionally, Git uses its own compression algorithms for each file, so it's normal for the repository to be smaller than your files.

- Master is just the "default branch" or typically the main branch, but this doesn't mean it's the "latest branch." For example, you could create a branch called "test" and continuously add to it without ever merging back to main/master, making test the latest branch in your project. The latest content isn't necessarily in the master branch.

- When creating a PR, if you want to change something, you can make changes locally, commit, and push. The PR on GitHub will automatically update; you don't need to do anything else, certainly not close and reopen the PR. Since the PR's core is the "branch," when the branch updates, the PR content naturally updates with it.

## **Other Commands**

- `git clone URL`

  Clone a GitHub project to your local machine

- `git status`

  Check status

- `git log`

  View history

- `git diff`

  Compare differences (if no parameters are added after the command, it directly compares your working code with the latest version; in this case, viewing in a GUI is clearer)

- `git diff [SHA-1] [SHA-1]`

  See code changes from version A to version B

- `git branch`

  List all current branch names (local branches only)

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
  3. If conflicts occur, resolve them; after resolving a conflict, use `git add .`

     -`git rebase --continue`

     - A vi editor will appear; you can directly save the default commit by pressing :wq (save & exit)

- `git rebase squash`
  Combine multiple commits into one (too complex; when needed, refer to [How to Combine Multiple Commits into One Commit - Learn Git for Yourself | Kaiying Lung](https://gitbook.tw/chapters/rewrite-history/merge-multiple-commits-to-one-commit))
