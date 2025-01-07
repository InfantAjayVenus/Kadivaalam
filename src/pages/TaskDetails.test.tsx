import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { useTaskStore } from "../stores/taskStore";
import { TaskDetails } from "./TaskDetails";

describe("TaskDetails should", () => {
    beforeAll(() => {
        vi.mock('zustand');

        vi.mock('react-router-dom', async () => {
            const mod = await vi.importActual('react-router-dom');
            return {
                ...mod,
                useParams: () => ({
                    taskId: '1',
                }),
            };
        });
    })

    afterAll(() => {
        vi.resetAllMocks();
    });

    it("render TaskDetails Page", async () => {

       useTaskStore.setState({
            tasks: [
                {
                    id: "1",
                    title: "Task 1",
                    description: "Task 1 description",
                    duration: {
                        hours: 1,
                        minutes: 30,
                    },
                },
            ],
        });

        render(
            <MemoryRouter initialEntries={['/session-planner/1']} initialIndex={0}>
                <TaskDetails />
            </MemoryRouter>
        );

        await screen.findByRole("active-task-title");
        await screen.findByRole("active-task-description");

        expect(screen.getByRole("active-task-title")).toHaveTextContent("Task 1");
        expect(screen.getByRole("active-task-description")).toHaveTextContent("Task 1 description");
    });

    it("should open AddTask when edit is toggled", async () => {

       useTaskStore.setState({
            tasks: [
                {
                    id: "1",
                    title: "Task 1",
                    description: "Task 1 description",
                    duration: {
                        hours: 1,
                        minutes: 30,
                    },
                },
            ],
        });

        render(
            <MemoryRouter initialEntries={['/session-planner/1']} initialIndex={0}>
                <TaskDetails />
            </MemoryRouter>
        );

        userEvent.click(screen.getByRole("edit-task-button"));

        await screen.findByRole("add-task-form");

        expect(screen.getByRole("add-task-form")).toBeInTheDocument();
    });

    it("should update the task when AddTask form is updated and submitted", async () => {

       useTaskStore.setState({
            tasks: [
                {
                    id: "1",
                    title: "Task 1",
                    description: "Task 1 description",
                    duration: {
                        hours: 1,
                        minutes: 30,
                    },
                },
            ],
        });

        const updatedTask = {
            title: "Task 1 updated",
            description: "Task 1 description updated",
            duration: {
                hours: 2,
                minutes: 0,
            },
        }

        render(
            <MemoryRouter initialEntries={['/session-planner/1']} initialIndex={0}>
                <TaskDetails />
            </MemoryRouter>
        );

        await userEvent.click(screen.getByRole("edit-task-button"));
        await userEvent.type(screen.getByRole("task-title-input"), updatedTask.title);
        await userEvent.type(screen.getByRole("task-description-input"), updatedTask.description);
        await userEvent.type(screen.getByLabelText("hours"), updatedTask.duration.hours.toString());
        await userEvent.type(screen.getByLabelText("minutes"), updatedTask.duration.minutes.toString());
        await userEvent.click(screen.getByRole("submit-task-button"));


        expect(screen.getByRole("active-task-title")).toHaveTextContent(updatedTask.title);
        expect(screen.getByRole("active-task-description")).toHaveTextContent(updatedTask.description);
    });

    it("should go back on close", async () => {

       useTaskStore.setState({
            tasks: [
                {
                    id: "1",
                    title: "Task 1",
                    description: "Task 1 description",
                    duration: {
                        hours: 1,
                        minutes: 30,
                    },
                },
            ],
        });

        const updatedTask = {
            title: "Task 1 updated",
            description: "Task 1 description updated",
            duration: {
                hours: 2,
                minutes: 0,
            },
        }

        render(
            <MemoryRouter initialEntries={['/session-planner/1']} initialIndex={0}>
                <TaskDetails />
            </MemoryRouter>
        );

       expect(screen.getByRole("active-task-description")).toHaveTextContent(updatedTask.description);
    })

});