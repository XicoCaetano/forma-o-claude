# tasks-api

API de tarefas em Express + TypeScript. Base de dados em memória (`src/db.ts`).

## Comandos

- Testes: `npm test` (Jest + supertest). Correr sempre antes de dar uma tarefa por terminada.
- Lint: `npm run lint` · Format: `npm run format` · Tipos: `npx tsc --noEmit`

## Convenções

- Validação de input com zod em `src/validation.ts`; as rotas só usam `safeParse`.
- Erros devolvem sempre `{ error: { code, message } }` (ver `sendError` em `src/routes/tasks.ts`).
- Paginação: `page` começa em 1, `limit` por defeito 10, máximo 100.

## Armadilhas

- Os testes usam `resetDb()`/`seedDb(n)`; nunca depender da ordem de execução entre testes.
- Nunca ler nem alterar o `.env`.
