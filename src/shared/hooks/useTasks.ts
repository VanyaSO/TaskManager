import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CreateUpdateTaskRequest,
  Task,
  UpdateTaskArgs,
} from "../types/task.ts";
import { createTask, getTasks, updateTask } from "../api/taskApi.ts";
import { useDispatch } from "react-redux";
import { addTaskAction } from "../store/taskSlice.ts";

export const useGetTasks = (section: string) => {
  return useQuery<Task[], Error>({
    queryKey: ["tasks", section],
    queryFn: () => getTasks(section),
  });
};

export const useCreateTask = () => {
  const dispatch = useDispatch();

  return useMutation<Task, Error, CreateUpdateTaskRequest>({
    mutationFn: createTask,
    onSuccess: (task: Task) => {
      dispatch(addTaskAction(task));
    },
  });
};

export const useUpdateTask = () => {
  return useMutation<Task, Error, UpdateTaskArgs>({
    mutationFn: ({ id, task }: UpdateTaskArgs) => updateTask(id, task),
  });
};
