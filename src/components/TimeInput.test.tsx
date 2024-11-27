import { cleanup, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";
import { TimeInput } from "./TimeInput";
import userEvent from "@testing-library/user-event";

describe("TimeInput validation and behaviour", () => {
    const minuteInputRole = "hour-input";
    const secondInputRole = "minute-input";

    beforeEach(() => {
        cleanup();
        render(<TimeInput onChange={() => {}}/>);
    })

    it("should render", async () => {

        await screen.findByRole(minuteInputRole);
        await screen.findByRole(secondInputRole);

        expect(screen.getByRole(minuteInputRole)).toBeInTheDocument();
        expect(screen.getByRole(secondInputRole)).toBeInTheDocument();

    });

    it("should shift focus to seconds when 2 digits are entered", async () => {
        await userEvent.type(screen.getByRole(minuteInputRole), "12");

        expect(screen.getByRole(secondInputRole)).toHaveFocus();
    });

    it("should reset to 0 if number is larger than 60", async () => {
        await userEvent.type(screen.getByRole(minuteInputRole), "61");
        await userEvent.type(screen.getByRole(secondInputRole), "61");

        expect(screen.getByRole(minuteInputRole)).toHaveValue('');
        expect(screen.getByRole(secondInputRole)).toHaveValue('');
    });
    it("should reset to 0 if a non numeric value is entered", async () => {
        const inputValue = "a-"
        await userEvent.type(screen.getByRole(minuteInputRole), inputValue);
        await userEvent.type(screen.getByRole(secondInputRole), inputValue);

        expect(screen.getByRole(minuteInputRole)).toHaveValue('');
        expect(screen.getByRole(secondInputRole)).toHaveValue('');
    });
    it("should left pad with 0 if number is smaller than 10 when blurred", async () => {
        const inputValue = "5[Tab]";
        const expectedValue = "05";

        await userEvent.type(screen.getByRole(minuteInputRole), inputValue);
        await userEvent.type(screen.getByRole(secondInputRole), inputValue);

        expect(screen.getByRole(minuteInputRole)).toHaveValue(expectedValue);
        expect(screen.getByRole(secondInputRole)).toHaveValue(expectedValue);
    });
});

describe("TimeInput data update", () => {
    const initialValues = {
        minutes: 5,
        seconds: 5
    };
    const hourInputRole = "hour-input";
    const minuteInputRole = "minute-input";
    const onChangeMock = vi.fn();

    describe("on change", () => {
        beforeEach(() => {
            cleanup();
            render(<TimeInput onChange={onChangeMock} />);
        });

        it("should call onchange with the new value", async () => { 
            await userEvent.type(screen.getByRole(hourInputRole), initialValues.minutes.toString());
            await userEvent.type(screen.getByRole(minuteInputRole), initialValues.seconds.toString());

            expect(onChangeMock).toHaveBeenCalledWith(initialValues.minutes, initialValues.seconds);
        });
    });

    describe("initial Values", () => {
        beforeEach(() => {
            cleanup();
            render(<TimeInput onChange={onChangeMock} initialHours={initialValues.minutes} initialMinutes={initialValues.seconds} />);
        });

        it("should render the input with initial values", async () => {
            await screen.findByRole(hourInputRole);
            await screen.findByRole(minuteInputRole);

            expect(screen.getByRole(hourInputRole)).toHaveValue(initialValues.minutes.toString().padStart(2, '0'));
            expect(screen.getByRole(minuteInputRole)).toHaveValue(initialValues.seconds.toString().padStart(2, '0'));
        })
    })
});