## LEAN BACKLOG TEMPLATE

# Project Backlog: [Project Name]
> [Insert 1-2 sentence core purpose]

## 📊 Backlog Task Configuration Ledger
| Dimension | Key / Token | Operational Definition | Engine Action |
| :--- | :--- | :--- | :--- |
| **Type** | `[feat]`<br>`[bug]`<br>`[chore]`<br>`[spike]` | Conventional commit classification types. | Enforces branch prefixes and conventional commit keys. |
| **Priority** | `P0`<br>`P1`<br>`P2` | Blocker / Critical Path<br>High Priority Feature Suite<br>Routine Optimization / Polish | Dictates runner execution sorting priority. |
| **Effort / Size** | `S`<br>`M`<br>`L` | Micro-Outcome (< 1 day)<br>Standard Feature Block (1–3 days)<br>Complex Cross-Package Integration | Calibrates internal agent execution thresholds. |
| **Status** | `[DRAFT]` <br> `[ACTIVE: loop_id]` <br> `[MERGED]` | Inactive configuration state<br>Ready for local development pass<br>Code verified and merged to local main | `[DRAFT]` is ignored; `[ACTIVE]` locks an agent runner; `[MERGED]` archives the contract. |
| **Relations** | `🛑 Blocked by [Task ID]` <br> `🔄 Supersedes [Task ID]` <br> `🔗 Related to [Task ID]` <br> `🔗 Related ADR [ADR-ID]` | **Dependency Linkages:**<br>- Execution constraint.<br>- Architectural pivot/refactor override.<br>- Bidirectional technical association.<br>- Design decision binding. | Enforces execution sorting barriers and tracks codebase lineage. |

---

## 🛠️ [TECHNICAL EPICS REGION]

### Epic 0: Tooling & Infrastructure
- **Core Domain Statement:** Baseline framework initialization, containerization, and dependency configuration.
- **Success Criteria:** Local environment running without console errors; linters and formatters active.
- **Governing Constraints:** [Insert search-verified constraints]

#### 🛠️ Execution Task Matrix
| Task ID | Type | Target Technical Scope / Objective | Pri | Size | Status | Relations / Lineage |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Epic0-chore-01** | `[chore]` | [Search-verified tooling task definition] | P0 | S | `[DRAFT]` | None |

---

## 🎯 [FUNCTIONAL EPICS REGION]

### Epic [ID]: [Insert Epic Name]
- **Core Domain Statement:** [1–2 sentences defining the functional domain target].
- **Success Criteria:** [Measurable business outcomes].
- **Out-of-Scope:** [Explicit feature boundaries].

#### US-[ID]: [User Story Name]
- **Intent:** As a [Role Token], I want to [Action], so that [Value].
- **Scope Bounds:** 2–3 sentences defining what this story explicitly includes and excludes.
- **Artifact Link:** `docs/stories/US-[ID].md`