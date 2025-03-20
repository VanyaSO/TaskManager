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
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks = [action.payload, ...state.tasks];
    },
  },
});

export const { setTasks, addTask } = tasksSlice.actions;
export default tasksSlice.reducer;
