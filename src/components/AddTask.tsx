import { Check, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-autosize-textarea";
import { useTimescape } from "timescape/react";
import { Task } from "../types/Task";

interface AddTaskProps {
    task?: Task;
    onAddTask: (taskTitle: string, taskDescription: string, duration: { hours: number, minutes: number }) => void;
    onClose: () => void;
}

export function AddTask({ 
    onAddTask, 
    onClose, 
    task = {
        id: "",
        title: "",
        description: "",
        duration: { hours: 0, minutes: 0 },
    } as Task 
}: AddTaskProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState({ hours: 0, minutes: 0 });
    const {getRootProps, getInputProps, update} = useTimescape({
        date: (() => {
            const hours = task?.duration?.hours || 0;
            const minutes = task?.duration?.minutes || 0;
            return new Date(0, 0, 0, hours, minutes);
        })(),
        digits: '2-digit',
        onChangeDate: (nextDate) => {
            if(!nextDate) return;
            const hours = nextDate.getHours();
            const minutes = nextDate.getMinutes();

            setDuration({ hours, minutes });
        }
    });

    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if(!task) return;
        setTitle(task?.title);
        setDescription(task?.description);
        setDuration(task?.duration);
    }, [task.title, task.description, task.duration.hours, task.duration.minutes]);

    return (

        <form
            className="border border-foreground rounded-2xl flex flex-col p-6 space-y-2"
            role="add-task-form"
            onSubmit={(submitEvent) => {

                submitEvent.preventDefault();
                onAddTask(title, description, duration);
                submitEvent.currentTarget.reset();
            }}
            onReset={(event) => {
                event.preventDefault();
                event.stopPropagation();

                setTitle('');
                setDescription('');
                setDuration({ hours: 0, minutes: 0 });
                update((prev) => ({...prev, date: new Date(0, 0, 0, 0, 0)}))
                inputRef.current?.focus();
            }}
        >
            <div 
                role="group text input and time input for better UI"
                className="w-full flex flex-row border-b border-foreground"
            >
                <label htmlFor="task-title" role="task-title-label" className="sr-only">Task Title</label>
                <input
                    ref={inputRef}
                    tabIndex={0}
                    type="text"
                    name="Task Title"
                    aria-label="Task Title"
                    id="task-title"
                    role="task-title-input"
                    placeholder="Enter Task Title Here"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    autoFocus
                    className="bg-background border-r border-secondary focus:outline-transparent focus:outline-0 px-2 py-3 flex-grow"
                />
                <div {...getRootProps()} aria-label="time-input-group" className="flex bg-background w-min">
                    <input {...getInputProps('hours')} type="text" placeholder="hh" aria-label="task-duration-hour-input" className="bg-background outline-transparent px-2 py-3 min-w-8 text-center" />
                    <span role="separator" className="py-3">:</span>
                    <input {...getInputProps('minutes')} type="text" aria-label="task-duration-minute-input" className="bg-background outline-transparent px-2 py-3 min-w-8 text-center" />
                </div>

            </div>

            <label htmlFor="task-description" role="task-description-label" className="sr-only">Task Description</label>
            <TextareaAutosize
                name="Task Description"
                id="task-description"
                aria-label="Task Description"
                role="task-description-input"
                placeholder="Enter Task Description Here"
                value={description}
                onChange={(event: React.FormEvent<HTMLTextAreaElement>) => setDescription(event.currentTarget.value)}
                className="bg-background border-none outline-0 min-h-16 max-h-32 px-2 py-3"
                onPointerEnterCapture={() => { }}
                onPointerLeaveCapture={() => { }}
            />
            <div role="-action-button-group" className="flex justify-end mt-4 space-x-4">
                <button
                    type="submit"
                    role="submit-task-button"
                    disabled={!title || !description}
                    className="text-green-600 border-4 rounded-xl p-4 disabled:text-secondary"
                >
                    <Check />
                    <p className="sr-only">Save Task</p>
                </button>
                <button
                    type="button"
                    role="abort-add-task-button"
                    className="text-red-600 border-4 rounded-xl p-4"
                    onClick={() => onClose()}
                >
                    <X />
                    <p className="sr-only">Cancel</p>
                </button>

            </div>
        </form>
    );
}