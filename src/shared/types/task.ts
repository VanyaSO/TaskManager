export type Task = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  lastModifiedAt?: string | null;
  status: TaskStatus;
  finalizedAt?: string | null;
  isArchived: boolean;
  tags: string[];
  options?: TaskAppearanceOptions;
};

export enum TaskStatus {
  InProgress = "В процессе",
  Completed = "Выполнено",
  Deleted = "Удалено",
}

export type TaskAppearanceOptions = {
  backgroundColor?: string;
};

export type CreateUpdateTaskRequest = {
  title: string;
  description: string;
  tags: string[];
  options?: TaskAppearanceOptions;
  status?: TaskStatus;
  isArchived?: boolean;
};

export type UpdateTaskArgs = {
  id: string;
  task: Partial<CreateUpdateTaskRequest>;
};
