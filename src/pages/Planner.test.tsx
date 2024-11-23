import "@testing-library/jest-dom";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach } from "node:test";
import { beforeEach, describe, expect, it } from "vitest";
import { Planner } from "./Planner";
import { MemoryRouter } from "react-router-dom";

describe("Planner", () => {
    beforeEach(() => {
        cleanup();
        render(
            <Planner />
        );
    })

    it("should render", async () => {
        const plannerRole = "planner";

        await screen.findByRole(plannerRole);

        expect(screen.getByRole(plannerRole)).toBeInTheDocument();
    });

    it("should render counter", async () => {
        const counterRole = "task-counter";

        await screen.findByRole(counterRole);

        expect(screen.getByRole(counterRole)).toBeInTheDocument();
        expect(screen.getByRole(counterRole)).not.toBeEmptyDOMElement();
    });

    it("should render help text when list is empty", async () => {
        const counterRole = "task-counter";
        const plannerRole = "task-advice-list";

        await screen.findByRole(counterRole);

        if (screen.getByRole(counterRole).textContent === "0") {
            await screen.findByRole(plannerRole);
            expect(screen.getByRole(plannerRole)).toBeInTheDocument();
        }
    });

    it("should render button", async () => {
        const buttonRole = "add-task-button";

        await screen.findByRole(buttonRole);

        expect(screen.getByRole(buttonRole)).toBeInTheDocument();
    });

    it("should render add  task form when button is clicked", async () => {
        const addTaskFormRole = "add-task-form";
        const buttonRole = "add-task-button";
        userEvent.click(screen.getByRole(buttonRole));

        await screen.findByRole(addTaskFormRole);

        expect(screen.getByRole(addTaskFormRole)).toBeInTheDocument();
    });

    it("should disable add task button when add task form is open", async () => {
        const addTaskFormRole = "add-task-form";
        const buttonRole = "add-task-button";

        await screen.findByRole(buttonRole);
        userEvent.click(screen.getByRole(buttonRole));

        await screen.findByRole(addTaskFormRole);

        expect(screen.getByRole(buttonRole)).toBeDisabled();
    });

});

describe("Add Task in Planner", () => {
    const taskData = {
        title: "Task Title Value",
        description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    }

    const helpTextRole = "task-advice-list";
    const tasksListRole = "tasks-list";
    const addTaskButtonRole = "add-task-button";
    const taskCounterRole = "task-counter";
    const taskTitleInputRole = "task-title-input";
    const taskDescriptionInputRole = "task-description-input";
    const submitTaskButtonRole = "submit-task-button";
    // const abortAddTaskButtonRole = "abort-add-task-button";
    beforeEach(async () => {
        cleanup();
        render(
            <MemoryRouter>
                <Planner />
            </MemoryRouter>
        )
        await userEvent.click(screen.getByRole(addTaskButtonRole))
        await userEvent.type(screen.getByRole(taskTitleInputRole), taskData.title);
        await userEvent.type(screen.getByRole(taskDescriptionInputRole), taskData.description);
        await userEvent.click(screen.getByRole(submitTaskButtonRole));

    });

    afterEach(() => {
        cleanup();
    });

    it("should increment the counter when a task is submitted", async () => {

        await screen.findByRole(taskCounterRole);
        expect(screen.getByRole(taskCounterRole)).toHaveTextContent('1');
    });

    it("should not render the help text when a task is submitted", async () => {

        expect(screen.queryByRole(helpTextRole)).not.toBeInTheDocument();
    });

    it("should render a task list when a task is submitted", async () => {
        expect(screen.getByRole(tasksListRole)).toBeInTheDocument();
    });

})

