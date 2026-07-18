# AGENTS.md — System Execution Blueprint

## Project Architecture
- This repository utilizes a Split-Root layout.
- Applications are completely separated: `./frontend` handles the Astro UI, `./backend` houses Strapi 5.
- Do NOT attempt to resolve dependencies via a shared root workspace graph or global pnpm configuration.

## Development Orchestration
- Local environments execute entirely via Docker Compose at the root.
- Database services run on PostgreSQL.
- Application-specific environment states are loaded directly from localized `.env` profiles inside their respective subdirectories.

## Security Constraints
- Never read, write, or output literal contents of any `.env` parameters.
- Version strings within application manifests must remain strictly pinned; do not inject loose caret (^) or tilde (~) qualifiers.

# Global Execution Rules: Plan-Then-Execute
**Mandatory Task Matrix:** Before invoking any write, edit, or execution tool, every primary agent MUST generate an in-memory execution plan (Task Matrix). 

1. **Decompose:** Break the requested objective into a strict, sequential list of discrete sub-tasks.
2. **Scope Constraint:** Verify that all planned sub-tasks fall strictly within the agent's defined role and loaded skills.
3. **Sequential Execution:** Execute the matrix step-by-step. If an unexpected runtime error or constraint gap occurs, halt execution, evaluate the root cause, and update the Task Matrix before resuming file operations.

## SYSTEM GUARDRAIL: PAYLOAD COMPRESSION (HEADROOM)

To maintain deterministic execution stability and maximize context efficiency during full-stack TypeScript development, you must actively manage large tool payloads using the Headroom MCP.

1. **The Compression Threshold:** If you execute a file read, log extraction, or bash command that generates an output exceeding 1,500 lines or 8,000 tokens (e.g., massive JSON dumps, extensive terminal logs, or large build outputs), you must route that payload through `headroom_compress` before continuing your reasoning loop. 
2. **Preserve Code & Types:** Never compress standard TypeScript files, React components, schema definitions, or routing files unless they explicitly exceed the threshold, as full context is required to maintain structural and type safety.
3. **Prohibit Raw Dumps:** Never output massive, uncompressed data dumps directly into the visible chat history. 
4. **Surgical Retrieval:** If a compressed summary lacks the specific syntax, type parameters, or stack trace details required to complete your task, use `headroom_retrieve` to extract only the necessary segments.