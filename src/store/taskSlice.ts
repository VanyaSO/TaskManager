import { Task, TaskStatus } from "../types/Task.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Task[] = [
  {
    id: "1",
    title: "Подготовиться к встрече с командой",
    description:
      "Составить список вопросов, подготовить презентацию по прогрессу проекта.",
    createdAt: new Date("2025-03-10T09:00:00Z"),
    lastModifiedAt: new Date("2025-03-12T14:30:00Z"),
    status: TaskStatus.InProgress,
    isArchived: false,
    tags: ["работа", "встреча", "подготовка"],
  },
  {
    id: "task-2",
    title: "Купить продукты",
    description: "Молоко, хлеб, яйца, овощи для ужина.",
    createdAt: new Date("2025-03-11T10:00:00Z"),
    lastModifiedAt: new Date("2025-03-13T18:00:00Z"),
    status: TaskStatus.InProgress,
    isArchived: false,
    tags: ["покупки", "дом"],
  },
  {
    id: "task-3",
    title: "Прочитать книгу по TypeScript",
    description: "Пройти главы 1-3, сделать заметки по типизации.",
    createdAt: new Date("2025-03-05T12:00:00Z"),
    lastModifiedAt: new Date("2025-03-14T09:00:00Z"),
    status: TaskStatus.InProgress,
    isArchived: false,
    tags: ["обучение", "программирование"],
  },
  {
    id: "task-4",
    title: "Сходить на тренировку",
    description: "Силовая тренировка в зале: 1 час, акцент на ноги.",
    createdAt: new Date("2025-03-15T07:00:00Z"),
    status: TaskStatus.InProgress,
    isArchived: false,
    tags: ["спорт", "здоровье"],
  },
  {
    id: "task-5",
    title: "Позвонить клиенту",
    description: "Обсудить детали проекта, уточнить сроки.",
    createdAt: new Date("2025-03-12T15:00:00Z"),
    status: TaskStatus.InProgress,
    isArchived: false,
    tags: ["работа", "звонок"],
  },
];

// const tasksSlice = createSlice({
//   name: "tasks",
//   initialState,
//   reducers: {},
// });

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // Редьюсер для добавления задачи
    addTask: (state, action: PayloadAction<Task>) => {
      state.push(action.payload); // Добавляем задачу в список
    },
    // Другие редьюсеры
  },
});

export const { addTask } = tasksSlice.actions;
export default tasksSlice.reducer;
