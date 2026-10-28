export type TaskStatus = "todo" | "doing" | "done";

export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  createdAt: string;
}

export interface Page<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
  };
}
