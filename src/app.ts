import express from "express";
import { tasksRouter } from "./routes/tasks";

export function createApp() {
  const app = express();
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/tasks", tasksRouter);

  app.use((_req, res) => {
    res.status(404).json({ error: { code: "NOT_FOUND", message: "Rota não existe" } });
  });

  return app;
}
