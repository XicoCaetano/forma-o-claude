# tasks-api

API de tarefas em Node.js + TypeScript usada na formação **Claude para Desenvolvimento**.

## Antes da sessão

```bash
git clone <url-deste-repositorio>
cd tasks-api
npm install
npm test        # é esperado que 1 teste falhe: faz parte do desafio
```

Precisas de Node.js 20+, git, `jq` e o Claude Code instalado com login feito.

## Comandos

| Comando          | O que faz                                                          |
| ---------------- | ------------------------------------------------------------------ |
| `npm run dev`    | Arranca a API em `http://localhost:3000` com 25 tarefas de exemplo |
| `npm test`       | Corre os testes (Jest + supertest)                                 |
| `npm run lint`   | ESLint                                                             |
| `npm run format` | Prettier em todo o projeto                                         |

## Endpoints

| Método | Caminho                              | Descrição                                                 |
| ------ | ------------------------------------ | --------------------------------------------------------- |
| GET    | `/health`                            | Estado da API                                             |
| GET    | `/tasks?page=1&limit=10&status=todo` | Lista paginada                                            |
| GET    | `/tasks/:id`                         | Uma tarefa                                                |
| POST   | `/tasks`                             | Cria uma tarefa (`{ "title": "...", "status"?: "todo" }`) |
| PATCH  | `/tasks/:id`                         | Altera `title` e/ou `status`                              |

## Desafio (20 minutos)

Prepara este repositório para a equipa e usa a configuração para corrigir um bug.

| #     | Tarefa                                                                                                                                                           | Pontos |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| 1     | Criar um **CLAUDE.md** com no máximo 30 linhas: comandos de teste/lint/format, uma convenção do projeto e uma armadilha                                          | 2      |
| 2     | Criar uma **rule** em `.claude/rules/` com `paths` que só se aplique a `src/routes/**`                                                                           | 1      |
| 3     | Criar uma **skill** `/fix-issue` que recebe a descrição do problema como argumento e obriga a: escrever primeiro um teste que falhe, corrigir, correr `npm test` | 3      |
| 4     | Criar um **subagent** `test-runner` que corre os testes e devolve só os que falham, sem poder editar ficheiros e usando o modelo Haiku                           | 2      |
| 5     | Criar um **hook** `PostToolUse` que corre o Prettier no ficheiro editado                                                                                         | 2      |
| 6     | **Usar tudo:** correr `/fix-issue` para corrigir o bug da paginação e confirmar com o `test-runner` que os testes passam                                         | 3      |
| Bónus | Adicionar um servidor MCP em âmbito `project` (`.mcp.json`) **ou** empacotar a skill e o subagent num plugin                                                     | +2     |

**O bug:** `GET /tasks?page=2&limit=10` devolve 11 itens em vez de 10.

**Regras:** podem (e devem) pedir ao Claude para escrever os ficheiros. Os pontos só contam se a peça funcionar.

Dicas: `/context`, `/hooks`, `/memory` e `/skills` ajudam a confirmar que cada peça carregou.

> O ficheiro `.env` contém apenas valores falsos.
