export type Task = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  lastModifiedAt?: Date | null;
  status: TaskStatus;
  finalizedAt?: Date | null;
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
