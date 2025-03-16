import { RootState } from "./store.ts";

export const selectTasks = (state: RootState) => state.tasks;
