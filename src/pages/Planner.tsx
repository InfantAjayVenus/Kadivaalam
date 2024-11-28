import { Play, Plus } from 'lucide-react';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { AddTask } from '../components/AddTask';
import { TaskItem } from '../components/TaskItem';
import { useTaskStore } from '../stores/taskStore';
import { Task } from '../types/Task';

interface PlannerProps {
    taskId?: string;
};

export function Planner({ taskId = "" }: PlannerProps) {

    const [isAddFormOpen, setIsAddFormOpen] = useState(false);
    const { tasks: taskList, addTask } = useTaskStore();

    return (
        <main role="planner" className='overflow-y-hidden'>
            <p role="task-counter" className='text-2xl mt-2 mb-6'>{taskList.length}</p>
            {(!isAddFormOpen && taskList.length === 0) &&
                <ol
                    role="task-advice-list"
                    className='list-inside list-decimal text-center text-xl space-y-2 lg:text-2xl lg:space-y-8'
                >
                    <li>Create a task by adding a short title, a clear description and a time allocated for the task</li>
                    <li>Be as specific as possible for each task</li>
                    <li>If a task is too long, break it up into smaller tasks, typically not more than 40 minutes</li>
                    <li>Take short breaks between tasks</li>
                </ol>

            }
            {taskList.length > 0 &&
                <ul role="tasks-list" className='max-h-96 mb-4 space-y-4'>
                    {taskList.map(taskItem => (
                        <TaskItem task={taskItem} key={taskItem.id} isActive={taskItem.id === taskId} />
                    ))}
                </ul>
            }
            {isAddFormOpen &&
                <AddTask
                    onAddTask={(title, description, duration) => {
                        const id = nanoid();
                        const newTask: Task = {
                            id,
                            title,
                            description,
                            duration 
                        }

                        addTask(newTask);

                    }}
                    onClose={() => setIsAddFormOpen(false)}
                />
            }
            <div role='button-group' className='mt-16 flex flex-col space-y-6'>
                <button
                    role='add-task-button'
                    onClick={() => setIsAddFormOpen(true)}
                    disabled={isAddFormOpen}
                    className='flex items-center justify-center space-x-2 mx-auto  border border-foreground rounded-2xl py-2 px-16 text-xl font-bold w-fit disabled:border-secondary disabled:text-secondary'
                >
                    Add Task <Plus size={32} />
                </button>
                {taskList.length > 0 &&
                    <a
                        href="/work-board"
                        role="start-session-link"
                        className='flex items-center justify-center space-x-2 mx-auto  border border-foreground rounded-2xl py-2 px-16 text-xl font-bold disabled:border-secondary disabled:text-secondary'
                    >
                        Start Session <Play size={32} />
                    </a>
                }
            </div>
        </main >
    );
}
