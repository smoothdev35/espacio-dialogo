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
