import {CreateUpdateTaskRequest, Task} from "../types/task.ts";

const url = "http://localhost:4000/api";

export const getTasks = async (section: string): Promise<Task[]> => {
  const response = await fetch(
    `${url}/tasks${section === "archive" ? "/archive" : ""}`,
  );
  if (!response.ok) throw new Error("Ошибка при загрузке");

  return await response.json();
};

export const createTask = async (task: CreateUpdateTaskRequest): Promise<Task> => {
  const response = await fetch(`${url}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) throw new Error("Ошибка при создании задачи");

  return await response.json();
};

export const updateTask = async (id: string, task: Partial<CreateUpdateTaskRequest>): Promise<Task> => {
  const response = await fetch(`${url}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  })
  if (!response.ok) throw new Error("Ошибка при обновлении задачи");

  return await response.json();
}

