import "@testing-library/jest-dom";
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react';
import { Task } from "../types/Task";
import { nanoid } from "nanoid";
import { TaskItem } from "./TaskItem";
import { MemoryRouter } from "react-router-dom";


describe("TaskItem", () => {
    const taskData: Task = {
        id: nanoid(),
        title: "Task Title for Testing",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised",
        duration: {
            hours: 0,
            minutes: 25,
        }
    }
    const taskTitleRole = 'task-item-title';
    const taskDurationRole = 'task-duration';

    beforeEach(async () => {
        render(
            <MemoryRouter>
                <TaskItem task={taskData} />
            </MemoryRouter>
        )
    });

    it("should render the title of the task item", async () => {
        await screen.findByRole(taskTitleRole);

        expect(screen.getByRole(taskTitleRole)).toHaveTextContent(taskData.title);
    });

    it("should render the duration of the task item", async () => {
        await screen.findByRole(taskDurationRole);

        expect(screen.getByRole(taskDurationRole)).toHaveTextContent("00h 25m");
    })
})