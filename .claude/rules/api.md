---
paths:
  - "src/routes/**/*.ts"
---

- Todos os endpoints validam o input com zod (schemas em `src/validation.ts`)
- Erros devolvem `{ error: { code, message } }` através de `sendError`
- Cada endpoint novo tem pelo menos um teste em `tests/`
