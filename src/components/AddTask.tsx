import { Check, X } from "lucide-react";
import { useState } from "react";
import TextareaAutosize from "react-autosize-textarea";

interface AddTaskProps {
    onAddTask: (taskTitle: string, taskDescription: string) => void;
    onClose: () => void;
}

export function AddTask({ onAddTask, onClose }: AddTaskProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    return (

        <form
            className="border border-foreground rounded-2xl flex flex-col p-6 space-y-2"
            role="add-task-form"
            onSubmit={(submitEvent) => {

                submitEvent.preventDefault();
                onAddTask(title, description);
                submitEvent.currentTarget.reset();
            }}
            onReset={() => {
                setTitle('');
                setDescription('');
            }}
        >
            <label htmlFor="task-title" role="task-title-label" className="sr-only">Task Title</label>
            <input
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
                className="bg-background border-b border-foreground focus:outline-transparent focus:outline-0 px-2 py-3"
            />
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