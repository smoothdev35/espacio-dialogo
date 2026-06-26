---
name: git-commit
description: Group modified files into logical topics and iteratively commit them using the Conventional Commits specification.
---

## Prerequisites

You must execute commands directly inside the active workspace shell.

## Execution Rules

You must follow this exact sequence. Do not skip steps. You are strictly prohibited from committing all files at once unless they logically belong to a single atomic change.

1. **Check Status**: Execute `git status` to identify all untracked, unstaged, and staged changes. If the working tree is clean, exit.
2. **Analyze & Group**: Read the modified files (execute `git diff` or `git diff --cached` for context). Group the changed files into logical, atomic topics (e.g., "API routes", "UI components", "Configuration tweaks").
3. **Propose Plan**: Present the proposed groups to the user. For each group, list the target files and a drafted Conventional Commit message.
4. **Elicit Scope**: Halt execution and ask: "Which group of files should we stage and commit first? Or would you like to adjust the groupings?" Wait for user input.
5. **Stage Files**: Execute `git add <selected_files>` based strictly on the user's selection.
6. **Inspect Changes**: Execute `git diff --cached` to read the exact lines changing in the staged files.
7. **Formulate Intent**: Generate the final commit message based _only_ on the cached diff. You must strictly use the Conventional Commits specification:
   `<type>(<scope>): <short description in imperative present tense>`

   _Allowed Types_: feat, fix, docs, style, refactor, perf, test, build, ci, chore.

   _Commit Body Rule_: If the short description is insufficient to encapsulate the scope of the changes, include a comprehensive commit body. Separate the body from the header with a blank line. Explain the context and reasoning behind the change, not just a line-by-line summary.

8. **Verify First**: Present the full message (header and body) to the user. Halt execution and ask: "Do you approve this commit message? (y/n)". Wait for user input.
9. **Finalize**: Only after explicit "y" confirmation, run `git commit -m "<message>"`. Do not push.
10. **Evaluate Loop**: After a successful commit, execute `git status` again.
    - If there are remaining uncommitted changes, go back to **Step 3** and propose the next group.
    - If the working tree is clean, terminate the task.
