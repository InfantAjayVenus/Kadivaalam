import { Link } from "react-router-dom";
import { Task } from "../types/Task";

interface TaskItemProps {
    task: Task,
    isActive?: boolean,
};

export function TaskItem({ task, isActive=false }: TaskItemProps) {
    return (
        <li 
            role="task-item" 
            data-active={isActive} 
            className="flex justify-between gap-2 border border-primary data-[active=true]:bg-foreground data-[active=true]:text-background rounded-lg p-4 font-bold text-xl capitalize">
            <Link to={`/session-planner/${task.id}`} className="flex-grow">
                <h4 role="task-item-title">{task.title}</h4>
            </Link>
            <p role="task-duration">{task.duration.hours.toString().padStart(2, '0')}h {task.duration.minutes.toString().padStart(2, '0')}m</p>
        </li>
    );

}