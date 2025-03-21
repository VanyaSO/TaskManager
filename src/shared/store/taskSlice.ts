import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../types/task.ts";

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasksAction: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    addTaskAction: (state, action: PayloadAction<Task>) => {
      state.tasks = [action.payload, ...state.tasks];
    },
    updateTaskAction: (state, action: PayloadAction<Task>) => {
      const updatedTask: Task = action.payload;
      const taskIndex: number = state.tasks.findIndex(
        (task) => task.id === updatedTask.id,
      );

      if (taskIndex !== -1) {
        state.tasks[taskIndex] = updatedTask;
      }
    },
    deleteTaskAction: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export const {
  setTasksAction,
  addTaskAction,
  updateTaskAction,
  deleteTaskAction,
} = tasksSlice.actions;
export default tasksSlice.reducer;
