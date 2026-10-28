import request from "supertest";
import { createApp } from "../src/app";
import { resetDb, seedDb } from "../src/db";

const app = createApp();

beforeEach(() => {
  resetDb();
});

describe("GET /health", () => {
  it("responde ok", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });
});

describe("GET /tasks", () => {
  it("devolve uma lista vazia quando não há tarefas", async () => {
    const res = await request(app).get("/tasks");
    expect(res.status).toBe(200);
    expect(res.body.items).toEqual([]);
    expect(res.body.total).toBe(0);
  });

  it("usa page=1 e limit=10 por defeito", async () => {
    seedDb(3);
    const res = await request(app).get("/tasks");
    expect(res.body.page).toBe(1);
    expect(res.body.limit).toBe(10);
    expect(res.body.items).toHaveLength(3);
  });

  it("devolve exatamente `limit` itens na página 2", async () => {
    seedDb(25);
    const res = await request(app).get("/tasks?page=2&limit=10");
    expect(res.status).toBe(200);
    expect(res.body.items).toHaveLength(10);
    expect(res.body.items[0].id).toBe(11);
    expect(res.body.items[9].id).toBe(20);
  });

  it("calcula o total de páginas", async () => {
    seedDb(25);
    const res = await request(app).get("/tasks?limit=10");
    expect(res.body.total).toBe(25);
    expect(res.body.totalPages).toBe(3);
  });

  it("filtra por estado", async () => {
    await request(app).post("/tasks").send({ title: "A", status: "done" });
    await request(app).post("/tasks").send({ title: "B" });
    const res = await request(app).get("/tasks?status=done");
    expect(res.body.items).toHaveLength(1);
    expect(res.body.items[0].title).toBe("A");
  });

  it("rejeita page inválido", async () => {
    const res = await request(app).get("/tasks?page=0");
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe("VALIDATION_ERROR");
  });
});

describe("POST /tasks", () => {
  it("cria uma tarefa", async () => {
    const res = await request(app).post("/tasks").send({ title: "Preparar formação" });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ id: 1, title: "Preparar formação", status: "todo" });
  });

  it("rejeita título vazio", async () => {
    const res = await request(app).post("/tasks").send({ title: "  " });
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe("VALIDATION_ERROR");
  });
});

describe("PATCH /tasks/:id", () => {
  it("atualiza o estado", async () => {
    seedDb(1);
    const res = await request(app).patch("/tasks/1").send({ status: "done" });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("done");
  });

  it("devolve 404 para uma tarefa que não existe", async () => {
    const res = await request(app).patch("/tasks/999").send({ status: "done" });
    expect(res.status).toBe(404);
    expect(res.body.error.code).toBe("NOT_FOUND");
  });
});
