import { Router, Response } from "express";
import { ZodError } from "zod";
import { getTask, insertTask, listTasks, updateTask } from "../db";
import { ApiError, Page, Task } from "../types";
import { createTaskSchema, listQuerySchema, updateTaskSchema } from "../validation";

export const tasksRouter = Router();

function sendError(res: Response, status: number, code: string, message: string) {
  const body: ApiError = { error: { code, message } };
  return res.status(status).json(body);
}

function sendValidationError(res: Response, err: ZodError) {
  const message = err.issues.map((i) => `${i.path.join(".") || "body"}: ${i.message}`).join("; ");
  return sendError(res, 400, "VALIDATION_ERROR", message);
}

// GET /tasks?page=1&limit=10&status=todo
tasksRouter.get("/", (req, res) => {
  const parsed = listQuerySchema.safeParse(req.query);
  if (!parsed.success) return sendValidationError(res, parsed.error);

  const { page, limit, status } = parsed.data;
  const all = listTasks().filter((t) => (status ? t.status === status : true));

  const offset = (page - 1) * limit;
  const items = all.slice(offset, offset + limit + 1);

  const body: Page<Task> = {
    items,
    page,
    limit,
    total: all.length,
    totalPages: Math.ceil(all.length / limit),
  };
  res.json(body);
});

// GET /tasks/:id
tasksRouter.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = Number.isInteger(id) ? getTask(id) : undefined;
  if (!task) return sendError(res, 404, "NOT_FOUND", `Tarefa ${req.params.id} não existe`);
  res.json(task);
});

// POST /tasks
tasksRouter.post("/", (req, res) => {
  const parsed = createTaskSchema.safeParse(req.body);
  if (!parsed.success) return sendValidationError(res, parsed.error);

  const task = insertTask(parsed.data.title, parsed.data.status);
  res.status(201).json(task);
});

// PATCH /tasks/:id
tasksRouter.patch("/:id", (req, res) => {
  const parsed = updateTaskSchema.safeParse(req.body);
  if (!parsed.success) return sendValidationError(res, parsed.error);

  const id = Number(req.params.id);
  const task = Number.isInteger(id) ? updateTask(id, parsed.data) : undefined;
  if (!task) return sendError(res, 404, "NOT_FOUND", `Tarefa ${req.params.id} não existe`);
  res.json(task);
});
