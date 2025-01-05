import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { TaskDetails } from "./TaskDetails";
import { useTaskStore } from "../stores/taskStore";

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

});