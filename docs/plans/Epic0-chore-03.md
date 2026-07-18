# Epic0-chore-03: Strapi 5 Content Type Schemas

## Objective
Configure 4 Strapi 5 collection types (Article, Author, Category, Tag) matching frontend types from Epic0-chore-02, with draft/publish enabled and public API access.

## Content Type Directory

| Content Type | Kind | Relations |
|---|---|---|
| `category` | collectionType | oneToMany → article (mappedBy: category) |
| `tag` | collectionType | manyToMany → article (mappedBy: tags) |
| `author` | collectionType | oneToMany → article (mappedBy: author) |
| `article` | collectionType | manyToOne → author, manyToOne → category, manyToMany → tags |

## Task Matrix

1. Create `backend/src/api/{name}/content-types/{name}/schema.json` for each CT
2. Update `backend/src/index.ts` — bootstrap grants Public role `find`/`findOne` permissions
3. Update `docs/backlog.md` — status `[DRAFT] → [ACTIVE]`

## Verification

```bash
docker compose build backend
docker compose up -d
# Confirm API responds:
curl http://localhost:1337/api/articles
# → 200 { data: [], meta: { ... } }
```
