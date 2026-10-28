import { z } from "zod";

export const listQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  status: z.enum(["todo", "doing", "done"]).optional(),
});

export const createTaskSchema = z.object({
  title: z.string().trim().min(1, "title é obrigatório").max(200),
  status: z.enum(["todo", "doing", "done"]).optional(),
});

export const updateTaskSchema = z
  .object({
    title: z.string().trim().min(1).max(200).optional(),
    status: z.enum(["todo", "doing", "done"]).optional(),
  })
  .refine((v) => v.title !== undefined || v.status !== undefined, {
    message: "Indica pelo menos um campo para alterar",
  });
