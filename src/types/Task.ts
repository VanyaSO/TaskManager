export type Task = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  lastModifiedAt?: Date | undefined;
  status: TaskStatus;
  finalizedAt?: Date | undefined;
  isArchived: boolean;
  tags: string[];
  options?: TaskAppearanceOptions;
};

export enum TaskStatus {
  Active = "Active",
  Completed = "Completed",
  Deleted = "Deleted",
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
