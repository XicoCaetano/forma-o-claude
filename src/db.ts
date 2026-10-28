import { Task, TaskStatus } from "./types";

// Base de dados em memória. Não há migrações nem persistência:
// tudo é perdido quando o processo termina.
let tasks: Task[] = [];
let nextId = 1;

export function listTasks(): Task[] {
  return [...tasks];
}

export function getTask(id: number): Task | undefined {
  return tasks.find((t) => t.id === id);
}

export function insertTask(title: string, status: TaskStatus = "todo"): Task {
  const task: Task = {
    id: nextId++,
    title,
    status,
    createdAt: new Date().toISOString(),
  };
  tasks.push(task);
  return task;
}

export function updateTask(id: number, changes: Partial<Omit<Task, "id">>): Task | undefined {
  const task = getTask(id);
  if (!task) return undefined;
  Object.assign(task, changes);
  return task;
}

/** Apaga tudo. Usado pelos testes. */
export function resetDb(): void {
  tasks = [];
  nextId = 1;
}

/** Cria `count` tarefas de exemplo com ids 1..count. */
export function seedDb(count: number): void {
  resetDb();
  for (let i = 1; i <= count; i++) {
    insertTask(`Tarefa ${i}`);
  }
}
