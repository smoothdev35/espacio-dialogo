# TASK-[TASK-ID]: [Short Task/Scope Name]

## 1. Execution Objective & Scope

- **Objective:** [A concise engineering statement defining the target functional boundaries and concrete exit criteria for this work unit.]
- **Parent Reference:** [Ref: Epic [Epic ID] or Ref: US-[User Story ID]]

---

## 2. Micro Behavioral State Machine

<!--
  This defines the behavioral boundaries and input/output contracts for this specific task.
  It is a functional guardrail, NOT an implementation dictate. The execution agent retains full autonomy over the technical implementation (hooks, local state, private interfaces).
-->

```text
[Initial State / Setup] ➔ [Action / Trigger]     ➔ [Target State / Outcome] | Guard / Success Criteria
───────────────────────────────────────────────────────────────────────────────────────────────────
[STATE_A]               ➔ [TRIGGER]              ➔ [STATE_B]                | if constraint == true
```
