import { Link } from "react-router-dom";
import { Task } from "../types/Task";

interface TaskItemProps {
    task: Task,
    isActive?: boolean,
};

export function TaskItem({ task, isActive=false }: TaskItemProps) {
    return (
        <li role="task-item" data-active={isActive} className="border border-primary data-[active=true]:bg-foreground data-[active=true]:text-background rounded-lg p-4 font-bold text-xl capitalize">
            <Link to={`/session-planner/${task.id}`}>
                <h4 role="task-item-title">{task.title}</h4>
            </Link>
        </li>
    );

}