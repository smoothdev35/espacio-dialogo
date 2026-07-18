---
name: evaluate-backlog-state
description: Evaluates conversation logs against the 4 elicitation states to track backlog readiness.
compatibility: opencode
---

## Objective

Analyze the provided conversation history against the 4 execution states. Determine the active state, check if current state requirements are fulfilled, and output a strict JSON schema response.

## Execution States to Enforce

### State 1: Context Definition

- Required: 1-2 sentence core purpose, exact target stack.

### State 2: Infrastructure Strategy (Requires Web Search)

- Required: Containerization requirements, strict dependency constraints (minimum release age, package manager).
- Critical Rule: If the user provides this, the output schema must flag `search_mandate_required: true` to trigger the agent's web search and context7 mandate.

### State 3: Actor Mapping

- Required: Specific user personas and high-level permission boundaries. (Can be collapsed into a single sentence if no user-facing access layer exists).

### State 4: Domain Model

- Required: Core domain concepts and their relationships/dependencies (if a persistent data layer exists).

## Expected Output JSON Schema

```json
{
  "current_state": 1,
  "state_confirmed_by_user": false,
  "search_mandate_required": false,
  "search_query_suggestion": "string or null",
  "missing_information": ["string"],
  "next_action_instruction": "string"
}
```
