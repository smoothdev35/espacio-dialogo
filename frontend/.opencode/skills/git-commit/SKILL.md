---
name: git-commit
description: Run git status, select files to stage, and generate a validated conventional commit message from the staged diff.
---

## Prerequisites

You must execute commands directly inside the active workspace shell.

## Execution Rules

1. **Check Status**: Execute `git status` to see unstaged and staged changes.
2. **Elicit Scope**: Present the file list to the user and ask: "Which files or directories should be staged for this commit?"
3. **Stage Files**: Execute `git add <user_selection>` based strictly on their answer.
4. **Inspect Changes**: Execute `git diff --cached` to read the exact lines changing.
5. **Formulate Intent**: Generate a commit message based _only_ on the cached diff. You must strictly use the Conventional Commits specification:
   `<type>(<scope>): <short description in imperative present tense>`

   _Allowed Types_: feat, fix, docs, style, refactor, perf, test, build, ci, chore.

   **Commit Body Rule**: If the short description is insufficient to encapsulate the scope of the changes (such as multiple multi-file logical shifts, critical breaking risks, or structural re-architecting), you may choose to include a comprehensive commit body. Separate the body from the header with a blank line, and ensure it explains the context and reasoning behind the change, not just a line-by-line summary of code.

6. **Verify First**: Present the full message (header and optional body) to the user and halt execution. Ask: "Do you approve this commit message? (y/n)".
7. **Finalize**: Only after explicit text confirmation, run `git commit -m "<message>"` and `git push`.
