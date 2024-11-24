import { create } from "zustand";
import { Task } from "../types/Task";

interface TaskStoreState {
    tasks: Task[];
}

interface TaskStoreAction {
    addTask: (task: Task) => void;
    removeTask: (id: string) => void;
    updateTask: (task: Task) => void;
}

export const useTaskStore = create<TaskStoreState & TaskStoreAction>((set) => ({
    tasks: [] as Task[],
    addTask: (task: Task) => {
        set((state) => ({ tasks: [...state.tasks, task] }))
    },
    updateTask: (task: Task) => {
        set((state) => ({ tasks: state.tasks.map((t) => t.id === task.id ? task : t) }))
    },
    removeTask: (id: string) => {
        set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) }))
    },
}))