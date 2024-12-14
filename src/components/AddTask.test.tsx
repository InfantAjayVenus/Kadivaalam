import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi, } from 'vitest';
import { AddTask } from './AddTask';


describe("AddTask", () => {
    const taskData = {
        title: "Title",
        description: "Description",
        duration: {
            hours: 1,
            minutes: 12
        }
    }
    const taskTitleInputRole = "task-title-input";
    const taskDescriptionInputRole = "task-description-input";
    const taskDurationHourInputLabel = "hours";
    const taskDurationMinuteInputLabel = "minutes";
    const submitTaskButtonRole = "submit-task-button";
    const abortAddTaskButtonRole = "abort-add-task-button";



    describe("when the component is rendered", () => {
        beforeEach(() => {
            render(
                <AddTask
                    onAddTask={vi.fn()}
                    onClose={vi.fn()}
                />
            )
        });

        afterEach(() => {
            cleanup();
        });

        it("should render", async () => {
            const addTaskFormRole = "add-task-form";

            await screen.findByRole(addTaskFormRole);

            expect(screen.getByRole(addTaskFormRole)).toBeInTheDocument();
        });

        it("should render form inputs", async () => {

            await screen.findByRole(taskTitleInputRole);
            await screen.findByRole(taskDescriptionInputRole);
            await screen.findByLabelText(taskDurationHourInputLabel);
            await screen.findByLabelText(taskDurationMinuteInputLabel);
            await screen.findByRole(submitTaskButtonRole);
            await screen.findByRole(abortAddTaskButtonRole);

            expect(screen.getByRole(taskTitleInputRole)).toBeInTheDocument();
            expect(screen.getByRole(taskTitleInputRole)).toHaveFocus();
            expect(screen.getByRole(taskDescriptionInputRole)).toBeInTheDocument();
            expect(screen.getByLabelText(taskDurationHourInputLabel)).toBeInTheDocument();
            expect(screen.getByLabelText(taskDurationMinuteInputLabel)).toBeInTheDocument();
            expect(screen.getByRole(submitTaskButtonRole)).toBeInTheDocument();
            expect(screen.getByRole(abortAddTaskButtonRole)).toBeInTheDocument();
        });

    });
    describe("when form is passed with previous values", () => {
        const onAddTask = vi.fn();
        const onClose = vi.fn();

        beforeEach(() => {
            render(
                <AddTask
                    onAddTask={onAddTask}
                    onClose={onClose}
                    task={{
                        id: "mock-id",
                        title: taskData.title,
                        description: taskData.description,
                        duration: {
                            hours: taskData.duration.hours,
                            minutes: taskData.duration.minutes,
                        },
                    }}
                />
            )
        });

        afterEach(() => {
            cleanup();
        });

        it("should render with previous values", async () => {

            await screen.findByRole(taskTitleInputRole);
            await screen.findByRole(taskDescriptionInputRole);
            await screen.findByLabelText(taskDurationHourInputLabel);
            await screen.findByLabelText(taskDurationHourInputLabel);

            expect(screen.getByRole(taskTitleInputRole)).toHaveValue(taskData.title);
            expect(screen.getByRole(taskDescriptionInputRole)).toHaveValue(taskData.description);
            expect(screen.getByLabelText(taskDurationHourInputLabel)).toHaveValue(taskData.duration.hours.toString().padStart(2, '0'));
            expect(screen.getByLabelText(taskDurationMinuteInputLabel)).toHaveValue(taskData.duration.minutes.toString().padStart(2, '0'));
        });
    });

    describe("when the form is submitted", () => {
        const onAddTask = vi.fn();
        const onClose = vi.fn();

        beforeEach(() => {
            render(
                <AddTask
                    onAddTask={onAddTask}
                    onClose={onClose}
                />
            )
        });

        afterEach(() => {
            cleanup();
        });

        it("should submit the form on clicking submit button", async () => {

            await userEvent.type(screen.getByRole(taskTitleInputRole), taskData.title);
            await userEvent.type(screen.getByRole(taskDescriptionInputRole), taskData.description);
            await userEvent.click(screen.getByRole(submitTaskButtonRole));

            expect(onAddTask).toHaveBeenCalledWith(taskData.title, taskData.description, {hours: 0, minutes: 0});
        });

        it("should submit on enter key", async () => {

            await userEvent.type(screen.getByRole(taskTitleInputRole), taskData.title);
            await userEvent.type(screen.getByRole(taskDescriptionInputRole), taskData.description);
            await userEvent.keyboard("{Enter}");

            expect(onAddTask).toHaveBeenCalledWith(taskData.title, taskData.description, {hours: 0, minutes: 0});
        });

        it("should clear form on submit", async () => {

            await userEvent.type(screen.getByRole(taskTitleInputRole), taskData.title);
            await userEvent.type(screen.getByRole(taskDescriptionInputRole), taskData.description);
            await userEvent.click(screen.getByRole(submitTaskButtonRole));

            expect(screen.getByRole(taskTitleInputRole)).toHaveValue("");
            expect(screen.getByRole(taskDescriptionInputRole)).toHaveValue("");
        });

        it("should disable submit button when form is empty", async () => {
            await screen.findByRole(taskTitleInputRole);
            await screen.findByRole(taskDescriptionInputRole);

           if((screen.getByRole(taskTitleInputRole) as HTMLInputElement).value === "" 
                && (screen.getByRole(taskDescriptionInputRole) as HTMLTextAreaElement).value === "") {
                expect(screen.getByRole(submitTaskButtonRole)).toBeDisabled();
            }
        });

    });

});