import { Play, Plus } from 'lucide-react';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { AddTask } from '../components/AddTask';
import { TaskItem } from '../components/TaskItem';
import { useTaskStore } from '../stores/taskStore';
import { Duration, Task } from '../types/Task';

function normalizeDuration(duration: Duration): Duration {
    const hours = duration.hours + Math.floor(duration.minutes / 60);
    const minutes = duration.minutes % 60;

    return { hours, minutes };
}

interface PlannerProps {
    taskId?: string;
};

export function Planner({ taskId = "" }: PlannerProps) {

    const [isAddFormOpen, setIsAddFormOpen] = useState(false);
    const { tasks: taskList, addTask } = useTaskStore();

    const totalDuration: Duration = normalizeDuration(taskList.reduce((cummulativeDuration, currentTask) => {
        return { hours: cummulativeDuration.hours + currentTask.duration?.hours || 0, minutes: cummulativeDuration.minutes + currentTask.duration?.minutes || 0 };
    }, { hours: 0, minutes: 0 } as Duration));

    return (
        <main role="planner" className='overflow-y-hidden'>
            <div role="task-list-info" className='flex justify-between mt-2 mb-6'>
                <p role="task-counter" className='text-2xl '>{taskList.length}</p>
                <p role="total-session-duration" className='text-2xl '>{totalDuration.hours.toString().padStart(2, '0')}h {totalDuration.minutes.toString().padStart(2, '0')}m</p>
            </div>
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
