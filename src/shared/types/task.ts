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
  backgroundImage?: BackgroundImageOptions;
  width: number;
  height: number;
};

export type BackgroundImageOptions = {
  imageUrl?: string;
  imageFile?: File;
  opacity?: number;
  width?: number;
  height?: number;
  positionX?: number;
  positionY?: number;
};

export type CreateTaskRequest = {
  title: string;
  description: string;
  tags: string;
};
