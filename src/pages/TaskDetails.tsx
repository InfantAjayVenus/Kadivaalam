import { Pencil, Trash, X } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useTaskStore } from "../stores/taskStore";
import { Planner } from "./Planner";
import { useState } from "react";
import { AddTask } from "../components/AddTask";
import { Task } from "../types/Task";

export function TaskDetails() {
    const { taskId } = useParams<{ taskId: string }>();
    const activeTask = useTaskStore((state) => state.tasks.find((task) => task.id === taskId));
    const { removeTask, updateTask } = useTaskStore();
    const [isEdit, setIsEdit] = useState(false);

    return (
        <>
            <Planner taskId={taskId} />
            {activeTask &&
                <aside className='fixed top-0 right-0 h-full w-full lg:w-1/5 border border-l-2 py-8 px-4 flex flex-col bg-background'>
                    {isEdit && 
                        <AddTask 
                            task={activeTask}
                            onAddTask={(title, description, duration) => {
                                updateTask({ id: taskId, title, description, duration } as Task)
                                setIsEdit(false);
                            }} 
                            onClose={() => setIsEdit(false)} 
                        />
                    }
                    {!isEdit &&
                        <>
                            <header className='mb-12 flex items-center justify-between'>
                                <h3 role="active-task-title" className='text-2xl font-bold '>{activeTask.title}</h3>
                                <Link
                                    to="/session-planner"
                                    role='go-back-to-list-button'
                                    className='text-2xl font-bold text-foreground hover:underline'
                                ><X /> </Link>
                            </header>
                            <p role="active-task-description">{activeTask.description}</p>
                            <div role="button-group" className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col gap-2">
                                <button
                                    className=" mx-auto flex items-center gap-2 border border-foreground py-2 px-4 rounded-lg "
                                    onClick={() => setIsEdit(true)}
                                >
                                    Edit Task <Pencil />
                                </button>
                                <button
                                    className=" mx-auto flex items-center gap-2 border border-foreground py-2 px-4 rounded-lg text-red-600"
                                    onClick={() => removeTask(activeTask.id)}
                                >
                                    Delete Task <Trash />
                                </button>
                            </div>
                        </>
                    }

                </aside>
            }

        </>
    )
}