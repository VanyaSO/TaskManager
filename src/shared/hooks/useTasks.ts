import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateTaskRequest, Task } from "../types/task.ts";
import { createTask, getTasks } from "../api/taskApi.ts";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { addTask } from "../store/taskSlice.ts";

export const useGetTasks = (section: string) => {
  return useQuery<Task[], Error>({
    queryKey: ["tasks", section],
    queryFn: () => getTasks(section),
  });
};

export const useCreateTask = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();

  return {
    contextHolder,
    createTask: useMutation<Task, Error, CreateTaskRequest>({
      mutationFn: createTask,
      onSuccess: (task: Task) => {
        messageApi.success("Задача добавлена");
        dispatch(addTask(task));
      },
      onError: (error) => {
        messageApi.error(error.message);
      },
    }),
  };
};
