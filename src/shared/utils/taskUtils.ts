import { TaskStatus } from "../types/task.ts";

const statusClasses: Record<TaskStatus, string> = {
  [TaskStatus.InProgress]: "in_progress",
  [TaskStatus.Completed]: "completed",
  [TaskStatus.Deleted]: "deleted",
};

export const getStatusClass = (status: TaskStatus): string =>
  statusClasses[status];
