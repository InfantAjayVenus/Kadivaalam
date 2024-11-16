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
            <input
                tabIndex={1}
                type="text"
                name="Task Title"
                aria-label="Task Title"
                id="task-title"
                role="task-title-input"
                placeholder="Enter Task Title Here"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                autoFocus
                className="bg-background border-b border-foreground"
            />
            <TextareaAutosize
                name="Task Description"
                id="task-description"
                aria-label="Task Description"
                role="task-description-input"
                placeholder="Enter Task Description Here"
                value={description}
                onChange={(event: React.FormEvent<HTMLTextAreaElement>) => setDescription(event.currentTarget.value)}
                className="bg-background border-none outline-0 max-h-32"
                onPointerEnterCapture={()=>{}}
                onPointerLeaveCapture={()=>{}}
            />
            <button type="submit" role="submit-task-button" disabled={!title || !description}><Check /></button>
            <button 
                type="button" 
                role="abort-add-task-button"
                onClick={() => onClose()}
            ><X /></button>
        </form>
    );
}