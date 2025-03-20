import { RootState } from "./store.ts";

export const selectorTasks = (state: RootState) => state.tasks;
